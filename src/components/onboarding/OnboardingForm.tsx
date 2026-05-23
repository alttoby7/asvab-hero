"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useSession } from "@/hooks/useSession";
import { trackEvent } from "@/lib/analytics";
import { addTargetJob } from "@/lib/trajectory/queries";
import type { JobCatalogEntry } from "@/lib/trajectory/types";
import JobPicker from "@/components/app/JobPicker";
import { getPrepMode, type TestType } from "@/lib/prep-mode";
import type { Branch as BranchType } from "@/types";
import OfficialScoreForm, {
  type ExamKind,
  type OfficialScoreSaved,
} from "@/components/score/OfficialScoreForm";

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

// Implementation intention (Gollwitzer): committing to days + a time + a concrete
// anchor measurably raises adherence — the lab-to-field gap for real score gains.
type StudyTime = "morning" | "afternoon" | "evening";
const DAYS_OPTIONS: { value: number; label: string }[] = [
  { value: 3, label: "3 days" },
  { value: 4, label: "4 days" },
  { value: 5, label: "5 days" },
  { value: 6, label: "6 days" },
  { value: 7, label: "Every day" },
];
const TIME_OPTIONS: { value: StudyTime; label: string }[] = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
];

// Education status (initial-ASVAB only) — GED vs diploma vs college credits
// materially changes branch-qualification framing. The one extra signup field.
type EducationStatus =
  | "high_school_student"
  | "hs_diploma"
  | "ged"
  | "college_15plus"
  | "not_sure";
const EDUCATION_OPTIONS: { value: EducationStatus; label: string }[] = [
  { value: "high_school_student", label: "In high school" },
  { value: "hs_diploma", label: "HS diploma" },
  { value: "ged", label: "GED" },
  { value: "college_15plus", label: "15+ college credits" },
  { value: "not_sure", label: "Not sure" },
];

// Whether the user has already sat an official ASVAB. Routes the score panel.
type OfficialChoice = "not_yet" | "have" | "no_sheet";

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

  const [testType, setTestType] = useState<TestType>("initial_asvab");
  const [branch, setBranch] = useState<Branch | null>(null);
  const [bucket, setBucket] = useState<TestDateBucket | null>(null);
  const [specificDate, setSpecificDate] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [weakest, setWeakest] = useState<WeakestSubtest | null>(null);
  // Implementation intention.
  const [studyDays, setStudyDays] = useState<number | null>(null);
  const [studyTime, setStudyTime] = useState<StudyTime | null>(null);
  const [studyAnchor, setStudyAnchor] = useState<string>("");
  // Optional goal jobs (up to 3), persisted on submit via rpc_add_target_job.
  const [goalJobs, setGoalJobs] = useState<JobCatalogEntry[]>([]);
  // GT Target Mode — Army/Marines AFCT only. The score we optimize toward.
  const [targetGtPreset, setTargetGtPreset] = useState<
    100 | 105 | 107 | 110 | "custom" | null
  >(null);
  const [customTargetGt, setCustomTargetGt] = useState<string>("");
  // Education (initial-ASVAB only).
  const [educationStatus, setEducationStatus] = useState<EducationStatus | null>(
    null
  );
  // Official-score capture: has the user already taken the ASVAB?
  const [officialChoice, setOfficialChoice] = useState<OfficialChoice | null>(
    null
  );
  const [officialSaved, setOfficialSaved] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [skipping, setSkipping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-fill the branch from the calculator context (set at /signup) so a user
  // who came in through the calculator-result bridge doesn't re-answer it.
  useEffect(() => {
    try {
      const raw = localStorage.getItem("asvabhero.calc_context");
      if (!raw) return;
      const parsed = JSON.parse(raw) as { branch?: string };
      if (parsed.branch && BRANCH_OPTIONS.some((o) => o.value === parsed.branch)) {
        setBranch(parsed.branch as Branch);
      }
      localStorage.removeItem("asvabhero.calc_context");
    } catch {
      /* ignore */
    }
  }, []);

  // GT Target Mode is Army/Marines AFCT (primary metric GT = AR+WK+PC).
  const isGtMode =
    testType === "afct" && (branch === "army" || branch === "marines");
  const parsedCustomTargetGt = (() => {
    const n = parseInt(customTargetGt, 10);
    return Number.isFinite(n) && n >= 60 && n <= 186 ? n : null;
  })();
  const targetGtScore: number | null =
    targetGtPreset === "custom"
      ? parsedCustomTargetGt
      : typeof targetGtPreset === "number"
        ? targetGtPreset
        : null;

  // Don't let a stale GT target leak into save if the user leaves GT mode.
  useEffect(() => {
    if (!isGtMode) {
      setTargetGtPreset(null);
      setCustomTargetGt("");
    }
  }, [isGtMode]);

  const hasTestDate = !!specificDate || !!bucket;
  const canSubmit =
    !!branch &&
    hasTestDate &&
    !!weakest &&
    !!studyDays &&
    !!studyTime &&
    (!isGtMode || targetGtScore != null) &&
    !submitting &&
    !skipping;

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
    const payload: Record<string, unknown> = {
      test_type: testType,
      branch,
      target_test_date: specificDate ? specificDate : null,
      target_test_date_bucket: specificDate ? null : bucket,
      self_reported_weakest_subtest: weakest,
      study_days_per_week: studyDays,
      preferred_study_time: studyTime,
      study_anchor: studyAnchor.trim() || null,
      target_gt_score: isGtMode ? targetGtScore : null,
      education_status: testType === "initial_asvab" ? educationStatus : null,
      onboarding_completed_at: new Date().toISOString(),
    };
    // Official-score status: rpc_log_official_test already set 'taken_logged'
    // when scores were saved in-form, so only set the non-logged states here.
    if (officialChoice === "no_sheet")
      payload.official_test_status = "taken_not_logged";
    else if (officialChoice === "not_yet" && !officialSaved)
      payload.official_test_status = "not_taken";

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
      test_type: testType,
      prep_test_type: testType,
      has_test_date: !!specificDate,
      weakest_subtest: weakest ?? undefined,
      study_days_per_week: studyDays ?? undefined,
      study_time: studyTime ?? undefined,
      target_gt_score: isGtMode ? targetGtScore ?? undefined : undefined,
      goal_jobs: goalJobs.length,
      education_status:
        testType === "initial_asvab" ? educationStatus ?? undefined : undefined,
      official_choice: officialChoice ?? undefined,
      official_saved: officialSaved,
    });

    if (isGtMode) {
      trackEvent("gt_target_set", {
        source: "onboarding",
        branch: branch ?? undefined,
        test_type: testType,
        prep_test_type: testType,
        target_gt: targetGtScore ?? undefined,
        goal_jobs: goalJobs.length,
      });
    }

    // Deliver the actual plan (was routing to /app/home — the button promised a
    // plan it never showed). /app/plan renders the personalized routine.
    router.push("/app/plan");
  }

  async function handleSkip() {
    if (!session || skipping || submitting) return;
    setSkipping(true);
    setError(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const payload = {
      test_type: testType,
      branch: null,
      target_test_date: null,
      target_test_date_bucket: null,
      self_reported_weakest_subtest: null,
      target_gt_score: null,
      education_status: null,
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
      {/* Q1 — Test type (reframes the whole plan) */}
      <div>
        <label className="block font-display text-lg font-semibold text-text-primary mb-1">
          1. Which test are you preparing for?
        </label>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setTestType("initial_asvab")}
            className={
              "rounded-lg border px-4 py-3 text-left transition-colors " +
              (testType === "initial_asvab"
                ? "border-accent bg-accent-dim"
                : "border-navy-border bg-navy hover:border-accent/40")
            }
          >
            <span className="block text-sm font-semibold text-text-primary">
              Initial ASVAB
            </span>
            <span className="mt-0.5 block text-xs text-text-secondary">
              Joining the military — raise your AFQT to qualify for jobs and branches.
            </span>
          </button>
          <button
            type="button"
            onClick={() => setTestType("afct")}
            className={
              "rounded-lg border px-4 py-3 text-left transition-colors " +
              (testType === "afct"
                ? "border-accent bg-accent-dim"
                : "border-navy-border bg-navy hover:border-accent/40")
            }
          >
            <span className="block text-sm font-semibold text-text-primary">
              AFCT (active-duty retest)
            </span>
            <span className="mt-0.5 block text-xs text-text-secondary">
              Already serving — raise your score to reclassify or retrain.
            </span>
          </button>
        </div>
      </div>

      {/* Q2 — Branch */}
      <div>
        <label className="block font-display text-lg font-semibold text-text-primary mb-3">
          2. Which branch are you targeting?
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
        {testType === "afct" && branch && (
          <p className="mt-3 text-sm text-text-secondary">
            {(() => {
              const pm = getPrepMode("afct", branch as BranchType);
              if (pm.branchSupported)
                return `We'll focus your plan on ${pm.metricLabel} (AR + WK + PC) — the score ${branch === "air_force" || branch === "space_force" ? "the Air Force/Space Force uses for retraining" : "your branch uses to reclassify"}.`;
              return "Rating conversion uses rating-specific line scores, so branch-specific targeting isn't built yet — we'll track your retest on AFQT for now.";
            })()}
          </p>
        )}
      </div>

      {/* Q3 — Education status (Initial ASVAB only — affects qualification) */}
      {testType === "initial_asvab" && (
        <div>
          <label className="block font-display text-lg font-semibold text-text-primary mb-1">
            3. What&apos;s your education status?{" "}
            <span className="text-text-tertiary text-sm font-normal">(optional)</span>
          </label>
          <p className="mb-3 text-sm text-text-secondary">
            A diploma vs. GED changes which branches and AFQT cutoffs apply to
            you — it helps us give the right advice.
          </p>
          <div className="flex flex-wrap gap-2">
            {EDUCATION_OPTIONS.map((opt) => (
              <SegmentButton
                key={opt.value}
                value={opt.value}
                label={opt.label}
                selected={educationStatus === opt.value}
                onClick={setEducationStatus}
              />
            ))}
          </div>
        </div>
      )}

      {/* Q4 — Already taken the ASVAB? (routing for the score panel below) */}
      <div>
        <label className="block font-display text-lg font-semibold text-text-primary mb-1">
          4.{" "}
          {testType === "afct"
            ? "Have you taken the ASVAB or AFCT before?"
            : "Have you already taken the official ASVAB?"}
        </label>
        <p className="mb-3 text-sm text-text-secondary">
          If you have real scores, we&apos;ll track your progress against them and
          time your retake correctly.
        </p>
        <div className="flex flex-wrap gap-2">
          <SegmentButton
            value="not_yet"
            label="Not yet"
            selected={officialChoice === "not_yet"}
            onClick={(v) => {
              setOfficialChoice(v as OfficialChoice);
              setOfficialSaved(false);
            }}
          />
          <SegmentButton
            value="have"
            label="Yes — I have my scores"
            selected={officialChoice === "have"}
            onClick={(v) => setOfficialChoice(v as OfficialChoice)}
          />
          <SegmentButton
            value="no_sheet"
            label="Yes, but no score sheet handy"
            selected={officialChoice === "no_sheet"}
            onClick={(v) => {
              setOfficialChoice(v as OfficialChoice);
              setOfficialSaved(false);
            }}
          />
        </div>
        {officialChoice === "have" && officialSaved && (
          <p className="mt-3 text-sm text-success">
            ✓ Scores saved. We&apos;ll use them as your starting point.
          </p>
        )}
        {officialChoice === "have" && !officialSaved && (
          <div className="mt-4">
            <OfficialScoreForm
              context="onboarding"
              defaultExamKind={
                (testType === "afct" ? "afct" : "initial_asvab") as ExamKind
              }
              submitLabel="Save my scores"
              onSaved={(saved: OfficialScoreSaved) => {
                setOfficialSaved(true);
                // Prefill weakest subtest from the entered scores (overridable).
                if (
                  saved.weakestSubtest &&
                  SUBTEST_OPTIONS.some((o) => o.value === saved.weakestSubtest)
                ) {
                  setWeakest(saved.weakestSubtest as WeakestSubtest);
                }
              }}
            />
          </div>
        )}
      </div>

      {/* Q5 — GT target (Army/Marines AFCT only) */}
      {isGtMode && (
        <div>
          <label className="block font-display text-lg font-semibold text-text-primary mb-1">
            5. What GT score are you aiming for?
          </label>
          <p className="mb-3 text-sm text-text-secondary">
            Army and Marine GT is AR + WK + PC. Pick the score you need for your
            MOS, reclass packet, or program.
          </p>
          <div className="flex flex-wrap gap-2">
            {([100, 105, 107, 110] as const).map((v) => (
              <SegmentButton
                key={v}
                value={String(v)}
                label={String(v)}
                selected={targetGtPreset === v}
                onClick={() => setTargetGtPreset(v)}
              />
            ))}
            <SegmentButton
              value="custom"
              label="Custom"
              selected={targetGtPreset === "custom"}
              onClick={() => setTargetGtPreset("custom")}
            />
          </div>
          {targetGtPreset === "custom" && (
            <div className="mt-3">
              <label className="block text-sm text-text-secondary mb-1">
                Custom GT target
              </label>
              <input
                type="number"
                inputMode="numeric"
                min={60}
                max={186}
                value={customTargetGt}
                onChange={(e) => setCustomTargetGt(e.target.value)}
                placeholder="e.g. 112"
                className="w-full max-w-[140px] rounded-lg border border-navy-border bg-navy px-4 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none"
              />
              <p className="mt-1 text-xs text-text-tertiary">
                Use the score you want the app to optimize toward. Your goal jobs
                are tracked separately.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Q6 — Test date */}
      <div>
        <label className="block font-display text-lg font-semibold text-text-primary mb-3">
          6. When are you planning to take the test?
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

      {/* Q7 — Weakest subtest */}
      <div>
        <label className="block font-display text-lg font-semibold text-text-primary mb-3">
          7. Which subtest feels weakest right now?
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

      {/* Q8 — Optional goal jobs (after branch is chosen) */}
      {branch && branch !== "undecided" && (
        <div>
          <label className="block font-display text-lg font-semibold text-text-primary mb-1">
            8. Any target jobs? <span className="text-text-tertiary text-sm font-normal">(optional)</span>
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

      {/* Q9 — Implementation intention (days + time + anchor) */}
      <div>
        <label className="block font-display text-lg font-semibold text-text-primary mb-1">
          9. How often will you study?
        </label>
        <p className="mb-3 text-sm text-text-secondary">
          Showing up on your study days beats cramming — it&apos;s the biggest
          predictor of real score gains. Pick a rhythm you can keep.
        </p>
        <div className="flex flex-wrap gap-2">
          {DAYS_OPTIONS.map((opt) => (
            <SegmentButton
              key={opt.value}
              value={String(opt.value)}
              label={opt.label}
              selected={studyDays === opt.value}
              onClick={(v) => setStudyDays(Number(v))}
            />
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {TIME_OPTIONS.map((opt) => (
            <SegmentButton
              key={opt.value}
              value={opt.value}
              label={opt.label}
              selected={studyTime === opt.value}
              onClick={setStudyTime}
            />
          ))}
        </div>

        <div className="mt-4">
          <label className="block text-sm text-text-secondary mb-1">
            I&apos;ll study right after&hellip;{" "}
            <span className="text-text-tertiary">(optional anchor)</span>
          </label>
          <input
            type="text"
            value={studyAnchor}
            onChange={(e) => setStudyAnchor(e.target.value)}
            placeholder="e.g. breakfast, my last class, work"
            maxLength={80}
            className="w-full max-w-sm rounded-lg border border-navy-border bg-navy px-4 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none"
          />
        </div>
      </div>

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
