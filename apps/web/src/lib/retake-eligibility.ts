import type { Branch } from "@/types";

/**
 * Per the official ASVAB retest policy (officialasvab.com), the waiting period
 * applies the same way whether the initial test was a student ASVAB or an
 * enlistment ASVAB. The 1/1/6 rule: 1 calendar month after the initial test,
 * 1 calendar month after the first retest, then 6 calendar months between
 * every subsequent retest.
 */
export type RetakeNumber = 1 | 2 | 3;

export interface EligibilityInput {
  lastTestDate: Date;
  retakeNumber: RetakeNumber;
  previousAfqt?: number;
  targetAfqt?: number;
  branch?: Branch;
  inDep?: boolean;
}

export interface EligibilityResult {
  earliestRetakeDate: Date;
  daysFromToday: number;
  waitLabel: string;
  ruleExplanation: string;
  cTestWarning: string | null;
  depWarning: string | null;
}

function addCalendarMonths(date: Date, months: number): Date {
  const d = new Date(date);
  const targetMonth = d.getMonth() + months;
  d.setMonth(targetMonth);
  // If original day doesn't exist in the new month (e.g. Jan 31 + 1 = Feb 28/29),
  // JS auto-rolls forward. The policy uses "calendar month" which matches this.
  return d;
}

function daysBetween(a: Date, b: Date): number {
  const ms = b.getTime() - a.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

function getWaitMonths(retakeNumber: RetakeNumber): number {
  if (retakeNumber === 1) return 1;
  if (retakeNumber === 2) return 1;
  return 6;
}

function getRuleExplanation(retakeNumber: RetakeNumber): string {
  if (retakeNumber === 1) {
    return "First retest: 1 calendar month after your initial test.";
  }
  if (retakeNumber === 2) {
    return "Second retest: 1 calendar month after your first retest.";
  }
  return "Third retest (and every retest after): 6 calendar months after your previous test.";
}

/**
 * The Confirmation Test (C-Test) is triggered if the AFQT jumps 20+ points
 * within 6 months. Failing the C-Test reverts your score to the original.
 */
function getCTestWarning(
  previousAfqt: number | undefined,
  targetAfqt: number | undefined,
  retakeNumber: RetakeNumber
): string | null {
  if (previousAfqt == null || targetAfqt == null) return null;
  const jump = targetAfqt - previousAfqt;
  if (jump < 20) return null;

  const label = retakeNumber === 3 ? "third" : retakeNumber === 2 ? "second" : "first";
  return `A ${jump}-point jump (${previousAfqt} → ${targetAfqt}) triggers the Confirmation Test since your ${label} retest is within 6 months of your last score. If you fail the C-Test, your AFQT reverts to the original ${previousAfqt}.`;
}

function getDepWarning(
  branch: Branch | undefined,
  inDep: boolean | undefined
): string | null {
  if (!inDep || !branch) return null;
  switch (branch) {
    case "army":
      return "DEP members retesting for MOS upgrade must meet Army policy: your new score only replaces the old if the improvement is meaningful. Some DEP retakes require a C-Test regardless of the jump.";
    case "navy":
      return "Navy DEP-EP retests are handled by the recruiter and typically require a specific rating eligibility gap to justify. Standard 1/1/6 waits still apply.";
    case "air_force":
      return "Air Force in-DEP retests are rare and must be approved by the recruiting squadron. The retest must be for a specific AFSC qualification, not score inflation.";
    case "marines":
      return "Marines allow in-DEP retests when a higher score opens a desired MOS. Standard 1/1/6 rules apply; your recruiter schedules through MEPS.";
    case "coast_guard":
      return "Coast Guard DEP retests require justification and are approved by the recruiter. Standard 1/1/6 waits apply.";
    case "space_force":
      return "Space Force follows Air Force procedures for in-DEP retests. Expect a high bar for approval.";
  }
}

export function checkEligibility(input: EligibilityInput): EligibilityResult {
  const months = getWaitMonths(input.retakeNumber);
  const earliestRetakeDate = addCalendarMonths(input.lastTestDate, months);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysFromToday = daysBetween(today, earliestRetakeDate);

  return {
    earliestRetakeDate,
    daysFromToday,
    waitLabel: months === 1 ? "1 calendar month" : "6 calendar months",
    ruleExplanation: getRuleExplanation(input.retakeNumber),
    cTestWarning: getCTestWarning(
      input.previousAfqt,
      input.targetAfqt,
      input.retakeNumber
    ),
    depWarning: getDepWarning(input.branch, input.inDep),
  };
}

export function formatRetakeDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
