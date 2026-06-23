---
date: "2026-06-23T00:00:00Z"
external_link: "https://ms-pd-bayesian-dashboard.netlify.app/"
image:
  caption: "Comparative Bayesian network structures of symptom dependencies in multiple sclerosis and Parkinson's disease, from Al-Sharman et al. (2026, *Journal of Multidisciplinary Healthcare*)."
  focal_point: Smart
  preview_only: false
summary: "An interactive dashboard for **Al-Sharman et al. (2026)**, *Journal of Multidisciplinary Healthcare* — a comparative **Bayesian network** analysis of directional symptom dependencies in multiple sclerosis (MS, n=104) and Parkinson's disease (PD, n=54). Explore the disease-specific directed networks, hub structure, edge strengths, and bootstrap stability directly in the browser."
tags:
- mspd-bayesian
- bayesian
- multiple-sclerosis
- parkinsons-disease
- neurorehabilitation
title: "Directional Symptom Dependencies in MS & Parkinson's Disease Dashboard"
---

**ORIGINAL RESEARCH article**  
**J. Multidiscip. Healthc., 23 June 2026**  
**Volume 2026:19, pp. 1–19 | [https://doi.org/10.2147/JMDH.S607760](https://doi.org/10.2147/JMDH.S607760)**  

## Directional Symptom Dependencies in Multiple Sclerosis and Parkinson's Disease: A Comparative Bayesian Network Analysis

**Alham Al-Sharman, Hanan Khalil, Dhafer Malouche, Saddam Kanaan, Meeyoung Kim, Nabil Saad, Marah Abdelrazeq**

---

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://ms-pd-bayesian-dashboard.netlify.app/"
     target="_blank"
     rel="noopener noreferrer"
     style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
    📊 Explore Interactive Dashboard
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 4px;">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  </a>
</div>

---

### Abstract

Multiple sclerosis (MS) and Parkinson's disease (PD) are progressive neurological disorders with complex interactions among motor symptoms, psychological disturbances, sleep problems, fatigue, and pain. Because correlation-based approaches cannot establish effect direction, this study used **Bayesian Network (BN) analysis** (Hill-Climbing algorithm, Gaussian BIC, 500 bootstrap resamples) to identify and compare directional dependency pathways in MS (n=104) and PD (n=54).

### Key Findings

**MS network** — 18 nodes, 27 directed edges; 21/27 edges (77.8%) bootstrap-stable. Anxiety is the central hub:

- **Anxiety → Sleep quality**: β = 0.51 (p < 0.001)
- **Anxiety → Physical activity**: β = 0.37 (p < 0.001)
- **Anxiety → Pain severity**: β = 0.30 (p < 0.001)
- **Anxiety → Physical fatigue**: β = 0.24 (p = 0.016)
- **Pain interference → Physical fatigue**: β = 0.40 (p < 0.001)
- **Pain interference → Cognitive fatigue**: β = 0.23 (p = 0.005)

**PD network** — 14 nodes, 15 directed edges; 14/15 edges (93.3%) bootstrap-stable. Anxiety is again the central hub:

- **Depression → Anxiety**: β = 0.78 (p < 0.001)
- **Anxiety → Pain interference**: β = 0.59 (p < 0.001)
- **Age → Physical activity**: β = −0.50 (p < 0.001)
- **Anxiety → Balance**: β = −0.48 (p < 0.001)
- **Age → Balance**: β = −0.40 (p < 0.001)

Anxiety is a shared central hub in both diseases, but the downstream pathways differ. *Findings are cross-sectional directional dependency structures (hypothesis-generating), not confirmed causal pathways.*

### Citation

Al-Sharman A, Khalil H, Malouche D, Kanaan S, Kim M, Saad N, Abdelrazeq M. Directional Symptom Dependencies in Multiple Sclerosis and Parkinson's Disease: A Comparative Bayesian Network Analysis. *J Multidiscip Healthc.* 2026;19:1–19. doi: 10.2147/JMDH.S607760

