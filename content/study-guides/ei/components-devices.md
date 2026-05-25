---
topic_id: ei.components-devices
subtest: EI
title: Components & Devices
summary: Knowing what each electrical component does, and the symbol used to represent it, is the vocabulary side of EI that the ASVAB tests with recognition questions.
formula_reference:
  - "Resistor: limits current flow (symbol: zigzag line); measured in Ohms (Ω)"
  - "Capacitor: stores charge temporarily (symbol: two parallel lines); measured in Farads (F)"
  - "Inductor/coil: stores energy in a magnetic field (symbol: loops); measured in Henries (H)"
  - "Diode: allows current in one direction only (symbol: triangle pointing to a bar)"
  - "Transistor: amplifies or switches signals, 3 terminals: base, collector, emitter"
  - "Transformer: steps voltage up or down using magnetic induction (AC only)"
pitfalls:
  - "Confusing a capacitor (stores charge, blocks DC, passes AC) with a battery (chemical energy source)"
  - "Thinking a diode allows current in both directions, it only conducts in the forward-bias direction"
  - "Mixing up a fuse (one-time protection, must be replaced) with a circuit breaker (reusable, can be reset)"
  - "Assuming a transformer works on DC, transformers require alternating current (AC) to function"
  - "Forgetting that a ground symbol (three horizontal lines, each shorter) indicates the reference 0 V point, not an actual physical connection to earth in all cases"
worked_examples:
  - prompt: "A component allows current to flow in only one direction. What is it?"
    solution: "A diode. It conducts when forward-biased (positive voltage at anode) and blocks current when reverse-biased."
  - prompt: "A circuit needs to protect against excessive current and automatically reset after the fault is cleared. Which device is appropriate?"
    solution: "A circuit breaker, it trips on overcurrent and can be manually or automatically reset. A fuse would require replacement."
  - prompt: "Which component would you use to temporarily store charge and release it quickly (as in a camera flash)?"
    solution: "A capacitor, it charges up and can discharge rapidly, making it ideal for pulsed loads like a flash unit."
---

## What the ASVAB is actually testing

EI component questions are identification and function questions, you see a description or a schematic symbol and select the correct component, or you read what a circuit needs and pick the right device. This is vocabulary. The test does not ask you to build or analyze full schematics; it asks whether you know what each part does.

## The essential components

**Resistor**, the most common passive component. Limits current by converting electrical energy to heat. Fixed resistors have a set value; variable resistors (potentiometers, rheostats) can be adjusted.

**Capacitor**, stores electrical charge in an electric field between two conductive plates. It charges quickly, holds the charge, and can discharge it on demand. Key behavior: blocks DC, passes AC.

**Inductor**, a coil of wire that stores energy in a magnetic field. Key behavior: blocks AC changes, passes DC steadily. Inductors resist rapid changes in current (opposite of capacitors, which resist rapid changes in voltage).

**Diode**, a semiconductor device that acts like a one-way valve for current. In circuit diagrams, the arrow points in the direction of conventional (positive) current flow.

**Transistor**, a three-terminal semiconductor device used for amplification and switching. Bipolar transistors have base, collector, and emitter terminals. Small signals at the base control larger currents between collector and emitter.

**Transformer**, two coils of wire sharing a magnetic core. Used to step voltage up or down. Only works on AC. A step-up transformer increases voltage and decreases current; step-down does the reverse.

## Protection devices

**Fuse**, a thin wire that melts and breaks the circuit if current exceeds its rating. Single-use only; must be replaced.

**Circuit breaker**, an electromagnetic or thermal switch that trips on overcurrent. Resettable, flip it back after fixing the fault.

Both protect downstream components, but circuit breakers are preferred where repeated access is needed (household wiring, vehicle fuse panels with dedicated circuit protectors).

## Reading schematic symbols

You don't need to memorize every symbol, but the ASVAB commonly tests:

| Component | Symbol clue |
|---|---|
| Resistor | Zigzag or rectangle |
| Capacitor | Two parallel lines (one may be curved) |
| Battery | Long line (positive) + short line (negative), repeated |
| Diode | Triangle with a bar at the tip |
| Ground | Stack of shortening horizontal lines |

## Study approach

Make a two-column table: component on the left, function on the right. Then add a third column for the schematic symbol description. Test yourself on function from name, and name from function, both directions appear on the exam.
