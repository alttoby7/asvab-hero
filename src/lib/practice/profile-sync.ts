/**
 * Dual-store profile + attempt persistence.
 *
 * Authenticated users:
 *   - `loadProfile`    → SELECT topic_stats WHERE user_id = $1
 *   - `saveAttempt`    → INSERT attempts; then RPC recompute_topic_stats(user, topic_ids)
 *
 * Anonymous users:
 *   - `loadProfile`    → reads localStorage["asvabhero.practiceProfile.v1"]
 *   - `saveAttempt`    → appends to localStorage["asvabhero.practiceHistory.v1"]
 *                        and rebuilds practiceProfile.v1 by replaying every
 *                        attempt — matches the SQL function's formula exactly.
 *
 * **Posterior formula (must match `recompute_topic_stats` in the migration):**
 *   posterior  = (correct + 1) / (seen + 2)
 *   confidence = min(seen / 8, 1)
 *   priority   = (1 - posterior) * confidence
 *   status:
 *     seen < 3                            → 'unmeasured'
 *     posterior > 0.75 AND seen >= 5      → 'strong'
 *     posterior >= 0.55 AND seen >= 4     → 'developing'
 *     else                                → 'weak'
 */
import * as Sentry from "@sentry/nextjs";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Attempt, AttemptPayload, TopicStats } from "@/types";

export const HISTORY_KEY = "asvabhero.practiceHistory.v1";
export const PROFILE_KEY = "asvabhero.practiceProfile.v1";

// ─── Posterior recompute (mirrors SQL function) ─────────────────────────────

export function computeTopicStats(
  topicId: string,
  seen: number,
  correct: number,
  lastSeenAt: string | null
): TopicStats {
  const posterior = (correct + 1) / (seen + 2);
  const confidence = Math.min(seen / 8, 1);
  const priority = (1 - posterior) * confidence;

  let status: TopicStats["status"];
  if (seen < 3) status = "unmeasured";
  else if (posterior > 0.75 && seen >= 5) status = "strong";
  else if (posterior >= 0.55 && seen >= 4) status = "developing";
  else status = "weak";

  return {
    topic_id: topicId,
    seen,
    correct,
    posterior: Number(posterior.toFixed(4)),
    confidence: Number(confidence.toFixed(4)),
    priority: Number(priority.toFixed(4)),
    status,
    last_seen_at: lastSeenAt,
    updated_at: new Date().toISOString(),
  };
}

/** Re-derive the entire topic_stats array from a list of attempts. */
export function rebuildProfileFromHistory(history: Attempt[]): TopicStats[] {
  const agg = new Map<
    string,
    { seen: number; correct: number; lastSeenAt: string | null }
  >();
  for (const att of history) {
    for (const [topicId, val] of Object.entries(att.results_by_topic)) {
      const prior = agg.get(topicId) ?? {
        seen: 0,
        correct: 0,
        lastSeenAt: null,
      };
      prior.seen += val.seen;
      prior.correct += val.correct;
      const completedAt = att.completed_at;
      if (
        prior.lastSeenAt === null ||
        new Date(completedAt) > new Date(prior.lastSeenAt)
      ) {
        prior.lastSeenAt = completedAt;
      }
      agg.set(topicId, prior);
    }
  }
  return Array.from(agg.entries()).map(([topicId, v]) =>
    computeTopicStats(topicId, v.seen, v.correct, v.lastSeenAt)
  );
}

// ─── Local storage helpers ──────────────────────────────────────────────────

function readLocalHistory(): Attempt[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Attempt[]) : [];
  } catch {
    return [];
  }
}

function writeLocalHistory(history: Attempt[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    /* quota; ignore */
  }
}

function readLocalProfile(): TopicStats[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as TopicStats[]) : [];
  } catch {
    return [];
  }
}

function writeLocalProfile(profile: TopicStats[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {
    /* quota; ignore */
  }
}

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * For anonymous users (`userId === null`): returns [] when no local profile
 * exists, otherwise the array stored in localStorage.
 *
 * For logged-in users: SELECT * FROM topic_stats. If the query fails, falls
 * back to local — this keeps the results screen working even if the DB blip
 * is transient.
 */
export async function loadProfile(
  userId: string | null
): Promise<TopicStats[]> {
  if (!userId) return readLocalProfile();
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const { data, error } = await sb
      .from("topic_stats")
      .select(
        "topic_id, seen, correct, posterior, confidence, priority, status, last_seen_at, updated_at"
      )
      .eq("user_id", userId);
    if (error || !data) throw error ?? new Error("no_data");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data as any[]).map((d) => ({
      user_id: userId,
      topic_id: d.topic_id as string,
      seen: d.seen as number,
      correct: d.correct as number,
      posterior: Number(d.posterior),
      confidence: Number(d.confidence),
      priority: Number(d.priority),
      status: d.status as TopicStats["status"],
      last_seen_at: d.last_seen_at as string | null,
      updated_at: d.updated_at as string,
    }));
  } catch {
    return readLocalProfile();
  }
}

export interface SaveAttemptResult {
  ok: boolean;
  storedRemote: boolean;
  attemptId?: string;
  /** The recomputed profile after this attempt (for UI to consume). */
  profile: TopicStats[];
}

export async function saveAttempt(
  attempt: AttemptPayload,
  userId: string | null
): Promise<SaveAttemptResult> {
  // ── Logged-in: server-of-record is Supabase. ────────────────────────────
  if (userId) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sb = getSupabaseBrowserClient() as any;
      const insert = {
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
        synced_from_local: false,
      };
      const { data: row, error: insErr } = await sb
        .from("attempts")
        .insert(insert)
        .select("id")
        .single();
      if (insErr) throw insErr;

      // Durable "study day completed" event (migration 0028) — the dose metric
      // for paired-diagnostic AFQT-delta analysis. One row per user per local
      // day; idempotent. Non-blocking — never fail an attempt over telemetry.
      try {
        const now = new Date();
        const localDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
        await sb
          .from("study_days")
          .upsert(
            { user_id: userId, study_date: localDate, trigger: attempt.variant_code },
            { onConflict: "user_id,study_date", ignoreDuplicates: true }
          );
      } catch {
        /* telemetry-only; ignore */
      }

      // topic_stats recompute AND Spaced Mistake Bank ingestion are handled
      // DB-side by the ingest_attempt_mistakes trigger on `attempts` (migration
      // 0017) — single authoritative pipeline, fired on the insert above.

      // Stamp free_diagnostic_used_at for authed users on their first diagnostic.
      if (attempt.variant_code === "diagnostic") {
        try {
          await sb
            .from("profiles")
            .update({ free_diagnostic_used_at: attempt.completed_at })
            .eq("user_id", userId)
            .is("free_diagnostic_used_at", null); // idempotent: only writes when null
        } catch {
          /* non-blocking */
        }
      }

      const profile = await loadProfile(userId);
      return {
        ok: true,
        storedRemote: true,
        attemptId: (row?.id as string) ?? undefined,
        profile,
      };
    } catch (err) {
      // A logged-in user's attempt failed to persist remotely. This is the
      // exact silent failure that hid the Daily Challenge ingest bug for ~9
      // days — surface it (Sentry + console) before falling through to local
      // persistence so we don't lose the attempt but DO get alerted.
      console.error("[saveAttempt] remote insert failed for authed user; falling back to localStorage:", err);
      Sentry.captureException(err, {
        tags: { area: "saveAttempt", outcome: "remote_insert_failed" },
        extra: { variant_code: attempt.variant_code, source: attempt.source },
      });
      // Fall through to local persistence so we don't lose the attempt.
    }
  }

  // ── Anonymous (or remote failed): write to localStorage. ────────────────
  const fullAttempt: Attempt = {
    ...attempt,
    id: attempt.client_attempt_id, // local-only stable id
  };
  const history = [...readLocalHistory(), fullAttempt];
  writeLocalHistory(history);

  const profile = rebuildProfileFromHistory(history);
  writeLocalProfile(profile);

  return {
    ok: true,
    storedRemote: false,
    attemptId: fullAttempt.id,
    profile,
  };
}

/** Generate a UUID-ish client_attempt_id (no `crypto.randomUUID` polyfill needed). */
export function generateClientAttemptId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  // Fallback: time + random.
  return `${Date.now().toString(16)}-${Math.random().toString(16).slice(2, 10)}`;
}
