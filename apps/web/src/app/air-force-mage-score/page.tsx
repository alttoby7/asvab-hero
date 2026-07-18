import type { Metadata } from "next";
import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import JsonLd from "@/components/JsonLd";
import VerifiedBlock from "@/components/VerifiedBlock";

export const metadata: Metadata = {
  title: "Air Force MAGE Score: What M, A, G, and E Mean (2026)",
  description:
    "Air Force MAGE explained: Mechanical, Administrative, General, and Electronic aptitude areas, the official composite formulas, and how MAGE differs from your AFQT for job classification.",
  alternates: {
    canonical: "https://asvabhero.com/air-force-mage-score",
  },
};

export default function AirForceMageScorePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Air Force MAGE Score: What M, A, G, and E Mean",
          description:
            "Air Force MAGE explained: Mechanical, Administrative, General, and Electronic aptitude areas, the official composite formulas, and how MAGE differs from your AFQT for job classification.",
          url: "https://asvabhero.com/air-force-mage-score",
          publisher: {
            "@type": "Organization",
            name: "ASVAB Hero",
          },
          datePublished: "2026-05-24",
          dateModified: "2026-05-24",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is MAGE the same as AFQT?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. AFQT is a single enlistment-eligibility percentile built from four subtests (AR, MK, WK, PC). MAGE is four separate aptitude composites (Mechanical, Administrative, General, Electronic) used to sort which Air Force jobs you can hold. Your AFQT decides whether you can enlist; MAGE decides what you can do once you are in.",
              },
            },
            {
              "@type": "Question",
              name: "What MAGE score do I need?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "It depends entirely on the job. Each AFSC publishes its own minimum on one or more of the four composites. Published signals include Pararescue at G49 and the Mobility Force Aviator role at M60. Security Forces lists a General (G) aptitude requirement with no public numeric cutoff. Treat any single MAGE number as job-specific and confirm with a recruiter.",
              },
            },
            {
              "@type": "Question",
              name: "Can I calculate my exact MAGE percentile?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Not reliably by hand. The official composite formulas use VE, an optimally weighted Word Knowledge and Paragraph Comprehension composite, not a plain WK + PC sum, and percentile conversion relies on the PAY97 reference tables. A rounded score report does not give you enough information to back-calculate an exact percentile, so treat any hand-computed MAGE number as an estimate.",
              },
            },
            {
              "@type": "Question",
              name: "Is MAGE only used by the Air Force?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. MAGE (Mechanical, Administrative, General, Electronic) is the Air Force and Space Force aptitude-area system. The Army uses line scores, the Navy and Coast Guard use their own composites, and the Marines use a separate set. Pilot and other officer paths go through the AFOQT, not the ASVAB, so MAGE does not apply to them.",
              },
            },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://asvabhero.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Air Force MAGE Score",
              item: "https://asvabhero.com/air-force-mage-score",
            },
          ],
        }}
      />

      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Air Force MAGE Score: What M, A, G, and E Mean
        </h1>

        <VerifiedBlock
          verifiedDate="May 24, 2026"
          sources={[
            {
              label: "officialasvab.com",
              url: "https://www.officialasvab.com/applicants/military-jobs/",
            },
            {
              label: "PAY97 score tables",
              url: "https://www.officialasvab.com/docs/1997score_scale.pdf",
            },
          ]}
        >
          <p>
            Air Force MAGE is the four-part aptitude system used for job
            classification: Mechanical, Administrative, General, and Electronic.
            Your AFQT decides whether you can enlist; MAGE helps sort which
            AFSCs (jobs) you can hold. Official sources publish the composite
            formulas and percentile tables, but not a clean way to
            back-calculate exact percentiles from a rounded score report, so treat MAGE numbers as estimates and verify specifics with a
            recruiter.
          </p>
        </VerifiedBlock>

        {/* ────────── SECTION: Two-gate system ────────── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          MAGE vs AFQT: Two Different Jobs
        </h2>

        <p className="mt-4 text-text-secondary">
          People conflate these two numbers constantly, and it causes real
          confusion at the recruiter&apos;s office. They are not the same thing,
          and they answer two different questions.
        </p>

        <p className="text-text-secondary">
          Your <strong>AFQT</strong> is a single percentile (1&ndash;99) built
          from four subtests, Arithmetic Reasoning (AR), Mathematics
          Knowledge (MK), Word Knowledge (WK), and Paragraph Comprehension (PC).
          It is the enlistment gate. If you clear the Air Force and Space Force
          floor, you can enlist. See our{" "}
          <Link href="/air-force-afqt-calculator">
            Air Force AFQT calculator
          </Link>{" "}
          to check that number first.
        </p>

        <p className="text-text-secondary">
          Your <strong>MAGE</strong> scores are four separate aptitude
          composites, Mechanical (M), Administrative (A), General (G),
          and Electronic (E). They are the classification gate. Each Air Force
          Specialty Code (AFSC) lists a minimum on one or more of these four
          areas, and that is what decides which jobs you can actually book.
        </p>

        {/* ────────── SECTION: Official formulas ────────── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          The Official MAGE Composite Formulas
        </h2>

        <p className="mt-4 text-text-secondary">
          Each MAGE composite is built from a specific combination of ASVAB
          subtests. Here are the current formulas.
        </p>

        {/* TABLE: MAGE Composite Formulas */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Composite
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Formula
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  What It Measures
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  M (Mechanical)
                </td>
                <td className="py-2 pr-4 font-mono">MC + 2&times;AS + GS</td>
                <td className="py-2">
                  Mechanical and physical-systems aptitude
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  A (Administrative)
                </td>
                <td className="py-2 pr-4 font-mono">VE + MK</td>
                <td className="py-2">
                  Verbal and math aptitude for office roles
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  G (General)
                </td>
                <td className="py-2 pr-4 font-mono">VE + AR</td>
                <td className="py-2">
                  General aptitude for most career fields
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  E (Electronic)
                </td>
                <td className="py-2 pr-4 font-mono">AR + MK + EI + GS</td>
                <td className="py-2">Electronics and technical aptitude</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* FORMULA */}
        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          M = MC + 2(AS) + GS
          <br />
          A = VE + MK
          <br />
          G = VE + AR
          <br />
          E = AR + MK + EI + GS
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">
            Why you cannot hand-compute an exact percentile
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            <strong>VE is an optimally weighted Word Knowledge + Paragraph
            Comprehension composite, not a plain WK + PC sum.</strong> The
            subtests are weighted and scaled before they enter the formula, and
            the final composite is converted to a percentile using reference
            tables. That is why a rounded score report does not give you enough
            information to reliably reproduce an exact MAGE percentile by hand.
            Treat any number you calculate yourself as an estimate.
          </p>
        </aside>

        <p className="text-text-secondary">
          The percentile conversion behind these composites traces back to the{" "}
          <a
            href="https://www.officialasvab.com/docs/1997score_scale.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline hover:text-accent-hover"
          >
            PAY97 percentile tables
          </a>
, and the aptitude-area system is described on the{" "}
          <a
            href="https://www.officialasvab.com/applicants/military-jobs/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline hover:text-accent-hover"
          >
            official ASVAB military-jobs page
          </a>
          . To see your composites estimated from your subtest scores, use the{" "}
          <Link href="/air-force-asvab-calculator">
            Air Force ASVAB calculator
          </Link>
          .
        </p>

        <EmailCapture
          tag="air-force-mage-score"
          headline="Get Your Free Air Force ASVAB Study Plan"
          subhead="Enter your email and we'll send you a study plan tuned to the MAGE composite your target AFSC actually requires."
          cta="Send My Study Plan"
        />

        {/* ────────── SECTION: Job signals ────────── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Current Public Job Signals
        </h2>

        <p className="mt-4 text-text-secondary">
          These are published signals for a few recognizable career fields, not
          a guaranteed cutoff list. The Air Force adjusts requirements over
          time, and some roles publish an aptitude area without a public number.
          Always verify with a recruiter.
        </p>

        {/* TABLE: Job signals */}
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Career Field
                </th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">
                  Published Signal
                </th>
                <th className="pb-2 text-left font-semibold text-text-secondary">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Pararescue
                </td>
                <td className="py-2 pr-4 font-mono">G49</td>
                <td className="py-2">General composite signal.</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Mobility Force Aviator
                </td>
                <td className="py-2 pr-4 font-mono">M60</td>
                <td className="py-2">
                  Current name for the legacy &quot;loadmaster&quot; role.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Security Forces
                </td>
                <td className="py-2 pr-4 font-mono">G (General)</td>
                <td className="py-2">
                  Listed under the General aptitude area; no numeric cutoff
                  published.
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">
                  Pilot
                </td>
                <td className="py-2 pr-4 font-mono">AFOQT</td>
                <td className="py-2">
                  Officer path via the AFOQT, not the ASVAB. MAGE does not apply.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          The Pararescue signal comes from the{" "}
          <a
            href="https://www.airforce.com/careers/special-warfare-and-combat-support/special-warfare/pararescue"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline hover:text-accent-hover"
          >
            Air Force Pararescue career page
          </a>
, and the Mobility Force Aviator signal comes from the{" "}
          <a
            href="https://www.airforce.com/careers/aviation-and-flight/mobility-force-aviator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline hover:text-accent-hover"
          >
            Mobility Force Aviator career page
          </a>
          . For a broader walk through Air Force career fields and the
          composites they lean on, see our{" "}
          <Link href="/air-force-jobs">Air Force jobs guide</Link>.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Note</p>
          <p className="mt-1 text-sm text-text-secondary">
            Pilot and most other rated officer positions are selected through
            the AFOQT (Air Force Officer Qualifying Test), not the ASVAB. If
            your goal is flying as an officer, MAGE is not the test that gates
            it.
          </p>
        </aside>

        {/* ────────── SECTION: How to use MAGE ────────── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          How to Use Your MAGE Scores
        </h2>

        <p className="mt-4 text-text-secondary">
          Because each composite pulls from a different mix of subtests, the
          fastest way to raise the score you need is to study the subtests that
          feed your target composite. Raising VE (Word Knowledge and Paragraph
          Comprehension) is the highest-leverage move overall: it feeds three of
          the four MAGE composites and your AFQT at the same time.
        </p>

        <ol className="my-4 list-decimal space-y-2 pl-6 text-text-secondary">
          <li>
            <strong>Clear the AFQT gate first.</strong> Check it on the{" "}
            <Link href="/air-force-afqt-calculator">
              Air Force AFQT calculator
            </Link>
            .
          </li>
          <li>
            <strong>Identify the composite your target AFSC requires.</strong>{" "}
            Browse roles in the{" "}
            <Link href="/air-force-jobs">Air Force jobs guide</Link>.
          </li>
          <li>
            <strong>Map the subtests that feed it</strong> using the formula
            table above.
          </li>
          <li>
            <strong>Estimate your composites</strong> with the{" "}
            <Link href="/air-force-asvab-calculator">
              Air Force ASVAB calculator
            </Link>
, then confirm the real requirement with a recruiter.
          </li>
        </ol>

        {/* ────────── FAQ ────────── */}

        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Air Force MAGE Score FAQ
        </h2>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Is MAGE the same as AFQT?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. AFQT is a single enlistment-eligibility percentile built from
              four subtests (AR, MK, WK, PC). MAGE is four separate aptitude
              composites (Mechanical, Administrative, General, Electronic) used
              to sort which Air Force jobs you can hold. Your AFQT decides
              whether you can enlist; MAGE decides what you can do once you are
              in.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              What MAGE score do I need?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              It depends entirely on the job. Each AFSC publishes its own
              minimum on one or more of the four composites. Published signals
              include Pararescue at G49 and the Mobility Force Aviator role at
              M60. Security Forces lists a General (G) aptitude requirement with
              no public numeric cutoff. Treat any single MAGE number as
              job-specific and confirm with a recruiter.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Can I calculate my exact MAGE percentile?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Not reliably by hand. The official composite formulas use VE, an
              optimally weighted Word Knowledge and Paragraph Comprehension
              composite, not a plain WK + PC sum, and percentile conversion
              relies on the PAY97 reference tables. A rounded score report does
              not give you enough information to back-calculate an exact
              percentile, so treat any hand-computed MAGE number as an estimate.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">
              Is MAGE only used by the Air Force?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Yes. MAGE (Mechanical, Administrative, General, Electronic) is the
              Air Force and Space Force aptitude-area system. The Army uses line
              scores, the Navy and Coast Guard use their own composites, and the
              Marines use a separate set. Pilot and other officer paths go
              through the AFOQT, not the ASVAB, so MAGE does not apply to them.
            </p>
          </div>
        </div>

        {/* ────────── CTA ────────── */}

        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">
            See What Your Scores Unlock
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your subtest scores and instantly estimate your AFQT and MAGE
            composites for Air Force job classification.
          </p>
          <Link
            href="/air-force-asvab-calculator"
            className="mt-4 inline-block rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)] no-underline"
          >
            Try the Air Force Calculator
          </Link>
        </div>

        {/* Related links */}
        <section className="my-8 not-prose rounded-xl border border-accent/30 bg-navy-light p-6">
          <h2 className="font-display text-xl font-bold text-text-primary">
            Related Air Force Guides
          </h2>
          <ul className="mt-4 space-y-3 text-text-secondary">
            <li>
              Check your enlistment gate on the{" "}
              <Link
                href="/air-force-afqt-calculator"
                className="text-accent underline hover:text-accent-hover"
              >
                Air Force AFQT calculator
              </Link>
              .
            </li>
            <li>
              Browse career fields and their composites in the{" "}
              <Link
                href="/air-force-jobs"
                className="text-accent underline hover:text-accent-hover"
              >
                Air Force jobs guide
              </Link>
              .
            </li>
            <li>
              Estimate all four composites on the{" "}
              <Link
                href="/air-force-asvab-calculator"
                className="text-accent underline hover:text-accent-hover"
              >
                Air Force ASVAB calculator
              </Link>
              .
            </li>
            <li>
              Read the full breakdown of requirements and AFSC tables in our{" "}
              <Link
                href="/air-force-asvab-score"
                className="text-accent underline hover:text-accent-hover"
              >
                Air Force ASVAB score guide
              </Link>
              .
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}
