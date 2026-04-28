# ASVAB Question Bank Audit — 2026-04-27

## Summary

- **Files audited:**
  - `src/data/practice-tests/free-test.json` (90 items, complete)
  - `src/data/practice-tests/expansion-batch-1.json` (96 items, complete)
  - `src/data/practice-tests/expansion-batch-2.json` (7 items — **work in progress**, contains author notes mid-explanation; re-audit required when finished)
- **Total items reviewed:** 193
- **BLOCKERS:** 7 (must-fix before seeding)
- **MAJORS:** 11 (fix recommended)
- **MINORS:** ~22 sampled (polish; not exhaustive)
- **Overall recommendation:** **fix-blockers-then-ship** for `free-test` and `expansion-batch-1`. **Substantial-rework + re-audit** for `expansion-batch-2` — it is clearly mid-authoring and has admitted-broken items.

Big picture: the original 90-item free test is solid but has one factually wrong AO question and several near-duplicates that batch-1 silently re-publishes. Batch-1 is the strongest of the three — well-distractored, real misconception traps, mostly-correct keys, nine context-clue items that are noticeably better than the rote synonyms in the free test. Batch-2 should not ship in any form until the author completes it; four of its seven items are flat broken.

---

## Blockers (🔴)

| File | external_key | Issue | Fix |
|---|---|---|---|
| free-test.json | `ao-6` | Math wrong. Stem says three equilateral triangles meet at one vertex each at a center point and *do not overlap*. Three 60° interior corners contribute **180°**, not 360°. The explanation literally walks through "3 × 60 = 180 degrees" then jumps to 360° by an unrelated argument about angles around a point. Choices include 180°. | Set `correctIndex` to `0` (180 degrees), rewrite explanation: total interior-angle contribution = 3 × 60 = 180°. |
| free-test.json | `ao-8` | No correct choice as written. Stem describes a net with one large square and four *smaller* squares around it, then claims it folds to "rectangular prism" — but a "plus" net of unequal squares does not fold into any standard solid. Also one distractor ("A cube requires 6 equal squares, so this net forms an incomplete shape") is meta-commentary, not a peer choice. | Either rewrite stem so all five squares are *the same size* (so it folds into an open-top box), or remove this question. Replace the meta-distractor with a real shape (e.g., "A cone"). |
| expansion-batch-2.json | `AR-AF-2` | Key/explanation mismatch. `correct_index = 2` ("1,005"), but the explanation computes 1,050 and says the answer is 1,050 (index 3). | Set `correct_index = 3` and remove the "Wait —" author note in the explanation. |
| expansion-batch-2.json | `AR-AF-4` | Key/explanation mismatch. `correct_index = 2` ("$17.50"), but the math in the explanation gives $19.50 (index 3). Also has an inline "Wait —" author note. | Set `correct_index = 3` and clean the explanation. |
| expansion-batch-2.json | `AR-AF-6` | Stem is incoherent. Author left a long thinking-out-loud passage in the explanation ending with "This stem needs a clean rewrite." None of the choices are derivable from a sensible reading. | Rewrite the stem cleanly (suggested: "depot has 1,200 MREs, distributes 100 per platoon to 8 platoons, then donates 50; how many remain?" → 350). |
| expansion-batch-2.json | `AR-AF-3` is a near-duplicate of `AR-AF-2` (same stem) | Two items in a 7-item file have identical stems; one is keyed wrong, one keyed right. Even after fixing AR-AF-2, exact-stem duplication will surface twice in any drill. | Delete `AR-AF-3` or change its numbers (e.g., 525 cal/hr × 2h 20m). |
| expansion-batch-2.json | `AR-AF-5` is a near-duplicate of `AR-AF-4` (same stem) | Same problem — two stems with identical math. | Delete `AR-AF-5` or change the prices/quantities. |

> Note on batch-2: the file as a whole is a draft. Beyond the 4 specifically broken items above, the remaining 3 (`AR-AF-1`, `AR-AF-3`/`AR-AF-5` post-dedup, `AR-AF-7`) are usable but the file should not be seeded until rewritten to its target item count.

---

## Majors (🟡)

| File | external_key | Issue | Fix |
|---|---|---|---|
| free-test.json | `ar-5` | Answer is rounded ("approximately 33 minutes") for what is presented as an exact-arithmetic problem. 500 / 15 = 33.33…, never lands on a clean integer. Test-takers who compute carefully won't pick a hedged answer. | Rebalance numbers: drain 30, fill 10, full tank 500 → 25 min exactly; or drain 20, fill 5 → 33⅓ → choose tank size that makes it clean. |
| free-test.json | `mk-9` | Exact duplicate of batch-1 `MK-EXP-1` (same stem, same choices, same key). Two-times-publication weakens the bank. | Delete one; if both stay, re-author one with different coefficients. |
| free-test.json | `ar-8` | Exact duplicate of batch-1 `AR-WRD-HARD-1` (work-rate, 6h together, 10h Worker A). | Delete batch-1 copy or re-author with different times. |
| free-test.json | `ar-12` | Exact duplicate of batch-1 `AR-RAT-D2-1` (map scale 1 in = 50 mi, 3.5 in apart, 175 mi). | Delete one. |
| free-test.json | `ei-8` | Exact duplicate of batch-1 `EI-CON-1` (best electrical conductor → copper). | Delete one. |
| free-test.json | `mk-7` | Substantial overlap with batch-1 `MK-GEO-HARD-1` (Pythagorean 6-8-10 vs 9-12-15). Same skill, same trap, same explanation pattern. | Acceptable as different items but consider varying skill (introduce 5-12-13 or angle problem). |
| free-test.json | `ao-2` | Stem says "folded in half along its longest axis." "Axis" in spatial-reasoning items is ambiguous — it could mean parallel to the long edge or perpendicular to it. Test-takers can defensibly read this two ways. | Reword: "folded in half so the two short edges meet, then folded in half again the same way." |
| free-test.json | `mc-7` | Stem reads "applies 10 pounds of force over a piston with an area of 2 square inches." "Over" is non-standard ("on" or "to" is correct). Pressure formula yields 5 psi — fine — but 12 psi distractor is unmotivated by any common error. | Replace 12 psi with a real misconception trap, e.g., 20 psi (10 × 2). |
| expansion-batch-1.json | `AR-PCT-1` | Explanation contains a broken / unclosed parenthetical: "*(giving $800 × 0.85 × 1.10 is correct but students often use $800 × 0.95 = $760 by netting the two percents, which is wrong because 15% down and 10% up are applied sequentially to different bases.*" — paren never closes and the sentence is run-on. The math is correct. | Rewrite explanation cleanly: state $680 → $748, mention the netted-percent trap once, end. |
| expansion-batch-1.json | `PC-INF-HARD-1` | The "correct" inference (board influenced by conflict of interest) is plausible but reaches beyond the passage — the passage gives circumstantial evidence, not a direct cue. Strong test-takers may pick A or argue the inference is unsupported. The "may have been influenced" hedge in the choice softens it but still leans speculative for an ASVAB inference item. | Tighten the passage: add a sentence like "the chair did not recuse himself from the review." That converts speculation to defensible inference. |
| expansion-batch-1.json | `WK-CTX-D2-1` | "Treacherous" stem is borderline ambiguous. After a rainstorm with drivers losing control, *slippery* (choice C) is at least as defensible as *dangerous* (B). Explanation acknowledges this. | Either accept both (B and C) — which is itself a blocker — or rewrite stem to a context where deception/unpredictability is the central feature ("the trail looked safe but proved TREACHEROUS, with hidden drop-offs"). |

---

## Minors (🟢)

Not exhaustive — sampled across files.

**free-test.json**
- AI tells: phrases "Read the following passage and answer the question." prefix every PC item; functional, but rote. Could vary occasionally.
- `gs-9`: pH question lists choices `0, 7, 10, 14`. Distractor 10 is weak (no real misconception); 4 or 5 would be stronger (acid bias).
- `mk-3`: 2⁵ stem is barely a question — single concept, no application. Fine for difficulty 1.
- `wk-1` through `wk-12`: all use the rote stem pattern "WORD most nearly means:" — no context. Adequate, but batch-1 demonstrates how much richer context-clue items are.
- `ar-1`, `ar-2` use `id` `ar-1` rather than the `external_key` naming convention used in batches. Minor style consistency issue.
- `as-3`: "FIRST" capitalization is an AI-feeling tell.

**expansion-batch-1.json**
- `WK-CTX-3`: "rushed", "expensive", "routine" — the "expensive" distractor is unmotivated.
- `WK-PFX-2`: "Voluntary shares the same root but a different prefix" — voluntary actually shares root *and* prefix in a sense (VOL-); the explanation oversimplifies.
- `EI-OHM-3`: explanation says "Using total voltage instead of calculating current first gives 48 W" — 48 W is not in the choices, so the trap-explanation references a number a student couldn't have actually picked. Tighten.
- `MK-GEO-1`: explanation says using diameter gives 1,130.4 — but no such choice is offered, so the "common error" is not actually trapped by a distractor. The 188.4 distractor (using just r×h×π without squaring radius? no — 3.14 × 6² × 5? actually 188.4 = 3.14 × 6 × 10) is from doubling the radius to 6, which the explanation doesn't address. Better: explain why each distractor is wrong.
- `MC-MOT-6`: choice "0 m/s (they stop)" is a perfect inelastic-collision-with-equal-mass intuition trap — strong item, but explanation doesn't explicitly walk through *why* a student picks it (they assume mass cancels). Tighten the explanation.
- `WK-PFX-7`: SEISMOLOGIST. Stem first defines -OLOGY (meaning study of) then -OLOGIST (one who studies); but the answer hinges on knowing SEISMO- means earthquake — the prefix glossed in the stem doesn't help solve. The item is actually a vocabulary-knowledge item, not a prefix item. Topic-id stretch.
- Several PC-ATP items use the same passage-structure (single-paragraph excerpt, then "the author's tone is best described as"). Repetitive across 8 items.

**expansion-batch-2.json**
- The remaining usable items (`AR-AF-1`, `AR-AF-7`) read fine but the choice spreads are tight. AR-AF-7 distractor "850" is just the original capacity, which a student would only pick by misreading the question — not a real misconception trap.

---

## Subtest-level observations

- **AR (Arithmetic Reasoning):** Free test items are clean and computationally honest (good distance/percent/work problems). Batch-1 adds genuinely tough items like `AR-PCT-HARD-1` (percent change with classic base-confusion trap) and `AR-WRD-HARD-1` (work rate). Two duplicates with the free test waste the corpus. Batch-2's intent was AR depth but it's currently broken.

- **WK (Word Knowledge):** Free test is 12 rote synonyms — workable but flat. Batch-1's 27 WK items (12 context-clues, 8 prefix/suffix, 6 root-words, 1 hard synonym) dramatically improve coverage and are the strongest content in the corpus. Word choices (TORPID, SARDONIC, PERFUNCTORY, OBSEQUIOUS, MAGNANIMOUS, EQUIVOCAL) hit ASVAB-realistic difficulty without going SAT-vocabulary obscure. Best subtest in the bank.

- **PC (Paragraph Comprehension):** Free test 9 items hit main-idea, inference, detail-recall reasonably. Batch-1 adds 8 author-tone-purpose items (a missing topic) plus 1 hard inference and 1 hard main-idea — strong additions. Tone-purpose items are slightly formulaic but fundamentally sound.

- **MK (Math Knowledge):** Free test covers area, perimeter, basic algebra, fractions, exponents, Pythagorean. Batch-1 adds linear equations with distribution, hard 9-12-15 Pythagorean, cylinder volume, exponent simplification, fractions word problem, and a depot-cost system-of-equations item (`MK-ALG-HARD-1`) — good. `mk.number-properties` only has 1 item across the entire corpus (free-test mk-12) — this is a real gap.

- **EI (Electronics Information):** Free test has solid Ohm's Law and series/parallel basics. Batch-1 adds 5 conductors-insulators items (filling a gap) and 5 more Ohm's-law-power items including parallel circuits, power dissipation, and series-power. `ei.circuit-types` only has 2 items combined and `ei.components-devices` only 4 — still under-served.

- **AS (Auto & Shop):** Free test covers tools, vehicle systems, safety. Batch-1 adds 9 maintenance-repair items — a strong topic injection. Items are practical and trade-realistic. `as.shop-safety` (2 items) and `as.hand-tools` (3 items) are both under-served.

- **MC (Mechanical Comprehension):** Free test covers levers, gears, friction, hydraulics, projectile basics. Batch-1 adds 6 inclined-plane-hydraulics items and 7 motion-projectile items — strong depth. `mc.levers-pulleys` (2 items) and `mc.gears-wheels` (2 items) are still thin.

- **GS (General Science):** Free test covers life, physical, earth/space, and physics-mechanics. Batch-1 adds 7 physics-mechanics items. `gs.life-science` (3), `gs.physical-science` (2), and `gs.earth-space-science` (3) remain the thinnest topics in the entire bank.

- **AO (Assembling Objects):** **The largest hole in the corpus.** Free test has 9 items; neither batch adds anything. `ao.pattern-assembly` has 0 items. AO is also the subtest with the clearest blocker (`ao-6` math wrong) and an unfixable item (`ao-8`).

---

## Overall content-quality grade per file

| File | Grade | Rationale |
|---|---|---|
| `free-test.json` | **B** | Solid, balanced, generally accurate; one factually wrong AO item, one unfixable AO item, four duplicates with batch-1, and over-reliance on rote synonyms. Ships fine after the AO fixes. |
| `expansion-batch-1.json` | **B+** | Strongest file. Real misconception traps, distractors mostly tied to actual errors, good difficulty calibration. Three minor explanation issues and one ambiguous WK item, but no factual blockers. The WK and PC-ATP additions noticeably elevate the corpus. |
| `expansion-batch-2.json` | **D** | Mid-authoring draft with author notes embedded in explanations and four of seven items broken. Should not ship. Re-audit required after rewrite. |

---

## Topics still under-served after these batches

Topics with **<5 items** in the combined corpus (90 free + 96 batch-1 + 7 batch-2):

| Topic | Combined count |
|---|---|
| `ao.pattern-assembly` | 0 |
| `mk.number-properties` | 1 |
| `ar.rate-distance-time` | 2 |
| `ei.circuit-types` | 2 |
| `as.shop-safety` | 2 |
| `mc.levers-pulleys` | 2 |
| `mc.gears-wheels` | 2 |
| `gs.physical-science` | 2 |
| `gs.life-science` | 3 |
| `gs.earth-space-science` | 3 |
| `pc.main-idea` | 3 |
| `mk.exponents-polynomials` | 3 |
| `as.hand-tools` | 3 |
| `as.vehicle-systems` | 3 |
| `mc.forces-friction` | 3 |
| `ao.3d-visualization` | 3 |
| `ao.paper-folding-nets` | 3 |
| `ao.spatial-counting` | 3 |
| `pc.detail-recall` | 4 |
| `pc.inference` | 4 |
| `mk.algebra-linear` | 4 |
| `mk.fractions-decimals` | 4 |
| `ei.components-devices` | 4 |

Highest-priority gaps for a future batch-3: **all four AO topics** (especially `ao.pattern-assembly` at zero), **`mk.number-properties`**, **all three thin GS topics**, and the four under-served MC topics. The intended batch-2 focus (AR/MK/WK/AO depth) was correct in concept; the current draft hasn't delivered it.

---

# Batch-2 Re-audit — 2026-04-27

(Original audit caught batch-2 at 7 items mid-write. This re-audit covers all 80 finished items. Note: the file was rewritten end-to-end since the original audit — the broken AR-AF-2/3/4/5/6 items from before are gone, and the file now uses a clean per-topic `AR-AF/RP/PC/RD/WP`, `MK-AL/FR/EP/GE/NP`, `WK-SN`, `AO-3D/PF/SC` keying scheme.)

## Summary

- **Items reviewed:** 80
- **BLOCKERS:** 2
- **MAJORS:** 7
- **MINORS:** ~12 sampled
- **Grade:** **B**
- **Recommendation:** **fix-blockers-then-ship**

The rewritten batch-2 is dramatically improved over the 7-item draft. Math is computationally honest, distractors are mostly tied to real misconceptions, and the per-topic keying gives clean coverage of AR (28), MK (25), WK (10), AO (15). Two AO paper-folding items have wrong keys due to mis-tracked face mappings, and a handful of items duplicate stems already present in `free-test.json`. No author-thinking-out-loud notes survived — the file is shippable after the AO fixes and dedupe.

## Blockers (🔴)

| external_key | Issue | Fix |
|---|---|---|
| `AO-PF-2` | Wrong key. Stem describes a 4-square vertical column with extras at positions 2 and 3 (a standard cube net). When folded, the column wraps as a 4-face belt around the cube: positions 1↔3 are opposite, 2↔4 are opposite. So the face opposite position 1 is **position 3**, not position 4 (the stated answer). Position 3 is not even among the choices, so no choice as written is correct. | Either rewrite the choices to include "Position 3 (third from top)" and set `correct_index` to that, or redesign the net. Also rewrite the explanation, which currently invents a wrong fold sequence. |
| `AO-PF-4` | Wrong key. Net is A (center), B above, C below, D left, E right, F below C. Folding with A as base: B → back wall, C → front wall, D → left, E → right, F (attached to C's far edge) folds over to become the **top**. Opposite pairs are A↔F (bottom/top), B↔C (back/front), D↔E (left/right). So the face opposite B is **C**, not F. The stated `correct_index` of 2 (Face F) is wrong; the correct index is 1 (Face C). The explanation is also self-contradictory — it ends with "B and F are opposite faces" after walking through a sequence that should have produced B↔C. | Set `correct_index = 1` and rewrite the explanation cleanly: A = base, B = back, C = front (so B↔C), D↔E sides, F folds onto top opposite A. |

## Majors (🟡)

| external_key | Issue | Fix |
|---|---|---|
| `AR-RP-3` | **Triple cross-file duplicate.** "Map scale 1 inch = 50 miles, two cities 3.5 inches apart, distance = 175 miles" is identical to `free-test.json ar-12` AND `expansion-batch-1.json AR-RAT-D2-1`. Three near-identical items in one corpus is a real problem — any drill that pulls from all three files will surface the same item back-to-back. | Delete `AR-RP-3` from batch-2 (free-test/batch-1 already cover the skill). Or change to a different scale (1 cm = 25 km) and different inches (5.2). |
| `MK-GE-5` | Cross-file duplicate. "Right triangle with legs 6 and 8, hypotenuse" is identical to `free-test.json mk-7` (same legs, same answer 10, even similar explanation). | Delete or change legs to 5/12 (→13) or 8/15 (→17). |
| `AO-SC-2` | Cross-file duplicate. "3×3×3 cube fully painted, count cubes with exactly 2 painted faces → 12" is identical in stem and answer to `free-test.json ao-3`. | Delete or change to a 4×4×4 cube (answer 24) — though note `AO-SC-5` already uses 4×4×4 for the inner-hidden-count question. Or ask for the 1-painted-face count instead (= 6 for 3×3×3). |
| `AO-3D-2` | Cross-file duplicate of `free-test.json ao-7`. Both ask for the face opposite a 1 on a standard die (= 6). Stems differ slightly (batch-2 names the "opposite faces sum to 7" rule explicitly; free-test makes the student recall it), but the answer space is identical and only 4 choices exist. | Delete or change to "face 4 is on top, what's on the bottom?" (= 3). |
| `WK-SN-1` (DILIGENT), `WK-SN-3` (TENACIOUS), `WK-SN-4` (AMBIGUOUS) | Three of the ten WK synonym items reuse the *exact same head word* as items already in `free-test.json` (wk-9 DILIGENT, wk-5 TENACIOUS, wk-6 AMBIGUOUS). The choice options differ slightly but the test-taker only has to know the same word. Functionally these are duplicates. | Replace these three head words with synonyms not yet covered (e.g., LACONIC, ASSIDUOUS, EQUIVOCAL — though batch-1 also uses EQUIVOCAL — pick three from a fresh pool). |
| `MK-FR-4` | Distractor "30/45" is literally **equal** to the correct answer 2/3 (unsimplified). The stem asks "What is (3/5) × (10/9)?" without specifying lowest terms, so a student picking 30/45 has technically computed correctly. The explanation acknowledges that 30/45 simplifies to 2/3, which makes it self-aware of the issue but doesn't fix it. | Either change the stem to "...in lowest terms" or replace the 30/45 distractor with 5/3 (the multiply-numerators-only error) or 13/14 (the add-instead-of-multiply error). |
| `MK-GE-5` (separately, beyond the duplicate) | Stem and explanation literally call this "the classic 3-4-5 Pythagorean triple scaled by 2." Combined with the duplicate problem above, the corpus now has *three* essentially identical 6-8-10 / 3-4-5 / 9-12-15 Pythagorean items (free-test mk-7, batch-1 MK-GEO-HARD-1, batch-2 MK-GE-5). Skill is over-represented. | Replace with a 5-12-13 triple, or a missing-leg variant (hypotenuse 17, leg 8, find leg 15). |

## Minors (🟢)

Sampled, not exhaustive.

- **`AR-PC-1` ($80 jacket, 25% off → $60)** is structurally identical to `free-test.json ar-7` ($60 shirt, 25% off → $45). Same template, same skill. Not a duplicate but a pattern repeat — and the corpus already has at least one other "% off clothing" item.
- **`AR-RP-1` (3:2 flour:sugar, 12 cups flour → 8 cups sugar)** is similar in setup to `free-test.json ar-3` (5:2 flour:sugar, 20 cups flour → 8 cups sugar). Same template, same answer (8). Pattern repeat.
- **`AR-RD-3` (40 gpm fill, 15 gpm drain, 1000-gal tank → 40 min)** is a clean inverse of `free-test.json ar-5` (drain 25, fill 10, 500-gal tank → ~33 min). The earlier audit flagged ar-5 for non-integer answer; AR-RD-3 chooses numbers that land cleanly on 40 min, which is good — but a student who saw ar-5 in the same drill might key on the structure rather than the math.
- **`MK-AL-6`** asks for an *expression* but the explanation ends by computing 5d − 200 = $450, which conflates the two skills. The expression 5d − 200 is correct; just trim the numeric evaluation.
- **`AR-RP-2` exchange-rate item:** the trap framing (282 from dividing) implies a student might convert in the wrong direction. Fine, but the rate "1 USD = 0.85 EUR" matches a 2010s-era EUR/USD that hasn't been the spot rate in years — an unusually low USD value for a current item. Cosmetic.
- **`WK-SN-7` OBSEQUIOUS, `WK-SN-8` MAGNANIMOUS, `WK-SN-9` PERFUNCTORY** all reuse head words from `expansion-batch-1.json` (WK-CTX-HARD-1, WK-PFX-8, WK-CTX-12), but in synonym-only format vs. context-clue format. Different format but same vocabulary tested. Borderline minor — consider rotating in fresh hard words (PUSILLANIMOUS, FATUOUS, PHLEGMATIC).
- **`AO-3D-1` rotation explanation** is correct but terse for a difficulty-3 item. A struggling test-taker would benefit from "imagine pushing the cube forward like a die rolling toward you" framing.
- **`AO-3D-3` and `AO-3D-4`** intentionally share the colored-cube setup (a paired item construction). Works as designed, but a student would benefit from a shared "use the same cube as the previous question" header rather than re-stating the full setup.
- **`AO-PF-1` "open-top box"** is structurally identical in answer to `free-test.json ao-4` (square cardboard with corners cut → open-top box). Not a stem duplicate (ao-4 is corner-cut, AO-PF-1 is plus-net), but the answer space and skill are identical. Pattern repeat.
- **`AR-PC-5` (+20% then −10% on $50 → $54)** mirrors `expansion-batch-1.json AR-PCT-1` (−15% then +10% on $800 → $748). Same skill, opposite direction. Both are good items but together they over-represent sequential-percent-with-different-bases.
- **AI tells:** very few. The phrasing "The trap is..." appears as the lead-in for ~15 explanations — a stylistic tic that gets repetitive. Vary occasionally.
- **Difficulty distribution:** difficulty 3 dominates (≈40 of 80). Few difficulty 2 items, which means batch-2 doesn't help fill the easier end of the bank where free-test was strongest.

## Cross-file dedupe check

Items in batch-2 with stems essentially the same as items in `free-test.json` or `expansion-batch-1.json`:

| batch-2 key | Duplicate of | Severity |
|---|---|---|
| `AR-RP-3` | `free-test.json ar-12` AND `expansion-batch-1.json AR-RAT-D2-1` (map 1 in = 50 mi, 3.5 in, 175 mi) | 🟡 (triple) |
| `MK-GE-5` | `free-test.json mk-7` (right triangle 6, 8, 10) | 🟡 |
| `AO-SC-2` | `free-test.json ao-3` (3×3×3 painted cube, 2-face count = 12) | 🟡 |
| `AO-3D-2` | `free-test.json ao-7` (standard die, opposite of 1 = 6) | 🟡 |
| `WK-SN-1` | `free-test.json wk-9` (DILIGENT) | 🟡 (head-word reuse) |
| `WK-SN-3` | `free-test.json wk-5` (TENACIOUS) | 🟡 |
| `WK-SN-4` | `free-test.json wk-6` (AMBIGUOUS) | 🟡 |
| `WK-SN-7` | `expansion-batch-1.json WK-CTX-HARD-1` (OBSEQUIOUS, different format) | 🟢 |
| `WK-SN-8` | `expansion-batch-1.json WK-PFX-8` (MAGNANIMOUS, different format) | 🟢 |
| `WK-SN-9` | `expansion-batch-1.json WK-CTX-12` (PERFUNCTORY, different format) | 🟢 |
| `AR-PC-1` | `free-test.json ar-7` (% off clothing item — pattern, different numbers) | 🟢 |
| `AR-RP-1` | `free-test.json ar-3` (flour:sugar ratio, 8-cup answer — pattern) | 🟢 |
| `AO-PF-1` | `free-test.json ao-4` (open-top box — different net, same answer) | 🟢 |

## Topic-level observations for batch-2

- **AR (28 items, 5 topics):** Strongest part of the file. Arithmetic-fundamentals (5), ratio-proportion (7), percent (6), rate-distance-time (6), word-problems (6) — all keys verified, all distractors tied to real errors. Two pattern-repeat items (`AR-RP-1`, `AR-PC-1`) and one triple-duplicate (`AR-RP-3`). Combined with batch-1's AR additions, AR is now the deepest subtest in the bank.
- **MK (25 items, 5 topics):** Algebra-linear (6), fractions-decimals (5), exponents-polynomials (5), geometry (5), number-properties (4). All keys verified except the `MK-FR-4` distractor issue noted above. `mk.number-properties` was flagged as the thinnest MK topic (1 item) in the original audit; batch-2 adds 4 clean items there, including a strong LCM trap (`MK-NP-4`, choosing 60 = 6×10 instead of LCM 30). Solid contribution.
- **WK (10 items, 1 topic):** All 10 are `wk.synonyms`, all in the rote "WORD most nearly means:" format that the original audit flagged as the weakest WK pattern in the corpus. Three head words duplicate free-test, three duplicate batch-1 (different format). Difficulty calibration is reasonable (2→5 ladder), but the format adds nothing batch-1 didn't already cover better via context-clue items. Lowest-impact section of batch-2.
- **AO (15 items, 3 topics):** Largest hole in the corpus before batch-2 (only 9 free-test items, 0 batch-1 additions). Batch-2 adds 5 items each to `ao.3d-visualization`, `ao.paper-folding-nets`, and `ao.spatial-counting`. Substantial coverage win — but `ao.pattern-assembly` is **still at 0 items**, and 2 of the 5 paper-folding items are broken (`AO-PF-2`, `AO-PF-4`), plus 2 of the spatial/3D items duplicate free-test (`AO-SC-2`, `AO-3D-2`). AO is the highest-impact topic *and* has the highest error density in batch-2. Worth the extra effort to get right.

## Bottom line

Batch-2 is shippable after fixing the two AO blockers and removing or rewriting the four exact-stem duplicates (`AR-RP-3`, `MK-GE-5`, `AO-SC-2`, `AO-3D-2`) and three head-word duplicates (`WK-SN-1/3/4`). That brings the file from 80 to ~73 unique, correct items — a solid contribution. The rewrite from the 7-item draft delivered on the originally stated AR/MK/WK/AO depth focus, except that `ao.pattern-assembly` remains the one untouched topic in the entire corpus.
