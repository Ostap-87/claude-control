// POST /api/webhooks/publish-receipt — the ONE allowed write into the existing publishing system:
// an extra HTTP step at the end of the FB-LINKEDIN-OSTAPDOTCENKO Make.com scenario calls this
// after a successful publish, so fb-personal/linkedin-personal (which have no file-based queue)
// still show up as `published` in the dashboard.
export function registerWebhookRoutes(fastify) {
  fastify.post("/api/webhooks/publish-receipt", async (req, reply) => {
    const { channel, project, slug, published_at, post_url } = req.body || {};
    if (!channel || !project || !slug) {
      return reply.code(400).send({ error: "channel, project and slug are required" });
    }
    const channelPrefix = { facebook: "fb", linkedin: "linkedin", blog: "blog", telegram: "tg" }[channel] || channel;
    const streamId = `${channelPrefix}-${project}`;
    const stream = fastify.db.prepare("SELECT id FROM Stream WHERE id = ?").get(streamId);
    if (!stream) return reply.code(400).send({ error: `unknown stream ${streamId}` });

    const postId = `${streamId}:${slug}`;
    const now = new Date().toISOString();
    const publishedAt = published_at || now;

    fastify.db.prepare(`
      INSERT INTO Post (id, stream_id, title, source_ref, status, planned_at, published_at, detected_at)
      VALUES (@id, @stream_id, @title, @source_ref, 'published', NULL, @published_at, @detected_at)
      ON CONFLICT(id) DO UPDATE SET
        status = 'published',
        published_at = excluded.published_at
    `).run({ id: postId, stream_id: streamId, title: slug, source_ref: post_url || slug, published_at: publishedAt, detected_at: now });

    fastify.db.prepare(`
      INSERT INTO PublicationEvent (post_id, event_type, event_at, source, raw_payload)
      VALUES (?, 'published', ?, 'webhook', ?)
    `).run(postId, publishedAt, JSON.stringify(req.body));

    return { ok: true, post_id: postId };
  });
}
