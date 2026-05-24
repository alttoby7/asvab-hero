"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { syncLocalHistoryToRemote } from "@/lib/practice/profile-sync";
import AppNav from "@/components/AppNav";
import { AnalyticsUserBinder } from "@/components/AnalyticsUserBinder";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { session, loading } = useSession();
  const router = useRouter();
  // Gate children on the one-time anon→authed history migration so the first
  // /app page (e.g. /app/plan from the diagnostic results bridge) reads the
  // just-migrated attempt instead of racing it. Returns instantly when there's
  // no local history, so signed-up-and-returning users see no delay.
  const [migrating, setMigrating] = useState(true);

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/login?next=/app/home");
    }
  }, [loading, session, router]);

  useEffect(() => {
    if (loading) return;
    if (!session) {
      setMigrating(false);
      return;
    }
    let cancelled = false;
    syncLocalHistoryToRemote(session.user.id).finally(() => {
      if (!cancelled) setMigrating(false);
    });
    return () => {
      cancelled = true;
    };
  }, [loading, session]);

  if (loading || migrating) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy text-text-tertiary text-sm">
        Loading…
      </div>
    );
  }

  if (!session) return null;

  return (
    <>
      <AppNav />
      <main className="relative z-1 min-h-[calc(100vh-4rem)] pb-16 sm:pb-0">{children}</main>
      <AnalyticsUserBinder />
    </>
  );
}
