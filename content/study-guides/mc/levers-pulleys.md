---
topic_id: mc.levers-pulleys
subtest: MC
title: Levers & Pulleys
summary: Both levers and pulleys trade distance for force, once you see that pattern, every mechanical advantage question follows the same logic.
formula_reference:
  - "Mechanical advantage (lever): MA = effort arm length ÷ load arm length"
  - "Lever law: Effort × effort arm = Load × load arm (moments balance at the fulcrum)"
  - "Fixed pulley: MA = 1, changes direction of force only, no force reduction"
  - "Movable pulley: MA = 2, cuts required effort in half; rope travels twice as far"
  - "Compound pulley (block and tackle): MA = number of rope segments supporting the load"
  - "Work is conserved: a 3× MA means you pull 3× the distance to move the load 1× the distance"
pitfalls:
  - "Confusing effort arm and load arm, effort arm is measured from the fulcrum to where you apply force, NOT the full lever length"
  - "Assuming a fixed pulley reduces the effort force, it only redirects it"
  - "Counting the wrong rope segments in a block-and-tackle, count only the segments supporting the moving block"
  - "Forgetting that mechanical advantage doesn't reduce the total work, it trades force for distance"
worked_examples:
  - prompt: "A first-class lever has its fulcrum 1 ft from the load and 4 ft from where the effort is applied. A 200-lb load sits on the short end. How much effort is required to lift it?"
    solution: "MA = effort arm ÷ load arm = 4 ÷ 1 = 4. Effort = Load ÷ MA = 200 ÷ 4 = 50 lb. You push 50 lb on the long end to lift 200 lb on the short end, but your end moves 4 inches for every 1 inch the load rises."
  - prompt: "A single movable pulley is used to lift a 300-lb engine block. How much force must the worker apply to the rope?"
    solution: "A movable pulley gives MA = 2. Effort = 300 ÷ 2 = 150 lb. The worker pulls 150 lb but must pull 2 feet of rope for every 1 foot the engine rises."
  - prompt: "A block-and-tackle system has 4 rope segments supporting the lower (movable) block. A worker needs to lift a 480-lb load. What effort force is needed?"
    solution: "MA = 4. Effort = 480 ÷ 4 = 120 lb. The worker pulls 120 lb but hauls in 4 feet of rope for each foot of lift."
diagrams:
  - type: lever
    after: "Lever calculation: the fulcrum trick"
  - type: pulley
    after: "Fixed vs. movable pulleys"
  - type: pulley-system
    after: "The work conservation rule"
---

## What the ASVAB is testing

Mechanical Comprehension lever and pulley questions give you a physical setup, lengths, weights, or number of rope segments, and ask you to find either the mechanical advantage or the force needed. Every problem is an application of one formula.

The test uses real scenarios: crowbars, wheelbarrows, flagpole ropes, engine hoists. Recognize the type of lever or pulley first, then plug in the numbers.

## Lever classes, and why they matter

All levers have three components: the **fulcrum** (pivot), the **effort** (force you apply), and the **load** (resistance you're moving). The class is determined by which component sits in the middle.

- **Class 1:** Fulcrum in the middle. Examples: seesaw, crowbar, scissors. Can provide MA > 1 or < 1 depending on arm lengths.
- **Class 2:** Load in the middle. Examples: wheelbarrow, nutcracker. Always provides MA > 1, the effort arm is always longer.
- **Class 3:** Effort in the middle. Examples: tweezers, fishing rod, forearm. Always MA < 1, you apply more force than you get, but the load end moves faster and farther.

The ASVAB focuses on Class 1 and Class 2 because they produce useful mechanical advantage.

## Lever calculation: the fulcrum trick

The law of the lever: Effort × effort arm = Load × load arm.

If you're solving for effort: Effort = (Load × load arm) ÷ effort arm.

The effort arm is always measured from the fulcrum to the point of applied force. This is a common trap, on a 6-foot lever with the fulcrum 1 foot from the load, the effort arm is 5 feet, not 6.

## Fixed vs. movable pulleys

A **fixed pulley** is anchored to the ceiling or a beam. It does nothing for force, you pull just as hard as you would without it. What it gives you is direction: you can pull down instead of up, which lets you use your body weight.

A **movable pulley** hangs from the load itself. One end of the rope is fixed; you pull the other. Two rope segments support the load, so MA = 2. Every additional movable pulley in a block-and-tackle adds two more rope segments and increases MA by 2.

## The work conservation rule

Higher MA = more rope to pull. If a system gives you MA = 4, you pull 4 feet of rope for every 1 foot the load rises. Total work (force × distance) stays the same, you're just redistributing it.
