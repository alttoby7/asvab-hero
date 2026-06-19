import { create } from "zustand";
import type { HomeTrajectory, UserProfile } from "@asvab-hero/api";
import { getHomeTrajectory, loadProfile } from "@asvab-hero/api";
import { getSupabaseClient } from "../supabase";

interface HomeState {
  trajectory: HomeTrajectory | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  loadHome: (userId: string) => Promise<void>;
}

export const useHomeStore = create<HomeState>((set) => ({
  trajectory: null,
  profile: null,
  loading: true,
  error: null,
  async loadHome(userId: string) {
    set({ loading: true, error: null });
    try {
      const client = getSupabaseClient();
      const [trajectory, profile] = await Promise.all([
        getHomeTrajectory(client),
        loadProfile(client, userId),
      ]);
      set({ trajectory, profile, loading: false });
    } catch (e: any) {
      set({ error: e.message ?? "Failed to load", loading: false });
    }
  },
}));
