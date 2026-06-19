#!/usr/bin/env bash
# Regenerate the license-free sound bed (public/bed.mp3): a silent 20.5s base
# with three countdown ticks (5.5/6.5/7.5s) and a two-tone reveal chime (8.5s),
# timed to the QuestionShort visual timeline. 100% synthesized — no licensing.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public
ffmpeg -y -loglevel error \
  -f lavfi -i "anullsrc=r=44100:cl=mono:d=20.5" \
  -f lavfi -i "sine=frequency=1100:duration=0.07" \
  -f lavfi -i "sine=frequency=1100:duration=0.07" \
  -f lavfi -i "sine=frequency=1100:duration=0.07" \
  -f lavfi -i "sine=frequency=784:duration=0.55" \
  -f lavfi -i "sine=frequency=1175:duration=0.55" \
  -filter_complex "\
[1]adelay=5500|5500,volume=0.45[t1];\
[2]adelay=6500|6500,volume=0.45[t2];\
[3]adelay=7500|7500,volume=0.45[t3];\
[4]adelay=8500|8500,afade=t=out:st=0.15:d=0.4,volume=0.55[d1];\
[5]adelay=8500|8500,afade=t=out:st=0.15:d=0.4,volume=0.35[d2];\
[0][t1][t2][t3][d1][d2]amix=inputs=6:normalize=0,alimiter=limit=0.9[a]" \
  -map "[a]" -c:a libmp3lame -q:a 5 public/bed.mp3
echo "✅ public/bed.mp3"
