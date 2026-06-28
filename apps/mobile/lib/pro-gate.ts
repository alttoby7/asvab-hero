export type GateReason =
  | "diagnostic_used"
  | "drills_pro_only"
  | "adaptive_pro_only";

interface GateResult {
  allowed: boolean;
  reason?: GateReason;
}

export function canStartVariant(
  code: string,
  isPro: boolean,
  diagnosticUsed: boolean
): GateResult {
  if (code === "diagnostic") {
    if (diagnosticUsed && !isPro) return { allowed: false, reason: "diagnostic_used" };
    return { allowed: true };
  }

  if (code === "subtest_drill") {
    if (!isPro) return { allowed: false, reason: "drills_pro_only" };
    return { allowed: true };
  }

  if (code === "afqt_adaptive") {
    if (!isPro) return { allowed: false, reason: "adaptive_pro_only" };
    return { allowed: true };
  }

  return { allowed: true };
}

export function gateMessage(reason: GateReason): { title: string; body: string } {
  switch (reason) {
    case "diagnostic_used":
      return {
        title: "Diagnostic Complete",
        body: "You've already taken your free diagnostic. Upgrade to Pro for unlimited retakes.",
      };
    case "drills_pro_only":
      return {
        title: "Pro Feature",
        body: "Subtest drills are available with a Pro subscription. Focus on your weakest areas.",
      };
    case "adaptive_pro_only":
      return {
        title: "Pro Feature",
        body: "Adaptive AFQT practice adapts to your level. Upgrade to unlock unlimited sessions.",
      };
  }
}
