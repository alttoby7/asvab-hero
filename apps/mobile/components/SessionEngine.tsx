import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@asvab-hero/ui-tokens/colors";
import { fontSize, fontWeight } from "@asvab-hero/ui-tokens/typography";
import { spacing, radius } from "@asvab-hero/ui-tokens/spacing";
import type { AsvabSubtest } from "@asvab-hero/domain/types";
import { useAuth } from "../lib/auth";
import { useSessionStore } from "../lib/stores/session-store";
import MissionPathStepper from "./MissionPathStepper";
import PracticeTestEngine from "./PracticeTestEngine";
import SessionDebrief from "./SessionDebrief";

export default function SessionEngine() {
  const { user } = useAuth();
  const {
    plan,
    currentStation,
    stationStates,
    status,
    error,
    loadOrCreateSession,
    completeStation,
    advanceToStation,
    finishSession,
    reset,
  } = useSessionStore();

  const [activeStationIndex, setActiveStationIndex] = useState<number | null>(null);

  useEffect(() => {
    if (user && status === "idle") {
      loadOrCreateSession(user.id);
    }
  }, [user, status]);

  if (status === "loading") {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.loadingText}>Building your session...</Text>
      </View>
    );
  }

  if (status === "error") {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle-outline" size={48} color={colors.danger} />
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={() => reset()}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (!plan) return null;

  const station = activeStationIndex != null ? plan.stations[activeStationIndex] : null;

  if (station && station.kind === "debrief") {
    return (
      <SessionDebrief
        stationStates={stationStates}
        onDone={async () => {
          completeStation(activeStationIndex!);
          if (user) await finishSession(user.id);
          setActiveStationIndex(null);
        }}
      />
    );
  }

  if (station && (station.kind === "drill" || station.kind === "timed" || station.kind === "diagnostic" || station.kind === "warmup")) {
    const variantCode = station.variant ?? "diagnostic";
    return (
      <PracticeTestEngine
        variantCode={variantCode}
        subtest={station.subtest as AsvabSubtest | undefined}
        embedded
        autoStart
        onStationComplete={(summary) => {
          completeStation(activeStationIndex!, {
            attemptId: summary.attemptId ?? undefined,
          });
          const nextIdx = activeStationIndex! + 1;
          if (nextIdx < plan.stations.length) {
            advanceToStation(nextIdx);
          }
          setActiveStationIndex(null);
        }}
        onContinue={() => setActiveStationIndex(null)}
      />
    );
  }

  if (status === "completed") {
    return (
      <View style={styles.centered}>
        <Ionicons name="checkmark-circle" size={64} color={colors.success} />
        <Text style={styles.completeTitle}>Session Complete!</Text>
        <Text style={styles.completeSub}>Come back tomorrow for your next session.</Text>
        <Pressable style={styles.retryButton} onPress={reset}>
          <Text style={styles.retryText}>View Plan</Text>
        </Pressable>
      </View>
    );
  }

  const totalMinutes = plan.stations.reduce((sum, s) => sum + s.estMinutes, 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Today's Mission</Text>
      <View style={styles.metaRow}>
        <Text style={styles.metaText}>
          {plan.stations.length} stations · ~{totalMinutes} min
        </Text>
        {plan.urgent && (
          <View style={styles.urgentBadge}>
            <Text style={styles.urgentText}>Final Stretch</Text>
          </View>
        )}
      </View>

      <MissionPathStepper
        stations={plan.stations}
        currentStation={currentStation}
        stationStates={stationStates}
        onStartStation={(i) => setActiveStationIndex(i)}
      />

      {!stationStates[currentStation]?.completed && (
        <Pressable
          style={styles.startButton}
          onPress={() => setActiveStationIndex(currentStation)}
        >
          <Text style={styles.startText}>
            Start: {plan.stations[currentStation]?.title}
          </Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy },
  content: { padding: spacing[6], paddingBottom: spacing[12] },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.navy,
    padding: spacing[6],
  },
  loadingText: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    marginTop: spacing[4],
  },
  errorText: {
    fontSize: fontSize.base,
    color: colors.danger,
    marginTop: spacing[4],
    textAlign: "center",
  },
  retryButton: {
    marginTop: spacing[4],
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[3],
    backgroundColor: colors.navyCard,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.navyBorder,
  },
  retryText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  title: {
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.extrabold,
    color: colors.textPrimary,
    marginTop: spacing[6],
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    marginTop: spacing[2],
    marginBottom: spacing[4],
  },
  metaText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  urgentBadge: {
    backgroundColor: colors.dangerDim,
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  urgentText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    color: colors.danger,
  },
  startButton: {
    marginTop: spacing[6],
    paddingVertical: spacing[4],
    backgroundColor: colors.accent,
    borderRadius: radius.lg,
    alignItems: "center",
  },
  startText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    color: colors.navy,
  },
  completeTitle: {
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.extrabold,
    color: colors.textPrimary,
    marginTop: spacing[4],
  },
  completeSub: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    marginTop: spacing[2],
    textAlign: "center",
  },
});
