/**
 * WS3, Trajectory / multi-target-job backend contracts.
 *
 * BAND-ONLY by design: this module NEVER exposes raw point deltas to the UI.
 * Reliability is low (~25 attempts in prod; a single diagnostic is ~±10 AFQT
 * pts), so all gap information is expressed as bands + status + confidence.
 *
 * These types mirror the JSON shape returned by `rpc_get_home_trajectory()`
 * (defined in 0022_trajectory_target_jobs.sql). WS4 renders against them.
 */

import type { Branch } from "../types";

// ── Bands ────────────────────────────────────────────────────────────

/** AFQT display bands: 0-9,10-20,21-30,31-49,50-64,65-92,93-99. */
export type AfqtBandKey =
  | "afqt_0_9"
  | "afqt_10_20"
  | "afqt_21_30"
  | "afqt_31_49"
  | "afqt_50_64"
  | "afqt_65_92"
  | "afqt_93_99";

export interface AfqtBand {
  key: AfqtBandKey;
  label: string; // e.g. "31-49"
  /** Inclusive lower/upper bounds on the 0-99 percentile scale. */
  low: number;
  high: number;
}

/** AFQT bands in ascending order. */
export const AFQT_BANDS: readonly AfqtBand[] = [
  { key: "afqt_0_9", label: "0-9", low: 0, high: 9 },
  { key: "afqt_10_20", label: "10-20", low: 10, high: 20 },
  { key: "afqt_21_30", label: "21-30", low: 21, high: 30 },
  { key: "afqt_31_49", label: "31-49", low: 31, high: 49 },
  { key: "afqt_50_64", label: "50-64", low: 50, high: 64 },
  { key: "afqt_65_92", label: "65-92", low: 65, high: 92 },
  { key: "afqt_93_99", label: "93-99", low: 93, high: 99 },
] as const;

/**
 * Composite score bands (10-pt): <80,80-89,90-99,100-109,110-119,120-129,130+.
 * Index 0..6 matches `traj_composite_band()` in the migration.
 */
export interface CompositeBand {
  index: number;
  label: string;
}

export const COMPOSITE_BANDS: readonly CompositeBand[] = [
  { index: 0, label: "<80" },
  { index: 1, label: "80-89" },
  { index: 2, label: "90-99" },
  { index: 3, label: "100-109" },
  { index: 4, label: "110-119" },
  { index: 5, label: "120-129" },
  { index: 6, label: "130+" },
] as const;

// ── Status + gap labels ──────────────────────────────────────────────

export type Confidence = "low" | "medium" | "high";

/** Per-requirement status. */
export type RequirementStatus = "qualifies" | "borderline" | "needs_work";

/** Overall per-job status (adds 'unsupported' for beta/unsupported jobs). */
export type JobOverallStatus =
  | "qualifies"
  | "borderline"
  | "needs_work"
  | "unsupported";

/** Banded gap label, the ONLY gap signal exposed to the UI. */
export type GapBand =
  | "at_or_above_band"
  | "within_one_band"
  | "more_than_one_band_below";

export type SupportStatus = "supported" | "beta" | "unsupported";

export type SnapshotKind = "current_standing" | "projected_test_day";

// ── Snapshot ─────────────────────────────────────────────────────────

/** Per-subtest equated (20-62) estimate stored on the snapshot. */
export interface SubtestEstimate {
  low: number;
  point: number;
  high: number;
  seen: number;
  correct: number;
}

/** AFQT-relevant subtests carried in subtest_estimates. */
export type AfqtSubtest = "AR" | "MK" | "WK" | "PC";

export type SubtestEstimates = Partial<Record<AfqtSubtest, SubtestEstimate>>;

/**
 * The current-standing portion of the home payload. Note: raw AFQT
 * point/low/high are intentionally NOT in the contract, only bands +
 * confidence are surfaced (raw values are stored server-side for debugging).
 */
export interface CurrentStanding {
  generated_at: string;
  attempt_count: number;
  overall_confidence: Confidence;
  afqt_band_key: AfqtBandKey | null;
  afqt_band_label: string | null;
  subtest_estimates: SubtestEstimates;
}

export interface ProjectedTestDay {
  generated_at: string;
  overall_confidence: Confidence;
  afqt_band_key: AfqtBandKey | null;
  afqt_band_label: string | null;
}

// ── Per-job gap evaluation ───────────────────────────────────────────

export interface RequirementCheck {
  composite_code: string;
  /** 0 = mandatory ALL-OF; >0 = alternate OR path. */
  requirement_group: number;
  /** Minimum required composite score for this rule (added in migration 0038). */
  required_score: number;
  status: RequirementStatus;
  gap_band: GapBand;
  actual_band: number;
  required_band: number;
}

export interface AfqtCheck {
  status: RequirementStatus;
  gap_band: GapBand;
}

export interface TargetJobGap {
  job_id: string;
  branch: Branch;
  code: string;
  title: string;
  category: string | null;
  support_status: SupportStatus;
  unsupported_reason: string | null;
  overall_status: JobOverallStatus;
  /** Null when the job has no AFQT minimum. */
  afqt: AfqtCheck | null;
  checks: RequirementCheck[];
  // Joined from user_target_jobs:
  target_job_id: string;
  display_order: number;
  is_primary: boolean;
}

// ── Primary metric (S5: AFCT prep differentiation) ───────────────────

/**
 * The metric the user is actually prepping for, resolved server-side from
 * profiles.test_type+branch. Initial-ASVAB (and AFCT on navy/coast_guard until
 * S7) → AFQT, banded. AFCT on a VE+AR branch → GT (Army/Marines) or General/G
 * (AF/SF) as an equated PROXY, `is_proxy=true`, value-based, NO qualification
 * tier implied (the card must frame it as a practice proxy).
 */
export type PrimaryMetric =
  | {
      code: "AFQT";
      label: string;
      is_proxy: false;
      current_band_key: AfqtBandKey | null;
      current_band_label: string | null;
      projected_band_key: AfqtBandKey | null;
      projected_band_label: string | null;
    }
  | {
      code: "GT" | "G";
      label: string;
      is_proxy: true;
      current_value: number | null;
      projected_value: number | null;
    };

// ── Top-level home payload (rpc_get_home_trajectory) ─────────────────

export interface HomeTrajectory {
  algorithm_version: string | null;
  /** Added in migration 0034; older snapshots/clients may omit it. */
  primary_metric?: PrimaryMetric | null;
  current_standing: CurrentStanding;
  projected_test_day: ProjectedTestDay | null;
  target_jobs: TargetJobGap[];
}

// ── Catalog row (rpc_search_job_catalog) ─────────────────────────────

export interface JobCatalogEntry {
  id: string;
  branch: Branch;
  code: string;
  title: string;
  category: string | null;
  description: string | null;
  min_afqt: number | null;
  support_status: SupportStatus;
  unsupported_reason: string | null;
  source_slug: string | null;
  source_version: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserTargetJob {
  id: string;
  user_id: string;
  job_id: string;
  display_order: number;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}
