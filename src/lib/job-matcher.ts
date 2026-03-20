import type { SubtestScores, MilitaryJob, Branch, CompositeScores } from "@/types";
import {
  calculateAFQT,
  calculateArmyLineScores,
  calculateAirForceComposites,
  calculateMarineComposites,
  calculateNavyScores,
  calculateCoastGuardScores,
  calculateSpaceForceComposites,
} from "./score-calculator";

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
}

export interface JobEligibilityResult {
  job: MilitaryJob;
  qualifies: boolean;
  afqtCheck: { required: number; actual: number; passed: boolean } | null;
  checks: RequirementCheck[];
  failedChecks: RequirementCheck[];
  passedChecks: RequirementCheck[];
  proximity: number; // lower = closer to qualifying (0 = qualifies)
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

  // AFQT check
  let afqtCheck: JobEligibilityResult["afqtCheck"] = null;
  if (job.minAFQT != null) {
    const passed = afqt >= job.minAFQT;
    afqtCheck = { required: job.minAFQT, actual: afqt, passed };
    if (!passed) qualifies = false;
  }

  // Composite checks
  const checks: RequirementCheck[] = job.requirements.map((req) => {
    const actual = composites[req.composite] ?? 0;
    const delta = actual - req.minScore;
    const passed = delta >= 0;
    if (!passed) qualifies = false;
    return { composite: req.composite, required: req.minScore, actual, delta, passed };
  });

  const failedChecks = checks.filter((c) => !c.passed);
  const passedChecks = checks.filter((c) => c.passed);

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

  return { job, qualifies, afqtCheck, checks, failedChecks, passedChecks, proximity };
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
