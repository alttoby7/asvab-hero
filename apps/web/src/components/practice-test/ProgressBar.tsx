import type { UserAnswer } from "@/types";

interface ProgressBarProps {
  total: number;
  currentIndex: number;
  answers: UserAnswer[];
  onJumpTo: (index: number) => void;
}

export default function ProgressBar({
  total,
  currentIndex,
  answers,
  onJumpTo,
}: ProgressBarProps) {
  const answeredCount = answers.filter((a) => a.selectedIndex !== null).length;
  const pct = Math.round((answeredCount / total) * 100);

  return (
    <div className="space-y-3">
      {/* Bar */}
      <div className="flex items-center gap-3">
        <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-navy-lighter">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="font-mono text-xs tabular-nums text-text-tertiary">
          {answeredCount}/{total}
        </span>
      </div>

      {/* Dot grid */}
      <div className="flex flex-wrap gap-1">
        {Array.from({ length: total }, (_, i) => {
          const isAnswered = answers[i]?.selectedIndex !== null;
          const isCurrent = i === currentIndex;

          return (
            <button
              key={i}
              onClick={() => onJumpTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${
                isCurrent
                  ? "scale-125 bg-accent shadow-[0_0_8px_var(--color-accent-glow)]"
                  : isAnswered
                    ? "bg-success hover:bg-success/80"
                    : "bg-navy-lighter hover:bg-navy-border"
              }`}
              aria-label={`Question ${i + 1}${isAnswered ? " (answered)" : ""}`}
            />
          );
        })}
      </div>
    </div>
  );
}
