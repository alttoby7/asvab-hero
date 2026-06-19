import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { colors } from "@asvab-hero/ui-tokens/colors";
import { fontSize, fontWeight } from "@asvab-hero/ui-tokens/typography";
import { spacing, radius } from "@asvab-hero/ui-tokens/spacing";
import type { PracticeQuestion, UserAnswer } from "@asvab-hero/domain/types";
import { SUBTEST_NAMES } from "@asvab-hero/domain/types";
import { scoreBySubtest, estimateAFQT } from "@asvab-hero/domain/scoring";

interface ResultsScreenProps {
  questions: PracticeQuestion[];
  answers: UserAnswer[];
  onRetake: () => void;
  onContinue?: () => void;
  embedded?: boolean;
}

export default function ResultsScreen({
  questions,
  answers,
  onRetake,
  onContinue,
  embedded,
}: ResultsScreenProps) {
  const subtestResults = scoreBySubtest(questions, answers);
  const afqtEstimate = estimateAFQT(subtestResults);
  const totalCorrect = answers.filter((a) => {
    const q = questions.find((q) => q.id === a.questionId);
    return q && a.selectedIndex === q.correctIndex;
  }).length;
  const percentage = Math.round((totalCorrect / questions.length) * 100);

  function getBarColor(pct: number) {
    if (pct >= 80) return colors.success;
    if (pct >= 50) return colors.warning;
    return colors.danger;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.scoreCircle}>
        <Text style={styles.scorePercent}>{percentage}%</Text>
        <Text style={styles.scoreLabel}>
          {totalCorrect}/{questions.length} correct
        </Text>
      </View>

      {afqtEstimate !== null && (
        <View style={styles.afqtCard}>
          <Text style={styles.afqtLabel}>Estimated AFQT</Text>
          <Text style={styles.afqtScore}>{afqtEstimate.score}</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Subtest Breakdown</Text>
      {subtestResults.map((sr) => (
        <View key={sr.subtest} style={styles.subtestRow}>
          <View style={styles.subtestHeader}>
            <Text style={styles.subtestName}>
              {SUBTEST_NAMES[sr.subtest] ?? sr.subtest}
            </Text>
            <Text style={styles.subtestScore}>
              {sr.correct}/{sr.total} ({sr.percentage}%)
            </Text>
          </View>
          <View style={styles.barTrack}>
            <View
              style={[
                styles.barFill,
                {
                  width: `${sr.percentage}%`,
                  backgroundColor: getBarColor(sr.percentage),
                },
              ]}
            />
          </View>
        </View>
      ))}

      <View style={styles.actions}>
        {embedded && onContinue ? (
          <Pressable style={styles.primaryButton} onPress={onContinue}>
            <Text style={styles.primaryText}>Continue</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.primaryButton} onPress={onRetake}>
            <Text style={styles.primaryText}>Retake</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy },
  content: { padding: spacing[6], paddingBottom: spacing[12] },
  scoreCircle: {
    alignItems: "center",
    justifyContent: "center",
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: colors.accent,
    alignSelf: "center",
    marginBottom: spacing[6],
  },
  scorePercent: {
    fontSize: fontSize["4xl"],
    fontWeight: fontWeight.extrabold,
    color: colors.textPrimary,
  },
  scoreLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing[1],
  },
  afqtCard: {
    backgroundColor: colors.navyCard,
    borderRadius: radius.lg,
    padding: spacing[4],
    alignItems: "center",
    marginBottom: spacing[6],
    borderWidth: 1,
    borderColor: colors.accent,
  },
  afqtLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing[1],
  },
  afqtScore: {
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.extrabold,
    color: colors.accent,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing[4],
  },
  subtestRow: {
    marginBottom: spacing[3],
  },
  subtestHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing[1],
  },
  subtestName: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  subtestScore: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontVariant: ["tabular-nums"],
  },
  barTrack: {
    height: 6,
    backgroundColor: colors.navyLighter,
    borderRadius: 3,
    overflow: "hidden",
  },
  barFill: {
    height: 6,
    borderRadius: 3,
  },
  actions: {
    marginTop: spacing[8],
    gap: spacing[3],
  },
  primaryButton: {
    paddingVertical: spacing[4],
    backgroundColor: colors.accent,
    borderRadius: radius.lg,
    alignItems: "center",
  },
  primaryText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.navy,
  },
});
