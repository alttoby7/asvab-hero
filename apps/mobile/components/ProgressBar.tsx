import { View, Pressable, StyleSheet } from "react-native";
import { colors } from "@asvab-hero/ui-tokens/colors";
import { spacing } from "@asvab-hero/ui-tokens/spacing";

interface ProgressBarProps {
  total: number;
  currentIndex: number;
  answeredSet: Set<number>;
  onJumpTo: (index: number) => void;
}

export default function ProgressBar({
  total,
  currentIndex,
  answeredSet,
  onJumpTo,
}: ProgressBarProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }, (_, i) => {
        const isCurrent = i === currentIndex;
        const isAnswered = answeredSet.has(i);
        return (
          <Pressable key={i} onPress={() => onJumpTo(i)} hitSlop={4}>
            <View
              style={[
                styles.dot,
                isAnswered && styles.dotAnswered,
                isCurrent && styles.dotCurrent,
              ]}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[1],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.navyLighter,
  },
  dotAnswered: {
    backgroundColor: colors.success,
  },
  dotCurrent: {
    backgroundColor: colors.accent,
    transform: [{ scale: 1.3 }],
  },
});
