import { handleCors, CORS_HEADERS } from "../_shared/cors.ts";
import { requireUser } from "../_shared/auth.ts";

interface QuestionResult {
  question_id: string;
  selected: number;
  correct: boolean;
  topic_id: string;
}

interface SubtestResult {
  seen: number;
  correct: number;
}

interface HistoryItem {
  client_attempt_id: string;
  variant_code: string;
  source: "practice" | "mini_drill" | "daily_challenge";
  subtest?: string;
  topic_id?: string;
  started_at: string;
  completed_at: string;
  duration_seconds: number;
  question_count: number;
  correct_count: number;
  afqt_estimate?: number;
  results_by_subtest: Record<string, SubtestResult>;
  results_by_topic: Record<string, SubtestResult>;
  question_results: QuestionResult[];
}

interface RequestBody {
  history: HistoryItem[];
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { userId, supabaseAdmin } = await requireUser(req);

    let body: RequestBody;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400, headers: { "Content-Type": "application/json", ...CORS_HEADERS } }
      );
    }

    const { history } = body;
    if (!Array.isArray(history)) {
      return new Response(
        JSON.stringify({ error: "history must be an array" }),
        { status: 400, headers: { "Content-Type": "application/json", ...CORS_HEADERS } }
      );
    }

    let imported = 0;
    let skippedDupes = 0;
    const topicIdSet = new Set<string>();

    for (const item of history) {
      // Collect all topic IDs referenced in this attempt
      for (const topicId of Object.keys(item.results_by_topic ?? {})) {
        if (topicId) topicIdSet.add(topicId);
      }
      if (item.topic_id) topicIdSet.add(item.topic_id);

      const { error } = await supabaseAdmin.from("attempts").insert({
        user_id: userId,
        client_attempt_id: item.client_attempt_id,
        variant_code: item.variant_code,
        source: item.source,
        subtest: item.subtest ?? null,
        topic_id: item.topic_id ?? null,
        started_at: item.started_at,
        completed_at: item.completed_at,
        duration_seconds: item.duration_seconds,
        question_count: item.question_count,
        correct_count: item.correct_count,
        afqt_estimate: item.afqt_estimate ?? null,
        results_by_subtest: item.results_by_subtest ?? {},
        results_by_topic: item.results_by_topic ?? {},
        question_results: item.question_results ?? [],
        synced_from_local: true,
      });

      if (error) {
        // Unique constraint violation = duplicate; skip
        if (error.code === "23505") {
          skippedDupes++;
        } else {
          console.error("Insert error:", error);
          // Non-dupe errors: skip item but continue
          skippedDupes++;
        }
      } else {
        imported++;
      }
    }

    // Recompute topic_stats for all affected topics in one call
    const topicIds = Array.from(topicIdSet).filter(Boolean);
    let recomputedTopics = 0;

    if (topicIds.length > 0) {
      const { data: rpcData, error: rpcError } = await supabaseAdmin.rpc(
        "recompute_topic_stats",
        { p_user_id: userId, p_topic_ids: topicIds }
      );

      if (rpcError) {
        console.error("recompute_topic_stats error:", rpcError);
        // Non-fatal: still return success with partial data
      } else {
        recomputedTopics = topicIds.length;
      }
    }

    return new Response(
      JSON.stringify({ imported, skipped_dupes: skippedDupes, recomputed_topics: recomputedTopics }),
      { status: 200, headers: { "Content-Type": "application/json", ...CORS_HEADERS } }
    );
  } catch (err) {
    // requireUser throws a Response on auth failure
    if (err instanceof Response) return addCorsHeaders(err);

    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...CORS_HEADERS } }
    );
  }
});

function addCorsHeaders(res: Response): Response {
  const newHeaders = new Headers(res.headers);
  for (const [k, v] of Object.entries(CORS_HEADERS)) {
    newHeaders.set(k, v);
  }
  return new Response(res.body, { status: res.status, headers: newHeaders });
}
