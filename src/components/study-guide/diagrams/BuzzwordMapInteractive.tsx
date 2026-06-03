"use client";

/**
 * Interactive word-problem keyword → operation map (AR). Explore: a grid of
 * common word-problem keywords; tapping one highlights it and shows which
 * operation it signals (+, −, ×, ÷). Quiz: show ONE keyword, the student picks
 * the operation from four buttons → predict→check via the shared QuizFooter
 * ("correct" = the right operation). Competitor sites bury this translation
 * table in prose; this makes it a drill. Follows the explore + predict→check
 * template + shared _kit.
 */
import { useState } from "react";
import { InteractiveCard, ModeToggle, QuizFooter, useScore, rnd, type Mode, type DiagramContext } from "./_kit";

type Op = "+" | "−" | "×" | "÷";

interface Keyword {
  word: string;
  op: Op;
  note: string;
}

const KEYWORDS: Keyword[] = [
  { word: "sum / total", op: "+", note: "combine amounts — add" },
  { word: "more than", op: "+", note: "increases a value — add" },
  { word: "difference", op: "−", note: "how much is left — subtract" },
  { word: "less than", op: "−", note: "take away — subtract" },
  { word: "product / of", op: "×", note: "repeated groups — multiply" },
  { word: "twice", op: "×", note: "two times a value — multiply by 2" },
  { word: "times", op: "×", note: "scale a value — multiply" },
  { word: "quotient", op: "÷", note: "split into equal parts — divide" },
  { word: "per", op: "÷", note: "a rate per unit — divide" },
  { word: "split / shared", op: "÷", note: "share equally — divide" },
];

const OPS: Op[] = ["+", "−", "×", "÷"];
const OP_NAME: Record<Op, string> = { "+": "add", "−": "subtract", "×": "multiply", "÷": "divide" };

const opColor = (op: Op, selected: boolean) =>
  selected
    ? "border-accent bg-accent text-navy"
    : "border-navy-border text-text-secondary hover:border-navy-lighter";

export default function BuzzwordMapInteractive({ label = "Keyword → operation", context }: { label?: string; context?: DiagramContext }) {
  const [mode, setMode] = useState<Mode>("explore");
  const [picked, setPicked] = useState<number>(0); // index in KEYWORDS, explore mode

  const [quiz, setQuiz] = useState<Keyword | null>(null);
  const [guess, setGuess] = useState<Op | null>(null);
  const [checked, setChecked] = useState(false);
  const { score, record, reset } = useScore();

  const startQuiz = () => { setMode("quiz"); setQuiz(KEYWORDS[rnd(0, KEYWORDS.length - 1)]); setGuess(null); setChecked(false); reset(); };
  const next = () => { setQuiz(KEYWORDS[rnd(0, KEYWORDS.length - 1)]); setGuess(null); setChecked(false); };
  const toExplore = () => { setMode("explore"); setQuiz(null); setChecked(false); };

  const correct = quiz != null && guess != null && guess === quiz.op;
  const active = KEYWORDS[picked];

  return (
    <InteractiveCard label={label} toggle={<ModeToggle mode={mode} onExplore={toExplore} onQuiz={startQuiz} />}>
      {mode === "explore" ? (
        <>
          <div className="grid grid-cols-2 gap-1.5">
            {KEYWORDS.map((k, i) => (
              <button
                key={k.word}
                type="button"
                onClick={() => setPicked(i)}
                className={`flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 text-left text-xs font-semibold transition-colors ${i === picked ? "border-accent bg-accent/10 text-accent" : "border-navy-border bg-navy text-text-secondary hover:border-navy-lighter"}`}
              >
                <span>{k.word}</span>
                <span className="font-mono text-base font-bold">{k.op}</span>
              </button>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-accent bg-accent/10 px-3 py-2 text-center">
            <span className="font-mono text-2xl font-bold text-accent">{active.op}</span>
            <p className="mt-1 text-xs text-text-secondary">
              <span className="font-semibold text-text-primary">&ldquo;{active.word}&rdquo;</span> → {active.note}
            </p>
          </div>
          <p className="mt-2 text-center text-xs text-text-tertiary">
            Tap a keyword to see the operation it signals.
          </p>
        </>
      ) : quiz ? (
        <>
          <div className="rounded-lg border border-navy-border bg-navy px-3 py-4 text-center">
            <span className="block text-xs font-bold uppercase tracking-wider text-text-tertiary">this keyword signals…</span>
            <span className="mt-1 block text-lg font-bold text-text-primary">&ldquo;{quiz.word}&rdquo;</span>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {OPS.map((op) => {
              const isGuess = guess === op;
              const reveal = checked && op === quiz.op;
              return (
                <button
                  key={op}
                  type="button"
                  disabled={checked}
                  onClick={() => setGuess(op)}
                  className={`rounded-lg border py-2 font-mono text-lg font-bold transition-colors disabled:cursor-default ${reveal ? "border-success bg-success/15 text-success" : isGuess ? opColor(op, true) : opColor(op, false)}`}
                  aria-label={OP_NAME[op]}
                >
                  {op}
                </button>
              );
            })}
          </div>
          {checked ? (
            <QuizFooter
              correct={correct}
              resultText={correct ? "Correct ✓" : `Not quite — "${quiz.word}" means ${OP_NAME[quiz.op]} (${quiz.op})`}
              formula={`"${quiz.word}" → ${quiz.op} (${OP_NAME[quiz.op]})`}
              score={score}
              context={context}
              onNext={next}
            />
          ) : (
            <button
              type="button"
              onClick={() => { record(correct); setChecked(true); }}
              disabled={guess == null}
              className="mx-auto mt-3 block rounded-lg bg-accent px-4 py-1.5 text-sm font-semibold text-navy hover:bg-accent-hover disabled:opacity-40"
            >
              Check
            </button>
          )}
        </>
      ) : null}
    </InteractiveCard>
  );
}
