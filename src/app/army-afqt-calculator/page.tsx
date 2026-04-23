import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import AfqtCalculator from "@/components/AfqtCalculator";
import JsonLd from "@/components/JsonLd";
import VerifiedBlock from "@/components/VerifiedBlock";

export const metadata: Metadata = {
  title: "Army AFQT Calculator 2026: Check If You Meet the 31 Minimum",
  description:
    "Free Army AFQT calculator. Enter AR, WK, PC, MK to see if you meet the 31 diploma minimum (50 with GED). Includes Future Soldier Prep Course path for scores 21 to 30.",
  alternates: {
    canonical: "https://asvabhero.com/army-afqt-calculator",
  },
};

export default function ArmyAfqtCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Army AFQT Calculator",
          url: "https://asvabhero.com/army-afqt-calculator",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Check if your AFQT meets the Army minimum of 31 for diploma holders (50 with GED). Instant percentile from 4 subtest scores.",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is the minimum AFQT score for the Army?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "31 with a high school diploma, 50 with a GED. The Army has the lowest diploma floor of any branch, which makes it the most accessible path for applicants near the bottom of the qualifying range.",
              },
            },
            {
              "@type": "Question",
              name: "What if my AFQT is 21 to 30?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Army Future Soldier Preparatory Course (FSPC) accepts applicants with AFQT 21 to 30. You complete a short academic program at Fort Jackson, then retake the ASVAB. Most graduates clear the 31 threshold and enter basic training.",
              },
            },
            {
              "@type": "Question",
              name: "Is the Army National Guard AFQT minimum the same?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Army, Army Reserve, and Army National Guard all use the same AFQT floors: 31 diploma, 50 GED. Individual states may run tighter standards during strong recruiting cycles, but the federal minimum does not change.",
              },
            },
            {
              "@type": "Question",
              name: "What AFQT do I need for an Army signing bonus?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Category IIIA (AFQT 50+) unlocks most FY26 Army signing bonuses, which range up to 50,000 for critical MOS on 6-year contracts. Scoring below 50 still qualifies you to enlist but limits bonus access sharply.",
              },
            },
          ],
        }}
      />

      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Army AFQT Calculator
        </h1>
        <p className="mt-3 text-lg text-text-secondary">
          Check if your AFQT clears the Army floor. Minimum is 31 with a
          diploma, 50 with a GED. Lowest entry bar of any branch.
        </p>
      </div>

      <VerifiedBlock
        verifiedDate="April 2026"
        sources={[
          {
            label: "officialasvab.com",
            url: "https://www.officialasvab.com/applicants/scores/",
          },
          {
            label: "goarmy.com",
            url: "https://www.goarmy.com/careers-and-jobs/about-army-jobs/asvab",
          },
        ]}
      >
        <p>
          The <strong>Army AFQT minimum is 31</strong> for diploma holders
          and <strong>50 for GED holders</strong>. This is the lowest
          diploma floor across all six branches. The same standards apply
          to Army Reserve and Army National Guard. Score 21 to 30 and you
          can still enlist through the Future Soldier Preparatory Course,
          which retests you after a short academic program. The calculator
          below runs your 4 AFQT subtests (AR, WK, PC, MK) through the
          official PAY97 Table 2.5 lookup.
        </p>
      </VerifiedBlock>

      <section className="mt-8">
        <Suspense
          fallback={
            <div className="rounded-lg border border-navy-border bg-navy-light p-6 text-text-secondary">
              Loading calculator...
            </div>
          }
        >
          <AfqtCalculator />
        </Suspense>
      </section>

      {/* Army specifics */}
      <section className="mt-12 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Army AFQT Requirements at a Glance
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-text-secondary">
              <tr className="border-b border-navy-border">
                <th className="py-2 pr-4 text-left">Path</th>
                <th className="py-2 pr-4 text-left">Minimum AFQT</th>
                <th className="py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody className="text-text-primary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold">Active Army (diploma)</td>
                <td className="py-2 pr-4 font-mono font-bold text-accent">31</td>
                <td className="py-2 text-text-secondary">
                  Category IIIB or above.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold">Active Army (GED)</td>
                <td className="py-2 pr-4 font-mono font-bold text-accent">50</td>
                <td className="py-2 text-text-secondary">
                  Category IIIA. Annual GED cap applies.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold">Army Reserve</td>
                <td className="py-2 pr-4 font-mono font-bold text-accent">31 / 50</td>
                <td className="py-2 text-text-secondary">
                  Same as active. Same education rules.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold">Army National Guard</td>
                <td className="py-2 pr-4 font-mono font-bold text-accent">31 / 50</td>
                <td className="py-2 text-text-secondary">
                  Federal floor. States may run tighter standards.
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold">FSPC track</td>
                <td className="py-2 pr-4 font-mono font-bold text-accent">21 to 30</td>
                <td className="py-2 text-text-secondary">
                  Prep course at Fort Jackson, retest required.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-text-tertiary">
          Category IV accessions (AFQT 21 to 30) are capped at 4% of all
          DoD recruits by federal law (32 CFR 66.6). FSPC slots compete
          against that cap.
        </p>
      </section>

      {/* Below minimum path */}
      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          What If Your AFQT Is Below 31?
        </h2>
        <p className="mt-3 text-text-secondary">
          The Army is one of only two branches with a formal path for
          below-minimum scores (the Navy runs a smaller DEP Enrichment
          Program for 28 to 30).
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Future Soldier Prep Course</p>
            <p className="mt-1 text-sm text-text-secondary">
              AFQT 21 to 30 qualifies you for FSPC at Fort Jackson. Short
              academic track (roughly 90 days) focused on the 4 AFQT
              subtests. Retest at the end. Most graduates clear 31 and
              ship to basic.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Retake the ASVAB</p>
            <p className="mt-1 text-sm text-text-secondary">
              Wait 1 month, retest. Wait another month, retest again. Then
              every 6 months. Study WK and PC first (doubled in the AFQT
              formula). See{" "}
              <Link
                href="/how-to-retake-the-asvab"
                className="text-accent underline hover:text-accent-hover"
              >
                how to retake the ASVAB
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Army AFQT FAQ
        </h2>
        <div className="mt-4 divide-y divide-navy-border">
          {[
            {
              q: "What is the minimum AFQT score for the Army?",
              a: "31 with a diploma, 50 with a GED. Same floors for active Army, Army Reserve, and Army National Guard. This is the lowest diploma minimum of any branch.",
            },
            {
              q: "What if my AFQT is 21 to 30?",
              a: "The Future Soldier Preparatory Course accepts you. FSPC is a roughly 90-day academic program at Fort Jackson focused on the 4 AFQT subtests. You retest at the end. Graduates who clear 31 ship to basic training. FSPC has a failure path too, so treat it like real school.",
            },
            {
              q: "Is the Army National Guard AFQT minimum the same?",
              a: "Yes. 31 with a diploma, 50 with a GED. Same federal floor. Individual states can tighten during strong recruiting years, but no state can go below the federal minimum.",
            },
            {
              q: "What AFQT do I need for an Army signing bonus?",
              a: "Most FY26 Army signing bonuses require AFQT 50 or higher (Category IIIA). The largest bonuses (up to 50,000 for critical MOS on 6-year contracts) usually also require GT 110 or higher plus specific MOS qualifications.",
            },
          ].map((item) => (
            <div key={item.q} className="py-4">
              <h3 className="font-display text-base font-bold text-text-primary">
                {item.q}
              </h3>
              <p className="mt-2 text-sm text-text-secondary">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related links */}
      <section className="mt-8 rounded-xl border border-accent/30 bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Next Steps
        </h2>
        <ul className="mt-4 space-y-3 text-text-secondary">
          <li>
            Check every Army MOS you qualify for on the{" "}
            <Link
              href="/army-asvab-calculator"
              className="text-accent underline hover:text-accent-hover"
            >
              Army ASVAB calculator
            </Link>{" "}
            (all 9 subtests, all 10 line scores).
          </li>
          <li>
            Compare across branches with the{" "}
            <Link
              href="/afqt-calculator"
              className="text-accent underline hover:text-accent-hover"
            >
              all-branch AFQT calculator
            </Link>
            .
          </li>
          <li>
            Read the full{" "}
            <Link
              href="/afqt-score"
              className="text-accent underline hover:text-accent-hover"
            >
              AFQT score guide
            </Link>{" "}
            for category thresholds and study strategy.
          </li>
          <li>
            Targeting GT 110 for Cyber or OCS? See the{" "}
            <Link
              href="/asvab-gt-score"
              className="text-accent underline hover:text-accent-hover"
            >
              Army GT score breakdown
            </Link>
            .
          </li>
        </ul>
      </section>
    </div>
  );
}
