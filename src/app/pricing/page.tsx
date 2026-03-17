import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "ASVAB Hero pricing — free calculator for everyone, Pro subscription for unlimited practice tests and study tools.",
  alternates: {
    canonical: "https://asvabhero.com/pricing",
  },
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Simple, Transparent Pricing
        </h1>
        <p className="mt-3 text-text-secondary">
          The calculator is free forever. Go Pro for serious test prep.
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {/* Free */}
        <div className="rounded-2xl border border-navy-border bg-navy-light p-8">
          <h2 className="font-display text-xl font-bold text-text-primary">
            Free
          </h2>
          <div className="mt-2">
            <span className="font-mono text-4xl font-bold text-text-primary">
              $0
            </span>
            <span className="text-text-tertiary"> / forever</span>
          </div>
          <p className="mt-4 text-sm text-text-secondary">
            Everything you need to understand your ASVAB scores and find
            qualifying jobs.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "ASVAB Score Calculator",
              "AFQT percentile breakdown",
              "All 6 branch composite scores",
              "500+ military job matching",
              "Search & filter qualifying jobs",
              "1 sample practice test (30 questions)",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <svg
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-text-secondary">{f}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/calculator"
            className="mt-8 block rounded-xl border border-navy-border py-3 text-center text-sm font-semibold text-text-primary transition-colors hover:border-accent no-underline"
          >
            Use Calculator
          </Link>
        </div>

        {/* Pro */}
        <div className="relative rounded-2xl border-2 border-accent bg-navy-light p-8">
          <div className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-white">
            COMING SOON
          </div>
          <h2 className="font-display text-xl font-bold text-text-primary">
            Pro
          </h2>
          <div className="mt-2">
            <span className="font-mono text-4xl font-bold text-accent">
              $9.99
            </span>
            <span className="text-text-tertiary"> / month</span>
          </div>
          <p className="mt-1 text-xs text-text-tertiary">
            or $49.99/year (save 58%)
          </p>
          <p className="mt-4 text-sm text-text-secondary">
            Serious test prep tools to maximize your score and unlock your dream
            job.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Everything in Free",
              "Unlimited practice tests",
              "9 subject-specific test banks",
              "Score tracking over time",
              "Predicted AFQT score",
              "Smart study plans",
              'What-if calculator',
              "Flashcard decks by subject",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <svg
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-text-secondary">{f}</span>
              </li>
            ))}
          </ul>
          <button
            disabled
            className="mt-8 block w-full rounded-xl bg-accent/30 py-3 text-center text-sm font-semibold text-accent/60 cursor-not-allowed"
          >
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}
