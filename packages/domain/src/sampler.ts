import type {
  AsvabSubtest,
  PracticeQuestion,
  TestVariant,
} from "./types";
import { ALL_SUBTESTS } from "./types";
import { shuffleQuestions } from "./scoring/scorer";

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function sampleForVariant(
  variant: TestVariant,
  pool: PracticeQuestion[],
  opts?: { subtest?: AsvabSubtest }
): PracticeQuestion[] {
  const { rules } = variant;

  if (rules.mix === "one_subtest") {
    const subtest = opts?.subtest ?? rules.subtest_locked ?? null;
    if (!subtest) {
      throw new Error(
        "subtest_drill requires a 'subtest' option or rules.subtest_locked"
      );
    }
    const filtered = pool.filter((q) => q.subtest === subtest);
    return shuffle(filtered).slice(0, Math.min(rules.length, filtered.length));
  }

  if (typeof rules.mix === "object" && rules.mix !== null) {
    const mix = rules.mix as Partial<Record<AsvabSubtest, number>>;
    const bins = new Map<AsvabSubtest, PracticeQuestion[]>();
    for (const st of ALL_SUBTESTS) {
      bins.set(st, shuffle(pool.filter((q) => q.subtest === st)));
    }
    const selected: PracticeQuestion[] = [];
    for (const st of ALL_SUBTESTS) {
      const want = mix[st] ?? 0;
      if (want <= 0) continue;
      const bin = bins.get(st) ?? [];
      selected.push(...bin.slice(0, Math.min(want, bin.length)));
    }
    return shuffle(selected);
  }

  return shuffle(pool).slice(0, Math.min(rules.length, pool.length));
}

export const FALLBACK_VARIANTS: Record<string, TestVariant> = {
  diagnostic: {
    code: "diagnostic",
    name: "Diagnostic Test",
    rules: {
      length: 30,
      time_seconds: 36 * 60,
      mix: { GS: 3, AR: 4, WK: 4, PC: 3, MK: 4, EI: 3, AS: 3, MC: 3, AO: 3 },
      afqt_eligible: false,
      subtest_locked: null,
    },
    active: true,
  },
  subtest_drill: {
    code: "subtest_drill",
    name: "Subtest Drill",
    rules: {
      length: 25,
      time_seconds: 20 * 60,
      mix: "one_subtest",
      afqt_eligible: false,
      subtest_locked: null,
    },
    active: true,
  },
};
