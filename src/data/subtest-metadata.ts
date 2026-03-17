import type { AsvabSubtest } from "@/types";

export interface SubtestMeta {
  subtest: AsvabSubtest;
  fullName: string;
  questionCount: number; // on the real CAT-ASVAB
  timeMinutes: number; // on the real CAT-ASVAB
  isAFQT: boolean;
  veDoubled: boolean; // WK and PC get doubled via VE
  description: string;
  topicSummary: string;
  sampleTopics: string[];
}

export const SUBTEST_METADATA: SubtestMeta[] = [
  {
    subtest: "GS",
    fullName: "General Science",
    questionCount: 15,
    timeMinutes: 10,
    isAFQT: false,
    veDoubled: false,
    description:
      "Tests knowledge of physical, biological, and earth sciences. Covers topics you'd see in high school science classes.",
    topicSummary: "Biology, chemistry, physics, earth science, ecology",
    sampleTopics: [
      "Human body systems",
      "Cell biology & genetics",
      "Chemistry basics (elements, compounds, reactions)",
      "Physics fundamentals (force, energy, waves)",
      "Earth science (weather, geology, astronomy)",
      "Ecology & ecosystems",
      "Scientific method & measurement",
    ],
  },
  {
    subtest: "AR",
    fullName: "Arithmetic Reasoning",
    questionCount: 15,
    timeMinutes: 39,
    isAFQT: true,
    veDoubled: false,
    description:
      "Word problems that test your ability to solve real-world math situations. One of the 4 AFQT subtests — directly affects your enlistment eligibility.",
    topicSummary: "Word problems: rates, percentages, ratios, basic algebra",
    sampleTopics: [
      "Rate, time & distance problems",
      "Percentage calculations",
      "Ratio & proportion",
      "Basic algebra word problems",
      "Number sequences & patterns",
      "Work rate problems",
      "Profit, loss & discount",
      "Geometry word problems",
      "Consecutive integer problems",
      "Mixed operations",
    ],
  },
  {
    subtest: "WK",
    fullName: "Word Knowledge",
    questionCount: 15,
    timeMinutes: 9,
    isAFQT: true,
    veDoubled: true,
    description:
      "Vocabulary test — pick the word closest in meaning. Part of the Verbal Expression (VE) score which is DOUBLED in the AFQT formula, making it extremely high-impact.",
    topicSummary: "Vocabulary, synonyms, word meanings in context",
    sampleTopics: [
      "Common prefixes & suffixes",
      "Context clue strategies",
      "Synonyms & antonyms",
      "Latin & Greek word roots",
      "Academic vocabulary",
      "Technical & military terms",
      "Figurative language",
      "Multiple-meaning words",
    ],
  },
  {
    subtest: "PC",
    fullName: "Paragraph Comprehension",
    questionCount: 10,
    timeMinutes: 22,
    isAFQT: true,
    veDoubled: true,
    description:
      "Reading passages followed by questions about main ideas, details, and inferences. Also part of VE — DOUBLED in AFQT formula.",
    topicSummary: "Reading comprehension: main idea, details, inference",
    sampleTopics: [
      "Finding the main idea",
      "Identifying supporting details",
      "Making inferences",
      "Author's purpose & tone",
      "Vocabulary in context",
      "Drawing conclusions",
      "Sequence of events",
    ],
  },
  {
    subtest: "MK",
    fullName: "Mathematics Knowledge",
    questionCount: 15,
    timeMinutes: 23,
    isAFQT: true,
    veDoubled: false,
    description:
      "Pure math — algebra, geometry, and number theory. One of the 4 AFQT subtests. Unlike AR, these are straight math problems, not word problems.",
    topicSummary: "Algebra, geometry, fractions, exponents, equations",
    sampleTopics: [
      "Fractions, decimals & percentages",
      "Exponents & square roots",
      "Geometry (area, perimeter, volume)",
      "Basic algebra & solving equations",
      "Inequalities",
      "Order of operations",
      "Ratios & proportions",
      "Scientific notation",
      "Probability basics",
      "Coordinate geometry",
    ],
  },
  {
    subtest: "EI",
    fullName: "Electronics Information",
    questionCount: 15,
    timeMinutes: 10,
    isAFQT: false,
    veDoubled: false,
    description:
      "Covers electrical circuits, components, and systems. Critical for electronics, IT, and technical military jobs across all branches.",
    topicSummary: "Circuits, Ohm's law, components, electrical safety",
    sampleTopics: [
      "Ohm's law (V = IR)",
      "Series & parallel circuits",
      "Electrical components (resistors, capacitors, diodes)",
      "AC vs DC current",
      "Electrical safety & grounding",
      "Basic digital electronics",
      "Wiring & schematics",
      "Power calculations (watts)",
      "Magnetism & electromagnetism",
    ],
  },
  {
    subtest: "AS",
    fullName: "Auto & Shop Information",
    questionCount: 10,
    timeMinutes: 7,
    isAFQT: false,
    veDoubled: false,
    description:
      "Tests knowledge of automotive systems, tools, and workshop practices. Important for mechanical and maintenance military jobs.",
    topicSummary: "Automotive systems, hand tools, power tools, shop safety",
    sampleTopics: [
      "Engine systems (cooling, ignition, fuel)",
      "Brake & suspension systems",
      "Hand tools identification & use",
      "Power tools & machinery",
      "Fasteners (bolts, screws, rivets)",
      "Measuring tools & techniques",
      "Welding & soldering basics",
      "Shop safety practices",
      "Automotive electrical systems",
    ],
  },
  {
    subtest: "MC",
    fullName: "Mechanical Comprehension",
    questionCount: 15,
    timeMinutes: 20,
    isAFQT: false,
    veDoubled: false,
    description:
      "Tests understanding of physical principles and simple machines. Think levers, pulleys, gears, and basic physics applied to real situations.",
    topicSummary: "Simple machines, force, motion, pressure, mechanical advantage",
    sampleTopics: [
      "Levers & fulcrums",
      "Pulleys & mechanical advantage",
      "Gears & gear ratios",
      "Force, work & energy",
      "Pressure & hydraulics",
      "Properties of materials",
      "Structural support & load distribution",
      "Fluid dynamics basics",
      "Thermodynamics basics",
    ],
  },
  {
    subtest: "AO",
    fullName: "Assembling Objects",
    questionCount: 15,
    timeMinutes: 15,
    isAFQT: false,
    veDoubled: false,
    description:
      "Spatial reasoning — mentally assemble puzzle pieces or follow connection points. Tests your ability to visualize how parts fit together.",
    topicSummary: "Spatial reasoning, puzzle assembly, connection points",
    sampleTopics: [
      "Puzzle assembly (matching shapes)",
      "Connection point problems",
      "Spatial rotation & orientation",
      "Pattern recognition",
      "Shape matching & manipulation",
      "Mirror images & reflections",
      "2D to 3D visualization",
    ],
  },
];

/** Map from composite name to contributing subtests (for all branches) */
export const COMPOSITE_FORMULAS: Record<string, AsvabSubtest[]> = {
  // Army
  GT: ["AR", "WK", "PC"],
  CL: ["WK", "PC", "AR", "MK"],
  CO: ["AR", "AS", "MC"],
  EL: ["GS", "AR", "MK", "EI"],
  FA: ["AR", "MK", "MC"],
  GM: ["GS", "MC", "AS"],
  MM_army: ["AS", "MC", "EI"],
  OF: ["WK", "PC", "AR", "MC"],
  SC: ["WK", "PC", "AR", "MK", "EI"],
  ST: ["GS", "WK", "PC", "AR", "MK"],
  // Air Force / Space Force (MAGE)
  M: ["MC", "AS", "GS"],
  A: ["WK", "PC", "MK"],
  G: ["AR", "WK", "PC"],
  E: ["GS", "AR", "MK", "EI"],
  // Marines
  MM_marines: ["AR", "MC", "AS", "EI"],
  GT_marines: ["AR", "WK", "PC"],
  EL_marines: ["GS", "AR", "MK", "EI"],
};
