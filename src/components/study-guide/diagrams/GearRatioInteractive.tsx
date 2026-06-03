"use client";

/**
 * Interactive gear-ratio diagram. Explore: set driver/driven teeth + input RPM,
 * watch the ratio, output RPM and rotation direction update live (gears resize
 * to the tooth counts). Quiz: given the three, find the output RPM.
 *
 * Relationship: outRPM = inRPM × driverTeeth / drivenTeeth; ratio = driven/driver.
 * Follows the OhmsLawTriangleInteractive explore + predict→check template.
 */
import { useMemo, useState } from "react";
import { InteractiveCard, ModeToggle, NumField, CheckButton, QuizFooter, useScore, rnd, numOf, fmt, type Mode, type DiagramContext } from "./_kit";

const ORANGE = "#f97316";
const MUTED = "#94a3b8";
const EMPTY = "#1a2942";

function Gear({ cx, cy, r, teeth, color }: { cx: number; cy: number; r: number; teeth: number; color: string }) {
  const n = Math.max(6, Math.min(40, Math.round(teeth)));
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={cx - 2.5} y={cy - r - 6} width={5} height={8} fill={color} transform={`rotate(${(360 / n) * i} ${cx} ${cy})`} />
      ))}
      <circle cx={cx} cy={cy} r={r} fill={EMPTY} stroke={color} strokeWidth={2.5} />
      <circle cx={cx} cy={cy} r={4} fill={color} />
    </g>
  );
}

interface Quiz {
  driver: number;
  driven: number;
  inRpm: number;
  answer: number;
}

function genQuiz(): Quiz {
  // keep output RPM a clean number: inRpm chosen as a multiple of the ratio denominator
  const driver = rnd(2, 6) * 5; // 10..30
  const driven = rnd(2, 6) * 5;
  const inRpm = driven * rnd(2, 12); // ensures inRpm*driver/driven is whole
  return { driver, driven, inRpm, answer: (inRpm * driver) / driven };
}

export default function GearRatioInteractive({ label = "Gear ratio", context }: { label?: string; context?: DiagramContext }) {
  const [mode, setMode] = useState<Mode>("explore");
  const [driver, setDriver] = useState("12");
  const [driven, setDriven] = useState("24");
  const [inRpm, setInRpm] = useState("120");

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [guess, setGuess] = useState("");
  const [checked, setChecked] = useState(false);
  const { score, record, reset } = useScore();

  const dv = numOf(driver);
  const dn = numOf(driven);
  const ratio = dv && dn && dv !== 0 ? dn / dv : null;
  const ir = numOf(inRpm);
  const outRpm = useMemo(() => (dv && dn && ir != null && dn !== 0 ? (ir * dv) / dn : null), [dv, dn, ir]);

  const startQuiz = () => { setMode("quiz"); setQuiz(genQuiz()); setGuess(""); setChecked(false); reset(); };
  const next = () => { setQuiz(genQuiz()); setGuess(""); setChecked(false); };
  const toExplore = () => { setMode("explore"); setQuiz(null); setChecked(false); };

  const gn = numOf(guess);
  const correct = quiz != null && gn != null && Math.abs(gn - quiz.answer) < 1e-6;

  // gear sizes scale with tooth count for the visual
  const shown = mode === "quiz" && quiz ? { driver: quiz.driver, driven: quiz.driven } : { driver: dv ?? 12, driven: dn ?? 24 };
  const r1 = 18 + Math.min(22, shown.driver);
  const r2 = 18 + Math.min(22, shown.driven);
  const cy = 70;
  const cx1 = 16 + r1;
  const cx2 = cx1 + r1 + r2;
  const vbW = cx2 + r2 + 16;

  return (
    <InteractiveCard label={label} toggle={<ModeToggle mode={mode} onExplore={toExplore} onQuiz={startQuiz} />}>
      <svg viewBox={`0 0 ${vbW} 150`} width="100%" role="img" aria-label={`Two meshing gears, driver ${shown.driver} teeth, driven ${shown.driven} teeth`}>
        <Gear cx={cx1} cy={cy} r={r1} teeth={shown.driver} color={ORANGE} />
        <Gear cx={cx2} cy={cy} r={r2} teeth={shown.driven} color={MUTED} />
        <text x={cx1} y={cy + r1 + 22} fill="#f1f5f9" fontSize={12} fontWeight={700} textAnchor="middle">{shown.driver}T</text>
        <text x={cx2} y={cy + r2 + 22} fill="#f1f5f9" fontSize={12} fontWeight={700} textAnchor="middle">{shown.driven}T</text>
        <text x={cx1} y={20} fill={MUTED} fontSize={10} textAnchor="middle">driver</text>
        <text x={cx2} y={20} fill={MUTED} fontSize={10} textAnchor="middle">driven</text>
      </svg>

      {mode === "explore" ? (
        <>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2 text-center">
              <span className="mb-1 block text-xs font-bold text-text-tertiary">driver teeth</span>
              <NumField value={driver} onChange={setDriver} placeholder="driver" />
            </div>
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2 text-center">
              <span className="mb-1 block text-xs font-bold text-text-tertiary">driven teeth</span>
              <NumField value={driven} onChange={setDriven} placeholder="driven" />
            </div>
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2 text-center">
              <span className="mb-1 block text-xs font-bold text-text-tertiary">input RPM</span>
              <NumField value={inRpm} onChange={setInRpm} placeholder="rpm" />
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-lg border border-accent bg-accent/10 px-2 py-2">
              <span className="block text-xs font-bold text-accent">ratio</span>
              <span className="font-mono text-lg font-bold text-accent">{ratio != null ? `${fmt(ratio)} : 1` : "—"}</span>
            </div>
            <div className="rounded-lg border border-accent bg-accent/10 px-2 py-2">
              <span className="block text-xs font-bold text-accent">output RPM</span>
              <span className="font-mono text-lg font-bold text-accent">{outRpm != null ? fmt(outRpm) : "—"}</span>
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-text-tertiary">
            <span className="font-mono text-text-secondary">out RPM = in RPM × driver ÷ driven</span> · gears counter-rotate
          </p>
        </>
      ) : quiz ? (
        <>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="block text-xs font-bold text-text-tertiary">driver</span>
              <span className="font-mono text-base font-bold text-text-primary">{quiz.driver}T</span>
            </div>
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="block text-xs font-bold text-text-tertiary">driven</span>
              <span className="font-mono text-base font-bold text-text-primary">{quiz.driven}T</span>
            </div>
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="block text-xs font-bold text-text-tertiary">input RPM</span>
              <span className="font-mono text-base font-bold text-text-primary">{quiz.inRpm}</span>
            </div>
          </div>
          <div className="mt-2 rounded-lg border border-accent bg-accent/10 px-2 py-2 text-center">
            <span className="mb-1 block text-xs font-bold text-accent">find output RPM</span>
            {checked ? (
              <span className={`font-mono text-lg font-bold ${correct ? "text-success" : "text-danger"}`}>{fmt(quiz.answer)}</span>
            ) : (
              <NumField value={guess} onChange={setGuess} placeholder="RPM" active autoFocus />
            )}
          </div>
          {checked ? (
            <QuizFooter
              correct={correct}
              resultText={correct ? "Correct ✓" : `Not quite — ${fmt(quiz.answer)} RPM`}
              formula={`${quiz.inRpm} × ${quiz.driver} ÷ ${quiz.driven} = ${fmt(quiz.answer)}`}
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
