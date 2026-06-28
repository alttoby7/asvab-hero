import { useEffect, useRef, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { colors } from "@asvab-hero/ui-tokens/colors";
import { fontSize, fontWeight } from "@asvab-hero/ui-tokens/typography";

interface TimerProps {
  totalSeconds: number;
  startTime: number;
  onTimeUp: () => void;
}

export default function Timer({ totalSeconds, startTime, onTimeUp }: TimerProps) {
  const [remaining, setRemaining] = useState(totalSeconds);
  const firedRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const left = Math.max(0, totalSeconds - elapsed);
      setRemaining(left);
      if (left <= 0 && !firedRef.current) {
        firedRef.current = true;
        onTimeUp();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [totalSeconds, startTime, onTimeUp]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const isLow = remaining <= 60;

  return (
    <Text style={[styles.timer, isLow && styles.timerLow]}>
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </Text>
  );
}

const styles = StyleSheet.create({
  timer: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textSecondary,
    fontVariant: ["tabular-nums"],
    textAlign: "center",
  },
  timerLow: {
    color: colors.danger,
  },
});
