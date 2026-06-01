---
topic_id: ar.averages
subtest: AR
title: Averages & Mean
summary: An average is just a total spread evenly, sum ÷ count, and most ASVAB average questions are really asking you to work backward from that one relationship to find a missing value or a target.
formula_reference:
  - "Arithmetic mean: average = sum of values ÷ number of values"
  - "Find the sum from the average: sum = average × number of values"
  - "Missing value to hit a target: needed value = (target average × count) − (sum so far)"
  - "Weighted average: total of (value × weight) ÷ total weight"
  - "Average speed (equal distances): total distance ÷ total time, NOT the average of the two speeds"
  - "Median: the middle value when the numbers are listed in order (average the two middle values if the count is even)"
pitfalls:
  - "Averaging the averages, two groups of different sizes need a weighted average, not a simple mean of the two means"
  - "Averaging two speeds directly instead of using total distance ÷ total time"
  - "Forgetting to multiply the target average by the new count when solving for a missing score"
  - "Confusing median (middle position) with mean (sum ÷ count); they are equal only for symmetric data"
  - "Dividing by the wrong count after adding a new value (the count goes up by one)"
worked_examples:
  - prompt: "A soldier scores 88, 92, and 78 on three PT tests. What is the average score?"
    solution: "Sum = 88 + 92 + 78 = 258. Count = 3. Average = 258 ÷ 3 = 86"
  - prompt: "A recruit has scores of 80, 75, and 85 on three tests. What must the recruit score on a fourth test to average 82?"
    solution: "Target sum = 82 × 4 = 328. Sum so far = 80 + 75 + 85 = 240. Needed = 328 − 240 = 88"
  - prompt: "A class has 10 students averaging 70 and 20 students averaging 85. What is the average for all 30 students?"
    solution: "Weighted total = (10 × 70) + (20 × 85) = 700 + 1,700 = 2,400. Total students = 30. Average = 2,400 ÷ 30 = 80"
  - prompt: "A truck drives 60 miles out at 30 mph and the same 60 miles back at 60 mph. What is the average speed for the round trip?"
    solution: "Time out = 60 ÷ 30 = 2 hours. Time back = 60 ÷ 60 = 1 hour. Total distance = 120 miles, total time = 3 hours. Average speed = 120 ÷ 3 = 40 mph"
---

## What the ASVAB is actually testing

Average questions check whether you understand that an average is a total shared equally across a group. The simplest version gives you the numbers and asks for the mean. The harder versions hide one piece: they give you the average and the count and make you find the sum, or they give you several scores and a goal and make you find the one score still missing.

The computation is easy. The mistakes come from running the relationship backward incorrectly or from treating unequal groups as if they were equal.

## The core relationship and its three forms

There is really one equation:

**average = sum ÷ count**

Rearrange it depending on what is missing:

- Find the average → divide the sum by the count
- Find the sum → multiply the average by the count
- Find a missing value → multiply the target average by the count to get the sum you need, then subtract the values you already have

That last form is the single most tested average skill on the AR section. See worked example 2: to average 82 over 4 tests you need a total of 328 points, you already have 240, so the fourth score must be 88.

## Weighted averages: when group sizes differ

If two groups have different sizes, you cannot average their averages. A group of 10 students averaging 70 and a group of 20 averaging 85 do not combine to 77.5. The larger group pulls the result toward its own average.

Multiply each average by its group size, add those products, then divide by the total number of people. In worked example 3, that gives 80, not 77.5. Any time the problem mentions different counts, reach for the weighted method.

## Average speed: the trap that looks like a simple average

Average speed for a trip is total distance ÷ total time. It is not the average of the two speeds, because you spend more time at the slower speed, so the slow leg counts more.

When the distances of the two legs are equal, the honest answer always lands below the simple midpoint. In worked example 4, equal 60-mile legs at 30 and 60 mph give 40 mph, not 45 mph. The slow leg takes twice as long, so it weighs twice as much. Find the time for each leg, add the times, then divide total distance by total time.

## Mean vs. median

The mean is the sum divided by the count. The median is the middle number after you line the values up in order. With an odd count, the median is the single middle value. With an even count, average the two middle values.

For evenly spread or symmetric data the mean and median match. When one value is far larger or smaller than the rest, the mean shifts toward it while the median stays put. The ASVAB rarely goes deep here, but it may ask you to identify the middle value, so always sort the list first.

## Connection to other topics

Averages lean on the same arithmetic as the fundamentals topic and overlap with rate-distance-time whenever average speed appears. The weighted-average method is the same idea behind ratio and percent mixture problems, so the skill carries across the AR section.
