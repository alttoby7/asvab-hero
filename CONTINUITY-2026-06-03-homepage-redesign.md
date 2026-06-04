# Continuity — Homepage redesign (2026-06-03) — PICK UP TOMORROW

## STATUS: BUILT + verified, NOT deployed. Awaiting owner eyeball + approval to push.
The re-architected homepage is committed (durable) and pushed as a NON-deploying branch:
- Branch: `homepage-redesign-2026-06-03`, commit `f06a46d` (pushed to origin).
- Built on `main` = `a92d545` (latest; owner's counselor-resources copy edit is the only thing
  on main since the internal-linking ship `66bf247`).
- NOT on main, so Cloudflare has NOT deployed it. The live homepage is unchanged.
- Files changed (2): `src/app/page.tsx` (full rewrite) + `src/components/HomePopularLinks.tsx` (new,
  the owner-approved 4-col hub, now wired into the homepage).

## What this changes (the decision: ONE direction)
Problem (owner: "doesn't take people in one direction; needs to convert + link internally"). A Codex
(gpt-5.4) audit + an Explore funnel-map agent agreed: the page was "two homepages stacked" with ~6
competing primary CTAs (diagnostic x4, calculator, free plan, email, Upgrade to Pro).
Owner decisions (locked, via AskUserQuestion):
- ONE outcome = FREE ACCOUNT ("Start my free plan" -> `/signup?next=/app/plan`, the GA4
  `signup_complete` milestone). Pro is downstream, not a homepage ask.
- Hero leads with the CALCULATOR (matches H1/metadata + #1 SEO intent); diagnostic = secondary text link.
- Scope = re-architecture within the current navy/orange design system. NO full reskin / no /webdesign run.

New section order (replaces the old 10): (1) calculator-led hero, one orange CTA "Use the free score
calculator" -> /calculator + "No scores yet? Take the diagnostic" text link; (2) merged pain-band +
GapToGoalRail, single conversion CTA "Start my free plan"; (3) merged proof stack (Why-it-works science
+ "See the science" + bank-stats numbers + TestimonialWall); (4) compact Free-vs-Pro (Pro de-emphasized:
small price + "Compare plans" link, no orange Upgrade button; CTA stays "Start my free plan"); (5) Browse:
3 pillars + "jump to a calculator" cluster (homepageFeatured()) + score-requirements link, moved BELOW
the conversion story; (6) `<HomePopularLinks />` footer-adjacent.
CUT: the mid-page EmailCapture (lines ~411-421) and the redundant final diagnostic CTA (lines ~495-513).
KEPT/verified intact: H1, canonical, HOME_SCHEMA JSON-LD, and every internal link (calculator, practice,
study-guide, army-ranks, score-requirements, gt-score, the-science, pricing) + the new hub anchors.

## Verified
em-dash guard clean (`node scripts/check-no-emdash.mjs`), `npm run build` clean (homepage prerenders
static), and a curl of the build confirmed new content present / old CTAs gone (0 "Upgrade to Pro",
0 "Email me the plan", 0 old "Take the free diagnostic" button). Owner viewed the new hero live.

## ⏭ TO DEPLOY TOMORROW (after owner approves)
The owner is concurrently working on branch `study-guide-diagrams` (their interactive SVG diagrams WIP),
so the main working tree is NOT on main. Ship via a clean worktree to avoid entangling their work:
```
cd ~/dev/asvab-hero && git fetch origin && git branch -f main origin/main
git worktree add /tmp/ah-home main
cd /tmp/ah-home && ln -sfn ~/dev/asvab-hero/node_modules ./node_modules \
  && ln -sfn ~/dev/asvab-hero/.env ./.env && ln -sfn ~/dev/asvab-hero/.env.local ./.env.local
git cherry-pick f06a46d            # applies the 2-file redesign onto main (clean; no overlap)
node scripts/check-no-emdash.mjs && npm run build   # verify
git push origin main               # deploys via Cloudflare
git worktree remove /tmp/ah-home --force
```
(Or merge the branch into main. Cherry-pick keeps it to the 2 files.)

## To RE-PREVIEW tomorrow (the /tmp serve from today is ephemeral)
Recreate the worktree as above (without the cherry-pick), `npm run build`, then serve the static export
on a FREE port and screenshot with headless chrome:
```
cd /tmp/ah-home/out && (setsid python3 -m http.server 3015 &)   # pick a port nothing holds
google-chrome --headless=new --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1440,9000 --screenshot=/tmp/home.png http://localhost:3015/
```
GOTCHA today: stale `next-server` processes were squatting ports 3000/3007/3011 serving the OLD page;
`python http.server` silently failed to bind and curl/chrome showed the old homepage. Verify with
`ss -ltnp | grep :PORT` that PYTHON (not next-server) owns the port before trusting a screenshot.
Owner cannot see SendUserFile images this session -> show via Claude-in-Chrome (navigate a NEW tab to
the local URL; do not hijack the owner's diagrams tab).

## Open / optional tweaks the owner may want before deploy
copy (headlines/microcopy), section order, the Free-vs-Pro block layout, spacing. Bigger future idea
(declined for now): embed the live calculator IN the hero, and/or a full /webdesign visual reskin.

## Pointers
- Plan file: `~/.claude/plans/flickering-baking-thompson.md` (approved).
- Codex audit session id: `019e8ffa-1962-7012-8256-a72d0b2a8161` (continue for a copy/wireframe pass).
- Related shipped this session (already LIVE on main): conversion gate restructure `de55321`, internal
  linking `66bf247` (clusters + breadcrumbs + CalculatorExplore + /study/[subtest] hubs).
- Memory: [[project-asvabhero-calc-gate-conversion-2026-06]] (now also covers this redesign).
