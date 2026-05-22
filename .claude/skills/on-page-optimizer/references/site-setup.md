# Site Setup Reference

Run these checks in order before any optimization. They establish the project context that every later stage depends on. This skill targets **ASVAB Hero — a Next.js 15 static-export site**; for how page edits actually work, the keystone is `references/next-patterns.md` (read it before editing any page). This doc establishes context; it does not restate page mechanics.

---

## Verify Next.js Static Export

Confirm this is the right kind of project before going further:

1. **Find the Next config:** look for `next.config.*` (`next.config.ts` / `next.config.mjs` / `next.config.js`) at the project root and confirm it sets `output: "export"`. ASVAB Hero's `next.config.ts` does (`const nextConfig: NextConfig = { output: "export" };`). This is a static export — no SSR, no runtime.
2. **Find the App Router surface:** confirm an `src/app/` directory exists. Ranking pages are `src/app/{slug}/page.tsx` (App Router, file-based). There is **no** `astro.config.mjs`, no content collection, no Zod schema, no frontmatter for ranking pages.

If neither is found:

> "This doesn't look like the ASVAB Hero Next.js project. Run `/on-page-optimizer` from the project root (the folder with `next.config.ts` and `src/app/`)."

Do not look for `astro.config.mjs` — that framework assumption is gone. See `references/next-patterns.md` (top section + §1) for the full Next.js model.

---

## Extract Site URL

The site is **asvabhero.com**. Don't ask the user if it's discoverable — it is. Resolve it in this order:

1. **`src/app/layout.tsx`** — read `metadata.metadataBase` (`new URL("https://asvabhero.com")`) and/or the canonical pattern. This is the authoritative rendered base.
2. **`scripts/generate-sitemap.mjs`** — the hardcoded `baseUrl` const (`"https://asvabhero.com"`).
3. **`CLAUDE.md`** — states the domain `asvabhero.com` (Cloudflare DNS → CF Pages).

Store the resolved `site_url` (`https://asvabhero.com`) for GSC lookups and the memory layer. Only ask the user if all three sources are somehow absent — they won't be.

---

## Detect Target Country

Default is **`us`** — no detection heuristics needed:

- ASVAB Hero serves a **US military enlistment audience**. There is no i18n, no locale config, no non-US TLD.
- Set `country = "us"` for the session and use it for all data-source calls (GSC, optional Ahrefs).
- Drop the old city/locale detection logic entirely — it does not apply to this site.

---

## Detect Site Architecture

Before going further, understand how a ranking page is structured so you don't make assumptions that break the build. **Read `references/next-patterns.md` now** — it is the single source of truth for:

- URL → file mapping (`src/app/{slug}/page.tsx`) — §1
- The rendered-title template + double-suffix bug — §2
- Metadata shape (`export const metadata`, canonical) — §3
- Body content as `prose-asvab` JSX (never markdown) — §4
- JSON-LD via `<JsonLd>`, schema type by page type — §5
- FAQ sync policy (duplicated vs shared-array patterns) — §6
- Component preservation (`VerifiedBlock`, `EmailCapture`, etc.) — §7
- Internal links (`next/link`) — §8
- Build / verify against emitted `out/{slug}.html` — §9

Do not duplicate that mechanics here. This step exists so that by the time you reach Stage 1+ you already know the editable surface is **TypeScript/JSX**, not markdown, and that two `generateMetadata` pages (study guides, flashcards) are **out of scope** (§11).

---

## Data-Layer Check (the source ladder)

There is **no single non-negotiable provider.** The default every-run sources are **GSC + WebSearch + WebFetch** (all free). Two **paid** enrichment sources sit on top, used **deliberately — NOT automatically on every run**: **DataForSEO** is the default paid source (cheap, ~$0.05–0.11/call) for keyword metrics and SERP/related data; **Ahrefs** is the premium escalation (credit-based) for authority/backlink depth and DR/traffic-weighted SERP. Probe availability cheaply but **do not hard-fail** on any source — the skill MUST run end-to-end on the free sources alone.

### The ladder

| Source | Tools | Role |
|--------|-------|------|
| **GSC** | `mcp__gsc__*` | **PRIMARY** for the owned page's real queries/clicks/impressions/position and review-cycle baselines. The truth about how *your* page actually performs. Also provides **URL inspection** (`inspect_url_enhanced` / `check_indexing_issues`) for indexing/coverage status — the skill auto-runs this when impressions are ~0 (see `serp-analysis.md` Step 4). |
| **WebSearch** | `WebSearch` | **PRIMARY** for live SERP / top-results discovery for the target keyword. |
| **WebFetch** (+ any cf-scraper) | `WebFetch` | **PRIMARY** for competitor content extraction (H2s, word count, FAQ structure). |
| **DataForSEO** | `mcp__dataforseo__*` | **DEFAULT PAID enrichment (on-demand, not every run)** — cheap (~$0.05–0.11/call). First choice when paid metrics are wanted: search volume / KD / CPC, related & "also-rank-for" keywords, SERP-with-domain-metrics, SERP competitors (DataForSEO Labs + SERP + Keywords Data modules). |
| **Ahrefs** | `mcp__ahrefs__*` | **PREMIUM escalation (on-demand, not every run)** — credit-based, pricier. Reserve for what only it does best: **backlink/authority** data, DR/traffic-weighted SERP, richest related-terms. Reach for it on high-value pages, authority/backlink questions (e.g. the "indexed but buried" case), or when DataForSEO can't answer. |

**Don't double-pay:** GSC + WebSearch + WebFetch cover most runs. When paid data is warranted, use **DataForSEO first**; only escalate to **Ahrefs** for authority/backlink depth or what DataForSEO can't answer — never call both for the same metric. Checking availability (do the `mcp__dataforseo__*` / `mcp__ahrefs__*` tools exist?) is free; calling them is not — neither fires automatically every run.

### Probe GSC (primary baseline source)

1. Call `mcp__gsc__list_properties` to confirm the connection and that a property for `asvabhero.com` (or `sc-domain:asvabhero.com`) exists. Record the exact property identifier for the session.
2. Do a small `mcp__gsc__get_search_analytics` call (e.g. site-level, last 28 days, `dimensions: ["query"]`, small `row_limit`) to confirm data flows.

If GSC is unavailable:

> "GSC isn't connected, so I can't read this page's real queries/clicks/impressions or build a precise review baseline. I'll still run SERP discovery (WebSearch) and competitor scraping (WebFetch); rankings tracking over time will be coarser until GSC is connected."

Proceed without it — GSC strengthens the memory loop but is not a hard gate.

### Confirm WebSearch + WebFetch (primary discovery + scraping)

These are the live-SERP and competitor-content engines and should always be present in this harness. No setup prompt — they're how Stage 1 works without Ahrefs. (`WebSearch` may be a deferred tool; load it via `ToolSearch` before first use if needed.)

### Paid-source availability (DataForSEO + Ahrefs — on demand, not every run)

Checking availability is FREE: if the `mcp__dataforseo__*` / `mcp__ahrefs__*` tools exist, that source is connected. Do NOT fire a paid API call just to probe, and do NOT call either automatically on every run — their calls cost money.

- **DataForSEO connected** → your **default** when a run needs paid metrics (volume/KD/CPC, related/also-rank-for keywords, SERP-with-metrics, SERP competitors). See `serp-analysis.md` Steps 1-3. Cheap (~$0.05–0.11/call), but still on-demand — skip it on routine reviews/quick checks the free sources already answer.
- **Ahrefs connected** → the **escalation** tier: use deliberately for authority/backlink depth, DR/traffic-weighted SERP, or what DataForSEO can't answer (e.g. diagnosing an "indexed but buried" page). Don't duplicate metrics DataForSEO already supplied this run.
- **Neither connected / not warranted** → continue on GSC + WebSearch + WebFetch:

> "No paid SEO source is being used this run, so I'll skip exact volume/KD/CPC and estimate intent from the SERP. Live SERP (WebSearch), competitor scraping (WebFetch), and GSC baselines + indexing still run."

Never block the session on a paid source.

---

## Page Eligibility Guard

Before optimizing, confirm the target is an **indexable ranking page** — not a study guide, flashcard, app, account, or gated route.

1. **Whitelist check:** the target slug MUST appear in the `pages` array of `scripts/generate-sitemap.mjs`. That array (~74 entries) is the indexable-page whitelist. See `references/next-patterns.md` §10 (sitemap = source of truth) and §11 (eligibility / what to skip).
2. **File check:** confirm `src/app/{slug}/page.tsx` exists (§1).
3. **Out of scope → refuse and redirect.** If the target is a study guide (`content/study-guides/**` rendered by `study/[subtest]/[topicSlug]`), flashcards (`flashcards/[deckSlug]`), an app/account/auth/practice runtime surface, or any gated route, do not optimize it. See §11 for the full out-of-scope list. Respond:

> "`{target}` isn't an organic ranking page — it's {a study guide / flashcards / an app surface}, which serves the Pro funnel inside the practice platform, not search. On-page SEO doesn't apply here. Study guides are authored as markdown by the `asvab-post-writer` skill; point me at a page in the sitemap whitelist (e.g. `/army-asvab-score`, `/army-asvab-calculator`) instead."

Do NOT check for `draft`/`paused`/`status` frontmatter — ranking pages have no frontmatter in this codebase. Eligibility is determined by the sitemap whitelist, not a publish flag.

---

**At this point Stage 0 ends.** You have: the Next.js static-export config confirmed (`output: "export"` + `src/app/`), `site_url = https://asvabhero.com`, `country = us`, the data-source ladder probed (GSC + WebSearch + WebFetch primary; Ahrefs optional/maybe-absent), and the target confirmed eligible (in the sitemap whitelist, `page.tsx` exists). You do NOT yet have a resolved target keyword or a memory context — both are handled in Stage 0.5.
