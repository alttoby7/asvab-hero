# Continuity — Conversion + GEO + Air Force (2026-05-24)

Pick-up doc for a fresh chat. Everything below is **merged to `main` and LIVE in production** unless marked OPEN. Repo: `/home/trisha/dev/asvab-hero`. Memory: `project-asvab-freevalue-geo-2026-05.md`, `feedback-asvabhero-faceless-persona.md`, `reference-github-token.md`.

## What shipped this session (all live)
- **PR #1 — Free-tier soft-gate + GEO.** Anon diagnostic now shows only the top-line score; weak-topic map / per-question review / plan gated behind a free account via `DiagnosticResultsBridge`. `syncLocalHistoryToRemote()` + an `AppLayout` gate migrate the anon diagnostic (localStorage) into the new account on first authed load (so "Save my score" is real). Pricing copy leads with saved-state; removed the competing PDF magnet from `/practice-test`. GEO: `robots.txt` AI-crawler allows, `public/llms.txt`, `scripts/indexnow-ping.mjs` (`npm run indexnow`), homepage Organization+WebApplication schema.
- **PR #2 — Editorial persona "Jordan Avery".** Faceless brand; `src/lib/author.ts` (canonical Person, `@id` …/team/jordan-avery#editor), `/team/jordan-avery` ProfilePage, all 57 Article `author`s point to it, `ArticleByline` on flagship pages. **No fabricated credentials** (owner won't attach her real name — see feedback memory).
- **PR #3/#4 — `/calculator` job catalog.** Server/client-rendered full list of all 567 jobs + AFQT/line-score requirements in the static HTML (crawlable), expanded by default, with a branch jump-nav.
- **PR #5 — Anonymous job-interest tracking.** `catalog_job_open` (job_branch, job_code, job_title, job_category) + `catalog_branch_jump`. GA4 event-scoped custom dims **Job Code** + **Job Branch** registered on prop **404444165**.
- **PR #6 — Air Force traffic expansion.** New: `/air-force-jobs`, `/air-force-mage-score`, spokes (`/air-force-security-forces-asvab-score`, `/air-force-loadmaster-asvab-score`, `/air-force-pararescue-asvab-score`, `/air-force-pilot-asvab-requirements`). Improved `/air-force-ranks` (static tables on top, **fixed stale "no warrant officers"** → AF restarted 2024), `/air-force-afqt-calculator` (min AFQT 36 per DAFMAN 36-2032), `/air-force-asvab-score`. **Corrected MAGE formulas sitewide**: `M=AR+2·VE+MC+AS, A=VE+MK, G=VE+AR, E=AR+MK+EI+GS` (VE = optimally weighted WK/PC).

## Key facts / access
- GA4 live property: **404444165** (404444162 is dead). GSC property: **`sc-domain:asvabhero.com`**.
- GitHub: one fine-grained PAT shared by `gh` + github MCP; PR perms now work (was the recurring 403). Expires ~2026-06-10.
- Deploy = push to `main` → Cloudflare Pages auto-build (~1-5 min). Ship via branch → PR (mcp__github__create_pull_request) → squash-merge → ff local main → delete branch.
- **Pre-existing user WIP in the tree — DO NOT sweep into commits:** `docs/seo-notes/`, `src/lib/calculator-links.ts`. (Earlier official-scores/test-date work is already merged to main.)

## OPEN — pick up here
1. **Off-site persona profiles** for Jordan Avery (Gravatar, Muck Rack, Medium/Substack, About.me, Quora; email jordan@asvabhero.com). When claimed, add URLs to `AUTHOR_SAME_AS` in `src/lib/author.ts`. Honesty guardrail: brand-editor framing, no fake third-party endorsements.
2. **IndexNow key + Bing Webmaster.** Generate key → `ASVAB_INDEXNOW_KEY` in central `.env` + commit `public/<key>.txt` → run `npm run indexnow`.
3. **Measure (in ~24-48h then ~weeks):** GA4 top-opened jobs by **Job Code** (`catalog_job_open`); GSC recheck whether AF pages climb from pos 40-90.
4. **MAGE library bug (still open in code):** `calculateAirForceComposites()` in `src/lib/score-calculator.ts` returns raw sums, not percentiles → AF job-match over-qualifies. Only honest "estimate/verify with recruiter" COPY applied this session; logic unchanged (exact applicant percentiles aren't reliably derivable from rounded score reports). Options if revisited: source PAY97 percentile tables (approximate) or drop AF qualify verdicts.

## STRATEGY NOTE (last discussion — important for prioritization)
Job/ranks searchers are **lower commercial intent** (informational/career-browsing); the **highest-intent** traffic is score-improvement: "asvab practice test," "how to raise my AFQT," retake, and the **calculator user who just got a disappointing score**. The AF/job content is **top-of-funnel + GEO authority + the gap→study funnel**, NOT direct revenue — judge it that way; the new tracking will prove/disprove conversion.
**Recommended next effort:** the high-intent funnel — "how to raise my AFQT" / retake content + tighten the **calculator's disappointed-scorer → free-plan** path. (Owner was asked if they want this next; not yet started.)

## Plans referenced
- `~/.claude/plans/do-we-give-enough-immutable-jellyfish.md` (the approved free-value + GEO plan)
- Codex AF build plan output was in `/tmp/codex-af-out.json` (ephemeral; key specs are in PR #6).
