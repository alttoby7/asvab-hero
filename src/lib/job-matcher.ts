import type { SubtestScores, MilitaryJob, Branch } from "@/types";
import {
  calculateAFQT,
  calculateArmyLineScores,
  calculateAirForceComposites,
  calculateMarineComposites,
  calculateNavyScores,
  calculateCoastGuardScores,
  calculateSpaceForceComposites,
} from "./score-calculator";
import type { CompositeScores } from "@/types";

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

export function doesQualify(
  job: MilitaryJob,
  scores: SubtestScores,
  afqt: number
): boolean {
  // Check AFQT minimum
  if (job.minAFQT && afqt < job.minAFQT) return false;

  // Check composite/line score requirements
  const composites = getCompositesForBranch(job.branch, scores);
  for (const req of job.requirements) {
    const score = composites[req.composite];
    if (score === undefined || score < req.minScore) return false;
  }

  return true;
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
