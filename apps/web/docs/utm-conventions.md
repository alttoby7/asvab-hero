# ASVAB Hero — UTM tagging conventions

Tag every link you control in an **owned** channel so conversions stop falling
into the "direct/unknown" bucket. UTMs land in `first_utm_source` /
`first_utm_medium` / `first_utm_campaign` on the profile (migration 0051),
captured first-touch by `src/lib/attribution.ts` and synced to the Winning
dashboard. Untagged owned links are invisible — they read as direct/referral.

## The standard

Append to any owned link to `https://asvabhero.com/<path>`:

```
?utm_source=<where>&utm_medium=<type>&utm_campaign=<what>
```

Rules:
- **lowercase**, hyphen-separated, no spaces. Be consistent — `utm_source=email`
  forever, never `Email` / `e-mail` / `newsletter`.
- `utm_source` = the specific platform/property (`listmonk`, `youtube`, `reddit`,
  `amazon-book`, `instagram`, `x`, `tiktok`).
- `utm_medium` = the channel type (`email`, `social`, `qr`, `cpc`, `bio`, `book`).
- `utm_campaign` = the specific push (`trial-drip-d2`, `launch`, `book-backmatter`).
- Don't tag links **inside your own site** (internal nav) — only external entry points.

## Ready-to-paste tagged URLs

| Channel | Use on | Tagged URL |
|---|---|---|
| Listmonk drip email | every CTA link in `asvab_drip_trial.py` etc. | `https://asvabhero.com/?utm_source=listmonk&utm_medium=email&utm_campaign=trial-drip` |
| Listmonk broadcast | one-off campaigns | `https://asvabhero.com/pricing?utm_source=listmonk&utm_medium=email&utm_campaign=<campaign>` |
| KDP book back-matter | "ASVAB Math, Explained" QR/link | `https://asvabhero.com/?utm_source=amazon-book&utm_medium=book&utm_campaign=back-matter` |
| YouTube | video description / pinned comment | `https://asvabhero.com/?utm_source=youtube&utm_medium=social&utm_campaign=<video-slug>` |
| Reddit | helpful comments / posts | `https://asvabhero.com/free-asvab-practice-test?utm_source=reddit&utm_medium=social&utm_campaign=<thread>` |
| Instagram / TikTok bio | link-in-bio | `https://asvabhero.com/?utm_source=instagram&utm_medium=bio&utm_campaign=profile` |
| Paid ads (if run) | ad destination | `https://asvabhero.com/?utm_source=<platform>&utm_medium=cpc&utm_campaign=<adset>` |

Builder: https://ga-dev-tools.google/campaign-url-builder/ (or just append by hand).

## Why this matters here

ASVAB Hero is AI-traffic heavy, and AI/app referrers are often **stripped** — so
untagged AI and email traffic both collapse into "direct." UTMs are the only way
to make *owned* channels attributable. For *earned/unowned* sources you can't tag
(word-of-mouth, "ChatGPT recommended you"), rely on the signup **"How did you hear
about us?"** self-report and the GA4 AI-channel reconciliation panel instead.

## ⛔ Owner action — tag the live email scripts

The Listmonk drip/broadcast send scripts (`apps/web/scripts/asvab_drip_trial.py`,
`asvab_reconcile.py`, the `test-date-emails` / mistake-reminder edge functions)
run on the droplet via cron. Their CTA links are currently **untagged**. Append
`?utm_source=listmonk&utm_medium=email&utm_campaign=<name>` to each CTA URL and
redeploy the cron scripts. Left as an owner action because editing live send
scripts + redeploying the cron is outside a safe unattended change.
