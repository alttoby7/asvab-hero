import type { AsvabSubtest } from "@/types";

export interface StudyTopic {
  id: string;
  subtest: AsvabSubtest;
  title: string;
  description: string;
}

export const STUDY_TOPICS: StudyTopic[] = [
  // General Science (GS) — 10 topics
  { id: "gs-1", subtest: "GS", title: "Human Body Systems", description: "Circulatory, respiratory, digestive, nervous, and musculoskeletal systems" },
  { id: "gs-2", subtest: "GS", title: "Cell Biology & Genetics", description: "Cell structure, mitosis/meiosis, DNA, heredity, and mutations" },
  { id: "gs-3", subtest: "GS", title: "Chemistry Basics", description: "Elements, periodic table, compounds, chemical reactions, and bonds" },
  { id: "gs-4", subtest: "GS", title: "Physics Fundamentals", description: "Force, motion, energy, waves, and Newton's laws" },
  { id: "gs-5", subtest: "GS", title: "Earth Science & Geology", description: "Rock types, plate tectonics, earthquakes, volcanoes, and minerals" },
  { id: "gs-6", subtest: "GS", title: "Weather & Atmosphere", description: "Cloud types, fronts, pressure systems, and climate" },
  { id: "gs-7", subtest: "GS", title: "Ecology & Ecosystems", description: "Food chains, biomes, energy flow, and environmental science" },
  { id: "gs-8", subtest: "GS", title: "Astronomy Basics", description: "Solar system, stars, planets, and space" },
  { id: "gs-9", subtest: "GS", title: "Scientific Method", description: "Hypothesis, variables, controls, and experimental design" },
  { id: "gs-10", subtest: "GS", title: "Nutrition & Health", description: "Vitamins, minerals, macronutrients, and disease prevention" },

  // Arithmetic Reasoning (AR) — 10 topics
  { id: "ar-1", subtest: "AR", title: "Rate, Time & Distance", description: "Speed calculations, travel time, and distance problems" },
  { id: "ar-2", subtest: "AR", title: "Percentage Problems", description: "Finding percentages, percent increase/decrease, and discounts" },
  { id: "ar-3", subtest: "AR", title: "Ratio & Proportion", description: "Setting up and solving ratio and proportion problems" },
  { id: "ar-4", subtest: "AR", title: "Basic Algebra Word Problems", description: "Translating word problems into equations and solving" },
  { id: "ar-5", subtest: "AR", title: "Number Sequences", description: "Identifying patterns and finding missing numbers in sequences" },
  { id: "ar-6", subtest: "AR", title: "Work Rate Problems", description: "Combined work rates, time to complete tasks together" },
  { id: "ar-7", subtest: "AR", title: "Profit, Loss & Discount", description: "Cost, selling price, markup, and markdown calculations" },
  { id: "ar-8", subtest: "AR", title: "Geometry Word Problems", description: "Area, perimeter, and volume in real-world contexts" },
  { id: "ar-9", subtest: "AR", title: "Consecutive Integers", description: "Problems involving consecutive, even, or odd integers" },
  { id: "ar-10", subtest: "AR", title: "Mixed Operations", description: "Multi-step problems combining addition, subtraction, multiplication, and division" },

  // Word Knowledge (WK) — 8 topics
  { id: "wk-1", subtest: "WK", title: "Common Prefixes & Suffixes", description: "un-, re-, pre-, -tion, -ous, -able and how they change meaning" },
  { id: "wk-2", subtest: "WK", title: "Context Clue Strategies", description: "Using surrounding words to figure out unfamiliar vocabulary" },
  { id: "wk-3", subtest: "WK", title: "Synonyms Practice", description: "Matching words with their closest meaning — the core WK skill" },
  { id: "wk-4", subtest: "WK", title: "Antonyms & Opposites", description: "Recognizing opposite meanings to eliminate wrong answers" },
  { id: "wk-5", subtest: "WK", title: "Latin & Greek Roots", description: "Root words like bene-, mal-, bio-, graph- that unlock hundreds of words" },
  { id: "wk-6", subtest: "WK", title: "Academic Vocabulary", description: "Common SAT/ASVAB-level words you'll see on the test" },
  { id: "wk-7", subtest: "WK", title: "Technical & Military Terms", description: "Vocabulary commonly used in military and professional contexts" },
  { id: "wk-8", subtest: "WK", title: "Multiple-Meaning Words", description: "Words with different meanings depending on context" },

  // Paragraph Comprehension (PC) — 7 topics
  { id: "pc-1", subtest: "PC", title: "Finding the Main Idea", description: "Identifying the central point or theme of a passage" },
  { id: "pc-2", subtest: "PC", title: "Supporting Details", description: "Locating specific facts and details within a passage" },
  { id: "pc-3", subtest: "PC", title: "Making Inferences", description: "Drawing conclusions from information that's implied, not stated" },
  { id: "pc-4", subtest: "PC", title: "Author's Purpose & Tone", description: "Understanding why the author wrote the passage and their attitude" },
  { id: "pc-5", subtest: "PC", title: "Vocabulary in Context", description: "Determining word meaning from the surrounding passage" },
  { id: "pc-6", subtest: "PC", title: "Drawing Conclusions", description: "Using evidence from the passage to reach logical conclusions" },
  { id: "pc-7", subtest: "PC", title: "Sequence & Structure", description: "Understanding the order of events and how a passage is organized" },

  // Mathematics Knowledge (MK) — 10 topics
  { id: "mk-1", subtest: "MK", title: "Fractions, Decimals & Percentages", description: "Converting between formats, operations with fractions" },
  { id: "mk-2", subtest: "MK", title: "Exponents & Square Roots", description: "Rules of exponents, simplifying radicals, and powers" },
  { id: "mk-3", subtest: "MK", title: "Geometry: Area & Volume", description: "Formulas for triangles, circles, rectangles, cylinders, and spheres" },
  { id: "mk-4", subtest: "MK", title: "Solving Equations", description: "One-step and two-step linear equations, isolating variables" },
  { id: "mk-5", subtest: "MK", title: "Inequalities", description: "Solving and graphing linear inequalities" },
  { id: "mk-6", subtest: "MK", title: "Order of Operations", description: "PEMDAS — parentheses, exponents, multiply/divide, add/subtract" },
  { id: "mk-7", subtest: "MK", title: "Ratios & Proportions", description: "Cross multiplication and proportional reasoning" },
  { id: "mk-8", subtest: "MK", title: "Scientific Notation", description: "Converting to/from scientific notation and performing operations" },
  { id: "mk-9", subtest: "MK", title: "Probability Basics", description: "Simple probability, combinations, and expected outcomes" },
  { id: "mk-10", subtest: "MK", title: "Coordinate Geometry", description: "Plotting points, slope, distance formula, and midpoints" },

  // Electronics Information (EI) — 9 topics
  { id: "ei-1", subtest: "EI", title: "Ohm's Law (V = IR)", description: "Calculating voltage, current, and resistance in circuits" },
  { id: "ei-2", subtest: "EI", title: "Series & Parallel Circuits", description: "How components are wired and how it affects current and voltage" },
  { id: "ei-3", subtest: "EI", title: "Electrical Components", description: "Resistors, capacitors, diodes, transistors, and their symbols" },
  { id: "ei-4", subtest: "EI", title: "AC vs DC Current", description: "Alternating vs direct current, frequency, and transformers" },
  { id: "ei-5", subtest: "EI", title: "Electrical Safety", description: "Grounding, fuses, circuit breakers, and safe practices" },
  { id: "ei-6", subtest: "EI", title: "Digital Electronics", description: "Logic gates (AND, OR, NOT), binary, and basic digital concepts" },
  { id: "ei-7", subtest: "EI", title: "Wiring & Schematics", description: "Reading circuit diagrams and understanding wire types" },
  { id: "ei-8", subtest: "EI", title: "Power Calculations", description: "Watts, kilowatt-hours, and electrical energy consumption" },
  { id: "ei-9", subtest: "EI", title: "Magnetism & Electromagnetism", description: "Magnetic fields, electromagnets, and motors/generators" },

  // Auto & Shop Information (AS) — 9 topics
  { id: "as-1", subtest: "AS", title: "Engine Systems", description: "4-stroke cycle, cooling, ignition, fuel injection, and exhaust" },
  { id: "as-2", subtest: "AS", title: "Brake & Suspension", description: "Disc/drum brakes, ABS, shocks, struts, and alignment" },
  { id: "as-3", subtest: "AS", title: "Hand Tools", description: "Wrenches, pliers, screwdrivers, hammers — identification and proper use" },
  { id: "as-4", subtest: "AS", title: "Power Tools & Machinery", description: "Drills, saws, grinders, lathes, and safe operation" },
  { id: "as-5", subtest: "AS", title: "Fasteners & Hardware", description: "Bolts, screws, nuts, rivets, and thread types" },
  { id: "as-6", subtest: "AS", title: "Measuring Tools", description: "Tape measures, calipers, micrometers, and levels" },
  { id: "as-7", subtest: "AS", title: "Welding & Soldering", description: "Types of welding (MIG, TIG, stick), soldering basics" },
  { id: "as-8", subtest: "AS", title: "Shop Safety", description: "PPE, ventilation, fire safety, and hazardous materials" },
  { id: "as-9", subtest: "AS", title: "Automotive Electrical", description: "Battery, alternator, starter, and electrical troubleshooting" },

  // Mechanical Comprehension (MC) — 9 topics
  { id: "mc-1", subtest: "MC", title: "Levers & Fulcrums", description: "Three classes of levers, mechanical advantage, and balance" },
  { id: "mc-2", subtest: "MC", title: "Pulleys & Mechanical Advantage", description: "Fixed, movable, and compound pulley systems" },
  { id: "mc-3", subtest: "MC", title: "Gears & Gear Ratios", description: "How gears mesh, speed vs torque, and gear trains" },
  { id: "mc-4", subtest: "MC", title: "Force, Work & Energy", description: "F=ma, work = force × distance, kinetic and potential energy" },
  { id: "mc-5", subtest: "MC", title: "Pressure & Hydraulics", description: "Pascal's law, hydraulic systems, and fluid pressure" },
  { id: "mc-6", subtest: "MC", title: "Properties of Materials", description: "Strength, elasticity, hardness, conductivity, and material selection" },
  { id: "mc-7", subtest: "MC", title: "Structural Support", description: "Load distribution, beams, trusses, and center of gravity" },
  { id: "mc-8", subtest: "MC", title: "Fluid Dynamics", description: "Bernoulli's principle, flow rate, and viscosity" },
  { id: "mc-9", subtest: "MC", title: "Thermodynamics Basics", description: "Heat transfer (conduction, convection, radiation) and thermal expansion" },

  // Assembling Objects (AO) — 7 topics
  { id: "ao-1", subtest: "AO", title: "Puzzle Assembly", description: "Matching broken shapes to complete the original figure" },
  { id: "ao-2", subtest: "AO", title: "Connection Points", description: "Following labeled points (A, B) to connect shapes correctly" },
  { id: "ao-3", subtest: "AO", title: "Spatial Rotation", description: "Mentally rotating shapes to see if they match" },
  { id: "ao-4", subtest: "AO", title: "Pattern Recognition", description: "Identifying repeating patterns and predicting the next shape" },
  { id: "ao-5", subtest: "AO", title: "Shape Matching", description: "Comparing shapes for size, orientation, and congruence" },
  { id: "ao-6", subtest: "AO", title: "Mirror Images", description: "Identifying reflections and symmetry in figures" },
  { id: "ao-7", subtest: "AO", title: "2D to 3D Visualization", description: "Imagining how flat patterns fold into 3D objects" },
];

export function getTopicsForSubtest(subtest: AsvabSubtest): StudyTopic[] {
  return STUDY_TOPICS.filter((t) => t.subtest === subtest);
}
