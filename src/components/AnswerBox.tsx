type AnswerBoxProps = {
  children: React.ReactNode;
};

/**
 * Answer-first lead block for AEO/answer-engine extractability.
 *
 * Placed immediately after the <h1> on money pages so the direct, declarative
 * answer (with the key number) is the first prose an answer engine sees — the
 * "ski-ramp" / first-third pattern that gets pages cited instead of skipped.
 * Keep the text to ~40-60 words, lead with the specific number, and state only
 * facts already established on the page.
 */
export default function AnswerBox({ children }: AnswerBoxProps) {
  return (
    <div className="not-prose my-6 rounded-xl border border-accent/30 bg-navy-light p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent">
        Quick answer
      </p>
      <p className="mt-2 text-base leading-relaxed text-text-secondary">
        {children}
      </p>
    </div>
  );
}
