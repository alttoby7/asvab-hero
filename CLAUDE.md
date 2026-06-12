# ASVAB Hero — Project Notes for Claude

> Lean reference. Detailed feature changelog lives in [`docs/project-history.md`](./docs/project-history.md).
> Scoring math lives in [`docs/scoring-model.md`](./docs/scoring-model.md).

## Stack & Architecture
- Next.js 15 **static export** (`output: "export"`) — no SSR. Marketing pages are static; app surfaces (auth/practice/study) are client-rendered React talking to Supabase JS.
- Tailwind v4, custom tokens in `@theme` block of `src/app/globals.css`. TypeScript, **no test suite**.
- Build output `out/`. Cache controlled by `public/_headers`.
- **Redirects:** `public/_redirects` (Cloudflare Pages 301s, format `/old /new 301`). Next.js `redirects()` does NOT work under static export — use this file.
- **Deploy:** Cloudflare Pages auto-deploys on push to `main`. Domain `asvabhero.com` (Cloudflare DNS → CF Pages).
- **Edge WAF (Cloudflare, 2026-05-21):** custom rule in `http_request_firewall_custom` phase — `managed_challenge` when `(not cf.client.bot and ip.src.country in {"SG" "CN"})`. Kills the SG/CN headless-bot noise GA4 surfaced (49 SG + 4 CN sessions, ~0% engagement) while `not cf.client.bot` keeps AI/search crawlers and all US/real traffic untouched. Zone `1589e9ac252d44ba0dadceb3ae7be88e`; applied via central `.env` token `CLOUDFLARE_WAF_API_TOKEN_ALLZONES`. Portfolio-wide rollout; GA4 recheck ~2026-05-27. Ref: memory `peptides-bot-mitigation.md`.
- **Supabase backend** (LIVE since 2026-04-27): Postgres + Auth + Edge Functions. Project ref `abypyprvgvofzrtifgzi`. Migrations in `supabase/migrations/`. Edge Functions in `supabase/functions/` (Deno-style URL imports; excluded from Next tsconfig).
- **Stripe** LIVE in production. Plans $9.99/mo or $49.99/yr + 7-day card-required monthly trial. Functions: `stripe-checkout`, `stripe-portal`, `stripe-webhook`.
- **Email:** Listmonk (self-hosted, droplet `64.23.194.109`) + Resend SMTP. Full reference: [`docs/email-infrastructure.md`](./docs/email-infrastructure.md).
- **Observability:** Sentry (3 projects: next/edge/cron) + durable Stripe webhook deadletter (`stripe_webhook_events` table).

## Environment / Secrets
- CF Pages prod + local `.env.local`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_AMAZON_TAG` (default `asvabhero-20`).
- Central `.env`: `ASVABHERO_SUPABASE_SECRET_KEY` / `ASVABHERO_SUPABASE_ACCESS_TOKEN`, `ASVABHERO_STRIPE_WEBHOOK_SECRET`, `ASVAB_LISTMONK_*`, `ASVAB_RESEND_API_KEY`, `ASVABHERO_SENTRY_*`.

## Build & Seed Commands
- **Question bank:** `node scripts/build-questions-seed.mjs` → `supabase/seed-questions.sql` → `supabase db query --linked --file supabase/seed-questions.sql` (needs `SUPABASE_ACCESS_TOKEN` exported). ⚠️ New batch files MUST be added to the `all = [...]` array in the build script. Sources: `src/data/practice-tests/{free-test.json, expansion-batch-{1..17}.json}` (**1,577 active items / 1,584 total, 39/39 topics** as of 2026-05-22). The generator also emits `src/data/bank-stats.json` (committed) — marketing copy imports counts from `src/lib/bank-stats.ts`, never hardcode. Floor: every AFQT topic ≥12 active (d1/d2/d3); every non-AFQT topic ≥30 active (d1/d2/d3 ≥8).
- **Flashcards:** drop JSON in `supabase/seed/flashcard-batches/`, run `scripts/build-flashcards-seed.mjs`, re-seed. ⚠️ Re-seed is **destructive** — wipes `flashcard_reviews`.
- **Sitemap:** `scripts/generate-sitemap.mjs` is **source of truth** — never edit `public/sitemap.xml` directly (overwritten on build). New pages get priority 0.9.
- **Stripe webhook deploy:** use `scripts/deploy-stripe-webhook.sh` (wraps `supabase functions deploy` + enforces canonical event list from `enabled-events.json`). Do NOT run bare `supabase functions deploy stripe-webhook`.

## Scoring (see [`docs/scoring-model.md`](./docs/scoring-model.md) for full detail)
- AFQT uses the **PAY97 norming table** (DMDC 2004, Table 2.5). `VE = WK + PC`; `raw = 2×VE + AR + MK`; percentile via `PAY97_RANGES` lookup. Code: `src/lib/score-calculator.ts`.
- AFQT subtests (AR/WK/PC/MK) are on a 20–62 standard-score scale. UI accepts 20–145 (for composites); values >62 are **clamped, not rescaled** — rescaling is not official methodology.

## Conventions
- **Design system:** dark navy `#0a1628`, orange accent `#f97316`. Tokens in `@theme` (`globals.css`). JSX patterns: `.claude/skills/asvab-post-writer/references/design-system.md`.
- **Article pages:** use `prose-asvab` CSS class. DVIDS hero images via `DvidsHeroImage` component (DoD disclaimer); download with `scripts/dvids-image.py`.
- **Amazon affiliate:** tag `asvabhero-20`, read from `NEXT_PUBLIC_AMAZON_TAG`. Books only — no affiliate links to competing online subscriptions.
- **Content authoring:** `/asvab-post-writer` skill models SEO articles AND study guides (markdown into `content/study-guides/{subtest}/{topic}.md`).
- **No cannibalization:** one canonical page per search intent. Branch score spokes follow `{branch}-asvab-score` (`/army-asvab-score`, `/marines-asvab-score`, …). To consolidate dupes: merge content into the winner, 301 the losers in `public/_redirects`, repoint internal links, drop the paths from `scripts/generate-sitemap.mjs`. See history doc 2026-05-20.
- **Stripe API gotcha:** `current_period_end` lives on `sub.items.data[0]`, not the subscription object (API `2025-03-31.basil`). Migration files are NOT evidence of runtime state — verify `pg_proc`/`pg_trigger` after migrating a function.

## Active Open Issues
- **MAGE normalization:** RESOLVED as permanent beta (2026-05-21 research pass) — the official AF raw→percentile norming table is not public, and a z-score approximation is statistically indefensible (see `docs/scoring-model.md` "MAGE" section). AF/SF checks render as "unverifiable", jobs stamped `support_status='beta'`. Do NOT implement an approximation; unblocking requires official DMDC/AF norms.
- **Missing calculator pages:** `/marines-asvab-calculator`, `/coast-guard-asvab-calculator`, `/space-force-asvab-calculator` — follow `/army-asvab-calculator` pattern.
- **Pending operator step:** enable `invoice.payment_failed` in Stripe Dashboard for `we_1TRQ39DjRScowBLlbLoSKKXX`.
- **Mistake Bank (Closed-Loop v0) — LIVE 2026-05-21.** `NEXT_PUBLIC_CLOSED_LOOP_ENABLED=true` in CF prod; `/app/mistakes` + home entry points live for all (free). Migrations 0017–0019; single-source SM-2 in PL/pgSQL (`sm2_next`); flashcards + missed questions grade via RPC. Residual: a logged-in browser smoke.
- **Phases 2–6 SHIPPED 2026-05-21 (migrations 0020–0026, all applied + deployed).** Built by 7 parallel subagents, /codex-refined. WS1 item-calibration substrate (`item_exposures`/`question_calibrations`, live collecting, cold-start). WS2 difficulty-aware scheduler scaling (**shadow mode**, clamp 0.85–1.15, never touches lapse/ladder). WS3 trajectory + **multi-target-job** backend (`job_catalog`/`user_target_jobs`/`trajectory_score_snapshots` + RPCs; band-only gaps; AF/SF `support_status='beta'` pending MAGE fix). WS4 home UX (`GoalJobsTracker`/`TrajectoryCard`/`PrescriptionCard`; home reads one RPC, no client score math; band+confidence, no point deltas). WS5 bank depth (60 new verified AFQT floor items, `item_family_id` 100% AFQT, 822 active). WS6 AFQT adaptive selector — **LIVE 2026-05-21** (`NEXT_PUBLIC_ADAPTIVE_ENABLED=true` + `afqt_adaptive` variant `active=true`), Pro-gated, entry `/practice-test?variant=afqt_adaptive`; smoke-verified end-to-end. Bank deepened to 1,267 items / 1,260 active / 898 AFQT active (every AFQT topic 40–56 items). WS7 reminder opt-out (CAN-SPAM) + `get_cohort_afqt_delta()` + Tier B science (hidden until n≥30). Crons: `recompute-item-calibrations-nightly` 08:00 UTC, `mistake-reminders-daily` 15:00 UTC (opt-out-aware). Full detail: `Personal/asvab-hero/CONTINUITY-phases-2-6-2026-05-21.md`.
- **Not yet committed/deployed:** AFCT Practice Test landing page, App Shell (`/app/home`, daily challenge). See history doc.
- **v2/v3 gated:** AFQT Sprint + Weakness Loop + Full Sim + Retake Readiness variants (gated on bank ≥1000 items); daily challenge Edge Function.

## Key Docs & Plans
- History / changelog: `docs/project-history.md`
- Learning-science strategy + roadmap: `docs/learning-science-strategy.md`
- Scoring: `docs/scoring-model.md`
- Email infra: `docs/email-infrastructure.md` · templates: `docs/email-templates-drafts.md`
- Question bank audit: `docs/question-bank-audit.md`
- Runbooks: `docs/runbooks/` (incl. `stripe-webhook-events.md`)
- Marketing strategy: `docs/marketing-strategy-2026-04-28.md`
- Platform design plan: `~/.claude/plans/adaptive-churning-shell.md`
- Efficacy plan + Phase 1 pickup: `~/.claude/plans/synthetic-bouncing-walrus.md` · `Personal/asvab-hero/CONTINUITY-mistake-bank-phase1-2026-05-20.md`
