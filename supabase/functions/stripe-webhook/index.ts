// Stripe webhook handler.
// Verifies signature, then updates profiles.billing_status / pro_until / etc.
// Events handled: checkout.session.completed, invoice.paid, customer.subscription.updated, customer.subscription.deleted

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { verifyStripeSignature, stripeRequest } from "../_shared/stripe.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? Deno.env.get("ASVABHERO_SUPABASE_URL")!;
const SERVICE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("ASVABHERO_SUPABASE_SECRET_KEY")!;
const WEBHOOK_SECRET = Deno.env.get("ASVABHERO_STRIPE_WEBHOOK_SECRET")!;
const PRICE_MONTHLY = Deno.env.get("ASVABHERO_STRIPE_PRICE_MONTHLY") ?? "";
const PRICE_ANNUAL = Deno.env.get("ASVABHERO_STRIPE_PRICE_ANNUAL") ?? "";

const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const tierFromPrice = (priceId: string | undefined | null): "monthly" | "annual" | null => {
  if (!priceId) return null;
  if (priceId === PRICE_MONTHLY) return "monthly";
  if (priceId === PRICE_ANNUAL) return "annual";
  return null;
};

const updateProfileFromSubscription = async (
  userId: string,
  sub: {
    id: string;
    status: string;
    current_period_end: number;
    cancel_at_period_end?: boolean;
    items?: { data?: { price?: { id: string } }[] };
    customer?: string;
  },
) => {
  const priceId = sub.items?.data?.[0]?.price?.id ?? null;
  const tier = tierFromPrice(priceId);
  let billingStatus: string;
  if (sub.status === "active" || sub.status === "trialing") billingStatus = "active";
  else if (sub.status === "past_due" || sub.status === "unpaid") billingStatus = "past_due";
  else if (sub.status === "canceled" || sub.status === "incomplete_expired") billingStatus = "canceled";
  else billingStatus = "free";

  const update: Record<string, unknown> = {
    billing_status: billingStatus,
    pro_tier: tier,
    pro_until: new Date(sub.current_period_end * 1000).toISOString(),
    stripe_subscription_id: sub.id,
    stripe_price_id: priceId,
    stripe_customer_id: sub.customer ?? undefined,
    pro_updated_at: new Date().toISOString(),
  };

  await supabaseAdmin.from("profiles").update(update).eq("user_id", userId);
};

const findUserIdForCustomer = async (customerId: string): Promise<string | null> => {
  const { data } = await supabaseAdmin
    .from("profiles")
    .select("user_id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();
  return data?.user_id ?? null;
};

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("method_not_allowed", { status: 405 });
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("missing_signature", { status: 400 });
  const rawBody = await req.text();

  const verify = await verifyStripeSignature(rawBody, sig, WEBHOOK_SECRET);
  if (!verify.ok) {
    console.error("verify failed", verify.reason);
    return new Response(`bad_signature: ${verify.reason}`, { status: 400 });
  }

  let event: { type: string; data: { object: Record<string, unknown> } };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response("bad_json", { status: 400 });
  }

  const obj = event.data.object as Record<string, unknown>;

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const userId = (obj.metadata as Record<string, string> | undefined)?.user_id;
        const customerId = obj.customer as string | undefined;
        const subscriptionId = obj.subscription as string | undefined;
        if (userId && customerId) {
          await supabaseAdmin
            .from("profiles")
            .update({
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
              pro_updated_at: new Date().toISOString(),
            })
            .eq("user_id", userId);
        }
        if (subscriptionId) {
          const sub = await stripeRequest<Parameters<typeof updateProfileFromSubscription>[1]>(
            "GET",
            `/subscriptions/${subscriptionId}`,
            {},
          );
          const meta = ((sub as unknown as { metadata?: Record<string, string> }).metadata) ?? {};
          const sUserId = meta.user_id ?? userId ?? (customerId ? await findUserIdForCustomer(customerId) : null);
          if (sUserId) await updateProfileFromSubscription(sUserId, sub);
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.created": {
        const sub = obj as unknown as Parameters<typeof updateProfileFromSubscription>[1];
        const meta = ((obj as { metadata?: Record<string, string> }).metadata) ?? {};
        const customerId = (obj.customer as string) ?? null;
        const userId = meta.user_id ?? (customerId ? await findUserIdForCustomer(customerId) : null);
        if (userId) await updateProfileFromSubscription(userId, sub);
        break;
      }
      case "customer.subscription.deleted": {
        const customerId = (obj.customer as string) ?? null;
        const userId = customerId ? await findUserIdForCustomer(customerId) : null;
        if (userId) {
          // Keep pro_until as-is — wall flips automatically once date passes
          await supabaseAdmin
            .from("profiles")
            .update({
              billing_status: "canceled",
              pro_updated_at: new Date().toISOString(),
            })
            .eq("user_id", userId);
        }
        break;
      }
      case "invoice.paid": {
        const subscriptionId = obj.subscription as string | undefined;
        if (subscriptionId) {
          const sub = await stripeRequest<Parameters<typeof updateProfileFromSubscription>[1]>(
            "GET",
            `/subscriptions/${subscriptionId}`,
            {},
          );
          const meta = ((sub as unknown as { metadata?: Record<string, string> }).metadata) ?? {};
          const customerId = (sub as { customer?: string }).customer ?? null;
          const userId = meta.user_id ?? (customerId ? await findUserIdForCustomer(customerId) : null);
          if (userId) await updateProfileFromSubscription(userId, sub);
        }
        break;
      }
      default:
        // ignore other events silently
        break;
    }
  } catch (err) {
    console.error("webhook handler error", event.type, err);
    return new Response("handler_error", { status: 500 });
  }

  return new Response("ok", { status: 200 });
});
