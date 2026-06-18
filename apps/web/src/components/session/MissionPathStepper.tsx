"use client";

import type { SessionStation, StationKind } from "@/lib/session/types";

/**
 * The mission path: a vertical rail of stations. Past stations are checkmarked,
 * the current one is live (orange), future ones are dimmed/locked. This is the
 * "one clear path, not a menu" surface, the spine of the daily loop.
 */

const KIND_LABEL: Record<StationKind, string> = {
  warmup: "Warm-up",
  lesson: "Learn",
  drill: "Drill",
  timed: "Timed",
  debrief: "Debrief",
  diagnostic: "Diagnostic",
};

function StationIcon({ kind }: { kind: StationKind }) {
  const cls = "h-4 w-4";
  switch (kind) {
    case "warmup":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.95 6.95l-1.41-1.41M6.46 6.46L5.05 5.05m12.49 0l-1.41 1.41M6.46 17.54l-1.41 1.41" />
        </svg>
      );
    case "lesson":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5C10.5 5.5 8 5 5 5v12c3 0 5.5.5 7 1.5 1.5-1 4-1.5 7-1.5V5c-3 0-5.5.5-7 1.5zm0 0V18" />
        </svg>
      );
    case "drill":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.5 5 5.5.8-4 4 1 5.4L12 15.8 6.5 18.2l1-5.4-4-4 5.5-.8L12 3z" />
        </svg>
      );
    case "timed":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="13" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4l2.5 2.5M9 2h6" />
        </svg>
      );
    case "debrief":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 119 9c-1.6 0-3.1-.4-4.4-1.1L3 21l1.1-4.6A8.96 8.96 0 013 12z" />
        </svg>
      );
    case "diagnostic":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h4l2 5 4-12 2 7h6" />
        </svg>
      );
  }
}

export default function MissionPathStepper({
  stations,
  currentStation,
  completed,
  onJumpTo,
}: {
  stations: SessionStation[];
  currentStation: number;
  completed: Record<number, boolean>;
  /** Allow re-opening a completed station (read-only revisit). */
  onJumpTo?: (index: number) => void;
}) {
  return (
    <ol className="relative space-y-1">
      {stations.map((st, i) => {
        const isDone = !!completed[i];
        const isActive = i === currentStation && !isDone;
        const isLocked = i > currentStation && !isDone;
        const last = i === stations.length - 1;

        const ring = isActive
          ? "border-accent bg-accent text-white"
          : isDone
            ? "border-accent/60 bg-accent-dim text-accent"
            : "border-navy-border bg-navy text-text-tertiary";

        const clickable = (isDone || isActive) && !!onJumpTo;

        return (
          <li key={i} className="relative flex gap-3">
            {/* Rail + node */}
            <div className="flex flex-col items-center">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${ring} transition-colors`}
              >
                {isDone ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  <StationIcon kind={st.kind} />
                )}
              </span>
              {!last && (
                <span
                  className={`w-px flex-1 ${isDone ? "bg-accent/40" : "bg-navy-border"}`}
                  style={{ minHeight: 18 }}
                />
              )}
            </div>

            {/* Label */}
            <button
              type="button"
              disabled={!clickable}
              onClick={clickable ? () => onJumpTo?.(i) : undefined}
              className={`mb-2 flex-1 rounded-xl border px-3 py-2 text-left transition-colors ${
                isActive
                  ? "border-accent/40 bg-accent-dim/40"
                  : "border-transparent"
              } ${clickable ? "hover:bg-navy-lighter" : "cursor-default"}`}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wide ${
                    isActive ? "text-accent" : isDone ? "text-accent/70" : "text-text-tertiary"
                  }`}
                >
                  {KIND_LABEL[st.kind]}
                </span>
                {isLocked && (
                  <svg className="h-3 w-3 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 10V7a4 4 0 10-8 0v3M6 10h12v10H6z" />
                  </svg>
                )}
                <span className="ml-auto text-[11px] text-text-tertiary">
                  {st.estMinutes} min
                </span>
              </span>
              <span
                className={`mt-0.5 block text-sm font-semibold ${
                  isActive || isDone ? "text-text-primary" : "text-text-secondary"
                }`}
              >
                {st.title}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
