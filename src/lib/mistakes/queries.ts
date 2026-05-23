import { getSupabaseBrowserClient } from "@/lib/supabase/client";

/**
 * Spaced Mistake Bank — client data layer.
 *
 * The DB is authoritative for scheduling: every wrong answer is banked by the
 * `ingest_attempt_mistakes` trigger on `attempts`, and grading flows through the
 * `grade_question_review` RPC (SM-2 lives only in PL/pgSQL). The client just
 * reads due rows and reports correct/incorrect.
 */

/** Build-time kill switch for the Closed-Loop v0 surfaces. Off until flipped
 *  in the Cloudflare Pages env + rebuilt (mirrors why-tracking's flag). */
export function isClosedLoopEnabled(): boolean {
  return process.env.NEXT_PUBLIC_CLOSED_LOOP_ENABLED === "true";
}

/** AFQT subtests (the enlistment-eligibility score). Surfaced first. */
const AFQT_SUBTESTS = new Set(["AR", "MK", "WK", "PC"]);

export interface DueReviewRow {
  question_id: string; // external_key
  subtest: string;
  topic_id: string | null;
  repetitions: number;
  due_at: string;
}

/** Count of unresolved reviews that are due now. Cheap (head + exact count). */
export async function getDueMistakeCount(userId: string): Promise<number> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const { count } = await sb
      .from("question_reviews")
      .select("question_id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("resolved", false)
      .lte("due_at", new Date().toISOString());
    return count ?? 0;
  } catch {
    return 0;
  }
}

/**
 * Due unresolved reviews. Default order: AFQT subtests first, then soonest-due.
 * When `prioritySubtests` is provided (GT Target Mode = ordered AR/WK/PC by
 * weakest), those subtests come first in list order, then soonest-due. This is
 * presentation/queue priority only — the DB scheduler is untouched.
 */
export async function getDueMistakes(
  userId: string,
  opts?: { prioritySubtests?: string[] }
): Promise<DueReviewRow[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const { data, error } = await sb
      .from("question_reviews")
      .select("question_id, subtest, topic_id, repetitions, due_at")
      .eq("user_id", userId)
      .eq("resolved", false)
      .lte("due_at", new Date().toISOString())
      .order("due_at", { ascending: true });
    if (error || !data) return [];
    const rows = [...(data as DueReviewRow[])];

    const priority = opts?.prioritySubtests;
    if (priority && priority.length > 0) {
      const rank = new Map(priority.map((s, i) => [s, i]));
      return rows.sort((a, b) => {
        const ar = rank.has(a.subtest) ? (rank.get(a.subtest) as number) : Infinity;
        const br = rank.has(b.subtest) ? (rank.get(b.subtest) as number) : Infinity;
        if (ar !== br) return ar - br;
        return new Date(a.due_at).getTime() - new Date(b.due_at).getTime();
      });
    }

    return rows.sort((a, b) => {
      const aAfqt = AFQT_SUBTESTS.has(a.subtest) ? 0 : 1;
      const bAfqt = AFQT_SUBTESTS.has(b.subtest) ? 0 : 1;
      if (aAfqt !== bAfqt) return aAfqt - bAfqt;
      return new Date(a.due_at).getTime() - new Date(b.due_at).getTime();
    });
  } catch {
    return [];
  }
}

/** Grade a review. DB applies the 0->3->4 ladder, spacing, and graduation. */
export async function gradeMistakeReview(
  questionId: string,
  correct: boolean,
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sb = getSupabaseBrowserClient() as any;
  await sb.rpc("grade_question_review", {
    p_question_id: questionId,
    p_correct: correct,
  });
}
