import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@asvab-hero/ui-tokens/colors";
import { fontSize, fontWeight } from "@asvab-hero/ui-tokens/typography";
import { spacing, radius } from "@asvab-hero/ui-tokens/spacing";
import type { SessionStation, StationKind, StationState } from "@asvab-hero/domain/session";

const STATION_ICONS: Record<StationKind, keyof typeof Ionicons.glyphMap> = {
  warmup: "flame-outline",
  lesson: "book-outline",
  drill: "star-outline",
  timed: "timer-outline",
  debrief: "chatbubble-outline",
  diagnostic: "pulse-outline",
};

interface Props {
  stations: SessionStation[];
  currentStation: number;
  stationStates: Record<number, StationState>;
  onStartStation: (index: number) => void;
}

export default function MissionPathStepper({
  stations,
  currentStation,
  stationStates,
  onStartStation,
}: Props) {
  return (
    <View style={styles.container}>
      {stations.map((station, i) => {
        const completed = stationStates[i]?.completed;
        const active = i === currentStation;
        const locked = i > currentStation && !completed;

        return (
          <View key={i}>
            {i > 0 && (
              <View style={styles.connectorRow}>
                <View
                  style={[
                    styles.connector,
                    completed && styles.connectorDone,
                  ]}
                />
              </View>
            )}
            <Pressable
              style={[
                styles.stationRow,
                active && styles.stationActive,
                completed && styles.stationCompleted,
              ]}
              onPress={() => {
                if (active) onStartStation(i);
              }}
              disabled={locked}
            >
              <View
                style={[
                  styles.iconCircle,
                  completed && styles.iconDone,
                  active && styles.iconActive,
                  locked && styles.iconLocked,
                ]}
              >
                {completed ? (
                  <Ionicons name="checkmark" size={18} color={colors.navy} />
                ) : (
                  <Ionicons
                    name={STATION_ICONS[station.kind]}
                    size={18}
                    color={
                      active
                        ? colors.navy
                        : locked
                        ? colors.textMuted
                        : colors.textPrimary
                    }
                  />
                )}
              </View>
              <View style={styles.textCol}>
                <Text
                  style={[
                    styles.stationTitle,
                    locked && styles.lockedText,
                  ]}
                >
                  {station.title}
                </Text>
                <Text
                  style={[
                    styles.stationSub,
                    locked && styles.lockedText,
                  ]}
                  numberOfLines={2}
                >
                  {station.subtitle}
                </Text>
              </View>
              <Text style={[styles.time, locked && styles.lockedText]}>
                ~{station.estMinutes}m
              </Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing[2],
  },
  connectorRow: {
    paddingLeft: 19,
    height: 20,
  },
  connector: {
    width: 2,
    flex: 1,
    backgroundColor: colors.navyBorder,
  },
  connectorDone: {
    backgroundColor: colors.success,
  },
  stationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    padding: spacing[3],
    borderRadius: radius.lg,
  },
  stationActive: {
    backgroundColor: colors.accentDim,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  stationCompleted: {
    opacity: 0.7,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.navyCard,
    borderWidth: 1,
    borderColor: colors.navyBorder,
  },
  iconDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  iconActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  iconLocked: {
    opacity: 0.4,
  },
  textCol: {
    flex: 1,
  },
  stationTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  stationSub: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  lockedText: {
    color: colors.textMuted,
  },
  time: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    fontVariant: ["tabular-nums"],
  },
});
