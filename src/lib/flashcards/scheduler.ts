import type { Quality, ReviewState } from "./types";

const MIN_EASE = 1.3;
const MAX_EASE = 2.7;
const MS_PER_MIN = 60_000;
const MS_PER_DAY = 86_400_000;

export function defaultReviewState(now: Date = new Date()): ReviewState {
  return {
    ease_factor: 2.5,
    interval_days: 0,
    repetitions: 0,
    due_at: now.toISOString(),
    last_reviewed_at: null,
    last_quality: null,
  };
}

export function scheduleReview(
  prev: ReviewState,
  quality: Quality,
  now: Date = new Date(),
): ReviewState {
  const nowIso = now.toISOString();

  if (quality < 3) {
    const dueAt = new Date(now.getTime() + 10 * MS_PER_MIN).toISOString();
    return {
      ease_factor: clampEase(prev.ease_factor - 0.2),
      interval_days: 0,
      repetitions: 0,
      due_at: dueAt,
      last_reviewed_at: nowIso,
      last_quality: quality,
    };
  }

  let intervalDays: number;
  let repetitions: number;

  if (prev.repetitions === 0) {
    intervalDays = quality === 5 ? 3 : quality === 4 ? 1 : 0;
    repetitions = 1;
  } else if (prev.repetitions === 1) {
    intervalDays = quality === 5 ? 6 : quality === 4 ? 3 : 1;
    repetitions = 2;
  } else {
    const ef = prev.ease_factor;
    const base = Math.max(prev.interval_days, 1);
    const factor = quality === 5 ? ef * 1.3 : quality === 4 ? ef : ef * 0.8;
    intervalDays = Math.round(base * factor);
    repetitions = prev.repetitions + 1;
  }

  const dueAt =
    intervalDays === 0
      ? new Date(now.getTime() + 10 * MS_PER_MIN).toISOString()
      : new Date(now.getTime() + intervalDays * MS_PER_DAY).toISOString();

  return {
    ease_factor: nextEase(prev.ease_factor, quality),
    interval_days: intervalDays,
    repetitions,
    due_at: dueAt,
    last_reviewed_at: nowIso,
    last_quality: quality,
  };
}

function nextEase(prev: number, q: Quality): number {
  const delta = 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02);
  return clampEase(prev + delta);
}

function clampEase(ef: number): number {
  return Math.min(MAX_EASE, Math.max(MIN_EASE, Number(ef.toFixed(2))));
}
