// Creates a Stripe Checkout Session for the authenticated user.
// Body: { tier: "monthly" | "annual", returnPath?: string }
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

Deno.serve(async (req) => {
  const cors = handleCors(req);
  if (cors) return cors;
  if (req.method !== "POST") return json(405, { error: "method_not_allowed" });

  const auth = await requireUser(req);
  if (!auth.ok) return json(401, { error: auth.error });
  const { userId, supabaseAdmin } = auth;

  let body: { tier?: string; returnPath?: string };
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "invalid_json" });
  }

  const tier = body.tier;
  const priceId =
    tier === "monthly"
      ? Deno.env.get("ASVABHERO_STRIPE_PRICE_MONTHLY")
      : tier === "annual"
        ? Deno.env.get("ASVABHERO_STRIPE_PRICE_ANNUAL")
        : null;
  if (!priceId) return json(400, { error: "invalid_tier" });

  // Fetch profile for existing customer + email
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("email,stripe_customer_id,billing_status")
    .eq("user_id", userId)
    .single();
  if (!profile) return json(404, { error: "profile_not_found" });
  if (profile.billing_status === "active" || profile.billing_status === "lifetime") {
    return json(409, { error: "already_pro" });
  }

  let customerId = profile.stripe_customer_id;
  if (!customerId) {
    const customer = await stripeRequest<{ id: string }>("POST", "/customers", {
      email: profile.email,
      metadata: { user_id: userId },
    });
    customerId = customer.id;
    await supabaseAdmin
      .from("profiles")
      .update({ stripe_customer_id: customerId })
      .eq("user_id", userId);
  }

  const returnPath = body.returnPath ?? "/account/billing";
  const session = await stripeRequest<{ id: string; url: string }>("POST", "/checkout/sessions", {
    mode: "subscription",
    customer: customerId,
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": 1,
    success_url: `${SITE_URL}${returnPath}?status=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/upgrade?status=cancelled`,
    allow_promotion_codes: "true",
    "subscription_data[metadata][user_id]": userId,
    "metadata[user_id]": userId,
  });

  return json(200, { url: session.url });
});
