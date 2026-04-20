import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "@/components/Calculator";
import JsonLd from "@/components/JsonLd";
import VerifiedBlock from "@/components/VerifiedBlock";
import type { MilitaryJob } from "@/types";

import airForceJobs from "@/data/air-force-jobs.json";

export const metadata: Metadata = {
  title: "Air Force ASVAB Calculator: MAGE Scores + Every AFSC You Qualify For",
  description:
    "Enter your 9 ASVAB subtest scores. Instantly see your AFQT and all 4 Air Force MAGE composites (Mechanical, Administrative, General, Electronics), plus every AFSC you qualify for.",
  alternates: {
    canonical: "https://asvabhero.com/air-force-asvab-calculator",
  },
};

const allAirForceJobs: MilitaryJob[] = airForceJobs.map(
  (j) => ({ ...j, branch: "air_force" }) as MilitaryJob
);

export default function AirForceCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Air Force ASVAB Calculator",
          url: "https://asvabhero.com/air-force-asvab-calculator",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Calculate your AFQT, Air Force MAGE composite scores, and see every AFSC you qualify for.",
        }}
      />

      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Air Force ASVAB Calculator
        </h1>
        <p className="mt-3 text-lg text-text-secondary">
          See every Air Force AFSC you qualify for — plus your MAGE composite
          scores, the four gates that decide your career field.
        </p>
      </div>

      <VerifiedBlock
        verifiedDate="April 2026"
        sources={[
          { label: "airforce.com", url: "https://www.airforce.com/how-to-join/process/asvab" },
          { label: "officialasvab.com", url: "https://www.officialasvab.com/applicants/scores/" },
        ]}
      >
        <p>
          The Air Force uses the <strong>MAGE composite scores</strong>:
          Mechanical (M), Administrative (A), General (G), and Electronics
          (E). Every AFSC requires a minimum on one or more of these. Air
          Force minimum AFQT is <strong>31</strong> with a diploma (50 with
          GED), but almost every AFSC has higher MAGE floors — so AFQT alone
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
          <Calculator allJobs={allAirForceJobs} branchFilter="air_force" />
        </Suspense>
      </section>

      <section className="mt-12 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          The 4 MAGE Composite Formulas
        </h2>
        <p className="mt-3 text-text-secondary">
          Every Air Force AFSC publishes its minimum in one or more of these
          four composites. Raise the subtests feeding the composite you need —
          not just your AFQT.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ["M — Mechanical", "MC + GS + 2×AS"],
            ["A — Administrative", "VE + MK"],
            ["G — General", "VE + AR"],
            ["E — Electronics", "AR + MK + EI + GS"],
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
          VE = 2×WK + PC. MAGE scores are reported as percentiles (not
          standard scores like Army line scores). A G-55 is a 55th-percentile
          General score.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          MAGE Minimums for 10 Popular AFSCs
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
                ["1N0X1", "All-Source Intelligence Analyst", "G 62"],
                ["1N4X1", "Fusion Analyst", "G 64"],
                ["3D1X1", "Client Systems", "E 60"],
                ["3E1X1", "HVAC Systems", "M 47"],
                ["4N0X1", "Aerospace Medical Service", "G 43"],
                ["2A5X1", "Aerospace Maintenance", "M 47"],
                ["1A8X2", "Airborne Cryptologic Language Analyst", "G 72"],
                ["3F1X1", "Services (Food, Mortuary, Fitness)", "A 41"],
                ["1C3X1", "Command Post", "A 54"],
                ["1W0X1", "Weather", "G 66 + E 50"],
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
          The calculator above checks every AFSC we have data for — not just
          these. Use it to see which ones you qualify for and which ones are
          within reach with a retake.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Air Force ASVAB FAQ
        </h2>
        <div className="mt-4 divide-y divide-navy-border">
          {[
            {
              q: "What's the minimum ASVAB score to join the Air Force?",
              a: "31 AFQT with a high school diploma, 50 with a GED. But most Air Force AFSCs require significantly higher MAGE scores, so hitting just the AFQT minimum typically leaves you with few job options.",
            },
            {
              q: "What's the difference between AFQT and MAGE scores?",
              a: "AFQT gates whether you can enlist; MAGE gates which AFSC you can select. AFQT is a percentile (1–99) derived from 2VE+AR+MK. MAGE composites (M, A, G, E) are also percentile-based but focus on job-relevant subtest combinations.",
            },
            {
              q: "Can you pick your AFSC before enlisting?",
              a: "The Air Force uses a 'dream sheet' process. You list your preferred AFSCs at MEPS, and assignments are made based on your MAGE scores, current needs, and available slots. Guaranteed AFSC contracts exist but are harder to secure than in the Army.",
            },
            {
              q: "What's the highest AFSC ASVAB requirement?",
              a: "Airborne Cryptologic Language Analyst (1A8X2) at G 72 and several cyber/intel AFSCs at G 64+ are among the highest. Nuclear/missile AFSCs (2M0X1, 2W2X1) require additional PRP screening beyond MAGE minimums.",
            },
            {
              q: "Does the Air Force still use warrant officers?",
              a: "No. The Air Force abolished warrant officers in 1959 and has not reinstated the rank. Enlisted and officer are the only two tracks.",
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
    </div>
  );
}
