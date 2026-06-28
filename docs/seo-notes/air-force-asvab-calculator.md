# SEO log — /air-force-asvab-calculator

Target keyword: **air force asvab job calculator** (us, 250/mo, KD ~low)
Secondary: air force asvab score calculator (30), air force mage score calculator (30)

---

## Cycle 1 — 2026-06-22

### Baseline (Ahrefs, 2026-06-22)
- "air force asvab job calculator" (250/mo): **asvabhero.com/ (homepage) ranks pos 5**; the dedicated `/air-force-asvab-calculator` spoke ranks **nowhere** in the top 10.
- SERP: pos1 mixed (airforce.com, ratemyasvab, jobtestprep, military.com); pos2 ratemyasvab.com/air-force (DR1); pos3 asvabtutor.com (DR25); pos4 airforce.com (DR79); **pos5 homepage (DR0)**; pos6 calcforlife.com (DR0, exact-match slug); pos10 petersons (DR75).
- Root cause = **keyword cannibalization**: the homepage holds the domain's link equity (231 backlinks) and outranks its own link-thin calculator spokes. `calculator-links.ts` was already built to fight this, but link equity still wins. The spoke also never used the searcher's word ("job") — it spoke "AFSC" (jargon).

### Hypothesis
The homepage is a *generalist* (its title doesn't even mention Air Force) yet ranks pos 5 on authority alone. A hyper-relevant spoke that (a) exact-matches "Air Force ASVAB **Job** Calculator" in title/H1/meta/body, (b) bridges job↔AFSC, and (c) gets exact-match contextual anchors from relevant siblings should give Google enough relevance signal to **swap the ranking URL to the spoke** for this long-tail — without touching the homepage (the 9.3% top converter, fenced off).

### Changes (commit 9f35f65)
1. Title → `Air Force ASVAB Job Calculator: AFSC & MAGE Scores` (front-loads exact long-tail; template appends " | ASVAB Hero").
2. Meta description rewritten to lead with "Air Force ASVAB job calculator" + "AFSC (Air Force job)".
3. H1 `Air Force ASVAB Calculator` → `Air Force ASVAB Job Calculator`; subhead now "every Air Force job (AFSC)…"; WebApplication JsonLd name updated to match.
4. New FAQ "What Air Force jobs can I get with my ASVAB score?" + **FAQPage schema** (mirrors the coast-guard sibling). FAQ array lifted to a `const` so the schema can't drift from the visible Q&A.
5. AFSC-table caption: "see which **jobs** are within reach" (was "fields").
6. Two sibling **contextual** links re-anchored to exact-match "Air Force ASVAB job calculator": `/air-force-jobs` and `/air-force-asvab-score`. (Kept to 2 to avoid over-optimized anchor stuffing. **Did NOT** touch the homepage's curated block or `calculator-links.ts` labels — those feed the off-limits homepage.)

No facts changed (AFQT 36 / MAGE formulas / AFSC minimums untouched). `tsc --noEmit` clean; `pnpm build` clean; rendered HTML verified (title, H1, FAQPage schema, "job" ×8 in body).

### Verify on / after 2026-07-06 (~2 weeks)
- Re-pull Ahrefs `site-explorer-organic-keywords` for `asvabhero.com/air-force-asvab-calculator` exact — did it start ranking for "air force asvab job calculator"? Did the ranking URL flip from homepage → spoke?
- Check GSC: which URL now shows for the query; position trend.
- If the spoke ranks but homepage still co-ranks (still flip-flopping) → consider one more exact-match anchor or a self-referential canonical review.
- If no movement → the ceiling is link authority, not on-page; escalate to link-building / accept homepage holds it.
- **Do NOT** judge before 2026-07-06 — re-crawl + re-rank latency.

### Next candidate spokes (same cannibalization pattern, future cycles)
- "afqt calculator" (100/mo, homepage pos 6) → `/afqt-calculator`
- "navy asvab score calculator" (80/mo, homepage pos 11) → `/navy-asvab-score-calculator`
