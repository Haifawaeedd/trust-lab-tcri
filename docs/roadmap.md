# TRUST-LAB Roadmap

## Roadmap Intent

The roadmap for **TRUST-LAB** is designed to preserve credibility, methodological clarity, and technical progression. The project should not try to appear fully mature in its first release. Instead, it should communicate a disciplined path from a transparent public prototype toward stronger verifier-backed evaluation, citation validation, benchmark infrastructure, and eventually programmatic access.

This staged path is especially important for a research-oriented repository. A clear roadmap signals that the first release is intentionally scoped, that the core methodological contribution is already visible, and that later versions will deepen rigor without abandoning the project’s central identity.

| Roadmap principle | Practical meaning |
|---|---|
| **Methodological continuity** | **DSR**, **CVI**, and **TCRI v3** remain the stable conceptual core |
| **Incremental rigor** | Each version should strengthen evidence, verification, or interpretability |
| **Public legibility** | Every stage should remain understandable to researchers and expert users |
| **Citation-aware evolution** | Later versions should make citation assessment increasingly evidence-based |
| **Operational readiness** | The repository and demo should move gradually toward broader public and programmatic use |

## Version Path

The strongest version path for TRUST-LAB is progressive and cumulative. Each stage should extend the project without erasing the interpretability of the previous one.

| Version | Primary goal | Description |
|---|---|---|
| **v1.0** | Heuristic public research prototype | Establish the repository, formal docs, citation-aware examples, and bilingual demo with transparent scoring logic |
| **v1.1** | Explanation and presentation refinement | Improve narrative explanations, citation panels, examples, and demo readability |
| **v2.0** | Verifier-backed layer upgrades | Replace selected heuristic components with stronger verification methods, especially in citation validation |
| **v3.0** | Benchmark suite and systematic evaluation | Introduce curated trust and citation-integrity cases, calibration, and comparison workflows |
| **v4.0** | API and batch evaluation workflows | Enable programmatic access and structured large-scale evaluation scenarios |

## v1.0 — GitHub-First Research Prototype

The first release must establish **TRUST-LAB** as a serious and immediately understandable research project. At this stage, the emphasis should remain on repository quality, methodological documentation, and clear explanation of the contribution before any attempt to over-expand the technical stack.

In the revised project direction, **v1.0** should already make the shift toward a **citation-aware research integrity platform** visible. That means the repository should not only define **DSR** and **TCRI**, but also formalize **CVI** and the revised **TCRI v3** framing.

| v1.0 deliverable | Why it matters |
|---|---|
| **Strong README** | Gives the repository immediate research identity |
| **Formal DSR / CVI / TCRI v3 docs** | Establishes originality and mathematical clarity |
| **Architecture and methodology docs** | Makes the project reviewable and extensible |
| **Citation-aware example cases** | Helps experts understand how citation weakness changes trust interpretation |
| **Bilingual demo layer** | Makes the concept easy to inspect and share |

## v1.1 — Better Explanations and Public Presentation

The next step after the first release should not be a wholesale technical rewrite. The stronger move is to improve explanation quality, presentation quality, and public accessibility.

This version should deepen interpretability by making the outputs more nuanced and by giving users clearer summaries of how **reliability**, **support**, **hallucination risk**, **DSR**, and **CVI** interact. It should also improve how the project presents itself in GitHub and in the public-facing demo.

| v1.1 focus | Planned additions |
|---|---|
| **Explanations** | More informative interpretation text tied to dominant signals |
| **Citation panels** | Clearer per-citation status, flags, and score breakdowns |
| **Examples** | Additional realistic cases spanning both answer-quality and citation-quality variation |
| **Visual presentation** | Screenshots, refined metric cards, and clearer methodology sections |
| **Reporting** | Downloadable JSON or structured summary output |

## v2.0 — Verifier-Backed Evaluation

Version 2 should strengthen the technical depth of the framework while preserving its current conceptual structure. The key idea is not to replace the architecture, but to replace selected heuristic internals with stronger verification components.

This is especially important for the citation layer. By **v2.0**, TRUST-LAB should begin supporting optional verifier-backed citation checks using sources such as Crossref, OpenAlex, Semantic Scholar, or comparable scholarly metadata services. The support and hallucination layers may also become stronger through more advanced semantic verification methods.

| v2.0 upgrade area | Intended improvement |
|---|---|
| **Support layer** | Move from shallow heuristics to stronger semantic verification |
| **Hallucination layer** | Improve unsupported-claim detection with verifier-backed logic |
| **Citation validation layer** | Introduce optional API-assisted citation verification |
| **Reliability layer** | Strengthen confidence and consistency estimation |
| **Calibration** | Begin empirical tuning of thresholds and weighting parameters |

## v3.0 — Benchmark Suite

Once the core layers become stronger, TRUST-LAB should grow into a benchmarking environment rather than remaining only a demonstration tool. This stage is where the project can build a more durable research profile.

A benchmark suite should introduce curated case collections, clearer failure categories, comparison workflows, and more systematic evaluation procedures. In the revised version of the roadmap, that benchmark layer must explicitly include **citation-integrity scenarios** as well as ordinary answer-quality scenarios.

| v3.0 benchmark focus | Intended outcome |
|---|---|
| **Trust cases** | Curated examples of grounded, weakly supported, and hallucinatory answers |
| **Citation-integrity cases** | Curated valid, ambiguous, incomplete, and fabricated citation profiles |
| **Calibration set** | Better threshold and weighting adjustment for TCRI v3 |
| **Comparative workflows** | Repeatable comparisons across cases and future model outputs |

## v4.0 — API and Batch Workflows

The long-term extension of TRUST-LAB is to support programmatic use. At that stage, the repository can evolve from a GitHub-first research prototype into reusable evaluation infrastructure.

The API and batch-evaluation phase should make it possible to score multiple items systematically, integrate TRUST-LAB into larger research pipelines, and support downstream experimentation. By this point, the project should have enough methodological stability and benchmark support to justify a more operational interface.

## Strategic Recommendation

The strongest strategic choice is still to resist feature inflation in the early stages. TRUST-LAB gains more credibility from a disciplined and well-documented **v1.0** than from an overloaded prototype that weakens methodological clarity.

In practical terms, each version should only add features that reinforce the project’s research identity. If a new feature makes the project more impressive but less interpretable, it should be delayed or omitted. That principle is especially important for citation validation: stronger verification is valuable, but not if it obscures the transparent logic that makes the first version legible.

## Summary

The roadmap of TRUST-LAB is therefore not just a list of future tasks. It is a development philosophy. The project begins with a clear GitHub-first research core, extends into citation-aware explanation and demo quality, deepens technical verification afterward, and only later expands toward benchmark infrastructure and programmatic workflows.

That sequence gives the project the best chance of being publishable, professional, and durable.
