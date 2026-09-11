// Публикует оригинальный (не заимствованный из блога/TG) пост в Facebook-страницу
// Aura Robotics или Global Tech Tour. Обе страницы используют ОДИН общий Make.com
// сценарий (FB-POST-AURA-GTT) с роутером внутри, который разводит запрос по полю
// "project" ("aura" | "globaltechtour", регистр важен — сравнение в фильтре
// Make регистрозависимое). ostapdotcenko исключение — его FB-страница зеркалит
// блог напрямую через ostapdotcenko/scripts/post-to-facebook.mjs, этот скрипт
// для неё не используется (свой отдельный сценарий/вебхук).
//
// Черновики лежат в data/fb-queue/<project>/<file>.json: {"text": "...", "image": "https://..."}
// Использование: node scripts/post-to-facebook.mjs <project> <filename>
// После успешной публикации файл переносится в data/fb-queue/<project>/sent/<filename>.
import { readFileSync, writeFileSync, unlinkSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const [project, filename] = process.argv.slice(2);
if (!project || !filename) {
  console.error("Usage: node scripts/post-to-facebook.mjs <project> <filename>");
  process.exit(1);
}

const webhooksConfig = JSON.parse(readFileSync(join(root, "data/fb-config/webhooks.json"), "utf-8"));
const scenario = webhooksConfig.scenarios[project];
if (!scenario) {
  console.error(`Unknown project "${project}". Known: ${Object.keys(webhooksConfig.scenarios).join(", ")}`);
  process.exit(1);
}
if (!scenario.webhook_url) {
  console.error(`Project "${project}" has no webhook_url configured yet in data/fb-config/webhooks.json`);
  process.exit(1);
}
if (scenario.content_mode !== "original") {
  console.error(
    `Project "${project}" has content_mode "${scenario.content_mode}" — this script is only for content_mode "original" (aura, globaltechtour). ostapdotcenko uses its own repo script.`
  );
  process.exit(1);
}

const draftPath = join(root, "data/fb-queue", project, filename);
if (!existsSync(draftPath)) {
  console.error(`Draft not found: ${draftPath}`);
  process.exit(1);
}

const draft = JSON.parse(readFileSync(draftPath, "utf-8"));
if (!draft.text || !draft.image) {
  console.error(`Draft "${filename}" must have "text" and "image" fields`);
  process.exit(1);
}

const res = await fetch(scenario.webhook_url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ project, text: draft.text, image: draft.image }),
});

if (!res.ok) {
  console.error(`Webhook request failed: ${res.status} ${await res.text()}`);
  process.exit(1);
}

const sentDir = join(root, "data/fb-queue", project, "sent");
mkdirSync(sentDir, { recursive: true });
writeFileSync(join(sentDir, filename), JSON.stringify(draft, null, 2));
unlinkSync(draftPath);

console.log(`Posted to Facebook (${project}): "${draft.text.slice(0, 60)}..."`);
