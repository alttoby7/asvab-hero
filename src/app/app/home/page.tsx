"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useSession } from "@/hooks/useSession";
import { useEntitlement } from "@/hooks/useEntitlement";
import { loadDeckSummaries } from "@/lib/flashcards/queries";
import { FREE_DECK_SLUG, type DeckSummary } from "@/lib/flashcards/types";
import { getDueMistakeCount, isClosedLoopEnabled } from "@/lib/mistakes/queries";
import { getHomeTrajectory } from "@/lib/trajectory/queries";
import type { HomeTrajectory } from "@/lib/trajectory/types";
import { getTrajectoryPrescription } from "@/lib/account/next-action";
import type { TopicStats } from "@/types";

import Link from "next/link";
import StatsRow from "@/components/app/StatsRow";
import GoalJobsTracker from "@/components/app/GoalJobsTracker";
import TrajectoryCard from "@/components/app/TrajectoryCard";
import PrescriptionCard from "@/components/app/PrescriptionCard";
import TestimonialPrompt from "@/components/app/TestimonialPrompt";
import MasteryMap from "@/components/app/MasteryMap";
import QuickActions from "@/components/app/QuickActions";

interface ProfileData {
  display_name: string | null;
  email: string;
  branch: string | null;
  target_test_date: string | null;
  target_test_date_bucket: string | null;
  study_days_per_week: number | null;
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

/** Days until the user's specific test date, when set; null otherwise. */
function daysToTestFrom(
  targetDate: string | null,
  bucket: string | null
): number | null {
  if (targetDate) {
    return Math.max(
      0,
      Math.ceil((new Date(targetDate).getTime() - Date.now()) / 86400000)
    );
  }
  // Coarse mapping from bucket so urgency still reflects intent.
  switch (bucket) {
    case "lt_30":
      return 21;
    case "30_90":
      return 60;
    default:
      return null;
  }
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
  const [todaysChallenge, setTodaysChallenge] =
    useState<DailyChallengeRow | null>(null);
  const [flashcardSummaries, setFlashcardSummaries] = useState<DeckSummary[]>(
    []
  );
  const [dueMistakeCount, setDueMistakeCount] = useState(0);
  const [trajectory, setTrajectory] = useState<HomeTrajectory | null>(null);
  // Bump to re-run the loader after a target-job mutation.
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (sessionLoading || entLoading) return;
    if (!session) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const userId = session.user.id;

    async function load() {
      const [
        profileRes,
        attemptsRes,
        statsRes,
        topicsRes,
        dailyRes,
        flashRes,
        dueCountRes,
        trajectoryRes,
      ] = await Promise.all([
        sb
          .from("profiles")
          .select(
            "display_name,email,branch,target_test_date,target_test_date_bucket,study_days_per_week,streak_count,last_challenge_completed_on,onboarding_completed_at"
          )
          .eq("user_id", userId)
          .single(),
        sb
          .from("attempts")
          .select(
            "id,variant_code,completed_at,question_count,correct_count,afqt_estimate"
          )
          .eq("user_id", userId)
          .order("completed_at", { ascending: false })
          .limit(20),
        sb
          .from("topic_stats")
          .select(
            "topic_id,seen,correct,posterior,confidence,priority,status,last_seen_at,updated_at"
          )
          .eq("user_id", userId),
        sb.from("topics").select("id,subtest,slug,title").eq("active", true),
        sb
          .from("daily_challenges")
          .select("status")
          .eq("user_id", userId)
          .eq("challenge_date", new Date().toISOString().split("T")[0])
          .maybeSingle(),
        loadDeckSummaries(userId),
        getDueMistakeCount(userId),
        // Single source of truth for standing + projected + target-job gaps.
        // No client-side score math remains in home.
        getHomeTrajectory(sb).catch(() => null),
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
      setDueMistakeCount(dueCountRes ?? 0);
      setTrajectory(trajectoryRes ?? null);
      setLoading(false);
    }

    load();
  }, [session, sessionLoading, entLoading, router, refreshKey]);

  if (sessionLoading || entLoading || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-sm text-text-tertiary">Loading…</div>
      </div>
    );
  }

  if (!session || !profile) return null;

  const { isPro } = entitlement;
  const closedLoopEnabled = isClosedLoopEnabled();
  const greeting = profile.display_name || profile.email.split("@")[0];
  const countdown = getTestDateCountdown(
    profile.target_test_date,
    profile.target_test_date_bucket
  );
  const daysToTest = daysToTestFrom(
    profile.target_test_date,
    profile.target_test_date_bucket
  );

  // Attempt stats (display only — NOT used to derive standing; the RPC does that)
  const diagnostics = attempts.filter((a) => a.variant_code === "diagnostic");
  const latestDiagnostic = diagnostics[0] ?? null;
  const previousDiagnostic = diagnostics[1] ?? null;
  const totalQ = attempts.reduce((s, a) => s + a.question_count, 0);
  const totalC = attempts.reduce((s, a) => s + a.correct_count, 0);
  const accuracy = totalQ > 0 ? Math.round((totalC / totalQ) * 100) : null;

  // Daily challenge done-today (shown on the Your Plan card below).
  const dailyDoneToday =
    todaysChallenge?.status === "completed" ||
    isToday(profile.last_challenge_completed_on);

  // Mistake count (lifetime, for QuickActions fallback)
  const mistakeCount = attempts.reduce(
    (sum, a) => sum + (a.question_count - a.correct_count),
    0
  );

  // Flashcard due count
  const accessibleDecks = isPro
    ? flashcardSummaries
    : flashcardSummaries.filter((s) => s.deck.slug === FREE_DECK_SLUG);
  const flashcardDueCount = accessibleDecks.reduce((s, d) => s + d.due, 0);

  // Today's prescription — derived from the trajectory snapshot (no score math
  // here; getTrajectoryPrescription is a pure function over RPC data).
  const standing = trajectory?.current_standing ?? null;
  const prescription = getTrajectoryPrescription({
    subtestEstimates: standing?.subtest_estimates ?? {},
    confidence: standing?.overall_confidence ?? "low",
    dueMistakeCount,
    attemptCount: standing?.attempt_count ?? attempts.length,
    targetJobs: trajectory?.target_jobs ?? [],
    studyDaysPerWeek: profile.study_days_per_week,
    daysToTest,
  });

  // Testimonial prompt — only after a genuine win (a 7-day streak, or a 2nd
  // diagnostic that improved). The component itself shows once (localStorage).
  const earliestDiagnostic = diagnostics[diagnostics.length - 1] ?? null;
  let testimonialContext: string | null = null;
  let testimonialHeadline = "";
  if (profile.streak_count >= 7) {
    testimonialContext = "streak_7";
    testimonialHeadline = `You're on a ${profile.streak_count}-day streak.`;
  } else if (
    diagnostics.length >= 2 &&
    latestDiagnostic?.afqt_estimate != null &&
    earliestDiagnostic?.afqt_estimate != null &&
    latestDiagnostic.afqt_estimate > earliestDiagnostic.afqt_estimate
  ) {
    testimonialContext = "afqt_improved";
    testimonialHeadline = "Your AFQT is climbing.";
  }

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

      {/* Testimonial prompt — only after a genuine win. */}
      {testimonialContext && (
        <TestimonialPrompt
          userId={session.user.id}
          context={testimonialContext}
          headline={testimonialHeadline}
        />
      )}

      {/* Today's Prescription (single highest-leverage action) */}
      <PrescriptionCard prescription={prescription} />

      {/* Your Plan — the routine contract (replaces the old Mission card so the
          page has one hero action above + one "see the whole method" link). */}
      <div className="rounded-2xl border border-navy-border bg-navy-light p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-bold text-text-primary">
              Your Plan
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              Your full weekly routine — exactly what to do today and this week.
            </p>
          </div>
          <Link
            href="/app/plan"
            className="shrink-0 rounded-lg bg-navy-lighter px-4 py-2 text-sm font-semibold text-text-primary no-underline transition-colors hover:bg-navy-border"
          >
            See your plan
          </Link>
        </div>
        <Link
          href="/app/daily"
          className="mt-4 inline-flex items-center gap-2 text-sm text-text-secondary no-underline transition-colors hover:text-text-primary"
        >
          {dailyDoneToday
            ? "Daily challenge — done for today ✓"
            : "Daily challenge — ready"}
          {profile.streak_count > 0 && (
            <span className="text-text-tertiary">
              · {profile.streak_count}-day streak
            </span>
          )}
        </Link>
      </div>

      {/* Stats */}
      <StatsRow
        streakCount={profile.streak_count}
        latestAfqt={latestDiagnostic?.afqt_estimate ?? null}
        previousAfqt={previousDiagnostic?.afqt_estimate ?? null}
        accuracy={accuracy}
        totalQuestions={totalQ}
      />

      {/* Trajectory — band + confidence only */}
      {standing && (
        <TrajectoryCard
          currentStanding={standing}
          projectedTestDay={trajectory?.projected_test_day ?? null}
        />
      )}

      {/* Quick Actions */}
      <QuickActions
        flashcardDueCount={flashcardDueCount}
        mistakeCount={mistakeCount}
        dueMistakeCount={dueMistakeCount}
        closedLoopEnabled={closedLoopEnabled}
        isPro={isPro}
      />

      {/* Goal Jobs Tracker (up to 3) */}
      <GoalJobsTracker
        targetJobs={trajectory?.target_jobs ?? []}
        profileBranch={profile.branch}
        onChanged={() => setRefreshKey((k) => k + 1)}
      />

      {/* Mastery Map */}
      <MasteryMap topicStats={topicStats} topics={topics} isPro={isPro} />
    </div>
  );
}
