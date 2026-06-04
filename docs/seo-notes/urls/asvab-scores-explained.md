---
url: /asvab-scores-explained
target_keyword: asvab scores explained
site_url: https://asvabhero.com
country: us
first_optimized: 2026-05-22
cycles: 1
last_verdict: first-run
---

# /asvab-scores-explained — Optimization Log

Target keyword: **asvab scores explained** (100/mo, US, KD 12) — anchor for the page's explainer cluster (`understanding asvab scores` 80/KD12, `how are asvab scores calculated` 20/KD9, `asvab scoring` 900/KD28). Head term `asvab scores` (9,700/KD20) is the aspirational prize but authority-gated.

---

## Cycle 1 — 2026-05-22

**Status:** applied

### Baseline metrics (GSC, 90 days, 2026-02-21 → 2026-05-22)

Page-level: **632 impressions, 0 clicks, avg position 61**, 280 ranking queries. The page is indexed and topically associated with the whole "ASVAB scores / AFQT / line scores" cluster but buried on page 6–8 for its head terms.

| Keyword | GSC avg pos | GSC impr (90d) | Vol/mo | KD |
|---|---|---|---|---|
| asvab scores (head) | 75 | 30 | 9,700 | 20 |
| asvab scoring | 71 | 10 | 900 | 28 |
| asvab scores explained | 66 | 6 | 100 | 12 |
| understanding asvab scores | 66 | 4 | 80 | 12 |
| how are asvab scores calculated | 77 | 4 | 20 | 9 |
| composite score asvab | 64 | 3 | 30 | 21 |
| asvab score sheet | 36.5 | 8 | — | — |
| how to read an asvab score sheet | 25.5 | 2 | — | — |

**Top-10 SERP for "asvab scores" (Ahrefs, US):** AI Overview (#1) · asvabprogram.com/score-request (DR 64, nav) · officialasvab.com/counselors-educators/scores (DR 62, UR 10) · ratemyasvab.com/scores (147 refdomains, tool) · airforce.com/asvab (DR 79) · asvabprogram.com/media-center-article/46 (DR 64) · petersons.com (DR 75) · military.com. Mixed-intent + high-DR incumbents → head term is authority-gated.

**Competitor explainer structure (scrapes):** military.com ~1,600w (3 H2s, no FAQ); achievable.me ~2,500w (5 H2s, covers test versions + CEP, no FAQ); officialasvab.com ~550w (3 H2s); petersons.com ~1,300w (3 H2s); examsnap.com ~4,500w (15 H2s). **None have an FAQ; none have interactive tools.** Our page already exceeds 4/5 on depth (~2,400w + 4 interactive components).

### Hypothesis

The page is buried at 60–79 for terms it should own NOT because of a content-depth gap (it's already deeper than 4/5 competitors) but because of:
1. **Title/H1 relevance mismatch** — title was "AFQT vs Line Scores: How to Read Your ASVAB Score Sheet" with neither "asvab scores explained," "understanding," nor "what they mean" present, so the page sat at #66 for its own slug-exact phrase.
2. **FAQ schema only exposed 5 of 10 visible Q&As** (Pattern A drift) — half the FAQ was rich-result-ineligible.
3. **Title promised a score-sheet walkthrough the page didn't deliver**, and the universal subtopic (standard-score scale, mean 50/SD 10) that 5/5 competitors lead with was glossed.

Fixing title/H1 + adding the score-sheet section should capture the low-KD cluster (KD 9–28) and lift the page from page ~6–7 toward page 1–2. Head term `asvab scores` is authority/internal-link gated (site-wide pattern: homepage hoards authority, spokes under-linked) and won't move on on-page alone.

### Changes applied

1. **Title** → `ASVAB Scores Explained: AFQT, Line Scores & What They Mean (2026)` (was `AFQT vs Line Scores: How to Read Your ASVAB Score Sheet (2026)`). Leads with slug-exact phrase + head root.
2. **Meta description** → frontloaded "ASVAB scores explained" (152 chars).
3. **H1** → `ASVAB Scores Explained: What Every Number on Your Score Sheet Means` (differs from title, carries keyword + score-sheet promise).
4. **New H2 section** "How to Read Your ASVAB Score Sheet" (~330 words): 3-bucket comparison table (standard scores / AFQT / composites), standard-score-scale explanation (mean 50, SD 10), Key Point aside on percentile-vs-percent, contextual `/calculator` link. Serves `asvab score sheet`, `how to read an asvab score sheet`, `asvab scoring scale`, `asvab percentile`.
5. **FAQ converted Pattern A → Pattern B** (single shared `faqItems` array feeding both schema `mainEntity` and visible list). Schema FAQ count **5 → 10** (verified in `out/`). Prevents future drift.
6. **Fixed factual error:** FAQ said Army 35F requires "GT 101+" → corrected to "ST (Skilled Technical) score of 101" (verified: cogn-iq, army.mil 35F PDF, and own /army-asvab-score page). The error would otherwise have been promoted into the FAQ schema.
7. **Article JSON-LD** `dateModified` 2026-04-19 → 2026-05-22; schema `description` rewritten (dropped "Comprehensive").

### Claim ledger

| Claim | Trust basis | Verification | Confidence | Action |
|---|---|---|---|---|
| Standard scores mean 50, SD 10 | official + reputable | officialasvab.com + military.com scrapes | High | Written |
| AFQT = 2(VE)+AR+MK, 1–99 percentile | existing trusted page + official | officialasvab.com | High | Written (reused) |
| Army 35F requires ST 101 | official + first-party | WebSearch: cogn-iq + army.mil 35f.pdf; matches /army-asvab-score | High | Written (corrected from GT 101) |
| Branch AFQT minimums (Army 31/Navy 35/Marines 32/AF 36) | existing VerifiedBlock Apr 2026 + official | WebSearch confirmed | High | Kept unchanged |
| Coast Guard AFQT 32 | pre-existing page claim | WebSearch — sources CONFLICT (32 vs 40) | Low/contested | **Left unchanged; flagged to user for separate review** |

### Build / verify

`npm run build` clean. `out/asvab-scores-explained.html`: title single-suffixed (not doubled); 1 H1; 9 H2s (+1); FAQPage schema = 10 Questions; "GT 101" = 0 occurrences; dateModified 2026-05-22. Only `src/app/asvab-scores-explained/page.tsx` modified; no sitemap churn.

### Expectations

Low-KD cluster (`asvab scores explained`, `understanding asvab scores`, `how are asvab scores calculated`) should move from page 6–7 toward page 1–2 in 2–8 weeks. `asvab scores` head term needs internal links + authority, not on-page — do not expect movement there from this cycle.

### Git state at end of cycle

- HEAD: `43758f2483f8c6bf2b9f60b25dbbfcf5f1c00efe`
- File blob: `ada6d715aeaa9e521ef0ab020e4a6c70396bdca9`
- Notes: edits uncommitted at cycle close (user controls commits).
