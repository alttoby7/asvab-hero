#!/usr/bin/env bash
# Regenerate public/pc-trap-patterns.pdf from scripts/pc-trap-patterns.html
# Run after editing the HTML source. Output is committed (not gitignored)
# so CF Pages serves it without a build step.
set -euo pipefail
cd "$(dirname "$0")/.."
google-chrome --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=public/pc-trap-patterns.pdf \
  "file://$(pwd)/scripts/pc-trap-patterns.html"
echo "Built public/pc-trap-patterns.pdf ($(stat -c%s public/pc-trap-patterns.pdf) bytes)"
