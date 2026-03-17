import type { Metadata } from "next";
import Link from "next/link";

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
            — Enter your 9 subtest scores, see your AFQT percentile and
            branch-specific composites, and browse 500+ qualifying military
            jobs.
          </li>
          <li>
            <strong className="text-text-primary">
              Pro Practice Tests (coming soon)
            </strong>{" "}
            — Unlimited timed tests, score tracking, predicted AFQT, smart study
            plans, and flashcards.
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
