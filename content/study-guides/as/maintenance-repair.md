---
topic_id: as.maintenance-repair
diagrams:
  - type: disc-brake
    after: "Brake service"
    props:
      label: "Disc brake"
subtest: AS
title: Maintenance & Repair Practices
summary: Routine maintenance is about intervals and sequences, know when to do it and in what order, and you'll answer these questions faster than anyone who's guessing.
formula_reference:
  - "Oil change interval: typically 3,000 mi (conventional) or 5,000–10,000 mi (synthetic), check dipstick for level and color"
  - "Brake fluid: hygroscopic (absorbs water over time), lowering boiling point, flush every 2 years or per spec"
  - "Belt tension check: serpentine belt should deflect no more than 1/2 inch under moderate thumb pressure"
  - "Tire rotation pattern: front-to-rear same side (directional), or cross-rotation for non-directional tires"
  - "Battery load test: a fully charged 12V battery reads 12.6V at rest; below 12.0V indicates a weak or discharged cell"
  - "Torque sequence: tighten multi-bolt assemblies (cylinder heads, wheels) in a star/criss-cross pattern to even clamping load"
pitfalls:
  - "Adding oil above the max mark on the dipstick, overfill causes foaming and seal damage"
  - "Reusing crush washers or drain plug gaskets, they compress on first install and won't seal properly a second time"
  - "Tightening lug nuts in a circle rather than a star pattern, uneven clamping can warp brake rotors"
  - "Bleeding brakes starting at the wrong wheel, always start farthest from the master cylinder (typically right rear)"
  - "Jumping a battery with reversed polarity, positive to negative blows fuses and can destroy the alternator and ECU"
  - "Diagnosing milky gray oil as just old oil and fixing it with an oil change, the milky look means coolant is mixing with the oil (often a blown head gasket), which must be repaired first"
  - "Ignoring a brake squeal because the brakes still stop the car, the wear-indicator squeal is an early warning; waiting until grinding starts means the rotors are already being damaged"
worked_examples:
  - prompt: "A mechanic pulls the engine oil dipstick and sees the level is correct but the oil looks milky gray. What does this indicate?"
    solution: "Coolant contamination, the milky appearance comes from water or antifreeze mixing with oil. The most common cause is a blown head gasket. The repair is not an oil change, it's diagnosing and fixing the gasket failure first, then flushing the engine."
  - prompt: "After replacing all four brake pads on a car, the technician needs to bleed the brake lines to remove air. In what order should the calipers be bled?"
    solution: "Start at the caliper farthest from the master cylinder (right rear on most vehicles), then left rear, right front, left front. This pushes any air toward and out of each bleeder screw in sequence without trapping bubbles in shorter lines."
  - prompt: "A wheel with five lug nuts is being reinstalled. The first nut is tightened to 20 ft-lb. Describe the correct sequence for the remaining four."
    solution: "Tighten in a star (pentagonal) pattern, skip to the nut directly across from the first, then continue working across rather than around. This distributes clamping load evenly and prevents the rotor or drum from being pulled out of plane, which causes vibration and rotor warp."
  - prompt: "A driver finds a puddle of bright green fluid under the front of the car. Which system is leaking?"
    solution: "The cooling system. Green (or orange) fluid is engine coolant/antifreeze. Brown or amber points to engine oil, and bright red usually means automatic transmission fluid or power-steering fluid. Color is the fastest first clue to which system is losing fluid."
  - prompt: "A car makes a high-pitched squeal that appears only while braking and disappears once the pedal is released. What does this most likely indicate?"
    solution: "Worn brake pads. Many pads have a built-in metal wear indicator that scrapes the rotor and squeals when the friction material gets low, signaling it is time to replace the pads before the backing damages the rotor."
  - prompt: "A mechanic is choosing a welding process to join thin automotive sheet metal cleanly with good control. Which process is best suited?"
    solution: "MIG (or TIG) welding. MIG is fast and clean and handles thin sheet metal well; TIG offers even finer control for precision work. Stick (arc) welding is better for thick, heavy steel in structural work but tends to burn through thin sheet."
---

## What the ASVAB is testing

Maintenance and repair questions test procedural knowledge, do you know the right way to do a job, the right order to do it in, and how to recognize when something went wrong? The test won't ask you to perform a repair; it asks whether you understand the principles behind proper shop practice.

## Oil and fluid service

Engine oil lubricates, cools, and cleans. Check level with the dipstick, the oil should be between the MIN and MAX marks. The color tells you more than the level: fresh oil is amber, old oil turns dark brown or black. Milky or gray oil means coolant contamination. A metal-flecked oil means internal wear that needs immediate diagnosis.

When draining oil, replace the drain plug gasket and check that the old oil filter gasket came off with the old filter. A double-stacked filter gasket is a common cause of oil leaks after a DIY oil change.

## Brake service

Brake fluid absorbs moisture over time, which lowers its boiling point. Wet brake fluid can boil under heavy braking (fade). Most manufacturers spec a fluid flush every two years regardless of appearance.

When bleeding brakes, sequence matters. Start at the wheel farthest from the master cylinder so you're pushing fluid and any trapped air through the entire circuit before moving to shorter runs.

## Torque and fastener fundamentals

Fasteners have torque specs for a reason, under-torqued bolts back out, over-torqued bolts stretch or snap. Use a torque wrench for anything structural: cylinder head bolts, wheel lug nuts, axle nuts.

For multi-bolt assemblies, the tightening pattern is as important as the torque value. Always work in a star or criss-cross pattern to distribute load evenly. This matters for cylinder heads (prevents warping), wheels (prevents rotor warp), and flanged gaskets.

## Battery and jump-starting

Correct jump-start sequence: red to dead → red to good → black to good → black to unpainted metal on the dead vehicle (not the dead battery, this avoids sparks near hydrogen gas). Reverse the sequence to disconnect. Reversed polarity on jump-starting can fry the ECU and alternator in seconds.
