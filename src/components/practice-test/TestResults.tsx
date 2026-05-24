"use client";

import { useMemo } from "react";
import type {
  PracticeQuestion,
  UserAnswer,
  SubtestResult,
  TopicStats,
} from "@/types";
import { SUBTEST_NAMES } from "@/types";
import {
  scoreBySubtest,
  scoreByTopic,
  estimateAFQT,
  estimatePrimaryMetric,
  estimateRatingComposite,
  estimateStandardScores,
  totalCorrect,
} from "@/lib/test-scorer";
import { ALL_SUBTESTS } from "@/types";
import { getAFQTCategoryDescription } from "@/lib/score-calculator";
import { recommendNextStep } from "@/lib/practice/recommender";
import type { PrepMode } from "@/lib/prep-mode";
import TopicBreakdown from "./TopicBreakdown";
import NextStepCard from "./NextStepCard";
import GtPostBlockCard from "./GtPostBlockCard";
import QuestionReviewList from "./QuestionReviewList";
import DiagnosticResultsBridge from "./DiagnosticResultsBridge";
import Link from "next/link";
import { useEntitlement } from "@/hooks/useEntitlement";

interface TestResultsProps {
  questions: PracticeQuestion[];
  answers: UserAnswer[];
  onRetake: () => void;
  userId: string | null;
  savedProfile: TopicStats[] | null;
  /** Prep mode — AFCT users see GT/General (proxy) instead of AFQT. */
  prepMode?: PrepMode | null;
}

function SubtestCard({ result }: { result: SubtestResult }) {
  const color =
    result.percentage >= 80
      ? "text-green-400"
      : result.percentage >= 50
        ? "text-accent"
        : "text-red-400";
  const barColor =
    result.percentage >= 80
      ? "bg-green-400"
      : result.percentage >= 50
        ? "bg-accent"
        : "bg-red-400";
  const bgColor =
    result.percentage >= 80
      ? "bg-green-400/10"
      : result.percentage >= 50
        ? "bg-accent-dim"
        : "bg-red-400/10";

  return (
    <div className="rounded-xl border border-navy-border bg-navy-light p-4">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-text-tertiary">
          {result.subtest}
        </span>
        <span className={`font-mono text-sm font-bold ${color}`}>
          {result.correct}/{result.total}
        </span>
      </div>
      <p className="mb-3 text-sm text-text-secondary">
        {SUBTEST_NAMES[result.subtest]}
      </p>
      <div className="flex items-center gap-2">
        <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-navy-lighter">
          <div
            className={`absolute inset-y-0 left-0 rounded-full ${barColor} transition-all duration-700 ease-out`}
            style={{ width: `${result.percentage}%` }}
          />
        </div>
        <span
          className={`rounded-md px-1.5 py-0.5 font-mono text-xs font-bold ${color} ${bgColor}`}
        >
          {result.percentage}%
        </span>
      </div>
    </div>
  );
}

function ScoreCircle({
  value,
  label,
  sublabel,
}: {
  value: string | number;
  label: string;
  sublabel?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-accent bg-accent-dim sm:h-32 sm:w-32"
        style={{ animation: "fadeIn 0.6s ease-out" }}
      >
        <span className="font-mono text-4xl font-bold text-accent sm:text-5xl">
          {value}
        </span>
      </div>
      <span className="text-sm font-semibold text-text-secondary">{label}</span>
      {sublabel && (
        <span className="text-xs text-text-tertiary">{sublabel}</span>
      )}
    </div>
  );
}

export default function TestResults({
  questions,
  answers,
  onRetake,
  userId,
  savedProfile,
  prepMode,
}: TestResultsProps) {
  // Phase E: entitlement for upgrade nudge
  const { entitlement } = useEntitlement();
  const showProUpsell = !!userId && !entitlement.isPro;

  const subtestResults = scoreBySubtest(questions, answers);
  const topicResults = scoreByTopic(questions, answers);
  const afqtEstimate = estimateAFQT(subtestResults);
  // AFCT users see their prep proxy instead of AFQT (no tier/qualification claims):
  //   • Navy/CG rating → the composite line-score proxy (weighted equated sum)
  //   • GT / General   → AR+WK+PC equated proxy
  const rating = prepMode?.ratingComposite ?? null;
  const isAfqtMode =
    !rating && (!prepMode || prepMode.primaryMetric === "AFQT");
  const primary: { score: number; label: string } | null = rating
    ? {
        score: estimateRatingComposite(subtestResults, rating.weights),
        label: rating.label,
      }
    : isAfqtMode
      ? null
      : estimatePrimaryMetric(subtestResults, prepMode!.primaryMetric);
  const correct = totalCorrect(questions, answers);
  const overallPct = Math.round((correct / questions.length) * 100);
  const estimatedScores = estimateStandardScores(subtestResults);
  const calcParams = ALL_SUBTESTS.map(
    (st) => `${st}=${estimatedScores[st]}`
  ).join("&");

  // Determine which variants are active. v1: diagnostic + subtest_drill.
  // We don't await the DB here — the recommender is rendered synchronously.
  // Anything beyond v1 will fail the active check and be skipped.
  const activeVariantCodes = useMemo(
    () => new Set(["diagnostic", "subtest_drill"]),
    []
  );

  const recommendation = useMemo(
    () =>
      recommendNextStep({
        latestByTopic: topicResults,
        topicStats: savedProfile,
        activeVariantCodes,
      }),
    [topicResults, savedProfile, activeVariantCodes]
  );

  return (
    <div className="space-y-8" style={{ animation: "fadeIn 0.5s ease-out" }}>
      {/* Hero scores */}
      <section className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
        <h2 className="mb-6 text-center font-display text-xl font-bold text-text-primary sm:text-2xl">
          Your Results
        </h2>
        <div className="flex flex-wrap items-start justify-center gap-8 sm:gap-12">
          <ScoreCircle
            value={`${overallPct}%`}
            label="Overall Score"
            sublabel={`${correct} of ${questions.length} correct`}
          />
          {isAfqtMode ? (
            <ScoreCircle
              value={afqtEstimate.score}
              label="Est. AFQT"
              sublabel={`Category ${afqtEstimate.category}`}
            />
          ) : (
            <ScoreCircle
              value={primary!.score}
              label={`Est. ${primary!.label}`}
              sublabel="practice proxy"
            />
          )}
        </div>
        {!isAfqtMode && (
          <p className="mt-3 text-center text-xs text-text-tertiary">
            A practice proxy to track your {primary!.label} climb — not an official
            score or a qualification guarantee. Targets vary by role/program.
          </p>
        )}
        <div className="mt-4 text-center">
          <p className="text-sm text-text-secondary">
            {getAFQTCategoryDescription(afqtEstimate.category)}
          </p>
          <p className="mt-1 text-xs text-text-tertiary">
            AFQT estimate based on {questions.length} questions — take a
            full-length test for a more accurate score.
          </p>
        </div>
      </section>

      {/* GT Target Mode post-block card (Army/Marines AFCT) — the GT CTA moment */}
      {userId && prepMode?.primaryMetric === "GT" && (
        <GtPostBlockCard userId={userId} />
      )}

      {/* Anonymous users: soft-gate the personalized artifact behind a free
         account. The top-line scores above stay visible (the immediate answer +
         AI/search landing payoff); the breakdown, per-question review, and plan
         are unlocked by signing up. The just-finished diagnostic is held in
         localStorage and migrated into the new account on first authed app load
         (AppLayout → syncLocalHistoryToRemote), so nothing is lost. */}
      {!userId && (
        <DiagnosticResultsBridge
          afqt={isAfqtMode ? afqtEstimate.score : primary?.score ?? afqtEstimate.score}
          questionCount={questions.length}
          isAfqtMode={isAfqtMode}
        />
      )}

      {/* Topic breakdown + subtest scores + next step — gated to authed users. */}
      {userId && (
        <>
          {/* Topic breakdown — top-3 strong / top-3 weak */}
          <TopicBreakdown topicResults={topicResults} />

          {/* Score by Subtest */}
          <section>
            <h3 className="mb-4 font-display text-lg font-bold text-text-primary">
              Score by Subtest
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {subtestResults.map((result) => (
                <SubtestCard key={result.subtest} result={result} />
              ))}
            </div>
          </section>

          {/* Single deterministic next-step recommendation */}
          <NextStepCard recommendation={recommendation} />
        </>
      )}

      {/* CTAs */}
      <section className="space-y-3">
        <Link
          href={`/calculator?${calcParams}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-display text-base font-bold text-white no-underline transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)]"
        >
          See Which Jobs You Qualify For
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>

        {/* Authed free users → their free plan. Anon users get this as the
           primary CTA inside the DiagnosticResultsBridge above, so it's gated
           to signed-in users here to avoid a duplicate ask. */}
        {userId && !entitlement.isPro && (
          <Link
            href="/app/plan"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#f97316]/40 bg-[#0a1628] px-6 py-3.5 font-display text-base font-bold text-[#f97316] no-underline transition-all duration-200 hover:bg-[#101e36]"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Go to my free plan
          </Link>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={onRetake}
            className="flex-1 rounded-xl border border-navy-border bg-navy-light px-4 py-3 text-sm font-semibold text-text-secondary transition-colors hover:bg-navy-lighter hover:text-text-primary"
          >
            Retake Test
          </button>
          {entitlement.isPro ? (
            <Link
              href="/app/home"
              className="flex-1 rounded-xl border border-accent/30 bg-accent-dim px-4 py-3 text-center text-sm font-semibold text-accent no-underline transition-colors hover:border-accent/50 hover:bg-accent/20"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              href="/pricing"
              className="flex-1 rounded-xl border border-navy-border bg-navy-light px-4 py-3 text-center text-sm font-semibold text-text-secondary no-underline transition-colors hover:bg-navy-lighter hover:text-text-primary"
            >
              Compare plans
            </Link>
          )}
        </div>
      </section>

      {/* ── Phase E: Pro upsell card for free authed users ────────────────── */}
      {showProUpsell && (
        <section className="rounded-2xl border-t-2 border-accent bg-navy-light p-6">
          <h3 className="font-display text-lg font-bold text-text-primary">
            Ready to go faster?
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Your free plan already drills these weak spots every day — one adaptive
            AFQT block plus Mistake-Bank review. Pro adds unlimited practice,
            full-length timed sims, and deeper analytics for the final push.
            $9.99/mo or $49.99/yr.
          </p>
          <Link
            href="/upgrade?from=results"
            className="mt-4 inline-flex items-center gap-1.5 font-semibold text-accent no-underline transition-colors hover:text-accent-hover"
          >
            See Pro &rarr;
          </Link>
        </section>
      )}
      {/* ── End Phase E ───────────────────────────────────────────────────── */}

      {/* Per-question review (collapsed by default) — gated to authed users;
         anon users unlock it via the free-account bridge above. */}
      {userId && <QuestionReviewList questions={questions} answers={answers} />}
    </div>
  );
}
