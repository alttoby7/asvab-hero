/**
 * GT Target Mode, the single source of truth for GT range, confidence, target,
 * gap, and the honest target-date projection. Home, plan, results, and mistakes
 * all consume this module so GT math is computed in exactly one place.
 *
 * Why a separate confidence here: the backend `overall_confidence` is AFQT-shaped
 * (it expects MK evidence), so a GT-only user, who never sees MK, can never
 * reach "high". We derive GT confidence from AR/WK/PC evidence directly.
 *
 * Honesty stance (FTC): GT is a PRACTICE PROXY. We only project a target date
 * when the user's own data supports it; otherwise we return an explicit reason
 * code and the UI shows a truthful cold-start message. We never imply an official
 * GT score or a qualification guarantee.
 */

import { getPrepMode, type TestType } from "../prep-mode";
import type { Branch } from "../types";
import type { Confidence, SubtestEstimates, TargetJobGap } from "./types";

/**
 * True only for Army/Marines AFCT (primary metric GT). AF/SF stay "General".
 * Accepts loose string|null since profile fields aren't strongly typed at reads.
 */
export function isGtPrepMode(
  testType: string | null,
  branch: string | null
): boolean {
  return getPrepMode(testType as TestType | null, branch as Branch | null)
    .primaryMetric === "GT";
}

/** GT proxy band = sum of the AR/WK/PC equated subtest estimates. */
const GT_PARTS = ["AR", "WK", "PC"] as const;

export interface GtRange {
  low: number | null;
  point: number | null;
  high: number | null;
}

/**
 * Summed AR+WK+PC range for the GT uncertainty band. Returns nulls unless all
 * three subtests are present. NOTE: this is the band only, the displayed GT
 * POINT should prefer the server's branch-correct `primary_metric.current_value`
 * (Army GT = AR+VE, Marines GT = AR+WK+PC); this sum is the honest spread to show.
 */
export function getGtRange(est: SubtestEstimates | null | undefined): GtRange {
  if (!est) return { low: null, point: null, high: null };
  const parts = GT_PARTS.map((k) => est[k]);
  if (parts.some((p) => !p)) return { low: null, point: null, high: null };
  let low = 0;
  let point = 0;
  let high = 0;
  for (const p of parts) {
    low += p!.low;
    point += p!.point;
    high += p!.high;
  }
  return { low: Math.round(low), point: Math.round(point), high: Math.round(high) };
}

/**
 * Client-derived GT confidence from AR/WK/PC evidence:
 *   low, any of AR/WK/PC has zero attempts seen, OR fewer than 2 are well-sampled
 *   medium, at least 2 of 3 well-sampled (seen >= 8)
 *   high, all 3 well-sampled (seen >= 8)
 * Thin-but-nonzero evidence stays "low" on purpose (we under-claim, never over-claim).
 */
export function getGtConfidence(
  est: SubtestEstimates | null | undefined
): Confidence {
  if (!est) return "low";
  const parts = GT_PARTS.map((k) => est[k]);
  if (parts.some((p) => !p || p!.seen === 0)) return "low";
  const wellSampled = parts.filter((p) => p!.seen >= 8).length;
  if (wellSampled === 3) return "high";
  if (wellSampled >= 2) return "medium";
  return "low";
}

/** GT requirement (min score) from the user's PRIMARY goal job, if any. */
export function getPrimaryJobGtRequirement(
  jobs: TargetJobGap[] | null | undefined
): { score: number | null; jobCode: string | null } {
  if (!jobs || jobs.length === 0) return { score: null, jobCode: null };
  const primary = jobs.find((j) => j.is_primary) ?? jobs[0];
  if (!primary) return { score: null, jobCode: null };
  const gt = primary.checks.find((c) => c.composite_code === "GT");
  if (!gt || typeof gt.required_score !== "number") {
    return { score: null, jobCode: null };
  }
  return { score: gt.required_score, jobCode: primary.code };
}

export type GtTargetSource = "profile" | "job" | "max" | null;

export interface EffectiveGtTarget {
  target: number | null;
  source: GtTargetSource;
  jobCode: string | null;
}

/**
 * The GT target we optimize toward: the higher of the user's manual target and
 * their primary goal job's GT minimum. If both exist and the job wins (or ties),
 * we still credit the job code so the UI can say "based on your goal job".
 */
export function getEffectiveGtTarget(
  profileTargetGt: number | null | undefined,
  jobs: TargetJobGap[] | null | undefined
): EffectiveGtTarget {
  const job = getPrimaryJobGtRequirement(jobs);
  const manual = typeof profileTargetGt === "number" ? profileTargetGt : null;

  if (manual == null && job.score == null) {
    return { target: null, source: null, jobCode: null };
  }
  if (manual != null && job.score == null) {
    return { target: manual, source: "profile", jobCode: null };
  }
  if (manual == null && job.score != null) {
    return { target: job.score, source: "job", jobCode: job.jobCode };
  }
  // both present
  return {
    target: Math.max(manual!, job.score!),
    source: "max",
    jobCode: job.jobCode,
  };
}

/** GT points remaining to target. Negative => at/above target. Null if unknown. */
export function getGtGap(
  point: number | null,
  target: number | null
): number | null {
  if (point == null || target == null) return null;
  return target - point;
}

// ── Honest target-date projection ────────────────────────────────────

export interface GtAttemptForProjection {
  primary_metric_code: string | null;
  primary_metric_estimate: number | null;
  completed_at: string;
}

export type GtProjectionReason =
  | "no_target"
  | "no_gt_attempts"
  | "needs_more_attempts"
  | "needs_more_study_days"
  | "low_confidence"
  | "no_positive_slope"
  | "pace_too_uncertain";

export type GtProjection =
  | {
      status: "available";
      projectedDate: string; // ISO yyyy-mm-dd
      calendarDaysNeeded: number;
      studyDaysNeeded: number;
      studyDaysObserved: number;
      attemptsUsed: number;
    }
  | { status: "at_target" }
  | { status: "unavailable"; reason: GtProjectionReason };

export interface GtProjectionInput {
  attempts: GtAttemptForProjection[];
  /** study_date strings (yyyy-mm-dd) from the study_days dose table. */
  studyDays: string[];
  targetGt: number | null;
  studyDaysPerWeek: number | null;
  gtConfidence: Confidence;
  /** Override "today" for testing; defaults to now. */
  now?: Date;
}

const MIN_GT_ATTEMPTS = 3;
const PROJECTION_WINDOW = 5;
const MIN_STUDY_DAYS = 4;
const MIN_DELTA = 3;
const MAX_PROJECTION_DAYS = 180;
const DEFAULT_STUDY_DAYS_PER_WEEK = 3;

function dateOnly(ts: string): string {
  return ts.slice(0, 10);
}

/**
 * Project a target date from the user's OWN recent GT trajectory, gated by strict
 * evidence guardrails. Returns an explicit reason when we won't (and shouldn't)
 * guess. Pure, no I/O.
 */
export function getGtProjection(input: GtProjectionInput): GtProjection {
  const { attempts, studyDays, targetGt, studyDaysPerWeek, gtConfidence } = input;

  if (targetGt == null) return { status: "unavailable", reason: "no_target" };

  const gt = attempts.filter(
    (a) => a.primary_metric_code === "GT" && a.primary_metric_estimate != null
  );
  if (gt.length === 0) {
    return { status: "unavailable", reason: "no_gt_attempts" };
  }
  if (gt.length < MIN_GT_ATTEMPTS) {
    return { status: "unavailable", reason: "needs_more_attempts" };
  }

  // ascending by completion, then take the most recent window
  const sorted = [...gt].sort((a, b) =>
    a.completed_at < b.completed_at ? -1 : a.completed_at > b.completed_at ? 1 : 0
  );
  const window = sorted.slice(-PROJECTION_WINDOW);
  const earliest = window[0];
  const latest = window[window.length - 1];
  const latestEstimate = latest.primary_metric_estimate as number;
  const earliestEstimate = earliest.primary_metric_estimate as number;

  // Already at/above target on the practice scale, no projection needed.
  if (targetGt <= latestEstimate) return { status: "at_target" };

  if (gtConfidence === "low") {
    return { status: "unavailable", reason: "low_confidence" };
  }

  // Study days observed within the attempt window (inclusive).
  const lo = dateOnly(earliest.completed_at);
  const hi = dateOnly(latest.completed_at);
  const studyDaysObserved = studyDays.filter((d) => {
    const dd = dateOnly(d);
    return dd >= lo && dd <= hi;
  }).length;
  if (studyDaysObserved < MIN_STUDY_DAYS) {
    return { status: "unavailable", reason: "needs_more_study_days" };
  }

  const delta = latestEstimate - earliestEstimate;
  if (delta < MIN_DELTA) {
    return { status: "unavailable", reason: "no_positive_slope" };
  }

  const pointsPerStudyDay = delta / studyDaysObserved;
  const remaining = targetGt - latestEstimate; // > 0 (not at target)
  const studyDaysNeeded = Math.ceil(remaining / pointsPerStudyDay);

  const sdpw =
    studyDaysPerWeek && studyDaysPerWeek > 0
      ? studyDaysPerWeek
      : DEFAULT_STUDY_DAYS_PER_WEEK;
  const calendarDaysNeeded = Math.ceil((studyDaysNeeded * 7) / sdpw);

  if (calendarDaysNeeded > MAX_PROJECTION_DAYS) {
    return { status: "unavailable", reason: "pace_too_uncertain" };
  }

  const base = input.now ? new Date(input.now) : new Date();
  base.setDate(base.getDate() + calendarDaysNeeded);
  const projectedDate = base.toISOString().slice(0, 10);

  return {
    status: "available",
    projectedDate,
    calendarDaysNeeded,
    studyDaysNeeded,
    studyDaysObserved,
    attemptsUsed: window.length,
  };
}

/** Human copy for each cold-start / unavailable projection reason. */
export const GT_PROJECTION_REASON_COPY: Record<GtProjectionReason, string> = {
  no_target: "Set a GT target to unlock a target-date projection.",
  no_gt_attempts: "Finish your first GT block to establish a starting range.",
  needs_more_attempts:
    "Complete 2 more GT blocks on separate study days before we’ll project a target date.",
  needs_more_study_days:
    "We need at least 4 GT study days in the recent window before we’ll date your target honestly.",
  low_confidence:
    "Your GT range is still too rough to project. Keep building AR, WK, and PC evidence.",
  no_positive_slope:
    "Your recent GT blocks haven’t produced a stable upward slope yet. We won’t guess a date.",
  pace_too_uncertain:
    "Your current pace is too uncertain to date honestly. Add more GT study days, then check again.",
};
