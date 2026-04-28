"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useEntitlement } from "@/hooks/useEntitlement";

interface DbQuestion {
  id: string;
  stem: string;
  choices: string[];
  correct_index: number;
  explanation: string;
  topic_id: string;
  subtest: string;
  difficulty: number;
}

interface AnswerState {
  [questionIndex: number]: number | null;
}

interface MiniDrillProps {
  topicId: string;
}

const OPTION_LETTERS = ["A", "B", "C", "D"] as const;

function writeLocalAttempt(topicId: string, score: number, total: number) {
  try {
    const key = "asvabhero.practiceHistory.v1";
    const existing = localStorage.getItem(key);
    const history = existing ? JSON.parse(existing) : [];
    history.push({
      source: "mini_drill",
      topic_id: topicId,
      variant_code: "subtest_drill",
      correct_count: score,
      question_count: total,
      completed_at: new Date().toISOString(),
    });
    localStorage.setItem(key, JSON.stringify(history));
  } catch {
    // localStorage not available
  }
}

export default function MiniDrill({ topicId }: MiniDrillProps) {
  const { entitlement, loading: entitlementLoading } = useEntitlement();
  const [questions, setQuestions] = useState<DbQuestion[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Only fetch questions for Pro users.
  const shouldFetch = !entitlementLoading && entitlement.isPro;

  useEffect(() => {
    if (!shouldFetch) {
      setLoading(false);
      return;
    }
    const supabase = getSupabaseBrowserClient();
    supabase
      .from("practice_questions")
      .select("id, stem, choices, correct_index, explanation, topic_id, subtest, difficulty")
      .eq("topic_id", topicId)
      .eq("active", true)
      .limit(5)
      .then(({ data, error }) => {
        if (error) {
          console.error("MiniDrill fetch error:", error);
          setQuestions([]);
        } else {
          setQuestions(data as DbQuestion[]);
        }
        setLoading(false);
      });
  }, [topicId, shouldFetch]);

  const handleSelect = (qIndex: number, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const allAnswered =
    questions !== null &&
    questions.length >= 3 &&
    questions.every((_, i) => answers[i] !== undefined && answers[i] !== null);

  const handleSubmit = async () => {
    if (!questions || questions.length < 3 || submitting) return;
    setSubmitting(true);

    const correctCount = questions.filter(
      (q, i) => answers[i] === q.correct_index
    ).length;

    const supabase = getSupabaseBrowserClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      const userId = session.user.id;
      const now = new Date().toISOString();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from("attempts") as any).insert({
        user_id: userId,
        variant_code: "subtest_drill",
        source: "mini_drill",
        topic_id: topicId,
        started_at: now,
        completed_at: now,
        duration_seconds: 0,
        question_count: questions.length,
        correct_count: correctCount,
        results_by_subtest: {},
        results_by_topic: { [topicId]: { correct: correctCount, total: questions.length } },
        question_results: questions.map((q, i) => ({
          question_id: q.id,
          selected: answers[i],
          correct: answers[i] === q.correct_index,
          topic_id: q.topic_id,
        })),
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).rpc("recompute_topic_stats", {
        p_user_id: userId,
        p_topic_ids: [topicId],
      });

      const pct = Math.round((correctCount / questions.length) * 100);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: existing } = await (supabase.from("study_guide_progress") as any)
        .select("mini_drill_attempts, best_mini_drill_pct, first_viewed_at")
        .eq("user_id", userId)
        .eq("topic_id", topicId)
        .single() as {
          data: { mini_drill_attempts: number; best_mini_drill_pct: number | null; first_viewed_at: string | null } | null;
        };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from("study_guide_progress") as any).upsert({
        user_id: userId,
        topic_id: topicId,
        first_viewed_at: existing?.first_viewed_at ?? now,
        last_viewed_at: now,
        mini_drill_attempts: (existing?.mini_drill_attempts ?? 0) + 1,
        best_mini_drill_pct: Math.max(pct, existing?.best_mini_drill_pct ?? 0),
        last_mini_drill_pct: pct,
        updated_at: now,
      });
    } else {
      writeLocalAttempt(topicId, correctCount, questions.length);
    }

    setSubmitted(true);
    setSubmitting(false);
  };


  // Paywall: free/anon users see a lock card instead of the drill.
  if (!entitlementLoading && !entitlement.isPro) {
    return (
      <div className="rounded-xl border border-navy-border bg-navy-light p-6 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-dim">
          <svg
            className="h-5 w-5 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75A4.5 4.5 0 007.5 6.75v3.75m-.75 0h10.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H7.125a.75.75 0 01-.75-.75v-7.5a.75.75 0 01.75-.75z"
            />
          </svg>
        </div>
        <p className="mb-1 font-semibold text-text-primary">This drill is part of Pro</p>
        <p className="mb-4 text-sm text-text-secondary">
          Upgrade to unlock topic drills, subtest drills, and unlimited practice.
        </p>
        <Link
          href="/upgrade?from=mini_drill"
          className="inline-block rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-white no-underline transition-all hover:bg-accent-hover hover:shadow-[0_0_20px_var(--color-accent-glow)]"
        >
          Upgrade to Pro
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-navy-border bg-navy-light p-6 text-center text-sm text-text-tertiary">
        Loading practice questions...
      </div>
    );
  }

  if (!questions || questions.length < 3) {
    return (
      <div className="rounded-xl border border-navy-border bg-navy-light p-6">
        <p className="text-sm text-text-secondary">
          More practice items coming soon for this topic. In the meantime, try
          the{" "}
          <a href="/practice-test" className="text-accent underline underline-offset-2">
            full practice test
          </a>{" "}
          to see questions from across all subtests.
        </p>
      </div>
    );
  }

  const correctCount = submitted
    ? questions.filter((q, i) => answers[i] === q.correct_index).length
    : 0;
  const pct = submitted ? Math.round((correctCount / questions.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-primary">
          Quick Practice ({questions.length} questions)
        </h2>
        {submitted && (
          <span
            className={`rounded-md px-3 py-1 text-sm font-semibold ${
              pct >= 80
                ? "bg-green-500/20 text-green-400"
                : pct >= 60
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {correctCount}/{questions.length} correct ({pct}%)
          </span>
        )}
      </div>

      <div className="space-y-8">
        {questions.map((q, qIndex) => {
          const selected = answers[qIndex] ?? null;
          const isCorrect = submitted && selected === q.correct_index;
          const isWrong = submitted && selected !== null && selected !== q.correct_index;

          return (
            <div key={q.id} className="space-y-3">
              <p className="font-medium text-text-primary">
                <span className="mr-2 text-sm font-normal text-text-tertiary">
                  {qIndex + 1}.
                </span>
                {q.stem}
              </p>

              <div className="space-y-2">
                {(q.choices as string[]).map((choice, optIndex) => {
                  const isSelected = selected === optIndex;
                  const isAnswer = q.correct_index === optIndex;

                  let borderClass = "border-navy-border bg-navy-light hover:border-navy-lighter";
                  if (!submitted && isSelected) {
                    borderClass = "border-accent bg-accent-dim shadow-[0_0_16px_var(--color-accent-glow)]";
                  } else if (submitted && isAnswer) {
                    borderClass = "border-green-500 bg-green-500/10";
                  } else if (submitted && isSelected && !isAnswer) {
                    borderClass = "border-red-500 bg-red-500/10";
                  }

                  return (
                    <button
                      key={optIndex}
                      onClick={() => handleSelect(qIndex, optIndex)}
                      disabled={submitted}
                      className={`flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${borderClass}`}
                    >
                      <span
                        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold ${
                          submitted && isAnswer
                            ? "bg-green-500 text-white"
                            : submitted && isSelected && !isAnswer
                            ? "bg-red-500 text-white"
                            : isSelected
                            ? "bg-accent text-white"
                            : "bg-navy-lighter text-text-tertiary"
                        }`}
                      >
                        {OPTION_LETTERS[optIndex]}
                      </span>
                      <span className="pt-0.5 text-sm text-text-secondary">
                        {choice}
                      </span>
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div
                  className={`rounded-lg px-4 py-3 text-sm ${
                    isCorrect
                      ? "bg-green-500/10 text-green-300"
                      : "bg-red-500/10 text-red-300"
                  }`}
                >
                  {isCorrect ? (
                    <span className="font-medium">Correct. </span>
                  ) : isWrong ? (
                    <span className="font-medium">
                      Incorrect — correct answer: {OPTION_LETTERS[q.correct_index]}.{" "}
                    </span>
                  ) : (
                    <span className="font-medium">
                      Skipped — answer: {OPTION_LETTERS[q.correct_index]}.{" "}
                    </span>
                  )}
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered || submitting}
          className={`w-full rounded-xl py-3 text-sm font-semibold transition-colors ${
            allAnswered
              ? "bg-accent text-white hover:bg-accent-hover"
              : "cursor-not-allowed bg-navy-lighter text-text-tertiary"
          }`}
        >
          {submitting ? "Saving..." : "Submit Answers"}
        </button>
      )}

      {submitted && (
        <p className="text-center text-xs text-text-tertiary">
          {pct >= 80
            ? "Strong result. Try another topic or take a subtest drill."
            : "Review the explanations above, then try the full practice test for more exposure."}
        </p>
      )}
    </div>
  );
}
