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

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("email,stripe_customer_id,stripe_subscription_id,billing_status")
      .eq("user_id", userId)
      .single();
    if (!profile) return json(404, { error: "profile_not_found" });
    // Trial rules:
    //   - Active/lifetime users are blocked from checkout entirely (already Pro).
    //   - First-time monthly subscribers get a 7-day card-required trial via
    //     `subscription_data[trial_period_days]=7` below.
    //   - Returning users (any prior `stripe_subscription_id`, including canceled)
    //     get charged immediately at checkout — one trial per user, period.
    //   - Annual tier never gets a trial; direct charge.
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

    // Build checkout params; conditionally add trial only for first-time MONTHLY subs.
    const checkoutParams: Record<string, unknown> = {
      mode: "subscription",
      customer: customerId,
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": 1,
      success_url: `${SITE_URL}/onboarding?welcome=1`,
      cancel_url: `${SITE_URL}/upgrade?status=cancelled`,
      allow_promotion_codes: "true",
      "subscription_data[metadata][user_id]": userId,
      "metadata[user_id]": userId,
    };

    const isFirstTimeSubscriber = !profile.stripe_subscription_id;
    if (tier === "monthly" && isFirstTimeSubscriber) {
      checkoutParams["subscription_data[trial_period_days]"] = "7";
      // Required so card is captured up front even with a trial.
      checkoutParams["payment_method_collection"] = "always";
    }

    const session = await stripeRequest<{ id: string; url: string }>(
      "POST",
      "/checkout/sessions",
      checkoutParams,
    );

    return json(200, { url: session.url });
  } catch (err) {
    if (err instanceof Response) return addCors(err);
    console.error("stripe-checkout error:", err);
    return json(500, { error: err instanceof Error ? err.message : "internal_error" });
  }
});
