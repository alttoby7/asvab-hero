#!/usr/bin/env bash
# Regenerate public/gt-booster-guide.pdf from scripts/gt-booster-guide.html
# Run after editing the HTML source. Output is committed (not gitignored)
# so CF Pages serves it without a build step.
set -euo pipefail
cd "$(dirname "$0")/.."
google-chrome --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=public/gt-booster-guide.pdf \
  "file://$(pwd)/scripts/gt-booster-guide.html"
echo "Built public/gt-booster-guide.pdf ($(stat -c%s public/gt-booster-guide.pdf) bytes)"
