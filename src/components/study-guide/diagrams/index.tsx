/**
 * Reusable, theme-locked SVG diagram library for study guides.
 *
 * Guides reference these by name from markdown frontmatter (`diagrams: [...]`),
 * and StudyGuideArticle injects the matching component after the named heading.
 * Style = "card wrapper + bold fills" (captioned card, solid orange figures).
 *
 * Competitive note: most ASVAB sites teach EI/MC/AS with walls of text and no
 * figures, so the electronics + mechanical diagrams below are the biggest
 * differentiators. All diagrams are pure SVG (no hooks) -> server components.
 * To add one: build the component, then register it in REGISTRY.
 */
import type { ReactNode } from "react";
import OhmsLawTriangleInteractive from "./OhmsLawTriangleInteractive";
import GearRatioInteractive from "./GearRatioInteractive";
import RightTriangleInteractive from "./RightTriangleInteractive";
import LeverInteractive from "./LeverInteractive";
import NumberLineInteractive from "./NumberLineInteractive";
import FractionBarInteractive from "./FractionBarInteractive";
import CircuitInteractive from "./CircuitInteractive";
import PulleySystemInteractive from "./PulleySystemInteractive";
import InclinedPlaneInteractive from "./InclinedPlaneInteractive";
import HydraulicsInteractive from "./HydraulicsInteractive";
import BuzzwordMapInteractive from "./BuzzwordMapInteractive";

const ORANGE = "#f97316";
const ORANGE_DIM = "rgba(249,115,22,0.15)";
const EMPTY = "#1a2942"; // navy-lighter, the "unfilled" portion
const BORDER = "#243350"; // navy-border
const KNOB_BG = "#0a1628"; // navy
const INK = "#f1f5f9"; // text-primary
const MUTED = "#94a3b8"; // text-secondary
const TICK = "#64748b"; // text-tertiary

/** Captioned card shell, matches the Formula Reference / Worked Examples cards. */
function DiagramCard({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <figure className="m-0 rounded-xl border border-navy-border bg-navy-light px-5 py-4">
      {label ? (
        <figcaption className="mb-3 text-xs font-bold uppercase tracking-wider text-accent">
          {label}
        </figcaption>
      ) : null}
      {children}
    </figure>
  );
}

function Caption({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-center text-xs text-text-tertiary">{children}</p>;
}

/** Straight arrow with a filled head, used by the mechanics diagrams. */
function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = ORANGE,
  width = 2.5,
  head = 7,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  width?: number;
  head?: number;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const a1 = angle + Math.PI - 0.45;
  const a2 = angle + Math.PI + 0.45;
  const p1 = `${x2 + head * Math.cos(a1)},${y2 + head * Math.sin(a1)}`;
  const p2 = `${x2 + head * Math.cos(a2)},${y2 + head * Math.sin(a2)}`;
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${p1} ${p2}`} fill={color} />
    </>
  );
}

/* ================================================================== */
/* AR / MK — fraction-bar                                             */
/* ================================================================== */
interface FractionBarProps {
  numerator: number;
  denominator: number;
  label?: string;
  caption?: string;
}
function FractionBar({ numerator, denominator, label, caption }: FractionBarProps) {
  const W = 256;
  const H = 56;
  const gap = 4;
  const segW = (W - gap * (denominator - 1)) / denominator;
  return (
    <DiagramCard label={label ?? `Visualizing ${numerator}/${denominator}`}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={`Fraction bar: ${numerator} of ${denominator} parts shaded`}>
        {Array.from({ length: denominator }, (_, i) => {
          const filled = i < numerator;
          return (
            <rect key={i} x={i * (segW + gap)} y={0} width={segW} height={H} rx={4} fill={filled ? ORANGE : EMPTY} stroke={filled ? "none" : BORDER} />
          );
        })}
      </svg>
      <Caption>{caption ?? `${numerator} shaded ÷ ${denominator} total = ${numerator}/${denominator}`}</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* AR / MK — number-line                                             */
/* ================================================================== */
interface NumberLineProps {
  value: number;
  min?: number;
  max?: number;
  valueLabel?: string;
  minLabel?: string;
  maxLabel?: string;
  label?: string;
}
function NumberLine({ value, min = 0, max = 1, valueLabel, minLabel, maxLabel, label }: NumberLineProps) {
  const W = 256;
  const trackY = 34;
  const padX = 14;
  const usable = W - padX * 2;
  const t = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const cx = padX + t * usable;
  return (
    <DiagramCard label={label}>
      <svg viewBox={`0 0 ${W} 64`} width="100%" role="img" aria-label={`Number line: ${valueLabel ?? value} between ${minLabel ?? min} and ${maxLabel ?? max}`}>
        <rect x={padX} y={trackY - 7} width={usable} height={14} rx={7} fill={EMPTY} stroke={BORDER} />
        <rect x={padX} y={trackY - 7} width={Math.max(0, cx - padX)} height={14} rx={7} fill={ORANGE} />
        <circle cx={cx} cy={trackY} r={9} fill={KNOB_BG} stroke={ORANGE} strokeWidth={3} />
        {valueLabel ? (
          <text x={cx} y={14} fill={ORANGE} fontSize={12} fontWeight={700} textAnchor="middle">{valueLabel}</text>
        ) : null}
        <text x={padX} y={60} fill={MUTED} fontSize={12} fontWeight={600} textAnchor="middle">{minLabel ?? String(min)}</text>
        <text x={W - padX} y={60} fill={MUTED} fontSize={12} fontWeight={600} textAnchor="middle">{maxLabel ?? String(max)}</text>
      </svg>
    </DiagramCard>
  );
}

/* ================================================================== */
/* EI — ohms-law-triangle (also serves the power triangle P=I×E)      */
/* ================================================================== */
interface OhmsTriangleProps {
  top?: string;
  bottomLeft?: string;
  bottomRight?: string;
  label?: string;
  caption?: string;
}
function OhmsLawTriangle({ top = "V", bottomLeft = "I", bottomRight = "R", label, caption }: OhmsTriangleProps) {
  const apex = [120, 14];
  const bl = [26, 150];
  const br = [214, 150];
  // horizontal divider where the triangle is at y = 86
  const yDiv = 86;
  const tx = (y: number) => 120 + (26 - 120) * ((y - 14) / (150 - 14));
  const lx = tx(yDiv);
  const rx = 240 - lx;
  return (
    <DiagramCard label={label ?? "Ohm's Law triangle"}>
      <svg viewBox="0 0 240 168" width="100%" role="img" aria-label={`Ohm's law triangle with ${top} over ${bottomLeft} times ${bottomRight}`}>
        <polygon points={`${apex} ${bl} ${br}`} fill={ORANGE_DIM} stroke={ORANGE} strokeWidth={2.5} strokeLinejoin="round" />
        <line x1={lx} y1={yDiv} x2={rx} y2={yDiv} stroke={ORANGE} strokeWidth={2.5} />
        <line x1={120} y1={yDiv} x2={120} y2={150} stroke={ORANGE} strokeWidth={2.5} />
        <text x={120} y={64} fill={INK} fontSize={32} fontWeight={800} textAnchor="middle">{top}</text>
        <text x={84} y={130} fill={INK} fontSize={28} fontWeight={800} textAnchor="middle">{bottomLeft}</text>
        <text x={156} y={130} fill={INK} fontSize={28} fontWeight={800} textAnchor="middle">{bottomRight}</text>
      </svg>
      <Caption>{caption ?? `Cover the unknown: ${top} = ${bottomLeft} × ${bottomRight},  ${bottomLeft} = ${top}/${bottomRight},  ${bottomRight} = ${top}/${bottomLeft}`}</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* EI — circuit (series vs. parallel)                                 */
/* ================================================================== */
function Resistor({ x, y, label }: { x: number; y: number; label: string }) {
  // horizontal resistor box centered at (x, y)
  return (
    <g>
      <rect x={x - 16} y={y - 8} width={32} height={16} rx={2} fill={EMPTY} stroke={ORANGE} strokeWidth={2} />
      <text x={x} y={y - 14} fill={MUTED} fontSize={11} fontWeight={600} textAnchor="middle">{label}</text>
    </g>
  );
}
function Battery({ x, y }: { x: number; y: number }) {
  // vertical battery symbol centered at (x, y): long + short plate
  return (
    <g stroke={ORANGE} strokeWidth={2.5} strokeLinecap="round">
      <line x1={x - 9} y1={y - 11} x2={x + 9} y2={y - 11} />
      <line x1={x - 5} y1={y + 4} x2={x + 5} y2={y + 4} />
      <text x={x + 16} y={y - 2} fill={MUTED} fontSize={11} fontWeight={700} stroke="none" textAnchor="middle">+</text>
    </g>
  );
}
function Circuit({ mode = "series", label }: { mode?: "series" | "parallel"; label?: string }) {
  const isSeries = mode === "series";
  return (
    <DiagramCard label={label ?? (isSeries ? "Series circuit" : "Parallel circuit")}>
      <svg viewBox="0 0 240 150" width="100%" role="img" aria-label={`${mode} circuit with a battery and two resistors`}>
        {/* outer loop */}
        <rect x={28} y={28} width={184} height={94} rx={4} fill="none" stroke={ORANGE} strokeWidth={2.5} />
        {/* battery breaks the left rail */}
        <rect x={20} y={62} width={16} height={26} fill={KNOB_BG} />
        <Battery x={28} y={75} />
        {isSeries ? (
          <>
            <Resistor x={96} y={28} label="R1" />
            <Resistor x={160} y={28} label="R2" />
            <Arrow x1={120} y1={122} x2={150} y2={122} width={2} />
          </>
        ) : (
          <>
            {/* two vertical branches between the rails */}
            <line x1={120} y1={28} x2={120} y2={122} stroke={ORANGE} strokeWidth={2.5} />
            <line x1={172} y1={28} x2={172} y2={122} stroke={ORANGE} strokeWidth={2.5} />
            <g transform="translate(120,75) rotate(90)">
              <Resistor x={0} y={0} label="" />
            </g>
            <g transform="translate(172,75) rotate(90)">
              <Resistor x={0} y={0} label="" />
            </g>
            <text x={120} y={142} fill={MUTED} fontSize={11} fontWeight={600} textAnchor="middle">R1</text>
            <text x={172} y={142} fill={MUTED} fontSize={11} fontWeight={600} textAnchor="middle">R2</text>
          </>
        )}
      </svg>
      <Caption>
        {isSeries
          ? "Same current everywhere; resistances add: R = R1 + R2"
          : "Same voltage across each branch; 1/R = 1/R1 + 1/R2"}
      </Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* MC — lever (class-1, fulcrum + effort/load arms)                   */
/* ================================================================== */
function Lever({ label }: { label?: string }) {
  const fx = 120; // fulcrum x
  const beamY = 88;
  return (
    <DiagramCard label={label ?? "Lever (class 1)"}>
      <svg viewBox="0 0 260 150" width="100%" role="img" aria-label="Class-1 lever with fulcrum, effort arm and load arm">
        {/* beam */}
        <rect x={24} y={beamY - 4} width={212} height={8} rx={4} fill={ORANGE} />
        {/* fulcrum */}
        <polygon points={`${fx},${beamY + 4} ${fx - 13},${beamY + 32} ${fx + 13},${beamY + 32}`} fill={EMPTY} stroke={BORDER} strokeWidth={1.5} />
        {/* effort (down) on the left end */}
        <Arrow x1={46} y1={50} x2={46} y2={beamY - 6} />
        <text x={46} y={42} fill={INK} fontSize={11} fontWeight={700} textAnchor="middle">EFFORT</text>
        {/* load box on the right end */}
        <rect x={196} y={beamY - 30} width={30} height={26} rx={3} fill={EMPTY} stroke={ORANGE} strokeWidth={2} />
        <text x={211} y={beamY - 38} fill={INK} fontSize={11} fontWeight={700} textAnchor="middle">LOAD</text>
        {/* arm measures */}
        <g stroke={TICK} strokeWidth={1}>
          <line x1={46} y1={128} x2={fx} y2={128} />
          <line x1={46} y1={123} x2={46} y2={133} />
          <line x1={fx} y1={123} x2={fx} y2={133} />
          <line x1={fx} y1={128} x2={211} y2={128} />
          <line x1={211} y1={123} x2={211} y2={133} />
        </g>
        <text x={83} y={145} fill={MUTED} fontSize={10} fontFamily="monospace" textAnchor="middle">effort arm</text>
        <text x={165} y={145} fill={MUTED} fontSize={10} fontFamily="monospace" textAnchor="middle">load arm</text>
      </svg>
      <Caption>Effort × effort arm = Load × load arm</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* MC — pulley (fixed)                                                */
/* ================================================================== */
function Pulley({ label }: { label?: string }) {
  return (
    <DiagramCard label={label ?? "Fixed pulley"}>
      <svg viewBox="0 0 200 180" width="100%" role="img" aria-label="Fixed pulley changing the direction of effort">
        {/* ceiling */}
        <line x1={56} y1={14} x2={144} y2={14} stroke={MUTED} strokeWidth={2.5} />
        {[64, 80, 96, 112, 128].map((x) => (
          <line key={x} x1={x} y1={14} x2={x - 7} y2={7} stroke={TICK} strokeWidth={1.5} />
        ))}
        <line x1={100} y1={14} x2={100} y2={24} stroke={MUTED} strokeWidth={2} />
        {/* wheel */}
        <circle cx={100} cy={48} r={24} fill={EMPTY} stroke={ORANGE} strokeWidth={3} />
        <circle cx={100} cy={48} r={4} fill={ORANGE} />
        {/* rope */}
        <line x1={76} y1={48} x2={76} y2={150} stroke={MUTED} strokeWidth={2} />
        <line x1={124} y1={48} x2={124} y2={120} stroke={MUTED} strokeWidth={2} />
        {/* effort down on the left rope */}
        <Arrow x1={76} y1={120} x2={76} y2={152} />
        <text x={76} y={170} fill={INK} fontSize={11} fontWeight={700} textAnchor="middle">EFFORT</text>
        {/* load on the right rope */}
        <rect x={108} y={120} width={32} height={28} rx={3} fill={EMPTY} stroke={ORANGE} strokeWidth={2} />
        <text x={124} y={166} fill={INK} fontSize={11} fontWeight={700} textAnchor="middle">LOAD</text>
      </svg>
      <Caption>Fixed pulley: changes direction only, MA = 1</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* MC — gear-ratio (two meshing gears, opposite rotation)            */
/* ================================================================== */
function Gear({ cx, cy, r, teeth, color }: { cx: number; cy: number; r: number; teeth: number; color: string }) {
  return (
    <g>
      {Array.from({ length: teeth }, (_, i) => (
        <rect
          key={i}
          x={cx - 3}
          y={cy - r - 7}
          width={6}
          height={9}
          fill={color}
          transform={`rotate(${(360 / teeth) * i} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={r} fill={EMPTY} stroke={color} strokeWidth={2.5} />
      <circle cx={cx} cy={cy} r={5} fill={color} />
    </g>
  );
}
interface GearRatioProps {
  driverTeeth?: number;
  drivenTeeth?: number;
  label?: string;
  caption?: string;
}
function GearRatio({ driverTeeth = 12, drivenTeeth = 24, label, caption }: GearRatioProps) {
  const cy = 74;
  const r1 = 30;
  const r2 = 46;
  const cx1 = 56;
  const cx2 = cx1 + r1 + r2; // mesh at touching pitch circles
  return (
    <DiagramCard label={label ?? "Gear ratio"}>
      <svg viewBox="0 0 220 150" width="100%" role="img" aria-label={`Two meshing gears, ${driverTeeth} teeth driving ${drivenTeeth} teeth`}>
        <Gear cx={cx1} cy={cy} r={r1} teeth={driverTeeth} color={ORANGE} />
        <Gear cx={cx2} cy={cy} r={r2} teeth={drivenTeeth} color={MUTED} />
        {/* rotation arrows (opposite directions) */}
        <path d={`M ${cx1 - 12} ${cy - r1 - 16} A 16 16 0 0 1 ${cx1 + 12} ${cy - r1 - 16}`} fill="none" stroke={ORANGE} strokeWidth={2} />
        <Arrow x1={cx1 + 8} y1={cy - r1 - 20} x2={cx1 + 14} y2={cy - r1 - 13} width={2} head={5} />
        <path d={`M ${cx2 + 14} ${cy - r2 - 14} A 18 18 0 0 0 ${cx2 - 14} ${cy - r2 - 14}`} fill="none" stroke={MUTED} strokeWidth={2} />
        <Arrow x1={cx2 - 10} y1={cy - r2 - 18} x2={cx2 - 16} y2={cy - r2 - 11} width={2} head={5} color={MUTED} />
        <text x={cx1} y={cy + r1 + 22} fill={INK} fontSize={12} fontWeight={700} textAnchor="middle">{driverTeeth}T</text>
        <text x={cx2} y={cy + r2 + 22} fill={INK} fontSize={12} fontWeight={700} textAnchor="middle">{drivenTeeth}T</text>
      </svg>
      <Caption>{caption ?? `Ratio ${drivenTeeth}:${driverTeeth} → driven turns slower, with more torque`}</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* MC — force-diagram (free body)                                     */
/* ================================================================== */
function ForceDiagram({ label }: { label?: string }) {
  const cx = 120;
  const cy = 92;
  return (
    <DiagramCard label={label ?? "Free-body diagram"}>
      <svg viewBox="0 0 240 176" width="100%" role="img" aria-label="Free-body diagram with weight, normal, applied and friction forces">
        {/* ground */}
        <line x1={20} y1={cy + 20} x2={220} y2={cy + 20} stroke={MUTED} strokeWidth={2} />
        {[40, 64, 88, 112, 136, 160, 184, 208].map((x) => (
          <line key={x} x1={x} y1={cy + 20} x2={x - 8} y2={cy + 28} stroke={TICK} strokeWidth={1.2} />
        ))}
        {/* block */}
        <rect x={cx - 26} y={cy - 20} width={52} height={40} rx={3} fill={EMPTY} stroke={ORANGE} strokeWidth={2} />
        {/* forces */}
        <Arrow x1={cx} y1={cy} x2={cx} y2={cy + 60} />
        <text x={cx + 14} y={cy + 54} fill={INK} fontSize={12} fontWeight={700}>W</text>
        <Arrow x1={cx} y1={cy - 20} x2={cx} y2={cy - 64} />
        <text x={cx + 12} y={cy - 52} fill={INK} fontSize={12} fontWeight={700}>N</text>
        <Arrow x1={cx + 26} y1={cy} x2={cx + 78} y2={cy} />
        <text x={cx + 60} y={cy - 8} fill={INK} fontSize={12} fontWeight={700}>F</text>
        <Arrow x1={cx - 26} y1={cy} x2={cx - 70} y2={cy} color={MUTED} />
        <text x={cx - 58} y={cy - 8} fill={MUTED} fontSize={12} fontWeight={700}>f</text>
      </svg>
      <Caption>Net force = ΣF. Object accelerates in the direction of the unbalanced force.</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* GS — states of matter (physical science)                          */
/* ================================================================== */
function StatesOfMatter({ label }: { label?: string }) {
  const cell = (
    x: number,
    title: string,
    pts: [number, number][],
    caption: string
  ) => (
    <g key={title}>
      <rect x={x} y={20} width={64} height={64} rx={4} fill={EMPTY} stroke={BORDER} strokeWidth={1.5} />
      {pts.map(([px, py], i) => (
        <circle key={i} cx={x + px} cy={20 + py} r={4.5} fill={ORANGE} />
      ))}
      <text x={x + 32} y={14} fill={INK} fontSize={11} fontWeight={700} textAnchor="middle">{title}</text>
      <text x={x + 32} y={98} fill={MUTED} fontSize={8.5} textAnchor="middle">{caption}</text>
    </g>
  );
  const solid: [number, number][] = [];
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++) solid.push([12 + c * 14, 12 + r * 14]);
  const liquid: [number, number][] = [
    [14, 16], [30, 12], [46, 20], [18, 34], [36, 32], [52, 40], [12, 50], [30, 52], [48, 54], [22, 46],
  ];
  const gas: [number, number][] = [[16, 18], [44, 14], [28, 40], [52, 48], [14, 52]];
  return (
    <DiagramCard label={label ?? "States of matter"}>
      <svg viewBox="0 0 240 110" width="100%" role="img" aria-label="Particle arrangement in solids, liquids and gases">
        {cell(8, "Solid", solid, "fixed, packed")}
        {cell(88, "Liquid", liquid, "close, flowing")}
        {cell(168, "Gas", gas, "far apart, fast")}
      </svg>
      <Caption>Same particles, different spacing and energy. Adding heat gives particles energy to spread out: solid → liquid → gas.</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* GS — animal cell (life science)                                    */
/* ================================================================== */
function CellDiagram({ label }: { label?: string }) {
  return (
    <DiagramCard label={label ?? "Animal cell"}>
      <svg viewBox="0 0 240 170" width="100%" role="img" aria-label="Animal cell with membrane, cytoplasm, nucleus and mitochondria">
        <ellipse cx={120} cy={82} rx={104} ry={66} fill={ORANGE_DIM} stroke={ORANGE} strokeWidth={2.5} />
        <circle cx={120} cy={82} r={32} fill={EMPTY} stroke={ORANGE} strokeWidth={2} />
        <circle cx={120} cy={82} r={11} fill={ORANGE} />
        <ellipse cx={62} cy={54} rx={20} ry={11} fill={EMPTY} stroke={MUTED} strokeWidth={1.5} />
        <circle cx={178} cy={114} r={13} fill={EMPTY} stroke={MUTED} strokeWidth={1.5} />
        <text x={120} y={85} fill={INK} fontSize={9} fontWeight={700} textAnchor="middle">nucleus</text>
        <text x={62} y={57} fill={INK} fontSize={8} textAnchor="middle">mito.</text>
        <text x={178} y={117} fill={INK} fontSize={8} textAnchor="middle">vacuole</text>
        <text x={120} y={158} fill={MUTED} fontSize={9} textAnchor="middle">cell membrane (outer boundary)</text>
      </svg>
      <Caption>Nucleus = control center (holds DNA). Mitochondria = energy (ATP). Membrane controls what enters and exits.</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* GS — Earth's layers (earth & space science)                       */
/* ================================================================== */
function EarthLayers({ label }: { label?: string }) {
  const cx = 72, cy = 90;
  const layers = [
    { r: 80, fill: ORANGE_DIM, name: "Crust" },
    { r: 62, fill: "#2f3b52", name: "Mantle" },
    { r: 40, fill: "#b9772e", name: "Outer core" },
    { r: 19, fill: ORANGE, name: "Inner core" },
  ];
  return (
    <DiagramCard label={label ?? "Earth's layers"}>
      <svg viewBox="0 0 240 180" width="100%" role="img" aria-label="Cross-section of Earth: crust, mantle, outer core, inner core">
        {layers.map((l) => (
          <circle key={l.name} cx={cx} cy={cy} r={l.r} fill={l.fill} stroke={BORDER} strokeWidth={1} />
        ))}
        {layers.map((l, i) => (
          <g key={`lbl-${l.name}`}>
            <rect x={158} y={34 + i * 26 - 9} width={11} height={11} rx={2} fill={l.fill} stroke={BORDER} strokeWidth={1} />
            <text x={174} y={34 + i * 26} fill={INK} fontSize={10}>{l.name}</text>
          </g>
        ))}
      </svg>
      <Caption>Crust (thin rock) → mantle (hot solid) → outer core (liquid iron) → inner core (solid iron). The liquid outer core drives Earth's magnetic field.</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* EI — conductors vs. insulators                                    */
/* ================================================================== */
function ConductorInsulator({ label }: { label?: string }) {
  return (
    <DiagramCard label={label ?? "Conductors vs. insulators"}>
      <svg viewBox="0 0 240 110" width="100%" role="img" aria-label="Spectrum from conductors to insulators with example materials">
        <rect x={16} y={18} width={104} height={22} fill={ORANGE} />
        <rect x={120} y={18} width={104} height={22} fill={EMPTY} stroke={BORDER} strokeWidth={1} />
        <text x={68} y={33} fill={KNOB_BG} fontSize={10} fontWeight={700} textAnchor="middle">CONDUCTORS</text>
        <text x={172} y={33} fill={MUTED} fontSize={10} fontWeight={700} textAnchor="middle">INSULATORS</text>
        <text x={68} y={60} fill={INK} fontSize={9} textAnchor="middle">silver · copper · gold</text>
        <text x={172} y={60} fill={INK} fontSize={9} textAnchor="middle">rubber · glass · plastic</text>
        <text x={68} y={82} fill={MUTED} fontSize={8.5} textAnchor="middle">free electrons → current flows</text>
        <text x={172} y={82} fill={MUTED} fontSize={8.5} textAnchor="middle">bound electrons → blocks flow</text>
      </svg>
      <Caption>Conductors let charge move freely; insulators resist it. Most metals conduct; most nonmetals insulate.</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* MK — area model for (a + b)² (exponents & polynomials)            */
/* ================================================================== */
function AreaModel({ label }: { label?: string }) {
  const x0 = 44, y0 = 22, A = 84, B = 48;
  return (
    <DiagramCard label={label ?? "Area model: (a + b)²"}>
      <svg viewBox="0 0 240 176" width="100%" role="img" aria-label="Area model showing (a+b) squared equals a squared plus 2ab plus b squared">
        <rect x={x0} y={y0} width={A} height={A} fill={ORANGE} />
        <rect x={x0 + A} y={y0} width={B} height={A} fill={ORANGE_DIM} stroke={BORDER} />
        <rect x={x0} y={y0 + A} width={A} height={B} fill={ORANGE_DIM} stroke={BORDER} />
        <rect x={x0 + A} y={y0 + A} width={B} height={B} fill={EMPTY} stroke={BORDER} />
        <text x={x0 + A / 2} y={y0 + A / 2 + 5} fill={KNOB_BG} fontSize={14} fontWeight={700} textAnchor="middle">a²</text>
        <text x={x0 + A + B / 2} y={y0 + A / 2 + 4} fill={INK} fontSize={11} textAnchor="middle">ab</text>
        <text x={x0 + A / 2} y={y0 + A + B / 2 + 4} fill={INK} fontSize={11} textAnchor="middle">ab</text>
        <text x={x0 + A + B / 2} y={y0 + A + B / 2 + 4} fill={INK} fontSize={11} textAnchor="middle">b²</text>
        <text x={x0 + A / 2} y={y0 - 7} fill={MUTED} fontSize={10} textAnchor="middle">a</text>
        <text x={x0 + A + B / 2} y={y0 - 7} fill={MUTED} fontSize={10} textAnchor="middle">b</text>
        <text x={x0 - 11} y={y0 + A / 2} fill={MUTED} fontSize={10} textAnchor="middle">a</text>
        <text x={x0 - 11} y={y0 + A + B / 2} fill={MUTED} fontSize={10} textAnchor="middle">b</text>
      </svg>
      <Caption>(a + b)² = a² + 2ab + b². The two ab rectangles are why the middle term is 2ab, not just ab.</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* MK — slope-intercept line (linear algebra)                        */
/* ================================================================== */
function LinearGraph({ label }: { label?: string }) {
  const cx = 40, cy = 150, u = 22;
  const gx = (x: number) => cx + x * u;
  const gy = (y: number) => cy - y * u;
  const m = 1, b = 1;
  return (
    <DiagramCard label={label ?? "Slope-intercept: y = mx + b"}>
      <svg viewBox="0 0 240 180" width="100%" role="img" aria-label="Line y equals m x plus b showing slope as rise over run and the y-intercept">
        <line x1={cx} y1={18} x2={cx} y2={166} stroke={BORDER} strokeWidth={1.5} />
        <line x1={18} y1={cy} x2={224} y2={cy} stroke={BORDER} strokeWidth={1.5} />
        <line x1={gx(-0.3)} y1={gy(m * -0.3 + b)} x2={gx(5)} y2={gy(m * 5 + b)} stroke={ORANGE} strokeWidth={2.5} />
        <circle cx={gx(0)} cy={gy(b)} r={4} fill={ORANGE} />
        <text x={gx(0) - 7} y={gy(b) - 7} fill={INK} fontSize={9} textAnchor="end">b (y-intercept)</text>
        <line x1={gx(2)} y1={gy(m * 2 + b)} x2={gx(4)} y2={gy(m * 2 + b)} stroke={MUTED} strokeWidth={1.5} strokeDasharray="3 2" />
        <line x1={gx(4)} y1={gy(m * 2 + b)} x2={gx(4)} y2={gy(m * 4 + b)} stroke={MUTED} strokeWidth={1.5} strokeDasharray="3 2" />
        <text x={gx(3)} y={gy(m * 2 + b) + 12} fill={MUTED} fontSize={8.5} textAnchor="middle">run</text>
        <text x={gx(4) + 13} y={gy(m * 3 + b) + 3} fill={MUTED} fontSize={8.5} textAnchor="middle">rise</text>
      </svg>
      <Caption>Slope m = rise ÷ run (steepness). b = where the line crosses the y-axis. Positive m rises left → right.</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* AO — isometric cube helper                                         */
/* ================================================================== */
function IsoCube({ x, y, s = 18 }: { x: number; y: number; s?: number }) {
  return (
    <g stroke={KNOB_BG} strokeWidth={1} strokeLinejoin="round">
      <polygon points={`${x},${y} ${x + s},${y + s / 2} ${x},${y + s} ${x - s},${y + s / 2}`} fill={ORANGE} />
      <polygon points={`${x - s},${y + s / 2} ${x},${y + s} ${x},${y + 2 * s} ${x - s},${y + 1.5 * s}`} fill="#8f4116" />
      <polygon points={`${x + s},${y + s / 2} ${x},${y + s} ${x},${y + 2 * s} ${x + s},${y + 1.5 * s}`} fill="#c75e1f" />
    </g>
  );
}

/* ================================================================== */
/* AO — paper folding (net → solid)                                  */
/* ================================================================== */
function PaperFoldingNet({ label }: { label?: string }) {
  const u = 24, ox = 28, oy = 26;
  const cells: [number, number][] = [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2], [1, 3]];
  return (
    <DiagramCard label={label ?? "Paper folding: net → solid"}>
      <svg viewBox="0 0 240 150" width="100%" role="img" aria-label="A flat six-square net folds into a cube">
        {cells.map(([c, r], i) => (
          <rect key={i} x={ox + c * u} y={oy + r * u} width={u} height={u} fill={i === 0 ? ORANGE : ORANGE_DIM} stroke={ORANGE} strokeWidth={1.5} />
        ))}
        <text x={ox + 1.5 * u} y={oy + 4 * u + 14} fill={MUTED} fontSize={9} textAnchor="middle">flat net (6 faces)</text>
        <Arrow x1={150} y1={72} x2={178} y2={72} />
        <g transform="translate(196,54)">
          <polygon points="0,8 18,-2 36,8 18,18" fill={ORANGE} stroke={KNOB_BG} strokeWidth={1} />
          <polygon points="0,8 18,18 18,40 0,30" fill="#8f4116" stroke={KNOB_BG} strokeWidth={1} />
          <polygon points="36,8 18,18 18,40 36,30" fill="#c75e1f" stroke={KNOB_BG} strokeWidth={1} />
        </g>
        <text x={214} y={112} fill={MUTED} fontSize={9} textAnchor="middle">cube</text>
      </svg>
      <Caption>Fold the net mentally: the shaded square is the base; the four around it become the walls. Opposite faces never touch.</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* AO — counting cubes (hidden cubes)                                */
/* ================================================================== */
function CubeStack({ label }: { label?: string }) {
  const s = 18, ox = 112, oy = 44;
  const pos = (col: number, row: number, lvl: number): [number, number] => [
    ox + (col - row) * s,
    oy + (col + row) * (s / 2) - lvl * s,
  ];
  const cubes: [number, number, number][] = [
    [0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1],
  ];
  const ordered = [...cubes].sort((a, b) => a[0] + a[1] - (b[0] + b[1]) || a[2] - b[2]);
  return (
    <DiagramCard label={label ?? "Counting cubes"}>
      <svg viewBox="0 0 240 150" width="100%" role="img" aria-label="A stack of cubes to count, including hidden ones">
        {ordered.map(([c, r, l], i) => {
          const [x, y] = pos(c, r, l);
          return <IsoCube key={i} x={x} y={y} s={s} />;
        })}
        <text x={120} y={138} fill={MUTED} fontSize={8} textAnchor="middle">count cubes you can see, plus hidden ones</text>
      </svg>
      <Caption>Work layer by layer. A cube that supports another must exist even when you can't fully see it.</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* AO — three orthographic views                                     */
/* ================================================================== */
function OrthographicViews({ label }: { label?: string }) {
  return (
    <DiagramCard label={label ?? "3-D object: three views"}>
      <svg viewBox="0 0 240 140" width="100%" role="img" aria-label="An isometric object shown as front, top and side views">
        <g transform="translate(44,46)">
          <IsoCube x={0} y={0} s={18} />
          <IsoCube x={0} y={-36} s={18} />
        </g>
        <Arrow x1={94} y1={58} x2={118} y2={58} />
        {[
          { x: 134, y: 26, w: 18, h: 36, t: "Front" },
          { x: 170, y: 26, w: 18, h: 18, t: "Top" },
          { x: 206, y: 26, w: 18, h: 36, t: "Side" },
        ].map((v) => (
          <g key={v.t}>
            <rect x={v.x} y={v.y} width={v.w} height={v.h} fill={ORANGE_DIM} stroke={ORANGE} strokeWidth={1.5} />
            <text x={v.x + v.w / 2} y={v.y + v.h + 12} fill={INK} fontSize={9} textAnchor="middle">{v.t}</text>
          </g>
        ))}
      </svg>
      <Caption>One 3-D shape projects to different 2-D outlines from the front, top, and side. Match each flat view back to the solid.</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* AO — pattern assembly                                             */
/* ================================================================== */
function PatternAssembly({ label }: { label?: string }) {
  return (
    <DiagramCard label={label ?? "Pattern assembly"}>
      <svg viewBox="0 0 240 110" width="100%" role="img" aria-label="Two right triangles combine to form a square">
        <polygon points="20,20 20,72 72,72" fill={ORANGE} stroke={KNOB_BG} strokeWidth={1} />
        <text x={88} y={52} fill={MUTED} fontSize={15} textAnchor="middle">+</text>
        <polygon points="104,72 156,72 156,20" fill={ORANGE_DIM} stroke={ORANGE} strokeWidth={1.5} />
        <text x={172} y={52} fill={MUTED} fontSize={15} textAnchor="middle">=</text>
        <rect x={188} y={20} width={52} height={52} fill={ORANGE_DIM} stroke={ORANGE} strokeWidth={1.5} />
        <line x1={188} y1={72} x2={240} y2={20} stroke={ORANGE} strokeWidth={1} />
        <text x={214} y={92} fill={MUTED} fontSize={9} textAnchor="middle">square</text>
      </svg>
      <Caption>Rotate and flip pieces in your head. Two equal right triangles join along the long edge to make a square.</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* AS — common hand tools                                            */
/* ================================================================== */
function HandTools({ label }: { label?: string }) {
  return (
    <DiagramCard label={label ?? "Common hand tools"}>
      <svg viewBox="0 0 240 110" width="100%" role="img" aria-label="Screwdriver, wrench and pliers">
        <g>
          <rect x={24} y={22} width={10} height={26} rx={3} fill={ORANGE} />
          <rect x={27} y={46} width={4} height={28} fill={MUTED} />
          <text x={29} y={92} fill={INK} fontSize={9} textAnchor="middle">screwdriver</text>
        </g>
        <g transform="translate(96,30)">
          <rect x={0} y={18} width={40} height={7} rx={3} fill={MUTED} />
          <circle cx={44} cy={21} r={11} fill="none" stroke={ORANGE} strokeWidth={6} />
          <text x={26} y={62} fill={INK} fontSize={9} textAnchor="middle">wrench</text>
        </g>
        <g transform="translate(176,20)">
          <line x1={6} y1={50} x2={22} y2={10} stroke={MUTED} strokeWidth={5} strokeLinecap="round" />
          <line x1={38} y1={50} x2={22} y2={10} stroke={ORANGE} strokeWidth={5} strokeLinecap="round" />
          <line x1={22} y1={10} x2={22} y2={3} stroke={MUTED} strokeWidth={3} strokeLinecap="round" />
          <text x={22} y={72} fill={INK} fontSize={9} textAnchor="middle">pliers</text>
        </g>
      </svg>
      <Caption>Know each tool's job: screwdriver turns screws, a wrench turns bolts and nuts, pliers grip and cut.</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* AS — four-stroke engine cycle                                     */
/* ================================================================== */
function FourStroke({ label }: { label?: string }) {
  const strokes = [
    { t: "Intake", py: 32, d: "fuel + air in" },
    { t: "Compress", py: 16, d: "piston up" },
    { t: "Power", py: 16, d: "spark fires" },
    { t: "Exhaust", py: 32, d: "gases out" },
  ];
  return (
    <DiagramCard label={label ?? "Four-stroke engine cycle"}>
      <svg viewBox="0 0 240 120" width="100%" role="img" aria-label="The four strokes of an engine: intake, compression, power, exhaust">
        {strokes.map((s, i) => {
          const x = 14 + i * 58;
          return (
            <g key={s.t}>
              <rect x={x} y={10} width={40} height={56} rx={3} fill={EMPTY} stroke={BORDER} strokeWidth={1.5} />
              <rect x={x + 4} y={s.py} width={32} height={14} rx={2} fill={ORANGE} />
              <line x1={x + 20} y1={s.py + 14} x2={x + 20} y2={64} stroke={MUTED} strokeWidth={2.5} />
              <text x={x + 20} y={82} fill={INK} fontSize={9} fontWeight={700} textAnchor="middle">{i + 1}. {s.t}</text>
              <text x={x + 20} y={94} fill={MUTED} fontSize={7.5} textAnchor="middle">{s.d}</text>
            </g>
          );
        })}
      </svg>
      <Caption>&quot;Suck, squeeze, bang, blow.&quot; Intake → compression → power → exhaust, repeating every two crankshaft turns.</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* AS — disc brake                                                   */
/* ================================================================== */
function DiscBrake({ label }: { label?: string }) {
  const cx = 88, cy = 66;
  return (
    <DiagramCard label={label ?? "Disc brake"}>
      <svg viewBox="0 0 240 128" width="100%" role="img" aria-label="Disc brake: rotor, caliper and brake pads">
        <circle cx={cx} cy={cy} r={46} fill={EMPTY} stroke={MUTED} strokeWidth={2} />
        <circle cx={cx} cy={cy} r={14} fill={ORANGE_DIM} stroke={ORANGE} strokeWidth={2} />
        <rect x={cx - 16} y={cy - 58} width={32} height={26} rx={4} fill={ORANGE} stroke={KNOB_BG} strokeWidth={1} />
        <rect x={cx - 14} y={cy - 34} width={28} height={5} fill={MUTED} />
        <text x={cx} y={cy + 4} fill={INK} fontSize={8} textAnchor="middle">hub</text>
        <line x1={cx + 12} y1={cy - 46} x2={170} y2={26} stroke={TICK} strokeWidth={1} />
        <text x={174} y={29} fill={INK} fontSize={9}>caliper</text>
        <line x1={cx + 34} y1={cy + 8} x2={170} y2={66} stroke={TICK} strokeWidth={1} />
        <text x={174} y={69} fill={INK} fontSize={9}>rotor (disc)</text>
        <line x1={cx} y1={cy - 31} x2={150} y2={104} stroke={TICK} strokeWidth={1} />
        <text x={154} y={107} fill={INK} fontSize={9}>pads</text>
      </svg>
      <Caption>The caliper squeezes the pads against the spinning rotor; friction slows the wheel. Worn pads mean longer stops.</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* AS — shop safety (PPE)                                            */
/* ================================================================== */
function ShopSafety({ label }: { label?: string }) {
  return (
    <DiagramCard label={label ?? "Shop safety: PPE"}>
      <svg viewBox="0 0 240 110" width="100%" role="img" aria-label="Personal protective equipment: safety glasses, gloves, hearing protection">
        <g transform="translate(20,30)">
          <circle cx={10} cy={16} r={10} fill={ORANGE_DIM} stroke={ORANGE} strokeWidth={2} />
          <circle cx={34} cy={16} r={10} fill={ORANGE_DIM} stroke={ORANGE} strokeWidth={2} />
          <line x1={20} y1={16} x2={24} y2={16} stroke={ORANGE} strokeWidth={2} />
          <text x={22} y={48} fill={INK} fontSize={8.5} textAnchor="middle">eye protection</text>
        </g>
        <g transform="translate(104,22)">
          <rect x={4} y={14} width={24} height={26} rx={4} fill={ORANGE} />
          <rect x={6} y={2} width={4} height={16} rx={2} fill={ORANGE} />
          <rect x={12} y={-1} width={4} height={18} rx={2} fill={ORANGE} />
          <rect x={18} y={2} width={4} height={16} rx={2} fill={ORANGE} />
          <rect x={28} y={18} width={6} height={5} rx={2} fill={ORANGE} />
          <text x={18} y={58} fill={INK} fontSize={8.5} textAnchor="middle">gloves</text>
        </g>
        <g transform="translate(182,24)">
          <path d="M4,14 a18,18 0 0 1 36,0" fill="none" stroke={MUTED} strokeWidth={3} />
          <rect x={0} y={12} width={10} height={20} rx={3} fill={ORANGE} />
          <rect x={34} y={12} width={10} height={20} rx={3} fill={ORANGE} />
          <text x={22} y={52} fill={INK} fontSize={8.5} textAnchor="middle">hearing</text>
        </g>
      </svg>
      <Caption>Match the hazard to the gear: eye protection for grinding, gloves for sharp or hot parts, ear protection for loud tools.</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* registry + dispatcher                                              */
/* ================================================================== */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const REGISTRY: Record<string, (props: any) => ReactNode> = {
  "fraction-bar": (p) => <FractionBarInteractive {...p} />,
  "fraction-bar-static": (p) => <FractionBar {...p} />,
  "number-line": (p) => <NumberLineInteractive {...p} />,
  "number-line-static": (p) => <NumberLine {...p} />,
  "ohms-law-triangle": (p) => <OhmsLawTriangleInteractive {...p} />,
  "ohms-law-triangle-static": (p) => <OhmsLawTriangle {...p} />,
  circuit: (p) => <Circuit {...p} />,
  "circuit-interactive": (p) => <CircuitInteractive {...p} />,
  lever: (p) => <LeverInteractive {...p} />,
  "lever-static": (p) => <Lever {...p} />,
  pulley: (p) => <Pulley {...p} />,
  "pulley-system": (p) => <PulleySystemInteractive {...p} />,
  "inclined-plane": (p) => <InclinedPlaneInteractive {...p} />,
  hydraulics: (p) => <HydraulicsInteractive {...p} />,
  "buzzword-map": (p) => <BuzzwordMapInteractive {...p} />,
  "gear-ratio": (p) => <GearRatioInteractive {...p} />,
  "gear-ratio-static": (p) => <GearRatio {...p} />,
  "right-triangle": (p) => <RightTriangleInteractive {...p} />,
  "force-diagram": (p) => <ForceDiagram {...p} />,
  "states-of-matter": (p) => <StatesOfMatter {...p} />,
  "cell-diagram": (p) => <CellDiagram {...p} />,
  "earth-layers": (p) => <EarthLayers {...p} />,
  "conductor-insulator": (p) => <ConductorInsulator {...p} />,
  "area-model": (p) => <AreaModel {...p} />,
  "linear-graph": (p) => <LinearGraph {...p} />,
  "paper-folding-net": (p) => <PaperFoldingNet {...p} />,
  "cube-stack": (p) => <CubeStack {...p} />,
  "orthographic-views": (p) => <OrthographicViews {...p} />,
  "pattern-assembly": (p) => <PatternAssembly {...p} />,
  "hand-tools": (p) => <HandTools {...p} />,
  "four-stroke": (p) => <FourStroke {...p} />,
  "disc-brake": (p) => <DiscBrake {...p} />,
  "shop-safety": (p) => <ShopSafety {...p} />,
};

export const DIAGRAM_TYPES = Object.keys(REGISTRY);

export function Diagram({
  type,
  props,
  topicId,
  subtest,
}: {
  type: string;
  props?: Record<string, unknown>;
  topicId?: string;
  subtest?: string;
}) {
  const render = REGISTRY[type];
  if (!render) return null;
  // topicId/subtest/diagramType power the interactive quiz → practice tie-in
  // and end-to-end attribution from a diagram interaction to the funnel.
  return <>{render({ ...(props ?? {}), context: { topicId, subtest, diagramType: type } })}</>;
}
