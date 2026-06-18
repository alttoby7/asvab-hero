import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import {
  calculateAFQT,
  getAFQTCategory,
  getAFQTCategoryDescription,
} from "@asvab-hero/domain/scoring";
import type { SubtestScores } from "@asvab-hero/domain/types";

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
              placeholderTextColor="#6b7280"
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
  container: { flex: 1, padding: 24, backgroundColor: "#0a1628" },
  title: { fontSize: 28, fontWeight: "800", color: "#ffffff", marginTop: 48 },
  subtitle: { fontSize: 16, color: "#94a3b8", marginTop: 8, marginBottom: 24 },
  inputs: { gap: 12 },
  inputRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  inputLabel: { fontSize: 16, fontWeight: "600", color: "#ffffff", width: 32 },
  input: {
    flex: 1,
    backgroundColor: "#1e293b",
    borderRadius: 8,
    padding: 12,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  result: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
    alignItems: "center",
  },
  resultLabel: { fontSize: 14, color: "#94a3b8" },
  resultValue: { fontSize: 48, fontWeight: "800", color: "#3b82f6", marginTop: 4 },
  resultCategory: { fontSize: 14, color: "#94a3b8", marginTop: 8, textAlign: "center" },
  resetButton: {
    backgroundColor: "#1e293b",
    borderRadius: 8,
    padding: 14,
    marginTop: 16,
    alignItems: "center",
  },
  resetButtonText: { color: "#94a3b8", fontSize: 14, fontWeight: "600" },
});
