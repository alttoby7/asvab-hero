"use client";

/**
 * Interactive series/parallel circuit. Explore: toggle the wiring, set two
 * resistor values + the source voltage, and total resistance + current update
 * live on a redrawn schematic. Quiz: given a wiring + values, find total
 * resistance. No competitor in the ASVAB space draws circuits at all, let alone
 * interactive ones. Follows the Ohm's template + shared _kit.
 */
import { useMemo, useState } from "react";
import { InteractiveCard, ModeToggle, NumField, CheckButton, QuizFooter, useScore, rnd, numOf, fmt, type Mode, type DiagramContext } from "./_kit";

type Config = "series" | "parallel";

const ORANGE = "#f97316";
const EMPTY = "#1a2942";
const BORDER = "#243350";
const KNOB_BG = "#0a1628";
const MUTED = "#94a3b8";
const INK = "#f1f5f9";

// clean parallel pairs [r1, r2, total] so quiz answers stay whole
const PARALLEL_PAIRS = [
  [3, 6, 2],
  [4, 12, 3],
  [2, 2, 1],
  [6, 12, 4],
  [10, 15, 6],
  [20, 5, 4],
  [4, 4, 2],
  [8, 8, 4],
];

function totalResistance(config: Config, r1: number, r2: number): number | null {
  if (config === "series") return r1 + r2;
  if (r1 + r2 === 0) return null;
  return (r1 * r2) / (r1 + r2);
}

function Battery({ x, y }: { x: number; y: number }) {
  return (
    <g stroke={ORANGE} strokeWidth={2.5} strokeLinecap="round">
      <line x1={x - 9} y1={y - 11} x2={x + 9} y2={y - 11} />
      <line x1={x - 5} y1={y + 4} x2={x + 5} y2={y + 4} />
      <text x={x + 15} y={y - 2} fill={MUTED} fontSize={11} fontWeight={700} stroke="none" textAnchor="middle">+</text>
    </g>
  );
}

function RBox({ x, y, label, vertical }: { x: number; y: number; label: string; vertical?: boolean }) {
  return (
    <g transform={vertical ? `translate(${x},${y}) rotate(90)` : `translate(${x},${y})`}>
      <rect x={-16} y={-8} width={32} height={16} rx={2} fill={EMPTY} stroke={ORANGE} strokeWidth={2} />
      {!vertical && <text x={0} y={-13} fill={MUTED} fontSize={11} fontWeight={600} textAnchor="middle">{label}</text>}
    </g>
  );
}

function Schematic({ config }: { config: Config }) {
  return (
    <svg viewBox="0 0 240 132" width="100%" role="img" aria-label={`${config} circuit with a battery and two resistors`}>
      <rect x={28} y={26} width={184} height={84} rx={4} fill="none" stroke={ORANGE} strokeWidth={2.5} />
      <rect x={20} y={55} width={16} height={26} fill={KNOB_BG} />
      <Battery x={28} y={68} />
      {config === "series" ? (
        <>
          <RBox x={96} y={26} label="R1" />
          <RBox x={160} y={26} label="R2" />
        </>
      ) : (
        <>
          <line x1={120} y1={26} x2={120} y2={110} stroke={ORANGE} strokeWidth={2.5} />
          <line x1={172} y1={26} x2={172} y2={110} stroke={ORANGE} strokeWidth={2.5} />
          <RBox x={120} y={68} label="R1" vertical />
          <RBox x={172} y={68} label="R2" vertical />
          <text x={120} y={126} fill={MUTED} fontSize={11} fontWeight={600} textAnchor="middle">R1</text>
          <text x={172} y={126} fill={MUTED} fontSize={11} fontWeight={600} textAnchor="middle">R2</text>
        </>
      )}
    </svg>
  );
}

interface Quiz {
  config: Config;
  r1: number;
  r2: number;
  answer: number;
}

function genQuiz(): Quiz {
  if (rnd(0, 1) === 0) {
    const r1 = rnd(2, 20);
    const r2 = rnd(2, 20);
    return { config: "series", r1, r2, answer: r1 + r2 };
  }
  const p = PARALLEL_PAIRS[rnd(0, PARALLEL_PAIRS.length - 1)];
  return { config: "parallel", r1: p[0], r2: p[1], answer: p[2] };
}

export default function CircuitInteractive({ label = "Circuit", context }: { label?: string; context?: DiagramContext }) {
  const [mode, setMode] = useState<Mode>("explore");
  const [config, setConfig] = useState<Config>("series");
  const [r1, setR1] = useState("6");
  const [r2, setR2] = useState("3");
  const [volts, setVolts] = useState("12");

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [guess, setGuess] = useState("");
  const [checked, setChecked] = useState(false);
  const { score, record, reset } = useScore();

  const a = numOf(r1);
  const b = numOf(r2);
  const v = numOf(volts);
  const rt = useMemo(() => (a != null && b != null ? totalResistance(config, a, b) : null), [config, a, b]);
  const current = rt != null && rt !== 0 && v != null ? v / rt : null;

  const shownConfig = mode === "quiz" && quiz ? quiz.config : config;

  const startQuiz = () => { setMode("quiz"); setQuiz(genQuiz()); setGuess(""); setChecked(false); reset(); };
  const next = () => { setQuiz(genQuiz()); setGuess(""); setChecked(false); };
  const toExplore = () => { setMode("explore"); setQuiz(null); setChecked(false); };

  const gn = numOf(guess);
  const correct = quiz != null && gn != null && Math.abs(gn - quiz.answer) < 1e-6;

  return (
    <InteractiveCard label={label} toggle={<ModeToggle mode={mode} onExplore={toExplore} onQuiz={startQuiz} />}>
      <Schematic config={shownConfig} />

      {mode === "explore" ? (
        <>
          <div className="mt-2 flex items-center justify-center gap-1 text-xs">
            {(["series", "parallel"] as Config[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setConfig(c)}
                className={`rounded border px-3 py-1 font-semibold capitalize ${config === c ? "border-accent bg-accent text-navy" : "border-navy-border text-text-secondary hover:border-navy-lighter"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="mb-1 block text-xs font-bold text-text-tertiary">R1 (Ω)</span>
              <NumField value={r1} onChange={setR1} placeholder="R1" />
            </div>
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="mb-1 block text-xs font-bold text-text-tertiary">R2 (Ω)</span>
              <NumField value={r2} onChange={setR2} placeholder="R2" />
            </div>
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="mb-1 block text-xs font-bold text-text-tertiary">source (V)</span>
              <NumField value={volts} onChange={setVolts} placeholder="V" />
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-lg border border-accent bg-accent/10 px-2 py-2">
              <span className="block text-xs font-bold text-accent">total resistance</span>
              <span className="font-mono text-lg font-bold text-accent">{rt != null ? `${fmt(rt)} Ω` : "—"}</span>
            </div>
            <div className="rounded-lg border border-accent bg-accent/10 px-2 py-2">
              <span className="block text-xs font-bold text-accent">current</span>
              <span className="font-mono text-lg font-bold text-accent">{current != null ? `${fmt(current)} A` : "—"}</span>
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-text-tertiary">
            <span className="font-mono text-text-secondary">
              {config === "series" ? "R = R1 + R2" : "1/R = 1/R1 + 1/R2"}
            </span>{" "}· I = V ÷ R
          </p>
        </>
      ) : quiz ? (
        <>
          <p className="mt-2 text-center text-xs font-semibold uppercase tracking-wider text-text-tertiary">{quiz.config} circuit</p>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="block text-xs font-bold text-text-tertiary">R1</span>
              <span className="font-mono text-base font-bold text-text-primary">{quiz.r1} Ω</span>
            </div>
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="block text-xs font-bold text-text-tertiary">R2</span>
              <span className="font-mono text-base font-bold text-text-primary">{quiz.r2} Ω</span>
            </div>
            <div className="rounded-lg border border-accent bg-accent/10 px-2 py-2">
              <span className="mb-1 block text-xs font-bold text-accent">total R?</span>
              {checked ? (
                <span className={`font-mono text-base font-bold ${correct ? "text-success" : "text-danger"}`}>{fmt(quiz.answer)} Ω</span>
              ) : (
                <NumField value={guess} onChange={setGuess} placeholder="Ω" active autoFocus />
              )}
            </div>
          </div>
          {checked ? (
            <QuizFooter
              correct={correct}
              resultText={correct ? "Correct ✓" : `Not quite — ${fmt(quiz.answer)} Ω`}
              formula={quiz.config === "series" ? `R = ${quiz.r1} + ${quiz.r2} = ${fmt(quiz.answer)}` : `R = (${quiz.r1}×${quiz.r2}) ÷ (${quiz.r1}+${quiz.r2}) = ${fmt(quiz.answer)}`}
              score={score}
              context={context}
              onNext={next}
            />
          ) : (
            <CheckButton onClick={() => { record(correct); setChecked(true); }} disabled={gn == null} />
          )}
        </>
      ) : null}
    </InteractiveCard>
  );
}
