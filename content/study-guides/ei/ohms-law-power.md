---
topic_id: ei.ohms-law-power
subtest: EI
title: Ohm's Law & Power
summary: Three variables, two equations, once you can rearrange V=IR and P=IV confidently, you can answer the majority of EI calculation questions.
formula_reference:
  - "Ohm's Law: V = IR (Voltage = Current × Resistance)"
  - "Rearranged: I = V/R and R = V/I"
  - "Power (basic): P = IV (Power = Current × Voltage)"
  - "Power (resistance form): P = I²R"
  - "Power (voltage form): P = V²/R"
  - "Energy: E = P × t (Power × time, units: Watt-hours or Joules)"
pitfalls:
  - "Solving for the wrong variable, always identify what the question asks for before rearranging"
  - "Mixing up units: Voltage (V, Volts), Current (I, Amperes/amps), Resistance (R, Ohms Ω), Power (P, Watts)"
  - "Using P = IV when you only have V and R, switch to P = V²/R to avoid an extra step"
  - "Forgetting that doubling current quadruples power dissipated in a resistor (P = I²R, current is squared)"
worked_examples:
  - prompt: "A circuit has a voltage of 12 V and a resistance of 4 Ω. What is the current?"
    solution: "I = V/R = 12 V ÷ 4 Ω = 3 A"
  - prompt: "A resistor draws 3 A at 12 V. How much power does it dissipate?"
    solution: "P = IV = 3 A × 12 V = 36 W. Check: P = I²R = 9 × 4 = 36 W ✓"
  - prompt: "A 60 W bulb runs on 120 V. What is its resistance?"
    solution: "P = V²/R → R = V²/P = (120)²/60 = 14400/60 = 240 Ω"
  - prompt: "If current through a resistor doubles, what happens to the power it dissipates?"
    solution: "P = I²R, current is squared, so doubling I multiplies power by 4. Power quadruples."
diagrams:
  - type: ohms-law-triangle
    after: "Ohm's Law: the foundation"
    props:
      top: "V"
      bottomLeft: "I"
      bottomRight: "R"
      units: { top: "V", bottomLeft: "A", bottomRight: "Ω" }
  - type: ohms-law-triangle
    after: "Power: two forms you need"
    props:
      label: "Power solver"
      top: "P"
      bottomLeft: "I"
      bottomRight: "E"
      units: { top: "W", bottomLeft: "A", bottomRight: "V" }
---

## What the ASVAB is actually testing

Ohm's Law and power calculations make up the core of the Electronics Information (EI) subtest. The questions are predictable: you get two values, asked for a third. The entire section rewards knowing three equations and being able to rearrange them quickly under time pressure.

## Ohm's Law: the foundation

**V = IR**, Voltage equals Current times Resistance.

Think of it like water pressure in a pipe: voltage is the pressure, current is the flow rate, and resistance is how narrow the pipe is. More resistance, less current for the same voltage.

Memorize the triangle shortcut:

```
    V
  -----
  I × R
```

Cover what you want to find, the remaining arrangement is your formula:
- Cover V → V = I × R
- Cover I → I = V / R
- Cover R → R = V / I

## Power: two forms you need

**P = IV** works when you have both current and voltage.

When you only have current and resistance, skip the middle step: **P = I²R**

When you only have voltage and resistance: **P = V²/R**

All three give the same answer for the same circuit. Use whichever saves you a calculation step.

## The doubling trap

Test makers love asking what happens to power when you change one variable:

- Double voltage (constant R) → power quadruples (P = V²/R, V is squared)
- Double current (constant R) → power quadruples (P = I²R, I is squared)
- Double resistance (constant V) → power halves (P = V²/R, R is in denominator)

Recognizing the squared relationship is faster than recalculating from scratch.

## Units to keep straight

| Symbol | Quantity | Unit |
|---|---|---|
| V | Voltage | Volt (V) |
| I | Current | Ampere (A) |
| R | Resistance | Ohm (Ω) |
| P | Power | Watt (W) |

Don't let the variable V (voltage) and the unit V (Volt) trip you up, context makes them clear.

## Study approach

Write out all three power formulas on a scratch card and drill substitution problems. The EI section moves fast, you want Ohm's Law rearrangements to be automatic so you can spend your time on the harder circuit-type questions.
