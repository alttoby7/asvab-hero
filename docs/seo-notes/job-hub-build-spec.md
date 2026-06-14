# Build Spec — "Jobs by ASVAB Score" hub cluster (Tier-1 growth play)

**Status:** spec for review (no code written yet). Authored 2026-06-14.
**Why this play:** ASVAB Hero owns the calculator cluster but has almost no pages
capturing the long tail. We already hold a unique, structured **567-job dataset**
(`src/data/{branch}-jobs.json`) with line-score requirements — competitors don't.
This cluster is **net-new topic space** (jobs-by-score), so it does NOT cannibalize
the existing crowded score-explainer cluster (see the cannibalization note at the
end). Penalty-safe: real data, genuinely useful, drip-released, curated (not 567
thin pages).

---

## Keyword evidence (Ahrefs, US — pulled 2026-06-14)

| Term | Vol/mo | KD | Notes |
|---|---|---|---|
| army mos list | 4,600 | 24 | `/army-mos-list` exists (catalog) — needs to win this |
| asvab scores for army jobs | 400 | 12 | no dedicated hub yet |
| navy asvab score chart | 700 | 1 | 🟢 easiest win on the board |
| air force asvab score chart | 600 | 54 | harder (airforce.com etc.) |
| what jobs do i qualify for with my asvab score | 1,800 | 56 | $120 CPC — the money/calculator term |
| navy seal asvab score | 150 | 32 | $700 CPC — curated per-job candidate |
| 68w / 11b asvab score | 70 ea | 0–1 | per-MOS tail = tiny individually |

**Readout:** volume is in the **branch hubs** and the **"what jobs do I qualify for"**
term, NOT individual MOS pages. So build hubs + a money page + a *curated* handful
of high-volume job pages. Do NOT generate 567 thin per-job pages.

---

## What already exists (reuse, don't rebuild)

- **Data:** `src/data/{army,navy,air-force,marines,space-force,coast-guard}-jobs.json`
  — 567 jobs. Shape: `{ id, code, title, description, category, minAFQT,
  requirements:[{composite, minScore}], anyOf? }`.
- **Qualification logic:** `src/lib/job-matcher.ts` (qualify + proximity).
- **Hub/catalog pages:** `/army-mos-list`, `/navy-ratings-list`, `/air-force-afsc-list`,
  `/air-force-jobs` render `<JobCatalog />` (collapsible list — NOT individually
  indexable per-job, and weak as ranking hubs).
- **4 hand-built per-job pages** exist (air-force-security-forces / loadmaster /
  pararescue / pilot) — the template exemplar.
- **Components:** `Breadcrumb` (+BreadcrumbList JSON-LD), `RelatedLinks`,
  `EmailCapture` (funnel hook), calculator links in `src/lib/calculator-links.ts`.
- **Sitemap:** `scripts/generate-sitemap.mjs` — hardcoded URL array (must be extended
  to emit the new pages; ideally scan data for the job pages).
- **Page-gen pattern to copy:** `/study/[subtest]/[topicSlug]` — `generateStaticParams()`
  + `generateMetadata()` over a data source. This is the clean Next.js precedent.

---

## Proposed structure (3 layers, NOT 567 pages)

### Layer 1 — Branch "jobs by ASVAB score" hubs (6 pages) — BUILD FIRST
- Routes: keep/repurpose the existing `*-list` URLs OR new `/{branch}-jobs-by-asvab-score`.
  **Decision needed:** prefer upgrading the existing `/navy-ratings-list` etc. in place
  (they already have links + history) over new URLs, to avoid splitting equity. Lead
  with **Navy** (KD 1).
- Content per hub (genuinely useful, from the dataset):
  - Intro answering "what ASVAB/line score do I need for a {branch} job" (snippet-shaped).
  - **Sortable/scannable table** of every rating/MOS: code, title, the required
    composite(s) + min score, min AFQT. This is the unique-data asset.
  - Short "how {branch} line scores work" explainer (composite formulas) — links to
    the relevant calculator (`/navy-asvab-score-calculator`, etc.).
  - FAQ (FAQPage schema) for the head terms ("what's the easiest {branch} job to
    qualify for", "highest line-score {branch} jobs").
  - CTA → calculator → free plan (the funnel you just rebuilt).
- Internal links: breadcrumb up to a top-level hub; cross-link the 6 hubs; link from
  the calculator hub + homepage `HomePopularLinks`.

### Layer 2 — The "what jobs do I qualify for" money page (1 page)
- Target "what jobs do i qualify for with my asvab score" (1,800/mo, $120 CPC).
- This IS the calculator's job-matcher. Build a content page that explains the flow
  and embeds/links the calculator → returns the user's qualifying jobs. Highest
  commercial intent on the board.

### Layer 3 — Curated per-job pages (~30–50, volume-gated) — LAST, DRIP
- ONLY jobs with real volume/CPC (navy seal, 68w, 11b, pararescue, 35f, 25b, etc.).
- `generateStaticParams()` over a **curated allow-list** (not the full 567), so each
  page has a real query behind it. The long tail stays as rows in the Layer-1 hubs.
- Template = the existing per-job exemplar (h1, requirements table, "how to qualify",
  FAQ, related jobs, calculator CTA).

---

## Penalty-safety rules (non-negotiable — owner HCU history)

1. **Curated, not exhaustive.** No near-empty doorway pages. Volume-gate Layer 3.
2. **Unique data per page.** Every page leads with the actual line-score requirements
   from our dataset — not spun prose. That's an E-E-A-T asset.
3. **Drip-release** Layer 1 then Layer 3 over weeks (reuse AutoTech's `drip-publish`
   pattern), so nothing looks like a content flood.
4. **Real substance**, accurate facts (verify composite formulas + cutoffs against the
   dataset and official sources), unique intro/FAQ per page.
5. **No cannibalization:** before each page, check no existing page already targets the
   term (the score-explainer cluster lesson — see below).

---

## Build sequence

1. **Navy hub first** (KD 1) — upgrade `/navy-ratings-list` into the sortable
   jobs-by-score hub. Ship, verify, watch GSC ~2–3 weeks.
2. If it moves → **replicate template** to Army (4,600-vol "army mos list" / 400-vol
   "asvab scores for army jobs"), then Marines, AF, CG, Space Force. Drip.
3. **Money page** ("what jobs do I qualify for") alongside.
4. **Curated job pages** last, drip, volume-gated.

Each step: build → `npm run build` + em-dash guard → verify rendered (H1/schema/links)
→ deploy → log a cycle in `docs/seo-notes/urls/`.

---

## ⚠️ Separate prerequisite: score-explainer cannibalization audit

Discovered 2026-06-14: the site has **8+ overlapping score pages** —
`/asvab-scores-explained`, `/asvab-score-average`, `/asvab-score-ranges`,
`/asvab-score-chart`, `/asvab-score-requirements`, `/what-is-a-good-asvab-score`,
`/highest-asvab-score`, plus `/afqt-score`, `/gt-score`. Evidence of cannibalization:
`/asvab-score-average` (870 lines, well-built) has **0 GSC impressions in 90 days**
and ASVAB Hero ranks **nowhere in the top 10 for "average asvab score" (3,000/mo)**.
Multiple pages competing for the same "asvab scores / average / ranges / good"
intent = Google can't pick a winner, so several sit on page 3–5.

**This is a separate focused project** (not part of the hub build): map each cluster
page → its one owned term, then differentiate / merge / 301-redirect the overlaps and
fix internal anchors so each term has ONE clear target. Penalty-*positive* (Google
rewards consolidation). Recommend doing this BEFORE adding any more score-explainer
pages — but it does NOT block the jobs-by-score hub cluster (different topic space).
