"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { trackEvent, FunnelEvents } from "@/lib/analytics";
import GoogleSignInButton from "@/components/GoogleSignInButton";

function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams?.get("next") || "/app/home";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = getSupabaseBrowserClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      trackEvent(FunnelEvents.LoginComplete);
      router.push(nextUrl);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-dim">
            <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-bold text-text-primary">Welcome back</h1>
          <p className="mt-1 text-sm text-text-secondary">Log in to track your ASVAB progress</p>
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-text-secondary">
                  Password
                </label>
                <Link href="/reset-password" className="text-xs text-accent hover:text-accent-hover no-underline">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {loading ? "Logging in…" : "Log in"}
            </button>
          </form>

          <div className="mt-5">
            <GoogleSignInButton label="Continue with Google" />
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-text-secondary">
          No account?{" "}
          <Link href="/signup" className="text-accent hover:text-accent-hover no-underline font-medium">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-text-secondary text-sm">Loading…</div>
        </div>
      }
    >
      <LoginPageInner />
    </Suspense>
  );
}
