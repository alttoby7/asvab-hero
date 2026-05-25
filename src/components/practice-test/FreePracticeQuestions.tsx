import type { FreeQuestion } from "@/lib/free-practice";
import InteractiveFreeQuestionCard from "./InteractiveFreeQuestionCard";

/**
 * Renders the free practice questions. Each question is an interactive client
 * card (select an answer, get graded), but the correct answer + worked
 * explanation are SERVER-rendered here and passed as children, so they stay in
 * the static HTML for crawlers and AI engines and work with JavaScript disabled.
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
        <InteractiveFreeQuestionCard
          key={q.id}
          questionNumber={i + 1}
          subtestName={subtestName}
          question={q.question}
          options={q.options}
          correctIndex={q.correctIndex}
        >
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
        </InteractiveFreeQuestionCard>
      ))}
    </ol>
  );
}
