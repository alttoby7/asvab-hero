import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import AfqtCalculator from "@/components/AfqtCalculator";
import JsonLd from "@/components/JsonLd";
import VerifiedBlock from "@/components/VerifiedBlock";

export const metadata: Metadata = {
  title: "Air Force AFQT Calculator 2026: Check If You Meet the 36 Minimum",
  description:
    "Free Air Force and Space Force AFQT calculator. Enter AR, WK, PC, MK to see if you meet the 36 diploma minimum (65 with GED). Uses the official PAY97 conversion table.",
  alternates: {
    canonical: "https://asvabhero.com/air-force-afqt-calculator",
  },
};

export default function AirForceAfqtCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Air Force AFQT Calculator",
          url: "https://asvabhero.com/air-force-afqt-calculator",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Check if your AFQT meets the Air Force and Space Force minimum of 36 for diploma holders (65 with GED). Instant percentile from 4 subtest scores.",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What AFQT score do I need for the Air Force?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "36 with a high school diploma, 65 with a GED. The Space Force uses the same minimums. These are the highest diploma floors of any branch after the Coast Guard, and the Air Force rarely accepts waivers below 36.",
              },
            },
            {
              "@type": "Question",
              name: "Does the Air Force take Category IV recruits?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Almost never. The Air Force historically runs less than 1% Category IV accessions (AFQT 21 to 30). If your AFQT is below 36, the practical answer is retake the test, not pursue a waiver.",
              },
            },
            {
              "@type": "Question",
              name: "Is Space Force AFQT different from Air Force?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Space Force uses the Air Force enlistment standards: AFQT 36 with a diploma, 65 with a GED. The difference is that Space Force accession numbers are tiny, so competition for slots is fierce even with a qualifying score.",
              },
            },
            {
              "@type": "Question",
              name: "What if I have a GED and score below 65?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You will not be accepted by the Air Force or Space Force. The GED path requires 65. The fastest route for GED holders scoring 50 to 64 is 15 semester hours of college credit plus the Navy or Coast Guard, which accept 50 with credits.",
              },
            },
          ],
        }}
      />

      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Air Force AFQT Calculator
        </h1>
        <p className="mt-3 text-lg text-text-secondary">
          Check if your AFQT clears the Air Force and Space Force floor.
          Minimum is 36 with a diploma, 65 with a GED.
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
            label: "airforce.com",
            url: "https://www.airforce.com/frequently-asked-questions",
          },
        ]}
      >
        <p>
          The <strong>Air Force AFQT minimum is 36</strong> for diploma
          holders and <strong>65 for GED holders</strong>. Space Force uses
          the same standards. These are tied with Space Force as the second
          highest branch floors, only Coast Guard sits higher at 40. The
          calculator below runs your 4 AFQT subtests (AR, WK, PC, MK) through
          the official PAY97 Table 2.5 lookup so you know exactly where you
          stand before MEPS.
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

      {/* Air Force specifics */}
      <section className="mt-12 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Air Force and Space Force AFQT Requirements
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-text-secondary">
              <tr className="border-b border-navy-border">
                <th className="py-2 pr-4 text-left">Education</th>
                <th className="py-2 pr-4 text-left">Minimum AFQT</th>
                <th className="py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody className="text-text-primary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold">High school diploma</td>
                <td className="py-2 pr-4 font-mono font-bold text-accent">36</td>
                <td className="py-2 text-text-secondary">
                  Category IIIB or above. Waivers below 36 are rare.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold">GED</td>
                <td className="py-2 pr-4 font-mono font-bold text-accent">65</td>
                <td className="py-2 text-text-secondary">
                  Category II. Air Force accepts roughly 0.5% GED holders per year.
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold">Space Force</td>
                <td className="py-2 pr-4 font-mono font-bold text-accent">36 / 65</td>
                <td className="py-2 text-text-secondary">
                  Same standards as Air Force. Fewer annual slots.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-text-tertiary">
          Minimums are peacetime floors. The Air Force has historically
          raised effective cutoffs during strong recruiting years, which
          means your recruiter may want to see 50 or higher even when the
          policy floor is 36.
        </p>
      </section>

      {/* Below minimum path */}
      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          What If Your AFQT Is Below 36?
        </h2>
        <p className="mt-3 text-text-secondary">
          The Air Force does not run a prep program like the Army&apos;s
          Future Soldier Preparatory Course. Your realistic options:
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Retake the ASVAB</p>
            <p className="mt-1 text-sm text-text-secondary">
              Wait 1 month, retest. Wait another month, retest again. Then
              every 6 months. Focus study on WK and PC (doubled in the AFQT
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
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Target a lower-floor branch</p>
            <p className="mt-1 text-sm text-text-secondary">
              Army (31), Marines (32), and Navy (35) all accept diploma
              holders below the Air Force cutoff. Many airmen cross-train
              into aviation and cyber roles from other branches.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Air Force AFQT FAQ
        </h2>
        <div className="mt-4 divide-y divide-navy-border">
          {[
            {
              q: "What AFQT score do I need for the Air Force?",
              a: "36 with a diploma, 65 with a GED. These are the same minimums for the Space Force. If you are scoring in the 30s on practice tests, aim for 50 or higher before going to MEPS. Recruiter priority goes to higher-scoring applicants.",
            },
            {
              q: "Does the Air Force take Category IV recruits?",
              a: "Almost never. The Air Force has historically capped Category IV accessions at less than 1% per year. A 31 AFQT that qualifies you for the Army will not get you into the Air Force. Retesting is the better path.",
            },
            {
              q: "Is Space Force AFQT different from Air Force?",
              a: "No, the minimums are identical. Both require 36 with a diploma and 65 with a GED. The difference is total force size. Space Force has only a few thousand active duty guardians, so even with a qualifying score, you may not get a slot.",
            },
            {
              q: "What if I have a GED and score below 65?",
              a: "The Air Force and Space Force will not accept you. Your alternatives: retake the ASVAB targeting 65+, or pursue the Navy or Coast Guard, both of which accept 50 AFQT for GED holders who also complete 15 semester hours of college credit.",
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
            Check every Air Force AFSC you qualify for on the{" "}
            <Link
              href="/air-force-asvab-calculator"
              className="text-accent underline hover:text-accent-hover"
            >
              Air Force ASVAB calculator
            </Link>{" "}
            (all 9 subtests, all 4 MAGE composites).
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
            Read{" "}
            <Link
              href="/afqt-score"
              className="text-accent underline hover:text-accent-hover"
            >
              AFQT score explained
            </Link>{" "}
            for the full breakdown of categories and strategy.
          </li>
          <li>
            Not meeting the floor yet? Start with{" "}
            <Link
              href="/asvab-word-knowledge-tips"
              className="text-accent underline hover:text-accent-hover"
            >
              Word Knowledge tips
            </Link>{" "}
            (doubled in the AFQT formula for fastest gains).
          </li>
        </ul>
      </section>
    </div>
  );
}
