-- =============================================================
-- ASVAB Hero — Seed Data
-- Topics taxonomy + Test variants
-- NOTE: practice_questions are NOT seeded here;
--       they are added in Phase 2C after question bank tagging.
-- =============================================================

-- =============================================================
-- PART 1: TOPICS
-- =============================================================

insert into topics (id, subtest, slug, title, sort_order) values
  -- GS — General Science
  ('gs.life-science',       'GS', 'life-science',       'Life Science & Biology',            1),
  ('gs.physical-science',   'GS', 'physical-science',   'Physical Science & Chemistry',      2),
  ('gs.earth-space-science','GS', 'earth-space-science','Earth & Space Science',              3),
  ('gs.physics-mechanics',  'GS', 'physics-mechanics',  'Physics & Mechanics',               4),

  -- AR — Arithmetic Reasoning
  ('ar.arithmetic-fundamentals','AR','arithmetic-fundamentals','Arithmetic Fundamentals',    1),
  ('ar.ratio-proportion',       'AR','ratio-proportion',       'Ratios & Proportions',       2),
  ('ar.percent',                'AR','percent',                'Percent & Markup',            3),
  ('ar.rate-distance-time',     'AR','rate-distance-time',     'Rate, Distance & Time',      4),
  ('ar.word-problems',          'AR','word-problems',          'Multi-Step Word Problems',   5),
  ('ar.averages',               'AR','averages',               'Averages & Mean',            6),
  ('ar.work-rate',              'AR','work-rate',              'Work & Rate Problems',       7),

  -- WK — Word Knowledge
  ('wk.synonyms',         'WK','synonyms',         'Synonyms & Definitions',     1),
  ('wk.context-clues',    'WK','context-clues',    'Context Clues',              2),
  ('wk.prefixes-suffixes','WK','prefixes-suffixes', 'Prefixes & Suffixes',        3),
  ('wk.root-words',       'WK','root-words',        'Root Words',                 4),
  ('wk.antonyms',              'WK','antonyms',              'Antonyms & Opposites',       5),
  ('wk.multiple-meaning-words','WK','multiple-meaning-words','Multiple-Meaning Words',     6),

  -- PC — Paragraph Comprehension
  ('pc.main-idea',          'PC','main-idea',          'Main Idea & Purpose',      1),
  ('pc.detail-recall',      'PC','detail-recall',      'Detail & Recall',          2),
  ('pc.inference',          'PC','inference',           'Inference & Conclusion',   3),
  ('pc.author-tone-purpose','PC','author-tone-purpose', 'Author Tone & Purpose',   4),
  ('pc.vocabulary-in-context','PC','vocabulary-in-context','Vocabulary in Context',    5),
  ('pc.text-structure',      'PC','text-structure',      'Sequence & Text Structure',6),

  -- MK — Mathematics Knowledge
  ('mk.geometry',             'MK','geometry',             'Geometry: Area, Perimeter & Volume', 1),
  ('mk.algebra-linear',       'MK','algebra-linear',       'Linear Equations & Algebra',         2),
  ('mk.fractions-decimals',   'MK','fractions-decimals',   'Fractions, Decimals & Percent',      3),
  ('mk.exponents-polynomials','MK','exponents-polynomials', 'Exponents & Polynomials',            4),
  ('mk.number-properties',    'MK','number-properties',    'Number Properties & Absolute Value', 5),
  ('mk.order-of-operations',  'MK','order-of-operations',  'Order of Operations',                6),
  ('mk.inequalities',         'MK','inequalities',         'Inequalities',                       7),

  -- EI — Electronics Information
  ('ei.ohms-law-power',       'EI','ohms-law-power',       'Ohm''s Law & Power',                 1),
  ('ei.circuit-types',        'EI','circuit-types',        'Series & Parallel Circuits',         2),
  ('ei.components-devices',   'EI','components-devices',   'Electrical Components & Devices',    3),
  ('ei.conductors-insulators','EI','conductors-insulators', 'Conductors, Insulators & Materials', 4),

  -- AS — Auto & Shop Information
  ('as.hand-tools',       'AS','hand-tools',       'Hand Tools & Measurement',     1),
  ('as.vehicle-systems',  'AS','vehicle-systems',  'Vehicle Systems & Engine',     2),
  ('as.shop-safety',      'AS','shop-safety',      'Shop Safety & Procedures',     3),
  ('as.maintenance-repair','AS','maintenance-repair','Maintenance & Repair Practices',4),

  -- MC — Mechanical Comprehension
  ('mc.levers-pulleys',         'MC','levers-pulleys',         'Levers & Pulleys',          1),
  ('mc.gears-wheels',           'MC','gears-wheels',           'Gears, Wheels & Axles',     2),
  ('mc.forces-friction',        'MC','forces-friction',        'Forces, Friction & Pressure',3),
  ('mc.inclined-plane-hydraulics','MC','inclined-plane-hydraulics','Inclined Planes & Hydraulics',4),
  ('mc.motion-projectile',      'MC','motion-projectile',      'Motion & Projectile Physics',5),

  -- AO — Assembling Objects
  ('ao.3d-visualization',  'AO','3d-visualization',  '3-D Object Visualization',       1),
  ('ao.paper-folding-nets','AO','paper-folding-nets', 'Paper Folding & Nets',           2),
  ('ao.spatial-counting',  'AO','spatial-counting',  'Spatial Counting & Orientation', 3),
  ('ao.pattern-assembly',  'AO','pattern-assembly',  'Pattern Assembly & Rotation',    4)
;

-- =============================================================
-- PART 2: TEST VARIANTS
-- v1 enables: diagnostic, subtest_drill
-- v2 will enable: afqt_sprint, weakness_loop
-- v3 will enable: retake_readiness, full_sim
-- =============================================================

insert into test_variants (code, name, rules, active) values

  (
    'diagnostic',
    'Diagnostic Test',
    '{
      "length": 30,
      "time_seconds": 2160,
      "mix": {"GS":3,"AR":4,"WK":4,"PC":3,"MK":4,"EI":3,"AS":3,"MC":3,"AO":3},
      "afqt_eligible": false,
      "subtest_locked": null
    }'::jsonb,
    true
  ),

  (
    'subtest_drill',
    'Subtest Drill',
    '{
      "length": 25,
      "time_seconds": 1200,
      "mix": "one_subtest",
      "afqt_eligible": false,
      "subtest_locked": null,
      "note": "subtest_locked is set at runtime to the chosen subtest"
    }'::jsonb,
    true
  ),

  (
    'afqt_sprint',
    'AFQT Sprint',
    '{
      "length": 59,
      "time_seconds": 2700,
      "mix": {"AR":16,"WK":16,"PC":11,"MK":16},
      "afqt_eligible": true,
      "subtest_locked": null
    }'::jsonb,
    false
  ),

  (
    'weakness_loop',
    'Weakness Loop',
    '{
      "length": 12,
      "time_seconds": 600,
      "mix": "8_weakest_topic_4_adjacent",
      "afqt_eligible": false,
      "subtest_locked": null,
      "note": "8 questions from weakest topics + 4 from adjacent topics"
    }'::jsonb,
    false
  ),

  (
    'retake_readiness',
    'Retake Readiness Check',
    '{
      "length": 20,
      "time_seconds": 900,
      "mix": "12_prior_weak_8_fresh",
      "afqt_eligible": false,
      "subtest_locked": null,
      "note": "12 anchored from prior weak topics + 8 fresh questions"
    }'::jsonb,
    false
  ),

  (
    'full_sim',
    'Full ASVAB Simulation',
    '{
      "length": 134,
      "time_seconds": 9000,
      "mix": {"GS":16,"AR":16,"WK":16,"PC":11,"MK":16,"EI":16,"AS":11,"MC":16,"AO":16},
      "afqt_eligible": true,
      "subtest_locked": null,
      "note": "Full-length ASVAB simulation — final-stretch weekly rehearsal."
    }'::jsonb,
    true
  ),

  (
    'daily_challenge',
    'Daily Challenge',
    '{
      "length": 10,
      "time_seconds": 720,
      "mix": "interleaved",
      "afqt_eligible": false,
      "subtest_locked": null,
      "note": "10 interleaved questions; banks misses via ingest_attempt_mistakes"
    }'::jsonb,
    true
  ),

  (
    'gt_adaptive',
    'Adaptive GT / General',
    '{
      "length": 36,
      "time_seconds": 2340,
      "mix": {"AR":12,"WK":12,"PC":12},
      "afqt_eligible": false,
      "subtest_locked": null,
      "note": "AFCT VE+AR-branch blueprint: AR+WK+PC (drop MK). Army/Marines GT + AF/SF General."
    }'::jsonb,
    true
  )
;
