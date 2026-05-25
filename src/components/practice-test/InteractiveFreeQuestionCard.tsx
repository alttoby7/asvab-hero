"use client";

import { useRef, useState, type ReactNode } from "react";

/**
 * Interactive single practice question (progressive enhancement).
 *
 * SEO/GEO: the answer + explanation are passed in as server-rendered `children`
 * and rendered unconditionally inside an uncontrolled <details>, so they are in
 * the static HTML for crawlers and work with JS disabled. This client island only
 * adds behavior: native radios grade the answer on first selection, lock the
 * group, announce a verdict, and imperatively open the <details>.
 */
const LETTERS = ["A", "B", "C", "D", "E"];

export default function InteractiveFreeQuestionCard({
  questionNumber,
  subtestName,
  question,
  options,
  correctIndex,
  children,
}: {
  questionNumber: number;
  subtestName: string;
  question: string;
  options: string[];
  correctIndex: number;
  children: ReactNode;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const answered = selectedIndex !== null;
  const isCorrect = answered && selectedIndex === correctIndex;
  const name = `q-${subtestName}-${questionNumber}`
    .replace(/\s+/g, "-")
    .toLowerCase();

  function handleSelect(idx: number) {
    if (answered) return;
    setSelectedIndex(idx);
    if (detailsRef.current) detailsRef.current.open = true;
  }

  return (
    <li className="rounded-xl border border-navy-border bg-navy-light p-5 sm:p-6">
      <p className="text-sm font-semibold text-text-tertiary">
        Question {questionNumber}
        <span className="ml-2 font-normal">· {subtestName}</span>
      </p>

      <fieldset className="mt-2" disabled={answered}>
        <legend className="text-base font-medium text-text-primary">
          {question}
        </legend>
        <div className="mt-4 space-y-2">
          {options.map((opt, idx) => {
            const correct = idx === correctIndex;
            let cls =
              "flex items-start gap-2 rounded-lg border px-3 py-2 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-navy-light";
            if (!answered) {
              cls +=
                " cursor-pointer border-navy-border text-text-secondary hover:border-accent/60";
            } else if (correct) {
              cls += " border-green-500/60 bg-green-500/10 text-text-primary";
            } else if (idx === selectedIndex) {
              cls += " border-red-500/60 bg-red-500/10 text-text-primary";
            } else {
              cls += " border-navy-border text-text-tertiary opacity-60";
            }
            const id = `${name}-${idx}`;
            return (
              <label key={idx} htmlFor={id} className={cls}>
                <input
                  id={id}
                  type="radio"
                  name={name}
                  className="peer sr-only"
                  checked={selectedIndex === idx}
                  onChange={() => handleSelect(idx)}
                />
                <span className="font-semibold">{LETTERS[idx]}.</span>
                <span>{opt}</span>
                {answered && correct && (
                  <span className="ml-auto shrink-0 text-xs font-semibold uppercase tracking-wide text-green-400">
                    Correct
                  </span>
                )}
                {answered && idx === selectedIndex && !correct && (
                  <span className="ml-auto shrink-0 text-xs font-semibold uppercase tracking-wide text-red-400">
                    Your pick
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </fieldset>

      <p
        role="status"
        aria-live="polite"
        className="mt-3 min-h-[1.25rem] text-sm font-medium"
      >
        {answered && (
          <span className={isCorrect ? "text-green-400" : "text-red-400"}>
            {isCorrect
              ? "Correct."
              : "Not quite. The answer and explanation are below."}
          </span>
        )}
      </p>

      <details ref={detailsRef} className="mt-1 border-t border-navy-border pt-3">
        <summary className="cursor-pointer list-none text-sm font-semibold text-accent hover:text-accent-hover">
          Answer &amp; explanation
        </summary>
        {children}
      </details>
    </li>
  );
}
