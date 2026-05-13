---
date: "2026-05-11T00:00:00Z"
external_link: "https://nash-cbc-dashboard.netlify.app/"
image:
  caption: "Sex-stratified CBC reference limits and group-wise distributions of haematological parameters in NASH versus non-NASH participants, drawn from the companion dataset of Al-Khinji et al. (2026, *Frontiers in Medicine*)."
  focal_point: Smart
  preview_only: false
summary: "An interactive companion dashboard for **Al-Khinji et al. (2026)**, *Frontiers in Medicine* — a Qatar Biobank study of hematological abnormalities in non-alcoholic steatohepatitis (NASH). The app lets the reader explore the cohort, recompute sex-stratified **CBC reference limits**, and reproduce the group-comparison results of the paper directly from the browser."
tags:
- nashcbc
- NASH
- non-alcoholic-steatohepatitis
- hepatology
- hematology
- CBC
- complete-blood-count
- reference-limits
- reference-intervals
- Qatar-Biobank
- biostatistics
- biomedical-statistics
- frontiers-in-medicine
- companion-dashboard
- reproducible-research
- react
- vite
- web-app
title: "NASH × CBC — Interactive Companion Dashboard (Al-Khinji et al., 2026)"
---

An interactive **companion dashboard** for the paper *Hematological abnormalities in non-alcoholic steatohepatitis: a Qatar Biobank study* (Al-Khinji, Malouche, et al., 2026, **Frontiers in Medicine**). The dashboard accompanies the printed manuscript: every figure that appears in the paper can be regenerated in the browser, and every reference limit reported in the text can be recomputed under the reader's own choice of subgroup and percentile.

## Why a companion dashboard?

In hepatology, the link between **non-alcoholic steatohepatitis (NASH)** and the haematological profile is increasingly recognised, but the supporting evidence is scattered across cohorts with different inclusion criteria, different assay platforms, and different ways of reporting reference limits. The paper draws on the Qatar Biobank cohort to characterise the **complete blood count (CBC)** in NASH versus matched non-NASH adults, and to derive sex-stratified reference limits that are directly applicable to the regional population. The dashboard makes that analysis transparent and reproducible: a reader can read the published figure, then re-run it on the same data under a different filter, and see exactly how the conclusion changes.

## What the app does

**Cohort browser.** A first panel describes the analytic cohort — NASH and non-NASH participants drawn from Qatar Biobank — and lets the reader filter on sex, age band, BMI band, and the standard cardiometabolic comorbidities used as covariates in the paper. Sample sizes update in real time, so the reader can see how each filtering choice affects statistical power.

**CBC reference limits.** A dedicated *Reference limits* section (`#limits`) reports the central **97.5%** non-parametric reference interval for each CBC parameter — haemoglobin, haematocrit, red-cell indices (MCV, MCH, MCHC), platelets, total and differential leucocytes — stratified by sex and, optionally, by age band. The lower and upper bounds are computed by the 2.5th and 97.5th empirical percentiles with bootstrap 90% confidence bands, following the **CLSI EP28-A3c** guideline for reference-interval estimation. The reader can swap the central proportion (90%, 95%, 99%), switch between non-parametric and robust (Horn–Pesce) estimators, and export the resulting table as CSV.

**Group comparisons.** A *NASH vs. non-NASH* panel reproduces the paper's primary inferential output: for each CBC parameter, the dashboard reports the unadjusted mean (or median, depending on skewness) in each group, the standardised mean difference with its 95% confidence interval, and the *p*-value of the Wilcoxon rank-sum test, all stratified by sex. The same panel renders the corresponding overlaid density plot and the per-group box-and-whisker plot.

**Adjusted models.** An *Adjusted models* panel re-fits the multivariable logistic regression of NASH status on each CBC parameter, adjusting for age, sex, BMI, diabetes status, and hypertension. The reader sees the odds-ratio forest plot and the corresponding **likelihood-ratio** and **Wald** tests, with the same model formula and the same reference categories as in the paper.

## Reading the dashboard alongside the paper

Every figure in the manuscript has a matching panel in the dashboard, and every numerical claim in the *Results* section can be reproduced by reading the corresponding cell of the dashboard's tables. The reader is therefore invited to read the paper and the dashboard side by side: the manuscript explains *what was done and what was found*; the dashboard makes it possible to verify the numbers, and to extend the analysis to a slightly different subgroup without re-implementing the pipeline.

## Technical notes

The dashboard is a single-page client-side application built with **React + Vite**; all computation runs in the reader's browser, with no server round-trip and no patient-level data leaving the device. Percentile estimation uses the standard non-parametric estimator with the Hyndman–Fan type-7 definition for quantiles; bootstrap confidence bands use 2{,}000 resamples with the percentile method; the logistic regression is fit by Newton–Raphson with ridge regularisation as a fall-back when the design matrix is near-singular. The static bundle is deployed on **Netlify**; it works offline after first load and has no external run-time dependencies.

Citation: Al-Khinji A., Malouche D., et al. *Hematological abnormalities in non-alcoholic steatohepatitis: a Qatar Biobank study.* **Frontiers in Medicine**, 2026.
