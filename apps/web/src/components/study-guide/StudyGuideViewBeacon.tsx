"use client";

/**
 * Fire-once view beacon for a study-guide topic page. Mounted on both the public
 * (/study/...) and in-app (/app/study/...) guide pages so we can measure
 * study_guide_view by surface. Renders nothing.
 */

import { useEffect, useRef } from "react";
import { trackEvent, FunnelEvents } from "@/lib/analytics";

interface Props {
  topicId: string;
  subtest: string;
  surface: "public" | "app";
}

export default function StudyGuideViewBeacon({ topicId, subtest, surface }: Props) {
  const firedRef = useRef(false);
  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    trackEvent(FunnelEvents.StudyGuideView, {
      topic_id: topicId,
      subtest,
      surface,
    });
  }, [topicId, subtest, surface]);
  return null;
}
