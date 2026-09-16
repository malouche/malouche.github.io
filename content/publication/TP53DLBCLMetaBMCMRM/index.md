---
abstract: |
  **Background:** Meta-analyses of biomarker prevalence in diffuse large B-cell lymphoma (DLBCL) frequently rest on a small number of cohorts (k ≤ 5) and are correspondingly fragile: between-study heterogeneity statistics destabilize, publication-bias diagnostics become inestimable, and conventional priors begin to dominate posteriors. We use the specific case of DLBCL cohorts that simultaneously report TP53 status and cell-of-origin (COO) classification as an illustrative applied case study, taking the probability of germinal-center B-cell-like (GCB) classification as a pre-specified marginal estimand and applying complementary frequentist and Bayesian machinery aligned on that single target. We do not propose a new estimator or diagnostic; the intended contribution is a transparent, reproducible analysis workflow and a set of concrete reporting recommendations for biomarker-prevalence synthesis when only a handful of cohorts are available.

  **Methods:** We systematically searched PubMed, Scopus, and Web of Science for retrospective DLBCL cohorts published between 2018 and 2025 that reported both TP53 status (by immunohistochemistry [IHC] or sequencing) and COO classification (Hans algorithm or gene-expression profiling). Five cohorts comprising 738 patients met inclusion criteria. Risk of bias was assessed with the Newcastle–Ottawa Scale (NOS), supplemented with the JBI Critical Appraisal Checklist for Prevalence Studies for the prevalence analysis and QUIPS for the odds-ratio sub-analysis. The pre-specified primary estimand is the probability of GCB classification, p, in DLBCL cohorts with reported TP53 status. The same estimand was targeted by both analyses, which differ only in inferential machinery. Frequentist pooling used random-effects logit-transformed proportions (metafor, REML), with a bootstrap diagnostic for the informativeness of I². The Bayesian analysis used a non-centered binomial-logit hierarchical model in Stan with priors μ ~ N(0, 1.5) and τ ~ Half-Cauchy(0, 0.5) (primary); three alternative priors on τ were used for sensitivity. A complementary frequentist odds-ratio (OR) meta-analysis was performed on the three cohorts (Henrique, Moreno, Jing) for which the full TP53 × COO 2×2 cross-tabulation is reported in the source papers. LOO with Pareto-k diagnostics is reported as a sanity check (3 of 5 Pareto-k > 0.7 at k = 5), not as a formal model comparison.

  **Results:** Across the five cohorts, observed GCB proportions ranged from 0.36 to 0.55. The Bayesian model yielded a posterior mean of the overall probability of GCB classification of p = 0.502 (95% credible interval [CrI] 0.414–0.584), with logit-mean μ = 0.009 (95% CrI −0.346 to 0.339) and between-study standard deviation τ = 0.272 (95% CrI 0.023–0.737). Posterior means of τ tracked the prior scales closely across the four prior specifications, consistent with τ being prior-dominated at k = 5; μ and p̄ were essentially invariant. All Markov chain Monte Carlo (MCMC) diagnostics were satisfactory (maximum R̂ ≤ 1.004, minimum effective sample size = 1,122, zero divergent transitions). Posterior predictive p-values lay between 0.389 and 0.831, consistent with adequate fit on a small-k diagnostic. The complementary OR meta-analysis on the three full-2×2 cohorts gave a pooled OR for TP53 positivity versus GCB classification of 0.82 (95% CI 0.53–1.26), I² = 30.0%, consistent with no detectable association on the subset.

  **Conclusions:** Heterogeneity in the GCB proportion across TP53-reporting DLBCL cohorts is meaningful but imprecisely estimated at k = 5. IHC threshold and detection method are biologically credible candidate moderators but are not statistically validated. The TP53 × COO odds ratio, where reconstructible, is consistent with no association. This analysis is exploratory; the small evidence base does not support strong clinical recommendations. Future DLBCL cohort studies should pre-specify joint TP53 × COO reporting to enable powered association inference.
authors:
- Aisha Al-Khinji
- Hadeel Alashwal
- Abdullatif Al-Hor
- Hissa Al-Kuwari
- Farwa Bismi
- Nada A. Maki
- Taghreed Abunada
- admin
date: "2026-09-15T00:00:00Z"
publication: "*BMC Medical Research Methodology* (Springer Nature)"
publication_short: "BMC Med. Res. Methodol."
publication_types:
- "2"
title: "Bayesian and frequentist meta-analysis of GCB-classification heterogeneity in TP53-reporting DLBCL cohorts at small k: an applied case study with reporting guidance"
tags:
- Meta-analysis
- Bayesian hierarchical models
- Small-k meta-analysis
- Prior sensitivity
- TP53
- Diffuse large B-cell lymphoma
- Cell of origin
- Reporting guidance
# Display status — accepted at BMC Medical Research Methodology on 15-Sep-2026
# (submission ID d5408e42-bb7f-415e-af3b-ca0b9d14f8cf; submitted 29-May-2026,
# R1 24-Jul-2026, R2 02-Sep-2026). Awaiting proofs / DOI; do NOT enable the
# link until the DOI is added below. Title, author order and abstract are taken
# verbatim from the accepted v6 manuscript (TP53_Lymphoma_BMC_MRM_v6_CLEAN.docx).
# Corresponding author: Aisha Al-Khinji.
status: "Accepted"
link_disabled: true
---
