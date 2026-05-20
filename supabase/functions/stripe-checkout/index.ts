// Creates a Stripe Checkout Session for the authenticated user.
// Body: { tier: "monthly" | "annual", returnPath?: string }
// Returns: { url: string }

import { handleCors, corsHeaders } from "../_shared/cors.ts";
import { requireUser } from "../_shared/auth.ts";
import { stripeRequest } from "../_shared/stripe.ts";
import { initSentry, captureException } from "../_shared/sentry.ts";

initSentry({ surface: "stripe-checkout" });

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

    let body: { tier?: string; returnPath?: string; paywall_context_id?: string };
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
      .select("email,stripe_customer_id,stripe_subscription_id,billing_status,signup_source")
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

    // Paywall "why-tracking": carry the client-minted paywall_context_id through
    // the Stripe round-trip. Validated as a UUID so a malformed value can't
    // pollute the cancel_url. Purely additive — affects nothing else.
    const pcid =
      typeof body.paywall_context_id === "string" &&
      /^[0-9a-f-]{36}$/i.test(body.paywall_context_id)
        ? body.paywall_context_id
        : null;
    const cancelUrl = pcid
      ? `${SITE_URL}/upgrade?status=cancelled&pcid=${pcid}`
      : `${SITE_URL}/upgrade?status=cancelled`;

    // Build checkout params; conditionally add trial only for first-time MONTHLY subs.
    const checkoutParams: Record<string, unknown> = {
      mode: "subscription",
      customer: customerId,
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": 1,
      success_url: `${SITE_URL}/onboarding?welcome=1`,
      cancel_url: cancelUrl,
      allow_promotion_codes: "true",
      "subscription_data[metadata][user_id]": userId,
      "metadata[user_id]": userId,
    };

    // Durable attribution: propagate signup_source onto BOTH the checkout
    // session metadata (one-shot) and the subscription metadata (durable
    // across renewals). stripe-webhook reads subscription.metadata, so this
    // is the channel that survives long-tail conversions.
    if (profile.signup_source) {
      checkoutParams["metadata[signup_source]"] = profile.signup_source;
      checkoutParams["subscription_data[metadata][signup_source]"] = profile.signup_source;
    }

    // Paywall pcid into metadata (mirrors the signup_source propagation), so
    // the journey is recoverable from Stripe even if URL/sessionStorage is lost.
    if (pcid) {
      checkoutParams["metadata[paywall_context_id]"] = pcid;
      checkoutParams["subscription_data[metadata][paywall_context_id]"] = pcid;
    }

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
    await captureException(err, { tags: { provider: "stripe" } });
    return json(500, { error: err instanceof Error ? err.message : "internal_error" });
  }
});
