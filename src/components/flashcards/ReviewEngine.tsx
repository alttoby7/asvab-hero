"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { defaultReviewState, scheduleReview } from "@/lib/flashcards/scheduler";
import { submitReview } from "@/lib/flashcards/queries";
import {
  gradeToQuality,
  type CardWithReview,
  type Deck,
  type GradeButton,
} from "@/lib/flashcards/types";
import FlipCard from "./FlipCard";
import GradeButtons from "./GradeButtons";
import SessionComplete from "./SessionComplete";

interface Props {
  deck: Deck;
  initialCards: CardWithReview[];
  userId: string;
}

type Phase = "front" | "back" | "complete";

export default function ReviewEngine({ deck, initialCards, userId }: Props) {
  const [queue, setQueue] = useState<CardWithReview[]>(initialCards);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("front");
  const [stats, setStats] = useState<Record<GradeButton, number>>({
    again: 0,
    hard: 0,
    good: 0,
    easy: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);

  const total = useMemo(
    () => initialCards.length + stats.again, // again cards re-enter the queue
    [initialCards.length, stats.again],
  );

  const current = queue[index] ?? null;
  const remaining = queue.length - index;

  const handleReveal = useCallback(() => {
    if (phase === "front") setPhase("back");
  }, [phase]);

  const handleGrade = useCallback(
    async (grade: GradeButton) => {
      if (phase !== "back" || !current || submittingRef.current) return;
      submittingRef.current = true;
      setSubmitting(true);
      const quality = gradeToQuality(grade);
      const prev = current.review ?? defaultReviewState();
      const next = scheduleReview(prev, quality);

      try {
        await submitReview({ userId, cardId: current.id, next });
      } catch (err) {
        console.error("Failed to submit review", err);
      }

      setStats((s) => ({ ...s, [grade]: s[grade] + 1 }));

      let newQueue = queue;
      if (grade === "again") {
        const requeued = { ...current, review: next };
        const reinsertAt = Math.min(queue.length, index + 4);
        newQueue = [...queue.slice(0, index + 1), ...queue.slice(index + 1)];
        newQueue.splice(reinsertAt, 0, requeued);
        setQueue(newQueue);
      }

      const nextIndex = index + 1;
      if (nextIndex >= newQueue.length) {
        setPhase("complete");
      } else {
        setIndex(nextIndex);
        setPhase("front");
      }
      submittingRef.current = false;
      setSubmitting(false);
    },
    [phase, current, queue, index, userId],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLElement && ["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (phase === "front" && (e.code === "Space" || e.code === "Enter")) {
        e.preventDefault();
        handleReveal();
        return;
      }
      if (phase === "back") {
        if (e.code === "Digit1" || e.key === "1") {
          e.preventDefault();
          handleGrade("again");
        } else if (e.code === "Digit2" || e.key === "2") {
          e.preventDefault();
          handleGrade("hard");
        } else if (e.code === "Digit3" || e.key === "3" || e.code === "Space") {
          e.preventDefault();
          handleGrade("good");
        } else if (e.code === "Digit4" || e.key === "4") {
          e.preventDefault();
          handleGrade("easy");
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, handleReveal, handleGrade]);

  if (phase === "complete") {
    return <SessionComplete deck={deck} stats={stats} total={total} />;
  }

  if (!current) {
    return (
      <div className="rounded-3xl border border-navy-border bg-navy-light p-8 text-center">
        <p className="text-text-secondary">No cards available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-sm">
        <Link
          href="/flashcards"
          className="text-text-tertiary no-underline transition-colors hover:text-text-secondary"
        >
          ← {deck.title.replace(/^.+? — /, "")}
        </Link>
        <span className="text-text-tertiary">
          {index + 1} / {queue.length}
        </span>
      </div>

      <FlipCard
        front={current.front}
        back={current.back}
        explanation={current.explanation}
        revealed={phase === "back"}
        onClick={handleReveal}
      />

      {phase === "front" ? (
        <button
          type="button"
          onClick={handleReveal}
          className="w-full rounded-xl border border-navy-border bg-navy-light py-3.5 text-sm font-semibold text-text-secondary transition-colors hover:border-accent hover:text-text-primary"
        >
          Tap or press Space to reveal
        </button>
      ) : (
        <GradeButtons onGrade={handleGrade} disabled={submitting} />
      )}

      <p className="text-center text-xs text-text-tertiary">
        Difficulty {current.difficulty}/5
      </p>
    </div>
  );
}
