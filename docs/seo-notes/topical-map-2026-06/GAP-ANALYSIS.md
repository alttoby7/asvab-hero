# ASVAB Hero — Topical Map Coverage & Gap Analysis (2026-06-18)

Cross-referenced the 67-keyword topical map against asvabhero.com's **live routes**
(scanned from the repo). The site is already mature: 17 calculators, ~15 score guides,
9-subtest practice tests, 47 study-guide topics (AO included), jobs/ranks/pay, and AFCT pages.

**Verdict: ~45 of 51 content topics are already covered.** The map's value is the short
gap list below, not a build-everything plan. The real lever remains DR/links (DR=0), not coverage.

## 🟢 Net-new pages worth building (6 gaps)
| Page to build | Vol/mo | KD | Why it's a gap |
|---|---|---|---|
| **`/is-the-asvab-hard`** | 1,700 | 0 | No dedicated page. Pure info, zero competition. Top quick win. |
| **`/can-you-use-a-calculator-on-the-asvab`** | 1,500 | 6 | Calculator *tools* exist, but no page answering this exact question. |
| **`/asvab-assembling-objects-tips`** | 590 | 0 | `/study/ao` exists, but AO is the only subtest missing a `-tips` SEO page. |
| ~~`/asvab-tutor`~~ ✅ SHIPPED 2026-06-18 | 1,400 | 18 | Decision guide live w/ inline printable Tutor Vetting Checklist PDF. |
| **`/afqt-vs-asvab`** | 500 | 3 | No comparison page. Common confusion. |
| **`/afct-vs-asvab`** | 500 | 0–3 | Pairs with `/afct`; active-duty wedge. |

Combined ~6,200 searches/mo, almost all KD ≤6.

## 🟡 Covered but worth a ranking re-check (not net-new)
These exist; if they're not ranking, it's an on-page/links issue, not a coverage gap:
- Calculator cluster (`/calculator` + 14 variants) — huge tool inventory; verify they rank for `asvab calculator`, `gt score calculator`, branch calculators.
- `/asvab-score-chart`, `/what-is-a-good-asvab-score`, `/gt-score`, `/afqt-score` — core money pages.
- Branch score pages (`/army-asvab-score`, `/navy-asvab-score`, etc.).

## How to read the map
- `topical-map.html` — interactive tree (pillars → clusters → supporting).
- `page-plan.csv` now carries `coverage` (covered/gap) + `existing_url` per row.
- Build the 6 gaps with `/asvab-post-writer`; for the covered-but-weak pages use `/on-page-optimizer`.
