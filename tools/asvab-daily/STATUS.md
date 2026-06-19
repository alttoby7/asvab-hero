# ASVAB Daily — STATUS / PICK UP HERE

_Last updated: 2026-06-18_

## What this is
Fully-automated **faceless** ASVAB short-form video generator. Pulls a question
from the live `practice_questions` bank → writes narration → (ElevenLabs voice)
→ renders a 1080×1920 MP4 via Remotion. Built to run unattended daily and
cross-post to **TikTok @asvabhero** + IG Reels + YouTube Shorts. (Owner does NOT
appear on camera; AI voice only, no AI avatars.)

This is the execution of the "short-form engine" in
`apps/web/docs/social-channel-strategy-2026-06.md`.

## ✅ Done & verified
- Remotion project scaffolded + renders end-to-end. Sample: MK-12, 1080×1920
  H.264, 20.5s (`out/video.mp4`). Branded emerald template:
  hook → question → countdown → reveal → explanation → CTA end card.
- `scripts/build.mjs` pulls a screen-friendly question via Supabase REST and
  writes `out/props.json`; reads secrets from central `0-AI/.env`.
- Committed on branch **`mobile/phase2-study-loop`** (NOT main — see below).

## ⚠️ Open / known issues
1. **Wrong branch.** Repo was on `mobile/phase2-study-loop` when committed.
   It's in `tools/` (not part of the site build) so it belongs on `main`.
   → cherry-pick the tool commit onto `main`.
2. **Silent.** No `ASVAB_ELEVENLABS_API_KEY` in central `.env` yet → renders
   without audio. Add the key (+ optional `ASVAB_ELEVENLABS_VOICE_ID`) for voice.
3. **No posting yet.** Render only; nothing publishes to TikTok/Reels/Shorts.

## ▶️ Pick up — run it on any machine
```bash
cd <repo>/tools/asvab-daily
npm install
npm run make          # build (pick Q + VO) + render -> out/video.mp4
# preview a frame without full render:
npm run build && npm run still   # -> out/preview.png
node scripts/build.mjs ar-3      # pin a specific question by external_key
```
Needs: Node 22, central `0-AI/.env` synced (Google Drive) or `CENTRAL_ENV` set.
Remotion auto-downloads its headless browser on first render.

## ⏭️ Next steps (in order)
1. Add `ASVAB_ELEVENLABS_API_KEY` to central `.env` → re-render voiced. *(owner)*
2. Land the tool commit on `main`.
3. **Posting integration** — Ayrshare / Blotato / Upload-Post API → TikTok
   @asvabhero + Reels + Shorts (templated caption + #asvab #miltok #fyp +
   bio link). Account email: `trish@asvabhero.com`.
4. **Deploy to droplet + n8n daily cron** (n8n.basecampdigital.pro) — the real
   "runs anywhere, no laptop" layer. Chain: build.mjs → render → post → log
   (track posted external_keys to avoid repeats).
5. Add the sibling **"Score → Jobs"** series (pick score+branch → list jobs
   from the job-by-score data) for variety; rotate with the question series.

## Guardrails
Questions are original (never label "real ASVAB"); rotate hooks/subtests (avoid
"AI slop"); AI voice only, no avatars; education framing only.
