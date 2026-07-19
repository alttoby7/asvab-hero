# Continuity — 2026-07-18 — pricing + email funnel shipped; dunning/opt-out/drift pending

Session shipped a pricing reprice and an email-funnel overhaul. Four follow-ups
remain (all captured as a ready-to-run handoff prompt at the bottom).

Repo `~/dev/asvab-hero`, deploy branch `main` (CF Pages auto-deploys on push).
Supabase project `abypyprvgvofzrtifgzi` (MCP `mcp__f582c0fb-6bd2-4b17-808e-97764fc1aef4`).
⚠️ Repo currently sits on branch `mobile/play-iap` with the owner's uncommitted
mobile WIP (`apps/mobile/*`, `apps/web/functions/api/events.ts`) — leave it alone;
all shipped work is on `main`.

## ✅ Shipped this session

### 1. Pricing reprice (freeze overridden by owner)
`monthly $14.99→$24.99 · annual $49.99→$79 · 90-Day Pass held at $59`. Commit
`1c4f872` on main; CF Pages live-verified ($24.99/$79/$59 on `/pricing`, JSON-LD
`24.99`/`79.00`).
- New live Stripe prices (old ones retained → existing subs grandfathered on old ids):
  - Monthly $24.99 = `price_1TugP3DjRScowBLlUvUeYxwz`
  - Annual $79 = `price_1TugP3DjRScowBLlyqVwWqrd`
  - (Pass $59 unchanged = `price_1TioxuDjRScowBLlrpLZuA76`)
- Supabase secrets `ASVABHERO_STRIPE_PRICE_{MONTHLY,ANNUAL}` repointed + SHA256-verified.
  Central `.env` synced. Frontend swept (18 files, competitor/book/quiz prices untouched).
- Rationale + Phase-2 options: `CONTINUITY-2026-07-17-pricing-post-freeze-plan.md`.
- ⏭ PENDING: redeploy `stripe-checkout` so `TIER_VALUE` (24.99/79.00) is right — analytics
  only; the *charge* is already correct via the secret. (Task 2 below.)

### 2. Email funnel overhaul (commit `1adcc85` on main)
- **Drip CTAs realigned to lead with the Pass.** Days 5 & 14 (Listmonk tmpl 8/10)
  rewritten: primary CTA = one-time 90-Day Pass $59, trial demoted to a secondary
  `$24.99/mo` line. (Day 7 tmpl 17 was already Pass-led.)
- **Drip extended past the day-14 cliff** with evergreen days 21/30/45/60/90 (Listmonk
  tmpl 23/24/25/26/27: AR lever, final 2-week plan, PC quick wins, line scores, plateau).
  Droplet cron `/root/scripts/asvab_drip.py` schedule updated (repo mirror
  `apps/web/scripts/drip/asvab_drip.py`; remote backup `asvab_drip.py.bak-2026-07-18`).
- **Backfill guard run once** (`apps/web/scripts/drip/backfill_drip_guard.py`, 160 subs,
  325 day-marks) so long-tenured subs are NOT retroactively blasted — the sender loops with
  no per-run cap, so new drip days must be pre-stamped as sent for anyone already past them.
  Dry-run confirmed zero blast.
- **Monthly newsletter** (day-90+ re-engagement) — scheduled task `asvab-monthly-newsletter`
  (1st of month, 08:00 local) DRAFTS a fresh value email to Listmonk list 3 and notifies;
  never auto-sends. Playbook `apps/web/docs/newsletter-playbook.md`, seed
  `apps/web/docs/newsletter-seed.html`. ⏭ Owner should "Run now" once to pre-approve its tools.
- List 3 health at ship: ~592 subs / 293 confirmed / 0.5% unsub.

## ⏭ Pending (independent; full handoff prompt below)
1. **Mistake-reminder opt-out** — the owner's two test accounts (`trisha.penrod@gmail.com`
   display "Peter", `trish@dach.family`) get the daily spaced-review email. Feature is
   HEALTHY (35 real users in last 7d) — do NOT disable it; just
   `update profiles set daily_email_opt_in=false where email in (...)`.
2. **stripe-checkout redeploy** — TIER_VALUE analytics (see above).
3. **Dunning + win-back go-live** — code on main (`e14c6df`, cross-vendor reviewed, fail-open).
   Migration `0053_dunning_sequence` NOT applied (dunning_sends table + profiles.winback_email_*
   absent). Apply ONLY that migration's DDL surgically (additive, self-contained). Do NOT
   `db push` (drift — see #4). No new secrets. Stripe events already enabled. Then deploy
   `stripe-webhook` (verify_jwt=false is correct). Ride-along nit: welcome-trial/paid emails set
   `reply_to:"trish@dach.family"` → change to `info@asvabhero.com`.
4. **Migration drift cleanup** — prod `schema_migrations` records only `0051` + two
   timestamp migrations since 0045; local `0046/0048/0050/0052` + a DUPLICATE `0053`
   (`0053_dunning_sequence.sql` AND `0053_revenuecat_source.sql`) aren't cleanly recorded.
   Reconcile WITHOUT a blind `db push`; rename `0053_revenuecat_source.sql` →
   `0054_...`. Billing-DB surgery — diagnose object-by-object, propose, then execute. LAST.

## Deploy gotchas
- `stripe-checkout` = keep `verify_jwt=true` (no override) → deploy WITHOUT `--no-verify-jwt`.
- `stripe-webhook` = `verify_jwt=false` in config (correct — Stripe signs its own requests).
- Listmonk API needs a browser User-Agent (`-A "Mozilla/5.0"`); it 403s Python-urllib.
- Owner added settings allow-rules 2026-07-18 for supabase deploy/secrets + supabase-MCP
  writes + read-only infra + rewrite-git, so these no longer hit the auto-mode classifier.
