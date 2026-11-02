#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

# Build on the Mac; the server only serves the resulting static files.
# The light build uses the existing avatar instead of downloading OG fonts.
npm run build:light

release="$(date -u +%Y%m%dT%H%M%SZ)-$(git rev-parse --short HEAD)"
archive="$(mktemp -t romanychev-ton)"
trap 'rm -f "$archive"' EXIT
COPYFILE_DISABLE=1 tar --no-xattrs -czf "$archive" -C dist .

target="${TON_DEPLOY_TARGET:-root@129.101.126.88}"
ssh_args=(-o BatchMode=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=15)
if [[ -n "${TON_DEPLOY_KEY:-}" ]]; then
    ssh_args+=(-i "$TON_DEPLOY_KEY" -o IdentitiesOnly=yes)
fi

ssh "${ssh_args[@]}" "$target" "mkdir -p /var/www/romanychev.ton/releases/$release"
ssh "${ssh_args[@]}" "$target" "tar -xzf - -C /var/www/romanychev.ton/releases/$release && chmod -R a+rX /var/www/romanychev.ton/releases/$release && test -s /var/www/romanychev.ton/releases/$release/index.html" < "$archive"
ssh "${ssh_args[@]}" "$target" "ln -s releases/$release /var/www/romanychev.ton/current.next && mv -Tf /var/www/romanychev.ton/current.next /var/www/romanychev.ton/current && curl --fail --silent --output /dev/null http://127.0.0.1:8080/ && curl --fail --silent --output /dev/null http://127.0.0.1:8080/avatar.jpg && curl --fail --silent --output /dev/null http://127.0.0.1:8080/toggle-lang.js"

echo "Published release: $release"
