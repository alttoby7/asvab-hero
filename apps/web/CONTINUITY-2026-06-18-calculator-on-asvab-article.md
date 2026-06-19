# "Can You Use a Calculator on the ASVAB?" Article + UX + Skill Fixes — CONTINUITY (2026-06-18)

## What shipped

New SEO explainer published and deployed (CF Pages auto-deploy from `main`), then UX-hardened, given a generated hero, and two infra/skill bugs fixed.

**Live:** https://asvabhero.com/can-you-use-a-calculator-on-the-asvab
**Page:** `apps/web/src/app/can-you-use-a-calculator-on-the-asvab/page.tsx`
**Sitemap:** added route in `apps/web/scripts/generate-sitemap.mjs` (priority 0.8).

### 1. The article (`/asvab-post-writer` skill, full pipeline)
- ~2,400-word explainer. Answer-first ("No") for AEO/snippet extraction.
- **Differentiator = the official primary source no competitor used:** OPA (Office of People Analytics) Executive Note 2025-191, "The Use of Calculators on the ASVAB" (officialasvab.com PDF). Confirms current policy = no, AND that OPA recommended NO change in 2026; quote used verbatim: "if an applicant does not qualify by taking the ASVAB without a calculator, he or she may still not qualify when taking the ASVAB with a calculator."
- White-space gaps owned vs the 3 competitors (UnionTestPrep / ASVAB Practice Test Online / ASVAB Advantage): IEP/504 accommodations reality (MEPS ADA exemption vs school CEP), what's provided test-day, AR/MK question counts + per-question pace, 7 mental-math tactics, and the "ASVAB calculator = AFQT score tool" disambiguation routing to `/calculator`.
- Internal links: `/calculator` (×4), `/afqt-score`, `/practice-test`, `/asvab-math-tips`, `/asvab-arithmetic-reasoning-tips`, `/how-many-questions-on-the-asvab`, `/how-to-study-for-the-asvab`. Article + FAQPage JSON-LD, 8-Q FAQ.
- Working artifacts: `/home/trisha/google-drive/0-AI/asvab-hero/articles/can-you-use-a-calculator-on-the-asvab-2026-06-18/` (brief/research/outline/drafts/meta/publish-record).

### 2. Best-in-class UX pass (after a fresh subagent audit)
- Added **VerifiedBlock** trust/source block under H1 (cites the OPA note, "Last verified: June 2026").
- Bolder above-fold "No" answer.
- 7 mental-math tactics → **numbered accent cards** (were 7 grey paragraphs = a mobile wall).
- "Why banned" 3 reasons → cards.
- Cramped 5-column timing table → clean **3-column AR/MK pivot** (CAT vs Paper, per-question time in accent); fixes mobile crush.
- High-intent disambiguation section → a real **styled CTA box** to `/calculator` (was plain text at ~69% depth).

### 3. Hero image (gpt-image-2 via `/gpt-image`)
- Looked at Google reference imagery (MEPS testing room, pencil + scratch paper, no calculator), synthesized a photoreal hero: focused test-taker working math by hand, no calculator, navy palette.
- Saved `apps/web/public/images/generated/asvab-can-you-use-a-calculator-on-the-asvab-hero.jpg`, rendered as a plain `<img>` figure under H1 (caption: "scratch paper and a pencil are the only math aids you get" — NO "Illustration" label, per owner pref).

### 4. Bug fixes
- **Duplicate brand in `<title>`** ("…| ASVAB Hero | ASVAB Hero"): root layout already appends `| ASVAB Hero` via `title.template`, so dropped the redundant suffix from the page's `metadata.title`. Worth auditing other pages for the same double-brand.

## Commits (all on `main`, pushed)
- `bd16a2c` (article page + sitemap, bundled by a repo hook into a concurrent commit)
- `5f21b25` UX pass
- `cc23651` hero image + title fix
- `45fb3d1` remove "Illustration" caption

## Skill / infra changes (outside this repo)
- **Monorepo path migration** in `/asvab-post-writer` (the app moved to `apps/web/`): updated `skill_config.json` (`site_source` → `…/apps/web/`), `SKILL.md`, `references/stages/stage-6-publish.md` (src/app, src/components, scripts, `cd … && npm run build`, deploy git-add), `references/design-system.md` (dvids-image.py). Also fixed `/gpt-image` asvab save path → `…/apps/web/public/images/generated/`.
- **No "Illustration"/"AI-generated" label on generated images** (owner pref): updated `academy-blog-writer` + `dodmerb-blog-writer` `stage-7-visuals.md` to set `credit: null` on AI images. Swept gsaa/dodmerb-app/dodmerb-site published content — ZERO live instances to scrub (the credit was never rendered). Saved auto-memory `feedback-no-illustration-label-on-generated-images`.

## Open / next
- Optional: audit other asvabhero pages for the same `| ASVAB Hero | ASVAB Hero` double-brand title bug.
- Optional best-in-class follow-up considered but not done: none outstanding for this page.
