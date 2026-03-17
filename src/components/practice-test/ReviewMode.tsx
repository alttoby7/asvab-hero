import type { PracticeQuestion, UserAnswer } from "@/types";
import { SUBTEST_NAMES } from "@/types";

interface ReviewModeProps {
  questions: PracticeQuestion[];
  answers: UserAnswer[];
  onJumpTo: (index: number) => void;
  onSubmit: () => void;
}

const OPTION_LETTERS = ["A", "B", "C", "D"] as const;

export default function ReviewMode({
  questions,
  answers,
  onJumpTo,
  onSubmit,
}: ReviewModeProps) {
  const answerMap = new Map(answers.map((a) => [a.questionId, a.selectedIndex]));
  const unansweredCount = answers.filter(
    (a) => a.selectedIndex === null
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Review Your Answers
        </h2>
        {unansweredCount > 0 && (
          <span className="rounded-md bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-400">
            {unansweredCount} unanswered
          </span>
        )}
      </div>

      {/* Question list */}
      <div className="space-y-3">
        {questions.map((q, i) => {
          const selected = answerMap.get(q.id);
          const isUnanswered = selected === null || selected === undefined;

          return (
            <button
              key={q.id}
              onClick={() => onJumpTo(i)}
              className={`flex w-full items-start gap-4 rounded-xl border px-4 py-3 text-left transition-all duration-200 hover:bg-navy-lighter ${
                isUnanswered
                  ? "border-amber-500/30 bg-amber-500/5"
                  : "border-navy-border bg-navy-light"
              }`}
            >
              {/* Number */}
              <span
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold ${
                  isUnanswered
                    ? "bg-amber-500/15 text-amber-400"
                    : "bg-success-dim text-success"
                }`}
              >
                {i + 1}
              </span>

              <div className="min-w-0 flex-1">
                {/* Subtest badge + question */}
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary">
                    {q.subtest} — {SUBTEST_NAMES[q.subtest]}
                  </span>
                </div>
                <p className="truncate text-sm text-text-secondary">
                  {q.question}
                </p>
              </div>

              {/* Selected answer */}
              <span
                className={`flex-shrink-0 self-center text-sm font-medium ${
                  isUnanswered ? "text-amber-400" : "text-text-tertiary"
                }`}
              >
                {isUnanswered
                  ? "—"
                  : OPTION_LETTERS[selected as number]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Submit */}
      <div className="rounded-xl border border-navy-border bg-navy-light p-6 text-center">
        {unansweredCount > 0 && (
          <p className="mb-3 text-sm text-amber-400">
            You have {unansweredCount} unanswered question
            {unansweredCount !== 1 ? "s" : ""}. Unanswered questions will be
            marked incorrect.
          </p>
        )}
        <button
          onClick={onSubmit}
          className="rounded-xl bg-accent px-8 py-3 font-display text-base font-bold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)]"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
}
