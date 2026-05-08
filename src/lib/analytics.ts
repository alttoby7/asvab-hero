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
  if (typeof window === "undefined") return;
  const gtag = window.gtag;
  if (typeof gtag !== "function") return;
  try {
    gtag("event", name, params);
  } catch {
    // swallow — analytics must never break the app
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
 * Funnel event names — single source of truth so the dashboard
 * ingestion can match exact strings.
 */
export const FunnelEvents = {
  PageViewTagged: "page_view_tagged",
  EmailCaptureShown: "email_capture_shown",
  EmailCaptureVisibleWithScore: "email_capture_visible_with_score",
  SignupComplete: "signup_complete",
  LoginComplete: "login_complete",
  DiagnosticStart: "diagnostic_start",
  DiagnosticComplete: "diagnostic_complete",
  TopicDrillStart: "topic_drill_start",
  TopicDrillComplete: "topic_drill_complete",
  PaywallShown: "paywall_shown",
  UpgradePageView: "upgrade_page_view",
  CheckoutStart: "checkout_start",
  CheckoutSuccess: "checkout_success",
  ProActive: "pro_active",
  AffiliateClick: "affiliate_click",
} as const;
