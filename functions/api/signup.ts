interface Env {
  LISTMONK_URL: string;
  LISTMONK_API_USER: string;
  LISTMONK_API_TOKEN: string;
  LISTMONK_LIST_ID: string;
  LISTMONK_WELCOME_TEMPLATE_ID?: string;
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

  try {
    const LISTMONK_URL = (env.LISTMONK_URL || "").trim().replace(/\/+$/, "");
    const LISTMONK_API_USER = (env.LISTMONK_API_USER || "").trim();
    const LISTMONK_API_TOKEN = (env.LISTMONK_API_TOKEN || "").trim();
    const LISTMONK_LIST_ID = (env.LISTMONK_LIST_ID || "").trim();

    if (!LISTMONK_URL || !LISTMONK_API_USER || !LISTMONK_API_TOKEN || !LISTMONK_LIST_ID) {
      return json(
        {
          error: "misconfigured",
          missing: {
            LISTMONK_URL: !LISTMONK_URL,
            LISTMONK_API_USER: !LISTMONK_API_USER,
            LISTMONK_API_TOKEN: !LISTMONK_API_TOKEN,
            LISTMONK_LIST_ID: !LISTMONK_LIST_ID,
          },
        },
        500,
        cors
      );
    }

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

    const listId = parseInt(LISTMONK_LIST_ID, 10);
    if (!Number.isFinite(listId)) {
      return json({ error: "bad_list_id" }, 500, cors);
    }

    const attribs: Record<string, unknown> = {
      source: body.source || body.tag || "website",
    };
    if (body.scores && typeof body.scores === "object") {
      attribs.scores = body.scores;
    }

    const auth = btoa(`${LISTMONK_API_USER}:${LISTMONK_API_TOKEN}`);
    const upstream = await fetch(`${LISTMONK_URL}/api/subscribers`, {
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
      return json({ error: "upstream_error", status: upstream.status }, 502, cors);
    }

    const welcomeTemplateId = parseInt(
      (env.LISTMONK_WELCOME_TEMPLATE_ID || "").trim(),
      10
    );
    if (Number.isFinite(welcomeTemplateId)) {
      try {
        const tx = await fetch(`${LISTMONK_URL}/api/tx`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${auth}`,
          },
          body: JSON.stringify({
            subscriber_email: email,
            template_id: welcomeTemplateId,
          }),
        });
        if (!tx.ok) {
          const detail = await tx.text().catch(() => "");
          console.error("listmonk tx", tx.status, detail.slice(0, 500));
        }
      } catch (err) {
        console.error("listmonk tx threw", err);
      }
    }

    return json({ success: true }, 200, cors);
  } catch (err) {
    console.error("signup handler crashed", err);
    return json(
      { error: "internal_error", message: err instanceof Error ? err.message : String(err) },
      500,
      cors
    );
  }
};
