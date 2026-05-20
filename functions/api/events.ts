// ASVAB Hero — first-party paywall "why-tracking" event ingest.
//
// Mirrors functions/api/signup.ts exactly: Env interface, ALLOWED_ORIGINS
// CORS, onRequestOptions/onRequestPost, json() helper, KV rate limit, Sentry
// via ./_sentry, fire-and-forget. Writes to public.analytics_events via the
// Supabase PostgREST REST API using the SERVICE_ROLE key (service role bypasses
// RLS; the table has no anon/authenticated policies). No SDK bundled — raw
// fetch, same as signup.ts.
//
// SAFETY: this endpoint is fully best-effort. It always returns a 2xx-ish
// status the client treats as terminal so the client never enters a retry
// loop. Analytics failure must NEVER affect the paywall or checkout.

import { sentry } from "./_sentry";

interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  SUPABASE_ANON_KEY: string; // to validate optional Bearer JWT
  RATE_LIMIT_KV?: KVNamespace;
  WHY_TRACKING_ENABLED?: string; // server kill-switch
  ASVABHERO_SENTRY_DSN_EDGE?: string;
  ASVABHERO_ENV?: string;
  ASVABHERO_RELEASE?: string;
}

const ALLOWED_ORIGINS = new Set([
  "https://asvabhero.com",
  "https://www.asvabhero.com",
]);

// Server-side allow-list. Mirrors PaywallEvents in src/lib/analytics.ts.
// Events not in this set are dropped, not inserted.
const ALLOWED_EVENT_NAMES = new Set<string>([
  "paywall_viewed",
  "paywall_cta_upgrade_click",
  "paywall_cta_secondary_click",
  "paywall_back_click",
  "paywall_dismissed",
  "upgrade_page_viewed",
  "pricing_scrolled_50",
  "pricing_scrolled_90",
  "plan_toggled",
  "faq_opened",
  "email_capture_exit_click",
  "checkout_click",
  "checkout_session_created",
  "checkout_redirected",
  "checkout_returned_cancelled",
  "checkout_returned_error",
  "checkout_returned_completed",
  "survey_shown",
  "survey_answered",
  "survey_dismissed",
]);

const AUTH_STATES = new Set(["anon", "free", "trial", "pro"]);
const FORBIDDEN_KEY_RE = /email|name|phone|token|password/i;
const EMAILISH_RE = /@.+\./;
const UUID_RE = /^[0-9a-f-]{36}$/i;

const MAX_EVENTS_PER_BATCH = 50;
const MAX_PROPS_BYTES = 2048;
const RATE_LIMIT_PER_HOUR = 60;

interface ClientEvent {
  event_name?: unknown;
  session_id?: unknown;
  paywall_context_id?: unknown;
  client_ts?: unknown;
  props?: unknown;
}

function corsHeaders(origin: string | null): Record<string, string> {
  const allow =
    origin && ALLOWED_ORIGINS.has(origin) ? origin : "https://asvabhero.com";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body: unknown, status: number, cors: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

/** Coerce a props object to string|number|boolean only, drop forbidden /
 *  emailish entries, and the reserved 'email' key (DB CHECK forbids it). */
function sanitizeProps(
  raw: unknown,
): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  if (!raw || typeof raw !== "object") return out;
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (FORBIDDEN_KEY_RE.test(k)) continue;
    if (k === "email") continue;
    if (typeof v === "string") {
      if (EMAILISH_RE.test(v)) continue;
      out[k] = v;
    } else if (typeof v === "number" || typeof v === "boolean") {
      out[k] = v;
    }
    // arrays/objects/null/undefined dropped
  }
  return out;
}

/** Validate optional Bearer JWT → { userId, authState }. Anon on any failure.
 *  Never trusts a client-sent user_id. Never throws. */
async function deriveUser(
  request: Request,
  env: Env,
): Promise<{ userId: string | null; authState: string }> {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { userId: null, authState: "anon" };
  }
  const jwt = authHeader.slice("Bearer ".length).trim();
  if (!jwt) return { userId: null, authState: "anon" };
  try {
    const userRes = await fetch(`${env.SUPABASE_URL}/auth/v1/user`, {
      headers: { apikey: env.SUPABASE_ANON_KEY, Authorization: `Bearer ${jwt}` },
    });
    if (!userRes.ok) return { userId: null, authState: "anon" };
    const user = (await userRes.json()) as { id?: string };
    if (!user?.id) return { userId: null, authState: "anon" };

    // Derive auth_state from the profile via service-role REST.
    let authState = "free";
    try {
      const profRes = await fetch(
        `${env.SUPABASE_URL}/rest/v1/profiles?user_id=eq.${user.id}&select=billing_status,trial_ends_at`,
        {
          headers: {
            apikey: env.SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
          },
        },
      );
      if (profRes.ok) {
        const rows = (await profRes.json()) as Array<{
          billing_status?: string;
          trial_ends_at?: string | null;
        }>;
        const p = rows?.[0];
        if (p) {
          const trialing =
            p.trial_ends_at && new Date(p.trial_ends_at) > new Date();
          if (p.billing_status === "active" || p.billing_status === "lifetime") {
            authState = "pro";
          } else if (trialing) {
            authState = "trial";
          } else {
            authState = "free";
          }
        }
      }
    } catch {
      /* keep authState='free' on profile lookup failure */
    }
    return { userId: user.id, authState };
  } catch {
    return { userId: null, authState: "anon" };
  }
}

export const onRequestOptions: PagesFunction<Env> = ({ request }) => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request.headers.get("Origin")),
  });
};

export const onRequestPost: PagesFunction<Env> = async ({
  request,
  env,
  waitUntil,
}) => {
  const cors = corsHeaders(request.headers.get("Origin"));
  const sntry = sentry(env, "events");

  try {
    // 1) Server kill-switch — silently accept and discard.
    if (env.WHY_TRACKING_ENABLED !== "true") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
      return json({ error: "misconfigured" }, 500, cors);
    }

    // 3) Parse body.
    let body: { events?: unknown };
    try {
      body = await request.json();
    } catch {
      return json({ error: "invalid_json" }, 400, cors);
    }
    const events = Array.isArray(body.events) ? body.events : null;
    if (!events) return json({ error: "invalid_payload" }, 400, cors);
    if (events.length === 0) return json({ accepted: 0 }, 200, cors);
    if (events.length > MAX_EVENTS_PER_BATCH) {
      return json({ error: "too_many_events" }, 400, cors);
    }

    // 5) Rate limit by IP (60 batches/IP/hour).
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    if (env.RATE_LIMIT_KV) {
      const key = `rl:ev:${ip}`;
      const current = parseInt((await env.RATE_LIMIT_KV.get(key)) || "0", 10);
      if (current >= RATE_LIMIT_PER_HOUR) {
        return json({ error: "rate_limited" }, 429, cors);
      }
      await env.RATE_LIMIT_KV.put(key, String(current + 1), {
        expirationTtl: 3600,
      });
    }

    // 6) Optional auth → user_id + auth_state. Never trust client user_id.
    const { userId, authState } = await deriveUser(request, env);
    const receivedAt = new Date().toISOString();

    // 4) Validate + map each event into a row.
    const rows: Array<Record<string, unknown>> = [];
    for (const e of events as ClientEvent[]) {
      if (!e || typeof e !== "object") continue;
      const name = typeof e.event_name === "string" ? e.event_name : "";
      if (!ALLOWED_EVENT_NAMES.has(name)) continue;
      const sessionId =
        typeof e.session_id === "string" && UUID_RE.test(e.session_id)
          ? e.session_id
          : null;
      if (!sessionId) continue; // session_id is NOT NULL in DDL

      const pcid =
        typeof e.paywall_context_id === "string" &&
        UUID_RE.test(e.paywall_context_id)
          ? e.paywall_context_id
          : null;

      const props = sanitizeProps(e.props);
      if (JSON.stringify(props).length > MAX_PROPS_BYTES) continue;

      // Denormalise context columns out of props when present.
      const entrySurface =
        typeof props.entry_surface === "string" ? props.entry_surface : null;
      const variant =
        typeof props.variant === "string" ? props.variant : null;
      const subtest =
        typeof props.subtest === "string" ? props.subtest : null;
      const attemptId =
        typeof props.attempt_id === "string" && UUID_RE.test(props.attempt_id)
          ? props.attempt_id
          : null;
      const reasonCat =
        typeof props.probable_reason_category === "string"
          ? props.probable_reason_category
          : null;

      const clientTs =
        typeof e.client_ts === "string" ? e.client_ts : null;

      rows.push({
        event_name: name,
        session_id: sessionId,
        paywall_context_id: pcid,
        user_id: userId,
        auth_state: AUTH_STATES.has(authState) ? authState : "anon",
        entry_surface: entrySurface,
        variant,
        subtest,
        attempt_id: attemptId,
        probable_reason_category: reasonCat,
        props,
        client_ts: clientTs,
        received_at: receivedAt,
      });
    }

    if (rows.length === 0) return json({ accepted: 0 }, 200, cors);

    // 7) Service-role bulk insert via PostgREST.
    const insertRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/analytics_events`,
      {
        method: "POST",
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(rows),
      },
    );

    if (!insertRes.ok) {
      const detail = await insertRes.text().catch(() => "");
      console.error("analytics_events insert", insertRes.status, detail.slice(0, 400));
      // 8) accepted-but-not-persisted → Sentry, return 202 (no client retry).
      waitUntil(
        sntry.captureMessage(`analytics_events insert non-2xx (${insertRes.status})`, {
          level: "warning",
          fingerprint: ["why-tracking", "events-insert"],
          tags: { provider: "supabase", status: insertRes.status },
          extra: { detail: detail.slice(0, 400), count: rows.length },
        }),
      );
      return json({ accepted: rows.length, persisted: false }, 202, cors);
    }

    return json({ accepted: rows.length }, 200, cors);
  } catch (err) {
    // 9) Top-level catch → Sentry + 500 (client swallows).
    console.error("events handler crashed", err);
    await sntry.captureException(err, {
      fingerprint: ["why-tracking", "events-handler"],
      tags: { provider: "supabase" },
    });
    return json({ error: "internal_error" }, 500, cors);
  }
};
