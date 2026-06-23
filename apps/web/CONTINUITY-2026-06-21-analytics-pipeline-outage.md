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

## 4-Track Improvement Plan (2026-06-21)
Plan: `~/.claude/plans/reflective-humming-pinwheel.md` (approved). Sequence **Track 1 → 2 → 4 → 3**.
Gate: let ~48–72h of clean data accumulate before judging the CRO/funnel impact of Track 2.

### Track 1 — Measurement integrity (✅ SHIPPED, deployed to dashboard `~/dev/personal-dashboard`)
Two dashboard commits. Fixed the metrics that were lying even before the outage.
- **Diagnostic = 0% root cause**: `lib/asvab/sync.ts` filtered `source='diagnostic'`, but the diagnostic
  flag lives in **`variant_code`** — the `source` column is always `'practice'`. 68 real diagnostics
  were counted as 0. Fixed → `variant_code='diagnostic'`.
- **Pro funnel read 0 for steps 2–6**: `lib/funnels/asvabhero.ts` `ASVAB_PRO_FUNNEL` queried 4
  **non-existent** snapshot columns (`first_diagnostic_at`, `trial_start_at`, `first_paid_at`,
  `milestone_50q_email_sent_at`) → silent 0s. Rewrote to real columns (`has_completed_diagnostic`,
  `questions_answered`, `trial_started_at` on `profiles_snapshot`; `billing_status`,
  `became_customer_at` on `customers_snapshot`); reordered activation → monetization.
- **Two more sync bugs**: (1) sync only snapshotted billing-active profiles → historical
  diagnostic-completers stayed stale (showed 9 of 68); broadened the profiles `WHERE` to include
  anyone with attempts. (2) `questions_answered` was `COUNT(*)` of attempts, not
  `SUM(question_count)` → the 50q milestone always read 0.
- **New monitor** `app/api/data/asvab-health/route.ts`: synthetic OPTIONS probe of
  `https://asvabhero.com/api/events` (must be 204) + `analytics_events`/snapshot staleness + last
  sync-run status. This is the monitor whose absence let the 3-day outage hide.
- Deploy = `bash deploy.sh` (ships working tree to droplet `n8n-basecamp`). Re-sync trigger =
  `POST /api/internal/asvab/sync` Bearer (secret = central `PERSONAL_ANALYTICS_SYNC_SECRET` →
  droplet `SYNC_SECRET`).
- **VERIFIED post-resync**: pro-funnel Signups **93**, Diagnostic **68** (reconciles exactly to the
  68 above), 50q **30**, Trial **2**, Paid **8**, Paid30d **2**; cohort `did_diagnostic` **58**
  (rate **70.7%**); health route green.

### Track 2a — Email-verification wall removed (✅ SHIPPED LIVE, `034a01e`)
- Flipped Supabase `mailer_autoconfirm` false→true on project `abypyprvgvofzrtifgzi` via the
  Management API (token `ASVABHERO_SUPABASE_ACCESS_TOKEN`) → `signUp` now returns a session
  immediately. The app gates on `email_confirmed_at` **nowhere** (verified), so this is clean
  immediate access.
- `apps/web/src/app/signup/page.tsx`: redirects into the app on `data.session` (config-agnostic;
  keeps a "check your email" fallback). Added `signup_started` GA4 event (+ `SignupStarted` added to
  `FunnelEvents` in `apps/web/src/lib/analytics.ts`).
- Per Codex: **no** fake "verify your email" nudge (autoconfirm marks email confirmed — nothing to
  verify). Real risk is fake-account/quota abuse, not deliverability; mitigations (CAPTCHA / rate-limit)
  deferred.

### Track 2b — Onboarding friction + auth options (partial: ✅ SHIPPED `2b646a0`; rest blocked/deferred)
- `apps/web/src/components/onboarding/OnboardingForm.tsx`: required fields cut **5→3** (branch +
  test date + weakest subtest). Study schedule / official scores / goal jobs now optional
  (progressive profiling — matches the already-valid skip state). "Skip" made prominent (underline,
  accent hover, "Skip & explore — you can finish this later").
- **BLOCKED**: Google OAuth needs the owner to create a Google Cloud OAuth client + enable the
  Supabase provider (don't ship a dead button).
- **DEFERRED**: CAPTCHA — re-adds the friction just removed; add only if abuse appears (Supabase
  built-in rate limits cover the baseline).

### Track 4 — AFQT accuracy (✅ core SHIPPED `139d787`; residual = task #8)
Owner decision: show **BOTH** the official minimum (31) and the practical/typical score (35).
- `apps/web/src/lib/branch-minimums.ts`: remodeled the type to
  `{ branch, min, practicalMin?, gedNote, note? }`. Was wrongly storing Navy=35 as the single min;
  now Navy `min=31` + `practicalMin=35` + note; Coast Guard note (lowered from 40 in Nov 2023, floor 32).
- Updated both consumers: `components/AfqtCalculator.tsx` + `app/embed/score-requirements/page.tsx`
  render "31 · 35 typical" + clarifier.
- `components/AsvabScoreConverter.tsx`: Navy floor 35→31 (aligned to SOT official floor).
- Fixed self-contradicting pages: `app/navy-afqt-calculator/page.tsx` (title claimed only "35"; body
  + 2 FAQs), `app/asvab-score-requirements/page.tsx` (both requirement tables showed Navy 35,
  contradicting the page's own 31 thesis → "31 (35 to ship)"),
  `app/navy-asvab-score-calculator/page.tsx`, `app/navy-ranks/page.tsx`.
- **RESIDUAL (not done, task #8)**: lower-traffic prose — `app/navy-asvab-score/page.tsx` (~1600 lines,
  several "35 minimum" spots, internally inconsistent w/ its own "31-35 qualifies" line),
  `navy-ratings-list`, `asvab-study-guide`, `how-to-study`, `asvab-math-tips`,
  `mos-asvab-score-requirements`, `march2success` — plus a dodmerb-fact-checker pass to lock wording.

### Track 3 — SEO/AEO (✅ housekeeping SHIPPED `2b646a0`; main work pending)
- Fixed broken internal link: `app/free-asvab-practice-test/page.tsx` `/asvab-score-calculator` (404)
  → `/calculator`.
- `/asvab-line-score-calculator` "crawled-not-indexed" is a **content/authority** issue (page is
  healthy: real page, in sitemap, 10+ internal links incl. homepage) — NOT a technical bug; belongs
  to the on-page cycle.
- **PENDING (main T3)**: run `/on-page-optimizer` on striking-distance calculator pages — `/calculator`
  ("asvab calculator" pos **5.4**, "asvab score calculator" pos **6.0**). Iterative, one page/cycle,
  re-check ~2wk. **DO NOT** touch the homepage `/` (top converter at 9.3%).

## Status snapshot
| Track | Status |
| --- | --- |
| 1 — Measurement integrity | ✅ live & verified |
| 2a — Email-verification wall | ✅ live |
| 2b — Onboarding / auth | ✅ onboarding live; Google OAuth + CAPTCHA blocked/deferred |
| 4 — AFQT accuracy | ✅ core live; residual prose = task #8 |
| 3 — SEO/AEO | ✅ housekeeping; on-page optimizer pending |

Ignorable artifact: a `faq_opened` test row (props.note `pipeline_verify_postfix`, no pcid) used to
verify the events pipeline.

---

# 2026-06-22 — Funnel routing by buyer persona + SEO cannibalization

Plan: `~/.claude/plans/reflective-humming-pinwheel.md` (replaced the old 4-track plan, which is
done). Codex pressure-test session `019ef0ab-b9cc-7c02-9a4b-c061d300ec61`.

## Pricing reality (corrected — old funnel numbers were stale)
Pricing changed ~2026-06-17 to **pass-led**: `pass90` $59 (90-day, the loud default + Stripe-direct
CTA) / `monthly` $14.99 (7-day trial) / `retaker` $119 (120-day, the failed-AFQT/retest segment).
**No annual tier** (the `annual:"49.99"` branch in `stripe-checkout/index.ts` is unreachable dead
code — Step 7, deferred: removing it needs an edge-fn redeploy). Early signal: 2 pass sales + 2
monthly trials in a day. **Too new to judge — let the cohort mature.** Constraint is monetization,
not traffic (traffic compounding).

## Persona-signal fill rates (live DB, 98 accounts)
Dream job (`user_target_jobs`): 35/98 = **36%**. Target GT (`profiles.target_gt_score`): 2/98 = 2%
(niche by design, Army/Marines AFCT). → dream-job personalization is viable; GT is not. Read the
ASVAB DB via PostgREST: `ASVABHERO_SUPABASE_URL` + `ASVABHERO_SUPABASE_SECRET_KEY` (central `.env`),
`Prefer: count=exact` + `Range: 0-0` for counts. (mcp__supabase = wrong project.)

## SHIPPED (all on `main`, alttoby7/asvab-hero, auto-deploy CF Pages)
- **Retaker routing** (`2945124`): new `RetakerOfferCallout.tsx` (primary CTA → `/upgrade?tier=retaker&from=<page>`)
  on `/afct`, `/asvab-retake-calculator`, `/how-to-retake-the-asvab`; existing EmailCapture kept
  secondary. `/upgrade` preselects Retaker tier + "Recommended for retakers" label, **explicit
  signal only** (`?tier=retaker` OR `profiles.official_test_status='taken_logged'` via useEntitlement);
  retaker hero ($119). NO inferred/practice-attempt steering (Codex guardrail). `signup.ts` maps
  `retake-calculator`+`how-to-retake` tags → `LISTMONK_TEMPLATE_RETAKER`.
- **Exact-date capture** (`f1c9dde`): onboarding exact-date affordance made prominent/benefit-led
  ("…countdown reminders"); fires `onboarding_exact_date_set`. Only exact dates enroll in the
  `test-date-emails` drip (t-30/14/7/1,t+1/7); buckets get nothing.
- **Guarantee standardized** (`26da849`): single source of truth `src/lib/guarantee.ts` — **14-day,
  unconditional, no-questions-asked, identical on every tier**. Dropped the retaker improve-or-refund
  condition (unverifiable, erodes trust). Owner picked 14 days. Applied to PricingPlans/upgrade/
  TestBlockedScreen/RetakerOfferCallout/TestimonialWall.
- **Step 6** (study-guide "save your plan → create account"): already existed in
  `StudyPlanGenerator.tsx` (audit false alarm).

## Also shipped this session (earlier)
- **SEO cannibalization cycle 1** (`9f35f65`+log `a0a6914`): the homepage (231 backlinks) had
  swallowed the whole calculator keyword cluster; `/calculator` ranks for nothing. Fenced the
  homepage; optimized the spoke `/air-force-asvab-calculator` for "air force asvab job calculator"
  (250/mo, homepage stuck pos 5) — title/H1/meta/body now say "job" (was only "AFSC"), +FAQPage
  schema, 2 exact-match sibling anchors. Per-URL log `docs/seo-notes/air-force-asvab-calculator.md`;
  **recheck on/after 2026-07-06** (did ranking URL flip homepage→spoke?).
- **Track 4 residual** (`d0dbf0d`): fixed bare Navy-35 on `navy-ratings-list`.
- **Google OAuth groundwork**: staged, **gated OFF** behind `NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED`,
  **uncommitted** in the working tree (`GoogleSignInButton.tsx`, login/signup, `.env.example`,
  runbook `apps/web/docs/google-oauth-setup.md`).

## OWNER TODOs / open
1. Create the Listmonk retaker welcome template + set `LISTMONK_TEMPLATE_RETAKER` in CF Pages env
   (else retakers fall back to generic welcome — safe but generic).
2. Honor **14-day no-questions Stripe refunds** (copy now promises it).
3. Review/commit the uncommitted Google-OAuth groundwork; create the Google Cloud OAuth client +
   enable the Supabase provider per the runbook to go live.
4. Deferred: Step 7 dead-annual removal (edge redeploy); dashboard nudge for existing bucket-only
   users to set an exact date.
5. Measurement: retaker funnel rides existing `from`+`tier` events; read before/after **2–4 weeks**;
   recheck SEO spoke on/after **2026-07-06**.
