import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type QuestionProps = {
  subtest: string;
  hook: string;
  stem: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  /** filename in public/ to play (e.g. "bed.mp3" or "voiceover.mp3"); null = silent */
  audioSrc: string | null;
};

// ---- Timeline (frames @ 30fps) ----
const HOOK_END = 75; // 0.0 - 2.5s  hook
const COUNTDOWN_START = 165; // 5.5s  countdown begins
const REVEAL = 255; // 8.5s  answer reveals
const EXPLAIN_START = 405; // 13.5s explanation panel
const CTA_START = 540; // 18.0s end card

const NAVY = "#0a0f1e";
const NAVY2 = "#111a30";
const EMERALD = "#10b981";
const EMERALD_DK = "#065f46";
const INK = "#e8eef6";
const MUTE = "#8aa0bd";
const FONT =
  "'Inter','Helvetica Neue',Helvetica,Arial,system-ui,sans-serif";

const letters = ["A", "B", "C", "D"];

const fade = (frame: number, start: number, dur = 12) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const QuestionShort: React.FC<QuestionProps> = ({
  subtest,
  hook,
  stem,
  choices,
  correctIndex,
  explanation,
  audioSrc,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const revealed = frame >= REVEAL;
  const showCountdown = frame >= COUNTDOWN_START && frame < REVEAL;
  const countNum = Math.max(1, 3 - Math.floor((frame - COUNTDOWN_START) / 30));

  const hookPop = spring({ frame, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 80% at 50% 0%, ${NAVY2} 0%, ${NAVY} 60%)`,
        fontFamily: FONT,
        color: INK,
      }}
    >
      {audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}

      {/* brand bar */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 14,
          letterSpacing: 4,
          fontWeight: 800,
          fontSize: 34,
        }}
      >
        <span style={{ color: EMERALD }}>★</span>
        <span>ASVAB HERO</span>
      </div>

      {/* subtest pill */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: EMERALD_DK,
            color: "#d1fae5",
            padding: "12px 28px",
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 30,
            border: `2px solid ${EMERALD}`,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          {subtest}
        </div>
      </div>

      {/* HOOK */}
      {frame < REVEAL && (
        <div
          style={{
            position: "absolute",
            top: 250,
            left: 70,
            right: 70,
            textAlign: "center",
            opacity: frame < HOOK_END ? hookPop : fade(frame, HOOK_END, 8),
            transform:
              frame < HOOK_END ? `scale(${0.9 + hookPop * 0.1})` : "none",
            fontWeight: 900,
            fontSize: frame < HOOK_END ? 78 : 50,
            lineHeight: 1.05,
            color: frame < HOOK_END ? "#fff" : MUTE,
            transition: "none",
          }}
        >
          {frame < HOOK_END ? hook : "Can you get it right?"}
        </div>
      )}

      {/* QUESTION + CHOICES */}
      <div
        style={{
          position: "absolute",
          top: 430,
          left: 70,
          right: 70,
          opacity: fade(frame, HOOK_END),
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 28,
            padding: "44px 44px",
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.25,
            marginBottom: 44,
          }}
        >
          {stem}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          {choices.map((c, i) => {
            const isCorrect = i === correctIndex;
            const correctStyle = revealed && isCorrect;
            const dimWrong = revealed && !isCorrect;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 26,
                  background: correctStyle
                    ? EMERALD
                    : "rgba(255,255,255,0.06)",
                  border: correctStyle
                    ? `3px solid #6ee7b7`
                    : "2px solid rgba(255,255,255,0.12)",
                  borderRadius: 22,
                  padding: "30px 34px",
                  fontSize: 50,
                  fontWeight: 700,
                  color: correctStyle ? "#04261b" : INK,
                  opacity: dimWrong ? 0.32 : 1,
                  boxShadow: correctStyle
                    ? "0 0 60px rgba(16,185,129,0.55)"
                    : "none",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: correctStyle
                      ? "#04261b"
                      : "rgba(255,255,255,0.1)",
                    color: correctStyle ? "#6ee7b7" : MUTE,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    flexShrink: 0,
                  }}
                >
                  {letters[i]}
                </div>
                <div>{c}</div>
                {correctStyle && (
                  <div style={{ marginLeft: "auto", fontSize: 56 }}>✓</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* COUNTDOWN */}
      {showCountdown && (
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 220,
          }}
        >
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: 999,
              border: `8px solid ${EMERALD}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 120,
              fontWeight: 900,
              color: "#fff",
              background: "rgba(10,15,30,0.7)",
              transform: `scale(${1 + ((frame - COUNTDOWN_START) % 30) / 90})`,
              opacity: 1 - (((frame - COUNTDOWN_START) % 30) / 30) * 0.4,
            }}
          >
            {countNum}
          </div>
        </AbsoluteFill>
      )}

      {/* EXPLANATION */}
      {frame >= EXPLAIN_START && frame < CTA_START && (
        <div
          style={{
            position: "absolute",
            bottom: 160,
            left: 70,
            right: 70,
            background: "rgba(16,185,129,0.12)",
            border: `2px solid ${EMERALD}`,
            borderRadius: 24,
            padding: "36px 40px",
            opacity: fade(frame, EXPLAIN_START),
          }}
        >
          <div
            style={{
              color: EMERALD,
              fontWeight: 800,
              fontSize: 32,
              letterSpacing: 2,
              marginBottom: 12,
            }}
          >
            WHY
          </div>
          <div style={{ fontSize: 46, fontWeight: 600, lineHeight: 1.25 }}>
            {explanation}
          </div>
        </div>
      )}

      {/* CTA END CARD */}
      {frame >= CTA_START && (
        <AbsoluteFill
          style={{
            background: `linear-gradient(180deg, ${NAVY} 0%, ${EMERALD_DK} 100%)`,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: 90,
            opacity: fade(frame, CTA_START, 10),
          }}
        >
          <div style={{ fontSize: 40, color: "#6ee7b7", fontWeight: 800, letterSpacing: 3 }}>
            ★ ASVAB HERO
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 900,
              lineHeight: 1.05,
              margin: "30px 0",
            }}
          >
            Practice 4,500+ questions FREE
          </div>
          <div style={{ fontSize: 54, color: INK, fontWeight: 600 }}>
            Know your score before test day.
          </div>
          <div
            style={{
              marginTop: 70,
              fontSize: 48,
              fontWeight: 800,
              color: "#6ee7b7",
            }}
          >
            Link in bio 👆
          </div>
        </AbsoluteFill>
      )}

      {/* progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 10,
          width: `${(frame / durationInFrames) * 100}%`,
          background: EMERALD,
        }}
      />
    </AbsoluteFill>
  );
};
