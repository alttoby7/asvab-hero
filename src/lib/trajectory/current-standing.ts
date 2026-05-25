/**
 * WS3, Current-standing inference (pure TS mirror of
 * rpc_refresh_trajectory_snapshot in 0022_trajectory_target_jobs.sql).
 *
 * Supersedes the rough src/lib/estimate-scores.ts with an AGGREGATE, CI-aware
 * model: a Beta(2,2) posterior per subtest shrinks sparse evidence toward 50
 * on the equated 20-62 standard scale, and emits low/point/high. AFQT is then
 * derived via PAY97 across the low/point/high bounds.
 *
 * The server RPC is authoritative; this exists for parity, testing, and any
 * client-side preview. ALGORITHM_VERSION must stay in lockstep with the SQL.
 */

import { calculateAFQT } from "@/lib/score-calculator";
import type { AsvabSubtest, SubtestScores } from "@/types";
import type { Confidence, SubtestEstimate, SubtestEstimates } from "./types";

export const ALGORITHM_VERSION = "v1";

const AFQT_SUBTESTS: AsvabSubtest[] = ["AR", "MK", "WK", "PC"];
const ALL_SUBTESTS_ORDERED: AsvabSubtest[] = [
  "GS",
  "AR",
  "WK",
  "PC",
  "MK",
  "EI",
  "AS",
  "MC",
  "AO",
];

export type SubtestEvidence = Record<string, { seen: number; correct: number }>;

/**
 * Aggregate per-subtest evidence across attempts (each attempt's
 * results_by_subtest), summing seen + correct.
 */
export function aggregateSubtestEvidence(
  attempts: Array<{ results_by_subtest: SubtestEvidence | null | undefined }>
): SubtestEvidence {
  const out: SubtestEvidence = {};
  for (const a of attempts) {
    const rbs = a.results_by_subtest;
    if (!rbs) continue;
    for (const [st, v] of Object.entries(rbs)) {
      if (!v) continue;
      const cur = out[st] ?? { seen: 0, correct: 0 };
      cur.seen += v.seen ?? 0;
      cur.correct += v.correct ?? 0;
      out[st] = cur;
    }
  }
  return out;
}

/**
 * Beta(2,2)-posterior estimate for one subtest, mapped to the equated 20-62
 * standard scale with a CI half-width that narrows ~1/sqrt(n+4).
 */
export function estimateSubtest(seen: number, correct: number): SubtestEstimate {
  const p = (correct + 2.0) / (seen + 4.0); // Beta(2,2) posterior mean
  const spread = 0.5 / Math.sqrt(seen + 4.0); // half-width on proportion scale
  const toStd = (prop: number) => Math.round(20 + Math.max(0, Math.min(1, prop)) * 42);
  return {
    low: toStd(p - spread),
    point: toStd(p),
    high: toStd(p + spread),
    seen,
    correct,
  };
}

export interface CurrentStandingInference {
  algorithmVersion: string;
  attemptCount: number;
  /** Equated 20-62 point estimates for all 9 subtests. */
  equatedSubtestPoints: SubtestScores;
  /** low/point/high estimates for the 4 AFQT subtests. */
  subtestEstimates: SubtestEstimates;
  afqtLow: number;
  afqtPoint: number;
  afqtHigh: number;
  confidence: Confidence;
  afqtSubtestsCovered: number;
  afqtSubtestsRepeatCovered: number;
}

/**
 * Build a current-standing inference from aggregated subtest evidence.
 * Mirrors the SQL: confidence ramps from low (no AFQT evidence) -> medium
 * (>=1 AFQT subtest with seen>=8) -> high (all 4 covered + >=3 with seen>=8).
 */
export function inferCurrentStanding(
  evidence: SubtestEvidence,
  attemptCount: number
): CurrentStandingInference {
  const equated: Partial<SubtestScores> = {};
  const subtestEstimates: SubtestEstimates = {};
  let covered = 0;
  let repeatCovered = 0;

  for (const st of ALL_SUBTESTS_ORDERED) {
    const e = evidence[st];
    const seen = e?.seen ?? 0;
    const correct = e?.correct ?? 0;
    const est = estimateSubtest(seen, correct);
    equated[st] = est.point;
    if (AFQT_SUBTESTS.includes(st)) {
      subtestEstimates[st as "AR" | "MK" | "WK" | "PC"] = est;
      if (seen > 0) covered++;
      if (seen >= 8) repeatCovered++;
    }
  }

  // AFQT via PAY97 across low/point/high. calculateAFQT clamps to the equated
  // scale internally, so we feed it equated-scale subtest values.
  const buildScores = (pick: "low" | "point" | "high"): SubtestScores => {
    const s = { ...(equated as SubtestScores) };
    for (const st of AFQT_SUBTESTS) {
      const est = subtestEstimates[st as "AR" | "MK" | "WK" | "PC"];
      if (est) s[st] = est[pick];
    }
    return s;
  };

  const afqtLow = calculateAFQT(buildScores("low"));
  const afqtPoint = calculateAFQT(buildScores("point"));
  const afqtHigh = calculateAFQT(buildScores("high"));

  let confidence: Confidence;
  if (covered === 0) confidence = "low";
  else if (repeatCovered >= 3 && covered === 4) confidence = "high";
  else if (repeatCovered >= 1) confidence = "medium";
  else confidence = "low";

  return {
    algorithmVersion: ALGORITHM_VERSION,
    attemptCount,
    equatedSubtestPoints: equated as SubtestScores,
    subtestEstimates,
    afqtLow,
    afqtPoint,
    afqtHigh,
    confidence,
    afqtSubtestsCovered: covered,
    afqtSubtestsRepeatCovered: repeatCovered,
  };
}
