# Listmonk Deploy — Day-7 Pro Upgrade Template

> **STATUS: DEPLOYED 2026-05-20.** Template created as **id 17** ("ASVAB Hero — Drip Day 7 (Pro upgrade)"). `DRIP_SCHEDULE` on the droplet (`/root/scripts/asvab_drip.py`) updated to `{2: 7, 5: 8, 7: 17, 10: 9, 14: 10}` (backup saved alongside). Dry-run verified day-7 fires (template 17). The daily 14:30 UTC cron now sends it; a backlog of week-old free subscribers will receive it on the next runs. Steps below are the original procedure, kept for reference.

## Step 1: Upload the template via API

Run from any machine with access to the Listmonk API credentials (stored in the central `.env` as `ASVAB_LISTMONK_API_USER` and `ASVAB_LISTMONK_API_TOKEN`):

```bash
source /home/trisha/google-drive/0-AI/.env

curl -s -X POST "https://list.asvabhero.com/api/templates" \
  -u "${ASVAB_LISTMONK_API_USER}:${ASVAB_LISTMONK_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @- <<'EOF'
{
  "name": "ASVAB Hero — Drip Day 7 (Pro upgrade)",
  "subject": "{{ .Subscriber.FirstName | default \"Hey\" }}, ready to fix the gaps?",
  "type": "tx",
  "body": "$(cat /home/trisha/dev/asvab-hero/docs/listmonk-template-pro-upgrade-day7.html | python3 -c 'import sys,json; print(json.dumps(sys.stdin.read()))')"
}
EOF
```

> **Easier method:** log in to https://list.asvabhero.com, go to Templates → New template, set type to **Transactional**, paste the HTML from `docs/listmonk-template-pro-upgrade-day7.html`, and save. Note the template ID shown after save.

## Step 2: Note the new template ID

The API response looks like:
```json
{"data": {"id": 11, "name": "ASVAB Hero — Drip Day 7 (Pro upgrade)", ...}}
```

Note the `id` value (example: `11`).

## Step 3: Add day-7 entry to the drip cron script

On the droplet (`ssh root@64.23.194.109`), edit `/root/scripts/asvab_drip.py`:

Find the `DRIP_SCHEDULE` dict (currently `{2: 7, 5: 8, 10: 9, 14: 10}`) and add the day-7 entry:

**Current:**
```python
DRIP_SCHEDULE = {2: 7, 5: 8, 10: 9, 14: 10}
```

**Updated (replace `<NEW_TEMPLATE_ID>` with the ID from step 2):**
```python
DRIP_SCHEDULE = {2: 7, 5: 8, 7: <NEW_TEMPLATE_ID>, 10: 9, 14: 10}
```

Example with template ID 11:
```python
DRIP_SCHEDULE = {2: 7, 5: 8, 7: 11, 10: 9, 14: 10}
```

## Step 4: Verify the cron

```bash
# On the droplet — confirm cron still fires at 14:30 UTC
crontab -l | grep asvab_drip

# Test a dry run (prints what would send, no actual emails)
python3 /root/scripts/asvab_drip.py --dry-run 2>&1 | head -40
```

## Notes

- This email goes to **all Listmonk list 3 subscribers** regardless of whether they have a Supabase account — that's intentional. Non-account subscribers from the lead-capture funnel can still click through to `/upgrade` and convert.
- Subject line uses the Listmonk template function `{{ .Subscriber.FirstName | default "Hey" }}` — this must live in the Listmonk template subject field, not the HTML body.
- The `{{ .Subscriber.UUID }}` token in the unsubscribe URL is rendered by Listmonk at send time.
