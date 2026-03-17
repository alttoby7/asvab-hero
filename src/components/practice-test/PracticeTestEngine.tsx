"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { PracticeQuestion, UserAnswer, TestPhase } from "@/types";
import { selectQuestions } from "@/lib/test-scorer";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import ReviewMode from "./ReviewMode";
import TestResults from "./TestResults";
import Link from "next/link";

interface PracticeTestEngineProps {
  questions: PracticeQuestion[];
  timeLimitMinutes: number;
  testName: string;
  testDescription: string;
}

const STORAGE_KEY = "asvab-hero-practice-test";

interface SavedState {
  answers: UserAnswer[];
  currentIndex: number;
  phase: TestPhase;
  startTime: number;
  questionOrder: string[];
}

export default function PracticeTestEngine({
  questions,
  timeLimitMinutes,
  testName,
  testDescription,
}: PracticeTestEngineProps) {
  const [phase, setPhase] = useState<TestPhase>("intro");
  const [shuffledQuestions, setShuffledQuestions] = useState<PracticeQuestion[]>(
    []
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(timeLimitMinutes * 60);
  const [hasSavedState, setHasSavedState] = useState(false);
  const startTimeRef = useRef<number>(0);

  // Check for saved state on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const state: SavedState = JSON.parse(saved);
        if (
          state.phase === "testing" ||
          state.phase === "review"
        ) {
          setHasSavedState(true);
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Timer
  useEffect(() => {
    if (phase !== "testing" && phase !== "review") return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = timeLimitMinutes * 60 - elapsed;

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
  }, [phase, timeLimitMinutes]);

  // Save state on changes
  useEffect(() => {
    if (phase !== "testing" && phase !== "review") return;
    if (shuffledQuestions.length === 0) return;

    const state: SavedState = {
      answers,
      currentIndex,
      phase,
      startTime: startTimeRef.current,
      questionOrder: shuffledQuestions.map((q) => q.id),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [answers, currentIndex, phase, shuffledQuestions]);

  const startTest = useCallback(
    (resume = false) => {
      if (resume) {
        try {
          const saved: SavedState = JSON.parse(
            localStorage.getItem(STORAGE_KEY)!
          );
          // Reconstruct question order, validating all IDs still exist
          const questionMap = new Map(questions.map((q) => [q.id, q]));
          const ordered = saved.questionOrder
            .map((id) => questionMap.get(id))
            .filter(Boolean) as PracticeQuestion[];

          // If questions changed (IDs removed/added), discard saved state
          if (ordered.length !== saved.questionOrder.length) {
            startFresh();
            return;
          }

          // Clamp currentIndex to valid range
          const clampedIndex = Math.min(
            Math.max(0, saved.currentIndex),
            ordered.length - 1
          );

          // Validate answers array matches question count
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
          setCurrentIndex(clampedIndex);
          startTimeRef.current = saved.startTime;
          setPhase(saved.phase);
        } catch {
          startFresh();
        }
      } else {
        startFresh();
      }
    },
    [questions]
  );

  function startFresh() {
    const shuffled = selectQuestions(questions, 30);
    setShuffledQuestions(shuffled);
    setAnswers(
      shuffled.map((q) => ({ questionId: q.id, selectedIndex: null }))
    );
    setCurrentIndex(0);
    startTimeRef.current = Date.now();
    setTimeRemaining(timeLimitMinutes * 60);
    setPhase("testing");
    localStorage.removeItem(STORAGE_KEY);
  }

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

  const handleSubmit = () => {
    setPhase("results");
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleRetake = () => {
    setPhase("intro");
    setHasSavedState(false);
    localStorage.removeItem(STORAGE_KEY);
  };

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
            {testName}
          </h2>
          <p className="mb-6 text-text-secondary">{testDescription}</p>

          {/* Test details */}
          <div className="mb-8 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-navy px-3 py-3">
              <p className="font-mono text-xl font-bold text-text-primary">
                {questions.length}
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
              <p className="font-mono text-xl font-bold text-text-primary">9</p>
              <p className="text-xs text-text-tertiary">Subtests</p>
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
      {/* Top bar: timer + progress */}
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

      {/* Question */}
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
