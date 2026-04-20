# ASVAB Hero — Email Infrastructure

Reference doc for the self-hosted email stack powering lead capture and the 30-day study plan drip sequence.

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

Settings → General → From email: `ASVAB Hero <info@asvabhero.com>`

Reply-to behavior: replies come into the inbox via Cloudflare Email Routing → forwarded to `trish@dach.family`.

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

- [ ] **Set the 4 CF Pages env vars** (manual, dashboard). Can't automate without an API token with Pages write scope.
- [ ] **Commit + push** the Function + EmailCapture changes.
- [ ] **Welcome tx template** — Listmonk API POST to `/api/templates` with `type: tx`. First attempt silently failed; retry with `type: "tx"` and proper JSON escaping. Then wire the Function to call `/api/tx` after `/api/subscribers` succeeds.
- [ ] **30-day study plan PDF** lead magnet — generate client-side via `window.print()` on `/calculator` results, or attach a pre-built PDF to the welcome email.
- [ ] **Drip sequence content** drafted at `docs/email-drafts/sequence.md` — needs scheduling via Listmonk campaigns (scheduling pattern TBD: cron job on droplet querying `subscribed_at` windows, OR a scheduled CF Worker).

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
