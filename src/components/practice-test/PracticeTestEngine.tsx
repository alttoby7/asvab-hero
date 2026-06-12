"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type {
  PracticeQuestion,
  UserAnswer,
  TestPhase,
  TestVariant,
  AsvabSubtest,
  TopicStats,
  AttemptPayload,
} from "@/types";
import {
  loadVariant,
  loadQuestionPool,
  sampleForVariant,
  sampleAdaptive,
  shouldUseAdaptive,
  samplePersonalized,
  shouldUsePersonalized,
} from "@/lib/practice/sampler";
import {
  saveAttempt,
  loadProfile,
  generateClientAttemptId,
} from "@/lib/practice/profile-sync";
import { markAnonDiagnosticUsed } from "@/lib/practice/gate";
import {
  scoreBySubtest,
  scoreByTopic,
  estimateAFQT,
  estimatePrimaryMetric,
  estimateRatingComposite,
  totalCorrect,
} from "@/lib/test-scorer";
import {
  getPrepMode,
  ratingBlueprint,
  type PrepMode,
} from "@/lib/prep-mode";
import {
  getHomeTrajectory,
  resolvePrimaryRatingComposite,
  type RpcClient,
} from "@/lib/trajectory/queries";
import type { Branch } from "@/types";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { trackEvent, FunnelEvents } from "@/lib/analytics";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import ReviewMode from "./ReviewMode";
import TestResults from "./TestResults";

interface PracticeTestEngineProps {
  variant?: string;
  subtest?: AsvabSubtest;
  /** Optional override; otherwise pulled from loaded variant. */
  testName?: string;
  testDescription?: string;
}

const STORAGE_KEY = "asvab-hero-practice-test";

interface SavedState {
  answers: UserAnswer[];
  currentIndex: number;
  phase: TestPhase;
  startTime: number;
  questionOrder: string[];
  variantCode: string;
  subtest: AsvabSubtest | null;
  clientAttemptId: string;
}

type LoadState = "idle" | "loading" | "ready" | "error";

export default function PracticeTestEngine({
  variant: variantCode = "diagnostic",
  subtest,
  testName,
  testDescription,
}: PracticeTestEngineProps) {
  const [phase, setPhase] = useState<TestPhase>("intro");
  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [variant, setVariant] = useState<TestVariant | null>(null);
  const [pool, setPool] = useState<PracticeQuestion[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<PracticeQuestion[]>(
    []
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [hasSavedState, setHasSavedState] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [prepMode, setPrepMode] = useState<PrepMode | null>(null);
  const [savedProfile, setSavedProfile] = useState<TopicStats[] | null>(null);
  const [didSaveAttempt, setDidSaveAttempt] = useState(false);
  const startTimeRef = useRef<number>(0);
  const clientAttemptIdRef = useRef<string>("");

  const timeLimitSeconds = variant?.rules.time_seconds ?? 36 * 60;
  const timeLimitMinutes = Math.round(timeLimitSeconds / 60);

  // Display copy: prefer prop, then variant.name, then sensible default.
  const displayName = testName ?? variant?.name ?? "Practice Test";
  const displayDescription =
    testDescription ??
    (variantCode === "subtest_drill" && subtest
      ? `Focused 25-question drill on the ${subtest} subtest.`
      : "Timed practice with detailed per-question feedback.");

  // ── Load variant + pool + auth state on mount or when props change. ────
  useEffect(() => {
    let cancelled = false;
    setLoadState("loading");
    (async () => {
      try {
        const [v, p] = await Promise.all([
          loadVariant(variantCode),
          loadQuestionPool(
            variantCode === "subtest_drill" && subtest ? { subtest } : undefined
          ),
        ]);
        if (cancelled) return;
        setVariant(v);
        setPool(p);
        setTimeRemaining(v.rules.time_seconds);
        setLoadState("ready");
      } catch {
        if (!cancelled) setLoadState("error");
      }

      // Auth + prep-mode (best-effort). Prep mode drives the primary metric
      // (AFQT vs GT/General) for the results + the attempt's cohort fields.
      try {
        const sb = getSupabaseBrowserClient();
        const { data } = await sb.auth.getUser();
        const uid = data.user?.id ?? null;
        if (!cancelled) setUserId(uid);
        if (uid) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: prof } = await (sb.from("profiles") as any)
            .select("test_type,branch")
            .eq("user_id", uid)
            .single();
          const tt = prof?.test_type ?? null;
          const br = (prof?.branch ?? null) as Branch | null;
          // Navy/CG AFCT: resolve the target rating's composite so prep drills
          // that line score. Best-effort; falls back to honest AFQT on any miss.
          let ratingComposite = null;
          if (tt === "afct" && (br === "navy" || br === "coast_guard")) {
            try {
              const traj = await getHomeTrajectory(sb as unknown as RpcClient);
              ratingComposite = resolvePrimaryRatingComposite(traj);
            } catch {
              /* no target rating yet → AFQT fallback */
            }
          }
          if (!cancelled) setPrepMode(getPrepMode(tt, br, ratingComposite));
        }
      } catch {
        if (!cancelled) setUserId(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [variantCode, subtest]);

  // ── Detect any saved in-flight session on mount. ───────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const state: SavedState = JSON.parse(saved);
        if (
          (state.phase === "testing" || state.phase === "review") &&
          state.variantCode === variantCode &&
          (state.subtest ?? undefined) === subtest
        ) {
          setHasSavedState(true);
        }
      }
    } catch {
      /* ignore */
    }
  }, [variantCode, subtest]);

  // ── Timer ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "testing" && phase !== "review") return;
    if (!variant) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = variant.rules.time_seconds - elapsed;
      if (remaining <= 0) {
        setTimeRemaining(0);
        setPhase("results");
        localStorage.removeItem(STORAGE_KEY);
        clearInterval(interval);
      } else {
        setTimeRemaining(remaining);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, variant]);

  // ── Persist in-flight state. ─────────────────────────────────────────
  useEffect(() => {
    if (phase !== "testing" && phase !== "review") return;
    if (shuffledQuestions.length === 0) return;
    const state: SavedState = {
      answers,
      currentIndex,
      phase,
      startTime: startTimeRef.current,
      questionOrder: shuffledQuestions.map((q) => q.id),
      variantCode,
      subtest: subtest ?? null,
      clientAttemptId: clientAttemptIdRef.current,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [
    answers,
    currentIndex,
    phase,
    shuffledQuestions,
    variantCode,
    subtest,
  ]);

  const startFresh = useCallback(() => {
    if (!variant || pool.length === 0) return;

    const beginWith = (sampled: PracticeQuestion[]) => {
      setShuffledQuestions(sampled);
      setAnswers(sampled.map((q) => ({ questionId: q.id, selectedIndex: null })));
      setCurrentIndex(0);
      startTimeRef.current = Date.now();
      clientAttemptIdRef.current = generateClientAttemptId();
      setTimeRemaining(variant.rules.time_seconds);
      setDidSaveAttempt(false);
      setPhase("testing");
      localStorage.removeItem(STORAGE_KEY);
    };

    // Adaptive path (WS6): only when the flag is on AND the adaptive variant is
    // active. Inert otherwise, the default fixed-mix path below is unchanged.
    if (shouldUseAdaptive(variant)) {
      // Navy/CG AFCT: override the blueprint with the target rating's weighted
      // composite demand so the adaptive engine drills that line score's
      // subtests regardless of which adaptive variant routed here.
      const blueprintOverride = prepMode?.ratingComposite
        ? ratingBlueprint(prepMode.ratingComposite.weights)
        : undefined;
      (async () => {
        const sampled = await sampleAdaptive(variant, {
          userId,
          blueprintOverride,
        });
        beginWith(sampled);
      })();
      return;
    }

    // Personalized history-driven variants (weakness_loop / retake_readiness):
    // topic_stats-aware sampling with a robust random fallback inside.
    if (shouldUsePersonalized(variant)) {
      (async () => {
        const sampled = await samplePersonalized(variant, pool, { userId });
        beginWith(sampled);
      })();
      return;
    }

    beginWith(sampleForVariant(variant, pool, { subtest }));
  }, [variant, pool, subtest, userId, prepMode]);

  const startTest = useCallback(
    (resume = false) => {
      if (!variant || pool.length === 0) return;
      if (!resume) {
        startFresh();
        return;
      }
      try {
        const saved: SavedState = JSON.parse(
          localStorage.getItem(STORAGE_KEY)!
        );
        const map = new Map(pool.map((q) => [q.id, q]));
        const ordered = saved.questionOrder
          .map((id) => map.get(id))
          .filter(Boolean) as PracticeQuestion[];
        if (ordered.length !== saved.questionOrder.length) {
          startFresh();
          return;
        }
        const clamped = Math.min(
          Math.max(0, saved.currentIndex),
          ordered.length - 1
        );
        const validAnswers =
          saved.answers.length === ordered.length
            ? saved.answers
            : ordered.map((q) => ({
                questionId: q.id,
                selectedIndex:
                  saved.answers.find((a) => a.questionId === q.id)
                    ?.selectedIndex ?? null,
              }));
        setShuffledQuestions(ordered);
        setAnswers(validAnswers);
        setCurrentIndex(clamped);
        startTimeRef.current = saved.startTime;
        clientAttemptIdRef.current =
          saved.clientAttemptId || generateClientAttemptId();
        setPhase(saved.phase);
        setDidSaveAttempt(false);
      } catch {
        startFresh();
      }
    },
    [variant, pool, startFresh]
  );

  const handleSelect = (optionIndex: number) => {
    setAnswers((prev) =>
      prev.map((a) =>
        a.questionId === shuffledQuestions[currentIndex].id
          ? { ...a, selectedIndex: optionIndex }
          : a
      )
    );
  };

  const goNext = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setPhase("review");
    }
  };
  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };
  const jumpTo = (index: number) => {
    setCurrentIndex(index);
    if (phase === "review") setPhase("testing");
  };

  // ── On submit: build AttemptPayload + persist. ─────────────────────────
  useEffect(() => {
    if (phase !== "results" || didSaveAttempt) return;
    if (!variant || shuffledQuestions.length === 0) return;
    setDidSaveAttempt(true);

    (async () => {
      const subtestResults = scoreBySubtest(shuffledQuestions, answers);
      const topicResults = scoreByTopic(shuffledQuestions, answers);
      const correct = totalCorrect(shuffledQuestions, answers);
      const afqt = estimateAFQT(subtestResults).score;
      // Prep-mode primary metric for the cohort fields:
      //   • Navy/CG rating  → primary_metric_code = the composite FORMULA,
      //     estimate = its weighted equated proxy (cross-cohort comparable).
      //   • AFQT / GT / G   → coarse code + its proxy.
      const rating = prepMode?.ratingComposite ?? null;
      const metricCode = rating ? rating.code : prepMode?.primaryMetric ?? "AFQT";
      const primaryEstimate = rating
        ? estimateRatingComposite(subtestResults, rating.weights)
        : estimatePrimaryMetric(
            subtestResults,
            prepMode?.primaryMetric ?? "AFQT"
          ).score;

      const resultsBySubtest: Record<
        string,
        { seen: number; correct: number }
      > = {};
      for (const r of subtestResults) {
        if (r.total > 0) {
          resultsBySubtest[r.subtest] = { seen: r.total, correct: r.correct };
        }
      }
      const resultsByTopic: Record<
        string,
        { seen: number; correct: number }
      > = {};
      for (const r of topicResults) {
        resultsByTopic[r.topic_id] = { seen: r.seen, correct: r.correct };
      }

      const answerMap = new Map(
        answers.map((a) => [a.questionId, a.selectedIndex])
      );
      const questionResults = shuffledQuestions.map((q) => {
        const sel = answerMap.get(q.id) ?? null;
        return {
          question_id: q.id,
          selected: sel,
          correct: q.correctIndex,
          topic_id: q.topicId ?? `${q.subtest.toLowerCase()}.unknown`,
          is_correct: sel === q.correctIndex,
        };
      });

      const startedAt = new Date(startTimeRef.current).toISOString();
      const completedAt = new Date().toISOString();
      const durationSeconds = Math.max(
        0,
        Math.round((Date.now() - startTimeRef.current) / 1000)
      );

      const payload: AttemptPayload = {
        client_attempt_id:
          clientAttemptIdRef.current || generateClientAttemptId(),
        variant_code: variant.code,
        source: "practice",
        subtest: subtest ?? null,
        topic_id: null,
        started_at: startedAt,
        completed_at: completedAt,
        duration_seconds: durationSeconds,
        question_count: shuffledQuestions.length,
        correct_count: correct,
        afqt_estimate: afqt,
        results_by_subtest: resultsBySubtest,
        results_by_topic: resultsByTopic,
        question_results: questionResults,
        test_type: prepMode?.testType ?? null,
        primary_metric_code: metricCode,
        primary_metric_estimate: primaryEstimate,
      };

      try {
        const result = await saveAttempt(payload, userId);
        setSavedProfile(result.profile);
      } catch {
        // Even on failure we still want a profile to drive the recommender.
        try {
          const fallback = await loadProfile(userId);
          setSavedProfile(fallback);
        } catch {
          setSavedProfile([]);
        }
      }

      // Funnel event: diagnostic_complete or topic_drill_complete
      const completionEvent =
        variantCode === "diagnostic"
          ? FunnelEvents.DiagnosticComplete
          : FunnelEvents.TopicDrillComplete;
      trackEvent(completionEvent, {
        variant: variantCode,
        score: correct,
        question_count: shuffledQuestions.length,
        afqt_estimate: afqt,
        ...(subtest ? { subtest } : {}),
      });

      // GT Target Mode: additive GT-specific completion event.
      if (variantCode === "gt_adaptive") {
        trackEvent("gt_block_complete", {
          primary_metric_estimate: primaryEstimate,
          primary_metric_code: metricCode,
          question_count: shuffledQuestions.length,
        });
      }

      // Mark diagnostic used after submit so the gate fires on next attempt.
      if (variantCode === "diagnostic") {
        if (userId) {
          try {
            const sb = getSupabaseBrowserClient();
            await sb
              .from("profiles")
              .update({ free_diagnostic_used_at: new Date().toISOString() })
              .eq("user_id", userId)
              .is("free_diagnostic_used_at", null); // idempotent: only writes when null
          } catch {
            /* non-blocking */
          }
        } else {
          markAnonDiagnosticUsed();
        }
      }
    })();
  }, [phase, didSaveAttempt, variant, shuffledQuestions, answers, subtest, userId]);

  const handleSubmit = () => {
    setPhase("results");
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleRetake = () => {
    setPhase("intro");
    setHasSavedState(false);
    setSavedProfile(null);
    setDidSaveAttempt(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  // ─── LOADING ───
  if (loadState === "loading" || loadState === "idle") {
    return (
      <div className="rounded-2xl border border-navy-border bg-navy-light p-8 text-center text-sm text-text-tertiary">
        Loading test…
      </div>
    );
  }
  if (loadState === "error" || !variant) {
    return (
      <div className="rounded-2xl border border-red-400/30 bg-red-400/5 p-6 text-sm text-red-300">
        Could not load this test variant. Please refresh the page.
      </div>
    );
  }

  // ─── INTRO ───
  if (phase === "intro") {
    return (
      <div
        className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8"
        style={{ animation: "fadeIn 0.4s ease-out" }}
      >
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-dim">
            <svg
              className="h-8 w-8 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
          </div>

          <h2 className="mb-2 font-display text-2xl font-bold text-text-primary">
            {displayName}
          </h2>
          <p className="mb-6 text-text-secondary">{displayDescription}</p>

          {/* Test details */}
          <div className="mb-8 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-navy px-3 py-3">
              <p className="font-mono text-xl font-bold text-text-primary">
                {variant.rules.length}
              </p>
              <p className="text-xs text-text-tertiary">Questions</p>
            </div>
            <div className="rounded-xl bg-navy px-3 py-3">
              <p className="font-mono text-xl font-bold text-text-primary">
                {timeLimitMinutes}
              </p>
              <p className="text-xs text-text-tertiary">Minutes</p>
            </div>
            <div className="rounded-xl bg-navy px-3 py-3">
              <p className="font-mono text-xl font-bold text-text-primary">
                {variantCode === "subtest_drill" && subtest ? 1 : 9}
              </p>
              <p className="text-xs text-text-tertiary">
                {variantCode === "subtest_drill" && subtest
                  ? "Subtest"
                  : "Subtests"}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => startTest(false)}
              className="w-full rounded-xl bg-accent px-6 py-3.5 font-display text-base font-bold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)]"
            >
              Start Test
            </button>

            {hasSavedState && (
              <button
                onClick={() => startTest(true)}
                className="w-full rounded-xl border border-navy-border bg-navy px-6 py-3 text-sm font-semibold text-text-secondary transition-colors hover:bg-navy-lighter hover:text-text-primary"
              >
                Resume Previous Attempt
              </button>
            )}
          </div>

          <p className="mt-4 text-xs text-text-tertiary">
            Questions are shuffled each attempt. Your progress is saved if you
            leave the page.
          </p>
        </div>
      </div>
    );
  }

  // ─── RESULTS ───
  if (phase === "results") {
    return (
      <TestResults
        questions={shuffledQuestions}
        answers={answers}
        onRetake={handleRetake}
        userId={userId}
        savedProfile={savedProfile}
        prepMode={prepMode}
      />
    );
  }

  // ─── REVIEW ───
  if (phase === "review") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Timer timeRemaining={timeRemaining} />
          <button
            onClick={() => setPhase("testing")}
            className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            Back to Questions
          </button>
        </div>
        <ReviewMode
          questions={shuffledQuestions}
          answers={answers}
          onJumpTo={jumpTo}
          onSubmit={handleSubmit}
        />
      </div>
    );
  }

  // ─── TESTING ───
  const currentQuestion = shuffledQuestions[currentIndex];
  const currentAnswer = answers.find(
    (a) => a.questionId === currentQuestion?.id
  );
  if (!currentQuestion) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Timer timeRemaining={timeRemaining} />
        <button
          onClick={() => setPhase("review")}
          className="rounded-lg border border-navy-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-navy-lighter hover:text-text-primary"
        >
          Review All
        </button>
      </div>

      <ProgressBar
        total={shuffledQuestions.length}
        currentIndex={currentIndex}
        answers={answers}
        onJumpTo={(i) => setCurrentIndex(i)}
      />

      <div className="rounded-2xl border border-navy-border bg-navy-light p-5 sm:p-6">
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          totalQuestions={shuffledQuestions.length}
          selectedIndex={currentAnswer?.selectedIndex ?? null}
          onSelect={handleSelect}
          onPrev={goPrev}
          onNext={goNext}
          isFirst={currentIndex === 0}
          isLast={currentIndex === shuffledQuestions.length - 1}
        />
      </div>
    </div>
  );
}
