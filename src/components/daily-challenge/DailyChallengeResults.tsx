"use client";

import type { PracticeQuestion, UserAnswer } from "@/types";
import { SUBTEST_NAMES } from "@/types";
import { totalCorrect } from "@/lib/test-scorer";
import Link from "next/link";

interface DailyChallengeResultsProps {
  questions: PracticeQuestion[];
  answers: UserAnswer[];
  newStreak: number;
}

export default function DailyChallengeResults({
  questions,
  answers,
  newStreak,
}: DailyChallengeResultsProps) {
  const correct = totalCorrect(questions, answers);
  const pct = Math.round((correct / questions.length) * 100);
  const answerMap = new Map(answers.map((a) => [a.questionId, a.selectedIndex]));

  const streakMsg =
    newStreak >= 7
      ? "You're on fire!"
      : newStreak >= 3
        ? "Building momentum!"
        : newStreak === 1
          ? "Streak started!"
          : `${newStreak} days strong!`;

  return (
    <div className="space-y-6" style={{ animation: "fadeIn 0.5s ease-out" }}>
      {/* Score hero */}
      <div className="rounded-2xl border border-navy-border bg-navy-light p-6 text-center sm:p-8">
        <div
          className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-accent bg-accent-dim sm:h-32 sm:w-32"
          style={{ animation: "fadeIn 0.6s ease-out" }}
        >
          <span className="font-mono text-4xl font-bold text-accent sm:text-5xl">
            {correct}/{questions.length}
          </span>
        </div>
        <p className="mt-4 font-display text-lg font-bold text-text-primary">
          {pct >= 80 ? "Great job!" : pct >= 60 ? "Good effort!" : "Keep practicing!"}
        </p>
        <p className="mt-1 text-sm text-text-secondary">{pct}% correct</p>
      </div>

      {/* Streak */}
      <div className="flex items-center justify-center gap-3 rounded-xl border border-navy-border bg-navy-light px-6 py-4">
        <span className="text-3xl">🔥</span>
        <div>
          <p className="font-display text-lg font-bold text-text-primary">
            {newStreak}-day streak
          </p>
          <p className="text-sm text-text-secondary">{streakMsg}</p>
        </div>
      </div>

      {/* Per-question review */}
      <div className="space-y-2">
        <h3 className="font-display text-base font-bold text-text-primary">
          Question Review
        </h3>
        {questions.map((q, i) => {
          const selected = answerMap.get(q.id) ?? null;
          const isCorrect = selected === q.correctIndex;

          return (
            <details
              key={q.id}
              className="group rounded-xl border border-navy-border bg-navy-light"
            >
              <summary className="flex cursor-pointer items-center gap-3 px-4 py-3 text-sm">
                <span
                  className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isCorrect
                      ? "bg-green-400/20 text-green-400"
                      : selected === null
                        ? "bg-navy-lighter text-text-tertiary"
                        : "bg-red-400/20 text-red-400"
                  }`}
                >
                  {isCorrect ? "✓" : selected === null ? "–" : "✗"}
                </span>
                <span className="flex-1 text-text-secondary group-open:text-text-primary">
                  Q{i + 1}: {SUBTEST_NAMES[q.subtest]}
                </span>
                <span className="text-xs text-text-tertiary">
                  {q.subtest}
                </span>
              </summary>
              <div className="border-t border-navy-border px-4 py-3 text-sm space-y-2">
                <p className="text-text-primary">{q.question}</p>
                <div className="space-y-1">
                  {q.options.map((opt, idx) => (
                    <div
                      key={idx}
                      className={`rounded-lg px-3 py-2 text-sm ${
                        idx === q.correctIndex
                          ? "border border-green-400/30 bg-green-400/10 text-green-300"
                          : idx === selected && idx !== q.correctIndex
                            ? "border border-red-400/30 bg-red-400/10 text-red-300"
                            : "text-text-tertiary"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}. {opt}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-text-secondary">{q.explanation}</p>
              </div>
            </details>
          );
        })}
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/app/home"
          className="flex-1 rounded-xl bg-accent px-6 py-3 text-center text-sm font-semibold text-white no-underline hover:bg-accent-hover"
        >
          Back to Dashboard
        </Link>
        <Link
          href="/practice-test"
          className="flex-1 rounded-xl border border-navy-border bg-navy-light px-6 py-3 text-center text-sm font-semibold text-text-secondary no-underline hover:bg-navy-lighter hover:text-text-primary"
        >
          Full Practice Test
        </Link>
      </div>
    </div>
  );
}
