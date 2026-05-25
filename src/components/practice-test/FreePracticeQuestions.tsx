import type { FreeQuestion } from "@/lib/free-practice";

/**
 * Server-rendered (static HTML, NO "use client") practice questions. The answer
 * and worked explanation are present in the HTML (so crawlers + AI engines can
 * read them) but collapsed inside a native <details> so a human can attempt the
 * question first. <details> needs no JavaScript and its contents stay in the DOM.
 */
const LETTERS = ["A", "B", "C", "D", "E"];

export default function FreePracticeQuestions({
  questions,
  subtestName,
}: {
  questions: FreeQuestion[];
  subtestName: string;
}) {
  return (
    <ol className="mt-6 space-y-8" aria-label={`${subtestName} practice questions`}>
      {questions.map((q, i) => (
        <li
          key={q.id}
          className="rounded-xl border border-navy-border bg-navy-light p-5 sm:p-6"
        >
          <p className="text-sm font-semibold text-text-tertiary">
            Question {i + 1}
            <span className="ml-2 font-normal">· {subtestName}</span>
          </p>
          <p className="mt-2 text-base font-medium text-text-primary">
            {q.question}
          </p>

          <ul className="mt-4 space-y-2" aria-label="Answer choices">
            {q.options.map((opt, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 px-3 py-1.5 text-text-secondary"
              >
                <span className="font-semibold">{LETTERS[idx]}.</span>
                <span>{opt}</span>
              </li>
            ))}
          </ul>

          <details className="group mt-4 border-t border-navy-border pt-3">
            <summary className="cursor-pointer list-none text-sm font-semibold text-accent hover:text-accent-hover">
              <span className="group-open:hidden">Show answer &amp; explanation</span>
              <span className="hidden group-open:inline">Hide answer</span>
            </summary>
            <p className="mt-3 text-sm text-text-primary">
              <strong>
                Correct answer: {LETTERS[q.correctIndex]}.
              </strong>{" "}
              {q.options[q.correctIndex]}
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              <strong className="text-text-primary">Why: </strong>
              {q.explanation}
            </p>
          </details>
        </li>
      ))}
    </ol>
  );
}
