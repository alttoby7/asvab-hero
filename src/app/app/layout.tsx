"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import AppNav from "@/components/AppNav";
import { AnalyticsUserBinder } from "@/components/AnalyticsUserBinder";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { session, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/login?next=/app/home");
    }
  }, [loading, session, router]);

  if (loading) {
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
