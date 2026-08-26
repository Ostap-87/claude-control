# Перенос сервера — полная инвентаризация старого VPS

Снято 26.08.2026 со старого сервера `root@80.78.245.43` (Ubuntu 26.04 LTS, 956 МБ RAM, 8.55 ГБ диска, забит на 93.6%).
Используется как чек-лист при переносе на новый сервер.

## Сайты и сервисы (7 systemd-юнитов + nginx)

| Сервис | Что делает | Рабочая директория | Порт |
|---|---|---|---|
| `nginx.service` | reverse proxy + статика | — | 80/443 |
| `gh-webhook.service` | деплой GlobalTechTour по пушу в GitHub | `/var/www/globaltechtour` | 9000 |
| `content-publish.service` | генерация статей (topic → article → соцсети) | `/var/www/globaltechtour` | 9002 |
| `aura.service` | сам сайт Aura Robotics (**Next.js app**, не статика!) | `/opt/aura` | 3000 |
| `aura-deploy-webhook.service` | деплой Aura по пушу в GitHub | `/opt/aura` | 9001 |
| `claude-control-poller.service` | опрос команд Telegram + доставка `tg-publish/` | `/opt/claude-control` | — |
| `globaltechtour-lead.service` | приём лидов с формы сайта GTT + отправка в LinkedIn (`lead-intake.py`, читает `globaltechtour-lead.env` и `linkedin.env`) | `/var/www/globaltechtour/scripts` | — |

```ini
[Unit]
Description=Global Tech Tour lead-capture backend
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/globaltechtour/scripts
EnvironmentFile=/etc/globaltechtour-lead.env
ExecStart=/usr/bin/python3 /var/www/globaltechtour/scripts/lead-intake.py
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Плюс cron: `0 3 * * 1 /usr/bin/bash /opt/aura/scripts/deploy.sh` (еженедельный принудительный редеплой Aura, пн 3:00 UTC).

Все остальные таймеры (`apt-daily`, `certbot`, `logrotate`, `fstrim`, `sysstat`, `man-db`) — стандартные системные, ничего специфичного, на новом сервере появятся сами после установки Ubuntu.

## 3 сайта на сервере (не 2!)

1. **globaltechtour.ru** — статика (Vite+React SPA с пререндером), `/var/www/globaltechtour/dist`
2. **aura-robotics.ru** — Next.js-приложение, живой процесс на порту 3000 из `/opt/aura`
3. **ostapdotcenko.ru** — личный сайт, статика в `/var/www/ostapdotcenko.ru`

Мёртвый груз (не переносить): `/var/www/aura-robotics.ru` — старая статическая версия Aura с 10 июня, давно не используется (nginx проксирует на `:3000`, а не сюда).

## Что копируется автоматически (через git) — не требует ручной работы

- Код GlobalTechTour: `github.com/Ostap-87/sinotech` (ветки `main` + `claude/sinotech-voyage-setup`)
- Код Aura: `github.com/Ostap-87/aura` (ветка `main`)
- Код claude-control: `github.com/Ostap-87/claude-control` (ветка `main`)
- `node_modules`, `dist/`, `.next/` — НЕ переносить руками, пересоздаются командами `npm install` + `npm run build` на новом сервере (это и есть большая часть текущих 988 МБ `/var/www/globaltechtour` и 1.3 ГБ `/opt/aura` — реального уникального веса там немного)

## Что нужно скопировать вручную (не в git)

### 1. Секреты — `.env`-файлы (7 штук, `/etc/*.env`, режим 600 root:root)
Содержимое этих файлов я никогда не видел и не запрашивал — их нужно скопировать самостоятельно (`scp` напрямую со старого сервера на новый, либо через безопасный канал):

- `/etc/aura-lead.env` — читает `aura.service` (переменные для рантайма Aura)
- `/etc/aura-telegram.env` — токен Telegram-бота Aura
- `/etc/claude-control.env` — читает `claude-control-poller.service`
- `/etc/content-publish.env` — читает `content-publish.service`
- `/etc/globaltechtour-lead.env` — читает `globaltechtour-lead.service` (приём лидов)
- `/etc/globaltechtour-webhook.env` — читает `gh-webhook.service`
- `/etc/linkedin.env` — тоже читает `lead-intake.py` (тот же `globaltechtour-lead.service`) — отправка лидов/контента в LinkedIn

### 2. Секрет внутри unit-файла (не в `.env`!)
`aura-deploy-webhook.service` содержит `WEBHOOK_SECRET=e110-0923-6114-2c3d-9ab1-206d` прямо в тексте юнита.
**Рекомендация**: сгенерировать новый секрет на новом сервере и обновить его синхронно в systemd-юните и в настройках GitHub webhook для репозитория Aura — старый засветился в переписке с ассистентом.

### 3. Генерируемые медиа-файлы (обложки блога/ТГ, вне git специально, чтобы деплой их не стирал)
- `/var/www/aura-media/` — 13 МБ
- `/var/www/globaltechtour-media/` — 51 МБ

Внутри — 6 GTT + 1 Aura файл дублируют то, что уже закоммичено в `public/covers/` (перенесены в git 26.08.2026, см. коммиты `d079bb0`/`173320f`). Ещё 4 файла (3 GTT + 1 Aura) **опциональны** — проверено 26.08.2026: ни один не упоминается ни в `site_content.example.json`, ни в `aura/content/blog/` ни одной живой статьёй, значит на сайте на них ничего не ссылается и от их потери ничего не сломается. Список опциональных (можно не переносить):
- `cover-china-beauty-retail-2026-08-05.png` (GTT)
- `kuaishou-douyin-livestream-commerce-china.png` (GTT)
- `miniso-global-retail-expansion.png` (GTT)
- `cover-humanoid-factory-2026-08-05.png` (Aura)

### 4. Личный сайт
- `/var/www/ostapdotcenko.ru/` — 120 КБ (не в git вообще, проверить, есть ли у него отдельный репозиторий)

### 5. SSL-сертификаты
4 сертификата Let's Encrypt/certbot: `aura-robotics.ru`, `globaltechtour.ru` (+ .com + www), `ostapdotcenko.ru`, `www.ostapdotcenko.ru`.
**Не копировать вручную** — на новом сервере проще перевыпустить заново через `certbot --nginx` после переключения DNS (это бесплатно и занимает пару минут на домен).

## Версии окружения (поставить те же на новом сервере)
- Node.js **v20.20.2**, npm **10.8.2**
- Python **3.14.4**

## Порядок переноса (рекомендуемый)

1. Установить на новом сервере: Node 20, Python 3.14, nginx, certbot, git.
2. Склонировать все 3 репозитория (sinotech, aura, claude-control) в те же пути (`/var/www/globaltechtour`, `/opt/aura`, `/opt/claude-control`).
3. `npm install` + сборка в каждом (GlobalTechTour: `npm run build` с пререндером; Aura: `npm run build` для Next.js).
4. Скопировать вручную: 7 `.env`-файлов, медиа-папки (`aura-media`, `globaltechtour-media`), личный сайт `ostapdotcenko.ru`.
5. Создать все 7 systemd-юнитов (тексты выше), сгенерировать новый `WEBHOOK_SECRET` для Aura и обновить его на GitHub.
6. Настроить nginx (конфиги сняты полностью — см. историю чата от 26.08.2026), пока БЕЗ SSL — на HTTP, чтобы проверить, что всё поднялось.
7. Прогнать полную проверку на новом сервере через IP (curl с `Host:` заголовком или временную запись в `/etc/hosts` на своей машине) — все 3 сайта, все 7 сервисов.
8. Только когда всё проверено — переключить DNS A-записи (`globaltechtour.ru`, `aura-robotics.ru`, `ostapdotcenko.ru`) на IP нового сервера.
9. После распространения DNS — выпустить SSL через `certbot --nginx` на новом сервере для всех доменов.
10. Настроить cron (еженедельный `aura/scripts/deploy.sh`).
11. Убедиться, что своп-файл настроен (если новый сервер тоже с небольшим RAM — см. `editorial-policy.md`/историю про `CONCURRENCY = 2` в `prerender.mjs`, менять нельзя).
12. Погонять неделю на старом+новом параллельно (DNS TTL истечёт не сразу), затем выключить сервисы на старом сервере.

## Открытые вопросы — закрыто
Все секреты, сервисы и зависимости учтены (7/7 systemd-юнитов, 7/7 `.env`-файлов сопоставлены сервисам). `ostapdotcenko.ru` подтверждён без git — при переносе просто копируется каталог целиком.
