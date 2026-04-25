---
date: "2026-04-25T00:00:00Z"
external_link: "https://stat-tests-malouche.netlify.app/"
image:
  caption: "Two-tailed Student-$t$ rejection region with the observed test statistic and the corresponding $p$-value."
  focal_point: Smart
  preview_only: false
summary: "A browser-based teaching tool that runs 14 of the most common hypothesis tests — for means, proportions, variances, ANOVA, $\\chi^{2}$, and non-parametric problems — with step-by-step formulas, shaded rejection regions, and automatic assumption checks. Sister application to **StatTables**, designed to replace the test-by-test recipes traditionally given in the appendix of an introductory statistics textbook."
tags:
- statistics
- hypothesis-testing
- teaching
- p-value
- t-test
- ANOVA
- chi-square
- non-parametric
- react
- web-app
title: "StatTests — Hypothesis Testing Hub"
---

An interactive web application that performs the hypothesis tests covered in a standard one- or two-semester course in statistical inference, with a uniform interface, fully visible formulas, and automatic checking of the assumptions on which each procedure depends. The app is the natural complement to **StatTables**: where StatTables answers *what is the critical value* and *what is the tail probability*, StatTests answers *which test do I run, and what does the conclusion look like*.

## Why a unified hub?

Most introductory textbooks present each test as a self-contained recipe — formula for the test statistic, sampling distribution under $H_{0}$, decision rule, and example. In practice, students confuse the recipes, mis-identify the appropriate distribution, and forget to verify the assumptions. **StatTests** unifies all the standard procedures behind a single interface: pick the inference problem (one mean, two means, proportion, variance ratio, ANOVA, association, location shift, …), enter the data or the summary statistics, and the app returns a complete inference report consisting of:

- the explicit hypotheses $H_{0}$ vs.\ $H_{1}$ in the chosen direction (left, right, two-sided);
- the test statistic and its formula, with all values substituted;
- the reference distribution, displayed with the rejection region(s) shaded;
- the $p$-value, the critical value(s), and the decision at the user-selected $\alpha$;
- a checklist of the parametric assumptions, marked as satisfied, suspicious, or violated when checkable from the data.

## Tests covered

The current release implements 14 procedures grouped by inferential goal:

**Means.** One-sample $t$-test, paired $t$-test, two-sample $t$-test (pooled and Welch), one-way ANOVA.

**Proportions.** One-proportion $z$-test, two-proportion $z$-test.

**Variances.** Chi-square test for a single variance, $F$-test for the ratio of two variances, Bartlett / Levene-style homogeneity check feeding into ANOVA.

**Categorical.** $\chi^{2}$ goodness-of-fit, $\chi^{2}$ test of independence in a contingency table.

**Non-parametric.** Wilcoxon signed-rank (one-sample and paired), Mann–Whitney $U$ (two-sample location), Kruskal–Wallis (one-way location across $k > 2$ groups).

## Classroom workflow

In lectures, the instructor mirrors the app on the projector and walks through a worked example: the formula panel shows exactly the algebra the instructor would write on the board, while the shaded density panel makes the geometry of the decision rule explicit. In practice sessions and exams, students paste the inputs they used together with the resulting $p$-value, which makes grading deterministic and removes ambiguity around one- vs. two-tailed conventions. The accompanying solution sheets cite the exact query rather than a row in a table.

## Technical notes

The app is a single-page client-side application built with **React**: all computation runs in the student's browser, with no server round-trip. Distributional computations rely on the [jStat](https://github.com/jstat/jstat) numerical library (MIT-licensed). The static bundle is deployed on Netlify, which means it works offline after first load and has no external dependencies at run time.
