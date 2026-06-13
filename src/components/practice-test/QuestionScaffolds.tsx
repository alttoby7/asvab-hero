"use client";

import { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import scaffoldData from "@/data/item-scaffolds.seed.json";

/**
 * In-question scaffolds (Lever B): progressive help BEFORE the answer is graded.
 * A worked-example/faded-guidance ladder produces large gains for novices, and
 * a guided attempt encodes the METHOD, not just the answer. Content is harvested
 * from the study-guide frontmatter (scripts/build-item-scaffolds.mjs), so there's
 * no per-question authoring.
 *
 * Ladder: hint (free on-ramp) -> steps (Pro) -> a similar worked example (Pro).
 */

export function isScaffoldsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_SCAFFOLDS_ENABLED === "true";
}

interface Scaffold {
  hint: string | null;
  steps: string[];
  example: { prompt: string; solution: string } | null;
}

const BANK = scaffoldData as Record<string, Scaffold>;

export function hasScaffold(topicId?: string | null): boolean {
  return !!(topicId && BANK[topicId]);
}

type RungKind = "hint" | "steps" | "example";

export default function QuestionScaffolds({
  topicId,
  isPro,
  onReveal,
}: {
  topicId?: string | null;
  isPro: boolean;
  /** Fired with the cumulative rung count each time the user reveals more. */
  onReveal?: (rungCount: number) => void;
}) {
  const sc = topicId ? BANK[topicId] : undefined;
  const [open, setOpen] = useState(false);
  const [rung, setRung] = useState(0); // how many rungs are revealed

  if (!sc) return null;

  const rungs: RungKind[] = [];
  if (sc.hint) rungs.push("hint");
  if (sc.steps.length > 0) rungs.push("steps");
  if (sc.example) rungs.push("example");
  if (rungs.length === 0) return null;

  const FREE_RUNGS = 1; // the first rung (hint) is the free on-ramp

  const reveal = (n: number) => {
    setRung(n);
    onReveal?.(n);
    trackEvent("scaffold_revealed", {
      topic_id: topicId ?? "",
      rung: n,
      kind: rungs[n - 1] ?? "",
    });
  };

  const nextKind = rungs[rung]; // the rung about to be revealed
  const nextLabel =
    nextKind === "steps"
      ? "Show me the steps"
      : nextKind === "example"
        ? "See a worked example"
        : "More help";
  const canRevealNext = isPro || rung < FREE_RUNGS;

  return (
    <div className="rounded-xl border border-navy-border bg-navy/60 p-3">
      {!open ? (
        <button
          onClick={() => {
            setOpen(true);
            reveal(1);
          }}
          className="flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3a6 6 0 00-3.75 10.7c.46.37.75.93.75 1.53V16h6v-.77c0-.6.29-1.16.75-1.53A6 6 0 0012 3z" />
          </svg>
          Stuck? Get a hint
        </button>
      ) : (
        <div className="space-y-3">
          {rungs.slice(0, rung).map((kind, i) => (
            <div key={i} className="text-sm">
              {kind === "hint" && (
                <p className="text-text-secondary">
                  <span className="font-semibold text-accent">Hint: </span>
                  {sc.hint}
                </p>
              )}
              {kind === "steps" && (
                <div>
                  <p className="mb-1 font-semibold text-text-primary">How to approach it</p>
                  <ul className="list-disc space-y-1 pl-5 text-text-secondary">
                    {sc.steps.map((s, j) => (
                      <li key={j}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
              {kind === "example" && sc.example && (
                <div className="rounded-lg bg-navy p-3">
                  <p className="font-semibold text-text-primary">A worked example</p>
                  <p className="mt-1 text-text-secondary">{sc.example.prompt}</p>
                  <p className="mt-2 text-text-secondary">
                    <span className="font-semibold text-accent">Solution: </span>
                    {sc.example.solution}
                  </p>
                </div>
              )}
            </div>
          ))}

          {rung < rungs.length &&
            (canRevealNext ? (
              <button
                onClick={() => reveal(rung + 1)}
                className="text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                {nextLabel} →
              </button>
            ) : (
              <div className="rounded-lg border border-accent/30 bg-accent-dim/30 p-3">
                <p className="text-sm text-text-secondary">
                  Step-by-step help and worked examples are part of Pro.
                </p>
                <Link
                  href="/upgrade"
                  className="mt-2 inline-block text-sm font-bold text-accent no-underline hover:text-accent-hover"
                >
                  Unlock guided help →
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
