/**
 * Minimal GA4 event helper. No-ops when gtag is unavailable
 * (SSR, static export prerender, or local dev without the script loaded).
 * Never throws.
 */

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: "event" | "set" | "config" | "consent",
      target: string | GtagParams,
      params?: GtagParams,
    ) => void;
  }
}

export function trackEvent(name: string, params?: GtagParams): void {
  // 1) GA4, unchanged existing behaviour. Fires for EVERY event name.
  if (typeof window !== "undefined") {
    const gtag = window.gtag;
    if (typeof gtag === "function") {
      try {
        gtag("event", name, params);
      } catch {
        // swallow, analytics must never break the app
      }
    }
  }
  // 2) Dual-write to our own first-party pipeline IFF it's a known paywall
  //    event. Fully isolated + swallowed (see enqueue). Additive: GA4 above
  //    is never affected by anything here.
  try {
    if (ALLOWED_EVENT_NAMES.has(name)) {
      enqueue(name as AnalyticsEventName, sanitizeProps(params));
    }
  } catch {
    // swallow, first-party emission must never break the app or GA4
  }
}

/**
 * Bind the current user to GA4. Pass null to clear (logout).
 * Sets user_id (event-scoped) + user_properties (user-scoped).
 */
export function setAnalyticsUser(
  userId: string | null,
  userTier: "free" | "pro" | "anon",
): void {
  if (typeof window === "undefined") return;
  const gtag = window.gtag;
  if (typeof gtag !== "function") return;
  try {
    gtag("set", { user_id: userId ?? undefined });
    gtag("set", "user_properties", { user_tier: userTier });
  } catch {
    // swallow
  }
}

/**
 * Funnel event names, single source of truth so the dashboard
 * ingestion can match exact strings.
 */
export const FunnelEvents = {
  PageViewTagged: "page_view_tagged",
  EmailCaptureShown: "email_capture_shown",
  EmailCaptureSubmit: "email_capture_submit",
  EmailCaptureVisibleWithScore: "email_capture_visible_with_score",
  SignupComplete: "signup_complete",
  LoginComplete: "login_complete",
  DiagnosticStart: "diagnostic_start",
  DiagnosticComplete: "diagnostic_complete",
  TopicDrillStart: "topic_drill_start",
  TopicDrillComplete: "topic_drill_complete",
  StudyGuideView: "study_guide_view",
  StudyGuideMarkedStudied: "study_guide_marked_studied",
  DiagramQuizAnswered: "diagram_quiz_answered",
  DiagramPracticeClick: "diagram_practice_click",
  DiagramNextStep: "diagram_next_step",
  PaywallShown: "paywall_shown",
  UpgradePageView: "upgrade_page_view",
  CheckoutStart: "checkout_start",
  CheckoutSuccess: "checkout_success",
  ProActive: "pro_active",
  AffiliateClick: "affiliate_click",
} as const;

// =====================================================================
// Paywall "why-tracking", first-party event pipeline (additive to GA4)
// Spec: Personal/asvab-hero/why-tracking-spec-2026-05-20.md
//
// SAFETY: every code path below is fully isolated and swallowed. A failure
// here can NEVER affect the paywall render, the upgrade flow, or checkout.
// The kill switch (analyticsEnabled) fully disables first-party emission;
// GA4 keeps firing regardless.
// =====================================================================

/** Single client kill-switch. When the build-time flag is unset, ALL
 *  first-party emission no-ops (GA4 stays on, surveys never mount). */
function analyticsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_WHY_TRACKING_ENABLED === "true";
}

export type AuthState = "anon" | "free" | "trial" | "pro";

export type EntrySurface =
  | "practice_test"
  | "free_practice_test"
  | "afct"
  | "upgrade_page"
  | "pricing";

/** One event in the batch envelope POSTed to /api/events. */
export interface AnalyticsEvent {
  event_name: AnalyticsEventName;
  session_id: string;
  paywall_context_id?: string;
  client_ts: string;
  props?: Record<string, string | number | boolean>;
}

export const PaywallEvents = {
  PaywallViewed: "paywall_viewed",
  PaywallCtaUpgradeClick: "paywall_cta_upgrade_click",
  PaywallCtaSecondaryClick: "paywall_cta_secondary_click",
  PaywallBackClick: "paywall_back_click",
  PaywallDismissed: "paywall_dismissed",

  UpgradePageViewed: "upgrade_page_viewed",
  PricingScrolled50: "pricing_scrolled_50",
  PricingScrolled90: "pricing_scrolled_90",
  PlanToggled: "plan_toggled",
  FaqOpened: "faq_opened",
  EmailCaptureExitClick: "email_capture_exit_click",

  CheckoutClick: "checkout_click",
  CheckoutSessionCreated: "checkout_session_created",
  CheckoutRedirected: "checkout_redirected",
  CheckoutReturnedCancelled: "checkout_returned_cancelled",
  CheckoutReturnedError: "checkout_returned_error",
  CheckoutReturnedCompleted: "checkout_returned_completed",

  SurveyShown: "survey_shown",
  SurveyAnswered: "survey_answered",
  SurveyDismissed: "survey_dismissed",
} as const;

export type AnalyticsEventName =
  (typeof PaywallEvents)[keyof typeof PaywallEvents];

/** Server-side allow-list mirrored in functions/api/events.ts. Events not in
 *  this set are NOT dual-written. */
export const ALLOWED_EVENT_NAMES: ReadonlySet<string> = new Set(
  Object.values(PaywallEvents),
);

// ---------- session_id (§4.1) ----------
const SID_KEY = "asvabhero.analytics.sid.v1";
export function getSessionId(): string {
  if (typeof window === "undefined")
    return "00000000-0000-0000-0000-000000000000";
  try {
    let sid = localStorage.getItem(SID_KEY);
    if (!sid) {
      sid = crypto.randomUUID();
      localStorage.setItem(SID_KEY, sid);
    }
    return sid;
  } catch {
    return crypto.randomUUID();
  }
}

// ---------- paywall_context_id (§4.2) ----------
const PCID_KEY = "asvabhero.analytics.pcid.v1";

/** Mint once per journey at first paywall_viewed. Returns existing if present. */
export function ensurePaywallContextId(): string {
  if (typeof window === "undefined") return crypto.randomUUID();
  try {
    let pcid = sessionStorage.getItem(PCID_KEY);
    if (!pcid) {
      pcid = crypto.randomUUID();
      sessionStorage.setItem(PCID_KEY, pcid);
    }
    return pcid;
  } catch {
    return crypto.randomUUID();
  }
}

/** Adopt a pcid that arrived via URL (e.g. /upgrade?pcid=… or cancel return). */
export function adoptPaywallContextId(fromUrl: string | null): string {
  if (typeof window === "undefined") return fromUrl ?? crypto.randomUUID();
  if (fromUrl && /^[0-9a-f-]{36}$/i.test(fromUrl)) {
    try {
      sessionStorage.setItem(PCID_KEY, fromUrl);
    } catch {
      /* ignore */
    }
    return fromUrl;
  }
  return ensurePaywallContextId();
}

export function getPaywallContextId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(PCID_KEY);
  } catch {
    return null;
  }
}

// ---------- probable_reason_category classifier (§3.4) ----------
export type ProbableReasonCategory =
  | "needs_to_prove_value"
  | "value_proven_price"
  | "wrong_moment"
  | "feature_curiosity"
  | "high_intent_ready"
  | "unknown";

export interface PaywallContext {
  entry_surface: EntrySurface;
  auth_state: AuthState;
  latest_afqt_band: "<31" | "31-49" | "50-64" | "65-92" | "93+" | "none";
  free_value_received: "none" | "diagnostic" | "diagnostic+drills";
  landing_intent: "organic" | "calculator" | "study_guide" | "direct" | "email";
  qualified_jobs_band: "0" | "1-9" | "10-49" | "50+" | "unknown";
  variant: string;
  subtest: string | null;
  attempt_count: number;
  reason: string;
}

/** Flatten a PaywallContext into a GtagParams-safe object (null → omitted). */
export function paywallContextToProps(ctx: PaywallContext): GtagParams {
  return {
    entry_surface: ctx.entry_surface,
    auth_state: ctx.auth_state,
    latest_afqt_band: ctx.latest_afqt_band,
    free_value_received: ctx.free_value_received,
    landing_intent: ctx.landing_intent,
    qualified_jobs_band: ctx.qualified_jobs_band,
    variant: ctx.variant,
    ...(ctx.subtest ? { subtest: ctx.subtest } : {}),
    attempt_count: ctx.attempt_count,
    reason: ctx.reason,
  };
}

/** First match wins. Pure function. */
export function classifyProbableReason(
  ctx: PaywallContext,
): ProbableReasonCategory {
  if (ctx.reason === "free_user_no_diagnostic") return "wrong_moment";
  if (ctx.reason === "pro_only_variant" && ctx.free_value_received === "none")
    return "feature_curiosity";
  if (
    ctx.free_value_received !== "none" &&
    ctx.attempt_count >= 3 &&
    (ctx.auth_state === "free" || ctx.auth_state === "trial")
  )
    return "high_intent_ready";
  if (
    ctx.free_value_received !== "none" &&
    (ctx.qualified_jobs_band === "50+" ||
      ctx.qualified_jobs_band === "10-49")
  )
    return "value_proven_price";
  if (ctx.free_value_received !== "none") return "value_proven_price";
  if (ctx.free_value_received === "none" && ctx.attempt_count <= 1)
    return "needs_to_prove_value";
  return "unknown";
}

// ---------- props sanitiser (§4.3) ----------
const FORBIDDEN_KEY_RE = /email|name|phone|token|password/i;
const EMAILISH_RE = /@.+\./;

export function sanitizeProps(
  params?: GtagParams,
): Record<string, string | number | boolean> | undefined {
  if (!params) return undefined;
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined) continue;
    if (FORBIDDEN_KEY_RE.test(k)) continue;
    if (k === "email") continue;
    if (typeof v === "string") {
      if (EMAILISH_RE.test(v)) continue;
      out[k] = v;
    } else if (typeof v === "number" || typeof v === "boolean") {
      out[k] = v;
    }
  }
  return out;
}

// ---------- queue + batched flush (§4.3) ----------
let queue: AnalyticsEvent[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
const FLUSH_AFTER_MS = 5000;
const FLUSH_AT_N = 20;
const MAX_QUEUE = 100; // hard cap; drop-oldest beyond this

function enqueue(
  name: AnalyticsEventName,
  props?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  if (!analyticsEnabled()) return;
  try {
    queue.push({
      event_name: name,
      session_id: getSessionId(),
      paywall_context_id: getPaywallContextId() ?? undefined,
      client_ts: new Date().toISOString(),
      props,
    });
    if (queue.length > MAX_QUEUE) queue = queue.slice(-MAX_QUEUE);
    if (queue.length >= FLUSH_AT_N) flush();
    else if (!flushTimer) flushTimer = setTimeout(flush, FLUSH_AFTER_MS);
  } catch {
    // swallow
  }
}

/** Best-effort flush. Never awaited, never throws to caller. Exported so the
 *  checkout redirect path can beacon synchronously before navigation. */
export function flush(useBeacon = false): void {
  if (typeof window === "undefined") return;
  try {
    if (flushTimer) {
      clearTimeout(flushTimer);
      flushTimer = null;
    }
    if (queue.length === 0) return;
    const batch = queue;
    queue = [];
    const body = JSON.stringify({ events: batch });
    if (useBeacon && typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/events",
        new Blob([body], { type: "application/json" }),
      );
    } else {
      // keepalive lets the request survive a navigation; never awaited.
      fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // swallow, analytics must never break the app
  }
}

// Flush on tab hide / unload via sendBeacon (most reliable for the bounce case).
if (typeof window !== "undefined") {
  try {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") flush(true);
    });
    window.addEventListener("pagehide", () => flush(true));
  } catch {
    // swallow
  }
}
