---
topic_id: ar.rate-distance-time
diagrams:
  - type: ohms-law-triangle
    after: "D = R × T: know all three forms"
    props:
      top: "D"
      bottomLeft: "R"
      bottomRight: "T"
      units: { top: "mi", bottomLeft: "mph", bottomRight: "hr" }
      label: "Distance = Rate × Time"
subtest: AR
title: Rate, Distance & Time
summary: One formula, D = R × T, handles every rate, distance, and time question on the ASVAB if you know which variable to isolate.
formula_reference:
  - "Core formula: Distance = Rate × Time (D = R × T)"
  - "Solve for rate: R = D ÷ T"
  - "Solve for time: T = D ÷ R"
  - "Average speed (round trip): total distance ÷ total time (NOT average of the two speeds)"
  - "Combined rate (workers or pipes): combined rate = rate₁ + rate₂"
  - "Work formula: Time to complete job = 1 ÷ combined rate"
pitfalls:
  - "Averaging the two speeds on a round trip instead of using total distance ÷ total time"
  - "Mixing units, if speed is in mph and time is in minutes, convert minutes to hours first"
  - "Setting up D = R × T correctly but solving for the wrong variable"
  - "Forgetting that rate problems and work-rate problems use the same D = R × T structure"
worked_examples:
  - prompt: "A convoy drives 240 miles in 4 hours. What is its average speed?"
    solution: "R = D ÷ T = 240 ÷ 4 = 60 mph"
  - prompt: "At 45 mph, how long does it take to travel 135 miles?"
    solution: "T = D ÷ R = 135 ÷ 45 = 3 hours"
  - prompt: "A soldier runs to a checkpoint at 6 mph and returns at 4 mph. The total round trip is 12 miles. What is the average speed for the whole trip?"
    solution: "Total distance = 12 miles. Time going: 6 ÷ 6 = 1 hour. Time returning: 6 ÷ 4 = 1.5 hours. Total time = 2.5 hours. Average speed = 12 ÷ 2.5 = 4.8 mph"
  - prompt: "Worker A builds a section in 6 hours. Worker B does the same job in 3 hours. Working together, how long does it take?"
    solution: "A's rate = 1/6 job/hr. B's rate = 1/3 job/hr. Combined = 1/6 + 2/6 = 3/6 = 1/2 job/hr. Time = 1 ÷ (1/2) = 2 hours"
---

## What the ASVAB is actually testing

Rate, distance, and time questions always give you two of the three variables and ask you to find the third. The test frames them as vehicle speeds, running pace, or work rates, but the underlying formula is the same every time: **Distance = Rate × Time**.

The reason recruits miss these isn't the formula, it's unit mismatch or the round-trip average speed trap.

## D = R × T: know all three forms

Cover the variable you're solving for with your thumb and the remaining two show you the operation:

- Cover D → multiply R × T
- Cover R → divide D by T
- Cover T → divide D by R

That's it. The formula never changes. Only the variable you're solving for changes.

## The round-trip trap

This is the most commonly missed rate question on the ASVAB. If you travel the same distance at two different speeds, your average speed is **not** the average of the two speeds.

The right approach: find the actual total time for each leg, add them, then divide total distance by total time. See worked example 3. The shortcut answer of `(6 + 4) ÷ 2 = 5 mph` is wrong.

## Work-rate problems: same formula, different framing

"How long does it take two people working together?" These use the rate formula too, but "rate" means fraction of the job completed per hour. Add the individual rates to get the combined rate, then flip it to get total time.

Worker A at 1/6 job/hr + Worker B at 1/3 job/hr = 1/2 job/hr combined → 2 hours total.

## Unit consistency

If speed is given in miles per hour but time is given in minutes, convert before plugging in. 30 minutes = 0.5 hours. Missing this step leads to off-by-factor-of-60 errors that will show up as a plausible-looking wrong answer choice.
