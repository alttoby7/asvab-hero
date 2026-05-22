// Banner-focused next-action helper. Returns the single action a trial user
// should take next, based on their progress state. Mirrors the priority order
// from src/app/account/page.tsx:189-222 but flattened for inline rendering.

import type { AsvabSubtest, Branch } from "@/types";
import { SUBTEST_NAMES } from "@/types";
import type {
  Confidence,
  SubtestEstimates,
  TargetJobGap,
} from "@/lib/trajectory/types";
import {
  getPrepMode,
  adaptiveVariantForPrep,
  type TestType,
} from "@/lib/prep-mode";

export type NextAction = {
  label: string;
  sublabel?: string;
  href: string;
};

export type NextActionInput = {
  hasInProgress: boolean;
  hasAttempts: boolean;
  weakestTopicTitle: string | null;
  weakestSubtest: string | null;
};

export function getNextAction(input: NextActionInput): NextAction {
  if (input.hasInProgress) {
    return {
      label: "Resume your test",
      sublabel: "Pick up where you left off",
      href: "/practice-test",
    };
  }
  if (!input.hasAttempts) {
    return {
      label: "Take your diagnostic",
      sublabel: "30 questions, 18 minutes — calibrates your study plan",
      href: "/practice-test?variant=diagnostic",
    };
  }
  if (input.weakestSubtest) {
    return {
      label: `Drill ${input.weakestSubtest}`,
      sublabel: input.weakestTopicTitle
        ? `Targeted drill on ${input.weakestTopicTitle}`
        : "Targeted subtest drill",
      href: `/practice-test?variant=subtest_drill&subtest=${input.weakestSubtest}`,
    };
  }
  return {
    label: "Take another diagnostic",
    sublabel: "Re-baseline your AFQT",
    href: "/practice-test?variant=diagnostic",
  };
}

// =============================================================
// WS3 — Trajectory-aware "today's prescription"
//
// Pure function: from current standing + target jobs + study cadence +
// days-to-test, returns the single most useful next action. Correct even with
// sparse data — it NEVER requires a predicted score and NEVER emits a point
// delta. Precedence: (1) due mistakes (the closed-loop habit), then (2) a
// diagnostic when standing is unestablished, then (3) the weakest AFQT subtest.
//
// Kept as separate exports from getNextAction() above so the existing account
// banner is untouched.
// =============================================================

/** AFQT subtests in default display priority (math before verbal). */
const AFQT_SUBTEST_ORDER: Array<"AR" | "MK" | "WK" | "PC"> = [
  "AR",
  "MK",
  "WK",
  "PC",
];

export type PrescriptionKind =
  | "review_mistakes"
  | "drill_subtest"
  | "take_diagnostic";

export interface PrescriptionInput {
  /** Per-subtest equated estimates from the current-standing snapshot. */
  subtestEstimates: SubtestEstimates;
  /** Snapshot confidence — drives whether we recommend a diagnostic first. */
  confidence: Confidence;
  /** Count of mistake-bank items due now (question_reviews due_at<=now). */
  dueMistakeCount: number;
  /** Total attempts the user has logged. */
  attemptCount: number;
  /** Ordered evaluated target jobs (from rpc_get_home_trajectory). */
  targetJobs: TargetJobGap[];
  /** Study days/week from profile (optional). */
  studyDaysPerWeek?: number | null;
  /** Days until the user's test (optional; null = unknown). */
  daysToTest?: number | null;
}

export interface Prescription {
  kind: PrescriptionKind;
  /** Short imperative headline, e.g. "Review 6 due mistakes". */
  headline: string;
  /** One-line rationale. */
  body: string;
  ctaLabel: string;
  ctaHref: string;
  /** Subtest the action targets, when applicable. */
  subtest?: AsvabSubtest;
  /** Whether the clock is tight (days-to-test small) — WS4 may emphasize. */
  urgent: boolean;
}

/**
 * Lowest-evidence-or-lowest-point AFQT subtest. With sparse data this favors
 * the subtest with the fewest seen questions (measure it), then the lowest
 * point estimate (improve it).
 */
function weakestAfqtSubtest(
  estimates: SubtestEstimates
): "AR" | "MK" | "WK" | "PC" {
  let best: "AR" | "MK" | "WK" | "PC" = "AR";
  let bestSeen = Infinity;
  let bestPoint = Infinity;
  for (const st of AFQT_SUBTEST_ORDER) {
    const e = estimates[st];
    const seen = e?.seen ?? 0;
    const point = e?.point ?? 0;
    if (seen < bestSeen || (seen === bestSeen && point < bestPoint)) {
      best = st;
      bestSeen = seen;
      bestPoint = point;
    }
  }
  return best;
}

/** Any supported target job not yet fully qualifying? */
function targetsNeedWork(targetJobs: TargetJobGap[]): boolean {
  return targetJobs.some(
    (j) =>
      j.support_status === "supported" &&
      (j.overall_status === "needs_work" || j.overall_status === "borderline")
  );
}

const DRILL_HREF = (st: AsvabSubtest) => `/app/practice?subtest=${st}`;

/**
 * Compute today's prescription. Precedence:
 *   1. Due mistakes (closed-loop retrieval) — always first when present.
 *   2. No attempts / low confidence -> take a diagnostic to establish standing.
 *   3. Drill the weakest AFQT subtest (blocking targets if any need work).
 */
export function getTrajectoryPrescription(
  input: PrescriptionInput
): Prescription {
  const {
    subtestEstimates,
    confidence,
    dueMistakeCount,
    attemptCount,
    targetJobs,
    daysToTest,
  } = input;

  const urgent = daysToTest != null && daysToTest <= 14;

  // 1. Due mistakes first — the habit that compounds.
  if (dueMistakeCount > 0) {
    return {
      kind: "review_mistakes",
      headline: `Review ${dueMistakeCount} due ${
        dueMistakeCount === 1 ? "mistake" : "mistakes"
      }`,
      body: "Clear your due mistake bank first — retrieval practice on items you've missed is the highest-leverage minutes you have today.",
      ctaLabel: "Review mistakes",
      ctaHref: "/app/mistakes",
      urgent,
    };
  }

  // 2. No standing yet -> establish it.
  if (attemptCount === 0 || confidence === "low") {
    return {
      kind: "take_diagnostic",
      headline:
        attemptCount === 0
          ? "Take your first diagnostic"
          : "Take a diagnostic to sharpen your estimate",
      body:
        attemptCount === 0
          ? "We need one diagnostic to see where you're testing today. It takes about 15 minutes."
          : "Your current estimate is still rough. One more diagnostic tightens the bands on your target jobs.",
      ctaLabel: "Start diagnostic",
      ctaHref: "/app/practice?variant=diagnostic",
      urgent,
    };
  }

  // 3. Drill the weakest AFQT subtest.
  const subtest = weakestAfqtSubtest(subtestEstimates) as AsvabSubtest;
  const blocking = targetsNeedWork(targetJobs);
  const name = SUBTEST_NAMES[subtest];
  return {
    kind: "drill_subtest",
    headline: `Drill ${name}`,
    body: blocking
      ? `${name} is the AFQT subtest most likely to move you toward your target jobs. Run a focused drill.`
      : `Keep your edge sharp with a focused ${name} drill — it's your lowest-evidence AFQT area.`,
    ctaLabel: `Drill ${subtest}`,
    ctaHref: DRILL_HREF(subtest),
    subtest,
    urgent,
  };
}

// =============================================================
// PILLAR 2 — "Your Plan" weekly routine (powers /app/plan)
//
// Turns the single-action prescription into the durable ROUTINE CONTRACT the
// product was missing: which phase the user is in (driven by time-to-test),
// the daily loop to run on study days, what's scheduled THIS WEEK, and a short
// "why it works" rationale. Pure function — no fabricated scores, band-only
// upstream, safe with sparse data. Phasing mirrors docs/learning-science-strategy.md.
// =============================================================

/** Study phase, driven by weeks-to-test (and whether a baseline exists). */
export type StudyPhase = "baseline" | "foundation" | "build" | "final";

/** Days-to-test thresholds (inclusive upper bounds). */
const FINAL_STRETCH_DAYS = 21; // ~3 weeks
const BUILD_DAYS = 56; // ~8 weeks

/** Cadence for re-baselining: a fresh diagnostic every ~14 days. */
const DIAGNOSTIC_CADENCE_DAYS = 14;

export interface PlanStep {
  /** Stable id so the UI can check completion against today's activity. */
  id: "diagnostic" | "review_mistakes" | "adaptive_block" | "timed_section" | "full_sim" | "pretest_writing";
  label: string;
  /** Why this step, in one short clause (links to /the-science in the UI). */
  why: string;
  ctaHref: string;
  /** Cadence: the daily loop vs. a once-this-week task. */
  cadence: "daily" | "weekly";
  /** Only relevant when the step is actually scheduled now. */
  optional?: boolean;
}

export interface WeeklyPlan {
  phase: StudyPhase;
  phaseLabel: string;
  /** One-line description of where the user is in the arc. */
  phaseSummary: string;
  daysToTest: number | null;
  studyDaysPerWeek: number;
  /** The ordered daily loop to run on a study day. */
  dailyLoop: PlanStep[];
  /** Once-this-week tasks (diagnostic re-baseline, timed section, full sim). */
  thisWeek: PlanStep[];
  /** Whether a fresh diagnostic is due (no baseline, or cadence elapsed). */
  diagnosticDue: boolean;
  urgent: boolean;
}

const STEP_REVIEW: PlanStep = {
  id: "review_mistakes",
  label: "Clear your due mistakes",
  why: "Retrieval practice on items you've missed — the highest-leverage minutes you have.",
  ctaHref: "/app/mistakes",
  cadence: "daily",
};
const STEP_ADAPTIVE: PlanStep = {
  id: "adaptive_block",
  label: "One adaptive AFQT block",
  why: "The app targets the right topic at the right difficulty — close to one-on-one tutoring.",
  ctaHref: "/app/practice?variant=afqt_adaptive",
  cadence: "daily",
};
const STEP_DIAGNOSTIC: PlanStep = {
  id: "diagnostic",
  label: "Take a diagnostic",
  why: "Re-baseline so you can see real movement and re-aim your practice.",
  ctaHref: "/app/practice?variant=diagnostic",
  cadence: "weekly",
};
const STEP_TIMED_SECTION: PlanStep = {
  id: "timed_section",
  label: "One timed AFQT section",
  why: "Builds pacing and stamina so the clock isn't a surprise on test day.",
  ctaHref: "/app/practice?variant=afqt_adaptive&timed=1",
  cadence: "weekly",
};
const STEP_FULL_SIM: PlanStep = {
  id: "full_sim",
  label: "One full-length simulation",
  why: "Removes test-day novelty — rehearse the real structure and length once a week.",
  ctaHref: "/app/practice?variant=full_sim",
  cadence: "weekly",
};
const STEP_PRETEST_WRITING: PlanStep = {
  id: "pretest_writing",
  label: "10-minute pre-test write-out",
  why: "Writing out test worries before a high-stakes test recovers lost points (Ramirez & Beilock, 2011).",
  ctaHref: "/app/plan#pretest-writing",
  cadence: "weekly",
  optional: true,
};

export interface WeeklyPlanInput {
  hasDiagnostic: boolean;
  confidence: Confidence;
  daysToTest: number | null;
  studyDaysPerWeek: number | null;
  /** Days since the most recent diagnostic (null if none). */
  daysSinceDiagnostic: number | null;
  /** Prep mode (default initial ASVAB / AFQT when omitted). */
  testType?: TestType | null;
  branch?: Branch | null;
}

export function getWeeklyPlan(input: WeeklyPlanInput): WeeklyPlan {
  const { hasDiagnostic, confidence, daysToTest, daysSinceDiagnostic } = input;
  const studyDaysPerWeek = input.studyDaysPerWeek ?? 4;
  const urgent = daysToTest != null && daysToTest <= FINAL_STRETCH_DAYS;

  // Prep-mode aware: AFCT VE+AR branches route to gt_adaptive (AR/WK/PC) and
  // label the metric GT/General; everyone else stays AFQT/afqt_adaptive.
  const prep = getPrepMode(input.testType ?? null, input.branch ?? null);
  const metric = prep.metricLabel; // "AFQT" | "GT" | "General (G)"
  const adaptiveVariant = adaptiveVariantForPrep(
    input.testType ?? null,
    input.branch ?? null
  );
  const adaptiveStep: PlanStep = {
    id: "adaptive_block",
    label: `One adaptive ${metric} block`,
    why: STEP_ADAPTIVE.why,
    ctaHref: `/app/practice?variant=${adaptiveVariant}`,
    cadence: "daily",
  };
  const timedStep: PlanStep = {
    id: "timed_section",
    label: `One timed ${metric} section`,
    why: STEP_TIMED_SECTION.why,
    ctaHref: `/app/practice?variant=${adaptiveVariant}&timed=1`,
    cadence: "weekly",
  };

  // Phase: no baseline (or still rough) -> baseline; else by time-to-test.
  let phase: StudyPhase;
  if (!hasDiagnostic || confidence === "low") {
    phase = "baseline";
  } else if (daysToTest != null && daysToTest <= FINAL_STRETCH_DAYS) {
    phase = "final";
  } else if (daysToTest != null && daysToTest <= BUILD_DAYS) {
    phase = "build";
  } else {
    phase = "foundation";
  }

  const diagnosticDue =
    !hasDiagnostic ||
    daysSinceDiagnostic == null ||
    daysSinceDiagnostic >= DIAGNOSTIC_CADENCE_DAYS;

  // Daily loop: mistakes first, then an adaptive block (the free core).
  const dailyLoop: PlanStep[] = [STEP_REVIEW, adaptiveStep];

  // This-week tasks accrue with the phase.
  const thisWeek: PlanStep[] = [];
  if (diagnosticDue) thisWeek.push(STEP_DIAGNOSTIC);
  if (phase === "build" || phase === "final") thisWeek.push(timedStep);
  if (phase === "final") {
    thisWeek.push(STEP_FULL_SIM);
    thisWeek.push(STEP_PRETEST_WRITING);
  }

  const PHASE_META: Record<StudyPhase, { label: string; summary: string }> = {
    baseline: {
      label: "Get your baseline",
      summary:
        "Start with one diagnostic so we can see where you're testing today and aim your plan.",
    },
    foundation: {
      label: "Foundation",
      summary: `More than 8 weeks out — build the habit: clear due mistakes, then one adaptive ${metric} block on each study day. Let spacing do the work.`,
    },
    build: {
      label: "Build",
      summary: `3–8 weeks out — keep the daily loop and add one timed ${metric} section each week to build pacing.`,
    },
    final: {
      label: "Final stretch",
      summary:
        "Under 3 weeks — keep the daily loop, add a weekly full-length simulation, and do the pre-test write-out before each sim.",
    },
  };

  return {
    phase,
    phaseLabel: PHASE_META[phase].label,
    phaseSummary: PHASE_META[phase].summary,
    daysToTest: daysToTest ?? null,
    studyDaysPerWeek,
    dailyLoop: phase === "baseline" ? [STEP_DIAGNOSTIC] : dailyLoop,
    thisWeek: phase === "baseline" ? [] : thisWeek,
    diagnosticDue,
    urgent,
  };
}
