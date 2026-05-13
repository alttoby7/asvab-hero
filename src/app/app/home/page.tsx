"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useSession } from "@/hooks/useSession";
import { useEntitlement } from "@/hooks/useEntitlement";
import { estimateStandardScores } from "@/lib/estimate-scores";
import { loadDeckSummaries } from "@/lib/flashcards/queries";
import { FREE_DECK_SLUG, type DeckSummary } from "@/lib/flashcards/types";
import type { TopicStats, SubtestScores } from "@/types";

import MissionCard from "@/components/app/MissionCard";
import StatsRow from "@/components/app/StatsRow";
import JobGoalCard from "@/components/app/JobGoalCard";
import MasteryMap from "@/components/app/MasteryMap";
import QuickActions from "@/components/app/QuickActions";

interface ProfileData {
  display_name: string | null;
  email: string;
  branch: string | null;
  target_test_date: string | null;
  target_test_date_bucket: string | null;
  streak_count: number;
  last_challenge_completed_on: string | null;
  onboarding_completed_at: string | null;
}

interface AttemptRow {
  id: string;
  variant_code: string;
  completed_at: string;
  question_count: number;
  correct_count: number;
  afqt_estimate: number | null;
  results_by_subtest: Record<string, { seen: number; correct: number }>;
}

interface TopicRow {
  id: string;
  subtest: string;
  slug: string;
  title: string;
}

interface DailyChallengeRow {
  status: string;
}

function getTestDateCountdown(
  targetDate: string | null,
  bucket: string | null
): string | null {
  if (targetDate) {
    const diff = Math.ceil(
      (new Date(targetDate).getTime() - Date.now()) / 86400000
    );
    if (diff <= 0) return "Test day is here";
    return `${diff} day${diff === 1 ? "" : "s"} until your test`;
  }
  if (bucket) {
    const labels: Record<string, string> = {
      lt_30: "Test coming up in < 30 days",
      "30_90": "Test in 1–3 months",
      "90_180": "Test in 3–6 months",
      gt_180: "Test in 6+ months",
    };
    return labels[bucket] ?? null;
  }
  return null;
}

function isToday(dateStr: string | null): boolean {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

export default function AppHomePage() {
  const router = useRouter();
  const { session, loading: sessionLoading } = useSession();
  const { entitlement, loading: entLoading } = useEntitlement();
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [attempts, setAttempts] = useState<AttemptRow[]>([]);
  const [topicStats, setTopicStats] = useState<TopicStats[]>([]);
  const [topics, setTopics] = useState<TopicRow[]>([]);
  const [todaysChallenge, setTodaysChallenge] = useState<DailyChallengeRow | null>(null);
  const [flashcardSummaries, setFlashcardSummaries] = useState<DeckSummary[]>([]);

  useEffect(() => {
    if (sessionLoading || entLoading) return;
    if (!session) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const userId = session.user.id;

    async function load() {
      const [profileRes, attemptsRes, statsRes, topicsRes, dailyRes, flashRes] =
        await Promise.all([
          sb
            .from("profiles")
            .select(
              "display_name,email,branch,target_test_date,target_test_date_bucket,streak_count,last_challenge_completed_on,onboarding_completed_at"
            )
            .eq("user_id", userId)
            .single(),
          sb
            .from("attempts")
            .select(
              "id,variant_code,completed_at,question_count,correct_count,afqt_estimate,results_by_subtest"
            )
            .eq("user_id", userId)
            .order("completed_at", { ascending: false })
            .limit(20),
          sb
            .from("topic_stats")
            .select("topic_id,seen,correct,posterior,confidence,priority,status,last_seen_at,updated_at")
            .eq("user_id", userId),
          sb.from("topics").select("id,subtest,slug,title").eq("active", true),
          sb
            .from("daily_challenges")
            .select("status")
            .eq("user_id", userId)
            .eq("challenge_date", new Date().toISOString().split("T")[0])
            .maybeSingle(),
          loadDeckSummaries(userId),
        ]);

      // Onboarding guard
      if (profileRes.data?.onboarding_completed_at == null) {
        router.replace("/onboarding");
        return;
      }

      setProfile(profileRes.data);
      setAttempts(attemptsRes.data ?? []);
      setTopicStats(
        (statsRes.data ?? []).map((s: Record<string, unknown>) => ({
          ...s,
          topic_id: s.topic_id,
        })) as TopicStats[]
      );
      setTopics(topicsRes.data ?? []);
      setTodaysChallenge(dailyRes.data ?? null);
      setFlashcardSummaries(flashRes ?? []);
      setLoading(false);
    }

    load();
  }, [session, sessionLoading, entLoading, router]);

  if (sessionLoading || entLoading || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-sm text-text-tertiary">Loading…</div>
      </div>
    );
  }

  if (!session || !profile) return null;

  const { isPro } = entitlement;
  const greeting = profile.display_name || profile.email.split("@")[0];
  const countdown = getTestDateCountdown(
    profile.target_test_date,
    profile.target_test_date_bucket
  );

  // Attempt stats
  const diagnostics = attempts.filter((a) => a.variant_code === "diagnostic");
  const hasDiagnostic = diagnostics.length > 0;
  const latestDiagnostic = diagnostics[0] ?? null;
  const previousDiagnostic = diagnostics[1] ?? null;
  const totalQ = attempts.reduce((s, a) => s + a.question_count, 0);
  const totalC = attempts.reduce((s, a) => s + a.correct_count, 0);
  const accuracy = totalQ > 0 ? Math.round((totalC / totalQ) * 100) : null;

  // Weak topic
  const weakStats = [...topicStats]
    .filter((ts) => ts.priority > 0 && ts.seen >= 3)
    .sort((a, b) => b.priority - a.priority);
  const weakest = weakStats[0] ?? null;
  const weakestTopic = weakest
    ? topics.find((t) => t.id === weakest.topic_id)
    : null;

  // Mission state
  const dailyDoneToday =
    todaysChallenge?.status === "completed" ||
    isToday(profile.last_challenge_completed_on);

  type MissionState =
    | "no_diagnostic"
    | "daily_available"
    | "daily_done"
    | "keep_practicing";

  let missionState: MissionState;
  if (!hasDiagnostic) {
    missionState = "no_diagnostic";
  } else if (dailyDoneToday) {
    missionState = "daily_done";
  } else {
    missionState = "daily_available";
  }

  // Estimated scores for job gap analysis
  const estimatedScores: SubtestScores | null = latestDiagnostic
    ? estimateStandardScores(
        latestDiagnostic.results_by_subtest as Record<
          string,
          { seen: number; correct: number }
        >
      )
    : null;

  // Mistake count
  const mistakeCount = attempts.reduce((sum, a) => {
    return sum + (a.question_count - a.correct_count);
  }, 0);

  // Flashcard due count
  const accessibleDecks = isPro
    ? flashcardSummaries
    : flashcardSummaries.filter((s) => s.deck.slug === FREE_DECK_SLUG);
  const flashcardDueCount = accessibleDecks.reduce((s, d) => s + d.due, 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 space-y-5">
      {/* Greeting */}
      <div>
        <h1 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
          Hey, {greeting}
        </h1>
        {countdown && (
          <p className="mt-1 text-sm text-text-secondary">{countdown}</p>
        )}
      </div>

      {/* Today's Mission */}
      <MissionCard
        state={missionState}
        streakCount={profile.streak_count}
        weakestTopicTitle={weakestTopic?.title ?? null}
        weakestSubtest={weakestTopic?.subtest ?? null}
        isPro={isPro}
      />

      {/* Stats */}
      <StatsRow
        streakCount={profile.streak_count}
        latestAfqt={latestDiagnostic?.afqt_estimate ?? null}
        previousAfqt={previousDiagnostic?.afqt_estimate ?? null}
        accuracy={accuracy}
        totalQuestions={totalQ}
      />

      {/* Quick Actions */}
      <QuickActions
        flashcardDueCount={flashcardDueCount}
        mistakeCount={mistakeCount}
        isPro={isPro}
      />

      {/* Job Goal */}
      <JobGoalCard
        profileBranch={profile.branch}
        estimatedScores={estimatedScores}
        isPro={isPro}
      />

      {/* Mastery Map */}
      <MasteryMap topicStats={topicStats} topics={topics} isPro={isPro} />
    </div>
  );
}
