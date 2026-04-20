interface Env {
  LISTMONK_URL: string;
  LISTMONK_API_USER: string;
  LISTMONK_API_TOKEN: string;
  LISTMONK_LIST_ID: string;
  RATE_LIMIT_KV?: KVNamespace;
}

interface SubscribeBody {
  email?: string;
  name?: string;
  tag?: string;
  source?: string;
  scores?: Record<string, number>;
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

export const onRequestOptions: PagesFunction<Env> = ({ request }) => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request.headers.get("Origin")),
  });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const cors = corsHeaders(request.headers.get("Origin"));

  let body: SubscribeBody;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400, cors);
  }

  const email = (body.email || "").trim().toLowerCase();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 254) {
    return json({ error: "invalid_email" }, 400, cors);
  }

  // Rate limit: 5 signups per IP per hour (if KV binding present)
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  if (env.RATE_LIMIT_KV) {
    const key = `rl:${ip}`;
    const current = parseInt((await env.RATE_LIMIT_KV.get(key)) || "0", 10);
    if (current >= 5) {
      return json({ error: "rate_limited" }, 429, cors);
    }
    await env.RATE_LIMIT_KV.put(key, String(current + 1), {
      expirationTtl: 3600,
    });
  }

  const listId = parseInt(env.LISTMONK_LIST_ID, 10);
  if (!Number.isFinite(listId)) {
    return json({ error: "misconfigured" }, 500, cors);
  }

  const attribs: Record<string, unknown> = {
    source: body.source || body.tag || "website",
  };
  if (body.scores && typeof body.scores === "object") {
    attribs.scores = body.scores;
  }

  const auth = btoa(`${env.LISTMONK_API_USER}:${env.LISTMONK_API_TOKEN}`);
  const upstream = await fetch(`${env.LISTMONK_URL}/api/subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      email,
      name: body.name?.trim() || email.split("@")[0],
      status: "enabled",
      lists: [listId],
      preconfirm_subscriptions: true,
      attribs,
    }),
  });

  if (upstream.status === 409) {
    return json({ success: true, already_subscribed: true }, 200, cors);
  }

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => "");
    console.error("listmonk upstream", upstream.status, detail.slice(0, 500));
    return json({ error: "upstream_error" }, 502, cors);
  }

  return json({ success: true }, 200, cors);
};
