// Single source of truth for diploma-track AFQT minimums by branch (2026).
// Used by the AFQT calculator's eligibility matrix and the embeddable
// score-requirements widget so the two can never drift.
//
// Two numbers can apply to a branch:
//   - `min`         the OFFICIAL regulatory AFQT floor (used for the pass/fail
//                   eligibility check — the lowest score that makes you eligible).
//   - `practicalMin` the score the branch actually recruits diploma holders at,
//                   when it's higher than the official floor (e.g. the Navy's
//                   floor is 31 but it ships diploma holders at 35+). Shown
//                   alongside `min` so we never imply a single false number.
//
// GED floors are higher and noted inline. These are peacetime minimums; branches
// can raise thresholds based on recruiting needs.

export type BranchMinimum = {
  branch: string;
  /** Official regulatory AFQT percentile floor (diploma track). Drives eligibility. */
  min: number;
  /** Practical diploma-track minimum the branch recruits at, when higher than `min`. */
  practicalMin?: number;
  /** GED-track note (higher bar, sometimes with college-credit requirements). */
  gedNote: string;
  /** Short clarifier shown when official and practical floors differ. */
  note?: string;
};

export const BRANCH_MINIMUMS: readonly BranchMinimum[] = [
  { branch: "Army", min: 31, gedNote: "50 with GED" },
  { branch: "Marine Corps", min: 32, gedNote: "50 with GED" },
  {
    branch: "Navy",
    min: 31,
    practicalMin: 35,
    gedNote: "50 + 15 college credits with GED",
    note: "Official floor is 31; the Navy ships diploma holders at 35+ in practice.",
  },
  { branch: "Air Force", min: 36, gedNote: "65 with GED" },
  { branch: "Space Force", min: 36, gedNote: "65 with GED" },
  {
    branch: "Coast Guard",
    min: 32,
    gedNote: "50 + 15 college credits with GED",
    note: "Lowered from 40 in Nov 2023; the current floor is 32.",
  },
] as const;
