#!/usr/bin/env python3
"""Long-polls the Telegram control bot for messages from ALLOWED_CHAT_ID,
writing each one to commands/inbox/<update_id>.json and pushing to GitHub
so Claude can pick it up on its next scheduled check (git pull).

Also, once per loop iteration (~every 25-35s), pulls the repo and sends
any files it finds in commands/outbox/ back to the same chat — this is
how Claude confirms a command was handled, since it can't reach the
Telegram API directly from its own sandboxed session.

Runs as a systemd service; REPO_DIR is a persistent local clone with a
push-capable remote (PAT baked into the remote URL by setup-poller.sh).
"""
import json
import os
import subprocess
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from telegram_client import get_updates, publish_outbox_item

REPO_DIR = "/opt/claude-control"
BOT_TOKEN = os.environ["COMMAND_BOT_TOKEN"]
ALLOWED_CHAT_ID = int(os.environ["ALLOWED_CHAT_ID"])
OFFSET_FILE = "/var/lib/claude-control/offset.txt"
LOG_PATH = "/var/log/claude-control-poller.log"


def log(msg):
    line = f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {msg}"
    print(line, flush=True)
    with open(LOG_PATH, "a") as f:
        f.write(line + "\n")


def git(*args):
    result = subprocess.run(["git", *args], cwd=REPO_DIR, capture_output=True, text=True)
    if result.returncode != 0:
        log(f"git {' '.join(args)} failed: {result.stderr.strip()}")
    return result


def load_offset():
    if os.path.exists(OFFSET_FILE):
        with open(OFFSET_FILE) as f:
            return int(f.read().strip() or 0)
    return None


def save_offset(offset):
    os.makedirs(os.path.dirname(OFFSET_FILE), exist_ok=True)
    with open(OFFSET_FILE, "w") as f:
        f.write(str(offset))


def commit_and_push(message):
    git("add", "-A")
    result = subprocess.run(["git", "diff", "--cached", "--quiet"], cwd=REPO_DIR)
    if result.returncode == 0:
        return  # nothing staged
    git("commit", "-m", message)
    git("push", "origin", "main")


def handle_incoming(updates):
    if not updates:
        return
    inbox_dir = os.path.join(REPO_DIR, "commands", "inbox")
    os.makedirs(inbox_dir, exist_ok=True)
    wrote_any = False
    for update in updates:
        message = update.get("message")
        if not message:
            continue
        chat_id = message.get("chat", {}).get("id")
        if chat_id != ALLOWED_CHAT_ID:
            log(f"Ignored message from unauthorized chat_id={chat_id}")
            continue
        text = message.get("text")
        if not text:
            continue
        item = {
            "update_id": update["update_id"],
            "message_id": message.get("message_id"),
            "date": message.get("date"),
            "text": text,
        }
        path = os.path.join(inbox_dir, f"{update['update_id']}.json")
        with open(path, "w") as f:
            json.dump(item, f, ensure_ascii=False, indent=2)
        log(f"Wrote commands/inbox/{update['update_id']}.json")
        wrote_any = True
    if wrote_any:
        commit_and_push("New command(s) from Telegram")


def handle_outbox():
    git("pull", "origin", "main")
    outbox_dir = os.path.join(REPO_DIR, "commands", "outbox")
    sent_dir = os.path.join(REPO_DIR, "commands", "sent")
    if not os.path.isdir(outbox_dir):
        return
    os.makedirs(sent_dir, exist_ok=True)
    moved_any = False
    for filename in sorted(os.listdir(outbox_dir)):
        if not filename.endswith(".json"):
            continue
        path = os.path.join(outbox_dir, filename)
        with open(path) as f:
            item = json.load(f)
        text = item.get("text")
        image_url = item.get("image")
        if text or image_url:
            ok, detail = publish_outbox_item(BOT_TOKEN, ALLOWED_CHAT_ID, text, image_url)
            log(f"outbox[{filename}]: {'OK' if ok else 'FAILED — ' + detail}")
            if not ok:
                continue  # leave it in outbox, retry next loop
        os.rename(path, os.path.join(sent_dir, filename))
        moved_any = True
    if moved_any:
        commit_and_push("Mark outbox message(s) as sent")


def main():
    log("command-poller starting")
    offset = load_offset()
    while True:
        try:
            updates = get_updates(BOT_TOKEN, offset=offset, timeout=25)
            if updates:
                offset = updates[-1]["update_id"] + 1
                save_offset(offset)
                handle_incoming(updates)
        except Exception as e:
            log(f"getUpdates error: {e}")
            time.sleep(5)
            continue

        try:
            handle_outbox()
        except Exception as e:
            log(f"outbox error: {e}")


if __name__ == "__main__":
    main()
