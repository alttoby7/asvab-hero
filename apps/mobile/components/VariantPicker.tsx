import { useEffect, useState } from "react";
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
import { SUBTEST_NAMES, ALL_SUBTESTS } from "@asvab-hero/domain/types";
import type { AsvabSubtest, TestVariant } from "@asvab-hero/domain/types";
import { loadActiveVariants, checkHasActivePro, loadProfile } from "@asvab-hero/api";
import { getSupabaseClient } from "../lib/supabase";
import { useAuth } from "../lib/auth";
import { canStartVariant, type GateReason } from "../lib/pro-gate";
import ProGateModal from "./ProGateModal";

export default function VariantPicker() {
  const router = useRouter();
  const { user } = useAuth();
  const [variants, setVariants] = useState<TestVariant[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPro, setIsPro] = useState(false);
  const [diagnosticUsed, setDiagnosticUsed] = useState(false);
  const [expandedDrill, setExpandedDrill] = useState(false);
  const [gateReason, setGateReason] = useState<GateReason | null>(null);

  useEffect(() => {
    async function load() {
      const client = getSupabaseClient();
      const [v, pro, profile] = await Promise.all([
        loadActiveVariants(client),
        user ? checkHasActivePro(client, user.id) : false,
        user ? loadProfile(client, user.id) : null,
      ]);
      setVariants(v);
      setIsPro(pro);
      setDiagnosticUsed(!!profile?.free_diagnostic_used_at);
      setLoading(false);
    }
    load();
  }, [user]);

  function navigate(variantCode: string, subtest?: AsvabSubtest) {
    const gate = canStartVariant(variantCode, isPro, diagnosticUsed);
    if (!gate.allowed) {
      setGateReason(gate.reason!);
      return;
    }
    const params: Record<string, string> = { variant: variantCode };
    if (subtest) params.subtest = subtest;
    router.push({ pathname: "/practice-test", params });
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Practice Tests</Text>
      <Text style={styles.subtitle}>Choose your test type</Text>

      {/* Diagnostic */}
      <Pressable
        style={styles.card}
        onPress={() => navigate("diagnostic")}
      >
        <View style={styles.cardHeader}>
          <Ionicons name="pulse-outline" size={24} color={colors.accent} />
          <Text style={styles.cardTitle}>Diagnostic Test</Text>
          {diagnosticUsed && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Completed</Text>
            </View>
          )}
        </View>
        <Text style={styles.cardDesc}>
          30 questions across all subtests. See where you stand.
        </Text>
        <View style={styles.cardMeta}>
          <Text style={styles.metaText}>30 questions · 36 min</Text>
          <Text style={styles.freeTag}>Free</Text>
        </View>
      </Pressable>

      <ProGateModal
        visible={gateReason !== null}
        reason={gateReason ?? "drills_pro_only"}
        onClose={() => setGateReason(null)}
      />

      {/* Subtest Drill */}
      <Pressable
        style={styles.card}
        onPress={() => setExpandedDrill(!expandedDrill)}
      >
        <View style={styles.cardHeader}>
          <Ionicons name="star-outline" size={24} color={colors.accent} />
          <Text style={styles.cardTitle}>Subtest Drill</Text>
          {!isPro && (
            <Ionicons name="lock-closed" size={16} color={colors.textMuted} />
          )}
        </View>
        <Text style={styles.cardDesc}>
          Focus on one subtest at a time. 25 targeted questions.
        </Text>
        <View style={styles.cardMeta}>
          <Text style={styles.metaText}>25 questions · 20 min</Text>
          {!isPro && <Text style={styles.proTag}>Pro</Text>}
        </View>
      </Pressable>

      {expandedDrill && (
        <View style={styles.subtestGrid}>
          {ALL_SUBTESTS.map((st) => (
            <Pressable
              key={st}
              style={styles.subtestButton}
              onPress={() => navigate("subtest_drill", st)}
            >
              <Text style={styles.subtestCode}>{st}</Text>
              <Text style={styles.subtestName} numberOfLines={1}>
                {SUBTEST_NAMES[st]}
              </Text>
              {!isPro && (
                <Ionicons
                  name="lock-closed"
                  size={12}
                  color={colors.textMuted}
                  style={styles.lockIcon}
                />
              )}
            </Pressable>
          ))}
        </View>
      )}

      {/* Adaptive */}
      {variants.some((v) => v.code === "afqt_adaptive") && (
        <Pressable
          style={styles.card}
          onPress={() => navigate("afqt_adaptive")}
        >
          <View style={styles.cardHeader}>
            <Ionicons name="trending-up-outline" size={24} color={colors.accent} />
            <Text style={styles.cardTitle}>Adaptive AFQT</Text>
            {!isPro && (
              <Ionicons name="lock-closed" size={16} color={colors.textMuted} />
            )}
          </View>
          <Text style={styles.cardDesc}>
            AI-driven question selection targeting your weak areas.
          </Text>
          <View style={styles.cardMeta}>
            <Text style={styles.metaText}>25 questions · adaptive timing</Text>
            {!isPro && <Text style={styles.proTag}>Pro</Text>}
          </View>
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
  },
  title: {
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.extrabold,
    color: colors.textPrimary,
    marginTop: spacing[6],
  },
  subtitle: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    marginTop: spacing[1],
    marginBottom: spacing[6],
  },
  card: {
    backgroundColor: colors.navyCard,
    borderRadius: radius.lg,
    padding: spacing[4],
    marginBottom: spacing[3],
    borderWidth: 1,
    borderColor: colors.navyBorder,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginBottom: spacing[2],
  },
  cardTitle: {
    flex: 1,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  cardDesc: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: fontSize.sm * 1.5,
    marginBottom: spacing[2],
  },
  cardMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaText: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  freeTag: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    color: colors.success,
  },
  proTag: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    color: colors.accent,
  },
  badge: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  badgeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    color: colors.navy,
  },
  subtestGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[2],
    marginBottom: spacing[3],
    paddingHorizontal: spacing[1],
  },
  subtestButton: {
    width: "30%",
    backgroundColor: colors.navyCard,
    borderRadius: radius.md,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: colors.navyBorder,
    alignItems: "center",
  },
  subtestCode: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.accent,
  },
  subtestName: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing[1],
    textAlign: "center",
  },
  lockIcon: {
    position: "absolute",
    top: 4,
    right: 4,
  },
});
