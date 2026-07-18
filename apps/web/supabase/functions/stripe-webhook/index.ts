// Stripe webhook handler.
// Verifies signature, then updates profiles.billing_status / pro_until / etc.
// Events handled: checkout.session.completed, invoice.paid,
//   customer.subscription.updated, customer.subscription.created,
//   customer.subscription.deleted, customer.subscription.trial_will_end

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { verifyStripeSignature, stripeRequest } from "../_shared/stripe.ts";
import { SUBTEST_CODES, SUBTEST_NAMES, isSubtestCode, type SubtestCode } from "../_shared/subtests.ts";
import { initSentry, captureException, captureMessage } from "../_shared/sentry.ts";

initSentry({ surface: "stripe-webhook" });

const STALE_PROCESSING_MS = 5 * 60 * 1000;

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? Deno.env.get("ASVABHERO_SUPABASE_URL")!;
const SERVICE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("ASVABHERO_SUPABASE_SECRET_KEY")!;
const WEBHOOK_SECRET = Deno.env.get("ASVABHERO_STRIPE_WEBHOOK_SECRET")!;
// Optional test-mode webhook secret. When set, signatures matching either secret
// are accepted — lets `stripe trigger` events reach the live deployment for
// smoke testing without disrupting real Stripe deliveries.
const WEBHOOK_SECRET_TEST = Deno.env.get("ASVABHERO_STRIPE_WEBHOOK_SECRET_TEST");
const PRICE_MONTHLY = Deno.env.get("ASVABHERO_STRIPE_PRICE_MONTHLY") ?? "";
const PRICE_ANNUAL = Deno.env.get("ASVABHERO_STRIPE_PRICE_ANNUAL") ?? "";

// Meta Conversions API (server-side). Mirrors the browser Pixel; deduped by
// event_id (= Stripe checkout session id for browser-matched events, or the
// invoice id for the server-only Subscribe). Never throws / never fails the
// webhook.
const META_PIXEL_ID = Deno.env.get("ASVABHERO_META_PIXEL_ID") ?? "";
const META_CAPI_TOKEN = Deno.env.get("ASVABHERO_META_CAPI_TOKEN") ?? "";

const sha256Hex = async (s: string): Promise<string> => {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

const sendMetaCapi = async (opts: {
  eventName: "Purchase" | "StartTrial" | "Subscribe";
  eventId: string;
  email?: string | null;
  value?: number;
  currency?: string;
  eventSourceUrl?: string;
}): Promise<void> => {
  if (!META_PIXEL_ID || !META_CAPI_TOKEN) return;
  try {
    const userData: Record<string, unknown> = {};
    if (opts.email) userData.em = [await sha256Hex(opts.email.trim().toLowerCase())];
    const customData: Record<string, unknown> = {};
    if (typeof opts.value === "number" && Number.isFinite(opts.value)) {
      customData.value = opts.value;
      customData.currency = (opts.currency ?? "USD").toUpperCase();
    }
    const body = {
      data: [
        {
          event_name: opts.eventName,
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url: opts.eventSourceUrl ?? "https://asvabhero.com/onboarding",
          event_id: opts.eventId,
          user_data: userData,
          ...(Object.keys(customData).length ? { custom_data: customData } : {}),
        },
      ],
    };
    const resp = await fetch(
      `https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events?access_token=${META_CAPI_TOKEN}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) },
    );
    if (!resp.ok) {
      console.error("meta capi non-200", {
        status: resp.status,
        body: (await resp.text()).slice(0, 300),
        event: opts.eventName,
      });
    }
  } catch (e) {
    console.error("meta capi error", { error: String(e), event: opts.eventName });
  }
};

const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const tierFromPrice = (priceId: string | undefined | null): "monthly" | "annual" | null => {
  if (!priceId) return null;
  if (priceId === PRICE_MONTHLY) return "monthly";
  if (priceId === PRICE_ANNUAL) return "annual";
  return null;
};

// Refuse to clobber newer state on a profile with a stale event. Returns true
// when the incoming event references a different subscription than the one
// currently on the profile AND the profile was last touched after this event
// fired. Replayed events from a cancelled or superseded sub will hit this path
// and skip cleanly; first writes (NULL sub_id) and same-sub updates always
// proceed.
const subscriptionEventIsStale = async (
  userId: string,
  incomingSubId: string,
  eventCreatedSec: number | null | undefined,
  incomingBillingStatus: string,
): Promise<boolean> => {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("stripe_subscription_id, pro_updated_at")
    .eq("user_id", userId)
    .maybeSingle();
  if (error || !data) return false;
  if (!data.stripe_subscription_id) return false; // first write — always apply
  if (data.stripe_subscription_id === incomingSubId) return false; // same sub — always apply

  // The event is for a DIFFERENT subscription than the one currently on the
  // profile. A non-active (downgrade) event from a different sub must never
  // overwrite the profile: this is how an abandoned/incomplete first checkout
  // that later expires (incomplete_expired/canceled) was clobbering a paying
  // user's active subscription. Only a genuinely active/trialing different sub
  // may legitimately take over (plan switch / re-subscribe).
  if (incomingBillingStatus !== "active") return true;

  // Active takeover from a different sub: fall back to event timing to drop
  // replayed/out-of-order events that would otherwise resurrect a stale state.
  if (!eventCreatedSec || !Number.isFinite(eventCreatedSec)) return false;
  if (!data.pro_updated_at) return false;
  const profileUpdatedMs = new Date(data.pro_updated_at).getTime();
  const eventCreatedMs = eventCreatedSec * 1000;
  return profileUpdatedMs > eventCreatedMs;
};

const updateProfileFromSubscription = async (
  userId: string,
  sub: {
    id: string;
    status: string;
    // Stripe API 2025-03-31.basil moved current_period_end off the sub object
    // onto the subscription item. The top-level field is omitted in payloads
    // from that version forward. Older API versions still send it here.
    current_period_end?: number | null;
    trial_end?: number | null;
    cancel_at_period_end?: boolean;
    items?: { data?: { price?: { id: string }; current_period_end?: number | null }[] };
    customer?: string;
  },
  eventCreatedSec?: number | null,
) => {
  const priceId = sub.items?.data?.[0]?.price?.id ?? null;
  const tier = tierFromPrice(priceId);
  let billingStatus: string;
  if (sub.status === "active" || sub.status === "trialing") billingStatus = "active";
  else if (sub.status === "past_due" || sub.status === "unpaid") billingStatus = "past_due";
  else if (sub.status === "canceled" || sub.status === "incomplete_expired") billingStatus = "canceled";
  else billingStatus = "free";

  if (await subscriptionEventIsStale(userId, sub.id, eventCreatedSec, billingStatus)) {
    console.log("sub event is stale (different sub_id; non-active or profile newer); skipping", {
      userId,
      eventSubId: sub.id,
      eventCreatedSec,
      incomingBillingStatus: billingStatus,
    });
    return;
  }

  // Period end now lives on the item in newer API versions. Fall back to the
  // top-level field (older API versions) then trial_end (trialing subs always
  // have it). Null is acceptable if nothing usable is present — better than
  // throwing RangeError on `new Date(NaN).toISOString()`.
  const periodEndSec =
    sub.items?.data?.[0]?.current_period_end ?? sub.current_period_end ?? sub.trial_end ?? null;
  const proUntil = typeof periodEndSec === "number" && Number.isFinite(periodEndSec)
    ? new Date(periodEndSec * 1000).toISOString()
    : null;

  const update: Record<string, unknown> = {
    billing_status: billingStatus,
    pro_tier: tier,
    pro_until: proUntil,
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

type TrialConvertedPersonalization = {
  attemptsCount: number;
  accuracyPct: number;
  weakestSubtestName: string | null;
};

// Pull lifetime practice activity for the T+1 email. Returns null when the user
// has no scoreable attempts, the JSON is unusable, or any DB error fires —
// callers fall back to the generic body. Never throws.
const getTrialConvertedPersonalization = async (
  userId: string,
): Promise<TrialConvertedPersonalization | null> => {
  try {
    const { data, error } = await supabaseAdmin
      .from("attempts")
      .select("correct_count, question_count, results_by_subtest")
      .eq("user_id", userId);

    if (error) {
      console.error("trial-converted personalization: query failed", {
        userId,
        error: error.message,
      });
      return null;
    }

    const rows = data ?? [];
    if (rows.length === 0) return null;

    let totalCorrect = 0;
    let totalQuestions = 0;
    const subtestTotals = new Map<SubtestCode, { correct: number; seen: number }>();

    for (const row of rows) {
      const rc = Number(row.correct_count ?? 0);
      const rq = Number(row.question_count ?? 0);
      if (Number.isFinite(rc) && rc >= 0) totalCorrect += rc;
      if (Number.isFinite(rq) && rq >= 0) totalQuestions += rq;

      const rbs = row.results_by_subtest;
      if (!rbs || typeof rbs !== "object" || Array.isArray(rbs)) continue;
      for (const [code, value] of Object.entries(rbs as Record<string, unknown>)) {
        if (!isSubtestCode(code)) continue;
        if (!value || typeof value !== "object") continue;
        const v = value as Record<string, unknown>;
        const correct = Number(v.correct ?? 0);
        const seen = Number(v.seen ?? 0);
        if (!Number.isFinite(correct) || !Number.isFinite(seen)) continue;
        if (correct < 0 || seen < 0) continue;
        const prev = subtestTotals.get(code) ?? { correct: 0, seen: 0 };
        subtestTotals.set(code, {
          correct: prev.correct + correct,
          seen: prev.seen + seen,
        });
      }
    }

    if (totalQuestions === 0) return null;

    const accuracyPct = Math.round((totalCorrect / totalQuestions) * 100);

    // Weakest: lowest correct/seen with seen >= 5. Tie-break by canonical
    // SUBTEST_CODES order so the same user always gets the same answer.
    let weakest: { code: SubtestCode; rate: number } | null = null;
    for (const code of SUBTEST_CODES) {
      const tot = subtestTotals.get(code);
      if (!tot || tot.seen < 5) continue;
      const rate = tot.correct / tot.seen;
      if (weakest === null || rate < weakest.rate) {
        weakest = { code, rate };
      }
    }

    return {
      attemptsCount: rows.length,
      accuracyPct,
      weakestSubtestName: weakest ? SUBTEST_NAMES[weakest.code] : null,
    };
  } catch (err) {
    console.error("trial-converted personalization: threw", {
      userId,
      error: String(err),
    });
    return null;
  }
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

const renderTrialConvertedStatsLine = (p: TrialConvertedPersonalization): string => {
  const attemptsWord = p.attemptsCount === 1 ? "practice attempt" : "practice attempts";
  if (p.weakestSubtestName) {
    return `<p>For what it is worth, you have logged ${p.attemptsCount} ${attemptsWord} at ${p.accuracyPct}% accuracy so far, and your weakest area is ${p.weakestSubtestName}. That is exactly the kind of signal Pro is built to chew on.</p>`;
  }
  return `<p>For what it is worth, you have logged ${p.attemptsCount} ${attemptsWord} at ${p.accuracyPct}% accuracy so far. That is exactly the kind of signal Pro is built to chew on.</p>`;
};

const renderWelcomeTrialConverted = (
  firstName: string,
  personalization: TrialConvertedPersonalization | null,
): string => {
  const statsLine = personalization ? `\n${renderTrialConvertedStatsLine(personalization)}\n` : "";
  return `\
<p>Hi ${firstName},</p>

<p>You made it through the trial, your payment went through, and your ASVAB Hero Pro access is officially locked in.</p>
${statsLine}
<p>That means you can keep building without losing momentum:</p>
<ul>
  <li>Unlimited adaptive practice tests across all 9 subtests</li>
  <li>Full score history and weak-topic drills</li>
  <li>39 study guides covering every ASVAB topic</li>
</ul>

<p>Most people get the best results when they keep the same rhythm that got them through the trial. Show up, take the next test, review what you missed, and let the platform keep tightening up your weak spots.</p>

<p>If you want one simple next step, go here and start your next practice set: <a href="https://asvabhero.com/practice">asvabhero.com/practice</a></p>

<p>I am glad you are here. You are not just trying ASVAB Hero anymore. You are in it now.</p>

<p>Trish<br>ASVAB Hero</p>
`;
};

// Renewal charge failed — escalating multi-touch dunning copy.
// accessActive is false in this codebase because has_active_pro() in
// 0002_billing.sql only treats billing_status='active' (or 'lifetime') as Pro —
// once Stripe flips the sub to past_due, our handler sets
// billing_status='past_due' and Pro access is gated immediately. Do not lie.
//
// attemptCount comes straight from Stripe's invoice.attempt_count (1 on the
// first failure, incrementing per Smart Retry). Attempt 1 is a soft nudge;
// attempts 2+ escalate urgency and lean harder on the card-update CTA. Every
// tier links the same Stripe customer portal (/account/billing).
const renderPaymentFailed = (
  firstName: string,
  attemptCount: number | null,
  nextAttemptISO: string | null,
): string => {
  const isEscalation = !!attemptCount && attemptCount >= 2;

  const nextRetryDate = nextAttemptISO
    ? new Date(nextAttemptISO).toLocaleDateString("en-US", { month: "long", day: "numeric" })
    : null;

  if (!isEscalation) {
    // Attempt 1 — soft. Assume the friendliest cause; make the fix effortless.
    const nextLine = nextRetryDate
      ? `<p>Stripe will automatically retry on ${nextRetryDate}, but the faster path is to update your card now so you don't lose any access.</p>`
      : "";
    return `\
<p>Hi ${firstName},</p>

<p>Your ASVAB Hero payment just didn't go through. Most likely an expired card or a temporary hold from your bank.</p>
${nextLine}
<p>Until it clears, your Pro features are paused. Your practice history is safe and your account is intact, you just won't see Pro until billing recovers.</p>

<p>Update your card in one click here: <a href="https://asvabhero.com/account/billing">asvabhero.com/account/billing</a>. That opens the Stripe customer portal where you can update or replace the card on file.</p>

<p>Reply if you need help. I read every reply.</p>

<p>Trish<br>ASVAB Hero</p>
`;
  }

  // Attempts 2+ — escalate. State plainly that access is paused and each retry
  // is another chance to lose it; make updating the card the single obvious act.
  const nextLine = nextRetryDate
    ? `<p>Stripe will try one more time on ${nextRetryDate}. If that retry fails on the same card, the renewal stops and Pro stays off, so please update your card before then.</p>`
    : `<p>Stripe will keep retrying for a few more days, but on the same card the result won't change. Please update it so the next retry can go through.</p>`;

  return `\
<p>Hi ${firstName},</p>

<p>Your ASVAB Hero renewal still hasn't gone through. This was attempt ${attemptCount}, and your Pro access is paused right now.</p>
${nextLine}
<p>The fix takes about a minute: <a href="https://asvabhero.com/account/billing">asvabhero.com/account/billing</a> opens the Stripe customer portal where you can update or replace the card on file. The moment a charge clears, your unlimited practice, score history, and study guides switch right back on.</p>

<p>If the card on file is the right one and you still got this, it's usually a hold from your bank. Call the number on the back of the card and ask them to clear ASVAB Hero, then update the card in the link above.</p>

<p>Reply if you need help. I read every reply.</p>

<p>Trish<br>ASVAB Hero</p>
`;
};

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

<p>If Pro is helping, do nothing. Your card runs on day 8 at $14.99 and you keep going. If it is not the right fit, cancel any time at <a href="https://asvabhero.com/account/billing">asvabhero.com/account/billing</a>.</p>

<p>Reply with your branch and target test date. I read every reply.</p>

<p>Trish<br>ASVAB Hero</p>
`;

// Cancellation win-back. Sent once when a subscription is deleted (canceled).
// Warm, short, low-pressure: name what they'll miss, leave the door open, link
// the upgrade page. No discount promise — just an easy path back.
const renderWinback = (firstName: string): string => `\
<p>Hi ${firstName},</p>

<p>Your ASVAB Hero Pro subscription is canceled, and that's completely fine. I just wanted to say thanks for giving it a run.</p>

<p>If test day is still ahead of you, here's what Pro was doing in the background:</p>
<ul>
  <li>Unlimited adaptive practice that kept targeting your weakest subtests</li>
  <li>Full score history so you could see the line moving</li>
  <li>39 study guides covering every ASVAB topic</li>
</ul>

<p>Whenever you want it back, you can pick up right where you left off. Your practice history and account are still here. Restart anytime at <a href="https://asvabhero.com/upgrade">asvabhero.com/upgrade</a>.</p>

<p>And if something about Pro didn't land for you, just reply and tell me. I read every reply, and that feedback is how it gets better.</p>

<p>Rooting for you either way.</p>

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
      await captureMessage(`resend welcome non-2xx (${resp.status})`, {
        level: "warning",
        fingerprint: ["vendor-non-2xx", "resend", templateLabel],
        tags: { provider: "resend", template: templateLabel, resend_status: resp.status, event_type: eventType, user_id: userId },
        extra: { detail: errBody.slice(0, 500) },
      });
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
    await captureException(err, {
      tags: { provider: "resend", template: templateLabel, event_type: eventType, user_id: userId },
      fingerprint: ["vendor-throw", "resend", templateLabel],
    });
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

// Send the T+1 trial-converted welcome email via Resend.
// Fires from invoice.paid handler when billing_reason = subscription_cycle AND
// the user had a trial_ends_at set (i.e. they came off a trial). Idempotent
// via profiles.trial_converted_email_sent_at. Never throws; never fails the
// webhook. Survives Stripe payment retries because invoice.paid only fires on
// actual successful payment — if day 8 declines and day 10 retry succeeds,
// invoice.paid fires once on day 10 and we send once.
const sendTrialConvertedEmail = async (args: {
  userId: string;
  customerEmail: string | undefined;
  invoiceId: string | null;
  eventType: string;
}): Promise<void> => {
  const { userId, customerEmail, invoiceId, eventType } = args;
  if (!customerEmail) {
    console.log("trial-converted: missing customerEmail, skipping", { userId });
    return;
  }

  const resendKey = Deno.env.get("ASVAB_RESEND_API_KEY");
  if (!resendKey) {
    console.log("trial-converted: ASVAB_RESEND_API_KEY not set, skipping");
    return;
  }

  // Atomic claim: flip status to 'sending' iff no prior successful send is
  // recorded AND no concurrent delivery is in flight. Returns the row only when
  // this invocation owns the send — survives Stripe webhook retries delivering
  // the same invoice.paid event in parallel.
  const { data: claimed, error: claimErr } = await supabaseAdmin
    .from("profiles")
    .update({
      trial_converted_email_status: "sending",
      trial_converted_email_invoice_id: invoiceId,
    })
    .eq("user_id", userId)
    .is("trial_converted_email_sent_at", null)
    .or("trial_converted_email_status.is.null,trial_converted_email_status.neq.sending")
    .select("display_name, email")
    .maybeSingle();

  if (claimErr) {
    console.error("trial-converted: claim failed", { userId, error: claimErr.message });
    return;
  }
  if (!claimed) {
    console.log("trial-converted: not claimed (already sent or in flight), skipping", { userId });
    return;
  }

  const recipientEmail = customerEmail || claimed.email;
  if (!recipientEmail) {
    console.log("trial-converted: no recipient email after claim, releasing", { userId });
    await supabaseAdmin
      .from("profiles")
      .update({ trial_converted_email_status: "error_no_recipient" })
      .eq("user_id", userId);
    return;
  }

  const greetingName = claimed.display_name ?? "there";
  const personalization = await getTrialConvertedPersonalization(userId);
  const subject = "Your ASVAB Hero Pro access is officially locked in";
  const html = renderWelcomeTrialConverted(greetingName, personalization);

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
        to: [recipientEmail],
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
        "trial-converted: sent",
        JSON.stringify({
          event_type: eventType,
          user_id: userId,
          email: recipientEmail,
          template: "trial-converted",
          invoice_id: invoiceId,
          resend_status: resp.status,
          resend_id: resendId,
        }),
      );
    } else {
      const errBody = await resp.text().catch(() => "");
      status = `error_${resp.status}`;
      console.error(
        "trial-converted: resend non-2xx",
        JSON.stringify({
          event_type: eventType,
          user_id: userId,
          email: recipientEmail,
          template: "trial-converted",
          invoice_id: invoiceId,
          resend_status: resp.status,
          resend_body: errBody.slice(0, 500),
        }),
      );
      await captureMessage(`resend trial-converted non-2xx (${resp.status})`, {
        level: "warning",
        fingerprint: ["vendor-non-2xx", "resend", "trial-converted"],
        tags: { provider: "resend", template: "trial-converted", resend_status: resp.status, event_type: eventType, user_id: userId },
        extra: { detail: errBody.slice(0, 500), invoice_id: invoiceId },
      });
    }
  } catch (err) {
    status = "error_throw";
    console.error(
      "trial-converted: resend threw",
      JSON.stringify({
        event_type: eventType,
        user_id: userId,
        email: recipientEmail,
        template: "trial-converted",
        invoice_id: invoiceId,
        error: String(err),
      }),
    );
    await captureException(err, {
      tags: { provider: "resend", template: "trial-converted", event_type: eventType, user_id: userId },
      fingerprint: ["vendor-throw", "resend", "trial-converted"],
    });
  }

  // On success: stamp timestamp + resend_id + invoice_id + status. On failure:
  // only set status, leave timestamp NULL so the partial index keeps this row
  // visible for a future retry script.
  const updatePayload: Record<string, unknown> = { trial_converted_email_status: status };
  if (updateTimestamp) {
    updatePayload.trial_converted_email_sent_at = new Date().toISOString();
    updatePayload.trial_converted_email_resend_id = resendId;
    updatePayload.trial_converted_email_invoice_id = invoiceId;
  }
  const { error: updateErr } = await supabaseAdmin
    .from("profiles")
    .update(updatePayload)
    .eq("user_id", userId);
  if (updateErr) {
    console.error("trial-converted: status update failed", { userId, error: updateErr.message, status });
  }
};

// Send the renewal-failed dunning email via Resend.
// Idempotency lives on `payment_failed_emails` keyed by invoice_id (PK). Stripe
// Smart Retries fires up to 4 payment_failed events per failed renewal with
// distinct event IDs but the same invoice.id — ON CONFLICT DO NOTHING on the
// ledger means we send exactly one email per invoice.
//
// Gating: only sends when collection_method='charge_automatically' AND
// billing_reason='subscription_cycle'. Anything else (send_invoice manual A/R,
// subscription_create initial signup failure) writes a 'suppressed_*' row and
// skips the email — those cases don't deserve "update your card" copy.
//
// Never throws; never fails the webhook.
const sendPaymentFailedEmail = async (args: {
  userId: string;
  customerEmail: string | undefined;
  invoiceId: string;
  subscriptionId: string | null;
  attemptCount: number | null;
  nextPaymentAttempt: number | null;
  collectionMethod: string | null;
  billingReason: string | null;
  eventType: string;
}): Promise<void> => {
  const {
    userId,
    customerEmail,
    invoiceId,
    subscriptionId,
    attemptCount,
    nextPaymentAttempt,
    collectionMethod,
    billingReason,
    eventType,
  } = args;

  const nextAttemptISO = nextPaymentAttempt
    ? new Date(nextPaymentAttempt * 1000).toISOString()
    : null;

  // Decide suppression up front. We still record the row for debugging.
  let suppressedStatus: string | null = null;
  if (collectionMethod !== "charge_automatically") {
    suppressedStatus = "suppressed_collection_method";
  } else if (billingReason !== "subscription_cycle") {
    suppressedStatus = "suppressed_billing_reason";
  }

  // Attempt-level idempotency key. Stripe's invoice.attempt_count is present and
  // >= 1 on every automatic-collection payment_failed; the `?? 1` is purely
  // defensive and, by collapsing a (theoretical) null attempt onto key 1, favors
  // NOT double-sending over sending twice.
  const attemptKey = attemptCount ?? 1;

  // (1) Per-INVOICE recovery ledger — unchanged table + semantics from 0011.
  // One row per invoice (PK invoice_id); invoice.paid stamps recovered_at on it.
  // We record it with the suppression decision baked into status but do NOT gate
  // the email on this claim — the send gate is the per-attempt claim below.
  // onConflict ignoreDuplicates: attempt 1 inserts, later attempts no-op.
  const ledgerRow = {
    invoice_id: invoiceId,
    user_id: userId,
    subscription_id: subscriptionId,
    attempt_count: attemptCount,
    next_payment_attempt_at: nextAttemptISO,
    collection_method: collectionMethod,
    billing_reason: billingReason,
    status: suppressedStatus ?? "sending",
  };
  const { error: ledgerErr } = await supabaseAdmin
    .from("payment_failed_emails")
    .upsert(ledgerRow, { onConflict: "invoice_id", ignoreDuplicates: true });
  if (ledgerErr) {
    console.error("payment-failed: ledger upsert failed", { userId, invoiceId, error: ledgerErr.message });
    return;
  }

  // Suppression is a property of the invoice (collection_method / billing_reason
  // do not change across attempts), so it is decided once and applies to every
  // attempt. Suppressed invoices never send a dunning email.
  if (suppressedStatus) {
    console.log("payment-failed: suppressed", {
      userId,
      invoiceId,
      reason: suppressedStatus,
      collectionMethod,
      billingReason,
    });
    return;
  }

  // (1b) Late-delivery / already-recovered guard. Stripe can deliver
  // invoice.payment_failed AFTER the invoice has already been paid/recovered
  // (invoice.paid stamps recovered_at on this same per-invoice ledger row).
  // Sending a "your payment failed" email to a customer who is actually paid up
  // is a trust bug. If recovered_at is already set, skip the SEND, and skip it
  // BEFORE the per-attempt dunning_sends claim below, so we never write a claim
  // row that could block a legitimately-earlier attempt. On a normal first
  // failure the ledger row we just upserted has recovered_at = NULL, so this
  // never fires and attempt 1 still sends exactly one email. A read error here
  // fails OPEN (proceeds to send) rather than risk suppressing a real dunning.
  const { data: recoveryRow, error: recoveryErr } = await supabaseAdmin
    .from("payment_failed_emails")
    .select("recovered_at")
    .eq("invoice_id", invoiceId)
    .maybeSingle();
  if (recoveryErr) {
    console.error("payment-failed: recovery check failed, proceeding", {
      userId,
      invoiceId,
      error: recoveryErr.message,
    });
  } else if (recoveryRow?.recovered_at) {
    console.log("payment-failed: invoice already recovered, skipping send", {
      userId,
      invoiceId,
      recovered_at: recoveryRow.recovered_at,
    });
    return;
  }

  // (2) Per-ATTEMPT send claim. PK (invoice_id, attempt_count) + ignoreDuplicates
  // is the atomic gate: exactly one email per (invoice, attempt) no matter how
  // many duplicate webhook deliveries of the same retry arrive.
  const { data: attemptClaim, error: attemptErr } = await supabaseAdmin
    .from("dunning_sends")
    .upsert(
      {
        invoice_id: invoiceId,
        attempt_count: attemptKey,
        user_id: userId,
        subscription_id: subscriptionId,
        kind: "dunning",
        status: "sending",
      },
      { onConflict: "invoice_id,attempt_count", ignoreDuplicates: true },
    )
    .select("invoice_id")
    .maybeSingle();
  if (attemptErr) {
    console.error("payment-failed: attempt claim failed", { userId, invoiceId, attemptKey, error: attemptErr.message });
    return;
  }
  if (!attemptClaim) {
    console.log("payment-failed: attempt already handled, skipping", { userId, invoiceId, attemptKey });
    return;
  }

  const resendKey = Deno.env.get("ASVAB_RESEND_API_KEY");
  if (!resendKey) {
    console.log("payment-failed: ASVAB_RESEND_API_KEY not set, leaving status='sending'", { invoiceId });
    return;
  }

  // Read display_name + email for the greeting + recipient fallback.
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("display_name, email")
    .eq("user_id", userId)
    .maybeSingle();

  const recipientEmail = customerEmail || profile?.email || undefined;
  if (!recipientEmail) {
    console.log("payment-failed: no recipient email; marking error_no_recipient", { userId, invoiceId, attemptKey });
    await supabaseAdmin
      .from("dunning_sends")
      .update({ status: "error_no_recipient", updated_at: new Date().toISOString() })
      .eq("invoice_id", invoiceId)
      .eq("attempt_count", attemptKey);
    return;
  }

  const greetingName = profile?.display_name ?? "there";
  // Subject escalates with the attempt: attempt 1 nudges, attempts 2+ warn that
  // Pro access is paused. Copy body escalation lives in renderPaymentFailed.
  const subject = attemptKey >= 2
    ? "Action needed: your ASVAB Hero Pro access is paused"
    : "Your ASVAB Hero payment didn't go through, update your card";
  const html = renderPaymentFailed(greetingName, attemptCount, nextAttemptISO);

  let resendId: string | null = null;
  let status: string;
  let updateSentAt = false;

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "Trish at ASVAB Hero <info@asvabhero.com>",
        to: [recipientEmail],
        reply_to: "trish@dach.family",
        subject,
        html,
      }),
    });

    if (resp.ok) {
      const body = (await resp.json().catch(() => ({}))) as { id?: string };
      resendId = body.id ?? null;
      status = "sent";
      updateSentAt = true;
      console.log(
        "payment-failed: sent",
        JSON.stringify({
          event_type: eventType,
          user_id: userId,
          email: recipientEmail,
          invoice_id: invoiceId,
          attempt_count: attemptCount,
          resend_status: resp.status,
          resend_id: resendId,
        }),
      );
    } else {
      const errBody = await resp.text().catch(() => "");
      status = `error_${resp.status}`;
      console.error(
        "payment-failed: resend non-2xx",
        JSON.stringify({
          event_type: eventType,
          user_id: userId,
          email: recipientEmail,
          invoice_id: invoiceId,
          resend_status: resp.status,
          resend_body: errBody.slice(0, 500),
        }),
      );
      await captureMessage(`resend payment-failed non-2xx (${resp.status})`, {
        level: "warning",
        fingerprint: ["vendor-non-2xx", "resend", "payment-failed"],
        tags: { provider: "resend", template: "payment-failed", resend_status: resp.status, event_type: eventType, user_id: userId },
        extra: { detail: errBody.slice(0, 500), invoice_id: invoiceId },
      });
    }
  } catch (err) {
    status = "error_throw";
    console.error(
      "payment-failed: resend threw",
      JSON.stringify({
        event_type: eventType,
        user_id: userId,
        email: recipientEmail,
        invoice_id: invoiceId,
        error: String(err),
      }),
    );
    await captureException(err, {
      tags: { provider: "resend", template: "payment-failed", event_type: eventType, user_id: userId },
      fingerprint: ["vendor-throw", "resend", "payment-failed"],
    });
  }

  const nowIso = new Date().toISOString();

  // Per-attempt result → dunning_sends (the send ledger / idempotency grain).
  const attemptUpdate: Record<string, unknown> = { status, updated_at: nowIso };
  if (updateSentAt) {
    attemptUpdate.sent_at = nowIso;
    attemptUpdate.resend_id = resendId;
  }
  const { error: attemptUpdateErr } = await supabaseAdmin
    .from("dunning_sends")
    .update(attemptUpdate)
    .eq("invoice_id", invoiceId)
    .eq("attempt_count", attemptKey);
  if (attemptUpdateErr) {
    console.error("payment-failed: attempt status update failed", { userId, invoiceId, attemptKey, error: attemptUpdateErr.message, status });
  }

  // Mirror the FIRST successful send onto the per-invoice recovery ledger so its
  // unrecovered partial index + support "dunning vs recovered" query keep working
  // (both read payment_failed_emails.sent_at). Guarded on sent_at IS NULL so only
  // the earliest send stamps it; later attempts no-op.
  if (updateSentAt) {
    const { error: ledgerStampErr } = await supabaseAdmin
      .from("payment_failed_emails")
      .update({ status: "sent", sent_at: nowIso, resend_id: resendId, updated_at: nowIso })
      .eq("invoice_id", invoiceId)
      .is("sent_at", null);
    if (ledgerStampErr) {
      console.error("payment-failed: ledger sent stamp failed", { userId, invoiceId, error: ledgerStampErr.message });
    }
  }
};

// Send the one-time cancellation win-back email via Resend.
// Fires from customer.subscription.deleted after the profile has been flipped to
// 'canceled'. Idempotent via profiles.winback_email_sent_at using the same
// atomic-claim pattern as the trial-converted email (survives concurrent
// subscription.deleted webhook retries). Never throws; never fails the webhook.
//
// Gating: the caller only invokes this after it actually flipped billing_status
// to 'canceled' for the profile's CURRENT subscription. This helper additionally
// skips lifetime customers (pro_tier='lifetime' never really loses access).
//
// KNOWN LIMITATION: this does not specially exclude "trial abandon" cancels
// (someone who started a trial and canceled before the first charge). The
// win-back copy ("here's what you'll miss, come back anytime") still reads fine
// for them and the send is one-shot idempotent, so this is acceptable; reliably
// distinguishing trial-abandon would require inspecting the deleted Stripe
// subscription's billing history. Flagged for review.
const sendWinbackEmail = async (args: {
  userId: string;
  eventType: string;
}): Promise<void> => {
  const { userId, eventType } = args;

  const resendKey = Deno.env.get("ASVAB_RESEND_API_KEY");
  if (!resendKey) {
    console.log("winback: ASVAB_RESEND_API_KEY not set, skipping");
    return;
  }

  // Atomic claim: flip status to 'sending' iff no prior successful send AND no
  // concurrent delivery in flight. Returns the row only when this invocation
  // owns the send.
  const { data: claimed, error: claimErr } = await supabaseAdmin
    .from("profiles")
    .update({ winback_email_status: "sending" })
    .eq("user_id", userId)
    .is("winback_email_sent_at", null)
    .or("winback_email_status.is.null,winback_email_status.neq.sending")
    .select("display_name, email, pro_tier")
    .maybeSingle();

  if (claimErr) {
    console.error("winback: claim failed", { userId, error: claimErr.message });
    return;
  }
  if (!claimed) {
    console.log("winback: not claimed (already sent or in flight), skipping", { userId });
    return;
  }

  // Never win-back a lifetime customer — they don't lose access on cancel.
  if (claimed.pro_tier === "lifetime") {
    console.log("winback: lifetime customer, skipping", { userId });
    await supabaseAdmin
      .from("profiles")
      .update({ winback_email_status: "skipped_lifetime" })
      .eq("user_id", userId);
    return;
  }

  const recipientEmail = claimed.email ?? undefined;
  if (!recipientEmail) {
    console.log("winback: no recipient email, releasing", { userId });
    await supabaseAdmin
      .from("profiles")
      .update({ winback_email_status: "error_no_recipient" })
      .eq("user_id", userId);
    return;
  }

  const greetingName = claimed.display_name ?? "there";
  const subject = "Your ASVAB Hero Pro is canceled, the door's still open";
  const html = renderWinback(greetingName);

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
        to: [recipientEmail],
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
        "winback: sent",
        JSON.stringify({
          event_type: eventType,
          user_id: userId,
          email: recipientEmail,
          template: "winback",
          resend_status: resp.status,
          resend_id: resendId,
        }),
      );
    } else {
      const errBody = await resp.text().catch(() => "");
      status = `error_${resp.status}`;
      console.error(
        "winback: resend non-2xx",
        JSON.stringify({
          event_type: eventType,
          user_id: userId,
          email: recipientEmail,
          template: "winback",
          resend_status: resp.status,
          resend_body: errBody.slice(0, 500),
        }),
      );
      await captureMessage(`resend winback non-2xx (${resp.status})`, {
        level: "warning",
        fingerprint: ["vendor-non-2xx", "resend", "winback"],
        tags: { provider: "resend", template: "winback", resend_status: resp.status, event_type: eventType, user_id: userId },
        extra: { detail: errBody.slice(0, 500) },
      });
    }
  } catch (err) {
    status = "error_throw";
    console.error(
      "winback: resend threw",
      JSON.stringify({
        event_type: eventType,
        user_id: userId,
        email: recipientEmail,
        template: "winback",
        error: String(err),
      }),
    );
    await captureException(err, {
      tags: { provider: "resend", template: "winback", event_type: eventType, user_id: userId },
      fingerprint: ["vendor-throw", "resend", "winback"],
    });
  }

  // On success: stamp timestamp + resend_id + status. On failure: only set status,
  // leaving timestamp NULL keeps the row shape consistent with the other one-shot
  // email trackers.
  const updatePayload: Record<string, unknown> = { winback_email_status: status };
  if (updateTimestamp) {
    updatePayload.winback_email_sent_at = new Date().toISOString();
    updatePayload.winback_email_resend_id = resendId;
  }
  const { error: updateErr } = await supabaseAdmin
    .from("profiles")
    .update(updatePayload)
    .eq("user_id", userId);
  if (updateErr) {
    console.error("winback: status update failed", { userId, error: updateErr.message, status });
  }
};

// Idempotency wrapper: claim or skip the event row in stripe_webhook_events.
// Returns { proceed: true, eventRowId } if the handler should process this event,
// or { proceed: false } if we should return 200 immediately (replay or concurrent run).
type ClaimResult = { proceed: true; eventRowId: string } | { proceed: false; reason: string };

const claimEvent = async (event: {
  id: string;
  type: string;
  livemode?: boolean;
  api_version?: string;
  created: number;
}): Promise<ClaimResult> => {
  const { data: existing } = await supabaseAdmin
    .from("stripe_webhook_events")
    .select("id, status, attempt_count, updated_at")
    .eq("stripe_event_id", event.id)
    .maybeSingle();

  if (existing?.status === "processed") {
    return { proceed: false, reason: "already_processed" };
  }

  if (existing?.status === "processing") {
    const updatedAt = new Date(existing.updated_at).getTime();
    if (Date.now() - updatedAt < STALE_PROCESSING_MS) {
      return { proceed: false, reason: "concurrent_processing" };
    }
    // Stale — try to reclaim. Status guard makes this race-safe: only one
    // worker's UPDATE will return a row; losers see no rows and bow out.
    const { data: reclaimed } = await supabaseAdmin
      .from("stripe_webhook_events")
      .update({
        attempt_count: existing.attempt_count + 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id)
      .eq("status", "processing")
      .lt("updated_at", new Date(Date.now() - STALE_PROCESSING_MS).toISOString())
      .select("id")
      .maybeSingle();
    if (!reclaimed) return { proceed: false, reason: "lost_reclaim_race" };
    return { proceed: true, eventRowId: reclaimed.id };
  }

  if (existing?.status === "failed") {
    // Stripe is retrying a known-failed event. Re-enter processing, race-guarded
    // on status='failed' so two retries can't both proceed.
    const { data: reentered } = await supabaseAdmin
      .from("stripe_webhook_events")
      .update({
        status: "processing",
        attempt_count: existing.attempt_count + 1,
        last_error: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id)
      .eq("status", "failed")
      .select("id")
      .maybeSingle();
    if (!reentered) return { proceed: false, reason: "lost_failed_reentry_race" };
    return { proceed: true, eventRowId: reentered.id };
  }

  // No row — INSERT. On unique-violation race, the loser returns 200 and lets
  // the winner own the event.
  const { data: inserted, error: insertErr } = await supabaseAdmin
    .from("stripe_webhook_events")
    .insert({
      stripe_event_id: event.id,
      event_type: event.type,
      livemode: !!event.livemode,
      api_version: event.api_version ?? null,
      stripe_created: new Date(event.created * 1000).toISOString(),
      payload: event,
      status: "processing",
      attempt_count: 1,
    })
    .select("id")
    .single();
  if (insertErr) {
    return { proceed: false, reason: `insert_conflict_or_error:${insertErr.code ?? "?"}` };
  }
  return { proceed: true, eventRowId: inserted.id };
};

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("method_not_allowed", { status: 405 });
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("missing_signature", { status: 400 });
  const rawBody = await req.text();

  let verify = await verifyStripeSignature(rawBody, sig, WEBHOOK_SECRET);
  if (!verify.ok && WEBHOOK_SECRET_TEST) {
    // Live secret rejected — try test secret. Pre-tolerance reasons (missing
    // header parts, expired timestamp) won't be salvaged by a second secret,
    // so only retry on "signature mismatch".
    if (verify.reason === "signature mismatch") {
      verify = await verifyStripeSignature(rawBody, sig, WEBHOOK_SECRET_TEST);
    }
  }
  if (!verify.ok) {
    console.error("verify failed", verify.reason);
    await captureMessage(`stripe signature verify failed: ${verify.reason}`, {
      level: "error",
      tags: { provider: "stripe", verify_reason: verify.reason },
      fingerprint: ["stripe-signature-fail"],
    });
    return new Response(`bad_signature: ${verify.reason}`, { status: 400 });
  }

  let event: {
    id?: string;
    type: string;
    livemode?: boolean;
    api_version?: string;
    created?: number;
    data: { object: Record<string, unknown> };
  };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response("bad_json", { status: 400 });
  }

  // Idempotency: claim or skip via stripe_webhook_events.
  let eventRowId: string | null = null;
  if (event.id && event.created !== undefined) {
    const claim = await claimEvent({
      id: event.id,
      type: event.type,
      livemode: event.livemode,
      api_version: event.api_version,
      created: event.created,
    });
    if (!claim.proceed) {
      console.log("stripe-webhook: skipping", { event_id: event.id, type: event.type, reason: claim.reason });
      return new Response("ok", { status: 200 });
    }
    eventRowId = claim.eventRowId;
  } else {
    // Stripe events always have id + created; treat absence as a malformed event
    // worth flagging but not crashing on.
    await captureMessage("stripe event missing id or created", {
      level: "warning",
      tags: { event_type: event.type },
      fingerprint: ["stripe-malformed-event"],
    });
  }

  const obj = event.data.object as Record<string, unknown>;

  // Track success/failure to mirror to dashboard at the end (fire-and-forget).
  let mirrorSucceeded = true;

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
        // Staleness check up front: a replay of an older checkout for a
        // since-superseded sub must not clobber a newer subscription_id on the
        // profile. If stale, skip ALL profile writes for this event.
        const eventIsStaleForCheckout =
          userId && subscriptionId
            ? await subscriptionEventIsStale(userId, subscriptionId, event.created, "active")
            : false;
        if (eventIsStaleForCheckout) {
          console.log("checkout.session.completed is stale; skipping all profile writes", {
            userId,
            eventSubId: subscriptionId,
            eventCreated: event.created,
          });
          break;
        }
        // One-time "pass" purchase (no subscription). Grant time-boxed Pro:
        // billing_status='active' + pro_tier + pro_until = now + pass_days.
        // Event-level idempotency (claimEvent → status='processed') protects
        // against replays double-extending pro_until.
        const sessionMeta = (obj.metadata as Record<string, string> | undefined) ?? {};
        const passType = sessionMeta.pass_type;
        const isPassPurchase = obj.mode === "payment" || !!passType;
        if (isPassPurchase) {
          if (obj.payment_status !== "paid") {
            console.log("checkout.session.completed pass not paid; skipping grant", {
              userId,
              payment_status: obj.payment_status,
            });
            break;
          }
          const passUserId =
            userId ?? (customerId ? await findUserIdForCustomer(customerId) : null);
          if (!passUserId) {
            console.error("pass purchase: could not resolve userId", { customerId });
            await captureMessage("pass purchase: unresolved userId", {
              level: "error",
              tags: { provider: "stripe" },
              fingerprint: ["pass-unresolved-user"],
            });
            break;
          }
          const tierForPass =
            passType === "retaker" ? "retaker" : passType === "pass90" ? "pass90" : "pass90";
          const rawDays = Number(sessionMeta.pass_days);
          const passDays =
            Number.isFinite(rawDays) && rawDays > 0
              ? rawDays
              : tierForPass === "retaker"
                ? 120
                : 90;
          const proUntil = new Date(Date.now() + passDays * 86400000).toISOString();
          await supabaseAdmin
            .from("profiles")
            .update({
              billing_status: "active",
              pro_tier: tierForPass,
              pro_until: proUntil,
              ...(customerId ? { stripe_customer_id: customerId } : {}),
              pro_updated_at: new Date().toISOString(),
            })
            .eq("user_id", passUserId);

          await sendWelcomeEmail({
            userId: passUserId,
            customerEmail,
            customerName,
            isTrial: false,
            eventType: event.type,
          });

          // Meta CAPI Purchase (server copy of the browser Pixel Purchase).
          // event_id = session id → dedups with the browser event.
          await sendMetaCapi({
            eventName: "Purchase",
            eventId: obj.id as string,
            email: customerEmail,
            value: ((obj.amount_total as number | null) ?? 0) / 100,
            currency: (obj.currency as string | undefined) ?? "USD",
          });
          break;
        }

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

          // Last-resort resolution: match the Stripe checkout email to a profile.
          // Without this, a checkout whose metadata.user_id is missing AND whose
          // stripe_customer_id isn't yet on any profile silently strands a PAYING
          // user as `free` (the profile never goes active). Backfill the customer
          // id so future events resolve by customer.
          if (!resolvedUserId && customerEmail) {
            // Escape LIKE metacharacters: %, _ and \ are legal in an email
            // local-part, so an unescaped ilike could wildcard-match (and then
            // stickily mis-bind) the WRONG profile. We want exact, case-
            // insensitive equality only.
            const escapedEmail = customerEmail.replace(/[\\%_]/g, (c) => `\\${c}`);
            const { data: byEmail } = await supabaseAdmin
              .from("profiles")
              .select("user_id, email, stripe_customer_id")
              .ilike("email", escapedEmail)
              .maybeSingle();
            // Belt-and-suspenders: confirm true equality, never a pattern hit.
            if (
              byEmail?.user_id &&
              typeof byEmail.email === "string" &&
              byEmail.email.toLowerCase() === customerEmail.toLowerCase()
            ) {
              resolvedUserId = byEmail.user_id;
              // Only backfill when the profile has no customer id yet — never
              // repoint an existing (different) Stripe customer mapping.
              if (customerId && !byEmail.stripe_customer_id) {
                await supabaseAdmin
                  .from("profiles")
                  .update({ stripe_customer_id: customerId })
                  .eq("user_id", resolvedUserId);
              }
              await captureMessage("checkout: resolved paying user by email fallback", {
                level: "warning",
                tags: { provider: "stripe", event_type: event.type },
                fingerprint: ["checkout-email-fallback"],
                extra: { customerId: customerId ?? null, subscriptionId },
              });
            }
          }

          subscriptionStatus = (sub as unknown as { status?: string }).status ?? null;
          if (resolvedUserId) {
            await updateProfileFromSubscription(resolvedUserId, sub, event.created);
          } else {
            // A completed, paid checkout we could not attach to any account. This
            // is the failure that stranded Paul: the welcome email still fires but
            // the profile never goes active. Alert loudly instead of silent break.
            console.error("checkout.session.completed: unresolved paying user", {
              customerId,
              subscriptionId,
              customerEmail,
            });
            await captureMessage("checkout: unresolved paying user (subscription)", {
              level: "error",
              tags: { provider: "stripe", event_type: event.type },
              fingerprint: ["checkout-unresolved-user"],
              extra: { customerId: customerId ?? null, subscriptionId, hasEmail: !!customerEmail },
            });
          }

          // Stamp trial_ends_at when this checkout starts a trial (powers TrialBanner countdown).
          if (resolvedUserId && subscriptionStatus === "trialing") {
            const trialEnd = (sub as unknown as { trial_end?: number }).trial_end;
            if (trialEnd) {
              await supabaseAdmin
                .from("profiles")
                .update({ trial_ends_at: new Date(trialEnd * 1000).toISOString() })
                .eq("user_id", resolvedUserId);
            }
          }

          // Meta CAPI: a trialing sub (monthly) is a StartTrial; an immediately
          // charged sub (annual, no trial) is a Purchase. event_id = session id
          // → dedups with the matching browser event.
          if (resolvedUserId) {
            const sessionId = obj.id as string;
            if (subscriptionStatus === "trialing") {
              await sendMetaCapi({ eventName: "StartTrial", eventId: sessionId, email: customerEmail });
            } else {
              await sendMetaCapi({
                eventName: "Purchase",
                eventId: sessionId,
                email: customerEmail,
                value: ((obj.amount_total as number | null) ?? 0) / 100,
                currency: (obj.currency as string | undefined) ?? "USD",
              });
            }
          }
        }

        // Subscribe trial starters to Listmonk segment so they enter the drip.
        const listmonkUrl = Deno.env.get("LISTMONK_URL");
        const listmonkUser = Deno.env.get("LISTMONK_API_USER");
        const listmonkToken = Deno.env.get("LISTMONK_API_TOKEN");
        const listmonkListId = Deno.env.get("LISTMONK_LIST_ID");
        if (listmonkUrl && listmonkUser && listmonkToken && listmonkListId && customerEmail) {
          try {
            const auth = btoa(`${listmonkUser}:${listmonkToken}`);
            const lmResp = await fetch(`${listmonkUrl}/api/subscribers`, {
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
            // 409 = already subscribed (expected). Anything else non-2xx is real.
            if (!lmResp.ok && lmResp.status !== 409) {
              const detail = await lmResp.text().catch(() => "");
              console.error("listmonk trial-start non-2xx", lmResp.status, detail.slice(0, 500));
              await captureMessage(`listmonk trial-start non-2xx (${lmResp.status})`, {
                level: "warning",
                fingerprint: ["vendor-non-2xx", "listmonk", "trial-start-sync"],
                tags: { provider: "listmonk", listmonk_status: lmResp.status, event_type: event.type },
                extra: { detail: detail.slice(0, 500) },
              });
            }
          } catch (err) {
            console.error("listmonk trial-start sync threw", err);
            await captureException(err, {
              tags: { provider: "listmonk", event_type: event.type },
              fingerprint: ["vendor-throw", "listmonk", "trial-start-sync"],
            });
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
        // Idempotent via profiles.trial_ending_email_sent_at — protects against
        // Stripe replays AND re-runs after stale-processing reclaim.
        //
        // A/B flag: the pre-charge reminder was disabled in 76ff847 to maximize
        // *voluntary* conversion (no heads-up before day-7). Re-enabled behind
        // TRIAL_ENDING_REMINDER_ENABLED so it ships to a controlled cohort: it
        // trades a small dip in voluntary conversion for fewer insufficient_funds
        // declines (low-balance users can top up before the charge). Values:
        //   "false"/unset → off (control); "true" → send to everyone;
        //   "ab" → 50/50 by a stable hash of user_id (measurable split).
        // Default off means re-adding the event to enabled-events.json alone does
        // NOT start sending — the flag is the real switch.
        const reminderMode = Deno.env.get("TRIAL_ENDING_REMINDER_ENABLED") ?? "false";
        if (reminderMode !== "true" && reminderMode !== "ab") {
          console.log("trial_will_end: reminder flag off, skipping (control)");
          break;
        }
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
        // Resolve user_id + email from profile (looked up by stripe_customer_id).
        let recipientEmail: string | null = null;
        let recipientUserId: string | null = null;
        let alreadySent = false;
        if (customerId) {
          const { data } = await supabaseAdmin
            .from("profiles")
            .select("user_id, email, trial_ending_email_sent_at")
            .eq("stripe_customer_id", customerId)
            .maybeSingle();
          recipientEmail = data?.email ?? null;
          recipientUserId = data?.user_id ?? null;
          alreadySent = !!data?.trial_ending_email_sent_at;
        }
        if (!recipientEmail || !recipientUserId) {
          console.log("trial_will_end: could not resolve email/user for customer", customerId);
          break;
        }
        if (alreadySent) {
          console.log("trial_will_end: already sent, skipping", { userId: recipientUserId });
          break;
        }
        // A/B mode: deterministic 50/50 by a stable hash of user_id so the split
        // is fixed across Stripe replays and queryable against day-7 outcomes.
        // Control arm is stamped 'ab_control' (not sent) so the cohort is
        // measurable in the DB; the reminder arm proceeds to send below.
        if (reminderMode === "ab") {
          let h = 2166136261; // FNV-1a
          for (let i = 0; i < recipientUserId.length; i++) {
            h ^= recipientUserId.charCodeAt(i);
            h = Math.imul(h, 16777619);
          }
          if ((h >>> 0) % 2 !== 0) {
            console.log("trial_will_end: ab control arm, not sending", { userId: recipientUserId });
            await supabaseAdmin
              .from("profiles")
              .update({ trial_ending_email_status: "ab_control" })
              .eq("user_id", recipientUserId);
            break;
          }
        }
        let txStatus: string;
        let txOk = false;
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
          if (tx.ok) {
            txStatus = "sent";
            txOk = true;
          } else {
            const detail = await tx.text().catch(() => "");
            console.error("trial_will_end listmonk tx", tx.status, detail.slice(0, 500));
            txStatus = `error_${tx.status}`;
            await captureMessage(`listmonk trial-ending non-2xx (${tx.status})`, {
              level: "warning",
              fingerprint: ["vendor-non-2xx", "listmonk", "trial-ending"],
              tags: { provider: "listmonk", listmonk_status: tx.status, event_type: event.type },
              extra: { detail: detail.slice(0, 500), user_id: recipientUserId },
            });
          }
        } catch (err) {
          console.error("trial_will_end listmonk tx threw", err);
          txStatus = "error_throw";
          await captureException(err, {
            tags: { provider: "listmonk", event_type: event.type, user_id: recipientUserId },
            fingerprint: ["vendor-throw", "listmonk", "trial-ending"],
          });
        }
        // Persist status either way; only stamp sent_at on success so a future
        // retry script can find this row via the profiles_trial_ending_email_pending_idx.
        const updatePayload: Record<string, unknown> = {
          trial_ending_email_status: txStatus,
          trial_ending_email_stripe_event_id: (event as unknown as { id?: string }).id ?? null,
        };
        if (txOk) {
          updatePayload.trial_ending_email_sent_at = new Date().toISOString();
        }
        await supabaseAdmin
          .from("profiles")
          .update(updatePayload)
          .eq("user_id", recipientUserId);
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.created": {
        const sub = obj as unknown as Parameters<typeof updateProfileFromSubscription>[1];
        const meta = ((obj as { metadata?: Record<string, string> }).metadata) ?? {};
        const customerId = (obj.customer as string) ?? null;
        const userId = meta.user_id ?? (customerId ? await findUserIdForCustomer(customerId) : null);
        if (userId) await updateProfileFromSubscription(userId, sub, event.created);
        break;
      }
      case "customer.subscription.deleted": {
        const deletedSubId = (obj.id as string | undefined) ?? null;
        const customerId = (obj.customer as string) ?? null;
        const userId = customerId ? await findUserIdForCustomer(customerId) : null;
        if (userId && deletedSubId) {
          // Only cancel if this delete event matches the profile's current sub.
          // Replayed delete events for a previously-cancelled duplicate sub
          // must not flip an active user back to 'canceled'.
          const { data: prof } = await supabaseAdmin
            .from("profiles")
            .select("stripe_subscription_id")
            .eq("user_id", userId)
            .maybeSingle();
          if (prof?.stripe_subscription_id && prof.stripe_subscription_id === deletedSubId) {
            // Keep pro_until as-is — wall flips automatically once date passes
            await supabaseAdmin
              .from("profiles")
              .update({
                billing_status: "canceled",
                pro_updated_at: new Date().toISOString(),
              })
              .eq("user_id", userId);

            // One-time win-back email. Only reached after a real cancellation of
            // the profile's CURRENT sub (replayed deletes for a superseded sub
            // fall to the else branch and never get here). Idempotent + skips
            // lifetime customers inside the helper. Never fails the webhook.
            await sendWinbackEmail({ userId, eventType: event.type });
          } else {
            console.log("sub.deleted for non-current sub_id; skipping cancel", {
              userId,
              deletedSubId,
              currentSubId: prof?.stripe_subscription_id ?? null,
            });
          }
        }
        break;
      }
      case "invoice.paid": {
        const subscriptionId = obj.subscription as string | undefined;
        const billingReason = obj.billing_reason as string | undefined;
        const invoiceId = (obj.id as string | undefined) ?? null;
        const invoiceCustomerEmail =
          (obj.customer_email as string | undefined) ??
          ((obj.customer_details as { email?: string } | undefined)?.email) ??
          undefined;
        if (subscriptionId) {
          const sub = await stripeRequest<Parameters<typeof updateProfileFromSubscription>[1]>(
            "GET",
            `/subscriptions/${subscriptionId}`,
            {},
          );
          const meta = ((sub as unknown as { metadata?: Record<string, string> }).metadata) ?? {};
          const customerId = (sub as { customer?: string }).customer ?? null;
          const userId = meta.user_id ?? (customerId ? await findUserIdForCustomer(customerId) : null);
          if (userId) await updateProfileFromSubscription(userId, sub, event.created);

          // Mark any prior payment_failed email for THIS invoice as recovered.
          // Silent — the customer already knows (their card worked). This just
          // gives support tooling a clean "ongoing dunning" vs "recovered" signal.
          if (invoiceId) {
            await supabaseAdmin
              .from("payment_failed_emails")
              .update({ recovered_at: new Date().toISOString(), updated_at: new Date().toISOString() })
              .eq("invoice_id", invoiceId)
              .is("recovered_at", null);
          }

          // Trial-converted welcome email — only when this is a recurring cycle
          // invoice AND the user came off a trial (trial_ends_at was set).
          // Idempotent via profiles.trial_converted_email_sent_at.
          if (userId && billingReason === "subscription_cycle") {
            const { data: trialProfile } = await supabaseAdmin
              .from("profiles")
              .select("trial_ends_at, email")
              .eq("user_id", userId)
              .maybeSingle();
            if (trialProfile?.trial_ends_at) {
              await sendTrialConvertedEmail({
                userId,
                customerEmail: invoiceCustomerEmail ?? trialProfile.email ?? undefined,
                invoiceId,
                eventType: event.type,
              });
              // Meta CAPI Subscribe: the trial converted to a paying sub. This
              // fires ~7 days post-signup off-site, so it has no browser
              // counterpart; event_id = invoice id keeps it idempotent.
              await sendMetaCapi({
                eventName: "Subscribe",
                eventId: invoiceId ?? `sub_${userId}_${event.created}`,
                email: invoiceCustomerEmail ?? trialProfile.email ?? undefined,
                value: ((obj.amount_paid as number | null) ?? 0) / 100,
                currency: (obj.currency as string | undefined) ?? "USD",
              });
            }
          }
        }
        break;
      }
      case "invoice.payment_failed": {
        const invoiceId = (obj.id as string | undefined) ?? null;
        const subscriptionId = (obj.subscription as string | undefined) ?? null;
        const customerId = (obj.customer as string | undefined) ?? null;
        const customerEmail =
          (obj.customer_email as string | undefined) ??
          ((obj.customer_details as { email?: string } | undefined)?.email) ??
          undefined;
        const attemptCount = (obj.attempt_count as number | undefined) ?? null;
        const nextPaymentAttempt = (obj.next_payment_attempt as number | undefined) ?? null;
        const collectionMethod = (obj.collection_method as string | undefined) ?? null;
        const billingReason = (obj.billing_reason as string | undefined) ?? null;

        if (!invoiceId) {
          console.log("payment_failed: no invoice id on event, skipping");
          break;
        }

        // Sync billing state (Stripe has already flipped sub.status to past_due).
        // Fetch fresh sub if we have a subscription id — updateProfileFromSubscription
        // is guarded against stale events via subscriptionEventIsStale.
        let userId: string | null = null;
        // Belt-and-suspenders against a late/duplicate payment_failed delivery:
        // if the freshly-fetched sub is no longer past_due/unpaid, the renewal
        // already recovered (or the sub ended) and a dunning email would be
        // wrong. On a genuine first failure Stripe has flipped the sub to
        // past_due before firing this event, so this stays false and the send
        // proceeds. Left null when there's no subscription id to fetch.
        let subStatus: string | null = null;
        if (subscriptionId) {
          const sub = await stripeRequest<Parameters<typeof updateProfileFromSubscription>[1]>(
            "GET",
            `/subscriptions/${subscriptionId}`,
            {},
          );
          subStatus = (sub as { status?: string }).status ?? null;
          const meta = ((sub as unknown as { metadata?: Record<string, string> }).metadata) ?? {};
          const subCustomerId = (sub as { customer?: string }).customer ?? customerId;
          userId = meta.user_id ?? (subCustomerId ? await findUserIdForCustomer(subCustomerId) : null);
          if (userId) await updateProfileFromSubscription(userId, sub, event.created);
        } else if (customerId) {
          userId = await findUserIdForCustomer(customerId);
        }

        if (!userId) {
          console.log("payment_failed: could not resolve userId, skipping email", { invoiceId, customerId });
          break;
        }

        if (subStatus !== null && subStatus !== "past_due" && subStatus !== "unpaid") {
          console.log("payment_failed: fresh sub no longer past_due/unpaid (recovered/ended); skipping dunning email", {
            invoiceId,
            subscriptionId,
            subStatus,
          });
          break;
        }

        await sendPaymentFailedEmail({
          userId,
          customerEmail,
          invoiceId,
          subscriptionId,
          attemptCount,
          nextPaymentAttempt,
          collectionMethod,
          billingReason,
          eventType: event.type,
        });
        break;
      }
      default:
        // ignore other events silently
        break;
    }
  } catch (err) {
    console.error("webhook handler error", event.type, err);
    mirrorSucceeded = false;
    // Persist failure to stripe_webhook_events so the next Stripe retry
    // re-enters via the failed → processing path.
    if (eventRowId) {
      await supabaseAdmin
        .from("stripe_webhook_events")
        .update({
          status: "failed",
          last_error: String(err).slice(0, 1000),
          updated_at: new Date().toISOString(),
        })
        .eq("id", eventRowId);
    }
    await captureException(err, {
      tags: {
        provider: "stripe",
        event_type: event.type,
        stripe_event_id: event.id ?? null,
      },
    });
    // Mirror the failure too so the dashboard sees it.
    void mirrorToDashboard(event, false).catch(() => {});
    return new Response("handler_error", { status: 500 });
  }

  // Mark processed in the receipt table so future replays return 200 fast.
  if (eventRowId) {
    await supabaseAdmin
      .from("stripe_webhook_events")
      .update({
        status: "processed",
        processed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", eventRowId);
  }

  // Fire-and-forget mirror to the dashboard for InfraHealth widget.
  void mirrorToDashboard(event, mirrorSucceeded).catch(() => {});
  // Fire-and-forget durable mirror of billing events to the dashboard's
  // append-only ledger (seconds-fresh; the dashboard also polls Stripe events
  // every 15 min as a backstop, so this is purely a latency optimization).
  void mirrorBillingEvent(event).catch(() => {});
  return new Response("ok", { status: 200 });
});

// Billing events that carry durable revenue / churn / failure signal — kept in
// sync with BILLING_EVENT_TYPES in the dashboard's lib/asvab/billing-events.ts.
const DASHBOARD_BILLING_EVENT_TYPES = new Set<string>([
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
  "invoice.paid",
  "invoice.payment_failed",
  "invoice.payment_action_required",
  "charge.refunded",
]);

async function mirrorBillingEvent(event: {
  type: string;
  id?: string;
}): Promise<void> {
  const secret = Deno.env.get("STRIPE_MIRROR_SECRET");
  if (!secret) return;
  if (!DASHBOARD_BILLING_EVENT_TYPES.has(event.type)) return;
  try {
    await fetch("https://winning.basecampdigital.pro/api/webhooks/asvab-billing", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${secret}`,
      },
      // Send the FULL event — the dashboard maps it into the ledger row.
      body: JSON.stringify({
        event_id: event.id ?? "unknown",
        event_type: event.type,
        payload: event,
      }),
    });
  } catch (err) {
    console.error("asvab-billing dashboard fire-and-forget failed", err);
  }
}

async function mirrorToDashboard(
  event: { type: string; data: { object: Record<string, unknown> }; id?: string; livemode?: boolean; created?: number },
  succeeded: boolean,
): Promise<void> {
  const secret = Deno.env.get("STRIPE_MIRROR_SECRET");
  if (!secret) return;
  try {
    await fetch("https://winning.basecampdigital.pro/api/webhooks/stripe-mirror", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({
        event_id: event.id ?? "unknown",
        event_type: event.type,
        succeeded,
        payload: { livemode: event.livemode ?? null, created: event.created ?? null },
      }),
    });
  } catch (err) {
    console.error("stripe-mirror dashboard fire-and-forget failed", err);
  }
}
