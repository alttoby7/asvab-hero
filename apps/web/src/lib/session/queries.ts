import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { SessionPlan, StationState } from "./types";

/**
 * Daily Study Session, client data layer.
 *
 * study_sessions holds UI/session state owned by the user under RLS (no RPC, no
 * server-side algorithm). Practice stations still record their results through
 * the normal `attempts` insert, so the authoritative learning pipeline
 * (trg_attempts_ingest -> mistake bank + topic_stats) is untouched.
 */

/** Build-time kill switch, mirrors isAdaptiveEnabled()/isClosedLoopEnabled(). */
export function isDailySessionEnabled(): boolean {
  return process.env.NEXT_PUBLIC_DAILY_SESSION_ENABLED === "true";
}

export interface StudySessionRow {
  id: string;
  session_date: string;
  plan: SessionPlan;
  current_station: number;
  state: Record<string, StationState>;
  status: "in_progress" | "completed" | "abandoned";
  tier_at_start: "free" | "pro" | null;
  metric: string | null;
  scheduled_next_for: string | null;
}

/** Today's session for this user (by user-local date), or null. */
export async function getSessionForDate(
  userId: string,
  sessionDate: string,
): Promise<StudySessionRow | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const { data, error } = await sb
      .from("study_sessions")
      .select(
        "id, session_date, plan, current_station, state, status, tier_at_start, metric, scheduled_next_for",
      )
      .eq("user_id", userId)
      .eq("session_date", sessionDate)
      .maybeSingle();
    if (error || !data) return null;
    return data as StudySessionRow;
  } catch {
    return null;
  }
}

/** Create today's session from a freshly-built plan. Returns the row id. */
export async function createSession(opts: {
  userId: string;
  plan: SessionPlan;
  tier: "free" | "pro";
}): Promise<string | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const { data, error } = await sb
      .from("study_sessions")
      .insert({
        user_id: opts.userId,
        session_date: opts.plan.sessionDate,
        plan: opts.plan,
        metric: opts.plan.metric,
        tier_at_start: opts.tier,
      })
      .select("id")
      .single();
    if (!error && data) return data.id as string;
    // A concurrent create (double-mount / rapid nav) already inserted today's
    // session — unique (user_id, session_date). Return the existing session id
    // instead of null so the loop still persists this day's progress.
    if (error?.code === "23505") {
      const { data: existing } = await sb
        .from("study_sessions")
        .select("id")
        .eq("user_id", opts.userId)
        .eq("session_date", opts.plan.sessionDate)
        .maybeSingle();
      return (existing?.id as string | undefined) ?? null;
    }
    return null;
  } catch {
    return null;
  }
}

/** Advance to a station and merge per-station progress. */
export async function advanceSession(opts: {
  sessionId: string;
  currentStation: number;
  state: Record<string, StationState>;
}): Promise<void> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    await sb
      .from("study_sessions")
      .update({
        current_station: opts.currentStation,
        state: opts.state,
      })
      .eq("id", opts.sessionId);
  } catch {
    /* best-effort; the loop also keeps local state */
  }
}

/**
 * Mark a session complete and schedule the next study day. Also records the
 * dose-proof study_day (idempotent, ignores the per-day conflict).
 */
export async function completeSession(opts: {
  sessionId: string;
  userId: string;
  state: Record<string, StationState>;
  scheduledNextFor: string | null;
  /** Local study date that just completed (for the study_days proof row). */
  studyDate: string;
}): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sb = getSupabaseBrowserClient() as any;
  try {
    await sb
      .from("study_sessions")
      .update({
        status: "completed",
        state: opts.state,
        scheduled_next_for: opts.scheduledNextFor,
      })
      .eq("id", opts.sessionId);
  } catch {
    /* best-effort */
  }
  try {
    await sb
      .from("study_days")
      .upsert(
        {
          user_id: opts.userId,
          study_date: opts.studyDate,
          plan_version: "session_v1",
          trigger: "daily_session",
        },
        { onConflict: "user_id,study_date", ignoreDuplicates: true },
      );
  } catch {
    /* the day is proof-of-dose; a duplicate is fine */
  }
}

export interface ErrorTagInput {
  questionId: string;
  subtest?: string | null;
  topicId?: string | null;
  errorTag?: "concept" | "setup" | "careless" | "time" | null;
  confidence?: "sure" | "unsure" | null;
}

/** Persist debrief error-taxonomy + confidence rows for the missed items. */
export async function logErrorTags(opts: {
  userId: string;
  sessionId: string;
  tags: ErrorTagInput[];
}): Promise<void> {
  if (opts.tags.length === 0) return;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    await sb.from("session_error_tags").insert(
      opts.tags.map((t) => ({
        user_id: opts.userId,
        session_id: opts.sessionId,
        question_id: t.questionId,
        subtest: t.subtest ?? null,
        topic_id: t.topicId ?? null,
        error_tag: t.errorTag ?? null,
        confidence: t.confidence ?? null,
      })),
    );
  } catch {
    /* best-effort, debrief tags are signal not gating */
  }
}
