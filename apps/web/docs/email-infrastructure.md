# ASVAB Hero — Email Infrastructure

Reference doc for the self-hosted email stack powering lead capture and the 30-day study plan drip sequence.

> **⚠️ Updated 2026-06 — inbound + human mail moved to Google Workspace.**
> Live DNS for `asvabhero.com` now shows **MX → Google** (`aspmx.l.google.com`),
> **SPF → `v=spf1 include:_spf.google.com ~all`**, a **`google._domainkey`** DKIM
> record (Workspace) *alongside* the existing **`resend._domainkey`**, and a
> **DMARC** record (`p=quarantine; adkim=s; aspf=s`). The "Cloudflare Email
> Routing (inbound)" section below is **SUPERSEDED** — info@/trish@ are now real
> Google Workspace mailboxes. The Listmonk → Resend → SES path is still used for
> **app/transactional + drip mail only** (welcome, drip, trial reminders), which
> aligns to the From domain via `resend._domainkey`. See the verified table
> below and **[`outreach-deliverability.md`](./outreach-deliverability.md)** for
> the cold-outreach rules that this DMARC posture imposes.

### Current DNS (verified 2026-06)

| Type | Name | Content | Purpose |
|------|------|---------|---------|
| MX | asvabhero.com | `aspmx.l.google.com` (+ alt1–4) | Google Workspace inbound (info@/trish@) |
| TXT (SPF) | asvabhero.com | `v=spf1 include:_spf.google.com ~all` | Authorizes Workspace sending |
| TXT (DKIM) | google._domainkey | `v=DKIM1; k=rsa; p=…` | Google Workspace signing |
| TXT (DKIM) | resend._domainkey | `p=MIGf…IDAQAB` | Resend/SES signing (app + drip mail) |
| TXT (SPF) | send.asvabhero.com | `v=spf1 include:amazonses.com ~all` | Resend return-path (app/transactional only) |
| TXT (DMARC) | _dmarc.asvabhero.com | `v=DMARC1; p=quarantine; pct=100; adkim=s; aspf=s; rua=mailto:trish@asvabhero.com` | **Strict** alignment, quarantine policy |

Why both DKIM selectors matter: personal outreach from a Workspace mailbox passes
via `google._domainkey`; automated drip/welcome from Listmonk→Resend passes via
`resend._domainkey`. Both are aligned to the root From domain, so both satisfy
`adkim=s`. Under `aspf=s`, the SES `send.` subdomain return-path does NOT align
for app mail, so app mail relies on the DKIM leg of DMARC (which passes).

## Stack Overview

```
Visitor → [EmailCapture.tsx on asvabhero.com]
       → POST to NEXT_PUBLIC_ASVAB_SIGNUP_ENDPOINT (CF Worker — TBD)
       → POST /api/public/subscription on list.asvabhero.com (Listmonk)
       → Listmonk creates subscriber in list "ASVAB Hero — Study Plan"
       → Campaign sends via SMTP → smtp.resend.com:2587 (STARTTLS)
       → Resend delivers via Amazon SES (send.asvabhero.com MX)
       → Inbox
```

**Total monthly cost:** $0 until ~3,000 sends/mo (Resend free tier). Then ~$5/mo on SES at 50k sends/mo.

## DNS Records (Cloudflare, asvabhero.com zone)

> **SUPERSEDED (see "Current DNS (verified 2026-06)" at the top).** The MX + SPF
> rows below described the old Cloudflare Email Routing inbound path and are no
> longer live — MX is now Google Workspace and root SPF is `_spf.google.com`.
> The DKIM (`resend._domainkey`) and `send.` SES rows are still accurate for the
> app/transactional path. Kept for history.

Zone ID: `1589e9ac252d44ba0dadceb3ae7be88e`
Account ID: `4e99280ddad67e4382b367daccf6c5e0` (Trisha.penrod@gmail.com)

| Type | Name | Content | Purpose |
|------|------|---------|---------|
| A | list | 64.23.194.109 (proxied) | Listmonk admin UI |
| MX | asvabhero.com | route1/2/3.mx.cloudflare.net | CF Email Routing (receive) |
| TXT | asvabhero.com | `v=spf1 include:_spf.mx.cloudflare.net ~all` | SPF for CF Email Routing |
| TXT | resend._domainkey | `p=MIGf...IDAQAB` (DKIM) | Resend signing |
| MX | send | `feedback-smtp.us-east-1.amazonses.com` (prio 10) | Resend bounce path |
| TXT | send | `v=spf1 include:amazonses.com ~all` | Resend SPF |

CF SSL/TLS mode for this zone: **Flexible** (required — Caddy on droplet serves HTTP only).

## Cloudflare Email Routing (inbound)

> **SUPERSEDED 2026-06 — inbound is now Google Workspace.** `info@` and `trish@`
> are real Workspace mailboxes (MX → `aspmx.l.google.com`), not CF forwards to
> `trish@dach.family`. ⚠️ **Operator to confirm** whether any legacy CF Email
> Routing rule (`info@ → trish@dach.family`, the `*@` catch-all) still exists in
> the CF dashboard and tear it down if so, since it can silently shadow Workspace
> delivery. The section below is kept for history only.

- **Enabled:** yes
- **Destination:** `trish@dach.family` (verified)
- **Rule:** `info@asvabhero.com` → `trish@dach.family`
- **Cost:** $0 (free tier, unlimited)

## Listmonk (campaign manager)

Self-hosted on DigitalOcean droplet `64.23.194.109`.

- **Admin URL:** https://list.asvabhero.com/admin
- **Compose:** `/root/listmonk/docker-compose.yml` on droplet
- **Containers:** `listmonk` (v5.x) + `listmonk-db` (postgres:16-alpine, isolated)
- **Network:** `root_default` (shared with Caddy/n8n/postgres)
- **Caddy route:** `list.asvabhero.com` → `listmonk:9000` (inside `:80` block in `/root/Caddyfile`)

### Credentials (see central `.env`)

| Secret | Purpose |
|--------|---------|
| `ASVAB_LISTMONK_ADMIN_USER` / `ASVAB_LISTMONK_ADMIN_PASSWORD` | Web UI login |
| `ASVAB_LISTMONK_DB_PASSWORD` | Postgres (internal only) |
| `ASVAB_LISTMONK_API_USER` / `ASVAB_LISTMONK_API_TOKEN` | API access (`claude-automation`, Super Admin) |
| `ASVAB_RESEND_API_KEY` | SMTP password (user = literal string `resend`) |

### SMTP Configuration (Settings → SMTP)

| Field | Value |
|-------|-------|
| Host | `smtp.resend.com` |
| Port | `2587` |
| Auth | Login |
| Username | `resend` |
| Password | `ASVAB_RESEND_API_KEY` from `.env` |
| TLS | STARTTLS |

**Why port 2587, not 465/587:** DigitalOcean blocks outbound SMTP on standard ports (25/465/587) by default. Resend listens on 2587/2465 too.

### From Address

Settings → General → From email: `ASVAB Hero <info@asvabhero.com>` (Listmonk drip/welcome; DKIM via `resend._domainkey`).

Reply-to behavior (2026-06): `info@asvabhero.com` is now a **Google Workspace** mailbox, so replies land directly in Workspace (no CF forward to `trish@dach.family`). Personal/cold outreach is sent from a Workspace mailbox (`info@`/`trish@`), which DKIM-signs via `google._domainkey` — see [`outreach-deliverability.md`](./outreach-deliverability.md).

#### Agent access to the asvabhero Workspace mailbox (`gw` CLI)

To read/draft/reply **as asvabhero** (e.g. trish@asvabhero.com), prefer the `gw` CLI
over the `google-asvab` MCP connector — it's far cheaper on tokens (terse output, no
schema load). As of 2026-06-28 the `google-asvab` connector is correctly bound to the
real asvabhero mailbox; before then it authed as the *consulting* mailbox, which is how
a "draft as asvabhero" once landed in the wrong inbox. Both now resolve to asvabhero,
but `gw` is the cheaper default.

```bash
gw --account asvabhero gmail search "newer_than:7d"        # read
gw --account asvabhero gmail draft  --to x@y.com --subject "…" --body "…"   # SAVE a draft
gw --account asvabhero gmail reply  --thread-id <id> --id <msgid> --body "…"
```

The token binding is tracked in the credential registry
(`~/.config/cred-registry/tokens.yaml`; redacted mirror at
`0-AI/docs/credentials/TOKENS.md`). Run `gw auth doctor` to confirm
`--account asvabhero` actually resolves to an asvabhero mailbox before sending.

## Lists

| ID | UUID | Name | Opt-in | Type |
|----|------|------|--------|------|
| 3 | `6cfd6a05-8ac2-498b-86ca-9bb381e1d006` | ASVAB Hero — Study Plan | single | public |

Single opt-in chosen for lead magnet flow (no confirm-email friction). The downside is higher bounce/complaint risk — revisit if deliverability degrades.

## API Usage

```bash
# List all lists
curl -u "$ASVAB_LISTMONK_API_USER:$ASVAB_LISTMONK_API_TOKEN" \
  https://list.asvabhero.com/api/lists

# Create subscriber (this is the hot path for the CF Worker)
curl -u "$ASVAB_LISTMONK_API_USER:$ASVAB_LISTMONK_API_TOKEN" \
  -X POST https://list.asvabhero.com/api/subscribers \
  -H "Content-Type: application/json" \
  -d '{
    "email":"user@example.com",
    "name":"First Last",
    "status":"enabled",
    "lists":[3],
    "preconfirm_subscriptions":true,
    "attribs":{"source":"calculator","afqt":52,"branch":"army"}
  }'

# Send transactional email (welcome template once created)
curl -u "$ASVAB_LISTMONK_API_USER:$ASVAB_LISTMONK_API_TOKEN" \
  -X POST https://list.asvabhero.com/api/tx \
  -H "Content-Type: application/json" \
  -d '{
    "subscriber_email":"user@example.com",
    "template_id":<tx_template_id>,
    "data":{"first_name":"First","plan_url":"https://asvabhero.com/plan/xyz"}
  }'
```

The public subscription endpoint (`POST /api/public/subscription`) requires a captcha key unless disabled. Using authenticated `/api/subscribers` is the cleaner path from a trusted CF Worker.

## What's live right now

- [x] DNS records (MX, DKIM, SPF, list subdomain)
- [x] Resend domain verified
- [x] CF Email Routing — info@ → trish@dach.family
- [x] Listmonk running + admin UI reachable
- [x] SMTP tested (successful send + receive)
- [x] List "ASVAB Hero — Study Plan" created
- [x] API user `claude-automation` provisioned

## Signup Endpoint (CF Pages Function)

**Architecture choice:** Instead of a standalone Worker at `signup.asvabhero.com`, the signup endpoint lives as a **Cloudflare Pages Function** inside the same repo at `functions/api/signup.ts`. Deployed automatically with every `main` push. Same origin as the site → no CORS hassle, no extra DNS, no extra deploy.

Endpoint: `POST https://asvabhero.com/api/signup`

Request body: `{ email, name?, tag?, source?, scores? }`
Responses:
- `200 {success: true}` — subscribed
- `200 {success: true, already_subscribed: true}` — duplicate (409 from Listmonk, treated as success)
- `400 {error: "invalid_email" | "invalid_json"}`
- `429 {error: "rate_limited"}` (only if KV binding `RATE_LIMIT_KV` is wired)
- `502 {error: "upstream_error"}` — Listmonk unreachable or errored

### Deploying

1. **CF Pages dashboard → asvab-hero project → Settings → Environment variables (Production)** — add these 4:
   | Name | Value | Encrypted |
   |------|-------|-----------|
   | `LISTMONK_URL` | `https://list.asvabhero.com` | no |
   | `LISTMONK_API_USER` | `claude-automation` | yes |
   | `LISTMONK_API_TOKEN` | value of `ASVAB_LISTMONK_API_TOKEN` from central `.env` | yes |
   | `LISTMONK_LIST_ID` | `3` | no |

2. (Optional) **KV namespace binding** for rate-limiting:
   - Dashboard → Workers & Pages → KV → Create namespace `asvabhero-ratelimit`
   - Back to Pages project → Settings → Functions → KV namespace bindings
   - Variable: `RATE_LIMIT_KV` → Namespace: `asvabhero-ratelimit`
   - Skip this for MVP; the Function runs without it (no rate limit).

3. `git push origin main` — CF Pages auto-deploys. Function URL: `https://asvabhero.com/api/signup`.

### Client wiring

`src/components/EmailCapture.tsx` defaults to `/api/signup` — no env var required. The `NEXT_PUBLIC_ASVAB_SIGNUP_ENDPOINT` escape hatch is kept for pointing at a staging endpoint if needed. Pending localStorage signups in `asvabhero.pending_signups` are replayed on the next successful submission.

### Testing

Before deploying, hit the endpoint from curl after `next dev` + `wrangler pages dev`:

```bash
cd /home/trisha/dev/asvab-hero
npx wrangler pages dev out --compatibility-date=2024-01-01 \
  --binding LISTMONK_URL=https://list.asvabhero.com \
  --binding LISTMONK_API_USER=claude-automation \
  --binding LISTMONK_API_TOKEN=<token> \
  --binding LISTMONK_LIST_ID=3

curl -X POST http://localhost:8788/api/signup \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://asvabhero.com' \
  -d '{"email":"test@example.com","tag":"asvab-study-plan"}'
```

## What's still pending

- [x] **Welcome tx template** — Listmonk template ID **5** ("ASVAB Hero — Welcome + Study Plan"). Fires from `functions/api/signup.ts` after subscribe succeeds. The `{{ UnsubscribeURL }}` helper is NOT available in `tx` templates — use `https://list.asvabhero.com/subscription/<list_uuid>/{{ .Subscriber.UUID }}` instead.
- [x] **`LISTMONK_WELCOME_TEMPLATE_ID=5` in CF Pages production env** — verified set 2026-04-26.
- [x] **30-day study plan PDF** lead magnet — `public/study-plan.pdf` (6 pages). Source: `scripts/study-plan.html`. Regenerate with `bash scripts/build-study-plan.sh` (uses headless Chrome). Welcome email links directly to `https://asvabhero.com/study-plan.pdf`.
- [x] **Drip sequence** — Listmonk tx templates, days → template: `2→7, 5→8, 7→17, 10→9, 14→10, 21→23, 30→24, 45→25, 60→26, 90→27`. Cron sender at `/root/scripts/asvab_drip.py` on droplet `64.23.194.109` (env file `asvab_drip.env`; repo mirror `apps/web/scripts/drip/asvab_drip.py`). Runs daily at `14:30 UTC` (06:30 PT, 09:30 ET). Tracks sent days via `attribs.drip_sent` for idempotency. Logs to `/var/log/asvab_drip.log`.
  - **2026-07-18 — extended past the day-14 cliff + Pass-led CTAs.** Added evergreen days 21/30/45/60/90 (AR lever, final 2-week plan, PC quick wins, line scores, plateau; templates 23–27) so new signups keep getting value for ~3 months instead of going dark at day 14. Days 5 & 14 (tmpl 8/10) rewritten to lead with the **one-time 90-Day Pass $59** (trial demoted to a secondary `$24.99/mo` line) — cold email leads convert better on the no-cancel Pass than on a trial. ⚠️ Because the sender loops `if age >= day and day not in already: send` with NO per-run cap, adding days retroactively would blast every past day at once. **Backfill guard** `apps/web/scripts/drip/backfill_drip_guard.py` was run once (160 subs, 325 day-marks) to stamp new days as already-sent for subscribers already past them — so only NEW signups flow through 21–90; existing dormant leads are re-engaged by the **monthly newsletter** instead (see `newsletter-playbook.md`). Dormant-lead re-engagement past day 90 = the monthly newsletter, drafted (not auto-sent) by scheduled task `asvab-monthly-newsletter` (1st of month, 08:00 local).

### Drip sender — operations

```bash
# Manual run (test/catchup)
do-ssh 'cd /root/scripts && set -a && . ./asvab_drip.env && set +a && python3 ./asvab_drip.py'

# Tail today's run
do-ssh 'tail -f /var/log/asvab_drip.log'

# Inspect a subscriber's drip state
curl -s -A curl/8.0 -u "$ASVAB_LISTMONK_API_USER:$ASVAB_LISTMONK_API_TOKEN" \
  "https://list.asvabhero.com/api/subscribers?list_id=3&query=subscribers.email='you@example.com'"
```

To edit the drip schedule: change `DRIP_SCHEDULE` in `asvab_drip.py` (day → template_id), redeploy with `do-ssh 'cat > /root/scripts/asvab_drip.py' < local.py`. To edit drip copy: edit the template via Listmonk admin UI, no redeploy needed.

## Useful one-liners

```bash
# Test SMTP from droplet
do-ssh 'docker exec -it listmonk sh -c "echo Test | mail -s TestSubject you@example.com"'

# Tail Listmonk logs
do-ssh 'docker logs -f --tail 100 listmonk'

# Check Resend domain status
curl -H "Authorization: Bearer $ASVAB_RESEND_API_KEY" https://api.resend.com/domains
# (fails with current send-only key — use full-access key for management APIs)
```

## Security notes

- The `claude-automation` API user has Super Admin — rotate the token if the central `.env` is ever compromised.
- `list.asvabhero.com` is proxied through Cloudflare (DDoS + bot protection free). Admin UI has no built-in brute-force protection beyond Listmonk's session cookie.
- The Resend API key in `.env` is a "send-only" restricted key (confirmed via Resend API — returns `restricted_api_key`). Can send but cannot manage domains/keys. Fine for SMTP + transactional sends.
- Consider adding Cloudflare Access (free tier, 50 users) in front of `/admin` for extra auth layer.

## Trial setup

Card-required 7-day Stripe trial on the monthly tier (annual tier = direct charge, no trial). One trial per user — returning customers (any prior `stripe_subscription_id`) skip the trial flag and are charged immediately. Implementation:

- `supabase/functions/stripe-checkout/index.ts` — conditionally adds `subscription_data[trial_period_days]=7` and `payment_method_collection=always` when `tier === "monthly" && !profile.stripe_subscription_id`.
- `supabase/functions/stripe-webhook/index.ts` — on `checkout.session.completed`, fire-and-forget POST to Listmonk with `attribs.source = "trial-start"`. On `customer.subscription.trial_will_end` (T-3 days), sends a Listmonk transactional reminder.
- `src/lib/practice/gate.ts` — already maps `billing_status='trialing'` (via webhook) → `active`, so Pro gating works during trial without edits.

### Stripe webhook events to enable in dashboard

- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.paid`
- `customer.subscription.trial_will_end` (NEW — required for the T-3 reminder)

### New Supabase function secrets

Set on the `stripe-webhook` function via `supabase secrets set`:

- `LISTMONK_URL` — e.g. `https://list.asvabhero.com`
- `LISTMONK_API_USER` — Listmonk API user (e.g. `claude-automation`)
- `LISTMONK_API_TOKEN` — token for that API user
- `LISTMONK_LIST_ID` — Listmonk list ID for trial starters (currently `3`)
- `LISTMONK_TEMPLATE_TRIAL_ENDING` — Listmonk transactional template ID for the T-3 reminder (create the template first, then set this to its numeric ID)

If `LISTMONK_TEMPLATE_TRIAL_ENDING` is unset, the `trial_will_end` branch logs and skips — webhook still returns 200.

## Spaced Mistake Bank reminders (Edge Function `mistake-reminders`)

Spacing-aware adherence email for the Closed-Loop v0 (Phase 1). Unlike the
fixed-day Listmonk drip, this is **due-based**: it emails users who have
unresolved `question_reviews` due now, at most once/day (idempotency via
`profiles.last_mistake_reminder_on`, migration 0019). Sends via Resend
(`ASVAB_RESEND_API_KEY`), from `info@asvabhero.com`, CTA → `/app/mistakes`.

- Source: `supabase/functions/mistake-reminders/index.ts`
- Auth: shared secret header `x-cron-secret` = `MISTAKE_REMINDERS_SECRET`
- **NOT deployed/scheduled yet by design** — activate only after the
  `NEXT_PUBLIC_CLOSED_LOOP_ENABLED` flag is live, else users get emailed to use
  a page that redirects home. Activation SQL (pg_cron + pg_net) is in
  `supabase/migrations/0019_mistake_reminder_tracking.sql`.
- Deploy at launch: `supabase functions deploy mistake-reminders --no-verify-jwt`
  then `supabase secrets set ASVAB_RESEND_API_KEY=... MISTAKE_REMINDERS_SECRET=...`
