// ASVAB Hero — Program License "Talk to us" inquiry ingest.
//
// Mirrors functions/api/signup.ts (Env, ALLOWED_ORIGINS CORS, onRequestOptions/
// onRequestPost, json() helper, KV rate limit, Sentry via ./_sentry). Writes the
// instructor's inquiry to Listmonk as a subscriber with attribs describing the
// program. UNLIKE signup.ts it does NOT send the consumer welcome template — a
// JROTC instructor asking about a program license should not get the "here's
// your 30-day study plan" email. Trish filters Listmonk by attribs.source =
// "program-inquiry" to see the B2B lead list.
//
// SAFETY: best-effort. A failed write must surface in Sentry but the handler
// still tells the instructor we got it only when Listmonk actually accepted.

import { sentry } from "./_sentry";

interface Env {
  LISTMONK_URL: string;
  LISTMONK_API_USER: string;
  LISTMONK_API_TOKEN: string;
  // Optional dedicated list for B2B leads; falls back to the main list id.
  LISTMONK_PROGRAM_LIST_ID?: string;
  LISTMONK_LIST_ID: string;
  RATE_LIMIT_KV?: KVNamespace;
  ASVABHERO_SENTRY_DSN_EDGE?: string;
  ASVABHERO_ENV?: string;
  ASVABHERO_RELEASE?: string;
}

interface InquiryBody {
  name?: string;
  email?: string;
  program?: string;
  role?: string;
  students?: string;
  message?: string;
  plan?: string; // "pilot" | "program" | undefined — which CTA they came from
}

const ALLOWED_ORIGINS = new Set([
  "https://asvabhero.com",
  "https://www.asvabhero.com",
]);

function corsHeaders(origin: string | null): Record<string, string> {
  const allow =
    origin && ALLOWED_ORIGINS.has(origin) ? origin : "https://asvabhero.com";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
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

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
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
  const sntry = sentry(env, "program-inquiry");

  try {
    const LISTMONK_URL = (env.LISTMONK_URL || "").trim().replace(/\/+$/, "");
    const LISTMONK_API_USER = (env.LISTMONK_API_USER || "").trim();
    const LISTMONK_API_TOKEN = (env.LISTMONK_API_TOKEN || "").trim();
    const listIdRaw = (env.LISTMONK_PROGRAM_LIST_ID || env.LISTMONK_LIST_ID || "").trim();

    if (!LISTMONK_URL || !LISTMONK_API_USER || !LISTMONK_API_TOKEN || !listIdRaw) {
      return json({ error: "misconfigured" }, 500, cors);
    }
    const listId = parseInt(listIdRaw, 10);
    if (!Number.isFinite(listId)) {
      return json({ error: "bad_list_id" }, 500, cors);
    }

    let body: InquiryBody;
    try {
      body = await request.json();
    } catch {
      return json({ error: "invalid_json" }, 400, cors);
    }

    const email = clean(body.email, 254).toLowerCase();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ error: "invalid_email" }, 400, cors);
    }
    const name = clean(body.name, 120) || email.split("@")[0];
    const program = clean(body.program, 200);
    const role = clean(body.role, 120);
    const students = clean(body.students, 40);
    const message = clean(body.message, 2000);
    const plan = clean(body.plan, 40);

    // Rate limit: B2B inquiries are rare. 5/hour/IP is generous.
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    if (env.RATE_LIMIT_KV) {
      const key = `rl:prog:${ip}`;
      const current = parseInt((await env.RATE_LIMIT_KV.get(key)) || "0", 10);
      if (current >= 5) {
        return json({ error: "rate_limited" }, 429, cors);
      }
      await env.RATE_LIMIT_KV.put(key, String(current + 1), {
        expirationTtl: 3600,
      });
    }

    const attribs: Record<string, unknown> = {
      source: "program-inquiry",
      program,
      role,
      students,
      message,
      plan,
      submitted_at: new Date().toISOString(),
    };

    const auth = btoa(`${LISTMONK_API_USER}:${LISTMONK_API_TOKEN}`);
    const upstream = await fetch(`${LISTMONK_URL}/api/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        email,
        name,
        status: "enabled",
        lists: [listId],
        preconfirm_subscriptions: true,
        attribs,
      }),
    });

    // 409 = subscriber already exists. Re-submitting an inquiry is fine; treat
    // as success so a returning instructor isn't shown an error.
    if (upstream.status === 409) {
      return json({ success: true, already_known: true }, 200, cors);
    }

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => "");
      console.error("listmonk program-inquiry", upstream.status, detail.slice(0, 500));
      waitUntil(
        sntry.captureMessage(`program-inquiry subscriber-create non-2xx (${upstream.status})`, {
          level: "warning",
          fingerprint: ["vendor-non-2xx", "listmonk", "program-inquiry"],
          tags: { provider: "listmonk", listmonk_status: upstream.status },
          extra: { detail: detail.slice(0, 500), email_domain: email.split("@")[1] },
        }),
      );
      return json({ error: "upstream_error", status: upstream.status }, 502, cors);
    }

    return json({ success: true }, 200, cors);
  } catch (err) {
    console.error("program-inquiry handler crashed", err);
    await sntry.captureException(err, { tags: { provider: "listmonk" } });
    return json({ error: "internal_error" }, 500, cors);
  }
};
