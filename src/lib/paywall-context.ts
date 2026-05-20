// Builds the §3.3 paywall_viewed context from client-side signals only.
//
// Best-effort + fully swallowed: any failure returns conservative defaults so a
// throw can never reach the paywall render. No PII — bands not raw scores.

import type {
  AuthState,
  EntrySurface,
  PaywallContext,
} from "@/lib/analytics";
import { HISTORY_KEY } from "@/lib/practice/profile-sync";

interface LocalAttempt {
  afqt_estimate?: number | null;
  variant_code?: string;
  subtest?: string | null;
  completed_at?: string;
}

function bandAfqt(
  afqt: number | null | undefined,
): PaywallContext["latest_afqt_band"] {
  if (afqt === null || afqt === undefined || !Number.isFinite(afqt))
    return "none";
  if (afqt < 31) return "<31";
  if (afqt <= 49) return "31-49";
  if (afqt <= 64) return "50-64";
  if (afqt <= 92) return "65-92";
  return "93+";
}

/** Coarse proxy for "how many jobs does this AFQT unlock" — bucketed off the
 *  AFQT band since exact job counts need branch context the paywall lacks. */
function bandJobs(
  afqt: number | null | undefined,
): PaywallContext["qualified_jobs_band"] {
  if (afqt === null || afqt === undefined || !Number.isFinite(afqt))
    return "unknown";
  if (afqt < 31) return "0";
  if (afqt <= 49) return "1-9";
  if (afqt <= 64) return "10-49";
  return "50+";
}

function readLocalHistory(): LocalAttempt[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as LocalAttempt[]) : [];
  } catch {
    return [];
  }
}

function readLandingIntent(): PaywallContext["landing_intent"] {
  if (typeof window === "undefined") return "direct";
  try {
    const raw = localStorage.getItem("asvabhero.last_capture_source");
    if (raw) {
      const parsed = JSON.parse(raw) as { source?: string };
      const s = (parsed.source || "").toLowerCase();
      if (s.includes("calculator")) return "calculator";
      if (s.includes("study")) return "study_guide";
      if (s) return "email";
    }
    const ref = document.referrer || "";
    if (ref && !ref.includes("asvabhero.com")) return "organic";
  } catch {
    /* swallow */
  }
  return "direct";
}

export function buildPaywallContext(opts: {
  entrySurface: EntrySurface;
  authState: AuthState;
  variant: string;
  subtest?: string | null;
  reason: string;
  freeDiagnosticUsedAt?: string | null;
}): PaywallContext {
  let latestAfqt: number | null = null;
  let attemptCount = 0;
  let hasDrills = false;
  try {
    const history = readLocalHistory();
    attemptCount = history.length;
    // latest scored attempt by completed_at
    const scored = history
      .filter((a) => typeof a.afqt_estimate === "number")
      .sort((a, b) =>
        (b.completed_at || "").localeCompare(a.completed_at || ""),
      );
    if (scored[0]) latestAfqt = scored[0].afqt_estimate ?? null;
    hasDrills = history.some(
      (a) => a.variant_code && a.variant_code !== "diagnostic",
    );
  } catch {
    /* defaults */
  }

  const usedDiagnostic =
    !!opts.freeDiagnosticUsedAt || latestAfqt !== null || attemptCount > 0;
  const freeValueReceived: PaywallContext["free_value_received"] = !usedDiagnostic
    ? "none"
    : hasDrills
      ? "diagnostic+drills"
      : "diagnostic";

  return {
    entry_surface: opts.entrySurface,
    auth_state: opts.authState,
    latest_afqt_band: bandAfqt(latestAfqt),
    free_value_received: freeValueReceived,
    landing_intent: readLandingIntent(),
    qualified_jobs_band: bandJobs(latestAfqt),
    variant: opts.variant,
    subtest: opts.subtest ?? null,
    attempt_count: attemptCount,
    reason: opts.reason,
  };
}

/** Map an entitlement/session state to AuthState. */
export function deriveAuthState(opts: {
  isAuthed: boolean;
  isPro: boolean;
  isTrial: boolean;
}): AuthState {
  if (!opts.isAuthed) return "anon";
  if (opts.isPro) return "pro";
  if (opts.isTrial) return "trial";
  return "free";
}
