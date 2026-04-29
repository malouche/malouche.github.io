---
date: "2026-04-29T00:00:00Z"
external_link: "https://stat-corr-755.netlify.app/"
image:
  caption: "Scatter plot with the fitted regression line, the Pearson correlation coefficient $r$, and the corresponding hypothesis test for $H_{0}:\\rho = 0$ — students can drag points and watch $r$, the slope, and the $p$-value update in real time."
  focal_point: Smart
  preview_only: false
summary: "An interactive teaching tool for the correlation coefficient: paste a bivariate dataset (or use a generator), and the app reports Pearson, Spearman, and Kendall coefficients with their inference, the scatter plot, and a Fisher-$z$ confidence interval for $\\rho$. Companion to **StatTables**, **StatTests**, **StatRegress**, **StatCI**, and **StatPower** — runs entirely in the browser, no backend."
tags:
- statistics
- correlation
- pearson
- spearman
- kendall
- fisher-z
- teaching
- education
- react
- vite
- web-app
- current
- statcorr
title: "StatCorr — Correlation Workbench"
---

A browser-only teaching workbench for the most-used dependence summary in applied statistics: the **correlation coefficient**. **StatCorr** completes the small family of teaching tools developed for undergraduate statistics at Qatar University, alongside **StatTables**, **StatTests**, **StatRegress**, **StatCI**, and **StatPower**.

## Why a correlation workbench?

In introductory courses the Pearson coefficient $r$ is often introduced as a single number and then immediately overloaded with interpretations — *strength*, *direction*, *linearity*, *predictive value*, *dependence*. Students leave the lecture confusing the four. **StatCorr** keeps the four interpretations visually separate: the scatter plot makes the *geometry* of the association explicit, the coefficient panel reports its *magnitude*, the inference panel reports the *evidence* against $H_{0}: \rho = 0$, and the rank-based panel shows when the linear summary is misleading.

## What the app does

**Input.** Paste a CSV with two numeric variables, load one of the bundled teaching datasets, or use the simulator to draw $n$ observations from a chosen joint distribution (bivariate normal with prescribed $\rho$, monotone-but-non-linear, or contaminated with outliers).

**Coefficients reported.** For every dataset the app reports three coefficients side by side:

- the **Pearson** correlation $r = \dfrac{\sum (x_{i}-\bar x)(y_{i}-\bar y)}{\sqrt{\sum (x_{i}-\bar x)^{2}\sum (y_{i}-\bar y)^{2}}}$, with the Fisher-$z$ confidence interval $\tanh\!\big(\operatorname{atanh}(r) \pm z_{1-\alpha/2}/\sqrt{n-3}\big)$ and the $t$-test for $H_{0}: \rho = 0$;
- the **Spearman** rank correlation $\rho_{s}$ — robust to monotone transformations and to outliers — with its asymptotic test;
- the **Kendall** $\tau$, reported with the exact small-sample distribution when feasible.

**Visual output.** A scatter plot with the regression line, the marginal histograms, and a $95\%$ confidence ellipse for the joint distribution is drawn alongside the coefficient table. A drag-a-point interaction lets students pull a single observation and watch the three coefficients, the regression line, and the $p$-values update — making vivid the difference between a Pearson coefficient that collapses under one outlier and a Spearman coefficient that does not.

## Pedagogical use

StatCorr is designed for the lecture in which correlation is introduced and for the practical that follows it. Three exercises map naturally to the app:

1. **Linear vs. monotone vs. independent.** Generate samples from a bivariate normal, from $Y = X^{3}+\varepsilon$, and from $Y = X^{2} + \varepsilon$ on $[-1,1]$. Compare Pearson, Spearman, and Kendall, and discuss why $r \approx 0$ does **not** imply independence.
2. **Outlier sensitivity.** Pin a Pearson coefficient near $0.9$, then drag a single point far from the cloud and watch $r$ collapse while $\rho_{s}$ and $\tau$ barely move.
3. **Inference vs. magnitude.** With $n = 5$ a sample correlation of $0.6$ is not significantly different from zero; with $n = 500$ a sample correlation of $0.1$ is. The Fisher-$z$ interval makes both statements explicit on a single graph.

## Technical notes

The app is a single-page client-side application built with **React + Vite**: all computation runs in the student's browser, with no server round-trip and no data leaving the device. Quantiles for the $t$ and standard normal distributions used for inference and for the Fisher-$z$ interval are computed with the [jStat](https://github.com/jstat/jstat) numerical library (MIT-licensed). Random samples for the simulator are produced from a high-quality PRNG seeded by the user, so that classroom demonstrations are reproducible across machines. The static bundle is deployed on Netlify; like its siblings it works offline after first load and has no external run-time dependencies.
