# Monorepo Phase 1 — Continuity (2026-06-18)

## Status: PHASE 1 COMPLETE — branch `mobile-phase1-remaining` (not yet merged)

Web app prod deploy is untouched — CF Pages still auto-deploys from `main`. All new work is on `mobile-phase1-remaining`.

## What's Done

### 1. Monorepo Restructure (commit `c090fb1`, merged to main)
- **pnpm workspaces** (`pnpm-workspace.yaml`) + **Turborepo** (`turbo.json`) at repo root
- Existing Next.js app moved to `apps/web/` via `git mv` (preserves history)
- `pnpm build` from root runs turbo → builds web app (~55s clean)

### 2. `@asvab-hero/domain` Package (21 TS files, merged to main)
Pure business logic, zero framework dependencies. Scoring, adaptive selector, session builder, trajectory inference.

### 3. `@asvab-hero/content` Package (4 TS + 10 JSON, merged to main)
Topic catalog, subtest metadata, study topics, all job data.

### 4. Expo Mobile App Scaffold (commit `cb11f03`, merged to main)
5-tab navigator (Home, Study, Practice, Calc, Profile). Calculator working with domain package.

### 5. `@asvab-hero/ui-tokens` Package (NEW)
```
packages/ui-tokens/src/
├── colors.ts       — Navy palette, accent (orange), blue, semantic (success/danger/warning), text
├── typography.ts   — fontSize scale (xs–5xl), fontWeight, lineHeight
├── spacing.ts      — 4px spacing scale, border radius tokens
└── index.ts
```
All existing mobile screens migrated from hardcoded hex values to token imports.

### 6. `@asvab-hero/api` Package (NEW)
```
packages/api/src/
├── client.ts   — createSupabaseClient() factory, platform-agnostic via StorageAdapter interface
├── types.ts    — Database types (copied from web; 1512 lines, auto-generated from Supabase schema)
└── index.ts    — Re-exports SupabaseClient, RpcClient, Database types
```
Web app continues using its own `@supabase/ssr` client. Mobile uses `@supabase/supabase-js` with `expo-secure-store` via the `StorageAdapter` interface.

### 7. Auth Flow (NEW)
```
apps/mobile/lib/
├── supabase.ts     — React Native Supabase client (expo-secure-store for token persistence)
├── auth.tsx        — AuthProvider context + useAuth() hook (session, user, loading, signOut)
└── google-auth.ts  — Google Sign-In via expo-auth-session + Supabase signInWithIdToken

apps/mobile/app/(auth)/
├── _layout.tsx         — Stack layout for auth screens
├── login.tsx           — Email/password + Apple Sign-In (native) + Google Sign-In
├── signup.tsx          — Email/password registration with confirmation
└── forgot-password.tsx — Password reset via Supabase email
```

**Auth routing:** Root `_layout.tsx` wraps app with `AuthProvider`. `AuthGate` component redirects unauthenticated users to `/(auth)/login` and authenticated users to `/(tabs)`. Uses `expo-router` `useSegments` + `useRouter` for navigation.

**Social auth:**
- **Apple Sign-In**: Native via `expo-apple-authentication`. Passes `identityToken` to `supabase.auth.signInWithIdToken({ provider: 'apple' })`. iOS only.
- **Google Sign-In**: `expo-auth-session` OAuth flow with ID token → `supabase.auth.signInWithIdToken({ provider: 'google' })`. Requires `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` env var.

### 8. EAS Build Setup (NEW)
- `eas.json` with development (simulator), preview (internal), and production profiles
- `app.json` updated with `usesAppleSignIn`, `expo-secure-store` plugin, `expo-apple-authentication` plugin
- `.env.example` documents required env vars: `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`, `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`

### 9. Tab Icons (NEW)
Replaced placeholder text characters with `@expo/vector-icons` Ionicons:
- Home: `home`, Study: `book`, Practice: `clipboard`, Calc: `calculator`, Profile: `person`

## Before Running

```bash
cd ~/dev/asvab-hero
git checkout mobile-phase1-remaining
export PATH="$HOME/.local/bin:$PATH"
pnpm install

# Create .env for mobile:
cp apps/mobile/.env.example apps/mobile/.env
# Fill in EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY
# (same values as NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY from web)

# Verify web still builds:
pnpm build

# Run mobile (Expo Go or dev build):
cd apps/mobile && npx expo start
```

## Remaining Before EAS First Build

1. **Run `eas init`** from `apps/mobile/` to register the project and fill `extra.eas.projectId` in app.json
2. **Apple Developer setup**: Enable "Sign in with Apple" capability in App Store Connect
3. **Google Cloud**: Create OAuth 2.0 client ID, set `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`
4. **Supabase auth providers**: Enable Apple and Google providers in Supabase dashboard (Authentication → Providers)
5. **Run `eas build --profile development --platform ios`** for first dev build

## Phase 2 Preview (Days 21-45)

Next up: Core study loop — QuestionCard component, PracticeTestEngine, SessionEngine, Results screen, SQLite integration, timer. See full plan at `~/.claude/plans/yes-be-very-specific-dazzling-pebble.md`.
