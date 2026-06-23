# ASVAB Hero — Cannibalization Consolidation Plan (2026-06-23)

**Source:** GSC 28d data (pulled 2026-06-23) + Codex (gpt-5.4 high) review. Goal = penalty-SAFE de-cannibalization (consolidate, do NOT add per-integer/doorway pages). Captures the `[N] asvab score` long tail via ONE interactive module, not 100 URLs.

## The problem (GSC evidence)
Two cannibalized clusters, neither reaching page 1 because multiple URLs split each query:
- **Calculator cluster:** homepage `/` wins head terms (pos 2-6) but the internally-linked `/calculator` hub ranks 66; branch pages buried (navy calc 29, etc.) while `/` half-takes their branch terms at low CTR. `/gt-score` + `/gt-score-calculator` both ~11 for `110 gt score percentile`.
- **Score-explainer cluster:** every `[N] asvab score` query splits across `/`, `/asvab-score-ranges`, `/asvab-score-requirements`, `/army-asvab-score`, `/asvab-score-chart`, `/calculator` — all pos 18-89. Plus 8 near-overlapping score-meaning pages.

## Decision table

### Score-explainer / AFQT / GT
| URL | Decision | Target / new intent |
|---|---|---|
| `/asvab-score-ranges` | **KEEP — owns `[N] asvab score`** | Hosts the interactive enter-any-score module. Title → `ASVAB Score Ranges: What 31, 50, 70, and 99 Mean (2026)` |
| `/asvab-score-chart` | KEEP | Visual/reference: charts, line scores, branch-minimum tables |
| `/asvab-scores-explained` | KEEP | "How to read the score sheet / score types" (broad, non-transactional) |
| `/asvab-score-requirements` | KEEP | Minimum-by-branch |
| `/asvab-score-average` | DIFFERENTIATE | Only the "average/50" answer. Title → `Average ASVAB Score: Why 50 Is the Middle, Not 50% (2026)` |
| `/highest-asvab-score` | DIFFERENTIATE | Only the "99/max" answer. Title → `Highest ASVAB Score: What 99 Means and What It Does Not (2026)` |
| `/what-is-a-good-asvab-score` | **301 → `/asvab-score-ranges`** | Same intent family |
| `/what-jobs-qualify-asvab-score` | **301 → `/calculator`** | Jobs-by-score = tool intent |
| `/afqt-score` | DIFFERENTIATE + absorb `/afqt-calculator` | Title → `AFQT Score: Meaning, Categories & Calculator (2026)` |
| `/gt-score` | DIFFERENTIATE + absorb `/gt-score-calculator` | Title → `GT Score: What It Means + GT Calculator (2026)` |
| `/gt-score-calculator` | **301 → `/gt-score`** | GT split confirmed in GSC |

### Calculator cluster
| URL | Decision | Target / new intent |
|---|---|---|
| `/` | KEEP — owns `asvab calculator`, `asvab score calculator` | Don't move head term off it (earns most of the 635 clicks) |
| `/calculator` | DIFFERENTIATE (keep indexed, self-canonical — do NOT 301 to `/`) | Title → `All-Branch ASVAB Job Calculator: Line Scores, Composites & Jobs (2026)`. Owns job/composite/line-score tool intent |
| `/asvab-composite-score-calculator` | **301 → `/calculator`** | Too narrow |
| `/asvab-line-score-calculator` | **301 → `/calculator`** | Too narrow |
| `/afqt-calculator` | **301 → `/afqt-score`** | AFQT explainer+tool = one intent |
| `/navy-asvab-score-calculator` | **301 → `/navy-asvab-score`** | ⚠️ only if branch page hosts the calculator (see risk note) |
| `/army-asvab-calculator` | **301 → `/army-asvab-score`** | ⚠️ same |
| `/navy-afqt-calculator` | **301 → `/navy-asvab-score`** | ⚠️ same |
| `/army-afqt-calculator` | **301 → `/army-asvab-score`** | ⚠️ same |
| `/marines-afqt-calculator` | **301 → `/marines-asvab-score`** | ⚠️ same |
| `/air-force-afqt-calculator` | **301 → `/air-force-asvab-score`** | ⚠️ same |

### Branch score pages (all KEEP-CANONICAL, own `{branch} asvab score`)
`/army-asvab-score`, `/navy-asvab-score`, `/air-force-asvab-score`, `/marines-asvab-score`, `/coast-guard-asvab-score` — each gets a branch minimums table, line/MAGE-score summary, job examples, CTA to `/calculator`. Embed the Calculator component if absorbing the branch calculator pages.

## Interactive score-meaning module
- Single home: **`/asvab-score-ranges`**. Enter any AFQT 1–99 → category, branch minimums met, job-access band, next threshold, study next-step. Shareable `?afqt=76`, ONE canonical URL.
- Other score pages link to it: "See what your AFQT score means." Branch pages: "Check what your AFQT score means first." `/calculator`: "Need the plain-English meaning of your AFQT score?"

## Internal-linking rules (do BEFORE redirects)
- `asvab calculator`, `asvab score calculator` → `/`
- `all-branch asvab job calculator`, `line score calculator`, `composite score calculator`, `see every job you qualify for` → `/calculator`
- `{branch} asvab score requirements / AFQT minimum / line scores` → `/{branch}-asvab-score` (NEVER to `/calculator`)
- `what does a 57 asvab score mean`, `is a 32 a good asvab score` → `/asvab-score-ranges`
- `AFQT score` → `/afqt-score`; `GT score` → `/gt-score`

## AEO/GEO format (every survivor)
40–60 word direct answer under H1 · "last verified" + sources line · one tight table · fan-out subheads · FAQ schema ONLY if answers visible on-page.

## Build order (lowest-risk first)
1. Tighten survivor titles/H1s/direct-answer intros; prune shared sections. *(safe, reversible)*
2. Build the score-meaning module on `/asvab-score-ranges`. *(additive)*
3. Merge content from dying pages into survivors.
4. Update ALL internal links, breadcrumbs, related-links, sitemap to final targets. **Deploy this first.**
5. THEN ship the 12 × 301s in one batch — each old URL direct to final target, **no chains**.
6. GSC inspect survivors + top redirects; monitor 14d / 28d.

## Extra cleanup
- `/upgrade` appears for calculator queries → strip calculator phrasing from its title/H1/anchors (it's the paywall page, shouldn't rank for tools).

## ⚠️ Claude's risk note / adjustments to Codex
1. **Branch calculator → branch score-page 301s are the riskiest call.** Those calc pages rank for exact-match *tool* queries (e.g. navy calc pos 29). Redirecting to a *requirements* page is an intent shift UNLESS the branch score page actually embeds the `<Calculator/>` tool. **Do these 301s only after the branch pages host the calculator + the branch-anchored internal links are live.** Otherwise we lose tool-intent rankings. Consider doing steps 1–4 + the non-branch redirects first, measure, then decide on the branch-calc redirects.
2. **Stage in two redirect batches**, not one: (A) the safe explainer/tool merges (`what-is-a-good`, `gt-score-calculator`, composite/line/afqt-calculator), (B) the branch-calc redirects after the branch pages are tool-capable.
3. Everything through step 4 is reversible. The 301s (step 5) are the commit point — get sign-off before that batch.
