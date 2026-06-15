#!/usr/bin/env bash
# Regenerate public/asvab-at-a-glance.pdf from scripts/asvab-at-a-glance.html
# Run after editing the HTML source. Output is committed (not gitignored)
# so CF Pages serves it without a build step.
set -euo pipefail
cd "$(dirname "$0")/.."
google-chrome --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=public/asvab-at-a-glance.pdf \
  "file://$(pwd)/scripts/asvab-at-a-glance.html"
echo "Built public/asvab-at-a-glance.pdf ($(stat -c%s public/asvab-at-a-glance.pdf) bytes)"
