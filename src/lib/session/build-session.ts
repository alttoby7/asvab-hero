/**
 * Pure builder for the Daily Study Session ("Mission Loop").
 *
 * Materializes ONE ordered, executable path for a study day from materials the
 * caller already has (mistake-bank count, weakest AFQT subtest, prescribed
 * study-guide, prep mode, days-to-test). It does NOT re-derive the trajectory or
 * touch the DB, the caller computes the inputs via the existing helpers
 * (weakTopicStudyGuides, the trajectory snapshot, getDueMistakeCount) and the
 * authoritative learning pipeline (attempts -> trg_attempts_ingest) is untouched.
 *
 * Sequencing mirrors getWeeklyPlan()'s science (mistakes first, then targeted
 * practice, with timed work added in the build/final phases) but produces a
 * single concrete path with a debrief, not a loose loop + this-week list.
 */
import type { AsvabSubtest, Branch } from "@/types";
import { SUBTEST_NAMES } from "@/types";
import {
  getPrepMode,
  adaptiveVariantForPrep,
  type TestType,
} from "@/lib/prep-mode";
import type { WeakTopicGuide } from "@/lib/practice/recommender";
import type { Confidence } from "@/lib/trajectory/types";
import type { SessionPlan, SessionStation, StudyPhase } from "./types";

/** Days-to-test thresholds, kept in sync with getWeeklyPlan(). */
const FINAL_STRETCH_DAYS = 21; // ~3 weeks
const BUILD_DAYS = 56; // ~8 weeks

export interface BuildSessionInput {
  /** Total attempts the user has logged (0 => baseline). */
  attemptCount: number;
  /** Trajectory snapshot confidence (low => re-baseline first). */
  confidence: Confidence;
  /** Mistake-bank items due now (question_reviews due_at <= now). */
  dueMistakeCount: number;
  /** Highest-priority weak topic with a public study guide, or null. */
  weakTopicGuide: WeakTopicGuide | null;
  /** Weakest in-focus subtest (caller-derived from the trajectory estimates). */
  weakestSubtest: AsvabSubtest;
  /** Days until the user's test (null = unknown). */
  daysToTest: number | null;
  /** User-local calendar day, YYYY-MM-DD. */
  sessionDate: string;
  testType?: TestType | null;
  branch?: Branch | null;
}

function phaseFor(
  hasBaseline: boolean,
  confidence: Confidence,
  daysToTest: number | null,
): StudyPhase {
  if (!hasBaseline || confidence === "low") return "baseline";
  if (daysToTest != null && daysToTest <= FINAL_STRETCH_DAYS) return "final";
  if (daysToTest != null && daysToTest <= BUILD_DAYS) return "build";
  return "foundation";
}

const DEBRIEF_STATION: SessionStation = {
  kind: "debrief",
  title: "Debrief & lock in tomorrow",
  subtitle:
    "Tag what tripped you up and rate your confidence, then we schedule your next session.",
  estMinutes: 3,
};

/**
 * Build today's mission path. Pure and safe with sparse data.
 *
 * Baseline (no attempts / low confidence): a single diagnostic + debrief, the
 * loop proper begins once a standing exists. Otherwise the prescribed path is
 * warm-up (if mistakes are due) -> micro-lesson (if a weak topic has a guide)
 * -> focused drill -> timed mixed block -> debrief.
 */
export function buildSession(input: BuildSessionInput): SessionPlan {
  const {
    attemptCount,
    confidence,
    dueMistakeCount,
    weakTopicGuide,
    weakestSubtest,
    daysToTest,
    sessionDate,
  } = input;

  const prep = getPrepMode(input.testType ?? null, input.branch ?? null);
  const metric = prep.metricLabel;
  const adaptiveVariant = adaptiveVariantForPrep(
    input.testType ?? null,
    input.branch ?? null,
  );
  const hasBaseline = attemptCount > 0;
  const phase = phaseFor(hasBaseline, confidence, daysToTest);
  const urgent = daysToTest != null && daysToTest <= FINAL_STRETCH_DAYS;

  // ── Baseline: establish standing before prescribing a loop. ────────────────
  if (phase === "baseline") {
    const stations: SessionStation[] = [
      {
        kind: "diagnostic",
        title: hasBaseline ? "Sharpen your baseline" : "Take your diagnostic",
        subtitle: hasBaseline
          ? "One more diagnostic tightens your estimate so the plan can aim."
          : "About 15 minutes. This sees where you're testing today and aims your whole plan.",
        estMinutes: 15,
        variant: "diagnostic",
      },
      DEBRIEF_STATION,
    ];
    return { stations, metric, sessionDate, phase, urgent };
  }

  const stations: SessionStation[] = [];

  // 1. Warm-up: due mistakes first, the retrieval habit that compounds.
  if (dueMistakeCount > 0) {
    stations.push({
      kind: "warmup",
      title: `Warm up: ${dueMistakeCount} due ${
        dueMistakeCount === 1 ? "mistake" : "mistakes"
      }`,
      subtitle:
        "Retrieval practice on items you've missed, the highest-leverage minutes you have today.",
      estMinutes: Math.min(10, Math.max(4, dueMistakeCount)),
    });
  }

  // 2. Micro-lesson: the prescribed weak skill (only when a guide exists).
  if (weakTopicGuide) {
    stations.push({
      kind: "lesson",
      title: `Learn: ${weakTopicGuide.title}`,
      subtitle:
        "A short guide on your highest-priority gap, formulas and worked examples, before you drill it.",
      estMinutes: 8,
      topicId: weakTopicGuide.topicId,
      href: weakTopicGuide.href,
    });
  }

  // 3. Focused drill: lock in the weak subtest (and the lesson's topic if same).
  const drillName = SUBTEST_NAMES[weakestSubtest];
  const drillTopic =
    weakTopicGuide && weakTopicGuide.topicId.split(".")[0].toUpperCase() ===
    weakestSubtest
      ? weakTopicGuide.topicId
      : undefined;
  stations.push({
    kind: "drill",
    title: `Drill: ${drillName}`,
    subtitle: drillTopic
      ? "A focused drill on what you just learned, repetition turns it into recall."
      : `Your lowest-evidence ${metric} area, a focused drill closes the gap fastest.`,
    estMinutes: 12,
    variant: "subtest_drill",
    subtest: weakestSubtest,
    topicId: drillTopic,
  });

  // 4. Timed mixed block: the adaptive core under a clock (pacing under pressure).
  stations.push({
    kind: "timed",
    title: `Timed ${metric} block`,
    subtitle:
      "A mixed, adaptive block on the clock, builds pacing so test-day time pressure isn't a surprise.",
    estMinutes: 12,
    variant: adaptiveVariant,
    timed: true,
  });

  // 5. Debrief: tag errors + confidence, schedule tomorrow.
  stations.push(DEBRIEF_STATION);

  return { stations, metric, sessionDate, phase, urgent };
}

/** Index of the first incomplete station given a completion map; -1 if all done. */
export function firstIncompleteStation(
  plan: SessionPlan,
  completed: Record<number, boolean>,
): number {
  for (let i = 0; i < plan.stations.length; i++) {
    if (!completed[i]) return i;
  }
  return -1;
}
