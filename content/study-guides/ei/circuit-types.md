---
topic_id: ei.circuit-types
subtest: EI
title: Circuit Types
summary: Series and parallel circuits behave oppositely, learn the two sets of rules and you can solve any EI circuit question the ASVAB throws at you.
formula_reference:
  - "Series total resistance: R_total = R1 + R2 + R3 + ..."
  - "Series current: same through every component (I is constant)"
  - "Series voltage: V_total = V1 + V2 + V3 (voltages add up)"
  - "Parallel total resistance: 1/R_total = 1/R1 + 1/R2 + 1/R3 (total R is always less than smallest branch)"
  - "Parallel voltage: same across every branch (V is constant)"
  - "Parallel current: I_total = I1 + I2 + I3 (currents add up)"
pitfalls:
  - "Thinking total resistance increases when you add a parallel branch, it always decreases (more paths = less total resistance)"
  - "Applying series voltage rules to a parallel circuit or vice versa, identify the circuit type first"
  - "Forgetting that in a series circuit, one open component breaks the entire circuit; in parallel, other branches still function"
  - "Using 1/R_total = 1/R1 + 1/R2 and stopping there, you must take the reciprocal of that sum to get R_total"
worked_examples:
  - prompt: "Two resistors, 6 Ω and 4 Ω, are connected in series to a 20 V battery. What is the total current?"
    solution: "Series: R_total = 6 + 4 = 10 Ω. I = V/R = 20 V ÷ 10 Ω = 2 A"
  - prompt: "The same two resistors (6 Ω and 4 Ω) are now connected in parallel to a 12 V battery. What is the total resistance?"
    solution: "1/R_total = 1/6 + 1/4 = 2/12 + 3/12 = 5/12. R_total = 12/5 = 2.4 Ω"
  - prompt: "In a parallel circuit with two branches drawing 3 A and 5 A respectively, what is the total current from the battery?"
    solution: "Parallel: currents add. I_total = 3 + 5 = 8 A"
---

## What the ASVAB is actually testing

Circuit-type questions are some of the most calculation-heavy on EI. They give you a circuit configuration and ask about total resistance, current, or voltage. The key is knowing which of the two rule sets applies, series or parallel, before you start calculating.

## Series circuits: everything in one loop

In a **series circuit**, components are connected end-to-end in a single loop. There's only one path for current.

Rules for series:
- **Current is the same everywhere**, one loop means identical flow throughout
- **Voltage divides**, each component gets a share of the total voltage; they add up to the source
- **Resistance adds**, R_total = R1 + R2 + R3 + ...

Consequence: if any component fails (opens), the entire circuit goes dark, like old-style Christmas lights.

## Parallel circuits: multiple branches

In a **parallel circuit**, components are connected side-by-side, sharing the same two connection points. Current has multiple paths to choose from.

Rules for parallel:
- **Voltage is the same across every branch**, each branch sees the full source voltage
- **Current divides**, more current flows through lower-resistance branches; branch currents add to the total
- **Total resistance decreases**, adding more branches always lowers total resistance

This is how household wiring works, each outlet gets full voltage, and appliances operate independently.

## Two-resistor parallel shortcut

For exactly two resistors in parallel, skip the reciprocal formula:

> R_total = (R1 × R2) / (R1 + R2)

Two 6 Ω resistors in parallel: (6 × 6) / (6 + 6) = 36/12 = **3 Ω**

That's always exactly half of either resistor when they're equal.

## How to attack circuit questions

1. Identify: series (single loop) or parallel (multiple branches)?
2. Write down the appropriate rule set
3. Solve for total resistance first, then use V = IR for current or voltage

If the question mentions a short circuit or open circuit: an **open** (broken wire) stops current; a **short** (zero resistance path) causes maximum current and often damages the circuit.

## Study approach

Draw a simple series and parallel circuit diagram from memory. Then practice each rule set with two and three resistors until you can execute the calculation in under 30 seconds. Speed matters on EI.
