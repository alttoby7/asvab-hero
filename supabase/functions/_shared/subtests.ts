// Subtest constants for edge functions. Mirrors src/types/index.ts SUBTEST_NAMES.
// Kept in sync manually; do not import the app's src/ from edge functions.

export type SubtestCode = "GS" | "AR" | "WK" | "PC" | "MK" | "EI" | "AS" | "MC" | "AO";

export const SUBTEST_CODES: readonly SubtestCode[] = [
  "GS",
  "AR",
  "WK",
  "PC",
  "MK",
  "EI",
  "AS",
  "MC",
  "AO",
] as const;

export const SUBTEST_NAMES: Record<SubtestCode, string> = {
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

export const isSubtestCode = (value: unknown): value is SubtestCode =>
  typeof value === "string" && (SUBTEST_CODES as readonly string[]).includes(value);
