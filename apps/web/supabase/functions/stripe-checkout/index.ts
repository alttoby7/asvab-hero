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
    // One-time "pass" tiers grant time-boxed Pro (mode: payment); the others
    // are recurring subscriptions. pass_days drives pro_until in the webhook.
    const PASS_DAYS: Record<string, number> = { pass90: 90 };
    const TIER_VALUE: Record<string, string> = {
      monthly: "14.99",
      annual: "49.99",
      pass90: "39.00",
    };
    // Human-readable charge/subscription description so the Stripe dashboard
    // shows a real label instead of falling back to the bare pi_… id.
    const TIER_LABEL: Record<string, string> = {
      monthly: "ASVAB Hero Pro — Monthly",
      annual: "ASVAB Hero Pro — Annual",
      pass90: "ASVAB Hero Pro — 90-Day Pass",
    };
    const isPass = tier === "pass90";
    const priceId =
      tier === "monthly"
        ? Deno.env.get("ASVABHERO_STRIPE_PRICE_MONTHLY")
        : tier === "annual"
          ? Deno.env.get("ASVABHERO_STRIPE_PRICE_ANNUAL")
          : tier === "pass90"
            ? Deno.env.get("ASVABHERO_STRIPE_PRICE_PASS90")
            : null;
    if (!priceId) return json(400, { error: "invalid_tier" });

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("email,stripe_customer_id,stripe_subscription_id,billing_status,pro_until,signup_source")
      .eq("user_id", userId)
      .single();
    if (!profile) return json(404, { error: "profile_not_found" });
    // Trial / re-purchase rules:
    //   - Users who are STILL Pro are blocked from checkout (already Pro).
    //     "Still Pro" = lifetime, or active with pro_until in the future. A
    //     lapsed pass leaves billing_status='active' but pro_until in the past
    //     (nothing flips it back at expiry), so we must check the date or a
    //     returning pass buyer would be wrongly blocked from buying again.
    //   - First-time monthly subscribers get a 7-day card-required trial via
    //     `subscription_data[trial_period_days]=7` below.
    //   - Returning users (any prior `stripe_subscription_id`, including canceled)
    //     get charged immediately at checkout — one trial per user, period.
    //   - Annual + pass tiers never get a trial; direct charge.
    const stillPro =
      profile.billing_status === "lifetime" ||
      (profile.billing_status === "active" &&
        (!profile.pro_until || new Date(profile.pro_until as string) > new Date()));
    if (stillPro) {
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

    // Build checkout params. Passes are one-time payments; monthly/annual are
    // subscriptions (and monthly gets a first-time 7-day trial).
    const checkoutValue = TIER_VALUE[tier] ?? "14.99";
    const checkoutParams: Record<string, unknown> = {
      mode: isPass ? "payment" : "subscription",
      customer: customerId,
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": 1,
      // Carry plan + list value so the client can fire an accurate GA4 purchase
      // event on the success return (no Measurement Protocol secret needed).
      success_url: `${SITE_URL}/onboarding?welcome=1&plan=${tier}&value=${checkoutValue}`,
      cancel_url: cancelUrl,
      allow_promotion_codes: "true",
      "metadata[user_id]": userId,
    };

    const tierLabel = TIER_LABEL[tier] ?? "ASVAB Hero Pro";
    if (isPass) {
      // One-time pass: the webhook reads these off checkout.session.completed
      // (no subscription exists) to set billing_status='active', the pro_tier,
      // and pro_until = now + pass_days.
      checkoutParams["metadata[pass_type]"] = tier;
      checkoutParams["metadata[pass_days]"] = String(PASS_DAYS[tier]);
      // Durable copy on the PaymentIntent in case the session object is ever
      // re-fetched without metadata.
      checkoutParams["payment_intent_data[metadata][user_id]"] = userId;
      checkoutParams["payment_intent_data[metadata][pass_type]"] = tier;
      checkoutParams["payment_intent_data[metadata][pass_days]"] = String(PASS_DAYS[tier]);
      // Human-readable label on the charge (dashboard "Description" column).
      checkoutParams["payment_intent_data[description]"] = tierLabel;
    } else {
      // Subscription metadata (durable across renewals; the webhook reads
      // subscription.metadata for long-tail conversions).
      checkoutParams["subscription_data[metadata][user_id]"] = userId;
      // Human-readable label on the subscription + its invoices/charges.
      checkoutParams["subscription_data[description]"] = tierLabel;
    }

    // Durable attribution: propagate signup_source onto the session metadata
    // (one-shot) and, for subs, the subscription metadata (durable across
    // renewals). stripe-webhook reads subscription.metadata for subs and
    // session.metadata for passes.
    if (profile.signup_source) {
      checkoutParams["metadata[signup_source]"] = profile.signup_source;
      if (isPass) {
        checkoutParams["payment_intent_data[metadata][signup_source]"] = profile.signup_source;
      } else {
        checkoutParams["subscription_data[metadata][signup_source]"] = profile.signup_source;
      }
    }

    // Paywall pcid into metadata (mirrors the signup_source propagation), so
    // the journey is recoverable from Stripe even if URL/sessionStorage is lost.
    if (pcid) {
      checkoutParams["metadata[paywall_context_id]"] = pcid;
      if (isPass) {
        checkoutParams["payment_intent_data[metadata][paywall_context_id]"] = pcid;
      } else {
        checkoutParams["subscription_data[metadata][paywall_context_id]"] = pcid;
      }
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
