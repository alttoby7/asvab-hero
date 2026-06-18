import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { getSupabaseClient } from "./supabase";

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

export async function signInWithGoogle() {
  if (!GOOGLE_CLIENT_ID) {
    throw new Error(
      "EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID not set. Configure it in .env."
    );
  }

  const redirectUri = AuthSession.makeRedirectUri({ scheme: "asvabhero" });

  const discovery = {
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
  };

  const request = new AuthSession.AuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    redirectUri,
    scopes: ["openid", "email", "profile"],
    responseType: AuthSession.ResponseType.IdToken,
    usePKCE: false,
  });

  const result = await request.promptAsync(discovery);

  if (result.type !== "success" || !result.params.id_token) {
    if (result.type === "cancel" || result.type === "dismiss") return null;
    throw new Error("Google sign-in failed: " + result.type);
  }

  const { error } = await getSupabaseClient().auth.signInWithIdToken({
    provider: "google",
    token: result.params.id_token,
  });

  if (error) throw error;
  return true;
}
