"use client";

import Link from "next/link";

type MissionState =
  | "no_diagnostic"
  | "daily_available"
  | "daily_done"
  | "keep_practicing";

interface MissionCardProps {
  state: MissionState;
  streakCount: number;
  weakestTopicTitle: string | null;
  weakestSubtest: string | null;
  isPro: boolean;
}

export default function MissionCard({
  state,
  streakCount,
  weakestTopicTitle,
  weakestSubtest,
  isPro,
}: MissionCardProps) {
  return (
    <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-6 sm:p-8">
      {state === "no_diagnostic" && (
        <>
          <h2 className="font-display text-xl font-bold text-text-primary">
            Take your baseline diagnostic
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            30 questions across all 9 subtests. Find out where you stand and get
            a study plan built around your weak spots.
          </p>
          <Link
            href="/practice-test?variant=diagnostic"
            className="mt-4 inline-flex rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
          >
            Start free diagnostic
          </Link>
        </>
      )}

      {state === "daily_available" && (
        <>
          <h2 className="font-display text-xl font-bold text-text-primary">
            Today&apos;s 10 Questions
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            {streakCount > 0
              ? `Keep your ${streakCount}-day streak alive. Quick daily practice focused on your weak spots.`
              : "Start a daily streak. 10 questions weighted toward your weak topics."}
          </p>
          <Link
            href="/app/daily"
            className="mt-4 inline-flex rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
          >
            Start daily challenge
          </Link>
        </>
      )}

      {state === "daily_done" && (
        <>
          <h2 className="font-display text-xl font-bold text-text-primary">
            Done for today
            {streakCount > 0 && (
              <span className="ml-2 text-accent">
                🔥 {streakCount} day{streakCount === 1 ? "" : "s"}
              </span>
            )}
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Come back tomorrow to keep your streak going.
          </p>
          {isPro && weakestTopicTitle && weakestSubtest && (
            <Link
              href={`/practice-test?variant=subtest_drill&subtest=${weakestSubtest}`}
              className="mt-4 inline-flex rounded-lg border border-accent/40 px-5 py-2 text-sm font-medium text-accent no-underline transition-colors hover:bg-accent-dim"
            >
              Drill {weakestTopicTitle}
            </Link>
          )}
        </>
      )}

      {state === "keep_practicing" && (
        <>
          <h2 className="font-display text-xl font-bold text-text-primary">
            Keep practicing
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            {weakestTopicTitle
              ? `Your weakest area is ${weakestTopicTitle}. Focus there for the biggest score gain.`
              : "Take another diagnostic to track your progress."}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {isPro && weakestSubtest ? (
              <Link
                href={`/practice-test?variant=subtest_drill&subtest=${weakestSubtest}`}
                className="inline-flex rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
              >
                Drill {weakestSubtest}
              </Link>
            ) : !isPro ? (
              <Link
                href="/upgrade?from=mission"
                className="inline-flex rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
              >
                Upgrade to drill weak spots
              </Link>
            ) : (
              <Link
                href="/practice-test?variant=diagnostic"
                className="inline-flex rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
              >
                Take a diagnostic
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
