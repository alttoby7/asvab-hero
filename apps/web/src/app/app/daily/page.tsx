"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import DailyChallengeEngine from "@/components/daily-challenge/DailyChallengeEngine";

interface ProfileForDaily {
  streak_count: number;
  last_challenge_completed_on: string | null;
  onboarding_completed_at: string | null;
}

export default function DailyChallengePage() {
  const router = useRouter();
  const { session, loading: sessionLoading } = useSession();
  const [profile, setProfile] = useState<ProfileForDaily | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionLoading) return;
    if (!session) return;

    async function load() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sb = getSupabaseBrowserClient() as any;
      const { data } = await sb
        .from("profiles")
        .select("streak_count,last_challenge_completed_on,onboarding_completed_at")
        .eq("user_id", session!.user.id)
        .single();

      if (data?.onboarding_completed_at == null) {
        router.replace("/onboarding");
        return;
      }

      setProfile(data);
      setLoading(false);
    }

    load();
  }, [session, sessionLoading, router]);

  if (sessionLoading || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-sm text-text-tertiary">Loading…</div>
      </div>
    );
  }

  if (!session || !profile) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <DailyChallengeEngine
        userId={session.user.id}
        streakCount={profile.streak_count}
        lastChallengeCompletedOn={profile.last_challenge_completed_on}
      />
    </div>
  );
}
