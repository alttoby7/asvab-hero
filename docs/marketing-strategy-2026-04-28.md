# Marketing Strategy Session — 2026-04-28

Working session on what to build next now that platform v1 + Stripe paywall are live. Decision lean: **Failed-ASVAB Recovery Funnel.**

## Context going in

- 769 questions, 39/39 topics covered, 19/19 AFQT topic study guides shipped, 17 non-AFQT topic guides remain (GS, EI, AS, MC, AO).
- Stripe paywall live in **test mode**. Live-mode flip is a 5-min env-var swap.
- Diagnostic → topic-drill → paywall flow is the conversion path. UpgradeBanner global; MiniDrill gated after first diagnostic.
- GSC reality: zero striking-distance signal for subtest content topics. All ranking queries are tools/calculators/meta. **Study guides are defensive product completeness, not a growth channel.**

## What got modeled into the asvab-post-writer skill

Skill at `.claude/skills/asvab-post-writer/` now has two distinct products:
1. SEO articles (existing — Stage 1–6 pipeline → page.tsx + JSON-LD + sitemap)
2. **Study-guide topic pages (new)** — markdown into `content/study-guides/{subtest}/{topic}.md`, no page.tsx, no sitemap, no Stage 6. Spec includes frontmatter shape, body structure, voice rules, conversion-mechanism note (React layer handles upsell, markdown closer must bridge to "now go practice"), and canonical examples (the 19 AFQT pages).

## 2026 marketing reality — what works for THIS audience

Audience: 16–22, often poor, often first-in-family, often nudged by recruiter or parent. Decision is $9.99/mo vs. free Khan Academy + Mometrix + recruiter PDF.

**Conventional wins (high floor):**
- Score guarantee (30-day refund, gated on engagement + uploaded score sheet)
- Recruiter B2B distribution + recruiter dashboard
- TikTok score-transformation reels
- Reddit/Discord presence (already in plan, not yet executed)
- Flip Stripe to live mode immediately

**Outside-the-box (higher ceiling):**
- Pre-MEPS Cram Bootcamp ($99 done-with-you, urgency pricing)
- **Failed-ASVAB Recovery Funnel** ← leaning here
- Failed-ASVAB drip + paid social (acute pain segment)
- "Adopt a Recruit" 501(c)(3)
- Military spouse ambassador affiliate program
- JROTC institutional licensing
- "Score Your AI" stunt for LLM-citation moat
- Recruiter-neutral branch/MOS counselor (category-defining positioning)

**Considered + rejected:**
- **Score Improvement Insurance** — original outside-the-box pitch, dropped on review. Risks: adverse selection, verification (kids can sandbag the "before"), state insurance regulation exposure, claim-denial Reddit risk, unit economics on thin audience. The de-risked version is just a standard money-back guarantee — same conversion lift, none of the new risk vectors.

## Decision lean: Failed-ASVAB Recovery Funnel

**Why it wins:**
- Acute pain. Failed kids have a 30-day retake clock and are motivated.
- Demonstrated buying intent. They've already proven they care enough to test.
- Tight targeting on FB/IG ads possible: "bombed your ASVAB," "ASVAB retake tips," r/asvab/r/army "I failed" threads.
- Concrete offer is easy to write: $49 "Beat the Retake — 30-day track." Or pivot to free trial + $9.99/mo Pro.
- Conversion will outperform cold acquisition because the buyer is pre-qualified by the failure event.
- Doubles as content authority — "ASVAB Retake Strategy" content exists and ranks (`asvab retake policy 2026` already pos 5.8 on GSC).

**Open questions before building:**
1. Standalone $49 30-day track, or framed as Pro subscription with "retake guarantee"?
2. Landing page lives at `/asvab-retake-recovery/` or as upgrade path from existing `/asvab-retake-policy/`?
3. Drip content: what's the daily curriculum for 30 days that maps to 769-question bank?
4. Paid acquisition: FB/IG creative angle? "I failed my ASVAB at 27. Here's how I hit 65 in 30 days." UGC or founder-fronted?
5. Score-sheet upload for verification (proves failure, qualifies for entry)?
6. Reddit go-to-market: organic helpfulness in failed-ASVAB threads → DM with link, or pure paid social only?

**Sequencing:**
- Pre-req: Stripe live-mode flip (blocker — currently zero revenue capable)
- Pre-req: pick offer architecture (standalone vs. Pro variant)
- Then: landing page + ad creative + email drip + retake-specific drill plan
- Then: paid social test sprint (~$1k–$2k budget to get signal)

## Adjacent moves to NOT do this sprint

- Writing the remaining 17 non-AFQT study guides (defensive, low ROI, hand to a slower track)
- Generic SEO articles without a tool or unique data behind them
- Launching brand work, podcast, etc. before revenue mechanics are proven

## What's actually next

1. Flip Stripe to live mode (5 min)
2. Add baseline score guarantee on existing Pro page (2–4 hrs)
3. Decide retake-funnel offer architecture
4. Build retake landing page + 30-day drill plan
5. First paid social test sprint
