import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@asvab-hero/ui-tokens/colors";
import { fontSize, fontWeight } from "@asvab-hero/ui-tokens/typography";
import { spacing, radius } from "@asvab-hero/ui-tokens/spacing";
import type { HomeTrajectory, Confidence } from "@asvab-hero/domain/trajectory";
import { AFQT_BANDS } from "@asvab-hero/domain/trajectory";

function confidenceColor(c: Confidence) {
  if (c === "high") return colors.success;
  if (c === "medium") return colors.warning;
  return colors.textMuted;
}

function confidenceLabel(c: Confidence) {
  if (c === "high") return "High confidence";
  if (c === "medium") return "Medium confidence";
  return "Low confidence";
}

interface Props {
  trajectory: HomeTrajectory;
}

export default function TrajectoryCard({ trajectory }: Props) {
  const { current_standing, primary_metric } = trajectory;
  const bandLabel =
    primary_metric?.code === "AFQT"
      ? primary_metric.current_band_label
      : current_standing.afqt_band_label;
  const bandKey =
    primary_metric?.code === "AFQT"
      ? primary_metric.current_band_key
      : current_standing.afqt_band_key;
  const confidence = current_standing.overall_confidence;
  const bandIndex = AFQT_BANDS.findIndex((b) => b.key === bandKey);
  const progress = bandIndex >= 0 ? ((bandIndex + 0.5) / AFQT_BANDS.length) * 100 : 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="analytics-outline" size={20} color={colors.accent} />
        <Text style={styles.headerText}>Your AFQT Estimate</Text>
      </View>

      {bandLabel ? (
        <Text style={styles.bandLabel}>{bandLabel}</Text>
      ) : (
        <Text style={styles.bandLabel}>--</Text>
      )}

      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${Math.max(progress, 5)}%` }]} />
        {[31, 50, 65].map((threshold) => {
          const band = AFQT_BANDS.find((b) => b.low <= threshold && b.high >= threshold);
          const idx = band ? AFQT_BANDS.indexOf(band) : 0;
          const pct = ((idx + 0.5) / AFQT_BANDS.length) * 100;
          return (
            <View key={threshold} style={[styles.marker, { left: `${pct}%` }]}>
              <View style={styles.markerLine} />
              <Text style={styles.markerLabel}>{threshold}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.confidenceRow}>
        <View
          style={[styles.confidenceDot, { backgroundColor: confidenceColor(confidence) }]}
        />
        <Text style={[styles.confidenceText, { color: confidenceColor(confidence) }]}>
          {confidenceLabel(confidence)}
        </Text>
        <Text style={styles.attemptCount}>
          {current_standing.attempt_count} test{current_standing.attempt_count !== 1 ? "s" : ""} taken
        </Text>
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginBottom: spacing[2],
  },
  headerText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textSecondary,
  },
  bandLabel: {
    fontSize: fontSize["4xl"],
    fontWeight: fontWeight.extrabold,
    color: colors.textPrimary,
    marginBottom: spacing[4],
  },
  barTrack: {
    height: 8,
    backgroundColor: colors.navyLighter,
    borderRadius: 4,
    overflow: "visible",
    position: "relative",
    marginBottom: spacing[6],
  },
  barFill: {
    height: 8,
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  marker: {
    position: "absolute",
    top: -2,
    alignItems: "center",
  },
  markerLine: {
    width: 1,
    height: 12,
    backgroundColor: colors.textMuted,
  },
  markerLabel: {
    fontSize: 9,
    color: colors.textMuted,
    marginTop: 2,
  },
  confidenceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  confidenceDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  confidenceText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  attemptCount: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginLeft: "auto",
  },
});
