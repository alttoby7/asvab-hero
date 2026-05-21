"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useSession } from "@/hooks/useSession";
import { trackEvent } from "@/lib/analytics";
import { addTargetJob } from "@/lib/trajectory/queries";
import type { JobCatalogEntry } from "@/lib/trajectory/types";
import JobPicker from "@/components/app/JobPicker";

type Branch =
  | "army"
  | "navy"
  | "marines"
  | "air_force"
  | "space_force"
  | "coast_guard"
  | "undecided";

type TestDateBucket = "lt_30" | "30_90" | "90_180" | "gt_180" | "not_sure";

type WeakestSubtest =
  | "GS"
  | "AR"
  | "WK"
  | "PC"
  | "MK"
  | "EI"
  | "AS"
  | "MC"
  | "AO"
  | "not_sure";

const BRANCH_OPTIONS: { value: Branch; label: string }[] = [
  { value: "army", label: "Army" },
  { value: "navy", label: "Navy" },
  { value: "marines", label: "Marines" },
  { value: "air_force", label: "Air Force" },
  { value: "space_force", label: "Space Force" },
  { value: "coast_guard", label: "Coast Guard" },
  { value: "undecided", label: "Undecided" },
];

const BUCKET_OPTIONS: { value: TestDateBucket; label: string }[] = [
  { value: "lt_30", label: "Within 30 days" },
  { value: "30_90", label: "1-3 months" },
  { value: "90_180", label: "3-6 months" },
  { value: "gt_180", label: "More than 6 months" },
  { value: "not_sure", label: "Not sure yet" },
];

const SUBTEST_OPTIONS: { value: WeakestSubtest; label: string }[] = [
  { value: "GS", label: "General Science" },
  { value: "AR", label: "Arithmetic Reasoning" },
  { value: "WK", label: "Word Knowledge" },
  { value: "PC", label: "Paragraph Comprehension" },
  { value: "MK", label: "Mathematics Knowledge" },
  { value: "EI", label: "Electronics Information" },
  { value: "AS", label: "Auto & Shop Information" },
  { value: "MC", label: "Mechanical Comprehension" },
  { value: "AO", label: "Assembling Objects" },
  { value: "not_sure", label: "Not sure" },
];

function SegmentButton<T extends string>({
  value,
  label,
  selected,
  onClick,
}: {
  value: T;
  label: string;
  selected: boolean;
  onClick: (v: T) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={
        "rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors " +
        (selected
          ? "border-accent bg-accent-dim text-accent"
          : "border-navy-border bg-navy text-text-secondary hover:text-text-primary hover:border-accent/40")
      }
    >
      {label}
    </button>
  );
}

export function OnboardingForm() {
  const router = useRouter();
  const { session } = useSession();

  const [branch, setBranch] = useState<Branch | null>(null);
  const [bucket, setBucket] = useState<TestDateBucket | null>(null);
  const [specificDate, setSpecificDate] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [weakest, setWeakest] = useState<WeakestSubtest | null>(null);
  // Optional goal jobs (up to 3), persisted on submit via rpc_add_target_job.
  const [goalJobs, setGoalJobs] = useState<JobCatalogEntry[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [skipping, setSkipping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasTestDate = !!specificDate || !!bucket;
  const canSubmit = !!branch && hasTestDate && !!weakest && !submitting && !skipping;

  function handleBucket(v: TestDateBucket) {
    setBucket(v);
    setSpecificDate("");
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSpecificDate(e.target.value);
    if (e.target.value) setBucket(null);
  }

  function toggleDatePicker() {
    setShowDatePicker((s) => !s);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!session || !canSubmit) return;
    setSubmitting(true);
    setError(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const payload = {
      branch,
      target_test_date: specificDate ? specificDate : null,
      target_test_date_bucket: specificDate ? null : bucket,
      self_reported_weakest_subtest: weakest,
      onboarding_completed_at: new Date().toISOString(),
    };

    const { error: updateError } = await sb
      .from("profiles")
      .update(payload)
      .eq("user_id", session.user.id);

    if (updateError) {
      setError(updateError.message || "Could not save your preferences. Please try again.");
      setSubmitting(false);
      return;
    }

    // Persist any picked goal jobs (best-effort; first becomes primary).
    for (let i = 0; i < goalJobs.length; i++) {
      try {
        await addTargetJob(sb, goalJobs[i].id, i === 0);
      } catch {
        /* non-fatal — onboarding still completes */
      }
    }

    trackEvent("onboarding_completed", {
      branch: branch ?? undefined,
      has_test_date: !!specificDate,
      weakest_subtest: weakest ?? undefined,
      goal_jobs: goalJobs.length,
    });

    router.push("/app/home");
  }

  async function handleSkip() {
    if (!session || skipping || submitting) return;
    setSkipping(true);
    setError(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const payload = {
      branch: null,
      target_test_date: null,
      target_test_date_bucket: null,
      self_reported_weakest_subtest: null,
      onboarding_completed_at: new Date().toISOString(),
    };

    const { error: updateError } = await sb
      .from("profiles")
      .update(payload)
      .eq("user_id", session.user.id);

    if (updateError) {
      setError(updateError.message || "Could not skip right now. Please try again.");
      setSkipping(false);
      return;
    }

    trackEvent("onboarding_skipped");
    router.push("/app/home");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8 space-y-8"
    >
      {/* Q1 — Branch */}
      <div>
        <label className="block font-display text-lg font-semibold text-text-primary mb-3">
          1. Which branch are you targeting?
        </label>
        <div className="flex flex-wrap gap-2">
          {BRANCH_OPTIONS.map((opt) => (
            <SegmentButton
              key={opt.value}
              value={opt.value}
              label={opt.label}
              selected={branch === opt.value}
              onClick={setBranch}
            />
          ))}
        </div>
      </div>

      {/* Q2 — Test date */}
      <div>
        <label className="block font-display text-lg font-semibold text-text-primary mb-3">
          2. When are you planning to take the ASVAB?
        </label>
        {!showDatePicker ? (
          <>
            <div className="flex flex-wrap gap-2">
              {BUCKET_OPTIONS.map((opt) => (
                <SegmentButton
                  key={opt.value}
                  value={opt.value}
                  label={opt.label}
                  selected={bucket === opt.value}
                  onClick={handleBucket}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={toggleDatePicker}
              className="mt-3 text-sm text-accent hover:text-accent-hover transition-colors"
            >
              Set specific date instead
            </button>
          </>
        ) : (
          <div className="space-y-2">
            <input
              type="date"
              value={specificDate}
              onChange={handleDateChange}
              className="rounded-lg border border-navy-border bg-navy px-4 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none"
            />
            <div>
              <button
                type="button"
                onClick={toggleDatePicker}
                className="text-sm text-accent hover:text-accent-hover transition-colors"
              >
                Pick a range instead
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Q3 — Weakest subtest */}
      <div>
        <label className="block font-display text-lg font-semibold text-text-primary mb-3">
          3. Which subtest feels weakest right now?
        </label>
        <div className="flex flex-wrap gap-2">
          {SUBTEST_OPTIONS.map((opt) => (
            <SegmentButton
              key={opt.value}
              value={opt.value}
              label={opt.label}
              selected={weakest === opt.value}
              onClick={setWeakest}
            />
          ))}
        </div>
      </div>

      {/* Q4 — Optional goal jobs (after branch is chosen) */}
      {branch && branch !== "undecided" && (
        <div>
          <label className="block font-display text-lg font-semibold text-text-primary mb-1">
            4. Any target jobs? <span className="text-text-tertiary text-sm font-normal">(optional)</span>
          </label>
          <p className="mb-3 text-sm text-text-secondary">
            Pick up to 3. We&apos;ll track how close you are to each — as a
            confidence band, not a single number.
          </p>

          {goalJobs.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {goalJobs.map((j) => (
                <span
                  key={j.id}
                  className="inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent-dim px-3 py-1.5 text-sm text-accent"
                >
                  <span className="font-medium">{j.code}</span>
                  <span className="text-accent/80">{j.title}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setGoalJobs((g) => g.filter((x) => x.id !== j.id))
                    }
                    className="text-accent/70 hover:text-accent"
                    aria-label={`Remove ${j.code}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {goalJobs.length < 3 ? (
            <JobPicker
              defaultBranch={branch as never}
              onPick={(entry) =>
                setGoalJobs((g) =>
                  g.some((x) => x.id === entry.id) ? g : [...g, entry]
                )
              }
              disabledJobIds={goalJobs.map((j) => j.id)}
            />
          ) : (
            <p className="text-xs text-text-tertiary">
              You&apos;ve picked the max of 3. Remove one to swap.
            </p>
          )}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          type="submit"
          disabled={!canSubmit}
          className={
            "rounded-lg px-6 py-2.5 text-sm font-semibold transition-colors " +
            (canSubmit
              ? "bg-accent text-white hover:bg-accent-hover"
              : "bg-navy-border text-text-tertiary cursor-not-allowed")
          }
        >
          {submitting ? "Saving…" : "Build my study plan"}
        </button>
        <button
          type="button"
          onClick={handleSkip}
          disabled={submitting || skipping}
          className="text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          {skipping ? "Skipping…" : "Skip for now"}
        </button>
      </div>
    </form>
  );
}
