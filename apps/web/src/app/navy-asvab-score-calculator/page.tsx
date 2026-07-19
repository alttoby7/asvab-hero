import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "@/components/Calculator";
import JsonLd from "@/components/JsonLd";
import VerifiedBlock from "@/components/VerifiedBlock";
import BranchCalculatorView from "@/components/BranchCalculatorView";
import EmailCapture from "@/components/EmailCapture";
import type { MilitaryJob } from "@/types";

import navyJobs from "@/data/navy-jobs.json";
import RelatedCalculators from "@/components/RelatedCalculators";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "Navy ASVAB Score Calculator: See Every Rating You Qualify For",
  description:
    "Enter your 9 ASVAB subtest scores. Instantly see your AFQT, all 7 Navy composite scores (AR, VE, MK, MC, AS, WK, EI), and every Navy rating you qualify for. Free, no signup.",
  alternates: {
    canonical: "https://asvabhero.com/navy-asvab-score-calculator",
  },
};

const allNavyJobs: MilitaryJob[] = navyJobs.map(
  (j) => ({ ...j, branch: "navy" }) as MilitaryJob
);

const navyFaqs = [
  {
    q: "What's the minimum AFQT score to join the Navy?",
    a: "The official floor is 31, but diploma holders must reach 35 to ship; GED holders need 50 plus 15 college credits (Tier I vs Tier II). Tier III applicants (FSPC-A candidates) have their own pathway. Navy Reserve follows the same AFQT minimums as active duty.",
  },
  {
    q: "What Navy rating has the highest ASVAB requirement?",
    a: "Nuclear Field (NFa): AR + VE + MK + MC ≥ 255 is among the highest, plus you must pass the NAPT and qualify medically. ET/AT technical paths and Cryptologic Technician Networks also require very high combined scores.",
  },
  {
    q: "Does the Navy still use the AR+VE+MK+MC line scores?",
    a: "Yes, most ratings publish requirements as sums of specific subtests rather than named composites like the Army. This means your subtest strengths map directly to eligible ratings.",
  },
  {
    q: "What ASVAB score do SEALs need?",
    a: "GS + MC + EI ≥ 170 is the standard minimum. Candidates must also pass the PST, meet medical standards, and complete BUD/S. The ASVAB is the first gate, not the hard part.",
  },
  {
    q: "Can I retake the Navy ASVAB if I miss a rating's cutoff?",
    a: "Yes. Standard 1/1/6 retest policy applies (1 month, 1 month, then 6 months between attempts). Navy does have DEP Enrichment Program (DEP-EP) for applicants scoring AFQT 26–30, but most DEP retakes are limited.",
  },
];

export default function NavyCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <BranchCalculatorView branch="navy" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Navy ASVAB Score Calculator",
          url: "https://asvabhero.com/navy-asvab-score-calculator",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Calculate your AFQT, Navy composite scores, and see every Navy rating you qualify for.",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: navyFaqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />

      <Breadcrumb
        items={[
          { name: "ASVAB Hero", href: "/" },
          { name: "All-Branch Calculator", href: "/calculator" },
          { name: "Navy ASVAB Score Calculator", href: "/navy-asvab-score-calculator" },
        ]}
      />

      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Navy ASVAB Score Calculator
        </h1>
        <p className="mt-3 text-lg text-text-secondary">
          A Navy ASVAB score calculator turns your nine subtest standard scores
          into your AFQT percentile and the line-score combinations each Navy
          rating requires, then lists every rating you currently qualify for. The
          Navy sets each rating&apos;s minimum as a sum of specific subtests, for
          example AR + VE + MK + MC for the Nuclear Field, so your subtest
          strengths map straight to the jobs you can pick.
        </p>
      </div>

      <VerifiedBlock
        verifiedDate="April 2026"
        sources={[
          { label: "navy.com", url: "https://www.navy.com/joining/forms-documents/asvab" },
          { label: "officialasvab.com", url: "https://www.officialasvab.com/applicants/scores/" },
        ]}
      >
        <p>
          The Navy uses a <strong>rating system</strong>, your job (rating)
          is baked into your rank title. Qualifying for a rating depends on
          raw subtest combinations (AR+VE+MK+MC for Nuclear Field, AR+WK+PC+MC
          for Air Traffic Control, etc.). The minimum <strong>AFQT</strong>{" "}
          for active-duty enlistment has an official floor of 31, but diploma
          holders ship at 35; GED holders need 50 plus 15 college credits. See the{" "}
          <Link
            href="/navy-afqt-calculator"
            className="text-accent hover:text-accent-hover"
          >
            Navy AFQT calculator
          </Link>{" "}
          for the enlistment-floor breakdown and DEP Enrichment path.
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
          <Calculator allJobs={allNavyJobs} branchFilter="navy" />
        </Suspense>
      </section>

      <section className="mt-12 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          How Navy Composite Scores Work
        </h2>
        <p className="mt-3 text-text-secondary">
          Unlike the Army&apos;s 10 named line scores, the Navy publishes
          minimum requirements for each rating as a <strong>sum of specific
          subtests</strong>. Common clusters include:
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ["Nuclear Field (NFa)", "AR + VE + MK + MC ≥ 255"],
            ["Nuclear Field (NFb)", "AR + MK + EI + GS ≥ 235"],
            ["Air Traffic Controller", "AR + 2MK + GS ≥ 220"],
            ["Cryptologic Technician", "AR + 2VE ≥ 160"],
            ["Electronics Technician", "AR + MK + EI + GS ≥ 222"],
            ["SEAL / SWCC", "GS + MC + EI ≥ 170"],
            ["Hospital Corpsman", "VE + MK + GS ≥ 149"],
            ["Gunner's Mate", "AR + MK + EI + GS ≥ 205"],
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
          VE = WK + PC. Requirements change over time; the calculator uses
          the current published minimums. Nuclear Field candidates must also
          pass the NAPT (Navy Advanced Programs Test).
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Navy ASVAB FAQ
        </h2>
        <div className="mt-4 divide-y divide-navy-border">
          {navyFaqs.map((item) => (
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
          headline="Land the Navy rating you want, free 30-day study plan"
          subhead="Free 30-day study plan plus a 5-email crash course on AFQT, line scores, and the topics covered here."
          cta="Email me the plan"
          tag="navy-calculator"
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
      <RelatedCalculators currentHref="/navy-asvab-score-calculator" />

      <RelatedLinks
        title="Navy ASVAB guides"
        links={[
          { href: "/navy-asvab-score", label: "Navy ASVAB Score Requirements", blurb: "Minimum AFQT and the scores ratings need." },
          { href: "/navy-ratings-list", label: "Navy ASVAB Score Chart for All Ratings", blurb: "Sortable chart of the required line score for every Navy rating." },
          { href: "/navy-afqt-calculator", label: "Navy AFQT Calculator", blurb: "Get the percentile-only AFQT breakdown." },
          { href: "/navy-ranks", label: "Navy Ranks Guide", blurb: "How your rate turns into rank and pay." },
        ]}
      />
    </div>
  );
}
