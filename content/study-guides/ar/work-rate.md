---
topic_id: ar.work-rate
subtest: AR
title: Work & Rate Problems
summary: Work problems are rate problems in disguise, every worker, pump, or machine has a rate of "fraction of the job per unit of time," and you add those rates to find how fast they finish together.
formula_reference:
  - "Single worker rate: rate = 1 job ÷ time to finish alone (a worker who finishes in 5 hours has a rate of 1/5 job per hour)"
  - "Combined work rate: 1/a + 1/b = 1/t, where a and b are the solo times and t is the time together"
  - "Time together (two workers): t = (a × b) ÷ (a + b)"
  - "Fill and drain: net rate = fill rate − drain rate, then time = 1 ÷ net rate"
  - "Output rate: total output = rate × time (parts per hour × hours = parts)"
  - "Pay rate: pay = rate × time (dollars per hour × hours = dollars)"
pitfalls:
  - "Adding the times instead of adding the rates (two 6-hour workers finish in 3 hours together, not 12)"
  - "Forgetting to flip the combined rate back into a time at the end"
  - "Averaging the two solo times, the combined time is always less than the faster worker's solo time"
  - "On fill-and-drain problems, adding the drain rate instead of subtracting it"
  - "Mixing units, if one rate is per hour and one is per minute, convert before adding"
worked_examples:
  - prompt: "A soldier can stack a pallet of supplies in 4 hours. What fraction of the pallet does the soldier stack in 1 hour?"
    solution: "Rate = 1 job ÷ 4 hours = 1/4 of the pallet per hour"
  - prompt: "Worker A paints a wall in 6 hours and Worker B paints it in 3 hours. Working together, how long does it take?"
    solution: "Combined rate = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2 job per hour. Time = 1 ÷ (1/2) = 2 hours"
  - prompt: "A pipe fills a tank in 8 hours. A drain empties it in 12 hours. With both open, how long to fill the empty tank?"
    solution: "Net rate = 1/8 − 1/12 = 3/24 − 2/24 = 1/24 of the tank per hour. Time = 1 ÷ (1/24) = 24 hours"
  - prompt: "A machine produces 150 rounds per hour. How long does it take to produce 1,200 rounds?"
    solution: "Time = total ÷ rate = 1,200 ÷ 150 = 8 hours"
---

## What the ASVAB is actually testing

Work and rate problems test whether you can turn a finishing time into a rate, combine rates, and turn the answer back into a time. The classic version gives two people who each finish a job alone and asks how long they take together. The trap is obvious once you see it: the answer must be faster than either one working alone, so anyone who adds the times has clearly made an error.

The same structure shows up as pipes filling tanks, machines making parts, and workers earning pay. Learn the one method and all of these become the same problem.

## Turn a finishing time into a rate

If a worker finishes a whole job in 5 hours, then in one hour the worker finishes 1/5 of the job. That fraction, **1 ÷ time**, is the rate. A faster worker has a larger fraction per hour.

This single move is what makes work problems solvable. You cannot add finishing times in any meaningful way, but you can always add rates, because rates measure how much gets done per hour and those amounts genuinely stack.

## Combined work rate: 1/a + 1/b = 1/t

When two workers team up, add their solo rates to get the combined rate, then flip it to get the time:

1/a + 1/b = 1/t

In worked example 2, Worker A at 1/6 and Worker B at 1/3 combine to 1/2 of the job per hour, so together they finish in 2 hours. Notice 2 hours is less than either 6 or 3, which is the sanity check: teaming up is always faster than the fastest worker alone.

For exactly two workers you can also use the shortcut t = (a × b) ÷ (a + b). With a = 6 and b = 3 that gives (6 × 3) ÷ (6 + 3) = 18 ÷ 9 = 2 hours, the same answer.

## Fill and drain: subtract the opposing rate

A pipe fills, a drain empties. They work against each other, so the net rate is the fill rate minus the drain rate. In worked example 3, the fill rate 1/8 minus the drain rate 1/12 leaves a net of 1/24 of the tank per hour, so filling takes 24 hours.

The tell is that the tank still fills, just slowly, because the fill pipe is stronger than the drain. If the drain were faster, the net rate would be negative and the tank would never fill. Always subtract the drain, never add it.

## Output and pay rates: the plain multiplication form

Not every rate problem involves teamwork. Some just give a steady rate and ask for the total, or give a total and ask for the time. These are the same rate × time = total relationship from rate-distance-time:

- Parts: rate (parts per hour) × time (hours) = total parts
- Pay: rate (dollars per hour) × time (hours) = total pay

In worked example 4, 1,200 rounds at 150 rounds per hour takes 1,200 ÷ 150 = 8 hours. Solve for whichever of the three quantities is missing.

## Connection to other topics

Work-rate problems share the rate × time = amount backbone with rate-distance-time, and the combined-rate setup uses the fraction skills from the fractions topic. Pay and output versions overlap with multi-step word problems, where a rate calculation is often just one step in a longer chain.
