// Creates a Stripe Customer Portal session for the authenticated user.
// Body: {} (returnPath optional)
// Returns: { url: string }

import { handleCors, corsHeaders } from "../_shared/cors.ts";
import { requireUser } from "../_shared/auth.ts";
import { stripeRequest } from "../_shared/stripe.ts";

const json = (status: number, data: unknown) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const SITE_URL = Deno.env.get("ASVABHERO_SITE_URL") ?? "https://asvabhero.com";

const addCors = (res: Response): Response => {
  for (const [k, v] of Object.entries(corsHeaders)) res.headers.set(k, v);
  return res;
};

Deno.serve(async (req) => {
  const cors = handleCors(req);
  if (cors) return cors;
  if (req.method !== "POST") return json(405, { error: "method_not_allowed" });

  try {
    const { userId, supabaseAdmin } = await requireUser(req);

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("stripe_customer_id")
      .eq("user_id", userId)
      .single();
    if (!profile?.stripe_customer_id) {
      return json(404, { error: "no_stripe_customer" });
    }

    const body = await req.json().catch(() => ({}));
    const returnPath = body.returnPath ?? "/account/billing";

    const session = await stripeRequest<{ url: string }>("POST", "/billing_portal/sessions", {
      customer: profile.stripe_customer_id,
      return_url: `${SITE_URL}${returnPath}`,
    });

    return json(200, { url: session.url });
  } catch (err) {
    if (err instanceof Response) return addCors(err);
    console.error("stripe-portal error:", err);
    return json(500, { error: err instanceof Error ? err.message : "internal_error" });
  }
});
