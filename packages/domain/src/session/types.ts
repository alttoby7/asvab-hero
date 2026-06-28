/**
 * Daily Study Session ("Mission Loop") types.
 *
 * A SessionPlan is the frozen, ordered path a student runs on a study day. It is
 * UI/session state (persisted in study_sessions.plan), not learning state, the
 * drill/timed stations still write through the authoritative `attempts` pipeline.
 */
import type { AsvabSubtest } from "../types";

export type StationKind =
  | "warmup" //   due mistake-bank review (retrieval practice, highest leverage)
  | "lesson" //   prescribed weak-skill micro-lesson (study guide)
  | "drill" //    focused subtest drill on the weakest area
  | "timed" //    timed mixed adaptive block (pacing under pressure)
  | "debrief" //  error-tag + confidence + schedule tomorrow
  | "diagnostic"; // baseline only: establish standing before the loop begins

export interface SessionStation {
  kind: StationKind;
  /** Short imperative title, e.g. "Clear your due mistakes". */
  title: string;
  /** One-line rationale / what happens here. */
  subtitle: string;
  /** Rough minutes, for the mission-path time hint. */
  estMinutes: number;
  /** Practice variant to run (drill/timed/diagnostic stations). */
  variant?: string;
  /** Subtest a drill targets. */
  subtest?: AsvabSubtest;
  /** Topic a lesson/drill targets (when known). */
  topicId?: string;
  /** Study-guide href (lesson station). */
  href?: string;
  /** Run the practice station under a tightened clock. */
  timed?: boolean;
}

export type StudyPhase = "baseline" | "foundation" | "build" | "final";

export interface SessionPlan {
  stations: SessionStation[];
  /** Display metric: "AFQT" | "GT" | "General (G)" | rating label. */
  metric: string;
  /** User-local calendar day, YYYY-MM-DD. */
  sessionDate: string;
  phase: StudyPhase;
  /** Clock is tight (<= ~3 weeks to test). */
  urgent: boolean;
}

/** A free study-guide link surfaced for a weak topic. */
export interface WeakTopicGuide {
  topicId: string;
  title: string;
  href: string;
}

/** Per-station progress persisted in study_sessions.state, keyed by station index. */
export interface StationState {
  completed: boolean;
  /** attempts.id for practice stations, when one was recorded. */
  attemptId?: string;
  /** Items missed in this station, carried to the debrief for tagging. */
  missed?: Array<{ questionId: string; subtest?: string; topicId?: string }>;
}
