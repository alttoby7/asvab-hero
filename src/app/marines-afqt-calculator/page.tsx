import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import AfqtCalculator from "@/components/AfqtCalculator";
import JsonLd from "@/components/JsonLd";
import VerifiedBlock from "@/components/VerifiedBlock";

export const metadata: Metadata = {
  title: "Marines AFQT Calculator 2026: Check If You Meet the 32 / 50 Minimum",
  description:
    "Free Marine Corps AFQT calculator. 32 with a high school diploma, 50 with a GED. The diploma-versus-GED gap is the biggest in any branch. See where you stand.",
  alternates: {
    canonical: "https://asvabhero.com/marines-afqt-calculator",
  },
};

export default function MarinesAfqtCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marines AFQT Calculator",
          url: "https://asvabhero.com/marines-afqt-calculator",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Check if your AFQT meets the Marine Corps minimum of 32 for diploma holders or 50 for GED holders. Instant percentile from 4 subtest scores.",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What AFQT score do I need for the Marines?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "32 with a high school diploma, 50 with a GED. The 18-point jump from diploma to GED is the largest in any branch. Marines also cap GED accessions at roughly 5% of annual recruits.",
              },
            },
            {
              "@type": "Question",
              name: "Why is the Marines GED minimum so much higher than diploma?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Marine Corps strongly prefers diploma holders for cultural and attrition reasons. Tier 2 applicants (GED) must both score 50 AFQT (Category IIIA) and compete for a very small slot pool, roughly 5% of annual accessions.",
              },
            },
            {
              "@type": "Question",
              name: "What if my AFQT is below 32?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Marines do not run a prep course like the Army FSPC or the Navy DEP Enrichment Program. Your options are retake the ASVAB or target the Army (31 diploma minimum), the only branch with a lower floor.",
              },
            },
            {
              "@type": "Question",
              name: "Do the Marines accept AFQT waivers?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Category IV waivers (AFQT 21 to 30) are rare in the Marines. Marine Corps historically runs the lowest Category IV percentage of any branch. Effectively, 32 is a hard floor for diploma holders.",
              },
            },
          ],
        }}
      />

      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Marines AFQT Calculator
        </h1>
        <p className="mt-3 text-lg text-text-secondary">
          Check if your AFQT clears the Marine Corps floor. Minimum is 32
          with a diploma, 50 with a GED. The biggest diploma-versus-GED
          gap of any branch.
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
            label: "marines.com",
            url: "https://www.marines.com/becoming-a-marine/requirements.html",
          },
        ]}
      >
        <p>
          The <strong>Marine Corps AFQT minimum is 32</strong> for diploma
          holders and <strong>50 for GED holders</strong>. That 18-point
          diploma-versus-GED gap is the largest of any branch. The Marines
          also cap GED accessions at roughly 5% of annual recruits, which
          means even a 50 AFQT with a GED puts you in a tight slot pool.
          The calculator below runs your 4 AFQT subtests (AR, WK, PC, MK)
          through the official PAY97 Table 2.5 lookup.
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

      {/* Marines specifics */}
      <section className="mt-12 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Marines AFQT: Diploma vs GED Is the Whole Story
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
                <td className="py-2 pr-4 font-semibold">High school diploma (Tier 1)</td>
                <td className="py-2 pr-4 font-mono font-bold text-accent">32</td>
                <td className="py-2 text-text-secondary">
                  Category IIIB or above. Majority of Marine recruits.
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold">GED (Tier 2)</td>
                <td className="py-2 pr-4 font-mono font-bold text-accent">50</td>
                <td className="py-2 text-text-secondary">
                  Category IIIA + ~5% annual cap on total GED accessions.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-text-tertiary">
          The Marines divide applicants into Tier 1 (diploma or higher),
          Tier 2 (GED, homeschool, alternative credentials), and Tier 3
          (no credential). Tier 3 is almost never accepted. Tier 2 needs
          the 50 AFQT plus the slot availability.
        </p>
      </section>

      {/* Below minimum path */}
      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          What If Your AFQT Is Below 32 (Diploma) or 50 (GED)?
        </h2>
        <p className="mt-3 text-text-secondary">
          The Marines run no formal prep program. These are your real
          options:
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Retake the ASVAB</p>
            <p className="mt-1 text-sm text-text-secondary">
              Wait 1 month, retest. Wait another month, retest again. Then
              every 6 months. Study WK and PC first (verbal doubles in the
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
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">GED holders: earn 15 college credits</p>
            <p className="mt-1 text-sm text-text-secondary">
              Marines do not accept 50 + 15 credits as a substitute (that
              rule is Navy and Coast Guard only). But completing 15
              credits moves you to Tier 1 status in every branch, which
              drops the Marines floor from 50 back down to 32.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Target the Army (31 floor)</p>
            <p className="mt-1 text-sm text-text-secondary">
              The only branch with a lower diploma AFQT minimum. Plus the
              Army runs the Future Soldier Preparatory Course for AFQT
              21 to 30, a path the Marines do not offer.
            </p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Confirm your Tier status</p>
            <p className="mt-1 text-sm text-text-secondary">
              Some credentials (homeschool with documentation, GED + some
              credits, online-only high school) sit in a gray zone. A
              Marine recruiter can tell you whether you are Tier 1 or
              Tier 2 before you invest in retesting.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Marines AFQT FAQ
        </h2>
        <div className="mt-4 divide-y divide-navy-border">
          {[
            {
              q: "What AFQT score do I need for the Marines?",
              a: "32 with a high school diploma, 50 with a GED. The 18-point gap between diploma and GED is the largest in any branch. The Marines also cap GED accessions at roughly 5% of annual recruits.",
            },
            {
              q: "Why is the Marines GED minimum so much higher than diploma?",
              a: "The Marine Corps prefers Tier 1 applicants (diploma holders) and keeps Tier 2 (GED) slots scarce for cultural and attrition reasons. A GED holder scoring 50 still competes for that small pool, so recruiter interest often requires 55 or 60 in practice.",
            },
            {
              q: "What if my AFQT is below 32?",
              a: "The Marines do not run a prep program. Your best options are retake the ASVAB (focus on WK and PC since verbal is doubled in the AFQT formula) or target the Army, the only branch with a lower floor at 31 diploma.",
            },
            {
              q: "Do the Marines accept AFQT waivers?",
              a: "Category IV waivers (AFQT 21 to 30) are extremely rare in the Marines. The branch historically runs the lowest Category IV percentage across the DoD. Treat 32 as a hard floor rather than something you can waiver around.",
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
            Check every Marine MOS you qualify for on the{" "}
            <Link
              href="/asvab-score-for-marines"
              className="text-accent underline hover:text-accent-hover"
            >
              Marines ASVAB score guide
            </Link>{" "}
            and the{" "}
            <Link
              href="/usmc-mos-list"
              className="text-accent underline hover:text-accent-hover"
            >
              USMC MOS list
            </Link>
            .
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
            Need to raise your AFQT fast? Start with{" "}
            <Link
              href="/asvab-word-knowledge-tips"
              className="text-accent underline hover:text-accent-hover"
            >
              Word Knowledge tips
            </Link>{" "}
            (doubled in the formula).
          </li>
        </ul>
      </section>
    </div>
  );
}
