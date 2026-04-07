# Original Contribution of TRUST-LAB

## Framing the Contribution

The original contribution of **TRUST-LAB** lies in the integration, organization, and evaluation of a **citation-aware trust assessment framework** under controlled benchmark settings. The project is not presented merely as a user-facing tool or interface. Instead, it is structured as a research-grade system in which the methodological claim is supported by three linked assets: a formal metric design, a manually curated benchmark, and an explicit validation layer based on baseline comparison and ablation.

In this framing, the contribution is not reduced to any single score in isolation. The originality comes from the interaction between **TCRI v3**, **DSR**, and **CVI**, and from the decision to evaluate that interaction against designed failure modes rather than anecdotal examples. This is what moves TRUST-LAB from a descriptive prototype toward a benchmark-driven research artifact.

## Why the Project Is Method-Based Rather Than Tool-Only

A large number of AI evaluation projects remain at the level of interface or scoring utility. TRUST-LAB is being shaped differently. Its value proposition is that it treats trust collapse as a **composite research problem** rather than a single-error detector. An answer may appear fluent while remaining weakly supported. It may look well structured while relying on fabricated references. It may be partly correct in content while being unsafe for research use because its citation layer is invalid or incomplete. TRUST-LAB formalizes these distinctions and then tests them under benchmark conditions.

| Dimension | Ordinary tool framing | TRUST-LAB framing |
|---|---|---|
| Core identity | A scoring interface | A research methodology with evaluative layers |
| Validation style | Anecdotal examples | Curated benchmark plus explicit comparison |
| Main question | “Does the tool produce a score?” | “Does the integrated system outperform simpler explanations of risk?” |
| Research value | Demonstration | Method + benchmark + validation |

## Benchmark Design

The benchmark layer is represented by **TRUST-BENCH v1**, stored in `benchmarks/trust_bench_v1.json`. The benchmark is intentionally small in its first release, but it is designed for interpretability rather than volume. The initial version contains manually curated cases divided into four failure-mode families that reflect realistic academic and expert-facing AI usage.

| Category | Research purpose | Typical failure pattern |
|---|---|---|
| **Citation Hallucination** | Tests whether strong language can hide invalid references | Fluent answer, fabricated or structurally implausible citations |
| **Overconfidence Collapse** | Tests whether certainty exceeds evidential grounding | Strong confidence, weak support, shallow qualification |
| **Data Instability** | Tests whether structured numeric irregularity changes risk | Scale mismatch, outliers, sign inconsistency, dispersion |
| **Partial Truth** | Tests whether partly correct content is still flagged as insufficient | Broadly true answer, incomplete evidence, weak citation coverage |

The purpose of this benchmark design is methodological clarity. Each case is written so that one dominant failure mode is visible while the other TRUST-LAB signals remain interpretable. This makes the benchmark useful not only for testing the full system, but also for revealing what simpler baselines miss.

## Case Generation Protocol

The benchmark cases follow a deliberate generation protocol rather than random prompt collection. The protocol can be stated formally as follows.

> **Cases are manually curated to represent realistic failure modes in academic AI usage.** Each case is designed so that one dominant trust-failure pattern is present while the remaining signals stay legible enough for baseline comparison and ablation study.

This protocol matters for originality because it creates a stable bridge between concept and evaluation. The cases are neither synthetic noise nor arbitrary demos. They are designed artifacts that expose the difference between surface fluency and research-grade trustworthiness.

## Baseline Comparison

The file `benchmarks/baseline_eval.py` introduces a first comparison layer. Its role is not to claim final empirical superiority in a publication-ready sense, but to make the comparative logic explicit inside the repository.

The benchmark currently compares TRUST-LAB against three simplified baselines. The first baseline uses **confidence or reliability only**. The second uses **citation validity only**. The third uses **hallucination risk only**. These are important because they model the kinds of reductionist shortcuts that researchers might otherwise adopt. TRUST-LAB then serves as the composite condition, represented by **TCRI v3 + DSR + CVI**.

| System | What it captures | What it misses |
|---|---|---|
| Confidence-only baseline | Internal fluency or answer coherence | Fabricated references, data instability, partial-truth risk |
| Citation-only baseline | Reference validity pressure | Weak answer grounding, overconfidence, non-citation failure modes |
| Hallucination-only baseline | Unsupported certainty and invented specificity | Citation structure, numeric instability, mixed-signal cases |
| **TRUST-LAB full system** | Composite trust-collapse profile | Still heuristic in v1, but methodologically broader |

This comparison is central to the originality claim. A method becomes more persuasive when it is shown to explain difficult cases better than simpler alternatives. TRUST-LAB is therefore not only a scoring proposal; it is a composite hypothesis tested against narrower baselines.

## Ablation Study

The file `benchmarks/ablation.py` provides the second validation layer. If baseline comparison asks whether TRUST-LAB is stronger than simple alternatives, ablation asks a more internal question: **which parts of the system are carrying the contribution?**

The ablation design currently includes the following conditions: a reduced **TCRI-only** core, a version **without CVI**, a version **without DSR**, a version **without hallucination pressure**, and the **full system**. This structure allows the repository to show whether the originality of TRUST-LAB comes from one dominant signal or from the interaction between multiple signals.

| Ablation condition | Interpretation |
|---|---|
| **TCRI only** | Tests the reduced core without citation, hallucination, or data-instability pressure |
| **Without CVI** | Tests how much citation integrity contributes to the final judgment |
| **Without DSR** | Tests how much structured-data instability contributes |
| **Without hallucination layer** | Tests how much unsupported certainty shapes the result |
| **Full system** | Preserves the intended research design of TRUST-LAB |

This is a strong originality move because it makes the project falsifiable at the design level. If the full system does not behave meaningfully better than its weakened versions, the claimed contribution would be weaker. By including ablation directly in the repository, TRUST-LAB adopts a more serious research posture.

## Contribution Statement for the Repository

The contribution of TRUST-LAB can therefore be stated in a concise research form:

> **The original contribution of TRUST-LAB lies in the integration and evaluation of TCRI under controlled benchmark settings, extended by citation-validity analysis and structured-instability signals, and validated through baseline comparison and ablation rather than interface demonstration alone.**

That statement is important because it explains why the repository is being built in its current order. The project begins with structure, methodology, benchmark design, and validation logic, and only then extends into the demo and website layer.

## Immediate Implications for the Repository

The practical result of this originality layer is that TRUST-LAB now reads as a repository with five interacting levels. The first is the method itself. The second is the benchmark. The third is the baseline comparison. The fourth is the ablation study. The fifth is the public explanatory interface. This progression gives the project a stronger research identity and makes it more legible to researchers, reviewers, and expert evaluators.

| Repository layer | Current file or location |
|---|---|
| Methodology and metric framing | `README.md`, `docs/methodology.md`, `docs/formal-metrics.md`, `docs/cvi.md` |
| Benchmark design | `benchmarks/trust_bench_v1.json` |
| Baseline comparison | `benchmarks/baseline_eval.py` |
| Ablation study | `benchmarks/ablation.py` |
| Public interpretation layer | Bilingual website and demo interface |

In short, the benchmark-driven additions do not replace the existing project. They elevate it. They make the system look less like a standalone evaluator and more like a research program with an explicit validation strategy.
