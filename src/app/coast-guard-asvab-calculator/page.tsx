import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "@/components/Calculator";
import JsonLd from "@/components/JsonLd";
import VerifiedBlock from "@/components/VerifiedBlock";
import BranchCalculatorView from "@/components/BranchCalculatorView";
import EmailCapture from "@/components/EmailCapture";
import type { MilitaryJob } from "@/types";

import coastGuardJobs from "@/data/coast-guard-jobs.json";
import RelatedCalculators from "@/components/RelatedCalculators";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "Coast Guard ASVAB Calculator: See Every Rating You Qualify For",
  description:
    "Enter your 9 ASVAB subtest scores. Instantly see your AFQT, your Coast Guard composite scores, and every Coast Guard rating you qualify for. Free, no signup.",
  alternates: {
    canonical: "https://asvabhero.com/coast-guard-asvab-calculator",
  },
};

const allCoastGuardJobs: MilitaryJob[] = coastGuardJobs.map(
  (j) => ({ ...j, branch: "coast_guard" }) as MilitaryJob
);

export default function CoastGuardCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <BranchCalculatorView branch="coast_guard" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Coast Guard ASVAB Calculator",
          url: "https://asvabhero.com/coast-guard-asvab-calculator",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Calculate your AFQT, Coast Guard composite scores, and see every Coast Guard rating you qualify for.",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is the minimum ASVAB score to join the Coast Guard?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Coast Guard AFQT minimum is 32 for high school diploma holders. It was 40 until November 2023, when it was lowered to 32. Applicants with an AFQT of 50 or higher have the most rating options.",
              },
            },
            {
              "@type": "Question",
              name: "How do Coast Guard rating ASVAB requirements work?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Like the Navy, the Coast Guard publishes each rating's requirement as a sum of specific subtests (for example VE+AR or MK+EI+GS) rather than a single named line score. Your subtest strengths map directly to eligible ratings.",
              },
            },
            {
              "@type": "Question",
              name: "Which Coast Guard rating has the highest ASVAB requirement?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Technical ratings like Electronics Technician (ET) and Information Systems Technician (IT) at MK+EI+GS 171, plus Gunner's Mate (GM) at AR+MK+EI+GS 208, are among the highest. These require strong math and electronics subtests.",
              },
            },
            {
              "@type": "Question",
              name: "Is the Coast Guard ASVAB harder to qualify for?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Coast Guard is the smallest service and historically competitive, but the 2023 AFQT floor drop to 32 widened access. Individual ratings still set higher subtest minimums, so plan around the rating you want, not just the enlistment floor.",
              },
            },
          ],
        }}
      />

      <Breadcrumb
        items={[
          { name: "ASVAB Hero", href: "/" },
          { name: "ASVAB Calculator", href: "/calculator" },
          { name: "Coast Guard ASVAB Calculator", href: "/coast-guard-asvab-calculator" },
        ]}
      />

      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Coast Guard ASVAB Calculator
        </h1>
        <p className="mt-3 text-lg text-text-secondary">
          See every Coast Guard rating you qualify for, plus the composite
          scores behind every technical and operations rating.
        </p>
      </div>

      <VerifiedBlock
        verifiedDate="June 2026"
        sources={[
          { label: "gocoastguard.com", url: "https://www.gocoastguard.com/" },
          { label: "officialasvab.com", url: "https://www.officialasvab.com/applicants/scores/" },
        ]}
      >
        <p>
          The Coast Guard uses a <strong>rating system</strong> like the Navy:
          each rating publishes its minimum as a sum of specific subtests
          (VE+AR, MK+EI+GS, and so on) rather than a single named line score.
          The minimum <strong>AFQT</strong> for enlistment is 32 with a high
          school diploma (lowered from 40 in November 2023). See the{" "}
          <Link
            href="/coast-guard-asvab-score"
            className="text-accent hover:text-accent-hover"
          >
            Coast Guard ASVAB score guide
          </Link>{" "}
          for the enlistment-floor breakdown. The calculator below checks every
          rating we have data for.
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
          <Calculator allJobs={allCoastGuardJobs} branchFilter="coast_guard" />
        </Suspense>
      </section>

      <section className="mt-12 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          How Coast Guard Composite Scores Work
        </h2>
        <p className="mt-3 text-text-secondary">
          Like the Navy, the Coast Guard publishes each rating&apos;s minimum as
          a <strong>sum of specific subtests</strong> rather than named line
          scores. Common clusters include:
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ["Boatswain's Mate (BM)", "VE + AR ≥ 101"],
            ["Storekeeper / Yeoman", "VE + AR ≥ 106"],
            ["Electronics Technician (ET)", "MK + EI + GS ≥ 171"],
            ["Information Systems Tech (IT)", "MK + EI + GS ≥ 171"],
            ["Health Services Tech (HS)", "VE + MK + GS ≥ 154"],
            ["Gunner's Mate (GM)", "AR + MK + EI + GS ≥ 208"],
            ["Machinery Technician (MK)", "AR + MC + AS ≥ 150"],
            ["Damage Controlman (DC)", "VE + MC + AS ≥ 152"],
          ].map(([label, formula]) => (
            <div key={label} className="rounded-lg bg-navy px-4 py-3">
              <p className="font-mono text-sm font-bold text-accent">{label}</p>
              <p className="mt-1 font-mono text-sm text-text-secondary">
                {formula}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-text-tertiary">
          VE = WK + PC. Requirements change over time and some ratings have
          multiple qualifying paths; the calculator uses the current published
          minimums and flags the closest path when you fall short.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Composite Requirements for 10 Coast Guard Ratings
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-text-secondary">
              <tr className="border-b border-navy-border">
                <th className="py-2 pr-4 text-left">Rating</th>
                <th className="py-2 pr-4 text-left">Title</th>
                <th className="py-2 text-left">Composite</th>
              </tr>
            </thead>
            <tbody className="text-text-primary">
              {[
                ["BM", "Boatswain's Mate", "VE+AR 101"],
                ["MK", "Machinery Technician", "AR+MC+AS 150"],
                ["ET", "Electronics Technician", "MK+EI+GS 171"],
                ["EM", "Electrician's Mate", "MK+EI+GS 152"],
                ["IT", "Information Systems Technician", "MK+EI+GS 171"],
                ["HS", "Health Services Technician", "VE+MK+GS 154"],
                ["ME", "Maritime Enforcement Specialist", "VE+AR 100"],
                ["GM", "Gunner's Mate", "AR+MK+EI+GS 208"],
                ["DC", "Damage Controlman", "VE+MC+AS 152"],
                ["OS", "Operations Specialist", "VE+AR 106"],
              ].map(([code, title, comp]) => (
                <tr key={code} className="border-b border-navy-border/50">
                  <td className="py-2 pr-4 font-mono font-bold text-accent">
                    {code}
                  </td>
                  <td className="py-2 pr-4">{title}</td>
                  <td className="py-2 font-mono text-text-secondary">{comp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-text-secondary">
          The calculator above checks every Coast Guard rating we have data for,
          not just these. It also shows which ones you&apos;re <em>close</em> to
          qualifying for and which subtests would close the gap fastest.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Coast Guard ASVAB FAQ
        </h2>
        <div className="mt-4 divide-y divide-navy-border">
          {[
            {
              q: "What's the minimum AFQT score to join the Coast Guard?",
              a: "32 for high school diploma holders. It was 40 until November 2023, when the Coast Guard lowered the floor to 32 to widen access. Most ratings set higher subtest minimums on top of the AFQT floor.",
            },
            {
              q: "How do Coast Guard rating requirements differ from the Army?",
              a: "Like the Navy, the Coast Guard publishes requirements as sums of specific subtests (VE+AR, MK+EI+GS, etc.) rather than named line scores like the Army's GT or EL. Your subtest strengths map directly to eligible ratings.",
            },
            {
              q: "Which Coast Guard rating needs the highest ASVAB score?",
              a: "Technical ratings are highest: Electronics Technician (ET) and Information Systems Technician (IT) need MK+EI+GS 171, and Gunner's Mate (GM) needs AR+MK+EI+GS 208. These require strong math and electronics subtests.",
            },
            {
              q: "Can I retake the ASVAB for the Coast Guard?",
              a: "Yes. The standard 1/1/6 retest policy applies (one month, one month, then six months between attempts). The calculator's gap engine shows which subtests to focus on before a retake.",
            },
            {
              q: "Is the Coast Guard hard to get into with the ASVAB?",
              a: "The Coast Guard is the smallest service and historically competitive, but the 2023 AFQT floor drop to 32 widened access. Plan around the rating you want, since individual ratings still set higher subtest minimums.",
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
          headline="Land the Coast Guard rating you want, free 30-day plan"
          subhead="Free 30-day study plan plus a 5-email crash course on AFQT, line scores, and the topics covered here."
          cta="Email me the plan"
          tag="coastguard-calculator"
        />
      </section>

      <section className="mt-8 rounded-xl border border-accent/30 bg-navy-light p-6 text-center">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Comparing branches?
        </h2>
        <p className="mt-2 text-text-secondary">
          Use our{" "}
          <Link
            href="/calculator"
            className="text-accent underline hover:text-accent-hover"
          >
            all-branch ASVAB calculator
          </Link>{" "}
          to see how your scores stack up against Army, Navy, Air Force,
          Marines, Coast Guard, and Space Force requirements.
        </p>
      </section>
      <RelatedCalculators currentHref="/coast-guard-asvab-calculator" />

      <RelatedLinks
        title="Coast Guard ASVAB guides"
        links={[
          { href: "/coast-guard-asvab-score", label: "Coast Guard ASVAB Score Requirements", blurb: "Minimum AFQT and the scores ratings need." },
          { href: "/afqt-calculator", label: "AFQT Calculator", blurb: "Get the percentile-only AFQT breakdown." },
          { href: "/asvab-retake-calculator", label: "ASVAB Retake Calculator", blurb: "When you're eligible to retest." },
          { href: "/calculator", label: "All-Branch ASVAB Calculator", blurb: "Every branch, every score, side by side." },
        ]}
      />
    </div>
  );
}
