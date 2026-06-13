"use client";

import { AFQT_BANDS, type AfqtBandKey, type Confidence } from "@/lib/trajectory/types";

/**
 * The AFQT band ladder: a motivational "climb" toward the bands that open up
 * more jobs, WITHOUT false precision. We never show a predicted point score
 * (reliability is low); we show which band you're in, where you're projected to
 * land, and how sure we are (confidence "fog"). Rungs ascend, higher = better.
 */

const CONFIDENCE_COPY: Record<Confidence, string> = {
  low: "Rough estimate, more practice sharpens it",
  medium: "Getting clearer with every session",
  high: "A confident read on where you stand",
};

function bandIndex(key: AfqtBandKey | null | undefined): number {
  if (!key) return -1;
  return AFQT_BANDS.findIndex((b) => b.key === key);
}

export default function BandLadder({
  currentBandKey,
  projectedBandKey,
  confidence,
  primaryJobTitle,
  primaryJobQualifies,
}: {
  currentBandKey: AfqtBandKey | null;
  projectedBandKey: AfqtBandKey | null;
  confidence: Confidence;
  /** Optional caption anchoring the climb to a real goal. */
  primaryJobTitle?: string | null;
  primaryJobQualifies?: boolean;
}) {
  const curIdx = bandIndex(currentBandKey);
  const projIdx = bandIndex(projectedBandKey);
  const climbing = projIdx > curIdx && projIdx >= 0;

  // Render top (best band) to bottom so the eye climbs upward.
  const rungs = [...AFQT_BANDS].slice().reverse();

  return (
    <div className="rounded-2xl border border-navy-border bg-navy-light p-5 sm:p-6">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2 className="font-display text-lg font-bold text-text-primary">
          Your AFQT climb
        </h2>
        <span className="text-xs text-text-tertiary">{CONFIDENCE_COPY[confidence]}</span>
      </div>

      <div className="space-y-1.5">
        {rungs.map((b) => {
          const idx = AFQT_BANDS.findIndex((x) => x.key === b.key);
          const isCurrent = idx === curIdx;
          const isProjected = climbing && idx === projIdx;
          const atOrBelowCurrent = idx <= curIdx;

          return (
            <div key={b.key} className="flex items-center gap-3">
              <span
                className={`w-14 shrink-0 text-right font-mono text-xs ${
                  isCurrent ? "text-accent font-bold" : "text-text-tertiary"
                }`}
              >
                {b.label}
              </span>
              <div className="relative h-7 flex-1 overflow-hidden rounded-lg border border-navy-border bg-navy">
                {/* Filled climb up to the current band. */}
                {atOrBelowCurrent && (
                  <div
                    className={`absolute inset-y-0 left-0 right-0 ${
                      isCurrent ? "bg-accent" : "bg-accent/25"
                    }`}
                  />
                )}
                {/* Projected band: an outlined "headed here" marker (fog = confidence). */}
                {isProjected && (
                  <div
                    className="absolute inset-0 rounded-lg border-2 border-dashed border-accent"
                    style={{ opacity: confidence === "high" ? 0.95 : confidence === "medium" ? 0.7 : 0.45 }}
                  />
                )}
                <div className="relative flex h-full items-center px-3">
                  {isCurrent && (
                    <span className="text-[11px] font-bold uppercase tracking-wide text-white">
                      You are here
                    </span>
                  )}
                  {isProjected && (
                    <span className="text-[11px] font-bold uppercase tracking-wide text-accent">
                      Projected
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {primaryJobTitle && (
        <p className="mt-4 text-sm text-text-secondary">
          {primaryJobQualifies
            ? `You're in range for ${primaryJobTitle}. Keep climbing to widen your options.`
            : `Climbing toward the band that opens up ${primaryJobTitle}.`}
        </p>
      )}
      {curIdx < 0 && (
        <p className="mt-4 text-sm text-text-tertiary">
          Take a diagnostic to place yourself on the ladder.
        </p>
      )}
    </div>
  );
}
