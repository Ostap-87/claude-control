# Content Dashboard — backend (Фаза 1)

Read-only наблюдатель за публикационным пайплайном (блог/TG/FB/LinkedIn × Aura/ГТТ/личный блог).
Ничего не публикует и не пишет обратно в источники — только читает и складывает нормализованное
состояние в свой `content-dashboard.db` (SQLite, WAL-режим).

## Статус

- [x] Фаза 1 — Fastify + SQLite-схема + миграции + seed 9 потоков
- [~] Фаза 2 — коллекторы: блоги ✅ (Aura/ГТТ/личный) → Telegram ✅ (Aura/ГТТ) → Facebook ⏳ (осталось)
- [x] Фаза 3 — webhook-приёмник для fb-personal/linkedin-personal (`src/routes/webhooks.js`, сквозной тест пройден)
- [ ] Фаза 4 — внешние интеграции (Graph API, GA4, Yandex Metrika)
- [ ] Фаза 5 — уведомления об ошибках
- [ ] Фаза 6 — API для фронтенда (`/api/streams`, `/api/posts` — готовы; `/api/queue`, `/api/stats`, `/api/competitors` — нет)
- [ ] Фаза 7 — frontend (React + ECharts)
- [ ] Фаза 8 — модуль анализа конкурентов
- [ ] Фаза 9 — ночной бэкап в GitHub

## Запуск локально

```bash
npm install
npm run db:init   # создаёт content-dashboard.db, засеивает 9 Stream-записей
DASHBOARD_WORKSPACE_ROOT=/workspace npm start   # http://localhost:4100
```

`DASHBOARD_WORKSPACE_ROOT` — папка, где лежат рядом `claude-control/`, `aura/`, `sinotech/`,
`ostapdotcenko/` (по умолчанию `/workspace`, как в этой песочнице). На проде это будет путь
на VPS, где у поллера уже есть локальные копии этих репозиториев.

## Что уже проверено

- `GET /api/health`
- `GET /api/streams` — агрегаты по всем 9 потокам (реальные цифры с продовых данных на 18.09.2026: blog-aura 50 опубл./9 в очереди, blog-gtt то же, blog-personal 12 опубл., tg-aura/tg-gtt 87 опубл./2 в очереди)
- `GET /api/posts`, `GET /api/posts/:id`, `PATCH /api/posts/:id`
- `POST /api/webhooks/publish-receipt` — тестовый вызов создаёт `Post(status=published)` + `PublicationEvent`
- Коллекторы блогов (Aura/ГТТ/личный) и Telegram (Aura/ГТТ) прогнаны на реальных данных — числа опубликованных/в очереди совпали с ручными подсчётами из этого же чата

## Структура

```
content-dashboard/
  server.js                    — точка входа: Fastify + node-cron
  db/schema.sql                — 6 таблиц по ТЗ
  db/init.js                   — миграция + seed Stream
  src/routes/streams.js        — GET /api/streams
  src/routes/posts.js          — GET/PATCH /api/posts
  src/routes/webhooks.js       — POST /api/webhooks/publish-receipt
  src/collectors/index.js      — оркестратор коллекторов
  src/collectors/blog.js       — Aura/ГТТ/личный блог
  src/collectors/telegram.js   — Aura/ГТТ Telegram (tg-queue/tg-publish/sent)
```

## Открытые вопросы (см. чат)

1. Куда деплоить backend на VPS — нет прямого SSH-доступа у ассистента, деплой должен идти
   по той же схеме git-push + поллер/systemd, что и остальные сервисы (`ostapdotcenko-deploy`,
   `command-poller.py`). Нужно один раз вручную настроить unit/cron на VPS.
2. Хостинг frontend — Vercel/Netlify аккаунт или Claude Artifact.
3. Есть ли у VPS уже локальные чекауты `claude-control`/`aura`/`sinotech` для коллекторов,
   или коллектору клонировать их самому (нужны deploy-ключи).
4. Репозиторий для кода — временно лежит внутри `claude-control/content-dashboard/`,
   создание отдельного репо через GitHub API недоступно (403 у интеграции).
