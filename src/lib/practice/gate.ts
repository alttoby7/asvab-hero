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
    if (isAuthed && freeDiagnosticUsedAt) {
      return { allowed: false, reason: "free_diagnostic_used" };
    }
    if (!isAuthed && anonDiagnosticUsedLocally) {
      return { allowed: false, reason: "anon_diagnostic_used" };
    }
    return { allowed: true };
  }

  // Every other variant is Pro-only for free/anon users. This includes the WS6
  // adaptive AFQT variant (`afqt_adaptive`): it is intentionally a Pro-only
  // variant, consistent with subtest_drill and the other v2/v3 variants. Pro
  // users are already short-circuited to allowed above. No live effect while the
  // adaptive variant is inactive (the picker never offers it).
  return { allowed: false, reason: "pro_only_variant" };
}
