// Creates/migrates content-dashboard.db from schema.sql and seeds the 9 fixed Streams.
// Safe to re-run: schema uses CREATE TABLE IF NOT EXISTS, streams are upserted.
import Database from "better-sqlite3";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.DASHBOARD_DB_PATH || join(__dirname, "..", "content-dashboard.db");

export function openDb() {
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  return db;
}

const STREAMS = [
  { id: "blog-aura", channel_type: "blog", project: "aura", display_name: "Блог — Aura Robotics", cadence_json: null },
  { id: "blog-gtt", channel_type: "blog", project: "gtt", display_name: "Блог — Global Tech Tour", cadence_json: null },
  { id: "blog-personal", channel_type: "blog", project: "personal", display_name: "Блог — ostapdotcenko", cadence_json: null },
  { id: "tg-aura", channel_type: "telegram", project: "aura", display_name: "Telegram — Aura Robotics", cadence_json: JSON.stringify({ times: ["09:00", "18:00"], days: "daily" }) },
  { id: "tg-gtt", channel_type: "telegram", project: "gtt", display_name: "Telegram — Global Tech Tour", cadence_json: JSON.stringify({ times: ["09:00", "18:00"], days: "daily" }) },
  { id: "fb-aura", channel_type: "facebook", project: "aura", display_name: "Facebook — Aura Robotics", cadence_json: JSON.stringify({ days: ["mon", "wed"], time: "09:30" }) },
  { id: "fb-gtt", channel_type: "facebook", project: "gtt", display_name: "Facebook — Global Tech Tour", cadence_json: JSON.stringify({ days: ["mon", "wed", "fri"], time: "09:30" }) },
  { id: "fb-personal", channel_type: "facebook", project: "personal", display_name: "Facebook — ostapdotcenko", cadence_json: null },
  { id: "linkedin-personal", channel_type: "linkedin", project: "personal", display_name: "LinkedIn — ostapdotcenko", cadence_json: null },
];

function migrate() {
  const db = openDb();
  const schema = readFileSync(join(__dirname, "schema.sql"), "utf-8");
  db.exec(schema);

  const upsert = db.prepare(`
    INSERT INTO Stream (id, channel_type, project, display_name, cadence_json)
    VALUES (@id, @channel_type, @project, @display_name, @cadence_json)
    ON CONFLICT(id) DO UPDATE SET
      channel_type = excluded.channel_type,
      project = excluded.project,
      display_name = excluded.display_name,
      cadence_json = excluded.cadence_json
  `);
  const insertMany = db.transaction((rows) => {
    for (const row of rows) upsert.run(row);
  });
  insertMany(STREAMS);

  db.close();
  console.log(`Migrated + seeded ${STREAMS.length} streams at ${dbPath}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  migrate();
}
