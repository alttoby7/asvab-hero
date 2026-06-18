import type { SubtestScores, MilitaryJob, Branch, CompositeScores } from "../types";
import {
  calculateAFQT,
  calculateArmyLineScores,
  calculateAirForceComposites,
  calculateMarineComposites,
  calculateNavyScores,
  calculateCoastGuardScores,
  calculateSpaceForceComposites,
} from "./calculator";

/**
 * Air Force & Space Force use MAGE composites (M, A, G, E). calculateAirForceComposites
 * returns RAW SUMS of standard scores, but every AFSC threshold in the data is a 1-99
 * PERCENTILE. There is no reliable raw-to-percentile conversion (exact applicant
 * percentiles are not derivable from a rounded score report), so we do NOT compare a
 * raw MAGE sum against a percentile threshold. Those checks are surfaced as
 * "unverifiable" instead of pass/fail, and they never decide qualify/non-qualify.
 * See docs/scoring-model.md + src/lib/trajectory/catalog.ts (MAGE_BETA_REASON).
 */
const MAGE_BRANCHES: ReadonlySet<Branch> = new Set<Branch>([
  "air_force",
  "space_force",
]);

export function isMageBranch(branch: Branch): boolean {
  return MAGE_BRANCHES.has(branch);
}

export const MAGE_UNVERIFIABLE_NOTE =
  "Air Force / Space Force MAGE scores are 1-99 percentiles. We show the job's required " +
  "MAGE percentile, but we cannot convert your raw composite to a percentile, so we can't " +
  "verify this requirement. Check with an Air Force recruiter.";

function getCompositesForBranch(
  branch: Branch,
  scores: SubtestScores
): CompositeScores {
  switch (branch) {
    case "army":
      return calculateArmyLineScores(scores);
    case "air_force":
      return calculateAirForceComposites(scores);
    case "marines":
      return calculateMarineComposites(scores);
    case "navy":
      return calculateNavyScores(scores);
    case "coast_guard":
      return calculateCoastGuardScores(scores);
    case "space_force":
      return calculateSpaceForceComposites(scores);
  }
}

// --- Rich evaluation types ---

export interface RequirementCheck {
  composite: string;
  required: number;
  actual: number;
  delta: number; // actual - required (negative = failed)
  passed: boolean;
  /**
   * True for AF/SF MAGE composites: the threshold is a percentile but `actual` is a
   * raw sum, so this check is neither passed nor failed. `actual`/`delta`/`passed`
   * are meaningless for these and must not be rendered as a verdict.
   */
  unverifiable?: boolean;
}

export interface JobEligibilityResult {
  job: MilitaryJob;
  qualifies: boolean;
  afqtCheck: { required: number; actual: number; passed: boolean } | null;
  checks: RequirementCheck[];
  failedChecks: RequirementCheck[];
  passedChecks: RequirementCheck[];
  proximity: number; // lower = closer to qualifying (0 = qualifies)
  /**
   * True when the job's composite requirements could not be evaluated (AF/SF MAGE).
   * In that case `qualifies` reflects only the AFQT check (or is true if there is no
   * AFQT requirement), and the UI must caveat the composite portion accordingly.
   */
  compositesUnverifiable?: boolean;
}

export interface JobMatchSnapshot {
  qualifyingByBranch: Record<Branch, JobEligibilityResult[]>;
  nonQualifyingByBranch: Record<Branch, JobEligibilityResult[]>;
  totalQualifying: number;
  totalNonQualifying: number;
}

// --- Core evaluator ---

export function evaluateJobEligibility(
  job: MilitaryJob,
  composites: CompositeScores,
  afqt: number
): JobEligibilityResult {
  let qualifies = true;

  // AF/SF MAGE composites are raw sums vs percentile thresholds: we cannot evaluate
  // them, so their checks are unverifiable and do not decide qualify/non-qualify.
  const mage = isMageBranch(job.branch);

  // AFQT check
  let afqtCheck: JobEligibilityResult["afqtCheck"] = null;
  if (job.minAFQT != null) {
    const passed = afqt >= job.minAFQT;
    afqtCheck = { required: job.minAFQT, actual: afqt, passed };
    if (!passed) qualifies = false;
  }

  // Composite checks, AND logic (all must pass). For MAGE branches each check is
  // marked unverifiable and never flips `qualifies`.
  const checks: RequirementCheck[] = job.requirements.map((req) => {
    const actual = composites[req.composite] ?? 0;
    const delta = actual - req.minScore;
    const passed = delta >= 0;
    if (mage) {
      return { composite: req.composite, required: req.minScore, actual, delta, passed, unverifiable: true };
    }
    if (!passed) qualifies = false;
    return { composite: req.composite, required: req.minScore, actual, delta, passed };
  });

  // anyOf checks, OR logic (at least one path must pass). Skipped for MAGE branches.
  if (!mage && job.anyOf && job.anyOf.length > 0) {
    const paths = job.anyOf.map((req) => {
      const actual = composites[req.composite] ?? 0;
      const delta = actual - req.minScore;
      return { composite: req.composite, required: req.minScore, actual, delta, passed: delta >= 0 };
    });
    if (!paths.some((p) => p.passed)) {
      qualifies = false;
      // Surface the closest path (smallest deficit) for gap analysis
      const bestPath = paths.reduce((best, p) => (p.delta > best.delta ? p : best));
      checks.push(bestPath);
    }
  } else if (mage && job.anyOf && job.anyOf.length > 0) {
    // Surface the alternate MAGE thresholds for display, also unverifiable.
    for (const req of job.anyOf) {
      const actual = composites[req.composite] ?? 0;
      checks.push({
        composite: req.composite,
        required: req.minScore,
        actual,
        delta: actual - req.minScore,
        passed: false,
        unverifiable: true,
      });
    }
  }

  // Unverifiable (MAGE) checks are excluded from pass/fail buckets and proximity.
  const verifiableChecks = checks.filter((c) => !c.unverifiable);
  const failedChecks = verifiableChecks.filter((c) => !c.passed);
  const passedChecks = verifiableChecks.filter((c) => c.passed);
  const compositesUnverifiable = mage && checks.some((c) => c.unverifiable);

  // Proximity score (lower = closer to qualifying)
  let proximity = 0;
  if (!qualifies) {
    const blockerCount = failedChecks.length + (afqtCheck && !afqtCheck.passed ? 1 : 0);
    const maxDeficit = Math.max(
      ...failedChecks.map((c) => -c.delta),
      afqtCheck && !afqtCheck.passed ? afqtCheck.required - afqtCheck.actual : 0
    );
    const totalDeficit =
      failedChecks.reduce((sum, c) => sum + -c.delta, 0) +
      (afqtCheck && !afqtCheck.passed ? afqtCheck.required - afqtCheck.actual : 0);
    proximity = blockerCount * 10000 + maxDeficit * 100 + totalDeficit;
  }

  return {
    job,
    qualifies,
    afqtCheck,
    checks,
    failedChecks,
    passedChecks,
    proximity,
    compositesUnverifiable,
  };
}

// --- Snapshot builder ---

const EMPTY_BRANCHES = (): Record<Branch, JobEligibilityResult[]> => ({
  army: [],
  navy: [],
  air_force: [],
  marines: [],
  coast_guard: [],
  space_force: [],
});

export function buildJobMatchSnapshot(
  allJobs: MilitaryJob[],
  compositesByBranch: Record<Branch, CompositeScores>,
  afqt: number
): JobMatchSnapshot {
  const qualifyingByBranch = EMPTY_BRANCHES();
  const nonQualifyingByBranch = EMPTY_BRANCHES();

  for (const job of allJobs) {
    const composites = compositesByBranch[job.branch] || {};
    const result = evaluateJobEligibility(job, composites, afqt);
    if (result.qualifies) {
      qualifyingByBranch[job.branch].push(result);
    } else {
      nonQualifyingByBranch[job.branch].push(result);
    }
  }

  // Sort non-qualifying by proximity (closest to qualifying first)
  for (const branch of Object.keys(nonQualifyingByBranch) as Branch[]) {
    nonQualifyingByBranch[branch].sort((a, b) => a.proximity - b.proximity);
  }

  const totalQualifying = Object.values(qualifyingByBranch).reduce((s, a) => s + a.length, 0);
  const totalNonQualifying = Object.values(nonQualifyingByBranch).reduce((s, a) => s + a.length, 0);

  return { qualifyingByBranch, nonQualifyingByBranch, totalQualifying, totalNonQualifying };
}

// --- Legacy compatibility ---

export function doesQualify(
  job: MilitaryJob,
  scores: SubtestScores,
  afqt: number
): boolean {
  const composites = getCompositesForBranch(job.branch, scores);
  return evaluateJobEligibility(job, composites, afqt).qualifies;
}

export function getQualifyingJobs(
  scores: SubtestScores,
  allJobs: MilitaryJob[]
): MilitaryJob[] {
  const afqt = calculateAFQT(scores);
  return allJobs.filter((job) => doesQualify(job, scores, afqt));
}

export function getQualifyingJobsByBranch(
  scores: SubtestScores,
  allJobs: MilitaryJob[]
): Record<Branch, MilitaryJob[]> {
  const afqt = calculateAFQT(scores);
  const result: Record<Branch, MilitaryJob[]> = {
    army: [],
    navy: [],
    air_force: [],
    marines: [],
    coast_guard: [],
    space_force: [],
  };

  for (const job of allJobs) {
    if (doesQualify(job, scores, afqt)) {
      result[job.branch].push(job);
    }
  }

  return result;
}
