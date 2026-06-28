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
import * as AppleAuthentication from "expo-apple-authentication";
import { colors } from "@asvab-hero/ui-tokens/colors";
import { fontSize, fontWeight } from "@asvab-hero/ui-tokens/typography";
import { spacing, radius } from "@asvab-hero/ui-tokens/spacing";
import { getSupabaseClient } from "../../lib/supabase";
import { signInWithGoogle } from "../../lib/google-auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleEmailLogin() {
    if (!email || !password) {
      Alert.alert("Missing fields", "Enter your email and password.");
      return;
    }
    setLoading(true);
    const { error } = await getSupabaseClient().auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (error) Alert.alert("Login failed", error.message);
  }

  async function handleAppleLogin() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (!credential.identityToken) {
        Alert.alert("Error", "No identity token from Apple.");
        return;
      }
      setLoading(true);
      const { error } = await getSupabaseClient().auth.signInWithIdToken({
        provider: "apple",
        token: credential.identityToken,
      });
      setLoading(false);
      if (error) Alert.alert("Apple login failed", error.message);
    } catch (e: any) {
      if (e.code !== "ERR_REQUEST_CANCELED") {
        Alert.alert("Apple Sign-In error", e.message);
      }
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
          <Text style={styles.logo}>ASVAB Hero</Text>
          <Text style={styles.tagline}>Step-by-step math. Real adaptive study.</Text>
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
            textContentType="password"
            value={password}
            onChangeText={setPassword}
          />

          <Pressable
            style={[styles.button, styles.primaryButton]}
            onPress={handleEmailLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.primaryButtonText}>Log In</Text>
            )}
          </Pressable>

          <Link href="/(auth)/forgot-password" asChild>
            <Pressable>
              <Text style={styles.linkText}>Forgot password?</Text>
            </Pressable>
          </Link>
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialButtons}>
          {Platform.OS === "ios" && (
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
              buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
              cornerRadius={radius.md}
              style={styles.appleButton}
              onPress={handleAppleLogin}
            />
          )}

          <Pressable
            style={[styles.button, styles.googleButton]}
            onPress={async () => {
              try {
                await signInWithGoogle();
              } catch (e: any) {
                Alert.alert("Google Sign-In failed", e.message);
              }
            }}
          >
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Link href="/(auth)/signup" asChild>
            <Pressable>
              <Text style={styles.footerLink}>Sign Up</Text>
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
  header: { alignItems: "center", marginBottom: spacing[10] },
  logo: {
    fontSize: fontSize["4xl"],
    fontWeight: fontWeight.extrabold,
    color: colors.accent,
  },
  tagline: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    marginTop: spacing[2],
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
  },
  primaryButton: { backgroundColor: colors.accent },
  primaryButtonText: {
    color: colors.white,
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
  },
  linkText: {
    color: colors.accent,
    fontSize: fontSize.sm,
    textAlign: "center",
    marginTop: spacing[1],
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing[6],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.navyBorder,
  },
  dividerText: {
    color: colors.textMuted,
    paddingHorizontal: spacing[4],
    fontSize: fontSize.sm,
  },
  socialButtons: { gap: spacing[3] },
  appleButton: { height: 50 },
  googleButton: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
  },
  googleButtonText: {
    color: colors.black,
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
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
