"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { isClosedLoopEnabled } from "@/lib/mistakes/queries";
import { getHomeTrajectory } from "@/lib/trajectory/queries";
import { isGtPrepMode } from "@/lib/trajectory/gt-target-mode";
import MistakeReviewEngine from "@/components/mistakes/MistakeReviewEngine";

export default function MistakesPage() {
  const router = useRouter();
  const { session, loading: sessionLoading } = useSession();
  const [ready, setReady] = useState(false);
  // GT Target Mode: ordered AR/WK/PC (weakest first) to front the review queue.
  const [prioritySubtests, setPrioritySubtests] = useState<
    string[] | undefined
  >(undefined);

  useEffect(() => {
    if (sessionLoading) return;
    // Build-time kill switch: until flipped, the loop is dark.
    if (!isClosedLoopEnabled()) {
      router.replace("/app/home");
      return;
    }
    if (!session) {
      router.replace("/login?next=/app/mistakes");
      return;
    }

    async function guard() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sb = getSupabaseBrowserClient() as any;
      const { data } = await sb
        .from("profiles")
        .select("onboarding_completed_at,test_type,branch")
        .eq("user_id", session!.user.id)
        .single();
      if (data?.onboarding_completed_at == null) {
        router.replace("/onboarding");
        return;
      }

      // GT users: front the queue with the weakest GT subtests (AR/WK/PC by
      // lowest current point). Best-effort, failure just falls back to default.
      if (isGtPrepMode(data.test_type ?? null, data.branch ?? null)) {
        try {
          const traj = await getHomeTrajectory(sb);
          const est = traj?.current_standing?.subtest_estimates ?? {};
          const order = (["AR", "WK", "PC"] as const)
            .map((st) => ({ st, point: est[st]?.point ?? Infinity }))
            .sort((a, b) => a.point - b.point)
            .map((x) => x.st);
          setPrioritySubtests(order);
        } catch {
          /* fall back to default ordering */
        }
      }

      setReady(true);
    }
    guard();
  }, [session, sessionLoading, router]);

  if (sessionLoading || !ready) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-sm text-text-tertiary">Loading…</div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="font-display text-lg font-bold text-text-primary sm:text-xl">
          Review your mistakes
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Questions you missed, brought back on a spaced schedule until you own them.
        </p>
      </div>
      <MistakeReviewEngine
        userId={session.user.id}
        prioritySubtests={prioritySubtests}
      />
    </div>
  );
}
