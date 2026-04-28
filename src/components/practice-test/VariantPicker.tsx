"use client";

import { useState } from "react";
import Link from "next/link";
import { ALL_SUBTESTS, SUBTEST_NAMES } from "@/types";

/**
 * Two-card variant picker for v1: Diagnostic + Subtest Drill.
 * The Subtest Drill card expands to reveal the 9 subtest options in a grid.
 */
export default function VariantPicker() {
  const [drillOpen, setDrillOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Diagnostic */}
      <Link
        href="/practice-test?variant=diagnostic"
        className="block rounded-2xl border border-navy-border bg-navy-light p-6 no-underline transition-colors hover:border-accent/40 hover:bg-navy-lighter sm:p-7"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-dim">
            <svg
              className="h-6 w-6 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
            >
              <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="font-display text-lg font-bold text-text-primary sm:text-xl">
              Diagnostic Test
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              30 questions across all 9 subtests · 36 minutes
            </p>
            <p className="mt-2 text-sm text-text-tertiary">
              Best first stop. Get a balanced read on every section, an
              estimated AFQT, and your top-3 weak topics.
            </p>
          </div>
          <svg
            className="hidden h-5 w-5 shrink-0 text-text-tertiary sm:block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>

      {/* Subtest Drill */}
      <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-7">
        <button
          type="button"
          onClick={() => setDrillOpen((v) => !v)}
          className="block w-full text-left"
          aria-expanded={drillOpen}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f97316]/15">
              <svg
                className="h-6 w-6 text-[#f97316]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <path d="M12 6V3m0 18v-3m6.36-12.36l2.12-2.12M3.52 20.48l2.12-2.12M21 12h-3M6 12H3m12.36 6.36l2.12 2.12M3.52 3.52l2.12 2.12M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="font-display text-lg font-bold text-text-primary sm:text-xl">
                Subtest Drill
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                25 questions on a single subtest · 20 minutes
              </p>
              <p className="mt-2 text-sm text-text-tertiary">
                Already know which section is dragging you down? Drill just
                that subtest until it stops being a weakness.
              </p>
            </div>
            <svg
              className={`hidden h-5 w-5 shrink-0 text-text-tertiary transition-transform sm:block ${
                drillOpen ? "rotate-90" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        {drillOpen && (
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {ALL_SUBTESTS.map((st) => (
              <Link
                key={st}
                href={`/practice-test?variant=subtest_drill&subtest=${st}`}
                className="flex flex-col items-start rounded-xl border border-navy-border bg-navy px-3 py-2.5 no-underline transition-colors hover:border-accent/40 hover:bg-navy-lighter"
              >
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-text-tertiary">
                  {st}
                </span>
                <span className="mt-0.5 text-sm font-semibold text-text-primary">
                  {SUBTEST_NAMES[st]}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
