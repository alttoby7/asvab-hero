# Phase 2 — Core Study Loop Continuity (2026-06-18)

## Status: COMPLETE on branch `mobile/phase2-study-loop` (commit `648cb94`, pushed)

All 5 sprints implemented, type-checked clean, Metro starts. NOT yet merged to main.

## What's Done

### Sprint 1-2: Practice Test Flow
- **`packages/domain/src/sampler.ts`** — Extracted pure `sampleForVariant()` from web
- **`packages/api/src/queries.ts`** (~340 lines) — Platform-agnostic Supabase queries: `loadVariant`, `loadActiveVariants`, `loadQuestionPool`, `saveAttempt`, `checkHasActivePro`, `getHomeTrajectory`, `loadProfile`, `getSessionForDate`, `createSession`, `advanceSession`, `completeSession`, `getDueMistakeCount`, `getAttemptCount`
- **`apps/mobile/lib/stores/practice-store.ts`** — Zustand store with state machine: idle→loading→intro→testing→review→results
- **`apps/mobile/components/QuestionCard.tsx`** — 4-option Pressable buttons, haptic feedback, confidence buttons, explanation reveal
- **`apps/mobile/components/ProgressBar.tsx`** — Tappable dot grid
- **`apps/mobile/components/Timer.tsx`** — Absolute startTime (survives backgrounding), red at <60s
- **`apps/mobile/components/PracticeTestEngine.tsx`** — Orchestrates test phases, embedded mode for session integration
- **`apps/mobile/components/ResultsScreen.tsx`** — Score circle, AFQT estimate, subtest bars
- **`apps/mobile/components/VariantPicker.tsx`** — Diagnostic/Drill/Adaptive cards with pro gating
- **`apps/mobile/app/practice-test.tsx`** — fullScreenModal route

### Sprint 3: Home Screen + Trajectory
- **`apps/mobile/lib/stores/home-store.ts`** — Loads trajectory + profile
- **`apps/mobile/components/TrajectoryCard.tsx`** — AFQT band, bar with 31/50/65 markers, confidence indicator
- **`apps/mobile/components/StreakCard.tsx`** — Flame icon + streak count
- **`apps/mobile/app/(tabs)/index.tsx`** — Time-of-day greeting, trajectory card, streak card, quick start actions

### Sprint 4: Daily Session Engine
- **`apps/mobile/lib/stores/session-store.ts`** — `loadOrCreateSession` gathers inputs + calls `buildSession()` from domain
- **`apps/mobile/components/MissionPathStepper.tsx`** — Vertical stepper with connected lines, station icons
- **`apps/mobile/components/SessionDebrief.tsx`** — Error tagging (Concept/Setup/Careless/Time)
- **`apps/mobile/components/SessionEngine.tsx`** — Orchestrates daily mission, embeds PracticeTestEngine per station

### Sprint 5: Pro Gating
- **`apps/mobile/lib/pro-gate.ts`** — `canStartVariant()` + `gateMessage()`
- **`apps/mobile/components/ProGateModal.tsx`** — Bottom sheet with upgrade CTA (deep-links to web)

## Key Architectural Decisions
- API queries accept `SupabaseClient` parameter (platform-agnostic, no internal import)
- `HomeTrajectory` type re-exported from domain (not duplicated in API package)
- Session engine embeds PracticeTestEngine with `embedded=true` + callbacks
- Pro gate uses Modal + `Linking.openURL` for upgrade (native IAP = Phase 4)
- No SQLite persistence yet (online-first)
- Auth required (no anonymous path)

## Known Issues
- `expo-haptics` and `react-native-reanimated` NOT in `app.json` plugins (cause Node 22 ESM compat error in config plugin loader; they work at runtime without plugins in Expo Go)
- `expo export` fails due to Node 22 ESM/CJS issue; `expo start` works fine
- Web app's `sampler.ts` NOT yet updated to import from shared domain package (still has local copy)

## Next Steps
- Merge to main after testing on device/simulator via Expo Go
- Update web's `sampler.ts` to use `@asvab-hero/domain/sampler`
- Phase 3: Offline-first (SQLite), Phase 4: Native IAP
