#!/usr/bin/env bash
# Backs up everything on this VPS that is NOT tracked in git and would be
# needed to rebuild the server from scratch (secrets, publish-history DBs,
# SSL certs, systemd units, nginx config, cron, swap/fstab entry).
# Run as root. Produces one timestamped tar.gz in the current directory.
#
# The 3 git repos (sinotech, aura, claude-control) are NOT included here —
# they are already fully backed up by GitHub itself (full history, every
# commit). This script only covers server-local state that git can't see.
set -euo pipefail

OUT="server-backup-$(hostname)-$(date -u +%Y%m%dT%H%M%SZ).tar.gz"
STAGE=$(mktemp -d)

echo "Staging into $STAGE ..."

mkdir -p "$STAGE/etc-env"
for f in /etc/aura-lead.env /etc/aura-telegram.env /etc/claude-control.env \
         /etc/content-publish.env /etc/globaltechtour-lead.env \
         /etc/globaltechtour-webhook.env /etc/linkedin.env; do
  [ -f "$f" ] && cp "$f" "$STAGE/etc-env/" || echo "WARN: missing $f"
done

mkdir -p "$STAGE/var-lib-content-publish"
if [ -d /var/lib/content-publish ]; then
  cp -a /var/lib/content-publish/. "$STAGE/var-lib-content-publish/"
else
  echo "WARN: /var/lib/content-publish missing"
fi

mkdir -p "$STAGE/claude-control-state"
[ -f /var/lib/claude-control/offset.txt ] && cp /var/lib/claude-control/offset.txt "$STAGE/claude-control-state/"

mkdir -p "$STAGE/systemd-units"
for u in gh-webhook aura aura-deploy-webhook content-publish \
         claude-control-poller globaltechtour-lead; do
  f="/etc/systemd/system/${u}.service"
  [ -f "$f" ] && cp "$f" "$STAGE/systemd-units/" || echo "WARN: missing $f"
done

mkdir -p "$STAGE/nginx"
cp -a /etc/nginx/sites-available "$STAGE/nginx/" 2>/dev/null || true

mkdir -p "$STAGE/letsencrypt"
[ -d /etc/letsencrypt ] && cp -a /etc/letsencrypt "$STAGE/letsencrypt/" || echo "WARN: no letsencrypt dir"

crontab -l > "$STAGE/crontab.txt" 2>/dev/null || echo "(empty crontab)" > "$STAGE/crontab.txt"

grep -E "swapfile|swap" /etc/fstab > "$STAGE/fstab-swap.txt" 2>/dev/null || true

ufw status verbose > "$STAGE/ufw-status.txt" 2>/dev/null || true

# Non-git media directories (generated covers/tg-media that live OUTSIDE
# each site's repo checkout, so a redeploy's git reset --hard can't wipe them)
mkdir -p "$STAGE/media-dirs"
[ -d /var/www/globaltechtour-media ] && cp -a /var/www/globaltechtour-media "$STAGE/media-dirs/"
[ -d /var/www/aura-media ] && cp -a /var/www/aura-media "$STAGE/media-dirs/"

# Which commit each site is actually running right now, for cross-check
mkdir -p "$STAGE/deployed-commits"
for repo_path in /var/www/globaltechtour /opt/aura /opt/claude-control; do
  if [ -d "$repo_path/.git" ]; then
    name=$(basename "$repo_path")
    (cd "$repo_path" && git log -1 --oneline) > "$STAGE/deployed-commits/${name}.txt" 2>&1
  fi
done

tar -czf "$OUT" -C "$STAGE" .
rm -rf "$STAGE"

echo ""
echo "Done: $OUT ($(du -h "$OUT" | cut -f1))"
echo "Contains secrets (.env files, TLS private keys) — store it somewhere"
echo "encrypted/private (NOT in a public git repo). Recommended: download it"
echo "off this VPS immediately (scp) and delete the local copy after."
