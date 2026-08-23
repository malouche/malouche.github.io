---
date: "2026-08-23T00:00:00Z"
external_link: "https://stat481-revision.netlify.app/"
image:
  caption: "The STAT 481 \"Today\" screen: the size of the card bank, the countdown to the next lecture, quiz and R lab, and the seven stage plates with the fraction of cards at Leitner box 3 or better."
  focal_point: Smart
  preview_only: false
summary: "An offline-first revision app (PWA) for **STAT 481 — Multivariate Analysis** at Qatar University (Fall 2026). Every card, formula, R snippet and question is extracted automatically from the course LaTeX notes and carries a stable reference back to the file and line it came from, so nothing is paraphrased. Leitner spaced repetition, a searchable formula index, verbatim R output, timed practice exams that unlock only after the paper has been sat, and 56 course figures — all installable, fully offline, with every keystroke of progress kept on the student's own device."
tags:
- statistics
- multivariate-analysis
- teaching
- education
- revision
- flashcards
- spaced-repetition
- quizzes
- pwa
- offline
- typescript
- vite
- web-app
- current
- stat481
title: "STAT 481 Revision — Multivariate Analysis"
---

An offline-first revision web app (PWA) for **STAT 481 — Multivariate Analysis**, Qatar University, Fall 2026. It is the multivariate companion to the [STAT 312 revision app](https://stat312-revision.netlify.app/), built on the same principle: a student should be able to revise the whole course from a phone, on a plane, with no account and no network.

## Content is extracted, not rewritten

The distinguishing feature of this app is that **no content is authored inside it**. A build-time extractor walks the course's own LaTeX sources and pulls out every definition, theorem, fact, formula, R chunk and exam question. Each item carries the file, the environment and the line it came from, and prints a short stable reference such as `L11-fact-01` that resolves straight back to that line in the notes. R output is copied verbatim from the session that produced the notes; a chunk that printed nothing ships without output rather than with invented output.

An editorial override layer sits on top of the extractor for the cases where the notes need a gloss, and a content-fingerprint identity map keeps item ids stable across re-extraction, so a student's progress survives a rebuild of the bank. A validation gate refuses to deploy on any failure — a broken KaTeX macro fails at build time, with a file and a line, instead of reaching a phone as raw `\bSigma`.

## What the app does

- **Revise by stage.** The course is divided into seven stages, each with a hand-drawn plate, grouping the lectures into coherent study blocks.
- **Flashcards with spaced repetition.** A Leitner scheduler drives the review queue, weighted by how near the next assessment is.
- **Formula index.** Every formula in the course, searchable, rendered with KaTeX at build time.
- **R lab.** The R snippets of the course with their verbatim output, so the code a student revises is the code that produced the figures in the notes.
- **Timed practice exams.** Past quizzes and the midterm, gated by date: a paper becomes available the day after it is administered, enforced independently at both the curation and the validation step.
- **Figures.** The 56 figures of the course, converted from the LaTeX PDFs to whichever of SVG or WebP is smaller over the wire.
- **Progress.** Per-item and per-stage progress, stored in IndexedDB on the device.

## Privacy and technical notes

Nothing leaves the device: no account, no server, no analytics, no third-party request of any kind. Type and mathematics are self-hosted, so the app renders identically offline.

The build is **Vite + TypeScript** with **no UI framework at run time** — a hand-rolled hash router, a small signal store, and template-literal rendering, giving an app shell of about 12 KB gzipped. A hand-written service worker caches the shell and the generated content bank, which is committed and deployed alongside the app because the build host has no access to the course LaTeX repository. Deployed on Netlify.
