import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import {
  calculateAFQT,
  getAFQTCategory,
  getAFQTCategoryDescription,
} from "@asvab-hero/domain/scoring";
import type { SubtestScores } from "@asvab-hero/domain/types";
import { colors } from "@asvab-hero/ui-tokens/colors";
import { fontSize, fontWeight } from "@asvab-hero/ui-tokens/typography";
import { spacing, radius } from "@asvab-hero/ui-tokens/spacing";

const AFQT_SUBTESTS = ["AR", "MK", "WK", "PC"] as const;
const DEFAULT_SCORES: SubtestScores = {
  GS: 50, AR: 50, WK: 50, PC: 50, MK: 50, EI: 50, AS: 50, MC: 50, AO: 50,
};

export default function CalculatorScreen() {
  const [scores, setScores] = useState<SubtestScores>({ ...DEFAULT_SCORES });

  const afqt = calculateAFQT(scores);
  const category = getAFQTCategory(afqt);

  const updateScore = (subtest: keyof SubtestScores, text: string) => {
    const num = Math.min(99, Math.max(20, parseInt(text, 10) || 20));
    setScores((prev) => ({ ...prev, [subtest]: num }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AFQT Calculator</Text>
      <Text style={styles.subtitle}>Enter your four AFQT subtest scores</Text>

      <View style={styles.inputs}>
        {AFQT_SUBTESTS.map((st) => (
          <View key={st} style={styles.inputRow}>
            <Text style={styles.inputLabel}>{st}</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={String(scores[st])}
              onChangeText={(t) => updateScore(st, t)}
              maxLength={2}
              placeholderTextColor={colors.textMuted}
            />
          </View>
        ))}
      </View>

      <View style={styles.result}>
        <Text style={styles.resultLabel}>AFQT Percentile</Text>
        <Text style={styles.resultValue}>{afqt}</Text>
        <Text style={styles.resultCategory}>
          Category {category} — {getAFQTCategoryDescription(category)}
        </Text>
      </View>

      <Pressable
        style={styles.resetButton}
        onPress={() => setScores({ ...DEFAULT_SCORES })}
      >
        <Text style={styles.resetButtonText}>Reset</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing[6], backgroundColor: colors.navy },
  title: {
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.extrabold,
    color: colors.textPrimary,
    marginTop: spacing[12],
  },
  subtitle: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    marginTop: spacing[2],
    marginBottom: spacing[6],
  },
  inputs: { gap: spacing[3] },
  inputRow: { flexDirection: "row", alignItems: "center", gap: spacing[3] },
  inputLabel: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    width: 32,
  },
  input: {
    flex: 1,
    backgroundColor: colors.navyCard,
    borderRadius: radius.md,
    padding: spacing[3],
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  result: {
    backgroundColor: colors.navyCard,
    borderRadius: radius.lg,
    padding: spacing[5],
    marginTop: spacing[6],
    alignItems: "center",
  },
  resultLabel: { fontSize: fontSize.sm, color: colors.textSecondary },
  resultValue: {
    fontSize: fontSize["5xl"],
    fontWeight: fontWeight.extrabold,
    color: colors.accent,
    marginTop: spacing[1],
  },
  resultCategory: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing[2],
    textAlign: "center",
  },
  resetButton: {
    backgroundColor: colors.navyCard,
    borderRadius: radius.md,
    padding: spacing[4],
    marginTop: spacing[4],
    alignItems: "center",
  },
  resetButtonText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
});
