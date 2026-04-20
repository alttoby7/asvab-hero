import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "@/components/Calculator";
import JsonLd from "@/components/JsonLd";
import VerifiedBlock from "@/components/VerifiedBlock";
import BranchCalculatorView from "@/components/BranchCalculatorView";
import type { MilitaryJob } from "@/types";

import armyJobs from "@/data/army-jobs.json";

export const metadata: Metadata = {
  title: "Army ASVAB Calculator: Line Scores + Every MOS You Qualify For",
  description:
    "Enter your 9 ASVAB subtest scores. Instantly see your AFQT, all 10 Army line scores (GT, CL, CO, EL, FA, GM, MM, OF, SC, ST), and every Army MOS you qualify for. Free, no signup.",
  alternates: {
    canonical: "https://asvabhero.com/army-asvab-calculator",
  },
};

const allArmyJobs: MilitaryJob[] = armyJobs.map(
  (j) => ({ ...j, branch: "army" }) as MilitaryJob
);

export default function ArmyCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <BranchCalculatorView branch="army" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Army ASVAB Calculator",
          url: "https://asvabhero.com/army-asvab-calculator",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Calculate your AFQT, all 10 Army line scores, and see every Army MOS you qualify for.",
        }}
      />

      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Army ASVAB Calculator
        </h1>
        <p className="mt-3 text-lg text-text-secondary">
          See every Army MOS you qualify for — plus the line scores recruiters
          actually use to assign you a job.
        </p>
      </div>

      <VerifiedBlock
        verifiedDate="April 2026"
        sources={[
          { label: "goarmy.com", url: "https://www.goarmy.com/careers-and-jobs/about-army-jobs/asvab" },
          { label: "officialasvab.com", url: "https://www.officialasvab.com/applicants/scores/" },
        ]}
      >
        <p>
          The Army uses <strong>10 line scores</strong> (called composite
          scores) derived from your 9 ASVAB subtests: GT, CL, CO, EL, FA, GM,
          MM, OF, SC, ST. Your <strong>AFQT</strong> determines whether you
          can enlist (Army minimum: 31 diploma, 50 GED). Your line scores
          determine <strong>which MOS you qualify for</strong>. The calculator
          below checks all 10.
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
          <Calculator allJobs={allArmyJobs} branchFilter="army" />
        </Suspense>
      </section>

      <section className="mt-12 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          The 10 Army Line Score Formulas
        </h2>
        <p className="mt-3 text-text-secondary">
          Every Army MOS has a minimum line score in one of these composites.
          Raise the right subtests and you unlock the jobs you actually want.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ["GT — General Technical", "VE + AR"],
            ["CL — Clerical", "VE + AR + MK"],
            ["CO — Combat", "AR + CS + AS + MC"],
            ["EL — Electronics", "GS + AR + MK + EI"],
            ["FA — Field Artillery", "AR + CS + MK + MC"],
            ["GM — General Maintenance", "GS + AS + MK + EI"],
            ["MM — Mechanical Maintenance", "AS + MC + EI"],
            ["OF — Operators & Food", "VE + AS + MC"],
            ["SC — Surveillance & Comm", "VE + AR + AS + MC"],
            ["ST — Skilled Technical", "GS + VE + MK + MC"],
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
          VE = Verbal Expression (2×WK + PC), CS = Coding Speed (legacy, uses
          dummy average). MOS using CO/FA/MM/OF still publish requirements in
          these composites.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Line Score Requirements for 10 Popular Army MOS
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-text-secondary">
              <tr className="border-b border-navy-border">
                <th className="py-2 pr-4 text-left">MOS</th>
                <th className="py-2 pr-4 text-left">Title</th>
                <th className="py-2 text-left">Line Score</th>
              </tr>
            </thead>
            <tbody className="text-text-primary">
              {[
                ["11B", "Infantryman", "CO 87"],
                ["68W", "Combat Medic", "ST 101 + GT 107"],
                ["25B", "IT Specialist", "ST 95 + GT 100"],
                ["35F", "Intelligence Analyst", "ST 101"],
                ["15T", "UH-60 Helicopter Repairer", "MM 104"],
                ["13F", "Fire Support Specialist", "FA 96"],
                ["31B", "Military Police", "ST 91 + GT 90"],
                ["17C", "Cyber Operations", "GT 110 + ST 112"],
                ["92Y", "Unit Supply Specialist", "CL 90"],
                ["92G", "Culinary Specialist", "OF 85"],
              ].map(([mos, title, score]) => (
                <tr key={mos} className="border-b border-navy-border/50">
                  <td className="py-2 pr-4 font-mono font-bold text-accent">
                    {mos}
                  </td>
                  <td className="py-2 pr-4">{title}</td>
                  <td className="py-2 font-mono text-text-secondary">{score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-text-secondary">
          The calculator above checks every Army MOS — not just these. It also
          shows which ones you&apos;re <em>close</em> to qualifying for and
          which subtests would close the gap fastest.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Army ASVAB FAQ
        </h2>
        <div className="mt-4 divide-y divide-navy-border">
          {[
            {
              q: "What's the minimum AFQT score to join the Army?",
              a: "31 with a high school diploma, 50 with a GED. The Army also runs the Future Soldier Preparatory Course (FSPC) for applicants scoring 21–30 who can retest after a short academic program.",
            },
            {
              q: "What's the most important Army line score?",
              a: "GT (General Technical). It's the gatekeeper for the largest set of MOS, including most technical and leadership tracks. GT 110+ unlocks Cyber (17C), OCS eligibility, and Green to Gold. If you're optimizing one score, optimize GT.",
            },
            {
              q: "How is the Army GT score calculated?",
              a: "GT = VE + AR, where VE (Verbal Expression) = 2×WK + PC. That means Word Knowledge counts twice. If your AR and WK are both 55 and your PC is 55, your GT is (2×55 + 55) + 55 = 220. Improving WK by one standard score point raises GT by 2 points.",
            },
            {
              q: "Can I pick my MOS before enlisting?",
              a: "Yes — through a guaranteed MOS contract. If the Army offers you a contract for a specific MOS, that's what you'll train for. Open contracts (where the Army assigns you based on needs) are also available but give up control. Always ask for guaranteed MOS if possible.",
            },
            {
              q: "Do I qualify for a signing bonus?",
              a: "It depends on the MOS, your AFQT category, and current Army needs. FY26 Army enlistment bonuses range up to $50K for critical MOS with 6-year contracts. The calculator above shows which MOS you qualify for; ask your recruiter which are currently bonus-eligible.",
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
          Looking at multiple branches?
        </h2>
        <p className="mt-2 text-text-secondary">
          Use our{" "}
          <Link
            href="/calculator"
            className="text-accent underline hover:text-accent-hover"
          >
            all-branch ASVAB calculator
          </Link>{" "}
          to compare Army, Navy, Air Force, Marines, Coast Guard, and Space
          Force results side by side.
        </p>
      </section>
    </div>
  );
}
