"use client";

/**
 * Score progress — the user-facing view of the unified timeline.
 * "Started 48 → practicing 61 → projected 67", with official results as the
 * ground-truth anchor when present. Renders nothing until there's a baseline.
 */

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { getScoreTimeline, type ScoreTimeline } from "@/lib/score-timeline/queries";

function Stat({
  value,
  label,
  tone = "default",
}: {
  value: number | null;
  label: string;
  tone?: "default" | "official" | "projected";
}) {
  if (value == null) return null;
  const color =
    tone === "official"
      ? "text-success"
      : tone === "projected"
        ? "text-accent"
        : "text-text-primary";
  return (
    <div className="flex flex-col items-center">
      <span className={`font-display text-2xl font-bold ${color}`}>{value}</span>
      <span className="mt-0.5 text-[11px] uppercase tracking-wide text-text-tertiary">
        {label}
      </span>
    </div>
  );
}

export default function ScoreProgressCard({
  userId,
  projectedAfqt = null,
  refreshKey = 0,
}: {
  userId: string;
  projectedAfqt?: number | null;
  refreshKey?: number;
}) {
  const [timeline, setTimeline] = useState<ScoreTimeline | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    let cancelled = false;
    getScoreTimeline(sb, userId, projectedAfqt)
      .then((t) => {
        if (!cancelled) setTimeline(t);
      })
      .catch(() => {
        if (!cancelled) setTimeline(null);
      });
    return () => {
      cancelled = true;
    };
  }, [userId, projectedAfqt, refreshKey]);

  if (!timeline || timeline.baselineAfqt == null) return null;

  const { baselineAfqt, latestPracticeAfqt, latestOfficialAfqt, officialCount } =
    timeline;

  const delta =
    latestOfficialAfqt != null && baselineAfqt != null
      ? latestOfficialAfqt - baselineAfqt
      : latestPracticeAfqt != null && baselineAfqt != null
        ? latestPracticeAfqt - baselineAfqt
        : null;

  return (
    <div className="rounded-2xl border border-navy-border bg-navy-light p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-text-primary">
          Your AFQT progress
        </h2>
        {delta != null && delta !== 0 && (
          <span
            className={`text-sm font-semibold ${delta > 0 ? "text-success" : "text-text-tertiary"}`}
          >
            {delta > 0 ? `+${delta}` : delta} pts
          </span>
        )}
      </div>

      <div className="flex items-center justify-around gap-2">
        <Stat value={baselineAfqt} label="Started" />
        {latestPracticeAfqt != null && (
          <>
            <span className="text-text-tertiary">→</span>
            <Stat value={latestPracticeAfqt} label="Practicing" />
          </>
        )}
        {latestOfficialAfqt != null && (
          <>
            <span className="text-text-tertiary">→</span>
            <Stat value={latestOfficialAfqt} label="Official" tone="official" />
          </>
        )}
        {projectedAfqt != null && (
          <>
            <span className="text-text-tertiary">→</span>
            <Stat value={projectedAfqt} label="Projected" tone="projected" />
          </>
        )}
      </div>

      <p className="mt-4 text-xs text-text-tertiary">
        {officialCount > 0
          ? `Includes ${officialCount} official result${officialCount === 1 ? "" : "s"}. Practice and projected figures are estimates.`
          : "Practice and projected figures are estimates. Log an official result to anchor your progress."}
      </p>
    </div>
  );
}
