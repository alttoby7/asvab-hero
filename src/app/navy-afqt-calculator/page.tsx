import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import AfqtCalculator from "@/components/AfqtCalculator";
import JsonLd from "@/components/JsonLd";
import VerifiedBlock from "@/components/VerifiedBlock";

export const metadata: Metadata = {
  title: "Navy AFQT Calculator 2026: Check If You Meet the 35 Minimum",
  description:
    "Free Navy and Coast Guard AFQT calculator. Enter AR, WK, PC, MK to see if you meet the Navy 35 minimum (50 + 15 college credits with GED). Coast Guard requires 40.",
  alternates: {
    canonical: "https://asvabhero.com/navy-afqt-calculator",
  },
};

export default function NavyAfqtCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Navy AFQT Calculator",
          url: "https://asvabhero.com/navy-afqt-calculator",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Check if your AFQT meets the Navy minimum of 35 for diploma holders. Coast Guard requires 40. Instant percentile from 4 subtest scores.",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What AFQT score do I need for the Navy?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "35 with a high school diploma. GED holders need 50 AFQT plus 15 semester hours of college credit. The Navy also runs a DEP Enrichment Program for diploma holders scoring 28 to 30.",
              },
            },
            {
              "@type": "Question",
              name: "What about the Coast Guard AFQT minimum?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Coast Guard requires 40 with a diploma, making it the highest floor of any branch. GED holders need 50 plus 15 college credits, the same structure the Navy uses.",
              },
            },
            {
              "@type": "Question",
              name: "What is the Navy DEP Enrichment Program?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A provisional enlistment path for diploma holders scoring AFQT 28 to 30. You enter the Delayed Entry Program, receive study resources, and must retest to 35 before shipping to boot camp. Limited slots depending on Navy recruiting goals.",
              },
            },
            {
              "@type": "Question",
              name: "What AFQT do I need for Navy Nuclear?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Nuclear programs require much higher than the 35 enlistment floor. The Nuclear Field qualification score uses subtest combinations: typically AR + MK + EI + GS totaling 235, or VE + AR + MK + MC totaling 235. Most successful Nuke applicants have AFQT 65+ (Category II).",
              },
            },
          ],
        }}
      />

      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Navy AFQT Calculator
        </h1>
        <p className="mt-3 text-lg text-text-secondary">
          Check if your AFQT clears the Navy floor. Minimum is 35 with a
          diploma. GED path requires 50 plus 15 college credits.
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
            label: "navy.com",
            url: "https://www.navy.com/joining/requirements",
          },
        ]}
      >
        <p>
          The <strong>Navy AFQT minimum is 35</strong> for diploma holders.
          GED holders need <strong>50 plus 15 semester hours of college
          credit</strong>. The Coast Guard uses the same GED structure but
          with a higher diploma floor of 40. Diploma holders scoring 28
          to 30 can enter the DEP Enrichment Program and retest to 35
          before shipping. The calculator below runs your 4 AFQT subtests
          (AR, WK, PC, MK) through the official PAY97 Table 2.5 lookup.
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

      {/* Navy specifics */}
      <section className="mt-12 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Navy and Coast Guard AFQT Requirements
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
                <td className="py-2 pr-4 font-semibold">Navy (diploma)</td>
                <td className="py-2 pr-4 font-mono font-bold text-accent">35</td>
                <td className="py-2 text-text-secondary">
                  Category IIIB or above.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold">Navy (GED)</td>
                <td className="py-2 pr-4 font-mono font-bold text-accent">50 + 15 credits</td>
                <td className="py-2 text-text-secondary">
                  Category IIIA minimum, plus college credit requirement.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold">Navy DEP Enrichment</td>
                <td className="py-2 pr-4 font-mono font-bold text-accent">28 to 30</td>
                <td className="py-2 text-text-secondary">
                  Provisional. Must retest to 35 before shipping.
                </td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold">Coast Guard (diploma)</td>
                <td className="py-2 pr-4 font-mono font-bold text-accent">40</td>
                <td className="py-2 text-text-secondary">
                  Highest floor of any branch.
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold">Coast Guard (GED)</td>
                <td className="py-2 pr-4 font-mono font-bold text-accent">50 + 15 credits</td>
                <td className="py-2 text-text-secondary">
                  Same college-credit rule as Navy.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-text-tertiary">
          The 15 semester hours can come from a community college, dual
          enrollment, or accredited online programs. CLEP credits also
          count in most cases. Confirm with your recruiter before
          enrolling.
        </p>
      </section>

      {/* Below minimum path */}
      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          What If Your AFQT Is Below 35?
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">DEP Enrichment (AFQT 28 to 30)</p>
            <p className="mt-1 text-sm text-text-secondary">
              Diploma holders can enter the Delayed Entry Program
              provisionally, receive Navy-provided study resources, and
              retest. You must reach 35 before shipping to boot camp.
              Slot availability depends on Navy recruiting needs.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Retake the ASVAB</p>
            <p className="mt-1 text-sm text-text-secondary">
              Wait 1 month, retest. Wait another month, retest again.
              Then every 6 months. Target WK and PC first (doubled in the
              AFQT formula). See{" "}
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
          Navy AFQT FAQ
        </h2>
        <div className="mt-4 divide-y divide-navy-border">
          {[
            {
              q: "What AFQT score do I need for the Navy?",
              a: "35 with a diploma, 50 plus 15 semester hours of college credit with a GED. The Navy has a middle floor: higher than Army (31) and Marines (32), lower than Air Force (36) and Coast Guard (40).",
            },
            {
              q: "What about the Coast Guard AFQT minimum?",
              a: "Coast Guard requires 40 with a diploma, the highest floor of any branch. GED holders need 50 plus 15 college credits, matching the Navy structure. Coast Guard is the most selective branch per slot; expect recruiter preference for higher scores.",
            },
            {
              q: "What is the Navy DEP Enrichment Program?",
              a: "A provisional path for diploma holders scoring AFQT 28 to 30. You enter the Delayed Entry Program, get Navy study resources, and retest. You cannot ship to boot camp until you reach 35. Slots are limited and depend on Navy recruiting goals.",
            },
            {
              q: "What AFQT do I need for Navy Nuclear?",
              a: "Nuclear programs use composite score combinations, not AFQT alone. Typical quals include AR + MK + EI + GS totaling 235 or higher, or VE + AR + MK + MC totaling 235. In practice, most successful Nuke applicants score AFQT 65 or above (Category II).",
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
            Check every Navy rate you qualify for on the{" "}
            <Link
              href="/navy-asvab-score-calculator"
              className="text-accent underline hover:text-accent-hover"
            >
              Navy ASVAB calculator
            </Link>{" "}
            (all 9 subtests, all Navy composite scores).
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
            Navy-specific score detail:{" "}
            <Link
              href="/navy-asvab-score"
              className="text-accent underline hover:text-accent-hover"
            >
              Navy ASVAB score guide
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
            for categories and study strategy.
          </li>
        </ul>
      </section>
    </div>
  );
}
