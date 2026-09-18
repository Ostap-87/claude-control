// Blog collectors — read-only. Never writes to the source repos.
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";

function gitCommitDate(repoDir, filePath) {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%aI", "--", filePath], {
      cwd: repoDir,
      encoding: "utf-8",
    }).trim();
    return out || null;
  } catch {
    return null;
  }
}

function upsertPost(db, { id, streamId, title, fullText, mediaRefs, status, sourceRef, plannedAt, publishedAt }) {
  const now = new Date().toISOString();
  const existing = db.prepare("SELECT status, published_at FROM Post WHERE id = ?").get(id);

  db.prepare(`
    INSERT INTO Post (id, stream_id, title, full_text, media_refs, status, source_ref, planned_at, published_at, detected_at)
    VALUES (@id, @stream_id, @title, @full_text, @media_refs, @status, @source_ref, @planned_at, @published_at, @detected_at)
    ON CONFLICT(id) DO UPDATE SET
      title = excluded.title,
      full_text = excluded.full_text,
      media_refs = excluded.media_refs,
      status = excluded.status,
      planned_at = excluded.planned_at,
      published_at = excluded.published_at
  `).run({
    id, stream_id: streamId, title, full_text: fullText, media_refs: mediaRefs ? JSON.stringify(mediaRefs) : null,
    status, source_ref: sourceRef, planned_at: plannedAt || null, published_at: publishedAt || null,
    detected_at: now, // only actually used on true INSERT — the UPDATE SET list above omits detected_at, so it's never clobbered
  });

  if (!existing) {
    db.prepare(`
      INSERT INTO PublicationEvent (post_id, event_type, event_at, source, raw_payload)
      VALUES (?, ?, ?, 'collector', ?)
    `).run(id, status, publishedAt || now, JSON.stringify({ sourceRef }));
  } else if (existing.status !== status) {
    db.prepare(`
      INSERT INTO PublicationEvent (post_id, event_type, event_at, source, raw_payload)
      VALUES (?, ?, ?, 'collector', ?)
    `).run(id, status, now, JSON.stringify({ sourceRef, transition: `${existing.status} -> ${status}` }));
  }
}

// Aura: one JSON file per published article in aura/content/blog/*.json.
// Batch (queued-but-not-yet-published) entries come from claude-control/data/content-plan/aura-blog-15day-batch.json.
export function collectAuraBlog(db, { repoDir, batchFile }) {
  const blogDir = join(repoDir, "content", "blog");
  const published = new Set();

  for (const file of readdirSync(blogDir).filter((f) => f.endsWith(".json"))) {
    const slug = basename(file, ".json");
    const filePath = join(blogDir, file);
    const data = JSON.parse(readFileSync(filePath, "utf-8"));
    published.add(slug);
    upsertPost(db, {
      id: `blog-aura:${slug}`,
      streamId: "blog-aura",
      title: data.title_ru || slug,
      fullText: data.body_ru || null,
      mediaRefs: data.cover ? [data.cover] : null,
      status: "published",
      sourceRef: `content/blog/${file}`,
      publishedAt: data.publishedAt ? `${data.publishedAt}T00:00:00Z` : gitCommitDate(repoDir, `content/blog/${file}`),
    });
  }

  if (batchFile) {
    const batch = JSON.parse(readFileSync(batchFile, "utf-8"));
    const arr = Array.isArray(batch) ? batch : batch.articles || batch.batch;
    for (const a of arr) {
      if (published.has(a.slug)) continue;
      upsertPost(db, {
        id: `blog-aura:${a.slug}`,
        streamId: "blog-aura",
        title: a.title_ru || a.slug,
        fullText: a.body_ru || null,
        mediaRefs: a.cover ? [a.cover] : null,
        status: "queued",
        sourceRef: `content-plan/aura-blog-15day-batch.json#${a.slug}`,
      });
    }
  }
}

// GTT: articles live inside one big JSON array (site_content.example.json), commit date of that
// whole file is used as a best-effort published_at (git doesn't track per-array-entry history).
export function collectGttBlog(db, { repoDir, siteContentPath, batchFile }) {
  const relPath = siteContentPath.startsWith(repoDir) ? siteContentPath.slice(repoDir.length + 1) : siteContentPath;
  const site = JSON.parse(readFileSync(siteContentPath, "utf-8"));
  const published = new Set(site.blog.map((a) => a.slug));
  const fileCommitDate = gitCommitDate(repoDir, relPath);

  for (const a of site.blog) {
    upsertPost(db, {
      id: `blog-gtt:${a.slug}`,
      streamId: "blog-gtt",
      title: a.title_ru || a.slug,
      fullText: a.body_ru || null,
      mediaRefs: a.cover ? [a.cover] : null,
      status: "published",
      sourceRef: `${relPath}#${a.slug}`,
      publishedAt: a.date ? `${a.date}T00:00:00Z` : fileCommitDate,
    });
  }

  if (batchFile) {
    const batch = JSON.parse(readFileSync(batchFile, "utf-8"));
    const arr = Array.isArray(batch) ? batch : batch.articles || batch.batch;
    for (const a of arr) {
      if (published.has(a.slug)) continue;
      upsertPost(db, {
        id: `blog-gtt:${a.slug}`,
        streamId: "blog-gtt",
        title: a.title_ru || a.slug,
        fullText: a.body_ru || null,
        mediaRefs: a.cover ? [a.cover] : null,
        status: "queued",
        sourceRef: `content-plan/gtt-blog-15day-batch.json#${a.slug}`,
      });
    }
  }
}

// Personal blog (ostapdotcenko) — no batch, published articles live inline in src/i18n/ru.ts as a
// JS array literal (not valid JSON), so we regex-extract slug+title+date per article and use
// git blame/log on the whole file for a best-effort published_at (per-article git history would
// require parsing the diff per commit, out of scope for Phase 2).
export function collectPersonalBlog(db, { repoDir, i18nFile }) {
  const relPath = i18nFile.startsWith(repoDir) ? i18nFile.slice(repoDir.length + 1) : i18nFile;
  const source = readFileSync(i18nFile, "utf-8");
  const fileCommitDate = gitCommitDate(repoDir, relPath);
  const articleRegex = /slug:\s*"([^"]+)",\s*\n\s*date:\s*"([^"]*)",\s*\n\s*tag:\s*"[^"]*",\s*\n\s*time:\s*"[^"]*",\s*\n\s*title:\s*"((?:[^"\\]|\\.)*)"/g;

  for (const m of source.matchAll(articleRegex)) {
    const [, slug, date, titleEscaped] = m;
    let title = titleEscaped;
    try { title = JSON.parse(`"${titleEscaped}"`); } catch { /* leave as-is */ }
    upsertPost(db, {
      id: `blog-personal:${slug}`,
      streamId: "blog-personal",
      title,
      fullText: null, // full text intentionally not duplicated here; see source_ref to look it up
      mediaRefs: null,
      status: "published",
      sourceRef: `${relPath}#${slug}`,
      publishedAt: date ? `${date}T00:00:00Z` : fileCommitDate,
    });
  }
}
