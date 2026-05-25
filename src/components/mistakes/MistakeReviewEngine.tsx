"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { loadQuestionPool } from "@/lib/practice/sampler";
import { getDueMistakes, gradeMistakeReview } from "@/lib/mistakes/queries";
import type { PracticeQuestion } from "@/types";
import { SUBTEST_NAMES } from "@/types";

/**
 * Spaced Mistake Bank review surface.
 *
 * Retrieval practice on previously-missed questions, with immediate corrective
 * feedback (both high-utility techniques). Wrong answers re-cycle within the
 * session (relearning loop) and are rescheduled DB-side via grade_question_review.
 */

type Phase = "loading" | "empty" | "reviewing" | "feedback" | "complete";

const OPTION_LETTERS = ["A", "B", "C", "D"] as const;
const REQUEUE_GAP = 4; // re-insert a missed item this many positions later

export default function MistakeReviewEngine({
  userId,
  prioritySubtests,
}: {
  userId: string;
  /** GT Target Mode: ordered AR/WK/PC (weakest first) to front the queue. */
  prioritySubtests?: string[];
}) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [queue, setQueue] = useState<PracticeQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [againCount, setAgainCount] = useState(0);
  const gradingRef = useRef(false);

  // Load due reviews + question content on mount.
  useEffect(() => {
    let cancelled = false;
    async function init() {
      const [due, pool] = await Promise.all([
        getDueMistakes(userId, { prioritySubtests }),
        loadQuestionPool(),
      ]);
      if (cancelled) return;

      const byKey = new Map(pool.map((q) => [q.id, q]));
      // Preserve incoming order (GT priority or AFQT-first / due); drop items
      // whose content no longer exists.
      const items = due
        .map((d) => byKey.get(d.question_id))
        .filter((q): q is PracticeQuestion => Boolean(q));

      if (items.length === 0) {
        setPhase("empty");
        return;
      }
      setQueue(items);
      setPhase("reviewing");
    }
    init().catch(() => {
      if (!cancelled) setPhase("empty");
    });
    return () => {
      cancelled = true;
    };
  }, [userId, prioritySubtests]);

  const current = queue[index] ?? null;

  const handleSelect = useCallback(
    async (idx: number) => {
      if (phase !== "reviewing" || !current || gradingRef.current) return;
      gradingRef.current = true;
      setSelected(idx);
      setPhase("feedback");

      const isCorrect = idx === current.correctIndex;
      if (isCorrect) {
        setCorrectCount((c) => c + 1);
      } else {
        setAgainCount((c) => c + 1);
        // Relearning loop: re-cycle this item later in the session.
        setQueue((prev) => {
          const next = [...prev];
          const reinsertAt = Math.min(next.length, index + 1 + REQUEUE_GAP);
          next.splice(reinsertAt, 0, current);
          return next;
        });
      }

      try {
        await gradeMistakeReview(current.id, isCorrect);
      } catch {
        /* scheduling is best-effort; UI continues */
      }
      gradingRef.current = false;
    },
    [phase, current, index],
  );

  const handleContinue = useCallback(() => {
    const nextIndex = index + 1;
    setSelected(null);
    if (nextIndex >= queue.length) {
      setPhase("complete");
    } else {
      setIndex(nextIndex);
      setPhase("reviewing");
    }
  }, [index, queue.length]);

  // Keyboard: 1-4 to answer, Enter/Space to continue.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA"].includes(e.target.tagName)
      )
        return;
      if (phase === "reviewing" && ["1", "2", "3", "4"].includes(e.key)) {
        e.preventDefault();
        handleSelect(Number(e.key) - 1);
      } else if (phase === "feedback" && (e.code === "Enter" || e.code === "Space")) {
        e.preventDefault();
        handleContinue();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, handleSelect, handleContinue]);

  if (phase === "loading") {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="text-sm text-text-tertiary">Loading your review…</div>
      </div>
    );
  }

  if (phase === "empty") {
    return (
      <div className="mx-auto max-w-lg text-center space-y-4 py-12">
        <div className="text-4xl">🎯</div>
        <h2 className="font-display text-xl font-bold text-text-primary">
          No mistakes due right now
        </h2>
        <p className="text-sm text-text-secondary">
          Questions you miss are saved here and brought back right before
          you&apos;d forget them. Keep practicing and check back when items come due.
        </p>
        <Link
          href="/app/home"
          className="inline-block rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white no-underline hover:bg-accent-hover"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (phase === "complete") {
    const reviewed = correctCount + againCount;
    return (
      <div className="mx-auto max-w-lg text-center space-y-4 py-12">
        <div className="text-4xl">✅</div>
        <h2 className="font-display text-xl font-bold text-text-primary">
          Review complete
        </h2>
        <p className="text-sm text-text-secondary">
          You worked through {reviewed} retrieval{reviewed === 1 ? "" : "s"}, {" "}
          <span className="font-semibold text-text-primary">{correctCount} correct</span>
          {againCount > 0 && (
            <>
, <span className="font-semibold text-text-primary">{againCount}</span>{" "}
              to come back
            </>
          )}
          . Anything you missed will resurface on a spaced schedule until it sticks.
        </p>
        <Link
          href="/app/home"
          className="inline-block rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white no-underline hover:bg-accent-hover"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!current) return null;

  const revealed = phase === "feedback";
  const gotItRight = revealed && selected === current.correctIndex;

  return (
    <div className="space-y-6" key={`${current.id}-${index}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="rounded-md bg-accent-dim px-2.5 py-1 text-xs font-semibold tracking-wide text-accent">
          {current.subtest}, {SUBTEST_NAMES[current.subtest]}
        </span>
        <span className="font-mono text-sm tabular-nums text-text-tertiary">
          {index + 1} / {queue.length}
        </span>
      </div>

      <p className="whitespace-pre-line font-display text-lg font-semibold leading-relaxed text-text-primary sm:text-xl">
        {current.question}
      </p>

      {/* Options */}
      <fieldset className="space-y-3" aria-label="Answer choices">
        <legend className="sr-only">Select your answer</legend>
        {current.options.map((option, idx) => {
          const isSelected = selected === idx;
          const isAnswer = idx === current.correctIndex;
          let cls =
            "border-navy-border bg-navy-light hover:border-navy-lighter hover:bg-navy-lighter";
          let badge = "bg-navy-lighter text-text-tertiary";
          if (revealed) {
            if (isAnswer) {
              cls = "border-emerald-500 bg-emerald-500/10";
              badge = "bg-emerald-500 text-white";
            } else if (isSelected) {
              cls = "border-red-500 bg-red-500/10";
              badge = "bg-red-500 text-white";
            } else {
              cls = "border-navy-border bg-navy-light opacity-60";
            }
          } else if (isSelected) {
            cls = "border-accent bg-accent-dim";
            badge = "bg-accent text-white";
          }
          return (
            <button
              key={idx}
              type="button"
              disabled={revealed}
              aria-checked={isSelected}
              role="radio"
              onClick={() => handleSelect(idx)}
              className={`flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-all duration-200 sm:px-5 sm:py-4 ${cls}`}
            >
              <span
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md font-mono text-sm font-bold transition-colors ${badge}`}
              >
                {OPTION_LETTERS[idx]}
              </span>
              <span className="pt-0.5 text-sm text-text-secondary sm:text-base">
                {option}
              </span>
            </button>
          );
        })}
      </fieldset>

      {/* Feedback + why-this-works microcopy */}
      {revealed && (
        <div className="space-y-4 border-t border-navy-border pt-5">
          <p className="text-sm font-semibold">
            {gotItRight ? (
              <span className="text-emerald-400">Correct, locked in a little more.</span>
            ) : (
              <span className="text-red-400">
                Not quite, the answer is {OPTION_LETTERS[current.correctIndex]}.
              </span>
            )}
          </p>
          {current.explanation && (
            <p className="whitespace-pre-line text-sm leading-relaxed text-text-secondary">
              {current.explanation}
            </p>
          )}
          <p className="rounded-lg bg-navy-light px-4 py-3 text-xs leading-relaxed text-text-tertiary">
            <span className="font-semibold text-text-secondary">Why this works:</span>{" "}
            You missed this one before, so we bring it back right before you&apos;d
            forget. Retrieving it from memory, and being corrected when you slip, is
            the highest-evidence way to make it stick for test day.
          </p>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleContinue}
              className="rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              {index + 1 >= queue.length ? "Finish" : "Continue"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
