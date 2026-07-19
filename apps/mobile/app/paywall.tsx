import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Purchases, {
  type PurchasesPackage,
  type PurchasesOffering,
} from "react-native-purchases";
import { colors } from "@asvab-hero/ui-tokens/colors";
import { fontSize, fontWeight } from "@asvab-hero/ui-tokens/typography";
import { spacing, radius } from "@asvab-hero/ui-tokens/spacing";
import {
  isPurchasesConfigured,
  getCurrentOffering,
  hasProEntitlement,
  identifyPurchaser,
} from "../lib/purchases";
import { useAuth } from "../lib/auth";
import { gateMessage, type GateReason } from "../lib/pro-gate";

const WEB_UPGRADE_URL = "https://asvabhero.com/upgrade";

const PRO_BULLETS = [
  "Unlimited adaptive AFQT practice",
  "Every subtest drill unlocked",
  "Unlimited diagnostic retakes",
  "Full daily mission + mistake review",
];

export default function PaywallScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const params = useLocalSearchParams<{ reason?: string }>();
  const reason = (params.reason as GateReason | undefined) ?? undefined;
  const heading = reason ? gateMessage(reason) : null;

  const [offering, setOffering] = useState<PurchasesOffering | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const configured = isPurchasesConfigured();

  useEffect(() => {
    let active = true;
    (async () => {
      const o = await getCurrentOffering();
      if (active) {
        setOffering(o);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  async function buy(pkg: PurchasesPackage) {
    if (purchasing) return;
    setPurchasing(pkg.identifier);
    try {
      // Ensure RC's app_user_id === Supabase user id BEFORE purchasing, so the
      // webhook can resolve the profile. Idempotent if already identified;
      // closes the race where the paywall opens before auth's logIn lands.
      if (user?.id) await identifyPurchaser(user.id);
      const { customerInfo } = await Purchases.purchasePackage(pkg);
      if (hasProEntitlement(customerInfo)) {
        Alert.alert("You're Pro! 🎖", "Everything's unlocked. Good luck.", [
          { text: "Let's go", onPress: () => router.back() },
        ]);
      }
    } catch (e: unknown) {
      const err = e as { userCancelled?: boolean; message?: string };
      if (!err?.userCancelled) {
        Alert.alert("Purchase failed", err?.message ?? "Please try again.");
      }
    } finally {
      setPurchasing(null);
    }
  }

  async function restore() {
    try {
      const info = await Purchases.restorePurchases();
      if (hasProEntitlement(info)) {
        Alert.alert("Restored", "Your Pro access is back.", [
          { text: "Great", onPress: () => router.back() },
        ]);
      } else {
        Alert.alert("Nothing to restore", "No previous purchases found on this account.");
      }
    } catch (e: unknown) {
      const err = e as { message?: string };
      Alert.alert("Restore failed", err?.message ?? "Please try again.");
    }
  }

  const packages = offering?.availablePackages ?? [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable style={styles.closeIcon} onPress={() => router.back()} hitSlop={12}>
        <Ionicons name="close" size={28} color={colors.textMuted} />
      </Pressable>

      <Ionicons name="ribbon" size={44} color={colors.accent} style={styles.crest} />
      <Text style={styles.title}>{heading?.title ?? "Go Pro"}</Text>
      <Text style={styles.subtitle}>
        {heading?.body ?? "Unlock everything ASVAB Hero has to help you hit your score."}
      </Text>

      <View style={styles.bullets}>
        {PRO_BULLETS.map((b) => (
          <View key={b} style={styles.bulletRow}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.bulletText}>{b}</Text>
          </View>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.accent} style={{ marginTop: spacing[8] }} />
      ) : !configured || packages.length === 0 ? (
        // SDK unconfigured (dev / Expo Go) or offerings not set up yet — fall
        // back to the web checkout so the button is never dead.
        <Pressable
          style={styles.primaryButton}
          onPress={() => Linking.openURL(WEB_UPGRADE_URL)}
        >
          <Text style={styles.primaryText}>Upgrade on the web</Text>
        </Pressable>
      ) : (
        packages.map((pkg) => {
          const p = pkg.product;
          const busy = purchasing === pkg.identifier;
          return (
            <Pressable
              key={pkg.identifier}
              style={styles.planCard}
              disabled={!!purchasing}
              onPress={() => buy(pkg)}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.planTitle}>{p.title.replace(/\s*\(.*\)$/, "")}</Text>
                {!!p.description && (
                  <Text style={styles.planDesc} numberOfLines={2}>
                    {p.description}
                  </Text>
                )}
              </View>
              {busy ? (
                <ActivityIndicator color={colors.accent} />
              ) : (
                <Text style={styles.planPrice}>{p.priceString}</Text>
              )}
            </Pressable>
          );
        })
      )}

      <Pressable style={styles.restoreButton} onPress={restore}>
        <Text style={styles.restoreText}>Restore purchases</Text>
      </Pressable>

      <Text style={styles.legal}>
        Payment is charged to your Google Play account. Subscriptions renew automatically unless
        cancelled at least 24 hours before the period ends. Manage or cancel in Google Play.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy },
  content: { padding: spacing[6], paddingTop: spacing[12], paddingBottom: spacing[12] },
  closeIcon: { position: "absolute", top: spacing[6], right: spacing[5], zIndex: 10 },
  crest: { alignSelf: "center", marginBottom: spacing[4] },
  title: {
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.extrabold,
    color: colors.textPrimary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: fontSize.base * 1.5,
    marginTop: spacing[2],
    marginBottom: spacing[6],
  },
  bullets: {
    backgroundColor: colors.navyCard,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.navyBorder,
    padding: spacing[4],
    gap: spacing[3],
    marginBottom: spacing[6],
  },
  bulletRow: { flexDirection: "row", alignItems: "center", gap: spacing[3] },
  bulletText: { flex: 1, fontSize: fontSize.base, color: colors.textPrimary },
  planCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.navyCard,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.accent,
    padding: spacing[4],
    marginBottom: spacing[3],
    gap: spacing[3],
  },
  planTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: colors.textPrimary },
  planDesc: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing[1],
    lineHeight: fontSize.sm * 1.4,
  },
  planPrice: { fontSize: fontSize.xl, fontWeight: fontWeight.extrabold, color: colors.accent },
  primaryButton: {
    backgroundColor: colors.accent,
    borderRadius: radius.lg,
    paddingVertical: spacing[4],
    alignItems: "center",
    marginTop: spacing[2],
  },
  primaryText: { fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: colors.navy },
  restoreButton: { paddingVertical: spacing[4], alignItems: "center", marginTop: spacing[2] },
  restoreText: { fontSize: fontSize.base, color: colors.textSecondary, fontWeight: fontWeight.semibold },
  legal: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: fontSize.xs * 1.5,
    marginTop: spacing[4],
  },
});
