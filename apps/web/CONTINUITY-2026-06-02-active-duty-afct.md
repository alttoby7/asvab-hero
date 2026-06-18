# Continuity — Active-Duty / AFCT Opportunity Assessment (2026-06-02)

**Question that started it:** "Are we missing opportunities by not targeting active duty for ASVAB Hero?"
**Answer:** No big *organic* opportunity (already built + ranking, demand is tiny). A narrow *product wedge* is real but unproven on volume. **YELLOW light** for a cheap, sharpened play on existing pages — NOT a green light to invest. Memory: `project-asvab-active-duty-afct-recon.md`.

---

## What we already have (it's built — this is NOT a "build it" gap)
Full active-duty stack exists, indexed, partly ranking:
- `/afct` + `/afct-practice-test` (own `AfctPracticeClient.tsx`)
- `/bsep` — genuinely strong Army GT-improvement page (BSEP raises GT 19–23 pts, per-installation, AFCT scheduling)
- `/gt-score`, `/gt-score-requirements`, `/asvab-retake-policy`, `/how-to-retake-the-asvab`
- Logic: `src/lib/retake.ts`, `src/lib/trajectory/gt-target-mode.ts`

## The data (why it's not an organic opportunity)
- **Keyword (Ahrefs):** `afct` 300 vol (half-polluted by a TX business), `afct practice test` 60, `afct study guide` 40. Real seam = "can i retake the asvab while enlisted/active duty" cluster ~800–1k/mo total, **KD~0 but CPC $4–5** (high intent, tiny volume).
- **GSC:** all pages indexed + healthy (FAQ rich results). `/afct`=2 junk impressions/90d, `/afct-practice-test`+`/bsep`=0, `/how-to-retake`=89 impressions pos ~5 but for *enlistment* retake, 0 clicks.
- **GA4 (LIVE prop = `404444165`; `404444162` is the dupe):** whole AD stack ~64 users / **~21 per month**, 90d.
  - `/afct-practice-test` = **21 key events on 27 sessions** → product fits perfectly, ~0 traffic (18 users/90d).
  - `/gt-score` = most AD traffic (31 users) but **0 key events = funnels no one**.
  - `/bsep` = 2 users/90d.
- **Read:** people who FIND it convert; almost nobody finds it (not on Google for this).

## Rob Kirkland recon (Navy + Marine SD bases, reported 2026-06-02 — CLOSED)
- Prep is **"all online"** at small bases (Camp Pendleton has an in-person instructor = big-base exception). No captive classroom product to partner into.
- **Use case confirmed + narrow:** Navy = re-rating (specialty change), not promotion. Marines = reclassification + enlisted→officer commissioning. Army = emphasizes it MOST, likely GT-for-promotion (matches `/bsep`/`/gt-score`).
- **Access = the product wedge:** gov prep gated behind **.mil email + DS logon**, test needs **CO approval**, **limited test sites (mostly recruiting stations)**, materials "may not be that great." → a civilian phone-first no-.mil tool you can start immediately while waiting on approval/seat is differentiated.
- **Cutoff scores** (line-score minimums per rating/MOS) exist in DoD self-service but counselor won't share. Rob can chase "over the next month."
- **No demand sizing.** Use case real, volume unproven. Rob hedged heavily.
- Verdict update: education-center *partnership* thesis mostly DISCONFIRMED; product *wedge* confirmed; discovery/demand problem unchanged.

---

## NEXT ACTIONS (priority order)
1. ⭐ **Cutoff scores via Rob** — get the gated line-score minimums per rating/MOS → publish the only good public "AFCT line scores by rating/MOS" resource = searchable asset + powers goal-based study ("need 50 GT for this rating → here's your plan"). Highest-value thread from the whole recon.
2. **Two cheap funnel fixes (uncontingent):**
   - `/gt-score` leaks 100% — add the converting `/afct-practice-test` CTA/gate (it's the highest-traffic AD page).
   - `/bsep` dead-ends in FAQs — wire it into the `/afct-practice-test` funnel.
3. **Cheap reposition** existing AD pages to confirmed angles: re-rating / enlisted→officer commissioning / Army-GT + "no .mil needed, better than the gated free stuff."
4. **Optional near-term:** use Rob's DS logon to SEE the gov materials (confirm mediocre = competitive intel, ~0 cost).
5. **SEPTEMBER 2026 free checkpoint** — Rob's stepson returns to Fort Lewis (Army ed center) + McChord AFB (AF ed center) → firsthand Army+AF intel; Army = most promising branch. Stepson may register a .mil account to access gov sites for Trish.
6. Rob discusses more **Thursday ~2026-06-04**.

## Do NOT
- Build a separate active-duty product or brand (organic demand doesn't support it).
- Pursue education-center partnerships (centers gate everything, route online, won't recommend outside tools).
- Expand active-duty SEO/content for its own sake (low ceiling; already placed).
