import type { Metadata } from "next";
import Link from "next/link";
import BrandHero from "@/components/BrandHero";
import GapToGoalRail from "@/components/GapToGoalRail";
import TestimonialWall from "@/components/TestimonialWall";
import HomePopularLinks from "@/components/HomePopularLinks";
import JsonLd from "@/components/JsonLd";
import { QUESTIONS_PLUS, TOPIC_COUNT, SUBTEST_COUNT } from "@/lib/bank-stats";
import { homepageFeatured } from "@/lib/calculator-links";
import { RECRUITS_PER_MONTH, SCORE_CHECKS_PER_MONTH } from "@/data/social-proof";
import HomePlanCTA from "@/components/HomePlanCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const HOME_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What math is on the ASVAB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Two subtests: Arithmetic Reasoning (AR) — 16 word problems in 39 minutes (about 2.5 minutes each), covering ratios, percentages, distance-rate-time, and unit conversions. Mathematics Knowledge (MK) — 16 direct math problems in 20 minutes (75 seconds each), split roughly 55% algebra and 45% geometry. No calculator is allowed on either section, and no formula sheet is provided. Both feed directly into your AFQT: AFQT = 2VE + AR + MK.",
      },
    },
    {
      "@type": "Question",
      name: "How is the AFQT score calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AFQT = 2VE + AR + MK. VE (Verbal Expression) is derived from Word Knowledge and Paragraph Comprehension. AR is Arithmetic Reasoning. MK is Mathematics Knowledge. The raw score is converted to a percentile (1-99) using the 1997 PAY97 norming table. Math (AR + MK) controls half the formula, so improving either math subtest directly raises your enlistment eligibility score.",
      },
    },
    {
      "@type": "Question",
      name: "Can you use a calculator on the ASVAB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Calculators are not allowed on any ASVAB section. You receive scratch paper for working out problems by hand. This applies to both the CAT-ASVAB at MEPS and the paper-and-pencil version. All arithmetic, including fractions, percentages, and geometry calculations, must be done mentally or on scratch paper.",
      },
    },
    {
      "@type": "Question",
      name: "How long should I study for the ASVAB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Three to six weeks of structured daily practice (30-60 minutes) typically yields a 10 to 20 point AFQT improvement. The Army's Academic Skills Development Program documented an average 17-point AFQT increase in just 3 weeks of structured study, with one case going from 38 to 72 AFQT. Focus on your weakest subtests first for the fastest gains.",
      },
    },
  ],
};

// Entity anchor for search + AI engines: who we are (Organization) and what the
// product is (WebApplication / SoftwareApplication with its free + paid offers).
const HOME_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://asvabhero.com/#organization",
      name: "ASVAB Hero",
      url: "https://asvabhero.com",
      logo: "https://asvabhero.com/og-image.png",
      description:
        "Free, adaptive ASVAB test-prep app: a free diagnostic with estimated AFQT, free score calculators, 500+ job matches, and a daily adaptive practice loop built on evidence-based learning science.",
    },
    {
      "@type": "WebApplication",
      "@id": "https://asvabhero.com/#webapp",
      name: "ASVAB Hero",
      url: "https://asvabhero.com",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any (web)",
      browserRequirements: "Requires a modern web browser",
      publisher: { "@id": "https://asvabhero.com/#organization" },
      description:
        "Free ASVAB diagnostic and calculators plus a daily adaptive practice loop. Free account includes your saved score report, weakest-topic map, spaced Mistake Bank, and a daily adaptive block. Pro adds unlimited practice, full-length timed simulations, and deeper analytics.",
      offers: [
        {
          "@type": "Offer",
          name: "Free",
          price: "0",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          name: "90-Day Test Pass",
          price: "59.00",
          priceCurrency: "USD",
          url: "https://asvabhero.com/pricing",
        },
        {
          "@type": "Offer",
          name: "Pro (monthly)",
          price: "24.99",
          priceCurrency: "USD",
          url: "https://asvabhero.com/pricing",
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: "Free ASVAB Score Calculator 2026: AFQT, GT & Line Scores (All Branches)",
  description:
    "Free ASVAB score calculator for Army, Navy, Air Force, Marines, Coast Guard & Space Force. Get your AFQT percentile, GT score, and line scores instantly — see every job you qualify for.",
  alternates: {
    canonical: "https://asvabhero.com",
  },
};

const PLAN_HREF = "/signup?next=%2Fapp%2Fplan";

export default function HomePage() {
  return (
    <div>
      <JsonLd data={HOME_SCHEMA} />
      <JsonLd data={HOME_FAQ_SCHEMA} />

      {/* ───────────────────────────────────────────────────────────────────
         HERO, calculator-led. The homepage ranks for "asvab calculator" intent,
         so the primary action is the calculator (the tool the visitor came for);
         the diagnostic is the secondary path for "no scores yet". H1 + metadata
         unchanged for SEO.
      ──────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(249,115,22,0.10),_transparent_60%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-24">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
              <span className="text-accent">&#9679;</span> Free ASVAB prep platform
            </p>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              ASVAB calculator for{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-accent">every branch</span>
                <span className="absolute inset-x-0 bottom-1 -z-0 h-2 bg-accent/15" />
              </span>
              <br className="hidden sm:block" />{" "}
              AFQT, GT &amp; line scores.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              Army, Navy, Air Force, Marines, Coast Guard, Space Force, plug in
              your subtest scores and see every job you qualify for. No scores
              yet? Take the 30-question diagnostic to estimate your AFQT first.
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                href="/calculator"
                className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-7 py-4 text-base font-semibold text-white shadow-[0_8px_30px_-4px_rgba(249,115,22,0.4)] transition-all hover:bg-accent-hover hover:shadow-[0_12px_40px_-4px_rgba(249,115,22,0.6)] no-underline sm:w-auto"
              >
                Use the free score calculator
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
            <p className="mt-4 text-sm text-text-secondary">
              <HomePlanCTA variant="hero" />
            </p>
            <div id="hero-cta-sentinel" />
            <p className="mt-4 py-2 text-sm text-text-secondary">
              No scores yet?{" "}
              <Link
                href="/practice-test"
                className="font-semibold text-accent no-underline transition-colors hover:text-accent-hover"
              >
                Take the 30-question diagnostic &rarr;
              </Link>
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-wider text-text-tertiary">
              30 questions · 36 minutes · no signup required
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-4xl">
            <BrandHero
              src="/images/generated/asvab-home-hero.png"
              alt="A future US military recruit studying for the ASVAB at her kitchen table, practice book open, calculator and pencil in hand, focused on the work."
              width={1536}
              height={1024}
              priority
              className="overflow-hidden rounded-2xl border border-navy-border shadow-2xl shadow-black/40"
            />
          </div>
        </div>
      </section>

      {/* Proof strip — quiet trust signal between hero and the conversion story */}
      <div className="border-t border-navy-border/50 py-5">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 sm:gap-x-10">
          <span className="font-mono text-xs tracking-wide text-text-tertiary">
            <span className="font-semibold text-text-secondary">{RECRUITS_PER_MONTH.toLocaleString()}+</span> recruits this month
          </span>
          <span className="hidden text-text-tertiary/40 sm:inline">&middot;</span>
          <span className="font-mono text-xs tracking-wide text-text-tertiary">
            <span className="font-semibold text-text-secondary">{SCORE_CHECKS_PER_MONTH.toLocaleString()}+</span> score checks
          </span>
          <span className="hidden text-text-tertiary/40 sm:inline">&middot;</span>
          <span className="font-mono text-xs tracking-wide text-text-tertiary">
            <span className="font-semibold text-text-secondary">{QUESTIONS_PLUS}</span> practice questions
          </span>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────
         CLOSE THE GAP + FREE PLAN, the single primary conversion. Merges the
         pain band with the animated Gap-to-Goal Rail so the promise and its proof
         sit together, ending on ONE ask: start the free plan.
      ──────────────────────────────────────────────────────────────────── */}
      <section className="border-t border-navy-border bg-navy-light/40">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            <span className="text-accent">&#9679;</span> Close doesn&apos;t qualify
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-4xl">
            You&apos;re short for the job you want, and most apps just show you
            that, then upsell you.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary">
            ASVAB Hero turns &ldquo;you&apos;re short by X for the job you
            want&rdquo; into a <span className="text-text-primary">free daily plan</span>{" "}
            that targets the exact subtests most likely to move your score, built
            on the methods cognitive science shows actually work, not the
            rereading most apps sell.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              {
                t: "One adaptive block a day",
                d: "The app picks the right question at the right difficulty across your four AFQT subtests. Free.",
              },
              {
                t: "Your misses come back",
                d: "Every question you miss is saved and resurfaced on a spaced schedule until you own it. Free.",
              },
              {
                t: "A plan, not a pile",
                d: "A weekly routine aimed at your test date, exactly what to do today. Free.",
              },
            ].map((f) => (
              <div
                key={f.t}
                className="rounded-2xl border border-navy-border bg-navy p-5"
              >
                <h3 className="font-display text-base font-bold text-text-primary">
                  {f.t}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                  {f.d}
                </p>
              </div>
            ))}
          </div>

          {/* Animated proof of the loop: the gap closing in ~8 seconds. */}
          <div className="mt-12">
            <div className="mb-6 text-center">
              <h3 className="font-display text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
                Watch the gap close.
              </h3>
              <p className="mt-3 text-base text-text-secondary">
                Diagnose, clear your misses, do one adaptive block, repeat.
                Here&apos;s what it does to your score.
              </p>
            </div>
            <GapToGoalRail />
          </div>

          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <Link
              href={PLAN_HREF}
              className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-7 py-4 text-base font-semibold text-white shadow-[0_8px_30px_-4px_rgba(249,115,22,0.4)] transition-all hover:bg-accent-hover hover:shadow-[0_12px_40px_-4px_rgba(249,115,22,0.6)] no-underline sm:w-auto"
            >
              Start my free plan
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <p className="font-mono text-xs uppercase tracking-wider text-text-tertiary">
              Free account · no card · the score-moving core is free
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
         PROOF STACK, one credibility section: the evidence (learning science),
         the bank numbers, and social proof. Earns the signup ask above.
      ──────────────────────────────────────────────────────────────────── */}
      <section className="border-y border-navy-border bg-navy-light/30">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
              <span className="text-accent">&#9679;</span> Why it works
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
              Built on the methods research proves raise scores.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
              Retrieval practice, spaced repetition, and interleaving, the methods
              cognitive science proves raise scores, not the rereading most apps
              rely on.
            </p>
            <Link
              href="/the-science"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent no-underline transition-colors hover:text-accent-hover"
            >
              See the science
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-navy-border bg-navy-border sm:grid-cols-4">
            {[
              { value: QUESTIONS_PLUS, label: "Tagged questions" },
              { value: String(TOPIC_COUNT), label: "Topic categories" },
              { value: String(SUBTEST_COUNT), label: "ASVAB subtests" },
              { value: "1 to 5", label: "Difficulty levels" },
            ].map((s) => (
              <div key={s.label} className="bg-navy px-6 py-10 text-center">
                <div className="font-mono text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
                  {s.value}
                </div>
                <div className="mt-3 text-xs uppercase tracking-widest text-text-tertiary">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-text-secondary">
            Every topic has items at every difficulty. Every question has a written
            explanation. PAY97 norming table for AFQT, same calibration the DoD uses.
          </p>
        </div>
      </section>

      <TestimonialWall />

      {/* ───────────────────────────────────────────────────────────────────
         FREE VS PRO, compact explainer. The action stays the free plan; Pro is a
         quiet "when you're ready" with a small compare-plans link, not a pitch.
      ──────────────────────────────────────────────────────────────────── */}
      <section className="border-t border-navy-border">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
              <span className="text-accent">&#9679;</span> Free vs Pro
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-4xl">
              Free raises your score.{" "}
              <span className="text-accent">Pro removes every limit.</span>
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
              <h3 className="font-display text-base font-bold text-text-primary">
                Free, no card
              </h3>
              <ul className="mt-4 space-y-2.5">
                {[
                  "Daily adaptive AFQT block",
                  "Mistake Bank with spaced review",
                  "Weekly plan aimed at your test date",
                  "Diagnostic + every score calculator",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-text-secondary">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-accent/30 bg-navy-light p-6 sm:p-8">
              <h3 className="font-display text-base font-bold text-text-primary">
                Pro, when you&apos;re ready
              </h3>
              <ul className="mt-4 space-y-2.5">
                {[
                  "Unlimited adaptive practice + subtest drills",
                  "Full-length timed simulations",
                  "Score history + deeper analytics",
                  "Spaced-repetition flashcards",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-text-secondary">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-text-tertiary">
                <span className="font-semibold text-text-secondary">90-Day Pass $59</span>{" "}
                one-time, or $24.99 / month.{" "}
                <Link
                  href="/pricing"
                  className="font-semibold text-accent no-underline transition-colors hover:text-accent-hover"
                >
                  Compare plans &rarr;
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <Link
              href={PLAN_HREF}
              className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-7 py-4 text-base font-semibold text-white shadow-[0_8px_30px_-4px_rgba(249,115,22,0.4)] transition-all hover:bg-accent-hover hover:shadow-[0_12px_40px_-4px_rgba(249,115,22,0.6)] no-underline sm:w-auto"
            >
              Start my free plan
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <p className="font-mono text-xs uppercase tracking-wider text-text-tertiary">
              Money-back guarantee on Pro · the 90-Day Pass has nothing to cancel
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
         BROWSE, the product pillars + the calculator-cluster SEO links, placed
         AFTER the conversion story so internal links help ranking without
         competing with the primary CTA.
      ──────────────────────────────────────────────────────────────────── */}
      <section className="border-t border-navy-border bg-navy-light/30">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
              <span className="text-accent">&#9679;</span> Browse the tools
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
              Calculator, practice, and study guides.
            </h2>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-navy-border bg-navy-border sm:grid-cols-3">
            {[
              {
                stat: "500+",
                label: "military jobs",
                title: "Score Calculator",
                desc: "Plug in your subtest scores. See every job you qualify for across all 6 branches plus your AFQT percentile.",
                href: "/calculator",
                cta: "Open calculator",
              },
              {
                stat: QUESTIONS_PLUS,
                label: "practice questions",
                title: "Practice Tests",
                desc: "Diagnostic plus subtest drills. Per-question explanations on every item. Track weak topics over time.",
                href: "/practice-test",
                cta: "Take a test",
              },
              {
                stat: "39",
                label: "topic study pages",
                title: "Study Guide",
                desc: "Worked examples, formula references, and pitfalls for every topic on the test. Free to read.",
                href: "/asvab-study-guide",
                cta: "Browse topics",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="group relative flex flex-col bg-navy p-8 transition-colors hover:bg-navy-light"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-3xl font-bold text-accent">{pillar.stat}</span>
                  <span className="text-xs uppercase tracking-wider text-text-tertiary">{pillar.label}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-text-primary">{pillar.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">{pillar.desc}</p>
                <Link
                  href={pillar.href}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent no-underline transition-colors hover:text-accent-hover"
                >
                  {pillar.cta}
                  <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          {/* De-cannibalization: exact-match links to dedicated calculator pages
             so Google ranks the spoke, not this hub, for those queries. */}
          <div className="mt-10 rounded-2xl border border-navy-border bg-navy-light/40 p-6 sm:p-8">
            <h3 className="font-display text-base font-bold text-text-primary">
              Jump to a specific calculator
            </h3>
            <div className="mt-4 grid gap-x-8 gap-y-2.5 text-sm sm:grid-cols-2">
              {homepageFeatured().map((calc) => (
                <Link
                  key={calc.href}
                  href={calc.href}
                  className="text-accent no-underline transition-colors hover:text-accent-hover"
                >
                  {calc.label} &rarr;
                </Link>
              ))}
              <Link
                href="/calculator"
                className="font-semibold text-accent no-underline transition-colors hover:text-accent-hover"
              >
                See all calculators &rarr;
              </Link>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-text-secondary">
              New to the scoring? Start with the{" "}
              <Link
                href="/gt-score"
                className="font-semibold text-accent no-underline transition-colors hover:text-accent-hover"
              >
                Army GT score
              </Link>{" "}
              guide, or browse the full{" "}
              <Link
                href="/navy-ratings-list"
                className="font-semibold text-accent no-underline transition-colors hover:text-accent-hover"
              >
                Navy ratings list
              </Link>{" "}
              with required scores.
            </p>
          </div>
          <p className="mt-8 text-center text-sm text-text-secondary">
            Not sure what you&apos;re aiming for?{" "}
            <Link
              href="/asvab-score-requirements"
              className="font-semibold text-accent no-underline transition-colors hover:text-accent-hover"
            >
              See the ASVAB score requirements for every branch &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
         ASVAB QUICK REFERENCE, structured Q&A blocks for AEO/GEO citation.
         Placed after the conversion story so AI-extractable answers live on the
         highest-authority page without competing with primary CTAs.
      ──────────────────────────────────────────────────────────────────── */}
      <section className="border-t border-navy-border">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
              <span className="text-accent">&#9679;</span> Quick reference
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
              ASVAB scoring and math, explained.
            </h2>
          </div>

          <div className="mt-10 space-y-8">
            <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
              <h3 className="font-display text-lg font-bold text-text-primary">
                What math is on the ASVAB?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                Two subtests test math. <strong>Arithmetic Reasoning (AR)</strong> gives
                you 16 word problems in 39 minutes, about 2.5 minutes each, covering
                ratios, percentages, distance-rate-time, and unit conversions.{" "}
                <strong>Mathematics Knowledge (MK)</strong> gives you 16 direct math
                problems in 20 minutes, 75 seconds each, split roughly 55% algebra and
                45% geometry. No calculator is allowed. No formula sheet is provided.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-navy-border">
                      <th className="pb-2 pr-4 text-left font-semibold text-text-secondary" />
                      <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">AR</th>
                      <th className="pb-2 text-left font-semibold text-text-secondary">MK</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-navy-border/50">
                      <td className="py-2 pr-4 font-semibold text-text-primary">Questions</td>
                      <td className="py-2 pr-4 font-mono">16</td>
                      <td className="py-2 font-mono">16</td>
                    </tr>
                    <tr className="border-b border-navy-border/50">
                      <td className="py-2 pr-4 font-semibold text-text-primary">Time</td>
                      <td className="py-2 pr-4 font-mono">39 min (~2.5 min/q)</td>
                      <td className="py-2 font-mono">20 min (~75 sec/q)</td>
                    </tr>
                    <tr className="border-b border-navy-border/50">
                      <td className="py-2 pr-4 font-semibold text-text-primary">Format</td>
                      <td className="py-2 pr-4">Word problems</td>
                      <td className="py-2">Direct math</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-semibold text-text-primary">Top topics</td>
                      <td className="py-2 pr-4">Ratios, D=RT, percentages</td>
                      <td className="py-2">Algebra (~55%), Geometry (~45%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-text-secondary">
                For targeted prep strategies, see our{" "}
                <Link href="/asvab-math-tips" className="font-semibold text-accent no-underline hover:text-accent-hover">
                  ASVAB math tips
                </Link>{" "}
                and{" "}
                <Link href="/asvab-arithmetic-reasoning-tips" className="font-semibold text-accent no-underline hover:text-accent-hover">
                  arithmetic reasoning tips
                </Link>{" "}
                guides.
              </p>
            </div>

            <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
              <h3 className="font-display text-lg font-bold text-text-primary">
                How is the AFQT score calculated?
              </h3>
              <div className="mt-3 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
                AFQT = 2VE + AR + MK
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                VE (Verbal Expression) is derived from Word Knowledge and Paragraph
                Comprehension. AR is Arithmetic Reasoning. MK is Mathematics Knowledge.
                The raw score is converted to a percentile (1-99) using the 1997 PAY97
                norming table. Math (AR + MK) controls half the formula. Every point
                you gain on either math subtest adds one point to your AFQT.
              </p>
              <p className="mt-3 text-sm text-text-secondary">
                The GT composite uses a different formula: <strong>GT = VE + AR</strong>.
                It determines job eligibility, not enlistment eligibility.{" "}
                <Link href="/gt-score-calculator" className="font-semibold text-accent no-underline hover:text-accent-hover">
                  Calculate your GT score &rarr;
                </Link>
              </p>
            </div>

            <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
              <h3 className="font-display text-lg font-bold text-text-primary">
                How long should I study for the ASVAB?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                Three to six weeks of structured daily practice (30-60 minutes)
                typically yields a 10 to 20 point AFQT improvement. The Army&apos;s
                Academic Skills Development Program documented an{" "}
                <strong>average 17-point AFQT increase in 3 weeks</strong> of
                structured study, with one case going from a 38 to a 72 AFQT, a
                34-point gain. Consistency beats intensity: 30 focused minutes daily
                outperforms a weekend cram session.
              </p>
              <p className="mt-3 text-sm text-text-secondary">
                Start with a{" "}
                <Link href="/practice-test" className="font-semibold text-accent no-underline hover:text-accent-hover">
                  free diagnostic test
                </Link>{" "}
                to find your weak spots, then follow the{" "}
                <Link href="/asvab-study-guide" className="font-semibold text-accent no-underline hover:text-accent-hover">
                  study guide
                </Link>{" "}
                to target them.
              </p>
            </div>

            <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
              <h3 className="font-display text-lg font-bold text-text-primary">
                Can you use a calculator on the ASVAB?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                No. Calculators are not allowed on any ASVAB section, including
                Arithmetic Reasoning and Mathematics Knowledge. You receive scratch
                paper for working out problems by hand. This applies to both the
                CAT-ASVAB at MEPS and the paper-and-pencil version. Every formula,
                fraction-decimal conversion, and arithmetic operation must be done
                from memory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer-adjacent SEO link hub. */}
      <HomePopularLinks />

      <StickyMobileCTA />
    </div>
  );
}
