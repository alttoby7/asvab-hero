import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

export interface AuthResult {
  userId: string;
  supabaseAdmin: SupabaseClient;
}

/**
 * Validates the Bearer JWT in the Authorization header.
 * Returns the verified user_id and a service-role admin client.
 * Throws a Response with status 401 if auth is missing or invalid.
 */
export async function requireUser(req: Request): Promise<AuthResult> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");

  if (!supabaseUrl || !serviceRoleKey || !anonKey) {
    throw new Response(
      JSON.stringify({ error: "Server misconfiguration: missing env vars" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Response(
      JSON.stringify({ error: "Missing or invalid Authorization header" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const jwt = authHeader.slice("Bearer ".length);

  // Use a user-scoped client to validate the JWT — getUser() verifies it server-side
  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: `Bearer ${jwt}` } },
    auth: { persistSession: false },
  });

  const { data, error } = await userClient.auth.getUser();
  if (error || !data.user) {
    throw new Response(
      JSON.stringify({ error: "Invalid or expired session token" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  return { userId: data.user.id, supabaseAdmin };
}
