export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          attempt_id: string | null
          auth_state: string
          client_ts: string | null
          entry_surface: string | null
          event_name: string
          id: string
          paywall_context_id: string | null
          probable_reason_category: string | null
          props: Json
          received_at: string
          session_id: string
          subtest: string | null
          user_id: string | null
          variant: string | null
        }
        Insert: {
          attempt_id?: string | null
          auth_state: string
          client_ts?: string | null
          entry_surface?: string | null
          event_name: string
          id?: string
          paywall_context_id?: string | null
          probable_reason_category?: string | null
          props?: Json
          received_at?: string
          session_id: string
          subtest?: string | null
          user_id?: string | null
          variant?: string | null
        }
        Update: {
          attempt_id?: string | null
          auth_state?: string
          client_ts?: string | null
          entry_surface?: string | null
          event_name?: string
          id?: string
          paywall_context_id?: string | null
          probable_reason_category?: string | null
          props?: Json
          received_at?: string
          session_id?: string
          subtest?: string | null
          user_id?: string | null
          variant?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "attempts"
            referencedColumns: ["id"]
          },
        ]
      }
      attempts: {
        Row: {
          afqt_estimate: number | null
          client_attempt_id: string | null
          completed_at: string
          correct_count: number
          created_at: string
          duration_seconds: number
          id: string
          question_count: number
          question_results: Json
          results_by_subtest: Json
          results_by_topic: Json
          source: string
          started_at: string
          subtest: string | null
          synced_from_local: boolean
          topic_id: string | null
          user_id: string
          variant_code: string
        }
        Insert: {
          afqt_estimate?: number | null
          client_attempt_id?: string | null
          completed_at: string
          correct_count: number
          created_at?: string
          duration_seconds: number
          id?: string
          question_count: number
          question_results: Json
          results_by_subtest: Json
          results_by_topic: Json
          source: string
          started_at: string
          subtest?: string | null
          synced_from_local?: boolean
          topic_id?: string | null
          user_id: string
          variant_code: string
        }
        Update: {
          afqt_estimate?: number | null
          client_attempt_id?: string | null
          completed_at?: string
          correct_count?: number
          created_at?: string
          duration_seconds?: number
          id?: string
          question_count?: number
          question_results?: Json
          results_by_subtest?: Json
          results_by_topic?: Json
          source?: string
          started_at?: string
          subtest?: string | null
          synced_from_local?: boolean
          topic_id?: string | null
          user_id?: string
          variant_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "attempts_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "attempts_variant_code_fkey"
            columns: ["variant_code"]
            isOneToOne: false
            referencedRelation: "test_variants"
            referencedColumns: ["code"]
          },
        ]
      }
      daily_challenges: {
        Row: {
          challenge_date: string
          completed_at: string | null
          correct_count: number | null
          created_at: string
          id: string
          question_ids: Json
          question_results: Json | null
          source: string
          status: string
          streak_after_completion: number | null
          topic_mix: Json
          user_id: string
        }
        Insert: {
          challenge_date: string
          completed_at?: string | null
          correct_count?: number | null
          created_at?: string
          id?: string
          question_ids: Json
          question_results?: Json | null
          source: string
          status?: string
          streak_after_completion?: number | null
          topic_mix: Json
          user_id: string
        }
        Update: {
          challenge_date?: string
          completed_at?: string | null
          correct_count?: number | null
          created_at?: string
          id?: string
          question_ids?: Json
          question_results?: Json | null
          source?: string
          status?: string
          streak_after_completion?: number | null
          topic_mix?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_challenges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      feedback_responses: {
        Row: {
          answer_key: string
          auth_state: string | null
          client_ts: string | null
          free_text: string | null
          id: string
          paywall_context_id: string | null
          question_key: string
          received_at: string
          session_id: string | null
          trigger: string
          user_id: string | null
        }
        Insert: {
          answer_key: string
          auth_state?: string | null
          client_ts?: string | null
          free_text?: string | null
          id?: string
          paywall_context_id?: string | null
          question_key: string
          received_at?: string
          session_id?: string | null
          trigger: string
          user_id?: string | null
        }
        Update: {
          answer_key?: string
          auth_state?: string | null
          client_ts?: string | null
          free_text?: string | null
          id?: string
          paywall_context_id?: string | null
          question_key?: string
          received_at?: string
          session_id?: string | null
          trigger?: string
          user_id?: string | null
        }
        Relationships: []
      }
      flashcard_cards: {
        Row: {
          active: boolean
          back: string
          deck_id: string
          difficulty: number
          explanation: string | null
          external_key: string
          front: string
          id: string
          sort_order: number
          topic_id: string
        }
        Insert: {
          active?: boolean
          back: string
          deck_id: string
          difficulty: number
          explanation?: string | null
          external_key: string
          front: string
          id?: string
          sort_order?: number
          topic_id: string
        }
        Update: {
          active?: boolean
          back?: string
          deck_id?: string
          difficulty?: number
          explanation?: string | null
          external_key?: string
          front?: string
          id?: string
          sort_order?: number
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "flashcard_cards_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "flashcard_decks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flashcard_cards_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcard_decks: {
        Row: {
          active: boolean
          description: string | null
          id: string
          slug: string
          title: string
          topic_id: string
        }
        Insert: {
          active?: boolean
          description?: string | null
          id?: string
          slug: string
          title: string
          topic_id: string
        }
        Update: {
          active?: boolean
          description?: string | null
          id?: string
          slug?: string
          title?: string
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "flashcard_decks_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcard_reviews: {
        Row: {
          card_id: string
          created_at: string
          due_at: string
          ease_factor: number
          interval_days: number
          last_quality: number | null
          last_reviewed_at: string | null
          repetitions: number
          updated_at: string
          user_id: string
        }
        Insert: {
          card_id: string
          created_at?: string
          due_at?: string
          ease_factor?: number
          interval_days?: number
          last_quality?: number | null
          last_reviewed_at?: string | null
          repetitions?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          card_id?: string
          created_at?: string
          due_at?: string
          ease_factor?: number
          interval_days?: number
          last_quality?: number | null
          last_reviewed_at?: string | null
          repetitions?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "flashcard_reviews_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "flashcard_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flashcard_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      payment_failed_emails: {
        Row: {
          attempt_count: number | null
          billing_reason: string | null
          collection_method: string | null
          created_at: string
          invoice_id: string
          next_payment_attempt_at: string | null
          recovered_at: string | null
          resend_id: string | null
          sent_at: string | null
          status: string | null
          subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          attempt_count?: number | null
          billing_reason?: string | null
          collection_method?: string | null
          created_at?: string
          invoice_id: string
          next_payment_attempt_at?: string | null
          recovered_at?: string | null
          resend_id?: string | null
          sent_at?: string | null
          status?: string | null
          subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          attempt_count?: number | null
          billing_reason?: string | null
          collection_method?: string | null
          created_at?: string
          invoice_id?: string
          next_payment_attempt_at?: string | null
          recovered_at?: string | null
          resend_id?: string | null
          sent_at?: string | null
          status?: string | null
          subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_failed_emails_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      practice_questions: {
        Row: {
          active: boolean
          choices: Json
          content_version: number
          correct_index: number
          created_at: string
          difficulty: number
          explanation: string
          external_key: string
          id: string
          status: string
          stem: string
          subtest: string
          topic_id: string
        }
        Insert: {
          active?: boolean
          choices: Json
          content_version?: number
          correct_index: number
          created_at?: string
          difficulty: number
          explanation: string
          external_key: string
          id?: string
          status?: string
          stem: string
          subtest: string
          topic_id: string
        }
        Update: {
          active?: boolean
          choices?: Json
          content_version?: number
          correct_index?: number
          created_at?: string
          difficulty?: number
          explanation?: string
          external_key?: string
          id?: string
          status?: string
          stem?: string
          subtest?: string
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "practice_questions_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          billing_status: string
          branch: string | null
          created_at: string
          daily_email_opt_in: boolean
          display_name: string | null
          email: string
          free_diagnostic_used_at: string | null
          last_challenge_completed_on: string | null
          last_mistake_reminder_on: string | null
          marketing_opt_in: boolean
          milestone_50q_email_sent_at: string | null
          onboarding_completed_at: string | null
          pro_tier: string | null
          pro_until: string | null
          pro_updated_at: string | null
          self_reported_weakest_subtest: string | null
          signup_source: string | null
          streak_count: number
          stripe_customer_id: string | null
          stripe_price_id: string | null
          stripe_subscription_id: string | null
          target_test_date: string | null
          target_test_date_bucket: string | null
          timezone: string
          trial_converted_email_invoice_id: string | null
          trial_converted_email_resend_id: string | null
          trial_converted_email_sent_at: string | null
          trial_converted_email_status: string | null
          trial_day2_email_sent_at: string | null
          trial_ending_email_sent_at: string | null
          trial_ending_email_status: string | null
          trial_ending_email_stripe_event_id: string | null
          trial_ends_at: string | null
          updated_at: string
          user_id: string
          welcome_email_resend_id: string | null
          welcome_email_sent_at: string | null
          welcome_email_status: string | null
        }
        Insert: {
          billing_status?: string
          branch?: string | null
          created_at?: string
          daily_email_opt_in?: boolean
          display_name?: string | null
          email: string
          free_diagnostic_used_at?: string | null
          last_challenge_completed_on?: string | null
          last_mistake_reminder_on?: string | null
          marketing_opt_in?: boolean
          milestone_50q_email_sent_at?: string | null
          onboarding_completed_at?: string | null
          pro_tier?: string | null
          pro_until?: string | null
          pro_updated_at?: string | null
          self_reported_weakest_subtest?: string | null
          signup_source?: string | null
          streak_count?: number
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          target_test_date?: string | null
          target_test_date_bucket?: string | null
          timezone?: string
          trial_converted_email_invoice_id?: string | null
          trial_converted_email_resend_id?: string | null
          trial_converted_email_sent_at?: string | null
          trial_converted_email_status?: string | null
          trial_day2_email_sent_at?: string | null
          trial_ending_email_sent_at?: string | null
          trial_ending_email_status?: string | null
          trial_ending_email_stripe_event_id?: string | null
          trial_ends_at?: string | null
          updated_at?: string
          user_id: string
          welcome_email_resend_id?: string | null
          welcome_email_sent_at?: string | null
          welcome_email_status?: string | null
        }
        Update: {
          billing_status?: string
          branch?: string | null
          created_at?: string
          daily_email_opt_in?: boolean
          display_name?: string | null
          email?: string
          free_diagnostic_used_at?: string | null
          last_challenge_completed_on?: string | null
          last_mistake_reminder_on?: string | null
          marketing_opt_in?: boolean
          milestone_50q_email_sent_at?: string | null
          onboarding_completed_at?: string | null
          pro_tier?: string | null
          pro_until?: string | null
          pro_updated_at?: string | null
          self_reported_weakest_subtest?: string | null
          signup_source?: string | null
          streak_count?: number
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          target_test_date?: string | null
          target_test_date_bucket?: string | null
          timezone?: string
          trial_converted_email_invoice_id?: string | null
          trial_converted_email_resend_id?: string | null
          trial_converted_email_sent_at?: string | null
          trial_converted_email_status?: string | null
          trial_day2_email_sent_at?: string | null
          trial_ending_email_sent_at?: string | null
          trial_ending_email_status?: string | null
          trial_ending_email_stripe_event_id?: string | null
          trial_ends_at?: string | null
          updated_at?: string
          user_id?: string
          welcome_email_resend_id?: string | null
          welcome_email_sent_at?: string | null
          welcome_email_status?: string | null
        }
        Relationships: []
      }
      question_reviews: {
        Row: {
          content_version: number
          created_at: string
          due_at: string
          ease_factor: number
          interval_days: number
          lapses: number
          last_quality: number | null
          last_reviewed_at: string | null
          question_id: string
          repetitions: number
          resolved: boolean
          subtest: string
          topic_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content_version?: number
          created_at?: string
          due_at?: string
          ease_factor?: number
          interval_days?: number
          lapses?: number
          last_quality?: number | null
          last_reviewed_at?: string | null
          question_id: string
          repetitions?: number
          resolved?: boolean
          subtest: string
          topic_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content_version?: number
          created_at?: string
          due_at?: string
          ease_factor?: number
          interval_days?: number
          lapses?: number
          last_quality?: number | null
          last_reviewed_at?: string | null
          question_id?: string
          repetitions?: number
          resolved?: boolean
          subtest?: string
          topic_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_reviews_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      stripe_webhook_events: {
        Row: {
          api_version: string | null
          attempt_count: number
          event_type: string
          id: string
          last_error: string | null
          livemode: boolean
          payload: Json
          processed_at: string | null
          received_at: string
          status: string
          stripe_created: string
          stripe_event_id: string
          updated_at: string
        }
        Insert: {
          api_version?: string | null
          attempt_count?: number
          event_type: string
          id?: string
          last_error?: string | null
          livemode: boolean
          payload: Json
          processed_at?: string | null
          received_at?: string
          status: string
          stripe_created: string
          stripe_event_id: string
          updated_at?: string
        }
        Update: {
          api_version?: string | null
          attempt_count?: number
          event_type?: string
          id?: string
          last_error?: string | null
          livemode?: boolean
          payload?: Json
          processed_at?: string | null
          received_at?: string
          status?: string
          stripe_created?: string
          stripe_event_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      study_guide_progress: {
        Row: {
          best_mini_drill_pct: number | null
          completed: boolean
          first_viewed_at: string | null
          last_mini_drill_pct: number | null
          last_viewed_at: string | null
          mini_drill_attempts: number
          topic_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          best_mini_drill_pct?: number | null
          completed?: boolean
          first_viewed_at?: string | null
          last_mini_drill_pct?: number | null
          last_viewed_at?: string | null
          mini_drill_attempts?: number
          topic_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          best_mini_drill_pct?: number | null
          completed?: boolean
          first_viewed_at?: string | null
          last_mini_drill_pct?: number | null
          last_viewed_at?: string | null
          mini_drill_attempts?: number
          topic_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_guide_progress_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_guide_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      test_variants: {
        Row: {
          active: boolean
          code: string
          name: string
          rules: Json
        }
        Insert: {
          active?: boolean
          code: string
          name: string
          rules: Json
        }
        Update: {
          active?: boolean
          code?: string
          name?: string
          rules?: Json
        }
        Relationships: []
      }
      topic_stats: {
        Row: {
          confidence: number
          correct: number
          last_seen_at: string | null
          posterior: number
          priority: number
          seen: number
          status: string
          topic_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          confidence?: number
          correct?: number
          last_seen_at?: string | null
          posterior?: number
          priority?: number
          seen?: number
          status?: string
          topic_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          confidence?: number
          correct?: number
          last_seen_at?: string | null
          posterior?: number
          priority?: number
          seen?: number
          status?: string
          topic_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "topic_stats_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "topic_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      topics: {
        Row: {
          active: boolean
          id: string
          slug: string
          sort_order: number
          subtest: string
          title: string
        }
        Insert: {
          active?: boolean
          id: string
          slug: string
          sort_order?: number
          subtest: string
          title: string
        }
        Update: {
          active?: boolean
          id?: string
          slug?: string
          sort_order?: number
          subtest?: string
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      apply_question_grade: {
        Args: {
          p_correct: boolean
          p_now?: string
          p_question_id: string
          p_subtest: string
          p_topic_id: string
          p_user_id: string
        }
        Returns: undefined
      }
      grade_flashcard_review: {
        Args: { p_card_id: string; p_quality: number }
        Returns: undefined
      }
      grade_question_review: {
        Args: { p_correct: boolean; p_question_id: string }
        Returns: undefined
      }
      has_active_pro: { Args: { p_user_id?: string }; Returns: boolean }
      recompute_topic_stats: {
        Args: { p_topic_ids: string[]; p_user_id: string }
        Returns: undefined
      }
      sm2_next: {
        Args: {
          p_ease: number
          p_interval: number
          p_now: string
          p_quality: number
          p_reps: number
        }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
