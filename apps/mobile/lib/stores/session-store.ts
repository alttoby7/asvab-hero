import { create } from "zustand";
import type { SessionPlan, StationState, BuildSessionInput } from "@asvab-hero/domain/session";
import { buildSession, firstIncompleteStation } from "@asvab-hero/domain/session";
import {
  getSessionForDate,
  createSession,
  advanceSession,
  completeSession,
  getHomeTrajectory,
  loadProfile,
  getDueMistakeCount,
  getAttemptCount,
} from "@asvab-hero/api";
import type { AsvabSubtest } from "@asvab-hero/domain/types";
import { getSupabaseClient } from "../supabase";

type SessionStatus = "idle" | "loading" | "active" | "completed" | "error";

interface SessionState {
  plan: SessionPlan | null;
  sessionId: string | null;
  currentStation: number;
  stationStates: Record<number, StationState>;
  status: SessionStatus;
  error: string | null;
  loadOrCreateSession: (userId: string) => Promise<void>;
  completeStation: (index: number, summary?: Partial<StationState>) => void;
  advanceToStation: (index: number) => Promise<void>;
  finishSession: (userId: string) => Promise<void>;
  reset: () => void;
}

function todayLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  plan: null,
  sessionId: null,
  currentStation: 0,
  stationStates: {},
  status: "idle",
  error: null,

  async loadOrCreateSession(userId: string) {
    set({ status: "loading", error: null });
    try {
      const client = getSupabaseClient();
      const sessionDate = todayLocal();

      const existing = await getSessionForDate(client, userId, sessionDate);
      if (existing) {
        const plan = existing.plan as SessionPlan;
        const stationStates = (existing.state as Record<number, StationState>) ?? {};
        const currentStation = firstIncompleteStation(
          plan,
          Object.fromEntries(
            Object.entries(stationStates).map(([k, v]) => [k, v.completed])
          )
        );
        set({
          plan,
          sessionId: existing.id,
          currentStation: currentStation >= 0 ? currentStation : plan.stations.length - 1,
          stationStates,
          status: existing.status === "completed" ? "completed" : "active",
        });
        return;
      }

      const [trajectory, profile, dueMistakeCount, attemptCount] = await Promise.all([
        getHomeTrajectory(client),
        loadProfile(client, userId),
        getDueMistakeCount(client, userId),
        getAttemptCount(client, userId),
      ]);

      const weakestSubtest: AsvabSubtest =
        (trajectory?.current_standing.subtest_estimates
          ? (Object.entries(trajectory.current_standing.subtest_estimates)
              .filter(([, v]) => v != null)
              .sort(([, a], [, b]) => (a!.point ?? 100) - (b!.point ?? 100))[0]?.[0] as AsvabSubtest)
          : null) ?? "AR";

      const daysToTest = profile?.target_test_date
        ? Math.max(0, Math.ceil((new Date(profile.target_test_date).getTime() - Date.now()) / 86400000))
        : null;

      const input: BuildSessionInput = {
        attemptCount,
        confidence: trajectory?.current_standing.overall_confidence ?? "low",
        dueMistakeCount,
        weakTopicGuide: null,
        weakestSubtest,
        daysToTest,
        sessionDate,
        testType: (profile?.test_type as any) ?? null,
        branch: (profile?.branch as any) ?? null,
      };

      const plan = buildSession(input);
      const tier = trajectory?.current_standing.afqt_band_label ?? "unknown";
      const sessionId = await createSession(client, { userId, plan, tier });

      set({
        plan,
        sessionId,
        currentStation: 0,
        stationStates: {},
        status: "active",
      });
    } catch (e: any) {
      set({ status: "error", error: e.message ?? "Failed to load session" });
    }
  },

  completeStation(index: number, summary?: Partial<StationState>) {
    const { stationStates } = get();
    const updated = {
      ...stationStates,
      [index]: { completed: true, ...summary },
    };
    set({ stationStates: updated });
  },

  async advanceToStation(index: number) {
    const { sessionId, stationStates } = get();
    set({ currentStation: index });
    if (sessionId) {
      const client = getSupabaseClient();
      await advanceSession(client, {
        sessionId,
        currentStation: index,
        state: stationStates,
      });
    }
  },

  async finishSession(userId: string) {
    const { sessionId, plan, stationStates } = get();
    if (!sessionId || !plan) return;
    const client = getSupabaseClient();
    await completeSession(client, {
      sessionId,
      userId,
      studyDate: plan.sessionDate,
      state: stationStates,
    });
    set({ status: "completed" });
  },

  reset() {
    set({
      plan: null,
      sessionId: null,
      currentStation: 0,
      stationStates: {},
      status: "idle",
      error: null,
    });
  },
}));
