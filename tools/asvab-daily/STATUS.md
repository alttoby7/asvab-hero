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
- Remotion project renders end-to-end. 1080×1920 H.264, 23s. Branded emerald
  template: hook → question → countdown → reveal → explanation → CTA end card.
- **Audio default = license-free sound bed** (`public/bed.mp3`: countdown ticks +
  reveal chime, synthesized by `scripts/make-bed.sh`, zero licensing). Voiceover
  is now OPTIONAL (`--voice`, needs ElevenLabs key). Decision: skip VO — on a
  personal TikTok you can add a trending sound in-app; on-screen text carries it.
- **⭐ Batch mode** (`npm run batch 30`) renders a whole month at once →
  `out/batch/clip-NN_<key>.mp4` + `captions.csv` (caption+hashtags per clip),
  auto-interleaves subtests, and records every key in `posted-keys.json` so no
  question ever repeats across batches. Verified with a 3-clip run.
- `scripts/build.mjs` = single clip; `scripts/lib.mjs` = shared helpers.
- **On `main`** and pushed (`origin/main` @ `0600be4`, 2026-06-19). Lives in
  `tools/` so it's isolated from the site build.

## ⚠️ Open / known issues
1. **No voiceover key.** No `ASVAB_ELEVENLABS_API_KEY` in central `.env` yet →
   `--voice` renders silent. Default render uses the license-free sound bed, so
   this only matters if you opt into narration. Add the key (+ optional
   `ASVAB_ELEVENLABS_VOICE_ID`) to enable voice.
2. **No posting yet.** Render only; nothing publishes to TikTok/Reels/Shorts.
   Monthly workflow = `npm run batch 30` → bulk-upload/schedule by hand (free
   native schedulers). API auto-post is the optional later step.

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

## 📺 Channels (live homes for the clips)
- **TikTok:** @asvabhero (`trish@asvabhero.com`) — hand-post to add a trending
  sound, or schedule (~10-day native cap).
- **YouTube:** @ASVABHero — channel `UCjbeA68SyQ3RZWXlilU8QyA`. Bulk-upload +
  schedule a month free in YouTube Studio.
- **Instagram Reels:** not created yet (optional 3rd mirror).
- Set each profile's bio link to `asvabhero.com` (captions say "link in bio").

## ⏭️ Next steps (in order)
1. Land the tool commit on `main`.
2. **Monthly workflow (no API needed):** `npm run batch 30` → bulk-upload the
   clips + paste captions from `captions.csv`:
   - **YouTube Shorts:** schedule a month free in YouTube Studio.
   - **Instagram Reels:** schedule free in Meta Business Suite.
   - **TikTok (@asvabhero, `trish@asvabhero.com`):** native scheduler caps ~10
     days; either schedule in ~3 sittings, use a free tool (Metricool), or
     hand-post to add a trending sound (the only thing scheduling gives up).
3. (Optional) ElevenLabs voiceover: add `ASVAB_ELEVENLABS_API_KEY` to central
   `.env`, run with `--voice`. Best for Word Knowledge/vocab + YouTube only.
4. (Optional, later) full API auto-post + n8n cron on the droplet — only if you
   want zero manual posting and accept baked audio (no trending sound).
5. Sibling **"Score → Jobs"** series (pick score+branch → list jobs from the
   job-by-score data) for variety; rotate with the question series.

## Guardrails
Questions are original (never label "real ASVAB"); rotate hooks/subtests (avoid
"AI slop"); AI voice only, no avatars; education framing only.
