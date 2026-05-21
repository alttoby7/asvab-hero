// Banner-focused next-action helper. Returns the single action a trial user
// should take next, based on their progress state. Mirrors the priority order
// from src/app/account/page.tsx:189-222 but flattened for inline rendering.

import type { AsvabSubtest } from "@/types";
import { SUBTEST_NAMES } from "@/types";
import type {
  Confidence,
  SubtestEstimates,
  TargetJobGap,
} from "@/lib/trajectory/types";

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
