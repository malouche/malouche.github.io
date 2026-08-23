---
date: "2026-08-23T00:00:00Z"
external_link: "https://cellcalc.netlify.app/"
image:
  caption: "The CellCalc home screen: six bench calculators, each of which shows the formula, substitutes the user's own numbers, walks through the arithmetic step by step, and draws a live diagram."
  focal_point: Smart
  preview_only: false
summary: "A pedagogical calculator for the wet lab: solution mass, solution volume, dilution, serial dilution, cell counting and cell seeding. Rather than returning only a number, every calculator states the formula, substitutes the user's own values with units carried through each line, walks the arithmetic step by step, and draws a live diagram — a filling flask, dot-density beakers, or a well-plate mixing bar. Automatic unit conversion across M / mM / µM / nM and L / mL / µL, a one-click worked example, and reproducible R, Python and plain-text protocol export."
tags:
- laboratory
- teaching
- education
- cell-culture
- dilution
- calculator
- reproducibility
- katex
- pwa
- web-app
- current
title: "CellCalc — Learn the Calculation, Not Just the Answer"
---

**CellCalc** is a browser-based calculator for routine bench arithmetic in cell and molecular biology. It exists because the usual lab calculator hands back a number and hides the reasoning, which is precisely the part a student needs. Every calculator here shows the formula, substitutes the user's own values into it, carries the units through every line of the arithmetic, and draws a diagram that redraws as the inputs change.

## The six calculators

| Calculator | Question it answers | Relation |
|---|---|---|
| Solution mass | How much powder do I weigh out? | $m = C \times V \times M_w$ |
| Solution volume | What volume gives my target concentration? | $V = m / (M_w \times C)$ |
| Dilution | How much stock reaches a lower concentration? | $C_1 V_1 = C_2 V_2$ |
| Serial dilution | A ladder of dilutions, step by step | repeated $C_1 V_1 = C_2 V_2$ |
| Cell counting | How many cells are in my stock? | haemocytometer mean $\times$ dilution $\times 10^4$ |
| Cell seeding | How much cell stock and medium per plate? | $V_{\text{stock}} = (\text{cells per well} \times \text{wells}) / \text{density}$ |

## What makes it a teaching tool

- **Live visualisation.** A flask with the solute dropping in and the fill line marked; dot-density beakers in which the stock fraction equals $C_2/C_1 = V_1/V_2$, so a fold dilution is legible at a glance; a well-plate grid with a stock-versus-medium mixing bar.
- **Worked solution.** Numbered steps rendered with KaTeX, with units propagated explicitly rather than dropped and reinstated at the end.
- **Solve for any variable.** In the dilution calculator, choose which of $C_1$, $V_1$, $C_2$, $V_2$ is unknown; the other three stay editable.
- **Automatic unit conversion.** Concentrations in M / mM / µM / nM and volumes in L / mL / µL can be mixed freely; each field is converted to base SI internally and the result reported back in the unit the user chose.
- **Diagnostics.** Plain warnings when $C_2 > C_1$ (a likely unit mix-up), when the required stock volume exceeds the final volume, or when a result comes out negative or inconsistent.
- **"Load example" and "Why this works".** One click fills a realistic problem, and a short plain-language panel explains the concept behind each formula.
- **Reproducible export.** The same calculation as **R** code, **Python** code, or a plain-text protocol block, copied with one button — so what was done at the bench can be pasted into a lab notebook or a script.

## Technical notes

A plain static site — vanilla HTML/CSS/JS, no framework and no build step — with light and dark themes and a responsive layout. Mathematics is rendered with [KaTeX](https://katex.org/). All computation runs client-side; nothing is transmitted. Deployed on Netlify.

> A teaching tool. Critical calculations should always be double-checked against the protocol in use.
