import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import AfqtCalculator from "@/components/AfqtCalculator";
import JsonLd from "@/components/JsonLd";
import VerifiedBlock from "@/components/VerifiedBlock";

export const metadata: Metadata = {
  title: "AFQT Calculator 2026: Instant Percentile + Category from 4 Subtests",
  description:
    "Free AFQT score calculator. Enter AR, WK, PC, and MK standard scores to get your AFQT percentile, DoD category (I through V), and which branches you qualify for. Uses the official PAY97 conversion table.",
  alternates: {
    canonical: "https://asvabhero.com/afqt-calculator",
  },
};

export default function AfqtCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "AFQT Calculator",
          url: "https://asvabhero.com/afqt-calculator",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Calculate your AFQT percentile from Arithmetic Reasoning, Word Knowledge, Paragraph Comprehension, and Mathematics Knowledge. Shows DoD category and branch eligibility for 2026.",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How is the AFQT score calculated?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "AFQT = 2(VE) + AR + MK, where VE = WK + PC. The raw score is converted to a percentile using the 1997 Profile of American Youth (PAY97) norming table. Verbal counts twice, so Word Knowledge and Paragraph Comprehension have the biggest impact per point.",
              },
            },
            {
              "@type": "Question",
              name: "Is the AFQT a percentile or a raw score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A percentile. An AFQT of 60 means you outperformed 60% of the 1997 reference population, not that you got 60% of questions right. The percentile scale runs from 1 to 99.",
              },
            },
            {
              "@type": "Question",
              name: "What AFQT score do I need to join the military?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Diploma minimums for 2026: Army 31, Marine Corps 32, Navy 35, Air Force 36, Space Force 36, Coast Guard 40. GED holders face higher floors in every branch.",
              },
            },
            {
              "@type": "Question",
              name: "Which ASVAB subtests count toward the AFQT?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Four subtests: Arithmetic Reasoning (AR), Word Knowledge (WK), Paragraph Comprehension (PC), and Mathematics Knowledge (MK). The other five subtests (GS, EI, AS, MC, AO) feed into composite line scores used for job qualification, not the AFQT.",
              },
            },
            {
              "@type": "Question",
              name: "What does an AFQT of 50 mean?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "AFQT 50 puts you in Category IIIA. You qualify for all six branches (diploma track) and most enlistment bonus programs. 50 is the line between Category IIIB and IIIA, the most consequential threshold in military recruiting.",
              },
            },
            {
              "@type": "Question",
              name: "How accurate is an online AFQT calculator?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "This calculator uses the official PAY97 Table 2.5 lookup from the DMDC 2004 score scale report, the same table MEPS uses. Results are accurate if you enter your actual subtest standard scores from your ASVAB score sheet. Practice-test estimates are approximations.",
              },
            },
          ],
        }}
      />

      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          AFQT Calculator
        </h1>
        <p className="mt-3 text-lg text-text-secondary">
          Get your AFQT percentile from 4 subtest scores in seconds. See your
          DoD category and every branch you qualify for.
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
            label: "DMDC PAY97 score scale",
            url: "https://www.dmdc.osd.mil/",
          },
        ]}
      >
        <p>
          Your <strong>AFQT</strong> (Armed Forces Qualification Test) is a
          percentile, not a raw score. It comes from 4 of the 9 ASVAB subtests:{" "}
          <strong>AR + WK + PC + MK</strong>. The formula is{" "}
          <strong>2(VE) + AR + MK</strong> where VE = WK + PC, then the raw
          total is converted to a percentile using the 1997 Profile of American
          Youth (PAY97) norming table. Minimum to enlist with a diploma: Army
          31, Marines 32, Navy 35, Air Force 36, Space Force 36, Coast Guard 40.
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

      {/* Formula section */}
      <section className="mt-12 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          How the AFQT Formula Works
        </h2>
        <p className="mt-3 text-text-secondary">
          Two steps. First, compute the raw composite. Then look up the
          percentile.
        </p>
        <div className="mt-4 rounded-xl bg-navy p-4 text-center font-mono text-base font-bold text-accent">
          VE = WK + PC
          <br />
          Raw AFQT = 2 &times; VE + AR + MK
          <br />
          Percentile = PAY97 lookup(raw)
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            [
              "Arithmetic Reasoning (AR)",
              "Math word problems. 15 questions on the CAT-ASVAB.",
            ],
            [
              "Word Knowledge (WK)",
              "Vocabulary and synonyms. Doubles into VE, so gains here count twice.",
            ],
            [
              "Paragraph Comprehension (PC)",
              "Short reading passages. Also doubles into VE.",
            ],
            [
              "Mathematics Knowledge (MK)",
              "Pure math. Algebra, geometry, number theory.",
            ],
          ].map(([label, desc]) => (
            <div key={label} className="rounded-lg bg-navy px-4 py-3">
              <p className="font-mono text-sm font-bold text-accent">{label}</p>
              <p className="mt-1 text-sm text-text-secondary">{desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-text-tertiary">
          The other 5 ASVAB subtests (General Science, Electronics Information,
          Auto &amp; Shop, Mechanical Comprehension, Assembling Objects) have
          zero effect on your AFQT. They only feed composite line scores used
          for job assignment.
        </p>
      </section>

      {/* Percentile table */}
      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          AFQT Categories and What Each One Means
        </h2>
        <p className="mt-3 text-text-secondary">
          The DoD groups AFQT percentiles into 8 categories. The line between
          IIIB and IIIA at percentile 50 is the most consequential threshold in
          recruiting.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-text-secondary">
              <tr className="border-b border-navy-border">
                <th className="py-2 pr-4 text-left">Category</th>
                <th className="py-2 pr-4 text-left">Percentile</th>
                <th className="py-2 text-left">What It Means</th>
              </tr>
            </thead>
            <tbody className="text-text-primary">
              {[
                [
                  "I",
                  "93 to 99",
                  "Top tier. First pick of jobs, maximum bonuses.",
                ],
                [
                  "II",
                  "65 to 92",
                  "Highly qualified. Nearly every MOS/rate/AFSC open.",
                ],
                [
                  "IIIA",
                  "50 to 64",
                  "Above average. All branches plus most enlistment incentives.",
                ],
                [
                  "IIIB",
                  "31 to 49",
                  "Qualifies for most branches with diploma. Limited bonuses.",
                ],
                [
                  "IVA",
                  "21 to 30",
                  "Below most branch minimums. Waiver territory.",
                ],
                [
                  "IVB",
                  "16 to 20",
                  "Extremely limited. Very few branches will consider you.",
                ],
                [
                  "IVC",
                  "10 to 15",
                  "Essentially ineligible. No branch accepts in practice.",
                ],
                ["V", "1 to 9", "Barred from enlistment by federal law."],
              ].map(([cat, pct, desc]) => (
                <tr key={cat} className="border-b border-navy-border/50">
                  <td className="py-2 pr-4 font-mono font-bold text-accent">
                    {cat}
                  </td>
                  <td className="py-2 pr-4 font-mono text-text-secondary">
                    {pct}
                  </td>
                  <td className="py-2">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-text-tertiary">
          Category IV accessions are capped at 4% of annual recruits across all
          DoD branches by federal law (32 CFR 66.6). Category V is barred
          entirely.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          AFQT Calculator FAQ
        </h2>
        <div className="mt-4 divide-y divide-navy-border">
          {[
            {
              q: "How is the AFQT score calculated?",
              a: "AFQT = 2(VE) + AR + MK, where VE = WK + PC. The raw score is converted to a percentile using the 1997 PAY97 norming table. Because VE doubles, Word Knowledge and Paragraph Comprehension have the highest impact per point of any AFQT input.",
            },
            {
              q: "Is the AFQT a percentile or a raw score?",
              a: "A percentile. An AFQT of 60 means you outperformed 60% of the 1997 reference population (roughly 14,000 people aged 18 to 23). It is not the percent of questions you got right.",
            },
            {
              q: "What AFQT score do I need for each branch?",
              a: "Diploma minimums for 2026: Army 31, Marine Corps 32, Navy 35, Air Force 36, Space Force 36, Coast Guard 40. GED minimums are higher and often require additional college credits (Navy and Coast Guard both require 15 semester hours).",
            },
            {
              q: "Which 4 subtests count toward the AFQT?",
              a: "Arithmetic Reasoning (AR), Word Knowledge (WK), Paragraph Comprehension (PC), and Mathematics Knowledge (MK). The other 5 (GS, EI, AS, MC, AO) feed composite line scores used to assign jobs, not AFQT.",
            },
            {
              q: "What is a good AFQT score?",
              a: "50 or higher puts you in Category IIIA, which opens all six branches plus most bonus programs. 65 or higher (Category II) unlocks nearly every job including competitive programs like nuclear, cyber, and special operations.",
            },
            {
              q: "How accurate is this calculator?",
              a: "It uses the PAY97 Table 2.5 lookup from the DMDC 2004 score scale report, the same conversion MEPS runs. Accuracy depends on the input: real standard scores from an ASVAB score sheet give precise results; practice-test estimates are approximations.",
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
            Use the{" "}
            <Link
              href="/calculator"
              className="text-accent underline hover:text-accent-hover"
            >
              full ASVAB calculator
            </Link>{" "}
            to see every military job you qualify for across all 6 branches.
          </li>
          <li>
            Read{" "}
            <Link
              href="/afqt-score"
              className="text-accent underline hover:text-accent-hover"
            >
              AFQT score explained
            </Link>{" "}
            for a deep dive on categories, branch minimums, and study strategy.
          </li>
          <li>
            Take a{" "}
            <Link
              href="/practice-test"
              className="text-accent underline hover:text-accent-hover"
            >
              free practice test
            </Link>{" "}
            to estimate your AFQT before MEPS.
          </li>
          <li>
            If you already tested and want to improve, see{" "}
            <Link
              href="/how-to-retake-the-asvab"
              className="text-accent underline hover:text-accent-hover"
            >
              how to retake the ASVAB
            </Link>{" "}
            and the{" "}
            <Link
              href="/asvab-retake-calculator"
              className="text-accent underline hover:text-accent-hover"
            >
              retake date calculator
            </Link>
            .
          </li>
          <li>
            Targeting one branch? See the{" "}
            <Link
              href="/army-afqt-calculator"
              className="text-accent underline hover:text-accent-hover"
            >
              Army
            </Link>
            ,{" "}
            <Link
              href="/navy-afqt-calculator"
              className="text-accent underline hover:text-accent-hover"
            >
              Navy
            </Link>
            ,{" "}
            <Link
              href="/air-force-afqt-calculator"
              className="text-accent underline hover:text-accent-hover"
            >
              Air Force
            </Link>
            , and{" "}
            <Link
              href="/marines-afqt-calculator"
              className="text-accent underline hover:text-accent-hover"
            >
              Marines
            </Link>{" "}
            AFQT pages for branch-specific minimums and below-floor paths.
          </li>
        </ul>
      </section>
    </div>
  );
}
