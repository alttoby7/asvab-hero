/**
 * WS3, Job catalog model + the canonical anyOf -> requirement-group transform.
 *
 * This is the single source of truth for how src/data/*-jobs.json maps onto
 * the job_catalog + job_requirement_rules schema:
 *   - mandatory `requirements[]`  -> requirement_group 0  (ALL-OF)
 *   - `anyOf[]` alternate paths    -> requirement_group 1..n (each path one
 *                                     group; at least one group must pass)
 *
 * In the repo data, each anyOf entry is a single-composite alternate (Navy
 * SEAL: GS+MC+EI>=165 OR VE+AR+MK+MC>=220), so each entry becomes its own
 * one-rule OR group. The schema supports multi-rule OR groups for the future.
 *
 * Both scripts/build-job-catalog.mjs (SQL seed generator) and any runtime code
 * should derive groups via toRequirementRules() so semantics never drift.
 */

import type { Branch, MilitaryJob } from "@/types";
import type { SupportStatus } from "./types";

/** Branches whose composites are MAGE raw sums vs percentile thresholds. */
const MAGE_BRANCHES: ReadonlySet<Branch> = new Set<Branch>([
  "air_force",
  "space_force",
]);

export const MAGE_BETA_REASON =
  "Air Force / Space Force MAGE composites are raw sums, but job thresholds are " +
  "1-99 percentiles (MAGE normalization not yet implemented), so gap estimates " +
  "are not yet reliable. See docs/scoring-model.md.";

/**
 * Support status for a job given its branch. AF/SF -> beta (MAGE bug).
 * Centralized so the generator and any runtime checks agree.
 */
export function supportStatusForBranch(branch: Branch): {
  status: SupportStatus;
  reason: string | null;
} {
  if (MAGE_BRANCHES.has(branch)) {
    return { status: "beta", reason: MAGE_BETA_REASON };
  }
  return { status: "supported", reason: null };
}

export interface RequirementRuleRow {
  requirement_group: number;
  composite_code: string;
  min_score: number;
}

/**
 * Canonical transform: a MilitaryJob -> ordered requirement rule rows.
 * Group 0 = mandatory requirements[]; groups 1..n = each anyOf alternate.
 */
export function toRequirementRules(job: MilitaryJob): RequirementRuleRow[] {
  const rows: RequirementRuleRow[] = [];
  for (const r of job.requirements ?? []) {
    rows.push({
      requirement_group: 0,
      composite_code: r.composite,
      min_score: r.minScore,
    });
  }
  if (job.anyOf && job.anyOf.length > 0) {
    job.anyOf.forEach((r, i) => {
      rows.push({
        requirement_group: i + 1,
        composite_code: r.composite,
        min_score: r.minScore,
      });
    });
  }
  return rows;
}
