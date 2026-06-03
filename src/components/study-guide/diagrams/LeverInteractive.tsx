"use client";

/**
 * Interactive class-1 lever. Explore: choose which of the four quantities to
 * solve for, type the other three, the fourth computes live
 * (effort × effort arm = load × load arm). Quiz: one value hidden, predict→check.
 * Mechanical-advantage problems are pure text on competitor sites.
 */
import { useMemo, useState } from "react";
import { InteractiveCard, ModeToggle, NumField, CheckButton, NextButton, rnd, numOf, fmt, type Mode } from "./_kit";

type Var = "effort" | "effortArm" | "load" | "loadArm";

const ORANGE = "#f97316";
const EMPTY = "#1a2942";
const BORDER = "#243350";
const INK = "#f1f5f9";

const LABEL: Record<Var, string> = {
  effort: "Effort",
  effortArm: "Effort arm",
  load: "Load",
  loadArm: "Load arm",
};
const ORDER: Var[] = ["effort", "effortArm", "load", "loadArm"];

interface Quiz {
  solveFor: Var;
  given: Partial<Record<Var, number>>;
  answer: number;
}

function genQuiz(): Quiz {
  const effort = rnd(2, 9);
  const effortArm = rnd(2, 9);
  const P = effort * effortArm;
  const divisors: number[] = [];
  for (let d = 1; d <= P; d++) if (P % d === 0) divisors.push(d);
  const loadArm = divisors[rnd(0, divisors.length - 1)];
  const load = P / loadArm;
  const all: Record<Var, number> = { effort, effortArm, load, loadArm };
  const solveFor = ORDER[rnd(0, 3)];
  const given: Partial<Record<Var, number>> = {};
  ORDER.forEach((v) => { if (v !== solveFor) given[v] = all[v]; });
  return { solveFor, given, answer: all[solveFor] };
}

export default function LeverInteractive({ label = "Lever" }: { label?: string }) {
  const [mode, setMode] = useState<Mode>("explore");
  const [solveFor, setSolveFor] = useState<Var>("effort");
  const [vals, setVals] = useState<Record<Var, string>>({ effort: "", effortArm: "", load: "", loadArm: "" });

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [guess, setGuess] = useState("");
  const [checked, setChecked] = useState(false);

  const exploreResult = useMemo(() => {
    const e = numOf(vals.effort);
    const ea = numOf(vals.effortArm);
    const l = numOf(vals.load);
    const la = numOf(vals.loadArm);
    if (solveFor === "effort") return l != null && la != null && ea != null && ea !== 0 ? (l * la) / ea : null;
    if (solveFor === "load") return e != null && ea != null && la != null && la !== 0 ? (e * ea) / la : null;
    if (solveFor === "effortArm") return l != null && la != null && e != null && e !== 0 ? (l * la) / e : null;
    return e != null && ea != null && l != null && l !== 0 ? (e * ea) / l : null;
  }, [vals, solveFor]);

  const active = mode === "quiz" && quiz ? quiz.solveFor : solveFor;

  const startQuiz = () => { setMode("quiz"); setQuiz(genQuiz()); setGuess(""); setChecked(false); };
  const next = () => { setQuiz(genQuiz()); setGuess(""); setChecked(false); };
  const toExplore = () => { setMode("explore"); setQuiz(null); setChecked(false); };

  const gn = numOf(guess);
  const correct = quiz != null && gn != null && Math.abs(gn - quiz.answer) < 1e-6;

  const fx = 120;
  const beamY = 70;

  return (
    <InteractiveCard label={label} toggle={<ModeToggle mode={mode} onExplore={toExplore} onQuiz={startQuiz} />}>
      <svg viewBox="0 0 240 110" width="100%" role="img" aria-label="Class-1 lever with effort and load on a fulcrum">
        <rect x={20} y={beamY - 4} width={200} height={8} rx={4} fill={ORANGE} />
        <polygon points={`${fx},${beamY + 4} ${fx - 12},${beamY + 28} ${fx + 12},${beamY + 28}`} fill={EMPTY} stroke={BORDER} strokeWidth={1.5} />
        {/* effort arrow */}
        <line x1={44} y1={34} x2={44} y2={beamY - 6} stroke={ORANGE} strokeWidth={2.5} strokeLinecap="round" />
        <polygon points={`44,${beamY - 4} 40,${beamY - 12} 48,${beamY - 12}`} fill={ORANGE} />
        <text x={44} y={26} fill={INK} fontSize={10} fontWeight={700} textAnchor="middle">EFFORT</text>
        {/* load box */}
        <rect x={186} y={beamY - 26} width={26} height={22} rx={3} fill={EMPTY} stroke={ORANGE} strokeWidth={2} />
        <text x={199} y={beamY - 32} fill={INK} fontSize={10} fontWeight={700} textAnchor="middle">LOAD</text>
        <text x={82} y={106} fill="#94a3b8" fontSize={9} fontFamily="monospace" textAnchor="middle">effort arm</text>
        <text x={165} y={106} fill="#94a3b8" fontSize={9} fontFamily="monospace" textAnchor="middle">load arm</text>
      </svg>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {ORDER.map((v) => {
          const isUnknown = active === v;
          const givenVal = mode === "quiz" && quiz && !isUnknown ? quiz.given[v] : undefined;
          return (
            <div key={v} className={`rounded-lg border px-2 py-2 text-center ${isUnknown ? "border-accent bg-accent/10" : "border-navy-border bg-navy"}`}>
              {mode === "explore" ? (
                <button type="button" onClick={() => setSolveFor(v)} className={`mb-1 block w-full text-xs font-bold ${isUnknown ? "text-accent" : "text-text-tertiary hover:text-text-secondary"}`}>
                  {isUnknown ? "solving for" : "solve for"} {LABEL[v]}
                </button>
              ) : (
                <span className={`mb-1 block text-xs font-bold ${isUnknown ? "text-accent" : "text-text-tertiary"}`}>{isUnknown ? "find" : "given"} {LABEL[v]}</span>
              )}
              {mode === "explore" ? (
                isUnknown ? (
                  <div className="font-mono text-lg font-bold text-accent">{exploreResult != null ? fmt(exploreResult) : "?"}</div>
                ) : (
                  <NumField value={vals[v]} onChange={(x) => setVals((s) => ({ ...s, [v]: x }))} placeholder={LABEL[v]} />
                )
              ) : isUnknown ? (
                checked ? (
                  <div className={`font-mono text-lg font-bold ${correct ? "text-success" : "text-danger"}`}>{fmt(quiz!.answer)}</div>
                ) : (
                  <NumField value={guess} onChange={setGuess} placeholder="?" active autoFocus />
                )
              ) : (
                <div className="font-mono text-base font-bold text-text-primary">{givenVal}</div>
              )}
            </div>
          );
        })}
      </div>

      {mode === "quiz" && quiz ? (
        checked ? (
          <div className="mt-3">
            <p className={`text-center text-sm font-semibold ${correct ? "text-success" : "text-danger"}`}>
              {correct ? "Correct ✓" : `Not quite — ${LABEL[quiz.solveFor]} = ${fmt(quiz.answer)}`}
            </p>
            <p className="mt-1 text-center text-xs text-text-tertiary"><span className="font-mono text-text-secondary">Effort × effort arm = Load × load arm</span></p>
            <NextButton onClick={next} />
          </div>
        ) : (
          <CheckButton onClick={() => setChecked(true)} disabled={gn == null} />
        )
      ) : (
        <p className="mt-2 text-center text-xs text-text-tertiary"><span className="font-mono text-text-secondary">Effort × effort arm = Load × load arm</span></p>
      )}
    </InteractiveCard>
  );
}
