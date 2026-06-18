/**
 * Free practice-test content layer (SEO/GEO).
 *
 * Renders the questions in `free-test.json`, the pool already designated as free
 * (separate from the gated `expansion-batch-*` bank), as static, crawlable HTML
 * on per-subtest pages. This exposes our strongest, most citable asset (real
 * questions + worked explanations) to search and AI engines without touching the
 * paid adaptive bank. Source pattern matches `src/lib/practice/sampler.ts`.
 */
import freeTest from "@/data/practice-tests/free-test.json";
import { SUBTEST_METADATA, type SubtestMeta } from "@/data/subtest-metadata";
import { ALL_SUBTESTS, type AsvabSubtest } from "@/types";

export interface FreeQuestion {
  id: string;
  subtest: AsvabSubtest;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const ALL: FreeQuestion[] = (freeTest as { questions: FreeQuestion[] }).questions;

/** Readable, keyword-targeted slug per subtest (e.g. AR -> arithmetic-reasoning). */
export const SUBTEST_SLUGS: Record<AsvabSubtest, string> = {
  GS: "general-science",
  AR: "arithmetic-reasoning",
  WK: "word-knowledge",
  PC: "paragraph-comprehension",
  MK: "mathematics-knowledge",
  EI: "electronics-information",
  AS: "auto-and-shop-information",
  MC: "mechanical-comprehension",
  AO: "assembling-objects",
};

/** Existing on-site "tips" study pages, for internal linking where one exists. */
const TIPS_HREF: Partial<Record<AsvabSubtest, string>> = {
  AR: "/asvab-arithmetic-reasoning-tips",
  WK: "/asvab-word-knowledge-tips",
  PC: "/asvab-paragraph-comprehension-tips",
  MK: "/asvab-math-tips",
  GS: "/asvab-general-science-tips",
  EI: "/asvab-electronics-information-tips",
  MC: "/asvab-mechanical-comprehension-tips",
};

export interface SubtestPractice {
  code: AsvabSubtest;
  slug: string;
  meta: SubtestMeta;
  questions: FreeQuestion[];
  tipsHref?: string;
}

const codeForSlug = (slug: string): AsvabSubtest | null => {
  const hit = (Object.entries(SUBTEST_SLUGS) as [AsvabSubtest, string][]).find(
    ([, s]) => s === slug,
  );
  return hit ? hit[0] : null;
};

export function getSubtestPractice(slug: string): SubtestPractice | null {
  const code = codeForSlug(slug);
  if (!code) return null;
  const meta = SUBTEST_METADATA.find((m) => m.subtest === code);
  const questions = ALL.filter((q) => q.subtest === code);
  if (!meta || questions.length === 0) return null;
  return { code, slug, meta, questions, tipsHref: TIPS_HREF[code] };
}

/** Slugs for subtests that actually have free questions, drives generateStaticParams. */
export function allSubtestSlugs(): string[] {
  const have = new Set(ALL.map((q) => q.subtest));
  return ALL_SUBTESTS.filter((c) => have.has(c)).map((c) => SUBTEST_SLUGS[c]);
}

/** Hub-page directory of every per-subtest free practice page (with counts). */
export function subtestPracticeIndex(): SubtestPractice[] {
  return allSubtestSlugs()
    .map((slug) => getSubtestPractice(slug))
    .filter((x): x is SubtestPractice => x !== null);
}

export const totalFreeQuestions = ALL.length;
