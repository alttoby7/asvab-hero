import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "10 ASVAB General Science Tips to Boost Your Scores | ASVAB Hero",
  description:
    "Master the ASVAB General Science subtest with these 10 tips covering body systems, earth science, physics, chemistry, mnemonics, and a 4-week study plan.",
  alternates: {
    canonical: "https://asvabhero.com/asvab-general-science-tips",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "10 ASVAB General Science Tips to Boost Your Composite Scores and Unlock Better Jobs",
  description:
    "Master the ASVAB General Science subtest with these 10 tips covering body systems, earth science, physics, chemistry, mnemonics, and a 4-week study plan.",
  url: "https://asvabhero.com/asvab-general-science-tips",
  author: {
    "@type": "Organization",
    name: "ASVAB Hero",
    url: "https://asvabhero.com",
  },
  publisher: {
    "@type": "Organization",
    name: "ASVAB Hero",
  },
  datePublished: "2026-03-23",
  dateModified: "2026-03-23",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does General Science count toward your AFQT score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The AFQT uses only Arithmetic Reasoning (AR), Math Knowledge (MK), Word Knowledge (WK), and Paragraph Comprehension (PC). General Science does not affect your AFQT percentile, which determines basic enlistment eligibility. GS only affects composite line scores, which determine which military jobs you can hold. For a full breakdown of how AFQT scoring works, see our ASVAB scores explained guide.",
      },
    },
    {
      "@type": "Question",
      name: "How many questions are on the ASVAB General Science section?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The CAT-ASVAB (computer version) has 16 GS questions with an 8-minute time limit. The paper-and-pencil version has 25 questions with 11 minutes. Both average roughly 30 seconds per question.",
      },
    },
    {
      "@type": "Question",
      name: "What subjects does ASVAB General Science cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GS tests three broad domains. Life science covers human body systems, cell biology, genetics, and ecology. Earth and space science covers geology, atmosphere layers, weather, and astronomy. Physical science covers physics (Newton's laws, energy, simple machines) and chemistry (atoms, pH, states of matter, the periodic table). See Tips 2 through 8 above for the specific facts tested in each domain.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good General Science score on the ASVAB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GS is reported as a standard score with a mean of 50. Scores above 60 are competitive for most technical composites. For high-demand jobs like Army 68W Combat Medic (ST 101+) or Air Force avionics careers (E 70+), aim for a GS score of 65 or higher. Use our ASVAB score calculator to see how your GS score affects your composite totals.",
      },
    },
    {
      "@type": "Question",
      name: "How should I study for ASVAB General Science?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Focus on the highest-frequency topics first: human body systems (especially circulatory), Earth's layers and rock types, Newton's three laws, and the pH scale. Use mnemonics for memorization (see Tip 9) and active recall (self-quizzing) instead of re-reading notes. A 4-week plan rotating through one domain per week is the most effective approach.",
      },
    },
    {
      "@type": "Question",
      name: "Can you skip questions on the GS section?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On the CAT-ASVAB (computer version), no. You must answer each question before the next one appears, and you cannot go back. On the paper-and-pencil version, yes. You can skip and return within the time limit. Never leave a question blank. The ASVAB does not penalize wrong answers, so guessing after eliminating options gives you better odds than skipping.",
      },
    },
  ],
};

export default function ASVABGeneralScienceTipsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <article className="prose-asvab">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          10 ASVAB General Science Tips to Boost Your Composite Scores and Unlock Better Jobs
        </h1>

        <p className="mt-4 text-text-secondary">
          General Science doesn&apos;t count toward your AFQT. So why study it?
        </p>
        <p className="text-text-secondary">
          Because GS feeds into 12+ composite line scores across every branch of the military. Composite line scores are the formulas that determine which specific job you qualify for. Your AFQT gets you through the door. Your composites determine which job you walk into. A low GS score won&apos;t disqualify you from serving, but it will lock you out of the highest-paying, most competitive career fields: Combat Medic, avionics technician, electronics repair, nuclear engineering.
        </p>
        <p className="text-text-secondary">
          These 10 <strong>ASVAB general science tips</strong> cover the exact content that appears on the subtest, how to memorize it fast, and how to pace yourself through 16 questions in 8 minutes. The GS subtest spans three domains: life science, earth and space science, and physical science. The testable surface area is narrower than most people think. With 2-4 questions per domain, breadth beats depth every time. On the adaptive CAT-ASVAB, early questions carry extra weight, so knowing the high-frequency facts cold gives you an edge from question one.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">GS Subtest Format</p>
          <p className="mt-1 text-sm text-text-secondary">
            CAT-ASVAB (computer): 16 questions, 8 minutes (30 seconds per question)<br />
            P&amp;P-ASVAB (paper): 25 questions, 11 minutes (~26 seconds per question)<br />
            GS is NOT part of the AFQT formula (AFQT = AR + MK + 2VE)
          </p>
        </aside>

        {/* Tip 1 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          1. Know Why GS Matters for Your Military Career
        </h2>
        <p className="mt-4 text-text-secondary">
          Your AFQT gets you into the military. Your composite line scores get you the job. GS is baked into the formulas that gate the most competitive MOSs, AFSCs, and ratings across all four branches.
        </p>
        <p className="text-text-secondary">
          Every point you gain on GS ripples across multiple composites at once. A 7-point improvement on GS could be the difference between qualifying for Navy Electronics Technician and missing the cutoff entirely. Because GS appears in several composite formulas simultaneously, that single 7-point gain might push you over the threshold for three or four different career fields. That makes GS one of the highest-leverage subtests for career options, even though it never touches your AFQT.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Branch</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Composite</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Formula</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Example Job</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Min. Score</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Army</td>
                <td className="py-2 pr-4">EL (Electronics)</td>
                <td className="py-2 pr-4 font-mono">GS + AR + MK + EI</td>
                <td className="py-2 pr-4">68A Biomedical Equipment</td>
                <td className="py-2 font-mono">EL 107</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Army</td>
                <td className="py-2 pr-4">ST (Skilled Technical)</td>
                <td className="py-2 pr-4 font-mono">GS + VE + MK + MC</td>
                <td className="py-2 pr-4">68W Combat Medic</td>
                <td className="py-2 font-mono">ST 101</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Army</td>
                <td className="py-2 pr-4">GM (General Maintenance)</td>
                <td className="py-2 pr-4 font-mono">GS + AS + MK + EI</td>
                <td className="py-2 pr-4">12R Interior Electrician</td>
                <td className="py-2 font-mono">GM 93</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Air Force</td>
                <td className="py-2 pr-4">E (Electronics)</td>
                <td className="py-2 pr-4 font-mono">GS + AR + MK + EI</td>
                <td className="py-2 pr-4">Avionics Tech</td>
                <td className="py-2 font-mono">E 70</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Navy</td>
                <td className="py-2 pr-4">EL (Electronics)</td>
                <td className="py-2 pr-4 font-mono">AR + MK + EI + GS</td>
                <td className="py-2 pr-4">Electronics Technician (ET)</td>
                <td className="py-2 font-mono">EL 222</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Navy</td>
                <td className="py-2 pr-4">HM (Hospital)</td>
                <td className="py-2 pr-4 font-mono">GS + MK + VE</td>
                <td className="py-2 pr-4">Hospital Corpsman</td>
                <td className="py-2 font-mono">HM 156</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Marines</td>
                <td className="py-2 pr-4">EL (Electronics)</td>
                <td className="py-2 pr-4 font-mono">GS + AR + MK + EI</td>
                <td className="py-2 pr-4">Electronics Maintenance</td>
                <td className="py-2 font-mono">EL 100</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            GS appears in Army EL, GM, and ST. Air Force E and M. Navy EL, HM, and BEE. Marines EL and MM. That is 12+ composites across 4 branches. Check which composites your target{" "}
            <Link href="/army-mos-list" className="text-accent hover:text-accent-hover">MOS</Link>{" "}
            or{" "}
            <Link href="/air-force-afsc-list" className="text-accent hover:text-accent-hover">AFSC</Link>{" "}
            requires before deciding to skip GS prep.
          </p>
        </aside>

        <p className="text-text-secondary">
          The tips below are ordered by test frequency. Start with the domains that show up most, and work your way through the list in order.
        </p>

        {/* Tip 2 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          2. Master the Five Body Systems That Appear Most Often
        </h2>
        <p className="mt-4 text-text-secondary">
          The circulatory system alone accounts for roughly 12% of GS questions. Add four more systems and you have covered the bulk of life science on the test. You do not need to memorize all 11 body systems. These five dominate.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Circulatory System</p>
          <p className="mt-1 text-sm text-text-secondary">
            Heart has 4 chambers (2 atria, 2 ventricles). Blood flow: body &gt; right atrium &gt; right ventricle &gt; lungs &gt; left atrium &gt; left ventricle &gt; body. Arteries carry blood away from the heart. Veins carry blood toward it. Red blood cells use hemoglobin to carry oxygen. White blood cells fight infection. Platelets clot wounds.
          </p>
        </aside>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Respiratory System</p>
          <p className="mt-1 text-sm text-text-secondary">
            Gas exchange happens in the alveoli (tiny air sacs in the lungs). The diaphragm contracts to pull air in. Air path: trachea &gt; bronchi &gt; bronchioles &gt; alveoli. Oxygen enters the blood, carbon dioxide exits. The lungs do not push air out. The diaphragm relaxes, and the air exits passively.
          </p>
        </aside>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Digestive System</p>
          <p className="mt-1 text-sm text-text-secondary">
            Pathway: mouth &gt; esophagus &gt; stomach &gt; small intestine &gt; large intestine. The small intestine is where nutrient absorption happens through tiny finger-like projections called villi. The large intestine absorbs water. Stomach acid (pH ~1.5) breaks down food chemically. The liver produces bile, which helps digest fats.
          </p>
        </aside>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Nervous System</p>
          <p className="mt-1 text-sm text-text-secondary">
            CNS = brain + spinal cord. PNS = everything else (peripheral nerves). Neurons transmit signals: dendrite &gt; cell body &gt; axon. Reflex arcs bypass the brain for faster response. The autonomic nervous system controls involuntary functions like heart rate and digestion.
          </p>
        </aside>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Skeletal System</p>
          <p className="mt-1 text-sm text-text-secondary">
            206 bones in an adult human. Axial skeleton = skull, spine, ribs. Appendicular skeleton = arms, legs, shoulders, hips. Joint types: ball-and-socket (shoulder), hinge (elbow), pivot (neck). Bone marrow produces red and white blood cells.
          </p>
        </aside>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Test-day shortcut: if a question mentions &ldquo;transport&rdquo; or &ldquo;delivery,&rdquo; think circulatory. &ldquo;Gas exchange&rdquo; means respiratory. &ldquo;Absorption&rdquo; means digestive (small intestine specifically).
          </p>
        </aside>

        <p className="text-text-secondary">
          Draw each system from memory once. If you can sketch the heart&apos;s four chambers and label the blood flow, you own the most-tested topic on the GS subtest. Then try labeling the air pathway from trachea to alveoli. Two quick sketches cover the two highest-frequency systems.
        </p>

        {/* Tip 3 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          3. Learn Cell Biology Basics in 15 Minutes
        </h2>
        <p className="mt-4 text-text-secondary">
          You do not need a biology degree. Fifteen minutes with the right facts covers every cell question the ASVAB throws at you. Cell biology questions are predictable: organelle functions, mitosis vs. meiosis, and DNA basics.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Organelle</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Function</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Nucleus</td>
                <td className="py-2">DNA storage, control center of the cell</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Mitochondria</td>
                <td className="py-2">Energy production (ATP), the &ldquo;powerhouse&rdquo;</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Cell Membrane</td>
                <td className="py-2">Controls what enters and exits the cell</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Ribosome</td>
                <td className="py-2">Builds proteins from amino acids</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Chloroplast</td>
                <td className="py-2">Photosynthesis (plant cells only)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          <strong>Mitosis vs. Meiosis.</strong> Mitosis divides body cells into 2 identical daughter cells with the full chromosome count (46 in humans). The four phases are prophase, metaphase, anaphase, and telophase (PMAT). Meiosis divides sex cells into 4 genetically unique cells with half the chromosomes (23). Mitosis handles growth and repair. Meiosis handles reproduction. If the question asks about &ldquo;genetic variation,&rdquo; the answer is meiosis.
        </p>
        <p className="text-text-secondary">
          <strong>Plant vs. Animal Cells.</strong> Plant cells have cell walls, chloroplasts, and a large central vacuole. Animal cells have none of these three. Both share a nucleus, mitochondria, and cell membrane.
        </p>
        <p className="text-text-secondary">
          <strong>DNA Basics.</strong> DNA is organized into genes, which sit on chromosomes. Humans have 46 chromosomes (23 pairs). Base pairing rules: Adenine pairs with Thymine (A-T), Guanine pairs with Cytosine (G-C). DNA carries the genetic code. RNA reads that code and delivers instructions to ribosomes for protein assembly.
        </p>
        <p className="text-text-secondary">
          <strong>Ecology One-Liner.</strong> Food chains follow a pattern: producers (plants) are eaten by primary consumers (herbivores), which are eaten by secondary consumers (carnivores). Energy decreases at each level.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            The most common cell question on the ASVAB: &ldquo;What organelle produces energy for the cell?&rdquo; Answer: mitochondria. Lock that in.
          </p>
        </aside>

        <p className="text-text-secondary">
          Can you name three differences between plant and animal cells? If yes, you have passed the cell biology portion of your review. If not, re-read the plant vs. animal paragraph above until you can list them without looking.
        </p>

        {/* Tip 4 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          4. Understand Earth&apos;s Layers, Rocks, and Plate Tectonics
        </h2>
        <p className="mt-4 text-text-secondary">
          Earth science questions follow a pattern: they ask about layers, rocks, or plates. Master those three clusters and you have handled this entire domain. Earth science is the second-highest tested area on GS after life science.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Crust</p>
            <p className="mt-1 text-sm text-text-secondary">5-70 km thick, rocky surface where we live</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Mantle</p>
            <p className="mt-1 text-sm text-text-secondary">~2,900 km thick, convection currents drive plate movement</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Outer Core</p>
            <p className="mt-1 text-sm text-text-secondary">Liquid iron and nickel, generates Earth&apos;s magnetic field</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Inner Core</p>
            <p className="mt-1 text-sm text-text-secondary">Solid iron and nickel, ~5,400 degrees Celsius</p>
          </div>
        </div>

        <p className="text-text-secondary">
          <strong>Three Rock Types.</strong> Igneous forms from cooled magma or lava (granite, basalt). Sedimentary forms from compressed layers over time (sandstone, limestone, shale). Metamorphic forms when existing rock transforms under heat and pressure (marble from limestone, slate from shale). The rock cycle connects all three: any rock type can become any other through the right process.
        </p>
        <p className="text-text-secondary">
          <strong>Weathering vs. Erosion.</strong> Weathering breaks rock down in place (freeze-thaw cycles, acid rain, plant roots). Erosion moves the broken pieces to a new location (water, wind, glaciers). Both processes feed sedimentary rock formation.
        </p>
        <p className="text-text-secondary">
          <strong>Plate Tectonics.</strong> Earth&apos;s crust is divided into tectonic plates that float on the mantle. Three boundary types drive geological activity: convergent (plates collide, forming mountains or ocean trenches), divergent (plates separate, creating mid-ocean ridges and new crust), and transform (plates slide past each other, causing earthquakes). The San Andreas Fault is a transform boundary. Volcanoes cluster at convergent boundaries and along mid-ocean ridges. All continents were once joined as the supercontinent Pangaea.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            If a question mentions &ldquo;fossils,&rdquo; the answer almost always involves sedimentary rock. Fossils only form in sedimentary layers.
          </p>
        </aside>

        <p className="text-text-secondary">
          Think of Earth&apos;s layers like a nesting doll. Crust wraps mantle, mantle wraps outer core, outer core wraps inner core. Temperature and pressure increase as you go deeper.
        </p>

        {/* Tip 5 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          5. Memorize Atmosphere Layers and the Water Cycle
        </h2>
        <p className="mt-4 text-text-secondary">
          This is your easiest win on the GS subtest. Atmosphere and water cycle questions are pure recall. No math, no problem-solving. Memorize the facts and collect free points.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Troposphere (0-12 km)</p>
            <p className="mt-1 text-sm text-text-secondary">Where weather happens, where jets fly</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Stratosphere (12-50 km)</p>
            <p className="mt-1 text-sm text-text-secondary">Contains the ozone layer, absorbs UV radiation</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Mesosphere (50-80 km)</p>
            <p className="mt-1 text-sm text-text-secondary">Where meteors burn up</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Thermosphere (80-700 km)</p>
            <p className="mt-1 text-sm text-text-secondary">Where the ISS orbits, auroras occur</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Exosphere (700+ km)</p>
            <p className="mt-1 text-sm text-text-secondary">Fades into outer space, GPS satellites orbit here</p>
          </div>
        </div>

        <p className="text-text-secondary">
          <strong>Atmosphere Composition.</strong> Nitrogen makes up 78% of the atmosphere. Oxygen is 21%. The remaining 1% includes argon, carbon dioxide, and trace gases. This is one of the most frequently tested ASVAB general science facts. The nitrogen-oxygen split is the single most common atmosphere question, so commit those two numbers to memory.
        </p>
        <p className="text-text-secondary">
          <strong>Weather Basics.</strong> Cold fronts form when cold air pushes under warm air, producing thunderstorms and sharp temperature drops. Warm fronts form when warm air rides over cold air, producing steady rain. Three cloud types to know: cumulus (puffy, fair weather), stratus (flat layers, overcast), and cumulonimbus (tall storm clouds, heavy rain and lightning).
        </p>
        <p className="text-text-secondary">
          <strong>Water Cycle.</strong> Evaporation (liquid to gas, driven by solar energy) &gt; Condensation (gas to liquid, forms clouds) &gt; Precipitation (falls as rain, snow, sleet, or hail) &gt; Collection (runoff flows into oceans, rivers, and lakes). Transpiration is the release of water vapor by plants, feeding back into the cycle. Some precipitation seeps underground to become groundwater, which feeds wells and springs.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Mnemonic for atmosphere layers, bottom to top: &ldquo;The Silly Monkeys Took Everything&rdquo; (Troposphere, Stratosphere, Mesosphere, Thermosphere, Exosphere).
          </p>
        </aside>

        <p className="text-text-secondary">
          Five layers, four cycle stages, two percentages, three cloud types. That is 14 facts total. You can memorize them on one index card tonight.
        </p>

        {/* Tip 6 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          6. Study the Solar System and Basic Astronomy
        </h2>
        <p className="mt-4 text-text-secondary">
          The ASVAB is not testing you on black holes or dark matter. It is asking whether you know the eight planets in order and a handful of facts about each. This is another domain where memorization pays off fast.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Planet</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Type</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Key Fact</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Mercury</td>
                <td className="py-2 pr-4">Rocky</td>
                <td className="py-2">Closest to the Sun, no atmosphere</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Venus</td>
                <td className="py-2 pr-4">Rocky</td>
                <td className="py-2">Hottest planet (greenhouse effect)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Earth</td>
                <td className="py-2 pr-4">Rocky</td>
                <td className="py-2">Only planet with known life</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Mars</td>
                <td className="py-2 pr-4">Rocky</td>
                <td className="py-2">Red color from iron oxide</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Jupiter</td>
                <td className="py-2 pr-4">Gas giant</td>
                <td className="py-2">Largest planet in the solar system</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Saturn</td>
                <td className="py-2 pr-4">Gas giant</td>
                <td className="py-2">Famous ring system</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Uranus</td>
                <td className="py-2 pr-4">Ice giant</td>
                <td className="py-2">Extreme axial tilt (rotates on its side)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Neptune</td>
                <td className="py-2 pr-4">Ice giant</td>
                <td className="py-2">Farthest planet from the Sun</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          <strong>Inner vs. Outer.</strong> The inner four planets (Mercury through Mars) are rocky and terrestrial. The outer four (Jupiter through Neptune) are gas or ice giants. The asteroid belt separates the two groups. Asteroids are rocky. Comets are icy and develop tails when they approach the Sun.
        </p>
        <p className="text-text-secondary">
          <strong>The Sun.</strong> The Sun is a main-sequence star that produces energy through nuclear fusion (hydrogen fusing into helium). It contains 99.8% of the solar system&apos;s mass. Light from the Sun takes about 8 minutes to reach Earth.
        </p>
        <p className="text-text-secondary">
          <strong>Eclipses.</strong> Solar eclipse: Moon passes between Earth and Sun, casting a shadow on Earth. Lunar eclipse: Earth passes between Sun and Moon, casting a shadow on the Moon. Moon phases cycle from new moon through waxing crescent, first quarter, full moon, waning, and back. A full cycle takes about 29.5 days.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Planet order mnemonic: &ldquo;My Very Educated Mother Just Served Us Nachos&rdquo; (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune).
          </p>
        </aside>

        <p className="text-text-secondary">
          Name the planets in order, then name the four rocky ones. If you can do both in under 10 seconds, move on to the next tip.
        </p>

        {/* Tip 7 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          7. Nail the Physics Fundamentals
        </h2>
        <p className="mt-4 text-text-secondary">
          GS physics questions do not require you to solve equations. They test whether you understand the concepts behind motion, energy, and forces. If you can explain Newton&apos;s three laws in plain English, you can handle every physics question on this subtest.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Newton&apos;s First Law (Inertia)</p>
          <p className="mt-1 text-sm text-text-secondary">
            An object at rest stays at rest. An object in motion stays in motion. Nothing changes unless an outside force acts on it. Example: a passenger jerks forward when a car brakes because the body keeps moving.
          </p>
        </aside>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Newton&apos;s Second Law (F = ma)</p>
          <p className="mt-1 text-sm text-text-secondary">
            Force equals mass times acceleration. More mass requires more force to achieve the same acceleration. Double the mass, double the force needed.
          </p>
        </aside>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Newton&apos;s Third Law (Action-Reaction)</p>
          <p className="mt-1 text-sm text-text-secondary">
            Every action has an equal and opposite reaction. A rocket pushes gas downward, and the gas pushes the rocket upward. A swimmer pushes water backward, and the water pushes the swimmer forward.
          </p>
        </aside>

        <div className="my-4 rounded-xl bg-navy p-4 text-center font-mono text-lg font-bold text-accent">
          F = m x a
          <br />
          <span className="text-sm font-normal text-text-secondary">
            Force (in Newtons) = mass (in kg) x acceleration (in m/s2)
          </span>
          <br />
          <span className="text-sm font-normal text-text-secondary">
            You will not calculate this on the GS subtest. But you need to understand the relationship: increasing mass or acceleration increases force.
          </span>
        </div>

        <p className="text-text-secondary">
          <strong>Energy Types.</strong> Kinetic (motion), potential (stored, including gravitational and elastic), thermal (heat), electrical, and nuclear. The law of conservation of energy states that energy cannot be created or destroyed, only converted from one form to another. A roller coaster at the top of a hill has maximum potential energy. At the bottom, that potential energy has converted to kinetic energy.
        </p>
        <p className="text-text-secondary">
          <strong>Six Simple Machines.</strong> Lever, pulley, wheel and axle, inclined plane, wedge, and screw. All six reduce effort by increasing the distance over which force is applied. These physics concepts overlap with the Mechanical Comprehension subtest, so this knowledge does double duty.
        </p>
        <p className="text-text-secondary">
          A book sitting on a table: what law keeps it still? First law (inertia). What force pair exists? The book pushes down on the table, and the table pushes up on the book (third law).
        </p>

        {/* Tip 8 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          8. Cover Chemistry Essentials: pH, Elements, and Reactions
        </h2>
        <p className="mt-4 text-text-secondary">
          Chemistry on the ASVAB is a mile wide and an inch deep. You do not need to balance equations or memorize the periodic table. You need to know what pH means, how atoms work, and what happens when matter changes state.
        </p>
        <p className="text-text-secondary">
          <strong>Atomic Structure.</strong> Protons are positive and sit in the nucleus (they define the element). Neutrons are neutral and also in the nucleus. Electrons are negative and orbit the nucleus. Atomic number = number of protons. Mass number = protons + neutrons. Isotopes are atoms of the same element with different neutron counts. Carbon-12 and Carbon-14 are both carbon, but with different mass numbers.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">pH Range</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Classification</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">Examples</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">0-2</td>
                <td className="py-2 pr-4">Strong acid</td>
                <td className="py-2">Stomach acid (~1.5), lemon juice (~2)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">3-6</td>
                <td className="py-2 pr-4">Weak acid</td>
                <td className="py-2">Vinegar (~3), coffee (~5)</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">7</td>
                <td className="py-2 pr-4">Neutral</td>
                <td className="py-2">Pure water</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">8-11</td>
                <td className="py-2 pr-4">Weak base</td>
                <td className="py-2">Baking soda (~9), ammonia (~11)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">12-14</td>
                <td className="py-2 pr-4">Strong base</td>
                <td className="py-2">Bleach (~13)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          <strong>States of Matter.</strong> Solid (fixed shape and volume) &gt; Liquid (fixed volume, takes the shape of container) &gt; Gas (fills entire container). Phase changes: melting (solid to liquid), evaporation (liquid to gas), condensation (gas to liquid), freezing (liquid to solid), sublimation (solid directly to gas, like dry ice).
        </p>
        <p className="text-text-secondary">
          <strong>Chemical vs. Physical Changes.</strong> A physical change alters form but not composition (ice melting, paper tearing). A chemical change produces a new substance (rust forming, wood burning). New color, gas bubbles, or heat signals a chemical change.
        </p>
        <p className="text-text-secondary">
          <strong>Periodic Table Basics.</strong> Rows are called periods. Columns are called groups. Group 1 elements are alkali metals (highly reactive). Group 18 elements are noble gases (inert, rarely react). Metals sit on the left side of the table. Nonmetals sit on the right.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
          <p className="text-sm font-semibold text-text-primary">Key Point</p>
          <p className="mt-1 text-sm text-text-secondary">
            OIL RIG for redox reactions: Oxidation Is Loss (of electrons), Reduction Is Gain (of electrons). This mnemonic covers the most common chemistry reaction question on the GS subtest.
          </p>
        </aside>

        <p className="text-text-secondary">
          If you remember that pH 7 is neutral, acids fall below, and bases rise above, you have handled the most common chemistry question on GS.
        </p>

        {/* Tip 9 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          9. Use Mnemonics to Lock In Key Science Facts
        </h2>
        <p className="mt-4 text-text-secondary">
          You have covered six science domains across these ASVAB general science tips. Now lock them in with memory tools that stick. Screenshot this section. It is your pre-test study reference.
        </p>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Topic</th>
                <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Mnemonic</th>
                <th className="pb-2 text-left font-semibold text-text-secondary">What It Covers</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Planets</td>
                <td className="py-2 pr-4">&ldquo;My Very Educated Mother Just Served Us Nachos&rdquo;</td>
                <td className="py-2">Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Taxonomy</td>
                <td className="py-2 pr-4">&ldquo;Dear King Philip Came Over For Good Soup&rdquo;</td>
                <td className="py-2">Domain, Kingdom, Phylum, Class, Order, Family, Genus, Species</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Atmosphere</td>
                <td className="py-2 pr-4">&ldquo;The Silly Monkeys Took Everything&rdquo;</td>
                <td className="py-2">Troposphere, Stratosphere, Mesosphere, Thermosphere, Exosphere</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Redox</td>
                <td className="py-2 pr-4">&ldquo;OIL RIG&rdquo;</td>
                <td className="py-2">Oxidation Is Loss, Reduction Is Gain</td>
              </tr>
              <tr className="border-b border-navy-border/50">
                <td className="py-2 pr-4 font-semibold text-text-primary">Mitosis phases</td>
                <td className="py-2 pr-4">&ldquo;PMAT&rdquo;</td>
                <td className="py-2">Prophase, Metaphase, Anaphase, Telophase</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text-primary">Mohs hardness</td>
                <td className="py-2 pr-4">&ldquo;Tall Girls Can Flirt And Other Queer Things Can Do&rdquo;</td>
                <td className="py-2">Talc to Diamond, scale 1-10</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary">
          <strong>How to use them.</strong> Read each mnemonic aloud three times. Then close the page and write them from memory. Test yourself again the next day. This is spaced repetition: reviewing at increasing intervals (1 day, 3 days, 1 week) instead of cramming everything the night before. Your brain encodes information more deeply when it has to actively retrieve it rather than passively re-read it.
        </p>
        <p className="text-text-secondary">
          <strong>Build your own.</strong> Make personal mnemonics for facts that will not stick. Personal ones are more memorable than borrowed ones because your brain already has emotional hooks attached to the words you chose. Flashcards also work well for this. Write the question on one side and the answer on the other. Shuffle the deck and drill daily.
        </p>
        <p className="text-text-secondary">
          <strong>Drill sequence.</strong> Start with the four core mnemonics (planets, taxonomy, atmosphere, redox). Once those are locked in, add PMAT and Mohs hardness. Six mnemonics total covers facts across all three GS domains.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-emerald-400 bg-navy p-4">
          <p className="text-sm font-semibold text-emerald-400">Tip</p>
          <p className="mt-1 text-sm text-text-secondary">
            Close your eyes and recite all four major mnemonics from this section (planets, taxonomy, atmosphere, redox). If you can hit 3 of 4, you are ready for these domains on test day.
          </p>
        </aside>

        {/* Tip 10 */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          10. Pace the GS Subtest and Build a 4-Week Study Plan
        </h2>
        <p className="mt-4 text-text-secondary">
          You know what to study. Now build the plan that gets it done in 4 weeks, and the pacing strategy that keeps you from running out of time on test day.
        </p>
        <p className="text-text-secondary">
          <strong>CAT-ASVAB Pacing.</strong> 16 questions in 8 minutes gives you 30 seconds per question. You cannot skip questions. You cannot go back. Early questions carry more weight because the adaptive algorithm adjusts difficulty based on your answers. If you are unsure, eliminate two answers and guess from the remaining options. Never leave time on the table.
        </p>
        <p className="text-text-secondary">
          <strong>P&amp;P Pacing.</strong> 25 questions in 11 minutes gives you about 26 seconds per question. You can skip and return. Flag difficult questions, answer the easy ones first, then circle back with remaining time.
        </p>

        <div className="my-4 space-y-2">
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Week 1</p>
            <p className="mt-1 text-sm text-text-secondary">Life science (body systems + cells), 30 min/day</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Week 2</p>
            <p className="mt-1 text-sm text-text-secondary">Earth and space science (layers, rocks, atmosphere, planets), 30 min/day</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Week 3</p>
            <p className="mt-1 text-sm text-text-secondary">Physical science (physics + chemistry), 30 min/day</p>
          </div>
          <div className="rounded-lg bg-navy px-4 py-3">
            <p className="font-mono text-sm font-bold text-accent">Week 4</p>
            <p className="mt-1 text-sm text-text-secondary">Review all domains + timed practice sets, 45 min/day</p>
          </div>
        </div>

        <p className="text-text-secondary">
          <strong>Study Method.</strong> Active recall beats re-reading. Quiz yourself. Draw diagrams from memory. Explain concepts out loud. Take a diagnostic{" "}
          <Link href="/practice-test" className="text-accent hover:text-accent-hover">practice test</Link>{" "}
          before you start studying so you know which domains need the most attention. Then revisit our{" "}
          <Link href="/asvab-study-guide" className="text-accent hover:text-accent-hover">ASVAB study guide</Link>{" "}
          to build a plan that targets your weak spots. During Week 4, simulate test conditions: set an 8-minute timer, answer 16 questions, and score yourself immediately.
        </p>

        <aside className="my-6 rounded-lg border-l-4 border-amber-400 bg-navy p-4">
          <p className="text-sm font-semibold text-amber-400">Warning</p>
          <p className="mt-1 text-sm text-text-secondary">
            Do not cram all six domains in one night. Rotating through one domain per session builds stronger long-term memory. Your brain consolidates information during sleep, so spreading study across days is more effective than marathon sessions.
          </p>
        </aside>

        <p className="text-text-secondary">
          Ready to see which jobs your scores unlock? Plug your subtest scores into our{" "}
          <Link href="/calculator" className="text-accent hover:text-accent-hover">ASVAB score calculator</Link>{" "}
          and find out which MOSs, AFSCs, and ratings you qualify for right now.
        </p>

        {/* FAQ */}
        <h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
          Frequently Asked Questions
        </h2>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">Does General Science count toward your AFQT score?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              No. The AFQT uses only Arithmetic Reasoning (AR), Math Knowledge (MK), Word Knowledge (WK), and Paragraph Comprehension (PC). General Science does not affect your AFQT percentile, which determines basic enlistment eligibility. GS only affects composite line scores, which determine which military jobs you can hold. For a full breakdown of how AFQT scoring works, see our{" "}
              <Link href="/asvab-scores-explained" className="text-accent hover:text-accent-hover">ASVAB scores explained</Link>{" "}
              guide.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">How many questions are on the ASVAB General Science section?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              The CAT-ASVAB (computer version) has 16 GS questions with an 8-minute time limit. The paper-and-pencil version has 25 questions with 11 minutes. Both average roughly 30 seconds per question. For a complete subtest breakdown, check{" "}
              <Link href="/how-many-questions-on-the-asvab" className="text-accent hover:text-accent-hover">how many questions are on the ASVAB</Link>.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">What subjects does ASVAB General Science cover?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              GS tests three broad domains. Life science covers human body systems, cell biology, genetics, and ecology. Earth and space science covers geology, atmosphere layers, weather, and astronomy. Physical science covers physics (Newton&apos;s laws, energy, simple machines) and chemistry (atoms, pH, states of matter, the periodic table). See Tips 2 through 8 above for the specific facts tested in each domain.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">What is a good General Science score on the ASVAB?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              GS is reported as a standard score with a mean of 50. Scores above 60 are competitive for most technical composites. For high-demand jobs like Army 68W Combat Medic (ST 101+) or Air Force avionics careers (E 70+), aim for a GS score of 65 or higher. Use our{" "}
              <Link href="/calculator" className="text-accent hover:text-accent-hover">ASVAB score calculator</Link>{" "}
              to see how your GS score affects your composite totals.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">How should I study for ASVAB General Science?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Focus on the highest-frequency topics first: human body systems (especially circulatory), Earth&apos;s layers and rock types, Newton&apos;s three laws, and the pH scale. Use mnemonics for memorization (see Tip 9) and active recall (self-quizzing) instead of re-reading notes. A 4-week plan rotating through one domain per week is the most effective approach. Our{" "}
              <Link href="/how-to-study-for-the-asvab" className="text-accent hover:text-accent-hover">how to study for the ASVAB</Link>{" "}
              guide covers the full strategy.
            </p>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-text-primary">Can you skip questions on the GS section?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              On the CAT-ASVAB (computer version), no. You must answer each question before the next one appears, and you cannot go back. On the paper-and-pencil version, yes. You can skip and return within the time limit. Never leave a question blank. The ASVAB does not penalize wrong answers, so guessing after eliminating options gives you better odds than skipping.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-navy-border bg-navy-light p-6 text-center">
          <h3 className="font-display text-xl font-bold text-text-primary">See What Your Scores Unlock</h3>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your 9 subtest scores and instantly see your AFQT, composite scores, and every job you qualify for.
          </p>
          <Link
            href="/calculator"
            className="mt-4 inline-block rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)] no-underline"
          >
            Try the Free Calculator
          </Link>
        </div>
      </article>
    </div>
  );
}
