---
topic_id: ao.paper-folding-nets
subtest: AO
title: Paper Folding & Nets
summary: Predict where a punched hole or a marked face ends up after folds — the key is tracing each fold step-by-step, never jumping ahead.
formula_reference:
  - "A cube net has exactly 6 squares arranged so no two squares that will become opposite faces are adjacent in the net"
  - "Opposite faces of a cube: in a standard cross-shaped net, the center square is always opposite the one at the far end of the vertical strip"
  - "Paper fold rule: when you fold along a vertical line, the left portion flips to the right — features on the left become mirror images of their original positions"
  - "Fold sequence: always process folds in the order given; reversing the sequence gives a wrong answer"
  - "Unfold check: a hole punched through N layers of folded paper creates N holes when unfolded — track the layer count"
pitfalls:
  - "Applying folds out of sequence — the order is non-commutative; fold 2 then fold 1 gives a different result than fold 1 then fold 2"
  - "Forgetting that a fold mirrors features, not just moves them — a hole 1 cm from the left edge becomes 1 cm from the fold line on the right side after folding"
  - "Counting holes incorrectly after a multi-layer fold — every layer that the punch passes through produces one hole when unfolded"
  - "Assuming a net will form a cube without verifying that no two opposite-face squares are adjacent — some distractors use nets that cannot close"
worked_examples:
  - prompt: "A square piece of paper is folded in half by bringing the right edge to meet the left edge. A circular hole is punched through both layers at a point 1 inch from the fold line and 2 inches from the top. Where are the holes when the paper is unfolded?"
    solution: "The fold line runs vertically down the center. After folding, the punch is 1 inch to the right of the fold. When unfolded, the original right-half hole stays 1 inch right of center. The mirrored hole appears 1 inch left of center — because the punch passed through both layers. Both holes are 2 inches from the top. Result: two holes, symmetric about the center vertical line, each 1 inch from center, both 2 inches from the top."
  - prompt: "A square piece of paper is first folded in half by bringing the bottom edge up to meet the top edge, then folded again by bringing the right edge to meet the left edge. A hole is punched through all four layers in the top-right corner of the folded square. How many holes appear when fully unfolded, and where are they?"
    solution: "Fold 1 (bottom to top): the paper is now half-height, two layers. Fold 2 (right to left): the paper is now quarter-size, four layers. The top-right corner of the folded quarter corresponds to corners in all four quadrants of the original. The punch through 4 layers produces 4 holes: one in each corner of the original sheet."
  - prompt: "A flat net consists of six squares in a plus-sign shape: one center square, one square above, one below, one left, and one right. A sixth square extends from the right of the right-arm square. Which faces are opposite each other when this net is folded into a cube?"
    solution: "Label the squares: Center (C), Top (T), Bottom (B), Left (L), Right (R), and Far-right (F). When folding: C becomes the bottom face. T folds to become the front face. B folds to become the back face. L folds to become the left face. R folds to become the right face. F wraps over to become the top face. Opposite pairs: C (bottom) opposite F (top); T (front) opposite B (back); L (left) opposite R (right)."
---

## The core challenge of paper folding

AO paper-folding questions show a sequence of fold operations on a flat sheet, sometimes followed by a hole punch. You need to predict what the unfolded sheet looks like. The challenge is that every fold is a mirror operation — features do not just slide, they reflect across the fold line.

The most important habit: process folds one at a time, in the exact order given. Never skip ahead.

## How to trace a fold

Think of the fold line as a mirror. Everything on the moving side flips to a mirror position on the stationary side. Distance from the fold line is preserved — a point 2 cm from the fold line ends up 2 cm on the other side of the fold line after folding.

When unfolding, run the same logic in reverse: each fold restores the mirrored position. A hole punched through two layers reveals two holes — one at the punch point, one at its mirror image across the fold line.

## Nets for a cube

A net question shows a flat arrangement of squares and asks which one correctly folds into a cube, or asks which face ends up opposite which.

A valid cube net always has exactly 6 squares and can be folded without any face overlapping another. The most common shape is a cross (plus sign) with an extra square on one arm. The face at the center of a cross-net always ends up opposite the face at the tip of the longest strip.

To determine opposite pairs without memorizing every net shape, pick the center square as your anchor and trace which square it faces when the sides fold up.

## The fold-sequence trap

The biggest pitfall in this section is reversing the fold order. Fold A then Fold B is not the same as Fold B then Fold A. The distractor answers often exploit this by showing the result of the reversed sequence.

Always write out (or mentally label) the state of the paper after each individual fold before applying the next one.

## Counting holes

When a punch goes through multiple folded layers, count the layers carefully. Two folds create four layers; a punch produces four holes when unfolded. The positions are not random — they are symmetric around each fold line. Draw a quick grid in your scratch space if the question allows it.
