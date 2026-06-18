# ASVAB Hero — Cold Outreach Deliverability

Rules for the manual link-building / partnership outreach (school counselors,
library LibGuides, JROTC instructors). This is a **human, low-volume,
relationship-based** channel and must be kept separate from the automated
lead/drip stack documented in [`email-infrastructure.md`](./email-infrastructure.md).

The outreach **content** (target list, email templates, SOP) lives in Google
Drive: `outreach-kit-2026-05-20.md`. This doc is only about **deliverability**.

## Why this matters: the domain's DMARC is strict + quarantine

Live DNS (verified 2026-06):

```
_dmarc.asvabhero.com  →  v=DMARC1; p=quarantine; pct=100; adkim=s; aspf=s; rua=mailto:trish@asvabhero.com
```

`p=quarantine` means mail that **fails DMARC goes to spam**. `adkim=s` + `aspf=s`
(strict alignment) means a send only passes if its DKIM signature **and/or** SPF
return-path is on the **exact** root domain `asvabhero.com` (not a subdomain, not
a vendor domain). This protects the brand, but it makes the channel unforgiving.

## ✅ Approved method: send manually from Google Workspace

Send personalized outreach from a real Google Workspace mailbox
(`info@asvabhero.com` or `trish@asvabhero.com`):

- **SPF** passes — the root SPF is `v=spf1 include:_spf.google.com ~all`, and the
  envelope is `@asvabhero.com`, so it aligns **strictly**.
- **DKIM** passes — Workspace signs with `google._domainkey.asvabhero.com`
  (`d=asvabhero.com`), so it aligns **strictly**.
- Result: **DMARC PASS, fully aligned.** These land in the inbox.

### Volume + cadence
- **≤ 8–10 personalized emails per week** from a single mailbox (matches the
  outreach-kit SOP). Every email names the recipient's specific page and one
  real detail from it.
- One follow-up only, 7–10 days later. No third email.
- Do **not** bulk-blast. Volume spikes from a Workspace mailbox trip spam
  heuristics and risk the same domain reputation your customer mail rides on.

## ❌ Hard rule: no third-party cold-email tools on the root domain

Do **not** route cold/personalized outreach through Instantly, Smartlead,
Lemlist, Mailshake, Apollo sequences, Woodpecker, etc. **on `asvabhero.com`.**
Those tools send from their own IPs and return-paths, so:

1. Under `aspf=s`/`adkim=s` they will **not** be strictly aligned unless you add
   their DKIM CNAME with `d=asvabhero.com` — and even then SPF won't align.
2. Anything misaligned → **DMARC fail → quarantine** (because `p=quarantine`).
3. Their spam complaints + bounces **poison the root-domain reputation** that
   the drip, welcome, and trial-reminder mail (and Workspace inbox) all depend on.

## If you outgrow manual sending

Use a **dedicated subdomain** (e.g. `outreach.asvabhero.com` or
`mail.asvabhero.com`) with its **own** SPF, DKIM, DMARC, and IP warmup, and point
the cold-email tool there. This isolates reputation so the root domain's
`p=quarantine` and customer mail stay protected. **Never relax the root
`p=quarantine` policy** to make a tool work.

## Monitoring

DMARC aggregate reports go to `rua=mailto:trish@asvabhero.com`. Review them
(raw XML, or feed them into a free reader like dmarcian / Postmark DMARC) to
confirm outreach is passing and to catch any unexpected sending source before it
becomes a deliverability problem.

## Operator actions (NOT in this repo)

These cannot be done from the codebase:

- **DNS:** create/verify any outreach subdomain (SPF/DKIM/DMARC) if scaling.
- **CF Email Routing teardown:** confirm whether legacy CF routing rules
  (`info@ → trish@dach.family`, `*@` catch-all) still exist now that Workspace
  owns MX, and remove them if so (see `email-infrastructure.md`).
- **DMARC monitoring:** ongoing review of the `rua` reports.
- **Google Workspace:** mailbox config, signatures, send-as for `info@`/`trish@`.
