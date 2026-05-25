// Honest social proof. Numbers are REAL (Google Analytics) and rounded DOWN, 
// never inflated, never fabricated. Refresh roughly monthly from GA4.
//
// Source (GA4 property 404444165, trailing 30 days, as of 2026-05-22):
//   totalUsers ~842, sessions ~1,251, calculator_submit ~4,251.
// We frame as activity ("recruits this month" from totalUsers, rounded down)
// so the claim is defensible and true.

export const SOCIAL_PROOF_AS_OF = "2026-05";

/** Rounded-DOWN real monthly users. ~842 → "800+". */
export const RECRUITS_PER_MONTH = 800;

/** Rounded-DOWN real monthly score checks (calculator_submit). ~4,251 → "4,000+". */
export const SCORE_CHECKS_PER_MONTH = 4000;

export const RECRUITS_PER_MONTH_LABEL = `${RECRUITS_PER_MONTH.toLocaleString()}+ recruits this month`;
export const SCORE_CHECKS_PER_MONTH_LABEL = `${SCORE_CHECKS_PER_MONTH.toLocaleString()}+ ASVAB score checks run in the last 30 days`;
