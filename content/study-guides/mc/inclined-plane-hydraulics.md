---
topic_id: mc.inclined-plane-hydraulics
subtest: MC
title: Inclined Planes & Hydraulics
summary: Ramps reduce the force needed to raise a load; hydraulic systems multiply force through pressure, both are just mechanical advantage with different hardware.
formula_reference:
  - "Inclined plane MA: MA = length of ramp ÷ height of ramp"
  - "Effort on a ramp: Effort = Load × (height ÷ length) = Load ÷ MA"
  - "Work conservation: F × length of ramp = Load × height (ignoring friction)"
  - "Pascal's law: pressure is equal throughout a connected fluid (P₁ = P₂)"
  - "Hydraulic MA: MA = area of output piston ÷ area of input piston (A₂ ÷ A₁)"
  - "Hydraulic force output: F₂ = F₁ × (A₂ ÷ A₁)"
pitfalls:
  - "Using the height instead of the ramp length in the MA formula, MA is length ÷ height, not height ÷ length"
  - "Forgetting friction increases the actual effort needed on a real ramp beyond the ideal MA calculation"
  - "Confusing piston area with piston diameter, if given diameter, area = π × (d/2)² before computing MA"
  - "Assuming higher hydraulic MA gives free energy, the input piston must travel farther to move the output piston less"
  - "Treating wedges and screws as different from inclined planes, they're inclined planes wrapped or stacked"
  - "Forgetting buoyancy equals the weight of displaced fluid, a submerged object's apparent weight loss matches the fluid it pushes aside, not the object's own weight"
  - "Misreading Hooke's law, the spring force grows in proportion to how far it is stretched (F = k x x); doubling the stretch doubles the force"
worked_examples:
  - prompt: "A 600-lb engine is pushed up a ramp that is 12 feet long and 3 feet high. What is the ideal mechanical advantage, and how much force is required (ignore friction)?"
    solution: "MA = length ÷ height = 12 ÷ 3 = 4. Effort = Load ÷ MA = 600 ÷ 4 = 150 lb. The ramp multiplies force by 4, but the engine must travel 12 feet to rise just 3 feet."
  - prompt: "A hydraulic jack has a small input piston with an area of 2 in² and a large output piston with an area of 20 in². A mechanic pushes down with 50 lb of force. How much force lifts the car?"
    solution: "MA = A₂ ÷ A₁ = 20 ÷ 2 = 10. Output force = 50 × 10 = 500 lb. Pressure at the input: P = 50 ÷ 2 = 25 psi. That same 25 psi acts on the output piston: 25 × 20 = 500 lb. Both routes confirm the answer."
  - prompt: "A wedge is 8 inches long and 2 inches thick at the wide end. What is its mechanical advantage?"
    solution: "A wedge is an inclined plane, MA = length ÷ thickness = 8 ÷ 2 = 4. The wedge multiplies the driving force by 4 in the splitting direction. Longer, thinner wedges have higher MA and split more easily but require more driving distance."
  - prompt: "A hydraulic press has an input piston of 5 in^2 and an output piston of 50 in^2. If 30 lb is applied to the input, what force appears at the output, and how does Pascal's law confirm it?"
    solution: "MA = A2 / A1 = 50 / 5 = 10, so output force = 30 x 10 = 300 lb. Check with pressure: P = F1 / A1 = 30 / 5 = 6 psi, and that 6 psi acts on the output, 6 x 50 = 300 lb. Both routes agree."
  - prompt: "A spring stretches 4 inches when a 20-lb weight hangs from it. What is the spring constant, and how far will a 35-lb weight stretch it?"
    solution: "Hooke's law: F = k x x, so k = F / x = 20 / 4 = 5 lb per inch. For 35 lb: x = F / k = 35 / 5 = 7 inches. The stretch stays proportional to the load as long as the spring is not overstretched."
  - prompt: "A block displaces 3 cubic feet of water when fully submerged. Water weighs about 62.4 lb per cubic foot. What is the buoyant force on the block?"
    solution: "By Archimedes' principle, buoyant force = weight of displaced water = 3 x 62.4 = 187.2 lb pushing upward. If the block weighs less than 187.2 lb it floats; if more, it sinks but feels 187.2 lb lighter underwater."
diagrams:
  - type: inclined-plane
    after: "Inclined planes: the long-cut principle"
  - type: hydraulics
    after: "Hydraulics: Pascal's law in practice"
---

## What the ASVAB is testing

Inclined plane and hydraulics questions both test one core concept: force multiplication through geometry. The ASVAB presents a ramp, a wedge, a screw, or a hydraulic cylinder and asks you to calculate output force or mechanical advantage. The numbers are always clean, no guessing required if you use the right formula.

## Inclined planes: the long-cut principle

A ramp reduces the effort needed to raise a load by spreading the work over a longer distance. The steeper the ramp, the closer it is to lifting straight up, MA approaches 1 and you gain nothing. The shallower the ramp, the easier the push, but the longer you have to push.

> MA = ramp length ÷ ramp height

A ramp 10 feet long rising 2 feet has MA = 5. You push one-fifth the load's weight, but you push it 10 feet for a 2-foot rise.

**Wedge:** Two inclined planes back-to-back. An axe splitting wood, a door stop, a zipper tooth, all wedges. MA = slant length ÷ width at the thick end. Longer and thinner = higher MA.

**Screw:** An inclined plane wrapped into a helix. One turn of the screw advances the fastener one pitch. Fine-thread screws (more turns per inch) have higher MA and greater holding power; coarse threads advance faster.

## Hydraulics: Pascal's law in practice

A hydraulic system uses an incompressible fluid to transmit force. When you push on a small piston, pressure (force per unit area) spreads equally throughout the fluid. That same pressure acts on a larger output piston, producing a proportionally larger force.

> P = F₁ ÷ A₁ = F₂ ÷ A₂

Rearranged: F₂ = F₁ × (A₂ ÷ A₁)

A 10:1 area ratio gives 10:1 force multiplication. The catch: the input piston must travel 10 times as far as the output piston moves. Work in = work out (ideal system, no losses).

**Real-world examples:** automotive brake systems, hydraulic jacks, power-steering systems, construction equipment lifts.

## The common trap on both topics

Both inclined planes and hydraulics require computing an area or length ratio before finding force. The most common mistake is plugging in the wrong dimension, using diameter instead of area for a piston, or height instead of ramp length for MA. Stop, identify what the question is giving you, convert if needed, then calculate.
