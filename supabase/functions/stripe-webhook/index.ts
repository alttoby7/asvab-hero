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

  const verify = await verifyStripeSignature(rawBody, sig, WEBHOOK_SECRET);
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
          if (userId) await updateProfileFromSubscription(userId, sub);

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
            }
          }
        }
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
  return new Response("ok", { status: 200 });
});

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
