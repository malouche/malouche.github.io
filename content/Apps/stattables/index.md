---
date: "2026-03-12T00:00:00Z"
# TODO: once the Streamlit deployment URL is known, paste it here
# (e.g. https://stattables.streamlit.app/). Leaving empty makes the card
# open the detail page below instead of launching the external app.
external_link: ""
image:
  caption: "Z, t, $\\chi^{2}$ and F densities with the upper 5% tail of the standard normal shaded."
  focal_point: Smart
  preview_only: false
summary: "An interactive replacement for the Z, t, $\\chi^{2}$ and F tables at the back of a statistics textbook — query any critical value or tail probability without flipping through printed tables."
tags:
- stattables
title: "Statistical Distribution Tables"
---

An interactive web application that replaces the printed **Z**, **t**, **$\chi^{2}$** and **F** distribution tables that traditionally sit at the back of introductory statistics textbooks. The app is designed for undergraduate courses in statistical inference, probability, and applied statistics at Qatar University, and is freely available to students and instructors elsewhere.

## Why not the printed tables?

Classical textbook tables are fixed to a handful of significance levels (typically $\alpha \in \{0.10, 0.05, 0.025, 0.01, 0.005\}$) and to a limited grid of degrees of freedom. In practice, students need critical values and tail probabilities at arbitrary points — and instructors want them reproducible, shareable, and annotated. This app returns exact values for any query and shows the corresponding shaded region on the density curve, so the numerical answer is always paired with the geometric intuition.

## Distributions covered

- **Standard normal** $Z \sim \mathcal{N}(0,1)$ — critical values $z_{\alpha}$, two-sided cutoffs $z_{\alpha/2}$, and tail probabilities $P(Z > z)$.
- **Student $t$** — $t_{\alpha,\nu}$ for any degrees of freedom $\nu$, useful for one- and two-sample $t$-tests and confidence intervals for the mean under unknown variance.
- **Chi-square $\chi^{2}$** — lower and upper critical values $\chi^{2}_{\alpha,\nu}$ for variance tests, goodness-of-fit, and tests of independence.
- **Fisher $F$** — $F_{\alpha, \nu_{1}, \nu_{2}}$ for analysis of variance, regression overall-significance tests, and variance-ratio comparisons.

## How students use it

Two directions are supported for every distribution:

1. **Cutoff $\rightarrow$ probability.** Given a value of the test statistic, obtain the one- or two-tailed $p$-value.
2. **Probability $\rightarrow$ cutoff.** Given a significance level $\alpha$, obtain the corresponding critical value.

Each query is accompanied by a shaded density plot indicating the region that the reported probability refers to, removing the ambiguity that often surrounds one- vs. two-tailed procedures.

## Classroom workflow

The app is intended as an in-class replacement for the printed appendix tables. During exercises, students paste the query parameters they used into their solution; during exams, the app's screen can be mirrored on the instructor's display so the class works from a shared source of truth. The accompanying solution sheets indicate the exact query, not a table row, making grading deterministic and self-checkable.

## Technical notes

The app is built in Python and deployed on Streamlit Community Cloud, with the underlying quantiles computed via `scipy.stats`. Source code and deployment instructions are maintained in a public GitHub repository; contributions (additional distributions, language translations, accessibility improvements) are welcome.
