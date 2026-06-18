import { View, Text, StyleSheet } from "react-native";
import { BRANCH_MINIMUMS } from "@asvab-hero/domain/scoring";

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
  container: { flex: 1, padding: 24, backgroundColor: "#0a1628" },
  title: { fontSize: 28, fontWeight: "800", color: "#ffffff", marginTop: 48 },
  subtitle: { fontSize: 16, color: "#94a3b8", marginTop: 8 },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#ffffff", marginBottom: 8 },
  cardText: { fontSize: 14, color: "#94a3b8", marginBottom: 4 },
});
