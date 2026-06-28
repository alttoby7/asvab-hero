#!/usr/bin/env bash
# Regenerate public/ar-formula-card.pdf from scripts/ar-formula-card.html
# Run after editing the HTML source. Output is committed (not gitignored)
# so CF Pages serves it without a build step.
set -euo pipefail
cd "$(dirname "$0")/.."
google-chrome --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=public/ar-formula-card.pdf \
  "file://$(pwd)/scripts/ar-formula-card.html"
echo "Built public/ar-formula-card.pdf ($(stat -c%s public/ar-formula-card.pdf) bytes)"
