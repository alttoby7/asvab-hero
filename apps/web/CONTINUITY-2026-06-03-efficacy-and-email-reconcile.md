# CONTINUITY — Official-score efficacy + email reconcile (2026-06-03)

**Status: SHIPPED + committed + pushed.** asvab-hero `479c6c5` → origin/main; personal-dashboard `06df6c2` → origin/main. Migration applied to prod, dashboard deployed (winning.basecampdigital.pro), reconcile cron live on droplet. Nothing pending.

Two shipped pieces this session: (1) an operator efficacy view of **official ASVAB score gains**, surfaced in the personal dashboard, and (2) a **signup → Listmonk reconcile** that closes the fire-and-forget gap so every account signup enters the marketing drip.

## 1. Official-score efficacy (asvabhero)

**Goal:** show how much the product moves users' REAL (official) AFQT scores — ground truth, not practice. Operator-only.

**`supabase/migrations/0046_official_score_efficacy.sql`** (APPLIED to prod `abypyprvgvofzrtifgzi`). Two `SECURITY DEFINER` RPCs, granted to `service_role` + `dashboard_export` ONLY (explicitly revoked anon/authenticated — note: 0036's cohort fns still leak to anon/authenticated because a bare `revoke from public` doesn't strip Supabase's default role grants; 0046 fixes this for its own fns):
- `get_official_score_efficacy(p_paying_only boolean default false)` — per-(segment, exam_kind) AFQT gain, pooled per segment. Two SEPARATE segments, never blended:
  - `official_to_official` (headline, ground truth both ends): earliest official → latest official.
  - `diagnostic_to_official` (estimated-baseline support): earliest diagnostic strictly BEFORE latest official → latest official. Used only when no prior official (official prioritized).
  - Endpoint is ALWAYS a logged official AFQT. No n<5 suppression (operator-only; consumers label small samples).
- `get_official_score_coverage(p_paying_only boolean default false)` — denominators: users with any official, official-paired / diag-baseline-paired / unpaired.
- `p_paying_only=true` filters to paying customers via the dashboard's canonical predicate: `billing_status='lifetime' OR (active AND (trial_ends_at IS NULL OR trial_ends_at<=now()))`.

**`scripts/efficacy-report.mjs`** — on-demand terminal report. `node scripts/efficacy-report.mjs` (reads `ASVABHERO_SUPABASE_URL` + `ASVABHERO_SUPABASE_SECRET_KEY` from central `.env`). Labels small samples `n<5` as directional `*`.

**Dashboard widget** (in `personal-dashboard` repo, DEPLOYED to winning.basecampdigital.pro): `AsvabScoreEfficacy` on the ASVAB Hero tab, after `AsvabProFunnel`. Route `app/api/data/asvab-score-efficacy/route.ts` calls both RPCs paying + all over the existing `dashboard_export` pg pool (`PERSONAL_ANALYTICS_ASVAB_SUPABASE_URL`). Headline = paying official→official median, with all-users compare; directional small-sample tags.

**Live data reality (2026-06-03):** only 2 users have logged official scores (1 paying). 0 official→official retake pairs yet; 1 diagnostic-baseline pair (+35, n=1, directional). Headline populates once someone logs a 2nd official test. Auto-grows; no further work.

## 2. Signup → Listmonk reconcile (closes fire-and-forget gap)

**Problem:** `/signup` subscribes new accounts to Listmonk list 3 client-side, fire-and-forget (no retry). A failed call → account in Supabase but never in the drip.

**`scripts/asvab_reconcile.py`** (repo canonical; deployed to droplet `/root/scripts/asvab_reconcile.py`). Finds Supabase `profiles` emails NOT on Listmonk list 3 and subscribes them. Sets `attribs.source` from CURRENT billing so the drip's `EXCLUDED_SOURCES={trial-start,paid}` stays correct: paying→`paid` (excluded, never pitch Pro to a payer), trialing→`trial-start` (excluded), free→signup_source or `supabase-signup` (gets drip). New subs start the drip fresh (created_at=now → no 5-email blast for old signups). `--dry-run` / `--limit N`. Idempotent.

**First run:** 4 missing (3 free → drip; 1 paying → excluded). List 43→47, now 0 missing.

**Cron (droplet `n8n-basecamp` = 64.23.194.109):** `15 14 * * *` (15 min before the 14:30 study-plan drip), flock-guarded, shares `asvab_drip.env`, logs `/var/log/asvab_reconcile.log`, Sentry on fail.

## Email system map (discovered this session)
NONE of the sending uses Listmonk *campaigns* (campaigns list = empty draft demo). It's all cron + pg_cron + transactional:
- **Study-plan marketing drip** — droplet cron `asvab_drip.py` daily 14:30, Listmonk tx, list 3, Day 2/5/7/10/14 (templates 7/8/17/9/10). Excludes source in {trial-start, paid}. ACTIVELY sending. `/var/log/asvab_drip.log`.
- **Trial drip** — droplet cron `asvab_drip_trial.py` hourly. `/var/log/asvab_drip_trial.log`.
- **Welcome (per-source) + trial/paid welcomes** — Listmonk tx at `/signup` / Resend in stripe-webhook.
- **mistake-reminders** — asvabhero pg_cron daily 15:00 UTC (active).
- **test-date-emails** — asvabhero pg_cron daily 14:00 UTC (active), T-30/-14/-7/-1/+1/+7.

**Listmonk lists:** list 3 "ASVAB Hero — Study Plan" = single opt-in (signups land here). Deleted the stock double-opt-in demo "Opt-in list" (id 2) so nothing can land behind a confirmation wall. Source is stored in `attribs.source` (NOT Listmonk tags — tags are empty).
