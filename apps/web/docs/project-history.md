# ASVAB Hero — Project History

Detailed changelog of shipped work, moved out of `CLAUDE.md` to keep that file lean. Newest clusters are roughly at the bottom of each section. For durable conventions and current open issues, see `CLAUDE.md`. For scoring, see `docs/scoring-model.md`.

---

## Adaptive Practice Platform v1 (2026-04-27)
- **Auth:** `/login`, `/signup`, `/account`, `/reset-password`. Email + password. Email confirmation enforced.
- **Practice variants live:** `diagnostic` (30q), `subtest_drill` (25q). Inactive in DB (gated for v2/v3): `afqt_sprint`, `weakness_loop`, `retake_readiness`, `full_sim`.
- **Question bank:** 769 active items in `practice_questions` table, 39/39 topics covered, all 5 difficulty levels per topic. Source files (8): `src/data/practice-tests/{free-test.json, expansion-batch-{1..7}.json}`.
- **Bank build:** `node scripts/build-questions-seed.mjs` → `supabase/seed-questions.sql` → `supabase db query --linked --file supabase/seed-questions.sql` (needs `SUPABASE_ACCESS_TOKEN` exported). New batch files MUST be added to the `all = [...]` array in the build script.
- **Study guide:** `/study/[subtest]/[topicSlug]` with markdown content in `content/study-guides/`. 39/39 topic pages live. MiniDrill component pulls 5 questions per topic from Supabase.
- **Edge Functions deployed:** `migrate-local-profile` (anon→registered), `delete-account` (cascade-delete), `export-account-data` (JSON download). Located in `supabase/functions/` — excluded from Next.js tsconfig because they import via Deno-style URLs.
- **Audit doc:** `docs/question-bank-audit.md` (3 audits — initial, batch-2 re-audit, full-corpus post-tripling).
- **Plan:** `~/.claude/plans/adaptive-churning-shell.md` — full design (schema, variants, adaptive logic, v1→v3 phasing).
- **Memory:** `~/.claude/projects/-home-trisha-google-drive-0-AI/memory/asvab-platform-v1.md`
- **Flashcards (LIVE 2026-05-12, commit `e9a5dbc`):** 6 decks / 123 cards. SM-2 client-side scheduler at `src/lib/flashcards/scheduler.ts`. Routes `/flashcards`, `/flashcards/[deckSlug]`. Dashboard widget on `/account`. Free deck = `wk.synonyms`. Pro content gated by migration `0010_flashcards_rls_pro_gating.sql` (RLS, not just client-side helper). Race lock in `ReviewEngine.tsx` uses `useRef`. Add decks: drop JSON in `supabase/seed/flashcard-batches/`, run `scripts/build-flashcards-seed.mjs`, re-seed (destructive — wipes `flashcard_reviews`).
- **Pending v2/v3:** daily 10-q challenge Edge Function + Listmonk reminder, AFQT Sprint + Weakness Loop variants, Full ASVAB Sim + Retake Readiness (gated on bank growth ≥1000 items). ~30 study guide pages body length >400 words (audit flagged, not blocking).

## Monetization Layer (2026-04-27 → 2026-04-28)
- **Stripe LIVE in production** (verified 2026-05-20 via central `.env`: `sk_live_`/`pk_live_` keys, live product `prod_UQGaoePk7IZ4Kx`, live prices `price_1TRQ38…`, live webhook `we_1TRQ39DjRScowBLlbLoSKKXX`). The original launch was test-mode (old test product `prod_UQ8lIeJ18IMwZm`); that is historical. Schema `0002_billing.sql` adds billing columns + `has_active_pro()` SQL fn. Plans: $9.99/mo or $49.99/yr.
- **3 Stripe Edge Functions deployed:** `stripe-checkout`, `stripe-portal`, `stripe-webhook`. Webhook secret: `ASVABHERO_STRIPE_WEBHOOK_SECRET` in central `.env`.
- **Hard paywall:** free users hit wall after first diagnostic; Pro unlocks unlimited diagnostics + history.
- **Account dashboard redesign:** `/account` is now a SaaS dashboard (greeting, stats, recent attempts, weak topics, plan card). Settings → `/account/settings`. New: `/account/billing` (Customer Portal link), `/account/history` (Pro-only).
- **Conversion nudges:** sticky `<UpgradeBanner />` in layout.tsx for free authed users; Pro upsell card on TestResults; Upgrade button in Nav for free authed users only.
- **Day-7 Listmonk drip:** template at `docs/listmonk-template-pro-upgrade-day7.html`, deploy steps at `docs/listmonk-deploy-day7.md`. **DEPLOYED 2026-05-20** as Listmonk template **17**; droplet `DRIP_SCHEDULE={2:7, 5:8, 7:17, 10:9, 14:10}`.

## Study Guide Coverage (2026-04-28)
All 39/39 topic pages are live. 36 missing pages authored in one session (5 parallel agents) across all 9 subtests. Each file at `content/study-guides/{subtest}/{topic-slug}.md` — frontmatter + 250-400 word body + worked examples + pitfalls section.

## Homepage Redesign (2026-04-28)
Hero refocused on platform pitch (769q/39 topics/9 subtests proof points). Three-pillar grid: Calculator / Practice / Study Guide. Replaced stale "Coming Soon" Pro teaser with real Pro section + Upgrade CTA. Reduced to single mid-page email capture (was two).

## Affiliate / Funnel Pages (2026-04-28)
Commits `6e028ec` / `f3d9c57`. Strategy: Amazon Associates (books only) + Pro conversion — no links to competing online subscriptions (Mometrix Academy, Kaplan online, Princeton Review online, Peterson's online).
- `/best-asvab-study-book` — Amazon Associates roundup, 9 books, FTC-disclosed
- `/best-asvab-online-prep` — comparison page, Pro listed #1, no affiliate links to competing online courses
- `/free-asvab-practice-tests` — informational funnel page driving signups to OUR diagnostic + email list
- `/best-asvab-practice-test-book` (2026-04-29, commit `d3b4672`) — list article, 8 books ranked by practice volume, master comparison table (gap competitors miss), 6-Q FAQ. Built via /asvab-post-writer 6-stage pipeline; workspace: `~/google-drive/0-AI/asvab-hero/articles/best-asvab-practice-test-book-2026-04-28/`.
- **Amazon tag** is now `asvabhero-20` (dedicated tracking ID, swapped from `fidohikes-20` on 2026-04-28). Read from `NEXT_PUBLIC_AMAZON_TAG` env with that fallback.

## Traffic Growth Phase 2 (2026-04-23) — AFQT calculator split
Plan: GSC showed AFQT queries (100+ combined impressions) were ranking pos 10-16 **on the homepage**. Dedicated page targets jump to page 1.

**Shipped:**
- `/afqt-calculator` — new standalone page. Reuses `calculateAFQT` from `src/lib/score-calculator.ts` (PAY97 Table 2.5 lookup) so numbers match the full calculator exactly
- `AfqtCalculator.tsx` — 4-subtest (AR, WK, PC, MK) client component. Shows percentile + DoD category + branch-by-branch eligibility matrix with per-branch gap readout ("3 points short" vs "Qualifies"). GA4 events tagged with `branch: "afqt_only"` for segmentation
- JSON-LD: `WebApplication` + `FAQPage` (6 Q&As) schemas
- Homepage hero CTA changed from "View Pro Features" → "AFQT Calculator" (highest-authority internal link on the site)
- `/afqt-score` intro now links to `/afqt-calculator` alongside existing `/calculator` link
- Sitemap entry added (priority 0.9, monthly)
- Title: "AFQT Calculator 2026: Instant Percentile + Category from 4 Subtests"
- Canonical: `https://asvabhero.com/afqt-calculator` (no trailing slash, matches site convention)
- Commit: `0562cce`

**Deferred:** EmailCapture not added to new page until Listmonk wire-up lands (keeps SEO landing clean).

**Follow-up (2026-04-23, same day):** Added 4 branch-specific AFQT pages, one per branch-group:
- `/army-afqt-calculator` — 31 / 50 + FSPC (21-30) path
- `/navy-afqt-calculator` — 35 diploma, 50 + 15 credits GED + DEP Enrichment (28-30), Coast Guard 40
- `/air-force-afqt-calculator` — 36 / 65, Space Force shares standards
- `/marines-afqt-calculator` — 32 diploma, 50 GED (biggest diploma/GED gap), no prep program

Each reuses the same `AfqtCalculator` component (branch eligibility matrix highlights every branch, not filtered). Per-page branch framing, minimum table, below-floor options, branch-specific FAQ (4 Q&As), JSON-LD `WebApplication`+`FAQPage`. Sitemap updated (priority 0.9). Cross-links added from `/afqt-calculator` and from each branch ASVAB line-score page. Fixed stale Air Force AFQT number on `/air-force-asvab-calculator` (was 31, should be 36).

## Traffic Growth Phase 1 (2026-04-19)
Plan: `~/.claude/plans/lets-grow-traffic-first-frolicking-cat.md`

**Shipped:**
- Branch-specific calculator pages: `/army-asvab-calculator`, `/navy-asvab-score-calculator`, `/air-force-asvab-calculator` — each reuses `Calculator` with `branchFilter` prop + branch-specific content (formulas, popular jobs, FAQ)
- `/asvab-retake-calculator` — 1/1/6 rule engine (`src/lib/retake-eligibility.ts` + `RetakeDateCalculator.tsx`). Flags C-Test triggers (20+ pt jumps in 6mo) and DEP branch notes
- **Score Gap Engine** (`src/lib/score-gap.ts` + `ScoreGapEngine.tsx`) — mounted in Calculator. Given a failed `JobEligibilityResult`, returns ranked subtest suggestions (e.g. "Raise WK by 6 to qualify for 68W"). Army/AF/Marines/Navy composite weights included; Navy parsed dynamically
- **Share actions** (`ShareActions.tsx`) — copy link, print, SMS, email. Scores encoded in URL for shareability
- **ResultCard.tsx** — print-only cover sheet for PDF save-as (uses `window.print()`, no PDF deps added)
- **VerifiedBlock.tsx** — reusable source-credibility block ("Last verified: {date}" + source links). Added to top 5 ranking articles.
- **Answer-first rewrites** on 5 top-impression pages: `/how-to-retake-the-asvab`, `/asvab-scores-explained`, `/asvab-gt-score`, `/asvab-score-chart`, `/asvab-scoring-and-results` — titles start with literal query + number/rule, first 80-120 words give the exact answer
- **Fact fix:** `/how-to-retake-the-asvab` — student ASVAB DOES trigger 1/1/6 wait (per officialasvab.com). All 4 occurrences fixed

**Email capture scaffolded, backend pending:**
- `EmailCapture.tsx` mounted in `StudyPlanGenerator`. Posts to `NEXT_PUBLIC_ASVAB_SIGNUP_ENDPOINT` (not yet set). LocalStorage fallback keeps signups from dropping on the floor.
- User rejected Bento (paid). Plan: **Listmonk self-hosted on $24/mo droplet** + **Resend** (or SES) for SMTP. See feedback memory `feedback-no-paid-bento-new-sites.md`.

**Calculator architectural changes:**
- `src/components/Calculator.tsx` accepts `branchFilter?: Branch` prop. When set: filters jobs to that branch, defaults compositeTab, hides branch tabs.
- New mount points in results area (in order): Qualifying → ScoreGapEngine → ShareActions → NonQualifying
- Print styles: `ResultCard` visible only on print (`print:block`); `ShareActions` hidden on print (`print:hidden`)

**Sitemap generator (`scripts/generate-sitemap.mjs`):**
All 4 new pages added with priority 0.9. The generator is source-of-truth — never edit `public/sitemap.xml` directly (it's overwritten on build).

**Email infrastructure (updated 2026-04-20):**
Full reference: [`docs/email-infrastructure.md`](./email-infrastructure.md) — DNS records, Listmonk admin URL, SMTP config, API usage, credentials map, pending work.

Live and working:
- Listmonk self-hosted at `list.asvabhero.com` (droplet `64.23.194.109`)
- Resend domain `asvabhero.com` verified; SMTP via `smtp.resend.com:2587` (STARTTLS, port 2587 because DO blocks 25/465/587)
- From address: `ASVAB Hero <info@asvabhero.com>`
- CF Email Routing: `info@asvabhero.com` → `trish@dach.family`
- List "ASVAB Hero — Study Plan" (ID 3, UUID `6cfd6a05-8ac2-498b-86ca-9bb381e1d006`), single opt-in
- API user `claude-automation` provisioned (Super Admin)
- Credentials in central `.env`: `ASVAB_LISTMONK_*`, `ASVAB_RESEND_API_KEY`

Pending:
1. **Welcome tx template + 5-email drip content** — draft before scheduling
2. **30-day study plan PDF** — the actual lead magnet (client-side `window.print()` or Worker endpoint)
3. **CF Worker signup endpoint** at `signup.asvabhero.com` → POSTs to Listmonk `/api/subscribers`
4. **Wire `NEXT_PUBLIC_ASVAB_SIGNUP_ENDPOINT`** in `.env.production`, commit, push; replay localStorage `asvabhero.pending_signups`

**Broader still open:**
- Reddit distribution cadence (2 hrs/week, plan item 5)
- Weekly GSC tracking: CTR on rewritten pages (target 0% → 1-3%), rank on branch-calc pages (target top 10)

## SEO Content Published (2026-04-27)

**Published:** GT Score Calculator at `/gt-score-calculator` — 2,996-word explainer covering VE+AR formula with worked examples, branch-by-branch GT formulas table (Army/Marines/AF/CG/Navy), MOS requirements table by GT threshold (110/107/105/100/95), BSEP program details (19pt avg improvement, free for active duty GT ≤ 109), 6-week pre-enlistment study plan. 2 tables, 7 callouts, 2 stats-rows, 2 formula blocks, 7-question FAQ. **Interactive GTScoreCalculator component** (`src/components/GTScoreCalculator.tsx`) — 3-input (WK/PC/AR) calculator with formula transparency (VE + AR), 5 qualification tiers with gap badges, gap analysis callout targeting nearest tier and lowest subtest, Navy disclaimer, URL param loading for shared links. Reuses `ScoreInput` component, wrapped in Suspense. Commit: `6497ad9`. Article draft: `asvab-hero/articles/gt-score-calculator-2026-04-26/`.

**Published:** ASVAB Composite Score Calculator at `/asvab-composite-score-calculator` — 3,070-word explainer, transactional intent (reader has scores in hand), AFQT vs composite two-gate system, worked Jordan example across all 6 branches, real MOS/AFSC job thresholds, VE double-count leverage, subtest-to-composite master table. 7 tables, 6 callouts, 3 stats-rows, 4 formula blocks, 7-question FAQ. Key differentiators: Jordan worked example, MAGE-not-percentile clarification, Marine GT MCO 1230.5C note. Article draft: `asvab-hero/articles/asvab-composite-score-calculator-2026-04-26/`.

**Published:** Can I Check My ASVAB Score Online? at `/can-i-check-my-asvab-score-online` — 1,968-word how-to, 7 steps (identify path → CEP portal → MEPS/MET → active duty branch portals → score type disambiguation → score recovery → DEP/PiCAT edge cases). 3 tables, 8 callouts, 2 stats-rows, 6-question FAQ. Key differentiators: direct YES/NO answer by path (competitors hedge), Air Force/Space Force JST exclusion (JST doesn't pull AFPC records, use vMPF), 2-year deletion from DoD database (not just "expiration"), PiCAT scores completely invisible to test-taker until Vtest. Commit: `0b65433`. Article draft: `asvab-hero/articles/can-i-check-my-asvab-score-online-2026-04-27/`.

**Published:** BSEP: The Army's Free GT Score Improvement Program at `/bsep` — 3,507-word explainer, active-duty audience (second piece in enlisted pivot cluster after `/afct`). 6 tables (eligibility tiers, TABE-to-GT mapping, curriculum breakdown, classroom vs virtual comparison, 6-installation outcome data, timeline), 8 callout asides, 4 stats-rows, 1 formula block, 8-question FAQ. Key differentiators: AR 621-5 eligibility tiers (GT ≤99 priority / 100-109 space-available / 110+ ineligible), TABE testing details, 6-month AFCT wait waiver, named case studies with real outcome data, classroom vs virtual format comparison, BSEP ≠ FAST rename correction. Commit: `d328010`. Article draft: `asvab-hero/articles/bsep-2026-05-12/`.

## Conversion Boost (2026-05-08)

Five-phase funnel-fix sprint after audit found **only 4 Listmonk subscribers in 28 days** despite 543 sessions. Plan: `~/.claude/plans/create-subagents-to-plan-zesty-umbrella.md`. Pickup doc: `CONTINUITY-conversion-boost.md`.

**Drip rewrites (2026-05-08, hotfix):** T7-T10 PATCHed via Listmonk API to add Pro pitch + remove Quizlet mention; bodies archived in `docs/email-templates-drafts.md`.

**Code shipped:**

- **Phase A — Email funnel leak fixes**
  - `src/components/EmailCapture.tsx` — IntersectionObserver (50% threshold, fires once); kills the `/calculator` ghost-impression bug (115 mount-fires → 0 conversions). New `withScoreSignal` prop fires `email_capture_visible_with_score` event.
  - `src/lib/analytics.ts` — added `EmailCaptureVisibleWithScore` to `FunnelEvents`.
  - `src/components/Calculator.tsx` — second EmailCapture below `<ResultCard>` rendered only when `afqt > 0`, with score-interpolated headline (`Your AFQT is {afqt} — get the 30-day plan to push it to {afqt+10}`), tag `calculator-result`.
  - `src/app/signup/page.tsx` — fire-and-forget `POST /api/signup` after `auth.signUp` success with tag `supabase-signup`. Closes the leak where Pro signups never reached Listmonk.
  - `functions/api/signup.ts` — server-side `TAG_TEMPLATE_ENV_MAP` resolves welcome template from `body.tag` → env var (`LISTMONK_TEMPLATE_AR_TIPS`, `LISTMONK_TEMPLATE_WK_TIPS`, `LISTMONK_TEMPLATE_GT_BOOSTER`). Falls back to `LISTMONK_WELCOME_TEMPLATE_ID`. Client cannot inject template_id.

- **Phase B1 — Bulk EmailCapture mount on 13 pages** (each with unique tag for segmentation):
  - Calculators: `practice-test`, `gt-score-calculator`, `asvab-line-score-calculator`, `asvab-composite-score-calculator`, `asvab-retake-calculator`, `army-asvab-calculator`, `navy-asvab-score-calculator`, `air-force-asvab-calculator`
  - Exit-ramp inline mounts above pricing UI: `pricing` (tag `pricing-exit`), `upgrade` (tag `upgrade-exit`)
  - Subtest tip pages with mid + end double mount: `asvab-arithmetic-reasoning-tips` (tag `ar-tips`), `asvab-word-knowledge-tips` (tag `wk-tips`), `asvab-paragraph-comprehension-tips` (tag `pc-tips`)

- **Phase B2 — GSC striking-distance title rewrites**
  - `src/app/page.tsx` (homepage) — title now `ASVAB Calculator 2026: AFQT, GT & Line Scores (All Branches)` to capture branch-qualified queries that ranked top-10 with 0% CTR.
  - `src/app/how-to-retake-the-asvab/page.tsx` — title leads with `ASVAB Retake Policy 2026` (was getting 0 clicks across 883 impressions at pos 7.4).
  - `src/app/asvab-gt-score/page.tsx` — title surfaces `VE+AR Formula, Army Cutoffs & How to Raise It` (was 0.30% CTR at pos 9.7).

- **Phase C — Card-required 7-day Stripe trial**
  - `supabase/functions/stripe-checkout/index.ts` — adds `subscription_data[trial_period_days]: 7` and `payment_method_collection: always` ONLY when `tier === "monthly"` AND `!profile.stripe_subscription_id`. Annual tier always direct-charges. Returning canceled customers don't get a second trial.
  - `supabase/functions/stripe-webhook/index.ts` — `checkout.session.completed` now syncs trial-starters to Listmonk with tag `trial-start`. New `customer.subscription.trial_will_end` branch sends Listmonk transactional via `LISTMONK_TEMPLATE_TRIAL_ENDING` env var (Stripe fires this 3 days before trial ends).
  - `src/components/PricingPlans.tsx` — monthly CTA now `Start 7-day free trial — then $9.99/mo` with fine-print line. Annual unchanged.
  - `docs/email-infrastructure.md` — Trial setup section appended documenting webhook events + new Supabase function secrets.
  - **Tracey's existing subscription is protected**: existing 409 block on active/lifetime users prevents her from hitting checkout; even if she did, `isFirstTimeSubscriber` is false because her `stripe_subscription_id` is set.

- **Phase D — Three subtest lead magnets** (PDFs in `public/`, all built via `scripts/build-*.sh` with headless Chrome, all self-contained):
  - `public/ar-formula-card.pdf` (147 KB, 3 pages) — PEMDAS, fraction-decimal-percent table, distance/rate/time, work-rate, mixture, percent change, ratios, 8 word-problem patterns, unit conversions, test-day shortcuts. Source: `scripts/ar-formula-card.html`. Mounted on `/asvab-arithmetic-reasoning-tips` via tag `ar-tips`.
  - `public/wk-100-words.pdf` (228 KB, 4 pages) — 100 high-frequency vocab + 10 word roots + 5-question quiz. Source: `scripts/wk-100-words.html`. Mounted on `/asvab-word-knowledge-tips` via tag `wk-tips`.
  - `public/gt-booster-guide.pdf` (147 KB, 6 pages) — formula, MOS cutoffs by tier (100/107/110/117+), 4 levers, 14-day push schedule (week-grid), retake math, one-page cheat sheet. Source: `scripts/gt-booster-guide.html`. Mounted on `/gt-score-calculator` via tag `gt-calculator`.
  - `public/pc-trap-patterns.pdf` (154 KB, 5 pages) — 60-second triage card, 5 wrong-answer trap patterns w/ kill moves, 3 worked passages with every wrong choice trap-labeled, 4-passage drill, answer key + test-day cue card. Source: `scripts/pc-trap-patterns.html`. Mounted on `/asvab-paragraph-comprehension-tips` (mid + end) via tag `pc-tips`. Listmonk tx template id `16` (`tx-pc-magnet`), CF Pages env var `LISTMONK_TEMPLATE_PC_TIPS=16`.

**Verification status:** Shipped 2026-05-08, commit `51adb5e`. Edge functions (stripe-checkout, stripe-webhook) deployed. 4 Listmonk templates created (ids 12/13/14/15). CF Pages env vars + Supabase secrets set. Live + verified.

## Trial Member UX (2026-05-08)

Activation-first improvements after shipping the trial. Plan: `~/.claude/plans/asvab-hero-trial-experience.md`. Three phases, all live.

- **Migrations 0003–0006** — `welcome_email_sent_at` + `welcome_email_resend_id` + `welcome_email_status` (0003); `trial_ends_at` (0004); `branch` + `target_test_date` + `target_test_date_bucket` + `self_reported_weakest_subtest` + `onboarding_completed_at` (0005); `trial_day2_email_sent_at` + `milestone_50q_email_sent_at` (0006).
- **Automated Pro welcome (Resend)** — `supabase/functions/stripe-webhook/index.ts` `sendWelcomeEmail()` fires on `checkout.session.completed` only. Two HTML bodies inline (`renderWelcomePaid`, `renderWelcomeTrial`); template chosen via `sub.status === "trialing"`. Idempotent via `welcome_email_sent_at`. First-name extracted from `customer_details.name` and backfilled into `display_name` only when NULL.
- **Trial banner** — `src/components/account/TrialBanner.tsx` mounts on `/account` when `entitlement.isTrial`. Shows days remaining + single next-action CTA from `src/lib/account/next-action.ts` (resume in-progress → diagnostic → drill weakest topic → re-baseline). `useEntitlement` returns `isTrial` + `trialDaysRemaining`.
- **Onboarding flow** — `/onboarding` (`src/app/onboarding/page.tsx`, wrapped in Suspense for static export) + `OnboardingForm` (3 questions: branch / test-date bucket OR specific date toggle / weakest subtest). Submit redirects to `/practice-test?variant=diagnostic&welcome=1`. "Skip for now" stamps completion with NULL data. `/account` redirects Pro+NULL-onboarding users here. Stripe `success_url` → `/onboarding?welcome=1`.
- **Trial drip cron** — `scripts/asvab_drip_trial.py` (stdlib Python) on droplet at `/root/scripts/asvab_drip_trial.py`. Hourly cron at `:17`. Job 1: day-2 activation nudge (skipped if any `attempts` row). Job 2: 50-question milestone (event-triggered, fires once). Both via Resend, idempotent via timestamp guards. Env appended to `/root/scripts/asvab_drip.env`.
- **Email drafts** — `docs/email-templates-drafts.md`. 4 Listmonk transactional (`tx-ar-formula-card` 12, `tx-wk-100-words` 13, `tx-gt-booster` 14, `tx-trial-ending` 15) + 4 Resend inline (`welcome-paid`, `welcome-trial`, `trial-day2-activation`, `trial-milestone-50q`).
- **Stripe webhook events enabled:** `checkout.session.completed`, `customer.subscription.{created,updated,deleted,trial_will_end}`, `invoice.paid`.
- **Signup attribution fix (2026-05-08):** EmailCapture tag now propagates to `signup_complete` via `localStorage["asvabhero.last_capture_source"]` (14-day TTL, cleared on read), replacing hardcoded `signup_page` source.
- **Drip cron filter (2026-05-08, hotfix):** added `attribs.source` exclusion of `trial-start` + `paid` users to `/root/scripts/asvab_drip.py` to prevent double-emailing trial subscribers and off-message free-tier sends to paid users. `--dry-run` flag added. Repo snapshot at `scripts/asvab_drip_LIVE_SNAPSHOT.py`.
- **GA4 re-audit + cleanup (2026-05-12, commit `a119a9a`):** Verified `51adb5e` fix in production — `full-calculator` ghost impressions dropped 76% per-pageview; `email_capture_visible_with_score` hit 63 fires with 97% coverage of scored results. Removed the dead `full-calculator` EmailCapture mount from `src/app/calculator/page.tsx` (12 shown / 0 submits over 5/9–5/12). Chrome smoke test confirmed the localStorage attribution handoff works end-to-end. Audit + annotations: `~/.claude/plans/asvab-ga4-baseline.md`. Next lever for `calculator-result` (1.6% submit vs `upgrade-exit` 8.3%) is form friction / trust, NOT copy or viewport — both already optimal.

### Stripe webhook saga (2026-05-09 → 2026-05-13)
- **`verify_jwt=true` regression on `stripe-webhook` v10 (2026-05-09 → 2026-05-12):** All Stripe deliveries 401'd for ~3 days because the sprint redeploy didn't pin `verify_jwt`. First real trial user (gaelkore0) got double-charged-pending (2 trial subs) with no Pro access. Fix: `supabase/config.toml` pins `[functions.stripe-webhook] verify_jwt = false`; redeploy → v11. Backfilled the user's profile + sent manual welcome+apology. Findings + replay TODO at `Personal/asvab-hero/CONTINUITY-trial-verification-2026-05-12.md`.
- **T+1 trial-converted personalization (2026-05-12, commit `e98b0da`, stripe-webhook v11):** `sendTrialConvertedEmail` now injects 3 fields — `attemptsCount` / `accuracyPct` / `weakestSubtestName` — as a soft inline sentence after the opener. Helper `getTrialConvertedPersonalization()` reads lifetime `attempts`, sums top-level `correct_count`/`question_count` for accuracy, reduces `results_by_subtest` jsonb in JS for the weakest pick (seen ≥ 5, canonical tie-break GS→AO). Returns null on zero attempts / `total_questions=0` / DB error → falls back to the original unpersonalized body. Subtest names sourced from new `supabase/functions/_shared/subtests.ts` (mirror of `src/types/index.ts SUBTEST_NAMES`; do not let drift). Same commit also fixed the read-then-send-then-stamp race in this function with an atomic conditional UPDATE claim (status='sending' iff `sent_at IS NULL AND status IS DISTINCT FROM 'sending'`) — concurrent Stripe retries now exit cleanly instead of double-sending. Visual QA passed 2026-05-12 (3 Resend variants to trish@dach.family — three-clause, two-clause, unpersonalized). First organic T+1 candidate is still gaelkore0's 2026-05-19 trial conversion.
- **`current_period_end` API version fix (2026-05-13, commit `07d04f5`, stripe-webhook v12):** Stripe API `2025-03-31.basil` moved `current_period_end` off the subscription object onto subscription items. `updateProfileFromSubscription` at line 56 was reading `sub.current_period_end` → undefined → `new Date(NaN).toISOString()` → RangeError. Every `customer.subscription.created/updated` webhook had been silently failing since the API version pinned forward. Fix reads `sub.items.data[0].current_period_end` first, falls back to top-level (older API) then `trial_end` then null. Surfaced via Stripe CLI replay of `evt_1TW9p4DjRScowBLlaczpDogO` against v11; replay against v12 processed cleanly and gaelkore0's `pro_until` populated correctly. Implication: gaelkore0's profile only had correct state pre-fix because of the manual 2026-05-12 backfill — without this patch, every future trial signup would need manual backfill. **Watch:** future Stripe API version bumps that move fields again.
- **Staleness guard for replayed sub events (2026-05-13, commit `554312b`, stripe-webhook v14):** Replayed subscription events for superseded subs (e.g. gaelkore0's 06:02 cluster pointing at the cancelled duplicate `sub_1TW9OSDjRScowBLlCaE4QiQD`) were clobbering the profile's `stripe_subscription_id` back to the cancelled sub and flipping billing fields. New helper `subscriptionEventIsStale(userId, incomingSubId, eventCreatedSec)` returns true when incoming sub_id differs from the profile's current sub_id AND `pro_updated_at > event.created`. Applied at three call sites: `updateProfileFromSubscription` internally, `customer.subscription.deleted` (only cancels when sub.id matches), and `checkout.session.completed` (early-break before any direct write — the unguarded direct write at the top of that handler was bypassing the internal guard). All 3 call sites now pass `event.created`. Verified by deleting idempotency rows + re-replaying the 06:02 cluster against v14: events processed but profile state preserved (kept-sub id unchanged, `pro_until` unchanged). **Operational note:** if you ever need to clear stale idempotency rows to re-test, `DELETE FROM stripe_webhook_events WHERE stripe_event_id IN (...)`.
- **Stripe webhook event drift prevention (2026-05-13, commit `ca229c7`):** Two layers preventing Dashboard event subscription drift. (1) `scripts/deploy-stripe-webhook.sh` wraps `supabase functions deploy` and runs `scripts/enforce-webhook-events.sh`, which reads `supabase/functions/stripe-webhook/enabled-events.json` and applies the canonical event list to Stripe via API (idempotent; `--dry-run` flag for safe inspection). Use this script instead of bare `supabase functions deploy stripe-webhook` from now on. (2) n8n workflow `cKYDZEeHWh9ijjCv` (active, Monday 13:00 UTC) fetches live Stripe endpoint config + the canonical JSON from `raw.githubusercontent.com/alttoby7/asvab-hero/main/...` and emails trish@dach.family via Resend if they diverge. New credentials: `ASVABHERO Stripe Secret Key` (`cgcwBKK200y2iEp1`) + `ASVABHERO Resend API Key` (`IXN8igofXMKAxBEo`). Future event additions: edit `enabled-events.json`, push to main, the deploy script auto-syncs (or the next cron run reports the drift).
- **`invoice.payment_failed` handler + `signup_source` trigger restore (2026-05-13, commit `4efb3b7`, stripe-webhook v22):** Dunning email path. `payment_failed_emails` ledger table (migration 0011) keyed on `invoice_id` PK ensures one email per failed invoice across Stripe Smart Retries (3–4 events sharing the same invoice.id). Handler gates by `collection_method='charge_automatically'` AND `billing_reason='subscription_cycle'` — other combos record a `suppressed_*` ledger row but don't send. Copy says "Pro is paused" because `has_active_pro()` in `0002_billing.sql` only treats `billing_status IN ('active','lifetime')` as Pro (verified before writing copy — `past_due` gates access). Recovery annotation in `invoice.paid` case stamps `recovered_at` when paid lands for a previously-failed invoice. Runbook at `docs/runbooks/stripe-webhook-events.md` lists canonical subscribed events + Stripe CLI drift-check command. **Pending operator step:** enable `invoice.payment_failed` in Stripe Dashboard for `we_1TRQ39DjRScowBLlbLoSKKXX`. Also bundled in this commit: migration 0012 re-applies the `handle_new_user()` trigger function body — verified via `pg_proc.prosrc` that migration 0007's `CREATE OR REPLACE FUNCTION` never took effect in production (column existed but function body was still the 0001 version, silently writing NULL for `signup_source` since 2026-05-08 when the client started passing it). 0012 also adds explicit `search_path = public, pg_temp` pin against SECURITY DEFINER footguns. Backfilled 2 recoverable users (gaelkore0 → `signup_page`, diegoamartinez1019 → `practice-test`); 5 users predate 2026-05-08 client change and stay NULL. **Lesson:** migration files are not evidence of runtime state — always verify `pg_proc`/`pg_trigger` after a migration that touches functions.

## AFCT Practice Test Landing Page (2026-05-12)
- **Route:** `/afct-practice-test` — thin SEO page reusing existing `diagnostic` variant for active-duty AFCT audience.
- **New files:** `src/components/practice-test/AfctPracticeClient.tsx` (gate+engine wrapper, hardcodes `variant="diagnostic"` with AFCT `testName`/`testDescription`), `src/app/afct-practice-test/page.tsx` (Quiz+FAQPage JSON-LD, 5 FAQs, risk callout, GT thresholds, `tag="afct-practice-test"` EmailCapture).
- **Modified:** `src/app/afct/page.tsx` (practice-test links → `/afct-practice-test`, CTA box now dual-button), `src/app/practice-test/page.tsx` ("Active duty?" cross-link), `scripts/generate-sitemap.mjs` (+1 entry).
- **Hero:** `public/images/generated/afct-practice-test-hero.png` (gpt-image-1).
- **No engine changes** — same gate, sampler, question pool, variant. Only framing differs.
- **Not yet committed or deployed.**

**Out of scope (deferred):** daily challenge MVP, score projection messaging, push/SMS, trial extension UI.

## App Shell — Logged-in UX (2026-05-12)
- **Route:** `/app/home` — daily hub for logged-in users. Auth-guarded layout at `src/app/app/layout.tsx`.
- **AppNav:** `src/components/AppNav.tsx` — Home, Practice, Study, Flashcards + account dropdown. No marketing chrome.
- **Home page modules:** Greeting+countdown, MissionCard (adaptive CTA), StatsRow (streak/AFQT/accuracy), JobGoalCard (pick target MOS + gap analysis from diagnostic scores), MasteryMap (9 subtest bars + expandable 39-topic grid), QuickActions (flashcards/mistakes/history).
- **Components:** `src/components/app/{MissionCard,StatsRow,MasteryMap,QuickActions,JobGoalCard}.tsx`
- **Daily Challenge:** `/app/daily` page + `src/components/daily-challenge/{DailyChallengeEngine,DailyChallengeResults}.tsx`. 10 questions (3 from weakest topics + 7 random), 12-min timer. Saves to `daily_challenges` + `attempts` (source: `daily_challenge`). Streak logic: increment if last was yesterday, reset to 1 otherwise. Client-side question selection for v1.
- **AppNav:** 5 tabs — Home, Daily, Practice, Study, Cards. Mobile bottom tab bar, desktop top bar. Lightning bolt icon for Daily.
- **Utility:** `src/lib/estimate-scores.ts` — converts diagnostic per-subtest results to estimated standard scores for job matcher.
- **Redirect plumbing:** Login → `/app/home`, onboarding → `/app/home`, `/account` → `/app/home` (redirect). Login respects `?next=` param.
- **Not yet committed or deployed.**
- **Remaining:** Profile columns for job goal persistence (`target_job_branch`, `target_job_id`). Edge Function for daily challenge generation (future optimization). Phase 2: `/app/progress`, `/app/mistakes`, `/app/history`.

## Marketing Strategy
Full memo: `docs/marketing-strategy-2026-04-28.md`. Quick state:

- **Skill updated:** `asvab-post-writer` now models two products — SEO articles AND subtest topic study guides (markdown into `content/study-guides/{subtest}/{topic}.md`, no page.tsx). Frontmatter shape, body structure, and Pro-funnel role spec'd in the skill.
- **Study guides reframed:** defensive product completeness for the Pro funnel, not a growth channel. GSC has zero striking-distance signal for topic content. Don't invest growth budget on the remaining 17 non-AFQT pages.
- **Decision lean: Failed-ASVAB Recovery Funnel.** Acute pain segment (30-day retake clock, demonstrated buying intent). Open architecture choice: standalone $49 30-day track vs. Pro variant with retake guarantee. Pre-reqs: baseline score guarantee, decide offer architecture. (Stripe live-mode flip is DONE — see Monetization Layer.)
- **Score Insurance considered + rejected** (adverse selection, verification, regulatory exposure). Standard money-back guarantee with engagement gates is the de-risked replacement.
- **Top non-funnel moves to sequence after:** recruiter B2B dashboard, "Score Your AI" stunt, TikTok score-transformation reels, Reddit/Discord plan execution.

## Observability — Sentry + Webhook Deadletter (2026-05-12)
End-to-end webhook deadletter + Sentry across 11 failure surfaces. Plan at `~/.claude/plans/do-this-now-curried-waffle.md`, refined with /codex over 3 rounds.

- **3 Sentry projects under `asvab-hero` org:**
  - `asvab-hero-next` (frontend) — `NEXT_PUBLIC_SENTRY_DSN` in CF Pages prod env
  - `asvab-hero-edge` (Supabase Edge + CF Pages Functions) — `ASVABHERO_SENTRY_DSN_EDGE` in Supabase Edge secrets + CF Pages env
  - `asvab-hero-cron` (droplet Python crons) — `ASVABHERO_SENTRY_DSN_CRON` in `/root/.env`
  - DSNs + auth token in central `.env` as `ASVABHERO_SENTRY_DSN_{NEXT,EDGE,CRON}` + `ASVABHERO_SENTRY_AUTH_TOKEN` + `ASVABHERO_SENTRY_ORG=asvab-hero`
- **`stripe_webhook_events` table (migration 0009):** durable receipt of every verified Stripe event. Top of `stripe-webhook` does SELECT → claim flow (status state machine: processing|processed|failed, status-guarded transitions, 5-min stale reclaim on `updated_at`). Replays return 200 instantly. Failures persist `last_error`; next Stripe retry re-enters via `failed → processing` and re-runs the handler. Full payload stored in `payload jsonb` for manual replay.
- **`profiles.trial_ending_email_*` cols:** idempotency for `customer.subscription.trial_will_end` Listmonk reminder. Was previously zero-idempotency — Stripe replays could double-send.
- **Sentry helpers:**
  - `supabase/functions/_shared/sentry.ts` — manual envelope POST for Deno edge (matches existing no-SDK style)
  - `functions/api/_sentry.ts` — same for CF Pages Workers (signup.ts)
  - `scripts/sentry_helper.py` — sentry-sdk wrapper with `run_with_checkin(slug, monitor_config, fn)`. Both crons deployed to `/root/scripts/` on droplet; `pip3 install --user sentry-sdk` ran 2026-05-12.
- **2 cron monitors auto-created via check-in:**
  - `asvab-drip-listmonk` — crontab `0 2 * * *` UTC
  - `asvab-drip-trial` — interval `1 hour`
  - Free Developer plan only includes 1 monitor; second monitor's check-ins may silently drop. Upgrade to Team ($26/mo) if both need reliable tracking.
- **Noise policy:** signature verify fail → `error`; vendor non-2xx (Resend/Listmonk) → `warning` with fingerprint `[vendor-non-2xx, provider, template]` so outages group as one issue; unhandled throws → `exception`; our own 4xx → no capture.
- **Bug fixes bundled in same commit:**
  - `stripe-webhook` line ~506: trial-start Listmonk sync no longer swallows HTTP non-2xx (was only catching thrown exceptions). 409 treated as expected ("already subscribed").
  - `functions/api/signup.ts` line 168: welcome-tx swallow now fires Sentry warning. UX still non-blocking (keeps 200).
- **Verified live 2026-05-12:** signature-fail → Sentry capture ✓; both cron monitors auto-created in `asvab-hero-cron` via dry-run check-ins ✓. **Stripe CLI smoke test** (test mode webhook endpoint registered + deleted in same session, dual-secret verify temporarily enabled): happy path (`checkout.session.completed`) → row inserted as `processed` ✓; idempotency replay → 200 in 354ms with zero row mutation ✓; stale-processing reclaim → wedged row at `processing/3/10min-stale` → reclaimed → finalized `processed/4` ✓. **Vendor-non-2xx warning + fingerprint grouping verified** by firing 3 manual envelopes with identical `fingerprint=['vendor-non-2xx','resend','welcome-trial']` — Sentry collapsed all 3 into one issue `ASVAB-HERO-EDGE-3` with count=3 ✓. End-to-end through `sendWelcomeEmail` still requires real `metadata.user_id`, but the captureMessage helper is the same code path.
- **Real bug caught by Sentry within hours of deploy:** issue `ASVAB-HERO-EDGE-2` `RangeError: Invalid time value` at 04:55:22 UTC — `current_period_end` from Stripe API `2025-03-31.basil` (now on subscription items, not on sub object). Fixed in same-day patch (`subscriptionEventIsStale` guard + nullable `pro_until` fallback in `updateProfileFromSubscription`). System earned its keep before any customer-reported incident.
- **Stripe CLI auth:** logged in to Basecamp Digital (`acct_1RAFiSDjRScowBLl`), test mode. CLI key expires 2026-08-11 — re-run `stripe login` then.
- **Dual-secret verify:** stripe-webhook accepts both `ASVABHERO_STRIPE_WEBHOOK_SECRET` (live) and `ASVABHERO_STRIPE_WEBHOOK_SECRET_TEST` (test, only when env set). Currently TEST unset; code is safe no-op without it. To re-test in future: `stripe webhook_endpoints create --url <fn url> --enabled-events ...` → capture secret → `supabase secrets set ASVABHERO_STRIPE_WEBHOOK_SECRET_TEST=...` → redeploy → `stripe trigger ...` → cleanup with `stripe webhook_endpoints delete <we_id> --confirm` + `supabase secrets unset`.
- **v2 cleanup:** delete `mirrorToDashboard` (winning.basecampdigital.pro) ~2 weeks post-launch once Sentry has caught everything the dashboard was showing.
- **Dashboard read access (2026-05-13):** migration `0015_dashboard_export_webhook_events.sql` grants `dashboard_export` role SELECT on `stripe_webhook_events` for the AsvabWebhookHealth widget at winning.basecampdigital.pro. Read-only, isolated role.

## Conversion Sprint (2026-05-20)
Commits `49439e9`, `9deebb2`. "Make money now" pass — ASVAB Hero is the only personal project with a live paid product. Plan: `~/.claude/plans/open-personal-projects-and-linear-quill.md`; continuity: `~/google-drive/0-AI/Personal/asvab-hero/CONTINUITY-conversion-sprint-2026-05-20.md`.
- **Stripe confirmed LIVE** (see Monetization Layer) — corrected stale "test mode" doc lines.
- **Pro CTA at the calculator result moment** (`src/components/Calculator.tsx`): upsell card shown when `afqt > 0 && !entitlement.isPro` → `/upgrade?from=calculator-result` with `calculator_pro_cta_click` tracking. Renders on all 13 calculator pages. Closed the funnel's biggest gap (highest-intent moment previously had only an email form).
- **Homepage → Tier-1 hub link:** added a prominent in-body link to `/asvab-score-requirements` (`src/app/page.tsx`).
- **Lead-magnet funnel verified working** (was wrongly believed missing): all 5 PDFs exist in `public/`; welcome template 5 links `study-plan.pdf`; CF Pages has `LISTMONK_WELCOME_TEMPLATE_ID=5` + per-subtest overrides (AR=12, WK=13, GT_BOOSTER=14, PC=16).
- **Day-7 drip deployed** (template 17 — see Monetization Layer).
- **Indexing audit:** ~35/73 pages not indexed (mostly "crawled/discovered – currently not indexed" = quality/authority on a young site; no robots/canonical bug). Biggest fixable contributor = cannibalization (next section).

## Cannibalization Consolidation (2026-05-20)
Commits `14825b9` (consolidation) + `fbf3c01` (Navy table dedupe). Refined with Codex; scope chosen with the user. None of the dupes were indexed (zero GSC impressions) so no ranking history was at risk. Mechanics: merge unique content into the winner → 301 in `public/_redirects` → repoint all internal links (incl. Tier-1 hub spokes) → drop paths from `scripts/generate-sitemap.mjs` → delete old route dirs. Verified: clean build, zero internal links to redirected slugs, no redirect chains, all 7 old URLs return live 301 → winner, winners 200.
- **Marines:** renamed `/asvab-marines-score` → **`/marines-asvab-score`** (sibling-pattern fix); folded in `/asvab-score-for-marines` minimums + MOS tables. 301: both old slugs → `/marines-asvab-score`.
- **Navy:** canonical **`/navy-asvab-score`**; folded in the minimums-by-rating tables; broadened title to dual intent. 301: `/navy-asvab-score-requirements` → it. **Follow-up (`fbf3c01`):** the merge had left two overlapping ratings tables with conflicting FY2026 values (IT, FC, CTR, YN, MA, LS, CS) — removed the redundant "Popular Ratings" table, kept the comprehensive category-grouped "Minimums by Rating" tables, preserved the lone unique rating (GM → Aviation/General).
- **Warrant officer:** canonical **`/warrant-officer-requirements`**; folded Army specifics in. 301: `/army-warrant-officer-requirements` → it.
- **GT cluster (moderate scope):** pillar **`/gt-score`** absorbed `/asvab-gt-score`, `/calculate-gt-score`, `/gt-score-max` (301'd). Kept distinct: `/gt-score-requirements` (110-wall intent) and `/gt-score-calculator` (tool).
- **Kept (not redirected):** `/mos-asvab-score-requirements` (distinct threshold-directory intent).
- **Open:** confirm in GSC over coming days that redirected URLs drop and winners move toward indexed.

## Embeddable Widgets + Link-Building + Missing Calculators (2026-06-09)
Two squash-merged PRs (#7 `76e72b5`, #8 `99fdfd7`). Started from an outreach deliverability review; full session detail in Drive `CONTINUITY-embed-widgets-link-building-2026-06-09.md`.
- **Counselor page rework (`/counselor-resources`):** inverted the page so the free interactive tools (calculator, practice test, study guides) are the primary linkable assets instead of the calculator being framed as "an optional add-on." Kept all official source citations as credibility. Added `FAQPage` + `ItemList` JSON-LD and a bottom `RelatedLinks` block.
- **Embeddable widget program (the backlink play):** chrome-free `/embed/afqt-calculator` and `/embed/score-requirements` iframe targets — each `noindex`, canonical to the real page, carrying a do-follow "Powered by ASVAB Hero" backlink (the SEO payload). Plus an `/embed` directory page (keeps chrome) with copy-the-iframe snippet boxes (`src/components/EmbedSnippet.tsx`, clones the `ShareActions` clipboard pattern). `AfqtCalculator` got an `embedded` prop so the in-frame CTA breaks out of the iframe.
- **Chrome guard mechanism:** `Nav.tsx`, `Footer.tsx`, `UpgradeBanner.tsx` now also `return null` on `pathname.startsWith("/embed/")` — **trailing slash on purpose** so the `/embed` landing page keeps chrome and only the iframe targets render bare.
- **Shared data extraction:** pulled the inline `BRANCH_MINIMUMS` out of `AfqtCalculator` into `src/lib/branch-minimums.ts` (one source of truth for the eligibility matrix + the score-requirements widget).
- **Missing calculators shipped** (long-flagged in CLAUDE.md): `/marines-asvab-calculator` (GT/MM/EL line scores, full MOS matching), `/coast-guard-asvab-calculator` (Navy-style composites, full rating matching, Nov-2023 AFQT floor 32), `/space-force-asvab-calculator` (**mirrors the Air Force MAGE calculator exactly — no new normalization invented**, MAGE mins shown as estimates with the unverifiable caveat; the MAGE percentile-normalization bug stays open). Extended the `Branch` type in `src/lib/calculator-links.ts` with `coast-guard` + `space-force` and added 3 `branch-full` taxonomy entries.
- **Email docs corrected (no code):** verified live DNS shows asvabhero.com **migrated to Google Workspace** (MX → google, SPF `_spf.google.com`, `google._domainkey` + `resend._domainkey` DKIM, DMARC `p=quarantine; adkim=s; aspf=s`). Rewrote `docs/email-infrastructure.md` (old Cloudflare Email Routing sections marked SUPERSEDED); added `docs/outreach-deliverability.md` (manual sends from Workspace pass strict-aligned; never run cold outreach through a third-party tool on the root domain under `p=quarantine`; scale via a subdomain); added `docs/outreach-kit-revisions-2026-06.md` (repointed Template A to deep links, new Template D = embed offer).
- **Open:** operator to confirm/teardown any legacy CF Email Routing rules (`info@`, `*@` catch-all) now that Workspace owns MX; run the outreach (≤8–10/wk manual, lead with the embed offer for LibGuide + Google-Sites targets; tracker sheet in Drive); MAGE normalization bug still deferred.
