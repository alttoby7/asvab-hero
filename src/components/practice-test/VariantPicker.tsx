"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ALL_SUBTESTS, SUBTEST_NAMES } from "@/types";
import { useEntitlement } from "@/hooks/useEntitlement";
import { useSession } from "@/hooks/useSession";
import { checkAnonDiagnosticUsed } from "@/lib/practice/gate";
import { isAdaptiveEnabled } from "@/lib/practice/sampler";

/**
 * Two-card variant picker for v1: Diagnostic + Subtest Drill.
 * The Subtest Drill card expands to reveal the 9 subtest options in a grid.
 * Non-Pro users see lock badges + are redirected to /upgrade instead of starting tests.
 */
export default function VariantPicker() {
  const [drillOpen, setDrillOpen] = useState(false);
  const router = useRouter();

  const { session } = useSession();
  const { entitlement, loading } = useEntitlement();

  const isPro = entitlement.isPro;
  const isAuthed = !!session;
  const diagnosticUsed = isAuthed
    ? !!entitlement.freeDiagnosticUsedAt
    : checkAnonDiagnosticUsed();

  // Diagnostic is locked (used badge) when the user already ran their one free test.
  const diagnosticLocked = !isPro && diagnosticUsed;
  // Drill is locked for any non-Pro user.
  const drillLocked = !isPro;
  // Adaptive AFQT is the FREE score-moving core (one block/day for free users;
  // unlimited for Pro). Anon users need an account first.
  const adaptiveAvailable = isAdaptiveEnabled();
  const adaptiveHref = isAuthed
    ? "/app/practice?variant=afqt_adaptive"
    : "/signup";

  function handleDiagnosticClick(e: React.MouseEvent) {
    if (loading) return;
    if (diagnosticLocked) {
      e.preventDefault();
      router.push("/upgrade?from=diagnostic_used&variant=diagnostic");
    }
    // Else: Link's default href navigates normally.
  }

  function handleDrillSubtestClick(e: React.MouseEvent, st: string) {
    if (loading) return;
    if (drillLocked) {
      e.preventDefault();
      router.push(`/upgrade?from=variant_picker&variant=subtest_drill&subtest=${st}`);
    }
  }

  return (
    <div className="space-y-4">
      {/* Diagnostic */}
      <Link
        href="/practice-test?variant=diagnostic"
        onClick={handleDiagnosticClick}
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
            <div className="flex items-center gap-2">
              <h2 className="font-display text-lg font-bold text-text-primary sm:text-xl">
                Diagnostic Test
              </h2>
              {diagnosticLocked && !loading && (
                <span className="inline-flex items-center gap-1 rounded-md bg-yellow-500/20 px-2 py-0.5 text-xs font-semibold text-yellow-400">
                  Used
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-text-secondary">
              30 questions across all 9 subtests · 36 minutes
            </p>
            <p className="mt-2 text-sm text-text-tertiary">
              Best first stop. Get a balanced read on every section, an
              estimated AFQT, and your top-3 weak topics.
              {diagnosticLocked && !loading && (
                <span className="mt-1 block text-yellow-400/80">
                  You&apos;ve used your free diagnostic. Upgrade to run more.
                </span>
              )}
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

      {/* Adaptive AFQT — the free score-moving core */}
      {adaptiveAvailable && (
        <Link
          href={adaptiveHref}
          className="block rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/10 to-transparent p-6 no-underline transition-colors hover:border-accent/70 sm:p-7"
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
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-lg font-bold text-text-primary sm:text-xl">
                  Adaptive AFQT Practice
                </h2>
                <span className="inline-flex items-center rounded-md bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent">
                  Free · daily
                </span>
              </div>
              <p className="mt-1 text-sm text-text-secondary">
                36 questions · ~39 minutes · AR / MK / WK / PC
              </p>
              <p className="mt-2 text-sm text-text-tertiary">
                The core of the method. Picks the right question at the right
                difficulty for where you are — close to one-on-one tutoring. One
                block a day is free; Pro unlocks unlimited.
                {!isAuthed && (
                  <span className="mt-1 block text-accent/80">
                    Create a free account to start.
                  </span>
                )}
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
      )}

      {/* Subtest Drill */}
      <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-7">
        <button
          type="button"
          onClick={() => {
            if (drillLocked && !loading) {
              router.push("/upgrade?from=variant_picker&variant=subtest_drill");
            } else {
              setDrillOpen((v) => !v);
            }
          }}
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
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-bold text-text-primary sm:text-xl">
                  Subtest Drill
                </h2>
                {drillLocked && !loading && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent">
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75A4.5 4.5 0 007.5 6.75v3.75m-.75 0h10.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H7.125a.75.75 0 01-.75-.75v-7.5a.75.75 0 01.75-.75z"
                      />
                    </svg>
                    Pro
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-text-secondary">
                25 questions on a single subtest · 20 minutes
              </p>
              <p className="mt-2 text-sm text-text-tertiary">
                Already know which section is dragging you down? Drill just
                that subtest until it stops being a weakness.
              </p>
            </div>
            {drillLocked && !loading ? (
              <svg
                className="hidden h-5 w-5 shrink-0 text-accent/60 sm:block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75A4.5 4.5 0 007.5 6.75v3.75m-.75 0h10.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H7.125a.75.75 0 01-.75-.75v-7.5a.75.75 0 01.75-.75z"
                />
              </svg>
            ) : (
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
            )}
          </div>
        </button>

        {drillOpen && !drillLocked && (
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {ALL_SUBTESTS.map((st) => (
              <Link
                key={st}
                href={`/practice-test?variant=subtest_drill&subtest=${st}`}
                onClick={(e) => handleDrillSubtestClick(e, st)}
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

      {/* ── Phase E: free-tier footer hint ────────────────────────────────── */}
      <p className="mt-2 text-center text-xs text-text-tertiary">
        Free: 1 diagnostic + 1 adaptive AFQT block/day + unlimited mistake
        review.&nbsp; Pro: unlimited adaptive, drills &amp; sims &middot;
        $9.99/mo &middot;{" "}
        <Link
          href="/upgrade?from=variant_picker_footer"
          className="text-accent no-underline hover:underline"
        >
          See plans
        </Link>
      </p>
      {/* ── End Phase E ───────────────────────────────────────────────────── */}
    </div>
  );
}
