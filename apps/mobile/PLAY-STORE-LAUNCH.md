# ASVAB Hero — Android / Google Play Launch Runbook

Status as of this branch (`mobile/play-iap`): **native IAP code + launch config landed.**
The remaining work is owner-driven dashboard setup (Play Console, RevenueCat, Google
Cloud) plus the build/upload loop. This doc is the checklist.

Goal: get a signed AAB onto a Play **closed-testing** track to start Google's mandatory
14-day / 12-tester window (new personal accounts must clear it before production access).

---

## What the code now does

- **Native IAP via RevenueCat** (`react-native-purchases`). Entitlement id = **`pro`**.
  - `lib/purchases.ts` — configure on app start, `logIn(user.id)` after auth, offerings, restore.
  - `app/paywall.tsx` — full-screen paywall, **data-driven** from the RC "current" offering
    (renders whatever packages/prices you configure — no hardcoded prices), + Restore.
  - Pro gate (`ProGateModal`) and Profile now route to the native paywall instead of the
    old web link. If the RC key is missing (dev), the paywall gracefully falls back to
    `asvabhero.com/upgrade` so no button is ever dead.
- **Cross-platform entitlement**: `supabase/functions/revenuecat-webhook` writes the same
  `profiles.billing_status / pro_tier / pro_until / pro_updated_at` columns the Stripe path
  uses, so `has_active_pro()` unlocks Pro on **both** web and app from one purchase.
  Migration `0053_revenuecat_source.sql` adds informational `pro_source` + `rc_product_id`.

---

## Owner setup — do these in order

### 1. Google Play Console account (HARD GATE — nothing ships without it)
- Go to https://play.google.com/console → confirm the **$25** registration fee is paid and
  **identity verification** is **approved** (can take up to a few days).
- Account type **Individual**, developer name **"ASVAB Hero"** (not "Penrod Products LLC").

### 2. RevenueCat (free tier)
- Create account/project at https://app.revenuecat.com → add an **Android app**
  (package `com.asvabhero.app`).
- Create an **Entitlement** with identifier exactly **`pro`**.
- Create **Products** and an **Offering** (its "current" packages are what the paywall shows).
  Decide the product structure — the code doesn't care. Current web pricing is pass-led
  ($59 90-day, $119 retaker, $14.99/mo); mirror or choose app-native subs. **These map to
  Play SKUs you create in step 5 — so finish RC product config *after* step 5.**
- Copy the **Android public SDK key** (Project → API keys) → this is `EXPO_PUBLIC_REVENUECAT_ANDROID_KEY`.
- Integrations → **Webhooks** → add URL
  `https://abypyprvgvofzrtifgzi.functions.supabase.co/revenuecat-webhook`
  and set the **Authorization header value** to a strong secret → that value =
  the `ASVABHERO_REVENUECAT_WEBHOOK_SECRET` edge secret (step 6).

### 3. Google Cloud — OAuth client  ✅ MISMATCH RESOLVED (2026-07-14)
Verified via the Supabase Management API: the Google provider trusts **only**
`337130544889-qbotomllvt3tae1mcn6a5661o2n67f94...` (project "ASVAB Hero" =
`peppy-ridge-501116-v2`). The app's `.env` had the WRONG client (`792053300211-...`),
which would have made `signInWithIdToken` reject the token. Fixed: `.env` +
`eas.json` (preview+production) now use `337130544889-...qbotomllvt3`.
- Email/password sign-in works regardless.
- ⚠️ **Still to verify on-device:** the app uses expo-auth-session's IdToken flow with
  a **Web** OAuth client + `asvabhero://` redirect. Web clients only accept https
  redirects, so the standalone Google button MAY fail. If it does, switch to
  `@react-native-google-signin/google-signin` (native) — it uses this same Web client
  id for the idToken and needs an **Android** OAuth client (add the EAS keystore SHA-1
  from `eas credentials -p android`). Decide after testing the APK; not launch-blocking.

### 4. First EAS build → keystore
- A preview APK build is already running on this branch (validates native compile).
- After the first build, get the upload keystore SHA-1 if step 3 needs an Android OAuth client:
  `eas credentials -p android`  (Keystore → show fingerprints).

### 5. Play Console app + subscription products
- Create the app (package `com.asvabhero.app`).
- **App content**: privacy policy URL `https://asvabhero.com/privacy`; Data Safety form;
  content rating questionnaire; target audience; ads = **No**; account deletion URL / method
  (the `delete-account` edge function already exists — expose it or point to in-app deletion).
- Set up the **Payments/merchant profile**, then create the **subscription/in-app products**
  matching your RC products from step 2. (Products can't exist until the app + payments profile
  are set up — this is the chicken-and-egg; RC product mapping happens here.)

### 6. Set Supabase edge secrets + deploy the webhook  ✅ DONE (2026-07-14)
- `ASVABHERO_REVENUECAT_WEBHOOK_SECRET` set on project `abypyprvgvofzrtifgzi`.
- `revenuecat-webhook` deployed (`--no-verify-jwt`); smoke-tested: 401 on bad auth,
  200-skip on non-UUID / unknown events.
- Migration 0053 (`pro_source` + `rc_product_id`) applied to prod.
- Webhook secret value (paste into RC's Authorization header, step 2):
  `58d22aad349c843edda1770634828482c2d43c08bc1adebfd88b27d8a0099f34`
- ⚠️ Note: the plain `supabase` MCP points to a DIFFERENT project — always target
  `abypyprvgvofzrtifgzi` explicitly (CLI `--project-ref` or Management API).

### 7. Build env vars (RC key + Google client)
Add the two remaining PUBLIC values so production builds embed them. Either add to
`eas.json` `env` for `preview`+`production`, or as EAS env vars:
```
eas env:create --name EXPO_PUBLIC_REVENUECAT_ANDROID_KEY --value <rc-android-key> \
  --environment preview --environment production --visibility plaintext
eas env:create --name EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID --value <authoritative-client-id> \
  --environment preview --environment production --visibility plaintext
```
(Supabase URL + anon key are already in `eas.json`.)

### 8. Store listing assets (I can generate these on request)
- Feature graphic **1024×512**, app icon 512 (have), 2–8 phone **screenshots** (capture from
  the device build), short description (≤80 chars), full description (≤4000 chars).

### 9. Build the AAB, upload to closed testing
```
eas build -p android --profile production          # produces the AAB
```
- Upload the AAB to a **Closed testing** track (this is the track that satisfies the 14-day /
  12-tester requirement; Internal testing is instant but doesn't start that clock).
- Add ≥12 testers (email list or Google Group). Add **license testers** so purchases don't
  charge real money.
- Once `google-services-key.json` (a Play service account JSON, per `eas.json` submit config)
  exists at `apps/mobile/`, `eas submit -p android` can automate uploads.

---

## Verification (see plan file for the full list)
1. Preview APK installs + runs on a physical Android phone; email login works.
2. After step 3, Google Sign-In works on the build.
3. Diagnostic → results → row in Supabase `attempts`.
4. On the closed build w/ a license tester: buy via the native paywall → app unlocks instantly
   (RC `pro` entitlement) → `revenuecat-webhook` sets `profiles.billing_status='active'`.
5. Same account on asvabhero.com shows Pro (shared `has_active_pro`).
6. Reinstall → "Restore purchases" re-grants Pro.

## Env var reference (`apps/mobile/.env` for local dev)
```
EXPO_PUBLIC_SUPABASE_URL=            # https://abypyprvgvofzrtifgzi.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=       # sb_publishable_...
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=    # ⚠️ reconcile (step 3)
EXPO_PUBLIC_REVENUECAT_ANDROID_KEY=  # from RevenueCat (step 2)
EXPO_PUBLIC_REVENUECAT_IOS_KEY=      # optional, iOS deferred
```
