export {
  createSupabaseClient,
  type SupabaseClient,
  type StorageAdapter,
  type CreateClientOptions,
  type RpcClient,
} from "./client";
export type { Database } from "./types";
export {
  loadVariant,
  loadActiveVariants,
  loadQuestionPool,
  saveAttempt,
  checkHasActivePro,
  getHomeTrajectory,
  loadTopicStats,
  loadProfile,
  getSessionForDate,
  createSession,
  advanceSession,
  completeSession,
  getDueMistakeCount,
  getAttemptCount,
} from "./queries";
export type {
  HomeTrajectory,
  UserProfile,
  StudySessionRow,
} from "./queries";
