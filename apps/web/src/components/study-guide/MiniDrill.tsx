"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { saveAttempt } from "@/lib/practice/profile-sync";
import { useEntitlement } from "@/hooks/useEntitlement";
import { trackEvent, FunnelEvents, PaywallEvents } from "@/lib/analytics";
import type { AttemptPayload, AsvabSubtest } from "@/types";

interface DbQuestion {
  id: string;
  external_key: string;
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
  const startedRef = useRef(false);
  const paywallFiredRef = useRef(false);

  // Only fetch questions for Pro users.
  const shouldFetch = !entitlementLoading && entitlement.isPro;

  // paywall_shown, fires once when free user first sees the lock card.
  useEffect(() => {
    if (entitlementLoading || entitlement.isPro || paywallFiredRef.current) return;
    paywallFiredRef.current = true;
    trackEvent(FunnelEvents.PaywallShown, {
      reason: "pro_only_mini_drill",
      from: "mini_drill",
      topic_id: topicId,
    });
  }, [entitlementLoading, entitlement.isPro, topicId]);

  // topic_drill_start, fires once when questions are loaded for a Pro user.
  useEffect(() => {
    if (!questions || questions.length < 3 || startedRef.current) return;
    startedRef.current = true;
    const subtest = questions[0]?.subtest;
    trackEvent(FunnelEvents.TopicDrillStart, {
      topic_id: topicId,
      ...(subtest ? { subtest } : {}),
      source: "mini_drill",
    });
  }, [questions, topicId]);

  useEffect(() => {
    if (!shouldFetch) {
      setLoading(false);
      return;
    }
    const supabase = getSupabaseBrowserClient();
    supabase
      .from("practice_questions")
      .select("id, external_key, stem, choices, correct_index, explanation, topic_id, subtest, difficulty")
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

      // Persist via the single audited path. The ingest_attempt_mistakes
      // trigger (migration 0020) banks misses, captures item_exposures, and
      // recomputes topic_stats DB-side, so no explicit recompute_topic_stats
      // rpc is needed. question_results MUST use external_key ids and an
      // INTEGER `correct` (the trigger casts ->>'correct' to int; a boolean
      // threw and silently dropped every mini-drill attempt).
      const subtest = (questions[0]?.subtest ?? null) as AsvabSubtest | null;
      const attemptPayload: AttemptPayload = {
        client_attempt_id: crypto.randomUUID(),
        variant_code: "subtest_drill",
        source: "mini_drill",
        subtest,
        topic_id: topicId,
        started_at: now,
        completed_at: now,
        duration_seconds: 0,
        question_count: questions.length,
        correct_count: correctCount,
        afqt_estimate: null,
        results_by_subtest: subtest
          ? { [subtest]: { seen: questions.length, correct: correctCount } }
          : {},
        results_by_topic: { [topicId]: { seen: questions.length, correct: correctCount } },
        question_results: questions.map((q, i) => ({
          question_id: q.external_key,
          selected: answers[i] ?? null,
          correct: q.correct_index,
          topic_id: q.topic_id,
          is_correct: answers[i] === q.correct_index,
        })),
      };
      await saveAttempt(attemptPayload, userId);

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
      }, { onConflict: "user_id,topic_id" });
    } else {
      writeLocalAttempt(topicId, correctCount, questions.length);
    }

    trackEvent(FunnelEvents.TopicDrillComplete, {
      topic_id: topicId,
      ...(questions[0]?.subtest ? { subtest: questions[0].subtest } : {}),
      source: "mini_drill",
      correct_count: correctCount,
      question_count: questions.length,
    });

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
          // DRAFT (L2 funnel-leak diagnosis, unshipped): this CTA fired
          // paywall_shown on render but had NO click tracking at all — on the
          // highest-traffic paywall surface (study guides), that's a total
          // instrumentation blackout, not just an under-count.
          onClick={() =>
            trackEvent(PaywallEvents.PaywallCtaUpgradeClick, {
              reason: "pro_only_mini_drill",
              variant: "subtest_drill",
            })
          }
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
                      Incorrect, correct answer: {OPTION_LETTERS[q.correct_index]}.{" "}
                    </span>
                  ) : (
                    <span className="font-medium">
                      Skipped, answer: {OPTION_LETTERS[q.correct_index]}.{" "}
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
