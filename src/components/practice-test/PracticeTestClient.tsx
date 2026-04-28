"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PracticeTestEngine from "./PracticeTestEngine";
import VariantPicker from "./VariantPicker";
import type { AsvabSubtest } from "@/types";
import { ALL_SUBTESTS } from "@/types";

const ALLOWED_VARIANTS = new Set(["diagnostic", "subtest_drill"]);

function PracticeTestInner() {
  const searchParams = useSearchParams();
  const rawVariant = searchParams.get("variant") ?? undefined;
  const rawSubtest = searchParams.get("subtest") ?? undefined;
  const variant =
    rawVariant && ALLOWED_VARIANTS.has(rawVariant) ? rawVariant : undefined;
  const subtest =
    rawSubtest && ALL_SUBTESTS.includes(rawSubtest as AsvabSubtest)
      ? (rawSubtest as AsvabSubtest)
      : undefined;

  return variant ? (
    <PracticeTestEngine variant={variant} subtest={subtest} />
  ) : (
    <VariantPicker />
  );
}

export default function PracticeTestClient() {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border border-navy-border bg-navy-light p-8 text-center text-sm text-text-tertiary">
          Loading…
        </div>
      }
    >
      <PracticeTestInner />
    </Suspense>
  );
}
