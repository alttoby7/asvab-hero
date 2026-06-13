"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { getDueMistakeCount } from "@/lib/mistakes/queries";
import { getHomeTrajectory } from "@/lib/trajectory/queries";
import type { HomeTrajectory, SubtestEstimates } from "@/lib/trajectory/types";
import { weakTopicStudyGuides } from "@/lib/practice/recommender";
import { isAdaptiveEnabled } from "@/lib/practice/sampler";
import { canAccessSessionStation } from "@/lib/practice/gate";
import { trackEvent, SessionEvents } from "@/lib/analytics";
import type { AsvabSubtest, Branch, TopicStats } from "@/types";
import type { TestType } from "@/lib/prep-mode";
import { buildSession } from "@/lib/session/build-session";
import type { SessionPlan, SessionStation, StationState } from "@/lib/session/types";
import {
  getSessionForDate,
  createSession,
  advanceSession,
  completeSession,
  logErrorTags,
  type ErrorTagInput,
} from "@/lib/session/queries";
import PracticeTestEngine, {
  type StationCompletionSummary,
} from "@/components/practice-test/PracticeTestEngine";
import MissionPathStepper from "./MissionPathStepper";
import SessionDebrief, { type DebriefItem } from "./SessionDebrief";

/** YYYY-MM-DD in the user's local calendar (en-CA renders ISO-like). */
function localDateString(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString("en-CA");
}

const AFQT_ORDER: Array<"AR" | "MK" | "WK" | "PC"> = ["AR", "MK", "WK", "PC"];

/** Weakest AFQT subtest: fewest seen first (measure it), then lowest point. */
function weakestAfqtSubtest(est: SubtestEstimates): AsvabSubtest {
  let best: "AR" | "MK" | "WK" | "PC" = "AR";
  let bestSeen = Infinity;
  let bestPoint = Infinity;
  for (const st of AFQT_ORDER) {
    const e = est[st];
    const seen = e?.seen ?? 0;
    const point = e?.point ?? 0;
    if (seen < bestSeen || (seen === bestSeen && point < bestPoint)) {
      best = st;
      bestSeen = seen;
      bestPoint = point;
    }
  }
  return best;
}

type Status = "loading" | "active" | "done" | "error";

export default function SessionEngine({
  userId,
  isPro,
}: {
  userId: string;
  isPro: boolean;
}) {
  const [status, setStatus] = useState<Status>("loading");
  const [plan, setPlan] = useState<SessionPlan | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const [stateMap, setStateMap] = useState<Record<string, StationState>>({});
  const [missed, setMissed] = useState<DebriefItem[]>([]);
  const [savingFinish, setSavingFinish] = useState(false);
  const weakestRef = useRef<AsvabSubtest>("AR");
  // A practice station reports its result on save; we stash it and only advance
  // when the user taps Continue (so they see the compact completion panel).
  const pendingSummaryRef = useRef<StationCompletionSummary | undefined>(undefined);

  // ── Load data, build plan, hydrate or create today's session. ──────────────
  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const sessionDate = localDateString();

    (async () => {
      try {
        const [profileRes, attemptsCountRes, statsRes, dueCount, trajectory] =
          await Promise.all([
            sb
              .from("profiles")
              .select(
                "branch,test_type,target_test_date,target_test_date_bucket,study_days_per_week",
              )
              .eq("user_id", userId)
              .single(),
            sb
              .from("attempts")
              .select("id", { count: "exact", head: true })
              .eq("user_id", userId),
            sb
              .from("topic_stats")
              .select("topic_id,seen,correct,posterior,confidence,priority,status,last_seen_at,updated_at")
              .eq("user_id", userId),
            getDueMistakeCount(userId),
            getHomeTrajectory(sb).catch(() => null as HomeTrajectory | null),
          ]);
        if (cancelled) return;

        const profile = profileRes.data ?? {};
        const topicStats = (statsRes.data ?? []) as TopicStats[];
        const standing = trajectory?.current_standing ?? null;
        const estimates = standing?.subtest_estimates ?? {};
        const attemptCount = standing?.attempt_count ?? attemptsCountRes.count ?? 0;

        const weakGuide =
          weakTopicStudyGuides({ latestByTopic: [], topicStats })[0] ?? null;
        const weakest = weakestAfqtSubtest(estimates);
        weakestRef.current = weakest;

        const daysToTest = daysToTestFrom(
          profile.target_test_date ?? null,
          profile.target_test_date_bucket ?? null,
        );

        const built = buildSession({
          attemptCount,
          confidence: standing?.overall_confidence ?? "low",
          dueMistakeCount: dueCount,
          weakTopicGuide: weakGuide,
          weakestSubtest: weakest,
          daysToTest,
          sessionDate,
          testType: (profile.test_type ?? null) as TestType | null,
          branch: (profile.branch ?? null) as Branch | null,
        });

        // Resume an existing session for today, or create a fresh one.
        const existing = await getSessionForDate(userId, sessionDate);
        if (cancelled) return;
        if (existing) {
          setPlan(existing.plan ?? built);
          setSessionId(existing.id);
          setStateMap(existing.state ?? {});
          const done: Record<number, boolean> = {};
          Object.entries(existing.state ?? {}).forEach(([k, v]) => {
            if (v?.completed) done[Number(k)] = true;
          });
          setCompleted(done);
          setCurrent(
            existing.status === "completed"
              ? (existing.plan?.stations.length ?? built.stations.length)
              : existing.current_station ?? 0,
          );
          setStatus(existing.status === "completed" ? "done" : "active");
        } else {
          const id = await createSession({
            userId,
            plan: built,
            tier: isPro ? "pro" : "free",
          });
          if (cancelled) return;
          setPlan(built);
          setSessionId(id);
          setStatus("active");
          trackEvent(SessionEvents.SessionStart, {
            phase: built.phase,
            station_count: built.stations.length,
            metric: built.metric,
            tier: isPro ? "pro" : "free",
          });
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId, isPro]);

  // Fire one station_view per station the user lands on.
  useEffect(() => {
    if (status !== "active" || !plan) return;
    const st = plan.stations[current];
    if (!st) return;
    trackEvent(SessionEvents.StationView, { kind: st.kind, index: current });
  }, [status, plan, current]);

  const persist = useCallback(
    (nextStation: number, nextState: Record<string, StationState>) => {
      if (sessionId) {
        advanceSession({ sessionId, currentStation: nextStation, state: nextState });
      }
    },
    [sessionId],
  );

  // Mark the current station complete and move to the next one.
  const advance = useCallback(
    (stationSummary?: StationCompletionSummary) => {
      setStateMap((prev) => {
        const next = {
          ...prev,
          [String(current)]: {
            completed: true,
            attemptId: stationSummary?.attemptId,
            missed: stationSummary?.missed,
          },
        };
        const nextStation = current + 1;
        persist(nextStation, next);
        return next;
      });
      if (stationSummary?.missed?.length) {
        setMissed((m) => [...m, ...stationSummary.missed]);
      }
      const st = plan?.stations[current];
      trackEvent(SessionEvents.StationComplete, {
        kind: st?.kind ?? "unknown",
        index: current,
        ...(stationSummary
          ? { correct: stationSummary.correct, total: stationSummary.total }
          : {}),
      });
      setCompleted((c) => ({ ...c, [current]: true }));
      setCurrent((i) => i + 1);
    },
    [current, persist, plan],
  );

  const finishSession = useCallback(
    async (tags: ErrorTagInput[]) => {
      setSavingFinish(true);
      const finalState = {
        ...stateMap,
        [String(current)]: { completed: true },
      };
      const nextDate = localDateString(1);
      if (sessionId) {
        await Promise.all([
          logErrorTags({ userId, sessionId, tags: tags.filter((t) => t.errorTag || t.confidence) }),
          completeSession({
            sessionId,
            userId,
            state: finalState,
            scheduledNextFor: nextDate,
            studyDate: localDateString(),
          }),
        ]);
      }
      const taggedCount = tags.filter((t) => t.errorTag || t.confidence).length;
      trackEvent(SessionEvents.DebriefTagged, {
        tagged: taggedCount,
        missed: tags.length,
      });
      trackEvent(SessionEvents.SessionComplete, { scheduled_next_for: nextDate });
      setSavingFinish(false);
      setStatus("done");
    },
    [stateMap, current, sessionId, userId],
  );

  const allMissed = useMemo<DebriefItem[]>(() => {
    // Prefer accumulated-this-run; fall back to anything persisted in state.
    if (missed.length) return missed;
    const out: DebriefItem[] = [];
    Object.values(stateMap).forEach((s) => {
      (s.missed ?? []).forEach((m) => out.push(m));
    });
    return out;
  }, [missed, stateMap]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-text-tertiary">
        Building today&apos;s session…
      </div>
    );
  }
  if (status === "error" || !plan) {
    return (
      <div className="rounded-2xl border border-red-400/30 bg-red-400/5 p-6 text-sm text-red-300">
        Could not build your session. Please refresh.
      </div>
    );
  }

  if (status === "done") {
    return <SessionComplete metric={plan.metric} />;
  }

  const station = plan.stations[current];

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,260px)_1fr]">
      {/* Mission path rail */}
      <aside className="md:sticky md:top-6 md:self-start">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-text-tertiary">
          Today&apos;s mission
        </p>
        <MissionPathStepper
          stations={plan.stations}
          currentStation={current}
          completed={completed}
        />
      </aside>

      {/* Active station */}
      <section className="min-w-0">
        {station ? (
          <StationView
            station={station}
            isPro={isPro}
            weakestSubtest={weakestRef.current}
            onStationResult={(s) => {
              pendingSummaryRef.current = s;
            }}
            onAdvance={() => {
              advance(pendingSummaryRef.current);
              pendingSummaryRef.current = undefined;
            }}
            missed={allMissed}
            scheduledLabel="tomorrow"
            onFinish={finishSession}
            savingFinish={savingFinish}
          />
        ) : (
          <SessionComplete metric={plan.metric} />
        )}
      </section>
    </div>
  );
}

/** Renders the active station by kind. */
function StationView({
  station,
  isPro,
  weakestSubtest,
  onStationResult,
  onAdvance,
  missed,
  scheduledLabel,
  onFinish,
  savingFinish,
}: {
  station: SessionStation;
  isPro: boolean;
  weakestSubtest: AsvabSubtest;
  /** Stash a practice station's result (fired on save, before Continue). */
  onStationResult: (summary: StationCompletionSummary) => void;
  /** Record the current station complete and move to the next. */
  onAdvance: () => void;
  missed: DebriefItem[];
  scheduledLabel: string;
  onFinish: (tags: ErrorTagInput[]) => void;
  savingFinish?: boolean;
}) {
  // Free taste -> Pro full loop. Free users hit the wall at the timed block.
  if (!canAccessSessionStation(station.kind, isPro).allowed) {
    return <SessionPaywall stationTitle={station.title} />;
  }

  switch (station.kind) {
    case "warmup":
      return (
        <StationShell
          eyebrow="Warm-up"
          title={station.title}
          body={station.subtitle}
          primaryLabel="Open mistake review"
          primaryHref="/app/mistakes"
          secondaryLabel="I've cleared them, continue"
          onSecondary={onAdvance}
        />
      );
    case "lesson":
      return (
        <StationShell
          eyebrow="Learn"
          title={station.title}
          body={station.subtitle}
          primaryLabel="Open the study guide"
          primaryHref={station.href ?? "/study-guide"}
          secondaryLabel="Done reading, continue"
          onSecondary={onAdvance}
        />
      );
    case "drill":
      return (
        <PracticeTestEngine
          embedded
          autoStart
          variant="subtest_drill"
          subtest={station.subtest ?? weakestSubtest}
          testName={station.title}
          onStationComplete={onStationResult}
          onContinue={onAdvance}
        />
      );
    case "timed": {
      // Use the adaptive variant when it's live; otherwise a tightened drill on
      // the weakest subtest so the loop still runs pre-activation. Either way the
      // clock is tightened to rehearse pacing under pressure.
      const adaptiveLive = isAdaptiveEnabled();
      return (
        <PracticeTestEngine
          embedded
          autoStart
          variant={adaptiveLive ? station.variant ?? "afqt_adaptive" : "subtest_drill"}
          subtest={adaptiveLive ? undefined : weakestSubtest}
          timeOverrideSeconds={10 * 60}
          testName={station.title}
          onStationComplete={onStationResult}
          onContinue={onAdvance}
        />
      );
    }
    case "diagnostic":
      return (
        <PracticeTestEngine
          embedded
          autoStart
          variant="diagnostic"
          testName={station.title}
          onStationComplete={onStationResult}
          onContinue={onAdvance}
        />
      );
    case "debrief":
      return (
        <SessionDebrief
          missed={missed}
          scheduledLabel={scheduledLabel}
          onFinish={onFinish}
          saving={savingFinish}
        />
      );
  }
  return null;
}

/** Free users hit this at the timed block, the rest of the loop is Pro. */
function SessionPaywall({ stationTitle }: { stationTitle: string }) {
  useEffect(() => {
    trackEvent(SessionEvents.PaywallHit, { station_title: stationTitle });
  }, [stationTitle]);
  return (
    <div
      className="rounded-2xl border border-accent/30 bg-accent-dim/30 p-6 sm:p-8 text-center"
      style={{ animation: "fadeIn 0.3s ease-out" }}
    >
      <p className="text-xs font-bold uppercase tracking-wide text-accent">
        Pro unlocks the rest
      </p>
      <h2 className="mt-2 font-display text-2xl font-bold text-text-primary">
        You&apos;ve finished today&apos;s free session
      </h2>
      <p className="mx-auto mt-2 max-w-md text-text-secondary">
        Up next is your <span className="font-semibold text-text-primary">{stationTitle}</span>,
        then your debrief and tomorrow&apos;s plan. Pro unlocks the full daily loop,
        timed blocks, the debrief that decides what comes back, and a session scheduled every day to your test.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/upgrade"
          className="rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white no-underline transition-all hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)]"
        >
          Unlock the full session
        </Link>
        <Link
          href="/app/home"
          className="rounded-xl border border-navy-border px-6 py-3 text-sm font-semibold text-text-secondary no-underline transition-colors hover:bg-navy-lighter hover:text-text-primary"
        >
          Done for today
        </Link>
      </div>
    </div>
  );
}

/** Simple card for the non-practice stations (warm-up, lesson). */
function StationShell({
  eyebrow,
  title,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  onSecondary,
}: {
  eyebrow: string;
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  onSecondary: () => void;
}) {
  return (
    <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8" style={{ animation: "fadeIn 0.3s ease-out" }}>
      <p className="text-xs font-bold uppercase tracking-wide text-accent">{eyebrow}</p>
      <h2 className="mt-2 font-display text-2xl font-bold text-text-primary">{title}</h2>
      <p className="mt-2 text-text-secondary">{body}</p>
      <div className="mt-6 space-y-3">
        <Link
          href={primaryHref}
          className="block w-full rounded-xl bg-accent px-6 py-3.5 text-center font-display text-base font-bold text-white no-underline transition-all hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)]"
        >
          {primaryLabel}
        </Link>
        <button
          onClick={onSecondary}
          className="w-full rounded-xl border border-navy-border bg-navy px-6 py-3 text-sm font-semibold text-text-secondary transition-colors hover:bg-navy-lighter hover:text-text-primary"
        >
          {secondaryLabel}
        </button>
      </div>
    </div>
  );
}

function SessionComplete({ metric }: { metric: string }) {
  return (
    <div className="rounded-2xl border border-navy-border bg-navy-light p-8 text-center" style={{ animation: "fadeIn 0.4s ease-out" }}>
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-dim">
        <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <h2 className="font-display text-2xl font-bold text-text-primary">Session complete</h2>
      <p className="mx-auto mt-2 max-w-md text-text-secondary">
        That&apos;s today&apos;s work on your {metric}. We&apos;ve scheduled your next session for tomorrow, come back to keep the streak.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href="/app/home" className="rounded-xl bg-navy-lighter px-6 py-3 text-sm font-semibold text-text-primary no-underline transition-colors hover:bg-navy-border">
          Back to dashboard
        </Link>
        <Link href="/app/plan" className="rounded-xl border border-navy-border px-6 py-3 text-sm font-semibold text-text-secondary no-underline transition-colors hover:bg-navy-lighter hover:text-text-primary">
          See your full plan
        </Link>
      </div>
    </div>
  );
}

/** Days to test from a date or coarse bucket (mirrors home's helper). */
function daysToTestFrom(
  targetDate: string | null,
  bucket: string | null,
): number | null {
  if (targetDate) {
    return Math.max(
      0,
      Math.ceil((new Date(targetDate).getTime() - Date.now()) / 86400000),
    );
  }
  switch (bucket) {
    case "lt_30":
      return 21;
    case "30_90":
      return 60;
    default:
      return null;
  }
}
