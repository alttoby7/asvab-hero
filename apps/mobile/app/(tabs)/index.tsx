import { useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@asvab-hero/ui-tokens/colors";
import { fontSize, fontWeight } from "@asvab-hero/ui-tokens/typography";
import { spacing, radius } from "@asvab-hero/ui-tokens/spacing";
import { useAuth } from "../../lib/auth";
import { useHomeStore } from "../../lib/stores/home-store";
import TrajectoryCard from "../../components/TrajectoryCard";
import StreakCard from "../../components/StreakCard";

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const { trajectory, profile, loading, loadHome } = useHomeStore();

  useEffect(() => {
    if (user) loadHome(user.id);
  }, [user]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  const name = profile?.display_name?.split(" ")[0];
  const hasAttempts = (trajectory?.current_standing.attempt_count ?? 0) > 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>{greeting()}{name ? `, ${name}` : ""}</Text>
      <Text style={styles.subtitle}>Your daily study mission starts here</Text>

      {trajectory && hasAttempts && (
        <View style={styles.section}>
          <TrajectoryCard trajectory={trajectory} />
        </View>
      )}

      {profile && profile.streak_count > 0 && (
        <View style={styles.section}>
          <StreakCard streakCount={profile.streak_count} />
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Start</Text>

        {!hasAttempts && (
          <Pressable
            style={[styles.actionCard, styles.primaryAction]}
            onPress={() =>
              router.push({ pathname: "/practice-test", params: { variant: "diagnostic" } })
            }
          >
            <Ionicons name="pulse-outline" size={24} color={colors.navy} />
            <View style={styles.actionText}>
              <Text style={styles.actionTitle}>Take the Diagnostic</Text>
              <Text style={styles.actionSub}>30 questions to find your baseline</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.navy} />
          </Pressable>
        )}

        <Pressable
          style={styles.actionCard}
          onPress={() => router.push("/(tabs)/session")}
        >
          <Ionicons name="rocket-outline" size={24} color={colors.accent} />
          <View style={styles.actionText}>
            <Text style={styles.actionTitle}>Daily Session</Text>
            <Text style={styles.actionSub}>Your personalized study plan</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </Pressable>

        <Pressable
          style={styles.actionCard}
          onPress={() => router.push("/(tabs)/practice")}
        >
          <Ionicons name="star-outline" size={24} color={colors.accent} />
          <View style={styles.actionText}>
            <Text style={styles.actionTitle}>Practice Test</Text>
            <Text style={styles.actionSub}>Drill a specific subtest</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </Pressable>
      </View>
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
  },
  greeting: {
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.extrabold,
    color: colors.textPrimary,
    marginTop: spacing[12],
  },
  subtitle: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    marginTop: spacing[2],
  },
  section: {
    marginTop: spacing[6],
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing[3],
  },
  actionCard: {
    backgroundColor: colors.navyCard,
    borderRadius: radius.lg,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: colors.navyBorder,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    marginBottom: spacing[3],
  },
  primaryAction: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  actionSub: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
