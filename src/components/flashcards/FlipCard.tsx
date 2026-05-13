"use client";

interface Props {
  front: string;
  back: string;
  explanation: string | null;
  revealed: boolean;
  onClick: () => void;
}

export default function FlipCard({ front, back, explanation, revealed, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flip-card relative block w-full rounded-3xl border border-navy-border bg-navy-light px-6 py-10 text-left shadow-[0_8px_28px_rgba(0,0,0,0.25)] transition-shadow hover:shadow-[0_12px_36px_rgba(0,0,0,0.32)] sm:px-8 sm:py-14"
      style={{ minHeight: "280px" }}
      aria-pressed={revealed}
    >
      <div className="flex min-h-[200px] flex-col items-center justify-center text-center">
        <div className="font-display text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
          {front}
        </div>

        {revealed && (
          <div
            className="mt-6 w-full space-y-3 border-t border-navy-border pt-6"
            style={{ animation: "fadeIn 0.25s ease-out" }}
          >
            <p className="text-lg font-medium text-text-primary sm:text-xl">{back}</p>
            {explanation && (
              <p className="text-sm leading-relaxed text-text-secondary">{explanation}</p>
            )}
          </div>
        )}
      </div>

      {!revealed && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-text-tertiary">
          Tap to reveal
        </div>
      )}
    </button>
  );
}
