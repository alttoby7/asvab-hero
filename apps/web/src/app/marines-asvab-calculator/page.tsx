import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "@/components/Calculator";
import JsonLd from "@/components/JsonLd";
import VerifiedBlock from "@/components/VerifiedBlock";
import BranchCalculatorView from "@/components/BranchCalculatorView";
import EmailCapture from "@/components/EmailCapture";
import type { MilitaryJob } from "@/types";

import marinesJobs from "@/data/marines-jobs.json";
import RelatedCalculators from "@/components/RelatedCalculators";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "Marines ASVAB Calculator: Line Scores + Every MOS You Qualify For",
  description:
    "Enter your 9 ASVAB subtest scores. Instantly see your AFQT, all 3 Marine Corps line scores (GT, MM, EL), and every Marine MOS you qualify for. Free, no signup.",
  alternates: {
    canonical: "https://asvabhero.com/marines-asvab-calculator",
  },
};

const allMarinesJobs: MilitaryJob[] = marinesJobs.map(
  (j) => ({ ...j, branch: "marines" }) as MilitaryJob
);

export default function MarinesCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <BranchCalculatorView branch="marines" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marines ASVAB Calculator",
          url: "https://asvabhero.com/marines-asvab-calculator",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Calculate your AFQT, all 3 Marine Corps line scores, and see every Marine MOS you qualify for.",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is the minimum ASVAB score to join the Marines?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "31 with a high school diploma and 50 with a GED. Most Marine MOS, however, gate on a line score (GT, MM, or EL), so hitting just the AFQT floor leaves your job options narrow.",
              },
            },
            {
              "@type": "Question",
              name: "What Marine line score matters most?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "GT (General Technical). It is the gatekeeper for the largest set of MOS, including intelligence and most leadership tracks. GT 110+ unlocks the intelligence field (0211, 0231) and many technical jobs.",
              },
            },
            {
              "@type": "Question",
              name: "How is the Marine GT score calculated?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "GT = AR + WK + PC (Word Knowledge plus Paragraph Comprehension equals Verbal Expression, then add Arithmetic Reasoning). The Marines use the same three line scores as a focused subset of the Army composites.",
              },
            },
            {
              "@type": "Question",
              name: "Can I pick my Marine MOS before enlisting?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Marine Corps assigns MOS by occupational field after you qualify. You can enlist with a guaranteed program (such as a specific field) if you meet the line score, but the exact MOS is often assigned during or after recruit training based on needs.",
              },
            },
          ],
        }}
      />

      <Breadcrumb
        items={[
          { name: "ASVAB Hero", href: "/" },
          { name: "All-Branch Calculator", href: "/calculator" },
          { name: "Marines ASVAB Calculator", href: "/marines-asvab-calculator" },
        ]}
      />

      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Marines ASVAB Calculator
        </h1>
        <p className="mt-3 text-lg text-text-secondary">
          See every Marine Corps MOS you qualify for, plus the three line scores
          recruiters use to assign you a job.
        </p>
      </div>

      <VerifiedBlock
        verifiedDate="June 2026"
        sources={[
          { label: "marines.com", url: "https://www.marines.com/about-the-marine-corps/who-are-the-marines/recruit-training.html" },
          { label: "officialasvab.com", url: "https://www.officialasvab.com/applicants/scores/" },
        ]}
      >
        <p>
          The Marine Corps uses <strong>3 line scores</strong> (called composite
          scores) derived from your 9 ASVAB subtests: GT, MM, and EL. Your{" "}
          <strong>AFQT</strong> determines whether you can enlist (Marines
          minimum: 31 diploma, 50 GED, see the{" "}
          <Link
            href="/marines-afqt-calculator"
            className="text-accent hover:text-accent-hover"
          >
            Marines AFQT calculator
          </Link>{" "}
          for the percentile-only breakdown). Your line scores determine{" "}
          <strong>which MOS you qualify for</strong>. The calculator below
          checks all three against every MOS we have data for.
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
          <Calculator allJobs={allMarinesJobs} branchFilter="marines" />
        </Suspense>
      </section>

      <section className="mt-12 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          The 3 Marine Line Score Formulas
        </h2>
        <p className="mt-3 text-text-secondary">
          Every Marine MOS has a minimum line score in one of these composites.
          Raise the right subtests and you unlock the fields you actually want.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ["GT, General Technical", "AR + VE"],
            ["MM, Mechanical Maintenance", "AR + MC + AS + EI"],
            ["EL, Electronics", "GS + AR + MK + EI"],
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
          VE = Verbal Expression (WK + PC). The Marine Corps uses a focused
          subset of the standard line score composites, so improving WK and PC
          lifts your GT directly.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Line Score Requirements for 10 Popular Marine MOS
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
                ["0311", "Rifleman", "GT 80"],
                ["0231", "Intelligence Specialist", "GT 110"],
                ["0321", "Reconnaissance Marine", "GT 105"],
                ["0211", "Counterintelligence/HUMINT", "GT 110"],
                ["0317", "Scout Sniper", "GT 100"],
                ["0331", "Machine Gunner", "GT 80"],
                ["0352", "Antitank Missile Gunner", "GT 100"],
                ["0313", "LAR Marine", "GT 90"],
                ["0341", "Mortarman", "GT 80"],
                ["0351", "Infantry Assault Marine", "GT 100"],
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
          The calculator above checks every Marine MOS we have data for, not
          just these. It also shows which ones you&apos;re <em>close</em> to
          qualifying for and which subtests would close the gap fastest.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Marines ASVAB FAQ
        </h2>
        <div className="mt-4 divide-y divide-navy-border">
          {[
            {
              q: "What's the minimum AFQT score to join the Marines?",
              a: "31 with a high school diploma, 50 with a GED. Most Marine MOS gate on a line score (GT, MM, or EL) on top of the AFQT floor, so hitting just the minimum leaves your job options narrow.",
            },
            {
              q: "What's the most important Marine line score?",
              a: "GT (General Technical). It's the gatekeeper for the largest set of MOS, including the intelligence field (0211, 0231) and most technical and leadership tracks. If you're optimizing one score, optimize GT.",
            },
            {
              q: "How is the Marine GT score calculated?",
              a: "GT = AR + VE, where VE (Verbal Expression) = WK + PC. That means your verbal subtests and arithmetic reasoning drive GT. Raising WK or PC raises VE, which raises GT point for point.",
            },
            {
              q: "Can I pick my MOS before enlisting?",
              a: "The Marine Corps typically guarantees an occupational field rather than a single MOS. If you qualify on the line score, you can contract for a field; the exact MOS is often assigned during or after recruit training based on Corps needs.",
            },
            {
              q: "What ASVAB score do Marine infantry MOS need?",
              a: "Most ground combat MOS such as 0311 Rifleman require GT 80, while specialized infantry roles like Scout Sniper (0317) and Reconnaissance (0321) require GT 100-105. The calculator above flags which you qualify for.",
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
          headline="Unlock the Marine MOS you actually want, free 30-day plan"
          subhead="Free 30-day study plan plus a 5-email crash course on AFQT, line scores, and the topics covered here."
          cta="Email me the plan"
          tag="marines-calculator"
        />
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
      <RelatedCalculators currentHref="/marines-asvab-calculator" />

      <RelatedLinks
        title="Marines ASVAB guides"
        links={[
          { href: "/marines-asvab-score", label: "Marines ASVAB Score Requirements", blurb: "Minimum AFQT and the line scores enlistment needs." },
          { href: "/marines-afqt-calculator", label: "Marines AFQT Calculator", blurb: "Get the percentile-only AFQT breakdown." },
          { href: "/usmc-mos-list", label: "USMC MOS List", blurb: "Every Marine job and its line score cutoff." },
          { href: "/marine-corps-ranks", label: "Marine Corps Ranks Guide", blurb: "How enlistment turns into rank and pay." },
        ]}
      />
    </div>
  );
}
