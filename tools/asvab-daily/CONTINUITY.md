# ASVAB Daily Shorts — Continuity (2026-06-22)

## What This Is
Remotion-based video pipeline generating ASVAB quiz short-form videos (1080x1920, 33s @ 30fps) for TikTok + YouTube Shorts. Located at `~/dev/asvab-hero/tools/asvab-daily/`.

## Current State (as of 2026-06-22 EOD)

**Phase 0 of the 90-day social plan is COMPLETE.** All foundation work done: 30 clips rendered + uploaded to YouTube, first clip live on TikTok, link-in-bio page shipped, share buttons on calculator, compliance brief written, strategy doc deep-researched with verified claims. Waiting on TikTok Content Posting API approval (scheduled check 2026-07-07) before bulk TikTok upload of remaining 29 clips.

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
- Bio: "ASVAB prep. 4,500+ questions. Free score calculator. asvabhero.com/links" (updated 2026-06-22, removed "Free" overstatement, URL changed to /links)
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

### Social Distribution Infrastructure (2026-06-22)
- **Link-in-bio page** LIVE at `asvabhero.com/links` — 4 UTM-tagged link cards (calculator, practice, study guide, score requirements) + TikTok/YouTube/web social icons. `apps/web/src/app/links/page.tsx`, noindex. Commit `ad7441e`.
- **TikTok bio** updated to point to `asvabhero.com/links` (was bare `asvabhero.com`)
- **Social share buttons** added to calculator (`ShareActions.tsx`): native Web Share API (mobile), Copy link, WhatsApp, X/Twitter, Text, Email, Print/PDF. All GA4-instrumented (`share_result` event). Commit `ad7441e`.
- **Content + compliance brief** written at `apps/web/docs/content-compliance-brief-2026-06.md` — reusable creator/VA SOP: brand positioning ("education/test-prep, NOT recruitment"), 5 approved hook formats (score-reveal, rate-my-score, speed-challenge, myth-bust, transformation), production specs (9:16, 30-35s sweet spot, captions always on), FTC/DoD compliance rules (screen out active-duty/recruiters per DoD 5500.07-R, FTC #ad disclosure mandatory), creator eligibility screening, outreach DM template, pre-post checklist. Commit `f771d1a`.
- **Deep research** (106 agents, 24 sources, 25 claims adversarially verified) added verified data to `social-channel-strategy-2026-06.md` section 9: Pew Dec 2025 teen platform data (YouTube ~90%/TikTok ~60%/IG ~60% teen adoption; IG skews 75% for 15-17yo = the core ASVAB cohort), Army ASVAB Challenge app confirmed only 4/9 subtests (validates "complete prep" positioning), zero ASVAB-prep TikTok creators at scale (confirms content vacuum), UGC-style 28% lower CPA than studio on TikTok. Specific benchmarks refuted: George's $2 CPM, $100/day ad formula, $35-from-1.8M-views anecdote, Army $22K/40M stat all failed verification. Commit `1ab8adc`.
- **Scheduled TikTok API check**: cloud routine fires 2026-07-07 9AM MT to check approval status + guide through upload.

## Next Steps (pickup guide for tomorrow)

### Immediate (no blockers)
1. **Start Phase 1 posting cadence** — post existing clips at 4-5x/week across platforms. Cross-posting order: TikTok first (manual for now) → IG Reels within 24h → YouTube Shorts already uploaded. See strategy doc §8 "Phase 1" and compliance brief §4 for cross-posting specs.
2. **Set up Instagram** — create/activate `@asvabhero` IG account, set up as Business, bio link to `asvabhero.com/links`, mirror TikTok content (clean, no watermark). IG over-indexes on 15-17yo (75% adoption per Pew) = core ASVAB cohort.
3. **Start creator outreach** — use the compliance brief §7 outreach DM template. Target veteran/student micro-creators in #miltok. Screen out active-duty/recruiters (DoD 5500.07-R). DM template is ready in the compliance brief. Start manually, hand to VA once volume justifies.
4. **Optional: small Reddit-ads test** ($15-20/day) on r/Militaryfaq + r/newtothenavy with free calculator hook.

### Blocked on TikTok API approval (~early July)
5. **Wait for TikTok Content Posting API approval** — scheduled cloud check fires 2026-07-07 9AM MT. App ID `7653940206327908370`, review period 5-14 business days from 2026-06-21.
6. **Once approved**: add `TIKTOK_CLIENT_KEY`, `TIKTOK_CLIENT_SECRET`, `TIKTOK_ACCESS_TOKEN` to root `.env` (`~/google-drive/0-AI/.env`), run `node upload-tiktok.cjs` for remaining 29 clips (supports `--dry-run` to test first).

### Phase 2 (Week 8-13, after engine is lit)
7. **Port winning hooks to YouTube long-form** — screen-record app walkthroughs, clip back into Shorts.
8. **App launch → paid search** — Apple Search Ads + Google on "ASVAB" intent keywords.
9. **Ship free counselor/JROTC resource asset** — embeddable calculator + printable handout, GAIN-channel outreach for backlinks.

### Reference docs
- Social strategy: `apps/web/docs/social-channel-strategy-2026-06.md` (especially §8 for the 90-day plan, §9 for verified research data)
- Compliance brief: `apps/web/docs/content-compliance-brief-2026-06.md` (hand this to any creator or VA)
- Hook formats: compliance brief §2 (5 ranked hooks with CTAs)
- Platform specs: compliance brief §6 (per-platform hashtags, post times, account setup)

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
- `~/dev/asvab-hero/apps/web/docs/content-compliance-brief-2026-06.md` — content + compliance brief (creator/VA SOP)
- `~/dev/asvab-hero/apps/web/src/app/links/page.tsx` — link-in-bio page at `/links`
- `~/dev/asvab-hero/apps/web/src/components/ShareActions.tsx` — social share buttons (WhatsApp, X, native share, etc.)

## Commits
- `cf21237` (pushed to origin/main) — timing 23s->33s + caption "free" fix + all 30 clips re-rendered + captions regenerated
- `62fe48f` (pushed to origin/main) — timing rebalance, audio bed fix, TikTok API setup + upload script, terms/privacy pages
- `1ab8adc` (pushed to origin/main) — YouTube upload script + social channel strategy deep research (106-agent verified claims in §9)
- `ad7441e` (pushed to origin/main) — link-in-bio page (`/links`) + social share buttons on calculator (WhatsApp, X, native Web Share API)
- `f771d1a` (pushed to origin/main) — content + compliance brief (creator/VA SOP) + continuity update

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
- **YouTube Data API v3 enabled** (2026-06-22): on Google Cloud project `807406421726`, unblocked automated YouTube uploads
- **All 30 YouTube Shorts uploaded** (2026-06-22): clips 1-15 manual, 16-30 via `upload-youtube.py`
- **Social channel strategy researched** (2026-06-22): 106-agent deep research → `apps/web/docs/social-channel-strategy-2026-06.md` updated with verified Pew data, competitive gaps, and 90-day plan
- **Link-in-bio page shipped** (2026-06-22): `asvabhero.com/links` — 4 UTM-tagged cards, social icons, noindex. Commit `ad7441e`.
- **Social share buttons added** (2026-06-22): WhatsApp, X/Twitter, native Web Share API, all GA4-instrumented. Commit `ad7441e`.
- **TikTok bio updated to /links** (2026-06-22): bio now points to `asvabhero.com/links` instead of bare domain
- **Content + compliance brief written** (2026-06-22): creator/VA SOP — brand positioning, 5 hooks, production specs, FTC/DoD rules, creator screening, outreach template, checklist. Commit `f771d1a`.
- **TikTok API check scheduled** (2026-06-22): cloud routine fires 2026-07-07 9AM MT
- **Phase 0 COMPLETE** (2026-06-22 EOD): all foundation work for 90-day social plan done. Ready for Phase 1 execution.
