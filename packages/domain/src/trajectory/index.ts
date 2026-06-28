export type {
  AfqtBandKey,
  AfqtBand,
  CompositeBand,
  Confidence,
  RequirementStatus,
  JobOverallStatus,
  GapBand,
  SupportStatus,
  SubtestEstimate,
  SubtestEstimates,
  HomeTrajectory,
  JobCatalogEntry,
  TargetJobGap,
  UserTargetJob,
} from "./types";
export { AFQT_BANDS, COMPOSITE_BANDS } from "./types";

export {
  inferCurrentStanding,
  estimateSubtest,
  aggregateSubtestEvidence,
  ALGORITHM_VERSION,
} from "./current-standing";
export type { SubtestEvidence, CurrentStandingInference } from "./current-standing";

export {
  afqtBand,
  afqtBandKey,
  afqtBandIndex,
  compositeBandIndex,
  compositeBand,
  gapBandFromIndexes,
  afqtRequirementStatus,
  compositeBandSlack,
  compositeRequirementStatus,
  GAP_BAND_LABELS,
} from "./gap-bands";

export {
  supportStatusForBranch,
  toRequirementRules,
  MAGE_BETA_REASON,
} from "./catalog";
export type { RequirementRuleRow } from "./catalog";

export {
  isGtPrepMode,
  getGtRange,
  getGtConfidence,
  getPrimaryJobGtRequirement,
  getEffectiveGtTarget,
  getGtGap,
} from "./gt-target-mode";
export type {
  GtRange,
  GtTargetSource,
  EffectiveGtTarget,
  GtAttemptForProjection,
} from "./gt-target-mode";
