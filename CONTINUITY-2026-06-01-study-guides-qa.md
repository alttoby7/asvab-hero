# Continuity — Study-Guide Pages (updated 2026-06-01 PM)

## ⏭ PICK UP HERE TOMORROW (2026-06-02) — two open builds, both NOT started

### OPEN #1 (primary) — FIX the study-guide page styling (it currently "sucks")
Live audit of https://asvabhero.com/study/ar/averages: the markdown BODY renders as a flat
gray wall — `##`/`###` headings render at body size/weight (no hierarchy) and `<ul>` lists have
no bullets/indent. Frontmatter cards (Formula Reference / Common Pitfalls / Worked Examples)
look fine; only the markdown body is broken.
ROOT CAUSE (confirmed + Codex-vetted, session `019e86a1-0794-7893-bd29-4fea0e83446b`):
`@tailwindcss/typography` is NOT installed, but `src/components/study-guide/StudyGuideArticle.tsx`
styles the body `<article>` with ONLY Tailwind Typography classes (`prose prose-invert prose-headings:* prose-p:* prose-li:* ...`) which are therefore no-ops → marked.parse() HTML
(from `src/lib/study-guides/loader.ts`) falls back to Tailwind v4 Preflight. The site's real
long-form wrapper `.prose-asvab` (in `src/app/globals.css` @layer components) is under-specified
(only h1/h2/h3 font+color, p+p margin, table padding — no heading sizes/margins, no ul/ol/li).
FIX = Approach A (Codex-recommended, no new dep, also strengthens ~10 SEO pages that already use
`.prose-asvab` + the dead prose classes):
  1. Extend `.prose-asvab` in globals.css to fully style bare markdown (h1-h4 sizes/weights/margins,
     p spacing, ul/ol list-style+padding-left+li spacing, strong, code, hr, blockquote, a). The exact
     CSS block is in the Codex transcript (continue session above to re-fetch) — dark theme using
     vars --color-text-primary/--color-text-secondary/--color-accent/--font-display/--font-mono/
     --color-navy-border/--color-accent-hover. NO em-dash chars (build guard).
  2. In StudyGuideArticle.tsx change the body to `className="prose-asvab mb-8 max-w-none"` and DROP
     the dead `prose prose-invert prose-*` classes.
  3. UX upgrades (minimal-build, Codex): wrap the markdown body in a subtle panel
     (`rounded-2xl border border-navy-border bg-navy-light/40 px-6 py-6`); add a small "Concept Guide"
     section label above it (match card-label style); rely on the new h2 top-margins for module rhythm.
SHIP: `node scripts/check-no-emdash.mjs` -> `npm run build` -> commit -> push main (CF auto-build).
VERIFY after: reload /study/ar/averages in browser, confirm headings + bullets now render.

### OPEN #2 — BUILD the "Test-Date Pass" (flat-fee offer) — DECIDED, ready to build
DECISION (owner, 2026-06-01): an AUTO-RENEWING pass = **$24.99 every 90 days recurring**
(keeps MRR + test-date urgency framing). Feature it as the recommended option for test-date
buyers; KEEP $9.99/mo monthly as the "month-to-month" fallback; KEEP $49.99 annual. Owner
rejected one-time passes ("not recurring") and rejected pricing above monthly (must be a
per-month discount vs the sub).
ARCHITECTURE (from the flat-fee investigation subagent — reuses existing subscription plumbing,
SMALL build): the Stripe webhook already sets `profiles.pro_until` from a subscription's period
end and auto-renews, and `useEntitlement`/`has_active_pro()` already expire on `pro_until`. So a
recurring 90-day price needs NO webhook/entitlement/schema change. Build steps:
  (a) OWNER creates a recurring Stripe Price ($24.99 / every 3 months) on the Pro product in the
      Stripe dashboard; add `ASVABHERO_STRIPE_PRICE_PASS90` (name TBD) to central `.env` + CF Pages
      env + Supabase function env; document in `.env.example`.
  (b) Add a `pass90` (or `quarterly`) tier to `supabase/functions/stripe-checkout/index.ts`
      -> `mode: "subscription"` with that price (mirror the existing monthly/annual branch).
  (c) Add the pricing card to `src/components/PricingPlans.tsx` with test-date framing copy
      ("Full Pro through your test prep. Renews until you cancel, cancel anytime after." No em-dashes.)
      + FAQ entries on pricing/upgrade pages.
  (d) Webhook + useEntitlement = NO change. Deploy webhook ONLY via `scripts/deploy-stripe-webhook.sh`
      (never bare `supabase functions deploy stripe-webhook`).
Full plan + file list was produced by the subagent (Stripe-best-practices applies if revisited).
Optional: a T-3-day renewal reminder via existing Listmonk/test-date-email infra to soften
forgotten-renewal surprise.

### Reminder already scheduled
GA4 funnel check-in routine fires 2026-06-15 09:00 MT (`trig_01S3qiQS2SajuQju43taTHBV`) — emails a
nudge to review the WS3 + new-topic events; do the actual GA4 review locally (GA4 prop 404444165,
GA4 measurement id G-96BXQ7YRJ8).

### OPEN #3 — Rob Kirkland Navy education center recon (follow up after he reports)
Rob (info@rotcconsulting.com) visits Navy Base San Diego education center ~2026-06-02 to gather
AFCT/score-prep intel; Trish emailed him the question list. Tests a possible ACTIVE-DUTY AFCT
retake market for ASVAB Hero (distinct from pre-enlistment). Memory: project-asvab-active-duty-afct-recon.
Follow up once he reports back; if demand is real, consider an AFCT/line-score positioning track.

### Shipped today (all LIVE on main / Cloudflare):
- WS2 QA: `b9bc11b` (10 guides, 15 fixes) + `86e1a6d` (AO relabel).
- WS1 expansion 39->47 topics: `1d81e5f` (8 new AFQT guides + 96 Qs).
- WS3 funnel surfacing: `0d54a11` (calculator/results/app-study deep links + GA4 events). VERIFIED
  live via browser smoke-test (calculator_study_guide_click + study_guide_view fire correctly).
- Deepen 8 new topics to 30 Qs: `3111e12` (+144 Qs). Live DB: 1,824 q / 1,817 active / 47 topics.
- MAGE honest-gating: `d14253b` (AF/SF jobs no longer fake "qualifies" off raw composite sums).
Key cmds: guard `node scripts/check-no-emdash.mjs`; build `npm run build`; reseed
`export SUPABASE_ACCESS_TOKEN=$ASVABHERO_SUPABASE_ACCESS_TOKEN; supabase db query --linked --file supabase/seed-questions.sql`;
deploy = push main -> CF Pages auto-build. DO NOT commit the owner's untracked WIP
(`src/lib/calculator-links.ts`, `docs/seo-notes/`, sitemap.xml build-churn, the CONTINUITY docs).

---

# Continuity — Study-Guide Pages: 3-workstream plan (2026-06-01)

Picks up the "study-guide pages" thread. The 39 canonical study guides
(`content/study-guides/{sub}/{slug}.md`) were already at full coverage
(commit `047c592`); in-app delivery is live at `/app/study` +
`/study/[subtest]/[topicSlug]`. Owner asked to plan + run 3 workstreams.

## Architecture (load-bearing facts)
- Canon = `src/data/topics.seed.json` (39 topics, `{id:"sub.slug", subtest, slug,
  title, sort_order, study_guide_href:"/study/{sub}/{slug}", recommended_drill:"subtest_drill_{sub}"}`).
  Drives both the Supabase `topics` seed AND the client (`topic-catalog.ts`).
- `study-topics.ts` (79 topics, `gs-1` slug scheme) is LEGACY/orphan — idea source, not the target schema.
- MiniDrill (`src/components/study-guide/MiniDrill.tsx`) fetches `practice_questions WHERE topic_id=? AND active LIMIT 5`, **Pro-gated**.
  So a new topic needs >=5 (ideally ~30, the current density) questions tagged to its topic_id or its drill is empty.
- Question bank pipeline: authored JSON `src/data/practice-tests/expansion-batch-*.json` + `free-test.json`,
  tagged in `question-tags.seed.json`, compiled by `scripts/build-questions-seed.mjs`, applied to Supabase.
- Funnel: `recommender.ts` maps a single weak topic -> its `study_guide_href`; `StudyTopicTools.tsx` reads `topic_stats`.
- Deploy = push `main` -> Cloudflare Pages auto-build. Em-dash guard: `node scripts/check-no-emdash.mjs`.
- DO NOT sweep the owner's uncommitted 5/30 calculator WIP into commits:
  `Calculator.tsx`, `CalculatorPlanCapture.tsx`, `AffiliateBookBlock.tsx`, `functions/api/signup.ts`,
  `src/lib/calculator-links.ts`, `docs/seo-notes/`, the CONTINUITY-*.md files. (sitemap.xml = build churn, leave it.)

## WS2 — QA the 39  ✅ DONE + SHIPPED (2026-06-01)
Deterministic: em-dash guard clean; all 39 topics have 30–54 bank questions (1,495 total) — **zero thin drills**.
5 parallel fact-checkers audited all 39 (recomputed every worked example). Content was largely clean.
- Commit `b9bc11b` (10 non-AO files, 15 fixes): WK count 16->15 (synonyms, prefixes-suffixes), PC 11->10 (main-idea),
  false arduous/ardor etymology, context-clue "dash"->comma, MA force-not-torque (gears-wheels),
  ACFT age/gender-normed not "same standards" (detail-recall), + polish (geometry pitfall, root-words dups/ped-trap,
  "five formulas", Phillips cam-out myth, micrometer wording).
- Commit `86e1a6d` (4 AO files): AO was built on the WRONG subtest model. Real AO = connector + jigsaw only.
  3 topics (3d-visualization, paper-folding-nets, spatial-counting) + their ~90 questions test cube-rotation/
  net-folding/cube-counting, which are NOT AO. Chosen fix = **relabel** (option 1): reframed those 3 as honest
  spatial-reasoning practice pointing to Pattern Assembly, added Navy-only/non-AFQT note to all 4, fixed the
  overstatement + plus-sign example, added the connector item-type to Pattern Assembly. **Questions left as-is.**
  (Owner deferred bigger AO rework; the text-only engine can't render true AO without figures.)

## WS1 — Curated expansion  ✅ DONE + SHIPPED (2026-06-01, commit `1d81e5f`)
Owner picked "decide after QA" then "do both" -> curated +8 (2 per AFQT subtest), built by 4 subagents:
AR averages + work-rate, MK order-of-operations + inequalities, WK antonyms + multiple-meaning-words,
PC vocabulary-in-context + text-structure. Each = 1 guide + 12 questions (96 total, difficulty 1-4).
Wired topics.seed.json + supabase/seed.sql (FK parent) + build-questions-seed.mjs (batches 18-21).
Applied to Supabase abypyprvgvofzrtifgzi via `supabase db query --linked` (token = ASVABHERO_SUPABASE_ACCESS_TOKEN):
inserted 8 topic rows (on conflict do nothing), then full reseed. LIVE-VERIFIED: 1680 q / 47 topics / 96 on new.
Bank now 1,680 total / 1,673 active. NOTE new topics carry 12 Qs vs ~30 on originals; deepen later if they convert.
Remaining legacy gaps (not built): AR sequences/profit, MK probability/coordinate-geo/scientific-notation,
WK academic-vocab/military-terms, PC drawing-conclusions(overlaps inference). Reach toward 79 only if data warrants.

## WS3 — Funnel surfacing  ✅ DONE + SHIPPED (2026-06-01, commit `0d54a11`)
Investigated by a subagent, implemented by another, reviewed + shipped. 4 items:
1. Calculator disappointed-scorer -> `CalculatorWeakSubtestGuides` block deep-links the 2 lowest AFQT subtests'
   guides. Helper = `studyGuidesForSubtest()` in topic-catalog.ts (NOT calculator-links.ts; that stays the owner's
   untracked WIP — moved the helper to keep it uncommitted).
2. Diagnostic results -> free `weakTopicStudyGuides()` (new pure helper in recommender.ts) section beside NextStepCard.
3. `/app/study` -> "Recommended next guide" hero (weakest practiced topic from topic_stats).
4. GA4: new FunnelEvents study_guide_view (StudyGuideViewBeacon on both guide routes) + study_guide_marked_studied,
   plus calculator_study_guide_click / results_study_guide_click / study_recommendation_shown+click.
All additive; recommender/NextStepCard contracts unchanged. NEXT: watch GA4 read->drill->improve to judge ROI;
that data also decides whether to deepen the 8 new topics to ~30 Qs and whether to expand further.
