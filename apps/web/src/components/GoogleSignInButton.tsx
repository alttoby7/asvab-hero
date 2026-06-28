"use client";

import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

/**
 * Build-time kill-switch for "Continue with Google".
 *
 * The button renders ONLY when NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED === "true".
 * Default (flag unset) = the button does not render at all, so this code is
 * safe to commit + deploy before the Supabase Google provider is enabled —
 * no dead button reaches real users.
 *
 * The owner flips this flag in the Cloudflare Pages env AND enables the Google
 * provider in the Supabase dashboard together (see docs/google-oauth-setup.md).
 */
export function isGoogleOAuthEnabled(): boolean {
  return process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED === "true";
}

/**
 * Resolve a same-site post-login destination from ?next= / ?return=, validated
 * to a relative app path (no open redirect). Mirrors the signup/login pages.
 */
function resolveRedirectTo(): string {
  let nextPath = "/app/home";
  try {
    const sp = new URLSearchParams(window.location.search);
    const raw = sp.get("next") ?? sp.get("return");
    if (raw && raw.startsWith("/") && !raw.startsWith("//")) {
      nextPath = raw;
    }
  } catch {
    /* fall back to /app/home */
  }
  return `${window.location.origin}${nextPath}`;
}

interface GoogleSignInButtonProps {
  /** Label shown on the button. */
  label?: string;
}

/**
 * "Continue with Google" button. Renders nothing unless the OAuth flag is on.
 *
 * Static-export note: @supabase/ssr's createBrowserClient defaults to the PKCE
 * flow with detectSessionInUrl: true. Google redirects back to `redirectTo`
 * (e.g. /app/home) with the auth code in the URL; the browser client picks it
 * up and exchanges it for a session client-side. There is NO server callback
 * route (this is a static export). redirectTo must land on a page that mounts
 * the Supabase client — /app/home does (it's a gated app page).
 */
export default function GoogleSignInButton({
  label = "Continue with Google",
}: GoogleSignInButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isGoogleOAuthEnabled()) return null;

  async function handleClick() {
    setError(null);
    setLoading(true);
    const supabase = getSupabaseBrowserClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: resolveRedirectTo() },
    });
    // On success the browser is redirected to Google, so we never reach here.
    if (oauthError) {
      setError(oauthError.message);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-navy-border" />
        <span className="text-xs uppercase tracking-wide text-text-tertiary">
          or
        </span>
        <span className="h-px flex-1 bg-navy-border" />
      </div>

      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-navy-border bg-navy px-4 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-accent disabled:opacity-60"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
          />
        </svg>
        {loading ? "Redirecting…" : label}
      </button>

      {error && (
        <div className="rounded-lg border border-danger bg-danger-dim px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}
    </div>
  );
}
