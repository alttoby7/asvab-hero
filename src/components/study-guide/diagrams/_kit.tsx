"use client";

/**
 * Shared building blocks for the interactive (client) study-guide diagrams.
 * Keeps the card shell, Explore/Quiz toggle, and number helpers consistent
 * across diagrams so they don't drift. See OhmsLawTriangleInteractive for the
 * canonical explore + predict→check pattern these support.
 */
import type { ReactNode } from "react";

export type Mode = "explore" | "quiz";

export const rnd = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min + 1));

export const numOf = (s: string): number | null => {
  const n = parseFloat(s);
  return s.trim() !== "" && isFinite(n) ? n : null;
};

export const fmt = (n: number): string =>
  !isFinite(n) ? "—" : String(Math.round(n * 1000) / 1000);

export function ModeToggle({
  mode,
  onExplore,
  onQuiz,
}: {
  mode: Mode;
  onExplore: () => void;
  onQuiz: () => void;
}) {
  return (
    <span className="flex overflow-hidden rounded-md border border-navy-border text-[11px] font-semibold">
      <button
        type="button"
        onClick={onExplore}
        className={mode === "explore" ? "bg-accent px-2 py-1 text-navy" : "px-2 py-1 text-text-tertiary hover:text-text-secondary"}
      >
        Explore
      </button>
      <button
        type="button"
        onClick={onQuiz}
        className={mode === "quiz" ? "bg-accent px-2 py-1 text-navy" : "px-2 py-1 text-text-tertiary hover:text-text-secondary"}
      >
        Quiz me
      </button>
    </span>
  );
}

export function InteractiveCard({
  label,
  toggle,
  children,
}: {
  label: string;
  toggle?: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure className="m-0 rounded-xl border border-navy-border bg-navy-light px-5 py-4">
      <figcaption className="mb-3 flex items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-accent">{label}</span>
        {toggle}
      </figcaption>
      {children}
    </figure>
  );
}

/** A small numeric input used by the explore/quiz controls. */
export function NumField({
  value,
  onChange,
  placeholder,
  unit,
  active,
  disabled,
  autoFocus,
}: {
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  unit?: string;
  active?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
}) {
  return (
    <span className="flex items-center justify-center gap-1">
      <input
        inputMode="decimal"
        value={value}
        autoFocus={autoFocus}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder ?? "value"}
        className={`w-full min-w-0 rounded border bg-navy-light px-1.5 py-1 text-center font-mono text-sm text-text-primary outline-none ${active ? "border-accent" : "border-navy-border focus:border-accent"}`}
      />
      {unit ? <span className="text-xs text-text-tertiary">{unit}</span> : null}
    </span>
  );
}

export function CheckButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="mx-auto mt-3 block rounded-lg bg-accent px-4 py-1.5 text-sm font-semibold text-navy hover:bg-accent-hover disabled:opacity-40"
    >
      Check
    </button>
  );
}

export function NextButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mx-auto mt-3 block rounded-lg bg-accent px-4 py-1.5 text-sm font-semibold text-navy hover:bg-accent-hover"
    >
      Next problem
    </button>
  );
}
