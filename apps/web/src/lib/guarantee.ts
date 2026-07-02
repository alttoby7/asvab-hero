/**
 * Single source of truth for the money-back guarantee.
 *
 * Unconditional, no-questions-asked, IDENTICAL on every tier (pass90, monthly,
 * retaker). No "improve your score or refund" condition — that's unverifiable
 * (it needs a logged official retest score), erodes trust, and invites disputes.
 * Honored as a simple Stripe refund within the window; one-time passes have
 * nothing to cancel. The Retaker Pass differentiates on 120 days + retaker prep,
 * NOT a special refund term.
 *
 * Every guarantee mention on the site should reference these constants so the
 * wording can't drift back into three contradictory versions.
 */
export const GUARANTEE_DAYS = 14;

/** Full sentence — use where a complete statement reads naturally. */
export const GUARANTEE_LINE = "14-day money-back guarantee — no questions asked.";

/** Inline tag — use inside price/feature lines (e.g. "$59 · 90 days · …"). */
export const GUARANTEE_TAG = "14-day money-back guarantee";
