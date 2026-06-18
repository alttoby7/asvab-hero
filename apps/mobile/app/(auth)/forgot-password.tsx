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
} from "react-native";
import { useRouter } from "expo-router";
import { colors } from "@asvab-hero/ui-tokens/colors";
import { fontSize, fontWeight } from "@asvab-hero/ui-tokens/typography";
import { spacing, radius } from "@asvab-hero/ui-tokens/spacing";
import { getSupabaseClient } from "../../lib/supabase";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const router = useRouter();

  async function handleReset() {
    if (!email) {
      Alert.alert("Missing email", "Enter the email for your account.");
      return;
    }
    setLoading(true);
    const { error } = await getSupabaseClient().auth.resetPasswordForEmail(
      email.trim()
    );
    setLoading(false);
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      setSent(true);
    }
  }

  if (sent) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Check your email</Text>
        <Text style={styles.subtitle}>
          We sent a password reset link to {email.trim()}. Follow the link to
          reset your password.
        </Text>
        <Pressable
          style={[styles.button, styles.primaryButton]}
          onPress={() => router.replace("/(auth)/login")}
        >
          <Text style={styles.primaryButtonText}>Back to Login</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Enter your email and we'll send a reset link.
        </Text>

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

          <Pressable
            style={[styles.button, styles.primaryButton]}
            onPress={handleReset}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.primaryButtonText}>Send Reset Link</Text>
            )}
          </Pressable>
        </View>

        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>Back to Login</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.navy },
  container: {
    flex: 1,
    padding: spacing[6],
    justifyContent: "center",
    backgroundColor: colors.navy,
  },
  title: {
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.extrabold,
    color: colors.textPrimary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    marginTop: spacing[2],
    textAlign: "center",
    marginBottom: spacing[8],
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
  backLink: {
    color: colors.accent,
    fontSize: fontSize.sm,
    textAlign: "center",
    marginTop: spacing[6],
  },
});
