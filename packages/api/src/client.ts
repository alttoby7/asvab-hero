import { createClient, type SupabaseClientOptions } from "@supabase/supabase-js";
import type { Database } from "./types";

export type SupabaseClient = ReturnType<typeof createClient<Database>>;

export interface StorageAdapter {
  getItem: (key: string) => Promise<string | null> | string | null;
  setItem: (key: string, value: string) => Promise<void> | void;
  removeItem: (key: string) => Promise<void> | void;
}

export interface CreateClientOptions {
  url: string;
  anonKey: string;
  storage?: StorageAdapter;
  autoRefreshToken?: boolean;
  persistSession?: boolean;
  detectSessionInUrl?: boolean;
}

export function createSupabaseClient(opts: CreateClientOptions): SupabaseClient {
  const supabaseOpts: SupabaseClientOptions<"public"> = {
    auth: {
      autoRefreshToken: opts.autoRefreshToken ?? true,
      persistSession: opts.persistSession ?? true,
      detectSessionInUrl: opts.detectSessionInUrl ?? true,
      ...(opts.storage ? { storage: opts.storage } : {}),
    },
  };

  return createClient<Database>(opts.url, opts.anonKey, supabaseOpts);
}

export interface RpcClient {
  rpc: (
    fn: string,
    args?: Record<string, unknown>
  ) => Promise<{ data: unknown; error: { message: string } | null }>;
}
