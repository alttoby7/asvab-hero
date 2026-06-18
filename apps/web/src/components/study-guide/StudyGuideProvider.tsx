"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import type {
  Branch,
  MilitaryJob,
  AsvabSubtest,
  SubtestScores,
  StudyGuideState,
  ScoreInputMode,
} from "@/types";
import { ALL_SUBTESTS } from "@/types";

const DEFAULT_RATINGS: Record<AsvabSubtest, number> = {
  GS: 3, AR: 3, WK: 3, PC: 3, MK: 3, EI: 3, AS: 3, MC: 3, AO: 3,
};

const initialState: StudyGuideState = {
  selectedBranch: null,
  selectedJobs: [],
  scoreInputMode: "self-rate",
  scores: {},
  selfRatings: { ...DEFAULT_RATINGS },
  testDate: null,
  hoursPerWeek: 6,
  completedTopics: {},
};

type Action =
  | { type: "SET_BRANCH"; branch: Branch | null }
  | { type: "SET_JOBS"; jobs: MilitaryJob[] }
  | { type: "ADD_JOB"; job: MilitaryJob }
  | { type: "REMOVE_JOB"; jobId: string }
  | { type: "SET_SCORE_MODE"; mode: ScoreInputMode }
  | { type: "SET_SCORES"; scores: Partial<SubtestScores> }
  | { type: "SET_RATING"; subtest: AsvabSubtest; value: number }
  | { type: "SET_SCORE"; subtest: AsvabSubtest; value: number }
  | { type: "SET_TEST_DATE"; date: string | null }
  | { type: "SET_HOURS"; hours: number }
  | { type: "TOGGLE_TOPIC"; topicId: string }
  | { type: "LOAD_TOPICS"; topics: Record<string, boolean> };

function reducer(state: StudyGuideState, action: Action): StudyGuideState {
  switch (action.type) {
    case "SET_BRANCH":
      return { ...state, selectedBranch: action.branch, selectedJobs: [] };
    case "SET_JOBS":
      return { ...state, selectedJobs: action.jobs };
    case "ADD_JOB":
      if (state.selectedJobs.length >= 3) return state;
      if (state.selectedJobs.some((j) => j.id === action.job.id)) return state;
      return { ...state, selectedJobs: [...state.selectedJobs, action.job] };
    case "REMOVE_JOB":
      return {
        ...state,
        selectedJobs: state.selectedJobs.filter((j) => j.id !== action.jobId),
      };
    case "SET_SCORE_MODE":
      return { ...state, scoreInputMode: action.mode };
    case "SET_SCORES":
      return { ...state, scores: action.scores };
    case "SET_RATING":
      return {
        ...state,
        selfRatings: { ...state.selfRatings, [action.subtest]: action.value },
      };
    case "SET_SCORE":
      return {
        ...state,
        scores: { ...state.scores, [action.subtest]: action.value },
      };
    case "SET_TEST_DATE":
      return { ...state, testDate: action.date };
    case "SET_HOURS":
      return { ...state, hoursPerWeek: action.hours };
    case "TOGGLE_TOPIC": {
      const updated = { ...state.completedTopics };
      updated[action.topicId] = !updated[action.topicId];
      return { ...state, completedTopics: updated };
    }
    case "LOAD_TOPICS":
      return { ...state, completedTopics: action.topics };
    default:
      return state;
  }
}

const StudyGuideContext = createContext<{
  state: StudyGuideState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

export function useStudyGuide() {
  return useContext(StudyGuideContext);
}

export default function StudyGuideProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load completed topics from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("asvab-study-checklist");
      if (saved) {
        dispatch({ type: "LOAD_TOPICS", topics: JSON.parse(saved) });
      }
    } catch {}
  }, []);

  // Save completed topics to localStorage
  useEffect(() => {
    try {
      if (Object.keys(state.completedTopics).length > 0) {
        localStorage.setItem(
          "asvab-study-checklist",
          JSON.stringify(state.completedTopics)
        );
      }
    } catch {}
  }, [state.completedTopics]);

  return (
    <StudyGuideContext.Provider value={{ state, dispatch }}>
      {children}
    </StudyGuideContext.Provider>
  );
}
