"use client";

/**
 * Interactive "cover the unknown" triangle for the multiplicative relationship
 * top = bottomLeft × bottomRight (Ohm's law V=I×R, and power P=I×E).
 *
 * Two modes:
 *  - Explore: tap the unknown, type the two knowns, the third computes live.
 *  - Quiz: generates an ASVAB-shaped problem (given two, find the third); the
 *    student predicts, then checks and the answer + formula reveal.
 *
 * This is the interactive + predict→check loop that puts the guides ahead of
 * static-diagram competitors and the generic, non-test-specific Khan widgets.
 * It is the TEMPLATE the other interactive diagrams follow.
 */
import { useMemo, useState } from "react";
import { useScore, QuizFooter, type DiagramContext } from "./_kit";

type Slot = "top" | "bl" | "br";
type Mode = "explore" | "quiz";

interface Props {
  top?: string;
  bottomLeft?: string;
  bottomRight?: string;
  units?: { top?: string; bottomLeft?: string; bottomRight?: string };
  label?: string;
  context?: DiagramContext;
}

interface Quiz {
  solveFor: Slot;
  given: Partial<Record<Slot, number>>;
  answer: number;
}

const ORANGE = "#f97316";
const ORANGE_DIM = "rgba(249,115,22,0.15)";
const INK = "#f1f5f9";

const rnd = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));

function fmt(n: number): string {
  if (!isFinite(n)) return "—";
  return String(Math.round(n * 1000) / 1000);
}

/** Build a clean-integer problem (the answer is always a whole number). */
function genQuiz(): Quiz {
  const which = rnd(0, 2);
  if (which === 0) {
    const a = rnd(2, 12);
    const b = rnd(2, 12);
    return { solveFor: "top", given: { bl: a, br: b }, answer: a * b };
  }
  if (which === 1) {
    const ans = rnd(2, 12);
    const b = rnd(2, 12);
    return { solveFor: "bl", given: { top: ans * b, br: b }, answer: ans };
  }
  const ans = rnd(2, 12);
  const a = rnd(2, 12);
  return { solveFor: "br", given: { top: ans * a, bl: a }, answer: ans };
}

export default function OhmsLawTriangleInteractive({
  top = "V",
  bottomLeft = "I",
  bottomRight = "R",
  units = {},
  label,
  context,
}: Props) {
  const [mode, setMode] = useState<Mode>("explore");
  const [solveFor, setSolveFor] = useState<Slot>("top");
  const [vals, setVals] = useState<Record<Slot, string>>({ top: "", bl: "", br: "" });

  // quiz state (generated only on user action -> no SSR/hydration mismatch)
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [guess, setGuess] = useState("");
  const [checked, setChecked] = useState(false);
  const { score, record, reset } = useScore();

  const names: Record<Slot, string> = { top, bl: bottomLeft, br: bottomRight };
  const unit: Record<Slot, string> = {
    top: units.top ?? "",
    bl: units.bottomLeft ?? "",
    br: units.bottomRight ?? "",
  };

  const num = (s: string) => {
    const n = parseFloat(s);
    return s.trim() !== "" && isFinite(n) ? n : null;
  };

  const formulaFor = (s: Slot) =>
    s === "top"
      ? `${top} = ${bottomLeft} × ${bottomRight}`
      : s === "bl"
        ? `${bottomLeft} = ${top} ÷ ${bottomRight}`
        : `${bottomRight} = ${top} ÷ ${bottomLeft}`;

  const exploreResult = useMemo(() => {
    const t = num(vals.top);
    const a = num(vals.bl);
    const b = num(vals.br);
    if (solveFor === "top") return a != null && b != null ? a * b : null;
    if (solveFor === "bl") return t != null && b != null && b !== 0 ? t / b : null;
    return t != null && a != null && a !== 0 ? t / a : null;
  }, [vals, solveFor]);

  const activeSolveFor = mode === "quiz" && quiz ? quiz.solveFor : solveFor;
  const formula = formulaFor(activeSolveFor);

  const startQuiz = () => {
    setMode("quiz");
    setQuiz(genQuiz());
    setGuess("");
    setChecked(false);
    reset();
  };
  const nextProblem = () => {
    setQuiz(genQuiz());
    setGuess("");
    setChecked(false);
  };
  const toExplore = () => {
    setMode("explore");
    setQuiz(null);
    setChecked(false);
  };

  const guessNum = num(guess);
  const correct = quiz != null && guessNum != null && Math.abs(guessNum - quiz.answer) < 1e-6;

  // triangle geometry
  const apex: [number, number] = [120, 14];
  const blPt: [number, number] = [26, 150];
  const brPt: [number, number] = [214, 150];
  const yDiv = 86;
  const lx = 120 + (26 - 120) * ((yDiv - 14) / (150 - 14));
  const rx = 240 - lx;
  const regionFill = (s: Slot) => (activeSolveFor === s ? ORANGE : ORANGE_DIM);
  const regionText = (s: Slot) => (activeSolveFor === s ? "#0a1628" : INK);

  const slots: Slot[] = ["top", "bl", "br"];

  return (
    <figure className="m-0 rounded-xl border border-navy-border bg-navy-light px-5 py-4">
      <figcaption className="mb-3 flex items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-accent">
          {label ?? "Ohm's Law"}
        </span>
        <span className="flex overflow-hidden rounded-md border border-navy-border text-[11px] font-semibold">
          <button
            type="button"
            onClick={toExplore}
            className={mode === "explore" ? "bg-accent px-2 py-1 text-navy" : "px-2 py-1 text-text-tertiary hover:text-text-secondary"}
          >
            Explore
          </button>
          <button
            type="button"
            onClick={startQuiz}
            className={mode === "quiz" ? "bg-accent px-2 py-1 text-navy" : "px-2 py-1 text-text-tertiary hover:text-text-secondary"}
          >
            Quiz me
          </button>
        </span>
      </figcaption>

      <svg viewBox="0 0 240 168" width="100%" role="img" aria-label={`${top} equals ${bottomLeft} times ${bottomRight} triangle`}>
        <polygon points={`${apex} ${blPt} ${brPt}`} fill="none" stroke={ORANGE} strokeWidth={2.5} strokeLinejoin="round" />
        <g style={{ cursor: mode === "explore" ? "pointer" : "default" }}>
          <polygon points={`${apex} ${lx},${yDiv} ${rx},${yDiv}`} fill={regionFill("top")} onClick={() => mode === "explore" && setSolveFor("top")} />
          <polygon points={`${lx},${yDiv} 120,${yDiv} 120,150 ${blPt}`} fill={regionFill("bl")} onClick={() => mode === "explore" && setSolveFor("bl")} />
          <polygon points={`120,${yDiv} ${rx},${yDiv} ${brPt} 120,150`} fill={regionFill("br")} onClick={() => mode === "explore" && setSolveFor("br")} />
        </g>
        <line x1={lx} y1={yDiv} x2={rx} y2={yDiv} stroke={ORANGE} strokeWidth={2.5} />
        <line x1={120} y1={yDiv} x2={120} y2={150} stroke={ORANGE} strokeWidth={2.5} />
        <text x={120} y={64} fill={regionText("top")} fontSize={32} fontWeight={800} textAnchor="middle" pointerEvents="none">{top}</text>
        <text x={84} y={130} fill={regionText("bl")} fontSize={28} fontWeight={800} textAnchor="middle" pointerEvents="none">{bottomLeft}</text>
        <text x={156} y={130} fill={regionText("br")} fontSize={28} fontWeight={800} textAnchor="middle" pointerEvents="none">{bottomRight}</text>
      </svg>

      {mode === "explore" ? (
        <>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {slots.map((s) => {
              const isUnknown = solveFor === s;
              return (
                <div key={s} className={`rounded-lg border px-2 py-2 text-center ${isUnknown ? "border-accent bg-accent/10" : "border-navy-border bg-navy"}`}>
                  <button type="button" onClick={() => setSolveFor(s)} className={`mb-1 block w-full text-xs font-bold ${isUnknown ? "text-accent" : "text-text-tertiary hover:text-text-secondary"}`}>
                    {isUnknown ? "solving for" : "solve for"} {names[s]}
                  </button>
                  {isUnknown ? (
                    <div className="font-mono text-lg font-bold text-accent">
                      {exploreResult != null ? fmt(exploreResult) : "?"}
                      {unit[s] ? <span className="ml-0.5 text-xs text-text-tertiary">{unit[s]}</span> : null}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-1">
                      <input inputMode="decimal" value={vals[s]} onChange={(e) => setVals((v) => ({ ...v, [s]: e.target.value }))} placeholder={names[s]} aria-label={`${names[s]} value`} className="w-full min-w-0 rounded border border-navy-border bg-navy-light px-1.5 py-1 text-center font-mono text-sm text-text-primary outline-none focus:border-accent" />
                      {unit[s] ? <span className="text-xs text-text-tertiary">{unit[s]}</span> : null}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-center text-xs text-text-tertiary">
            Cover the unknown → <span className="font-mono text-text-secondary">{formula}</span>
          </p>
        </>
      ) : quiz ? (
        <>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {slots.map((s) => {
              const isUnknown = quiz.solveFor === s;
              return (
                <div key={s} className={`rounded-lg border px-2 py-2 text-center ${isUnknown ? "border-accent bg-accent/10" : "border-navy-border bg-navy"}`}>
                  <span className="mb-1 block text-xs font-bold text-text-tertiary">{isUnknown ? "find" : "given"} {names[s]}</span>
                  {isUnknown ? (
                    checked ? (
                      <div className={`font-mono text-lg font-bold ${correct ? "text-success" : "text-danger"}`}>
                        {fmt(quiz.answer)}
                        {unit[s] ? <span className="ml-0.5 text-xs text-text-tertiary">{unit[s]}</span> : null}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <input inputMode="decimal" autoFocus value={guess} onChange={(e) => setGuess(e.target.value)} aria-label={`your answer for ${names[s]}`} className="w-full min-w-0 rounded border border-accent bg-navy-light px-1.5 py-1 text-center font-mono text-sm text-text-primary outline-none" />
                        {unit[s] ? <span className="text-xs text-text-tertiary">{unit[s]}</span> : null}
                      </div>
                    )
                  ) : (
                    <div className="font-mono text-lg font-bold text-text-primary">
                      {fmt(quiz.given[s] as number)}
                      {unit[s] ? <span className="ml-0.5 text-xs text-text-tertiary">{unit[s]}</span> : null}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {checked ? (
            <QuizFooter
              correct={correct}
              resultText={correct ? "Correct ✓" : `Not quite — ${names[quiz.solveFor]} = ${fmt(quiz.answer)}${unit[quiz.solveFor]}`}
              formula={formula}
              score={score}
              context={context}
              onNext={nextProblem}
            />
          ) : (
            <button
              type="button"
              onClick={() => { record(correct); setChecked(true); }}
              disabled={guessNum == null}
              className="mx-auto mt-3 block rounded-lg bg-accent px-4 py-1.5 text-sm font-semibold text-navy hover:bg-accent-hover disabled:opacity-40"
            >
              Check
            </button>
          )}
        </>
      ) : null}
    </figure>
  );
}
