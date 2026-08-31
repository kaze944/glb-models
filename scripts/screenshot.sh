#!/usr/bin/env bash
# Thin wrapper kept for convenience. The real driver is screenshot.mjs.
#
#   ./scripts/screenshot.sh <url> <output.png> [width] [height] [extra flags...]
#
# Examples:
#   ./scripts/screenshot.sh http://localhost:3000 /tmp/desktop.png 1440 900 --full
#   ./scripts/screenshot.sh http://localhost:3000 /tmp/mobile.png 390 844 --mobile --full

set -euo pipefail

URL="${1:-http://localhost:3000}"
OUT="${2:-/tmp/shot.png}"
WIDTH="${3:-1440}"
HEIGHT="${4:-900}"
shift 4 2>/dev/null || shift $# || true

exec node "$(dirname "$0")/screenshot.mjs" "${URL}" "${OUT}" \
  --width="${WIDTH}" --height="${HEIGHT}" "$@"
