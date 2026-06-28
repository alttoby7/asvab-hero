import { handleCors, CORS_HEADERS } from "../_shared/cors.ts";
import { requireUser } from "../_shared/auth.ts";

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { userId, supabaseAdmin } = await requireUser(req);

    // Fetch all user data in parallel
    const [
      profileResult,
      attemptsResult,
      topicStatsResult,
      flashcardReviewsResult,
      dailyChallengesResult,
      studyGuideProgressResult,
    ] = await Promise.all([
      supabaseAdmin
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle(),
      supabaseAdmin
        .from("attempts")
        .select("*")
        .eq("user_id", userId)
        .order("completed_at", { ascending: false }),
      supabaseAdmin
        .from("topic_stats")
        .select("*")
        .eq("user_id", userId),
      supabaseAdmin
        .from("flashcard_reviews")
        .select("*")
        .eq("user_id", userId),
      supabaseAdmin
        .from("daily_challenges")
        .select("*")
        .eq("user_id", userId)
        .order("challenge_date", { ascending: false }),
      supabaseAdmin
        .from("study_guide_progress")
        .select("*")
        .eq("user_id", userId),
    ]);

    // Collect any query errors
    const errors = [
      profileResult.error,
      attemptsResult.error,
      topicStatsResult.error,
      flashcardReviewsResult.error,
      dailyChallengesResult.error,
      studyGuideProgressResult.error,
    ].filter(Boolean);

    if (errors.length > 0) {
      console.error("Export query errors:", errors);
      return new Response(
        JSON.stringify({ error: "Failed to fetch account data", details: errors.map((e) => e!.message) }),
        { status: 500, headers: { "Content-Type": "application/json", ...CORS_HEADERS } }
      );
    }

    const payload = {
      exported_at: new Date().toISOString(),
      profile: profileResult.data ?? null,
      attempts: attemptsResult.data ?? [],
      topic_stats: topicStatsResult.data ?? [],
      flashcard_reviews: flashcardReviewsResult.data ?? [],
      daily_challenges: dailyChallengesResult.data ?? [],
      study_guide_progress: studyGuideProgressResult.data ?? [],
    };

    return new Response(JSON.stringify(payload, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": 'attachment; filename="asvabhero-account-data.json"',
        ...CORS_HEADERS,
      },
    });
  } catch (err) {
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
