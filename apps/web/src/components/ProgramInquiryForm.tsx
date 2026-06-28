"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

const ENDPOINT =
  process.env.NEXT_PUBLIC_ASVAB_PROGRAM_INQUIRY_ENDPOINT || "/api/program-inquiry";

type Status = "idle" | "submitting" | "success" | "error";

export default function ProgramInquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      program: String(data.get("program") || ""),
      role: String(data.get("role") || ""),
      students: String(data.get("students") || ""),
      message: String(data.get("message") || ""),
      plan: "inquiry",
    };

    if (!payload.email.includes("@")) {
      setError("Enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("inquiry failed");
      setStatus("success");
      trackEvent("program_inquiry_submit", { success: true });
    } catch {
      setStatus("error");
      setError("Couldn't reach the server. Email trish@asvabhero.com and I'll set you up directly.");
      trackEvent("program_inquiry_submit", { success: false });
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-success/40 bg-success-dim p-6 text-sm text-success">
        ✓ Got it. I&apos;ll reply within one business day from trish@asvabhero.com
        with next steps and answers to anything you asked.
      </div>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-navy-border bg-navy px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary outline-none focus:border-accent";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="pi-name" className="mb-1.5 block text-sm font-medium text-text-secondary">
            Your name
          </label>
          <input id="pi-name" name="name" type="text" required className={inputCls} placeholder="SFC Jane Doe" />
        </div>
        <div>
          <label htmlFor="pi-email" className="mb-1.5 block text-sm font-medium text-text-secondary">
            Email
          </label>
          <input id="pi-email" name="email" type="email" required className={inputCls} placeholder="you@school.edu" />
        </div>
        <div>
          <label htmlFor="pi-program" className="mb-1.5 block text-sm font-medium text-text-secondary">
            Program / school
          </label>
          <input id="pi-program" name="program" type="text" required className={inputCls} placeholder="Lincoln HS Army JROTC" />
        </div>
        <div>
          <label htmlFor="pi-role" className="mb-1.5 block text-sm font-medium text-text-secondary">
            Your role
          </label>
          <input id="pi-role" name="role" type="text" className={inputCls} placeholder="SAI / AI / instructor" />
        </div>
        <div>
          <label htmlFor="pi-students" className="mb-1.5 block text-sm font-medium text-text-secondary">
            Approx. cadets
          </label>
          <input id="pi-students" name="students" type="text" inputMode="numeric" className={inputCls} placeholder="60" />
        </div>
      </div>
      <div>
        <label htmlFor="pi-message" className="mb-1.5 block text-sm font-medium text-text-secondary">
          Anything you want to know? (optional)
        </label>
        <textarea
          id="pi-message"
          name="message"
          rows={3}
          className={`${inputCls} resize-y`}
          placeholder="Test date, how invoicing works, data questions…"
        />
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Request program access"}
      </button>
      <p className="text-xs text-text-tertiary">
        Goes straight to the founder. No sales team, no auto-drip.
      </p>
    </form>
  );
}
