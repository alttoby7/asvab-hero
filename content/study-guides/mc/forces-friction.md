---
topic_id: mc.forces-friction
subtest: MC
title: Forces, Friction & Pressure
summary: Newton's second law and pressure calculations cover the majority of MC force questions, learn the formulas and how units cancel.
formula_reference:
  - "Newton's second law: F = ma (force in Newtons, mass in kg, acceleration in m/s²)"
  - "Weight: W = mg (weight in lb or N; g = 32 ft/s² or 9.8 m/s²)"
  - "Pressure: P = F/A (pressure = force ÷ area; larger area = lower pressure for same force)"
  - "Friction force: f = μN (coefficient of friction × normal force)"
  - "Static vs. kinetic friction: static friction is higher, it takes more force to start moving than to keep moving"
  - "Net force: sum of all forces including direction; opposing forces subtract"
pitfalls:
  - "Confusing mass (kg or lb-mass) with weight (lb-force or Newtons), they're related by gravity, not equal"
  - "Forgetting that friction opposes motion, it acts opposite to the direction the object moves or tends to move"
  - "Assuming more weight always means more friction, friction also depends on the surface roughness (μ)"
  - "Mixing up static and kinetic friction, the force needed to start movement is always greater than the force to sustain it"
  - "Ignoring net force, two forces in opposite directions partially cancel; you must subtract, not add"
worked_examples:
  - prompt: "A 10-kg crate sits on a flat surface with a coefficient of static friction of 0.4. What minimum force is needed to start sliding it? (use g = 10 m/s²)"
    solution: "Normal force N = mg = 10 × 10 = 100 N. Friction force f = μN = 0.4 × 100 = 40 N. You must apply at least 40 N horizontally to overcome static friction and begin moving the crate."
  - prompt: "A 200-lb force is applied to a hydraulic piston with an area of 4 in². What is the pressure in the fluid?"
    solution: "P = F ÷ A = 200 ÷ 4 = 50 psi. That 50 psi acts equally in all directions throughout the fluid (Pascal's law), which is why hydraulic systems can multiply force at a larger output piston."
  - prompt: "A 5-kg object is pushed across a floor with a net force of 15 N (friction already subtracted). What is its acceleration?"
    solution: "F = ma → a = F ÷ m = 15 ÷ 5 = 3 m/s². The object accelerates at 3 meters per second squared in the direction of the net force."
diagrams:
  - type: force-diagram
    after: "Net force"
---

## What the ASVAB is testing

Force questions test whether you can apply Newton's laws and pressure formulas to real scenarios: a vehicle accelerating, a piston in a hydraulic system, a box being pushed across a floor. The math is straightforward, the trap is picking the wrong formula or forgetting about direction.

## Newton's laws in plain terms

**First law (inertia):** An object keeps doing what it's doing, moving or stationary, until a net force acts on it. This is why a vehicle skids when brakes lock: the wheels stop turning, but the car's inertia keeps it moving forward.

**Second law:** F = ma. Force equals mass times acceleration. If you double the force on the same mass, you double the acceleration. If you double the mass with the same force, you halve the acceleration. This is the workhorse formula for MC force problems.

**Third law:** Every action has an equal and opposite reaction. When a rifle fires, the bullet goes forward and the gun recoils backward. When a rocket engine pushes exhaust down, the rocket goes up.

## Friction

Friction always opposes the direction of motion. Two types matter here:

**Static friction** keeps an object from moving when a force is applied. It matches the applied force up to a maximum (μs × N). Once that maximum is exceeded, the object starts moving.

**Kinetic friction** acts while the object is in motion and is lower than static friction. This is why it's easier to keep a box sliding than to get it started.

The normal force N is perpendicular to the surface, on a flat floor it equals the object's weight. On an incline, it's reduced by the angle.

## Pressure and Pascal's law

Pressure = Force ÷ Area. Concentrate the same force over a smaller area and pressure goes up (sharp knife cuts better than a dull one). Spread it over a larger area and pressure drops (snowshoes prevent sinking).

Pascal's law: pressure applied to an enclosed fluid is transmitted equally in all directions. This is the basis of hydraulic systems. A small piston with high pressure can drive a large piston with large force.

## Net force

When multiple forces act on an object, find the net force before applying F = ma. Forces in the same direction add; forces in opposite directions subtract. If a 50 N push meets 20 N of friction, the net force is 30 N, not 70 N.
