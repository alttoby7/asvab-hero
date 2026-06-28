# ASVAB Daily — automated faceless Short generator

Generates one vertical (1080×1920) ASVAB question-challenge video from the live
`practice_questions` bank, with an ElevenLabs voiceover. Faceless, no filming —
built to run unattended on a daily cron (n8n) and cross-post to
**TikTok (@asvabhero)** + Instagram Reels + YouTube Shorts.

## Quick start

```bash
npm install

# --- a whole month at once (the main workflow) ---
npm run batch 30        # render 30 clips -> out/batch/ + captions.csv

# --- a single clip ---
npm run make            # build + render -> out/video.mp4
npm run build && npm run still   # just preview one frame -> out/preview.png
node scripts/build.mjs ar-3      # pin a specific question by external_key
node scripts/build.mjs --voice   # ElevenLabs narration instead of sound bed
npm run bed             # (re)generate the license-free sound bed
npm run studio          # open Remotion Studio to tweak the template
```

### Audio
Default = `public/bed.mp3`, a synthesized **license-free** bed (countdown ticks +
reveal chime). No voiceover needed — on a personal TikTok you add a trending
sound in-app. `--voice` swaps in an ElevenLabs narration (needs the key).

### Monthly publishing (no API required)
`npm run batch 30` makes the files + `out/batch/captions.csv`. Then:
- **YouTube Shorts** — bulk upload + schedule a month in YouTube Studio (free).
- **Instagram Reels** — schedule in Meta Business Suite (free).
- **TikTok** — native scheduler ~10 days max; schedule in sittings, use a free
  tool (Metricool), or hand-post to add a trending sound.

`posted-keys.json` records every question used so batches never repeat.

## Secrets (central 0-AI/.env)

| key | required | purpose |
|---|---|---|
| `ASVABHERO_SUPABASE_URL` | yes | question bank |
| `ASVABHERO_SUPABASE_SECRET_KEY` | yes | question bank (service role) |
| `ASVAB_ELEVENLABS_API_KEY` | no* | voiceover (omit = silent render) |
| `ASVAB_ELEVENLABS_VOICE_ID` | no | defaults to Rachel `21m00Tcm4TlvDq8ikWAM` |

\* Without the ElevenLabs key the video renders **silent** (visuals only) so you
can preview the template before wiring audio.

## How it fits the pipeline

`build.mjs` (pick + script + VO) → Remotion render (`out/video.mp4`) →
[posting step: TODO — Ayrshare/Blotato/Upload-Post to TikTok+Reels+Shorts] →
log. Orchestrate the whole chain from a daily n8n cron.

## Guardrails

- Questions come from the verified bank — never label clips "real ASVAB questions".
- Rotate hooks/subtests (build.mjs randomizes) to avoid repetitive "AI slop".
- AI voiceover only; no AI avatars (trust-sensitive teen/military niche).
