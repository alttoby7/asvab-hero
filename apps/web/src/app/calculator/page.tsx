import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Calculator from "@/components/Calculator";
import CalculatorExplore from "@/components/CalculatorExplore";
import JobCatalog from "@/components/JobCatalog";
import JsonLd from "@/components/JsonLd";
import VerifiedBlock from "@/components/VerifiedBlock";
import { DIRECTORY_GROUPS, calculatorsInGroup } from "@/lib/calculator-links";
import type { MilitaryJob } from "@/types";

import armyJobs from "@/data/army-jobs.json";
import airForceJobs from "@/data/air-force-jobs.json";
import marinesJobs from "@/data/marines-jobs.json";
import navyJobs from "@/data/navy-jobs.json";
import coastGuardJobs from "@/data/coast-guard-jobs.json";
import spaceForceJobs from "@/data/space-force-jobs.json";

export const metadata: Metadata = {
  title: "All-Branch ASVAB Job Calculator: Line Scores, Composites & Jobs (2026)",
  description:
    "The all-in-one ASVAB calculator: enter your 9 subtest scores once and see your AFQT percentile, every branch's composite line scores, and all the military jobs you qualify for across all 6 branches — plus the full directory of branch and score calculators.",
  alternates: {
    canonical: "https://asvabhero.com/calculator",
  },
};

function addBranch(
  jobs: Record<string, unknown>[],
  branch: MilitaryJob["branch"]
): MilitaryJob[] {
  return jobs.map((j) => ({ ...j, branch }) as MilitaryJob);
}

const allJobs: MilitaryJob[] = [
  ...addBranch(armyJobs, "army"),
  ...addBranch(airForceJobs, "air_force"),
  ...addBranch(marinesJobs, "marines"),
  ...addBranch(navyJobs, "navy"),
  ...addBranch(coastGuardJobs, "coast_guard"),
  ...addBranch(spaceForceJobs, "space_force"),
];

const calculatorFaqs = [
  {
    q: "How is an ASVAB score calculated?",
    a: "Your nine subtest standard scores each sit on a mean-50 scale and feed two different numbers. Your AFQT percentile comes from four of them: twice your Verbal Expression (Word Knowledge plus Paragraph Comprehension), plus Arithmetic Reasoning, plus Mathematics Knowledge, converted to a 1 to 99 percentile. Each branch then builds its own composite line scores from different subtest combinations to decide which jobs you qualify for.",
  },
  {
    q: "What ASVAB score do I need to qualify for a job?",
    a: "Two gates. Your AFQT has to clear your branch's enlistment minimum, roughly 31 to 36 for high school graduates. Then each job sets its own composite or line-score minimum, so the job you want may need a specific Army line score, Air Force MAGE composite, or Navy rating total on top of your AFQT.",
  },
  {
    q: "Does one calculator work for every branch?",
    a: "Yes. Enter your nine subtest scores once and this calculator scores all six branches at the same time: Army line scores, Air Force and Space Force MAGE composites, Marine line scores, and Navy and Coast Guard rating combinations. You can also open a single-branch calculator for a focused list.",
  },
  {
    q: "Are these calculator results official?",
    a: "No. They are practice estimates based on published branch formulas and the official PAY97 percentile table. Your official scores come from a proctored test at a MEPS or test center, and final job qualification depends on current branch policy, so confirm anything important with a recruiter.",
  },
];

export default function CalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "All-Branch ASVAB Calculator",
          url: "https://asvabhero.com/calculator",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          description:
            "Enter your 9 ASVAB subtest scores and instantly see your AFQT percentile, composite scores, and qualifying military jobs across all 6 branches.",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: calculatorFaqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "All-Branch Calculator", href: "/calculator" },
        ]}
      />
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          All-Branch ASVAB Job Calculator
        </h1>
        <p className="mt-2 text-text-secondary">
          An ASVAB score calculator turns your nine subtest standard scores into
          your AFQT percentile and each branch&apos;s composite line scores, then
          shows the military jobs those scores qualify you for. Enter your scores
          once here to see all six branches at a time: Army, Navy, Air Force,
          Marines, Coast Guard, and Space Force.
        </p>
        <p className="mt-3 text-sm text-text-tertiary">
          Want a single number? Use the{" "}
          <Link
            href="/gt-score"
            className="text-accent underline hover:text-accent-hover"
          >
            Army GT score calculator
          </Link>{" "}
          or the{" "}
          <Link
            href="/afqt-score"
            className="text-accent underline hover:text-accent-hover"
          >
            AFQT calculator
          </Link>
          .
        </p>
      </div>
      <VerifiedBlock
        title="How this calculator works"
        verifiedDate="May 2026"
        sources={[
          { label: "Official ASVAB scores guide", url: "https://www.officialasvab.com/applicants/scores/" },
          { label: "Official CAT-ASVAB", url: "https://www.officialasvab.com/applicants/cat-asvab/" },
          { label: "Official ASVAB fact sheet", url: "https://www.officialasvab.com/applicants/fact-sheet/" },
        ]}
      >
        <p>
          AFQT is computed using the official PAY97 norming table (DMDC 2004,
          Table 2.5): VE = WK + PC, raw = 2 x VE + AR + MK, then converted to a
          1 to 99 percentile. Branch composite formulas (GT, CL, MM, EL, etc.)
          come from each service&apos;s published recruiter information. Treat
          all outputs as practice estimates. Final job qualification depends on
          your official test-center scores and current branch policy, so confirm
          with a recruiter.
        </p>
      </VerifiedBlock>
      <Suspense>
        <Calculator allJobs={allJobs} />
      </Suspense>

      {/* Server-rendered full job catalog, present in the static HTML for search
         + AI crawlers regardless of calculator state (the interactive results
         above only appear once all 9 subtests are entered). */}
      <JobCatalog jobs={allJobs} />

      <section className="mt-14 border-t border-navy-border pt-10">
        <h2 className="font-display text-2xl font-bold text-text-primary">
          ASVAB calculator FAQ
        </h2>
        <div className="mt-4 divide-y divide-navy-border">
          {calculatorFaqs.map((item) => (
            <div key={item.q} className="py-4">
              <h3 className="font-display text-base font-bold text-text-primary">
                {item.q}
              </h3>
              <p className="mt-2 text-sm text-text-secondary">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
         CALCULATOR DIRECTORY, this hub is the only page that links every
         variant. Grouped so crawlers reach every spoke from one authoritative
         page (the homepage stays curated). Source of truth: calculator-links.ts.
      ────────────────────────────────────────────────────────────────────── */}
      <section className="mt-14 border-t border-navy-border pt-10">
        <h2 className="font-display text-2xl font-bold text-text-primary">
          All ASVAB calculators
        </h2>
        <p className="mt-2 text-text-secondary">
          Every calculator on ASVAB Hero, grouped by what it scores. The
          all-branch calculator above covers the full picture; these go deep on a
          single score or branch.
        </p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {DIRECTORY_GROUPS.map(({ title, group }) => (
            <div key={group}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                {title}
              </h3>
              <ul className="mt-3 space-y-3 list-none p-0">
                {calculatorsInGroup(group).map((calc) => (
                  <li key={calc.href}>
                    <Link
                      href={calc.href}
                      className="text-sm font-semibold text-accent no-underline transition-colors hover:text-accent-hover"
                    >
                      {calc.label} &rarr;
                    </Link>
                    <p className="mt-0.5 text-sm leading-relaxed text-text-secondary">
                      {calc.blurb}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Educator distribution note: the calculator is free to embed or link
          with no account, turning counselor/JROTC/library traffic into
          brand-named citations. */}
      <aside className="mt-10 rounded-xl border border-accent/30 bg-navy-light px-5 py-4 text-sm leading-relaxed text-text-secondary">
        Run a school counseling page, library guide, or JROTC site? You can{" "}
        <Link
          href="/embed"
          className="font-semibold text-accent underline hover:text-accent-hover"
        >
          embed a free ASVAB calculator
        </Link>{" "}
        on your own page, or point students to our{" "}
        <Link
          href="/counselor-resources"
          className="font-semibold text-accent underline hover:text-accent-hover"
        >
          source-cited counselor reference
        </Link>
        . No account required.
      </aside>

      <CalculatorExplore />
    </div>
  );
}
