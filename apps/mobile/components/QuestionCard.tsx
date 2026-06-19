import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";
import { colors } from "@asvab-hero/ui-tokens/colors";
import { fontSize, fontWeight } from "@asvab-hero/ui-tokens/typography";
import { spacing, radius } from "@asvab-hero/ui-tokens/spacing";
import type { PracticeQuestion, UserAnswer } from "@asvab-hero/domain/types";
import { SUBTEST_NAMES } from "@asvab-hero/domain/types";

const LETTERS = ["A", "B", "C", "D"] as const;

interface QuestionCardProps {
  question: PracticeQuestion;
  questionNumber: number;
  totalQuestions: number;
  answer: UserAnswer | undefined;
  revealed: boolean;
  onSelectAnswer: (optionIndex: number) => void;
  onSetConfidence: (confidence: "sure" | "unsure") => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  answer,
  revealed,
  onSelectAnswer,
  onSetConfidence,
  onNext,
  onPrev,
  isFirst,
  isLast,
}: QuestionCardProps) {
  const selectedIndex = answer?.selectedIndex ?? null;
  const confidence = answer?.confidence ?? null;

  function handleSelect(index: number) {
    if (revealed) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSelectAnswer(index);
  }

  function getOptionStyle(index: number) {
    if (revealed) {
      if (index === question.correctIndex) return styles.optionCorrect;
      if (index === selectedIndex) return styles.optionIncorrect;
      return styles.option;
    }
    if (index === selectedIndex) return styles.optionSelected;
    return styles.option;
  }

  function getLetterStyle(index: number) {
    if (revealed) {
      if (index === question.correctIndex) return styles.letterCorrect;
      if (index === selectedIndex) return styles.letterIncorrect;
      return styles.letter;
    }
    if (index === selectedIndex) return styles.letterSelected;
    return styles.letter;
  }

  function getOptionTextStyle(index: number) {
    if (revealed && index === question.correctIndex) return styles.optionTextCorrect;
    if (revealed && index === selectedIndex) return styles.optionTextIncorrect;
    return styles.optionText;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.subtestBadge}>
          <Text style={styles.subtestText}>
            {SUBTEST_NAMES[question.subtest] ?? question.subtest}
          </Text>
        </View>
        <Text style={styles.counter}>
          {questionNumber} of {totalQuestions}
        </Text>
      </View>

      <Text style={styles.stem}>{question.question}</Text>

      <View style={styles.options}>
        {question.options.map((option, i) => (
          <Pressable
            key={i}
            style={getOptionStyle(i)}
            onPress={() => handleSelect(i)}
            disabled={revealed}
          >
            <View style={getLetterStyle(i)}>
              <Text style={styles.letterText}>{LETTERS[i]}</Text>
            </View>
            <Text style={getOptionTextStyle(i)}>{option}</Text>
          </Pressable>
        ))}
      </View>

      {selectedIndex !== null && !revealed && (
        <View style={styles.confidenceRow}>
          <Pressable
            style={[
              styles.confidenceButton,
              confidence === "sure" && styles.confidenceActive,
            ]}
            onPress={() => onSetConfidence("sure")}
          >
            <Text
              style={[
                styles.confidenceText,
                confidence === "sure" && styles.confidenceTextActive,
              ]}
            >
              I'm sure
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.confidenceButton,
              confidence === "unsure" && styles.confidenceActive,
            ]}
            onPress={() => onSetConfidence("unsure")}
          >
            <Text
              style={[
                styles.confidenceText,
                confidence === "unsure" && styles.confidenceTextActive,
              ]}
            >
              Not sure
            </Text>
          </Pressable>
        </View>
      )}

      {revealed && (
        <View style={styles.explanation}>
          <Text style={styles.explanationLabel}>
            {selectedIndex === question.correctIndex ? "Correct!" : "Incorrect"}
          </Text>
          <Text style={styles.explanationText}>{question.explanation}</Text>
        </View>
      )}

      <View style={styles.nav}>
        <Pressable
          style={[styles.navButton, isFirst && styles.navButtonDisabled]}
          onPress={onPrev}
          disabled={isFirst}
        >
          <Text style={[styles.navText, isFirst && styles.navTextDisabled]}>
            Previous
          </Text>
        </Pressable>
        <Pressable style={styles.navButton} onPress={onNext}>
          <Text style={styles.navText}>{isLast ? "Review" : "Next"}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing[4], paddingBottom: spacing[8] },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing[4],
  },
  subtestBadge: {
    backgroundColor: colors.accentDim,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: radius.full,
  },
  subtestText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    color: colors.accent,
  },
  counter: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    fontVariant: ["tabular-nums"],
  },
  stem: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    lineHeight: fontSize.lg * 1.5,
    marginBottom: spacing[6],
  },
  options: { gap: spacing[3] },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing[4],
    backgroundColor: colors.navyCard,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.navyBorder,
  },
  optionSelected: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing[4],
    backgroundColor: colors.accentDim,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  optionCorrect: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing[4],
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.success,
  },
  optionIncorrect: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing[4],
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.danger,
  },
  letter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.navyLighter,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing[3],
  },
  letterSelected: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing[3],
  },
  letterCorrect: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.success,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing[3],
  },
  letterIncorrect: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.danger,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing[3],
  },
  letterText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  optionText: {
    flex: 1,
    fontSize: fontSize.base,
    color: colors.textPrimary,
    lineHeight: fontSize.base * 1.4,
  },
  optionTextCorrect: {
    flex: 1,
    fontSize: fontSize.base,
    color: colors.success,
    fontWeight: fontWeight.semibold,
    lineHeight: fontSize.base * 1.4,
  },
  optionTextIncorrect: {
    flex: 1,
    fontSize: fontSize.base,
    color: colors.danger,
    lineHeight: fontSize.base * 1.4,
  },
  confidenceRow: {
    flexDirection: "row",
    gap: spacing[3],
    marginTop: spacing[4],
  },
  confidenceButton: {
    flex: 1,
    paddingVertical: spacing[3],
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.navyBorder,
    alignItems: "center",
  },
  confidenceActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentDim,
  },
  confidenceText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  confidenceTextActive: {
    color: colors.accent,
    fontWeight: fontWeight.semibold,
  },
  explanation: {
    marginTop: spacing[4],
    padding: spacing[4],
    backgroundColor: colors.navyCard,
    borderRadius: radius.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  explanationLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.accent,
    marginBottom: spacing[2],
  },
  explanationText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: fontSize.sm * 1.6,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing[6],
    gap: spacing[3],
  },
  navButton: {
    flex: 1,
    paddingVertical: spacing[3],
    borderRadius: radius.md,
    backgroundColor: colors.navyCard,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.navyBorder,
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  navTextDisabled: {
    color: colors.textMuted,
  },
});
