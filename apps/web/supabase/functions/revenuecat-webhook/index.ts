// RevenueCat webhook handler (mobile IAP → Pro entitlement).
//
// RevenueCat posts a JSON body `{ event: {...}, api_version }` for every
// subscriber lifecycle change, authenticated by an `Authorization` header we
// set in the RC dashboard. We map the event onto the SAME profiles columns the
// Stripe path uses (billing_status / pro_tier / pro_until / pro_updated_at), so
// has_active_pro() treats app purchases identically — that is what makes Pro
// cross-platform between web and the Android app.
//
// app_user_id === the Supabase user id, because the app calls
// `Purchases.logIn(user.id)` right after sign-in (see apps/mobile/lib/auth.tsx
// → identifyPurchaser). Anonymous RC ids ($RCAnonymousID:*) are ignored.
//
// Docs: https://www.revenuecat.com/docs/integrations/webhooks/event-types-and-fields

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { initSentry, captureException } from "../_shared/sentry.ts";

initSentry({ surface: "revenuecat-webhook" });

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? Deno.env.get("ASVABHERO_SUPABASE_URL")!;
const SERVICE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("ASVABHERO_SUPABASE_SECRET_KEY")!;
const WEBHOOK_SECRET = Deno.env.get("ASVABHERO_REVENUECAT_WEBHOOK_SECRET")!;

const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Events that GRANT / extend access. (TRANSFER is handled separately — it is
// two-sided and must revoke the source account, not just grant the target.)
const GRANT_TYPES = new Set([
  "INITIAL_PURCHASE",
  "RENEWAL",
  "PRODUCT_CHANGE",
  "UNCANCELLATION",
  "NON_RENEWING_PURCHASE",
  "SUBSCRIPTION_EXTENDED",
  "TEMPORARY_ENTITLEMENT_GRANT",
]);
// Events that REVOKE access.
const REVOKE_TYPES = new Set(["EXPIRATION", "SUBSCRIPTION_PAUSED"]);

interface RcEvent {
  type: string;
  app_user_id?: string;
  original_app_user_id?: string;
  product_id?: string;
  entitlement_ids?: string[] | null;
  expiration_at_ms?: number | null;
  event_timestamp_ms?: number | null;
  transferred_from?: string[] | null;
  transferred_to?: string[] | null;
  environment?: string;
}

interface ProvenanceRow {
  pro_updated_at: string | null;
  pro_source: string | null;
  billing_status: string | null;
}

/** Current entitlement provenance for a user, or null if no profile row. */
async function loadProvenance(userId: string): Promise<ProvenanceRow | null> {
  const { data } = await supabaseAdmin
    .from("profiles")
    .select("pro_updated_at, pro_source, billing_status")
    .eq("user_id", userId)
    .maybeSingle();
  return (data as ProvenanceRow | null) ?? null;
}

/** True when a RevenueCat revoke must NOT touch this profile — because Stripe
 *  (web) currently owns an active/lifetime entitlement. Cross-platform Pro is
 *  shared columns, so a stale app-side revoke must never wipe web Pro. */
function stripeOwnsActive(p: ProvenanceRow | null): boolean {
  return (
    !!p &&
    p.pro_source === "stripe" &&
    (p.billing_status === "active" || p.billing_status === "lifetime")
  );
}

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return json(405, { error: "method_not_allowed" });

  // Constant-ish shared-secret check on the Authorization header.
  const auth = req.headers.get("Authorization") ?? "";
  if (!WEBHOOK_SECRET || auth !== WEBHOOK_SECRET) {
    return json(401, { error: "unauthorized" });
  }

  let event: RcEvent;
  try {
    const payload = await req.json();
    event = payload?.event ?? {};
  } catch {
    return json(400, { error: "bad_json" });
  }

  try {
    const type = event.type ?? "";
    const eventMs =
      typeof event.event_timestamp_ms === "number" ? event.event_timestamp_ms : null;

    // TRANSFER is two-sided: the entitlement moved off transferred_from[] onto
    // transferred_to[]. Revoke every source profile so one purchase can't unlock
    // two accounts. The destination is (re)granted by the purchase/renewal event
    // RC emits alongside the transfer, so we only revoke here.
    if (type === "TRANSFER") {
      const from = (event.transferred_from ?? []).filter((id) => UUID_RE.test(id));
      let revoked = 0;
      for (const uid of from) {
        const prov = await loadProvenance(uid);
        if (stripeOwnsActive(prov)) continue; // never wipe web Pro
        const { error } = await supabaseAdmin
          .from("profiles")
          .update({
            billing_status: "canceled",
            pro_until: null,
            pro_source: "revenuecat",
            pro_updated_at: new Date().toISOString(),
          })
          .eq("user_id", uid);
        if (!error) revoked++;
      }
      return json(200, { ok: true, type, revoked_from: revoked });
    }

    const userId = event.app_user_id ?? "";

    // Only real Supabase users. RC anonymous ids and non-UUID ids are skipped
    // cleanly (200 so RC doesn't retry forever).
    if (!UUID_RE.test(userId)) {
      return json(200, { skipped: "non_uuid_app_user_id", type });
    }

    // CANCELLATION: the user turned off auto-renew but keeps access until the
    // period ends. Never revoke here — the later EXPIRATION event does that.
    if (type === "CANCELLATION") {
      return json(200, { ok: true, note: "cancellation_no_revoke" });
    }

    const isGrant = GRANT_TYPES.has(type);
    const isRevoke = REVOKE_TYPES.has(type);
    const isBillingIssue = type === "BILLING_ISSUE";

    if (!isGrant && !isRevoke && !isBillingIssue) {
      return json(200, { ok: true, note: "ignored_type", type });
    }

    // Guard against replayed / out-of-order events clobbering fresher state,
    // and against a RevenueCat revoke wiping a Stripe-owned entitlement.
    const prov = await loadProvenance(userId);
    if ((isRevoke || isBillingIssue) && stripeOwnsActive(prov)) {
      return json(200, { skipped: "cross_source_revoke_protected", type });
    }
    if (prov?.pro_updated_at && eventMs) {
      const lastWriteMs = new Date(prov.pro_updated_at).getTime();
      if (Number.isFinite(lastWriteMs) && eventMs < lastWriteMs) {
        // This event fired before our last write — a replay or out-of-order
        // delivery. Applying it could resurrect stale state.
        return json(200, { skipped: "stale_event", type });
      }
    }

    const expMs = event.expiration_at_ms ?? null;
    const proUntil =
      typeof expMs === "number" && Number.isFinite(expMs)
        ? new Date(expMs).toISOString()
        : null;

    let billingStatus: string;
    let proTier: string | null = null;
    if (isRevoke) {
      billingStatus = "canceled";
    } else if (isBillingIssue) {
      billingStatus = "past_due";
    } else {
      // Grant. No expiration => a lifetime / non-expiring entitlement.
      billingStatus = proUntil ? "active" : "lifetime";
      if (!proUntil) proTier = "lifetime";
    }

    const update: Record<string, unknown> = {
      billing_status: billingStatus,
      pro_until: proUntil,
      pro_source: "revenuecat",
      rc_product_id: event.product_id ?? null,
      pro_updated_at: new Date().toISOString(),
    };
    // Only overwrite pro_tier when we can infer it (lifetime); otherwise leave
    // whatever is there — duration isn't derivable from a single RC event.
    if (proTier) update.pro_tier = proTier;

    const { error } = await supabaseAdmin
      .from("profiles")
      .update(update)
      .eq("user_id", userId);

    if (error) {
      await captureException(error, {
        tags: { provider: "revenuecat", event_type: type, user_id: userId },
      });
      return json(500, { error: "profile_update_failed" });
    }

    return json(200, { ok: true, type, billing_status: billingStatus });
  } catch (err) {
    await captureException(err, { tags: { provider: "revenuecat", event_type: event.type } });
    return json(500, { error: "internal_error" });
  }
});
