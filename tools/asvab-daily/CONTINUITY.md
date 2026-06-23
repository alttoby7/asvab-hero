# ASVAB Daily Shorts — Continuity (2026-06-22)

## What This Is
Remotion-based video pipeline generating ASVAB quiz short-form videos (1080x1920, 33s @ 30fps) for TikTok + YouTube Shorts. Located at `~/dev/asvab-hero/tools/asvab-daily/`.

## Current State (as of 2026-06-22)

### Timeline (finalized)
Codex (gpt-5.4) audited the video timing and recommended a rebalance. Constants in `src/QuestionShort.tsx` lines 22-28:
- HOOK_END = 45 (1.5s hook)
- COUNTDOWN_START = 345 (10.0s to read question — up from 7.5s)
- REVEAL = 420 (14.0s answer reveals)
- EXPLAIN_START = 495 (16.5s explanation panel — answer sits 2.5s before explanation)
- CTA_START = 930 (31.0s end card)
- Total = 990 frames (33s); explanation holds 14.5s

### Caption fix (done)
"Practice 4,500+ questions free" was misleading (not all free). Changed to:
- Caption: "Free score calculator + practice — link in bio."
- Narration: "Free score calculator and practice at ASVAB Hero. Link in bio."
- In `scripts/lib.mjs` functions `buildCaption()` and `buildScript()`

### Audio bed (done)
- `public/bed.mp3`: 35s, 128kbps, -40.8 dB mean (was -48 dB @ 32kbps), looped+boosted, silent intro trimmed
- Original backed up as `public/bed-original-23s.mp3`
- All 30 clips re-rendered with fixed audio (-38.7 dB verified)

### Clip Reorder (done — 2026-06-21)
All 30 clips reordered for strategic posting: broad-appeal subtests first, niche subtests later.
- Clips 1-9: AR/WK/MK (Arithmetic Reasoning, Word Knowledge, Math Knowledge)
- Clip 10+: MC (Mechanical Comprehension) introduced
- Clip 13+: EI (Electronics Information) introduced
- Clip 20+: AS (Auto & Shop) introduced
- Clip 24+: AO (Assembling Objects) introduced
- New clip-01 = AR-B31-019 (Arithmetic Reasoning)
- Captions CSV regenerated with new order at `out/batch/captions.csv`

### All 30 Clips Rendered (done)
- Rendered with final timing + fixed audio
- Located at `out/batch/clip-*.mp4` (30 files, ~2.4-2.8 MB each)

### TikTok (@asvabhero)
- Avatar: set (ASVAB Hero logo)
- Bio: "ASVAB prep. 4,500+ questions. Free score calculator. asvabhero.com" (updated 2026-06-22, removed "Free" overstatement)
- **Clip-01 LIVE**: https://www.tiktok.com/@asvabhero/video/7653959681437715725 (uploaded manually 2026-06-21)
- Remaining 29 clips: waiting on TikTok Content Posting API approval (IN REVIEW since 2026-06-21)

### TikTok Content Posting API App
- **App ID**: 7653940206327908370
- **Ownership**: Penrod Products (TikTok developer account organization)
- App name: ASVAB Hero, Category: Education
- App icon: uploaded and displaying correctly
- Products: Login Kit + Content Posting API (Direct Post enabled)
- Scopes: `user.info.basic`, `video.publish`, `video.upload`
- Domain `asvabhero.com` verified via DNS TXT record (Cloudflare zone `1589e9ac252d44ba0dadceb3ae7be88e`)
- Redirect URI: `https://asvabhero.com/api/auth/tiktok/callback`
- Terms: https://asvabhero.com/terms (new page, deployed, robots noindex)
- Privacy: https://asvabhero.com/privacy (new page, deployed, robots noindex)
- **STATUS: IN REVIEW** as of 2026-06-21. Review period 5-14 business days (expect early July 2026).

### Upload Scripts
- **TikTok**: `upload-tiktok.cjs` — Node.js bulk uploader via Content Posting API. Supports `--dry-run`, `--clip`. Rate-limited 11s/init. Reads env from `~/google-drive/0-AI/.env`. **Waiting on API approval** — needs `TIKTOK_CLIENT_KEY`, `TIKTOK_CLIENT_SECRET`, `TIKTOK_ACCESS_TOKEN` in `.env`.
- **YouTube**: `upload-youtube.py` — Python bulk uploader via YouTube Data API v3. OAuth token at `~/.claude/mcp-google/token-asvabhero-youtube.json`. Supports `--dry-run`, `--clip N`, `--start N`, `--all`. Google Cloud project `807406421726`, YouTube Data API v3 enabled 2026-06-22. **All 30 clips uploaded successfully.**

### New Pages Deployed to asvabhero.com
- `/terms` — Terms of Service (`apps/web/src/app/terms/page.tsx`), robots noindex
- `/privacy` — Privacy Policy (`apps/web/src/app/privacy/page.tsx`), robots noindex
- Deployed via `wrangler pages deploy out` from `apps/web/`

### YouTube (@ASVABHero, channel UCjbeA68SyQ3RZWXlilU8QyA)
- **All 30 Shorts UPLOADED (2026-06-22)** — clips 1-15 manual, clips 16-30 via `upload-youtube.py`
- Upload script: `tools/asvab-daily/upload-youtube.py` (Python, google-api-python-client, OAuth token at `~/.claude/mcp-google/token-asvabhero-youtube.json`)
- Supports `--dry-run`, `--clip N`, `--start N`, `--all` flags

### Google Drive delivery folder
`~/google-drive/0-AI/ASVAB-Daily-batch-2026-06/` — may have stale renders. After any future re-render:
```bash
cp ~/dev/asvab-hero/tools/asvab-daily/out/batch/clip-*.mp4 ~/google-drive/0-AI/ASVAB-Daily-batch-2026-06/
```

## Next Steps (in order)
1. **Wait for TikTok app review approval** (~early July 2026)
2. **Once approved**: add TikTok API creds (`TIKTOK_CLIENT_KEY`, `TIKTOK_CLIENT_SECRET`, `TIKTOK_ACCESS_TOKEN`) to root `.env`, run `upload-tiktok.cjs` for remaining 29 clips
3. **Execute the 90-day social plan** — see `apps/web/docs/social-channel-strategy-2026-06.md` §8

## Key Files
- `src/QuestionShort.tsx` — video template + timeline constants (lines 22-28)
- `src/Root.tsx` — Remotion composition (SILENT_FRAMES = 990)
- `scripts/lib.mjs` — `buildCaption()`, `buildScript()`, `propsFor()`
- `scripts/rerender-batch.mjs` — re-renders existing batch in place
- `public/bed.mp3` — background music bed (35s, 128kbps, -40.8 dB mean, looped+boosted)
- `public/bed-original-23s.mp3` — original 23s bed (backup)
- `out/batch/captions.csv` — all 30 captions with updated CTA, reordered for strategic posting
- `out/batch/clip-NN_*.mp4` — the 30 rendered clips (reordered, final timing + audio)
- `upload-tiktok.cjs` — TikTok Content Posting API bulk uploader (Node.js)
- `upload-youtube.py` — YouTube Data API v3 bulk uploader (Python, OAuth)
- `tiktok-api-demo.mp4` — demo video of the upload script
- `~/dev/asvab-hero/apps/web/docs/social-channel-strategy-2026-06.md` — full social channel strategy (deep-researched)

## Commits
- `cf21237` (pushed to origin/main) — timing 23s->33s + caption "free" fix + all 30 clips re-rendered + captions regenerated
- `62fe48f` (pushed to origin/main) — timing rebalance, audio bed fix, TikTok API setup + upload script, terms/privacy pages

## History
- **Original build**: 23s videos, found too fast by user
- **First extension** (`cf21237`): 23s->33s, caption "free" fix
- **Audio fix** (2026-06-21): bed.mp3 was 23s with 3s silent intro, replaced with 35s looped+boosted version
- **Timing rebalance** (2026-06-21): Codex-audited, question read time 7.5s->10.0s, explanation 15s->14.5s (but answer reveals 2.5s earlier)
- **Clip reorder** (2026-06-21): strategic subtest ordering for TikTok posting (broad-appeal first)
- **Clip-01 posted** (2026-06-21): first TikTok short LIVE
- **TikTok API app submitted** (2026-06-21): Content Posting API for automated bulk upload
- **Terms + Privacy pages** (2026-06-21): deployed to asvabhero.com for TikTok app compliance
- **All work committed + pushed** (2026-06-22): `62fe48f` — timing, audio, TikTok setup, upload script, compliance pages
- **TikTok bio updated** (2026-06-22): "ASVAB prep. 4,500+ questions. Free score calculator. asvabhero.com" (removed blanket "Free" overstatement)
- **All 30 YouTube Shorts uploaded** (2026-06-22): clips 1-15 manual, 16-30 via `upload-youtube.py`
- **Social channel strategy researched** (2026-06-22): 106-agent deep research → `apps/web/docs/social-channel-strategy-2026-06.md` updated with verified Pew data, competitive gaps, and 90-day plan
