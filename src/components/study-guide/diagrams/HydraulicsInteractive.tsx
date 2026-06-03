"use client";

/**
 * Interactive hydraulic press (Pascal's law). Explore: set the input-piston
 * area A1, output-piston area A2 and the input force F1, watch the output force
 * F2 = F1 × A2 ÷ A1 update live on a redrawn two-piston diagram (small input,
 * large output, connected by fluid). Quiz: given A1, A2, F1, find F2 — curated
 * so the answer is a clean whole number. Follows the Circuit/Gear explore +
 * predict→check template + shared _kit.
 */
import { useMemo, useState } from "react";
import { InteractiveCard, ModeToggle, NumField, CheckButton, QuizFooter, useScore, rnd, numOf, fmt, type Mode, type DiagramContext } from "./_kit";

const ORANGE = "#f97316";
const EMPTY = "#1a2942";
const MUTED = "#94a3b8";
const INK = "#f1f5f9";
const FLUID = "rgba(249,115,22,0.18)";

/** Two connected cylinders; output bore widens with the A2:A1 ratio. */
function PistonDiagram({ a1, a2 }: { a1: number; a2: number }) {
  const ratio = a1 > 0 ? Math.max(1, Math.min(4, a2 / a1)) : 2;
  const inW = 26;
  const outW = Math.round(inW * Math.sqrt(ratio)); // area ∝ width here (visual)
  const baseY = 116;
  const inX = 40;
  const outX = 200 - outW / 2;
  const inTop = 70;
  const outTop = 70 - Math.min(22, (outW - inW)); // bigger piston rides higher
  return (
    <svg viewBox="0 0 240 140" width="100%" role="img" aria-label={`Hydraulic press: small input piston, large output piston`}>
      {/* fluid channel connecting the two cylinders */}
      <path d={`M ${inX - inW / 2} ${baseY} L ${inX - inW / 2} ${inTop + 18} L ${inX + inW / 2} ${inTop + 18} L ${inX + inW / 2} ${baseY - 14} L ${outX - 4} ${baseY - 14} L ${outX - 4} ${outTop + 18} L ${outX + outW + 4} ${outTop + 18} L ${outX + outW + 4} ${baseY} Z`} fill={FLUID} stroke={ORANGE} strokeWidth={2} strokeLinejoin="round" />
      {/* input piston (small) */}
      <rect x={inX - inW / 2} y={inTop} width={inW} height={16} rx={2} fill={EMPTY} stroke={ORANGE} strokeWidth={2} />
      {/* input force arrow down */}
      <line x1={inX} y1={inTop - 26} x2={inX} y2={inTop - 4} stroke={ORANGE} strokeWidth={2.5} strokeLinecap="round" />
      <polygon points={`${inX},${inTop - 2} ${inX - 4},${inTop - 10} ${inX + 4},${inTop - 10}`} fill={ORANGE} />
      <text x={inX} y={inTop - 30} fill={INK} fontSize={10} fontWeight={700} textAnchor="middle">F1</text>
      {/* output piston (large) */}
      <rect x={outX} y={outTop} width={outW} height={16} rx={2} fill={EMPTY} stroke={ORANGE} strokeWidth={2} />
      {/* output force arrow up */}
      <line x1={outX + outW / 2} y1={outTop - 4} x2={outX + outW / 2} y2={outTop - 26} stroke={ORANGE} strokeWidth={2.5} strokeLinecap="round" />
      <polygon points={`${outX + outW / 2},${outTop - 28} ${outX + outW / 2 - 4},${outTop - 20} ${outX + outW / 2 + 4},${outTop - 20}`} fill={ORANGE} />
      <text x={outX + outW / 2} y={outTop - 30} fill={INK} fontSize={10} fontWeight={700} textAnchor="middle">F2</text>
      {/* area labels */}
      <text x={inX} y={baseY + 14} fill={MUTED} fontSize={10} fontWeight={600} textAnchor="middle">A1</text>
      <text x={outX + outW / 2} y={baseY + 14} fill={MUTED} fontSize={10} fontWeight={600} textAnchor="middle">A2</text>
    </svg>
  );
}

interface Quiz {
  a1: number;
  a2: number;
  f1: number;
  answer: number;
}

function genQuiz(): Quiz {
  // make A2/A1 an integer ratio so F2 = F1 × A2 ÷ A1 stays whole
  const a1 = rnd(2, 6);
  const mult = rnd(2, 8);
  const a2 = a1 * mult;
  const f1 = rnd(10, 60);
  return { a1, a2, f1, answer: (f1 * a2) / a1 };
}

export default function HydraulicsInteractive({ label = "Hydraulics", context }: { label?: string; context?: DiagramContext }) {
  const [mode, setMode] = useState<Mode>("explore");
  const [a1Str, setA1] = useState("2");
  const [a2Str, setA2] = useState("20");
  const [f1Str, setF1] = useState("50");

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [guess, setGuess] = useState("");
  const [checked, setChecked] = useState(false);
  const { score, record, reset } = useScore();

  const a1 = numOf(a1Str);
  const a2 = numOf(a2Str);
  const f1 = numOf(f1Str);
  const f2 = useMemo(() => (a1 != null && a1 !== 0 && a2 != null && f1 != null ? (f1 * a2) / a1 : null), [a1, a2, f1]);

  const shown = mode === "quiz" && quiz ? { a1: quiz.a1, a2: quiz.a2 } : { a1: a1 ?? 2, a2: a2 ?? 20 };

  const startQuiz = () => { setMode("quiz"); setQuiz(genQuiz()); setGuess(""); setChecked(false); reset(); };
  const next = () => { setQuiz(genQuiz()); setGuess(""); setChecked(false); };
  const toExplore = () => { setMode("explore"); setQuiz(null); setChecked(false); };

  const gn = numOf(guess);
  const correct = quiz != null && gn != null && Math.abs(gn - quiz.answer) < 1e-6;

  return (
    <InteractiveCard label={label} toggle={<ModeToggle mode={mode} onExplore={toExplore} onQuiz={startQuiz} />}>
      <PistonDiagram a1={shown.a1} a2={shown.a2} />

      {mode === "explore" ? (
        <>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="mb-1 block text-xs font-bold text-text-tertiary">input A1 (in²)</span>
              <NumField value={a1Str} onChange={setA1} placeholder="A1" />
            </div>
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="mb-1 block text-xs font-bold text-text-tertiary">output A2 (in²)</span>
              <NumField value={a2Str} onChange={setA2} placeholder="A2" />
            </div>
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="mb-1 block text-xs font-bold text-text-tertiary">input F1 (lb)</span>
              <NumField value={f1Str} onChange={setF1} placeholder="F1" />
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-lg border border-accent bg-accent/10 px-2 py-2">
              <span className="block text-xs font-bold text-accent">mech. advantage</span>
              <span className="font-mono text-lg font-bold text-accent">{a1 != null && a1 !== 0 && a2 != null ? `${fmt(a2 / a1)}×` : "—"}</span>
            </div>
            <div className="rounded-lg border border-accent bg-accent/10 px-2 py-2">
              <span className="block text-xs font-bold text-accent">output F2</span>
              <span className="font-mono text-lg font-bold text-accent">{f2 != null ? `${fmt(f2)} lb` : "—"}</span>
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-text-tertiary">
            <span className="font-mono text-text-secondary">F2 = F1 × A2 ÷ A1</span> · pressure is equal throughout
          </p>
        </>
      ) : quiz ? (
        <>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="block text-xs font-bold text-text-tertiary">A1</span>
              <span className="font-mono text-base font-bold text-text-primary">{quiz.a1} in²</span>
            </div>
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="block text-xs font-bold text-text-tertiary">A2</span>
              <span className="font-mono text-base font-bold text-text-primary">{quiz.a2} in²</span>
            </div>
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="block text-xs font-bold text-text-tertiary">F1</span>
              <span className="font-mono text-base font-bold text-text-primary">{quiz.f1} lb</span>
            </div>
          </div>
          <div className="mt-2 rounded-lg border border-accent bg-accent/10 px-2 py-2 text-center">
            <span className="mb-1 block text-xs font-bold text-accent">find output F2</span>
            {checked ? (
              <span className={`font-mono text-lg font-bold ${correct ? "text-success" : "text-danger"}`}>{fmt(quiz.answer)} lb</span>
            ) : (
              <NumField value={guess} onChange={setGuess} placeholder="lb" active autoFocus />
            )}
          </div>
          {checked ? (
            <QuizFooter
              correct={correct}
              resultText={correct ? "Correct ✓" : `Not quite — ${fmt(quiz.answer)} lb`}
              formula={`F2 = ${quiz.f1} × ${quiz.a2} ÷ ${quiz.a1} = ${fmt(quiz.answer)}`}
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
