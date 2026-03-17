import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "ASVAB study tips, military career guides, and score improvement strategies.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
        Blog
      </h1>
      <p className="mt-3 text-text-secondary">
        Study tips, career guides, and strategies to maximize your ASVAB score.
      </p>

      <div className="mt-12 rounded-xl border border-navy-border bg-navy-light p-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-dim">
          <svg
            className="h-8 w-8 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
        </div>
        <h2 className="font-display text-xl font-bold text-text-primary">
          Content Coming Soon
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          We&apos;re working on study guides, score strategies, and military
          career deep-dives. Check back soon.
        </p>
        <Link
          href="/calculator"
          className="mt-6 inline-flex items-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover no-underline"
        >
          Try the Calculator
        </Link>
      </div>
    </div>
  );
}
