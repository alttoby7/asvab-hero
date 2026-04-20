"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

interface BranchCalculatorViewProps {
  branch: string;
}

/**
 * Fires a one-shot `branch_calculator_view` event when a branch calculator
 * page mounts. Rendered as an invisible component so it can live inside a
 * server-rendered page.
 */
export default function BranchCalculatorView({
  branch,
}: BranchCalculatorViewProps) {
  const firedRef = useRef(false);
  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    trackEvent("branch_calculator_view", { branch });
  }, [branch]);
  return null;
}
