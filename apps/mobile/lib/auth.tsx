import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseClient } from "./supabase";
import {
  configurePurchases,
  identifyPurchaser,
  resetPurchaser,
} from "./purchases";

interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({
  session: null,
  user: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Configure RevenueCat once, before we know the user — safe no-op if the
    // SDK key is unset (dev / Expo Go).
    configurePurchases();

    const supabase = getSupabaseClient();

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setLoading(false);
      if (s?.user) void identifyPurchaser(s.user.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, s) => {
      setSession(s);
      setLoading(false);
      // Keep RevenueCat's app_user_id in lockstep with the Supabase session so
      // the webhook can resolve the right profile row.
      if (event === "SIGNED_OUT") void resetPurchaser();
      else if (s?.user) void identifyPurchaser(s.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await getSupabaseClient().auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user ?? null, loading, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
