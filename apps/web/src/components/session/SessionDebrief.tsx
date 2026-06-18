"use client";

import { useState } from "react";
import type { ErrorTagInput } from "@/lib/session/queries";

/**
 * The debrief: turn each missed item into a diagnosis. The error taxonomy
 * (concept / setup / careless / time) plus a confidence read are the genuinely
 * new signal the loop captures, they tell us WHY a miss happened, which drives
 * what resurfaces (Phase 2, Lever D) and what the next session prescribes.
 */

type ErrorTag = NonNullable<ErrorTagInput["errorTag"]>;
type Confidence = NonNullable<ErrorTagInput["confidence"]>;

const ERROR_TAGS: Array<{ key: ErrorTag; label: string; hint: string }> = [
  { key: "concept", label: "Didn't know it", hint: "Concept gap" },
  { key: "setup", label: "Set it up wrong", hint: "Wrong approach" },
  { key: "careless", label: "Careless slip", hint: "Knew it, missed it" },
  { key: "time", label: "Ran out of time", hint: "Pacing" },
];

export interface DebriefItem {
  questionId: string;
  subtest?: string;
  topicId?: string;
}

export default function SessionDebrief({
  missed,
  scheduledLabel,
  onFinish,
  saving,
}: {
  missed: DebriefItem[];
  /** Human label for the next session, e.g. "tomorrow". */
  scheduledLabel: string;
  onFinish: (tags: ErrorTagInput[]) => void;
  saving?: boolean;
}) {
  const [tags, setTags] = useState<Record<string, { errorTag?: ErrorTag; confidence?: Confidence }>>(
    {},
  );

  const setTag = (id: string, errorTag: ErrorTag) =>
    setTags((p) => ({ ...p, [id]: { ...p[id], errorTag } }));
  const setConf = (id: string, confidence: Confidence) =>
    setTags((p) => ({ ...p, [id]: { ...p[id], confidence } }));

  const finish = () => {
    const out: ErrorTagInput[] = missed.map((m) => ({
      questionId: m.questionId,
      subtest: m.subtest ?? null,
      topicId: m.topicId ?? null,
      errorTag: tags[m.questionId]?.errorTag ?? null,
      confidence: tags[m.questionId]?.confidence ?? null,
    }));
    onFinish(out);
  };

  if (missed.length === 0) {
    return (
      <div className="rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
        <p className="font-display text-lg font-bold text-text-primary">
          Clean sweep, no misses to review.
        </p>
        <p className="mt-1 text-sm text-text-secondary">
          That&apos;s the goal. We&apos;ll line up your next session for {scheduledLabel}.
        </p>
        <button
          onClick={finish}
          disabled={saving}
          className="mt-5 w-full rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white transition-all hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)] disabled:opacity-60"
        >
          {saving ? "Saving…" : `Finish & schedule ${scheduledLabel}`}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-navy-border bg-navy-light p-5 sm:p-6">
      <h3 className="font-display text-lg font-bold text-text-primary">
        Why did each miss happen?
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        Tag what tripped you up. This is how we decide what to bring back, naming the cause is half the fix.
      </p>

      <ul className="mt-4 space-y-3">
        {missed.map((m, idx) => {
          const cur = tags[m.questionId] ?? {};
          return (
            <li key={m.questionId} className="rounded-xl border border-navy-border bg-navy p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">
                  Miss {idx + 1}
                  {m.subtest ? ` · ${m.subtest}` : ""}
                </span>
                <span className="flex gap-1">
                  {(["sure", "unsure"] as Confidence[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setConf(m.questionId, c)}
                      className={`rounded-md px-2 py-0.5 text-[11px] font-semibold capitalize transition-colors ${
                        cur.confidence === c
                          ? c === "sure"
                            ? "bg-red-400/20 text-red-300"
                            : "bg-navy-lighter text-text-primary"
                          : "text-text-tertiary hover:text-text-secondary"
                      }`}
                    >
                      {c === "sure" ? "I was sure" : "Unsure"}
                    </button>
                  ))}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ERROR_TAGS.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTag(m.questionId, t.key)}
                    title={t.hint}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
                      cur.errorTag === t.key
                        ? "border-accent bg-accent-dim text-accent"
                        : "border-navy-border text-text-secondary hover:bg-navy-lighter"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </li>
          );
        })}
      </ul>

      <button
        onClick={finish}
        disabled={saving}
        className="mt-5 w-full rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white transition-all hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)] disabled:opacity-60"
      >
        {saving ? "Saving…" : `Finish & schedule ${scheduledLabel}`}
      </button>
    </div>
  );
}
