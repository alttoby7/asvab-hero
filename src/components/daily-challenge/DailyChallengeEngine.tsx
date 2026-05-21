"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { loadQuestionPool } from "@/lib/practice/sampler";
import { scoreBySubtest, scoreByTopic, estimateAFQT, totalCorrect } from "@/lib/test-scorer";
import type { PracticeQuestion, UserAnswer, TopicStats, AttemptPayload } from "@/types";
import QuestionCard from "@/components/practice-test/QuestionCard";
import ProgressBar from "@/components/practice-test/ProgressBar";
import Timer from "@/components/practice-test/Timer";
import DailyChallengeResults from "./DailyChallengeResults";

const DAILY_QUESTION_COUNT = 10;
const DAILY_TIME_SECONDS = 12 * 60;

type Phase = "loading" | "error" | "testing" | "results";

interface ChallengeRow {
  id: string;
  status: string;
  question_ids: string[];
  correct_count: number | null;
  streak_after_completion: number | null;
}

function generateClientAttemptId(): string {
  return `daily_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function isYesterday(dateStr: string | null): boolean {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    d.getFullYear() === yesterday.getFullYear() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getDate() === yesterday.getDate()
  );
}

function isToday(dateStr: string | null): boolean {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function selectDailyQuestions(
  pool: PracticeQuestion[],
  topicStats: TopicStats[]
): { questions: PracticeQuestion[]; topicMix: Record<string, number>; source: string } {
  const weakTopics = [...topicStats]
    .filter((ts) => ts.priority > 0 && ts.seen >= 3)
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3);

  const selected: PracticeQuestion[] = [];
  const usedIds = new Set<string>();
  const topicMix: Record<string, number> = {};
  let source = "fallback";

  if (weakTopics.length > 0) {
    source = "personalized";
    for (const weak of weakTopics) {
      const candidates = pool.filter(
        (q) => q.topicId === weak.topic_id && !usedIds.has(q.id)
      );
      if (candidates.length > 0) {
        const pick = shuffle(candidates)[0];
        selected.push(pick);
        usedIds.add(pick.id);
        topicMix[weak.topic_id] = (topicMix[weak.topic_id] ?? 0) + 1;
      }
    }
  }

  const remaining = DAILY_QUESTION_COUNT - selected.length;
  if (remaining > 0) {
    const subtestCounts = new Map<string, number>();
    for (const q of selected) {
      subtestCounts.set(q.subtest, (subtestCounts.get(q.subtest) ?? 0) + 1);
    }

    const available = shuffle(pool.filter((q) => !usedIds.has(q.id)));
    for (const q of available) {
      if (selected.length >= DAILY_QUESTION_COUNT) break;
      const stCount = subtestCounts.get(q.subtest) ?? 0;
      if (stCount >= 3) continue;
      selected.push(q);
      usedIds.add(q.id);
      subtestCounts.set(q.subtest, stCount + 1);
      topicMix[q.topicId ?? q.subtest] = (topicMix[q.topicId ?? q.subtest] ?? 0) + 1;
    }
  }

  return { questions: shuffle(selected), topicMix, source };
}

interface DailyChallengeEngineProps {
  userId: string;
  streakCount: number;
  lastChallengeCompletedOn: string | null;
}

export default function DailyChallengeEngine({
  userId,
  streakCount,
  lastChallengeCompletedOn,
}: DailyChallengeEngineProps) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(DAILY_TIME_SECONDS);
  const [newStreak, setNewStreak] = useState<number>(streakCount);

  const challengeIdRef = useRef<string | null>(null);
  const topicMixRef = useRef<Record<string, number>>({});
  const sourceRef = useRef<string>("fallback");
  const startTimeRef = useRef(Date.now());
  const didSaveRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sb = getSupabaseBrowserClient() as any;
      const today = new Date().toISOString().split("T")[0];

      const { data: existing } = await sb
        .from("daily_challenges")
        .select("id,status,question_ids,correct_count,streak_after_completion")
        .eq("user_id", userId)
        .eq("challenge_date", today)
        .maybeSingle();

      if (cancelled) return;

      if (existing?.status === "completed") {
        setPhase("error");
        setErrorMsg("already_completed");
        return;
      }

      const pool = await loadQuestionPool();
      if (cancelled) return;

      if (pool.length < DAILY_QUESTION_COUNT) {
        setPhase("error");
        setErrorMsg("not_enough_questions");
        return;
      }

      let topicStats: TopicStats[] = [];
      try {
        const { data } = await sb
          .from("topic_stats")
          .select("topic_id,seen,correct,posterior,confidence,priority,status,last_seen_at,updated_at")
          .eq("user_id", userId);
        if (data) topicStats = data as TopicStats[];
      } catch { /* proceed without personalization */ }

      if (cancelled) return;

      let dailyQuestions: PracticeQuestion[];
      let topicMix: Record<string, number>;
      let source: string;

      if (existing && existing.question_ids?.length > 0) {
        const idSet = new Set(existing.question_ids as string[]);
        const matched = pool.filter((q) => idSet.has(q.id));
        if (matched.length === existing.question_ids.length) {
          dailyQuestions = matched;
          topicMix = {};
          source = "resumed";
        } else {
          const result = selectDailyQuestions(pool, topicStats);
          dailyQuestions = result.questions;
          topicMix = result.topicMix;
          source = result.source;
        }
        challengeIdRef.current = existing.id;
      } else {
        const result = selectDailyQuestions(pool, topicStats);
        dailyQuestions = result.questions;
        topicMix = result.topicMix;
        source = result.source;

        const questionIds = dailyQuestions.map((q) => q.id);

        if (existing) {
          await sb
            .from("daily_challenges")
            .update({ question_ids: questionIds, topic_mix: topicMix, source })
            .eq("id", existing.id);
          challengeIdRef.current = existing.id;
        } else {
          const { data: inserted } = await sb
            .from("daily_challenges")
            .insert({
              user_id: userId,
              challenge_date: today,
              status: "ready",
              source,
              question_ids: questionIds,
              topic_mix: topicMix,
            })
            .select("id")
            .single();
          challengeIdRef.current = inserted?.id ?? null;
        }
      }

      if (cancelled) return;

      topicMixRef.current = topicMix;
      sourceRef.current = source;
      setQuestions(dailyQuestions);
      setAnswers(dailyQuestions.map((q) => ({ questionId: q.id, selectedIndex: null })));
      startTimeRef.current = Date.now();
      setPhase("testing");
    }

    init().catch(() => {
      if (!cancelled) {
        setPhase("error");
        setErrorMsg("load_failed");
      }
    });

    return () => { cancelled = true; };
  }, [userId]);

  useEffect(() => {
    if (phase !== "testing") return;
    const id = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) {
          clearInterval(id);
          setPhase("results");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  const handleComplete = useCallback(async () => {
    if (didSaveRef.current) return;
    didSaveRef.current = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const subtestResults = scoreBySubtest(questions, answers);
    const topicResults = scoreByTopic(questions, answers);
    const correct = totalCorrect(questions, answers);
    const afqt = estimateAFQT(subtestResults).score;
    const completedAt = new Date().toISOString();
    const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);

    let updatedStreak = streakCount;
    if (isToday(lastChallengeCompletedOn)) {
      updatedStreak = streakCount;
    } else if (isYesterday(lastChallengeCompletedOn)) {
      updatedStreak = streakCount + 1;
    } else {
      updatedStreak = 1;
    }
    setNewStreak(updatedStreak);

    const answerMap = new Map(answers.map((a) => [a.questionId, a.selectedIndex]));
    const questionResults = questions.map((q) => {
      const sel = answerMap.get(q.id) ?? null;
      return {
        question_id: q.id,
        selected: sel,
        correct: q.correctIndex,
        topic_id: q.topicId ?? `${q.subtest.toLowerCase()}.unknown`,
        is_correct: sel === q.correctIndex,
      };
    });

    if (challengeIdRef.current) {
      await sb
        .from("daily_challenges")
        .update({
          status: "completed",
          correct_count: correct,
          question_results: questionResults,
          completed_at: completedAt,
          streak_after_completion: updatedStreak,
        })
        .eq("id", challengeIdRef.current);
    }

    await sb
      .from("profiles")
      .update({
        streak_count: updatedStreak,
        last_challenge_completed_on: new Date().toISOString().split("T")[0],
      })
      .eq("user_id", userId);

    const resultsBySubtest: Record<string, { seen: number; correct: number }> = {};
    for (const r of subtestResults) {
      if (r.total > 0) resultsBySubtest[r.subtest] = { seen: r.total, correct: r.correct };
    }
    const resultsByTopic: Record<string, { seen: number; correct: number }> = {};
    for (const r of topicResults) {
      resultsByTopic[r.topic_id] = { seen: r.seen, correct: r.correct };
    }

    const attemptPayload: AttemptPayload = {
      client_attempt_id: generateClientAttemptId(),
      variant_code: "daily_challenge",
      source: "daily_challenge",
      subtest: null,
      topic_id: null,
      started_at: new Date(startTimeRef.current).toISOString(),
      completed_at: completedAt,
      duration_seconds: durationSeconds,
      question_count: questions.length,
      correct_count: correct,
      afqt_estimate: afqt,
      results_by_subtest: resultsBySubtest,
      results_by_topic: resultsByTopic,
      question_results: questionResults,
    };

    try {
      // The ingest_attempt_mistakes trigger on `attempts` (migration 0017)
      // recomputes topic_stats AND banks missed questions DB-side on insert,
      // so no client-side recompute_topic_stats call is needed here.
      await sb
        .from("attempts")
        .insert({ user_id: userId, ...attemptPayload, synced_from_local: false });
    } catch { /* non-blocking */ }
  }, [questions, answers, userId, streakCount, lastChallengeCompletedOn]);

  useEffect(() => {
    if (phase === "results") handleComplete();
  }, [phase, handleComplete]);

  if (phase === "loading") {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="text-sm text-text-tertiary">Preparing your daily challenge…</div>
      </div>
    );
  }

  if (phase === "error") {
    if (errorMsg === "already_completed") {
      return (
        <div className="mx-auto max-w-lg text-center space-y-4 py-12">
          <div className="text-4xl">✅</div>
          <h2 className="font-display text-xl font-bold text-text-primary">
            Already done for today
          </h2>
          <p className="text-sm text-text-secondary">
            You've completed today's challenge. Come back tomorrow to keep your streak going.
          </p>
          <a
            href="/app/home"
            className="inline-block rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white no-underline hover:bg-accent-hover"
          >
            Back to Dashboard
          </a>
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-lg text-center space-y-4 py-12">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Something went wrong
        </h2>
        <p className="text-sm text-text-secondary">
          We couldn't load today's challenge. Please try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover"
        >
          Retry
        </button>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <DailyChallengeResults
        questions={questions}
        answers={answers}
        newStreak={newStreak}
      />
    );
  }

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentIndex]?.selectedIndex ?? null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-lg font-bold text-text-primary sm:text-xl">
          Daily Challenge
        </h1>
        <Timer timeRemaining={timeRemaining} />
      </div>

      <ProgressBar
        total={questions.length}
        currentIndex={currentIndex}
        answers={answers}
        onJumpTo={setCurrentIndex}
      />

      <QuestionCard
        question={currentQuestion}
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
        selectedIndex={currentAnswer}
        onSelect={(idx) => {
          setAnswers((prev) => {
            const next = [...prev];
            next[currentIndex] = { questionId: currentQuestion.id, selectedIndex: idx };
            return next;
          });
        }}
        onPrev={() => setCurrentIndex((i) => Math.max(0, i - 1))}
        onNext={() => {
          if (currentIndex === questions.length - 1) {
            setPhase("results");
          } else {
            setCurrentIndex((i) => i + 1);
          }
        }}
        isFirst={currentIndex === 0}
        isLast={currentIndex === questions.length - 1}
      />
    </div>
  );
}
