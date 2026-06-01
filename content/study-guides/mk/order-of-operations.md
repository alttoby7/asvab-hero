---
topic_id: mk.order-of-operations
subtest: MK
title: Order of Operations
summary: One fixed sequence governs every expression, get the order right and the arithmetic takes care of itself.
formula_reference:
  - "PEMDAS: Parentheses, Exponents, Multiplication/Division, Addition/Subtraction"
  - "GEMDAS: same idea, Grouping symbols (parentheses, brackets, braces) come first"
  - "Multiplication and division share one rank: do them left to right"
  - "Addition and subtraction share one rank: do them left to right"
  - "Exponents apply before any multiplication: 2 x 3^2 = 2 x 9 = 18"
  - "Distributing a negative: −(a − b) = −a + b"
pitfalls:
  - "Doing addition before multiplication: in 2 + 3 x 4 the answer is 14, not 20"
  - "Treating multiply-before-divide as a rule, they are equal rank, so go left to right"
  - "Squaring then multiplying in the wrong order: in 2 x 3^2, square first to get 18, not (2 x 3)^2 = 36"
  - "Dropping the sign when distributing a negative across parentheses"
  - "Ignoring nested grouping, always finish the innermost parentheses first"
worked_examples:
  - prompt: "Evaluate: 2 + 3 x 4"
    solution: "Multiplication before addition: 3 x 4 = 12, then 2 + 12 = 14"
  - prompt: "Evaluate: 24 / 4 x 2"
    solution: "Division and multiplication are equal rank, go left to right: 24 / 4 = 6, then 6 x 2 = 12"
  - prompt: "Evaluate: 5 x (2 + 3)^2"
    solution: "Parentheses first: 2 + 3 = 5. Exponent next: 5^2 = 25. Then multiply: 5 x 25 = 125"
  - prompt: "Evaluate: 3 + 2[4 + (6 − 2)]"
    solution: "Innermost first: 6 − 2 = 4. Inside brackets: 4 + 4 = 8. Multiply: 2 x 8 = 16. Add: 3 + 16 = 19"
---

## What the ASVAB is actually testing

Order of operations questions look like plain arithmetic, but they punish you for solving left to right when the rules say otherwise. The test wants to know one thing: do you apply operations in the correct sequence? Get the order wrong and you will land on a wrong answer that the test makers deliberately put in the choices.

There is no advanced math here. The challenge is discipline, not difficulty.

## PEMDAS and GEMDAS

The sequence is fixed:

1. **P**arentheses (and any other grouping symbols)
2. **E**xponents
3. **M**ultiplication and **D**ivision
4. **A**ddition and **S**ubtraction

Some people learn it as GEMDAS, where G stands for Grouping. That is the same rule with a clearer name, because brackets `[ ]` and braces `{ }` are grouping symbols too, not just round parentheses.

The letters tell you the order, but two of the pairs hide a trap, which is the next section.

## The left-to-right rule for equal ranks

Multiplication and division are the same rank. So are addition and subtraction. When two operations of the same rank sit in one expression, you do not always do the one named first in PEMDAS. You go left to right.

Look at `24 / 4 x 2`. If you multiply first you get `24 / 8 = 3`, which is wrong. Division comes first only because it is on the left: `24 / 4 = 6`, then `6 x 2 = 12`.

Same idea with `10 − 3 + 2`. Left to right gives `7 + 2 = 9`, not `10 − 5 = 5`.

## Exponents come before multiplication

An exponent attaches only to the number directly under it, and it is evaluated before any multiplication around it. In `2 x 3^2`, you square the 3 first: `3^2 = 9`, then `2 x 9 = 18`. You do not multiply `2 x 3` first. That would be `6^2 = 36`, a different value and a common wrong answer.

The exponent reaches further only when parentheses tell it to. `(2 x 3)^2` does mean `6^2 = 36`, because the parentheses group the multiplication first.

## Nested parentheses: work from the inside out

When grouping symbols sit inside other grouping symbols, finish the innermost set before touching the outer one.

> 3 + 2[4 + (6 − 2)]
>
> Innermost: 6 − 2 = 4
>
> Brackets: 4 + 4 = 8
>
> Multiply: 2 x 8 = 16
>
> Add: 3 + 16 = 19

Peel one layer at a time. Rewriting the whole expression after each step keeps you from losing track.

## Negatives and distribution

A negative sign in front of parentheses flips every term inside. `−(a − b)` becomes `−a + b`. So `8 − (3 − 5) = 8 − (−2) = 10`, not `8 − 3 − 5 = 0`. Resolve the parentheses fully, sign included, before you combine.

## Connection to other topics

Order of operations runs underneath every calculation on the MK section. Algebra requires it when you simplify both sides of an equation, exponent problems require it when bases and powers mix, and geometry formulas like area and volume require it when you plug in values. Lock this down and the rest of MK gets more reliable.
