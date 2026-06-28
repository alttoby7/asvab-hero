// Minimal Sentry client for Supabase Edge Functions (Deno).
// Posts the Sentry envelope format directly via fetch. No SDK dependency
// to keep cold starts lean and match the existing `_shared/stripe.ts` style.
//
// Usage:
//   import { initSentry, captureException, captureMessage } from "../_shared/sentry.ts";
//   initSentry({ surface: "stripe-webhook" });
//
// In failure (catch) paths: ALWAYS `await` so the event ships before the
// 5xx response returns. Bare `void captureException(...)` after returning a
// Response is unreliable on Supabase Edge — async work is killed when the
// Response settles unless wrapped in `EdgeRuntime.waitUntil(promise)`.
//
// Success-path telemetry (warnings, info) → use EdgeRuntime.waitUntil:
//   // @ts-ignore Supabase Edge global
//   EdgeRuntime.waitUntil(captureMessage("...", { level: "warning" }));
//
// If ASVABHERO_SENTRY_DSN_EDGE is unset, all capture functions no-op.
// Failure to post to Sentry is logged via console.error but never throws —
// observability tooling must never crash the app.
//
// Envelope format reference:
//   https://develop.sentry.dev/sdk/envelopes/
//   https://develop.sentry.dev/sdk/event-payloads/

interface ParsedDsn {
  publicKey: string;
  host: string;
  projectId: string;
  envelopeUrl: string;
}

interface SentryConfig {
  dsn: ParsedDsn | null;
  surface: string;
  release?: string;
  environment: string;
}

let config: SentryConfig | null = null;

const parseDsn = (dsn: string): ParsedDsn | null => {
  // DSN format: https://PUBLIC_KEY@oXXX.ingest.sentry.io/PROJECT_ID
  try {
    const u = new URL(dsn);
    const publicKey = u.username;
    const host = u.host;
    const projectId = u.pathname.replace(/^\//, "");
    if (!publicKey || !host || !projectId) return null;
    return {
      publicKey,
      host,
      projectId,
      envelopeUrl: `${u.protocol}//${host}/api/${projectId}/envelope/`,
    };
  } catch {
    return null;
  }
};

export const initSentry = (opts: { surface: string; release?: string }): void => {
  const rawDsn = Deno.env.get("ASVABHERO_SENTRY_DSN_EDGE") ?? "";
  const dsn = rawDsn ? parseDsn(rawDsn) : null;
  config = {
    dsn,
    surface: opts.surface,
    release: opts.release ?? Deno.env.get("ASVABHERO_RELEASE") ?? undefined,
    environment: Deno.env.get("ASVABHERO_ENV") ?? "production",
  };
};

interface CaptureOpts {
  tags?: Record<string, string | number | boolean | null | undefined>;
  extra?: Record<string, unknown>;
  fingerprint?: string[];
  user?: { id?: string; email?: string };
  level?: "fatal" | "error" | "warning" | "info" | "debug";
}

const buildAuthHeader = (publicKey: string): string =>
  `Sentry sentry_version=7,sentry_client=asvabhero-edge/1.0,sentry_key=${publicKey}`;

const cleanTags = (
  tags: Record<string, string | number | boolean | null | undefined> | undefined,
): Record<string, string> => {
  if (!tags) return {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(tags)) {
    if (v === null || v === undefined) continue;
    out[k] = String(v);
  }
  return out;
};

const baseEvent = (opts: CaptureOpts): Record<string, unknown> => {
  if (!config) return {};
  const tags = cleanTags(opts.tags);
  tags.surface = config.surface;
  tags.runtime = "deno-edge";
  return {
    event_id: crypto.randomUUID().replace(/-/g, "").toLowerCase(),
    timestamp: Date.now() / 1000,
    platform: "javascript",
    environment: config.environment,
    release: config.release,
    server_name: config.surface,
    tags,
    extra: opts.extra,
    user: opts.user,
    fingerprint: opts.fingerprint,
  };
};

const sendEnvelope = async (event: Record<string, unknown>): Promise<void> => {
  if (!config?.dsn) return;
  const { publicKey, envelopeUrl } = config.dsn;
  const eventId = event.event_id as string;
  const sentAt = new Date().toISOString();
  const envelopeHeader = JSON.stringify({ event_id: eventId, sent_at: sentAt });
  const itemHeader = JSON.stringify({ type: "event" });
  const itemBody = JSON.stringify(event);
  const body = `${envelopeHeader}\n${itemHeader}\n${itemBody}\n`;
  try {
    const resp = await fetch(envelopeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-sentry-envelope",
        "X-Sentry-Auth": buildAuthHeader(publicKey),
      },
      body,
    });
    if (!resp.ok) {
      const detail = await resp.text().catch(() => "");
      console.error("sentry envelope non-2xx", resp.status, detail.slice(0, 300));
    }
  } catch (err) {
    console.error("sentry envelope POST failed", String(err));
  }
};

export const captureException = async (
  err: unknown,
  opts: CaptureOpts = {},
): Promise<void> => {
  if (!config?.dsn) return;
  const errorObj = err instanceof Error ? err : new Error(String(err));
  const event = {
    ...baseEvent(opts),
    level: opts.level ?? "error",
    exception: {
      values: [
        {
          type: errorObj.name || "Error",
          value: errorObj.message,
          stacktrace: errorObj.stack
            ? { frames: parseStack(errorObj.stack) }
            : undefined,
        },
      ],
    },
  };
  await sendEnvelope(event);
};

export const captureMessage = async (
  message: string,
  opts: CaptureOpts = {},
): Promise<void> => {
  if (!config?.dsn) return;
  const event = {
    ...baseEvent(opts),
    level: opts.level ?? "info",
    message: { formatted: message },
  };
  await sendEnvelope(event);
};

// Best-effort stack frame parser for Deno/V8 stack traces.
// Format: "    at funcName (file:///path/to/file.ts:line:col)"
const parseStack = (stack: string): Array<Record<string, unknown>> => {
  const lines = stack.split("\n").slice(1, 31);
  const frames: Array<Record<string, unknown>> = [];
  for (const line of lines) {
    const m = line.match(/at (?:(.+?) \()?([^()]+):(\d+):(\d+)\)?$/);
    if (!m) continue;
    frames.push({
      function: m[1] ?? "<anonymous>",
      filename: m[2],
      lineno: parseInt(m[3], 10),
      colno: parseInt(m[4], 10),
      in_app: !m[2].includes("https://esm.sh") && !m[2].includes("deno.land"),
    });
  }
  // Sentry expects frames in oldest→newest order
  return frames.reverse();
};
