# TRUST-LAB Documentation Index

This directory contains the formal documentation for **TRUST-LAB**, a **GitHub-first, research-grade platform for trust analysis, data integrity assessment, and citation-aware evaluation of AI outputs**. The documentation is structured so that a reader can move from conceptual framing to formal methodology, then to system architecture, metric definitions, and future evolution.

The current documentation set reflects the project’s revised direction as a **citation-aware research integrity platform** built around **DSR**, **CVI**, and **TCRI v3**.

| Document | Purpose |
|---|---|
| `methodology.md` | Explains the layered analytical methodology used by TRUST-LAB, including citation-aware evaluation |
| `architecture.md` | Describes the system flow from input through decision and explanation, including the Citation Validation Layer |
| `formal-metrics.md` | Defines **DSR**, **CVI**, and **TCRI v3** in a formal and interpretable way |
| `cvi.md` | Provides a dedicated explanation of the Citation Validity Index and citation-status logic |
| `roadmap.md` | Explains how the project evolves from the first heuristic prototype toward verifier-backed and benchmark-driven versions |
| `original_contribution.md` | Explains the benchmark-driven originality claim through benchmark design, baselines, and ablation |
| `repository-structure.md` | Describes how the repository is organized and why |
| `project-addendum-v3.md` | Records the project extension that introduced citation validation and the TCRI v3 framing |

## Recommended Reading Order

A new reader should ideally begin with the root `README.md`, which provides the overall repository framing and explains why TRUST-LAB is being built GitHub-first. After that, the most useful sequence is to read the methodology, architecture, formal metrics, and then the dedicated CVI note before reviewing the roadmap.

| Reading goal | Best starting point |
|---|---|
| Understand what the project is | `../README.md` |
| Understand how the framework thinks | `methodology.md` |
| Understand how the system is organized | `architecture.md` |
| Understand the formal metric core | `formal-metrics.md` |
| Understand citation validation specifically | `cvi.md` |
| Understand the benchmark-driven originality layer | `original_contribution.md` |
| Understand why the project direction changed | `project-addendum-v3.md` |
| Understand where the project is going | `roadmap.md` |

## Documentation Philosophy

The documentation in this directory is intentionally treated as part of the project’s **research identity** rather than as a secondary supplement to the interface. TRUST-LAB should be understandable directly from the repository, even before the public demo is fully polished.

That principle is especially important now that the project includes a citation-aware evaluation layer. A researcher, reviewer, or collaborator should be able to inspect not only the interface but also the conceptual rationale behind **DSR**, **CVI**, and **TCRI v3** from the repository alone.

The documentation now also points readers to a benchmark-oriented validation layer. That means the repository should be readable as a linked chain of **methodology**, **architecture**, **metrics**, **benchmark design**, **baseline comparison**, and **ablation-backed originality framing**, rather than as a demo-only artifact.

## Publication Safeguards

The current repository should be read as a **Research Prototype v1.0**. Its scores and interface outputs are intended as **heuristic, interpretable review signals** rather than final truth claims, bibliographic certification, or automated scholarly judgment.

This distinction matters for both methodological integrity and public presentation. TRUST-LAB is designed to make trust failure more legible, but it is not presented as a replacement for human verification, domain expertise, or primary-source review.

| Safeguard | Meaning for readers |
|---|---|
| **Prototype label** | The system is an early public research prototype and should be interpreted with version-aware caution |
| **Heuristic scoring** | DSR, CVI, and TCRI v3 are explanatory signals for inspection, not definitive truth estimates |
| **Benchmark integrity** | Benchmark files are curated **read-only research assets** used for validation framing, not editable interface content |
| **Citation integrity** | Citation validity remains a first-pass structural assessment and should be followed by manual or verifier-backed checks |
| **Scholarly attribution** | Reuse and citation should follow the repository `LICENSE` and `../CITATION.cff` metadata |

Readers who want to understand the originality claim should move from the root `README.md` to `original_contribution.md`, then inspect the benchmark materials in `../benchmarks/` as repository-level validation assets.
