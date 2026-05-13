/**
 * Data module for the NASH × CBC dashboard.
 *
 * Every numeric value is taken directly from the manuscript and from
 * the underlying R analysis (data.csv, n=1788). When a number is not
 * reported in the published paper it is left null and flagged TODO.
 *
 * Source: Al-Khinji, Malouche, Al-Thani, Mustafa, Abdulmajeed, Al-Kuwari.
 * Hematological abnormalities in clinically diagnosed non-alcoholic
 * steatohepatitis: prevalence, clinical correlates, and fibrosis risk
 * in a case-control study from Qatar. Frontiers in Medicine 13:1773499 (2026).
 * DOI: 10.3389/fmed.2026.1773499
 */

export const paper = {
  title:
    'Hematological abnormalities in clinically diagnosed non-alcoholic steatohepatitis: prevalence, clinical correlates, and fibrosis risk in a case–control study from Qatar',
  shortTitle: 'NASH × CBC — Qatar case–control study',
  authors: [
    { name: 'A. Al-Khinji', affil: [1, 2] },
    { name: 'D. Malouche', affil: [3], orcid: '0000-0002-0494-7141', corresponding: true },
    { name: 'N. Al-Thani', affil: [1] },
    { name: 'A. Mustafa', affil: [4] },
    { name: 'J. Abdulmajeed', affil: [4] },
    { name: 'M. G. Al-Kuwari', affil: [4] },
  ],
  affiliations: [
    { id: 1, text: 'College of Medicine, Qatar University, Doha, Qatar' },
    {
      id: 2,
      text: 'Translational Science Research Group, Health Cluster, Qatar University, Doha, Qatar',
    },
    {
      id: 3,
      text: 'Department of Mathematics and Statistics, College of Arts and Sciences, Qatar University, Doha, Qatar',
    },
    { id: 4, text: 'Primary Health Care Corporation (PHCC), Doha, Qatar' },
  ],
  journal: 'Frontiers in Medicine',
  citation: 'Front. Med. 13:1773499',
  year: 2026,
  doi: '10.3389/fmed.2026.1773499',
  url: 'https://doi.org/10.3389/fmed.2026.1773499',
  license: 'CC BY 4.0',
};

/* ────────────────── COHORT (Methods + Hero KPI) ────────────────── */

export const cohort = {
  total: 1788,
  nash: 894,
  controls: 894,
  nashWithCBC: 765, // 85.6%
  controlsWithCBC: 682, // 76.3%
  nashWithFIB4: 340, // 38.0% (FIB-4 subset)
  matching: '1:1 frequency-matched on age (5-year strata) and sex',
  source: 'PHCC electronic health records, Qatar',
  caseDefinition: 'ICD-10 codes K75.81, K76.0, K76.89',
};

/* ────────────────── TABLE 1 — Baseline characteristics ────────────────── */

export const baselineTable = {
  caption:
    'Table 1. Baseline characteristics of NASH cases and matched controls (n = 1,788).',
  rows: [
    {
      variable: 'Age, mean (SD), years',
      control: '50.3 (13.2)',
      nash: '50.3 (13.2)',
      p: '0.96',
    },
    {
      variable: 'Female sex, n (%)',
      control: '382 (42.7)',
      nash: '382 (42.7)',
      p: '1.00',
    },
    {
      variable: 'Diabetes mellitus, n (%)',
      control: '553 (61.9)',
      nash: '556 (62.2)',
      p: '0.92',
    },
    {
      variable: 'Hypertension, n (%)',
      control: '407 (45.5)',
      nash: '465 (52.0)',
      p: '0.007',
    },
    {
      variable: 'Dyslipidaemia, n (%)',
      control: '420 (47.0)',
      nash: '501 (56.0)',
      p: '<0.001',
    },
  ],
  note:
    'Cases and controls were matched 1:1 on age (5-year strata) and sex; metabolic comorbidities were not matching variables. P-values from t-test (age) and χ² (categorical).',
};

/* ────────────────── TABLE 2 — CBC medians (case vs control) ────────────────── */

export const cbcMedians = {
  caption:
    'Table 2. Complete blood count parameters in NASH cases (n = 765) and controls (n = 682). Median (IQR).',
  rows: [
    {
      parameter: 'Hemoglobin, g/dL',
      control: '13.5 (12.3–14.8)',
      nash: '13.7 (12.3–15.0)',
      p: '0.11',
    },
    {
      parameter: 'WBC, ×10⁹/L',
      control: '7.0 (5.7–8.2)',
      nash: '6.4 (5.2–8.0)',
      p: '<0.001',
    },
    {
      parameter: 'ANC, ×10⁹/L',
      control: '3.65 (2.78–4.76)',
      nash: '3.30 (2.46–4.33)',
      p: '<0.001',
    },
    {
      parameter: 'Platelets, ×10⁹/L',
      control: '261 (218–301)',
      nash: '235 (185–282)',
      p: '<0.001',
    },
  ],
  note: 'P-values from Wilcoxon rank-sum tests on complete-case data.',
};

/* ────────────────── TABLE 3 — Prevalence + OR (NASH vs Controls) ────────────────── */
/*  Numbers exact from R analysis of data.csv (Wald 95% CIs for proportions,
    GLM logit for ORs).                                                        */

export const prevalenceTable = {
  caption:
    'Table 3. Prevalence of CBC abnormalities in NASH cases vs. controls, with crude odds ratios (Figure 1).',
  rows: [
    {
      outcome: 'Anemia',
      controlPct: 21.7,
      controlCI: [18.6, 24.8],
      nashPct: 23.5,
      nashCI: [20.5, 26.5],
      or: 1.11,
      orCI: [0.87, 1.42],
      p: 0.41,
    },
    {
      outcome: 'Neutropenia',
      controlPct: 3.5,
      controlCI: [2.1, 4.9],
      nashPct: 5.4,
      nashCI: [3.8, 7.0],
      or: 1.55,
      orCI: [0.93, 2.63],
      p: 0.095,
    },
    {
      outcome: 'Thrombocytopenia',
      controlPct: 2.5,
      controlCI: [1.3, 3.7],
      nashPct: 15.4,
      nashCI: [12.9, 18.0],
      or: 7.13,
      orCI: [4.36, 12.42],
      p: '<0.001',
    },
    {
      outcome: 'Thrombocytosis',
      controlPct: 3.2,
      controlCI: [1.9, 4.6],
      nashPct: 3.1,
      nashCI: [1.9, 4.4],
      or: 0.97,
      orCI: [0.54, 1.76],
      p: 0.92,
    },
    {
      outcome: 'Abnormal platelets',
      controlPct: 5.7,
      controlCI: [4.0, 7.5],
      nashPct: 18.6,
      nashCI: [15.8, 21.3],
      or: 3.76,
      orCI: [2.62, 5.51],
      p: '<0.001',
    },
    {
      outcome: 'Any CBC abnormality',
      controlPct: 28.4,
      controlCI: [25.1, 31.8],
      nashPct: 35.8,
      nashCI: [32.4, 39.2],
      or: 1.4,
      orCI: [1.12, 1.75],
      p: 0.003,
    },
  ],
};

/* ────────────────── TABLE 4 — Within-NASH prevalences (Aim 2 donut) ────────── */

export const nashCohortPrevalence = {
  caption: 'Table 4. CBC abnormality prevalence within the NASH cohort (n = 765).',
  rows: [
    { outcome: 'Anemia', n: 180, pct: 23.5 },
    { outcome: 'Neutropenia', n: 41, pct: 5.4 },
    { outcome: 'Thrombocytopenia', n: 118, pct: 15.4 },
    { outcome: 'Thrombocytosis', n: 24, pct: 3.1 },
    { outcome: 'Any platelet abnormality', n: 142, pct: 18.6 },
    { outcome: 'Any CBC abnormality', n: 274, pct: 35.8 },
  ],
};

/* ────────────────── TABLE 5 — Model 1 (base, no FIB-4) ────────────────── */
/*  Multivariable logistic regression in NASH cohort; n = 765.            */

export const model1 = {
  caption:
    'Table 5. Adjusted odds ratios (Model 1) for CBC abnormalities within the NASH cohort (n = 765). Adjusted for age, sex, diabetes, hypertension, dyslipidaemia.',
  outcomes: [
    {
      outcome: 'Anemia',
      n: 765,
      aic: 775.5,
      terms: [
        { term: 'Age (per year)', or: 1.03, ci: [1.01, 1.05], p: 0.001 },
        { term: 'Female sex', or: 2.53, ci: [1.77, 3.64], p: '<0.001' },
        { term: 'Diabetes', or: 1.62, ci: [1.04, 2.56], p: 0.035 },
        { term: 'Hypertension', or: 1.04, ci: [0.68, 1.6], p: 0.84 },
        { term: 'Dyslipidaemia', or: 0.4, ci: [0.26, 0.6], p: '<0.001' },
      ],
    },
    {
      outcome: 'Neutropenia',
      n: 765,
      aic: 307.4,
      terms: [
        { term: 'Age (per year)', or: 1.07, ci: [1.04, 1.1], p: '<0.001' },
        { term: 'Female sex', or: 1.19, ci: [0.62, 2.31], p: 0.61 },
        { term: 'Diabetes', or: 0.97, ci: [0.44, 2.2], p: 0.94 },
        { term: 'Hypertension', or: 0.48, ci: [0.22, 1.04], p: 0.063 },
        { term: 'Dyslipidaemia', or: 0.39, ci: [0.19, 0.79], p: 0.009 },
      ],
    },
    {
      outcome: 'Abnormal platelets',
      n: 765,
      aic: 673.2,
      terms: [
        { term: 'Age (per year)', or: 1.04, ci: [1.03, 1.06], p: '<0.001' },
        { term: 'Female sex', or: 1.77, ci: [1.2, 2.63], p: 0.004 },
        { term: 'Diabetes', or: 2.1, ci: [1.25, 3.64], p: 0.006 },
        { term: 'Hypertension', or: 0.96, ci: [0.61, 1.54], p: 0.88 },
        { term: 'Dyslipidaemia', or: 0.78, ci: [0.5, 1.23], p: 0.28 },
      ],
    },
  ],
};

/* ────────────────── TABLE 6 — Model 2 (with FIB-4) ────────────────── */
/*  Same covariates plus continuous FIB-4. Restricted to n = 340 with
    available enzymes/platelets. Drives the forest plot in Figure 5.    */

export const model2 = {
  caption:
    'Table 6. Adjusted odds ratios (Model 2) including FIB-4 as a continuous predictor (n = 340 NASH patients with FIB-4 available).',
  outcomes: [
    {
      outcome: 'Anemia',
      n: 340,
      aic: 283.3,
      terms: [
        { term: 'Age (per year)', or: 1.0, ci: [0.97, 1.03], p: 0.98 },
        { term: 'Female sex', or: 4.4, ci: [2.37, 8.49], p: '<0.001' },
        { term: 'Diabetes', or: 1.43, ci: [0.69, 3.02], p: 0.34 },
        { term: 'Hypertension', or: 1.63, ci: [0.79, 3.45], p: 0.19 },
        { term: 'Dyslipidaemia', or: 0.37, ci: [0.18, 0.75], p: 0.006 },
        { term: 'FIB-4 (per 1 unit)', or: 1.53, ci: [1.21, 1.99], p: '<0.001' },
      ],
    },
    {
      outcome: 'Neutropenia',
      n: 340,
      aic: 117.3,
      terms: [
        { term: 'Age (per year)', or: 1.02, ci: [0.96, 1.08], p: 0.54 },
        { term: 'Female sex', or: 1.46, ci: [0.46, 4.72], p: 0.52 },
        { term: 'Diabetes', or: 1.55, ci: [0.42, 6.13], p: 0.51 },
        { term: 'Hypertension', or: 0.27, ci: [0.06, 1.09], p: 0.076 },
        { term: 'Dyslipidaemia', or: 0.72, ci: [0.2, 2.62], p: 0.61 },
        { term: 'FIB-4 (per 1 unit)', or: 1.28, ci: [0.87, 1.74], p: 0.144 },
      ],
    },
    {
      outcome: 'Abnormal platelets',
      n: 340,
      aic: 177.2,
      terms: [
        { term: 'Age (per year)', or: 0.96, ci: [0.92, 1.01], p: 0.11 },
        { term: 'Female sex', or: 5.28, ci: [2.23, 13.7], p: '<0.001' },
        { term: 'Diabetes', or: 1.18, ci: [0.42, 3.45], p: 0.76 },
        { term: 'Hypertension', or: 1.7, ci: [0.63, 4.8], p: 0.3 },
        { term: 'Dyslipidaemia', or: 1.95, ci: [0.71, 5.92], p: 0.21 },
        { term: 'FIB-4 (per 1 unit)', or: 3.6, ci: [2.31, 6.09], p: '<0.001' },
      ],
    },
  ],
};

/* ────────────────── FIGURE 3 — FIB-4 categorical distribution ────────────── */

export const fib4Distribution = {
  caption: 'Figure 3. Distribution of FIB-4 categories in NASH patients (n = 340).',
  categories: [
    { label: 'Low (<1.30)', n: 224, pct: 65.9, color: '#009e73' },
    { label: 'Indeterminate (1.30–2.67)', n: 87, pct: 25.6, color: '#e69f00' },
    { label: 'High (>2.67)', n: 29, pct: 8.5, color: '#d55e00' },
  ],
};

/* ────────────────── FIGURE 4 — CBC abnormalities by FIB-4 category ──────── */

export const cbcByFib4Category = {
  caption:
    'Figure 4. Prevalence of CBC abnormalities across FIB-4 categories in NASH patients (n = 340).',
  // Each row corresponds to one FIB-4 category; each metric is a % within that stratum.
  rows: [
    {
      category: 'Low (<1.30)',
      n: 224,
      anemia: 14.3,
      neutropenia: 3.1,
      abnormalPlatelets: 4.9,
      anyCBC: 20.1,
    },
    {
      category: 'Indeterminate (1.30–2.67)',
      n: 87,
      anemia: 18.4,
      neutropenia: 3.4,
      abnormalPlatelets: 11.5,
      anyCBC: 28.7,
    },
    {
      category: 'High (>2.67)',
      n: 29,
      anemia: 44.8,
      neutropenia: 10.3,
      abnormalPlatelets: 69.0,
      anyCBC: 79.3,
    },
  ],
};

/* ────────────────── FIGURE 2 — Distribution histograms (NASH cohort) ────── */
/*  Bin counts computed in R from data.csv. Bin midpoints are in clinical
    units. Thresholds shown as dashed reference lines in the chart.          */

export const distributions = {
  hgbMale: {
    label: 'Hemoglobin — males (NASH)',
    unit: 'g/dL',
    threshold: 13,
    thresholdLabel: 'Anemia threshold (M < 13)',
    n: 424,
    bins: [
      { mid: 6.75, count: 1 }, { mid: 8.25, count: 2 }, { mid: 8.75, count: 1 },
      { mid: 9.25, count: 4 }, { mid: 9.75, count: 1 }, { mid: 10.25, count: 7 },
      { mid: 10.75, count: 5 }, { mid: 11.25, count: 6 }, { mid: 11.75, count: 13 },
      { mid: 12.25, count: 5 }, { mid: 12.75, count: 23 }, { mid: 13.25, count: 31 },
      { mid: 13.75, count: 31 }, { mid: 14.25, count: 51 }, { mid: 14.75, count: 65 },
      { mid: 15.25, count: 61 }, { mid: 15.75, count: 48 }, { mid: 16.25, count: 39 },
      { mid: 16.75, count: 14 }, { mid: 17.25, count: 8 }, { mid: 17.75, count: 3 },
      { mid: 18.25, count: 2 }, { mid: 18.75, count: 1 }, { mid: 19.25, count: 2 },
    ],
  },
  hgbFemale: {
    label: 'Hemoglobin — females (NASH)',
    unit: 'g/dL',
    threshold: 12,
    thresholdLabel: 'Anemia threshold (F < 12)',
    n: 341,
    bins: [
      { mid: 6.75, count: 1 }, { mid: 7.25, count: 1 }, { mid: 7.75, count: 5 },
      { mid: 8.25, count: 2 }, { mid: 8.75, count: 4 }, { mid: 9.25, count: 2 },
      { mid: 9.75, count: 5 }, { mid: 10.25, count: 13 }, { mid: 10.75, count: 19 },
      { mid: 11.25, count: 27 }, { mid: 11.75, count: 43 }, { mid: 12.25, count: 40 },
      { mid: 12.75, count: 50 }, { mid: 13.25, count: 43 }, { mid: 13.75, count: 38 },
      { mid: 14.25, count: 29 }, { mid: 14.75, count: 9 }, { mid: 15.25, count: 6 },
      { mid: 15.75, count: 3 }, { mid: 16.75, count: 1 },
    ],
  },
  anc: {
    label: 'Absolute neutrophil count (NASH)',
    unit: '×10⁹/L',
    threshold: 1.5,
    thresholdLabel: 'Neutropenia threshold (< 1.5)',
    n: 765,
    bins: [
      { mid: 0.75, count: 7 }, { mid: 1.25, count: 34 }, { mid: 1.75, count: 69 },
      { mid: 2.25, count: 88 }, { mid: 2.75, count: 116 }, { mid: 3.25, count: 103 },
      { mid: 3.75, count: 97 }, { mid: 4.25, count: 83 }, { mid: 4.75, count: 52 },
      { mid: 5.25, count: 34 }, { mid: 5.75, count: 25 }, { mid: 6.25, count: 22 },
      { mid: 6.75, count: 16 }, { mid: 7.25, count: 6 }, { mid: 7.75, count: 2 },
      { mid: 8.25, count: 1 }, { mid: 8.75, count: 4 }, { mid: 9.25, count: 2 },
      { mid: 9.75, count: 2 }, { mid: 12.25, count: 1 }, { mid: 15.25, count: 1 },
    ],
  },
  platelets: {
    label: 'Platelet count (NASH)',
    unit: '×10⁹/L',
    threshold: 150,
    upperThreshold: 400,
    thresholdLabel: 'Thrombocytopenia (<150) / thrombocytosis (>400)',
    n: 765,
    bins: [
      { mid: 37.5, count: 7 }, { mid: 62.5, count: 17 }, { mid: 87.5, count: 21 },
      { mid: 112.5, count: 31 }, { mid: 137.5, count: 43 }, { mid: 162.5, count: 52 },
      { mid: 187.5, count: 84 }, { mid: 212.5, count: 87 }, { mid: 237.5, count: 114 },
      { mid: 262.5, count: 97 }, { mid: 287.5, count: 74 }, { mid: 312.5, count: 40 },
      { mid: 337.5, count: 37 }, { mid: 362.5, count: 18 }, { mid: 387.5, count: 19 },
      { mid: 412.5, count: 7 }, { mid: 437.5, count: 3 }, { mid: 462.5, count: 4 },
      { mid: 487.5, count: 4 }, { mid: 512.5, count: 1 }, { mid: 537.5, count: 1 },
      { mid: 637.5, count: 1 }, { mid: 662.5, count: 1 }, { mid: 687.5, count: 2 },
    ],
  },
  fib4: {
    label: 'FIB-4 score (NASH, x-axis trimmed at 8 for visibility)',
    unit: '',
    threshold: 1.3,
    upperThreshold: 2.67,
    thresholdLabel: 'FIB-4 cutoffs: 1.30 / 2.67',
    n: 340,
    bins: [
      { mid: 0.38, count: 41 }, { mid: 0.62, count: 64 }, { mid: 0.88, count: 67 },
      { mid: 1.12, count: 44 }, { mid: 1.38, count: 31 }, { mid: 1.62, count: 25 },
      { mid: 1.88, count: 15 }, { mid: 2.12, count: 12 }, { mid: 2.38, count: 7 },
      { mid: 2.62, count: 7 }, { mid: 2.88, count: 5 }, { mid: 3.12, count: 3 },
      { mid: 3.38, count: 3 }, { mid: 3.62, count: 2 }, { mid: 3.88, count: 2 },
      { mid: 4.12, count: 1 }, { mid: 4.62, count: 3 }, { mid: 5.38, count: 1 },
      { mid: 6.88, count: 1 }, { mid: 7.12, count: 2 }, { mid: 7.38, count: 1 },
      { mid: 7.88, count: 3 },
    ],
  },
};

/* ────────────────── FIBROSIS THRESHOLDS ────────────────── */

export const fibrosisCutoffs = {
  fib4: [
    { range: '< 1.30', interpretation: 'Low risk of advanced fibrosis', color: '#009e73' },
    { range: '1.30 – 2.67', interpretation: 'Indeterminate', color: '#e69f00' },
    { range: '> 2.67', interpretation: 'High risk', color: '#d55e00' },
  ],
  apri: [
    { range: '< 0.5', interpretation: 'Low likelihood of significant fibrosis', color: '#009e73' },
    { range: '0.5 – 1.5', interpretation: 'Indeterminate', color: '#e69f00' },
    { range: '> 1.5', interpretation: 'Likely cirrhosis', color: '#d55e00' },
  ],
};

/* ────────────────── BibTeX ────────────────── */

export const bibtex = `@article{AlKhinji2026NASH_CBC,
  author  = {Al-Khinji, A. and Malouche, D. and Al-Thani, N. and Mustafa, A. and Abdulmajeed, J. and Al-Kuwari, M. G.},
  title   = {Hematological abnormalities in clinically diagnosed non-alcoholic steatohepatitis: prevalence, clinical correlates, and fibrosis risk in a case--control study from Qatar},
  journal = {Frontiers in Medicine},
  volume  = {13},
  pages   = {1773499},
  year    = {2026},
  doi     = {10.3389/fmed.2026.1773499},
  url     = {https://doi.org/10.3389/fmed.2026.1773499}
}`;
