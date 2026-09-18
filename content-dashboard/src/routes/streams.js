// GET /api/streams — list of streams with aggregate counts (total/queued/published)
export function registerStreamRoutes(fastify) {
  fastify.get("/api/streams", async () => {
    const db = fastify.db;
    const streams = db.prepare("SELECT * FROM Stream ORDER BY id").all();
    const countsStmt = db.prepare(`
      SELECT status, COUNT(*) as n FROM Post WHERE stream_id = ? GROUP BY status
    `);
    return streams.map((s) => {
      const rows = countsStmt.all(s.id);
      const counts = Object.fromEntries(rows.map((r) => [r.status, r.n]));
      const total = rows.reduce((sum, r) => sum + r.n, 0);
      return {
        ...s,
        cadence: s.cadence_json ? JSON.parse(s.cadence_json) : null,
        counts: {
          total,
          queued: counts.queued || 0,
          publishing: counts.publishing || 0,
          pending_approval: counts.pending_approval || 0,
          published: counts.published || 0,
          error: counts.error || 0,
        },
      };
    });
  });
}
