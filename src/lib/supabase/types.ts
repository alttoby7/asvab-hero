export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      // ── Content tables (public-read) ──────────────────────────────────
      topics: {
        Row: {
          id: string;
          subtest: string;
          slug: string;
          title: string;
          sort_order: number;
          active: boolean;
        };
        Insert: {
          id: string;
          subtest: string;
          slug: string;
          title: string;
          sort_order?: number;
          active?: boolean;
        };
        Update: {
          id?: string;
          subtest?: string;
          slug?: string;
          title?: string;
          sort_order?: number;
          active?: boolean;
        };
      };
      practice_questions: {
        Row: {
          id: string;
          external_key: string;
          subtest: string;
          topic_id: string;
          difficulty: number;
          stem: string;
          choices: Json;
          correct_index: number;
          explanation: string;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          external_key: string;
          subtest: string;
          topic_id: string;
          difficulty: number;
          stem: string;
          choices: Json;
          correct_index: number;
          explanation: string;
          active?: boolean;
          created_at?: string;
        };
        Update: Partial<{
          id?: string;
          external_key?: string;
          subtest?: string;
          topic_id?: string;
          difficulty?: number;
          stem?: string;
          choices?: Json;
          correct_index?: number;
          explanation?: string;
          active?: boolean;
          created_at?: string;
        }>;
      };
      test_variants: {
        Row: {
          code: string;
          name: string;
          rules: Json;
          active: boolean;
        };
        Insert: {
          code: string;
          name: string;
          rules: Json;
          active?: boolean;
        };
        Update: {
          code?: string;
          name?: string;
          rules?: Json;
          active?: boolean;
        };
      };
      flashcard_decks: {
        Row: {
          id: string;
          slug: string;
          topic_id: string;
          title: string;
          description: string | null;
          active: boolean;
        };
        Insert: {
          id?: string;
          slug: string;
          topic_id: string;
          title: string;
          description?: string | null;
          active?: boolean;
        };
        Update: Partial<{
          id?: string;
          slug?: string;
          topic_id?: string;
          title?: string;
          description?: string | null;
          active?: boolean;
        }>;
      };
      flashcard_cards: {
        Row: {
          id: string;
          deck_id: string;
          topic_id: string;
          difficulty: number;
          front: string;
          back: string;
          explanation: string | null;
          sort_order: number;
          active: boolean;
        };
        Insert: {
          id?: string;
          deck_id: string;
          topic_id: string;
          difficulty: number;
          front: string;
          back: string;
          explanation?: string | null;
          sort_order?: number;
          active?: boolean;
        };
        Update: Partial<{
          id?: string;
          deck_id?: string;
          topic_id?: string;
          difficulty?: number;
          front?: string;
          back?: string;
          explanation?: string | null;
          sort_order?: number;
          active?: boolean;
        }>;
      };
      // ── State tables (RLS-protected) ──────────────────────────────────
      profiles: {
        Row: {
          user_id: string;
          email: string;
          display_name: string | null;
          timezone: string;
          marketing_opt_in: boolean;
          daily_email_opt_in: boolean;
          streak_count: number;
          last_challenge_completed_on: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          email: string;
          display_name?: string | null;
          timezone?: string;
          marketing_opt_in?: boolean;
          daily_email_opt_in?: boolean;
          streak_count?: number;
          last_challenge_completed_on?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          email?: string;
          display_name?: string | null;
          timezone?: string;
          marketing_opt_in?: boolean;
          daily_email_opt_in?: boolean;
          streak_count?: number;
          last_challenge_completed_on?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      attempts: {
        Row: {
          id: string;
          user_id: string;
          client_attempt_id: string | null;
          variant_code: string;
          source: string;
          subtest: string | null;
          topic_id: string | null;
          started_at: string;
          completed_at: string;
          duration_seconds: number;
          question_count: number;
          correct_count: number;
          afqt_estimate: number | null;
          results_by_subtest: Json;
          results_by_topic: Json;
          question_results: Json;
          synced_from_local: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          client_attempt_id?: string | null;
          variant_code: string;
          source: string;
          subtest?: string | null;
          topic_id?: string | null;
          started_at: string;
          completed_at: string;
          duration_seconds: number;
          question_count: number;
          correct_count: number;
          afqt_estimate?: number | null;
          results_by_subtest: Json;
          results_by_topic: Json;
          question_results: Json;
          synced_from_local?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          client_attempt_id?: string | null;
          variant_code?: string;
          source?: string;
          subtest?: string | null;
          topic_id?: string | null;
          started_at?: string;
          completed_at?: string;
          duration_seconds?: number;
          question_count?: number;
          correct_count?: number;
          afqt_estimate?: number | null;
          results_by_subtest?: Json;
          results_by_topic?: Json;
          question_results?: Json;
          synced_from_local?: boolean;
          created_at?: string;
        };
      };
      topic_stats: {
        Row: {
          user_id: string;
          topic_id: string;
          seen: number;
          correct: number;
          posterior: number;
          confidence: number;
          priority: number;
          status: string;
          last_seen_at: string | null;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          topic_id: string;
          seen?: number;
          correct?: number;
          posterior?: number;
          confidence?: number;
          priority?: number;
          status?: string;
          last_seen_at?: string | null;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          topic_id?: string;
          seen?: number;
          correct?: number;
          posterior?: number;
          confidence?: number;
          priority?: number;
          status?: string;
          last_seen_at?: string | null;
          updated_at?: string;
        };
      };
      flashcard_reviews: {
        Row: {
          user_id: string;
          card_id: string;
          ease_factor: number;
          interval_days: number;
          repetitions: number;
          due_at: string;
          last_reviewed_at: string | null;
          last_quality: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          card_id: string;
          ease_factor?: number;
          interval_days?: number;
          repetitions?: number;
          due_at?: string;
          last_reviewed_at?: string | null;
          last_quality?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          card_id?: string;
          ease_factor?: number;
          interval_days?: number;
          repetitions?: number;
          due_at?: string;
          last_reviewed_at?: string | null;
          last_quality?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      daily_challenges: {
        Row: {
          id: string;
          user_id: string;
          challenge_date: string;
          status: string;
          source: string;
          question_ids: Json;
          topic_mix: Json;
          correct_count: number | null;
          question_results: Json | null;
          completed_at: string | null;
          streak_after_completion: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          challenge_date: string;
          status?: string;
          source: string;
          question_ids: Json;
          topic_mix: Json;
          correct_count?: number | null;
          question_results?: Json | null;
          completed_at?: string | null;
          streak_after_completion?: number | null;
          created_at?: string;
        };
        Update: Partial<{
          id?: string;
          user_id?: string;
          challenge_date?: string;
          status?: string;
          source?: string;
          question_ids?: Json;
          topic_mix?: Json;
          correct_count?: number | null;
          question_results?: Json | null;
          completed_at?: string | null;
          streak_after_completion?: number | null;
          created_at?: string;
        }>;
      };
      study_guide_progress: {
        Row: {
          user_id: string;
          topic_id: string;
          first_viewed_at: string | null;
          last_viewed_at: string | null;
          mini_drill_attempts: number;
          best_mini_drill_pct: number | null;
          last_mini_drill_pct: number | null;
          completed: boolean;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          topic_id: string;
          first_viewed_at?: string | null;
          last_viewed_at?: string | null;
          mini_drill_attempts?: number;
          best_mini_drill_pct?: number | null;
          last_mini_drill_pct?: number | null;
          completed?: boolean;
          updated_at?: string;
        };
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        Update: Partial<{
          user_id?: string;
          topic_id?: string;
          first_viewed_at?: string | null;
          last_viewed_at?: string | null;
          mini_drill_attempts?: number;
          best_mini_drill_pct?: number | null;
          last_mini_drill_pct?: number | null;
          completed?: boolean;
          updated_at?: string;
        }>;
      };
    };
    Views: Record<string, never>;
    Functions: {
      recompute_topic_stats: {
        Args: Record<string, never>;
        Returns: void;
      };
    };
    Enums: Record<string, never>;
  };
}
