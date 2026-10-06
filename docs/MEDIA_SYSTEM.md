# 🏗 МЕДИАСИСТЕМА Ostap Dotcenko — мастер-паспорт
> Собрано 05–06.10.2026. Назначение: прикреплять этот файл первым сообщением
> любого чата с ИИ-оператором — полный контекст за 2 минуты чтения.
> Секретов здесь НЕТ (токены/пароли — на сервере, см. раздел «Доступы»).

## 1. Экосистема публикаций (автопилот, время по Пекину)

| Время | Событие | Механизм |
|---|---|---|
| 09:00 | 📰 Новости индустрии → личка TG (командный бот) | сервер-cron → GitHub Actions |
| 09:05 | 📊 Сводка по конкурентам → личка | сервер-cron → GitHub Actions |
| 09:15 | 📋 Анонс постов дня в каналы (с картинками) → личка | сервер-cron → GitHub Actions |
| 14:00 | 📱 Посты в TG: @aura_robots + GTT-канал | сервер-cron → GitHub Actions → боты каналов |
| 18:00 | 📝 Статья в блог globaltechtour.ru (RU/EN) | сервер /opt/publishers/publish-gtt-article.py |
| 19:00 | 📘 Посты на FB-страницы aura + GTT (из очереди) | /opt/publishers/fb-publish.py → Make.com |
| 20:00 | 📝 Статья в блог aura-robotics.ru (RU/EN) | /opt/publishers/publish-aura-article.py |
| 23:00 | 📱 Посты в TG (второй слот) | как в 14:00 |
| любое | 📝 Статья ostapdotcenko.ru → автопост FB (RU) + LinkedIn (EN) | деплой каждые 2 мин → Make-сценарий |

Запасы контента на момент создания: TG-посты до 30.10 (113 шт) · блоги ~60 статей.
Логи всего: `tail -f /var/log/content-pipeline.log`

## 2. Сервер и доступ

- VPS reg.ru, Ubuntu 26.04, IP 80.78.241.224, имя cv7903607
- Вход: `ssh vps` (настроено в ~/.ssh/config Mac) — по ключу, без пароля
- Работать всегда в tmux: `tmux attach -t audit` (или `tmux new -s audit`)
- Панель VPS: cloud.reg.ru (веб-консоль VNC там же, аварийный вход)
- **Telegram API с сервера заблокирован** (РКН) — вся TG-отправка идёт через
  GitHub Actions (бесплатно). Сервер только кладёт посты в очередь и пушит.

### Ключевые пути на сервере
| Что | Где |
|---|---|
| Сайты (рабочие копии) | /opt/ostapdotcenko · /opt/aura · /var/www/globaltechtour |
| Автоматика публикаций | /opt/publishers/*.py (5 скриптов) |
| Очереди TG/FB, батчи контента | /opt/claude-control/data/ (репо Ostap-87/claude-control) |
| Публикаторы логов | /var/log/content-pipeline.log |
| Секреты/токены | /etc/*.env, /root/.git-credentials, /root/.cf-token |
| Деплой личного сайта | /opt/deploy-ostapdotcenko.sh (cron */2) |

## 3. GitHub (аккаунт Ostap-87)

- Репозитории: claude-control (приватный — мозг системы), AURA, SINOTECH
  (рабочая ветка claude/sinotech-voyage-setup!), ostapdotcenko, content-dashboard,
  MyFirst (тон-оф-войс источник)
- Автоматика доставки: Actions в claude-control → tg-send, industry-news,
  competitors-digest, tg-preview
- Make.com: 2 сценария (FB aura/GTT; FB+LI ostapdotcenko), вебхуки в
  claude-control/data/fb-config/webhooks.json
- **ПАМЯТЬ ПРОЕКТОВ**: файл PULT.md в корне каждого из трёх сайтов-репо +
  AGENT_GUIDE.md / DESIGN_PROMPT.md (ostapdotcenko) + design/tokens.md (aura)

## 4. Как работать с ИИ (протокол «пульт»)

1. Публикация статьи: кидаешь тексты (+ фото) → ИИ возвращает один paste-блок
   → вставляешь в tmux → сайт обновляется сам (для ostapdotcenko +
   автопост FB/LinkedIn)
2. Форматы: ostapdotcenko RU/EN/ZH (src/i18n/*.ts, blog.articles[]) ·
   aura RU/EN (content/blog/<slug>.json) · GTT RU/EN (site_content.example.json,
   blog[]) · программы GTT (corporateTraining.ts + RouteMap — 9 стран готовы)
3. Дизайн-системы: ostapdotcenko — нео-брутализм (#0A0A0A/#F2F0EA/#C8FF00,
   Unbounded/Golos/JetBrains, квадратные углы, жёсткие тени) · aura — тёплый
   минимализм robot.com (#fff65d, Inter, БЕЗ теней/градиентов) · GTT — светлый
   статусный. НЕ смешивать!
4. Голос: правила в CLAUDE.md каждого репо. TG-посты aura — с хуком ≤130
   символов (Zen!), ссылка на /blog/<slug>. GTT — только на основе реальной
   статьи со ссылкой.

## 5. Бэклог (на ближайшие недели)

1. Наполнить fb-queue (FB-страницы ждут контента; очередь пуста)
2. Генерация контента на ноябрь (батчи кончаются ~30.10)
3. Instagram-карусели: заготовки утеряны → собрать заново: шаблон 1080×1350 +
   очередь ig-queue + публикация (нужен IG-бизнес-аккаунт в Make)
4. Обложки статей через Higgsfield CLI (на сервере, авторизован; промпты —
   по стилю сайтов)
5. Продление LinkedIn-токенов (~ноябрь, /etc/linkedin.env)
6. Хозяйство: apt upgrade + reboot (с августа не обновлялся), чистка
   /root/gh-audit (~3 ГБ), prerender GTT (запущен 05.10)

## 6. Правила безопасности

- Секреты в чат не вставлять (токены читать на сервере, куда надо — сам)
- Старые токены удалять (ghp_nVAP... — отозван)
- Пароль root сменён 05.10; вход только по ключу; парольный SSH выключен
- Сообщать владельцу после каждой публикации: что вышло и где проверить
