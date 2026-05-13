import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  output: "export",
};

// Sentry build-time integration: uploads sourcemaps so client errors are
// readable. Skips silently if SENTRY_AUTH_TOKEN env var is missing (dev).
export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG ?? "asvab-hero",
  project: process.env.SENTRY_PROJECT ?? "asvab-hero-next",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
  sourcemaps: { disable: false, deleteSourcemapsAfterUpload: true },
  disableLogger: true,
});
