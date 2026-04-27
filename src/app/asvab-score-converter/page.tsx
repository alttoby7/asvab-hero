import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import AsvabScoreConverter from "@/components/AsvabScoreConverter";
import EmailCapture from "@/components/EmailCapture";
import JsonLd from "@/components/JsonLd";
import VerifiedBlock from "@/components/VerifiedBlock";

export const metadata: Metadata = {
  title: "ASVAB Score Converter 2026: Subtests to AFQT, VE, GT in Seconds",
  description:
    "Free ASVAB score converter. Turn your AR, WK, PC, and MK standard scores into AFQT percentile, VE, raw AFQT, and Army GT. Branch eligibility included. Uses the official PAY97 conversion table.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-score-converter",
  },
};

export default function AsvabScoreConverterPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "ASVAB Score Converter",
          url: "https://asvabhero.com/asvab-score-converter",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Convert ASVAB subtest standard scores into AFQT percentile, VE, raw AFQT composite, and Army GT line score. Includes DoD category, branch eligibility, and 2026 minimums.",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How do you convert ASVAB raw scores to AFQT percentile?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Combine your four AFQT subtest standard scores using 2(VE) + AR + MK, where VE = WK + PC. Then look the raw composite up on the PAY97 conversion table. The output is a percentile from 1 to 99, ranking you against the 1997 Profile of American Youth reference group. The math is non-linear, so a 5-point standard score gain near the middle of the distribution moves your percentile more than the same gain at the top.",
              },
            },
            {
              "@type": "Question",
              name: "What is the VE score and why does it double?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "VE stands for Verbal Expression. It equals WK + PC, the sum of your Word Knowledge and Paragraph Comprehension standard scores. The AFQT formula multiplies VE by two, so verbal points count twice while AR and MK count once. That is why a 5-point gain in WK or PC moves your AFQT more than a 5-point gain in math.",
              },
            },
            {
              "@type": "Question",
              name: "How do you calculate the GT line score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Army GT = AR + VE, where VE = WK + PC. The Army uses GT as the gatekeeper for warrant officer, Special Forces, and most enlisted leadership tracks. GT 110 is the cut for officer commissioning programs, Green to Gold, and Special Forces selection. The Marines and Air Force use the same inputs but bundle them into different composites.",
              },
            },
            {
              "@type": "Question",
              name: "Are AFQT and ASVAB the same number?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The ASVAB is the test. The AFQT is one score derived from four of the nine subtests (AR, WK, PC, MK). Branch enlistment minimums are AFQT minimums. Specific job qualifications use composite line scores like Army GT, Air Force MAGE, or Navy ratings, which mix in the other five subtests.",
              },
            },
            {
              "@type": "Question",
              name: "What standard score range is normal on the ASVAB?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Subtest standard scores run 20 to 99 with a mean of 50 and a standard deviation of 10. About 68% of test takers fall between 40 and 60. A standard score of 60 is roughly the 84th percentile of the military applicant pool, not 60% of questions correct.",
              },
            },
            {
              "@type": "Question",
              name: "Can the converter use my practice test scores?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, with one caveat. Standard scores from quality practice tests approximate real ASVAB output reasonably well, so the AFQT percentile and GT will be in the right ballpark. Practice test estimates are not MEPS-grade. For the final number, only your real ASVAB score sheet matters.",
              },
            },
            {
              "@type": "Question",
              name: "Does the converter handle GED minimums?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The converter computes the AFQT percentile and shows diploma-track minimums. GED minimums are higher: 50 for Army and Marines, 50 plus 15 college credits for Navy and Coast Guard, and 65 for Air Force and Space Force. If you hold a GED, add those higher floors to the diploma cuts shown.",
              },
            },
          ],
        }}
      />

      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          ASVAB Score Converter
        </h1>
        <p className="mt-3 text-lg text-text-secondary">
          Type in four standard scores. Get AFQT percentile, VE, raw AFQT,
          Army GT, DoD category, and branch eligibility. No login.
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
            label: "DMDC PAY97 score scale (2004)",
            url: "https://www.dmdc.osd.mil/",
          },
        ]}
      >
        <p>
          ASVAB score conversion has three layers. <strong>Subtest standard
          scores</strong> (20 to 99) come straight off your score sheet.{" "}
          <strong>VE</strong> is WK + PC. <strong>Raw AFQT</strong> is{" "}
          <strong>2(VE) + AR + MK</strong>. The raw composite is then looked
          up on the PAY97 percentile table to produce your{" "}
          <strong>AFQT percentile</strong> (1 to 99), which is what every
          branch uses for enlistment minimums. Composite line scores like
          Army GT, Marine GT, or Air Force G are computed from the same
          subtests but bundled differently for job qualification.
        </p>
      </VerifiedBlock>

      <section className="mt-8">
        <Suspense
          fallback={
            <div className="rounded-lg border border-navy-border bg-navy-light p-6 text-text-secondary">
              Loading converter...
            </div>
          }
        >
          <AsvabScoreConverter />
        </Suspense>
      </section>

      {/* Conversion map */}
      <section className="mt-12 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          The conversion chain in one diagram
        </h2>
        <p className="mt-3 text-text-secondary">
          Every ASVAB number on your score sheet falls into one of four
          buckets. Knowing which bucket each number lives in is most of the
          battle.
        </p>
        <div className="mt-4 rounded-xl bg-navy p-4 font-mono text-sm text-text-primary">
          <p className="text-accent">Layer 1: Standard scores (20 to 99)</p>
          <p className="text-text-secondary">AR · WK · PC · MK · GS · EI · AS · MC · AO</p>
          <p className="mt-3 text-accent">Layer 2: Verbal Expression</p>
          <p className="text-text-secondary">VE = WK + PC</p>
          <p className="mt-3 text-accent">Layer 3: Raw composites</p>
          <p className="text-text-secondary">Raw AFQT = 2(VE) + AR + MK</p>
          <p className="text-text-secondary">Army GT = AR + VE</p>
          <p className="mt-3 text-accent">Layer 4: Percentile (PAY97 lookup)</p>
          <p className="text-text-secondary">AFQT percentile = 1 to 99</p>
        </div>
        <p className="mt-4 text-xs text-text-tertiary">
          The other five subtests (GS, EI, AS, MC, AO) do not change your
          AFQT. They only feed branch composite line scores used to qualify
          for specific jobs.
        </p>
      </section>

      {/* Standard score percentile table */}
      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Standard score to applicant percentile
        </h2>
        <p className="mt-3 text-text-secondary">
          Subtest standard scores have a mean of 50 and a standard deviation
          of 10 across the military applicant pool. Use this as a sanity
          check when your converter output feels off.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-text-secondary">
              <tr className="border-b border-navy-border">
                <th className="py-2 pr-4 text-left">Standard score</th>
                <th className="py-2 pr-4 text-left">Approx. applicant percentile</th>
                <th className="py-2 text-left">Reading</th>
              </tr>
            </thead>
            <tbody className="text-text-primary">
              {[
                ["30", "2", "Two standard deviations below the mean"],
                ["40", "16", "One SD below"],
                ["50", "50", "Exact applicant mean"],
                ["60", "84", "One SD above"],
                ["70", "98", "Two SD above"],
                ["80+", "99", "Top of the distribution"],
              ].map(([ss, pct, read]) => (
                <tr key={ss} className="border-b border-navy-border/50">
                  <td className="py-2 pr-4 font-mono font-bold text-accent">{ss}</td>
                  <td className="py-2 pr-4 font-mono text-text-secondary">{pct}</td>
                  <td className="py-2">{read}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-text-tertiary">
          AFQT percentile uses a different reference group (PAY97, 1997
          civilian youth) and a non-linear lookup, so subtest percentile and
          AFQT percentile do not match exactly.
        </p>
      </section>

      {/* AFQT percentile categories */}
      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          AFQT percentile to DoD category
        </h2>
        <p className="mt-3 text-text-secondary">
          Once the converter spits out your AFQT percentile, the DoD bins it
          into one of eight categories. Categories drive bonus eligibility
          and accession caps.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-text-secondary">
              <tr className="border-b border-navy-border">
                <th className="py-2 pr-4 text-left">Category</th>
                <th className="py-2 pr-4 text-left">Percentile</th>
                <th className="py-2 text-left">What it unlocks</th>
              </tr>
            </thead>
            <tbody className="text-text-primary">
              {[
                ["I", "93 to 99", "All jobs, top bonuses, every branch"],
                ["II", "65 to 92", "Nearly every MOS, rate, and AFSC"],
                ["IIIA", "50 to 64", "All branches plus most enlistment incentives"],
                ["IIIB", "31 to 49", "Most branches, limited bonuses"],
                ["IVA", "21 to 30", "Below most branch floors, waiver territory"],
                ["IVB", "16 to 20", "Very few branches will consider"],
                ["IVC", "10 to 15", "Effectively ineligible"],
                ["V", "1 to 9", "Barred from enlistment by federal law"],
              ].map(([cat, pct, desc]) => (
                <tr key={cat} className="border-b border-navy-border/50">
                  <td className="py-2 pr-4 font-mono font-bold text-accent">{cat}</td>
                  <td className="py-2 pr-4 font-mono text-text-secondary">{pct}</td>
                  <td className="py-2">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-text-tertiary">
          Category IV accessions are capped at 4% of annual recruits across
          DoD by 32 CFR 66.6. Category V is barred entirely.
        </p>
      </section>

      {/* GT and composite mapping */}
      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          GT and other composite formulas
        </h2>
        <p className="mt-3 text-text-secondary">
          AFQT decides whether you can enlist. Composites decide what job
          you get. The same subtests get rebundled by each branch.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-text-secondary">
              <tr className="border-b border-navy-border">
                <th className="py-2 pr-4 text-left">Composite</th>
                <th className="py-2 pr-4 text-left">Branch</th>
                <th className="py-2 text-left">Formula</th>
              </tr>
            </thead>
            <tbody className="text-text-primary">
              {[
                ["GT (General Technical)", "Army", "AR + VE"],
                ["GT", "Marines", "AR + WK + PC (effectively AR + VE)"],
                ["G (General)", "Air Force", "AR + WK + PC"],
                ["EL (Electronics)", "Army", "GS + AR + MK + EI"],
                ["MM (Mechanical Maintenance)", "Army", "AS + MC + EI"],
                ["CL (Clerical)", "Army", "VE + AR + MK"],
                ["ST (Skilled Technical)", "Army", "GS + VE + AR + MK"],
                ["M (Mechanical)", "Air Force", "MC + AS + GS"],
                ["A (Administrative)", "Air Force", "WK + PC + MK"],
                ["E (Electronics)", "Air Force", "GS + AR + MK + EI"],
              ].map(([comp, branch, formula]) => (
                <tr key={`${comp}-${branch}`} className="border-b border-navy-border/50">
                  <td className="py-2 pr-4 font-mono text-accent">{comp}</td>
                  <td className="py-2 pr-4 text-text-secondary">{branch}</td>
                  <td className="py-2 font-mono text-text-primary">{formula}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-text-tertiary">
          Navy uses 20-plus rating-specific composites instead of a unified
          GT. Coast Guard borrows Army formulas. Space Force uses Air Force
          MAGE plus a few extras for cyber AFSCs.
        </p>
        <p className="mt-3 text-sm text-text-secondary">
          For the GT-specific deep dive, see{" "}
          <Link
            href="/asvab-gt-score"
            className="text-accent underline hover:text-accent-hover"
          >
            the ASVAB GT score guide
          </Link>
          . For full job-by-job composite cuts, use the{" "}
          <Link
            href="/calculator"
            className="text-accent underline hover:text-accent-hover"
          >
            full ASVAB calculator
          </Link>
          .
        </p>
      </section>

      {/* Email capture */}
      <section className="mt-12">
        <EmailCapture
          headline="Get a 30-day plan that targets your weakest converter input"
          subhead="Free 6-page PDF plus a 5-email crash course on AFQT and line scores. Sent in the next 5 minutes."
          cta="Email me the plan"
          tag="asvab-score-converter"
        />
      </section>

      {/* FAQ */}
      <section className="mt-12 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          ASVAB score converter FAQ
        </h2>
        <div className="mt-4 divide-y divide-navy-border">
          {[
            {
              q: "How do you convert ASVAB raw scores to AFQT percentile?",
              a: "Combine your four AFQT subtest standard scores using 2(VE) + AR + MK, where VE = WK + PC. Then look the raw composite up on the PAY97 conversion table. The output is a percentile from 1 to 99, ranking you against the 1997 Profile of American Youth reference group. The math is non-linear, so a 5-point standard score gain near the middle of the distribution moves your percentile more than the same gain at the top.",
            },
            {
              q: "What is the VE score and why does it double?",
              a: "VE stands for Verbal Expression. It equals WK + PC, the sum of your Word Knowledge and Paragraph Comprehension standard scores. The AFQT formula multiplies VE by two, so verbal points count twice while AR and MK count once. That is why a 5-point gain in WK or PC moves your AFQT more than a 5-point gain in math.",
            },
            {
              q: "How do you calculate the GT line score?",
              a: "Army GT = AR + VE, where VE = WK + PC. GT is the gatekeeper for warrant officer, Special Forces, and most Army leadership tracks. GT 110 is the threshold for officer commissioning programs, Green to Gold, and Special Forces selection. Marines and Air Force use the same inputs but bundle them into different composites.",
            },
            {
              q: "Are AFQT and ASVAB the same number?",
              a: "No. The ASVAB is the test. The AFQT is one score derived from four of the nine subtests (AR, WK, PC, MK). Branch enlistment minimums are AFQT minimums. Specific job qualifications use composite line scores like Army GT, Air Force MAGE, or Navy ratings, which mix in the other five subtests.",
            },
            {
              q: "What standard score range is normal on the ASVAB?",
              a: "Subtest standard scores run 20 to 99 with a mean of 50 and a standard deviation of 10. About 68% of applicants fall between 40 and 60. A 60 is roughly the 84th percentile of the applicant pool, not 60% of questions correct.",
            },
            {
              q: "Can the converter use my practice test scores?",
              a: "Yes, with one caveat. Standard scores from quality practice tests approximate real ASVAB output reasonably well, so the AFQT percentile and GT will be in the right ballpark. Practice test estimates are not MEPS-grade. For the final number, only your real ASVAB score sheet matters.",
            },
            {
              q: "Does the converter handle GED minimums?",
              a: "The converter computes AFQT and shows diploma-track minimums. GED minimums are higher: 50 for Army and Marines, 50 plus 15 college credits for Navy and Coast Guard, and 65 for Air Force and Space Force. If you hold a GED, add those higher floors to the diploma cuts shown.",
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

      {/* Next steps */}
      <section className="mt-8 rounded-xl border border-accent/30 bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Next steps
        </h2>
        <ul className="mt-4 space-y-3 text-text-secondary">
          <li>
            Want job-by-job cuts? Use the{" "}
            <Link
              href="/calculator"
              className="text-accent underline hover:text-accent-hover"
            >
              full ASVAB calculator
            </Link>{" "}
            to see every MOS, rate, and AFSC your scores qualify you for.
          </li>
          <li>
            For the GT deep dive (the 110 threshold, raise strategy, branch
            differences), read the{" "}
            <Link
              href="/asvab-gt-score"
              className="text-accent underline hover:text-accent-hover"
            >
              ASVAB GT score guide
            </Link>
            .
          </li>
          <li>
            For the AFQT-only view, the{" "}
            <Link
              href="/afqt-calculator"
              className="text-accent underline hover:text-accent-hover"
            >
              AFQT calculator
            </Link>{" "}
            strips this page down to the 4 subtests that matter for
            enlistment minimums.
          </li>
          <li>
            Need a refresher on what each number means?{" "}
            <Link
              href="/asvab-scoring-and-results"
              className="text-accent underline hover:text-accent-hover"
            >
              ASVAB scoring and results
            </Link>{" "}
            walks through the score sheet line by line.
          </li>
          <li>
            Studying to raise these numbers? Start with the{" "}
            <Link
              href="/asvab-study-guide"
              className="text-accent underline hover:text-accent-hover"
            >
              ASVAB study guide
            </Link>{" "}
            or take a{" "}
            <Link
              href="/practice-test"
              className="text-accent underline hover:text-accent-hover"
            >
              free practice test
            </Link>
            .
          </li>
        </ul>
      </section>
    </div>
  );
}
