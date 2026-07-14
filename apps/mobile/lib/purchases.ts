// RevenueCat wrapper — the single place the app talks to the IAP SDK.
//
// Entitlement contract: the RevenueCat entitlement identifier that grants Pro
// is "pro". We link RevenueCat's app_user_id to the Supabase user id (via
// `identify()` right after auth) so the server-side revenuecat-webhook can
// resolve the correct `profiles` row. `has_active_pro` (Supabase RPC) remains
// the cross-platform source of truth; this SDK gives instant local unlock on
// purchase without waiting for the webhook round-trip.

import { Platform } from "react-native";
import Purchases, {
  LOG_LEVEL,
  type CustomerInfo,
  type PurchasesOffering,
} from "react-native-purchases";

// Must match the RevenueCat entitlement identifier exactly (configured in the
// RC dashboard: Product catalog → Entitlements). The existing project uses
// "ASVAB Hero Pro".
export const PRO_ENTITLEMENT = "ASVAB Hero Pro";

const ANDROID_KEY = process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY;
const IOS_KEY = process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY;

let configured = false;

/** Returns the platform public SDK key, or null if unconfigured. */
function apiKey(): string | null {
  if (Platform.OS === "ios") return IOS_KEY ?? null;
  return ANDROID_KEY ?? null;
}

/** True once `configurePurchases()` has run against a real key. */
export function isPurchasesConfigured(): boolean {
  return configured;
}

/**
 * Configure the SDK once at app start. No-ops (without throwing) when the key
 * is missing so the app still runs in dev / Expo Go where the native module or
 * key may be absent.
 */
export function configurePurchases(): void {
  if (configured) return;
  const key = apiKey();
  if (!key) {
    if (__DEV__) console.warn("[purchases] no RevenueCat key set — IAP disabled");
    return;
  }
  try {
    if (__DEV__) Purchases.setLogLevel(LOG_LEVEL.DEBUG);
    Purchases.configure({ apiKey: key });
    configured = true;
  } catch (e) {
    // Native module unavailable (e.g. Expo Go) — degrade gracefully.
    if (__DEV__) console.warn("[purchases] configure failed:", e);
  }
}

/** Link RC's app_user_id to the Supabase user id. Call right after sign-in. */
export async function identifyPurchaser(userId: string): Promise<void> {
  if (!configured) return;
  try {
    await Purchases.logIn(userId);
  } catch (e) {
    if (__DEV__) console.warn("[purchases] logIn failed:", e);
  }
}

/** Reset RC to an anonymous id. Call on sign-out. */
export async function resetPurchaser(): Promise<void> {
  if (!configured) return;
  try {
    await Purchases.logOut();
  } catch (e) {
    if (__DEV__) console.warn("[purchases] logOut failed:", e);
  }
}

/** True if the customer currently holds the "pro" entitlement. */
export function hasProEntitlement(info: CustomerInfo | null | undefined): boolean {
  return !!info?.entitlements.active[PRO_ENTITLEMENT];
}

/** Current cached entitlement state without a network call where possible. */
export async function fetchHasPro(): Promise<boolean> {
  if (!configured) return false;
  try {
    const info = await Purchases.getCustomerInfo();
    return hasProEntitlement(info);
  } catch {
    return false;
  }
}

/** The current default offering, or null if none/unconfigured. */
export async function getCurrentOffering(): Promise<PurchasesOffering | null> {
  if (!configured) return null;
  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current ?? null;
  } catch (e) {
    if (__DEV__) console.warn("[purchases] getOfferings failed:", e);
    return null;
  }
}
