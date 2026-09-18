// GET /api/posts?stream_id&status&from&to — filtered post list
// GET /api/posts/:id — full post detail
// PATCH /api/posts/:id — edit text/media, written ONLY to this DB, never back to source files/repos
export function registerPostRoutes(fastify) {
  fastify.get("/api/posts", async (req) => {
    const { stream_id, status, from, to } = req.query;
    const clauses = [];
    const params = {};
    if (stream_id) { clauses.push("stream_id = @stream_id"); params.stream_id = stream_id; }
    if (status) { clauses.push("status = @status"); params.status = status; }
    if (from) { clauses.push("COALESCE(published_at, planned_at) >= @from"); params.from = from; }
    if (to) { clauses.push("COALESCE(published_at, planned_at) <= @to"); params.to = to; }
    const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
    return fastify.db.prepare(`SELECT * FROM Post ${where} ORDER BY COALESCE(published_at, planned_at) DESC`).all(params);
  });

  fastify.get("/api/posts/:id", async (req, reply) => {
    const post = fastify.db.prepare("SELECT * FROM Post WHERE id = ?").get(req.params.id);
    if (!post) return reply.code(404).send({ error: "not_found" });
    const events = fastify.db.prepare("SELECT * FROM PublicationEvent WHERE post_id = ? ORDER BY event_at").all(req.params.id);
    return { ...post, events };
  });

  fastify.patch("/api/posts/:id", async (req, reply) => {
    const { title, full_text, media_refs } = req.body || {};
    const post = fastify.db.prepare("SELECT * FROM Post WHERE id = ?").get(req.params.id);
    if (!post) return reply.code(404).send({ error: "not_found" });
    fastify.db.prepare(`
      UPDATE Post SET
        title = COALESCE(@title, title),
        full_text = COALESCE(@full_text, full_text),
        media_refs = COALESCE(@media_refs, media_refs)
      WHERE id = @id
    `).run({ id: req.params.id, title: title ?? null, full_text: full_text ?? null, media_refs: media_refs ? JSON.stringify(media_refs) : null });
    return fastify.db.prepare("SELECT * FROM Post WHERE id = ?").get(req.params.id);
  });
}
