"use client";

/**
 * Momentum tiles, habit + output only. AFQT lives in the trajectory hero card
 * (one authoritative score), so it is deliberately NOT shown here anymore.
 */

interface StatsRowProps {
  streakCount: number;
  totalQuestions: number;
  accuracy: number | null;
}

export default function StatsRow({
  streakCount,
  totalQuestions,
  accuracy,
}: StatsRowProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {/* Streak */}
      <div className="rounded-xl border border-navy-border bg-navy-light px-4 py-4 text-center">
        <div className="font-display text-2xl font-bold text-accent">
          {streakCount > 0 ? (
            <span>
              <span className="mr-1" role="img" aria-label="streak">
                🔥
              </span>
              {streakCount}
            </span>
          ) : (
            ", "
          )}
        </div>
        <div className="mt-1 text-xs uppercase tracking-wide text-text-tertiary">
          {streakCount > 0 ? "Day streak" : "Start a streak"}
        </div>
      </div>

      {/* Questions answered (volume) */}
      <div className="rounded-xl border border-navy-border bg-navy-light px-4 py-4 text-center">
        <div className="font-display text-2xl font-bold text-accent">
          {totalQuestions > 0 ? totalQuestions.toLocaleString() : ", "}
        </div>
        <div className="mt-1 text-xs uppercase tracking-wide text-text-tertiary">
          Questions answered
        </div>
      </div>

      {/* Accuracy (quality) */}
      <div className="rounded-xl border border-navy-border bg-navy-light px-4 py-4 text-center">
        <div className="font-display text-2xl font-bold text-accent">
          {accuracy != null ? `${accuracy}%` : ", "}
        </div>
        <div className="mt-1 text-xs uppercase tracking-wide text-text-tertiary">
          Accuracy
        </div>
      </div>
    </div>
  );
}
