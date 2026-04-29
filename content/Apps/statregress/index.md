---
date: "2026-04-25T00:00:00Z"
external_link: "https://statregress.netlify.app/"
image:
  caption: "Simple OLS fit (left) with the corresponding residuals-vs-fitted diagnostic (right). The drag-a-point mode lets students perturb a single observation and watch the fit, $R^{2}$, and residual structure update in real time."
  focal_point: Smart
  preview_only: false
summary: "A teaching-focused, browser-only workbench for linear regression: paste a CSV, fit an OLS model, and read the standard coefficient table, model summary, and residual diagnostics — with a drag-a-point mode for simple regression that updates the fit live. Companion to **StatTables** and **StatTests**; everything runs client-side, no data leaves the browser."
tags:
- regression
- OLS
- linear-model
- coefficients
- standard-errors
- t-test
- F-test
- R-squared
- residuals
- diagnostics
- QQ-plot
- leverage
- cooks-distance
- teaching
- education
- react
- web-app
- current
title: "StatRegress — Linear Regression Workbench"
---

An interactive web application that fits and diagnoses ordinary least-squares regression models entirely in the student's browser. **StatRegress** completes a small family of teaching tools designed for undergraduate statistics at Qatar University: where **StatTables** answers *what is the critical value* and **StatTests** answers *which test do I run*, **StatRegress** asks *given these data, what is the model — and is it any good?*

## Why a regression workbench?

Most introductory regression instruction is split between (i) computing $\hat{\beta}$, $\mathrm{SE}(\hat{\beta})$, $t$- and $F$-statistics by hand on toy data and (ii) demonstrating the same calculations in R or Python with `lm()`/`statsmodels`. Both have pedagogical limits: hand calculations don't scale beyond $n \approx 10$, while a full statistical environment hides the geometry of the fit behind a console output. StatRegress sits between the two — students paste a real dataset, see the regression line drawn directly on the scatter, and read the standard coefficient table and diagnostic plots in the same view, with no installation and no server round-trip.

## What the app does

**Input.** Paste a CSV (or load one of the bundled teaching datasets), choose the response and the predictor(s), and select the assumed model (simple linear regression, multiple regression with up to a small handful of predictors, or polynomial extension).

**Estimation output.** A regression report formatted as in a textbook:

- the **coefficient table** with $\hat{\beta}_{j}$, $\mathrm{SE}(\hat{\beta}_{j})$, $t_{j} = \hat{\beta}_{j}/\mathrm{SE}(\hat{\beta}_{j})$, the two-sided $p$-value, and the $95\%$ confidence interval;
- the **model summary**: residual standard error $\hat{\sigma}$, multiple $R^{2}$, adjusted $R^{2}$, and the global $F$-test for $H_{0}: \beta_{1} = \cdots = \beta_{p} = 0$;
- the **ANOVA decomposition** of the total sum of squares.

**Diagnostic output.** The four classical residual plots — residuals vs.\ fitted values, normal Q–Q plot of standardised residuals, scale–location ($\sqrt{|r_{i}|}$ vs.\ $\hat{y}_{i}$), and residuals vs.\ leverage with **Cook's distance** contours — together with a flag for influential or high-leverage observations.

## Drag-a-point mode

For simple linear regression the app exposes a **drag-a-point** interaction: students grab a single observation in the scatter, move it, and the fitted line, $R^{2}$, the coefficient table, and the residuals all update in real time. This makes intuitive what an algebraic discussion of leverage and influence usually fails to convey — that a single high-leverage point can rotate the line, that an outlier in the middle of the design space barely moves the slope, and that Cook's distance is geometric in nature.

## Classroom workflow

In lectures, the instructor mirrors the app on the projector while building the model on the board: each new term in the algebra has its counterpart in the live coefficient table. In practice sessions, students paste their assigned dataset, copy the coefficient table and diagnostic plots into their solution, and report which assumptions look satisfied, which look suspicious, and which observations they would investigate further. Because the app produces a deterministic report from a deterministic input, grading is reproducible.

## Technical notes

The app is a single-page client-side application built with **React**: all computation runs in the student's browser, with no server round-trip and no data leaving the device. The OLS estimator is computed via the QR decomposition for numerical stability; standard errors and inference are obtained from the corresponding $(X^{\top}X)^{-1}$ block. Distributional quantiles for the $t$ and $F$ tables are computed with the [jStat](https://github.com/jstat/jstat) numerical library (MIT-licensed). The static bundle is deployed on Netlify; like its siblings, it works offline after first load and has no external run-time dependencies.
