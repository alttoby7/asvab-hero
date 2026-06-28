import { Suspense } from "react";
import type { Metadata } from "next";
import AfqtCalculator from "@/components/AfqtCalculator";

export const metadata: Metadata = {
  title: "AFQT Calculator (Embed)",
  description:
    "Embeddable free AFQT calculator. Enter AR, WK, PC, and MK scores to see your AFQT percentile and branch eligibility.",
  // This is the bare iframe target. It must not compete with the real
  // /afqt-calculator page in search results; the link value flows from the
  // embedding site to the canonical page below, not from indexing this shell.
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://asvabhero.com/afqt-calculator",
  },
};

export default function AfqtCalculatorEmbedPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <div className="mb-4">
        <h1 className="font-display text-xl font-bold text-text-primary">
          AFQT Calculator
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Enter your 4 AFQT subtest scores to see your percentile and which
          branches you qualify for.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="rounded-lg border border-navy-border bg-navy-light p-6 text-text-secondary">
            Loading calculator...
          </div>
        }
      >
        <AfqtCalculator embedded />
      </Suspense>

      {/* The do-follow backlink. This anchor is the entire SEO payload of the
          widget, so it is a literal absolute <a> (NOT next/link) and is never
          rel="nofollow". It renders inside every embedding site's page. */}
      <p className="mt-6 border-t border-navy-border pt-4 text-center text-xs text-text-tertiary">
        <a
          href="https://asvabhero.com/afqt-calculator"
          target="_blank"
          rel="noopener"
          className="font-semibold text-accent hover:text-accent-hover"
        >
          Free AFQT Calculator by ASVAB Hero
        </a>
      </p>
    </div>
  );
}
