import { formatTime } from "@/lib/test-scorer";

interface TimerProps {
  timeRemaining: number;
}

export default function Timer({ timeRemaining }: TimerProps) {
  const isWarning = timeRemaining <= 300 && timeRemaining > 60;
  const isCritical = timeRemaining <= 60;

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-label={`${Math.floor(timeRemaining / 60)} minutes ${timeRemaining % 60} seconds remaining`}
      className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 transition-colors duration-300 ${
        isCritical
          ? "animate-pulse border-red-500/50 bg-red-500/10"
          : isWarning
            ? "border-accent/50 bg-accent-dim"
            : "border-navy-border bg-navy-light"
      }`}
    >
      <svg
        className={`h-4 w-4 ${
          isCritical
            ? "text-red-400"
            : isWarning
              ? "text-accent"
              : "text-text-tertiary"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
      <span
        className={`font-mono text-sm font-bold tabular-nums ${
          isCritical
            ? "text-red-400"
            : isWarning
              ? "text-accent"
              : "text-text-secondary"
        }`}
      >
        {formatTime(timeRemaining)}
      </span>
    </div>
  );
}
