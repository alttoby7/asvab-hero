# Analytics Pipeline Outage — Root Cause, Fix, Backfill — CONTINUITY (2026-06-21)

## TL;DR
Owner reported a traffic/conversion "slowdown over the last couple days." **There was no
slowdown** (GA4 +31% sessions, GSC +33% clicks WoW; the dip was just today's partial day +
Saturday). But chasing "why isn't today's $59 purchase in the paywall journey?" uncovered a
**real 3-day production outage**: the entire first-party analytics pipeline was dead.

## Root cause (confirmed, not guessed)
The **2026-06-18 monorepo restructure** (`c090fb1`, app moved into `apps/web/`) also moved the
**Cloudflare Pages Functions** from repo-root `/functions/` → `apps/web/functions/`. But the
`asvab-hero` Pages project kept **root_dir = ''** (repo root) with **out_dir = `apps/web/out`**.
Cloudflare resolves the `functions/` directory relative to root_dir → it looked for `/functions`
(gone) → **every `/api/*` returned HTTP 405** (static-asset fallback).

- First-party `analytics_events` (Supabase) got **zero rows from 2026-06-18 16:12 UTC onward**.
- GA4 / gtag is a **separate** pipeline → kept working → masked the outage (traffic looked fine).
- Dead endpoints: `/api/events`, `/api/signup`, `/api/feedback`, `/api/program-inquiry`.
- Effect: the whole Winning dashboard (winning.basecampdigital.pro) paywall journey, conversion
  leaks, cohort funnel diag/attempt, capture-mount, content-quality went blind for 3 days.

### Evidence chain
- Today's $59 buyer's `paywall_context_id` (`4a83397a…`) reached Stripe but had **0 events** in
  `analytics_events`. The "1 converted" in the paywall funnel was a **stale May-26 journey**.
- `MAX(received_at)` = `2026-06-18T16:12:47Z`; zero events of any name on 6/19–6/21.
- Live probe: `OPTIONS /api/events` and `/api/signup` both returned **405** (a deployed function
  returns 204). Confirmed functions weren't deploying at all.
- All required env vars (`WHY_TRACKING_ENABLED=true`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
  `SUPABASE_ANON_KEY`) WERE present in the Pages production config — only the functions path was wrong.

## Fix (validated with Codex gpt-5.4)
Stage the functions where CF looks, keeping root_dir='' (safer than root_dir='apps/web', which
would risk pnpm-workspace/`packages/content` resolution).

- Added root script `pages:build`:
  `turbo build && rm -rf functions && mkdir -p functions && cp -R apps/web/functions/. functions/`
- `.gitignore` the generated `/functions`.
- Repointed CF Pages `build_command` (via API) from the static `pnpm build` to **`pnpm pages:build`**.
- Committed + pushed to `main` (`9229da4`) so the fix is durable in-repo, not config-only.

### Verified live (post-deploy)
- `OPTIONS /api/events` → **204** with real CORS; all 4 functions back to 204.
- `POST {"events":[]}` → **200 `{accepted:0}`** (past kill-switch + config checks).
- End-to-end: POSTed a real `faq_opened` test event → **persisted** to `analytics_events`
  (first new row since the outage). `faq_opened` carries no pcid → invisible to the journey funnel.

## Data backfill (what was/wasn't recoverable)
Lost events were client beacons rejected at the edge (405) → **never stored anywhere** → mostly
unrecoverable. Reconstructed only what Stripe has ground truth for.

**Backfilled** (2 real conversions in the outage window, via service-role REST, stamped with
real completion dates, props flagged `backfilled_from_stripe:true`):
- 2026-06-19 23:16 — subscription (trial start), pcid `6201a4bd…`, user `2095babf…`
- 2026-06-21 18:58 — `pass90` $59, pcid `4a83397a…`, user `c5eb2eca…`
- by-product "completed pcids" now 10 (was 8); $59 resolves to **1×90-Day Pass** once the
  dashboard's Stripe pass-sync populates `asvab_hero_one_time_payments` for that pcid.

**Never lost** (separate systems): signups (Supabase auth/profiles — cohort funnel had them),
revenue/MRR/bookings/active subs (Stripe).

**Permanently unrecoverable**: paywall views, CTA clicks, surveys, scroll-depth, plan toggles for
6/18 16:12 → 6/21 ~20:00 (~15–30 journeys). Deliberately did NOT fabricate `paywall_viewed` rows
for the 2 conversions — both buyers' `signup_source = signup_page` (likely pricing-page, not an
in-app paywall), so entry-surface/reason are honestly unknown.

## Also shipped this session — Stripe charge descriptions
`stripe-checkout` edge fn now sets per-tier human descriptions so the Stripe dashboard stops
showing the bare `pi_…` id:
- passes → `payment_intent_data[description]`, subs → `subscription_data[description]`
  (TIER_LABEL map: "ASVAB Hero Pro — Monthly/Annual/90-Day Pass/Retaker Pass").
- Deployed to Supabase project `abypyprvgvofzrtifgzi`; backfilled the existing $59 charge.
- Committed in `9229da4`.

## ⚠️ Watch-outs / follow-ups
- The CF fix is now in-repo, but **if the Pages project config is ever reset**, confirm
  `build_command = pnpm pages:build` (root_dir='', out='apps/web/out'). Otherwise functions die
  silently again — and GA4 will hide it.
- Post-deploy sanity check after ANY future monorepo/build change: `curl -X OPTIONS
  https://asvabhero.com/api/events` must be **204**, not 405; watch `analytics_events` for fresh rows.
- One ignorable test row exists: `faq_opened` w/ props.note `pipeline_verify_postfix` (no pcid).

## Access notes (for next session)
- ASVAB Supabase project ref = `abypyprvgvofzrtifgzi`. The `mcp__supabase__*` MCP server is a
  DIFFERENT project (BonusClerk/Peptide) — NOT ASVAB.
- `analytics_events` reachable read-only via `PERSONAL_ANALYTICS_ASVAB_SUPABASE_URL` (central .env,
  role `dashboard_export`, NO insert) + repo-local `pg` in `~/dev/personal-dashboard`.
- Writes need `ASVABHERO_SUPABASE_SECRET_KEY` (service role) via PostgREST.
- CF creds in central .env: `CLOUDFLARE_PAGES_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`.
- Dashboard paywall-journey logic: `~/dev/personal-dashboard/app/api/data/asvab-paywall-journey/route.ts`
  (+ `lib/asvab/sync.ts` for the pass→`asvab_hero_one_time_payments` Stripe sync).
