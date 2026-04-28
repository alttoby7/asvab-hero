"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useSession } from "@/hooks/useSession";
import type { Database } from "@/lib/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

const TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Anchorage",
  "Pacific/Honolulu",
  "UTC",
];

export default function AccountPage() {
  const router = useRouter();
  const { session, loading: sessionLoading } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  // Form state
  const [displayName, setDisplayName] = useState("");
  const [timezone, setTimezone] = useState("UTC");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [dailyEmailOptIn, setDailyEmailOptIn] = useState(true);

  // UI state
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!sessionLoading && !session) {
      router.replace("/login");
    }
  }, [session, sessionLoading, router]);

  // Load profile
  useEffect(() => {
    if (!session) return;

    const supabase = getSupabaseBrowserClient();
    supabase
      .from("profiles")
      .select("*")
      .eq("user_id", session.user.id)
      .single()
      .then(({ data }: { data: Profile | null }) => {
        if (data) {
          setProfile(data);
          setDisplayName(data.display_name ?? "");
          setTimezone(data.timezone ?? "UTC");
          setMarketingOptIn(data.marketing_opt_in ?? false);
          setDailyEmailOptIn(data.daily_email_opt_in ?? true);
        }
        setProfileLoading(false);
      });
  }, [session]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!session) return;
    setSaveLoading(true);
    setSaveMsg(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = getSupabaseBrowserClient() as any;
    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName || null,
        timezone,
        marketing_opt_in: marketingOptIn,
        daily_email_opt_in: dailyEmailOptIn,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", session.user.id);

    setSaveLoading(false);
    if (error) {
      setSaveMsg({ type: "error", text: error.message });
    } else {
      setSaveMsg({ type: "success", text: "Changes saved." });
      setTimeout(() => setSaveMsg(null), 3000);
    }
  }

  async function handleChangePassword() {
    if (!session?.user?.email) return;
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.resetPasswordForEmail(session.user.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setSaveMsg({ type: "success", text: "Password reset email sent." });
    setTimeout(() => setSaveMsg(null), 4000);
  }

  async function handleDeleteAccount() {
    setDeleteLoading(true);
    setDeleteMsg(null);
    try {
      const supabase = getSupabaseBrowserClient();
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/delete-account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentSession?.access_token}`,
          },
        }
      );
      if (res.status === 404) {
        setDeleteMsg("Account deletion is coming soon.");
        setDeleteLoading(false);
        return;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: "Unknown error" }));
        setDeleteMsg(body.error ?? "Failed to delete account.");
        setDeleteLoading(false);
        return;
      }
      await supabase.auth.signOut();
      router.replace("/");
    } catch {
      setDeleteMsg("Something went wrong. Please try again.");
      setDeleteLoading(false);
    }
  }

  async function handleExportData() {
    try {
      const supabase = getSupabaseBrowserClient();
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/export-account-data`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentSession?.access_token}`,
          },
        }
      );
      if (res.status === 404) {
        setSaveMsg({ type: "error", text: "Data export is coming soon." });
        setTimeout(() => setSaveMsg(null), 4000);
        return;
      }
      if (!res.ok) {
        setSaveMsg({ type: "error", text: "Export failed. Please try again." });
        setTimeout(() => setSaveMsg(null), 4000);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "asvab-hero-data.json";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setSaveMsg({ type: "error", text: "Export failed. Please try again." });
      setTimeout(() => setSaveMsg(null), 4000);
    }
  }

  async function handleSignOut() {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace("/");
  }

  // ── Loading states ────────────────────────────────────────────────────────
  if (sessionLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-secondary text-sm">Loading…</div>
      </div>
    );
  }

  if (!session) return null; // will redirect

  // ── Main account UI ───────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-text-primary">Account</h1>
        <p className="mt-1 text-text-secondary">{session.user.email}</p>
      </div>

      {/* Profile form */}
      <div className="rounded-2xl border border-navy-border bg-navy-light p-8 mb-6">
        <h2 className="font-display text-lg font-semibold text-text-primary mb-6">Profile</h2>
        <form onSubmit={handleSave} className="flex flex-col gap-5">
          {/* Display name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="displayName" className="text-sm font-medium text-text-secondary">
              Display name
            </label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-lg border border-navy-border bg-navy px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary outline-none transition-colors focus:border-accent"
              placeholder="Optional"
            />
          </div>

          {/* Timezone */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="timezone" className="text-sm font-medium text-text-secondary">
              Timezone
            </label>
            <select
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full rounded-lg border border-navy-border bg-navy px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Opt-ins */}
          <div className="flex flex-col gap-3">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={dailyEmailOptIn}
                onChange={(e) => setDailyEmailOptIn(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-accent rounded"
              />
              <span className="text-sm text-text-secondary">
                <span className="font-medium text-text-primary">Daily challenge reminders</span>
                <br />
                Get a 10-question challenge in your inbox each morning.
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-accent rounded"
              />
              <span className="text-sm text-text-secondary">
                <span className="font-medium text-text-primary">Tips and updates</span>
                <br />
                Occasional ASVAB study tips and product news.
              </span>
            </label>
          </div>

          {saveMsg && (
            <div
              className={`rounded-lg border px-4 py-3 text-sm ${
                saveMsg.type === "success"
                  ? "border-success bg-success-dim text-success"
                  : "border-danger bg-danger-dim text-danger"
              }`}
            >
              {saveMsg.text}
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-1">
            <button
              type="submit"
              disabled={saveLoading}
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
            >
              {saveLoading ? "Saving…" : "Save changes"}
            </button>
            <button
              type="button"
              onClick={handleChangePassword}
              className="rounded-lg border border-navy-border px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              Change password
            </button>
          </div>
        </form>
      </div>

      {/* Data & account */}
      <div className="rounded-2xl border border-navy-border bg-navy-light p-8">
        <h2 className="font-display text-lg font-semibold text-text-primary mb-6">Data &amp; Account</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExportData}
            className="rounded-lg border border-navy-border px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            Export my data
          </button>
          <button
            onClick={handleSignOut}
            className="rounded-lg border border-navy-border px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            Sign out
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="rounded-lg border border-danger px-5 py-2.5 text-sm font-medium text-danger transition-colors hover:bg-danger-dim"
          >
            Delete account
          </button>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(10,22,40,0.85)", backdropFilter: "blur(8px)" }}>
          <div className="w-full max-w-sm rounded-2xl border border-navy-border bg-navy-light p-8">
            <h2 className="font-display text-xl font-bold text-text-primary mb-2">Delete account?</h2>
            <p className="text-sm text-text-secondary mb-5">
              This permanently deletes your profile, all test attempts, flashcard progress, and study data.
              This cannot be undone. Consider exporting your data first.
            </p>
            <p className="text-sm text-text-secondary mb-3">
              Type <span className="font-mono font-semibold text-danger">delete</span> to confirm:
            </p>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              className="w-full rounded-lg border border-navy-border bg-navy px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-danger mb-4"
              placeholder="delete"
            />
            {deleteMsg && (
              <div className="rounded-lg border border-danger bg-danger-dim px-4 py-3 text-sm text-danger mb-4">
                {deleteMsg}
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText("");
                  setDeleteMsg(null);
                }}
                className="flex-1 rounded-lg border border-navy-border px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== "delete" || deleteLoading}
                className="flex-1 rounded-lg bg-danger px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-500 disabled:opacity-50"
              >
                {deleteLoading ? "Deleting…" : "Delete account"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile info if no profile yet */}
      {!profile && (
        <div className="mt-4 rounded-lg border border-almost bg-almost-dim px-4 py-3 text-sm text-almost">
          Profile record not found. It may take a moment to appear after first sign-in.
        </div>
      )}
    </div>
  );
}
