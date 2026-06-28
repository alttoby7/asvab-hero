# CONTINUITY — Phone/remote access to ASVAB Hero + subscriber data (2026-06-01)

**Goal:** Trisha wants to work ASVAB Hero from her phone (not tied to the workstation) and "talk to it about subscribers / email subs."

## ✅ Done today (on claude.ai/code, Trisha's Max account)

1. **GitHub connector** — `alttoby7/asvab-hero` connected + selectable for cloud sessions. (Repo lives on GitHub; nothing code-side is local-only.)
2. **Supabase connector** (official, from the Directory) — full OAuth granted to **`info@asvabhero.com's Org`**, project **`abypyprvgvofzrtifgzi`**.
   - Owner chose the FULL connector (read+write+delete+secrets) for now; **plans to scope down to read-only later** (do it at the tool-permission level, or re-add as a read-only custom connector — no OAuth redo needed).
   - **Tool permissions set:** Read-only tools (18) = **Always allow**; **Execute SQL = Always allow** (so phone subscriber queries don't prompt); all other Write/delete tools (Create/Delete/Pause/Restore project, Deploy Edge Function, Apply migration, branch ops) = **Needs approval**.
3. **Verified end-to-end** with a live read-only query (ran with zero prompts).

## What the live query found (subscriber/email data)

- Stack = Next.js 15 + Supabase (auth + Postgres) + Stripe. **No Bento.**
- In **Supabase**, `profiles` is the single source of truth for email contacts (only table with an `email` column; 29 tables total; no separate leads/subscribers table). Paid vs free = distinguished by columns (`stripe_subscription_id`, `billing_status`, `pro_tier`, `signup_source`).
- Snapshot: **31 profiles, all 31 have email, 6 paid, 25 free/leads.**
- DB shows only **1** `marketing_opt_in = true`, BUT owner's rule = **everyone who completes the funnel is opted in** → marketable list = all signups. ⚠️ The DB flag underreports this → the funnel may not be persisting `marketing_opt_in`. **Check whether the funnel writes that column** before relying on it to filter sends.

## ⭐ The real email-subscriber list = LISTMONK (separate from Supabase)

- Self-hosted **Listmonk** at **https://list.asvabhero.com/admin** on DO droplet **64.23.194.109** (shares the box with Caddy/n8n). List = "ASVAB Hero — Study Plan". Sending via Resend SMTP → Amazon SES.
- The signup **funnel pushes subscribers into Listmonk**: `EmailCapture.tsx` → CF Worker → `POST /api/public/subscription` on list.asvabhero.com. See `functions/api/signup.ts` and `docs/email-infrastructure.md`.
- Creds in central `.env`: `ASVAB_LISTMONK_URL`, `ASVAB_LISTMONK_API_USER` / `ASVAB_LISTMONK_API_TOKEN` (`claude-automation`, Super Admin), `ASVAB_RESEND_API_KEY`.
- **The Supabase connector does NOT reach Listmonk**, and there's **no Listmonk connector** in the claude.ai directory.

## ⏭️ Pick up tomorrow (2026-06-02)

1. **Make the Listmonk list phone-accessible.** Options:
   - **Quick/no-build:** just log into `list.asvabhero.com/admin` from the phone browser to eyeball counts. (Works today.)
   - **Claude-queryable from phone (the real ask):** build a small **custom MCP server or CF-Worker proxy** over the Listmonk REST API (`/api/subscribers`, `/api/lists`), host it, then add it as a **custom connector** in claude.ai → Connectors. Then phone-Claude can answer "how many email subs, growth this week, by list," etc.
   - Decide which list(s)/scope to expose; keep it read-only.
2. **Funnel opt-in check:** confirm the signup funnel persists `marketing_opt_in` to Supabase `profiles` (only 1 row true vs owner's "all funnel signups opt in"). Fix if it's a dropped write.
3. **(Optional) Scope the Supabase connector to read-only** once comfortable.
4. Install the **Claude mobile app**, sign in with the same account → web sessions sync to phone.

Durable summary saved to memory: `project-asvabhero-remote-access`.
