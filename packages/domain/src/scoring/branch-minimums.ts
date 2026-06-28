// Single source of truth for diploma-track AFQT minimums by branch (2026).
// Used by the AFQT calculator's eligibility matrix and the embeddable
// score-requirements widget so the two can never drift.
//
// GED floors are higher and noted inline. These are peacetime minimums; branches
// can raise thresholds based on recruiting needs.

export type BranchMinimum = {
  branch: string;
  /** Diploma-track minimum AFQT percentile. */
  min: number;
  /** GED-track note (higher bar, sometimes with college-credit requirements). */
  gedNote: string;
};

export const BRANCH_MINIMUMS: readonly BranchMinimum[] = [
  { branch: "Army", min: 31, gedNote: "50 with GED" },
  { branch: "Marine Corps", min: 32, gedNote: "50 with GED" },
  { branch: "Navy", min: 35, gedNote: "50 + 15 college credits with GED" },
  { branch: "Air Force", min: 36, gedNote: "65 with GED" },
  { branch: "Space Force", min: 36, gedNote: "65 with GED" },
  { branch: "Coast Guard", min: 32, gedNote: "50 + 15 college credits with GED" },
] as const;
