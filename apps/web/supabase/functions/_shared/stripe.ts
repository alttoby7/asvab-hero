// Shared Stripe client for Edge Functions.
// Uses Deno fetch + Stripe HTTP API directly (no SDK to keep cold starts lean).

const STRIPE_BASE = "https://api.stripe.com/v1";
const STRIPE_API_VERSION = "2024-06-20";

export const stripeSecretKey = () => {
  const key = Deno.env.get("ASVABHERO_STRIPE_SECRET_KEY") ?? Deno.env.get("STRIPE_SECRET_KEY");
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY env var");
  return key;
};

export const formEncode = (data: Record<string, unknown>): string => {
  const params = new URLSearchParams();
  const append = (k: string, v: unknown): void => {
    if (v === undefined || v === null) return;
    if (Array.isArray(v)) {
      v.forEach((item, i) => append(`${k}[${i}]`, item));
    } else if (typeof v === "object") {
      for (const [ik, iv] of Object.entries(v)) append(`${k}[${ik}]`, iv);
    } else {
      params.append(k, String(v));
    }
  };
  for (const [k, v] of Object.entries(data)) append(k, v);
  return params.toString();
};

export const stripeRequest = async <T = unknown>(
  method: "GET" | "POST",
  path: string,
  body?: Record<string, unknown>,
): Promise<T> => {
  const headers: HeadersInit = {
    Authorization: `Bearer ${stripeSecretKey()}`,
    "Stripe-Version": STRIPE_API_VERSION,
  };
  let url = `${STRIPE_BASE}${path}`;
  let bodyStr: string | undefined;
  if (body) {
    if (method === "GET") {
      url += "?" + formEncode(body);
    } else {
      bodyStr = formEncode(body);
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
  }
  const res = await fetch(url, { method, headers, body: bodyStr });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`Stripe ${method} ${path} failed: ${res.status} ${JSON.stringify(json)}`);
  }
  return json as T;
};

// Stripe webhook signature verification (Deno-native, no SDK)
// Implements the same algorithm as `stripe.webhooks.constructEvent`.
export const verifyStripeSignature = async (
  rawBody: string,
  signatureHeader: string,
  secret: string,
  toleranceSeconds = 300,
): Promise<{ ok: true; eventTimestamp: number } | { ok: false; reason: string }> => {
  const parts = Object.fromEntries(
    signatureHeader.split(",").map((p) => p.split("=") as [string, string]),
  );
  const t = parts.t;
  const v1 = parts.v1;
  if (!t || !v1) return { ok: false, reason: "missing t or v1 in signature" };
  const ts = parseInt(t, 10);
  if (Number.isNaN(ts)) return { ok: false, reason: "invalid timestamp" };
  if (Math.abs(Date.now() / 1000 - ts) > toleranceSeconds) {
    return { ok: false, reason: "timestamp outside tolerance" };
  }
  const payload = `${t}.${rawBody}`;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  const hex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  if (hex !== v1) return { ok: false, reason: "signature mismatch" };
  return { ok: true, eventTimestamp: ts };
};
