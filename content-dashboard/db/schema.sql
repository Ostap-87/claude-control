-- Content Dashboard schema (read-only observer DB, never written back to source repos/services)

CREATE TABLE IF NOT EXISTS Stream (
  id TEXT PRIMARY KEY,          -- 'blog-aura', 'tg-gtt', 'fb-personal', ...
  channel_type TEXT NOT NULL,   -- blog | telegram | facebook | linkedin
  project TEXT NOT NULL,        -- aura | gtt | personal
  display_name TEXT NOT NULL,
  cadence_json TEXT             -- e.g. {"days":["mon","wed"],"time":"09:30"}, NULL if unscheduled
);

CREATE TABLE IF NOT EXISTS Post (
  id TEXT PRIMARY KEY,
  stream_id TEXT NOT NULL REFERENCES Stream(id),
  title TEXT,
  full_text TEXT,
  media_refs TEXT,               -- JSON array of paths/URLs
  status TEXT NOT NULL,          -- queued | publishing | pending_approval | published | error
  source_ref TEXT,               -- path to source file or slug
  planned_at TEXT,               -- forecast/planned date, if applicable
  published_at TEXT,             -- actual publish timestamp
  detected_at TEXT NOT NULL      -- when the collector first saw this record
);

CREATE INDEX IF NOT EXISTS idx_post_stream ON Post(stream_id);
CREATE INDEX IF NOT EXISTS idx_post_status ON Post(status);

CREATE TABLE IF NOT EXISTS PublicationEvent (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id TEXT NOT NULL REFERENCES Post(id),
  event_type TEXT NOT NULL,      -- queued | publishing | sent | published | error
  event_at TEXT NOT NULL,
  source TEXT NOT NULL,          -- collector | webhook
  raw_payload TEXT               -- JSON, for debugging
);

CREATE INDEX IF NOT EXISTS idx_event_post ON PublicationEvent(post_id);

CREATE TABLE IF NOT EXISTS ChannelStats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  stream_id TEXT NOT NULL REFERENCES Stream(id),
  date TEXT NOT NULL,
  reach INTEGER,
  impressions INTEGER,
  likes INTEGER,
  comments INTEGER,
  shares INTEGER,
  clicks INTEGER,
  followers_delta INTEGER,
  source TEXT NOT NULL,          -- ga | metrika | graph_api | manual
  raw_payload TEXT
);

CREATE INDEX IF NOT EXISTS idx_stats_stream_date ON ChannelStats(stream_id, date);

CREATE TABLE IF NOT EXISTS CompetitorSite (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  crawl_method TEXT NOT NULL,    -- rss | sitemap | firecrawl_monitor
  last_crawled_at TEXT
);

CREATE TABLE IF NOT EXISTS CompetitorArticle (
  id TEXT PRIMARY KEY,
  competitor_id TEXT NOT NULL REFERENCES CompetitorSite(id),
  source_url TEXT NOT NULL,
  title TEXT,
  full_text TEXT,
  published_at TEXT,
  loaded_at TEXT NOT NULL,
  ai_summary TEXT,
  topics TEXT,                   -- JSON array
  tone TEXT,
  seo_notes TEXT                 -- JSON
);

CREATE INDEX IF NOT EXISTS idx_article_competitor ON CompetitorArticle(competitor_id);
