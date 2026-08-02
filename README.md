# claude-control

Command channel between a private Telegram bot and Claude, used to give
Claude tasks (write an article, publish something, check status) without
opening a chat session directly. Not a website — no build, no deploy.

## How it works

- `scripts/command-poller.py` runs as a systemd service on the VPS
  (`80.78.245.43`), long-polling the Telegram bot for messages from one
  allowed chat_id. Each message becomes a file in `commands/inbox/`,
  committed and pushed here.
- Claude (in a hourly scheduled session) does `git pull`, reads new
  files in `commands/inbox/`, acts on them, then moves each to
  `commands/processed/` with the outcome recorded, and pushes.
- To reply back to the Telegram chat (since Claude's own session can't
  reach the Telegram API directly), Claude writes a file to
  `commands/outbox/` with `{"text": "..."}`. The same poller service
  picks it up (~every 25-35s), sends it, and moves it to `commands/sent/`.

## Setup (one-time, on the VPS)

```
curl -fsSL https://raw.githubusercontent.com/Ostap-87/claude-control/main/scripts/setup-poller.sh -o setup-poller.sh
bash setup-poller.sh
```
