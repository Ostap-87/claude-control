// Facebook collectors — read-only. Real on-disk shapes differ per project (Aura vs GTT use
// different queue.json layouts that grew organically), so each gets its own reader rather than
// a shared generic "fb-queue" format.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { nextSlots } from "../lib/cadence.js";

function upsertPost(db, { id, streamId, title, fullText, mediaRefs, status, sourceRef, plannedAt, publishedAt }) {
  const now = new Date().toISOString();
  const existing = db.prepare("SELECT status FROM Post WHERE id = ?").get(id);

  db.prepare(`
    INSERT INTO Post (id, stream_id, title, full_text, media_refs, status, source_ref, planned_at, published_at, detected_at)
    VALUES (@id, @stream_id, @title, @full_text, @media_refs, @status, @source_ref, @planned_at, @published_at, @detected_at)
    ON CONFLICT(id) DO UPDATE SET
      status = excluded.status,
      planned_at = excluded.planned_at,
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

function readTextSafe(path) {
  try {
    return readFileSync(path, "utf-8");
  } catch {
    return null;
  }
}

// Aura FB series: data/aura-robot-series/queue.json — { published: [{company,slug,date}], pending: [{company,slug}] }
export function collectFbAura(db, { claudeControlDir, cadence, now = new Date() }) {
  const queuePath = join(claudeControlDir, "data", "aura-robot-series", "queue.json");
  if (!existsSync(queuePath)) return;
  const q = JSON.parse(readFileSync(queuePath, "utf-8"));

  for (const p of q.published || []) {
    const text = readTextSafe(join(claudeControlDir, "data", "aura-robot-series", "texts", `${p.slug}.txt`));
    upsertPost(db, {
      id: `fb-aura:${p.slug}`,
      streamId: "fb-aura",
      title: p.company,
      fullText: text,
      mediaRefs: [`https://raw.githubusercontent.com/Ostap-87/aura/main/public/fb-media/${p.slug}.jpg`],
      status: "published",
      sourceRef: `aura-robot-series/queue.json#${p.slug}`,
      publishedAt: p.date ? `${p.date}T09:30:00+03:00` : null,
    });
  }

  const pending = q.pending || [];
  const slots = nextSlots(cadence, now, pending.length);
  pending.forEach((p, i) => {
    const text = readTextSafe(join(claudeControlDir, "data", "aura-robot-series", "texts", `${p.slug}.txt`));
    upsertPost(db, {
      id: `fb-aura:${p.slug}`,
      streamId: "fb-aura",
      title: p.company,
      fullText: text,
      mediaRefs: [`https://raw.githubusercontent.com/Ostap-87/aura/main/public/fb-media/${p.slug}.jpg`],
      status: "queued",
      sourceRef: `aura-robot-series/queue.json#${p.slug}`,
      plannedAt: slots[i] ? slots[i].toISOString() : null,
    });
  });
}

// GTT FB series: data/globaltechtour-fb-series/queue.json — { posts: [{num,slug,title,photo,published_date?}] }
export function collectFbGtt(db, { claudeControlDir, cadence, now = new Date() }) {
  const queuePath = join(claudeControlDir, "data", "globaltechtour-fb-series", "queue.json");
  if (!existsSync(queuePath)) return;
  const q = JSON.parse(readFileSync(queuePath, "utf-8"));
  const posts = [...(q.posts || [])].sort((a, b) => a.num - b.num);

  const pendingInOrder = posts.filter((p) => !p.published_date);
  const slots = nextSlots(cadence, now, pendingInOrder.length);
  let pendingIdx = 0;

  for (const p of posts) {
    const text = readTextSafe(join(claudeControlDir, "data", "globaltechtour-fb-series", "texts", `${p.slug}.txt`));
    const hasPhoto = p.photo && p.photo !== "нет";
    if (p.published_date) {
      upsertPost(db, {
        id: `fb-gtt:${p.slug}`,
        streamId: "fb-gtt",
        title: p.title,
        fullText: text,
        mediaRefs: hasPhoto ? [p.photo] : null,
        status: "published",
        sourceRef: `globaltechtour-fb-series/queue.json#${p.slug}`,
        publishedAt: `${p.published_date}T09:30:00+03:00`,
      });
    } else {
      const slot = hasPhoto ? slots[pendingIdx] : null;
      pendingIdx += 1;
      upsertPost(db, {
        id: `fb-gtt:${p.slug}`,
        streamId: "fb-gtt",
        title: p.title,
        fullText: text,
        mediaRefs: hasPhoto ? [p.photo] : null,
        status: "queued",
        sourceRef: `globaltechtour-fb-series/queue.json#${p.slug}`,
        plannedAt: slot ? slot.toISOString() : null,
      });
    }
  }
}
