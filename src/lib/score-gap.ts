import type { AsvabSubtest, Branch } from "@/types";
import type { RequirementCheck, JobEligibilityResult } from "./job-matcher";

/**
 * Which subtests feed each composite, and at what weight.
 * Raising subtest S by 1 point raises composite C by WEIGHT[C][S] points.
 * Used by the Score Gap Engine to tell users the cheapest way to close a deficit.
 */
type CompositeWeights = Partial<Record<AsvabSubtest, number>>;

const ARMY_WEIGHTS: Record<string, CompositeWeights> = {
  GT: { AR: 1, WK: 1, PC: 1 },
  CL: { AR: 1, WK: 1, PC: 1, MK: 1 },
  CO: { AR: 1, AS: 1, MC: 1 },
  EL: { GS: 1, AR: 1, MK: 1, EI: 1 },
  FA: { AR: 1, MK: 1, MC: 1 },
  GM: { GS: 1, AS: 1, MC: 1 },
  MM: { AS: 1, MC: 1, EI: 1 },
  OF: { AR: 1, WK: 1, PC: 1, MC: 1 },
  SC: { AR: 1, WK: 1, PC: 1, MK: 1, EI: 1 },
  ST: { GS: 1, WK: 1, PC: 1, AR: 1, MK: 1 },
};

const AIR_FORCE_WEIGHTS: Record<string, CompositeWeights> = {
  M: { MC: 1, AS: 1, GS: 1 },
  A: { WK: 1, PC: 1, MK: 1 },
  G: { AR: 1, WK: 1, PC: 1 },
  E: { GS: 1, AR: 1, MK: 1, EI: 1 },
};

const MARINES_WEIGHTS: Record<string, CompositeWeights> = {
  MM: { AR: 1, MC: 1, AS: 1, EI: 1 },
  GT: { AR: 1, WK: 1, PC: 1 },
  EL: { GS: 1, AR: 1, MK: 1, EI: 1 },
};

/**
 * Navy composites are sum-of-subtest formulas encoded in their names.
 * We parse the name at lookup time so we don't have to enumerate all of them.
 */
function parseNavyComposite(name: string): CompositeWeights {
  const weights: CompositeWeights = {};
  const parts = name.split("+");
  for (const part of parts) {
    const match = part.match(/^(\d+)?([A-Z]{2})$/);
    if (!match) continue;
    const multiplier = match[1] ? parseInt(match[1], 10) : 1;
    const subtest = match[2] as AsvabSubtest;
    if (subtest === ("VE" as unknown as AsvabSubtest)) {
      weights.WK = (weights.WK ?? 0) + multiplier;
      weights.PC = (weights.PC ?? 0) + multiplier;
    } else {
      weights[subtest] = (weights[subtest] ?? 0) + multiplier;
    }
  }
  return weights;
}

export function getCompositeWeights(
  branch: Branch,
  composite: string
): CompositeWeights {
  if (branch === "army") return ARMY_WEIGHTS[composite] ?? {};
  if (branch === "air_force" || branch === "space_force")
    return AIR_FORCE_WEIGHTS[composite] ?? {};
  if (branch === "marines") return MARINES_WEIGHTS[composite] ?? {};
  if (branch === "navy" || branch === "coast_guard") {
    if (composite === "VE") return { WK: 1, PC: 1 };
    if (
      composite === "AR" ||
      composite === "MK" ||
      composite === "GS" ||
      composite === "EI" ||
      composite === "AS" ||
      composite === "MC" ||
      composite === "AO" ||
      composite === "WK" ||
      composite === "PC"
    ) {
      return { [composite as AsvabSubtest]: 1 };
    }
    return parseNavyComposite(composite);
  }
  return {};
}

export interface SubtestSuggestion {
  subtest: AsvabSubtest;
  pointsNeeded: number;
  clearsGap: boolean;
  affectedComposites: string[];
}

export interface ScoreGapReport {
  job: JobEligibilityResult["job"];
  totalDeficit: number;
  failedComposites: RequirementCheck[];
  suggestions: SubtestSuggestion[];
  summary: string;
}

/**
 * For a non-qualifying job, return the minimum-effort subtest path to close the gap.
 * Ranks subtests by how many failed composites they affect AND by the max points needed.
 */
export function buildScoreGapReport(
  result: JobEligibilityResult,
  branch: Branch
): ScoreGapReport | null {
  if (result.qualifies) return null;
  if (result.failedChecks.length === 0) return null;

  const subtestImpact = new Map<
    AsvabSubtest,
    { composites: Set<string>; maxPointsNeeded: number }
  >();

  for (const check of result.failedChecks) {
    const weights = getCompositeWeights(branch, check.composite);
    const gap = -check.delta;
    for (const [subtest, weight] of Object.entries(weights) as Array<
      [AsvabSubtest, number]
    >) {
      const pointsNeededToCloseThisGap = Math.ceil(gap / weight);
      const existing = subtestImpact.get(subtest) ?? {
        composites: new Set<string>(),
        maxPointsNeeded: 0,
      };
      existing.composites.add(check.composite);
      existing.maxPointsNeeded = Math.max(
        existing.maxPointsNeeded,
        pointsNeededToCloseThisGap
      );
      subtestImpact.set(subtest, existing);
    }
  }

  const suggestions: SubtestSuggestion[] = Array.from(subtestImpact.entries())
    .map(([subtest, data]) => ({
      subtest,
      pointsNeeded: data.maxPointsNeeded,
      clearsGap: data.composites.size === result.failedChecks.length,
      affectedComposites: Array.from(data.composites),
    }))
    .sort((a, b) => {
      if (a.clearsGap !== b.clearsGap) return a.clearsGap ? -1 : 1;
      if (a.affectedComposites.length !== b.affectedComposites.length) {
        return b.affectedComposites.length - a.affectedComposites.length;
      }
      return a.pointsNeeded - b.pointsNeeded;
    });

  const totalDeficit = result.failedChecks.reduce(
    (sum, c) => sum + -c.delta,
    0
  );

  const best = suggestions[0];
  const summary = best
    ? best.clearsGap
      ? `Raise ${best.subtest} by ${best.pointsNeeded} point${best.pointsNeeded === 1 ? "" : "s"} to qualify for ${result.job.title}.`
      : `${best.subtest} feeds ${best.affectedComposites.length} of ${result.failedChecks.length} failed composites. You'll need to raise multiple subtests.`
    : "";

  return {
    job: result.job,
    totalDeficit,
    failedComposites: result.failedChecks,
    suggestions,
    summary,
  };
}
