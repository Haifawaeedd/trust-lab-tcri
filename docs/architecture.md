# TRUST-LAB Architecture

## Architectural Intent

The architecture of **TRUST-LAB** is designed to satisfy two goals at once. First, it must operate as a practical evaluation workflow for AI-generated outputs. Second, it must remain legible as a **GitHub-first research artifact** that can be reviewed, cited, extended, and eventually connected to stronger verification components.

For that reason, the system is organized as a **layered analytical pipeline** rather than a monolithic scorer. Each layer has a distinct conceptual responsibility, and the final decision is meant to preserve the trace of how that decision emerged. In the revised version of the project, this architecture now includes a dedicated **Citation Validation Layer** that produces the **Citation Validity Index (CVI)** before the final aggregation stage.

| Architectural goal | Why it matters |
|---|---|
| **Interpretability** | Researchers and expert reviewers need to inspect intermediate signals rather than trust a hidden score |
| **Modularity** | Individual layers can be improved independently without destroying the conceptual model |
| **Research portability** | The same logic should read coherently across the repository, documents, and website |
| **Citation awareness** | Research-facing trust analysis requires attention to reference quality as well as answer quality |
| **Demo readiness** | The public interface should expose the method rather than conceal it |

## Top-Level System Flow

At the highest level, the revised TRUST-LAB architecture transforms four classes of input into a structured analytical outcome: a user question, a model answer, optional numeric feature values, and optional citations or references.

> **User Input → Data Integrity Layer (DSR) → Reliability Layer → Support Layer → Hallucination Layer → Citation Validation Layer (CVI) → TCRI v3 Engine → Decision & Explanation Layer → GitHub / Demo / Public Interface**

This sequence reflects the project’s central claim that trust collapse is not a single defect. It is an emergent condition shaped by multiple interacting signals, including citation weakness.

## Input Layer

The input layer remains intentionally compact in the first public version. The user provides a **question**, a **model answer**, optional **numeric feature values**, and optional **citations**. This input model is modest enough for a clear demo, but expressive enough to reveal the interaction between textual behavior, numeric context, and citation integrity.

| Input type | Description | Use in v1 |
|---|---|---|
| **Question** | Original prompt, task, or research query | Used primarily for support estimation |
| **Model Answer** | AI-generated answer under evaluation | Used for reliability, support, and hallucination heuristics |
| **Optional Feature Values** | Numeric values entered by the user | Used to derive **DSR** |
| **Optional Citations** | References supplied by the user or extracted from the answer | Used to derive **CVI** and citation-level diagnostics |

This input design is intentionally appropriate for a **research-grade prototype**. Later versions can add retrieval context, benchmark metadata, batch workflows, or external verification services without breaking the current conceptual architecture.

## Data Integrity Layer

The **Data Integrity Layer** evaluates the structured numeric context supplied by the user. Its principal output is **DSR**, the **Data Scale Risk** signal.

Architecturally, this layer appears early because unstable or suspicious numeric context may affect how later outputs should be interpreted. If feature values appear badly scaled, highly dispersed, or internally inconsistent, the system should reflect that contextual instability before presenting downstream conclusions as equally grounded.

The revised project note proposes the following expression for DSR:

> **DSR = (max(X) − min(X)) / (σ(X) + ϵ)**

This formulation is meant to increase when range outpaces local stability, thereby highlighting numeric mismatch or suspicious variation.

## Reliability Layer

The **Reliability Layer** estimates whether the answer presents itself as internally stable, coherent, and structurally dependable. In architectural terms, this is primarily a **text-centered diagnostic stage**. It does not prove correctness; it estimates how strongly the answer behaves like something a user may be tempted to trust.

This layer remains intentionally separate from support because an answer can sound orderly and self-consistent while still being weakly grounded in the question.

## Support Layer

The **Support Layer** compares the question and the answer to estimate grounding or alignment. In the current version, its implementation may rely on transparent heuristics such as lexical overlap, directional relevance, or basic semantic cues. What matters architecturally is that this layer measures how well the answer remains connected to the originating query.

Support acts as the main grounding-oriented counterweight to reliability. Architecturally, this matters because trust failure often becomes especially serious when an answer appears composed and confident while its connection to the actual question is deteriorating.

## Hallucination Layer

The **Hallucination Layer** estimates whether the answer shows patterns associated with unsupported generation, fabricated specificity, unjustified certainty, or risky overclaiming. This layer remains separate from support because a response can remain partially on-topic while still introducing fabricated or overconfident detail.

From an architectural perspective, this layer functions as a warning amplifier. It does not need to prove falsehood to be useful. It needs to identify patterns that should raise caution before the final aggregation stage.

## Citation Validation Layer

The **Citation Validation Layer** is the major architectural extension in the revised project. This layer examines the references associated with the answer and produces the **Citation Validity Index (CVI)** together with citation-level diagnostics.

Its architectural role is to answer a question that earlier versions of the project did not model explicitly:

> Do the cited references appear sufficiently structured, complete, and plausibly real to deserve preliminary trust or later verification?

In the first GitHub-first version, this layer is intentionally heuristic. Rather than calling external bibliographic APIs immediately, it evaluates visible structural cues such as the presence of a year, DOI-like patterns, author-like structure, sufficient descriptive length, and venue-like metadata.

| Citation signal | Architectural purpose |
|---|---|
| **Year present** | Suggests bibliographic structure and temporal specificity |
| **DOI-like pattern** | Indicates a plausible path to future verification |
| **Author-like formatting** | Distinguishes fuller citations from vague fragments |
| **Minimum descriptive length** | Helps identify whether the reference is meaningfully specified |
| **Venue-like metadata** | Suggests stronger scholarly completeness |

This layer makes TRUST-LAB more suitable for researchers and expert users because it treats **reference integrity** as part of the total trust problem.

## CVI Computation

Architecturally, the Citation Validation Layer produces an aggregate citation score through the following conceptual ratio:

> **CVI = N_verified / N_total**

The result should be displayed alongside citation-level statuses such as **verified-like**, **partially supported**, **unverified**, and **missing metadata**. This keeps the demo aligned with the repository’s broader interpretability goals.

## TCRI v3 Engine

The **TCRI v3 Engine** is the formal aggregation core of the revised architecture. It receives the outputs of the earlier layers and computes the composite trust-collapse signal.

> **TCRI v3 = C × (1 − S) × (1 + H) × (1 + λDSR) × (1 + γ(1 − CVI))**

This engine is designed to remain mathematically explicit and easy to inspect. That decision is central to the repository’s identity. TRUST-LAB is not intended to be a black-box scorer. The TCRI v3 Engine is where the project’s original contribution becomes fully visible: trust collapse is modeled as an interaction among reliability, support weakness, hallucination risk, numeric instability, and citation degradation.

| Engine input | Architectural role |
|---|---|
| **Reliability / confidence proxy (C)** | Encodes how dependable the answer appears |
| **Support (S)** | Reduces risk when grounding is stronger |
| **Hallucination risk (H)** | Increases risk when unsupported-claim indicators rise |
| **DSR** | Increases risk when numeric context is unstable |
| **CVI** | Increases risk indirectly when citation quality declines |
| **λ** | Controls DSR sensitivity |
| **γ** | Controls citation-penalty sensitivity |

## Decision Layer

The **Decision Layer** converts **TCRI v3** into a categorical output that is easier to interpret quickly. The current decision bands remain:

| Band | Meaning |
|---|---|
| **Safe** | Low apparent trust-collapse risk under current heuristics |
| **Verify** | Additional review is advisable before relying on the answer |
| **High Risk** | Substantial warning signals are present |
| **Critical** | Serious trust-collapse concern is indicated |

Architecturally, this layer serves communication rather than deep analysis. It allows the system to express a practical conclusion while keeping the underlying metrics visible and inspectable.

## Explanation Layer

The **Explanation Layer** converts the metric profile into a short natural-language summary. This component is crucial because the architecture is intended for researchers and expert users who require interpretable reasoning rather than raw scores alone.

A proper explanation should identify which signals drove the result. In the revised architecture, that includes citation integrity. The explanation may therefore note that the answer appeared coherent but weakly supported, that numeric instability raised contextual risk, or that the references appeared incomplete and materially increased the final risk estimate.

## Separation Between Repository and Website Layers

TRUST-LAB is being built as a **GitHub-first** system. This means the repository architecture and the website architecture are related but not identical.

The repository is the authoritative home of the project’s methodology, architecture, examples, and formal research identity. The website is the bilingual interpretive surface that makes that research structure legible to a broader audience.

| Architectural surface | Main responsibility |
|---|---|
| **Repository** | Methodology, formal metric definitions, examples, roadmap, and long-form documentation |
| **Website** | Bilingual explanation, navigation, and public-facing interpretation |
| **Project page** | Research framing, originality, and roadmap context |
| **Methodology page** | Human-readable exposition of DSR, CVI, TCRI v3, and the layered model |
| **Demo page** | User input, citation-aware metric display, and immediate interpretation |

This separation is intentional because it allows the repository to remain publication-ready on GitHub while the website functions as a clear explanatory interface.

## Information Architecture for the Demo Layer

The website layer should preserve the logic of the research architecture rather than flatten it into a generic marketing page. The current three-page structure remains appropriate, but its content must now reflect the CVI extension.

| Page | Architectural function |
|---|---|
| **Project** | Establishes the research narrative and explains why TRUST-LAB exists |
| **Methodology** | Maps the layered architecture into readable conceptual sections, including **CVI** and **TCRI v3** |
| **Demo** | Accepts question, answer, feature values, and citations, then returns a full citation-aware profile |

The bilingual interface should continue to provide a visible **AR / EN** toggle so the interpretive layer remains accessible in both languages.

## Version Evolution Strategy

The architecture is designed to remain stable even as internal implementations improve. Future versions can replace heuristics with stronger verifiers, add benchmark workflows, and expose APIs without requiring a complete conceptual redesign.

| Version | Architectural evolution |
|---|---|
| **v1.0** | Heuristic layered prototype with citation-aware public demo |
| **v1.1** | Better explanation surfaces, clearer citation panels, and richer examples |
| **v2.0** | Stronger verifier-backed components, especially in citation validation |
| **v3.0** | Benchmark and case-library infrastructure for trust and citation-integrity scenarios |
| **v4.0** | API and batch evaluation interfaces |

## Architectural Summary

The architecture of TRUST-LAB is best understood as a **modular research pipeline with a bilingual interpretive frontend**. Its key strength is not merely that it produces a score, but that it preserves the analytical path from input through intermediate risk signals to final decision and explanation.

With the addition of the **Citation Validation Layer**, the project now moves beyond a general trust-analysis tool toward a more explicit **research integrity platform**. That shift strengthens both the repository’s academic identity and the value of the future demo layer.
