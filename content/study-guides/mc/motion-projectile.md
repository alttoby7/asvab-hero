---
topic_id: mc.motion-projectile
subtest: MC
title: Motion & Projectile Physics
summary: Horizontal and vertical motion are independent, keep them separate and projectile questions become straightforward plug-and-solve problems.
formula_reference:
  - "Velocity: v = d/t (distance ÷ time)"
  - "Acceleration: a = (v_f - v_i) / t (change in velocity ÷ time)"
  - "Distance under constant acceleration: d = v_i × t + ½ × a × t²"
  - "Free fall: d = ½ × g × t² (starting from rest; g = 32 ft/s² or 9.8 m/s²)"
  - "Projectile horizontal: x = v_x × t (constant velocity, no acceleration)"
  - "Projectile vertical: y = ½ × g × t² (free fall from rest; determines time of flight)"
pitfalls:
  - "Adding horizontal and vertical velocities directly, they are perpendicular components, not additive"
  - "Assuming a heavier object falls faster, in free fall (no air resistance), all objects fall at the same rate"
  - "Forgetting that horizontal velocity is constant during projectile flight, only vertical changes due to gravity"
  - "Using the wrong sign for gravity, in a downward-positive frame, g is +9.8 m/s²; in an upward-positive frame, it's −9.8 m/s²"
  - "Confusing speed (scalar, no direction) with velocity (vector, has direction)"
worked_examples:
  - prompt: "A ball is dropped from rest off a 45-meter cliff. How long does it take to hit the ground? (g = 10 m/s²)"
    solution: "Use d = ½ × g × t². Rearrange: t² = 2d/g = 2 × 45 / 10 = 9. t = √9 = 3 seconds. The ball hits the ground in exactly 3 seconds."
  - prompt: "A projectile is launched horizontally at 20 m/s from the edge of a cliff. It takes 3 seconds to hit the ground below. How far from the base of the cliff does it land?"
    solution: "Horizontal and vertical are independent. Horizontal distance = v_x × t = 20 × 3 = 60 meters. The 3-second fall time was determined by the vertical drop alone, gravity doesn't affect horizontal speed."
  - prompt: "A car accelerates from 0 to 30 m/s in 6 seconds. What is its acceleration?"
    solution: "a = (v_f - v_i) / t = (30 - 0) / 6 = 5 m/s². The car gains 5 meters per second of velocity every second. After 1 s it's at 5 m/s, after 2 s at 10 m/s, and so on to 30 m/s at 6 s."
---

## What the ASVAB is testing

Motion and projectile questions test whether you can apply kinematic formulas correctly. The ASVAB favors two problem types: straight-line motion with constant acceleration, and projectile motion where an object is launched horizontally off a cliff or a raised platform.

The key insight for projectile problems is that the horizontal and vertical directions are completely independent. Gravity only acts vertically. Horizontal velocity stays constant. Solve each direction separately, then combine if needed.

## Straight-line motion

Three quantities describe motion: position (distance), velocity, and acceleration. Velocity is the rate of change of position. Acceleration is the rate of change of velocity.

**Constant velocity:** d = v × t. Simple multiplication.

**Constant acceleration from rest:** d = ½ × a × t². This is how free fall works, an object dropped from rest falls 5 meters in the first second (using g ≈ 10 m/s²), 20 meters in the first two seconds, 45 meters in the first three.

**Non-zero initial velocity:** d = v_i × t + ½ × a × t². Use this when the object is already moving when it starts accelerating or decelerating.

## Free fall and falling objects

All objects fall at the same rate in the absence of air resistance. A 1-pound ball and a 100-pound ball dropped from the same height hit the ground simultaneously. This is a well-tested ASVAB trap, heavier does not mean faster in free fall.

The only variable in free fall is time. Once you know how long an object falls, you can find how far: d = ½ × g × t².

## Projectile motion

A projectile launched horizontally has two independent motions running simultaneously:

- **Horizontal:** constant velocity, no acceleration. The object travels v_x × t horizontal distance.
- **Vertical:** starts at zero vertical velocity, accelerates downward at g = 9.8 m/s² (or 10 for clean numbers).

The time of flight is determined entirely by the vertical fall. Find how long it takes to reach the ground using d = ½ × g × t². Then multiply that time by the horizontal velocity to get range.

A projectile launched at an angle (not just horizontally) requires splitting the initial velocity into horizontal and vertical components using trigonometry, this is less common on the ASVAB, but the same independence principle applies.

## Speed check

If an answer makes physical sense, it's probably right. A ball falling off a 5-meter table should take about 1 second. A car going 60 mph crosses a mile in 1 minute. Develop number intuition for common real-world motions so you can catch formula errors quickly.
