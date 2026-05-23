"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useSession } from "@/hooks/useSession";
import type { Database } from "@/lib/supabase/types";
import {
  getHomeTrajectory,
  addTargetJob,
  removeTargetJob,
  reorderTargetJobs,
} from "@/lib/trajectory/queries";
import type { TargetJobGap } from "@/lib/trajectory/types";
import { BRANCH_NAMES, type Branch } from "@/types";
import JobPicker from "@/components/app/JobPicker";

// The generated types lag a couple migrations (test_type 0032, study_anchor
// 0028), so augment locally — same reason onboarding/plan cast to any.
type Profile = Database["public"]["Tables"]["profiles"]["Row"] & {
  test_type: string | null;
  study_anchor: string | null;
};

const TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Anchorage",
  "Pacific/Honolulu",
  "UTC",
];

// Study-plan options — mirror the onboarding form so settings is the durable
// editor for everything onboarding captures (test type / branch / cadence /
// test date). Keeping these in sync is what makes "Set your study days" and
// "Change schedule" on /app/plan actually lead somewhere.
const TEST_TYPE_OPTIONS: { value: string; label: string }[] = [
  { value: "initial_asvab", label: "Initial ASVAB (joining)" },
  { value: "afct", label: "AFCT (active-duty retest)" },
];

const BRANCH_OPTIONS: { value: string; label: string }[] = [
  { value: "army", label: "Army" },
  { value: "navy", label: "Navy" },
  { value: "marines", label: "Marines" },
  { value: "air_force", label: "Air Force" },
  { value: "space_force", label: "Space Force" },
  { value: "coast_guard", label: "Coast Guard" },
  { value: "undecided", label: "Undecided" },
];

const BUCKET_OPTIONS: { value: string; label: string }[] = [
  { value: "lt_30", label: "Within 30 days" },
  { value: "30_90", label: "1-3 months" },
  { value: "90_180", label: "3-6 months" },
  { value: "gt_180", label: "More than 6 months" },
  { value: "not_sure", label: "Not sure yet" },
];

const DAYS_OPTIONS: { value: number; label: string }[] = [
  { value: 3, label: "3 days a week" },
  { value: 4, label: "4 days a week" },
  { value: 5, label: "5 days a week" },
  { value: 6, label: "6 days a week" },
  { value: 7, label: "Every day" },
];

const TIME_OPTIONS: { value: string; label: string }[] = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
];

export default function AccountSettingsPage() {
  const router = useRouter();
  const { session, loading: sessionLoading } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  // Form state
  const [displayName, setDisplayName] = useState("");
  const [timezone, setTimezone] = useState("UTC");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [dailyEmailOptIn, setDailyEmailOptIn] = useState(true);

  // Study-plan form state (test type / branch / cadence / test date)
  const [testType, setTestType] = useState("");
  const [branch, setBranch] = useState("");
  const [studyDays, setStudyDays] = useState<number | null>(null);
  const [studyTime, setStudyTime] = useState("");
  const [studyAnchor, setStudyAnchor] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [targetBucket, setTargetBucket] = useState("");
  const [planLoading, setPlanLoading] = useState(false);
  const [planMsg, setPlanMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Target jobs manager state
  const [targetJobs, setTargetJobs] = useState<TargetJobGap[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [addingJob, setAddingJob] = useState(false);
  const [jobMsg, setJobMsg] = useState<string | null>(null);

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = getSupabaseBrowserClient() as any;
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
          setTestType(data.test_type ?? "");
          setBranch(data.branch ?? "");
          setStudyDays(data.study_days_per_week ?? null);
          setStudyTime(data.preferred_study_time ?? "");
          setStudyAnchor(data.study_anchor ?? "");
          setTargetDate(data.target_test_date ?? "");
          setTargetBucket(data.target_test_date_bucket ?? "");
        }
        setProfileLoading(false);
      });
  }, [session]);

  // Load target jobs via the home trajectory RPC (gives title/order/primary).
  const loadTargetJobs = useCallback(async () => {
    if (!session) return;
    setJobsLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sb = getSupabaseBrowserClient() as any;
      const traj = await getHomeTrajectory(sb);
      setTargetJobs(traj.target_jobs ?? []);
    } catch {
      setTargetJobs([]);
    } finally {
      setJobsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (!session) return;
    loadTargetJobs();
  }, [session, loadTargetJobs]);

  async function handleAddJob(jobId: string) {
    setJobMsg(null);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sb = getSupabaseBrowserClient() as any;
      await addTargetJob(sb, jobId, targetJobs.length === 0);
      setAddingJob(false);
      await loadTargetJobs();
    } catch (e) {
      setJobMsg(e instanceof Error ? e.message : "Could not add that job.");
    }
  }

  async function handleRemoveJob(targetJobId: string) {
    setJobMsg(null);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sb = getSupabaseBrowserClient() as any;
      await removeTargetJob(sb, targetJobId);
      await loadTargetJobs();
    } catch (e) {
      setJobMsg(e instanceof Error ? e.message : "Could not remove that job.");
    }
  }

  // Reorder: move a job up/down, or make it primary (move to front).
  async function persistOrder(orderedTargetJobIds: string[]) {
    setJobMsg(null);
    // Optimistic: reflect new order locally before the round-trip.
    const byId = new Map(targetJobs.map((j) => [j.target_job_id, j]));
    setTargetJobs(
      orderedTargetJobIds
        .map((id, i) => {
          const j = byId.get(id);
          return j
            ? { ...j, display_order: i, is_primary: i === 0 }
            : null;
        })
        .filter((j): j is TargetJobGap => j !== null)
    );
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sb = getSupabaseBrowserClient() as any;
      await reorderTargetJobs(sb, orderedTargetJobIds);
      await loadTargetJobs();
    } catch (e) {
      setJobMsg(e instanceof Error ? e.message : "Could not save order.");
      await loadTargetJobs();
    }
  }

  function moveJob(index: number, dir: -1 | 1) {
    const ids = targetJobs.map((j) => j.target_job_id);
    const next = index + dir;
    if (next < 0 || next >= ids.length) return;
    [ids[index], ids[next]] = [ids[next], ids[index]];
    persistOrder(ids);
  }

  function makePrimary(index: number) {
    if (index === 0) return;
    const ids = targetJobs.map((j) => j.target_job_id);
    const [picked] = ids.splice(index, 1);
    persistOrder([picked, ...ids]);
  }

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

  async function handleSaveStudyPlan(e: React.FormEvent) {
    e.preventDefault();
    if (!session) return;
    setPlanLoading(true);
    setPlanMsg(null);

    // A specific date and a rough bucket are mutually exclusive (mirrors
    // onboarding): a concrete date always wins and clears the bucket.
    const payload = {
      test_type: testType || null,
      branch: branch || null,
      study_days_per_week: studyDays,
      preferred_study_time: studyTime || null,
      study_anchor: studyAnchor.trim() || null,
      target_test_date: targetDate || null,
      target_test_date_bucket: targetDate ? null : targetBucket || null,
      updated_at: new Date().toISOString(),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = getSupabaseBrowserClient() as any;
    const { error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("user_id", session.user.id);

    setPlanLoading(false);
    if (error) {
      setPlanMsg({ type: "error", text: error.message });
    } else {
      setProfile((p) => (p ? { ...p, ...payload } : p));
      setPlanMsg({ type: "success", text: "Study plan saved." });
      setTimeout(() => setPlanMsg(null), 3000);
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
        <h1 className="font-display text-3xl font-bold text-text-primary">Account Settings</h1>
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

      {/* Study plan */}
      <div className="rounded-2xl border border-navy-border bg-navy-light p-8 mb-6">
        <h2 className="font-display text-lg font-semibold text-text-primary mb-1">Study plan</h2>
        <p className="mb-6 text-sm text-text-secondary">
          Sets your target metric and the cadence your plan holds you to. Choose
          AFCT if you&apos;re already serving and retesting to reclassify.
        </p>
        <form onSubmit={handleSaveStudyPlan} className="flex flex-col gap-5">
          {/* Test type */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="testType" className="text-sm font-medium text-text-secondary">
              Which test are you preparing for?
            </label>
            <select
              id="testType"
              value={testType}
              onChange={(e) => setTestType(e.target.value)}
              className="w-full rounded-lg border border-navy-border bg-navy px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent"
            >
              <option value="">Not set</option>
              {TEST_TYPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            {testType === "afct" && (branch === "navy" || branch === "coast_guard") && (
              <p className="text-xs text-text-tertiary">
                Navy/Coast Guard retests use rating-specific line scores — add your
                target rating under Goal jobs and your plan will drill its
                composite (shown as a practice proxy, not an official score).
              </p>
            )}
          </div>

          {/* Branch */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="branch" className="text-sm font-medium text-text-secondary">
              Branch
            </label>
            <select
              id="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full rounded-lg border border-navy-border bg-navy px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent"
            >
              <option value="">Not set</option>
              {BRANCH_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Test date — specific date wins; bucket is the fallback. */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="targetDate" className="text-sm font-medium text-text-secondary">
              Test date
            </label>
            <input
              id="targetDate"
              type="date"
              value={targetDate}
              onChange={(e) => {
                setTargetDate(e.target.value);
                if (e.target.value) setTargetBucket("");
              }}
              className="w-full rounded-lg border border-navy-border bg-navy px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent"
            />
            <label htmlFor="targetBucket" className="mt-1 text-xs text-text-tertiary">
              Or a rough timeframe if you don&apos;t have a date yet:
            </label>
            <select
              id="targetBucket"
              value={targetBucket}
              disabled={!!targetDate}
              onChange={(e) => setTargetBucket(e.target.value)}
              className="w-full rounded-lg border border-navy-border bg-navy px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent disabled:opacity-50"
            >
              <option value="">Not set</option>
              {BUCKET_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Study days per week */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="studyDays" className="text-sm font-medium text-text-secondary">
              Study days
            </label>
            <select
              id="studyDays"
              value={studyDays ?? ""}
              onChange={(e) => setStudyDays(e.target.value ? Number(e.target.value) : null)}
              className="w-full rounded-lg border border-navy-border bg-navy px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent"
            >
              <option value="">Not set</option>
              {DAYS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Preferred study time */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="studyTime" className="text-sm font-medium text-text-secondary">
              Preferred study time
            </label>
            <select
              id="studyTime"
              value={studyTime}
              onChange={(e) => setStudyTime(e.target.value)}
              className="w-full rounded-lg border border-navy-border bg-navy px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent"
            >
              <option value="">Not set</option>
              {TIME_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Study anchor */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="studyAnchor" className="text-sm font-medium text-text-secondary">
              Study anchor <span className="text-text-tertiary">(optional)</span>
            </label>
            <input
              id="studyAnchor"
              type="text"
              value={studyAnchor}
              maxLength={80}
              onChange={(e) => setStudyAnchor(e.target.value)}
              placeholder="I'll study right after… e.g. breakfast, my last class"
              className="w-full rounded-lg border border-navy-border bg-navy px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary outline-none transition-colors focus:border-accent"
            />
            <p className="text-xs text-text-tertiary">
              Anchoring study to an existing habit makes the routine far more
              likely to stick.
            </p>
          </div>

          {planMsg && (
            <div
              className={`rounded-lg border px-4 py-3 text-sm ${
                planMsg.type === "success"
                  ? "border-success bg-success-dim text-success"
                  : "border-danger bg-danger-dim text-danger"
              }`}
            >
              {planMsg.text}
            </div>
          )}

          <div className="pt-1">
            <button
              type="submit"
              disabled={planLoading}
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
            >
              {planLoading ? "Saving…" : "Save study plan"}
            </button>
          </div>
        </form>
      </div>

      {/* Goal jobs manager */}
      <div className="rounded-2xl border border-navy-border bg-navy-light p-8 mb-6">
        <div className="mb-1 flex items-center justify-between gap-3">
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Goal jobs
          </h2>
          <span className="text-xs text-text-tertiary">
            {targetJobs.length}/3
          </span>
        </div>
        <p className="mb-5 text-sm text-text-secondary">
          Track up to 3 target jobs. The first is your primary goal and is
          highlighted on your home screen.
        </p>

        {jobsLoading ? (
          <div className="text-sm text-text-tertiary">Loading…</div>
        ) : (
          <>
            {targetJobs.length === 0 && !addingJob && (
              <div className="rounded-lg border border-navy-border bg-navy px-4 py-3 text-sm text-text-secondary">
                No goal jobs yet. Add one to track your standing against it.
              </div>
            )}

            {targetJobs.length > 0 && (
              <div className="space-y-2">
                {targetJobs.map((j, i) => (
                  <div
                    key={j.target_job_id}
                    className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 ${
                      j.is_primary
                        ? "border-accent/40 bg-accent/5"
                        : "border-navy-border bg-navy"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-text-primary">
                          {j.code}
                        </span>
                        {j.is_primary && (
                          <span className="rounded border border-accent/40 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                            Primary
                          </span>
                        )}
                      </div>
                      <div className="truncate text-xs text-text-secondary">
                        {BRANCH_NAMES[j.branch]} · {j.title}
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      {!j.is_primary && (
                        <button
                          onClick={() => makePrimary(i)}
                          className="rounded border border-navy-border px-2 py-1 text-[11px] text-text-secondary transition-colors hover:text-text-primary"
                        >
                          Make primary
                        </button>
                      )}
                      <button
                        onClick={() => moveJob(i, -1)}
                        disabled={i === 0}
                        aria-label="Move up"
                        className="rounded border border-navy-border px-2 py-1 text-text-secondary transition-colors hover:text-text-primary disabled:opacity-30"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveJob(i, 1)}
                        disabled={i === targetJobs.length - 1}
                        aria-label="Move down"
                        className="rounded border border-navy-border px-2 py-1 text-text-secondary transition-colors hover:text-text-primary disabled:opacity-30"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => handleRemoveJob(j.target_job_id)}
                        aria-label="Remove"
                        className="rounded border border-danger/40 px-2 py-1 text-danger transition-colors hover:bg-danger-dim"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {jobMsg && (
              <div className="mt-3 rounded-lg border border-danger/40 bg-danger-dim px-3 py-2 text-xs text-danger">
                {jobMsg}
              </div>
            )}

            {addingJob ? (
              <div className="mt-4 rounded-xl border border-navy-border bg-navy p-4">
                <JobPicker
                  defaultBranch={(profile?.branch ?? null) as Branch | null}
                  onPick={(entry) => handleAddJob(entry.id)}
                  disabledJobIds={targetJobs.map((j) => j.job_id)}
                  notice={
                    targetJobs.length >= 3
                      ? "You're tracking the max of 3 goal jobs."
                      : null
                  }
                />
                <button
                  onClick={() => {
                    setAddingJob(false);
                    setJobMsg(null);
                  }}
                  className="mt-3 text-sm text-text-tertiary transition-colors hover:text-text-secondary"
                >
                  Cancel
                </button>
              </div>
            ) : (
              targetJobs.length < 3 && (
                <button
                  onClick={() => setAddingJob(true)}
                  className="mt-4 inline-flex rounded-lg border border-accent/40 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent-dim"
                >
                  Add a goal job
                </button>
              )
            )}
          </>
        )}
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
