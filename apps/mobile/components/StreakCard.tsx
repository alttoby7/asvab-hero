import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@asvab-hero/ui-tokens/colors";
import { fontSize, fontWeight } from "@asvab-hero/ui-tokens/typography";
import { spacing, radius } from "@asvab-hero/ui-tokens/spacing";

interface Props {
  streakCount: number;
}

export default function StreakCard({ streakCount }: Props) {
  if (streakCount <= 0) return null;

  return (
    <View style={styles.card}>
      <Ionicons name="flame" size={28} color={colors.accent} />
      <View style={styles.textCol}>
        <Text style={styles.count}>{streakCount}-day streak</Text>
        <Text style={styles.sub}>Keep it going!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.navyCard,
    borderRadius: radius.lg,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: colors.navyBorder,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
  },
  textCol: {
    flex: 1,
  },
  count: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  sub: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
