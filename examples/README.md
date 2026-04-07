# TRUST-LAB Examples Guide

The `examples/` directory provides representative cases for the current public version of **TRUST-LAB**. These examples are not yet a full benchmark suite. Instead, they function as a **documentation and interpretation layer** for researchers, reviewers, and collaborators who want to understand how the framework is expected to behave across different trust and citation-integrity profiles.

In the revised version of the project, each case is designed to illustrate the interaction among **reliability**, **support**, **hallucination risk**, **Data Scale Risk (DSR)**, **Citation Validity Index (CVI)**, and the final **TCRI v3** outcome. This makes the examples useful not only for demonstration, but also for methodology review, interface design, and future testing strategy.

| File | Purpose |
|---|---|
| `sample_cases.json` | Contains representative question-answer-feature-citation cases with expected profiles and explanatory notes |

## How to read the cases

Each example includes a **question**, a **model answer**, optional **feature values**, optional **citations**, and an **expected profile**. The expected profile is not presented as scientific ground truth. It is an interpretive reference that reflects how the current version of TRUST-LAB is intended to reason about the case.

This distinction matters because the repository is still a **research-grade prototype**. The examples are meant to clarify system behavior and support inspection. Later versions may replace some heuristic components with stronger verifier-backed methods, especially in the citation layer.

## What the example set now covers

The revised collection is designed to show a range of trust conditions rather than one narrow failure mode.

| Example pattern | Why it is included |
|---|---|
| **Strong answer with strong citation structure** | Demonstrates a low-risk baseline where both content and references appear credible |
| **Fluent answer with mixed citation completeness** | Shows how citation weakness can shift a case toward verification even when the answer is acceptable |
| **Highly specific answer with fabricated-looking citations** | Illustrates a signature critical trust-collapse pattern for TCRI v3 |
| **Short factual answer with vague references** | Shows how low CVI can compound high hallucination risk even in short outputs |
| **No-citation baseline** | Clarifies expected behavior when citations are optional and not supplied |
| **Strong answer with one weak reference** | Demonstrates that citation issues should influence risk without automatically forcing a severe decision |

## Citation-aware interpretation

The revised example set is especially important because TRUST-LAB is no longer only a general trust-analysis tool. It now also functions as a **citation-aware research integrity prototype**. For that reason, each example may include a `citation_assessment` block that explains how the system should interpret the citation layer.

| Citation field | Meaning |
|---|---|
| `status` | Human-readable label such as `verified-like`, `partially supported`, `unverified`, or `missing metadata` |
| `score` | Heuristic citation-level strength estimate |
| `flags` | Visible reasons why a citation appears stronger or weaker |
| `cvi` | Aggregate citation validity score for the whole case |

These elements are useful because they help future contributors and interface designers preserve the project’s interpretability. The goal is not only to show a final score, but also to show **why** the citation layer contributed to that score.

## Extension guidance

Future contributors should extend the example set in a way that deepens interpretability rather than simply increasing volume. A valuable new case should expose a meaningful pattern that the framework ought to distinguish clearly, such as partial grounding with strong citations, strong prose with fabricated references, numeric instability with otherwise good support, or borderline decision-band behavior.

When extending the examples, it is better to add a small number of carefully explained cases than a large collection of poorly motivated items. Each new case should help a reader understand something specific about the interaction among **DSR**, **CVI**, and **TCRI v3**.

## Relation to future versions

The example set in **v1.0** should be understood as a **documentation and demonstration asset**. In later versions, this directory can evolve into a richer case library and eventually support a more systematic benchmark suite. That later suite should include curated citation-integrity scenarios, fabricated-reference stress cases, and benchmark-ready examples for calibration and verification work.
