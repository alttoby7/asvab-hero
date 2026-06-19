import { useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@asvab-hero/ui-tokens/colors";
import { fontSize, fontWeight } from "@asvab-hero/ui-tokens/typography";
import { spacing, radius } from "@asvab-hero/ui-tokens/spacing";
import type { StationState } from "@asvab-hero/domain/session";

const ERROR_TAGS = ["Concept", "Setup", "Careless", "Time"] as const;

interface Props {
  stationStates: Record<number, StationState>;
  onDone: () => void;
}

export default function SessionDebrief({ stationStates, onDone }: Props) {
  const allMissed = Object.values(stationStates).flatMap((s) => s.missed ?? []);
  const totalQuestions = Object.values(stationStates).reduce(
    (sum, s) => sum + (s.attemptId ? 1 : 0),
    0
  );
  const stationsCompleted = Object.values(stationStates).filter((s) => s.completed).length;
  const [tags, setTags] = useState<Record<string, string>>({});

  function tagItem(qId: string, tag: string) {
    setTags((prev) => ({ ...prev, [qId]: tag }));
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Ionicons
        name="chatbubble-outline"
        size={32}
        color={colors.accent}
        style={styles.icon}
      />
      <Text style={styles.title}>Session Complete</Text>
      <Text style={styles.subtitle}>
        {stationsCompleted} station{stationsCompleted !== 1 ? "s" : ""} completed
        {totalQuestions > 0 ? ` across ${totalQuestions} test${totalQuestions !== 1 ? "s" : ""}` : ""}
      </Text>

      {allMissed.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Tag your {allMissed.length} missed item{allMissed.length !== 1 ? "s" : ""}
          </Text>
          <Text style={styles.sectionSub}>
            What tripped you up? Tagging helps your next session.
          </Text>

          {allMissed.map((item) => (
            <View key={item.questionId} style={styles.missedRow}>
              <Text style={styles.missedLabel} numberOfLines={1}>
                {item.subtest ?? "Q"} · {item.topicId ?? item.questionId.slice(0, 8)}
              </Text>
              <View style={styles.tagRow}>
                {ERROR_TAGS.map((t) => (
                  <Pressable
                    key={t}
                    style={[
                      styles.tagButton,
                      tags[item.questionId] === t && styles.tagSelected,
                    ]}
                    onPress={() => tagItem(item.questionId, t)}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        tags[item.questionId] === t && styles.tagTextSelected,
                      ]}
                    >
                      {t}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}

      <Pressable style={styles.doneButton} onPress={onDone}>
        <Text style={styles.doneText}>Done</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy },
  content: { padding: spacing[6], paddingBottom: spacing[12] },
  icon: { alignSelf: "center", marginTop: spacing[8] },
  title: {
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.extrabold,
    color: colors.textPrimary,
    textAlign: "center",
    marginTop: spacing[4],
  },
  subtitle: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing[2],
    marginBottom: spacing[6],
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing[1],
  },
  sectionSub: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing[4],
  },
  missedRow: {
    backgroundColor: colors.navyCard,
    borderRadius: radius.md,
    padding: spacing[3],
    marginBottom: spacing[2],
    borderWidth: 1,
    borderColor: colors.navyBorder,
  },
  missedLabel: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    marginBottom: spacing[2],
  },
  tagRow: {
    flexDirection: "row",
    gap: spacing[2],
  },
  tagButton: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.navyBorder,
  },
  tagSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  tagText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  tagTextSelected: {
    color: colors.navy,
    fontWeight: fontWeight.semibold,
  },
  doneButton: {
    paddingVertical: spacing[4],
    backgroundColor: colors.accent,
    borderRadius: radius.lg,
    alignItems: "center",
    marginTop: spacing[4],
  },
  doneText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.navy,
  },
});
