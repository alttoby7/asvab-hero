---
topic_id: mc.gears-wheels
subtest: MC
title: Gears, Wheels & Axles
summary: Gears trade speed for torque, know the gear ratio formula and you can answer any ASVAB gear question in under 30 seconds.
formula_reference:
  - "Gear ratio: driven teeth ÷ driver teeth"
  - "Speed relationship: driver RPM × driver teeth = driven RPM × driven teeth"
  - "Torque relationship: higher gear ratio = more torque out, less speed out"
  - "Rotation direction: meshing gears rotate in opposite directions; idler gear reverses the direction again"
  - "Wheel and axle MA: MA = wheel radius ÷ axle radius"
  - "Belt/chain drive: same relationship as gears, larger driven pulley = lower speed, more torque"
pitfalls:
  - "Confusing driver and driven gear, the driver is connected to the power source; the driven gear does the work"
  - "Assuming meshing gears turn the same direction, they turn opposite; only gears on the same shaft or connected by a belt turn the same direction"
  - "Mixing up the speed-torque trade-off: larger driven gear = slower but more torque, smaller driven gear = faster but less torque"
  - "Forgetting that an idler gear changes direction but not the gear ratio between driver and final driven gear"
worked_examples:
  - prompt: "A driver gear has 10 teeth and turns at 600 RPM. The driven gear has 30 teeth. What is the driven gear's speed?"
    solution: "Gear ratio = 30 ÷ 10 = 3. Driven RPM = 600 ÷ 3 = 200 RPM. The driven gear turns 3× slower but delivers 3× the torque. Verify: 10 × 600 = 30 × 200 → 6,000 = 6,000. Correct."
  - prompt: "Two meshing gears: Gear A has 20 teeth and Gear B has 5 teeth. Gear A is the driver. Does Gear B spin faster or slower, and in which direction?"
    solution: "Gear ratio = 5 ÷ 20 = 0.25. Gear B spins at 1/0.25 = 4× the driver speed, much faster, with less torque. Direction: opposite to Gear A (meshing gears counter-rotate)."
  - prompt: "A steering wheel (wheel and axle) has a wheel radius of 15 in and an axle (shaft) radius of 1.5 in. What is the mechanical advantage?"
    solution: "MA = wheel radius ÷ axle radius = 15 ÷ 1.5 = 10. For every 10 lb of force you apply to the wheel rim, 100 lb of force is delivered at the axle. The trade-off: the wheel rim travels 10× the distance the shaft rotates."
diagrams:
  - type: gear-ratio
    after: "Gear ratio fundamentals"
---

## What the ASVAB is testing

Gear and wheel-and-axle questions are ratio problems dressed up in mechanical clothing. You need to know two things: how to compute the gear ratio, and what that ratio means for speed and torque.

The test presents scenarios, motor driving a gear train, bicycle sprocket and rear cassette, hand crank connected to a drum, and asks you to find output speed, output torque direction, or mechanical advantage.

## Gear ratio fundamentals

When a small gear drives a large gear, the large gear turns **slower** and produces **more torque**. When a large gear drives a small gear, the result is **higher speed** and **less torque**. The gear ratio tells you exactly how much:

> Gear ratio = driven teeth ÷ driver teeth

A ratio greater than 1 means speed reduction and torque multiplication. A ratio less than 1 means speed increase and torque reduction.

The speed formula avoids confusion about which gear is which:

> Driver RPM × driver teeth = Driven RPM × driven teeth

Plug in three known values and solve for the fourth.

## Direction of rotation

Meshing gears counter-rotate. If the top gear rotates clockwise, the gear it meshes with rotates counterclockwise. Add a third gear between them (an idler) and the final gear rotates the same direction as the first.

Idler gears appear on the ASVAB to test this. An idler doesn't change the gear ratio between the first and last gear, it only changes the final rotation direction.

## Wheel and axle

A wheel and axle is a lever wrapped around an axis. The wheel is the long arm; the axle is the short arm. You apply force at the wheel rim and get amplified torque at the axle, or vice versa for speed.

> MA = wheel radius ÷ axle radius

A steering wheel, a doorknob, a winch crank, and a screwdriver handle all work on this principle.

## Belt and chain drives

Pulleys connected by a belt or chain follow the same math as gear teeth, just use pulley circumference or diameter instead of tooth count. A large driven pulley gives you torque multiplication; a small driven pulley gives you speed multiplication.

## Quick test strategy

Identify the driver (power source side) and the driven (output side). Compute the ratio. If ratio > 1: output is slower, torque is up. If ratio < 1: output is faster, torque is down. Rotation direction: opposite for direct mesh, same for belt or idler.
