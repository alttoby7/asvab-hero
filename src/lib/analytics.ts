/**
 * Minimal GA4 event helper. No-ops when gtag is unavailable
 * (SSR, static export prerender, or local dev without the script loaded).
 * Never throws.
 */

type GtagParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    // GA4 injects window.gtag via the googletagmanager script.
    gtag?: (command: "event", eventName: string, params?: GtagParams) => void;
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
