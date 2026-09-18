// Telegram collector — read-only. Three folders = three statuses, per the spec:
//   tg-queue/<project>/<date>-{0900,1800}.json      -> queued
//   tg-publish/<project>/<name>.json                 -> publishing (usually sub-second)
//   tg-queue/<project>/sent/<date>-{0900,1800}.json  -> published (git commit date used as timestamp,
//                                                       since the file content has no timestamp field)
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

function gitCommitDate(repoDir, filePath) {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%aI", "--", filePath], { cwd: repoDir, encoding: "utf-8" }).trim();
    return out || null;
  } catch {
    return null;
  }
}

function upsertPost(db, { id, streamId, title, fullText, mediaRefs, status, sourceRef, plannedAt, publishedAt }) {
  const now = new Date().toISOString();
  const existing = db.prepare("SELECT status FROM Post WHERE id = ?").get(id);

  db.prepare(`
    INSERT INTO Post (id, stream_id, title, full_text, media_refs, status, source_ref, planned_at, published_at, detected_at)
    VALUES (@id, @stream_id, @title, @full_text, @media_refs, @status, @source_ref, @planned_at, @published_at, @detected_at)
    ON CONFLICT(id) DO UPDATE SET
      status = excluded.status,
      source_ref = excluded.source_ref,
      published_at = COALESCE(excluded.published_at, Post.published_at)
  `).run({
    id, stream_id: streamId, title, full_text: fullText, media_refs: mediaRefs ? JSON.stringify(mediaRefs) : null,
    status, source_ref: sourceRef, planned_at: plannedAt || null, published_at: publishedAt || null,
    detected_at: now,
  });

  if (!existing || existing.status !== status) {
    db.prepare(`
      INSERT INTO PublicationEvent (post_id, event_type, event_at, source, raw_payload)
      VALUES (?, ?, ?, 'collector', ?)
    `).run(id, status, publishedAt || now, JSON.stringify({ sourceRef }));
  }
}

function readJsonSafe(path) {
  try {
    return JSON.parse(readFileSync(path, "utf-8"));
  } catch {
    return null;
  }
}

// dateSlot looks like "2026-09-18-0900" — split into a real date + slot label for display.
function parsePlannedAt(dateSlot) {
  const m = dateSlot.match(/^(\d{4}-\d{2}-\d{2})-(\d{4})$/);
  if (!m) return null;
  const [, date, hhmm] = m;
  return `${date}T${hhmm.slice(0, 2)}:${hhmm.slice(2)}:00`;
}

export function collectTelegram(db, { streamId, claudeControlDir, project }) {
  const base = join(claudeControlDir, "data", "tg-queue", project);
  const publishDir = join(claudeControlDir, "data", "tg-publish", project);
  const sentDir = join(base, "sent");

  if (existsSync(base)) {
    for (const file of readdirSync(base)) {
      if (!file.endsWith(".json")) continue;
      const dateSlot = file.replace(/\.json$/, "");
      const data = readJsonSafe(join(base, file));
      if (!data) continue;
      upsertPost(db, {
        id: `${streamId}:${dateSlot}`,
        streamId,
        title: (data.text || "").split("\n")[0].replace(/<[^>]+>/g, "").slice(0, 120),
        fullText: data.text || null,
        mediaRefs: data.image ? [data.image] : null,
        status: "queued",
        sourceRef: `tg-queue/${project}/${file}`,
        plannedAt: parsePlannedAt(dateSlot),
      });
    }
  }

  if (existsSync(publishDir)) {
    for (const file of readdirSync(publishDir)) {
      if (!file.endsWith(".json")) continue;
      const dateSlot = file.replace(/\.json$/, "");
      const data = readJsonSafe(join(publishDir, file));
      if (!data) continue;
      upsertPost(db, {
        id: `${streamId}:${dateSlot}`,
        streamId,
        title: (data.text || "").split("\n")[0].replace(/<[^>]+>/g, "").slice(0, 120),
        fullText: data.text || null,
        mediaRefs: data.image ? [data.image] : null,
        status: "publishing",
        sourceRef: `tg-publish/${project}/${file}`,
      });
    }
  }

  if (existsSync(sentDir)) {
    for (const file of readdirSync(sentDir)) {
      if (!file.endsWith(".json")) continue;
      const dateSlot = file.replace(/\.json$/, "");
      const data = readJsonSafe(join(sentDir, file));
      if (!data) continue;
      const publishedAt = gitCommitDate(claudeControlDir, `data/tg-queue/${project}/sent/${file}`) || parsePlannedAt(dateSlot);
      upsertPost(db, {
        id: `${streamId}:${dateSlot}`,
        streamId,
        title: (data.text || "").split("\n")[0].replace(/<[^>]+>/g, "").slice(0, 120),
        fullText: data.text || null,
        mediaRefs: data.image ? [data.image] : null,
        status: "published",
        sourceRef: `tg-queue/${project}/sent/${file}`,
        publishedAt,
      });
    }
  }
}
