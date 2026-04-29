---
topic_id: ao.pattern-assembly
subtest: AO
title: Pattern Assembly & Rotation
summary: Identify which puzzle pieces fit together and which rotated shape matches the target — match edges first, then confirm interior features.
formula_reference:
  - "Edge-length matching: two pieces can join only if the shared edge has equal length on both pieces"
  - "Interior angle check: at each joining corner, the angles from both pieces must sum to 360° for a flat (non-overlapping) assembly"
  - "Mirror vs. rotation: a piece CAN be rotated to any angle but CANNOT be flipped to its mirror image — shapes that are mirror-image pairs never fit the same slot"
  - "Rotation increments: the test typically uses 90°, 180°, and 270° rotations — mentally step through each before deciding no match exists"
  - "Concave notch rule: a concave notch in one piece must match a convex protrusion of equal size in the adjacent piece"
pitfalls:
  - "Confusing a rotated shape with its mirror image — these look nearly identical at a glance but cannot substitute for each other"
  - "Matching only one edge and assuming the entire piece fits — always verify that both the edge length AND the adjacent angles are compatible"
  - "Rushing past a 180° rotation — pieces flipped upside-down (180°) are often the correct answer and the most overlooked"
  - "Ignoring notch direction — a piece with a notch on its right side cannot fill a slot that requires a notch on the left side, even if the overall shape looks similar"
worked_examples:
  - prompt: "A target shape is a right triangle with legs of 3 units and 4 units. The answer choices show four triangles, each labeled A–D. Shape A is the same right triangle in its original orientation. Shape B is the same triangle rotated 90° clockwise. Shape C is the mirror image of the original (flipped horizontally). Shape D is a right triangle with legs of 4 units and 5 units. Which shapes could correctly fill the target slot?"
    solution: "Shape A fits — same size, same orientation. Shape B fits — rotating 90° clockwise does not change the shape's dimensions or chirality; it still has 3-unit and 4-unit legs. Shape C does NOT fit — it is the mirror image; on a flat assembly without flipping pieces over, mirror images are treated as different pieces. Shape D does NOT fit — different dimensions (4 and 5 vs. 3 and 4). Correct answers: A and B."
  - prompt: "Two pieces must combine to form a 2×4 rectangle. Piece 1 is an L-shape: a 2×3 rectangle with a 1×1 square removed from its top-right corner. Describe the exact shape of Piece 2 that would complete the rectangle."
    solution: "The full rectangle is 2×4, area = 8 square units. Piece 1 is a 2×3 rectangle minus a 1×1 corner = 6 - 1 = 5 square units. Piece 2 must have area = 8 - 5 = 3 square units. The missing region is an L-shape mirroring the cut corner: a 1×3 strip along the right side of the rectangle PLUS the 1×1 square that was removed. Combined, Piece 2 is a 1×3 column on the right plus a 1×1 notch extending left at the top — it resembles a backward L rotated 180°."
  - prompt: "A flat shape that looks like a plus sign (+) is shown. The answer choices show four shapes: (A) the plus sign rotated 45°, appearing as an X; (B) the plus sign at its original 0° orientation; (C) the plus sign rotated 90° (looks identical to the original because the plus sign has 4-fold symmetry); (D) the mirror image of the plus sign. Which choices are identical to the original plus sign (after any allowed rotation)?"
    solution: "A plus sign has 4-fold rotational symmetry — rotating by 90°, 180°, or 270° produces the same shape. Choice A (45° rotation giving an X shape) is NOT the same shape. Choice B (0°) is identical. Choice C (90° rotation) looks identical to B due to the 4-fold symmetry. Choice D (mirror image) — a plus sign is also symmetric under reflection, so D is also identical. Correct: B, C, and D match; A does not."
---

## What pattern assembly requires

Pattern assembly questions give you a target shape and ask which of four answer pieces either (a) matches the target after some rotation, or (b) fits together with another given piece to form the target. The skill is combining edge-length matching with an awareness of chirality — whether a shape has been rotated or mirrored.

## Rotation vs. mirror image — the critical distinction

This is the most consequential concept in the entire section. The ASVAB does not allow you to flip a piece over. Rotation keeps a shape in the same plane (think spinning a piece on a table). Mirroring flips it through the paper, producing its reflection.

A right triangle with the right angle at the bottom-left and a mirror-image right triangle with the right angle at the bottom-right are not interchangeable. They may look nearly identical in a quick scan — especially when both are present as distractors.

How to tell them apart: pick an asymmetric feature (a notch, the position of the right angle, which side is longer). Trace it through each rotation: after 90°, 180°, 270°. If you cannot find an orientation where the features align, the shape is a mirror image, not a rotation.

## Edge and angle matching

Before worrying about the overall shape, check the edge lengths. If the target slot has a 5-unit boundary, the piece filling it must have exactly a 5-unit edge on that side. This alone eliminates most wrong-answer choices.

After edge length, check the corner angles. For two pieces to sit flat against each other without overlap or gap, the angles at each shared corner must together add up to exactly 360°.

## The 180° blind spot

Test-takers mentally step through 90° rotations easily — they are natural quarter-turns. The 180° rotation (upside-down flip) is the most frequently missed because it looks less like a rotation and more like a different shape. When none of the obvious rotations match, try the 180° explicitly before concluding the shape doesn't fit.

## Elimination is fast

Pattern assembly is one section where aggressive elimination works well. Pick one distinctive edge or notch and ask: which answer choices have this feature at all? Usually two of the four answers can be eliminated immediately on edge-length alone, leaving you to adjudicate between the remaining two on chirality or a second feature.
