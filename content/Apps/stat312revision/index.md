---
date: "2026-08-05T00:00:00Z"
external_link: "https://stat312-revision.netlify.app/"
image:
  caption: "The STAT 312 home screen: a live countdown to each quiz and the midterm, a 14-week timeline of the syllabus, and quick links into the per-stage revision hubs, flashcards, and practice quizzes."
  focal_point: Smart
  preview_only: false
summary: "An offline-first revision app (PWA) for **STAT 312 — Stochastic Processes** at Qatar University (Fall 2026): a live semester timeline, per-stage revision hubs, spaced-repetition flashcards, an interactive practice-quiz engine built from the Fall 2026 sample quizzes, a searchable formula sheet, and an FAQ. Installable on phones, works fully offline — no backend, no accounts, all progress stored in the browser."
tags:
- statistics
- stochastic-processes
- markov-chains
- probability
- teaching
- education
- revision
- flashcards
- quizzes
- pwa
- offline
- web-app
- current
- stat312
title: "STAT 312 Revision — Stochastic Processes"
---

An offline-first revision web app (PWA) for **STAT 312 — Stochastic Processes**, Qatar University, Fall 2026. It gathers everything a student needs to revise the course into a single installable app that works with no network connection after first load.

## What the app does

- **Semester timeline.** A live countdown to each quiz and to the midterm, and a 14-week timeline of the syllabus with the assignment and quiz milestones marked on each week.
- **Revise by stage.** Per-stage revision hubs that group the material of the course into focused study units, each linking out to the relevant flashcards, worked examples, and formulas.
- **Flashcards.** A spaced-repetition flashcard deck for the definitions, theorems, and key results of the course.
- **Practice quizzes.** An interactive quiz engine built from the Fall 2026 sample quizzes and practice material, with instant feedback and worked solutions.
- **Formula sheet.** A searchable, KaTeX-rendered formula sheet covering the whole course.
- **Worked examples & FAQ.** Step-by-step solved problems and answers to the questions students ask most often.

## Technical notes

The app is a fully static, backend-free Progressive Web App built with vanilla HTML/CSS/JS (ES modules) — no framework and no build step. Mathematics is rendered with **KaTeX**, self-hosted so it renders offline. A service worker caches the app shell and all content, so the whole app (about 1 MB) installs on a student's phone and works completely offline. It follows the Qatar University maroon (`#8A1538`) visual identity, is mobile-first with light and dark modes, and stores all student progress locally in the browser — no accounts and no data leaving the device. The static bundle is deployed on Netlify.
