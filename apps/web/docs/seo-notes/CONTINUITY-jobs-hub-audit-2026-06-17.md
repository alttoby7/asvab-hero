# Jobs-by-score hub — branch dataset audits + hub ships (CONTINUITY)

**Last worked:** 2026-06-17. **Branch:** `feat/marines-jobs-hub` (off `origin/main`).
**Worktree:** `/tmp/asvab-marines-hub` (symlinked node_modules; may be GC'd — recreate
with `git worktree add /tmp/asvab-marines-hub feat/marines-jobs-hub` + symlink node_modules).
**Program:** jobs-by-score hub (one data-driven `JobScoreTable` "ASVAB score chart" per
branch). Navy shipped (`/navy-ratings-list`, on main). Army = PR #18 (`feat/army-jobs-hub`,
not merged — its `JobScoreTable.tsx`/`job-hubs.ts`/army page/reconcile artifacts live there;
**but `JobScoreTable.tsx` + `job-hubs.ts` + `navyHub` are ALSO on main from the Navy ship**, which
is why Marines could build off main). Memory: `project-asvabhero-seo-growth-2026-06.md`.

Order: Navy ✅ → Army (PR#18) → **Marines (this branch)** → Coast Guard → Space Force → **Air Force LAST**.
Audit each dataset BEFORE its hub ships (a featured chart amplifies bad data; HCU-sensitive site).

---

## ✅ DONE — Marines (committed + pushed to PR #22)

**PR #22** (`feat/marines-jobs-hub` → main). Two commits:
- `1e6e852` — **data audit** of all 129 USMC MOS in `marines-jobs.json` (8 fixes, 0 removed).
  Also fixes the live `/marines-asvab-calculator` (same dataset). Artifacts:
  `scripts/reconcile-marines-jobs.py`, `scripts/marines-audit-reference.json`,
  `docs/seo-notes/urls/usmc-mos-list.md`.
  - Structural finding: dataset used only GT/MM/EL, never CL/ST. Fixes: 3043 GT100→**CL105**,
    6046 EL100→**CL100**, 7041 GT100→**CL100**; 0311/0331/0341 GT80→**GT90**; 2621 GT110→**GT100**;
    7314 GT110→**GT105**. ST absence verified-correct. 6 AND-pairs (0481/1142/2171/2651/6276/6694)
    genuine, kept. minAFQT=32-for-all correct (uniform USMC floor).
- `672a6d4` — **hub shipped**: `/usmc-mos-list` rebuilt from 1,360-line hand page (which had
  FABRICATED MOS 0681/1751/2611/2821/5812/0111/6072/6153/6174/6214 + wrong CL formula) into the
  ~430-line data-driven `JobScoreTable` hub. Added `marinesHub` to `job-hubs.ts`. Formulas =
  ASVAB Hero canonical: GT=VE+AR, CL=VE+AR+MK, EL=GS+AR+MK+EI, MM=AR+EI+MC+AS, ST=GS+VE+MK+MC.
  Verified: tsc clean, build green, 129 rows, 2651 renders "GT 110+ · EL 110+".

### ⚠️ PICKUP #1 — MERGE PR #22 (BLOCKED, needs owner action)
Owner said "ship those now" but the auto-mode **classifier BLOCKED the merge** (merging→main
auto-deploys to prod; the hub was previously gated to 2026-06-28, so consent was deemed
ambiguous). **Action: owner merges PR #22 themselves, OR explicitly authorizes the merge** next
session. Everything is built/verified/pushed — only the merge is pending.
`gh pr merge 22 --squash` once authorized.

---

## 🔵 IN PROGRESS — remaining dataset audits (NOT applied yet)

Same method as Marines: parallel research agents verify composite letter + min vs
operationmilitarykids + military.com + afspecialty.com + AFECD/MCO/COMDTINST. Then write a
`reconcile-<branch>-jobs.py` + `<branch>-audit-reference.json`, apply, build-verify, log.

### ✅ Coast Guard audit DONE (findings below) — NOT YET APPLIED to `coast-guard-jobs.json`
22 ratings. Composites are subtest-SUM strings (e.g. "VE+AR"≥101). Agent verified vs
GO Coast Guard/military.com/operationmilitarykids/Mometrix/GAO. **Apply these:**
- **AFQT floor 32 is CORRECT — do NOT raise.** USCG cut 36→32 in Nov 2023 (COMDTINST 1100.2I,
  GAO-25-107224). Add GED tier = 50 to page copy.
- **MK (Machinery Tech): AND → OR.** Currently `AR+MC+AS≥150 AND VE+AR≥106`; it's an OR/alternative
  → make it `anyOf:[{AR+MC+AS,150},{VE+AR,106}]`. **(primary fix)**
- **ET**: add alternative `OR AFQT≥66` (currently just MK+EI+GS≥171; also has AR≥52 sub-floor). Optional.
- **AVI (Avionics Electrical Tech): DUPLICATE of AET** (not a separate current rating, same 171) →
  merge/remove AVI or flag.
- **IS (Intelligence Specialist)**: official tables say N/A (lateral/competitive select); the
  VE+AR 100 is unconfirmed (one source). Consider null/"verify with recruiter" OR keep+flag.
- **AST**: source conflict — VE+MC+AS 162 (+AFQT65) vs VE+AR 100. Kept 162 (stronger); flag low.
- All other sums verified CORRECT. IV (Investigator) BLANK = correct (CGIS lateral).
- NOTE: CG hub LIST route does NOT exist — `/coast-guard-...` only has calculator+score pages.
  Building the CG hub needs a NEW route + sitemap entry + `cgHub` (scoreSystem "cg-composite").

### ❌ Space Force audit — NOT RUN (interrupted). 26 AFSCs, MAGE (M/A/G/E), minAFQT 36.
### ❌ Air Force audit — NOT RUN (interrupted). 155 AFSCs, MAGE, minAFQT 36. Split into 4 slices
(Ops+SpecOps+Space+Intel 42 / Maintenance 35 / Comms+Eng+Log+Trans+Sec 41 / Admin+Medical+Finance 37).
**AF is LAST + most careful** — where a MAGE min is genuinely unpublished, leave blank → "verify
with recruiter", do NOT invent. (In practice most AFSC MAGE mins ARE published on afspecialty.com.)
The exact per-slice listings (code + current value + title) were generated this session — regenerate
with the python one-liner over `air-force-jobs.json`/`space-force-jobs.json` grouped by category.

**MAGE = M(echanical) / A(dministrative) / G(eneral) / E(lectronic).** SF/AF AND-pairs are common
and often genuine (e.g. RPA 1U0X1 G64 AND E54) — verify each, don't blindly collapse.

### PICKUP #2 — resume audits
1. Re-dispatch SF + 4 AF agents (prompts were composed this session; same shape as the CG agent).
2. Apply CG fixes (MK→OR at minimum) → `reconcile-coast-guard-jobs.py` + reference + log.
3. Apply SF + AF fixes once agents return.
4. Build-verify (tsc + npm run build), commit to this branch (or a fresh one per branch), push.
5. CG/SF hubs need NEW list routes (don't exist); AF list = `/air-force-afsc-list` (exists),
   Marines `/usmc-mos-list` (done), Army `/army-mos-list` (PR#18). Hubs gated to 2026-06-28 GSC
   recheck of Army+Navy unless owner overrides (as they did for Marines).

---

## Reference — composite formulas
- **USMC line scores:** GT=VE+AR, CL=VE+AR+MK, EL=GS+AR+MK+EI, MM=AR+EI+MC+AS, ST=GS+VE+MK+MC. AFQT floor 32/50.
- **Coast Guard:** subtest-SUM minimums per rating (no named composites). AFQT floor **32**/50 (post-Nov-2023).
- **Space Force / Air Force MAGE:** M/A/G/E aptitude areas, per-AFSC minimums. AFQT floor 36/50.
- **Data shape:** `requirements:[{composite,minScore},...]` = AND (rendered "·"); `anyOf:[...]` = OR
  (rendered "or"); empty = "See recruiter". `JobScoreTable` + `hubScoreStats` are branch-agnostic.
