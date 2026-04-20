"use client";

import { useState } from "react";

interface EmailCaptureProps {
  headline?: string;
  subhead?: string;
  cta?: string;
  tag?: string;
  variant?: "inline" | "card";
}

const ENDPOINT = process.env.NEXT_PUBLIC_ASVAB_SIGNUP_ENDPOINT || "";

type Status = "idle" | "submitting" | "success" | "error";

export default function EmailCapture({
  headline = "Email me my 30-day ASVAB study plan",
  subhead = "Get a personalized 6-page PDF plus a 5-email crash course on AFQT & line scores.",
  cta = "Send it to me",
  tag = "asvab-study-plan",
  variant = "card",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setError(null);

    if (!ENDPOINT) {
      // Graceful fallback while Bento endpoint is being wired: stash locally
      // so we don't drop signups on the floor.
      try {
        const stash = JSON.parse(
          localStorage.getItem("asvabhero.pending_signups") || "[]"
        );
        stash.push({ email, tag, at: new Date().toISOString() });
        localStorage.setItem(
          "asvabhero.pending_signups",
          JSON.stringify(stash)
        );
      } catch {
        /* ignore */
      }
      setStatus("success");
      return;
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tag }),
      });
      if (!res.ok) throw new Error("Signup failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Try again in a minute.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-lg border border-success/40 bg-success-dim p-4 text-sm text-success">
        ✓ You&apos;re in. Check {email} for your study plan in the next few
        minutes.
      </div>
    );
  }

  const container =
    variant === "card"
      ? "rounded-xl border border-accent/40 bg-navy-light p-6"
      : "rounded-lg border border-navy-border bg-navy-light p-4";

  return (
    <section className={container}>
      <h3 className="font-display text-lg font-bold text-text-primary">
        {headline}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">{subhead}</p>
      <form onSubmit={handleSubmit} className="mt-3 flex flex-wrap gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-md border border-navy-border bg-navy px-3 py-2 text-sm text-text-primary placeholder-text-tertiary outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : cta}
        </button>
      </form>
      {error && <p className="mt-2 text-xs text-danger">{error}</p>}
      <p className="mt-2 text-xs text-text-tertiary">
        No spam. Unsubscribe any time.
      </p>
    </section>
  );
}
