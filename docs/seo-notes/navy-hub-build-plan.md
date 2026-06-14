# Build Plan — Navy "jobs by ASVAB score" hub (Layer 1) + reusable branch template

> Authored 2026-06-14. Implements the Layer-1 (Navy) portion of
> `docs/seo-notes/job-hub-build-spec.md` plus the reusable template for the other 5 branches.
> **No application code is written here — this is the plan.**
> **Deliverable location:** this content is to be saved as `docs/seo-notes/navy-hub-build-plan.md`
> in the asvab-hero repo. (Authored under plan-mode, which only permits writing the plan file;
> the executor copies/commits it to the docs path as step 0.)

---

## 0. Decision: upgrade `/navy-ratings-list` IN PLACE (do NOT create a new route)

**Recommendation: upgrade the existing `/navy-ratings-list` page in place.** Do not mint
`/navy-jobs-by-asvab-score`.

Reasoning:
- **Equity + internal links.** `/navy-ratings-list` already receives internal links from at
  least 8 pages: `HomePopularLinks.tsx`, `CalculatorExplore.tsx`, `app/page.tsx`,
  `navy-asvab-score-calculator`, `navy-ranks`, `asvab-line-score-calculator`,
  `what-jobs-qualify-asvab-score`, `asvab-score-chart`, `afct`. A new URL splits that equity
  and starts from zero. It is in the sitemap and has crawl history (datePublished 2026-04-27).
- **Intent match.** "navy asvab score chart" (700/mo, KD 1) and "asvab scores for navy jobs"
  and "navy ratings list" are the *same* intent: a table of ratings + required scores. The
  existing page already targets "navy ratings list" in its title/H1. We layer the
  chart/score-by-job framing onto the same URL rather than competing with ourselves.
- **HCU/penalty posture.** Consolidating/upgrading one strong URL is penalty-positive;
  spinning up a near-duplicate doorway is exactly the thin-content risk the owner avoids.

**Redirects:** none needed (URL is unchanged). Title/H1/metadata get rewritten to fold in the
"chart / scores for navy jobs" keywords (see §3). Keep the canonical
`https://asvabhero.com/navy-ratings-list`.

**Lane clarification (no cannibalization) — three Navy pages stay distinct:**
| URL | Owned intent | Role |
|---|---|---|
| `/navy-asvab-score` | "navy asvab score" (AFQT minimum to *enlist*) | enlistment-floor explainer |
| `/navy-asvab-score-calculator` | "navy asvab calculator" (interactive tool) | the funnel target / app |
| `/navy-ratings-list` (THIS BUILD) | "navy asvab score chart", "asvab scores for navy jobs", "navy ratings list" | the per-rating score **table/hub** |
`/what-jobs-qualify-asvab-score` already exists (Layer-2 money page, separate project — link to it, do not rebuild here).

---

## 1. Dataset: `src/data/navy-jobs.json` — exact shape + data-quality gaps

**Shape (array of 79 objects):**
```jsonc
{
  "id": "navy-ac",                 // string, "navy-<code-lower>"
  "code": "AC",                    // rating abbreviation
  "title": "Air Traffic Controller",
  "description": "Directs aircraft movements ...",
  "category": "Aviation",          // one of 10 (see below)
  "minAFQT": 35,                   // number, only 31 or 35 across the set
  "requirements": [                // ARRAY = ALL must pass (AND)
    { "composite": "VE+AR+MK+MC", "minScore": 220 }
  ],
  "anyOf": [ ... ]                 // OPTIONAL: OR logic — any single entry qualifies
}
```
- **Type:** `MilitaryJob` in `src/types/index.ts` (`requirements: ScoreRequirement[]`,
  `anyOf?: ScoreRequirement[]`, `minAFQT?`, `category`). `ScoreRequirement = {composite, minScore}`.
- **`branch` is NOT in the JSON.** It is attached at load:
  `navyJobs.map(j => ({ ...j, branch: "navy" }) as MilitaryJob)` (see
  `navy-asvab-score-calculator/page.tsx:25`). The hub must do the same.

**Counts:** 79 ratings. Categories: Aviation 20, Engineering 15, Operations 10,
Administrative 10, Intelligence 7, Construction 7, Special Warfare 5, IT/Communications 2,
Supply/Logistics 2, Medical 1.

**Distinct composites (13):** `AR+2MK+GS`, `AR+MC+AS`, `AR+MK`, `AR+MK+EI+GS`, `AR+MK+MC+VE`,
`GS+MC+EI`, `VE+AR`, `VE+AR+MK+AS`, `VE+AR+MK+EI`, `VE+AR+MK+GS`, `VE+AR+MK+MC`, `VE+MK`, `VE+MK+GS`.

**Data-quality gaps the page MUST handle gracefully:**
1. **`anyOf` vs `requirements` semantics differ and must render differently.**
   - `requirements` array = **AND** (e.g. `ND` has two entries: `GS+MC+EI ≥157` **and**
     `AR+MK ≥100` — both required).
   - `anyOf` array = **OR** (e.g. `SO` / Navy SEAL: `GS+MC+EI ≥165` **or** `VE+AR+MK+MC ≥220`).
   - Exactly **one** job uses `anyOf` (SO) and exactly **one** has multi-entry `requirements` (ND).
   - No job has both populated. `JobCatalog.reqLabel()` already encodes the correct rule
     (join `requirements` with " · ", join `anyOf` with " or ") — **reuse that logic**.
2. **`requirements: []` empty when `anyOf` is present** (SO). The table renderer must fall back
   to `anyOf` and never print an empty cell.
3. **`AR+MK+MC+VE`** appears as a composite — note the non-canonical ordering vs the more
   common `VE+AR+MK+MC`. Display as-is from data (do not silently reorder; it is the same set
   but keep fidelity to the dataset). Flag for owner if normalization desired.
4. **`minAFQT` only ever 31 or 35** — fine, render as `AFQT {n}+`.
5. **Dataset (79) ≠ the current hand-written page's "89 ratings"** prose. The hand-written
   page lists ~89 in prose tables; the JSON is the curated 79. The upgraded page must switch
   to the JSON as source of truth and update all "89" copy to the real dataset count
   (drive the count from `navyJobs.length`, never hardcode).
6. Composites like `VE+MK`, `VE+MK+GS`, `AR+MC+AS`, `GS+MC+EI` are rarer paths — render fine,
   just confirm the calculator computes them (it consumes the same JSON, so parity is implied).

---

## 2. Current page + JobCatalog: reuse vs replace

- **Current `/navy-ratings-list/page.tsx` (1,668 lines):** entirely **hand-coded HTML tables**
  (community-by-community), NOT driven by `navy-jobs.json`. Strong prose, good schema, but the
  numbers are hand-maintained and drift from the JSON (89 vs 79; some composites/bonuses differ).
  **Keep the best prose** (community explainers, NAPT/PACT/bonus asides, the "how scoring works"
  section, the existing FAQ + Article + FAQPage JSON-LD) **but replace the hand-coded score
  tables with one data-driven, sortable table sourced from `navy-jobs.json`** so the unique-data
  asset is canonical and self-maintaining.
- **`JobCatalog.tsx`:** a `"use client"` collapsible `<details>` accordion grouped by branch.
  It server-renders all rows into static HTML (good for crawl), but it is (a) multi-branch,
  (b) accordion not a scannable/sortable table, (c) not a ranking-hub shape. **Do not reuse
  JobCatalog for the hub.** Its `reqLabel()` helper logic should be **lifted into the new
  component** (it already handles AND/OR correctly).

**Recommendation: build a NEW component `JobScoreTable.tsx`** (sortable, single-branch,
server-rendered table). See §4.

---

## 3. Page structure (sections → target keywords)

Upgraded `/navy-ratings-list/page.tsx`. Keep `max-w-3xl` article shell, `prose-asvab`, and the
existing JSON-LD pattern. **Single `<h1>`** (guard: H1 count must stay 1).

| # | Section | Shape | Target keyword(s) |
|---|---|---|---|
| 1 | **H1 + snippet-shaped intro** | H1 "Navy ASVAB Score Chart: Required Line Scores for All {N} Navy Jobs (2026)". First paragraph is a 40-55 word **direct answer** to "what ASVAB / line score do I need for a Navy job" (AFQT 31-35 floor + composite range CS ~76 → CTN 255), engineered for the featured snippet. | "navy asvab score chart" (700, KD1), "asvab scores for navy jobs" (400) |
| 2 | **Stats row** (keep existing) | lowest/highest barrier, top bonus, count — but **drive `{N}` and min/max from the data**, not hardcoded. | supports snippet |
| 3 | **The score table** (NEW, the unique asset) | `<JobScoreTable jobs={navyJobs} />` — sortable, all 79 rows, server-rendered. See §4. | "navy ratings list", per-rating tail (e.g. "navy seal asvab score", "navy nuclear asvab score") |
| 4 | **"How Navy line scores work" explainer** | Keep/trim existing AFQT-vs-composite section; the most-used composites block; **link the calculator** (`/navy-asvab-score-calculator`) as the primary CTA and `/asvab-line-score-calculator` / `/afqt-score` contextually. | "navy line scores", "navy asvab composite" |
| 5 | **Community context asides** (keep curated subset) | Keep the genuinely useful PACT, NAPT/Nuclear, SECF, submarine score-gap asides — these are the E-E-A-T substance that separates this from a bare table. Trim hand-coded per-community tables (the data table replaces them). | long-tail, dwell time |
| 6 | **FAQ + FAQPage schema** (keep + extend) | Keep the 8 existing Q&As (easiest/hardest rating, NAPT, dual-formula, etc.). Add 1-2 that match head terms: "What is the lowest ASVAB score for a Navy job?" and "What Navy job has the highest ASVAB requirement?" answered from the data. | "easiest navy job to qualify for", "highest navy asvab score job" |
| 7 | **CTA → calculator → free plan** | Primary CTA card → `/navy-asvab-score-calculator` ("See exactly which ratings you qualify for"); the calculator funnels into the free plan (the rebuilt funnel). Keep one secondary `/practice-test` diagnostic CTA. | commercial intent |
| 8 | **Breadcrumb + RelatedLinks** | `Breadcrumb`: Home → Navy ASVAB Score (`/navy-asvab-score`) → Navy Ratings List. `RelatedLinks`: navy-asvab-score, navy-asvab-score-calculator, navy-afqt-calculator, what-jobs-qualify-asvab-score, navy-ranks. | internal link graph |

**Metadata change (fold in the chart/jobs keywords):**
- `title`: `"Navy ASVAB Score Chart (2026): Required Line Scores for Every Navy Job"`
- `description`: rewrite to include "navy asvab score chart", "scores for navy jobs", "all {N} ratings".
- `canonical`: unchanged (`/navy-ratings-list`).

---

## 4. The sortable table — `src/components/JobScoreTable.tsx`

**Data source:** `navy-jobs.json` → `{ ...j, branch }` (parent passes the augmented array).

**Columns:**
1. **Rating code** (`code`, mono, bold)
2. **Job title** (`title`)
3. **Category** (`category`) — also the sort/filter dimension
4. **Required composite(s) + min** — rendered via lifted `reqLabel()` (AND = " · ", OR = " or ")
5. **Min AFQT** (`AFQT {minAFQT}+`)

**Crawlability (static-export constraint, non-negotiable):**
- The full `<table>` with **all 79 `<tr>` rows must be in the static HTML at build time**
  (server component output). This is the indexable unique-data asset. Verify rendered rows in §8.
- **Sorting = progressive enhancement only.** Two safe options; recommend **Option A**:
  - **Option A (recommended): server component renders the table; a tiny `"use client"`
    wrapper (`JobScoreTableSort.tsx`) adds click-to-sort on the already-rendered DOM** — or
    simpler, render the table server-side pre-sorted by min composite score ascending (most
    useful default: "what can I get into with the lowest score"), and offer category **jump
    anchors** (like the existing community nav) instead of JS sorting for v1. No hydration risk,
    fully crawlable, zero client JS. **Ship v1 as server-rendered + anchored; add JS sort later
    if GSC shows engagement.**
  - Option B: full client component (like JobCatalog) — still SSR'd in static export, but adds
    JS weight and an `onToggle`/sort state. Only if interactive sort is a hard requirement.
- **Analytics (optional, parity with JobCatalog):** if a client wrapper is used, fire a
  `job_row_open` / `table_sort` `trackEvent` for anonymous interest — reuse `@/lib/analytics`.

**Reuse decision:** new component (NOT JobCatalog). Lift `reqLabel()`. Make it **branch-agnostic**
(takes `jobs` + optional `composites-explainer` slot) so Army/Marines/AF/etc. reuse it verbatim.

---

## 5. Exact files to create / modify

**Create:**
- `src/components/JobScoreTable.tsx` — server-rendered sortable/scannable single-branch table
  (+ optional `JobScoreTableSort.tsx` client wrapper if JS sort is added later).
- (Template SoT, §6) `src/lib/job-hubs.ts` — branch → {data file, composite labels, calculator
  href, score-explainer copy, related links} config, so the 6 hubs share one shape.
- `docs/seo-notes/navy-hub-build-plan.md` — this plan (step 0).
- `docs/seo-notes/urls/navy-ratings-list.md` — the per-URL cycle log (§8).

**Modify:**
- `src/app/navy-ratings-list/page.tsx` — rewrite per §3 (data-driven table, folded keywords,
  kept prose/asides/FAQ, updated metadata + Article/FAQPage JSON-LD dates → dateModified
  2026-06-14). Import `navy-jobs.json`, attach `branch:"navy"`.
- `scripts/generate-sitemap.mjs` — `/navy-ratings-list` is **already** in the array (line 37);
  no add needed for Navy. (For later branches, add their `*-list` routes if missing — Army
  `/army-mos-list`, AF `/air-force-afsc-list`, USMC `/usmc-mos-list` already present; Coast
  Guard + Space Force lists do **not** exist yet and will need creation + sitemap entries.)
  Optionally bump `/navy-ratings-list` priority 0.8 → 0.85 to match other hubs.
- **Internal links (push equity into the upgraded hub):**
  - `src/components/HomePopularLinks.tsx` — already links `/navy-ratings-list` ("Navy ratings
    and jobs"); optionally relabel to "Navy ASVAB score chart" to match the new head term.
  - `src/app/navy-asvab-score-calculator/page.tsx` — already links it; ensure anchor text is
    keyword-led ("Navy ASVAB score chart for all ratings").
  - `src/app/navy-asvab-score/page.tsx` — add a contextual link to the chart if not present.
  - `src/lib/calculator-links.ts` — **not required** (jobs hubs are a different taxonomy). Do
    NOT shoehorn job hubs into the calculator SoT; use the new `job-hubs.ts` SoT instead.

---

## 6. Reusable template (so Army/Marines/AF/CG/Space Force replicate cheaply)

Factor the hub into **(a) a shared table component** + **(b) a per-branch config SoT** so each
new branch hub is "data + config + branch-specific prose," not a fresh build.

**`src/lib/job-hubs.ts` (new SoT):**
```ts
export type JobHub = {
  branch: Branch;
  route: string;            // "/navy-ratings-list"
  dataFile: MilitaryJob[];  // imported navy-jobs.json (branch attached)
  scoreSystem: "navy-composite" | "army-line" | "marine-line" | "mage" | "cg-composite";
  calculatorHref: string;   // "/navy-asvab-score-calculator"
  branchAfqtHref: string;   // "/navy-afqt-calculator"
  scoreExplainerHref: string;
  related: RelatedLink[];
  titleHead: string;        // "Navy ASVAB Score Chart"
};
```
The page becomes a thin shell: import config, render `<JobScoreTable jobs={hub.dataFile} />`,
plus a `scoreSystem`-keyed explainer block + branch-specific curated asides (the only truly
hand-written part per branch, which is what keeps each page unique & penalty-safe).

**Branch score-system differences the template MUST encode (`scoreSystem`):**
- **Navy** — named **composites** (`VE+AR+MK+MC`, `AR+MK+EI+GS`, etc.), sums of standard scores;
  AND/OR via requirements/anyOf. (This build.)
- **Army / Marines** — **line scores** (Army: GT, CL, CO, EL, FA, GM, MM, OF, SC, ST;
  Marines: MM, GT, EL). Same `{composite, minScore}` data shape, different labels + explainer.
- **Air Force / Space Force** — **MAGE** (Mechanical, Administrative, General, Electronics) —
  a 4-area system, and many AFSCs publish **no numeric cutoff** (see the air-force-security-forces
  exemplar). The MAGE hubs must handle "aptitude area named, no public number → verify with
  recruiter" honestly (reuse the `VerifiedBlock` honesty pattern), and the table may show area
  rather than a numeric min for some rows. **Do not invent cutoffs.**
- **Coast Guard** — Navy-like composites; verify `coast-guard-jobs.json` exists/shape before
  building (CG + Space Force `*-list` routes do not exist yet → create routes + sitemap).

Each branch reuses: `JobScoreTable`, `Breadcrumb`, `RelatedLinks`, the FAQPage/Article/Breadcrumb
JSON-LD pattern, the CTA→calculator funnel. Only the per-branch **config + curated prose +
explainer** change.

---

## 7. JSON-LD (house pattern)

Emit three blobs via `<JsonLd data={...} />` (the established component), matching the
`air-force-security-forces` / `gt-score` convention:
1. **Article** — `@type: Article`, `headline`, `description`, `url`,
   `author: {@type:Organization, @id:".../#organization", name:"ASVAB Hero"}`,
   `publisher`, `datePublished` (keep 2026-04-27), `dateModified: 2026-06-14`.
2. **FAQPage** — `mainEntity` array of `Question` + `acceptedAnswer`. Keep existing 8, add the
   1-2 head-term Q&As (§3 row 6). **Every FAQ answer must also appear in visible page copy**
   (Google requirement) — the existing page already does this; preserve it.
3. **BreadcrumbList** — via the `Breadcrumb` component (it auto-emits BreadcrumbList JSON-LD;
   do not hand-roll a second one).

---

## 8. Build / verify / deploy

1. `npm run build` (static export — confirms all routes prerender; catches type errors on the
   `MilitaryJob` mapping and any `params` issues).
2. **Em-dash guard:** `node scripts/check-no-emdash.mjs` — MUST pass. All new copy uses commas,
   colons, or en-dashes (–) for numeric ranges; **no `—`**. `navy-jobs.json` already clean.
3. **Rendered checks** (against `out/navy-ratings-list/index.html`):
   - **Exactly one `<h1>`** (`grep -c '<h1' out/navy-ratings-list/index.html` → 1).
   - **All 79 rating rows present in static HTML** (grep a sample of codes: `AC`, `SO`, `CTN`,
     `ND`, `CS` — and count `<tr>` rows ≈ 79 + header).
   - **3 JSON-LD scripts** present (Article, FAQPage, BreadcrumbList) and valid JSON.
   - SEAL (`SO`) row shows the **OR** label ("...or...") and `ND` shows the **AND** ("·") label.
   - Canonical = `https://asvabhero.com/navy-ratings-list`; title/description contain
     "navy asvab score chart".
4. Run sitemap regen if priority/lastmod changed (`node scripts/generate-sitemap.mjs`).
5. Deploy via the project's normal Cloudflare Pages flow (commit to main → CF Pages build).
   Push after commit per workflow rule.
6. **Create the cycle log** `docs/seo-notes/urls/navy-ratings-list.md`: record the upgrade
   (date, what changed: data-driven table + folded keywords), target terms ("navy asvab score
   chart" KD1 / "asvab scores for navy jobs" / "navy ratings list"), baseline GSC position, and
   a 2-3 week recheck date (~2026-07-05) to decide whether to replicate the template to Army.

---

## 9. Penalty safety (HCU posture — confirmed)

- **Unique-data-first:** the page leads with the real 79-rating line-score table from our
  dataset — the asset competitors lack. Not spun prose.
- **No thin content:** one upgraded strong URL, not a doorway. No per-job pages in this build
  (Layer 3 is later, drip, volume-gated).
- **No cannibalization:** lanes confirmed distinct (§0 table). `/navy-asvab-score` keeps the
  enlistment-floor intent; the calculator keeps the tool intent; this page owns the chart/table
  intent. No existing page owns "navy asvab score chart" today → clean win available.
- **Drip plan:** ship Navy alone. Watch GSC ~2-3 weeks. Only if it moves do we replicate the
  template to Army → Marines → AF → CG → Space Force, one at a time (reuse AutoTech's
  drip cadence), so nothing looks like a content flood.
- **Accuracy:** numbers come from the dataset; the curated asides (NAPT/PACT/nuclear/bonuses)
  are kept only where the existing page already verified them — flag any that conflict with the
  JSON for the owner rather than publishing a contradiction.

---

## 10. Risks / open questions for the owner

1. **79 (JSON) vs 89 (current prose).** Switching the table to the JSON drops ~10 ratings the
   hand-written page listed. Confirm the JSON is the intended canonical set, or whether missing
   ratings should be added to `navy-jobs.json` first (better: enrich the data so the asset is
   complete, then render).
2. **Bonuses + NAPT detail** live only in the hand-written prose, not the JSON. Keep them as
   curated asides (recommended), or add a `bonus`/`notes` field to the dataset for a richer table
   column? (Adding fields = more unique data = stronger asset, but more maintenance.)
3. **Sort interactivity:** ship v1 server-rendered + anchored (zero JS, fully crawlable) or
   invest in JS click-to-sort now? Recommendation: v1 without JS sort.
4. **Composite ordering fidelity** (`AR+MK+MC+VE` vs `VE+AR+MK+MC`) — render as-is, or normalize
   in the data? Render as-is for v1; flag for a data cleanup pass.
5. **MAGE branches later:** AF/Space Force AFSCs often have no public numeric cutoff — confirm
   the honest "verify with recruiter" treatment (VerifiedBlock pattern) is acceptable for those
   hubs before replicating.
6. **CG + Space Force list routes don't exist** — they'll need new routes + sitemap entries
   (not just an in-place upgrade) when we get to them.
7. **Layer-2 money page** `/what-jobs-qualify-asvab-score` already exists — confirm it's the
   funnel target to cross-link (it is) and out of scope for this build.
