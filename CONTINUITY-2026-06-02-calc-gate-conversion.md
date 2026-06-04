# Continuity — Calculator-gate conversion diagnosis + restructure (2026-06-02)

## TL;DR
Marketing-hat question: "did the recent (5/30 two-step capture + 6/01 funnel-surfacing)
changes move email signups?" Pulled GA4 (prop 404444165, G-96BXQ7YRJ8). Answer: too early
for a clean read, but the post-calculator email gates were barely converting, so diagnosed
why and shipped a fix. Commit `de55321`, LIVE on main / Cloudflare (verified the new
"Save my plan" copy is in the production JS bundle).

## What GA4 showed (window 2026-05-20..06-02)
- Email gates barely convert: ~725 gate impressions (684 `email_capture_shown` +
  41 `plan_capture_shown`) produced only 2 successful leads (`generate_lead`) and
  6 total `signup_submit` attempts. ~0.8% submit rate. The bottleneck is people
  SEEING the gate and not even typing an email, not the backend.
- The 19 account signups (`signup_complete`) came from the /signup account path, which
  spiked to 8 on 6/01 (funnel-surfacing ship day; single day, watch if it holds).
- New 5/30 plan gate: shown 41x (5/31-6/02), 1 submit.

## Endpoint = NOT the problem (rate-limit theory was wrong, discard it)
A subagent first guessed a per-IP 429 (5/hr) rate limit. Discarded: only 6 submits in 2
weeks cannot trip a 5/hr/IP cap. Real tell from the daily split: ALL 4 "failed" submits were
5/20-5/26 (before 5/30); BOTH successes were 5/30 + 6/01. That is a clean temporal cutover =
the Listmonk integration simply was not wired in production until the 5/30 calc-conversion
work. Confirmed live-healthy: `POST https://asvabhero.com/api/signup` with the full
`{email,tag,source,scores}` plan-capture payload returns `200 {"success":true}`. No code or
config change needed. `functions/api/signup.ts` posts to self-hosted Listmonk
(list.asvabhero.com, list id 3); sound and defensively written.
(Left a `claude-diagnostic@example.com` test row in Listmonk list 3 from the live check; reserved
domain, cannot bounce; delete at leisure.)

## What shipped (commit `de55321`, 4 files)
Diagnosis of the ~0.8% submit rate: the gate sold a DEFERRED, EMAILED "plan" whose value was
given away FREE directly below it, with two-ask friction and dense copy.
1. `src/components/Calculator.tsx` — moved `CalculatorWeakSubtestGuides` (free weak-subtest
   links) from directly under the gate to LOW on the page (after composites + `JobResults`),
   so the free version stops cannibalizing the peak-intent gate. Now renders under the stricter
   `compositesReady && snapshot` gate (implies afqtReady). Props unchanged.
2. `src/components/CalculatorPlanCapture.tsx` — reframed from "we'll email you a plan" to
   on-page + account value. Dropped the AFQT-formula line and the "cognitive science" line.
   Button "Email me my plan" -> "Save my plan". Headline pattern, event names, `accountHref`,
   and the `/api/signup` contract all UNCHANGED.
   - OWNER-REVIEW copy calls (reversible): success headline "Your plan is saved. Here are your
     biggest levers." and helper "Picks up right where your scores left off."
3. `src/lib/analytics.ts` + `src/components/EmailCapture.tsx` — added `email_capture_submit`
   attempt event (fires pre-fetch, after email-valid check, with `source: tag`), giving the
   older EmailCapture parity with the plan gate's `plan_capture_submit`. Now every gate has a
   clean shown -> submit -> lead funnel split by source.

## Next / open
- The existing GA4 funnel check-in routine fires 2026-06-15 09:00 MT
  (`trig_01S3qiQS2SajuQju43taTHBV`) and now has the per-gate submit events to measure whether
  the restructure actually lifts the submit rate (do the real GA4 review locally).
- Owner may want to revise the 2 flagged success-state copy lines.
- Strategic read for later: users create on-platform ACCOUNTS far more readily than trade an
  email for an emailed plan. If submit rate still lags at 6/15, push the peak-intent moment
  harder toward account creation / on-page personalized plan rather than inbox delivery.

## Ship/guard cmds (unchanged)
guard `node scripts/check-no-emdash.mjs`; build `npm run build`; deploy = push main -> CF Pages.
DO NOT commit owner WIP: `src/lib/calculator-links.ts`, `docs/seo-notes/`, `public/sitemap.xml`
(build churn), the `CONTINUITY-*.md` docs.
