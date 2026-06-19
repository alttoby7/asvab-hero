# ASVAB Daily — automated faceless Short generator

Generates one vertical (1080×1920) ASVAB question-challenge video from the live
`practice_questions` bank, with an ElevenLabs voiceover. Faceless, no filming —
built to run unattended on a daily cron (n8n) and cross-post to
**TikTok (@asvabhero)** + Instagram Reels + YouTube Shorts.

## Quick start

```bash
npm install
npm run make            # build (pick question + VO) then render -> out/video.mp4
# or, step by step:
npm run build           # pick a question, synth VO, write out/props.json
npm run still           # render one preview frame -> out/preview.png
npm run render          # render the MP4 -> out/video.mp4
npm run studio          # open Remotion Studio to tweak the template
```

Pin a specific question: `node scripts/build.mjs ar-3`

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
