# Monthly Pro price $14.99 → $24.99 — CONTINUITY (2026-06-23)

## What shipped
Raised the **monthly** ASVAB Hero Pro price from **$14.99 → $24.99** across charge, display, emails, and all stray surfaces. Pass tiers ($59 90-Day / $119 Retaker) and the (dead) annual tier unchanged. Existing subscribers + in-flight trials grandfathered.

### Why
The 90-Day Pass ($59) is the loud, pass-led default (kills involuntary churn — see the billing-ledger work). But at $14.99/mo, 3 months monthly = $44.97 < $59, so the pass read as the *worse* sticker and the price ladder was inverted — pushing price-sensitive buyers toward the recurring plan we're trying to de-emphasize. At **$24.99/mo**, 3 months = $74.97 > $59, so the pass is now the obvious-value choice and the ladder is coherent.

## Charge side (live)
- Stripe prices are immutable → created a **new** price `price_1TlcAmDjRScowBLlOKW7FpJF` = $24.99/mo recurring on product `prod_UQGaoePk7IZ4Kx`.
- Repointed the live Supabase secret `ASVABHERO_STRIPE_PRICE_MONTHLY` (project `abypyprvgvofzrtifgzi`) to it; digest-verified `79b35bc7…`.
- Redeployed `stripe-checkout` (picks up secret) + `stripe-webhook` (day-8 email copy). NOTE: deploy `stripe-checkout` WITHOUT `--no-verify-jwt` — it has no config.toml override so it must keep the default `verify_jwt=true` (only `stripe-webhook` is `verify_jwt=false`). I briefly mis-deployed it with the flag then corrected; `requireUser` validates the JWT app-side regardless, so no exposure.
- Fixed the central `.env` `ASVABHERO_STRIPE_PRICE_MONTHLY` — it was **stale**, pointing at an old **$9.99** price (`price_1TRQ38…OSFQWlIN`) that production never used. Now `price_1TlcAm…`.

### Old prices on the product — DO NOT ARCHIVE
- `price_1Tioxo…3T8WSV0y` = $14.99 (prior live monthly — grandfathered subs bill on it)
- `price_1TRQ38…OSFQWlIN` = $9.99 (older; whatever subs exist on it keep billing)
- Annual `price_1TRQ38…4mhAazTf` = $49.99/yr (the `annual` checkout branch is unreachable dead code; tier not in UI)

## Display side (live, verified $24.99)
- PR #26 (squash-merged to main, commit `2b92fce`) → 31 strings / 16 files: pricing UI, paywall cards, all SEO pages, JSON-LD `Offer.price` on `/` + `/pricing`, checkout analytics `TIER_VALUE.monthly`, onboarding default, day-8 trial email.
- Competitor line on `/best-asvab-online-prep` still framed correctly ($24.99 < competitor $39.99).

## Emails (all live senders fixed)
- `stripe-webhook` day-8 charge notice — in code, redeployed.
- **Live Listmonk templates** (`list.asvabhero.com`, updated via API — note Cloudflare 403s the default `Python-urllib` UA; send a browser User-Agent):
  - #5 Welcome — was $9.99 → $24.99
  - #15 `tx-trial-ending` (3-day reminder) — was $9.99 → $24.99
  - #17 Drip Day 7 (Pro upgrade) — was $14.99 → $24.99
- **Pre-existing bug caught:** #5/#15 quoted $9.99 while the live charge was $14.99 — the trial-ending reminder was mis-stating the price before today. Now aligned at $24.99.
- Repo source synced: `docs/email-templates-drafts.md`, `docs/listmonk-template-pro-upgrade-day7.html` (commit `9d55a2c`).

## Misc surfaces (commit `bc4436a`)
- `public/llms.txt` (live AI-facing) — was "$9.99/mo or $49.99/yr" → "$24.99/mo, or a one-time $59 90-Day Pass"; **dropped the phantom annual tier** it was advertising.
- `CLAUDE.md` plan summary, `docs/social-channel-strategy-2026-06.md`, and stale $9.99 comments in `CalculatorResultBridge.tsx` + `DiagnosticResultsBridge.tsx`.
- Left dated CONTINUITY/`project-history.md` historical logs untouched (point-in-time records).
- Left dead `annual: "49.99"` map entries in `stripe-checkout` + `onboarding` (inert; cleanup TODO if desired).

## ⏭ Watch / next
- **Conversion at the new price** — monitor monthly trial-start → day-8 paid conversion and pass-vs-monthly mix in the Winning dashboard / GA4. Hypothesis: monthly volume dips, but more buyers route to the $59 pass (intended) and ARPU rises. Revisit ~2–3 weeks (≈2026-07-14).
- Optional: rip out the dead annual tier code.
