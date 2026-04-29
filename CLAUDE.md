# ASVAB Hero — Project Notes for Claude

## Stack
- Next.js 15 static export (`output: "export"`)
- Tailwind v4 with custom CSS variables in `src/app/globals.css`
- TypeScript, no test suite
- Deploy: Cloudflare Pages (auto-deploys on push to `main`)
- Domain: asvabhero.com (Cloudflare DNS → Cloudflare Pages)
- Build output: `out/` (static export)
- Cache: `public/_headers` controls caching for static assets
- **Supabase backend (LIVE 2026-04-27, commit `3e775a2`):** Postgres + Auth + Edge Functions. Project ref `abypyprvgvofzrtifgzi`. Schema in `supabase/migrations/0001_init.sql`. Env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (set in CF Pages production + local `.env.local`). Service-role key + access token in central `.env` as `ASVABHERO_SUPABASE_SECRET_KEY` / `ASVABHERO_SUPABASE_ACCESS_TOKEN`.
- App surfaces (auth/practice/study) are client-rendered React talking to Supabase JS. Marketing pages stay static. No SSR — static export still applies.

## Adaptive Practice Platform v1 (2026-04-27)
- **Auth:** `/login`, `/signup`, `/account`, `/reset-password`. Email + password. Email confirmation enforced.
- **Practice variants live:** `diagnostic` (30q), `subtest_drill` (25q). Inactive in DB (gated for v2/v3): `afqt_sprint`, `weakness_loop`, `retake_readiness`, `full_sim`.
- **Question bank:** 769 active items in `practice_questions` table, 39/39 topics covered, all 5 difficulty levels per topic. Source files (8): `src/data/practice-tests/{free-test.json, expansion-batch-{1..7}.json}`.
- **Bank build:** `node scripts/build-questions-seed.mjs` → `supabase/seed-questions.sql` → `supabase db query --linked --file supabase/seed-questions.sql` (needs `SUPABASE_ACCESS_TOKEN` exported). New batch files MUST be added to the `all = [...]` array in the build script.
- **Study guide:** `/study/[subtest]/[topicSlug]` with markdown content in `content/study-guides/`. 39/39 topic pages live (see Study Guide Coverage below). MiniDrill component pulls 5 questions per topic from Supabase.
- **Edge Functions deployed:** `migrate-local-profile` (anon→registered), `delete-account` (cascade-delete), `export-account-data` (JSON download). Located in `supabase/functions/` — excluded from Next.js tsconfig because they import via Deno-style URLs.
- **Audit doc:** `docs/question-bank-audit.md` (3 audits — initial, batch-2 re-audit, full-corpus post-tripling).
- **Plan:** `~/.claude/plans/adaptive-churning-shell.md` — full design (schema, variants, adaptive logic, v1→v3 phasing).
- **Memory:** `~/.claude/projects/-home-trisha-google-drive-0-AI/memory/asvab-platform-v1.md`
- **Pending v2/v3:** flashcard SM-2 UI (schema is in DB, no UI yet), daily 10-q challenge Edge Function + Listmonk reminder, AFQT Sprint + Weakness Loop variants, Full ASVAB Sim + Retake Readiness (gated on bank growth ≥1000 items). Stripe live-mode flip required before real revenue. ~30 study guide pages body length >400 words (audit flagged, not blocking).

## Monetization Layer (2026-04-27 → 2026-04-28)
- **Stripe test mode end-to-end.** Schema `0002_billing.sql` adds billing columns + `has_active_pro()` SQL fn. Product `prod_UQ8lIeJ18IMwZm`. Plans: $9.99/mo or $49.99/yr.
- **3 Stripe Edge Functions deployed:** `stripe-checkout`, `stripe-portal`, `stripe-webhook`. Webhook secret: `ASVABHERO_STRIPE_WEBHOOK_SECRET` in central `.env`.
- **Hard paywall:** free users hit wall after first diagnostic; Pro unlocks unlimited diagnostics + history.
- **Account dashboard redesign:** `/account` is now a SaaS dashboard (greeting, stats, recent attempts, weak topics, plan card). Settings → `/account/settings`. New: `/account/billing` (Customer Portal link), `/account/history` (Pro-only).
- **Conversion nudges:** sticky `<UpgradeBanner />` in layout.tsx for free authed users; Pro upsell card on TestResults; Upgrade button in Nav for free authed users only.
- **Day-7 Listmonk drip:** template at `docs/listmonk-template-pro-upgrade-day7.html`, deploy steps at `docs/listmonk-deploy-day7.md`. NOT yet deployed.

## Study Guide Coverage (2026-04-28)
All 39/39 topic pages are live. 36 missing pages authored in one session (5 parallel agents) across all 9 subtests. Each file at `content/study-guides/{subtest}/{topic-slug}.md` — frontmatter + 250-400 word body + worked examples + pitfalls section.

## Homepage Redesign (2026-04-28)
Hero refocused on platform pitch (769q/39 topics/9 subtests proof points). Three-pillar grid: Calculator / Practice / Study Guide. Replaced stale "Coming Soon" Pro teaser with real Pro section + Upgrade CTA. Reduced to single mid-page email capture (was two).

## Affiliate / Funnel Pages (2026-04-28)
Commits `6e028ec` / `f3d9c57`. Strategy: Amazon Associates (books only) + Pro conversion — no links to competing online subscriptions (Mometrix Academy, Kaplan online, Princeton Review online, Peterson's online).
- `/best-asvab-study-book` — Amazon Associates roundup, 9 books, tag `fidohikes-20`, FTC-disclosed
- `/best-asvab-online-prep` — comparison page, Pro listed #1, no affiliate links to competing online courses
- `/free-asvab-practice-tests` — informational funnel page driving signups to OUR diagnostic + email list

## AFQT Scoring Model

### Source
The official AFQT percentile table is the **PAY97 norming table** from:
> DMDC, "Development and Evaluation of the 1997 ASVAB Score Scale" (July 2004), Table 2.5

### Formula
```
VE = WK + PC          (Verbal Expression composite)
raw = 2 × VE + AR + MK
percentile = PAY97_RANGES lookup(raw)
```

### Subtest Score Scale
The 4 AFQT subtests (AR, WK, PC, MK) use **standard scores on a 20–62 scale** for the AFQT formula. The app UI accepts 20–145 (needed for composite/line score calculations), so values above 62 are **clamped to 62** before the AFQT raw score is computed.

### Implementation
- Table + function: `src/lib/score-calculator.ts` — `PAY97_RANGES`, `afqtPercentileFromRaw`, `calculateAFQT`
- Default scores for AR/WK/PC/MK: **35** (maps to ~59th percentile — realistic below-average recruit starting state)
- Default scores for GS/EI/AS/MC/AO: **50** (used for composites only, not AFQT)

### Why clamping, not rescaling
Linearly rescaling 20–145 → 20–62 is not official AFQT methodology. The PAY97 table is calibrated for real ASVAB standard scores. Users entering their actual score report values (which are on the 20–62 scale) get accurate results. Users entering values > 62 (not real subtest standard scores) are silently clamped.

## Composite / Line Scores
Composite scores sum multiple subtest standard scores, so their range naturally exceeds 62. The 20–145 input range accommodates this. Composite scoring formulas are in `src/lib/score-calculator.ts`.

## Design System
Dark navy `#0a1628`, orange accent `#f97316`. All custom tokens in `@theme` block in `globals.css`. See `src/app/globals.css` and `.claude/skills/asvab-post-writer/references/design-system.md` for full JSX patterns.

## Article Pages
Content articles use `prose-asvab` CSS class. DVIDS hero images use `DvidsHeroImage` component with DoD endorsement disclaimer. See `scripts/dvids-image.py` to download images with attribution.

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
Full reference: [`docs/email-infrastructure.md`](./docs/email-infrastructure.md) — DNS records, Listmonk admin URL, SMTP config, API usage, credentials map, pending work.

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

## Calculator Audit Fixes (2026-04-27) — Commits `df162a1`, `1aa7cd3`

**Bug fixes shipped:**
- **Air Force M formula** (`src/lib/score-calculator.ts`): Was `MC + AS + GS`; fixed to `MC + 2×AS + GS`. Official USAF spec doubles AS in the Mechanical composite.
- **Navy SEAL OR-paths** (`src/data/navy-jobs.json` + `src/lib/job-matcher.ts` + `src/types/index.ts`): SEAL was encoded as AND (user must meet BOTH `GS+MC+EI ≥ 165` AND `VE+AR+MK+MC ≥ 220`). Official: EITHER path qualifies. Added `anyOf?: ScoreRequirement[]` to `MilitaryJob` type + OR-logic in `evaluateJobEligibility`. When all `anyOf` paths fail, the closest path's deficit surfaces in gap analysis.
- **Air Force A legacy formula** (`src/app/asvab-line-score-calculator/page.tsx`): Three places showed `A = NO + CS + VE` (Numerical Operations + Coding Speed — discontinued 2002). Corrected to `A = WK + PC + MK` in JSON-LD, formula block, and FAQ prose. Removed false claim that NO/CS "still appear in some formulas."
- **Dead data removed**: `src/data/army-mos-asvab-requirements.json` — 1,566-line file not imported anywhere; deleted.

**MAGE normalization — known unresolved issue:** Air Force MAGE job thresholds in `air-force-jobs.json` use a 1–99 percentile scale (per official USAF), but `calculateAirForceComposites()` returns raw subtest sums (60–186 range for 3-subtest composites). Result: nearly all users show as qualifying for all AF AFSCs because raw sums (e.g., G=105) exceed percentile thresholds (e.g., G≥55). Fixing this requires either (a) adding a MAGE normalization lookup table (like PAY97 for AFQT) to convert raw sums → 1–99, or (b) recalibrating all AF job thresholds to raw sum equivalents. Deferred.

**Open P2 gaps:** `/marines-asvab-calculator`, `/coast-guard-asvab-calculator`, `/space-force-asvab-calculator` — each follows the `/army-asvab-calculator` pattern with `branchFilter` prop.

## Marketing Strategy (2026-04-28)

Full memo: `docs/marketing-strategy-2026-04-28.md`. Quick state:

- **Skill updated:** `asvab-post-writer` now models two products — SEO articles AND subtest topic study guides (markdown into `content/study-guides/{subtest}/{topic}.md`, no page.tsx). Frontmatter shape, body structure, and Pro-funnel role spec'd in the skill.
- **Study guides reframed:** defensive product completeness for the Pro funnel, not a growth channel. GSC has zero striking-distance signal for topic content. Don't invest growth budget on the remaining 17 non-AFQT pages.
- **Decision lean: Failed-ASVAB Recovery Funnel.** Acute pain segment (30-day retake clock, demonstrated buying intent). Open architecture choice: standalone $49 30-day track vs. Pro variant with retake guarantee. Pre-reqs: flip Stripe to live mode, baseline score guarantee, decide offer architecture.
- **Score Insurance considered + rejected** (adverse selection, verification, regulatory exposure). Standard money-back guarantee with engagement gates is the de-risked replacement.
- **Top non-funnel moves to sequence after:** recruiter B2B dashboard, "Score Your AI" stunt, TikTok score-transformation reels, Reddit/Discord plan execution.
