#!/usr/bin/env bash
# Regenerate public/study-plan.pdf from scripts/study-plan.html
# Run after editing the HTML source. Output is committed (not gitignored)
# so CF Pages serves it without a build step.
set -euo pipefail
cd "$(dirname "$0")/.."
google-chrome --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=public/study-plan.pdf \
  "file://$(pwd)/scripts/study-plan.html"
echo "Built public/study-plan.pdf ($(stat -c%s public/study-plan.pdf) bytes)"
