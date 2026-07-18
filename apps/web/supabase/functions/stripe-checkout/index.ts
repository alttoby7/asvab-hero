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

// Deterministic trial-variant assignment for the "$1 for 7 days" experiment
// (codex-validated design, 2026-07-18). Read at call time so a rollout-percent
// change takes effect on the next deploy without code changes. Returns
// "free_7d" | "paid_1_7d". A paid assignment ALWAYS requires the one-time $1
// price id; without it we fall back to free_7d so a misconfiguration can never
// break checkout or ship a "paid" arm that can't actually charge the $1.
//   STRIPE_MONTHLY_TRIAL_EXPERIMENT = off | free_only | paid_only | hash_rollout
//   STRIPE_MONTHLY_TRIAL_PAID_PCT   = 0..100 (used only when hash_rollout)
// Assignment is a stable hash of userId, so a given user always sees the same
// variant (a real cohort, not a per-request coin flip).
function assignTrialVariant(userId: string): "free_7d" | "paid_1_7d" {
  const mode = Deno.env.get("STRIPE_MONTHLY_TRIAL_EXPERIMENT") ?? "off";
  const hasDollarPrice = !!Deno.env.get("ASVABHERO_STRIPE_PRICE_TRIAL_DOLLAR");
  if (mode === "off" || mode === "free_only" || !hasDollarPrice) return "free_7d";
  if (mode === "paid_only") return "paid_1_7d";
  if (mode === "hash_rollout") {
    const pct = Math.max(
      0,
      Math.min(100, parseInt(Deno.env.get("STRIPE_MONTHLY_TRIAL_PAID_PCT") ?? "0", 10) || 0),
    );
    let h = 2166136261; // FNV-1a
    for (let i = 0; i < userId.length; i++) {
      h ^= userId.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0) % 100 < pct ? "paid_1_7d" : "free_7d";
  }
  return "free_7d";
}

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
      pass90: "59.00",
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
    // Trial experiment: only a first-time monthly subscriber gets a trial, and
    // only that flow is eligible for the "$1 for 7 days" variant. Computed here
    // (before success_url) so the variant can ride the redirect for client
    // analytics; the authoritative conversion signal is still the webhook.
    const isFirstTimeSubscriber = !profile.stripe_subscription_id;
    const trialVariant =
      tier === "monthly" && isFirstTimeSubscriber ? assignTrialVariant(userId) : null;
    const checkoutParams: Record<string, unknown> = {
      mode: isPass ? "payment" : "subscription",
      customer: customerId,
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": 1,
      // Carry plan + list value so the client can fire an accurate GA4 purchase
      // event on the success return (no Measurement Protocol secret needed).
      // {CHECKOUT_SESSION_ID} is expanded by Stripe; it becomes the Meta Pixel
      // eventID so the browser Purchase and (future) Conversions API Purchase
      // deduplicate to a single conversion.
      success_url: `${SITE_URL}/onboarding?welcome=1&plan=${tier}&value=${checkoutValue}&variant=${trialVariant ?? "none"}&sid={CHECKOUT_SESSION_ID}`,
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
      // Recurring tiers (monthly / annual): card + card-backed wallets
      // (Apple Pay / Google Pay / Link) ONLY. Pinning payment_method_types
      // disables Stripe's automatic payment methods, which is what removes
      // Cash App Pay. Cash App wallet balances are routinely empty at renewal
      // and were the sole cause of every "expired at day 7" trial — all day-7
      // charge failures traced to cashapp_payment_declined (insufficient
      // funds). One-time passes keep Cash App: they charge immediately, so an
      // empty wallet just fails at checkout with nothing left to renew.
      checkoutParams["payment_method_types[0]"] = "card";
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

    if (tier === "monthly" && isFirstTimeSubscriber) {
      checkoutParams["subscription_data[trial_period_days]"] = "7";
      // Required so card is captured up front even with a trial.
      checkoutParams["payment_method_collection"] = "always";

      // "$1 for 7 days" variant: add the one-time $1 Price as a second line item
      // on the SAME subscription-mode session. Stripe invoices a one-time line
      // item immediately at trial start ($1 now) while the recurring price still
      // begins billing at day 7 — one card entry, no double-charge. The webhook's
      // conversion signals (trial-converted email, Meta Subscribe) are gated on
      // billing_reason='subscription_cycle', so this $1 'subscription_create'
      // invoice is NOT counted as a paid conversion. assignTrialVariant only
      // returns paid_1_7d when ASVABHERO_STRIPE_PRICE_TRIAL_DOLLAR is set.
      if (trialVariant === "paid_1_7d") {
        checkoutParams["line_items[1][price]"] = Deno.env.get(
          "ASVABHERO_STRIPE_PRICE_TRIAL_DOLLAR",
        );
        checkoutParams["line_items[1][quantity]"] = 1;
      }
      // Stamp the variant so the webhook + analytics can attribute outcomes to
      // the correct arm (session metadata one-shot; subscription metadata durable).
      checkoutParams["metadata[trial_variant]"] = trialVariant ?? "free_7d";
      checkoutParams["subscription_data[metadata][trial_variant]"] = trialVariant ?? "free_7d";
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
