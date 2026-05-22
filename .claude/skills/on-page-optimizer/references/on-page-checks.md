# On-Page Checks Reference (ASVAB Hero / Next.js)

Every on-page factor to compare between the user's page and the top SERP competitors. Run every check. Record each as:

```
{ factor, your_value, competitor_avg, status: "ahead"|"behind"|"missing", priority, recommendation }
```

Priority levels: **high** (directly impacts rankings), **medium** (best practice, moderate impact), **low** (minor optimization).

**This doc assumes you have read the keystone contract `references/next-patterns.md`.** It defines the page-type taxonomy + scope whitelist (§11), the rendered-title/double-suffix rule (§2), the `metadata` object (§3), JSX body + design tokens (§4), JSON-LD schema types (§5), and the FAQ Pattern A/B sync policy (§6). The checks below reference those sections — they do not restate them.

**Priority order of the checks is deliberate. Subtopic coverage (Check 3.3) is the single most important finding, then content depth/word count (Check 4), then keyword usage (Check 5), then title/meta/headings/links/FAQ/images.** Do not report a pile of metadata-only findings and call it a gap analysis — subtopic and content gaps are the point.

---

## Evidence Standards

Every Stage 2 finding must be tied to the evidence source that supports it:
- **Rendered target page (`out/{slug}.html` after build, or the live URL):** strongest evidence for the user's current rendered title, meta, headings, visible copy, word count, internal links, FAQ output, and schema output.
- **Raw competitor scrape (WebFetch):** strongest evidence for competitor headings, subtopics, tables, FAQs, word counts, and content quality.
- **GSC (`mcp__gsc__*`):** strongest evidence for the owned page's real rankings, clicks, impressions, CTR, and the queries it already ranks for (secondary-keyword discovery). PRIMARY ranking-data source — see the data-source ladder in `references/site-setup.md`.
- **WebSearch:** strongest evidence for the live top-10 SERP and SERP title patterns.
- **Ahrefs (`mcp__ahrefs__*`, OPTIONAL — may be absent):** enrichment for volume, KD, CPC, and related terms. If not connected, proceed without it (reduced forecast precision, not a blocker).
- **Current official/source check:** required for score minimums, line-score thresholds, bonuses, program details, fiscal-year figures, or policy that could have changed.
- **Inference:** acceptable only when scraping fails. Label it as inference and keep priority lower unless several other sources support it.

Do not present inferred or weakly sourced findings with the same confidence as rendered-page or raw-scrape findings. If a recommendation depends on a blocked scrape, a prompted extraction, or a non-official source, say that plainly.

---

## Before Running Checks: Confirm Scope and Page Type

1. **Confirm the page is in scope (next-patterns §11).** Only indexable ranking pages in the `scripts/generate-sitemap.mjs` `pages` array (~74) get a gap analysis. If the slug is NOT in that array — or it's a study guide (`study/[subtest]/[topicSlug]`), flashcard deck, or an app/account/auth/practice surface — it is **out of scope: produce no gap analysis.** Say so plainly and point the user to the `asvab-post-writer` skill.
2. **Identify the page type (next-patterns §11 taxonomy):** Article, Score hub, Calculator/tool, or Interactive. The expected schema type and FAQ pattern differ by type, so several checks below branch on this.

### Rendered page is the source of truth

Read the target `src/app/{slug}/page.tsx`, then verify against the rendered output. Source explains where edits belong; the **rendered HTML** (`out/{slug}.html` after `npm run build`, or the live URL) is what Google, users, and accessibility tools actually see. Use it as the source of truth for:
- Final `<title>` text, **including the ` | ASVAB Hero` suffix the layout template appends** (next-patterns §2).
- Meta description output.
- Visible H1/H2/H3 structure.
- Visible body copy and word count.
- Main-content internal links.
- FAQ output and FAQ schema presence/parity.
- Duplicate headings, missing sections, or content hidden inside a `"use client"` component (which renders empty in static HTML).

When measuring rendered content, scope to the article/main content container. Exclude global nav, footer, the related-links card, `EmailCapture` blocks, and CTA boxes from word count and internal-link counts unless they're part of the editorial body. If you can't isolate the body cleanly, report the metric as approximate and explain the scope.

For heading checks, count only visible headings in the real content area. Report a duplicate H1 only when multiple visible content H1s actually render. If the source suggests a duplicate but the rendered page shows one H1, do not report a duplicate.

### Page types (next-patterns §11)

- **Article / Score hub** — substantial `prose-asvab` JSX with H2/H3 sections; schema `Article` + `FAQPage`; FAQ Pattern A. Most checks apply directly.
- **Calculator / tool** — `<section>` cards around a `Calculator` component; schema `WebApplication` (NOT Article, no date field); FAQ usually Pattern A via an inline `.map()` array. Word count and heading checks apply to ALL rendered sections combined, not just one block; do not flag a missing Article schema or missing `dateModified` — these are correct for this type.
- **Interactive** (`free-asvab-practice-test`) — `<section>` cards around a quiz client; schema `Quiz` + `FAQPage`; FAQ Pattern B (shared `faqItems` array). No date field expected.

---

## Check 0: Indexability & Coverage (run FIRST when impressions are ~0)

A page that isn't indexed cannot rank, so no amount of on-page work matters until it is. **This check runs first whenever the GSC baseline (Stage 1 Step 4) shows zero / near-zero impressions** — it consumes the `mcp__gsc__inspect_url_enhanced` result captured there.

- **Not indexed** (Coverage ≠ "Submitted and indexed", failed fetch, `noindex`/robots block, or Google-selected canonical ≠ this URL): **this is the #1 finding, above subtopic coverage.** Report the coverage state and the fix (submit/validate in GSC, remove `noindex`, fix canonical/robots, confirm the slug is in `scripts/generate-sitemap.mjs`). State plainly that on-page copy edits won't help until it's indexed — do not bury this under title/meta tweaks.
- **Indexed but ~0 impressions** (Coverage = "Submitted and indexed", fetch successful, crawled recently): the page is eligible but **buried or brand-new**. Flag it as a **ranking/authority** problem, not an on-page-depth one — if subtopic coverage and word count are already at/above the competitor bar (Checks 3.3, 4), say the lever is off-page (backlinks, internal links, freshness, intent-match), and do not reflexively prescribe more body copy. **This is the canonical case to escalate to Ahrefs** (backlink/DR comparison vs the ranking competitors → quantify the authority gap), with DataForSEO for the SERP-competitor set — the premium tier earning its cost (see `site-setup.md` ladder).
- **Has impressions:** indexed by definition — skip this check and proceed.

**Priority:** High (gating). A strong page with zero impressions is an indexing/ranking finding, not a content finding — leading with content gaps there is the classic misdiagnosis this check exists to prevent.

---

## Check 1: Title Tag

**Where to find it:** the `metadata.title` string in `page.tsx` (next-patterns §3). **The rendered `<title>` is the source string + ` | ASVAB Hero` (the layout template, next-patterns §2). Evaluate the RENDERED title for every sub-check below.** Confirm against `out/{slug}.html`: `grep -o "<title>[^<]*</title>" out/{slug}.html`.

### 1.0 Double-suffix defect (next-patterns §2) — FLAG IT
- **Check:** does the source `metadata.title` already end with ` | ASVAB Hero` (or any ` | …` suffix)? If so, the template appends a SECOND suffix and the rendered title is double-suffixed (e.g. `… | ASVAB Hero | ASVAB Hero`).
- **This is a real on-page defect, not a style nit. Report it as a finding** with the fix: strip the manual suffix from the source string so the template adds it exactly once.
- **Verify in the rendered HTML** — ~31 pages have this bug; confirm rather than assume.
- **Priority:** High (defect that wastes pixel budget and looks broken in the SERP).

### 1.1 Keyword Placement
- **Ideal:** primary keyword at or near the front of the rendered title.
- **Compare:** how many of the top 10 start with the keyword vs end with it?
- **Priority:** High

### 1.2 Title Length
- **Measure the RENDERED title** (source + ` | ASVAB Hero`, 13 chars). A 64-char source string renders at 77 chars.
- **Ideal:** ~55–60 rendered chars (Google truncates on pixel width; ~60 is the practical max). To fit, keep the source string roughly under ~45 chars.
- **Common trap here:** budgeting against the source string and missing the +13-char suffix — or compounding it with a hardcoded suffix (Check 1.0).
- **Compare:** your rendered title length vs competitor average.
- **Priority:** High

### 1.3 Click-Worthiness
- **Check for:** numbers (8-Step Plan, 2026), specifics, brackets. ASVAB Hero titles favor concrete numbers/scores over generic power words.
- **Priority:** Medium — don't over-stuff.

### 1.4 Year Inclusion
- **Check:** does the rendered title include the current year? Do competitor titles? Add it if 3+ competitors do (e.g. `army-asvab-score` uses `(2026)`).
- **Priority:** Low (easy win)

---

## Check 2: Meta Description

**Where to find it:** the `metadata.description` plain string in `page.tsx` (next-patterns §3). No template is applied; the string ships verbatim. Confirm it renders in `out/{slug}.html` as `<meta name="description" ...>`.

### 2.1 Keyword Presence
- **Ideal:** primary keyword appears naturally (Google bolds matching terms).
- **Priority:** High

### 2.2 Length
- **Ideal:** 120–155 characters. Under 80 wastes SERP space; over 160 truncates.
- **Priority:** Medium

### 2.3 Call-to-Action
- **Check for:** action words ("See every MOS you qualify for", "Free, no signup", "Learn how").
- **Priority:** Medium

### 2.4 Uniqueness
- **Check:** generic ("Learn about ASVAB scores") vs specific ("all 10 Army line scores + every MOS you qualify for"). Better descriptions use numbers and unique angles.
- **Priority:** Medium

### 2.5 Missing Description
- **If `metadata.description` is absent:** high-priority fix — Google auto-generates a worse one. (There is no schema to check; just add the field to the `metadata` object.)
- **Priority:** High

---

## Check 3: Heading Structure

**Where to find it:** in JSX (next-patterns §4). H1 is one `<h1>`; sections are `<h2>`/`<h3>`. No frontmatter, no auto-rendered title-as-H1.

**Determine H1:** there is exactly one `<h1>` per page, hand-authored in JSX. On Article/score-hub pages it's inside `<article className="prose-asvab">`; on calculator/interactive pages it's in a `<div>`/`<header>`. The title tag and H1 are separate strings and should differ.

### 3.1 H1 Tag
- **Check:** exactly one `<h1>` that includes the primary keyword.
- **Common issues:** missing keyword, or (rarely) a second H1 added by a prior edit. Report a duplicate only if it actually renders in `out/{slug}.html`.
- **Priority:** High

### 3.2 Heading Hierarchy
- **Check:** proper nesting — `<h2>` under the H1, `<h3>` under `<h2>`, no skipped levels.
- **For calculator/interactive pages:** sections are `<section>` cards each with an `<h2>`; check those.
- **Priority:** Medium

### 3.3 Subtopic Coverage
- **THIS IS THE MOST IMPORTANT CHECK.**
- Compare the page's topic coverage against the "must-have subtopics" from the SERP analysis (competitor scrape).
- Only call a subtopic "must-have" when raw competitor scrape supports it across at least 4 of the top 5 competitors. If the count relies on inferred/blocked pages, downgrade to "likely common" and note the weaker evidence.
- For **Article/score-hub pages:** compare `<h2>` topics directly.
- For **calculator/interactive pages:** map each rendered `<section>` card (formulas, MOS table, FAQ, etc.) as a "subtopic" and compare TOPICS covered, not heading tags.
- For each must-have subtopic:
  - **Covered:** page addresses it → "ahead"/"on par".
  - **Missing:** no section addresses it → "missing", high priority.
- **Present the gap clearly:**
  > "Your page covers 5 of 12 subtopics that top competitors address. Missing 7 subtopics: {list}."
- **Priority:** High

### 3.4 Keyword in Subheadings
- **Check:** primary keyword or close variations in 2–3 `<h2>`/`<h3>` headings (not all).
- **Priority:** Low

---

## Check 4: Content Depth

### 4.1 Word Count
- **Measure:** total visible prose on the rendered page (`out/{slug}.html` or live URL), scoped to the editorial body.
- **From source:** the body is JSX, not markdown — strip the `metadata` object, `import` statements, `<JsonLd>` payloads, JSX tags/attributes, and `{/* comments */}`. What remains is visible prose. Prefer the rendered count.
- **For calculator/interactive pages:** count across ALL rendered `<section>` cards (intro, formula grid, MOS table, FAQ answers, CTA copy), not just one block.
- **Cross-check:** if rendered and source word counts differ by >20%, trust the rendered count and investigate (often the FAQ duplicated in schema, or content behind a `"use client"` gate that renders empty).
- **Compare:** your total vs top-5 competitor average.
- **Interpretation:** within 20% — on par; 30–50% below — behind; 50%+ below — major gap; above average — ahead (more isn't always better).
- **Priority:** High (if significantly behind). Word count is a proxy for depth — subtopic coverage (3.3) matters more.

### 4.2 Content Freshness
- **Where:** the `Article` JSON-LD `dateModified` field (next-patterns §5). On variant-(b) pages it's in the hoisted `const`; on variant-(a) it's in the inline object.
- **Check:** compare `dateModified` to today. If it's more than ~12 months stale, flag for update. **Never touch `datePublished`.**
- **Type exception:** `WebApplication` (calculator) and `Quiz` (practice-test) schemas carry NO date field — do NOT flag a missing `dateModified` on those, and do NOT recommend adding one.
- **Compare dynamically** — do not hardcode a year in the recommendation.
- **Priority:** Medium

### 4.3 Content Uniqueness
- **Check:** does the page offer something competitors don't — worked examples (the `army-asvab-score` GT calculation), real program stats, a calculator/tool, branch-specific tables?
- **Priority:** Medium

---

## Check 5: Keyword Usage

### 5.1 Primary Keyword Placement
- **Check:** primary keyword in the key positions — `metadata.title`, `metadata.description`, first 100 words of the visible JSX body, 2–3 subheadings, and at least one image `alt` (`DvidsHeroImage`/`BrandHero`, next-patterns §7).
- **Check placement, not density.** If the keyword appears in those positions and isn't absent from the body, the placement check passes.
- **Absence check:** if the keyword appears zero times in the body, add a natural mention in the first paragraph of the first substantive `<h2>` section.
- **Stuffing check:** more than once per ~200 words of body → flag as over-optimized; rewrite the excess as semantic variations.
- **Priority:** Medium

### 5.2 Secondary Keyword / "Also Talk About" Coverage
- **Check:** which secondary keywords and "also talk about" terms from the SERP analysis appear in the content.
- **Present as:**
  > "Your page includes 4 of 15 secondary keywords. Missing: {list}"
  > "Your page uses 2 of 10 'also talk about' terms. Missing: {list}"
- **Priority:** Medium

### 5.3 Keyword Placement Locations
- **Check these for the primary keyword:** `metadata.title`, `metadata.description`, first 100 words of visible JSX, at least one `<h2>`/`<h3>`, at least one image `alt` prop.
- **Priority:** Medium

### 5.4 Semantic Variations
- **Check:** natural variations and related forms (for "army asvab score" — "Army line scores", "GT score", "AFQT minimum", "MOS requirements").
- **Priority:** Low

---

## Check 6: Internal Links

Before scoring, record the link evidence:
- Outgoing main-content `<Link>`s from the JSX body, excluding global nav, footer, and the boilerplate related-links card.
- Incoming links found by grepping the target slug across `src/app/**/page.tsx` and components.
- 3–5 related-page candidates discovered by topic, sibling `src/app/` directory, or obvious hub/supporting content — cross-checked against the sitemap whitelist (next-patterns §10/§11).
- Decision: add link(s), preserve current, ask before editing incoming-link sources, or skip with reason.

Do not force a link to pass the check. A deliberate skip with evidence beats a stuffed link.

### 6.1 Outgoing Internal Links
- **Count:** `<Link>`s in the JSX body (next-patterns §8).
- **Ideal:** at least 3–5 to related ranking pages. Zero in the body is a high-priority fix.
- **Note:** global nav/footer links don't count.
- **Route validity is itself a finding:** flag any `<Link href>` whose target `src/app/{target}/page.tsx` does NOT exist, or that uses a trailing slash — both are defects in static export (a missing route is a 404, not a redirect).
- **Priority:** High (0–1), Medium (2–3), Low (4+).

### 6.2 Incoming Internal Links
- **How:** grep all `src/app/**/page.tsx` and components for `href="/{slug}"` pointing at this page.
- **Ideal:** important pages should have 5+ incoming links. Zero (beyond nav) means the page is an orphan.
- **Priority:** High (0), Medium (1–3).

### 6.3 Anchor Text Quality
- **Check:** descriptive, keyword-relevant anchors ("free ASVAB score calculator") vs generic ("click here", "this page").
- **Priority:** Low

---

## Check 7: FAQ Section

**Detect the FAQ pattern first (next-patterns §6).** Drift between the visible FAQ and the schema `mainEntity` is itself a finding (Check 7.4).

### 7.1 FAQ Presence
- **Check:** does the page have a visible FAQ section? (Article/score-hub: an FAQ `<h2>` + `<h3>`/`<p>` blocks; calculator/interactive: a FAQ `<section>` rendered from a `.map()` array.)
- **Compare:** do top competitors have FAQ sections?
- **Priority:** Medium (High if competitors have FAQs and you don't).

### 7.2 FAQ Schema
- **Check:** is `FAQPage` JSON-LD present? `grep "FAQPage" page.tsx` / confirm in `out/{slug}.html`.
- **Expected by type:** Article/score-hub and interactive pages should carry `FAQPage`. If a page has a visible FAQ but no `FAQPage` schema, recommend adding it.
- **Priority:** Medium

### 7.3 FAQ Relevance
- **Check:** do the questions match People Also Ask data (WebSearch), competitor FAQs (scrape), and — if Ahrefs is connected — its question-format suggestions? If they exist but don't match PAA, recommend supplementing; if none, recommend the top 3–5.
- **Priority:** Medium

### 7.4 FAQ Schema/Visible Parity (next-patterns §6) — drift is a finding
- **Detect the pattern:**
  - **Pattern A (duplicated, dominant):** the Q&A is written twice — in `mainEntity[]` and in the visible JSX. Compare them. If a question or answer differs in wording/meaning (beyond the allowed difference: visible JSX may add `<Link>` and `&apos;`/`&ndash;` entities while schema `text` is plain), **report the drift as a finding** with the fix (sync both surfaces).
  - **Pattern B (shared array, only `free-asvab-practice-test`):** schema and visible list both `.map()` one `faqItems` const — parity is structural, so report only content quality, not drift.
- **Priority:** Medium (High if the visible FAQ and schema diverge materially).

---

## Check 8: Schema / Structured Data

### 8.1 Correct `@type` for the page type (next-patterns §5/§11)
- **Check:** does the primary `<JsonLd>` `@type` match the page type? Article/score-hub → `Article`; calculator/tool → `WebApplication`; interactive → `Quiz`. FAQ blocks add `FAQPage`.
- **Report a mismatch as a finding** (e.g. a calculator page carrying `Article`, or an article missing `Article`). Do NOT recommend swapping a correct `WebApplication`/`Quiz` to `Article` — that's correct by design.
- **Verify in rendered HTML:** `grep -o 'application/ld+json[^<]*' out/{slug}.html`.
- **Priority:** Medium

### 8.2 FAQPage mainEntity matches visible FAQ
- Covered by Check 7.4 — confirm `mainEntity[]` exists and matches the visible FAQ.
- **Priority:** Medium

---

## Check 9: Images

### 9.1 Image Alt Text
- **Check:** do images have descriptive `alt` with the keyword where natural? On ASVAB Hero, image `alt` lives in the `alt` prop of `DvidsHeroImage`/`BrandHero` (next-patterns §7), not markdown `![]()`.
- **Common issues:** empty/generic/keyword-stuffed alt. You may improve `alt`; never remove `credit`/`dvidsUrl` on `DvidsHeroImage`.
- **Priority:** Medium

### 9.2 Image Count
- **Compare:** rough image usage vs competitors. If competitors use 5–10 and the page has none, note it (can't fix without DoD/DVIDS assets, but worth flagging — see the `scripts/dvids-image.py` workflow).
- **Priority:** Low

---

## Check 10: Local SEO Signals (rarely applicable)

Run only if the keyword has local intent (inferred from the SERP composition; Ahrefs `intents.local: true` if connected). Most ASVAB Hero queries are national/informational (score requirements, calculators), so this check usually does not apply. If it does, check location mentions in title/description/H1/body and any service-area coverage.
- **Priority:** High for genuinely local keywords; otherwise skip.

---

## Scoring Summary

After running all checks, create a summary table:

| Factor | Status | Priority | Quick Fix? |
|--------|--------|----------|------------|
| Title tag (rendered) | Behind | High | Yes |
| Title double-suffix defect | Present | High | Yes (strip manual suffix) |
| Meta description | Missing | High | Yes |
| H1 keyword | Pass | - | - |
| Subtopic coverage | 5/12 | High | Yes (add sections) |
| Word count | Behind (1200 vs 2800) | High | Yes (add sections) |
| Primary keyword placement | Missing from intro | Medium | Yes |
| Internal links out | 1 link | High | Yes |
| Internal links in | 0 links | High | Yes (edit other pages) |
| FAQ schema/visible parity | Drift | Medium | Yes (sync both) |
| Schema @type | Correct (Article) | - | - |
| ... | ... | ... | ... |

Count: X high-priority issues, Y medium, Z low. This feeds the revenue impact presentation in Stage 3.

**Guardrail:** lead with subtopic and content-depth gaps (Checks 3.3, 4). Do not present a gap analysis that is only title/meta/link tweaks — those are real but secondary, and a metadata-only report misses the point.
