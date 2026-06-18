import { View, Text, StyleSheet } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Account, settings, and progress</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#0a1628" },
  title: { fontSize: 28, fontWeight: "800", color: "#ffffff", marginTop: 48 },
  subtitle: { fontSize: 16, color: "#94a3b8", marginTop: 8 },
});
