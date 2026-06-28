#!/usr/bin/env python3
"""Reconcile marines-jobs.json against the authoritative audit reference.

The Marines dataset was audited MOS-by-MOS (129 total) against the
operationmilitarykids.org + military.com recruiter-facing consensus (the same
canonical standard used for the Army audit), cross-checked vs the Military
Yearbook Project (MCO 1200.17 verbatim) and Marine Corps COOL. Unlike Army, the
vast majority were already correct, so this script applies an explicit list of
verified CORRECTIONS (reference.corrections) rather than overwriting every MOS.

Each correction replaces the MOS's single-composite requirement with the verified
(composite, min). Genuine AND dual-composite MOS (0481/1142/2171/2651/6276/6694)
are confirmed correct and left untouched. All USMC MOS keep minAFQT=32 (the
uniform Tier-I floor; 50 for GED noted in page copy). No phantom MOS were found
(every code is a real USMC MOS), so nothing is removed.
"""
import json, pathlib

root = pathlib.Path(__file__).resolve().parent.parent
data_path = root / "src/data/marines-jobs.json"
ref_path = root / "scripts/marines-audit-reference.json"

jobs = json.loads(data_path.read_text())
ref = json.loads(ref_path.read_text())
corrections = ref["corrections"]

changes = []
applied = set()
for j in jobs:
    code = j["code"]
    if code in corrections:
        c = corrections[code]
        old = j.get("requirements") or j.get("anyOf") or []
        old_s = " AND ".join(f"{r['composite']} {r['minScore']}" for r in old) or "BLANK"
        j.pop("requirements", None)
        j.pop("anyOf", None)
        j["requirements"] = [{"composite": c["composite"], "minScore": c["min"]}]
        new_s = f"{c['composite']} {c['min']}"
        changes.append((code, old_s, new_s, c["reason"]))
        applied.add(code)
    j["minAFQT"] = 32

missing = set(corrections) - applied
if missing:
    raise SystemExit(f"ERROR: correction codes not found in dataset: {sorted(missing)}")

data_path.write_text(json.dumps(jobs, indent=2) + "\n")

print(f"MOS total: {len(jobs)} (none removed — no phantom codes found)")
print(f"Corrections applied: {len(changes)}\n")
print("=== CHANGES ===")
for code, old, new, reason in changes:
    print(f"  {code}  {old:18} -> {new:8}  {reason[:60]}")
print("\n=== CONFIRMED AND-PAIRS (unchanged) ===")
for code, desc in ref["confirmed_and_pairs"].items():
    if code == "_note":
        continue
    print(f"  {code}  {desc}")
