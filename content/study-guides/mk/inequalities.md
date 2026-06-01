---
topic_id: mk.inequalities
subtest: MK
title: Inequalities
summary: Solve them exactly like equations, with one rule that trips up almost everyone, flip the sign when you multiply or divide by a negative.
formula_reference:
  - "Symbols: < less than, > greater than, ≤ less than or equal to, ≥ greater than or equal to"
  - "Add or subtract the same amount on both sides: the symbol stays the same"
  - "Multiply or divide both sides by a POSITIVE number: the symbol stays the same"
  - "Multiply or divide both sides by a NEGATIVE number: FLIP the symbol"
  - "Compound inequality: a < x < b means x is between a and b"
  - "Open dot (< or >) excludes the endpoint; closed dot (≤ or ≥) includes it"
pitfalls:
  - "Forgetting to flip the symbol after dividing or multiplying by a negative"
  - "Flipping the symbol when only adding or subtracting, that never requires a flip"
  - "Solving only one side of a compound inequality and ignoring the other"
  - "Confusing 'at least' (≥) with 'more than' (>), and 'at most' (≤) with 'less than' (<)"
  - "Using an open dot when the wording includes the endpoint, or a closed dot when it does not"
worked_examples:
  - prompt: "Solve for x: 3x + 4 < 19"
    solution: "Subtract 4: 3x < 15. Divide by 3 (positive, no flip): x < 5"
  - prompt: "Solve for x: −2x > 8"
    solution: "Divide both sides by −2 and FLIP the symbol: x < −4"
  - prompt: "Solve the compound inequality: −3 < 2x − 1 ≤ 5"
    solution: "Add 1 to all three parts: −2 < 2x ≤ 6. Divide all parts by 2: −1 < x ≤ 3"
  - prompt: "A delivery truck can carry at most 1,200 pounds. It already holds 750 pounds. Write and solve an inequality for the additional weight w it can carry."
    solution: "750 + w ≤ 1,200. Subtract 750: w ≤ 450. It can carry up to 450 more pounds."
---

## What the ASVAB is actually testing

Inequalities work almost exactly like equations. You isolate the variable using the same steps you already know. The ASVAB is checking two things: can you solve a linear inequality, and do you remember the one rule that makes inequalities different from equations? That rule is the flip, and it is the single most tested idea in this topic.

## Solving a linear inequality

Treat it like an equation. To solve `3x + 4 < 19`, peel off the constant first, then the coefficient:

> Subtract 4 from both sides: 3x < 15
>
> Divide both sides by 3: x < 5

Because you divided by a positive number, the symbol stayed the same. Adding, subtracting, and dividing or multiplying by a positive number never change the direction of the inequality.

## The flip rule

Here is the one thing that is different. When you multiply or divide both sides by a negative number, you must flip the inequality symbol.

Take `−2x > 8`. Divide both sides by `−2`, and flip the `>` to `<`:

> x < −4

Why flip? Multiplying by a negative reverses the order of the number line. A quick check: pick `x = −5`, which satisfies `x < −4`. Plug it in: `−2(−5) = 10`, and `10 > 8` is true. If you had skipped the flip and written `x > −4`, then `x = 0` would test as `−2(0) = 0`, and `0 > 8` is false. The flip is not optional.

One warning in the other direction: a negative number sitting in the problem does not automatically mean you flip. You flip only when you actually multiply or divide both sides by a negative. Adding or subtracting a negative does not.

## Compound inequalities

A compound inequality traps the variable between two values, like `−3 < 2x − 1 ≤ 5`. Whatever you do, do it to all three parts at once:

> Add 1 to every part: −2 < 2x ≤ 6
>
> Divide every part by 2: −1 < x ≤ 3

So x is greater than −1 and less than or equal to 3. Do not solve only the left or only the right and forget the other.

## Reading the number line

The solution to an inequality is a range, not a single point. Picture it on a number line:

- `x < 5` is everything to the left of 5, with an **open** dot at 5 because 5 itself is not included.
- `x ≤ 5` is the same range but with a **closed** (filled) dot at 5, because 5 is included.
- A compound like `−1 < x ≤ 3` is the segment between −1 and 3, open at −1 and closed at 3.

The dot type matches the symbol: a plain `<` or `>` excludes the endpoint, while `≤` or `≥` includes it.

## Translating word constraints

Word problems hide the symbol in the phrasing. Learn these:

- "at least" or "no less than" means `≥`
- "at most" or "no more than" means `≤`
- "more than" or "exceeds" means `>`
- "less than" or "under" means `<`

A truck that can carry "at most 1,200 pounds" gives `total ≤ 1,200`. If it already holds 750 pounds, then `750 + w ≤ 1,200`, so `w ≤ 450`. The difference between "at most" and "less than" is whether the endpoint counts, so read the wording carefully.

## Connection to other topics

Inequalities build directly on linear algebra, the isolation steps are identical, so master equations first. They also lean on number properties for sign behavior, which is exactly what the flip rule depends on. If sign rules feel shaky, review number properties alongside this topic.
