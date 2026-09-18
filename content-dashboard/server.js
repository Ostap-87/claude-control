// Content Dashboard backend — read-only observer.
// Never writes back to source repos, Make.com scenarios, or the VPS command-poller.
import Fastify from "fastify";
import cron from "node-cron";
import { openDb } from "./db/init.js";
import { registerStreamRoutes } from "./src/routes/streams.js";
import { registerPostRoutes } from "./src/routes/posts.js";
import { registerWebhookRoutes } from "./src/routes/webhooks.js";
import { runCollectors } from "./src/collectors/index.js";

const PORT = process.env.PORT || 4100;
const COLLECTOR_INTERVAL_CRON = process.env.COLLECTOR_INTERVAL_CRON || "*/10 * * * *"; // every 10 min

const fastify = Fastify({ logger: true });
const db = openDb();
fastify.decorate("db", db);

fastify.get("/api/health", async () => ({ ok: true, time: new Date().toISOString() }));

registerStreamRoutes(fastify);
registerPostRoutes(fastify);
registerWebhookRoutes(fastify);

cron.schedule(COLLECTOR_INTERVAL_CRON, () => {
  runCollectors(db).catch((err) => fastify.log.error({ err }, "collector run failed"));
});

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    // Run once immediately on boot so the dashboard isn't empty for the first cron interval.
    await runCollectors(db).catch((err) => fastify.log.error({ err }, "initial collector run failed"));
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
