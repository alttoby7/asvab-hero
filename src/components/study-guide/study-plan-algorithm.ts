import type { AsvabSubtest, SubtestScores, MilitaryJob, Branch } from "@/types";
import { ALL_SUBTESTS } from "@/types";
import {
  calculateAFQT,
  calculateArmyLineScores,
  calculateAirForceComposites,
  calculateMarineComposites,
  calculateNavyScores,
  calculateCoastGuardScores,
  calculateSpaceForceComposites,
} from "@/lib/score-calculator";
import type { CompositeScores } from "@/types";

// ── Types ───────────────────────────────────────────────────────────────

export type ScoreInputMode = "self-rate" | "practice-import" | "actual-scores";

export interface StudyPlanInput {
  testDate: string; // ISO date
  hoursPerWeek: number;
  selfRatings: Record<AsvabSubtest, number>; // 1-5
  scores: Partial<SubtestScores>;
  scoreInputMode: ScoreInputMode;
  selectedBranch: Branch | null;
  selectedJobs: MilitaryJob[];
}

export interface WeekPlan {
  weekNumber: number;
  startDate: string;
  phase: "Learning" | "Practice" | "Review";
  totalHours: number;
  allocations: SubtestAllocation[];
  milestone: string;
  explanation: string;
}

export interface SubtestAllocation {
  subtest: AsvabSubtest;
  hours: number; // rounded to 0.5
  blocks: number; // 30-min blocks
  priority: number; // 0-1 normalized
}

export interface SubtestPriority {
  subtest: AsvabSubtest;
  total: number; // 0-1 normalized
  weakness: number;
  goalImpact: number;
  afqtImpact: number;
}

// ── Branch AFQT minimums ────────────────────────────────────────────────

const BRANCH_AFQT_MINIMUMS: Record<Branch, number> = {
  army: 31,
  navy: 35,
  air_force: 36,
  marines: 32,
  coast_guard: 36,
  space_force: 36,
};

// ── AFQT subtests ───────────────────────────────────────────────────────

const AFQT_SUBTESTS: AsvabSubtest[] = ["AR", "WK", "PC", "MK"];
const VE_SUBTESTS: AsvabSubtest[] = ["WK", "PC"]; // doubled in AFQT formula

// ── Composite formulas (subtest → composites it feeds) ──────────────────

function getCompositesForBranch(branch: Branch, scores: SubtestScores): CompositeScores {
  switch (branch) {
    case "army": return calculateArmyLineScores(scores);
    case "air_force": return calculateAirForceComposites(scores);
    case "marines": return calculateMarineComposites(scores);
    case "navy": return calculateNavyScores(scores);
    case "coast_guard": return calculateCoastGuardScores(scores);
    case "space_force": return calculateSpaceForceComposites(scores);
  }
}

// ── Convert self-ratings to estimated scores ────────────────────────────

export function selfRatingsToScores(ratings: Record<AsvabSubtest, number>): SubtestScores {
  const map: Record<number, number> = {
    1: 25, // weak
    2: 32, // below average
    3: 40, // average
    4: 50, // above average
    5: 58, // strong
  };
  const result = {} as SubtestScores;
  for (const st of ALL_SUBTESTS) {
    result[st] = map[ratings[st]] ?? 40;
  }
  return result;
}

// ── Get effective scores from any input mode ────────────────────────────

export function getEffectiveScores(input: StudyPlanInput): SubtestScores {
  if (input.scoreInputMode === "actual-scores") {
    const result = {} as SubtestScores;
    for (const st of ALL_SUBTESTS) {
      result[st] = input.scores[st] ?? 40;
    }
    return result;
  }
  if (input.scoreInputMode === "practice-import") {
    const result = {} as SubtestScores;
    for (const st of ALL_SUBTESTS) {
      result[st] = input.scores[st] ?? 40;
    }
    return result;
  }
  return selfRatingsToScores(input.selfRatings);
}

// ── Calculate subtest priorities ────────────────────────────────────────

export function calculateSubtestPriorities(input: StudyPlanInput): SubtestPriority[] {
  const scores = getEffectiveScores(input);
  const afqt = calculateAFQT(scores);
  const targetAFQT = input.selectedBranch
    ? BRANCH_AFQT_MINIMUMS[input.selectedBranch]
    : 31;
  const belowTarget = afqt < targetAFQT + 10; // 10-point safety buffer

  const priorities: SubtestPriority[] = ALL_SUBTESTS.map((subtest) => {
    // 1. Weakness score (0-1, higher = weaker)
    let weakness: number;
    if (input.scoreInputMode === "self-rate") {
      weakness = (6 - input.selfRatings[subtest]) / 5;
    } else {
      // From actual/practice scores: lower score = higher weakness
      const score = scores[subtest];
      weakness = Math.max(0, Math.min(1, 1 - (score - 20) / 42));
    }

    // 2. Goal impact (0-1): how much this subtest matters for selected jobs
    let goalImpact = 0;
    if (input.selectedBranch && input.selectedJobs.length > 0) {
      const composites = getCompositesForBranch(input.selectedBranch, scores);
      let gapContributions = 0;
      let maxPossible = 0;

      for (const job of input.selectedJobs) {
        for (const req of job.requirements) {
          const currentScore = composites[req.composite] ?? 0;
          const gap = Math.max(0, req.minScore - currentScore);
          if (gap > 0) {
            // This subtest contributes if it's in the composite formula
            const formulaSubtests = getCompositeSubtests(input.selectedBranch, req.composite);
            if (formulaSubtests.includes(subtest)) {
              gapContributions += gap / formulaSubtests.length;
            }
          }
          maxPossible += req.minScore * 0.3; // normalization factor
        }
      }
      goalImpact = maxPossible > 0 ? Math.min(1, gapContributions / (maxPossible || 1)) : 0;
    }

    // 3. AFQT impact (0-1): how much improving this subtest helps AFQT
    let afqtImpact = 0;
    if (AFQT_SUBTESTS.includes(subtest)) {
      afqtImpact = 0.4;
      if (VE_SUBTESTS.includes(subtest)) {
        afqtImpact = 0.7; // VE is doubled
      }
      if (belowTarget) {
        afqtImpact *= 1.5; // boost when below AFQT target
      }
      afqtImpact = Math.min(1, afqtImpact);
    }

    // 4. Weighted combination
    const weights = belowTarget
      ? { weakness: 0.4, afqt: 0.35, goal: 0.2, urgency: 0.05 }
      : { weakness: 0.4, goal: 0.35, afqt: 0.15, urgency: 0.1 };

    const total =
      weakness * weights.weakness +
      afqtImpact * weights.afqt +
      goalImpact * weights.goal;

    return { subtest, total, weakness, goalImpact, afqtImpact };
  });

  // Normalize to 0-1
  const maxTotal = Math.max(...priorities.map((p) => p.total), 0.01);
  for (const p of priorities) {
    p.total = p.total / maxTotal;
  }

  return priorities.sort((a, b) => b.total - a.total);
}

// ── Get subtests for a given composite ──────────────────────────────────

function getCompositeSubtests(branch: Branch, composite: string): AsvabSubtest[] {
  // Build a dummy max-score set to introspect formulas
  const compositeMap: Record<string, Record<string, AsvabSubtest[]>> = {
    army: {
      GT: ["AR", "WK", "PC"],
      CL: ["WK", "PC", "AR", "MK"],
      CO: ["AR", "AS", "MC"],
      EL: ["GS", "AR", "MK", "EI"],
      FA: ["AR", "MK", "MC"],
      GM: ["GS", "MC", "AS"],
      MM: ["AS", "MC", "EI"],
      OF: ["WK", "PC", "AR", "MC"],
      SC: ["WK", "PC", "AR", "MK", "EI"],
      ST: ["GS", "WK", "PC", "AR", "MK"],
    },
    air_force: {
      M: ["MC", "AS", "GS"],
      A: ["WK", "PC", "MK"],
      G: ["AR", "WK", "PC"],
      E: ["GS", "AR", "MK", "EI"],
    },
    marines: {
      MM: ["AR", "MC", "AS", "EI"],
      GT: ["AR", "WK", "PC"],
      EL: ["GS", "AR", "MK", "EI"],
    },
    navy: {
      VE: ["WK", "PC"],
      "AR+MK+EI+GS": ["AR", "MK", "EI", "GS"],
      "VE+AR+MK+MC": ["WK", "PC", "AR", "MK", "MC"],
      "VE+MK": ["WK", "PC", "MK"],
      "VE+AR": ["WK", "PC", "AR"],
    },
    coast_guard: {
      VE: ["WK", "PC"],
      "AR+MK+EI+GS": ["AR", "MK", "EI", "GS"],
      "VE+AR+MK+MC": ["WK", "PC", "AR", "MK", "MC"],
      "VE+MK": ["WK", "PC", "MK"],
      "VE+AR": ["WK", "PC", "AR"],
    },
    space_force: {
      M: ["MC", "AS", "GS"],
      A: ["WK", "PC", "MK"],
      G: ["AR", "WK", "PC"],
      E: ["GS", "AR", "MK", "EI"],
    },
  };

  const branchMap = compositeMap[branch];
  if (!branchMap) return [];

  // For Navy/CG individual subtests
  if (ALL_SUBTESTS.includes(composite as AsvabSubtest)) {
    return [composite as AsvabSubtest];
  }

  return branchMap[composite] || [];
}

// ── Generate weekly study plan ──────────────────────────────────────────

export function generateStudyPlan(input: StudyPlanInput): WeekPlan[] {
  if (!input.testDate || input.hoursPerWeek < 1) return [];

  const priorities = calculateSubtestPriorities(input);
  const today = new Date();
  const testDay = new Date(input.testDate);
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const totalWeeks = Math.max(1, Math.ceil((testDay.getTime() - today.getTime()) / msPerWeek));

  const weeks: WeekPlan[] = [];

  for (let w = 0; w < totalWeeks; w++) {
    const weeksRemaining = totalWeeks - w;
    const weekStart = new Date(today.getTime() + w * msPerWeek);

    // Phase determination
    let phase: WeekPlan["phase"];
    let learningPct: number;
    let practicePct: number;
    let reviewPct: number;

    if (weeksRemaining > 6) {
      phase = "Learning";
      learningPct = 0.55;
      practicePct = 0.30;
      reviewPct = 0.15;
    } else if (weeksRemaining > 2) {
      phase = "Practice";
      learningPct = 0.35;
      practicePct = 0.40;
      reviewPct = 0.25;
    } else {
      phase = "Review";
      learningPct = 0.15;
      practicePct = 0.45;
      reviewPct = 0.40;
    }

    // Reserve review time
    const totalHours = input.hoursPerWeek;
    const mixedReviewHours = roundToHalf(totalHours * reviewPct);
    const availableForSubtests = totalHours - mixedReviewHours;

    // Allocate by priority — cap any single subtest at 40%
    const cap = totalHours * 0.4;
    const totalPriority = priorities.reduce((s, p) => s + p.total, 0) || 1;

    const allocations: SubtestAllocation[] = priorities
      .filter((p) => p.total > 0.05) // skip near-zero priority
      .map((p) => {
        const rawHours = (p.total / totalPriority) * availableForSubtests;
        const capped = Math.min(rawHours, cap);
        const hours = roundToHalf(capped);
        return {
          subtest: p.subtest,
          hours,
          blocks: Math.round(hours * 2), // 30-min blocks
          priority: p.total,
        };
      })
      .filter((a) => a.hours >= 0.5); // at least one 30-min block

    // Add mixed review as a pseudo-allocation note
    if (mixedReviewHours >= 0.5) {
      allocations.push({
        subtest: "AR" as AsvabSubtest, // placeholder — UI should display as "Mixed Review"
        hours: mixedReviewHours,
        blocks: Math.round(mixedReviewHours * 2),
        priority: -1, // sentinel for mixed review
      });
    }

    // Milestone
    const milestones = getMilestone(w, totalWeeks, phase);

    // Explanation
    const topSubtest = priorities[0];
    const explanation = getWeekExplanation(w, totalWeeks, phase, topSubtest, learningPct, practicePct);

    weeks.push({
      weekNumber: w + 1,
      startDate: weekStart.toISOString().split("T")[0],
      phase,
      totalHours,
      allocations: allocations.filter((a) => a.priority >= 0),
      milestone: milestones,
      explanation,
    });
  }

  return weeks;
}

// ── Helpers ─────────────────────────────────────────────────────────────

function roundToHalf(n: number): number {
  return Math.round(n * 2) / 2;
}

function getMilestone(weekIndex: number, totalWeeks: number, phase: string): string {
  const progress = (weekIndex + 1) / totalWeeks;

  if (weekIndex === 0) return "Complete initial assessment of all weak areas";
  if (progress < 0.25) return "Cover core concepts in your weakest subtests";
  if (progress < 0.5) return "Take a practice quiz to check progress";
  if (progress < 0.75) return "Focus on timed practice — build speed and accuracy";
  if (weekIndex === totalWeeks - 2) return "Full practice test under timed conditions";
  if (weekIndex === totalWeeks - 1) return "Light review only — rest before test day";
  return "Continue targeted practice on remaining weak areas";
}

function getWeekExplanation(
  weekIndex: number,
  totalWeeks: number,
  phase: string,
  topPriority: SubtestPriority,
  learningPct: number,
  practicePct: number,
): string {
  const { subtest } = topPriority;
  const subtestNames: Record<AsvabSubtest, string> = {
    GS: "General Science", AR: "Arithmetic Reasoning", WK: "Word Knowledge",
    PC: "Paragraph Comprehension", MK: "Math Knowledge", EI: "Electronics",
    AS: "Auto & Shop", MC: "Mechanical Comprehension", AO: "Assembling Objects",
  };

  if (phase === "Learning") {
    return `Focus on building fundamentals — ${subtestNames[subtest]} is your top priority this week. ${Math.round(learningPct * 100)}% new material, ${Math.round(practicePct * 100)}% practice.`;
  }
  if (phase === "Practice") {
    return `Shift to targeted practice. Apply what you've learned in ${subtestNames[subtest]} and other weak areas. Timed sets recommended.`;
  }
  return `Final review phase — focus on mixed timed practice across all subtests. Stay sharp, don't cram new material.`;
}

// ── Download plan as text ───────────────────────────────────────────────

export function planToText(weeks: WeekPlan[], input: StudyPlanInput): string {
  const subtestNames: Record<AsvabSubtest, string> = {
    GS: "General Science", AR: "Arithmetic Reasoning", WK: "Word Knowledge",
    PC: "Paragraph Comprehension", MK: "Math Knowledge", EI: "Electronics",
    AS: "Auto & Shop", MC: "Mechanical Comprehension", AO: "Assembling Objects",
  };

  let text = "ASVAB STUDY PLAN\n";
  text += `Generated by ASVABHero.com\n`;
  text += `Test Date: ${input.testDate}\n`;
  text += `Hours/Week: ${input.hoursPerWeek}\n`;
  text += `Total Weeks: ${weeks.length}\n\n`;
  text += "─".repeat(50) + "\n\n";

  for (const week of weeks) {
    text += `WEEK ${week.weekNumber} — ${week.phase} Phase (${week.startDate})\n`;
    text += `${week.explanation}\n\n`;

    for (const alloc of week.allocations) {
      const name = subtestNames[alloc.subtest];
      text += `  ${name}: ${alloc.hours}h (${alloc.blocks} × 30min)\n`;
    }

    text += `\n  Milestone: ${week.milestone}\n`;
    text += "\n" + "─".repeat(50) + "\n\n";
  }

  return text;
}
