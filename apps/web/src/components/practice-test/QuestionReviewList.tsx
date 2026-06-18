"use client";

import { useState } from "react";
import type { PracticeQuestion, UserAnswer } from "@/types";
import { SUBTEST_NAMES } from "@/types";
import { getTopicTitle } from "@/lib/practice/topic-catalog";

interface QuestionReviewListProps {
  questions: PracticeQuestion[];
  answers: UserAnswer[];
  /** Default false; the parent flips this when the user clicks "Review every question". */
  defaultOpen?: boolean;
}

const OPTION_LETTERS = ["A", "B", "C", "D"] as const;

export default function QuestionReviewList({
  questions,
  answers,
  defaultOpen = false,
}: QuestionReviewListProps) {
  const [open, setOpen] = useState(defaultOpen);
  const answerMap = new Map(answers.map((a) => [a.questionId, a.selectedIndex]));

  const correctCount = questions.reduce((acc, q) => {
    const sel = answerMap.get(q.id);
    return sel === q.correctIndex ? acc + 1 : acc;
  }, 0);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-xl border border-navy-border bg-navy-light px-5 py-4 text-left transition-colors hover:bg-navy-lighter"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-display text-base font-bold text-text-primary">
              Review every question
            </p>
            <p className="mt-0.5 text-sm text-text-tertiary">
              {questions.length} questions · {correctCount} correct ·
              explanations included
            </p>
          </div>
          <svg
            className="h-5 w-5 shrink-0 text-text-tertiary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-text-primary">
          Question-by-Question Review
        </h3>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          Collapse
        </button>
      </div>

      <ol className="space-y-4">
        {questions.map((q, i) => {
          const selected = answerMap.get(q.id) ?? null;
          const isCorrect = selected === q.correctIndex;
          const topicTitle = q.topicId
            ? getTopicTitle(q.topicId)
            : SUBTEST_NAMES[q.subtest];

          return (
            <li
              key={q.id}
              className="rounded-xl border border-navy-border bg-navy-light p-5"
            >
              {/* Header */}
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-md bg-navy px-2 py-0.5 font-mono font-bold text-text-tertiary">
                  Q{i + 1}
                </span>
                <span className="rounded-md bg-navy px-2 py-0.5 font-bold text-text-tertiary">
                  {SUBTEST_NAMES[q.subtest]}
                </span>
                <span className="text-text-tertiary">{topicTitle}</span>
                <span
                  className={`ml-auto rounded-md px-2 py-0.5 font-bold ${
                    isCorrect
                      ? "bg-green-400/10 text-green-400"
                      : selected === null
                        ? "bg-navy text-text-tertiary"
                        : "bg-red-400/10 text-red-400"
                  }`}
                >
                  {isCorrect
                    ? "Correct"
                    : selected === null
                      ? "Skipped"
                      : "Incorrect"}
                </span>
              </div>

              {/* Stem */}
              <p className="mb-3 text-sm font-medium text-text-primary">
                {q.question}
              </p>

              {/* Options */}
              <ul className="mb-3 space-y-1.5">
                {q.options.map((opt, idx) => {
                  const isCorrectOpt = idx === q.correctIndex;
                  const isUserPick = idx === selected;
                  let cls =
                    "flex items-start gap-2 rounded-lg px-3 py-2 text-sm border";
                  if (isCorrectOpt) {
                    cls +=
                      " border-green-400/40 bg-green-400/10 text-green-300";
                  } else if (isUserPick && !isCorrectOpt) {
                    cls += " border-red-400/40 bg-red-400/10 text-red-300";
                  } else {
                    cls += " border-transparent text-text-secondary";
                  }
                  return (
                    <li key={idx} className={cls}>
                      <span className="font-mono font-bold text-text-tertiary">
                        {OPTION_LETTERS[idx]}.
                      </span>
                      <span className="flex-1">{opt}</span>
                      {isCorrectOpt && (
                        <span className="text-xs font-bold uppercase tracking-wider text-green-400">
                          Correct
                        </span>
                      )}
                      {isUserPick && !isCorrectOpt && (
                        <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                          Your answer
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Explanation */}
              <div className="rounded-lg border border-navy-border bg-navy px-3 py-2">
                <p className="text-xs font-bold uppercase tracking-wider text-text-tertiary">
                  Why
                </p>
                <p className="mt-1 text-sm text-text-secondary">
                  {q.explanation}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
