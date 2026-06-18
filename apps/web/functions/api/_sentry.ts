// Minimal Sentry client for Cloudflare Pages Functions (Workers runtime).
// Posts the Sentry envelope format directly via fetch. Mirrors
// supabase/functions/_shared/sentry.ts but reads env from the Workers
// `env` object passed into onRequest, not from process/Deno.env.
//
// Usage:
//   import { sentry } from "./_sentry";
//   const s = sentry(env, "signup");
//   ctx.waitUntil(s.captureMessage("...", { level: "warning", fingerprint: [...] }));
//   await s.captureException(err);   // in catch path before 500 response
//
// If ASVABHERO_SENTRY_DSN_EDGE is unset, capture functions no-op.

interface SentryEnv {
  ASVABHERO_SENTRY_DSN_EDGE?: string;
  ASVABHERO_ENV?: string;
  ASVABHERO_RELEASE?: string;
}

interface ParsedDsn {
  publicKey: string;
  envelopeUrl: string;
}

interface CaptureOpts {
  tags?: Record<string, string | number | boolean | null | undefined>;
  extra?: Record<string, unknown>;
  fingerprint?: string[];
  user?: { id?: string; email?: string };
  level?: "fatal" | "error" | "warning" | "info" | "debug";
}

const parseDsn = (dsn: string): ParsedDsn | null => {
  try {
    const u = new URL(dsn);
    if (!u.username || !u.host || !u.pathname) return null;
    const projectId = u.pathname.replace(/^\//, "");
    if (!projectId) return null;
    return {
      publicKey: u.username,
      envelopeUrl: `${u.protocol}//${u.host}/api/${projectId}/envelope/`,
    };
  } catch {
    return null;
  }
};

const cleanTags = (
  tags: Record<string, string | number | boolean | null | undefined> | undefined,
): Record<string, string> => {
  const out: Record<string, string> = {};
  if (!tags) return out;
  for (const [k, v] of Object.entries(tags)) {
    if (v === null || v === undefined) continue;
    out[k] = String(v);
  }
  return out;
};

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
      in_app: !m[2].includes("node_modules") && !m[2].startsWith("internal/"),
    });
  }
  return frames.reverse();
};

export interface SentryClient {
  captureException: (err: unknown, opts?: CaptureOpts) => Promise<void>;
  captureMessage: (message: string, opts?: CaptureOpts) => Promise<void>;
}

const NOOP_CLIENT: SentryClient = {
  captureException: async () => {},
  captureMessage: async () => {},
};

export const sentry = (env: SentryEnv, surface: string): SentryClient => {
  const rawDsn = env.ASVABHERO_SENTRY_DSN_EDGE ?? "";
  const dsn = rawDsn ? parseDsn(rawDsn) : null;
  if (!dsn) return NOOP_CLIENT;
  const environment = env.ASVABHERO_ENV ?? "production";
  const release = env.ASVABHERO_RELEASE;

  const baseEvent = (opts: CaptureOpts): Record<string, unknown> => {
    const tags = cleanTags(opts.tags);
    tags.surface = surface;
    tags.runtime = "cloudflare-pages";
    return {
      event_id: crypto.randomUUID().replace(/-/g, "").toLowerCase(),
      timestamp: Date.now() / 1000,
      platform: "javascript",
      environment,
      release,
      server_name: surface,
      tags,
      extra: opts.extra,
      user: opts.user,
      fingerprint: opts.fingerprint,
    };
  };

  const send = async (event: Record<string, unknown>): Promise<void> => {
    const eventId = event.event_id as string;
    const sentAt = new Date().toISOString();
    const body =
      `${JSON.stringify({ event_id: eventId, sent_at: sentAt })}\n` +
      `${JSON.stringify({ type: "event" })}\n` +
      `${JSON.stringify(event)}\n`;
    try {
      const resp = await fetch(dsn.envelopeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-sentry-envelope",
          "X-Sentry-Auth": `Sentry sentry_version=7,sentry_client=asvabhero-cloudflare/1.0,sentry_key=${dsn.publicKey}`,
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

  return {
    captureException: async (err, opts = {}) => {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      const event = {
        ...baseEvent(opts),
        level: opts.level ?? "error",
        exception: {
          values: [
            {
              type: errorObj.name || "Error",
              value: errorObj.message,
              stacktrace: errorObj.stack ? { frames: parseStack(errorObj.stack) } : undefined,
            },
          ],
        },
      };
      await send(event);
    },
    captureMessage: async (message, opts = {}) => {
      const event = {
        ...baseEvent(opts),
        level: opts.level ?? "info",
        message: { formatted: message },
      };
      await send(event);
    },
  };
};
