"use client";

interface StatsRowProps {
  streakCount: number;
  latestAfqt: number | null;
  previousAfqt: number | null;
  accuracy: number | null;
  totalQuestions: number;
}

export default function StatsRow({
  streakCount,
  latestAfqt,
  previousAfqt,
  accuracy,
  totalQuestions,
}: StatsRowProps) {
  const afqtTrend =
    latestAfqt != null && previousAfqt != null
      ? latestAfqt > previousAfqt
        ? "up"
        : latestAfqt < previousAfqt
          ? "down"
          : "flat"
      : null;

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
            "—"
          )}
        </div>
        <div className="mt-1 text-xs uppercase tracking-wide text-text-tertiary">
          {streakCount > 0 ? "Day streak" : "Start a streak"}
        </div>
      </div>

      {/* AFQT */}
      <div className="rounded-xl border border-navy-border bg-navy-light px-4 py-4 text-center">
        <div className="font-display text-2xl font-bold text-accent">
          {latestAfqt != null ? (
            <span>
              {latestAfqt}
              {afqtTrend === "up" && (
                <span className="ml-1 text-sm text-success">↑</span>
              )}
              {afqtTrend === "down" && (
                <span className="ml-1 text-sm text-danger">↓</span>
              )}
            </span>
          ) : (
            "—"
          )}
        </div>
        <div className="mt-1 text-xs uppercase tracking-wide text-text-tertiary">
          AFQT
        </div>
      </div>

      {/* Accuracy */}
      <div className="rounded-xl border border-navy-border bg-navy-light px-4 py-4 text-center">
        <div className="font-display text-2xl font-bold text-accent">
          {accuracy != null ? `${accuracy}%` : "—"}
        </div>
        <div className="mt-1 text-xs uppercase tracking-wide text-text-tertiary">
          {totalQuestions > 0 ? `${totalQuestions}q` : "Accuracy"}
        </div>
      </div>
    </div>
  );
}
