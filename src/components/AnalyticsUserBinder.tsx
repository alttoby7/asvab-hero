"use client";

import { useEffect } from "react";
import { useSession } from "@/hooks/useSession";
import { useEntitlement } from "@/hooks/useEntitlement";
import { setAnalyticsUser } from "@/lib/analytics";

/**
 * Mounted once at the layout root. Watches Supabase auth + entitlement
 * and pushes user_id + user_tier to GA4 so logged-in funnel events
 * are attributable across sessions.
 */
export function AnalyticsUserBinder(): null {
  const { user, loading: sessionLoading } = useSession();
  const { entitlement, loading: entLoading } = useEntitlement();

  useEffect(() => {
    if (sessionLoading || entLoading) return;
    if (!user) {
      setAnalyticsUser(null, "anon");
      return;
    }
    setAnalyticsUser(user.id, entitlement.isPro ? "pro" : "free");
  }, [user, entitlement.isPro, sessionLoading, entLoading]);

  return null;
}
