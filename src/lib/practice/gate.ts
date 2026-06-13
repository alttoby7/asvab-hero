/**
 * Pure, side-effect-free gate helpers for paywall enforcement.
 */

export type GateDecision =
  | { allowed: true }
  | {
      allowed: false;
      reason:
        | "anon_diagnostic_used"
        | "free_diagnostic_used"
        | "pro_only_variant"
        | "free_user_no_diagnostic"
        | "free_adaptive_daily_limit"
        | "adaptive_needs_account";
    };

/** The free adaptive AFQT core: one block per day for signed-in free users. */
export const FREE_ADAPTIVE_DAILY_LIMIT = 1;

/** The score-moving mechanism is free; Pro gates scale (more blocks, sims, analytics).
 * All adaptive variants count as the free daily core: afqt_adaptive (initial
 * ASVAB) + gt_adaptive (AFCT GT/General) + rating_adaptive (Navy/CG rating). */
export const ADAPTIVE_VARIANT = "afqt_adaptive";
export const ADAPTIVE_VARIANTS = [
  "afqt_adaptive",
  "gt_adaptive",
  "rating_adaptive",
] as const;
export function isAdaptiveVariant(code: string): boolean {
  return (ADAPTIVE_VARIANTS as readonly string[]).includes(code);
}

export const ANON_DIAGNOSTIC_USED_KEY = "asvabhero.anonDiagnosticUsed";

export function markAnonDiagnosticUsed(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ANON_DIAGNOSTIC_USED_KEY, "1");
  } catch {
    /* storage unavailable */
  }
}

export function checkAnonDiagnosticUsed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(ANON_DIAGNOSTIC_USED_KEY) === "1";
  } catch {
    return false;
  }
}

export function canStartVariant(opts: {
  variantCode: string;
  isAuthed: boolean;
  isPro: boolean;
  freeDiagnosticUsedAt: string | null;
  anonDiagnosticUsedLocally: boolean;
  /** Count of adaptive AFQT blocks this user already completed today (local). */
  adaptiveUsedToday?: number;
}): GateDecision {
  const {
    variantCode,
    isAuthed,
    isPro,
    freeDiagnosticUsedAt,
    anonDiagnosticUsedLocally,
    adaptiveUsedToday = 0,
  } = opts;

  // Pro users bypass all gates.
  if (isPro) return { allowed: true };

  if (variantCode === "diagnostic") {
    if (isAuthed && freeDiagnosticUsedAt) {
      return { allowed: false, reason: "free_diagnostic_used" };
    }
    if (!isAuthed && anonDiagnosticUsedLocally) {
      return { allowed: false, reason: "anon_diagnostic_used" };
    }
    return { allowed: true };
  }

  // Adaptive AFQT is the FREE score-moving core (locked decision: the mechanism
  // that raises scores is free; Pro gates scale). Signed-in free users get one
  // block/day; beyond that, upgrade for unlimited. Anon users need an account
  // (adaptive reads their mastery model).
  if (isAdaptiveVariant(variantCode)) {
    if (!isAuthed) return { allowed: false, reason: "adaptive_needs_account" };
    if (adaptiveUsedToday >= FREE_ADAPTIVE_DAILY_LIMIT) {
      return { allowed: false, reason: "free_adaptive_daily_limit" };
    }
    return { allowed: true };
  }

  // Every other variant (subtest_drill, full_sim, …) is Pro-only for free/anon
  // users, paid gates scale/intensity. Pro is already short-circuited above.
  return { allowed: false, reason: "pro_only_variant" };
}

// ─── Daily Study Session gating ──────────────────────────────────────────────
//
// Free users get a genuine TASTE of the mission loop, then the full prescribed
// loop is the core Pro value (locked decision: "free taste, Pro full loop").
// Free taste = the warm-up (due mistakes), the prescribed micro-lesson, and the
// first focused drill; the timed block + the debrief/next-day scheduling (the
// retention engine) are Pro. The baseline diagnostic is always free, everyone
// needs a standing before the loop can prescribe anything.
const FREE_SESSION_STATIONS = new Set<string>([
  "warmup",
  "lesson",
  "drill",
  "diagnostic",
]);

export function canAccessSessionStation(
  stationKind: string,
  isPro: boolean,
): GateDecision {
  if (isPro) return { allowed: true };
  if (FREE_SESSION_STATIONS.has(stationKind)) return { allowed: true };
  return { allowed: false, reason: "pro_only_variant" };
}
