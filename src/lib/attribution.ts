/**
 * Lightweight, GA4-only attribution capture (Lever E).
 *
 * Two localStorage records, both best-effort and never throwing:
 *   - `first_touch`  : the FIRST landing this browser ever made (utm + a coarse
 *                      referrer class + landing path). Set ONCE, never overwritten.
 *   - `current_origin`: the most recent in-app origin handoff (`?origin=...`),
 *                      generalizing the diagram-quiz scheme in
 *                      study-guide/diagrams/_kit.tsx. Overwritten on each touch,
 *                      14-day TTL (matches the `last_capture_source` convention).
 *
 * `getAttributionParams()` returns a FLAT, LOW-CARDINALITY param bag to merge into
 * conversion events (signup / checkout / paywall / session / official-score). We
 * deliberately DO NOT emit `origin_session` (a high-cardinality UUID) to GA4.
 */

const FIRST_TOUCH_KEY = "asvabhero.first_touch";
const CURRENT_ORIGIN_KEY = "asvabhero.current_origin";
const ORIGIN_TTL_MS = 14 * 24 * 60 * 60 * 1000;

type FirstTouch = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer_class: string;
  landing_path: string;
  captured_at: number;
};

type CurrentOrigin = {
  origin?: string;
  origin_topic?: string;
  captured_at: number;
};

/** Coarse, low-cardinality bucket for document.referrer. */
function classifyReferrer(referrer: string, host: string): string {
  if (!referrer) return "direct";
  let ref: URL;
  try {
    ref = new URL(referrer);
  } catch {
    return "other";
  }
  if (ref.hostname === host) return "internal";
  const h = ref.hostname.replace(/^www\./, "");
  if (/(^|\.)(google|bing|duckduckgo|yahoo|ecosia)\./.test(h)) return "google";
  if (
    /(^|\.)(facebook|instagram|t\.co|twitter|x\.com|tiktok|reddit|youtube|linkedin|pinterest)\./.test(
      h,
    )
  ) {
    return "social";
  }
  return "other";
}

/**
 * Call once per page load (idempotent). Records first-touch once and refreshes
 * `current_origin` whenever `?origin=` params are present in the URL.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const sp = new URLSearchParams(window.location.search);

    // --- first_touch (write once) ---
    if (!localStorage.getItem(FIRST_TOUCH_KEY)) {
      const ft: FirstTouch = {
        utm_source: sp.get("utm_source") ?? undefined,
        utm_medium: sp.get("utm_medium") ?? undefined,
        utm_campaign: sp.get("utm_campaign") ?? undefined,
        referrer_class: classifyReferrer(
          document.referrer || "",
          window.location.hostname,
        ),
        landing_path: window.location.pathname,
        captured_at: Date.now(),
      };
      localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(ft));
    }

    // --- current_origin (overwrite when an origin handoff is present) ---
    const origin = sp.get("origin");
    if (origin) {
      const co: CurrentOrigin = {
        origin,
        origin_topic: sp.get("origin_topic") ?? undefined,
        captured_at: Date.now(),
      };
      localStorage.setItem(CURRENT_ORIGIN_KEY, JSON.stringify(co));
    }
  } catch {
    /* best-effort: attribution must never break a page load */
  }
}

/**
 * Flat, low-cardinality params to merge into a conversion event's payload.
 * Safe on the server (returns {}). Never throws.
 */
export function getAttributionParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const out: Record<string, string> = {};
  try {
    const rawFt = localStorage.getItem(FIRST_TOUCH_KEY);
    if (rawFt) {
      const ft = JSON.parse(rawFt) as Partial<FirstTouch>;
      if (ft.utm_source) out.first_utm_source = ft.utm_source;
      if (ft.utm_medium) out.first_utm_medium = ft.utm_medium;
      if (ft.utm_campaign) out.first_utm_campaign = ft.utm_campaign;
      if (ft.referrer_class) out.referrer_class = ft.referrer_class;
      if (ft.landing_path) out.landing_path = ft.landing_path;
    }
    const rawCo = localStorage.getItem(CURRENT_ORIGIN_KEY);
    if (rawCo) {
      const co = JSON.parse(rawCo) as Partial<CurrentOrigin>;
      const ageMs = Date.now() - (co.captured_at ?? 0);
      if (co.origin && ageMs >= 0 && ageMs <= ORIGIN_TTL_MS) {
        out.origin = co.origin;
        if (co.origin_topic) out.origin_topic = co.origin_topic;
      }
    }
  } catch {
    /* ignore, return whatever we have */
  }
  return out;
}
