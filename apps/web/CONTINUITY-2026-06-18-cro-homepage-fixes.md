# CRO Homepage Fixes — CONTINUITY (2026-06-18)

## What shipped

Ran a CRO audit on asvabhero.com homepage using AH's CRO Bot methodology (Chrome-MCP JS
diagnostics + LIFT model scoring). Score: **19/30**. Validated plan via Codex (gpt-5.4).

4 fixes merged to main (`c090fb1` via `monorepo-phase1`), CF Pages auto-deploying:

### 1. Hero signup CTA (`HomePlanCTA.tsx`)
- Auth-aware "or Start my free plan →" text link below the calculator CTA in hero
- Logged-in → `/app/plan`, anon → `/signup?next=/app/plan`
- Pattern: same `useSession()` check as `CalculatorResultBridge.tsx:76-80`
- GA4 event: `homepage_hero_signup_click` (params: `{authed}`)

### 2. Social proof bar (inline in `page.tsx`)
- Compact strip between hero and close-the-gap section
- "800+ recruits this month · 4,000+ score checks · 4,400+ practice questions"
- Uses real data from `social-proof.ts` (GA4-sourced, rounded down) + `bank-stats.ts`
- NOT duplicating the proof stack or TestimonialWall — this is a 1-line trust signal

### 3. Sticky bottom CTA bar (`StickyMobileCTA.tsx`)
- Fixed bottom bar, appears after scrolling past hero CTA (IntersectionObserver on `#hero-cta-sentinel`)
- Hidden for: Pro users, /app/*, /account/*, /embed/* routes
- Uses `HomePlanCTA variant="sticky"` (full orange button)
- z-index 90, `env(safe-area-inset-bottom)` for notched devices
- GA4 events: `homepage_sticky_cta_shown` (once) + `homepage_sticky_cta_click`

### 4. Mobile tap targets (`Nav.tsx`)
- Hamburger button: added `p-2 min-h-[44px] min-w-[44px] items-center justify-center`
- Mobile menu links: `py-2` → `py-2.5` (all 10+ links)
- Mobile "Try Calculator" CTA: `py-2` → `py-3`

## Files changed
- `apps/web/src/components/HomePlanCTA.tsx` — NEW
- `apps/web/src/components/StickyMobileCTA.tsx` — NEW
- `apps/web/src/app/page.tsx` — imports, hero CTA island, proof bar, sentinel, StickyMobileCTA
- `apps/web/src/components/Nav.tsx` — tap target padding

## What the audit found (for context)

| LIFT Pillar | Score | Key finding |
|---|---|---|
| Value Proposition | 3/5 | H1 feature-focused, not benefit-focused |
| Clarity | 3/5 | 7 screenfolds, signup buried at 2.7 |
| Relevance | 4/5 | Perfect match for "asvab calculator" intent |
| Friction | 2/5 | Signup CTA invisible above fold, mobile tap targets fail |
| Distraction | 5/5 | Zero external links, clean funnel |
| Urgency/Anxiety | 2/5 | Risk reversal present but test-date urgency unused |

**What's working:** You/We ratio 11:1 (excellent copy), zero distractions, calculator-led
funnel matches traffic source, risk reversal present.

## Codex review corrections (applied to plan)
1. Tap targets: desktop nav links are hidden on mobile (`md:flex`); real targets are hamburger + mobile menu
2. Font: body copy is `text-lg`/`text-base` (16-18px), not 12px. "12px" was from `text-xs` labels — fine
3. Social proof: already exists in TestimonialWall, just buried. Proof bar adds it above fold without duplicating
4. Auth-aware CTA: `PLAN_HREF` sends logged-in users to /signup. Fixed using CalculatorResultBridge pattern
5. Sticky CTA: homepage only (not layout.tsx), scroll trigger (not time delay)
6. Measurement: existing `trackEvent` sufficient, no new plumbing needed

## CF Pages deploy fix (2026-06-18)

Monorepo restructure broke CF Pages builds — all 3 auto-deploys after merge FAILED.

**Root cause (two issues):**
1. `NODE_VERSION=20` in CF Pages env → pnpm 11.7.0 requires Node 22.13+ (`node:sqlite` missing)
2. `destination_dir: "out"` → Next.js now outputs to `apps/web/out/` after restructure

**Fix (applied via CF API, no code changes):**
- `NODE_VERSION` → 22 (both preview + production)
- `build_command` → `pnpm build` (was `npm run build`)
- `destination_dir` → `apps/web/out` (was `out`)
- All 29 existing env vars preserved

**Deploy `01ce605d` succeeded** — retried from failed `9bf46ed3`. All 4 CRO elements
verified live on asvabhero.com via Chrome automation:
- [x] HomePlanCTA: "or Start my free plan →" in hero ✅
- [x] Proof bar: "800+ recruits · 4,000+ score checks · 4,400+ practice questions" ✅
- [x] StickyMobileCTA: fixed bottom bar after scrolling past hero, hidden for anon=OK ✅
- [x] Nav tap targets: code deployed ✅
- [x] Test sticky bar for non-Pro visitors (fresh unauthenticated tab) ✅

## Remaining next steps
- [ ] Check GA4 prop 404444165 ~2026-07-02 for:
  - `homepage_hero_signup_click` events firing
  - `homepage_sticky_cta_shown` events firing
  - `signup_complete` lift vs baseline (~0.8%)
- [ ] If sticky bar converts: promote to marketing route group layout
- [ ] Still unused: test-date urgency (strongest natural lever for this audience)
- [ ] Still unused: benefit-focused H1 (A/B test candidate)
- [ ] Social proof numbers refresh: update `social-proof.ts` monthly from GA4

## Plan file
`~/.claude/plans/typed-seeking-rabbit.md`
