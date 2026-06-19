import type { SupabaseClient } from "./client";
import type {
  AsvabSubtest,
  PracticeQuestion,
  TestVariant,
  TestVariantRules,
  AttemptPayload,
  TopicStats,
} from "@asvab-hero/domain/types";
import { FALLBACK_VARIANTS } from "@asvab-hero/domain/sampler";

// ─── Variant queries ───────────────────────────────────────────────

export async function loadVariant(
  client: SupabaseClient,
  code: string
): Promise<TestVariant> {
  try {
    const { data, error } = await (client as any)
      .from("test_variants")
      .select("code, name, rules, active")
      .eq("code", code)
      .eq("active", true)
      .maybeSingle();
    if (error || !data) throw error ?? new Error("variant_not_found");
    return {
      code: data.code as string,
      name: data.name as string,
      rules: data.rules as TestVariantRules,
      active: data.active as boolean,
    };
  } catch {
    const fb = FALLBACK_VARIANTS[code];
    if (!fb) throw new Error(`Unknown variant: ${code}`);
    return fb;
  }
}

export async function loadActiveVariants(
  client: SupabaseClient
): Promise<TestVariant[]> {
  try {
    const { data, error } = await (client as any)
      .from("test_variants")
      .select("code, name, rules, active")
      .eq("active", true);
    if (error || !data || data.length === 0) throw error ?? new Error("empty");
    return data.map((d: any) => ({
      code: d.code as string,
      name: d.name as string,
      rules: d.rules as TestVariantRules,
      active: d.active as boolean,
    }));
  } catch {
    return Object.values(FALLBACK_VARIANTS);
  }
}

// ─── Question pool ─────────────────────────────────────────────────

export async function loadQuestionPool(
  client: SupabaseClient,
  opts?: { subtest?: AsvabSubtest }
): Promise<PracticeQuestion[]> {
  let q = (client as any)
    .from("practice_questions")
    .select(
      "id, external_key, subtest, topic_id, difficulty, stem, choices, correct_index, explanation"
    )
    .eq("active", true);
  if (opts?.subtest) q = q.eq("subtest", opts.subtest);
  const { data, error } = await q;
  if (error || !data || data.length === 0) {
    throw new Error(error?.message ?? "No questions found");
  }
  return data.map((row: any) => ({
    id: (row.external_key as string) ?? (row.id as string),
    subtest: row.subtest as AsvabSubtest,
    question: row.stem as string,
    options: row.choices as [string, string, string, string],
    correctIndex: row.correct_index as number,
    explanation: row.explanation as string,
    topicId: row.topic_id as string,
    difficulty: row.difficulty as number,
  }));
}

// ─── Attempt persistence ───────────────────────────────────────────

export async function saveAttempt(
  client: SupabaseClient,
  userId: string,
  attempt: AttemptPayload
): Promise<{ id: string }> {
  const { data, error } = await (client as any)
    .from("attempts")
    .insert({
      user_id: userId,
      client_attempt_id: attempt.client_attempt_id,
      variant_code: attempt.variant_code,
      source: attempt.source,
      subtest: attempt.subtest,
      topic_id: attempt.topic_id,
      started_at: attempt.started_at,
      completed_at: attempt.completed_at,
      duration_seconds: attempt.duration_seconds,
      question_count: attempt.question_count,
      correct_count: attempt.correct_count,
      afqt_estimate: attempt.afqt_estimate,
      results_by_subtest: attempt.results_by_subtest,
      results_by_topic: attempt.results_by_topic,
      question_results: attempt.question_results,
      test_type: attempt.test_type ?? null,
      primary_metric_code: attempt.primary_metric_code ?? null,
      primary_metric_estimate: attempt.primary_metric_estimate ?? null,
      synced_from_local: false,
    })
    .select("id")
    .single();

  if (error) throw error;

  const localDate = attempt.completed_at.slice(0, 10);
  await (client as any)
    .from("study_days")
    .upsert(
      { user_id: userId, study_date: localDate, trigger: attempt.variant_code },
      { onConflict: "user_id,study_date", ignoreDuplicates: true }
    );

  if (attempt.variant_code === "diagnostic") {
    await (client as any)
      .from("profiles")
      .update({ free_diagnostic_used_at: attempt.completed_at })
      .eq("user_id", userId)
      .is("free_diagnostic_used_at", null);
  }

  return { id: data.id };
}

// ─── Pro check ─────────────────────────────────────────────────────

export async function checkHasActivePro(
  client: SupabaseClient,
  userId?: string
): Promise<boolean> {
  const { data, error } = await (client as any).rpc("has_active_pro", {
    p_user_id: userId ?? null,
  });
  if (error) return false;
  return data === true;
}

// ─── Home trajectory ───────────────────────────────────────────────

import type { HomeTrajectory } from "@asvab-hero/domain/trajectory";
export type { HomeTrajectory };

export async function getHomeTrajectory(
  client: SupabaseClient
): Promise<HomeTrajectory | null> {
  const { data, error } = await (client as any).rpc("rpc_get_home_trajectory");
  if (error) return null;
  return data as HomeTrajectory;
}

// ─── Topic stats ───────────────────────────────────────────────────

export async function loadTopicStats(
  client: SupabaseClient,
  userId: string
): Promise<TopicStats[]> {
  const { data, error } = await (client as any)
    .from("topic_stats")
    .select("*")
    .eq("user_id", userId);
  if (error || !data) return [];
  return data as TopicStats[];
}

// ─── Profile ───────────────────────────────────────────────────────

export interface UserProfile {
  branch: string | null;
  test_type: string | null;
  target_test_date: string | null;
  free_diagnostic_used_at: string | null;
  streak_count: number;
  display_name: string | null;
}

export async function loadProfile(
  client: SupabaseClient,
  userId: string
): Promise<UserProfile | null> {
  const { data, error } = await (client as any)
    .from("profiles")
    .select("branch, test_type, target_test_date, free_diagnostic_used_at, streak_count, display_name")
    .eq("user_id", userId)
    .maybeSingle();
  if (error || !data) return null;
  return { streak_count: 0, display_name: null, ...data } as UserProfile;
}

// ─── Session CRUD ──────────────────────────────────────────────────

export interface StudySessionRow {
  id: string;
  session_date: string;
  plan: any;
  current_station: number;
  state: any;
  status: string;
  tier_at_start: string | null;
  metric: string | null;
  scheduled_next_for: string | null;
}

export async function getSessionForDate(
  client: SupabaseClient,
  userId: string,
  sessionDate: string
): Promise<StudySessionRow | null> {
  const { data, error } = await (client as any)
    .from("study_sessions")
    .select(
      "id, session_date, plan, current_station, state, status, tier_at_start, metric, scheduled_next_for"
    )
    .eq("user_id", userId)
    .eq("session_date", sessionDate)
    .maybeSingle();
  if (error || !data) return null;
  return data as StudySessionRow;
}

export async function createSession(
  client: SupabaseClient,
  opts: {
    userId: string;
    plan: any;
    tier: string;
  }
): Promise<string | null> {
  const { data, error } = await (client as any)
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
  if (error) return null;
  return data.id;
}

export async function advanceSession(
  client: SupabaseClient,
  opts: {
    sessionId: string;
    currentStation: number;
    state: any;
  }
): Promise<void> {
  await (client as any)
    .from("study_sessions")
    .update({
      current_station: opts.currentStation,
      state: opts.state,
    })
    .eq("id", opts.sessionId);
}

export async function completeSession(
  client: SupabaseClient,
  opts: {
    sessionId: string;
    userId: string;
    studyDate: string;
    state: any;
    scheduledNextFor?: string;
  }
): Promise<void> {
  await (client as any)
    .from("study_sessions")
    .update({
      status: "completed",
      state: opts.state,
      scheduled_next_for: opts.scheduledNextFor ?? null,
    })
    .eq("id", opts.sessionId);

  await (client as any)
    .from("study_days")
    .upsert(
      {
        user_id: opts.userId,
        study_date: opts.studyDate,
        plan_version: "session_v1",
        trigger: "daily_session",
      },
      { onConflict: "user_id,study_date", ignoreDuplicates: true }
    );
}

// ─── Mistakes ──────────────────────────────────────────────────────

export async function getDueMistakeCount(
  client: SupabaseClient,
  userId: string
): Promise<number> {
  const { count, error } = await (client as any)
    .from("question_reviews")
    .select("question_id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("resolved", false)
    .lte("due_at", new Date().toISOString());
  if (error) return 0;
  return count ?? 0;
}

// ─── Attempt count ─────────────────────────────────────────────────

export async function getAttemptCount(
  client: SupabaseClient,
  userId: string
): Promise<number> {
  const { count, error } = await (client as any)
    .from("attempts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);
  if (error) return 0;
  return count ?? 0;
}
