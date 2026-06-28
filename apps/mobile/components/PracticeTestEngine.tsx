import { useEffect, useMemo, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import * as Haptics from "expo-haptics";
import { colors } from "@asvab-hero/ui-tokens/colors";
import { fontSize, fontWeight } from "@asvab-hero/ui-tokens/typography";
import { spacing, radius } from "@asvab-hero/ui-tokens/spacing";
import type { AsvabSubtest } from "@asvab-hero/domain/types";
import { usePracticeStore, useCurrentQuestion } from "../lib/stores/practice-store";
import { useAuth } from "../lib/auth";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import ResultsScreen from "./ResultsScreen";

interface PracticeTestEngineProps {
  variantCode: string;
  subtest?: AsvabSubtest;
  embedded?: boolean;
  autoStart?: boolean;
  onStationComplete?: (summary: {
    attemptId: string | null;
    correct: number;
    total: number;
  }) => void;
  onContinue?: () => void;
}

export default function PracticeTestEngine({
  variantCode,
  subtest,
  embedded,
  autoStart,
  onStationComplete,
  onContinue,
}: PracticeTestEngineProps) {
  const { user } = useAuth();
  const store = usePracticeStore();

  useEffect(() => {
    store.loadTest(variantCode, subtest);
    return () => store.reset();
  }, [variantCode, subtest]);

  useEffect(() => {
    if (autoStart && store.phase === "intro") {
      store.startTest();
    }
  }, [autoStart, store.phase]);

  const handleTimeUp = useCallback(() => {
    if (user?.id) store.submitTest(user.id);
  }, [user?.id]);

  const handleSubmit = useCallback(async () => {
    if (!user?.id) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await store.submitTest(user.id);
    if (onStationComplete) {
      const correct = Array.from(store.answers.values()).filter((a) => {
        const q = store.questions.find((q) => q.id === a.questionId);
        return q && a.selectedIndex === q.correctIndex;
      }).length;
      onStationComplete({
        attemptId: store.savedAttemptId,
        correct,
        total: store.questions.length,
      });
    }
  }, [user?.id, onStationComplete]);

  const answeredSet = useMemo(() => {
    const set = new Set<number>();
    for (const [qId] of store.answers) {
      const idx = store.questions.findIndex((q) => q.id === qId);
      if (idx >= 0) set.add(idx);
    }
    return set;
  }, [store.answers, store.questions]);

  if (store.phase === "loading" || store.loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.loadingText}>Loading questions...</Text>
      </View>
    );
  }

  if (store.error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{store.error}</Text>
        <Pressable
          style={styles.retryButton}
          onPress={() => store.loadTest(variantCode, subtest)}
        >
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (store.phase === "intro" && store.variant) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>{store.variant.name}</Text>
        <Text style={styles.subtitle}>
          {store.questions.length} questions
          {store.variant.rules.time_seconds > 0 &&
            ` · ${Math.round(store.variant.rules.time_seconds / 60)} min`}
        </Text>
        <Pressable style={styles.startButton} onPress={store.startTest}>
          <Text style={styles.startText}>Start Test</Text>
        </Pressable>
      </View>
    );
  }

  if (store.phase === "testing") {
    const currentQ = store.questions[store.currentIndex];
    if (!currentQ) return null;
    return (
      <View style={styles.testContainer}>
        <View style={styles.topBar}>
          <ProgressBar
            total={store.questions.length}
            currentIndex={store.currentIndex}
            answeredSet={answeredSet}
            onJumpTo={store.jumpTo}
          />
          {store.variant && store.variant.rules.time_seconds > 0 && store.startTime && (
            <Timer
              totalSeconds={store.variant.rules.time_seconds}
              startTime={store.startTime}
              onTimeUp={handleTimeUp}
            />
          )}
        </View>
        <QuestionCard
          question={currentQ}
          questionNumber={store.currentIndex + 1}
          totalQuestions={store.questions.length}
          answer={store.answers.get(currentQ.id)}
          revealed={false}
          onSelectAnswer={(idx) => store.selectAnswer(currentQ.id, idx)}
          onSetConfidence={(c) => store.setConfidence(currentQ.id, c)}
          onNext={() => {
            if (store.currentIndex === store.questions.length - 1) {
              store.goToReview();
            } else {
              store.next();
            }
          }}
          onPrev={store.prev}
          isFirst={store.currentIndex === 0}
          isLast={store.currentIndex === store.questions.length - 1}
        />
      </View>
    );
  }

  if (store.phase === "review") {
    const unanswered = store.questions.length - store.answers.size;
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>Review Answers</Text>
        <Text style={styles.subtitle}>
          {store.answers.size} of {store.questions.length} answered
        </Text>
        {unanswered > 0 && (
          <Text style={styles.warningText}>
            {unanswered} question{unanswered > 1 ? "s" : ""} unanswered
          </Text>
        )}
        <View style={styles.reviewGrid}>
          {store.questions.map((q, i) => {
            const isAnswered = store.answers.has(q.id);
            return (
              <Pressable
                key={q.id}
                style={[styles.reviewDot, isAnswered && styles.reviewDotAnswered]}
                onPress={() => {
                  store.jumpTo(i);
                  usePracticeStore.setState({ phase: "testing" });
                }}
              >
                <Text style={styles.reviewDotText}>{i + 1}</Text>
              </Pressable>
            );
          })}
        </View>
        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Test</Text>
        </Pressable>
        <Pressable
          style={styles.backButton}
          onPress={() => usePracticeStore.setState({ phase: "testing" })}
        >
          <Text style={styles.backText}>Back to Questions</Text>
        </Pressable>
      </View>
    );
  }

  if (store.phase === "results") {
    return (
      <ResultsScreen
        questions={store.questions}
        answers={Array.from(store.answers.values())}
        onRetake={() => store.loadTest(variantCode, subtest)}
        onContinue={onContinue}
        embedded={embedded}
      />
    );
  }

  return null;
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing[6],
    backgroundColor: colors.navy,
  },
  testContainer: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  topBar: {
    paddingTop: spacing[2],
  },
  loadingText: {
    marginTop: spacing[4],
    fontSize: fontSize.base,
    color: colors.textSecondary,
  },
  errorText: {
    fontSize: fontSize.base,
    color: colors.danger,
    textAlign: "center",
    marginBottom: spacing[4],
  },
  retryButton: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[3],
    backgroundColor: colors.accent,
    borderRadius: radius.md,
  },
  retryText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: colors.navy,
  },
  title: {
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.extrabold,
    color: colors.textPrimary,
    marginBottom: spacing[2],
  },
  subtitle: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    marginBottom: spacing[6],
  },
  startButton: {
    paddingHorizontal: spacing[8],
    paddingVertical: spacing[4],
    backgroundColor: colors.accent,
    borderRadius: radius.lg,
  },
  startText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.navy,
  },
  warningText: {
    fontSize: fontSize.sm,
    color: colors.warning,
    marginBottom: spacing[4],
  },
  reviewGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[2],
    justifyContent: "center",
    maxWidth: 320,
    marginBottom: spacing[6],
  },
  reviewDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.navyCard,
    borderWidth: 1,
    borderColor: colors.navyBorder,
    justifyContent: "center",
    alignItems: "center",
  },
  reviewDotAnswered: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  reviewDotText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  submitButton: {
    paddingHorizontal: spacing[8],
    paddingVertical: spacing[4],
    backgroundColor: colors.accent,
    borderRadius: radius.lg,
    marginBottom: spacing[3],
  },
  submitText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.navy,
  },
  backButton: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[3],
  },
  backText: {
    fontSize: fontSize.base,
    color: colors.textMuted,
  },
});
