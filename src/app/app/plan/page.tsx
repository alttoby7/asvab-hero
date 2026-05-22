"use client";

/**
 * Pillar 2 — "Your Plan" (/app/plan).
 *
 * The in-app routine contract: tells a logged-in user exactly how to use the
 * product THIS WEEK. Personalized + executable, not a reading page. All routine
 * logic lives in src/lib/account/next-action.ts (getWeeklyPlan +
 * getTrajectoryPrescription) — this page only loads state and renders. No
 * fabricated scores; everything is band/qualitative.
 */

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useSession } from "@/hooks/useSession";
import { getDueMistakeCount } from "@/lib/mistakes/queries";
import { getHomeTrajectory } from "@/lib/trajectory/queries";
import type { HomeTrajectory } from "@/lib/trajectory/types";
import {
  getTrajectoryPrescription,
  getWeeklyPlan,
  type PlanStep,
} from "@/lib/account/next-action";
import PrescriptionCard from "@/components/app/PrescriptionCard";

interface ProfileData {
  display_name: string | null;
  target_test_date: string | null;
  target_test_date_bucket: string | null;
  study_days_per_week: number | null;
  preferred_study_time: string | null;
  study_anchor: string | null;
  last_challenge_completed_on: string | null;
}

interface AttemptRow {
  id: string;
  variant_code: string;
  source: string | null;
  completed_at: string | null;
}

/** Days until the user's specific test date, when set; null otherwise.
 *  Copied verbatim from src/app/app/home/page.tsx. */
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

/** Local YYYY-MM-DD key for a date (calendar-day grouping, user-local). */
function localDayKey(d: Date): string {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Monday-based start of the current week, at local midnight. */
function startOfWeekMonday(now: Date): Date {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dow = d.getDay(); // 0=Sun..6=Sat
  const diff = (dow + 6) % 7; // days since Monday
  d.setDate(d.getDate() - diff);
  return d;
}

const SCIENCE_CHIPS: Array<{ title: string; body: string }> = [
  {
    title: "Retrieval + spacing",
    body: "Pulling an answer from memory — and revisiting it on a widening schedule — builds far more durable recall than re-reading ever does.",
  },
  {
    title: "Adaptive targeting",
    body: "The app aims each block at the topic and difficulty where you'll learn fastest, so your minutes land where they move the needle.",
  },
  {
    title: "Interleaving + feedback",
    body: "Mixing topics and getting immediate right/wrong feedback trains you to pick the correct method under test conditions, not just in a single drill.",
  },
];

export default function AppPlanPage() {
  const router = useRouter();
  const { session, loading: sessionLoading } = useSession();
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [attempts, setAttempts] = useState<AttemptRow[]>([]);
  const [dueMistakeCount, setDueMistakeCount] = useState(0);
  const [trajectory, setTrajectory] = useState<HomeTrajectory | null>(null);

  // "Why this works" expandable chips.
  const [openChip, setOpenChip] = useState<number | null>(null);
  // Pre-test write-out (local-only, no persistence in v1).
  const [worries, setWorries] = useState("");

  useEffect(() => {
    if (sessionLoading) return;
    if (!session) {
      router.replace("/login?next=/app/plan");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const userId = session.user.id;

    async function load() {
      const [profileRes, attemptsRes, dueCountRes, trajectoryRes] =
        await Promise.all([
          sb
            .from("profiles")
            .select(
              "display_name,target_test_date,target_test_date_bucket,study_days_per_week,preferred_study_time,study_anchor,last_challenge_completed_on,onboarding_completed_at"
            )
            .eq("user_id", userId)
            .single(),
          sb
            .from("attempts")
            .select("id,variant_code,source,completed_at")
            .eq("user_id", userId)
            .order("completed_at", { ascending: false })
            .limit(200),
          getDueMistakeCount(userId),
          getHomeTrajectory(sb).catch(() => null),
        ]);

      // Onboarding guard (mirrors home/page.tsx).
      if (profileRes.data?.onboarding_completed_at == null) {
        router.replace("/onboarding");
        return;
      }

      setProfile(profileRes.data);
      setAttempts(attemptsRes.data ?? []);
      setDueMistakeCount(dueCountRes ?? 0);
      setTrajectory(trajectoryRes ?? null);
      setLoading(false);
    }

    load();
  }, [session, sessionLoading, router]);

  // Derived inputs for the plan/prescription helpers.
  const derived = useMemo(() => {
    const completed = attempts.filter((a) => a.completed_at != null);

    const diagnostics = completed
      .filter((a) => a.variant_code === "diagnostic")
      .sort(
        (a, b) =>
          new Date(b.completed_at as string).getTime() -
          new Date(a.completed_at as string).getTime()
      );
    const hasDiagnostic = diagnostics.length > 0;

    const daysSinceDiagnostic =
      diagnostics.length > 0
        ? Math.floor(
            (Date.now() -
              new Date(diagnostics[0].completed_at as string).getTime()) /
              86400000
          )
        : null;

    // Distinct local calendar days this week (Monday-based) with >=1 attempt.
    const weekStart = startOfWeekMonday(new Date()).getTime();
    const daysWithActivity = new Set<string>();
    for (const a of completed) {
      const t = new Date(a.completed_at as string).getTime();
      if (t >= weekStart) {
        daysWithActivity.add(localDayKey(new Date(a.completed_at as string)));
      }
    }
    const studyDaysThisWeek = daysWithActivity.size;

    return {
      hasDiagnostic,
      daysSinceDiagnostic,
      studyDaysThisWeek,
      attemptCount: completed.length,
    };
  }, [attempts]);

  if (sessionLoading || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-sm text-text-tertiary">Loading…</div>
      </div>
    );
  }

  if (!session || !profile) return null;

  const standing = trajectory?.current_standing ?? null;
  const confidence = standing?.overall_confidence ?? "low";
  const daysToTest = daysToTestFrom(
    profile.target_test_date,
    profile.target_test_date_bucket
  );

  const prescription = getTrajectoryPrescription({
    subtestEstimates: standing?.subtest_estimates ?? {},
    confidence,
    dueMistakeCount,
    attemptCount: standing?.attempt_count ?? derived.attemptCount,
    targetJobs: trajectory?.target_jobs ?? [],
    studyDaysPerWeek: profile.study_days_per_week,
    daysToTest,
  });

  const plan = getWeeklyPlan({
    hasDiagnostic: derived.hasDiagnostic,
    confidence,
    daysToTest,
    studyDaysPerWeek: profile.study_days_per_week,
    daysSinceDiagnostic: derived.daysSinceDiagnostic,
  });

  // A daily-loop step is "done today" when its work is already cleared.
  function dailyStepDone(step: PlanStep): boolean {
    if (step.id === "review_mistakes") return dueMistakeCount === 0;
    return false;
  }

  const studyDaysTarget = plan.studyDaysPerWeek;
  const progressPct =
    studyDaysTarget > 0
      ? Math.min(
          100,
          Math.round((derived.studyDaysThisWeek / studyDaysTarget) * 100)
        )
      : 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 space-y-6">
      {/* 1. Header */}
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
            Your Plan
          </h1>
          <span className="rounded-full border border-accent/30 bg-accent-dim px-2.5 py-0.5 text-xs font-semibold text-accent">
            {plan.phaseLabel}
          </span>
          {plan.urgent && (
            <span className="rounded-full border border-danger/40 bg-danger-dim px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-danger">
              Test soon
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-text-secondary">{plan.phaseSummary}</p>
      </header>

      {/* 2. TODAY — the single next action */}
      <section>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
          Today
        </h2>
        <PrescriptionCard prescription={prescription} />
      </section>

      {/* 3. YOUR DAILY LOOP — ordered checklist */}
      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
          Your daily loop
        </h2>
        <ol className="space-y-2">
          {plan.dailyLoop.map((step, i) => {
            const done = dailyStepDone(step);
            return (
              <li
                key={step.id}
                className={`rounded-2xl border border-navy-border bg-navy-light p-4 ${
                  done ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      done
                        ? "bg-success-dim text-success"
                        : "bg-accent-dim text-accent"
                    }`}
                  >
                    {done ? "✓" : i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-display text-sm font-semibold text-text-primary">
                        {step.label}
                      </span>
                      {done ? (
                        <span className="text-xs font-medium text-success">
                          Done today
                        </span>
                      ) : (
                        <Link
                          href={step.ctaHref}
                          className="text-xs font-semibold text-accent no-underline hover:text-accent-hover"
                        >
                          Start →
                        </Link>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-text-tertiary">{step.why}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* 4. THIS WEEK — scheduled tasks beyond the daily loop */}
      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
          This week
        </h2>
        {plan.thisWeek.length === 0 ? (
          <div className="rounded-2xl border border-navy-border bg-navy-light p-4">
            <p className="text-sm text-text-secondary">
              Nothing scheduled beyond your daily loop this week — consistency is
              the goal.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {plan.thisWeek.map((step) => (
              <div
                key={step.id}
                className="flex flex-col rounded-2xl border border-navy-border bg-navy-light p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-semibold text-text-primary">
                    {step.label}
                  </span>
                  {step.optional && (
                    <span className="rounded-full border border-navy-border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-text-tertiary">
                      Optional
                    </span>
                  )}
                </div>
                <p className="mt-1 flex-1 text-xs text-text-tertiary">
                  {step.why}
                </p>
                <Link
                  href={step.ctaHref}
                  className="mt-3 inline-flex text-xs font-semibold text-accent no-underline hover:text-accent-hover"
                >
                  {step.id === "diagnostic"
                    ? "Start diagnostic →"
                    : step.id === "pretest_writing"
                      ? "Do the write-out →"
                      : "Start →"}
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. MY SCHEDULE */}
      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
          My schedule
        </h2>
        <div className="rounded-2xl border border-navy-border bg-navy-light p-4">
          {profile.study_days_per_week == null ? (
            <p className="text-sm text-text-secondary">
              You haven&apos;t set a study schedule yet.{" "}
              <Link
                href="/account/settings"
                className="font-semibold text-accent no-underline hover:text-accent-hover"
              >
                Set your study days
              </Link>{" "}
              so your plan can hold you to a real cadence.
            </p>
          ) : (
            <>
              <p className="text-sm text-text-primary">
                <span className="font-semibold">
                  {profile.study_days_per_week} day
                  {profile.study_days_per_week === 1 ? "" : "s"} a week
                </span>
                {profile.preferred_study_time
                  ? ` · ${profile.preferred_study_time}`
                  : ""}
                {profile.study_anchor ? ` · ${profile.study_anchor}` : ""}
              </p>
              {!profile.study_anchor && (
                <p className="mt-1 text-xs text-text-tertiary">
                  Tip: anchor your study to an existing habit (e.g. after
                  breakfast) — it makes the routine far more likely to stick.
                </p>
              )}
              <Link
                href="/account/settings"
                className="mt-3 inline-flex text-xs font-semibold text-accent no-underline hover:text-accent-hover"
              >
                Change schedule →
              </Link>
            </>
          )}
          <p className="mt-3 border-t border-navy-border pt-3 text-xs text-text-tertiary">
            Reminders on for due mistakes.
          </p>
        </div>
      </section>

      {/* 6. WHY THIS WORKS — expandable chips */}
      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
          Why this works
        </h2>
        <div className="space-y-2">
          {SCIENCE_CHIPS.map((chip, i) => {
            const open = openChip === i;
            return (
              <div
                key={chip.title}
                className="overflow-hidden rounded-2xl border border-navy-border bg-navy-light"
              >
                <button
                  type="button"
                  onClick={() => setOpenChip(open ? null : i)}
                  className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
                  aria-expanded={open}
                >
                  <span className="font-display text-sm font-semibold text-text-primary">
                    {chip.title}
                  </span>
                  <span className="text-text-tertiary">{open ? "−" : "+"}</span>
                </button>
                {open && (
                  <div className="px-4 pb-3">
                    <p className="text-xs text-text-secondary">{chip.body}</p>
                    <Link
                      href="/the-science"
                      className="mt-2 inline-flex text-xs font-semibold text-accent no-underline hover:text-accent-hover"
                    >
                      See the full research →
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. PROGRESS — study days this week */}
      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
          Progress
        </h2>
        <div className="rounded-2xl border border-navy-border bg-navy-light p-4">
          <div className="flex items-baseline justify-between">
            <span className="font-display text-sm font-semibold text-text-primary">
              {derived.studyDaysThisWeek} of {studyDaysTarget} study days this
              week
            </span>
            <span className="text-xs text-text-tertiary">{progressPct}%</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-navy-border">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-text-tertiary">
            We count study days, not hours or questions — showing up is the habit
            that compounds.
          </p>
        </div>
      </section>

      {/* 8. PRE-TEST WRITING — final phase only */}
      {plan.phase === "final" && (
        <section id="pretest-writing" className="scroll-mt-24">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            Pre-test write-out
            <span className="ml-2 rounded-full border border-navy-border px-1.5 py-0.5 text-[10px] font-medium normal-case tracking-normal text-text-tertiary">
              Optional · 8–10 min
            </span>
          </h2>
          <div className="rounded-2xl border border-navy-border bg-navy-light p-4">
            <p className="text-sm text-text-secondary">
              Before a high-stakes test, spend 8–10 minutes writing out whatever
              you&apos;re worried about. It&apos;s not therapy — it clears the
              mental noise that otherwise eats your working memory on test day, so
              the points you&apos;ve earned actually show up.
            </p>
            <textarea
              value={worries}
              onChange={(e) => setWorries(e.target.value)}
              placeholder="What's on your mind about the test? Write freely — this stays on your device."
              rows={6}
              className="mt-3 w-full resize-y rounded-lg border border-navy-border bg-navy px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none"
            />
            <p className="mt-2 text-xs text-text-tertiary">
              This is local-only and not saved — close the page and it&apos;s
              gone. The point is the writing, not the record.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
