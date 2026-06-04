# Continuity — Outreach Trust Pass + Counselor PDF (pick up 2026-05-26)

Pickup doc for the next session. **Phase 1 trust pass is LIVE on asvabhero.com.
Outreach is paused, gated on Phase 2 (Counselor Quick-Start Pack PDF) +
Phase 3 (rewrite drafts to pitch the PDF + calculator).**

Source of truth:
- Master plan: `~/.claude/plans/snug-giggling-lantern.md`
- Project memory: `~/.claude/projects/-home-trisha-google-drive-0-AI/memory/project-asvabhero-beat-competitor-2026-05.md`
- Outreach tool: `~/dev/asvab-outreach/` (README has the pipeline; data/prospects.csv + data/outreach_drafts.csv are populated)
- Codex audit + punch list session id: `019e6209-3d23-7c53-8a1b-d7d0a5eff7c7` (continue via `/codex` with `continue_session: true`)

## What's done (live, 2026-05-25)

WS1 + WS6 + WS7 already shipped earlier in the day. Today's work was the
pre-outreach trust pass (commits `74b1c4e`, `65000a9`). Concretely:

- **CAT-ASVAB facts** — `src/data/subtest-metadata.ts` matches official:
  `GS 15/12, AR 15/55, WK 15/9, PC 10/27, MK 15/31, EI 15/10, AS 20/13, MC 15/22, AO 15/18` (135 scored). Cascades to `/full-length-asvab-practice-test` and `/free-asvab-practice-test/[subtest]`.
- **Unsupported claims gone** — "within 5–8 points," "within 5–10 points," "calibrated difficulty" replaced with "practice estimate, not an official score" language on /free-asvab-practice-test(s) and the [subtest] pages.
- **`VerifiedBlock`** (Sources + Last verified May 2026) added to the 4 pitched pages: `/calculator`, `/free-asvab-practice-tests`, `/free-asvab-practice-test`, `/full-length-asvab-practice-test`. Component lives at `src/components/VerifiedBlock.tsx`.
- **Branch minimum fixes** (15 places, 7 files): Air Force `36 → 31` (matches airforce.com), Coast Guard `40 → 32` (Nov 2023 lowering), Marines `31-32 → 32`. Also fixed the GED-gap math on `/asvab-score-chart` (29 → 34 point gap).
- **`/full-length-asvab-practice-test`** repositioned as a format guide (H1: "Full-Length ASVAB Practice Test: Format and How to Prepare"). Pro-gated sim called out above the fold.
- **`/free-asvab-practice-tests` TL;DR demoted** — leads with official ASVAB sample questions + March2Success + UnionTestPrep; ASVAB Hero listed last with publisher disclosure.
- **`/about`** gained an **Editorial Standards** section (primary sources, AFQT methodology = PAY97, re-verification policy, corrections inbox `editors@asvabhero.com`).
- Em-dash guard still passes site-wide (`node scripts/check-no-emdash.mjs`).

Build is clean (`npm run build` exit 0). Deployed via push to `main` → Cloudflare auto-build.

## Tomorrow — Phase 2: Build the Counselor Quick-Start Pack PDF

This is the biggest single remaining piece. **Without it, the outreach campaign
isn't ready.** It's the asset Codex specifically said school counselors /
librarians / JROTC instructors will actually link to.

### Deliverable
- New public page `src/app/counselor-resources/page.tsx` (wrapper that explains the pack, links the PDF, lists sources, says "no signup")
- The PDF itself at `public/counselor-quick-start-pack.pdf`
- Source HTML at `scripts/counselor-quick-start-pack.html` + build script `scripts/build-counselor-quick-start-pack.sh` (puppeteer/wkhtmltopdf or Chrome headless to PDF)

### Visual rules
Plain typography, quiet colors, footnoted sources, page footer with version date.
**No** email gate, **no** ranking language, **no** product screenshots on page 1.
Looks like an institutional handout, not a startup landing page.

### 10 sections, in order (Codex spec, each with the official source to cite)

| # | Section | Source to cite |
|---|---|---|
| 1 | Cover page (title, who it's for, update date, no-affiliation disclaimer) | officialasvab.com + service sites |
| 2 | What the ASVAB is (one-page overview, purpose, where used) | https://www.officialasvab.com/applicants/fact-sheet/ |
| 3 | Enlistment testing vs school testing (MEPS/MET vs CEP — separate them clearly) | https://www.officialasvab.com/applicants/locations/ + https://www.officialasvab.com/counselors-educators/asvab-career-exploration-program/ |
| 4 | Test formats at a glance (CAT-ASVAB, paper, PiCAT — what's timed, what's not) | https://www.officialasvab.com/applicants/cat-asvab/ + https://www.officialasvab.com/applicants/fact-sheet/ + https://www.officialasvab.com/recruiters/picat/ |
| 5 | Subtests and what each measures (counselor-friendly table) | https://www.officialasvab.com/counselors-educators/subtests/ |
| 6 | How scores work (standard scores vs AFQT vs composites + AFQT categories) | https://www.officialasvab.com/applicants/scores/ |
| 7 | Current branch entry notes — **use only publicly published current numbers; otherwise say "confirm with recruiter"** | goarmy.com/how-to-join/steps/asvab, marines.com/become-a-marine/requirements/general.html, airforce.com/asvab, gocoastguard.com/get-started, navy.com/joining/requirements, spaceforce.com/how-to-join/enlisted-guardians |
| 8 | Official prep resources (lead with these; our calculator listed as additional, not "recommended") | https://www.officialasvab.com/applicants/asvab-test-preparation-disclaimer/ + https://www.officialasvab.com/applicants/sample-questions/ + https://www.officialasvab.com/counselors-educators/preparing-for-the-asvab/ + https://www.march2success.com |
| 9 | Suggested counselor workflow ("hasn't tested yet," "has scores already," "wants career matching" — each with right official links + our /calculator) | same as 8 + our `/calculator` |
| 10 | Source appendix (full URLs + last-verified dates) | — |

### Implementation sketch
- Write the HTML in `scripts/counselor-quick-start-pack.html` (Tailwind-free, plain CSS, print-friendly).
- Build with Chrome headless: `google-chrome --headless --disable-gpu --print-to-pdf=public/counselor-quick-start-pack.pdf scripts/counselor-quick-start-pack.html` (or puppeteer if available). Wrap in `scripts/build-counselor-quick-start-pack.sh`.
- Add `/counselor-resources` route + a `<a href="/counselor-quick-start-pack.pdf">` link with description.
- Add both to `scripts/generate-sitemap.mjs` (priority 0.9 for the wrapper) and `public/llms.txt`.
- Re-run em-dash guard + build.

## Then Phase 3: Update outreach drafts to pitch the PDF + calculator

In `~/dev/asvab-outreach/`:

1. Update `config.py` `LINKABLE_ASSETS` — replace the practice-tests-first list with:
   - **Counselor Quick-Start Pack PDF** at `https://asvabhero.com/counselor-resources` (primary asset)
   - **AFQT & line-score calculator** at `https://asvabhero.com/calculator` (secondary)
   - Drop the per-subtest pages and `/full-length` from the asset list (Codex: not ready for this round).

2. Update `personalize.py` prompt to pitch the PDF as the lead asset. Codex drafted the new email template — use this verbatim or close to it:

   **Subject:** `Free ASVAB counselor quick-start PDF`

   **Body (3 sentences):**
   > I put together a free ASVAB Counselor Quick-Start Pack that pulls the official test structure, score basics, and current branch-entry links into one printable PDF, plus a free ASVAB score calculator for students who already have scores. If it looks useful for your ASVAB or military-career resources page, the resource page is https://asvabhero.com/counselor-resources and the calculator is https://asvabhero.com/calculator. If it is not a fit, no worries at all.

3. Re-run `personalize.py --min-score 6` to regenerate drafts (will overwrite the old practice-test pitches for status=enriched prospects; drafted ones need their status reset to enriched first, OR just rebuild from scratch). Simpler: clear `data/outreach_drafts.csv` and reset `status=drafted` rows back to `enriched`, then re-personalize.

4. Re-run `render_review.py --per-day 8` to produce a fresh review file.

5. Send manually from `trish@asvabhero.com` (decision deferred — see "Sending identity" below).

## Open decisions / external dependencies

- **Sending identity for trish@asvabhero.com** — we never finalized this. Options on the table:
  1. **Google Workspace** ($6/mo) — real mailbox, reliable avatar, best deliverability. Switch MX to Google.
  2. **Cloudflare Email Routing + Gmail "Send mail as"** — $0, but DMARC alignment fails (DKIM signs with gmail.com, our DMARC is `p=quarantine`), and a "via gmail.com" tag often shows.
  3. **Zoho Mail free** — real mailbox at $0; same Gmail send-as caveats; switches MX to Zoho.
  4. **Hostinger email** — ~$33/yr, no clear advantage over Zoho free.
  
  **Recommendation:** Workspace if outreach is sustained (closes the DR-0 gap is worth $72/yr). Cloudflare + send-as if just doing the one batch as a test. Decide before sending.

- **Manual Pro smoke of `/app/practice?variant=full_sim`** — full_sim is verified `active=true` in prod (test_variants table), but a logged-in Pro end-to-end run (134 questions, AFQT + line scores) hasn't been done. Worth doing once.

- **IndexNow** — key live, ~94 URLs submitted; new pages (including the new /counselor-resources after Phase 2 ships) should be re-pinged via `npm run indexnow` after deploy.

- **Bing Webmaster Tools** — still not configured (optional; not a blocker).

## Outreach pool snapshot (don't lose this)

`~/dev/asvab-outreach/data/prospects.csv`:
- 135 prospects total (DataForSEO SERP harvest from footprint queries on 2026-05-25)
- 50 with emails extracted (37% hit rate, normal for cold)
- 19 high-value (score ≥ 8): .edu libraries, .gov state ed agencies (tea.texas.gov, nysed.gov), army.mil JROTC (usarmyjrotc.army.mil), school career centers
- Top emails captured include `usarmy.knox.usacc.mbx.hq-jrotc-...@army.mil` and `asvab@tea.texas.gov` — both extremely high-value link targets

## Don't repeat these mistakes
- **Don't run `npm run build` while `npm run dev` is also running.** They share `.next/`; the dev server's chunks get corrupted (HTTP 500 ENOENT). Stop dev first.
- **Don't blast outreach without the trust pass** — Codex was emphatic. Phase 1 is now done; don't skip Phase 2 either.
- **Don't use Resend for cold outreach.** Their AUP prohibits it; account suspension would break ASVAB Hero's transactional email.
- **The faceless-persona memory was retired** ([[feedback-asvabhero-faceless-persona]] updated): public site authorship is org-level (ASVAB Hero Editorial Team), no fake individual. Private 1:1 outreach can sign as "Trish" since it's her real address (`trish@asvabhero.com`).
- **WIP files in the tree that must NOT be committed** (still untracked): `docs/seo-notes/`, `src/lib/calculator-links.ts`, `CONTINUITY-2026-05-24-conversion-geo-af.md`, plus this file. `git add -u` keeps them out automatically; an explicit `git add` would sweep them in.
