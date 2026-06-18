"use client";

import { useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { trackEvent, FunnelEvents } from "@/lib/analytics";
import { getFirstTouchSignupFields } from "@/lib/attribution";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const supabase = getSupabaseBrowserClient();

    // Resolve attribution from the most recent EmailCapture submit (if any).
    // 14-day TTL, older captures are treated as direct /signup traffic.
    // We resolve BEFORE signUp so we can pass signup_source as user metadata;
    // the on_auth_user_created trigger reads raw_user_meta_data->>'signup_source'
    // and writes it atomically into profiles.signup_source. This avoids the
    // RLS problem of a client UPDATE before the email-confirmation session
    // exists (auth.uid() would be null and the update would be rejected).
    let resolvedSource = "signup_page";
    try {
      const raw = localStorage.getItem("asvabhero.last_capture_source");
      if (raw) {
        const parsed = JSON.parse(raw) as {
          source?: string;
          capturedAt?: number;
        };
        const ageMs = Date.now() - (parsed.capturedAt ?? 0);
        const TTL_MS = 14 * 24 * 60 * 60 * 1000;
        if (parsed.source && ageMs >= 0 && ageMs <= TTL_MS) {
          resolvedSource = parsed.source;
        }
        // Clear regardless, stale or used, the touch is consumed.
        localStorage.removeItem("asvabhero.last_capture_source");
      }
    } catch {
      /* ignore, fall back to signup_page */
    }

    // Path integrity: honor a ?next= so the email-confirm link returns the user
    // to where they intended (e.g. the calculator bridge sends them to their
    // plan), instead of always dumping them on /app/home. Validate to a same-site
    // relative app path to avoid an open redirect.
    let nextPath = "/app/home";
    let calcContext: { afqt?: string; branch?: string } = {};
    try {
      const sp = new URLSearchParams(window.location.search);
      // Honor both ?next= (new) and ?return= (existing CTAs on results/pricing).
      const raw = sp.get("next") ?? sp.get("return");
      if (raw && raw.startsWith("/") && !raw.startsWith("//")) {
        nextPath = raw;
      }
      // Stash calculator context so onboarding can pre-fill the branch.
      const afqt = sp.get("afqt");
      const branch = sp.get("branch");
      if (afqt || branch) {
        calcContext = { afqt: afqt ?? undefined, branch: branch ?? undefined };
        localStorage.setItem(
          "asvabhero.calc_context",
          JSON.stringify({ ...calcContext, capturedAt: Date.now() })
        );
      }
    } catch {
      /* ignore, fall back to /app/home */
    }

    // Durable first-touch (utm / referrer class / landing path) for per-user
    // source attribution. Persisted by the handle_new_user() trigger (migration
    // 0051) alongside signup_source. Best-effort; empty when no first_touch.
    const firstTouch = getFirstTouchSignupFields();

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}${nextPath}`,
        data: { signup_source: resolvedSource, ...firstTouch },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      trackEvent(FunnelEvents.SignupComplete, { source: resolvedSource });
      // Fire-and-forget: subscribe to Listmonk so account signups land in the
      // drip. Listmonk returns 409 on duplicate (handled server-side), so this
      // is safe to retry. Never block auth flow on Listmonk failure.
      void fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          tag: "supabase-signup",
          source: "supabase-signup",
        }),
      }).catch(() => {});
      setDone(true);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-success-dim">
            <svg className="h-8 w-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-bold text-text-primary">Check your email</h1>
          <p className="mt-3 text-text-secondary">
            We sent a confirmation link to <span className="font-medium text-text-primary">{email}</span>.
            Open it to activate your account.
          </p>
          <p className="mt-6 text-sm text-text-tertiary">
            Already confirmed?{" "}
            <Link href="/login" className="text-accent hover:text-accent-hover no-underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-dim">
            <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-bold text-text-primary">Create your account</h1>
          <p className="mt-1 text-sm text-text-secondary">Save your progress and track weak spots</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-navy-border bg-navy-light p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-text-secondary">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-navy-border bg-navy px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary outline-none transition-colors focus:border-accent"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-text-secondary">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-navy-border bg-navy px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary outline-none transition-colors focus:border-accent"
                placeholder="min 8 characters"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirm" className="text-sm font-medium text-text-secondary">
                Confirm password
              </label>
              <input
                id="confirm"
                type="password"
                autoComplete="new-password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-lg border border-navy-border bg-navy px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary outline-none transition-colors focus:border-accent"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-danger bg-danger-dim px-4 py-3 text-sm text-danger">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link href="/login" className="text-accent hover:text-accent-hover no-underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
