// ASVAB Hero — paywall "why-tracking" one-tap survey ingest.
//
// Mirrors functions/api/signup.ts / events.ts: Env, ALLOWED_ORIGINS CORS,
// onRequestOptions/onRequestPost, json() helper, KV rate limit, Sentry via
// ./_sentry. Writes one row to public.feedback_responses via PostgREST using
// the SERVICE_ROLE key with `Prefer: resolution=ignore-duplicates` so the
// unique(paywall_context_id, question_key) constraint enforces once-per-context
// (DB backstop to the client-side suppression).
//
// SAFETY: best-effort, always 2xx-ish terminal status. Survey failure must
// never block navigation or affect the upgrade flow.

import { sentry } from "./_sentry";

interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  SUPABASE_ANON_KEY: string;
  RATE_LIMIT_KV?: KVNamespace;
  WHY_TRACKING_ENABLED?: string;
  FEEDBACK_FREE_TEXT_ENABLED?: string; // default off
  ASVABHERO_SENTRY_DSN_EDGE?: string;
  ASVABHERO_ENV?: string;
  ASVABHERO_RELEASE?: string;
}

const ALLOWED_ORIGINS = new Set([
  "https://asvabhero.com",
  "https://www.asvabhero.com",
]);

const TRIGGERS = new Set(["paywall_exit", "checkout_cancelled", "churn_email"]);

// Server-side enum allow-list (mirrors §7.3 + WhySurvey.tsx).
const QUESTION_ANSWERS: Record<string, Set<string>> = {
  primary_reason: new Set([
    "too_expensive",
    "subscription_distrust",
    "short_term_need",
    "not_sure_worth_it",
    "need_more_free",
    "tech_or_confusion",
    "just_browsing",
    "other",
  ]),
  price_sentiment: new Set([
    "would_pay_flat_once",
    "would_pay_if_cheaper",
    "wont_pay_anything",
    "unsure",
  ]),
};

const AUTH_STATES = new Set(["anon", "free", "trial", "pro"]);
const FORBIDDEN_KEY_RE = /email|name|phone|token|password/i; // for free_text scrub
const UUID_RE = /^[0-9a-f-]{36}$/i;
const RATE_LIMIT_PER_HOUR = 10; // surveys are rare

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
      /* keep 'free' */
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
  const sntry = sentry(env, "feedback");

  try {
    if (env.WHY_TRACKING_ENABLED !== "true") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
      return json({ error: "misconfigured" }, 500, cors);
    }

    let body: {
      paywall_context_id?: unknown;
      session_id?: unknown;
      trigger?: unknown;
      question_key?: unknown;
      answer_key?: unknown;
      free_text?: unknown;
      client_ts?: unknown;
    };
    try {
      body = await request.json();
    } catch {
      return json({ error: "invalid_json" }, 400, cors);
    }

    // 3) Validate against enums.
    const trigger = typeof body.trigger === "string" ? body.trigger : "";
    const questionKey =
      typeof body.question_key === "string" ? body.question_key : "";
    const answerKey =
      typeof body.answer_key === "string" ? body.answer_key : "";
    if (!TRIGGERS.has(trigger)) return json({ error: "invalid_trigger" }, 400, cors);
    const answerSet = QUESTION_ANSWERS[questionKey];
    if (!answerSet) return json({ error: "invalid_question" }, 400, cors);
    if (!answerSet.has(answerKey)) return json({ error: "invalid_answer" }, 400, cors);

    const pcid =
      typeof body.paywall_context_id === "string" &&
      UUID_RE.test(body.paywall_context_id)
        ? body.paywall_context_id
        : null;
    const sessionId =
      typeof body.session_id === "string" && UUID_RE.test(body.session_id)
        ? body.session_id
        : null;

    // 4) Free text off by default.
    let freeText: string | null = null;
    if (
      env.FEEDBACK_FREE_TEXT_ENABLED === "true" &&
      typeof body.free_text === "string"
    ) {
      const scrubbed = body.free_text.trim().slice(0, 280);
      // drop entirely if it looks like it carries forbidden PII tokens
      freeText = FORBIDDEN_KEY_RE.test(scrubbed) ? null : scrubbed || null;
    }

    // 6) Rate limit by IP (tighter — 10/hour).
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    if (env.RATE_LIMIT_KV) {
      const key = `rl:fb:${ip}`;
      const current = parseInt((await env.RATE_LIMIT_KV.get(key)) || "0", 10);
      if (current >= RATE_LIMIT_PER_HOUR) {
        return json({ error: "rate_limited" }, 429, cors);
      }
      await env.RATE_LIMIT_KV.put(key, String(current + 1), {
        expirationTtl: 3600,
      });
    }

    // 5) Optional auth.
    const { userId, authState } = await deriveUser(request, env);

    const row: Record<string, unknown> = {
      paywall_context_id: pcid,
      session_id: sessionId,
      user_id: userId,
      trigger,
      question_key: questionKey,
      answer_key: answerKey,
      free_text: freeText,
      auth_state: AUTH_STATES.has(authState) ? authState : "anon",
      client_ts: typeof body.client_ts === "string" ? body.client_ts : null,
      received_at: new Date().toISOString(),
    };

    // 7) Insert with conflict-ignore on (paywall_context_id, question_key).
    const insertRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/feedback_responses`,
      {
        method: "POST",
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal,resolution=ignore-duplicates",
        },
        body: JSON.stringify(row),
      },
    );

    if (!insertRes.ok) {
      const detail = await insertRes.text().catch(() => "");
      console.error("feedback_responses insert", insertRes.status, detail.slice(0, 400));
      waitUntil(
        sntry.captureMessage(`feedback_responses insert non-2xx (${insertRes.status})`, {
          level: "warning",
          fingerprint: ["why-tracking", "feedback-insert"],
          tags: { provider: "supabase", status: insertRes.status, trigger },
          extra: { detail: detail.slice(0, 400) },
        }),
      );
      return json({ accepted: true, persisted: false }, 202, cors);
    }

    return json({ accepted: true }, 200, cors);
  } catch (err) {
    console.error("feedback handler crashed", err);
    await sntry.captureException(err, {
      fingerprint: ["why-tracking", "feedback-handler"],
      tags: { provider: "supabase" },
    });
    return json({ error: "internal_error" }, 500, cors);
  }
};
