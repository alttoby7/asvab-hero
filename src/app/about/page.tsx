import type { Metadata } from "next";
import Link from "next/link";
import BrandHero from "@/components/BrandHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "ASVAB Hero helps future service members find the right military career by matching ASVAB scores to qualifying jobs across all branches.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
        About ASVAB Hero
      </h1>
      <BrandHero
        src="/images/generated/asvab-about-hero.png"
        alt="A future military recruit studying in a small library, the click-moment when a hard concept becomes clear."
        width={1536}
        height={1024}
        className="mt-8 overflow-hidden rounded-2xl border border-navy-border shadow-2xl shadow-black/40"
      />
      <div className="mt-8 space-y-6 text-text-secondary leading-relaxed">
        <p>
          ASVAB Hero was built to solve a simple problem: understanding your
          ASVAB scores shouldn&apos;t require a recruiter, a spreadsheet, or
          hours of Googling.
        </p>
        <p>
          Most military career websites list job requirements in static tables
          that are hard to search and impossible to personalize. We built an
          interactive calculator that takes your actual subtest scores and
          instantly shows you every job you qualify for across all six branches
          of the U.S. military.
        </p>
        <p>
          Whether you&apos;re studying for the ASVAB, waiting on your results,
          or deciding between branches, ASVAB Hero gives you the information you
          need to make the best career decision.
        </p>
        <h2 className="font-display text-xl font-bold text-text-primary pt-4">
          What We Offer
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-text-primary">Free ASVAB Calculator</strong>{" "}
, Enter your 9 subtest scores, see your AFQT percentile and
            branch-specific composites, and browse 500+ qualifying military
            jobs.
          </li>
          <li>
            <strong className="text-text-primary">
              Pro Practice Tests (coming soon)
            </strong>{" "}
, Unlimited timed tests, score tracking, predicted AFQT, smart study
            plans, and flashcards.
          </li>
        </ul>
        <h2 className="font-display text-xl font-bold text-text-primary pt-4">
          Editorial standards
        </h2>
        <p>
          Content is written and reviewed by the ASVAB Hero Editorial Team. We
          attribute authorship at the organization level, not to a single named
          author, and we do not invent personas or credentials.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-text-primary">Primary sources:</strong>{" "}
            <a href="https://www.officialasvab.com/applicants/cat-asvab/" className="text-accent underline hover:text-accent-hover">official CAT-ASVAB administration page</a>{" "}
            for test structure; the{" "}
            <a href="https://www.officialasvab.com/applicants/scores/" className="text-accent underline hover:text-accent-hover">official ASVAB scores guide</a>{" "}
            for scoring; and each branch&apos;s current recruiting site for
            entry requirements (airforce.com, goarmy.com, marines.com,
            navy.com, gocoastguard.com, spaceforce.com).
          </li>
          <li>
            <strong className="text-text-primary">AFQT methodology:</strong> we
            compute AFQT using the official PAY97 norming table (DMDC 2004,
            Table 2.5), the same table used by the Department of Defense.
          </li>
          <li>
            <strong className="text-text-primary">Re-verification:</strong>{" "}
            score-and-requirement pages carry a visible {`"Last verified"`} date.
            We re-check score minimums against the source branch&apos;s public
            page at least quarterly, and update when policies change.
          </li>
          <li>
            <strong className="text-text-primary">Practice estimates:</strong>{" "}
            any AFQT or line-score result from a practice test on this site is
            an estimate. Only a test-center sitting produces an official ASVAB
            score.
          </li>
          <li>
            <strong className="text-text-primary">Corrections:</strong> if you
            spot a factual error, email{" "}
            <a href="mailto:editors@asvabhero.com" className="text-accent underline hover:text-accent-hover">
              editors@asvabhero.com
            </a>{" "}
            and we will verify and correct.
          </li>
        </ul>
        <h2 className="font-display text-xl font-bold text-text-primary pt-4">
          Disclaimer
        </h2>
        <p className="text-sm text-text-tertiary">
          ASVAB Hero is an independent educational tool and is not affiliated
          with, endorsed by, or connected to the U.S. Department of Defense, any
          branch of the U.S. military, or the ASVAB program. Score requirements
          are based on publicly available information and may change. Always
          confirm eligibility with your recruiter.
        </p>
      </div>
      <div className="mt-10">
        <Link
          href="/calculator"
          className="inline-flex items-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover no-underline"
        >
          Try the Calculator
        </Link>
      </div>
    </div>
  );
}
