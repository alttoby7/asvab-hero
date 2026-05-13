"use client";

import type { GradeButton } from "@/lib/flashcards/types";

interface Props {
  onGrade: (grade: GradeButton) => void;
  disabled?: boolean;
}

const BUTTONS: Array<{
  grade: GradeButton;
  label: string;
  hint: string;
  className: string;
  shortcut: string;
}> = [
  {
    grade: "again",
    label: "Again",
    hint: "< 10 min",
    className: "border-danger-dim bg-danger-dim text-danger hover:bg-danger-dim/80",
    shortcut: "1",
  },
  {
    grade: "hard",
    label: "Hard",
    hint: "Soon",
    className:
      "border-almost-dim bg-almost-dim text-almost hover:bg-almost-dim/80",
    shortcut: "2",
  },
  {
    grade: "good",
    label: "Good",
    hint: "Standard",
    className: "border-accent bg-accent text-white hover:bg-accent-hover",
    shortcut: "3",
  },
  {
    grade: "easy",
    label: "Easy",
    hint: "Push out",
    className:
      "border-success-dim bg-success-dim text-success hover:bg-success-dim/80",
    shortcut: "4",
  },
];

export default function GradeButtons({ onGrade, disabled }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {BUTTONS.map((b) => (
        <button
          key={b.grade}
          type="button"
          onClick={() => onGrade(b.grade)}
          disabled={disabled}
          className={`flex flex-col items-center gap-0.5 rounded-xl border px-3 py-3 font-display text-sm font-bold transition-colors disabled:opacity-50 ${b.className}`}
        >
          <span>{b.label}</span>
          <span className="text-[10px] font-normal opacity-80">{b.hint}</span>
        </button>
      ))}
    </div>
  );
}
