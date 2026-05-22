"use client";

/**
 * Authenticated practice surface. The app layout (src/app/app/layout.tsx) guards
 * auth + renders AppNav, so this is a thin wrapper around the shared engine.
 * Hosts the in-app diagnostic / adaptive AFQT / subtest-drill flows — this is the
 * route the home prescription, Your Plan, and recommender link to
 * (/app/practice?variant=…). PracticeTestClient reads ?variant and ?subtest.
 */

import PracticeTestClient from "@/components/practice-test/PracticeTestClient";

export default function AppPracticePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <PracticeTestClient />
    </div>
  );
}
