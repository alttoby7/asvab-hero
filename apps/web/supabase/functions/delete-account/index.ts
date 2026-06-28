import { handleCors, CORS_HEADERS } from "../_shared/cors.ts";
import { requireUser } from "../_shared/auth.ts";
import { initSentry, captureException } from "../_shared/sentry.ts";

initSentry({ surface: "delete-account" });

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { userId, supabaseAdmin } = await requireUser(req);

    // Delete the auth.users row — cascade deletes profiles → attempts, topic_stats,
    // flashcard_reviews, daily_challenges, study_guide_progress via ON DELETE CASCADE.
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) {
      console.error("deleteUser error:", error);
      await captureException(error, {
        tags: { provider: "supabase-auth", user_id: userId },
      });
      return new Response(
        JSON.stringify({ error: "Failed to delete account", details: error.message }),
        { status: 500, headers: { "Content-Type": "application/json", ...CORS_HEADERS } }
      );
    }

    return new Response(
      JSON.stringify({ deleted: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...CORS_HEADERS } }
    );
  } catch (err) {
    if (err instanceof Response) return addCorsHeaders(err);

    console.error("Unexpected error:", err);
    await captureException(err);
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
