# SERP Analysis Reference

How to discover the live SERP, scrape competitor content for structural comparison, and pull the owned-page baseline — using the data-source ladder (GSC + WebSearch + WebFetch primary; Ahrefs optional). The SEO methodology (top-10 SERP, competitor structure analysis, must-have subtopics, secondary keywords, the metric basket, the Stage-1 exit gate) is unchanged; only the providers swap.

**Source ladder recap** (established in `site-setup.md`):
- **WebSearch** → PRIMARY (free) for live SERP / top-results discovery.
- **WebFetch** (+ any cf-scraper) → PRIMARY (free) for competitor content extraction.
- **GSC** (`mcp__gsc__*`) → PRIMARY (free) for the owned page's baseline (position/clicks/impressions/CTR), indexing, and secondary-keyword discovery.
- **DataForSEO** (`mcp__dataforseo__*`) → **DEFAULT PAID** enrichment (on-demand, cheap) for volume/KD/CPC, related/also-rank-for keywords, SERP-with-metrics, SERP competitors.
- **Ahrefs** (`mcp__ahrefs__*`) → **PREMIUM escalation** (on-demand, pricier) for backlink/authority data, DR/traffic-weighted SERP, richest related-terms.

Both paid sources are on-demand — neither runs every run. **Use DataForSEO first; escalate to Ahrefs only for authority/backlink depth or what DataForSEO can't answer. Never call both for the same metric.** Exact `mcp__dataforseo__*` tool names: discover via `ToolSearch` at execution (families: SERP organic live, DataForSEO Labs keyword-overview / related-keywords / serp-competitors, Keywords Data search-volume).

If `WebSearch` / `WebFetch` are deferred tools in this harness, load them via `ToolSearch` before first use.

## Cycle 1 vs Cycle 2+ behavior

**Cycle 1 (first run — no prior SERP data):** Follow all steps below in order. Also collect the full metric basket (see "Metric basket" section at the end).

**Cycle 2+ (review run — prior SERP exists in the log):** Be frugal.
1. Re-run SERP discovery (Step 1 — a single WebSearch is cheap). Diff the current top 10 against the prior cycle's recorded top 10.
2. If ≥1 new URL in the current top 5 OR ≥2 positions of churn in top 5 → re-scrape current top 5 (Step 5). Note in verdict: "SERP churned — new competitors scraped."
3. If stable → reuse prior cycle's scraped content from the log. Note: "SERP stable — reusing prior scrape."
4. Re-pull the metric basket (always — it's a GSC call + optional paid enrichment via DataForSEO/Ahrefs only if the run warrants it).
5. Record the current top 10 in the new cycle's log section regardless.

Progress messages:
> Cycle 1: "Searching the SERP... Scraping competitor #1... #2... Pulling GSC baseline... Analyzing."
> Cycle 2+: "Re-running SERP search... stable, reusing prior scrape. Pulling fresh GSC metrics... Analyzing deltas."

Now follow the steps below. On cycle 2+ skip Steps 2-5 if the SERP is stable.

---

## Step 1: Discover the SERP Top 10 (WebSearch)

Discover the top 10 organic results for the target keyword with **WebSearch** (PRIMARY).

**Tool:** `WebSearch`

**Parameters:**
- `query` — the target keyword, exact match. The audience is US (`country = us`); phrase the query as a US searcher would. Add a year qualifier only if the keyword naturally carries one.
- Capture, in order, the **ranking URLs** returned (title + URL + position). This is your top-10 list and your scrape list for Step 5.

**What you get:** ranking URLs, page titles as shown in search, and result ordering. **What you do NOT get:** meta descriptions, page content, headings, or word counts — those come from scraping (Step 5).

Store the top 10 URLs now for the scrape list. Skip obvious non-organic entries (ads, video carousels, image packs, Google's own widgets) when building the scrape list — keep the top 5 *organic* article/landing/tool pages.

**Paid SERP-with-metrics (on-demand — only when this run warrants paid data; see `site-setup.md`):**
- **DataForSEO (default):** a DataForSEO SERP / Labs SERP-competitors endpoint returns the ranked results plus per-result/domain metrics — the default when you want competitor DR/traffic context cheaply. Discover the exact `mcp__dataforseo__*` tool via `ToolSearch`; `location_name = "United States"`.
- **Ahrefs (escalation):** `mcp__ahrefs__serp-overview-serp-overview` (`select: position,title,url,traffic,keywords,domain_rating,url_rating,backlinks,refdomains,type`; `keyword`; `country: us`; `top_positions: 10`) — reach for it specifically when you need backlink/authority depth DataForSEO didn't give. Don't run both.
- Neither returns content/headings/word counts — you still scrape in Step 5. If this isn't a paid run, WebSearch alone is sufficient for the ranked list and still supplies PAA/related data in Step 3.

---

## Step 2: Keyword Metrics (DataForSEO default-paid; Ahrefs escalation; else estimate from SERP)

Volume / KD / CPC / structured intent are **enrichment, not a gate.** Pull them **only when this run warrants paid data** (the user asked, or a first-cycle optimization on a priority page where competition data matters — see `site-setup.md`). **Use DataForSEO first; escalate to Ahrefs only for what DataForSEO can't give.**

**DataForSEO (default paid source):** call a DataForSEO Labs keyword-overview / Keywords Data search-volume tool (exact `mcp__dataforseo__*` name via `ToolSearch`) for the target → search volume, keyword difficulty, CPC, and (Labs) related/also-rank-for keywords. `location_name = "United States"`. This is the routine paid path.

**Ahrefs (escalation only):** if you specifically need Ahrefs-grade data DataForSEO didn't provide, `mcp__ahrefs__keywords-explorer-overview` (`select: keyword,volume,cpc,difficulty,clicks,global_volume,traffic_potential,parent_topic,parent_volume,intents,serp_features`; `keywords`; `country: us`). CPC is **USD cents — divide by 100**. `intents` gives boolean `informational/navigational/commercial/transactional/branded/local`. **Don't call this if DataForSEO already supplied volume/KD/CPC this run.**

**If no paid source is used this run** (not warranted, or none connected): mark volume/KD/CPC as **"not pulled"** and do not block. Instead:
- **Estimate intent from SERP composition** (Step 1 + Step 5 results): are the top results how-to/educational (informational), comparisons/"best" lists (commercial), pricing/signup/tool pages (transactional)? For ASVAB Hero most ranking targets are **informational** (score guides, subtest tips) or **transactional/tool** (calculators, practice test). Classify from what actually ranks.
- **Skip volume/KD numbers** in the output — note them as unavailable rather than guessing.
- Note SERP features observed in WebSearch results (PAA/"People also ask" boxes → FAQ opportunity; featured snippet → snippet opportunity).

**Present intent plainly to the user** (same regardless of source):
- **Informational** — "People want information. Be comprehensive and answer questions thoroughly."
- **Commercial** — "People are comparing options. Include comparisons, pros/cons, clear recommendations."
- **Transactional** — "People are ready to act. Focus on CTAs, the tool/calculator, trust signals."
- **Mixed** — note the mix; optimize for the dominant intent without ignoring the secondary.

---

## Step 3: Secondary / "Also-Talk-About" Keywords

Build the secondary-keyword set from these sources (GSC first, WebSearch always; DataForSEO as the default paid related-keywords source, Ahrefs only as escalation — both on-demand):

**A. GSC — queries the page already ranks for (PRIMARY):**
Call `mcp__gsc__get_search_analytics` for the **page** (filter by the page URL/path) over the trailing 28 days, `dimensions: ["query"]`, ordered by impressions. These are real queries Google already associates with the page — the strongest signal for what to reinforce. Note which the page already targets vs. which it ranks for accidentally (expansion opportunities).

**B. WebSearch — related / autocomplete suggestions (PRIMARY):**
Run WebSearch on the target keyword and on a couple of natural variants; harvest related searches, autocomplete-style suggestions, and "People also ask" questions surfaced in results. Filter for question-format queries ("what", "how", "why", "when", "can", "does", "is") — gold for FAQ sections.

**C. Paid related / "also-rank-for" keywords (on-demand):**
- **DataForSEO (default):** a DataForSEO Labs related-keywords / keyword-ideas tool (exact `mcp__dataforseo__*` name via `ToolSearch`; `location_name = "United States"`) returns volume-ranked related and "also-rank-for" terms — the routine paid source for semantic expansion.
- **Ahrefs (escalation):** only if you need Ahrefs's set specifically — `mcp__ahrefs__keywords-explorer-related-terms` (`terms: also_talk_about` first, fall back to `all`; `select: keyword,volume,difficulty,traffic_potential,parent_topic,serp_features`; `country: us`; `limit: 30`; `order_by: volume:desc`) + `mcp__ahrefs__keywords-explorer-search-suggestions`. Don't run both if DataForSEO already covered it.
- **Neither:** GSC + WebSearch (A, B) cover the default case fine.

**Filtering (all sources):**
- Keep 2-3 word phrases that represent actual subtopics/concepts (e.g. "afqt percentile", "line score requirements", "gt score waiver").
- **Discard generic single-word terms** ("asvab", "score", "army") — noise.
- Note which terms the page already uses and which are missing.
- The `also_talk_about` semantic terms (whether from Ahrefs or inferred from competitor scrapes + GSC) matter most — they're what top pages actually discuss.

---

## Step 4: Owned-Page Baseline Metrics (GSC, not Ahrefs)

Pull the target page's **current real performance** from GSC — this is the owned-page baseline for the verdict and memory loop.

**Tool:** `mcp__gsc__get_search_analytics`

**Parameters:**
- Filter to the **page** (the full URL `https://asvabhero.com/{slug}` or its path, via a page-dimension filter).
- `dimensions` — `["query"]` (per-query rows for this page).
- Date range — trailing 28 days (and optionally a prior 28-day window for trend).
- Order by impressions or clicks; reasonable `row_limit`.

**What to extract per query:** current **position** (avg), **clicks**, **impressions**, **CTR**. For the target keyword specifically, record its current position (or "not appearing for this query in GSC").

### Zero / near-zero impressions → AUTO-RUN an indexing check (do not skip)

If GSC shows **zero or near-zero impressions** for the page, do NOT just call it "a fresh page." Zero impressions has two causes that need **opposite** fixes, so disambiguate before going further — call `mcp__gsc__inspect_url_enhanced` (`site_url` = the GSC property, `page_url` = full `https://asvabhero.com/{slug}`):

- **NOT INDEXED** — Coverage ≠ "Submitted and indexed", Page Fetch failed, robots/`noindex` blocking, or Google-selected canonical points elsewhere. **The page physically cannot rank.** This is the dominant finding and outranks every on-page gap. Report the exact coverage state and the real fix (submit/validate in GSC, remove `noindex`, fix the canonical/robots, check it's in `scripts/generate-sitemap.mjs`), and tell the user plainly that on-page copy work won't move anything until it's indexed.
- **INDEXED but ~0 impressions** — Coverage = "Submitted and indexed", Page Fetch SUCCESSFUL, recent crawl. The page is eligible but **buried in rankings** (or only just published). On-page depth may already be fine; the lever is usually authority/backlinks, internal links, freshness, or intent-match — say that rather than reflexively recommending more body copy.

Record in the metric basket: coverage state, last-crawled date, Google-selected canonical, and detected rich-result types. (Optional: if Ahrefs is connected, `mcp__ahrefs__site-explorer-organic-keywords` with `target` = page URL, `mode: prefix`, `country: us`, `date` = today, can corroborate — but GSC is the baseline of record.)

If GSC has impressions but the page ranks poorly (positions 11+), no inspection is needed — it's indexed by definition; proceed to the gap analysis.

---

## Step 5: Scrape Competitor Content (CRITICAL STEP — the most important data)

**WebSearch/Ahrefs give you URLs and titles. Neither gives you the actual content of competitor pages.** To compare heading structures, subtopics, word counts, and content depth, you MUST scrape the top 5 organic competitor pages. This methodology is unchanged — only the discovery source upstream changed.

### Scraping Process

For each of the top 5 organic results from Step 1 (skip non-organic types — ads, video, image pack):

**Goal: get the raw competitor content into YOUR context so YOU can analyze it directly.** This is the most important data in the entire optimization — read what competitors actually wrote, not a summary of it.

#### Default: cf-scraper (REQUIRED first attempt, if available)

**If a cf-scraper is configured for this project, use it first.** Do not skip straight to WebFetch when cf-scraper is available. Respect any scraping preferences in `CLAUDE.md` or project memory. cf-scraper returns raw HTML/markdown via a Cloudflare Worker with full JS rendering — no intermediate model processing, you see exactly what the page contains. Request markdown output; analyze headings, depth, and patterns directly.

Do not use Apify for normal competitor article/page scraping. The method order for top-ranking blog posts, guides, landing pages, and tool pages is: **cf-scraper → raw WebFetch → prompted WebFetch (oversized pages only)**.

#### Primary/fallback: WebFetch without a prompt

If no cf-scraper is configured, or it fails for a specific URL (timeout, blocked, worker error), use **WebFetch without a `prompt` parameter**. This returns the raw page content converted to markdown — nav/footer noise included, but you see the actual content, not a summary.

**Why NOT WebFetch with a prompt:** a prompt makes an intermediate model return a structured extraction, which means you never see the real content, can't assess quality/angle, get estimated (not real) word counts, and compare against a lossy abstraction.

#### Last resort: WebFetch WITH a prompt (only for 10,000+ word pages that overflow context)

```
Extract the following from this page's main content area (ignore navigation, footer, sidebar, cookie banners):
1. The meta description (from <meta name="description"> tag)
2. The H1 heading
3. All H2 headings in order
4. All H3 headings in order, grouped under their parent H2
5. The full text of the first 3 paragraphs and the text under each H2 (first 2 sentences each)
6. Approximate word count of the main content body
7. Whether there is a FAQ section (yes/no, and list ALL questions AND their full answers)
8. All internal links in the content body (URL and anchor text)
Return the data in a structured format with clear labels.
```

Even with the prompt fallback, request actual content snippets (not just headings) so you have something real to compare against.

### What to Extract From Competitor Content

Whether you got raw content or a structured extraction, compile:

1. **Meta description** — the `<meta name="description">` tag content
2. **H1 tag** — the main heading
3. **H2 headings** — all H2s in order (the page's subtopic structure)
4. **H3 headings** — all H3s (sub-subtopics)
5. **Word count** — count it yourself from raw content if possible; if using the prompt fallback, note it's an estimate (~500-word accuracy)
6. **FAQ presence** — FAQ sections, accordions, or FAQ schema. Note the actual questions.
7. **Internal linking density** — count of internal links in the content body
8. **Content quality signals** — what makes the good competitors' content good? Specific examples, original data, clear structure, trust signals? This is the insight only reading the real content gives you.

For each competitor, record the scrape quality:
- **raw:** cf-scraper or raw WebFetch returned readable article content.
- **partial:** only some sections readable, or heavy nav/footer noise.
- **prompted:** oversized page required prompted extraction.
- **blocked:** neither cf-scraper nor raw WebFetch returned usable content.

Use only **raw** and clearly usable **partial** scrapes for precise word-count averages and coverage counts. Prompted extractions can inform recommendations, but label their word counts approximate. Blocked pages must not silently count as covering a subtopic.

### If Scraping Fails

- **Don't retry endlessly** — try each URL once with cf-scraper (if available), then once with WebFetch (no prompt). Note failures.
- **Fall back to inference** for blocked pages:
  - Use the title from the WebSearch SERP to guess the page's angle.
  - Use the `also_talk_about` / related terms from Step 3 (GSC + WebSearch, optionally Ahrefs) to infer covered topics.
  - Use WebSearch related searches / PAA to identify subtopics.
  - If Ahrefs is connected, `mcp__ahrefs__site-explorer-organic-keywords` (`target` = competitor URL, `mode: exact`) shows what the competitor ranks for.
- **If 3+ of 5 scrapes fail:** "Most competitor pages blocked scraping, so my content analysis leans on SERP titles and keyword signals rather than full page analysis. Recommendations are still useful but less precise."

### Batch Mode: Deduplicate Scraping

When optimizing multiple pages, the same competitors recur across SERPs. Build a unique URL list across all SERPs and scrape each URL only once; reuse scraped data when analyzing each target page.

### Compile Competitor Content Patterns

From the scraped data (and inferred data for blocked pages):

**Title Tag Patterns:** keyword-first or keyword-last? Numbers ("7 Best…", "[Year] Guide")? Year included? Average title length (chars)?

**Meta Description Patterns:** average length? Keyword included? CTAs?

**Content Structure (the most valuable data):**
1. **Universal subtopics** — H2 topics covered by 4-5 of top 5 (MUST have these)
2. **Common subtopics** — H2 topics covered by 2-3 of top 5 (should have these)
3. **Differentiator subtopics** — covered by only 1 result (nice-to-have, good for uniqueness)

**Word Count Benchmarks:** average word count of top 5; range (shortest→longest); where the user's page falls.

**FAQ Patterns:** how many competitors have FAQ sections? What questions? Cross-reference with PAA from WebSearch.

---

## Output Format

After completing all steps, compile the SERP analysis into a structured format for Stage 2:

```
Target keyword: {keyword}
Search volume: {volume}/mo   (or "unavailable — Ahrefs not connected")
CPC: ${cpc/100}              (Ahrefs-only; omit if unavailable)
Keyword difficulty: {kd}/100 (or "unavailable")
Search intent: {intent types}  (from Ahrefs intents OR inferred from SERP composition)
SERP features: {list}        (PAA / snippet / video, from WebSearch)
Current position: {GSC avg position or "not appearing in GSC"}

Top 10 Competitors (from WebSearch):
1. {title} — {url} — position {pos}   [+DR/traffic if Ahrefs path used]
2. ...

Top 5 Competitor Content Analysis (from scraping):
1. {url}
   - Word count: ~{N}
   - H2 headings: {list}
   - FAQ: yes/no ({N} questions)
   - Meta desc: "{description}" ({N} chars)
2. ...

Secondary keywords (GSC page queries + WebSearch related [+ Ahrefs related-terms if available]):
- {keyword} ({source}; {volume/mo if known})
- ...

"Also talk about" terms:
- {term} — used by competitors: yes/no
- ...

Owned-page baseline (GSC, 28d):
- {query} — pos {avg}, {clicks} clicks, {impressions} impr, {ctr} CTR
- ...

Must-have subtopics (4-5/5 competitors):
1. {subtopic} — from H2 headings
2. ...

Should-have subtopics (2-3/5 competitors):
1. {subtopic}
2. ...

FAQ candidates (from WebSearch PAA + competitor FAQs):
1. {question}
2. ...
```

Pass this data to Stage 2 for comparison against the user's page.

---

## Stage 1 Exit Gate

Before leaving Stage 1, confirm you have the items needed for gap analysis — all obtainable **without Ahrefs**:

**Required (must have, no Ahrefs needed):**
- [ ] Top 10 SERP captured (WebSearch).
- [ ] Top 5 organic competitors scraped (or inference-fallback recorded with scrape quality) — **competitor H2 headings are mandatory**.
- [ ] Must-have subtopics derived (4-5/5 coverage counts from the scraped H2s) — **mandatory**.
- [ ] Should-have subtopics derived (2-3/5 coverage).
- [ ] FAQ candidates compiled (competitor FAQs + WebSearch PAA).
- [ ] Secondary keywords compiled (GSC page queries + WebSearch related).
- [ ] Owned-page baseline pulled (GSC) — or explicitly noted "GSC unavailable / no rows."
- [ ] Search intent determined (Ahrefs `intents` if connected, else inferred from SERP composition).

**Optional (nice to have, do NOT block on):**
- [ ] Volume / KD / CPC (Ahrefs) — if absent, marked "unavailable," forecast precision reduced.

If a **required** item is missing because every competitor scrape was blocked AND no inference was possible, say so and proceed on reduced confidence — but never block the gate on Ahrefs metrics.

---

## Metric Basket (for memory layer)

Collect the metric basket on EVERY cycle (first run and review). It becomes the baseline stored in the log at Stage 5. The basket is **GSC-anchored**, with optional paid enrichment (DataForSEO default, Ahrefs escalation) only on a paid run.

**Steps:**
1. **GSC (primary, always):** `mcp__gsc__get_search_analytics` filtered to the target page, `dimensions: ["query"]`, trailing 28 days. Take the top ~20 queries by impressions (or clicks). Record per query: clicks, impressions, CTR, avg position.
2. **Paid enrichment (only on a paid run — DataForSEO default, Ahrefs escalation):** DataForSEO ranked-keywords-for-URL (exact `mcp__dataforseo__*` tool via `ToolSearch`) adds volume/KD/CPC per keyword cheaply; escalate to Ahrefs `mcp__ahrefs__site-explorer-organic-keywords` (top 20 by traffic) only for authority/backlink depth DataForSEO didn't give. **Union, not replace** — each source catches different queries. On a free run the basket is GSC-only and the volume/KD columns are simply omitted.
3. The basket is recomputed every cycle — queries can leave/enter. The log preserves historical baskets so cross-cycle patterns stay legible.
