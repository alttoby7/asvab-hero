# Conversion Boost — Pickup (started 2026-05-08)

Plan: `~/.claude/plans/create-subagents-to-plan-zesty-umbrella.md`
Project notes: `CLAUDE.md` § Conversion Boost (2026-05-08)

## What was done yesterday

Five-phase sprint to fix a leaky email funnel that was producing only 4 Listmonk subscribers per 28 days against 543 sessions. Full code is in the working tree, not yet committed/pushed. Type-check (`npx tsc --noEmit`) is clean.

- **Phase A (leak fixes):** EmailCapture switched from useEffect-on-mount to IntersectionObserver. Score-tied capture below the calculator's ResultCard. Supabase signup → Listmonk fire-and-forget sync. Server-side TAG → template-ID map in signup.ts.
- **Phase B1 (bulk mount):** EmailCapture added to 13 pages with unique tags (8 calculators, pricing/upgrade exit ramps, AR/WK/PC tip pages mid+end).
- **Phase B2 (GSC titles):** Homepage, retake page, GT score page rewritten for branch-keyword CTR.
- **Phase C (Stripe trial):** Card-required 7-day trial wired into stripe-checkout edge function, gated for first-time monthly subscribers only. Webhook extended for Listmonk trial-start sync + `customer.subscription.trial_will_end` reminder. PricingPlans copy updated.
- **Phase D (lead magnets):** Three PDFs shipped — `ar-formula-card.pdf`, `wk-100-words.pdf`, `gt-booster-guide.pdf`. Tip-page EmailCapture copy now references each magnet directly.

## Pick up here tomorrow — manual steps required

These can't run from Claude. Do them in this order, top to bottom:

### 1. Push the frontend (auto-deploys to CF Pages)

```bash
cd /home/trisha/dev/asvab-hero
git status                  # confirm what's about to ship
git add -A
git diff --cached --stat    # sanity-check files
git commit -m "Conversion boost: IntersectionObserver, 13-page capture mount, GSC titles, Stripe trial, 3 lead magnets"
git push origin main
```

CF Pages auto-builds. Watch deploy logs at the Cloudflare dashboard. Smoke-test:
- Hit `/calculator`, enter scores, confirm second EmailCapture appears below ResultCard with interpolated AFQT.
- Hit `/asvab-arithmetic-reasoning-tips` — confirm "Get the 1-page AR formula card" copy renders, scroll mid-article to fire IntersectionObserver in DevTools network panel.
- View page source on `/` — confirm new title "ASVAB Calculator 2026: AFQT, GT & Line Scores (All Branches)".
- View `/pricing` — monthly tier should say "Start 7-day free trial — then $9.99/mo" with fine-print.

### 2. Create Listmonk transactional templates (4 new)

Log into Listmonk admin (`list.asvabhero.com`). Create 4 transactional templates:

| Template purpose | What it sends | Suggested template name |
|---|---|---|
| AR formula card welcome | Link to `https://asvabhero.com/ar-formula-card.pdf` + 1-paragraph "what's inside" | `tx-ar-formula-card` |
| WK 100 words welcome | Link to `https://asvabhero.com/wk-100-words.pdf` + intro | `tx-wk-100-words` |
| GT booster welcome | Link to `https://asvabhero.com/gt-booster-guide.pdf` + intro | `tx-gt-booster` |
| Trial ending (T-3 days) | Reminder that trial ends in 3 days; link to `/account/billing` to cancel; Pro value reminder | `tx-trial-ending` |

Note the template IDs after creating. You'll need them in step 3.

### 3. Set new env vars (Cloudflare Pages signup function + Supabase function)

**Cloudflare Pages signup function** (Pages dashboard → asvab-hero → Settings → Environment variables → production). Add:

```
LISTMONK_TEMPLATE_AR_TIPS=<id from step 2>
LISTMONK_TEMPLATE_WK_TIPS=<id from step 2>
LISTMONK_TEMPLATE_GT_BOOSTER=<id from step 2>
```

These are read by `functions/api/signup.ts`. Without them, signups via those tags fall back to the default welcome template (which still works, just sends the wrong magnet link).

**Supabase stripe-webhook function** (run in shell):

```bash
cd /home/trisha/dev/asvab-hero
supabase secrets set --project-ref abypyprvgvofzrtifgzi \
  LISTMONK_URL="https://list.asvabhero.com" \
  LISTMONK_API_USER="claude-automation" \
  LISTMONK_API_TOKEN="<from central .env: ASVAB_LISTMONK_API_TOKEN>" \
  LISTMONK_LIST_ID="3" \
  LISTMONK_TEMPLATE_TRIAL_ENDING="<id from step 2>"
```

Without these, the webhook silently no-ops on Listmonk sync (returns 200, no email sent).

### 4. Deploy the two edge functions

```bash
cd /home/trisha/dev/asvab-hero
supabase functions deploy stripe-checkout --project-ref abypyprvgvofzrtifgzi
supabase functions deploy stripe-webhook --project-ref abypyprvgvofzrtifgzi
```

### 5. Enable the new Stripe webhook event

Stripe dashboard → Developers → Webhooks → select the asvabhero.com production endpoint → Edit events → check **`customer.subscription.trial_will_end`**. Save.

Without this, the T-3 reminder email never fires (the new webhook branch will only execute when Stripe sends the event).

### 6. End-to-end verification

After all of the above, run a real test in incognito:

1. Sign up with a fresh email on `/signup`.
2. Confirm the email arrives (Listmonk welcome via `LISTMONK_WELCOME_TEMPLATE_ID`).
3. Confirm the subscriber lands in Listmonk list 3 with `attribs.source = "supabase-signup"`.
4. Click "Start 7-day free trial" on `/pricing`. Use a Stripe test card if test mode, or a real card on a 1-cent product if you can — or just visually confirm the checkout shows "7 days free, then $9.99/mo" wording.
5. After successful checkout, confirm the user's `profiles.billing_status` is `trialing`, `pro_until` is +7d.
6. Confirm a second Listmonk subscriber entry (or attrib update) with `source = "trial-start"`.
7. Hit `/practice-test` — gate should grant access (trial = Pro).

For the `trial_will_end` reminder, the only way to truly verify is to wait 4 days, OR use Stripe CLI to fire a synthetic event:

```bash
stripe trigger customer.subscription.trial_will_end
```

Then check Listmonk delivery log for the trial-ending tx send.

## Open opportunities (next session priorities)

These weren't in scope today but matter for the next push:

- **Build the actual welcome template body for AR/WK/GT magnets in Listmonk.** Right now there are 4 templates to create — keep them short, mobile-friendly, single CTA.
- **Author a PC magnet** if `/asvab-paragraph-comprehension-tips` starts driving signups. Today it falls back to the generic 30-day plan. Same pattern as AR/WK.
- **Tracey retention build** is still the highest priority before customer #2 — see `CONTINUITY-tracey-retention.md`. Conversion boost work was orthogonal but now there's a real trial flow she could compare against if she churns.
- **Drip templates 7–10 content audit:** the existing 14-day drip (cron `/root/scripts/asvab_drip.py`) was authored with unknown copy. Review whether it pitches the Stripe Pro product. If not, that's another conversion lever.
- **GSC re-check in 14 days** — confirm the title rewrites moved CTR. Especially homepage on branch-qualified queries (`army asvab calculator`, `air force asvab calculator`, `gt score calculator`, `afqt percentile score calculator`) and `/how-to-retake-the-asvab` (was 0% on 883 impressions at pos 7.4).
- **GA4 re-check in 7 days** — confirm `email_capture_shown` event volume on `/calculator` drops sharply (no more ghost impressions) and `email_capture_visible_with_score` shows real conversion ratio.

## Files touched (for git diff sanity-check)

```
src/components/EmailCapture.tsx
src/components/Calculator.tsx
src/components/PricingPlans.tsx
src/lib/analytics.ts
src/app/signup/page.tsx
src/app/page.tsx
src/app/how-to-retake-the-asvab/page.tsx
src/app/asvab-gt-score/page.tsx
src/app/practice-test/page.tsx
src/app/gt-score-calculator/page.tsx
src/app/asvab-line-score-calculator/page.tsx
src/app/asvab-composite-score-calculator/page.tsx
src/app/asvab-retake-calculator/page.tsx
src/app/army-asvab-calculator/page.tsx
src/app/navy-asvab-score-calculator/page.tsx
src/app/air-force-asvab-calculator/page.tsx
src/app/pricing/page.tsx
src/app/upgrade/page.tsx
src/app/asvab-arithmetic-reasoning-tips/page.tsx
src/app/asvab-word-knowledge-tips/page.tsx
src/app/asvab-paragraph-comprehension-tips/page.tsx
functions/api/signup.ts
supabase/functions/stripe-checkout/index.ts
supabase/functions/stripe-webhook/index.ts
docs/email-infrastructure.md
scripts/ar-formula-card.html       (new)
scripts/build-ar-formula-card.sh   (new, executable)
scripts/wk-100-words.html          (new)
scripts/build-wk-100-words.sh      (new, executable)
scripts/gt-booster-guide.html      (new)
scripts/build-gt-booster-guide.sh  (new, executable)
public/ar-formula-card.pdf         (new, 147 KB)
public/wk-100-words.pdf            (new, 228 KB)
public/gt-booster-guide.pdf        (new, 147 KB)
CLAUDE.md                          (Conversion Boost section appended)
CONTINUITY-conversion-boost.md     (this file)
```
