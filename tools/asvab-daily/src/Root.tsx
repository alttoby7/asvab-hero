import { Composition, staticFile } from "remotion";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { QuestionShort, type QuestionProps } from "./QuestionShort";

const FPS = 30;
// Fixed visual timeline length (frames) when there is no voiceover.
const SILENT_FRAMES = 615; // 20.5s

const defaultProps: QuestionProps = {
  subtest: "Arithmetic Reasoning",
  hook: "Most future soldiers miss this ASVAB question.",
  stem: "A car travels 150 miles on 6 gallons of gas. How many miles per gallon does it get?",
  choices: ["20 mpg", "25 mpg", "30 mpg", "15 mpg"],
  correctIndex: 1,
  explanation: "Divide miles by gallons: 150 / 6 = 25 miles per gallon.",
  hasAudio: false,
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="QuestionShort"
      component={QuestionShort}
      durationInFrames={SILENT_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
      defaultProps={defaultProps}
      calculateMetadata={async ({ props }) => {
        if (!props.hasAudio) {
          return { durationInFrames: SILENT_FRAMES, fps: FPS };
        }
        const seconds = await getAudioDurationInSeconds(
          staticFile("voiceover.mp3"),
        );
        return {
          durationInFrames: Math.ceil((seconds + 0.8) * FPS),
          fps: FPS,
        };
      }}
    />
  );
};
