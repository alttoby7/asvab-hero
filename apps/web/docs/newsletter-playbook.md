# ASVAB Hero — Monthly Newsletter Playbook

Reference for the **monthly newsletter** to the whole Listmonk list (list 3,
"ASVAB Hero — Study Plan"). This is the day-90+ evergreen re-engagement layer
that keeps dormant leads warm after the fixed signup drip (days 2–90) ends.

**Draft, don't auto-send.** The monthly scheduled task creates the campaign in
Listmonk as a **draft** and notifies Trisha. A human reviews and hits send in
the Listmonk admin UI. Never set campaign status to `running`/`scheduled` from
automation.

## Voice (match the drip exactly)
- Plain, tactical, second person. Teach something real before any ask.
- Short sentences. Specific numbers and job codes over adjectives.
- **No em dashes (—).** Use periods or commas. Firm brand rule.
- Sign `Trish, ASVAB Hero`.
- No hype ("unlock your potential"), no fake urgency.
- Facts must be accurate: AFQT = AR + MK + WK + PC (WK/PC verbal weighted); GT
  (Army) = AR + WK + PC; CAT-ASVAB is adaptive (no skipping, no going back);
  retake rules 1mo / 1mo / 6mo; a 20+ point jump can trigger a DoD Confirmation
  Test. When unsure of a specific bonus/job code, stay general.

## Structure (evergreen, ~250–400 words)
1. One-line hook.
2. **A "question people get wrong" mini-teaser** — pose 1–2 tricky ASVAB
   questions, then the reasoning + answer. Rotate subtest each month
   (AR → WK → PC → MK → GS/EI/AS/MC/AO).
3. **One high-ASVAB job spotlight** — a job most recruits never hear about, its
   required score, why it's worth it.
4. **Soft** Pass CTA at the end only (orange button →
   `https://asvabhero.com/upgrade?from=newsletter`). Lead with the one-time
   **90-Day Pass $59** (nothing to cancel, no auto-renew); secondary line
   "Prefer month-to-month? It's $24.99/month." Calculator stays free forever.

Seed example (structure + voice to adapt, do not resend verbatim):
`apps/web/docs/newsletter-seed.html`.

## HTML skeleton
Reuse the drip email skeleton (600px, system font stack, orange `#f97316`
button, grey unsubscribe footer). Unsubscribe href:
`https://list.asvabhero.com/subscription/6cfd6a05-8ac2-498b-86ca-9bb381e1d006/{{ .Subscriber.UUID }}`
Greeting: `{{ .Subscriber.FirstName | default "there" }},`

## Create the draft campaign (Listmonk API)
Creds live in central `.env` (`ASVAB_LISTMONK_API_USER`, `ASVAB_LISTMONK_API_TOKEN`).
Listmonk requires a **browser User-Agent** (it 403s `Python-urllib`/default curl).

```bash
set -a && . /home/trisha/google-drive/0-AI/.env && set +a
curl -s -A "Mozilla/5.0" -u "$ASVAB_LISTMONK_API_USER:$ASVAB_LISTMONK_API_TOKEN" \
  -X POST https://list.asvabhero.com/api/campaigns \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Monthly Newsletter — <Month YYYY>",
    "subject": "<subject line>",
    "lists": [3],
    "type": "regular",
    "content_type": "html",
    "from_email": "ASVAB Hero <info@asvabhero.com>",
    "body": "<full HTML>"
  }'
```
New campaigns default to **draft** status (not sent). Confirm with
`GET /api/campaigns?per_page=3` that status is `draft`, then notify Trisha to
review + send in the admin UI (https://list.asvabhero.com/admin).

## Notes
- Excluded from the fixed drip: `trial-start` / `paid` sources. The newsletter
  goes to the WHOLE list (payers get pure value; the Pass CTA is soft and at the
  end, so it doesn't misfire on existing customers).
- If sends ever push monthly volume past the Resend free tier (~3k/mo), see
  `email-infrastructure.md`.
