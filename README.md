# TRUST-LAB


![Status](https://img.shields.io/badge/Status-Research%20Prototype-blue)
![Version](https://img.shields.io/badge/Version-v1.0-green)

**TRUST-LAB** is a **GitHub-first, research-grade platform for trust analysis, data integrity assessment, and citation-aware evaluation of AI outputs**. The repository is being developed under the name **`trust-lab-tcri`** and is designed to read as a serious research artifact before it functions as a public demo.

The project began with a layered framework centered on **Data Scale Risk (DSR)** and the **Trust Collapse Risk Index (TCRI)**. It is now being extended into a stronger formulation that also addresses **citation validity** through a new **Citation Validity Index (CVI)** layer. This change matters because, in research-facing AI use, the problem is not only whether an answer sounds coherent. The problem is also whether the answer is sufficiently supported, whether it overclaims, whether its numeric context is unstable, and whether the references it presents appear structurally credible and suitable for later verification.

This framing is consistent with the wider language of trustworthy and risk-aware AI evaluation emphasized in the NIST generative AI profile, which treats risk management as a lifecycle concern across design, development, use, and evaluation [1]. It also aligns with OWASP’s treatment of LLM applications as systems with layered safety and security failure modes rather than a single isolated defect class [2].

| Project Attribute | Description |
|---|---|
| **Repository name** | `trust-lab-tcri` |
| **Primary identity** | Citation-aware AI output evaluation and research integrity platform |
| **Core signals** | **DSR**, **CVI**, and **TCRI v3** |
| **Current build strategy** | GitHub-first repository foundation, then bilingual website and demo layer |
| **Primary audience** | Researchers, reviewers, evaluators, safety practitioners, and expert users |
| **Interface requirement** | Arabic / English bilingual presentation |

## Interface Preview

![TRUST-LAB interface preview](https://d2xsxph8kpxj0f.cloudfront.net/310419663029290257/RJFnB8eJ8EWmUeAQSDBnXk/trustlab-interface-preview_9fa8bc2a.png)

The current interface preview shows the bilingual editorial presentation layer that sits on top of the repository’s methodological core. It is included here to help GitHub visitors understand the project quickly before they move into the formal documentation.

## Research Positioning

TRUST-LAB should be understood as an **interpretability-oriented evaluation instrument** rather than a black-box scoring tool. Its purpose is to separate the main contributors to trust failure before combining them into a composite signal. This means that users should be able to inspect **reliability**, **support**, **hallucination risk**, **data-scale instability**, and **citation validity degradation** as distinct but interacting dimensions.

The project therefore moves beyond a generic hallucination checker. Its emerging research identity is closer to a **research integrity platform for AI-assisted knowledge work**. In that role, TRUST-LAB is meant to help users inspect not only what an answer says, but also whether the surrounding evidence structure looks credible enough to deserve further trust.

## Original Contribution

TRUST-LAB introduces a benchmark-driven trust-collapse methodology combining **DSR**, **CVI**, and **TCRI v3** under an interpretable layered architecture. Its original contribution lies not only in the composite formula, but also in the way the method is positioned as a research instrument with a curated benchmark, explicit baseline comparison, ablation logic, and documentation that makes trust failure legible to researchers and expert users.

## Core Metric Identity

The current methodological signature of the repository consists of three linked elements. **DSR** captures instability in optional numeric inputs. **CVI** estimates the apparent validity of cited references. **TCRI v3** then aggregates the major trust-failure signals into a single interpretable risk indicator.

| Signal | Purpose | High-level interpretation |
|---|---|---|
| **DSR** | Measures instability or mismatch across optional numeric feature values | Higher values indicate stronger scale inconsistency or suspicious dispersion |
| **CVI** | Measures how many provided citations appear structurally valid and verification-ready | Lower values indicate weaker citation credibility |
| **TCRI v3** | Aggregates reliability, support weakness, hallucination risk, DSR, and CVI penalty | Higher values indicate greater trust-collapse risk |

### Formal expressions

The repository currently treats the three formal components as follows.

> **DSR = (max(X) − min(X)) / (σ(X) + ϵ)**

> **CVI = N_verified / N_total**

> **TCRI v3 = C × (1 − S) × (1 + H) × (1 + λDSR) × (1 + γ(1 − CVI))**

In this formulation, **C** denotes reliability or confidence proxy, **S** denotes support, **H** denotes hallucination risk, **DSR** denotes data-scale risk, **CVI** denotes citation validity, and **λ** and **γ** are weighting terms that control the contribution of numeric instability and citation weakness.

The practical meaning of the formulation is straightforward. Trust-collapse risk rises when an answer appears coherent but is weakly supported, more hallucinatory, numerically unstable, or accompanied by low-quality citations.

| Symbol | Meaning | Intended v1 interpretation |
|---|---|---|
| **C** | Reliability / confidence proxy | Higher means the answer appears more internally coherent |
| **S** | Support score | Higher means the answer appears more grounded in the question |
| **H** | Hallucination risk | Higher means stronger unsupported-claim risk |
| **DSR** | Data scale risk | Higher means stronger numeric instability |
| **CVI** | Citation validity index | Lower means weaker citation profile |
| **λ** | DSR weight | Tunes the DSR penalty term |
| **γ** | Citation penalty weight | Tunes the CVI penalty term |
| **TCRI v3** | Composite trust-collapse score | Higher means greater need for verification or rejection |

## Analytical Architecture

TRUST-LAB is intentionally organized as a layered analytical pipeline so the final decision remains inspectable. The current target flow is the following:

> **User Input → Data Integrity Layer (DSR) → Reliability Layer → Support Layer → Hallucination Layer → Citation Validation Layer (CVI) → TCRI v3 Engine → Decision and Explanation Layer → GitHub / Demo / Public Interface**

This structure matters because it preserves interpretability. Individual layers can evolve over time without breaking the conceptual model. Early versions may rely on heuristic scoring for transparency, while later versions may introduce verifier-backed or API-backed validation for stronger evidence.

| Layer | Role in the system |
|---|---|
| **Data Integrity Layer** | Evaluates optional numeric inputs and computes **DSR** |
| **Reliability Layer** | Estimates internal answer stability and coherence |
| **Support Layer** | Estimates alignment between the question and the answer |
| **Hallucination Layer** | Flags unsupported certainty, fabricated specificity, or risky overclaiming |
| **Citation Validation Layer** | Scores citations for structure, completeness, and apparent verifiability to produce **CVI** |
| **TCRI v3 Engine** | Aggregates the component signals into the composite trust-collapse indicator |
| **Decision Layer** | Maps the score into interpretable bands such as **Safe**, **Verify**, **High Risk**, and **Critical** |
| **Explanation Layer** | Produces a readable narrative describing why the decision was reached |

## CVI: Citation Validity Index

The addition of **CVI** is the most important conceptual extension in the current version. In many research-facing workflows, answer quality cannot be judged solely from fluency. If a model supplies references, users also need a first-pass indication of whether those references look real, sufficiently complete, and plausibly verifiable.

For the first GitHub-first release, **CVI** is intended to remain heuristic and transparent. The repository will therefore score citations using observable structural cues such as the presence of a year, DOI-like patterns, sufficient descriptive length, author-like formatting, venue-like metadata, and general completeness. This first version is not meant to replace formal bibliographic verification. It is meant to expose a readable warning signal that can later be upgraded through external scholarly APIs such as Crossref, Semantic Scholar, or OpenAlex.

| CVI status | Meaning |
|---|---|
| **verified-like** | Citation looks structurally strong and plausibly verification-ready |
| **partially supported** | Citation has some credible structure but remains incomplete |
| **unverified** | Citation lacks enough structure to inspire confidence |
| **missing metadata** | Citation is too incomplete for a meaningful first-pass assessment |

## Repository Build Order

The build order is deliberate. The repository is being developed as a **GitHub-first research object** before interface polish becomes the dominant priority. This ensures that the methodology, architecture, and examples are already legible to researchers before the public-facing demo layer takes center stage.

| Priority | Build focus |
|---|---|
| **1** | Clean research repository structure |
| **2** | Strong `README.md` and formal methodology documents |
| **3** | Formal definitions for **DSR**, **CVI**, and **TCRI v3** |
| **4** | Architecture, examples, benchmark framing, and roadmap |
| **5** | Bilingual website and demo layer |

## Repository Structure

The repository is evolving around documentation quality, reproducible examples, and a bilingual explanatory interface.

| Path | Purpose |
|---|---|
| `README.md` | Main repository framing and onboarding |
| `docs/` | Methodology, architecture, metrics, roadmap, and CVI-related documentation |
| `examples/` | Sample cases, citation-aware examples, and future benchmark presets |
| `benchmarks/` | Curated benchmark cases, baseline comparison scripts, and ablation-study utilities |
| `data/` | Reference materials and future structured benchmark assets |
| `client/` | Bilingual website and demo layer |
| `ideas.md` | Chosen interface design philosophy |
| `research-notes.md` | Supporting research synthesis and framing notes |

## Expected Inputs and Outputs

The intended first public version should accept a user question, a model answer, optional numeric feature values, and optional citations. The output should expose the entire profile rather than hiding it behind a single label.

| Input / Output | Description |
|---|---|
| **Question** | The original query or research prompt |
| **Model Answer** | The AI-generated answer under review |
| **Optional Feature Values** | Numeric values used to estimate **DSR** |
| **Optional Citations** | Reference strings, ideally one citation per line |
| **Reliability** | Internal stability or coherence proxy |
| **Support** | Estimated grounding of the answer in the question |
| **Hallucination Risk** | Unsupported-claim risk estimate |
| **DSR** | Data-scale instability score |
| **CVI** | Citation validity score |
| **TCRI v3** | Composite trust-collapse indicator |
| **Decision** | Risk band such as `Safe`, `Verify`, `High Risk`, or `Critical` |
| **Explanation** | Short narrative explaining the result |
| **Citation Details** | Citation-level status, score, and flags |

## Bilingual Website and Demo Layer

The user-facing interface is intended to be **bilingual in Arabic and English**. This is a product requirement rather than a decorative choice. The site should therefore provide a visible **AR / EN** toggle and preserve clear meaning across the Project, Methodology, and Demo pages.

The website is not separate from the research repository. It is the public interpretive layer of the same system. Its job is to make the formal methodology legible, to help expert users understand the contribution quickly, and to provide a direct way to inspect trust and citation behavior through a guided demo.

| Planned page | Purpose |
|---|---|
| **Project** | Introduces TRUST-LAB, its GitHub-first identity, and its research contribution |
| **Methodology** | Explains the analytical layers, **DSR**, **CVI**, **TCRI v3**, and decision logic |
| **Demo** | Lets users submit answers, optional feature values, and optional citations for analysis |

## Benchmark-driven Validation Layer

The repository now includes a dedicated **benchmark-driven originality layer** built on top of the existing methodological core. This addition is important because TRUST-LAB is no longer framed only as a scoring interface. It is now being structured as a research program with a manually curated benchmark, explicit baseline comparison, and ablation logic.

| Validation asset | Role in the repository |
|---|---|
| `benchmarks/trust_bench_v1.json` | Stores manually curated cases across citation hallucination, overconfidence collapse, data instability, and partial truth |
| `benchmarks/baseline_eval.py` | Compares simplified baselines such as confidence-only, citation-only, and hallucination-only against the TRUST-LAB composite profile |
| `benchmarks/ablation.py` | Tests the full system against reduced variants such as without CVI, without DSR, and without hallucination pressure |
| `docs/original_contribution.md` | Explains why the benchmark, baseline, and ablation layer strengthens the project’s originality claim |

The benchmark cases are intentionally **manually curated to represent realistic failure modes in academic AI usage** rather than being random demonstration prompts. This design choice makes the repository more legible to researchers because it connects the method to a controlled validation setting.

## Roadmap

The roadmap should remain progressive and credible. The goal is to deepen methodological strength without overstating maturity.

| Version | Intended emphasis |
|---|---|
| **v1.0** | Heuristic public research prototype with GitHub documentation and bilingual demo |
| **v1.1** | Better explanations, clearer reporting, and richer citation-aware examples |
| **v2.0** | Verifier-backed evaluation for selected layers, especially citation validation |
| **v3.0** | Benchmark suite with curated trust and citation-integrity scenarios |
| **v4.0** | API workflows, batch evaluation, and programmatic integration |

## Why This Project Matters

The most important idea in TRUST-LAB is not simply classifying an answer as good or bad. The project is attempting to make **trust failure legible**. That means showing how answer coherence, support weakness, hallucination risk, numeric instability, and citation degradation interact in one interpretable analytical frame.

That ambition gives the repository a stronger path than a one-off demo. It positions TRUST-LAB as a platform that could mature from a transparent heuristic prototype into a more rigorous research integrity system for expert users.

## Current Status

The repository is currently being developed in the following order: repository structure, formal documentation, metric framing, examples and roadmap, and then the bilingual website/demo layer. The present revision also incorporates the new **CVI** extension and the shift from earlier TCRI framing toward **TCRI v3**.

## References

[1]: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence "NIST — Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile"
[2]: https://owasp.org/www-project-top-10-for-large-language-model-applications/ "OWASP — Top 10 for Large Language Model Applications"

## Research Safeguards and Publication Notes

TRUST-LAB should be interpreted as a **Research Prototype v1.0**. Its current outputs are **heuristic, interpretable signals** designed to support inspection and review. They are **not absolute truth estimates**, and they should not be treated as a substitute for human judgment, source verification, or scholarly validation.

This distinction is especially important in citation-aware use. A low or moderate **CVI** score should be understood as an indicator that references may require closer inspection, not as a final bibliographic verdict. Likewise, a low-risk **TCRI v3** score does not prove correctness. It only indicates that the current heuristic layers did not detect severe signs of trust collapse under the present scoring assumptions.

| Safeguard | Repository interpretation |
|---|---|
| **Prototype status** | The project is an early research-grade prototype and should be cited and reviewed as such |
| **Heuristic outputs** | Scores are explanatory signals for review, not conclusive truth claims |
| **Benchmark integrity** | Benchmark assets are included as curated **read-only research examples**, not as user-editable public interface content |
| **Citation integrity** | Citation scoring is a first-pass structural assessment and should be followed by manual or verifier-backed checks |
| **Scholarly attribution** | Reuse and citation should follow the repository `LICENSE` and `CITATION.cff` metadata |

The benchmark layer is intentionally presented as a **repository-level validation asset**. Files such as `benchmarks/trust_bench_v1.json`, `benchmarks/baseline_eval.py`, and `benchmarks/ablation.py` are part of the research framing and should remain **read-only benchmark materials** in the public-facing experience.

For scholarly reuse, the repository now includes **citation metadata** through `CITATION.cff`, alongside the project license. Together, these files help preserve attribution, clarify reuse expectations, and support a more professional public release.
