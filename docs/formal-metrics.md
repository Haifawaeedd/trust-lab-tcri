# Formal Metrics for TRUST-LAB

## Purpose

This document defines the formal metric layer for **TRUST-LAB** in its revised citation-aware form. The current framework is built around three linked components: **Data Scale Risk (DSR)**, **Citation Validity Index (CVI)**, and **Trust Collapse Risk Index v3 (TCRI v3)**.

The purpose of this document is not to claim final scientific calibration for the first public release. Its purpose is to provide a mathematically legible identity for the repository so that researchers, reviewers, and contributors can understand what the system is intended to compute, how the variables relate to one another, and where future empirical refinement should occur.

| Metric element | Role in the framework |
|---|---|
| **DSR** | Measures instability or suspicious scale behavior in optional numeric inputs |
| **CVI** | Measures the apparent structural validity of provided citations |
| **TCRI v3** | Aggregates reliability, support weakness, hallucination risk, DSR, and CVI penalty into a composite trust-collapse indicator |

## Variable set

The revised metric layer assumes that TRUST-LAB evaluates a question-answer pair together with optional structured values and optional citations. The composite model therefore requires both text-centered and context-centered variables.

| Symbol | Name | Interpretation |
|---|---|---|
| **C** | Reliability / confidence proxy | Indicates how internally stable or dependable the answer appears |
| **S** | Support score | Indicates how well the answer appears grounded in the question |
| **H** | Hallucination risk | Indicates the degree of unsupported-claim risk |
| **DSR** | Data Scale Risk | Indicates instability or mismatch in optional numeric features |
| **CVI** | Citation Validity Index | Indicates the share of citations that appear structurally credible |
| **λ** | DSR weighting term | Controls TCRI sensitivity to numeric instability |
| **γ** | Citation weighting term | Controls TCRI sensitivity to citation weakness |

## Formal definition of DSR

The revised concept for **Data Scale Risk (DSR)** is intended to capture instability in optional numeric feature values. It formalizes the intuition that structured context may itself weaken trust if the supplied numbers appear badly scaled, excessively dispersed, or mutually inconsistent.

The proposed first-form expression is the following.

> **DSR = (max(X) − min(X)) / (σ(X) + ϵ)**

In this definition, **X** denotes the set of user-provided numeric features, **σ(X)** denotes the standard deviation of that set, and **ϵ** is a small positive constant included to avoid division failure when the dispersion term approaches zero.

The meaning of the expression is straightforward. DSR rises when the overall range of the inputs becomes large relative to their local statistical stability. This does not prove that the data are false. It signals that the numeric context deserves caution because instability in scale may distort downstream interpretation.

| DSR behavior | Interpretation |
|---|---|
| **Low DSR** | Numeric inputs appear comparatively proportionate and stable |
| **Moderate DSR** | Inputs show visible inconsistency or uneven variation |
| **High DSR** | Inputs show strong instability, mismatch, or suspicious scale spread |

## Formal definition of CVI

The **Citation Validity Index (CVI)** introduces a citation-aware dimension into TRUST-LAB. Its purpose is to estimate whether the references supplied with an answer appear structurally strong enough to deserve preliminary trust or later verification.

The first formal expression is intentionally simple.

> **CVI = N_verified / N_total**

In this expression, **N_verified** denotes the number of citations that satisfy the current heuristic validity criteria, while **N_total** denotes the total number of citations supplied for analysis.

The ratio is bounded between **0** and **1**. A higher CVI means that a larger share of the citation set appears structurally credible. A lower CVI means that the citation profile contains more incompleteness, weak formatting, or suspiciously unverifiable references.

| CVI behavior | Interpretation |
|---|---|
| **High CVI** | Most citations appear structurally credible and verification-ready |
| **Medium CVI** | The citation set is mixed, with some credible and some weak references |
| **Low CVI** | Citation weakness is substantial and should materially reduce trust |

## Citation-level heuristic interpretation

In the current GitHub-first release, CVI is expected to rely on heuristic structural checks rather than external scholarly APIs. A citation may count toward **N_verified** when it exhibits a combination of cues such as year presence, DOI-like patterns, author-like formatting, venue-like metadata, and minimum descriptive completeness.

This means that CVI is best understood as a **first-pass integrity indicator**, not as proof of bibliographic truth. It reflects whether references look sufficiently real and complete to justify closer trust.

| Citation status | Meaning |
|---|---|
| **verified-like** | The citation appears structurally strong and plausibly verification-ready |
| **partially supported** | The citation has some credible structure but remains incomplete |
| **unverified** | The citation lacks enough structure to inspire confidence |
| **missing metadata** | The citation is too incomplete for meaningful assessment |

## Formal definition of TCRI v3

The central composite metric in the revised framework is **Trust Collapse Risk Index v3 (TCRI v3)**.

> **TCRI v3 = C × (1 − S) × (1 + H) × (1 + λDSR) × (1 + γ(1 − CVI))**

The form of this expression is intentional. The term **(1 − S)** means that stronger support suppresses trust-collapse risk, while weaker support increases it. The term **(1 + H)** increases the score when unsupported-claim risk rises. The term **(1 + λDSR)** adds sensitivity to unstable numeric context. The final term **(1 + γ(1 − CVI))** introduces a citation penalty, ensuring that low citation validity increases the overall trust-collapse estimate.

This formulation expresses the project’s central methodological intuition: trust failure becomes especially important when an answer appears dependable while support, evidence quality, numeric stability, or citation integrity are deteriorating.

| Component effect | Contribution to TCRI v3 |
|---|---|
| **Higher C** | Amplifies risk when the answer looks dependable but other warning signals are present |
| **Higher S** | Reduces risk by strengthening apparent grounding |
| **Higher H** | Raises risk by increasing hallucination pressure |
| **Higher DSR** | Raises risk by increasing numeric-context instability |
| **Lower CVI** | Raises risk by increasing the citation penalty term |

## Conceptual interpretation of TCRI v3

TCRI v3 should be interpreted as a **composite indicator of trust-collapse behavior**, not as a direct truth score. It is designed to summarize conditions under which an answer may appear trustworthy while important evidential supports are eroding.

This distinction is critical. A response can be coherent yet weakly grounded. It can be somewhat relevant while still containing fabricated specificity. It can sit inside a questionable numeric context. It can also appear academically persuasive while referencing citations that are structurally weak or incomplete. TCRI v3 is designed to express these interacting pressures in one interpretable value without erasing the meaning of the underlying components.

| TCRI v3 behavior | Practical interpretation |
|---|---|
| **Low** | Lower apparent trust-collapse risk under the current evaluation setup |
| **Moderate** | Some caution is warranted and verification is advisable |
| **High** | Important warning signals are interacting in a concerning way |
| **Very high** | The answer should be treated as a serious trust-risk case |

## Expected variable ranges in v1

For clarity in the first public version, the primary component variables are expected to be normalized or interpreted on bounded scales where possible. The exact calibration can change later, but the present document assumes a user-facing representation that remains easy to read.

| Variable | Expected v1 range | Notes |
|---|---|---|
| **C** | 0 to 1 | Higher means stronger apparent reliability |
| **S** | 0 to 1 | Higher means stronger support |
| **H** | 0 to 1 | Higher means stronger hallucination risk |
| **DSR** | non-negative, then normalized for presentation | Higher means stronger data-scale instability |
| **CVI** | 0 to 1 | Higher means stronger citation validity |
| **λ** | constant | Set once for a given release or heuristic profile |
| **γ** | constant | Set once for citation penalty sensitivity |

The final TCRI v3 value may be displayed directly, clipped for presentation, or normalized into a bounded demo-facing scale if needed. The key design requirement is that higher values consistently correspond to greater apparent trust-collapse risk.

## Sensitivity intuition

The revised formula encodes a specific sensitivity profile. If an answer appears reliable, then weak support becomes more consequential because users may be more likely to trust it. If hallucination indicators rise, the score should increase accordingly. If the numeric context appears unstable, DSR further raises concern. If the citations are weak, incomplete, or suspicious, low CVI should intensify the final risk estimate even if the answer remains fluent.

The metric therefore behaves less like a correctness score and more like a **risk-sensitive interpretive multiplier**.

## Decision mapping in v1

The current project plan maps TCRI v3 into four decision bands for communication purposes.

| TCRI v3 band | Decision label |
|---|---|
| `< 0.30` | **Safe** |
| `0.30 – 0.60` | **Verify** |
| `0.60 – 0.85` | **High Risk** |
| `≥ 0.85` | **Critical** |

These thresholds should be treated as **interpretive starting points** for the first public release. They are suitable for a transparent prototype, but they are expected to evolve through future benchmarking and calibration.

## Limitations of the current formalization

The present formalization is appropriate for a public prototype and a research repository, but it should be read with appropriate caution. The variables in v1 are partially heuristic. The weighting parameters **λ** and **γ** are not yet empirically optimized. DSR is formally defined but still open to later normalization choices. CVI does not prove that citations are authentic; it only estimates whether they appear structurally credible. The decision thresholds are readable starting values rather than validated universal boundaries.

These limitations do not undermine the framework. They clarify its present role as a transparent, extensible research instrument.

## Summary

The combination of **DSR**, **CVI**, and **TCRI v3** gives TRUST-LAB its revised formal identity. DSR captures instability in the numeric feature context. CVI captures apparent integrity in the citation layer. TCRI v3 then integrates reliability, support, hallucination risk, numeric instability, and citation degradation into a composite trust-collapse signal.

Together, these metrics provide the mathematical backbone for TRUST-LAB’s GitHub-first research positioning and for the bilingual demo layer that will expose the methodology publicly.
