export {
  calculateAFQT,
  calculateVE,
  calculateGT,
  calculateGeneral,
  calculatePrimaryMetric,
  getAFQTCategory,
  getAFQTCategoryDescription,
  calculateArmyLineScores,
  calculateAirForceComposites,
  calculateMarineComposites,
  calculateNavyScores,
  calculateCoastGuardScores,
  calculateSpaceForceComposites,
  calculateAllComposites,
  standardToEquated,
} from "./calculator";

export {
  scoreBySubtest,
  scoreByTopic,
  estimateAFQT,
  estimatePrimaryMetric,
  estimateRatingComposite,
  estimateStandardScores,
  getStrengths,
  getWeaknesses,
  shuffleQuestions,
  selectQuestions,
  totalCorrect,
  formatTime,
} from "./scorer";

export {
  evaluateJobEligibility,
  buildJobMatchSnapshot,
  doesQualify,
  getQualifyingJobs,
  getQualifyingJobsByBranch,
  isMageBranch,
  MAGE_UNVERIFIABLE_NOTE,
} from "./matcher";
export type {
  RequirementCheck,
  JobEligibilityResult,
  JobMatchSnapshot,
} from "./matcher";

export { buildScoreGapReport } from "./gap";
export type { ScoreGapReport } from "./gap";

export { BRANCH_MINIMUMS } from "./branch-minimums";
export type { BranchMinimum } from "./branch-minimums";
