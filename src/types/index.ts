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
