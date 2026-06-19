# ASVAB Hero — Social Channel Strategy (June 2026)

**TL;DR:** Don't think in 8 separate channels. Build **one short-form content engine** (TikTok-led, mirrored to Reels + YouTube Shorts) pointed at **one ungated calculator/score→jobs hub**, powered by a **volume creator machine** of vetted veteran/student creators. That is the ignition. **YouTube long-form + SEO** is the compounding moat that winning short-form hooks feed into. **Paid = search intent** (Apple Search Ads + Google), never paid social to minors. B2B (counselor/JROTC) is a parallel backlink + authority play via GAIN, not a near-term traffic engine.

> Source prompt: Greg Isenberg × George Lampropoulos (WrestleAI) podcast, *"How a TJ Maxx Cashier Built a $200K App With AI"* (`youtube.com/watch?v=LYomocq6Dpo`, Jun 2026). Research: 8 parallel channel deep-dives + competitor recon + `/codex` (gpt-5.4) adversarial review.

---

## 1. Why this doc exists (the situation)

- **Social traffic is ~zero.** Last 90 days: **Organic Social = 3 sessions** (all m.facebook.com) out of ~5,200 total. (GA4 prop `404444165`.)
- The site runs almost entirely on **Organic Search (~62%)**. SEO is the moat; **distribution/traffic is the bottleneck** — not product, not price. (~280 study-intent visits/mo today; ~7,000/mo needed for $100k ARR.)
- The `youtube.com/@asvabhero` and `tiktok.com/@asvabhero` handles exist **only in JSON-LD `sameAs`** (`SiteJsonLd.tsx`) — dormant, zero output. No IG/X/Reddit/Discord. Share buttons are copy/SMS/email/print only (`ShareActions.tsx`).
- **The mobile app is ~60% built** (`apps/mobile`, bundle `com.asvabhero.app`, Apple/Google sign-in, deep link `asvabhero://`), not yet in stores. This makes George's app-launch playbook *timely*, but ASVAB Hero is a **utility/study product**, not a lifestyle consumer app — which changes how the playbook applies.
- Audience: **16–20yo enlistment candidates, JROTC cadets, retakers** — a near-perfect short-form demographic, but **heavily minors**, which guts paid-social targeting (see §6).

---

## 2. What "George's playbook" actually is — and how much transfers

George's WrestleAI GTM: **IG page as centerpiece** (warm cold viewers → App Store bio link + social proof to recruit creators) → **creator/influencer marketing as primary distribution** (reverse-engineer the FYP, DM at volume via a ~$800/mo VA, pay ~$2 CPM / test-then-pay / equity) → **short-form UGC** → **Meta paid ads only after traction** → all gated by a **5-second "gotcha feature."**

| George's lever | Transfer to ASVAB Hero? | Why |
|---|---|---|
| **Creator machine** (volume outreach, simple brief, test hooks, cheap deals) | ✅ **Keep — this is his real edge** | The #miltok / ASVAB niche is a *vacuum*: no dominant branded operator, abundant cheap micro-creators. This is the ignition. |
| **5-second gotcha feature** | ✅ **Keep** | ASVAB Hero already has it: the AFQT calculator + "score → jobs" data. Make it the universal hub (§4). |
| **Short-form UGC** | ✅ **Keep** | Audience lives here; proven hook formats exist (§5). |
| **IG page as the centerpiece / social-proof hub** | ⚠️ **Discount** | This niche is *utility-driven, not status/lifestyle-driven*. The page is a mirror + trust layer, not the engine. Content gravity is **TikTok + YouTube**, not IG. |
| **Meta paid ads to scale** | ❌ **Mostly doesn't apply** | Under-18 targeting is gutted (age+geo only) — kills the "test creatives, scale winners off audience signals" loop. Paid belongs in **search**, not social (§6). |
| **~$2 CPM creator deals** | ⚠️ **Adapt** | Works, but **screen out active-duty/recruiters (DoD-barred from commercial endorsement)** and require **FTC disclosure** on a teen-heavy audience. |

**Net:** George is *right* about the creator machine + gotcha + short-form; *over-indexed* on IG-as-centerpiece and paid social for this specific niche.

---

## 3. The core reframe (post-`/codex`)

1. **One content engine, not three channels.** TikTok, IG Reels, and YouTube Shorts are *one* production line. Shoot once, cross-post everywhere. Don't staff them separately.
2. **Short-form ignites; YouTube long-form + SEO compounds.** At ~0 traffic you need cheap at-bats and fast hook iteration — that's short-form. Long-form YouTube is a *moat*, not an ignition source; build it from the 2–3 hooks that prove out, don't lead with it.
3. **The calculator/score→jobs hub is the highest-leverage single asset.** It is simultaneously the 5-second gotcha, the SEO asset, the creator CTA, the email-capture point, and the paid-search landing page. Everything points here.
4. **Distribution > everything for the next 90 days.** Defer anything that's retention (Discord), authority-only (Reddit ads, LinkedIn), or slow/seasonal (full B2B) until the engine is lit.

---

## 4. ⭐ The single highest-leverage move: the ungated Hub

Build/sharpen **one ungated, mobile-first "What does your ASVAB score get you?" calculator + score→jobs page** — no login wall — as the destination every clip, creator, ad, and email points to.

- It's the **gotcha** (type 4 line scores → instant AFQT + job eligibility in 5 seconds).
- It's the **SEO asset** (matches the existing search moat: "ASVAB score for [job/branch]", "AFQT calculator").
- It's the **creator CTA** ("calculate yours — link in bio").
- It's the **email/Pro on-ramp** (free value first; monetize the $59 pass / $14.99 mo *after* the hook, never at first click).
- It's the **paid-search landing page** (Apple Search Ads / Google).

ASVAB Hero already owns the calculator as its core product — the work is a clean, fast, shareable, ungated, share-button-equipped version optimized as the universal funnel floor.

---

## 5. Ranked channels (effort × payoff × audience-fit)

### Tier 1 — Ignition (start now)
| Rank | Channel | Rating | Role |
|---|---|---|---|
| 1 | **Short-form video engine** (TikTok lead → Reels + Shorts mirror) | **HIGH** | Primary acquisition. Dense ICP, niche vacuum, proven hooks. |
| 2 | **Creator machine** (vetted veteran/student micro-creators) | **HIGH** | Amplifier on the engine; George's real edge. |

### Tier 2 — Compounding moat (parallel, slower payoff)
| Rank | Channel | Rating | Role |
|---|---|---|---|
| 3 | **YouTube long-form** (evergreen, search-native) | **HIGH (long-term)** | Built from winning short-form hooks; reuse question bank + study guides + app screen-recordings; reinforces Google rankings. |
| 4 | **B2B counselor/ASVAB-CEP + JROTC** (one free ungated resource asset) | **MED-HIGH** | Backlinks (fixes DR≈0) + seasonal funnel; door-opener via sister co **GAIN/ROTC Consulting**. Not a fast traffic engine. |

### Tier 3 — Supporting / later
| Rank | Channel | Rating | Role |
|---|---|---|---|
| 5 | **Paid search** (Apple Search Ads + Google Search on "ASVAB") | **MED-HIGH (at app launch)** | The *real* paid play — intent-based, immune to minor-targeting limits. ASA CPI ~$1.80. |
| 6 | **Reddit** (organic value + tiny calculator-hook ad test) | **MEDIUM** | r/Militaryfaq (~70k), r/newtothenavy (~71k). Lead with the *free calculator*, never the paywall; promotion is ban-prone. |
| 7 | **Discord** (customer-only, as 90-day-Pass perk) | **MEDIUM (retention/LTV)** | Externalizes the daily-study-loop; attacks churn. Not acquisition. Don't launch until it can be staffed. |

### Deprioritize
| Channel | Call |
|---|---|
| **Instagram as standalone acquisition** | It's the **mirror + trust layer** inside the engine (valuable in a scam-ridden niche), not its own bet. |
| **Paid social to minors** (Meta/TikTok/Reddit perf) | Gutted by under-18 targeting limits. Snapchat *later*, awareness-only, for the 18+ slice. |
| **X (Twitter)** | Wrong audience for consumers. Optional **founder build-in-public** account only (network upside, not signups). |
| **LinkedIn (consumer)** | Wrong. Use it *only* as the **B2B outreach tool** to JROTC SAIs/SASIs + CTE directors (free manual pilot). |

---

## 6. Compliance & policy guardrails (read before posting a single thing)

- **Frame as EDUCATION / test-prep, always — never military recruitment or glorification.** "Pass a standardized test / unlock career options," not "join the military." This clears ad policy on every platform and keeps you out of weapons/combat-content flags. ASVAB Hero is an exam-prep brand; lean into it.
- **Under-18 paid targeting is gutted** on Meta, TikTok, Google, and Reddit (age + geo only; Reddit can't target under-18 at all). Don't try to performance-target 16–17yo on social. Target **18–20** (much of the ICP turns 18 around enlistment) + parents, and put paid budget in **search** instead.
- **Creators: screen out active-duty members and recruiters** — the Joint Ethics Regulation (DoD 5500.07-R) bars them from endorsing commercial products. Use **veterans, civilians, and aspiring-recruit/student creators.**
- **FTC disclosure is mandatory** on all sponsored creator content — non-negotiable, and it matters more with a teen-heavy audience.
- **TikTok app-store bio links require a Business account** — set one up day one; route via a link-in-bio that branches to free web hub / App Store / $59 pass.

---

## 7. The "gotcha" short-form hooks (with compliance edits)

Ranked by proven pull in competitor recon, **edited for trust/compliance**:

1. **"Your score → these jobs" reveal** — pick an AFQT/line score, show what it unlocks per branch. ⚠️ Caveat on-screen: *eligibility varies by branch, line scores, openings, and medical/background.* (U.S. Military Test Prep's entire moat; direct showcase of the hub.)
2. **Live AFQT calculation / "rate my score"** — type 4 line scores → live percentile + verdict. Unique to ASVAB Hero; perfect for duet/stitch "calculate mine" UGC.
3. **"Can you pass this ASVAB-style question?" speed-challenge** — countdown + answer reveal. ⚠️ Use **original practice questions** — the ASVAB is **not** publicly released; **never claim "real ASVAB question."** (ColfaxMath 109K, JodywithaWhy 221K validate the format.)
4. **Myth-bust — softened.** Use *"What recruiters don't explain about your ASVAB score"* / *"the adaptive-test myth"* / *"AFQT vs line scores"*, **not** "your recruiter is lying" (high attention, low trust, ad-review trouble). Authority without the accusation. (David Pere's myth-bust format hit 257–312K.)
5. **Transformation — "I went from 32 to 87, here's the plan"** — anchor the daily-study-loop product as the mechanism; works creator-led and as student-testimonial UGC. (Military Journeymen 101K; "how I got a 99" 199K.)

Reassurance angle ("pass the ASVAB even if you're 'not a test person'", 230K) over-indexes with the anxious 16–20 audience — weave it into hooks #3 and #4.

**Competitor landscape for reference:** YouTube is consolidated (Grammar Hero `@GrammarHero` ~934K-view evergreen videos; U.S. Military Test Prep owns score→jobs; ColfaxMath owns math). Short-form (TikTok/IG) is a **near-vacuum — no dominant branded ASVAB operator** — which is the opening. Incumbent prep brands (Mometrix, Kaplan, Trivium) cede the audience to individual creators/affiliates.

---

## 8. 90-day sequenced plan

**Phase 0 — Foundation (Week 1–2)**
- Ship the **ungated calculator/score→jobs hub** (§4) with share buttons + UTM + email capture; this is the gate to everything else.
- Stand up the **TikTok Business account** (+ IG, + activate dormant `@asvabhero` YouTube) + a link-in-bio branching to free hub / App Store (when live) / $59 pass.
- Write the **content + compliance brief** (hooks §5, framing §6) — the reusable creator/VA SOP.

**Phase 1 — Light the engine (Week 2–8)**
- Post the **one content engine** at 4–5×/week: shoot once → TikTok + Reels + Shorts. Test the 5 hooks; double down on the 2–3 that pull saves/sends/comments + hub clicks.
- Start the **creator machine**: build an ICP-tailored feed, DM vetted veteran/student micro-creators at volume (hand to a VA once volume justifies it), gifted-access + small flat / test-then-pay deals with FTC disclosure.
- Run a **small Reddit-ads test** ($15–20/day) on r/Militaryfaq + r/newtothenavy with the *free calculator* hook (clean, rules-safe), plus one genuinely-helpful human account.

**Phase 2 — Compound + monetize (Week 8–13)**
- Port the winning hooks into **YouTube long-form** ("ASVAB Practice Test 2026 — N Questions Explained," screen-recorded inside the app), then clip back into Shorts. One production feeds both moat + discovery.
- **App launch → turn on paid search**: Apple Search Ads on "ASVAB / ASVAB practice test / AFQT" + Google Search to the web hub. This is the first paid dollar.
- Ship the **free counselor/instructor resource asset** (embeddable calculator + printable "ASVAB at a glance / your CEP score → careers" handout) and run **GAIN-channel outreach** to counselors, LibGuide owners, and JROTC SAIs/SASIs for resource-page inclusion + free cadet class-codes. Message everywhere: *"The ASVAB you take counts — don't walk in cold."*
- (Optional, only if staffable) open a **customer-only Discord** as a 90-Day-Pass perk to test a churn delta.

**What success looks like by day 90:** a repeatable engine producing 2–3 proven hooks; first non-zero, attributable social → hub → signup flow in GA4 (vs. today's 3 sessions/90d); a handful of active creator partners; ASA/Google search live at app launch; the free counselor asset earning the first real referring domains.

---

## 9. Sources
- Transcript & video: `youtube.com/watch?v=LYomocq6Dpo` (DataForSEO subtitles).
- Baseline: GA4 property `404444165` (90-day channel/source report).
- Competitor recon: DataForSEO YouTube SERP (live, US) + web. Adversarial review: `/codex` gpt-5.4.
- Per-channel research briefs (full citations in conversation): Gen-Z platform usage, Meta/TikTok/Google teen ad limits, FTC disclosure guidance, DoD JER 5500.07-R, ASVAB CEP, Reddit/Discord communities, Apple Search Ads / CPI benchmarks.
