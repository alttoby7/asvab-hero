import type { PracticeQuestion, UserAnswer, SubtestResult } from "@/types";
import { SUBTEST_NAMES } from "@/types";
import {
  scoreBySubtest,
  estimateAFQT,
  estimateStandardScores,
  getStrengths,
  getWeaknesses,
  totalCorrect,
} from "@/lib/test-scorer";
import { ALL_SUBTESTS } from "@/types";
import { getAFQTCategoryDescription } from "@/lib/score-calculator";
import Link from "next/link";

interface TestResultsProps {
  questions: PracticeQuestion[];
  answers: UserAnswer[];
  onRetake: () => void;
}

function ScoreCircle({
  value,
  label,
  sublabel,
  size = "lg",
}: {
  value: string | number;
  label: string;
  sublabel?: string;
  size?: "lg" | "sm";
}) {
  const dims = size === "lg" ? "h-28 w-28 sm:h-32 sm:w-32" : "h-20 w-20";
  const textSize = size === "lg" ? "text-4xl sm:text-5xl" : "text-2xl";

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`flex ${dims} items-center justify-center rounded-full border-4 border-accent bg-accent-dim`}
        style={{ animation: "fadeIn 0.6s ease-out" }}
      >
        <span className={`font-mono ${textSize} font-bold text-accent`}>
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

export default function TestResults({
  questions,
  answers,
  onRetake,
}: TestResultsProps) {
  const subtestResults = scoreBySubtest(questions, answers);
  const afqtEstimate = estimateAFQT(subtestResults);
  const correct = totalCorrect(questions, answers);
  const overallPct = Math.round((correct / questions.length) * 100);
  const strengths = getStrengths(subtestResults);
  const weaknesses = getWeaknesses(subtestResults);
  const estimatedScores = estimateStandardScores(subtestResults);
  const calcParams = ALL_SUBTESTS.map(
    (st) => `${st}=${estimatedScores[st]}`
  ).join("&");

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
          <ScoreCircle
            value={afqtEstimate.score}
            label="Est. AFQT"
            sublabel={`Category ${afqtEstimate.category}`}
          />
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-text-secondary">
            {getAFQTCategoryDescription(afqtEstimate.category)}
          </p>
          <p className="mt-1 text-xs text-text-tertiary">
            AFQT estimate based on 30 questions — take a full-length test for a
            more accurate score.
          </p>
        </div>
      </section>

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

      {/* Strengths & Weaknesses */}
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-navy-border bg-navy-light p-5">
          <h3 className="mb-3 flex items-center gap-2 font-display text-base font-bold text-green-400">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            Your Strengths
          </h3>
          <ul className="space-y-2">
            {strengths.map((s) => (
              <li
                key={s.subtest}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-text-secondary">
                  {SUBTEST_NAMES[s.subtest]}
                </span>
                <span className="font-mono font-bold text-green-400">
                  {s.percentage}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-navy-border bg-navy-light p-5">
          <h3 className="mb-3 flex items-center gap-2 font-display text-base font-bold text-accent">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Areas to Improve
          </h3>
          <ul className="space-y-2">
            {weaknesses.map((w) => (
              <li
                key={w.subtest}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-text-secondary">
                  {SUBTEST_NAMES[w.subtest]}
                </span>
                <span className="font-mono font-bold text-accent">
                  {w.percentage}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

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

        <div className="flex gap-3">
          <button
            onClick={onRetake}
            className="flex-1 rounded-xl border border-navy-border bg-navy-light px-4 py-3 text-sm font-semibold text-text-secondary transition-colors hover:bg-navy-lighter hover:text-text-primary"
          >
            Retake Test
          </button>
          <Link
            href="/pricing"
            className="flex-1 rounded-xl border border-accent/30 bg-accent-dim px-4 py-3 text-center text-sm font-semibold text-accent no-underline transition-colors hover:border-accent/50 hover:bg-accent/20"
          >
            Unlock Unlimited Tests
          </Link>
        </div>
      </section>
    </div>
  );
}
