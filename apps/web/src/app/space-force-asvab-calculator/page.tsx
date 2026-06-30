import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "@/components/Calculator";
import JsonLd from "@/components/JsonLd";
import VerifiedBlock from "@/components/VerifiedBlock";
import BranchCalculatorView from "@/components/BranchCalculatorView";
import EmailCapture from "@/components/EmailCapture";
import type { MilitaryJob } from "@/types";

import spaceForceJobs from "@/data/space-force-jobs.json";
import RelatedCalculators from "@/components/RelatedCalculators";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "Space Force ASVAB Calculator: MAGE Scores + Every AFSC You Qualify For",
  description:
    "Enter your 9 ASVAB subtest scores. Instantly see your AFQT and the 4 Space Force MAGE composites (Mechanical, Administrative, General, Electronics), plus every Guardian AFSC and its score requirement.",
  alternates: {
    canonical: "https://asvabhero.com/space-force-asvab-calculator",
  },
};

const allSpaceForceJobs: MilitaryJob[] = spaceForceJobs.map(
  (j) => ({ ...j, branch: "space_force" }) as MilitaryJob
);

export default function SpaceForceCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <BranchCalculatorView branch="space_force" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Space Force ASVAB Calculator",
          url: "https://asvabhero.com/space-force-asvab-calculator",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Calculate your AFQT, Space Force MAGE composite scores, and see every Guardian AFSC and its score requirement.",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is the minimum ASVAB score to join the Space Force?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Space Force shares the Air Force enlistment standard: an AFQT of 36 with a high school diploma (higher for GED holders). Because the Space Force is small and technical, most Guardian AFSCs require well above the floor on the General (G) and Electronics (E) MAGE composites.",
              },
            },
            {
              "@type": "Question",
              name: "Does the Space Force use the same MAGE scores as the Air Force?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. The Space Force uses the Air Force MAGE composite system: Mechanical (M), Administrative (A), General (G), and Electronics (E). Each Guardian AFSC publishes its minimum as a MAGE percentile.",
              },
            },
            {
              "@type": "Question",
              name: "What ASVAB scores do Space Force jobs require?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Most Guardian AFSCs are intelligence, cyber, and space operations roles requiring high General (G 57-72) or Electronics (E 70) MAGE percentiles. For example, Space Systems Operations (1C6X1) requires E 70 and Signals Intelligence Analyst (1N2X1) requires G 72.",
              },
            },
            {
              "@type": "Question",
              name: "Can this calculator tell me which Space Force jobs I qualify for?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "MAGE composites are reported as 1-99 percentiles, and a raw subtest sum cannot be reliably converted to a percentile from a rounded score report. So the calculator shows each AFSC's published MAGE requirement as an estimate of where you stand, not a guaranteed qualify/disqualify. Always verify with a recruiter.",
              },
            },
          ],
        }}
      />

      <Breadcrumb
        items={[
          { name: "ASVAB Hero", href: "/" },
          { name: "All-Branch Calculator", href: "/calculator" },
          { name: "Space Force ASVAB Calculator", href: "/space-force-asvab-calculator" },
        ]}
      />

      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Space Force ASVAB Calculator
        </h1>
        <p className="mt-3 text-lg text-text-secondary">
          See your MAGE composite scores and every Guardian AFSC, plus the four
          gates that decide your career field in the Space Force.
        </p>
      </div>

      <VerifiedBlock
        verifiedDate="June 2026"
        sources={[
          { label: "spaceforce.com", url: "https://www.spaceforce.com/how-to-join" },
          { label: "officialasvab.com", url: "https://www.officialasvab.com/applicants/scores/" },
        ]}
      >
        <p>
          The Space Force uses the same <strong>MAGE composite scores</strong>{" "}
          as the Air Force: Mechanical (M), Administrative (A), General (G), and
          Electronics (E). Every Guardian AFSC requires a minimum on one or more
          of these. The Space Force minimum AFQT matches the Air Force at{" "}
          <strong>36</strong> with a diploma, but because the force is small and
          technical, most AFSCs sit well above the floor, so AFQT alone
          doesn&apos;t tell you which jobs you can actually get.
        </p>
      </VerifiedBlock>

      <section className="mt-8">
        <Suspense
          fallback={
            <div className="rounded-lg border border-navy-border bg-navy-light p-6 text-text-secondary">
              Loading calculator…
            </div>
          }
        >
          <Calculator allJobs={allSpaceForceJobs} branchFilter="space_force" />
        </Suspense>
      </section>

      <section className="mt-12 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          The 4 MAGE Composite Formulas
        </h2>
        <p className="mt-3 text-text-secondary">
          Every Guardian AFSC publishes its minimum in one or more of these four
          composites, the same MAGE system the Air Force uses. Raise the
          subtests feeding the composite you need, not just your AFQT. For the
          full breakdown, see the{" "}
          <Link
            href="/air-force-mage-score"
            className="text-accent underline hover:text-accent-hover"
          >
            MAGE score guide
          </Link>
          .
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ["M, Mechanical", "AR + 2×VE + MC + AS"],
            ["A, Administrative", "VE + MK"],
            ["G, General", "VE + AR"],
            ["E, Electronics", "AR + MK + EI + GS"],
          ].map(([label, formula]) => (
            <div key={label} className="rounded-lg bg-navy px-4 py-3">
              <p className="font-mono text-sm font-bold text-accent">{label}</p>
              <p className="mt-1 font-mono text-sm text-text-secondary">
                = {formula}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-text-tertiary">
          VE is an optimally weighted Word Knowledge + Paragraph Comprehension
          composite, not a plain WK + PC sum. MAGE scores are reported as
          percentiles (not standard scores like Army line scores). A G-57 is a
          57th-percentile General score.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          MAGE Minimums for 10 Guardian AFSCs
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-text-secondary">
              <tr className="border-b border-navy-border">
                <th className="py-2 pr-4 text-left">AFSC</th>
                <th className="py-2 pr-4 text-left">Career Field</th>
                <th className="py-2 text-left">MAGE Min</th>
              </tr>
            </thead>
            <tbody className="text-text-primary">
              {[
                ["1C6X1", "Space Systems Operations", "E 70"],
                ["1N0X1", "All-Source Intelligence Analyst", "G 57"],
                ["1N1X1", "Geospatial Intelligence Analyst", "G 66"],
                ["1N2X1", "Signals Intelligence Analyst", "G 72"],
                ["1N4X1", "Fusion Analyst", "G 62"],
                ["1B4X1", "Cyber Warfare Operations", "G 64"],
                ["1D7X1", "Cyber Defense Operations", "G 64"],
                ["3D0X2", "Cyber Systems Operations", "G 64"],
                ["3D1X2", "Cyber Transport Systems", "E 70"],
                ["3E0X1", "Electrical Systems", "E 35 + M 35"],
              ].map(([afsc, field, mage]) => (
                <tr key={afsc} className="border-b border-navy-border/50">
                  <td className="py-2 pr-4 font-mono font-bold text-accent">
                    {afsc}
                  </td>
                  <td className="py-2 pr-4">{field}</td>
                  <td className="py-2 font-mono text-text-secondary">{mage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-text-secondary">
          The calculator above lists every Guardian AFSC we have data for, not
          just these. Treat the results as published minimums and an estimate of
          where you stand, not a guarantee of qualification: exact MAGE
          percentiles can&apos;t be reliably derived from a rounded score
          report, so always verify your actual qualifications with a recruiter.
          Use it to see which fields are within reach and which would need a{" "}
          <Link
            href="/asvab-retake-calculator"
            className="text-accent underline hover:text-accent-hover"
          >
            retake
          </Link>
          .
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Space Force ASVAB FAQ
        </h2>
        <div className="mt-4 divide-y divide-navy-border">
          {[
            {
              q: "What's the minimum ASVAB score to join the Space Force?",
              a: "The Space Force shares the Air Force standard: an AFQT of 36 with a high school diploma, higher for GED holders. Because the force is small and heavily technical, most Guardian AFSCs require well above the floor on the General (G) and Electronics (E) MAGE composites.",
            },
            {
              q: "Does the Space Force use MAGE scores like the Air Force?",
              a: "Yes. The Space Force uses the identical MAGE composite system (M, A, G, E). Each Guardian AFSC publishes its minimum as a MAGE percentile, the same way the Air Force gates its AFSCs.",
            },
            {
              q: "What's the difference between AFQT and MAGE scores?",
              a: "AFQT gates whether you can enlist; MAGE gates which AFSC you can select. AFQT is a percentile (1-99) derived from 2VE+AR+MK. MAGE composites (M, A, G, E) are also percentile-based but focus on job-relevant subtest combinations.",
            },
            {
              q: "What Guardian jobs require the highest ASVAB scores?",
              a: "Signals Intelligence Analyst (1N2X1) at G 72, Space Systems Operations (1C6X1) at E 70, and the cyber career fields at G 64 are among the highest. The Space Force is overwhelmingly intelligence, cyber, and space operations roles.",
            },
            {
              q: "Can this calculator confirm which Space Force jobs I qualify for?",
              a: "Not definitively. MAGE composites are 1-99 percentiles, and a raw subtest sum can't be reliably converted to a percentile from a rounded score report. The calculator shows each AFSC's published MAGE requirement as an estimate of where you stand; always verify with a recruiter.",
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

      <section className="mt-10">
        <EmailCapture
          headline="Push your MAGE scores into Guardian AFSC range, free 30-day plan"
          subhead="Free 30-day study plan plus a 5-email crash course on AFQT, line scores, and the topics covered here."
          cta="Email me the plan"
          tag="spaceforce-calculator"
        />
      </section>

      <section className="mt-8 rounded-xl border border-accent/30 bg-navy-light p-6 text-center">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Considering other branches?
        </h2>
        <p className="mt-2 text-text-secondary">
          Compare all six branches side-by-side with our{" "}
          <Link
            href="/calculator"
            className="text-accent underline hover:text-accent-hover"
          >
            all-branch ASVAB calculator
          </Link>
          .
        </p>
      </section>
      <RelatedCalculators currentHref="/space-force-asvab-calculator" />

      <RelatedLinks
        title="ASVAB calculators &amp; guides"
        links={[
          { href: "/air-force-asvab-calculator", label: "Air Force ASVAB Calculator", blurb: "Same MAGE system, every AFSC and its score." },
          { href: "/air-force-afqt-calculator", label: "Air Force AFQT Calculator", blurb: "Get the percentile-only AFQT breakdown." },
          { href: "/asvab-retake-calculator", label: "ASVAB Retake Calculator", blurb: "When you're eligible to retest." },
          { href: "/calculator", label: "All-Branch ASVAB Calculator", blurb: "Every branch, every score, side by side." },
        ]}
      />
    </div>
  );
}
