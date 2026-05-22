# Revenue Framing Reference

Every finding and recommendation should be framed in terms of traffic and revenue impact. Business owners don't care about "keyword density" — they care about money.

---

## Position-Based CTR Benchmarks

These are average organic click-through rates by SERP position (2024-2025 data, rounded for clarity):

| Position | Desktop CTR | Mobile CTR | Blended CTR |
|----------|-------------|------------|-------------|
| 1 | 31% | 27% | 29% |
| 2 | 16% | 15% | 15.5% |
| 3 | 11% | 10% | 10.5% |
| 4 | 7.5% | 6.5% | 7% |
| 5 | 5% | 4.5% | 4.8% |
| 6 | 3.5% | 3% | 3.3% |
| 7 | 2.5% | 2.2% | 2.3% |
| 8 | 2% | 1.8% | 1.9% |
| 9 | 1.5% | 1.4% | 1.5% |
| 10 | 1.2% | 1% | 1.1% |
| 11-20 | ~0.5% | ~0.4% | ~0.5% |
| 21-100 | ~0.1% | ~0.1% | ~0.1% |
| Not ranking | 0% | 0% | 0% |

**Notes:**
- Positions with featured snippets can get 35%+ CTR
- SERP features (PAA, knowledge panels, ads) push organic results down and reduce CTR
- These are averages — actual CTR varies by query type and competition

---

## The Revenue Formula

```
additional_monthly_visits = volume x CTR_at_target_position - volume x CTR_at_current_position
monthly_revenue_value = additional_monthly_visits x CPC
annual_revenue_value = monthly_revenue_value x 12
```

### Variables

- **volume** — Monthly search volume from Ahrefs keyword overview
- **CTR_at_target_position** — Use the CTR table above. Target = position 3 (realistic for good on-page optimization)
- **CTR_at_current_position** — Use the CTR table above. If not ranking, use 0%.
- **CPC** — Cost per click from Ahrefs. This represents what advertisers pay for this traffic, so it's a fair proxy for the traffic's value.

### Example Calculation

```
Keyword: "best home widgets"
Volume: 2,400/mo
CPC: $3.50
Current position: 12 (page 2)
Target position: 3

Current traffic: 2,400 x 0.5% = 12 visits/mo
Target traffic: 2,400 x 10.5% = 252 visits/mo
Additional visits: 252 - 12 = 240 visits/mo
Monthly value: 240 x $3.50 = $840/mo
Annual value: $840 x 12 = $10,080/yr
```

---

## When Current Position Is Unknown

If Ahrefs doesn't show the page ranking and GSC isn't available:

- **Assume position 50+** (effectively 0% CTR) for a "not currently ranking" scenario
- **Or** assume position 15-20 if the page exists and has been live for 6+ months (it's probably getting some impressions)
- **Frame it as:** "Even if your page is currently on page 3+, optimizing could bring it to the top 5, adding ~{X} monthly visits worth ~${Y}."

Always state your assumption: "I'm estimating your current position at ~20 since I couldn't pull live ranking data."

---

## Target Position: Be Realistic

Don't promise position 1. Set expectations:

- **Currently not ranking (50+):** Target position 10-15 (getting on page 1-2). "On-page optimization alone could get you on page 1."
- **Currently page 2 (11-20):** Target position 5-8. "These changes should push you to the top half of page 1."
- **Currently positions 5-10:** Target position 3-5. "Closing these content gaps could bump you into the top 3."
- **Currently positions 1-4:** Target position 1-2. "You're already competitive. These tweaks could squeeze out another 30-50% more clicks."

**Be honest about limits:** On-page optimization is powerful but it's one lever. If the top results are massive authority sites (DR 80+), say so: "On-page optimization gives you the best shot, but competing with {site} may also require backlink building."

---

## How to Present the Revenue Impact

### In the Gap Summary (Stage 3)

Frame the overall opportunity:

> **Revenue opportunity:** "{keyword}" gets {volume} searches/month. You're currently at position {X}, getting roughly {Y} visits/month. Moving to the top 3 could bring in {Z} visits/month — that's {Z-Y} additional monthly visitors worth approximately ${value}/month based on Ahrefs CPC data.
>
> To put that in perspective, that's ${annual}/year in organic traffic value — traffic you'd have to pay for with ads otherwise.

### For Individual Findings

Don't do complex math for every finding. Instead, use qualitative framing:

- **High-priority fixes:** "This is one of the changes most likely to move the needle on your rankings."
- **Medium-priority fixes:** "This won't make or break your rankings, but it's an easy win that adds up."
- **Low-priority fixes:** "Nice to have. Won't directly move rankings but improves the overall quality signal."

### For the Before/After Comparison

After showing the SERP preview:

> The optimized listing is more compelling, includes the keyword, and matches what searchers expect to see for "{keyword}". A better SERP listing doesn't just help rankings — it improves click-through rate even at the same position. At position 5, improving CTR from 4.8% to 6% adds another {X} visits/month.

---

## Framing for Context

### "Cancel Your Surfer Subscription"

When appropriate (first use, or if the user mentions paid tools):

> "Tools like Surfer SEO charge $89/month to do what we just did — analyze SERP competitors and tell you what's missing. The difference is we actually fixed it too."

### Comparing to Paid Traffic

> "Getting {X} additional visits organically each month is equivalent to spending ${Y}/month on Google Ads. Except organic traffic is free once you rank."

### Compound Effect

If the user has multiple pages to optimize:

> "If we optimize your top 10 pages like this, the cumulative impact could be {X} additional monthly visits worth ${Y}/month across all pages."

---

## Local Business / Low-Volume Keywords

CPC-based revenue framing breaks down for local service keywords (10-100 volume, £0.25-£0.50 CPC). Saying "this could add $3/month in traffic value" sounds ridiculous and undermines credibility.

**For local service businesses, frame around client acquisition instead:**

> "These are low-volume keywords, but that's normal for local services — there are only so many people searching for a dog trainer in Edinburgh each month. What matters is conversion: someone searching 'dog trainer edinburgh' is actively looking to hire. Even 5-10 monthly visitors from these terms could mean 1-2 new clients per month."

**Use this framing when:**
- Target keyword volume is under 200/month AND
- Keyword has `local: true` intent AND
- CPC-based monthly value would be under $50

**Local business revenue formula (alternative):**
```
estimated_monthly_visitors = volume x CTR_at_target_position
estimated_monthly_leads = estimated_monthly_visitors x conversion_rate (use 5-10% for local service pages)
estimated_monthly_revenue = estimated_monthly_leads x average_client_value (ask the user if unknown)
```

If you don't know the average client value, skip the math and frame qualitatively:
> "Each new client from organic search is effectively free — no ad spend, no referral fee. Over 12 months, even one extra client per month from these optimizations adds up."

**Compound effect framing for batch optimization:**
> "Individually, each keyword is modest. But optimizing all {N} service pages builds topical authority — Google sees your site as THE Edinburgh dog training resource, which lifts every page's rankings."

---

## Framing rules — say this, not that

| Situation | Say (good) | Do not say (bad) |
|---|---|---|
| Describing expected outcome | "Moving from position 12 to the top 5 could bring in roughly 240 extra visits/month — based on position-CTR benchmarks." | "This will rank you in the top 5." / "Guaranteed traffic increase." |
| Discussing a KD 80+ keyword | "`{keyword}` has a keyword difficulty of 82. On-page optimization gives you the best shot, but to actually rank you'll likely need backlink acquisition too — the top 5 all have 500+ referring domains." | Silence on difficulty, or "these changes should get you to position 1." |
| Estimating time to impact | "Google typically takes 2-8 weeks to recrawl and re-rank a page after changes like these." | "You'll see results immediately." / no timeline mentioned |
| Reporting CPC value | "That's roughly $840/month in traffic value — traffic you'd have to pay for with ads otherwise." | "That's $840/month in revenue." |
| Revenue estimate in the summary | One clear monthly-and-annual estimate tied to the target keyword's move to the target position. | Recalculating CPC × volume for every finding, or five different revenue figures for five sub-metrics. |

---

## Stage 3 Presentation Format

Use this structure when presenting findings (Stage 3). On review cycles, the verdict (from `references/memory-loop.md`) comes FIRST, then this material.

### Gap Summary

Present a clear, scannable summary — NOT a wall of text:

> **Quick Score: Your page vs Top 5**
>
> | Factor | Your Page | Top 5 Avg | Verdict |
> |--------|-----------|-----------|---------|
> | Title tag | ... | ... | Fix needed |
> | Word count | 1,200 | 2,800 | Behind |
> | Subtopics covered | 5/12 | 10/12 | Missing 7 |
> | ... | ... | ... | ... |

Include an evidence note directly under the table:

> **Evidence quality:** Target-page metrics from rendered page. Competitor content based on {N}/5 raw scrapes, {N}/5 partial/prompted scrapes, {N}/5 blocked/inferred pages. Findings based on blocked or inferred pages are marked as lower confidence.

If the target page was not rendered/inspected, say so and do not report exact duplicate-heading, word-count, or rendered-link findings. If fewer than 3 competitor pages were raw/partial scrapes, avoid precise top-5 averages and say the competitor content analysis is directional.

### Missing Subtopics

> **Missing subtopics (covered by 4+ of top 5 results):**
> 1. "How to choose the right size" — all top 5 cover this
> 2. "Price comparison table" — 4 of top 5 include this
> 3. "Common mistakes to avoid" — 4 of top 5 include this

Do not inflate weak evidence. If a subtopic comes from a blocked page title, search suggestions, or Ahrefs keyword inference rather than raw competitor content, label it:

> "Likely common, lower confidence: {subtopic} — supported by Ahrefs/search suggestions, but competitor pages blocked scraping."

Stage 3 recommendations should separate:
- **Fix now:** rendered-page issues and raw-scrape gaps with high confidence.
- **Verify first:** current product/tool claims, pricing, limits, launch dates, or claims based on non-official sources.
- **Nice to have:** low-volume keyword insertions, polish, or speculative subtopics.

Add a **Business Risk Check** before approval for meaningful edits only: title
or meta rewrites, new sections, FAQs, internal links, schema changes, or
claim-heavy copy.

| Edit | Ranking/search upside | Conversion/trust risk | Mitigation |
|---|---|---|---|

Examples of risks: weakening a strong offer, making the page sound less
credible, adding unsupported claims, distracting from the reader's decision, or
forcing links where they do not belong. Keep the table tight. This is not a CRO
audit; it is a sanity check before SEO edits go live.

### Revenue Impact

Frame the opportunity in dollars (remember Ahrefs CPC is in cents — divide by 100):

> **Estimated impact:** Moving from position {current} to top 3 for "{keyword}" could add ~{X} monthly visits worth ~${Y}/mo (based on {volume} monthly searches and ${CPC} CPC).

### Before/After SERP Preview

Show how the listing currently looks vs after optimization. Include the brand suffix if the layout appends one:

```
BEFORE:
{Current Title Tag} — {Brand Name}
{current-url}
{Current meta description or Google's auto-generated snippet}

AFTER:
{Optimized Title Tag} — {Brand Name}
{current-url}
{Optimized meta description}
```

Google may rewrite titles exceeding ~60 characters (including brand suffix). Account for this.

### Approval Gate

> "I've identified {N} optimizations across title, meta, headings, content, and internal links. Want me to apply them all, or pick specific ones?"

**APPROVAL GATE** — Wait for explicit approval before making any changes. Do NOT start editing files without permission.

### Next Steps (after Stage 5)

> "Your page is now optimized for '{keyword}'. To see the full impact:
> 1. Deploy these changes
> 2. Request indexing in Google Search Console
> 3. Check back in 2-4 weeks for ranking movement (I'll compare against the baseline I just saved)
>
> Want me to optimize another page, or `review-all` to see the portfolio?"
