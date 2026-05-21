/**
 * WS3 — Typed client wrappers around the trajectory RPCs
 * (0022_trajectory_target_jobs.sql). WS4 calls these from the home surface.
 *
 * All wrappers accept a Supabase client so they work from browser components
 * (getSupabaseBrowserClient()) or server contexts. They return the parsed
 * payloads typed against ./types. Errors are thrown.
 *
 * NOTE: these reference RPC names that are not yet in the generated
 * src/lib/supabase/types.ts (owned by WS4 / regenerated post-merge). We call
 * .rpc() through a loosely-typed surface to avoid coupling to the regen; the
 * RETURN types are still strongly typed here for callers.
 */

import type {
  HomeTrajectory,
  JobCatalogEntry,
  UserTargetJob,
} from "./types";

/** Minimal shape we need from a Supabase client (browser or server). */
export interface RpcClient {
  rpc: (
    fn: string,
    args?: Record<string, unknown>
  ) => Promise<{ data: unknown; error: { message: string } | null }>;
}

function unwrap<T>(res: { data: unknown; error: { message: string } | null }): T {
  if (res.error) throw new Error(res.error.message);
  return res.data as T;
}

/** Full home payload: current standing + projected + evaluated target gaps. */
export async function getHomeTrajectory(
  client: RpcClient
): Promise<HomeTrajectory> {
  return unwrap<HomeTrajectory>(await client.rpc("rpc_get_home_trajectory"));
}

/** Force a snapshot recompute (normally automatic in getHomeTrajectory). */
export async function refreshTrajectorySnapshot(
  client: RpcClient,
  snapshotKind: "current_standing" | "projected_test_day" = "current_standing"
): Promise<void> {
  unwrap(
    await client.rpc("rpc_refresh_trajectory_snapshot", {
      p_snapshot_kind: snapshotKind,
    })
  );
}

/** Add a target job (cap of 3 enforced server-side). */
export async function addTargetJob(
  client: RpcClient,
  jobId: string,
  makePrimary = false
): Promise<UserTargetJob> {
  return unwrap<UserTargetJob>(
    await client.rpc("rpc_add_target_job", {
      p_job_id: jobId,
      p_make_primary: makePrimary,
    })
  );
}

export async function removeTargetJob(
  client: RpcClient,
  targetJobId: string
): Promise<void> {
  unwrap(
    await client.rpc("rpc_remove_target_job", { p_target_job_id: targetJobId })
  );
}

/** Reorder targets; first id becomes primary. */
export async function reorderTargetJobs(
  client: RpcClient,
  targetJobIds: string[]
): Promise<void> {
  unwrap(
    await client.rpc("rpc_reorder_target_jobs", {
      p_target_job_ids: targetJobIds,
    })
  );
}

/** Search the read-only job catalog for the picker. */
export async function searchJobCatalog(
  client: RpcClient,
  opts: { branch?: string | null; query?: string | null; limit?: number } = {}
): Promise<JobCatalogEntry[]> {
  return unwrap<JobCatalogEntry[]>(
    await client.rpc("rpc_search_job_catalog", {
      p_branch: opts.branch ?? null,
      p_query: opts.query ?? null,
      p_limit: opts.limit ?? 25,
    })
  );
}
