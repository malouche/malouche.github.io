---
date: "2026-05-02T00:00:00Z"
external_link: "https://stat-anova.netlify.app/"
image:
  caption: "Upload a CSV, pick a factor and several continuous responses, and read the F-test, the compact-letter-display (CLD) table from Tukey HSD, and a forest plot of pairwise differences — all in the browser."
  focal_point: Smart
  preview_only: false
summary: "A teaching-focused, browser-only workbench for one-way analysis of variance: load a CSV, choose a factor (2–6 levels) and one or more continuous responses, and read the ANOVA table, the compact-letter-display (CLD) summary from Tukey HSD, and a forest plot of pairwise mean differences. Companion to **StatTests**, **StatRegress**, and **StatTables** — runs entirely client-side, no data leaves the browser."
tags:
- ANOVA
- one-way-ANOVA
- F-test
- Tukey-HSD
- post-hoc
- multiple-comparisons
- compact-letter-display
- pairwise-differences
- forest-plot
- statistics
- teaching
- education
- react
- vite
- web-app
- current
title: "StatANOVA — One-way ANOVA & Tukey HSD Workbench"
---

An interactive web application that fits a one-way analysis of variance and its standard post-hoc decomposition entirely in the student's browser. **StatANOVA** extends the small family of teaching tools designed for undergraduate statistics at Qatar University: where **StatTests** answers *which test do I run on these two groups* and **StatRegress** asks *given these data, what is the model*, **StatANOVA** asks *do these $k$ groups differ on average — and if so, which ones?*

## Why an ANOVA workbench?

The pedagogical gap StatANOVA targets is the step from the global $F$-test to a defensible per-pair conclusion. In a typical lecture, students are taught the $F$-statistic for the equality-of-means hypothesis $H_{0}: \mu_{1} = \cdots = \mu_{k}$, but the natural next question — *which groups are responsible for the rejection?* — is usually answered with a quick remark about Tukey's honestly significant difference. StatANOVA closes that loop interactively: the student uploads a real dataset, reads the ANOVA decomposition, and immediately sees the Tukey HSD intervals, the family-wise adjusted $p$-values, and the resulting compact-letter-display (CLD) groupings on the same screen.

## What the app does

**Input.** Upload a CSV (UTF-8, header row, comma-separated, dot decimal, $\le 10$ MB and $\le 50{,}000$ rows after dropping NAs). The app inspects the columns and proposes:

- a **factor variable** — any column with between 2 and 6 distinct values, with at least 3 observations per level after listwise deletion;
- one or more **continuous response variables** — numeric columns selectable in a checklist, capped at 50 active responses.

The student then chooses the significance level $\alpha$ and the post-hoc method (Tukey HSD by default).

**Inferential output.** For each selected response, the app reports:

- the **ANOVA summary table** (sums of squares, degrees of freedom, mean squares, the $F$-statistic, and the corresponding $p$-value);
- the **compact-letter-display (CLD) table**: each group is annotated with letters such that two groups share at least one letter if and only if their means are not significantly different at level $\alpha$ under the chosen multiple-comparison correction;
- a **forest plot of pairwise mean differences** with simultaneous confidence intervals, ordered for readability, with intervals that exclude zero highlighted.

Because the workflow runs across many response variables in a single pass, StatANOVA is well suited to the kind of multivariate teaching dataset (Qatar Biobank-style, biomedical, or biodiversity) where a single grouping factor is to be screened against several outcomes.

## Classroom workflow

In lectures, the instructor mirrors the app on the projector while writing the model on the board: the algebraic decomposition $\mathrm{SS}_{\text{total}} = \mathrm{SS}_{\text{between}} + \mathrm{SS}_{\text{within}}$ is read off the same table the students see. In practice sessions, students upload their assigned CSV, copy the ANOVA table, the CLD summary, and the forest plot into their report, and explain in one paragraph (i) whether the global $F$-test rejects, (ii) which pairs of groups differ once the family-wise error is controlled, and (iii) how the CLD letters and the forest plot tell the same story in two complementary forms.

## Technical notes

The app is a single-page client-side application: all computation runs in the browser, with no server round-trip and no data leaving the device. The ANOVA decomposition is computed directly from the group means and pooled variance estimator; Tukey HSD intervals use the studentised-range distribution at the chosen family-wise level; the CLD is constructed by the standard insert-and-absorb algorithm on the matrix of adjusted $p$-values. The static bundle is deployed on Netlify; like its siblings, it works offline after first load and has no external run-time dependencies.
