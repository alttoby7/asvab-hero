# CONTINUITY — Interactive Study-Guide Diagrams ("Beat Khan") — 2026-06-03 (updated 2026-06-04)

## TL;DR / where to pick up
We built an interactive concept-diagram system for ASVAB Hero study guides and executed a Codex-refined "beat Khan Academy" plan. **11 interactive diagrams + 14 new static diagrams live**, **32 of 47 guides now carry a diagram**, the post-quiz funnel is **free-first with attribution**, and central a11y is done. **Everything is now MERGED TO MAIN AND DEPLOYED LIVE.**
**NEXT (Codex's #1 remaining): close the measurement loop** — make the destination pages read the `origin_*` query params and forward them into their own events. Details below.

---

## ⭐ 2026-06-04 UPDATE — merged to main + breadth rollout (DONE, LIVE)

**Deploy mechanism (important):** asvabhero.com deploys via **CLOUDFLARE PAGES from `main`** — NOT Vercel. The `.vercel/` dir in the repo is **stale leftover, ignore it**. Watch a deploy with:
`gh api repos/alttoby7/asvab-hero/commits/<sha>/check-runs --jq '.check_runs[] | select(.name=="Cloudflare Pages") | "\(.status)/\(.conclusion)"'` — build takes ~3 min, then live.

**Merged to main twice (2026-06-04):**
- `5a8dc0e` = merge of the whole interactive set (the 11 diagrams + formatting fix + funnel + a11y) onto main. This is what fixed "study guides show the old version" — the work had only ever been on the branch; the site deploys from main.
- `45d8eab` = merge of the breadth rollout below.
- main HEAD had two content-identical duplicate commits of the internal-linking/counselor work (`66bf247`/`a92d545`) vs the branch's `453233f`/`80979e5` → merged with **no conflicts** (git recognized identical additions).

**Breadth rollout (32 of 47 guides now have a diagram, was 9):**
- **+9 by REUSE (frontmatter only, no new code):** AR rate-distance-time + work-rate → generic `ohms-law-triangle` as D=R×T / Output=Rate×Time (it's fully generic: `top = bottomLeft × bottomRight` with custom `top/bottomLeft/bottomRight/units` labels); AR ratio-proportion + percent → `fraction-bar`; AR averages + MK inequalities + MK number-properties → `number-line`; MC motion-projectile + GS physics-mechanics → `force-diagram`.
- **+14 NEW static SVG diagrams** added to `diagrams/index.tsx` (hook-free server components, same `DiagramCard`/`Caption`/`Arrow` pattern as the existing static set; plus an `IsoCube` helper): `states-of-matter`, `cell-diagram`, `earth-layers`, `conductor-insulator`, `area-model` ((a+b)²), `linear-graph` (slope-intercept), `paper-folding-net`, `cube-stack`, `orthographic-views`, `pattern-assembly`, `hand-tools`, `four-stroke`, `disc-brake`, `shop-safety`. Wired into GS physical/life/earth-space, EI conductors-insulators, MK exponents-polynomials + algebra-linear, AO ×4 (3d-visualization/paper-folding-nets/pattern-assembly/spatial-counting), AS ×4 (hand-tools/vehicle-systems/maintenance-repair/shop-safety).
- These 14 are **static labeled diagrams (no Explore/Quiz)** — the right call for identification/spatial/concept topics. The two math ones (`area-model`, `linear-graph`) are the obvious candidates to upgrade to interactive predict→check later.
- **Remaining 15 with NO diagram (intentional):** all WK (6) + all PC (6) verbal topics + `ar/arithmetic-fundamentals` + `mk/order-of-operations` (no clean diagram fit).

**Anchor validation (do this whenever wiring diagrams):** a bad `after:` value fails **SILENTLY** (diagram just doesn't render, no build error). Validate with a node script that mirrors `StudyGuideArticle.normalizeHeading` and checks each frontmatter `after:` against the file's `## ` headings + each `type` against REGISTRY. Pattern saved at `/tmp/verify-diagrams.mjs` this session — all 39 placements resolved OK.

**Commits this session:** branch `8854982` (pending continuity/seo-notes/HomePopularLinks housekeeping) → `7d7597e` (the 23-guide rollout). Both pushed; merged to main as `45d8eab`. `npm run build` green on branch AND merged main; 5 sample pages verified rendering live in-browser.

**Shared-repo note (historical):** branch had 3 committers (me, a Phase-3 subagent, a concurrent internal-linking worker). All scoped-add. Now merged; the concurrency caveat below is resolved.

---

## What exists now

### Original problem (fixed)
Study guides rendered **unstyled** because `@tailwindcss/typography` was never installed → `prose` classes were no-ops (both free `/study/…` and logged-in `/app/study/…`, which share `StudyGuideArticle`). Fixed: `npm i -D @tailwindcss/typography` + `@plugin "@tailwindcss/typography";` in `src/app/globals.css`.

### Architecture
- **Components:** `src/components/study-guide/diagrams/` — one client island (`"use client"`) per diagram + shared `_kit.tsx` (`InteractiveCard`, `ModeToggle`, `NumField`, `CheckButton`, `QuizFooter`, `NextButton`, `useScore`, helpers `rnd/numOf/fmt`, types `Mode`/`DiagramContext`).
- **Registry + dispatcher:** `diagrams/index.tsx` — `REGISTRY` maps `type` → component; `Diagram` injects `context:{topicId, subtest, diagramType}` into every component. Static (non-interactive) variants kept as `*-static`.
- **Placement:** markdown frontmatter `diagrams: [{type, after, props}]`; `StudyGuideArticle.tsx` splits rendered HTML at `<h2>` and injects matched diagrams beneath the heading inside ONE `prose` wrapper. `normalizeHeading` strips tags + HTML entities (marked escapes `'`→`&#39;`) + apostrophes so `after:` matching is punctuation-insensitive. Single diagrams sized `max-w-sm`.
- Each interactive diagram: **Explore** mode (live-computing inputs) + **Quiz** mode (predict→check; problems generated only on user action → no hydration mismatch; clean-integer answers by construction). On Check: `record(correct)` then `setChecked(true)`; reveal uses shared `QuizFooter`.

### The 11 interactive diagrams (type → guide)
- `ohms-law-triangle` (+power) → ei/ohms-law-power
- `circuit-interactive` (series/parallel toggle, live R+I) → ei/circuit-types
- `gear-ratio` → mc/gears-wheels
- `lever` (4-var) → mc/levers-pulleys
- `pulley-system` → mc/levers-pulleys
- `inclined-plane`, `hydraulics` → mc/inclined-plane-hydraulics
- `right-triangle` (Pythagorean) → mk/geometry
- `number-line`, `fraction-bar` → mk/fractions-decimals
- `buzzword-map` (AR keyword→operation) → ar/word-problems

### Funnel (Phase 2 → Phase 2-deeper, DONE)
`QuizFooter` is **free-first** (per Codex): leads with **"Keep practicing"** (free targeted rep = the diagram's own quiz) + **"Take the free diagnostic →"** (`/practice-test?variant=diagnostic`), DEMOTES Pro to a small "Or unlock unlimited {subtest} drills with Pro" link. Gate depth/repetition, never the first rep.
**Attribution:** per-rep `origin_session` (crypto.randomUUID, client-only) carried into every destination URL (`origin=diagram&origin_topic=…&origin_session=…`) and into events `diagram_quiz_answered` + `diagram_next_step` (with `diagram_type`, `step`). Events defined in `src/lib/analytics.ts` FunnelEvents.
**A11y:** `aria-pressed` toggle, `aria-live` verdict, focus-to-verdict after Check.

---

## Commits (branch study-guide-diagrams, all pushed)
`5c6fccb` formatting fix + diagram system · `6ea187c` interactive Ohm's · `d8064bb` quiz-loop template · `d71b39b` gear+triangle · `7357d02` lever+number-line+fraction-bar · `6933ef1` Phase 2 funnel footer · `1753cee` circuit · `8d0a0a5`/`93bf2e6`/`8b65b33`/`54160f0` pulley/inclined/hydraulics/buzzword (subagent) · `0338cd3` inclined-plane label polish · `fae8bb0` free-first footer + attribution · `3b19131` a11y focus.

---

## Codex plan (gpt-5.4, high reasoning) — remaining priorities
Sequence: **B (free bridge ✅) → A-min + E (a11y ✅ / attribution started) → D-selective → C-last.**

1. **Close the measurement loop (DO NEXT).** We EMIT origin in URLs but destinations don't READ it. Make `/practice-test` (`PracticeTestClient.tsx`) + signup + paywall capture `origin_*` query params (into sessionStorage on landing) and include them in their existing events (`paywall_shown`, `signup_complete`, `checkout_*`). Without this the diagram→conversion attribution is open-loop.
2. **Bundle/perf.** All 11 diagrams import statically through `diagrams/index.tsx` → any guide page with one diagram over-ships JS. Lazy-hydrate/code-split per type (`next/dynamic`, ssr:true). Serves the `p75 INP < 200ms` gate. Verify with `npm run build` chunk sizes.
3. **1–2 deeper "out-Khan" interactions (only after funnel converts):** drag-to-place number line (quiz), animate buzzword→operation on a real word-problem sentence.
4. **Breadth — DONE 2026-06-04** (see top update). Codex sequenced this LAST (after the funnel converts), but owner asked for full coverage now, so it's shipped ahead of the measurement-loop work: 32/47 guides, +14 new static diagrams incl. GS science + AR/MK + AO/AS. WK/PC still skipped as Codex advised. The deeper-interaction + measurement-loop priorities (#1–#3) remain the higher-leverage next steps.

**Gate before deeper work:** taster-start ≥35% of quiz-completes · taster-complete ≥60% · anon-lead ≥8% · diagram-origin paywall-hit-rate down ≥50% vs baseline. **Gate before D:** diagram-origin 7-day signup ≥5%, paid ≥1% (or +50%), p75 INP <200ms, no critical axe violations, no GSC index/CTR drop.

Codex hard pushback: don't do breadth first, don't do a full polish pass, don't do broad adaptive difficulty now, don't formal-A/B at current traffic (staggered rollout + instrumentation instead). SEO is fine — islands inject into static prose; don't try to remove them.

---

## Verify / run notes
- **tsc:** `cd ~/dev/asvab-hero && npx tsc --noEmit` (primary gate; passes).
- **Build:** static export (`output: export`) → `npm run build` writes `out/`. `next start` does NOT work (export); serve with `npx serve out` (it ignores `-l`, picks a random port; clean URLs may 404 — append `.html`).
- **Visual:** dev server `PORT=31xx npm run dev` works but the **concurrent worker intermittently clobbers the shared `.next`** (ENOENT `*build-manifest*` → 500s). Restart + `rm -rf .next` if it dies. Leftover processes from this session may linger on ports 3007/3009/3011 + an `npx serve` — kill when convenient (don't `pkill -f "next"`, it matches your own shell).
- **Diagnostic CTA** routes to `/practice-test?variant=diagnostic` — confirmed free/anon (public study-guide page already linked it).

## Memory
See `~/.claude/.../memory/project-asvabhero-study-guide-diagrams-2026-06.md`.
