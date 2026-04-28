/**
 * Pure, side-effect-free gate helpers for paywall enforcement.
 *
 * Import in components via useEntitlement() + useSession(); call canStartVariant()
 * before mounting the test engine.
 */

export type GateDecision =
  | { allowed: true }
  | {
      allowed: false;
      reason:
        | "anon_diagnostic_used"
        | "free_diagnostic_used"
        | "pro_only_variant"
        | "free_user_no_diagnostic";
    };

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
}): GateDecision {
  const { variantCode, isAuthed, isPro, freeDiagnosticUsedAt, anonDiagnosticUsedLocally } = opts;

  // Pro users bypass all gates.
  if (isPro) return { allowed: true };

  if (variantCode === "diagnostic") {
    // Authed free user who already ran their one diagnostic.
    if (isAuthed && freeDiagnosticUsedAt) {
      return { allowed: false, reason: "free_diagnostic_used" };
    }
    // Anonymous user who already ran a diagnostic in this browser.
    if (!isAuthed && anonDiagnosticUsedLocally) {
      return { allowed: false, reason: "anon_diagnostic_used" };
    }
    // Otherwise the diagnostic is allowed (first free run).
    return { allowed: true };
  }

  // Every other variant (subtest_drill, afqt_sprint, weakness_loop, retake_readiness, full_sim, etc.)
  // is Pro-only for free/anon users.
  return { allowed: false, reason: "pro_only_variant" };
}
