"use client";

/**
 * Interactive number line. Explore: drag the slider, the marker moves and the
 * value reads out. Quiz: a marker is placed, read off its value, predict→check.
 * Khan's signature AR/MK interaction, framed for the ASVAB.
 */
import { useState } from "react";
import { InteractiveCard, ModeToggle, NumField, CheckButton, QuizFooter, useScore, rnd, numOf, fmt, type Mode, type DiagramContext } from "./_kit";

const ORANGE = "#f97316";
const EMPTY = "#1a2942";
const BORDER = "#243350";
const TICK = "#64748b";
const MUTED = "#94a3b8";

export default function NumberLineInteractive({
  min = 0,
  max = 10,
  label = "Number line",
  context,
}: {
  min?: number;
  max?: number;
  label?: string;
  context?: DiagramContext;
}) {
  const [mode, setMode] = useState<Mode>("explore");
  const [value, setValue] = useState((min + max) / 2);

  const [target, setTarget] = useState<number | null>(null);
  const [guess, setGuess] = useState("");
  const [checked, setChecked] = useState(false);
  const { score, record, reset } = useScore();

  const W = 280;
  const padX = 16;
  const usable = W - padX * 2;
  const xFor = (v: number) => padX + ((v - min) / (max - min)) * usable;

  const shownValue = mode === "quiz" && target != null ? target : value;
  const ticks: number[] = [];
  for (let t = min; t <= max; t++) ticks.push(t);

  const startQuiz = () => {
    setMode("quiz");
    setTarget(rnd(min * 2 + 1, max * 2 - 1) / 2); // halves between min..max
    setGuess("");
    setChecked(false);
    reset();
  };
  const next = () => {
    setTarget(rnd(min * 2 + 1, max * 2 - 1) / 2);
    setGuess("");
    setChecked(false);
  };
  const toExplore = () => { setMode("explore"); setTarget(null); setChecked(false); };

  const gn = numOf(guess);
  const correct = target != null && gn != null && Math.abs(gn - target) < 1e-6;

  return (
    <InteractiveCard label={label} toggle={<ModeToggle mode={mode} onExplore={toExplore} onQuiz={startQuiz} />}>
      <svg viewBox={`0 0 ${W} 70`} width="100%" role="img" aria-label={`Number line from ${min} to ${max}, marker at ${fmt(shownValue)}`}>
        <line x1={padX} y1={40} x2={W - padX} y2={40} stroke={BORDER} strokeWidth={2} />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={xFor(t)} y1={35} x2={xFor(t)} y2={45} stroke={TICK} strokeWidth={1.5} />
            <text x={xFor(t)} y={60} fill={MUTED} fontSize={10} fontFamily="monospace" textAnchor="middle">{t}</text>
          </g>
        ))}
        <line x1={xFor(shownValue)} y1={26} x2={xFor(shownValue)} y2={48} stroke={ORANGE} strokeWidth={3} />
        <circle cx={xFor(shownValue)} cy={40} r={6} fill={EMPTY} stroke={ORANGE} strokeWidth={3} />
        {(mode === "explore" || checked) && (
          <text x={xFor(shownValue)} y={18} fill={ORANGE} fontSize={12} fontWeight={700} textAnchor="middle">{fmt(shownValue)}</text>
        )}
      </svg>

      {mode === "explore" ? (
        <div className="mt-2">
          <input
            type="range"
            min={min}
            max={max}
            step={0.5}
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
            aria-label="number line value"
            className="w-full accent-accent"
          />
          <p className="mt-1 text-center text-xs text-text-tertiary">
            value = <span className="font-mono text-text-secondary">{fmt(value)}</span>
          </p>
        </div>
      ) : (
        <div className="mt-3">
          <div className="mx-auto max-w-[180px] rounded-lg border border-accent bg-accent/10 px-2 py-2 text-center">
            <span className="mb-1 block text-xs font-bold text-accent">what value is marked?</span>
            {checked ? (
              <span className={`font-mono text-lg font-bold ${correct ? "text-success" : "text-danger"}`}>{fmt(target!)}</span>
            ) : (
              <NumField value={guess} onChange={setGuess} placeholder="value" active autoFocus />
            )}
          </div>
          {checked ? (
            <QuizFooter
              correct={correct}
              resultText={correct ? "Correct ✓" : `Not quite — it's ${fmt(target!)}`}
              score={score}
              context={context}
              onNext={next}
            />
          ) : (
            <CheckButton onClick={() => { record(correct); setChecked(true); }} disabled={gn == null} />
          )}
        </div>
      )}
    </InteractiveCard>
  );
}
