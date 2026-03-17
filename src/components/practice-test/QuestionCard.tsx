import type { PracticeQuestion } from "@/types";
import { SUBTEST_NAMES } from "@/types";

interface QuestionCardProps {
  question: PracticeQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const OPTION_LETTERS = ["A", "B", "C", "D"] as const;

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedIndex,
  onSelect,
  onPrev,
  onNext,
  isFirst,
  isLast,
}: QuestionCardProps) {
  return (
    <div
      className="space-y-6"
      key={question.id}
      style={{ animation: "fadeIn 0.3s ease-out" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="rounded-md bg-accent-dim px-2.5 py-1 text-xs font-semibold tracking-wide text-accent">
          {question.subtest} — {SUBTEST_NAMES[question.subtest]}
        </span>
        <span className="font-mono text-sm tabular-nums text-text-tertiary">
          {questionNumber} / {totalQuestions}
        </span>
      </div>

      {/* Question */}
      <p className="whitespace-pre-line font-display text-lg font-semibold leading-relaxed text-text-primary sm:text-xl">
        {question.question}
      </p>

      {/* Options */}
      <fieldset className="space-y-3" aria-label={`Question ${questionNumber} answers`}>
        <legend className="sr-only">Select your answer</legend>
        {question.options.map((option, idx) => {
          const isSelected = selectedIndex === idx;

          return (
            <button
              key={idx}
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(idx)}
              className={`flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-all duration-200 sm:px-5 sm:py-4 ${
                isSelected
                  ? "border-accent bg-accent-dim shadow-[0_0_16px_var(--color-accent-glow)]"
                  : "border-navy-border bg-navy-light hover:border-navy-lighter hover:bg-navy-lighter"
              }`}
            >
              <span
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md font-mono text-sm font-bold transition-colors ${
                  isSelected
                    ? "bg-accent text-white"
                    : "bg-navy-lighter text-text-tertiary"
                }`}
              >
                {OPTION_LETTERS[idx]}
              </span>
              <span
                className={`pt-0.5 text-sm sm:text-base ${
                  isSelected ? "text-text-primary" : "text-text-secondary"
                }`}
              >
                {option}
              </span>
            </button>
          );
        })}
      </fieldset>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-navy-border pt-5">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            isFirst
              ? "cursor-not-allowed text-text-tertiary/40"
              : "text-text-secondary hover:bg-navy-lighter hover:text-text-primary"
          }`}
        >
          Previous
        </button>

        <button
          onClick={onNext}
          className="rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          {isLast ? "Review Answers" : "Next"}
        </button>
      </div>
    </div>
  );
}
