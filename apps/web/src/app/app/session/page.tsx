"use client";

import Link from "next/link";
import { useSession } from "@/hooks/useSession";
import { useEntitlement } from "@/hooks/useEntitlement";
import { isDailySessionEnabled } from "@/lib/session/queries";
import SessionEngine from "@/components/session/SessionEngine";

export default function DailySessionPage() {
  const { session, loading: sessionLoading } = useSession();
  const { entitlement, loading: entLoading } = useEntitlement();

  if (sessionLoading || entLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-text-tertiary">
        Loading…
      </div>
    );
  }
  if (!session) return null;

  // Flag-gated surface (mirrors isAdaptiveEnabled / isClosedLoopEnabled). Off in
  // prod until flipped in the Cloudflare Pages build env + rebuilt.
  if (!isDailySessionEnabled()) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-bold text-text-primary">
          Daily sessions are coming soon
        </h1>
        <p className="mt-2 text-text-secondary">
          Your guided daily study path isn&apos;t live yet. In the meantime, your plan has today&apos;s next step.
        </p>
        <Link
          href="/app/home"
          className="mt-6 inline-block rounded-xl bg-accent px-6 py-3 font-display font-bold text-white no-underline transition-colors hover:bg-accent-hover"
        >
          Go to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <header className="mb-6">
        <h1 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
          Today&apos;s session
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          One path, start to finish. Follow it top to bottom, we&apos;ll line up tomorrow when you&apos;re done.
        </p>
      </header>
      <SessionEngine userId={session.user.id} isPro={entitlement.isPro} />
    </div>
  );
}
