// Phase 2: blog + Telegram + Facebook collectors wired up.
import { collectAuraBlog, collectGttBlog, collectPersonalBlog } from "./blog.js";
import { collectTelegram } from "./telegram.js";
import { collectFbAura, collectFbGtt } from "./facebook.js";

const WORKSPACE = process.env.DASHBOARD_WORKSPACE_ROOT || "/workspace";
const CLAUDE_CONTROL_DIR = `${WORKSPACE}/claude-control`;
const AURA_DIR = `${WORKSPACE}/aura`;
const SINOTECH_DIR = `${WORKSPACE}/sinotech`;
const OSTAPDOTCENKO_DIR = `${WORKSPACE}/ostapdotcenko`;

export async function runCollectors(db) {
  const ran = [];
  const errors = [];

  const steps = [
    ["blog-aura", () => collectAuraBlog(db, {
      repoDir: AURA_DIR,
      batchFile: `${CLAUDE_CONTROL_DIR}/data/content-plan/aura-blog-15day-batch.json`,
    })],
    ["blog-gtt", () => collectGttBlog(db, {
      repoDir: SINOTECH_DIR,
      siteContentPath: `${SINOTECH_DIR}/src/data/site_content.example.json`,
      batchFile: `${CLAUDE_CONTROL_DIR}/data/content-plan/gtt-blog-15day-batch.json`,
    })],
    ["blog-personal", () => collectPersonalBlog(db, {
      repoDir: OSTAPDOTCENKO_DIR,
      i18nFile: `${OSTAPDOTCENKO_DIR}/src/i18n/ru.ts`,
    })],
    ["tg-aura", () => collectTelegram(db, { streamId: "tg-aura", claudeControlDir: CLAUDE_CONTROL_DIR, project: "aura" })],
    ["tg-gtt", () => collectTelegram(db, { streamId: "tg-gtt", claudeControlDir: CLAUDE_CONTROL_DIR, project: "globaltechtour" })],
    ["fb-aura", () => collectFbAura(db, { claudeControlDir: CLAUDE_CONTROL_DIR, cadence: { days: ["mon", "wed"], time: "09:30" } })],
    ["fb-gtt", () => collectFbGtt(db, { claudeControlDir: CLAUDE_CONTROL_DIR, cadence: { days: ["mon", "wed", "fri"], time: "09:30" } })],
  ];

  for (const [name, fn] of steps) {
    try {
      fn();
      ran.push(name);
    } catch (err) {
      errors.push({ name, message: err.message });
    }
  }

  return { ranAt: new Date().toISOString(), collectors: ran, errors };
}
