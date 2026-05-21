/**
 * WS3 — Band + gap-status logic (pure TS mirror of the SQL in
 * 0022_trajectory_target_jobs.sql: traj_afqt_band, traj_composite_band,
 * traj_eval_job_gap).
 *
 * The authoritative evaluation runs server-side in the RPC. This module exists
 * so client code can label bands consistently and so the math has a single
 * documented home. BAND-ONLY: no function here returns a raw point delta.
 */

import {
  AFQT_BANDS,
  COMPOSITE_BANDS,
  type AfqtBand,
  type AfqtBandKey,
  type CompositeBand,
  type Confidence,
  type GapBand,
  type RequirementStatus,
} from "./types";

// ── AFQT bands ───────────────────────────────────────────────────────

/** Band for an AFQT percentile (0-99). */
export function afqtBand(afqt: number): AfqtBand {
  for (const b of AFQT_BANDS) {
    if (afqt >= b.low && afqt <= b.high) return b;
  }
  return AFQT_BANDS[AFQT_BANDS.length - 1];
}

export function afqtBandKey(afqt: number): AfqtBandKey {
  return afqtBand(afqt).key;
}

/** Ascending index of an AFQT band (0..6), for distance comparisons. */
export function afqtBandIndex(afqt: number): number {
  return AFQT_BANDS.findIndex((b) => afqt >= b.low && afqt <= b.high);
}

// ── Composite bands (10-pt) ──────────────────────────────────────────

/** Composite band index (0..6). Mirrors traj_composite_band(). */
export function compositeBandIndex(score: number): number {
  if (score < 80) return 0;
  if (score < 90) return 1;
  if (score < 100) return 2;
  if (score < 110) return 3;
  if (score < 120) return 4;
  if (score < 130) return 5;
  return 6;
}

export function compositeBand(score: number): CompositeBand {
  return COMPOSITE_BANDS[compositeBandIndex(score)];
}

// ── Gap label (band distance) ────────────────────────────────────────

/**
 * Banded gap label from actual vs required band indexes.
 * NEVER a point delta — only at_or_above / within_one / more_than_one.
 */
export function gapBandFromIndexes(
  actualBandIdx: number,
  requiredBandIdx: number
): GapBand {
  if (actualBandIdx >= requiredBandIdx) return "at_or_above_band";
  if (requiredBandIdx - actualBandIdx === 1) return "within_one_band";
  return "more_than_one_band_below";
}

// ── Requirement status (band + CI aware) ─────────────────────────────

/**
 * AFQT requirement status from snapshot low/point/high.
 *   qualifies  = low  >= required
 *   borderline = low < required <= high
 *   needs_work = high < required
 */
export function afqtRequirementStatus(
  low: number,
  high: number,
  required: number
): RequirementStatus {
  if (low >= required) return "qualifies";
  if (high >= required) return "borderline";
  return "needs_work";
}

/** Confidence -> composite band slack (uncertainty window in band units). */
export function compositeBandSlack(confidence: Confidence): number {
  switch (confidence) {
    case "high":
      return 0;
    case "medium":
      return 1;
    default:
      return 2;
  }
}

/**
 * Composite requirement status using a confidence-driven slack window around
 * the point estimate (composites carry a point band; uncertainty is modeled
 * as +/- slack bands). Mirrors traj_eval_job_gap composite logic.
 */
export function compositeRequirementStatus(
  actualScore: number,
  required: number,
  confidence: Confidence
): RequirementStatus {
  const slack = compositeBandSlack(confidence);
  const actualBand = compositeBandIndex(actualScore);
  const requiredBand = compositeBandIndex(required);
  if (actualBand - slack >= requiredBand && actualScore >= required) {
    return "qualifies";
  }
  if (actualBand + slack >= requiredBand) return "borderline";
  return "needs_work";
}

// ── Display helpers ──────────────────────────────────────────────────

export const GAP_BAND_LABELS: Record<GapBand, string> = {
  at_or_above_band: "On target",
  within_one_band: "Within one band",
  more_than_one_band_below: "More than one band below",
};

export const STATUS_LABELS: Record<RequirementStatus, string> = {
  qualifies: "Qualifies",
  borderline: "Borderline",
  needs_work: "Needs work",
};
