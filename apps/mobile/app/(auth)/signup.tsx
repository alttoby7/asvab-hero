import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { colors } from "@asvab-hero/ui-tokens/colors";
import { fontSize, fontWeight } from "@asvab-hero/ui-tokens/typography";
import { spacing, radius } from "@asvab-hero/ui-tokens/spacing";
import { getSupabaseClient } from "../../lib/supabase";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!email || !password) {
      Alert.alert("Missing fields", "Enter your email and password.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Mismatch", "Passwords don't match.");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Too short", "Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    const { error } = await getSupabaseClient().auth.signUp({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (error) {
      Alert.alert("Signup failed", error.message);
    } else {
      Alert.alert(
        "Check your email",
        "We sent a confirmation link to " + email.trim() + ". Tap it to activate your account, then come back and log in."
      );
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join 4,500+ questions with step-by-step math
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
            textContentType="newPassword"
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
            textContentType="newPassword"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <Pressable
            style={[styles.button, styles.primaryButton]}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.primaryButtonText}>Sign Up</Text>
            )}
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/(auth)/login" asChild>
            <Pressable>
              <Text style={styles.footerLink}>Log In</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.navy },
  container: {
    flexGrow: 1,
    padding: spacing[6],
    justifyContent: "center",
  },
  header: { alignItems: "center", marginBottom: spacing[8] },
  title: {
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.extrabold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    marginTop: spacing[2],
    textAlign: "center",
  },
  form: { gap: spacing[3] },
  input: {
    backgroundColor: colors.navyCard,
    borderRadius: radius.md,
    padding: spacing[4],
    color: colors.textPrimary,
    fontSize: fontSize.base,
    borderWidth: 1,
    borderColor: colors.navyBorder,
  },
  button: {
    borderRadius: radius.md,
    padding: spacing[4],
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
    marginTop: spacing[2],
  },
  primaryButton: { backgroundColor: colors.accent },
  primaryButtonText: {
    color: colors.white,
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing[8],
  },
  footerText: { color: colors.textSecondary, fontSize: fontSize.sm },
  footerLink: {
    color: colors.accent,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
});
