// Stripe webhook handler.
// Verifies signature, then updates profiles.billing_status / pro_until / etc.
// Events handled: checkout.session.completed, invoice.paid,
//   customer.subscription.updated, customer.subscription.created,
//   customer.subscription.deleted, customer.subscription.trial_will_end

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

const extractFirstName = (rawName: string | null | undefined): string | null => {
  if (!rawName) return null;
  const candidate = rawName.trim().split(/\s+/)[0] ?? "";
  if (candidate.length < 2) return null;
  if (!/^[A-Za-z][A-Za-z'\-]*$/.test(candidate)) return null;
  return candidate;
};

const renderWelcomePaid = (firstName: string): string => `\
<p>Hi ${firstName},</p>

<p>You are in. Pro is unlocked on your account, which means:</p>
<ul>
  <li>Unlimited adaptive practice tests across all 9 subtests</li>
  <li>Full score history and weak-topic drills</li>
  <li>39 study guides covering every ASVAB topic</li>
</ul>

<p>Two things that might help today:</p>
<ol>
  <li>Take a diagnostic if you have not yet, at <a href="https://asvabhero.com/practice">asvabhero.com/practice</a></li>
  <li>Reply to this email with your branch and target test date. I read every reply.</li>
</ol>

<p>Trish<br>ASVAB Hero</p>
`;

const renderWelcomeTrial = (firstName: string): string => `\
<p>Hi ${firstName},</p>

<p>Your 7-day ASVAB Hero Pro trial just started. Here is how to make it count.</p>

<p>You have full Pro access for the next 7 days:</p>
<ul>
  <li>Unlimited adaptive practice tests across all 9 subtests</li>
  <li>Full score history and weak-topic drills</li>
  <li>39 study guides covering every ASVAB topic</li>
</ul>

<p>Three quick wins for the trial week:</p>
<ol>
  <li>Take a diagnostic at <a href="https://asvabhero.com/practice">asvabhero.com/practice</a> so the platform learns your weak topics</li>
  <li>Run two 25-question subtest drills on your weakest area</li>
  <li>Re-take the diagnostic on day 6 to see your score move</li>
</ol>

<p>If Pro is helping, do nothing. Your card runs on day 8 at $9.99 and you keep going. If it is not the right fit, cancel any time at <a href="https://asvabhero.com/account/billing">asvabhero.com/account/billing</a>.</p>

<p>Reply with your branch and target test date. I read every reply.</p>

<p>Trish<br>ASVAB Hero</p>
`;

// Send the post-Stripe-checkout welcome email via Resend.
// Idempotent via profiles.welcome_email_sent_at. Never throws; never fails the webhook.
// Fires from checkout.session.completed only — single event, no race risk.
const sendWelcomeEmail = async (args: {
  userId: string | null;
  customerEmail: string | undefined;
  customerName: string | null;
  isTrial: boolean;
  eventType: string;
}): Promise<void> => {
  const { userId, customerEmail, customerName, isTrial, eventType } = args;
  if (!userId || !customerEmail) {
    console.log("welcome: missing userId or customerEmail, skipping", { userId, hasEmail: !!customerEmail });
    return;
  }

  const resendKey = Deno.env.get("ASVAB_RESEND_API_KEY");
  if (!resendKey) {
    console.log("welcome: ASVAB_RESEND_API_KEY not set, skipping");
    return;
  }

  // Idempotency check + display_name read.
  const { data: profile, error: profileErr } = await supabaseAdmin
    .from("profiles")
    .select("welcome_email_sent_at, display_name")
    .eq("user_id", userId)
    .maybeSingle();

  if (profileErr) {
    console.error("welcome: profile read failed", { userId, error: profileErr.message });
    return;
  }
  if (!profile) {
    console.log("welcome: profile not found, skipping", { userId });
    return;
  }
  if (profile.welcome_email_sent_at) {
    console.log("welcome: already sent, skipping", { userId, sent_at: profile.welcome_email_sent_at });
    return;
  }

  const firstName = extractFirstName(customerName);

  // Backfill display_name only when currently null and we have a clean parse.
  if (firstName && !profile.display_name) {
    const { error: nameErr } = await supabaseAdmin
      .from("profiles")
      .update({ display_name: firstName })
      .eq("user_id", userId);
    if (nameErr) {
      console.error("welcome: display_name update failed", { userId, error: nameErr.message });
    }
  }

  const greetingName = firstName ?? profile.display_name ?? "there";
  const templateLabel = isTrial ? "welcome-trial" : "welcome-paid";
  const subject = isTrial
    ? "Your 7-day ASVAB Hero Pro trial just started"
    : "Welcome to ASVAB Hero Pro";
  const html = isTrial ? renderWelcomeTrial(greetingName) : renderWelcomePaid(greetingName);

  let resendId: string | null = null;
  let status: string;
  let updateTimestamp = false;

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "Trish at ASVAB Hero <info@asvabhero.com>",
        to: [customerEmail],
        reply_to: "trish@dach.family",
        subject,
        html,
      }),
    });

    if (resp.ok) {
      const body = (await resp.json().catch(() => ({}))) as { id?: string };
      resendId = body.id ?? null;
      status = "sent";
      updateTimestamp = true;
      console.log(
        "welcome: sent",
        JSON.stringify({
          event_type: eventType,
          user_id: userId,
          email: customerEmail,
          template: templateLabel,
          resend_status: resp.status,
          resend_id: resendId,
        }),
      );
    } else {
      const errBody = await resp.text().catch(() => "");
      status = `error_${resp.status}`;
      console.error(
        "welcome: resend non-2xx",
        JSON.stringify({
          event_type: eventType,
          user_id: userId,
          email: customerEmail,
          template: templateLabel,
          resend_status: resp.status,
          resend_body: errBody.slice(0, 500),
        }),
      );
    }
  } catch (err) {
    status = "error_throw";
    console.error(
      "welcome: resend threw",
      JSON.stringify({
        event_type: eventType,
        user_id: userId,
        email: customerEmail,
        template: templateLabel,
        error: String(err),
      }),
    );
  }

  // On success: set timestamp + resend_id + status. On failure: only set status, leave timestamp NULL
  // so a future retry path (one-shot script) can pick up unsent welcomes by querying WHERE welcome_email_sent_at IS NULL.
  const updatePayload: Record<string, unknown> = { welcome_email_status: status };
  if (updateTimestamp) {
    updatePayload.welcome_email_sent_at = new Date().toISOString();
    updatePayload.welcome_email_resend_id = resendId;
  }
  const { error: updateErr } = await supabaseAdmin
    .from("profiles")
    .update(updatePayload)
    .eq("user_id", userId);
  if (updateErr) {
    console.error("welcome: status update failed", { userId, error: updateErr.message, status });
  }
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
        const customerDetails = obj.customer_details as { email?: string; name?: string } | undefined;
        const customerEmail =
          (obj.customer_email as string | undefined) ??
          customerDetails?.email ??
          undefined;
        const customerName = customerDetails?.name ?? null;
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
        let resolvedUserId: string | null = userId ?? null;
        let subscriptionStatus: string | null = null;
        if (subscriptionId) {
          const sub = await stripeRequest<Parameters<typeof updateProfileFromSubscription>[1]>(
            "GET",
            `/subscriptions/${subscriptionId}`,
            {},
          );
          const meta = ((sub as unknown as { metadata?: Record<string, string> }).metadata) ?? {};
          resolvedUserId = meta.user_id ?? userId ?? (customerId ? await findUserIdForCustomer(customerId) : null);
          subscriptionStatus = (sub as unknown as { status?: string }).status ?? null;
          if (resolvedUserId) await updateProfileFromSubscription(resolvedUserId, sub);
        }

        // Subscribe trial starters to Listmonk segment so they enter the drip.
        const listmonkUrl = Deno.env.get("LISTMONK_URL");
        const listmonkUser = Deno.env.get("LISTMONK_API_USER");
        const listmonkToken = Deno.env.get("LISTMONK_API_TOKEN");
        const listmonkListId = Deno.env.get("LISTMONK_LIST_ID");
        if (listmonkUrl && listmonkUser && listmonkToken && listmonkListId && customerEmail) {
          try {
            const auth = btoa(`${listmonkUser}:${listmonkToken}`);
            await fetch(`${listmonkUrl}/api/subscribers`, {
              method: "POST",
              headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
              body: JSON.stringify({
                email: customerEmail,
                status: "enabled",
                lists: [parseInt(listmonkListId, 10)],
                preconfirm_subscriptions: true,
                attribs: { source: "trial-start" },
              }),
            });
          } catch (err) {
            console.error("listmonk trial-start sync failed", err);
          }
        }

        // Resend welcome email — idempotent via profiles.welcome_email_sent_at.
        await sendWelcomeEmail({
          userId: resolvedUserId,
          customerEmail,
          customerName,
          isTrial: subscriptionStatus === "trialing",
          eventType: event.type,
        });
        break;
      }
      case "customer.subscription.trial_will_end": {
        // Stripe fires this 3 days before trial end. Send a Listmonk transactional
        // reminder so the user knows the auto-charge is coming.
        const customerId = (obj.customer as string) ?? null;
        const listmonkUrl = Deno.env.get("LISTMONK_URL");
        const listmonkUser = Deno.env.get("LISTMONK_API_USER");
        const listmonkToken = Deno.env.get("LISTMONK_API_TOKEN");
        const trialTemplateId = Deno.env.get("LISTMONK_TEMPLATE_TRIAL_ENDING");
        if (!trialTemplateId) {
          console.log("trial_will_end: LISTMONK_TEMPLATE_TRIAL_ENDING not set, skipping");
          break;
        }
        if (!listmonkUrl || !listmonkUser || !listmonkToken) {
          console.log("trial_will_end: listmonk env vars not set, skipping");
          break;
        }
        // Resolve the user's email from profile (looked up by stripe_customer_id).
        let recipientEmail: string | null = null;
        if (customerId) {
          const { data } = await supabaseAdmin
            .from("profiles")
            .select("email")
            .eq("stripe_customer_id", customerId)
            .maybeSingle();
          recipientEmail = data?.email ?? null;
        }
        if (!recipientEmail) {
          console.log("trial_will_end: could not resolve email for customer", customerId);
          break;
        }
        try {
          const auth = btoa(`${listmonkUser}:${listmonkToken}`);
          const tx = await fetch(`${listmonkUrl}/api/tx`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
            body: JSON.stringify({
              subscriber_email: recipientEmail,
              template_id: parseInt(trialTemplateId, 10),
            }),
          });
          if (!tx.ok) {
            const detail = await tx.text().catch(() => "");
            console.error("trial_will_end listmonk tx", tx.status, detail.slice(0, 500));
          }
        } catch (err) {
          console.error("trial_will_end listmonk tx threw", err);
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
