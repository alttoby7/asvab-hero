#!/usr/bin/env bash
# Regenerate public/wk-100-words.pdf from scripts/wk-100-words.html
# Run after editing the HTML source. Output is committed (not gitignored)
# so CF Pages serves it without a build step.
set -euo pipefail
cd "$(dirname "$0")/.."
google-chrome --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=public/wk-100-words.pdf \
  "file://$(pwd)/scripts/wk-100-words.html"
echo "Built public/wk-100-words.pdf ($(stat -c%s public/wk-100-words.pdf) bytes)"
