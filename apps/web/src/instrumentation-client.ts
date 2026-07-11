// Client-side Sentry init for the static-exported Next.js app.
// Loaded automatically by @sentry/nextjs when present at the project root.
//
// `output: "export"` means there's no server or edge runtime, this file
// is the only Sentry config that runs. We skip sentry.server.config.ts and
// sentry.edge.config.ts deliberately.
//
// DSN comes from NEXT_PUBLIC_SENTRY_DSN at build time (must be NEXT_PUBLIC_*
// to be exposed to the browser bundle). Cloudflare Pages env var:
//   NEXT_PUBLIC_SENTRY_DSN = ASVABHERO_SENTRY_DSN_NEXT (same value)

import * as Sentry from "@sentry/nextjs";

// Capture App Router navigation errors / slow transitions.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.NEXT_PUBLIC_SENTRY_ENV ?? "production",
    release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
    tracesSampleRate: 0,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
    initialScope: {
      tags: { surface: "next-client", runtime: "browser" },
    },
    // Drop noisy / non-actionable errors before they leave the browser.
    ignoreErrors: [
      "ResizeObserver loop limit exceeded",
      "ResizeObserver loop completed with undelivered notifications",
      "Non-Error promise rejection captured",
      // Injected browser-extension content scripts, not our code.
      /Invalid call to runtime\.sendMessage/,
      "The message port closed before a response was received",
      /Extension context invalidated/,
    ],
  });
}
