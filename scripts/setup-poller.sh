#!/usr/bin/env bash
# One-time setup for the Telegram command-poller. Run as root on the VPS.
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/Ostap-87/claude-control/main/scripts/setup-poller.sh -o setup-poller.sh
#   bash setup-poller.sh
set -euo pipefail

REPO_DIR="/opt/claude-control"
ENV_FILE="/etc/claude-control.env"
SERVICE_FILE="/etc/systemd/system/claude-control-poller.service"

if [ -f "$ENV_FILE" ]; then
  echo "==> $ENV_FILE уже существует, оставляем как есть"
else
  read -rp "Telegram bot token (для команд): " COMMAND_BOT_TOKEN
  read -rp "Ваш chat_id: " ALLOWED_CHAT_ID
  read -rp "GitHub Personal Access Token (доступ на запись в claude-control): " GH_PAT

  cat >"$ENV_FILE" <<EOF
COMMAND_BOT_TOKEN=${COMMAND_BOT_TOKEN}
ALLOWED_CHAT_ID=${ALLOWED_CHAT_ID}
EOF
  chmod 600 "$ENV_FILE"
fi

if [ -d "$REPO_DIR/.git" ]; then
  echo "==> $REPO_DIR уже склонирован, обновляем"
  cd "$REPO_DIR"
  git fetch origin main
  git checkout main
  git reset --hard origin/main
else
  echo "==> клонируем claude-control"
  read -rp "GitHub Personal Access Token (доступ на запись в claude-control): " GH_PAT
  git clone "https://x-access-token:${GH_PAT}@github.com/Ostap-87/claude-control.git" "$REPO_DIR"
  cd "$REPO_DIR"
fi

# Store the PAT in the remote URL so the poller can push without further
# prompts. If GH_PAT wasn't set above (repo already existed), ask for it
# now so the remote gets refreshed with a working token.
if [ -z "${GH_PAT:-}" ]; then
  read -rp "GitHub Personal Access Token (доступ на запись в claude-control): " GH_PAT
fi
git -C "$REPO_DIR" remote set-url origin "https://x-access-token:${GH_PAT}@github.com/Ostap-87/claude-control.git"
git -C "$REPO_DIR" config user.email "claude-control@localhost"
git -C "$REPO_DIR" config user.name "claude-control poller"

cat >"$SERVICE_FILE" <<EOF
[Unit]
Description=Telegram command poller for claude-control
After=network.target

[Service]
Type=simple
WorkingDirectory=${REPO_DIR}
EnvironmentFile=${ENV_FILE}
ExecStart=/usr/bin/python3 ${REPO_DIR}/scripts/command-poller.py
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable claude-control-poller
systemctl restart claude-control-poller

echo
echo "===================================================================="
echo "Готово. Проверка:"
echo "  systemctl status claude-control-poller --no-pager"
echo "  tail -f /var/log/claude-control-poller.log"
echo "===================================================================="
