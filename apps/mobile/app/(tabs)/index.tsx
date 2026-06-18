import { View, Text, StyleSheet } from "react-native";
import { BRANCH_MINIMUMS } from "@asvab-hero/domain/scoring";
import { colors } from "@asvab-hero/ui-tokens/colors";
import { fontSize, fontWeight } from "@asvab-hero/ui-tokens/typography";
import { spacing, radius } from "@asvab-hero/ui-tokens/spacing";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ASVAB Hero</Text>
      <Text style={styles.subtitle}>Your daily study mission starts here</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Branch Minimums</Text>
        {BRANCH_MINIMUMS.map((b) => (
          <Text key={b.branch} style={styles.cardText}>
            {b.branch}: {b.min} AFQT
          </Text>
        ))}
      </View>
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
  },
  subtitle: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    marginTop: spacing[2],
  },
  card: {
    backgroundColor: colors.navyCard,
    borderRadius: radius.lg,
    padding: spacing[4],
    marginTop: spacing[6],
  },
  cardTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing[2],
  },
  cardText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing[1],
  },
});
