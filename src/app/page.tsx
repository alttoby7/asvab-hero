import type { Metadata } from "next";
import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import BrandHero from "@/components/BrandHero";
import { QUESTIONS_PLUS, TOPIC_COUNT, SUBTEST_COUNT } from "@/lib/bank-stats";

export const metadata: Metadata = {
  title: "ASVAB Calculator 2026: AFQT, GT & Line Scores (All Branches)",
  description:
    "Free ASVAB calculator for Army, Navy, Air Force, Marines, Coast Guard & Space Force. Get your AFQT percentile, GT score, and line scores instantly — see every job you qualify for.",
  alternates: {
    canonical: "https://asvabhero.com",
  },
};

export default function HomePage() {
  return (
    <div>
      {/* ────────────────────────────────────────────────────────────────────
         HERO — recruit's actual goal, not a feature pitch.
         One primary CTA (diagnostic, the conversion engine), one secondary.
         Numerical proof inline from bank-stats.json (QUESTIONS_PLUS · topics · subtests).
      ──────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(249,115,22,0.10),_transparent_60%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-24">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
              <span className="text-accent">●</span> Free ASVAB prep platform
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
              Army, Navy, Air Force, Marines, Coast Guard, Space Force — plug in
              your subtest scores and see every job you qualify for. Or take the
              30-question diagnostic to estimate your AFQT first.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/practice-test"
                className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-7 py-4 text-base font-semibold text-white shadow-[0_8px_30px_-4px_rgba(249,115,22,0.4)] transition-all hover:bg-accent-hover hover:shadow-[0_12px_40px_-4px_rgba(249,115,22,0.6)] no-underline sm:w-auto"
              >
                Take the free diagnostic
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/calculator"
                className="inline-flex w-full items-center justify-center rounded-xl border border-navy-border bg-navy-light/60 px-7 py-4 text-base font-semibold text-text-secondary transition-colors hover:border-accent/40 hover:text-text-primary no-underline sm:w-auto"
              >
                Score calculator
              </Link>
            </div>
            <p className="mt-6 font-mono text-xs uppercase tracking-wider text-text-tertiary">
              30 questions · 36 minutes · no signup required
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-4xl">
            <BrandHero
              src="/images/generated/asvab-home-hero.png"
              alt="A future US military recruit studying for the ASVAB at her kitchen table — practice book open, calculator and pencil in hand, focused on the work."
              width={1536}
              height={1024}
              priority
              className="overflow-hidden rounded-2xl border border-navy-border shadow-2xl shadow-black/40"
            />
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
         PAIN-LED CONVERSION BAND — the real recruit pain → the free score-moving
         plan. Sits below the SEO hero (H1 untouched). Primary CTA = free plan.
      ──────────────────────────────────────────────────────────────────── */}
      <section className="border-t border-navy-border bg-navy-light/40">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            <span className="text-accent">●</span> Close doesn&apos;t qualify
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-4xl">
            You&apos;re short for the job you want — and most apps just show you
            that, then upsell you.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary">
            ASVAB Hero turns &ldquo;you&apos;re short by X for the job you
            want&rdquo; into a <span className="text-text-primary">free daily plan</span>{" "}
            that targets the exact subtests most likely to move your score — built
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
                d: "A weekly routine aimed at your test date — exactly what to do today. Free.",
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

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link
              href="/signup?next=%2Fapp%2Fplan"
              className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-7 py-4 text-base font-semibold text-white shadow-[0_8px_30px_-4px_rgba(249,115,22,0.4)] transition-all hover:bg-accent-hover hover:shadow-[0_12px_40px_-4px_rgba(249,115,22,0.6)] no-underline sm:w-auto"
            >
              Start my free plan
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/practice-test"
              className="inline-flex w-full items-center justify-center rounded-xl border border-navy-border bg-navy-light/60 px-7 py-4 text-base font-semibold text-text-secondary transition-colors hover:border-accent/40 hover:text-text-primary no-underline sm:w-auto"
            >
              Take the free diagnostic first
            </Link>
          </div>
          <p className="mt-3 font-mono text-xs uppercase tracking-wider text-text-tertiary">
            Free account · no card · the score-moving core is free
          </p>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
         EVIDENCE TRUST STRIP — leads with the moat: built on the study methods
         research proves raise scores. Links to the full methodology page.
      ──────────────────────────────────────────────────────────────────── */}
      <section className="border-y border-navy-border bg-navy-light/50">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left sm:px-6">
          <p className="text-sm leading-relaxed text-text-secondary">
            <span className="font-semibold text-text-primary">Built on the evidence.</span>{" "}
            Retrieval practice, spaced repetition, and interleaving — the methods cognitive
            science proves raise scores, not the rereading most apps rely on.
          </p>
          <Link
            href="/the-science"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent no-underline transition-colors hover:text-accent-hover"
          >
            See the science
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
         THREE PILLARS — Calculator · Practice · Study Guide.
         Each card carries a hard number (from bank-stats.json) so the homepage tells
         the proof story before any conversion ask.
      ──────────────────────────────────────────────────────────────────── */}
      <section className="border-y border-navy-border bg-navy-light/30">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-navy-border bg-navy-border sm:grid-cols-3">
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
          {/* ──────────────────────────────────────────────────────────────
             DE-CANNIBALIZATION — exact-match links to dedicated calculator
             pages so Google ranks the spoke, not this hub, for those queries.
             One clear target per query cluster.
          ────────────────────────────────────────────────────────────── */}
          <div className="mt-10 rounded-2xl border border-navy-border bg-navy-light/40 p-6 sm:p-8">
            <h3 className="font-display text-base font-bold text-text-primary">
              Jump to a specific calculator
            </h3>
            <div className="mt-4 grid gap-x-8 gap-y-2.5 text-sm sm:grid-cols-2">
              <Link
                href="/afqt-calculator"
                className="text-accent no-underline transition-colors hover:text-accent-hover"
              >
                AFQT Calculator &rarr;
              </Link>
              <Link
                href="/gt-score-calculator"
                className="text-accent no-underline transition-colors hover:text-accent-hover"
              >
                GT Score Calculator &rarr;
              </Link>
              <Link
                href="/asvab-line-score-calculator"
                className="text-accent no-underline transition-colors hover:text-accent-hover"
              >
                Line Score Calculator &rarr;
              </Link>
              <Link
                href="/asvab-score-converter"
                className="text-accent no-underline transition-colors hover:text-accent-hover"
              >
                ASVAB Score Converter &rarr;
              </Link>
              <Link
                href="/army-asvab-calculator"
                className="text-accent no-underline transition-colors hover:text-accent-hover"
              >
                Army ASVAB Calculator &rarr;
              </Link>
              <Link
                href="/navy-asvab-score-calculator"
                className="text-accent no-underline transition-colors hover:text-accent-hover"
              >
                Navy ASVAB Calculator &rarr;
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

      {/* ────────────────────────────────────────────────────────────────────
         BANK PROOF BLOCK — editorial number row.
         Replaces the generic "6 / 500+ / 100% Free" stats card grid.
      ──────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
              <span className="text-accent">●</span> What's in the bank
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
              The numbers behind the prep.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-navy-border bg-navy-border sm:grid-cols-4">
            {[
              { value: QUESTIONS_PLUS, label: "Tagged questions" },
              { value: String(TOPIC_COUNT), label: "Topic categories" },
              { value: String(SUBTEST_COUNT), label: "ASVAB subtests" },
              { value: "1–5", label: "Difficulty levels" },
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
            explanation. PAY97 norming table for AFQT — same calibration the DoD uses.
          </p>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
         ONE EMAIL CAPTURE — replaces the prior two homepage forms.
         Shifted to ribbon-style (slim, full-width vibe) so the homepage isn't
         visually dominated by a card.
      ──────────────────────────────────────────────────────────────────── */}
      <section className="border-y border-navy-border bg-navy-light/40">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <EmailCapture
            headline="Get the 30-day ASVAB study plan, free"
            subhead="6-page PDF plus a 5-email crash course on AFQT and line scores. No spam."
            cta="Email me the plan"
            tag="homepage-mid"
            variant="inline"
          />
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
         PRO SECTION — accurate copy, real CTA.
         Replaces the stale "Coming Soon" block. Two-column on desktop:
         feature list on the left, plan card on the right.
      ──────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-navy-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(249,115,22,0.08),_transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
                <span className="text-accent">●</span> ASVAB Hero Pro
              </p>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-4xl">
                Free raises your score.
                <br />
                <span className="text-accent">Pro removes every limit.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-text-secondary">
                Your daily adaptive AFQT block, the Mistake Bank, and your weekly
                plan are free for everyone — no card. When you&apos;re ready to go
                harder, Pro removes the daily limit and adds full-length sims and
                deeper analytics for the final push to test day.
              </p>
              <ul className="mt-8 space-y-3">
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
            </div>
            <div className="rounded-2xl border border-accent/30 bg-navy-light p-8 sm:p-10">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-5xl font-extrabold text-text-primary">$9.99</span>
                <span className="text-sm text-text-tertiary">/ month</span>
              </div>
              <p className="mt-1 text-sm text-text-tertiary">
                or <span className="font-semibold text-accent">$49.99 / year</span> &mdash; save 58%
              </p>
              <Link
                href="/upgrade?from=home"
                className="mt-7 flex items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover no-underline"
              >
                Upgrade to Pro
              </Link>
              <Link
                href="/pricing"
                className="mt-3 flex items-center justify-center rounded-xl border border-navy-border px-6 py-3 text-sm font-semibold text-text-secondary transition-colors hover:border-accent/40 hover:text-text-primary no-underline"
              >
                Compare plans
              </Link>
              <p className="mt-5 text-center text-xs text-text-tertiary">
                7-day money-back guarantee. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
         FINAL CTA — single sharp ask.
         Closing line that converts undecided readers without another form.
      ──────────────────────────────────────────────────────────────────── */}
      <section className="border-t border-navy-border">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            Find out where you stand.
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            30 questions. 36 minutes. No signup. Real AFQT estimate at the end.
          </p>
          <Link
            href="/practice-test"
            className="mt-8 inline-flex items-center rounded-xl bg-accent px-8 py-4 text-base font-semibold text-white shadow-[0_8px_30px_-4px_rgba(249,115,22,0.4)] transition-all hover:bg-accent-hover hover:shadow-[0_12px_40px_-4px_rgba(249,115,22,0.6)] no-underline"
          >
            Start the free diagnostic
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
