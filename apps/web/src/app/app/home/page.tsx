"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useSession } from "@/hooks/useSession";
import { useEntitlement } from "@/hooks/useEntitlement";
import { trackEvent } from "@/lib/analytics";
import { loadDeckSummaries } from "@/lib/flashcards/queries";
import { FREE_DECK_SLUG, type DeckSummary } from "@/lib/flashcards/types";
import { getDueMistakeCount, isClosedLoopEnabled } from "@/lib/mistakes/queries";
import { isDailySessionEnabled } from "@/lib/session/queries";
import BandLadder from "@/components/session/BandLadder";
import { getHomeTrajectory } from "@/lib/trajectory/queries";
import type { HomeTrajectory } from "@/lib/trajectory/types";
import {
  isGtPrepMode,
  getGtRange,
  getGtConfidence,
  getEffectiveGtTarget,
  getGtGap,
  getGtProjection,
  GT_PROJECTION_REASON_COPY,
} from "@/lib/trajectory/gt-target-mode";
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
import LogOfficialScoresCard from "@/components/app/LogOfficialScoresCard";
import SetTestDateCard from "@/components/app/SetTestDateCard";
import { getScoreTimeline, type ScoreTimeline } from "@/lib/score-timeline/queries";

interface ProfileData {
  display_name: string | null;
  email: string;
  branch: string | null;
  test_type: string | null;
  target_test_date: string | null;
  target_test_date_bucket: string | null;
  target_gt_score: number | null;
  study_days_per_week: number | null;
  streak_count: number;
  last_challenge_completed_on: string | null;
  onboarding_completed_at: string | null;
  official_test_status: string | null;
}

interface AttemptRow {
  id: string;
  variant_code: string;
  completed_at: string;
  question_count: number;
  correct_count: number;
  afqt_estimate: number | null;
  test_type: string | null;
  primary_metric_code: string | null;
  primary_metric_estimate: number | null;
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

/** Coarse GT gap bucket for analytics. */
function gapBucket(gap: number | null): string {
  if (gap == null) return "unknown";
  if (gap <= 0) return "at_or_above";
  if (gap <= 5) return "1_5";
  if (gap <= 10) return "6_10";
  return "11_plus";
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
  const [scoreTimeline, setScoreTimeline] = useState<ScoreTimeline | null>(null);
  const [studyDayDates, setStudyDayDates] = useState<string[]>([]);
  // Bump to re-run the loader after a target-job mutation.
  const [refreshKey, setRefreshKey] = useState(0);
  // gt_target_mode_view fires once per data load.
  const gtViewTracked = useRef(false);

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
        studyDaysRes,
        scoreTimelineRes,
      ] = await Promise.all([
        sb
          .from("profiles")
          .select(
            "display_name,email,branch,test_type,target_test_date,target_test_date_bucket,target_gt_score,study_days_per_week,streak_count,last_challenge_completed_on,onboarding_completed_at,official_test_status"
          )
          .eq("user_id", userId)
          .single(),
        sb
          .from("attempts")
          .select(
            "id,variant_code,completed_at,question_count,correct_count,afqt_estimate,test_type,primary_metric_code,primary_metric_estimate"
          )
          .eq("user_id", userId)
          .order("completed_at", { ascending: false })
          .limit(50),
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
        // GT dose: study days for the projection guardrails.
        sb
          .from("study_days")
          .select("study_date")
          .eq("user_id", userId)
          .order("study_date", { ascending: false })
          .limit(120),
        // Official-score anchor + baseline for the trajectory hero card.
        getScoreTimeline(sb, userId).catch(() => null),
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
      setScoreTimeline(scoreTimelineRes ?? null);
      setStudyDayDates(
        (studyDaysRes.data ?? []).map((r: { study_date: string }) => r.study_date)
      );
      gtViewTracked.current = false;
      setLoading(false);
    }

    load();
  }, [session, sessionLoading, entLoading, router, refreshKey]);

  // gt_target_mode_view, fire once per load when the GT card has real data.
  useEffect(() => {
    if (loading || !profile || !trajectory) return;
    if (gtViewTracked.current) return;
    if (!isGtPrepMode(profile.test_type, profile.branch)) return;
    const s = trajectory.current_standing;
    if (!s || s.attempt_count === 0) return;
    gtViewTracked.current = true;
    const eff = getEffectiveGtTarget(
      profile.target_gt_score,
      trajectory.target_jobs ?? []
    );
    const conf = getGtConfidence(s.subtest_estimates);
    const range = getGtRange(s.subtest_estimates);
    const point =
      trajectory.primary_metric?.is_proxy &&
      trajectory.primary_metric.code === "GT"
        ? trajectory.primary_metric.current_value
        : range.point;
    const proj = getGtProjection({
      attempts: attempts.map((a) => ({
        primary_metric_code: a.primary_metric_code,
        primary_metric_estimate: a.primary_metric_estimate,
        completed_at: a.completed_at,
      })),
      studyDays: studyDayDates,
      targetGt: eff.target,
      studyDaysPerWeek: profile.study_days_per_week,
      gtConfidence: conf,
    });
    trackEvent("gt_target_mode_view", {
      branch: profile.branch ?? undefined,
      prep_test_type: profile.test_type ?? undefined,
      target_gt: eff.target ?? undefined,
      gap_bucket: gapBucket(getGtGap(point, eff.target)),
      confidence: conf,
      has_projection: proj.status === "available",
    });
  }, [loading, profile, trajectory, attempts, studyDayDates]);

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
  const dailySessionEnabled = isDailySessionEnabled();
  const greeting = profile.display_name || profile.email.split("@")[0];
  const countdown = getTestDateCountdown(
    profile.target_test_date,
    profile.target_test_date_bucket
  );
  const daysToTest = daysToTestFrom(
    profile.target_test_date,
    profile.target_test_date_bucket
  );

  // Attempt stats (display only, NOT used to derive standing; the RPC does that)
  const diagnostics = attempts.filter((a) => a.variant_code === "diagnostic");
  const latestDiagnostic = diagnostics[0] ?? null;
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

  // Today's prescription, derived from the trajectory snapshot (no score math
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

  // ── GT Target Mode derivations (Army/Marines AFCT) ────────────────────────
  const isGtMode = isGtPrepMode(profile.test_type, profile.branch);
  const gtSubtests = standing?.subtest_estimates ?? {};
  const gtRange = getGtRange(gtSubtests);
  const gtConfidence = getGtConfidence(gtSubtests);
  const effectiveTarget = getEffectiveGtTarget(
    profile.target_gt_score,
    trajectory?.target_jobs ?? []
  );
  // Prefer the server's branch-correct GT point; the summed range is the band.
  const gtPoint =
    trajectory?.primary_metric?.is_proxy &&
    trajectory.primary_metric.code === "GT"
      ? trajectory.primary_metric.current_value
      : gtRange.point;
  const gtGap = getGtGap(gtPoint, effectiveTarget.target);
  const gtProjection = getGtProjection({
    attempts: attempts.map((a) => ({
      primary_metric_code: a.primary_metric_code,
      primary_metric_estimate: a.primary_metric_estimate,
      completed_at: a.completed_at,
    })),
    studyDays: studyDayDates,
    targetGt: effectiveTarget.target,
    studyDaysPerWeek: profile.study_days_per_week,
    gtConfidence,
  });

  // Official AFQT anchor for the trajectory hero + the log-scores prompt gate.
  // Gated on actual presence of a logged official AFQT, not the status string.
  const officialAfqt = scoreTimeline?.latestOfficialAfqt ?? null;
  const officialDate = scoreTimeline?.latestOfficialDate ?? null;
  const hasOfficialAfqt = (scoreTimeline?.officialCount ?? 0) > 0;

  // Band-ladder inputs (AFQT only; GT users see the GT card instead). Band-only,
  // no raw point score, mirrors the trajectory contract.
  const primaryMetric = trajectory?.primary_metric ?? null;
  const ladderCurrentBand =
    primaryMetric && primaryMetric.code === "AFQT"
      ? primaryMetric.current_band_key
      : standing?.afqt_band_key ?? null;
  const ladderProjectedBand =
    primaryMetric && primaryMetric.code === "AFQT"
      ? primaryMetric.projected_band_key
      : trajectory?.projected_test_day?.afqt_band_key ?? null;
  const primaryJob = (trajectory?.target_jobs ?? []).find((j) => j.is_primary) ?? null;

  // Testimonial prompt, only after a genuine win (a 7-day streak, or a 2nd
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

      {/* Testimonial prompt, only after a genuine win. */}
      {testimonialContext && (
        <TestimonialPrompt
          userId={session.user.id}
          context={testimonialContext}
          headline={testimonialHeadline}
        />
      )}

      {/* Hero: one path. When the daily-session loop is live it replaces the
          single-action prescription card with a "start today's session" CTA. */}
      {dailySessionEnabled ? (
        <Link
          href="/app/session"
          className="block rounded-2xl border border-accent/40 bg-accent-dim/40 p-5 no-underline transition-all hover:border-accent/70 hover:shadow-[0_0_24px_var(--color-accent-glow)] sm:p-6"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-accent">
                Today&apos;s session
              </p>
              <h2 className="mt-1 font-display text-xl font-bold text-text-primary">
                {prescription.headline.startsWith("Review")
                  ? "Start with your due mistakes"
                  : "Start today's session"}
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                One guided path: warm up, learn, drill, then a timed block. We&apos;ll line up tomorrow.
              </p>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </Link>
      ) : (
        /* Today's Prescription (single highest-leverage action) */
        <PrescriptionCard prescription={prescription} />
      )}

      {/* AFQT band ladder, the motivational climb (band-only). */}
      {dailySessionEnabled && !isGtMode && (
        <BandLadder
          currentBandKey={(standing?.attempt_count ?? 0) > 0 ? ladderCurrentBand : null}
          projectedBandKey={(standing?.attempt_count ?? 0) > 0 ? ladderProjectedBand : null}
          confidence={standing?.overall_confidence ?? "low"}
          primaryJobTitle={primaryJob?.title ?? null}
          primaryJobQualifies={primaryJob?.overall_status === "qualifies"}
        />
      )}

      {/* Official-score capture, prompts until a real official AFQT is logged. */}
      <LogOfficialScoresCard
        hasOfficialAfqt={hasOfficialAfqt}
        targetTestDate={profile.target_test_date}
        testType={profile.test_type}
        onLogged={() => setRefreshKey((k) => k + 1)}
      />

      {/* Test-date capture, prompts until a specific date is set (the
          countdown plan + test-date email sequence both key off it). */}
      <SetTestDateCard
        userId={session.user.id}
        targetTestDate={profile.target_test_date}
        hasBucket={!!profile.target_test_date_bucket}
        onSaved={() => setRefreshKey((k) => k + 1)}
      />

      {/* Your Plan, the routine contract (replaces the old Mission card so the
          page has one hero action above + one "see the whole method" link). */}
      <div className="rounded-2xl border border-navy-border bg-navy-light p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-bold text-text-primary">
              Your Plan
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              Your full weekly routine, exactly what to do today and this week.
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
            ? "Daily challenge, done for today ✓"
            : "Daily challenge, ready"}
          {profile.streak_count > 0 && (
            <span className="text-text-tertiary">
              · {profile.streak_count}-day streak
            </span>
          )}
        </Link>
      </div>

      {/* Momentum tiles, streak / volume / accuracy (AFQT lives in the hero). */}
      <StatsRow
        streakCount={profile.streak_count}
        totalQuestions={totalQ}
        accuracy={accuracy}
      />

      {/* Trajectory hero, one authoritative AFQT (band + confidence + official
          anchor + interpretation). GT Target Mode for Army/Marines AFCT. */}
      {standing && (
        <TrajectoryCard
          currentStanding={standing}
          projectedTestDay={trajectory?.projected_test_day ?? null}
          primaryMetric={trajectory?.primary_metric ?? null}
          officialAfqt={officialAfqt}
          officialDate={officialDate}
          testDateIso={profile.target_test_date}
          gtTargetMode={isGtMode}
          targetValue={effectiveTarget.target}
          targetSource={effectiveTarget.source}
          targetJobCode={effectiveTarget.jobCode}
          gtRangeLow={gtRange.low}
          gtRangeHigh={gtRange.high}
          gapToTarget={gtGap}
          confidenceOverride={isGtMode ? gtConfidence : null}
          projectedTargetDate={
            gtProjection.status === "available"
              ? gtProjection.projectedDate
              : null
          }
          projectionStatus={gtProjection.status}
          projectedReason={
            gtProjection.status === "unavailable"
              ? GT_PROJECTION_REASON_COPY[gtProjection.reason]
              : null
          }
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
