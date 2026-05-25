export type Branch =
  | "army"
  | "navy"
  | "air_force"
  | "marines"
  | "coast_guard"
  | "space_force";

export type AsvabSubtest =
  | "GS"
  | "AR"
  | "WK"
  | "PC"
  | "MK"
  | "EI"
  | "AS"
  | "MC"
  | "AO";

export const SUBTEST_NAMES: Record<AsvabSubtest, string> = {
  GS: "General Science",
  AR: "Arithmetic Reasoning",
  WK: "Word Knowledge",
  PC: "Paragraph Comprehension",
  MK: "Mathematics Knowledge",
  EI: "Electronics Information",
  AS: "Auto & Shop Information",
  MC: "Mechanical Comprehension",
  AO: "Assembling Objects",
};

export const ALL_SUBTESTS: AsvabSubtest[] = [
  "GS",
  "AR",
  "WK",
  "PC",
  "MK",
  "EI",
  "AS",
  "MC",
  "AO",
];

export type SubtestScores = Record<AsvabSubtest, number>;

export interface ScoreRequirement {
  composite: string;
  minScore: number;
}

export interface MilitaryJob {
  id: string;
  branch: Branch;
  code: string;
  title: string;
  description: string;
  requirements: ScoreRequirement[];
  anyOf?: ScoreRequirement[]; // OR logic: qualifies if any single entry passes
  minAFQT?: number;
  category: string;
}

export interface CompositeScores {
  [name: string]: number;
}

export interface BranchComposites {
  branch: Branch;
  branchName: string;
  composites: CompositeScores;
}

export const BRANCH_NAMES: Record<Branch, string> = {
  army: "Army",
  navy: "Navy",
  air_force: "Air Force",
  marines: "Marines",
  coast_guard: "Coast Guard",
  space_force: "Space Force",
};

// Practice Test Types

export interface PracticeQuestion {
  id: string;
  subtest: AsvabSubtest;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  /** Optional, set when sampled from Supabase, used by topic-level scoring. */
  topicId?: string;
  /** Optional, difficulty 1–5 from the DB. */
  difficulty?: number;
}

export interface PracticeTest {
  id: string;
  name: string;
  description: string;
  questions: PracticeQuestion[];
  timeLimitMinutes: number;
}

export type TestPhase = "intro" | "testing" | "review" | "results";

export interface UserAnswer {
  questionId: string;
  selectedIndex: number | null;
}

export interface SubtestResult {
  subtest: AsvabSubtest;
  correct: number;
  total: number;
  percentage: number;
}

// ── Topic + Variant + Stats ────────────────────────────────────────

export interface Topic {
  id: string;                  // e.g. "ar.ratio-proportion"
  subtest: AsvabSubtest;
  slug: string;
  title: string;
  sort_order: number;
  active: boolean;
  study_guide_href?: string;   // local-only convenience field from seed JSON
  recommended_drill?: string;  // local-only convenience field from seed JSON
}

export interface TestVariant {
  code: string;                // diagnostic | subtest_drill | ...
  name: string;
  rules: TestVariantRules;
  active: boolean;
}

export interface TestVariantRules {
  length: number;
  time_seconds: number;
  /** Either a fixed mix-by-subtest object, or a string sentinel like "one_subtest". */
  mix: Partial<Record<AsvabSubtest, number>> | string;
  afqt_eligible?: boolean;
  subtest_locked?: AsvabSubtest | null;
  note?: string;
}

export interface TopicResult {
  topic_id: string;
  subtest: AsvabSubtest;
  seen: number;
  correct: number;
  percentage: number;
}

export interface TopicStats {
  user_id?: string;            // omitted for anonymous local store
  topic_id: string;
  seen: number;
  correct: number;
  posterior: number;           // (correct + 1) / (seen + 2)
  confidence: number;          // min(seen / 8, 1)
  priority: number;            // (1 - posterior) * confidence
  status: "unmeasured" | "weak" | "developing" | "strong";
  last_seen_at: string | null;
  updated_at: string;
}

export interface Attempt {
  id: string;
  user_id?: string;
  client_attempt_id: string;
  variant_code: string;
  source: "practice" | "daily_challenge" | "mini_drill";
  subtest: AsvabSubtest | null;
  topic_id: string | null;
  started_at: string;
  completed_at: string;
  duration_seconds: number;
  question_count: number;
  correct_count: number;
  afqt_estimate: number | null;
  results_by_subtest: Record<string, { seen: number; correct: number }>;
  results_by_topic: Record<string, { seen: number; correct: number }>;
  question_results: Array<{
    question_id: string;
    selected: number | null;
    correct: number;
    topic_id: string;
    is_correct: boolean;
  }>;
  /** Prep-mode snapshot at write time (AFCT cohort measurement). */
  test_type?: string | null;
  primary_metric_code?: string | null; // AFQT | GT | G
  primary_metric_estimate?: number | null;
}

/** Insert payload, client builds this; server fills user_id / id / created_at. */
export type AttemptPayload = Omit<Attempt, "id" | "user_id">;

export interface NextStepRecommendation {
  headline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

// Study Guide Types

export type ScoreInputMode = "self-rate" | "practice-import" | "actual-scores";

export interface StudyGuideState {
  selectedBranch: Branch | null;
  selectedJobs: MilitaryJob[];
  scoreInputMode: ScoreInputMode;
  scores: Partial<SubtestScores>;
  selfRatings: Record<AsvabSubtest, number>;
  testDate: string | null;
  hoursPerWeek: number;
  completedTopics: Record<string, boolean>;
}
