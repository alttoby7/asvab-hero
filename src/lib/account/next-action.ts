// Banner-focused next-action helper. Returns the single action a trial user
// should take next, based on their progress state. Mirrors the priority order
// from src/app/account/page.tsx:189-222 but flattened for inline rendering.

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
