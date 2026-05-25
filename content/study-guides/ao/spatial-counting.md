---
topic_id: ao.spatial-counting
subtest: AO
title: Spatial Counting & Orientation
summary: Count hidden cubes and track directional relationships accurately, systematic layering beats eyeballing every time.
formula_reference:
  - "Total cubes in a rectangular stack: length × width × height (use this to double-check your count)"
  - "Visible cubes: cubes touching at least one exposed surface, does not include cubes completely buried inside"
  - "Hidden cubes: total cubes minus visible cubes; or count each layer systematically from bottom to top"
  - "Left vs. right convention: always orient yourself to the figure as drawn, left in the figure is YOUR left when facing it"
  - "Compass directions in a map/grid problem: North is up, East is right, South is down, West is left, unless the figure labels otherwise"
pitfalls:
  - "Counting only the cubes you can see from one angle, hidden interior cubes and back-row cubes are always present unless a space is shown"
  - "Reversing left and right when interpreting a 3D figure, anchor to the figure's own orientation, not your body position"
  - "Miscounting stacks of cubes by skipping the ground layer, always start your count at the bottom"
  - "Assuming symmetry when the figure is not symmetric, check every column individually rather than mirroring one side"
worked_examples:
  - prompt: "A staircase-shaped structure is built from unit cubes. From left to right, the columns are 3 cubes tall, 2 cubes tall, and 1 cube tall. All columns are 1 cube deep and 1 cube wide. How many total unit cubes make up the structure?"
    solution: "Add each column: 3 + 2 + 1 = 6 cubes. Confirm with the formula: not a full rectangle, so use column-by-column addition. Total: 6 unit cubes."
  - prompt: "A 3×3×3 cube structure (27 total cubes) has its outermost layer removed on all six faces. How many cubes remain in the interior?"
    solution: "Removing the outer layer peels 1 cube from each side. The interior is (3-2)×(3-2)×(3-2) = 1×1×1 = 1 cube. Only 1 cube is completely hidden from all six faces."
  - prompt: "You are standing north of a building and looking south. Your colleague is standing east of the building and looking west. You see a flagpole to your left. From your colleague's perspective, is the flagpole to their left, right, in front, or behind them?"
    solution: "You face south. Your left is east. The flagpole is east of the building. Your colleague faces west. East is now behind them. The flagpole is behind your colleague."
---

## What spatial counting tests

Spatial counting and orientation questions give you a drawing of stacked cubes or a map-style arrangement and ask two types of questions: (1) How many cubes are present? and (2) What is the spatial relationship between two reference points when the viewer's orientation changes?

Both types punish rushing and reward a systematic approach.

## Counting cubes the right way

Never try to count all the cubes in one pass from a single angle. Instead, count layer by layer, from bottom to top.

For each horizontal layer, count the cubes in that layer. Then sum across all layers. This method catches hidden interior cubes and back-row cubes that are invisible from the front view but still structurally present.

For a fully filled rectangular prism, cross-check with length × width × height. If your layer-by-layer sum does not match, recount.

If the structure has cutouts or missing cubes, subtract them from the full rectangular count rather than trying to count only the present cubes, subtraction is faster and less error-prone.

## Orientation problems: anchor to a fixed reference

When a question asks what someone sees from a different direction, draw the four compass positions mentally: North, South, East, West. Mark where each observer is standing and which way they face. Then identify the target object's compass position.

The trick: once you know the object's compass direction (say, it is east of the building), check where east falls in the new observer's coordinate frame. If the second observer faces west, east is behind them. If they face north, east is to their right.

Do not try to rotate yourself mentally to match the observer, it leads to reversals. Instead, fix the object's compass bearing and evaluate it against the new observer's facing direction.

## The left-right reversal trap

This is the most common error in orientation questions. "Left" and "right" are relative to whoever is doing the looking. A flagpole to your left when you face south is to your right when you face north, it has not moved, but your frame has flipped.

Always establish: (1) what direction does the observer face? (2) what is the absolute (compass) location of the target? Then derive left/right from those two facts, never from intuition.

## Practice approach

Work orientation problems on scratch paper with a compass rose. Write N/S/E/W, mark each person's position, note the target's position. Translate only at the end. Students who try to hold the rotation purely in their head almost always make at least one reversal error.
