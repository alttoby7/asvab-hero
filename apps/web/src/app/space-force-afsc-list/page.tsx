import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import AffiliateBookBlock from "@/components/AffiliateBookBlock";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedLinks from "@/components/RelatedLinks";
import JobScoreTable from "@/components/JobScoreTable";
import { spaceForceHub, hubScoreStats } from "@/lib/job-hubs";

// Single source of truth: every score figure on this page is derived from
// space-force-jobs.json (the same data the Space Force calculator scores
// against), never hardcoded. MAGE thresholds are 1-99 percentiles; per
// job-matcher.ts (MAGE_UNVERIFIABLE_NOTE), a raw MAGE composite sum cannot be
// reliably converted to a percentile, so this page never claims to verify
// pass/fail on a composite, only AFQT.
const jobs = spaceForceHub.jobs;
const stats = hubScoreStats(jobs);
const N = stats.count; // 26 AFSCs
const LOW = stats.lowest!; // 3F1X1 Services, G 24
const HIGH = stats.highest!; // 1N2X1 Signals Intelligence Analyst, G 72

export const metadata: Metadata = {
  title: `Space Force AFSC List 2026: ASVAB MAGE Scores for ${N} Guardian Jobs`,
  description: `Space Force AFSC list with the published MAGE composite requirement for ${N} Guardian career fields. Sortable table from ${LOW.title} (${LOW.composite} ${LOW.minScore}) up to ${HIGH.title} (${HIGH.composite} ${HIGH.minScore}), plus the AFQT floor and why MAGE percentiles can't be verified from a raw calculator score.`,
  alternates: {
    canonical: "https://asvabhero.com/space-force-afsc-list",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: `Space Force AFSC List 2026: ASVAB MAGE Scores for ${N} Guardian Jobs`,
  description: `Space Force AFSC list with the published MAGE composite requirement for ${N} Guardian career fields, the AFQT minimum, and how MAGE scoring works.`,
  url: "https://asvabhero.com/space-force-afsc-list",
  author: {
    "@type": "Organization",
    "@id": "https://asvabhero.com/#organization",
    name: "ASVAB Hero",
  },
  publisher: {
    "@type": "Organization",
    name: "ASVAB Hero",
  },
  datePublished: "2026-07-17",
  dateModified: "2026-07-17",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the minimum ASVAB score to join the Space Force?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Space Force shares the Air Force enlistment floor: an AFQT of 36 with a high school diploma (higher for GED holders). Because the Space Force is small and almost entirely technical, most Guardian AFSCs sit well above that floor on the General (G) or Electronics (E) MAGE composites, so AFQT alone doesn't tell you which jobs are actually open to you.",
      },
    },
    {
      "@type": "Question",
      name: "Does the Space Force use the same MAGE scores as the Air Force?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Space Force uses the identical Air Force MAGE composite system: Mechanical (M), Administrative (A), General (G), and Electronics (E). Every Guardian AFSC publishes its minimum as one or more MAGE percentiles, the same way Air Force AFSCs do.",
      },
    },
    {
      "@type": "Question",
      name: "What is the lowest ASVAB score Space Force job?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `${LOW.title} (${LOW.code}) has the lowest published requirement on the chart at ${LOW.composite} ${LOW.minScore}, an administrative-support field. Most Guardian AFSCs sit well above that; the force skews heavily toward intelligence, cyber, and space operations, which carry higher composite minimums.`,
      },
    },
    {
      "@type": "Question",
      name: "What Space Force job requires the highest ASVAB score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `${HIGH.title} (${HIGH.code}) requires the highest published MAGE minimum on the chart at ${HIGH.composite} ${HIGH.minScore}. Space Systems Operations (1C6X1) is the highest Electronics requirement at E 70.`,
      },
    },
    {
      "@type": "Question",
      name: "Can a calculator tell me exactly which Space Force jobs I qualify for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not with certainty. MAGE composites are reported as 1-99 percentiles, and a raw subtest-sum composite cannot be reliably converted into a percentile from a rounded ASVAB score report. This chart and the Space Force calculator show each AFSC's published MAGE requirement as a reference point, not a guaranteed qualify or disqualify. Always confirm with a recruiter.",
      },
    },
  ],
};

export default function SpaceForceAFSCListPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb
        items={[
          { name: "ASVAB Hero", href: "/" },
          { name: "Space Force ASVAB Calculator", href: "/space-force-asvab-calculator" },
          { name: "Space Force AFSC List", href: "/space-force-afsc-list" },
        ]}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Space Force AFSC List 2026: ASVAB MAGE Scores for {N} Guardian Jobs
        </h1>

        {/* Snippet-shaped direct answer (data-driven) */}
        <p className="mt-4 text-text-secondary">
          Every Space Force enlisted job needs an AFQT of 36 to qualify (higher with a GED), then a
          MAGE composite percentile that ranges from {LOW.composite} {LOW.minScore} ({LOW.code}) up to{" "}
          {HIGH.composite} {HIGH.minScore} for {HIGH.title}. The chart below lists the published MAGE
          requirement for {N} Guardian AFSCs we have verified data for, sortable by score, career
          field, or AFQT.
        </p>

        <p className="text-text-secondary">
          The Space Force is the smallest and youngest branch, and its job list reflects that: it is
          overwhelmingly intelligence, cyber, space operations, and the engineering and administrative
          roles that support them. There is no infantry, no aviation maintenance in the traditional
          sense. Every one of those career fields runs on the same four-composite MAGE system the Air
          Force uses, since the Space Force was built directly out of Air Force personnel and career
          fields in 2019.
        </p>

        {/* ── Answer-first AEO block ── */}
        <div className="my-6 not-prose rounded-2xl border border-accent/30 bg-navy-light p-5">
          <p className="font-display text-sm font-bold text-accent">
            Space Force ASVAB requirements at a glance
          </p>
          <ul className="mt-3 space-y-2 text-sm text-text-secondary">
            <li>
              <strong className="text-text-primary">Minimum AFQT to enlist:</strong> 36 with a high
              school diploma, higher with a GED, matching the Air Force floor.
            </li>
            <li>
              <strong className="text-text-primary">Lowest MAGE requirement:</strong> {LOW.title} ({LOW.code})
              at {LOW.composite} {LOW.minScore}.
            </li>
            <li>
              <strong className="text-text-primary">Highest MAGE requirement:</strong> {HIGH.title} ({HIGH.code})
              at {HIGH.composite} {HIGH.minScore}.
            </li>
            <li>
              <strong className="text-text-primary">Scoring system:</strong> MAGE (Mechanical,
              Administrative, General, Electronics), shared exactly with the Air Force.
            </li>
          </ul>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Important: MAGE scores can&apos;t be fully verified from a calculator</p>
          <p className="mt-1 text-sm text-text-secondary">
            MAGE composites are published as 1-99 percentiles. A subtest-sum calculator produces a raw
            composite total, and there is no public, reliable formula to convert that raw total into
            the exact percentile the Space Force uses. So the chart below shows you each AFSC&apos;s
            published requirement to compare against, not a pass or fail verdict. Treat it as a
            reference point and confirm your standing with a recruiter.
          </p>
        </aside>

        {/* Stats Row, data-driven */}
        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">{N} Guardian AFSCs</p>
            <p className="mt-1 text-sm text-text-secondary">across space operations, intelligence, cyber/IT, engineering, logistics, and administrative fields</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">4 MAGE composites</p>
            <p className="mt-1 text-sm text-text-secondary">Mechanical, Administrative, General, Electronics, identical to the Air Force system</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Lowest requirement: {LOW.code} at {LOW.composite} {LOW.minScore}
            </p>
            <p className="mt-1 text-sm text-text-secondary">{LOW.title}, an administrative-support field</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">
              Highest requirement: {HIGH.composite} {HIGH.minScore}
            </p>
            <p className="mt-1 text-sm text-text-secondary">{HIGH.title}, one of several intelligence AFSCs above G 60</p>
          </div>
        </div>

        {/* Primary CTA, high-intent */}
        <div className="my-6 not-prose rounded-2xl border border-accent/30 bg-navy-light p-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-base font-bold text-text-primary">
              Check your MAGE composites against these AFSCs
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Run your subtest scores through the Space Force ASVAB calculator to see your MAGE
              composites next to every AFSC on this chart.
            </p>
          </div>
          <Link
            href={spaceForceHub.calculatorHref}
            className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover sm:mt-0 sm:ml-6 sm:shrink-0"
          >
            Open the Space Force calculator
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* ── The score table: the unique-data asset ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Space Force AFSC List: {N} Guardian Jobs and Their MAGE Requirements
        </h2>

        <p className="mt-4 text-text-secondary">
          Every row comes from the same dataset the{" "}
          <Link href={spaceForceHub.calculatorHref} className="text-accent hover:text-accent-hover">
            Space Force ASVAB calculator
          </Link>{" "}
          scores against. Sort by required score to see where the barriers cluster, or by career field
          to compare AFSCs in the same specialty. Two composites joined by{" "}
          <span className="font-mono">&middot;</span> mean both are required at once (a handful of
          engineering AFSCs work this way); a single composite means that&apos;s the only published gate.
        </p>

        <JobScoreTable
          jobs={jobs}
          caption={`Space Force AFSC list: required MAGE composite percentile, career field, and minimum AFQT for ${N} Guardian AFSCs.`}
          calculatorHref={spaceForceHub.calculatorHref}
          calculatorLabel="Space Force ASVAB calculator"
        />

        {/* ── How Space Force MAGE scoring works ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How Space Force MAGE Scoring Works
        </h2>

        <p className="mt-4 text-text-secondary">
          Signals Intelligence Analyst needs a General composite of 72. The maximum AFQT is 99. Both
          numbers come off the same ASVAB, but AFQT decides whether the Space Force will take you at
          all, while MAGE decides which AFSC you can actually select.
        </p>

        <h3 className="mt-8 font-display text-xl font-bold text-text-primary">
          The four MAGE composite formulas
        </h3>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-base font-bold text-accent">
          G (General) = AR + WK + PC<br />
          A (Administrative) = WK + PC + MK<br />
          M (Mechanical) = MC + 2&times;AS + GS<br />
          E (Electronics) = GS + AR + MK + EI
        </div>

        <p className="text-text-secondary">
          WK (Word Knowledge) and PC (Paragraph Comprehension) together form what other branches call
          VE (Verbal Expression); the Space Force formulas above use them individually. AR (Arithmetic
          Reasoning) and MK (Mathematics Knowledge) feed the most composites, so they carry the most
          leverage if you are unsure which career field you want yet. Unlike Army line scores, MAGE
          composites are reported as percentiles (1-99), not raw standard-score sums, which is why they
          can&apos;t be checked the same way a line score can.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            The Space Force is almost entirely built from former Air Force career fields, so its AFSC
            codes and MAGE thresholds track the Air Force closely. For the full composite breakdown and
            worked examples, see{" "}
            <Link href={spaceForceHub.scoreExplainerHref} className="text-accent hover:text-accent-hover">
              the MAGE composite score guide
            </Link>
            .
          </p>
        </aside>

        {/* ── Career fields at a glance (curated E-E-A-T) ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Space Force Career Fields at a Glance
        </h2>

        <p className="mt-4 text-text-secondary">
          The {N} AFSCs on this chart split across six career fields. Use the table above for exact
          numbers; the notes below show where the score barriers cluster.
        </p>

        <ul className="mt-4 space-y-3 text-text-secondary">
          <li>
            <strong className="text-text-primary">Intelligence (1N series).</strong> The highest and
            most consistent General requirements in the Space Force: Signals Intelligence Analyst (G 72),
            Geospatial Intelligence Analyst (G 66), Fusion Analyst (G 62), and All Source Intelligence
            Analyst (G 57). TS/SCI eligibility is required alongside the ASVAB minimum.
          </li>
          <li>
            <strong className="text-text-primary">Space operations.</strong> Space Systems Operations
            (1C6X1) is the highest Electronics requirement on the chart at E 70, reflecting the
            satellite-tracking and orbital-systems work.
          </li>
          <li>
            <strong className="text-text-primary">Cyber and IT (1B, 1D, 3D, 3C series).</strong> Cyber
            Warfare and Cyber Defense Operations sit at G 64; Cyber Transport Systems needs E 70. All
            require some level of security clearance.
          </li>
          <li>
            <strong className="text-text-primary">Engineering (3E series).</strong> The widest score
            range in the force, from Pavement and Construction Equipment (M 40) up to Electrical Power
            Production (M 56). Several of these are the only AFSCs on this chart with two composites
            required at once, such as Electrical Systems (E 35 &middot; M 35).
          </li>
          <li>
            <strong className="text-text-primary">Administrative and logistics.</strong> Personnel,
            Contracting, and Financial Management run on the Administrative (A) composite; Materiel
            Management and Air Transportation combine A and G. Services (3F1X1) has the single lowest
            requirement on the chart at G 24.
          </li>
          <li>
            <strong className="text-text-primary">Security.</strong> Special Investigations (7S0X1) sits
            at G 44, similar to its Air Force counterpart career fields.
          </li>
        </ul>

        {/* ── FAQ ── */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Frequently Asked Questions
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the minimum ASVAB score to join the Space Force?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The Space Force shares the Air Force enlistment floor: an AFQT of 36 with a high school
              diploma, higher for GED holders. Because the force is small and almost entirely
              technical, most Guardian AFSCs sit well above that floor.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Does the Space Force use the same MAGE scores as the Air Force?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. The Space Force uses the identical MAGE composite system: Mechanical, Administrative,
              General, and Electronics. Every Guardian AFSC publishes its minimum as one or more MAGE
              percentiles, the same way Air Force AFSCs do.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What is the lowest ASVAB score Space Force job?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              {LOW.title} ({LOW.code}) has the lowest published requirement at {LOW.composite}{" "}
              {LOW.minScore}. Most Guardian AFSCs sit well above that since the force skews heavily
              toward intelligence, cyber, and space operations.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What Space Force job requires the highest ASVAB score?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              {HIGH.title} ({HIGH.code}) requires the highest published minimum on the chart at{" "}
              {HIGH.composite} {HIGH.minScore}. Run your scores through the{" "}
              <Link href={spaceForceHub.calculatorHref} className="text-accent hover:text-accent-hover">
                Space Force ASVAB calculator
              </Link>{" "}
              to see where you stand against it.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can a calculator tell me exactly which Space Force jobs I qualify for?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Not with certainty. MAGE composites are 1-99 percentiles, and a raw subtest-sum composite
              cannot be reliably converted into a percentile from a rounded ASVAB score report. This
              chart shows each AFSC&apos;s published requirement as a reference point, not a guaranteed
              qualify or disqualify. Always confirm with a recruiter.
            </p>
          </div>
        </div>

        {/* ── Methodology / freshness (data-first guardrail) ── */}
        <aside className="my-8 rounded-lg border border-navy-border bg-navy/50 p-4">
          <p className="text-sm font-semibold text-text-primary">How this chart is built</p>
          <p className="mt-1 text-sm text-text-secondary">
            Every MAGE requirement is pulled from the same dataset the Space Force calculator scores
            against. Because MAGE minimums are published percentiles rather than raw sums, we show them
            exactly as published and never invent a number where one isn&apos;t publicly documented.
            AFSC requirements are set by Space Force Personnel Center and can change by message. Always
            confirm the exact number with your recruiter and get the AFSC written into your contract at
            MEPS. Last updated July 17, 2026.
          </p>
        </aside>

        {/* ── CTA Box ── */}
        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            See What Your Scores Unlock
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your 9 subtest scores and instantly see your AFQT, all four MAGE composites, and
            every Guardian AFSC we have data for.
          </p>
          <Link
            href={spaceForceHub.calculatorHref}
            className="mt-4 inline-block rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)] no-underline"
          >
            Try the Space Force Calculator
          </Link>
          <p className="mt-3 text-xs text-text-tertiary">
            Or take a{" "}
            <Link href="/practice-test" className="text-accent hover:text-accent-hover">
              free 3-minute diagnostic
            </Link>{" "}
            to estimate your scores first.
          </p>
        </div>

        <div className="mt-8 not-prose">
          <AffiliateBookBlock source="space-force-afsc-list-end" />
        </div>

        <div className="not-prose">
          <RelatedLinks title="Space Force ASVAB resources" links={spaceForceHub.related} />
        </div>
      </article>
    </div>
  );
}
