---
url: /gt-score
target_keyword: gt score
site_url: https://asvabhero.com
country: us
first_optimized: 2026-06-14
cycles: 1
last_verdict: first-run
---

# /gt-score — Optimization Log

Target keyword: **gt score** (1,200/mo US, global 3,600, KD 0) plus the calculator cluster (`gt score calculator`, `asvab gt score`, `gt score asvab`). `/asvab-gt-score` 301s here. This page was consolidated from the old `/asvab-gt-score` and is already deep (~1,770 lines, formula + step calc + ranges + 110 deep-dive + jobs-by-cutoff + by-branch + how-to-raise + 10-Q FAQ + calculator).

---

## Cycle 1 — 2026-06-14

**Status:** applied

### Baseline metrics (GSC, 90 days, ending 2026-06-14)

`/asvab-gt-score` (the 301'd legacy URL) still carried **1,047 impressions, pos ~10.1** in the window; calculator-cluster queries rank 6–10 (`gt score calculator` pos 7.7, `gt score asvab calculator` 9.7, `gt score calculator army` 6.0, `gt score predictor` 3.0). Bare informational **gt score** (1,200/mo, KD 0) is the under-captured prize.

| Keyword | Vol/mo | KD | Notes |
|---|---|---|---|
| gt score | 1,200 (global 3,600) | 0 | head info term, target |
| gt score calculator | (cluster) | — | already pos ~7.7 |
| asvab gt score | (cluster) | 0 | secondary |

**Top-10 SERP for "gt score" (Ahrefs, US):** #1 andysasvabclass.com/gt-score-asvab-army-jobs (**DR 2**) · #2 reddit.com/r/army "How do I know my GT score?" (DR 95, forum) · #4 recruiting.army.mil GT info page (DR 90, thin FAQ, 107 traffic) · #5 cavhooah.com (DR 26) · #6 exam-labs.com blog (DR 70) · #7 scatter of Reddit/Facebook/YouTube · #8 easy-prep.org (DR 4) · #9 Wikipedia (generic ASVAB article) · #10 nationalguard.com/practice-asvab (off-target practice page). **No purpose-built GT authority page in the top 10; #1 is DR 2.** KD 0 confirmed.

**Competitor / intent signal:** the #1 title and the #2 Reddit thread both center the **"how/where do I find/know my GT score"** intent. Our page taught how to *calculate* GT but had **no section on where it appears** (score sheet / recruiter / record brief) — the dominant secondary intent the forums currently own.

### Hypothesis

The page is content-deeper than everything ranking; the gap to top-3 is **intent match**, not depth. Adding a "How to Find Your GT Score" section + matching FAQ (the forum intent) and frontloading a crisp featured-snippet definition should let the page take top-3 / the snippet on a KD-0 SERP with no strong incumbent. No authority gating issue here (unlike the `asvab scores` head term) given the weak SERP.

### Changes applied

1. **Frontloaded snippet definition** — new first paragraph after H1: direct one-liner "Your GT score (short for General Technical) is a military line score equal to VE + AR…" (was a narrative "You passed the ASVAB…" open). Targets the featured snippet above the DR-2 #1.
2. **New H2 section "How to Find Your GT Score"** (~230 words) — three real sources: ask your recruiter (applicants), record brief / ERB / IPPS-A + S-1 / education center (serving soldiers), or calculate from WK/PC/AR standard scores (links `/gt-score-calculator` + the step-by-step section above). Closes the dominant "where do I find it" intent gap. Inserted before the GT-vs-AFQT section.
3. **New FAQ "Where do I find my GT score?"** added to BOTH the visible FAQ list and the FAQPage JSON-LD `mainEntity` (kept in sync; schema rich-result-eligible).
4. **Article JSON-LD** `dateModified` 2026-05-20 → 2026-06-14 (genuine content update).

No design-system, structure, slug, or title changes. No keyword stuffing / filler (owner penalty-sensitive: HCU history on sister sites — all edits are intent-driven and competitor/SERP-grounded).

### Claim ledger

| Claim | Trust basis | Verification | Confidence | Action |
|---|---|---|---|---|
| GT = VE + AR; VE is converted from WK+PC | existing trusted page | matches rest of /gt-score + officialasvab | High | Written (reused) |
| GT usually not printed on the take-home ASVAB score sheet; recruiter has line scores | domain knowledge + forum SERP corroboration | Reddit threads "how do I know my GT", recruiter is canonical source | Medium-High | Written |
| Serving soldiers find GT on record brief (ERB → IPPS-A) / S-1 / education center | domain knowledge | general Army record-brief practice; IPPS-A replaced ERB | Medium | Written (phrased without over-specific form numbers) |
| 110 unlocks officer/warrant/most technical+SOF | existing page (AR 135-100 cited elsewhere on page) | reused from page's verified content | High | Written (reused) |

### Build / verify

`npm run build` clean. `out/gt-score.html`: 1 H1, 15 H2 (+1), FAQPage schema present with the new Q in both DOM and JSON-LD, snippet definition rendered, dateModified 2026-06-14. `/gt-score` page file has 0 em-dashes. No sitemap churn (restored).

### Expectations

"gt score" + `asvab gt score` should move from ~pos 7–10 toward top-3 / snippet in 2–8 weeks given the KD-0, incumbent-free SERP. The "find my GT score" section should also pick up the `how do I find my gt score` long-tail the forums hold. Re-review in ~3–4 weeks: pull GSC pos for "gt score" + check for the FAQ rich result.

### Git state at end of cycle

- Edits committed same session (see commit after this log); user repo deploys from main.
- Notes: only `src/app/gt-score/page.tsx` + this log changed; sitemap churn restored.
