"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { useEntitlement } from "@/hooks/useEntitlement";
import { setAnalyticsUser, trackEvent, FunnelEvents } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

function deriveTag(pathname: string): string {
  if (pathname === "/") return "home";
  const segs = pathname.split("/").filter(Boolean);
  if (segs[0] === "study" && segs.length >= 3) {
    return `study_${segs[1]}_${segs[2]}`;
  }
  if (segs[0] === "account") {
    return segs[1] ? `account_${segs[1]}` : "account";
  }
  return segs.join("_");
}

/**
 * Mounted once at the layout root. Two jobs:
 * 1. Push user_id + user_tier to GA4 so logged-in funnel events
 *    are attributable across sessions.
 * 2. Fire page_view_tagged with a derived page_tag on route change
 *    so the dashboard can bucket landing-page intent.
 */
export function AnalyticsUserBinder(): null {
  const { user, loading: sessionLoading } = useSession();
  const { entitlement, loading: entLoading } = useEntitlement();
  const pathname = usePathname();

  useEffect(() => {
    if (sessionLoading || entLoading) return;
    if (!user) {
      setAnalyticsUser(null, "anon");
      return;
    }
    setAnalyticsUser(user.id, entitlement.isPro ? "pro" : "free");
  }, [user, entitlement.isPro, sessionLoading, entLoading]);

  useEffect(() => {
    if (!pathname) return;
    // Lever E: record first-touch (once) + refresh current_origin on any
    // ?origin= handoff. Idempotent + best-effort; never throws.
    captureAttribution();
    trackEvent(FunnelEvents.PageViewTagged, {
      page_tag: deriveTag(pathname),
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}
