# video-content — видео из туров и про роботов

Отдельное хранилище для видео-контента, чтобы не путать с обычными текстовыми
черновиками в `data/drafts/`. Здесь лежат не сами видеофайлы (исходники —
на Google Drive, финальные сжатые версии — в `public/tg-media/` репозитория
сайта SINOTECH/AURA, НЕ на VPS — VPS-диск и так почти заполнен, а видео к
сайту отношения не имеет, публикуется напрямую в Telegram), а
карточки-заявки: текст статьи/поста + ссылка на исходник + статус обработки.

## Структура

```
video-content/
  globaltechtour/
    <slug>.json
  aura/
    <slug>.json
```

Одна карточка = одно видео = одна публикация (статья блога и/или TG-пост,
см. поле `publish_as`).

## Формат карточки

```json
{
  "id": "<slug>",
  "drive_link": "https://drive.google.com/...",
  "status": "pending",
  "publish_as": ["blog", "tg"],
  "title_ru": "",
  "title_en": "",
  "description_ru": "",
  "description_en": "",
  "tags": [],
  "final_video_url": null,
  "thumbnail_url": null,
  "notes": ""
}
```

- `status`: `pending` (только ссылка на Drive, текст ещё не написан) →
  `reviewed` (видео просмотрено, текст готов, ждёт сжатия) → `hosted`
  (сжатая версия залита в `public/tg-media/` репозитория сайта,
  `final_video_url` заполнен) → `published`.
- `publish_as`: где публикуется — `blog` (статья на сайте), `tg`
  (Telegram-пост), можно оба сразу.
- Текст (`description_ru`/`description_en`) пишется ТОЛЬКО по реальному
  содержанию видео (после просмотра) — не выдумывать, что происходит в
  кадре, см. общее правило редполитики про факты.

## Процесс

1. Пользователь заливает исходное видео на Google Drive (в папку для
   соответствующего канала) и присылает ссылку.
2. Создаётся карточка здесь со `status: "pending"` и заполненным
   `drive_link`.
3. Видео скачивается и просматривается, пишется текст, `status` →
   `"reviewed"`.
4. Видео сжимается через ffmpeg под ~50 МБ (лимит Telegram Bot API на
   прямую загрузку видео) и заливается в `public/tg-media/` репозитория
   соответствующего сайта (SINOTECH/AURA), коммитится и пушится в `main` —
   без участия VPS. `final_video_url` = стабильная
   `https://raw.githubusercontent.com/Ostap-87/<sinotech|aura>/main/public/tg-media/<filename>.mp4`,
   доступна сразу после пуша. `status` → `"hosted"`.
5. После согласования с пользователем — публикация (статья в блог и/или
   TG-пост со `sendVideo` по `final_video_url`), `status` → `"published"`.
