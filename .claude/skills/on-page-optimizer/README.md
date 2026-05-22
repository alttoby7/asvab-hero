# On-Page Optimizer (ASVAB Hero / Next.js)

Adaptive on-page SEO optimizer retargeted for the **ASVAB Hero** codebase (Next.js 15 static export). It analyzes SERP competitors, finds content gaps, applies approved optimizations directly to `src/app/{slug}/page.tsx`, and keeps a per-URL optimization log so future cycles can learn from past changes.

> **v2.0.0** — retargeted from Astro to Next.js. The framework mechanics (page anatomy, metadata, JSON-LD, FAQ sync, build/verify) are specific to this repo; the SEO methodology (SERP/gap analysis, copy vocabulary, memory loop) is unchanged. The keystone contract is `references/next-patterns.md`.

## Quick Start

Trigger the skill with a page slug/path and a target keyword:

```text
optimize this page for army asvab score
```

```text
/on-page-optimizer army-asvab-score army asvab score
```

To review a previous optimization cycle:

```text
/on-page-optimizer review army-asvab-score
```

To review every tracked page:

```text
/on-page-optimizer review-all
```

## Scope

- **In scope:** indexable ranking pages listed in `scripts/generate-sitemap.mjs` (~74) — articles, score hubs, calculators, the practice-test landing page.
- **Out of scope:** study guides (`content/study-guides/**`, Pro funnel, not indexed), flashcards, and app/account/auth/practice surfaces. New pages and slug changes are out of scope too — those belong to the `asvab-post-writer` skill.

## What It Does

- Confirms the target is an in-scope Next.js ranking page and identifies its type (article / score hub / calculator / interactive).
- Pulls the owned page's real performance + indexing from **Google Search Console**, discovers the live SERP via **WebSearch**, and scrapes competitor structure via **WebFetch**. Paid keyword/SERP metrics come from two on-demand tiers: **DataForSEO** (default, cheap) then **Ahrefs** (premium escalation) — neither runs every run.
- Compares headings, subtopics, FAQs, internal links, and word count against the top competitors.
- Presents the content gaps with competitor coverage counts and a business-risk note **before** editing, and waits for explicit approval.
- Applies approved edits to the `metadata` object, JSX body (`prose-asvab`), JSON-LD (Article/WebApplication/Quiz + FAQPage), internal `<Link>`s, and FAQs — keeping the visible FAQ and schema in sync.
- Runs `npm run build`, verifies the change in the emitted `out/{slug}.html`, and records the hypothesis, changes, baseline metrics, and outcome in a per-URL memory log under `docs/seo-notes/`.

## Included Files

- `SKILL.md` — skill definition and stage pipeline.
- `references/next-patterns.md` — **keystone contract**: ASVAB Hero page anatomy, rendered-title rule, metadata, JSON-LD variants, FAQ sync policy, component preservation, build/verify, scope.
- `references/` — stage docs for site setup, SERP analysis, on-page checks, content optimization, memory logging, and copy vocabulary.

## Dependencies

No bundled Python or Node runtime dependencies. The skill uses the agent environment's tools:

- **Google Search Console** (`mcp__gsc__*`) — primary, free: rankings/clicks/impressions, URL indexing.
- **WebSearch / WebFetch** — primary, free: live SERP discovery and competitor/page scraping.
- **DataForSEO** (`mcp__dataforseo__*`) — **default paid enrichment, on-demand** (~$0.05–0.11/call): volume/KD/CPC, related keywords, SERP-with-metrics, SERP competitors.
- **Ahrefs** (`mcp__ahrefs__*`) — **premium escalation, on-demand**: backlink/authority data, DR/traffic-weighted SERP. Used only when DataForSEO can't answer (e.g. authority gap on a buried page).
- The skill runs end-to-end on the free sources alone; paid sources never fire automatically every run.
- **npm** — `npm run build` for static-export build verification.

## Tips

- Run from the repo root (`/home/trisha/dev/asvab-hero`).
- Give both the slug and the target keyword on first-cycle runs when possible.
- Expect an approval gate before edits. If the skill edits without approval, something is wrong.
- ASVAB score thresholds, line-score cutoffs, retake rules, and bonuses are volatile — require official/current sources before publishing new copy about them.
- Title tags and meta descriptions are not the whole job. The ranking lift usually comes from missing subtopics, better answer structure, and internal-link decisions.

## Troubleshooting

| Problem | Fix |
|---|---|
| Skill cannot find the page | Provide the slug (e.g. `army-asvab-score`) or the path `src/app/{slug}/page.tsx`. |
| Skill cannot infer the keyword | Provide the target keyword explicitly, or let it use the page's top GSC query. |
| GSC data unavailable | Confirm the GSC MCP connection; the skill still runs on WebSearch + scraping with reduced precision. |
| Build verification fails | Fix the TSX/build issue first (see the build-breakage guard in `references/content-optimization.md`), then rerun. |
| `public/sitemap.xml` shows a diff | Expected — the build restamps `<lastmod>` dates every run. Not a real change; don't revert it. |
| Review mode has no history | Run a first optimization cycle so the memory log exists. |

---
Originally packaged by Authority Hacker; retargeted to Next.js / ASVAB Hero (v2.0.0).
