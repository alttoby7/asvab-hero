# Continuity — Internal-linking buildout (2026-06-03)

## Shipped + LIVE on main: commit `66bf247` (deployed via Cloudflare)
SEO internal-linking pass, driven by GSC (28d): high-impression pages stuck at
position 40-64 with footer-only links, and the 47 study guides reachable only via
one weak hub (`/asvab-study-guide`'s server-rendered `TopicsIndex`, which DOES link
them all, so they were low-authority/single-path, NOT orphaned). No free/paid change:
every surfaced page was already public; the Pro-gated MiniDrill/question bank is
untouched. 36 files, 1035 insertions.

What landed:
- `src/components/Breadcrumb.tsx` (NEW): reusable trail + BreadcrumbList JSON-LD.
  None existed sitewide before.
- `src/components/RelatedLinks.tsx` (NEW): generic contextual related-pages block.
  Self-contained, NO dependency on the owner's untracked `src/lib/calculator-links.ts`.
- 27 article pages clustered (RelatedLinks + breadcrumbs), inbound links aimed at the
  GSC winners: army-ranks (2751 impr @ 50), navy-ranks, air-force-ranks,
  asvab-scores-explained (1242 @ 44), asvab-score-requirements (639 @ 58), branch
  score/calc pages. Clusters: RANKS, SCORES/AFQT, RETAKE, per-branch (Army/Navy/AF/
  Marines/CG). Removed 3 hand-rolled BreadcrumbList JSON-LD (air-force-ranks/-asvab-score/
  -jobs) now served by the component. Existing RelatedCalculators kept. Used canonical
  routes, not the `_redirects` aliases (/asvab-score-for-marines, /asvab-gt-score are 301s).
- `src/components/CalculatorExplore.tsx` (NEW) on /calculator: server-rendered jobs/ranks-
  by-branch + guides-by-subtest links + honest Pro nudge. Fixes the calculator passing
  ZERO crawlable outbound equity (JobResults + guide surfacing were client-only). + breadcrumb.
- `src/app/study/[subtest]/page.tsx` (NEW, 9 pages): intermediate subtest hub layer listing
  each subtest's guides; gives guides a 2nd crawl path. Metadata + canonical + breadcrumb.
- Tips articles (EI/MC/WK) bridged to their matching guides; guide leaf template
  (`study/[subtest]/[topicSlug]/page.tsx`) got a 4-level breadcrumb + up-links to subtest
  index and hub.

Verified: em-dash guard clean on main, `npm run build` clean (all 9 subtest indexes +
47 guides generate), tsc clean per-agent.

## ⚠️ Branch/git gotcha (important for reconciliation)
The working tree was on the owner's `study-guide-diagrams` branch (active diagrams WIP:
`diagrams/index.tsx`, new `OhmsLawTriangleInteractive.tsx`, `counselor-resources`) when this
work was committed, so it first landed as `453233f` ON THAT BRANCH (not main, did not deploy).
Resolved by cherry-picking onto main in a throwaway worktree -> `66bf247`, pushed. The owner's
branch + uncommitted diagrams work were left untouched.
CONSEQUENCE: `453233f` (study-guide-diagrams) and `66bf247` (main) carry the SAME 36-file change.
When study-guide-diagrams later merges to main, git should auto-reconcile (identical content),
but the commit may appear twice. Optional cleanup: drop `453233f` from the branch before merge,
but the owner has uncommitted work on top, so leaving it is safe.
Note: the em-dash guard failure seen mid-session was entirely the owner's `diagrams/index.tsx`
(em-dashes in code comments), NOT this work. The owner should fix those before their diagrams
branch ships (guard will block it).

## Overlap to review
Main already had the owner's `c6e3e23` "SEO: calculator internal-link graph + counselor-resources".
This work built on top of it (no file conflict) but may overlap conceptually on the calculator
page. Worth an eyeball.

## Open follow-ups
- Homepage "Popular guides/references" link block: DEFERRED (homepage is design-sensitive;
  not touched unprompted). Best next internal-linking lever since the homepage holds nearly all
  site authority (360 of ~380 GSC clicks).
- Watch GSC over 2-4 weeks for the high-impression cluster pages (army/navy/air-force-ranks,
  scores-explained, score-requirements) to move up from pos 40-64 as the new contextual links
  + breadcrumbs get crawled. Submit/refresh sitemap if needed (the 9 new /study/[subtest] URLs).
- Deploy = push main -> CF. Guard `node scripts/check-no-emdash.mjs`.
