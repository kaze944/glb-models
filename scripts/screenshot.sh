#!/usr/bin/env bash
# Headless screenshot helper for visual QA.
#
#   ./scripts/screenshot.sh <url> <output.png> [width] [height]
#
# Example:
#   ./scripts/screenshot.sh http://localhost:3000 /tmp/desktop.png 1440 2600
#   ./scripts/screenshot.sh http://localhost:3000 /tmp/mobile.png 390 2400

set -euo pipefail

URL="${1:-http://localhost:3000}"
OUT="${2:-/tmp/shot.png}"
WIDTH="${3:-1440}"
HEIGHT="${4:-2400}"

google-chrome \
  --headless=new \
  --disable-gpu \
  --no-sandbox \
  --hide-scrollbars \
  --force-device-scale-factor=1 \
  --virtual-time-budget=6000 \
  --window-size="${WIDTH},${HEIGHT}" \
  --screenshot="${OUT}" \
  "${URL}" >/dev/null 2>&1

echo "Saved ${OUT} (${WIDTH}x${HEIGHT})"
