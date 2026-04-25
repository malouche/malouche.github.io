---
date: "2026-04-25T00:00:00Z"
external_link: "https://statpower-malouche.netlify.app/"
image:
  caption: "Power curve $1-\\beta$ as a function of the sample size $n$ for a two-sample $t$-test at fixed $\\alpha$ and effect size $d$. The required $n$ to achieve the target power is read directly from the curve."
  focal_point: Smart
  preview_only: false
summary: "An interactive teaching tool for study design — pick a hypothesis test, enter any three of $\\{$effect size, $n$, $\\alpha$, power$\\}$, and the app solves for the fourth and plots the power curve. Companion to **StatTables**, **StatTests**, **StatCI**, and **StatRegress**; runs entirely in the browser, no backend."
tags:
- statistics
- power-analysis
- sample-size
- hypothesis-testing
- cohen-d
- t-test
- study-design
- teaching
- react
- vite
- web-app
title: "StatPower — Power & Sample-Size Calculator"
---

A browser-only calculator and visualiser for the four-quantity relationship that governs the design of a statistical study: **effect size**, **sample size $n$**, **type-I error $\alpha$**, and **power $1-\beta$**. **StatPower** treats these four quantities symmetrically — fix any three and the app solves for the fourth — and accompanies the numerical answer with the corresponding power curve, so that the student sees what a $5\%$ change in $n$ or in $d$ does to the chance of a true rejection.

## The four-quantity rule

For a fixed test, the relationship $\Pr(\text{reject } H_{0} \mid H_{1}) = 1 - \beta(d, n, \alpha)$ implicitly ties together $d$, $n$, $\alpha$, and the resulting power $1-\beta$. Any three of these determine the fourth. StatPower exposes this as a single interface: enter three of the four quantities and the app returns the fourth and draws the curve along which it sits.

## Tests covered

**Means.** One-sample $t$-test ($d = (\mu - \mu_{0})/\sigma$), paired $t$-test (on differences), two-sample $t$-test (Cohen's $d$, pooled SD), one-way ANOVA (Cohen's $f$).

**Proportions.** One-proportion $z$-test, two-proportion $z$-test (Cohen's $h$ or risk-difference parameterisation).

**Correlation and association.** Test of $\rho = 0$ (Fisher $z$-transform), $\chi^{2}$ test of independence (Cohen's $w$).

**Regression.** Global $F$-test for $H_{0}: \beta_{1} = \cdots = \beta_{p} = 0$ (Cohen's $f^{2}$), single-coefficient $t$-test in multiple regression.

For each test the app reports the non-centrality parameter (e.g., $\lambda = d\sqrt{n/2}$ for a two-sample $t$-test) so that students see the algebra behind the answer rather than receiving a black-box number.

## What the user sees

Three coordinated panels respond to every change of inputs:

- a **scalar answer panel** showing the solved quantity to four significant figures;
- the **power curve** $1-\beta$ as a function of the chosen free axis (typically $n$ or $d$), with the operating point marked and the target power drawn as a horizontal reference;
- a **distribution panel** with the null and alternative reference distributions overlaid, the rejection region shaded, and the geometric area corresponding to $\beta$ — the type-II error — highlighted, so that the tradeoff between $\alpha$ and $\beta$ is visible rather than merely stated.

## Classroom workflow

In lectures, the instructor steps through the four-quantity rule by varying one input at a time and watching the curve and the geometry update. In assignments, students paste a target effect size and target power and report the required $n$, together with the non-centrality parameter and the curve they read it from — making grading deterministic and removing the ambiguity that surrounds the choice of effect-size convention. The app is a natural complement to the inferential procedures in **StatTests**: the design of the study and its analysis use the same reference distributions, displayed in the same shaded form.

## Technical notes

The app is a single-page client-side application built with **React + Vite** and styled with **Tailwind CSS**: all computation runs in the student's browser, with no server round-trip. The non-central $t$, $F$, and $\chi^{2}$ distributions used to evaluate power, and the central distributions used for critical values, are computed with the [jStat](https://github.com/jstat/jstat) numerical library (MIT-licensed); inverse problems (solving for $n$ or $d$) are obtained by safeguarded bisection on the monotone power function. The static bundle is deployed on Netlify; like its siblings, it works offline after first load and has no external run-time dependencies.
