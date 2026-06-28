#!/usr/bin/env python3
"""Reconcile army-jobs.json against the authoritative audit reference.

For each MOS in the reference, overwrite its requirement set with the verified
value (single composite -> requirements[1]; anyOf -> anyOf[]). MOS not in the
reference (niche reclass/senior-NCO MOS) keep their existing plausible values.
14X is removed (confirmed not a real Army enlistment MOS). All Army MOS keep
minAFQT=31 (the verified Tier-I floor; 50 for GED noted in page copy).
"""
import json, sys, pathlib

root = pathlib.Path(__file__).resolve().parent.parent
data_path = root / "src/data/army-jobs.json"
ref_path = root / "scripts/army-audit-reference.json"

jobs = json.loads(data_path.read_text())
ref = json.loads(ref_path.read_text())["reference"]

# Confirmed-correct gap MOS from military.com (already right in dataset; assert kept)
# 51C GT110, 92F OF85(+CL86), 92G OF85 -> leave as-is.
# 46V -> ST 91 per operationmilitarykids primary.
ref["46V"] = {"composite": "ST", "min": 91}

REMOVE = {"14X"}  # not a real enlistment MOS (AMD crewmember is 14P; space is officer/40-series)

changes = []
out = []
for j in jobs:
    code = j["code"]
    if code in REMOVE:
        changes.append((code, "REMOVED", "not a real enlistment MOS"))
        continue
    old = j.get("requirements") or j.get("anyOf") or []
    old_s = " / ".join(f"{r['composite']} {r['minScore']}" for r in old) or "BLANK"
    if code in ref:
        r = ref[code]
        # drop both keys, then set the correct one
        j.pop("requirements", None)
        j.pop("anyOf", None)
        if "anyOf" in r:
            j["anyOf"] = r["anyOf"]
            new_s = " or ".join(f"{x['composite']} {x['minScore']}" for x in r["anyOf"])
        else:
            j["requirements"] = [{"composite": r["composite"], "minScore": r["min"]}]
            new_s = f"{r['composite']} {r['min']}"
        if old_s != new_s:
            changes.append((code, old_s, new_s))
    j["minAFQT"] = 31
    out.append(j)

data_path.write_text(json.dumps(out, indent=2) + "\n")

niche_unverified = sorted(c for c in (j["code"] for j in out) if c not in ref)
print(f"MOS total now: {len(out)} (removed {len(jobs)-len(out)})")
print(f"Changed: {len([c for c in changes if c[1] not in ('REMOVED',)])}, removed: {len([c for c in changes if c[1]=='REMOVED'])}")
print("\n=== CHANGES ===")
for code, old, new in changes:
    print(f"  {code:5} {old:24} -> {new}")
print(f"\n=== NICHE MOS KEPT AT EXISTING VALUES ({len(niche_unverified)}) ===")
print("  " + ", ".join(niche_unverified))
