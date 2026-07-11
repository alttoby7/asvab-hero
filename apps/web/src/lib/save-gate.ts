/**
 * Save-gate feature flags.
 *
 * The "gate the saved result" growth lever: let visitors compute their score
 * for free (keeps the SEO value and the "aha"), but require a FREE account to
 * KEEP and ACT on it — save the result, see the full qualifying-jobs list, and
 * unlock the personalized study plan. This gates the follow-through, not the
 * calculation. It is the free-account gate, NOT the paid Stripe paywall.
 *
 * Two gate points, each independently toggleable so the calculator gate can be
 * A/B tested first (the highest-traffic surface) before the diagnostic gate is
 * turned on:
 *   - NEXT_PUBLIC_SAVE_GATE_CALCULATOR_ENABLED  → gate the calculator jobs list
 *   - NEXT_PUBLIC_SAVE_GATE_DIAGNOSTIC_ENABLED  → gate the diagnostic report
 * A master switch (NEXT_PUBLIC_SAVE_GATE_ENABLED) can force both on at once; a
 * per-surface flag still turns its own surface on independently of the master.
 *
 * Read at build time (static export), so a flag is baked into the bundle. All
 * three default OFF: with nothing set the site behaves exactly as it does today.
 */

function flagOn(value: string | undefined): boolean {
  return value === "true";
}

/** Master switch: when true, both gate surfaces are on. */
export function isSaveGateEnabled(): boolean {
  return flagOn(process.env.NEXT_PUBLIC_SAVE_GATE_ENABLED);
}

/**
 * Gate point A — the calculator qualifying-jobs list. Anonymous visitors see
 * the headline score plus a teaser (count + top 3 jobs) free; the full list,
 * saving, and the plan are behind a free account.
 */
export function isSaveGateCalculatorEnabled(): boolean {
  return (
    isSaveGateEnabled() ||
    flagOn(process.env.NEXT_PUBLIC_SAVE_GATE_CALCULATOR_ENABLED)
  );
}

/**
 * Gate point B — the free diagnostic / practice-test report.
 *
 * The anonymous soft-gate on the practice-test results (score shown free; the
 * weak-area breakdown + per-question review + plan require a free account) is
 * ALREADY LIVE in TestResults, keyed off whether the user is signed in — it is
 * not conditioned on this flag, so the diagnostic surface behaves the same with
 * the flag on or off. This flag is RESERVED so that surface can be toggled or
 * branched in a later A/B without another deploy; nothing reads it yet. It is
 * exported (and covered by the master switch) to keep the two-surface API
 * symmetric with the calculator gate. (The score number itself is never gated.)
 */
export function isSaveGateDiagnosticEnabled(): boolean {
  return (
    isSaveGateEnabled() ||
    flagOn(process.env.NEXT_PUBLIC_SAVE_GATE_DIAGNOSTIC_ENABLED)
  );
}
