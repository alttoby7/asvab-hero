import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Purchases from "react-native-purchases";
import { colors } from "@asvab-hero/ui-tokens/colors";
import { fontSize, fontWeight } from "@asvab-hero/ui-tokens/typography";
import { spacing, radius } from "@asvab-hero/ui-tokens/spacing";
import { useAuth } from "../../lib/auth";
import { isPurchasesConfigured, hasProEntitlement } from "../../lib/purchases";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  function handleSignOut() {
    Alert.alert("Sign Out", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: signOut },
    ]);
  }

  async function handleRestore() {
    if (!isPurchasesConfigured()) {
      Alert.alert("Restore unavailable", "Purchases aren't available in this build.");
      return;
    }
    try {
      const info = await Purchases.restorePurchases();
      Alert.alert(
        hasProEntitlement(info) ? "Restored" : "Nothing to restore",
        hasProEntitlement(info)
          ? "Your Pro access is back."
          : "No previous purchases found on this account."
      );
    } catch (e: unknown) {
      Alert.alert("Restore failed", (e as { message?: string })?.message ?? "Please try again.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email ?? "—"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Account ID</Text>
        <Text style={styles.valueMono}>{user?.id?.slice(0, 8) ?? "—"}</Text>
      </View>

      <Pressable style={styles.row} onPress={() => router.push("/paywall")}>
        <Ionicons name="ribbon-outline" size={22} color={colors.accent} />
        <Text style={styles.rowText}>Upgrade to Pro</Text>
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </Pressable>

      <Pressable style={styles.row} onPress={handleRestore}>
        <Ionicons name="refresh-outline" size={22} color={colors.textSecondary} />
        <Text style={styles.rowText}>Restore purchases</Text>
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </Pressable>

      <Pressable style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing[6], backgroundColor: colors.navy },
  title: {
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.extrabold,
    color: colors.textPrimary,
    marginTop: spacing[12],
    marginBottom: spacing[6],
  },
  card: {
    backgroundColor: colors.navyCard,
    borderRadius: radius.lg,
    padding: spacing[4],
    marginBottom: spacing[3],
  },
  label: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: {
    fontSize: fontSize.base,
    color: colors.textPrimary,
    marginTop: spacing[1],
  },
  valueMono: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing[1],
    fontFamily: "monospace",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    backgroundColor: colors.navyCard,
    borderRadius: radius.lg,
    padding: spacing[4],
    marginBottom: spacing[3],
  },
  rowText: {
    flex: 1,
    fontSize: fontSize.base,
    color: colors.textPrimary,
    fontWeight: fontWeight.semibold,
  },
  signOutButton: {
    backgroundColor: colors.dangerDim,
    borderRadius: radius.md,
    padding: spacing[4],
    alignItems: "center",
    marginTop: spacing[6],
    borderWidth: 1,
    borderColor: colors.danger,
  },
  signOutText: {
    color: colors.danger,
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
});
