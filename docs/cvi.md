# Citation Validity Index (CVI)

## Purpose

The **Citation Validity Index (CVI)** is the new citation-aware component in **TRUST-LAB v3**. Its role is to estimate whether the references associated with an AI-generated answer appear sufficiently structured, complete, and plausible for later verification. In the current GitHub-first version, CVI is not intended to be a definitive bibliographic truth engine. Instead, it functions as an **interpretable first-pass integrity signal** that helps researchers judge whether an answer’s reference layer deserves trust.

This addition changes the project in an important way. TRUST-LAB is no longer limited to evaluating answer behavior alone. It now also inspects whether the answer’s supporting citation frame appears academically credible. That shift is especially relevant in research-facing AI use, where fabricated or weak references can materially distort the perceived reliability of otherwise fluent outputs.

## Conceptual definition

CVI is designed as a ratio between apparently valid citations and the total number of citations supplied for evaluation.

> **CVI = N_verified / N_total**

In this expression, **N_verified** denotes the number of citations that meet the repository’s current heuristic validity criteria, while **N_total** denotes the total number of citations provided by the user or extracted from the answer.

The resulting score is interpreted on a bounded scale from **0** to **1**. A higher value indicates that a larger share of the citation set appears structurally credible and more likely to be verification-ready. A lower value indicates greater citation weakness, incompleteness, or suspicion.

| Symbol | Meaning | Interpretation |
|---|---|---|
| **N_verified** | Count of citations judged structurally credible | Higher is better |
| **N_total** | Count of all citations supplied for analysis | Denominator for normalization |
| **CVI** | Citation Validity Index | Closer to 1 means stronger citation quality |

## Why CVI matters in TRUST-LAB

The inclusion of CVI addresses a problem that is conceptually distinct from ordinary hallucination scoring. A model answer may be fluent, internally coherent, and topically aligned, yet still present fabricated or weak references. If those citations are accepted at face value, the answer can appear more trustworthy than it really is.

CVI therefore acts as a **research integrity signal** rather than merely a stylistic quality score. It is especially important in settings where researchers, analysts, or reviewers use AI systems to produce summaries, claims, or literature-oriented explanations. In such environments, the credibility of references is often inseparable from the credibility of the answer itself.

## First-version heuristic behavior

The current GitHub-first implementation is intentionally transparent. In its first public form, CVI should rely on visible structural cues rather than external verification APIs. The layer should inspect whether a citation appears to contain the kinds of metadata that real scholarly references commonly expose.

| Heuristic cue | Why it matters |
|---|---|
| **Year present** | Suggests temporal specificity and bibliographic structure |
| **DOI-like pattern present** | Indicates a stronger verification path |
| **Author-like formatting** | Suggests that the citation is more than a vague title fragment |
| **Minimum descriptive length** | Helps distinguish thin fragments from fuller citations |
| **Venue-like metadata** | Suggests the citation may correspond to a journal, conference, or report |
| **Overall completeness** | Improves confidence that the reference is not purely fabricated shorthand |

These cues do not prove authenticity. They produce a transparent first-pass signal that can later be extended into stronger scholarly validation workflows.

## Citation-level status model

For interpretability, the CVI layer should classify each citation into readable states rather than returning only a hidden internal score.

| Status | Meaning |
|---|---|
| **verified-like** | The citation appears structurally strong and plausibly verification-ready |
| **partially supported** | The citation has some credible structure but remains incomplete |
| **unverified** | The citation lacks sufficient structure to inspire confidence |
| **missing metadata** | The citation is too incomplete for meaningful first-pass assessment |

This status vocabulary helps the demo page show users why their aggregate CVI score looks strong or weak.

## Relationship to TCRI v3

CVI is not an isolated metric in the project. It directly influences the higher-level **Trust Collapse Risk Index v3 (TCRI v3)**.

> **TCRI v3 = C × (1 − S) × (1 + H) × (1 + λDSR) × (1 + γ(1 − CVI))**

In this formulation, the CVI term acts as a penalty multiplier. When citation quality declines, **(1 − CVI)** becomes larger, which increases the overall trust-collapse estimate. This reflects the project’s central claim that trust failure can emerge not only from unsupported language and instability, but also from **citation degradation**.

| CVI level | Effect on TCRI v3 |
|---|---|
| **High CVI** | Citation penalty remains small; trust-collapse estimate is less inflated by reference weakness |
| **Medium CVI** | Citation concerns contribute a moderate penalty to the trust-collapse signal |
| **Low CVI** | Citation weakness materially raises the trust-collapse estimate |

## Intended implementation path

The first public version should remain heuristic and easy to inspect on GitHub. Later versions can become progressively stronger.

| Version stage | Intended evolution |
|---|---|
| **v1.0** | Heuristic citation validation using visible structure and metadata cues |
| **v1.1** | Better explanation text, clearer citation flags, and richer citation-aware examples |
| **v2.0** | Optional verifier-backed validation through external scholarly APIs such as Crossref, Semantic Scholar, or OpenAlex |
| **v3.0** | Citation benchmark suite with curated valid, ambiguous, and fabricated reference cases |

## Interface implications

Because CVI is designed for interpretability, the bilingual demo should not hide it as a single number. The interface should expose both the aggregate score and citation-level diagnostics. At minimum, the demo should show the **CVI score**, the number of apparently valid citations, the number of total citations, and a per-citation panel with status, score, and visible flags.

This design choice is important. It preserves the GitHub-first, research-grade character of the project by ensuring that the website functions as an explanatory layer rather than a decorative front end.

## Scope note

The current CVI document defines the conceptual role of citation validation in TRUST-LAB. It does not claim that the first version proves bibliographic truth. Instead, it establishes a transparent and inspectable methodology for estimating whether cited references appear strong enough to justify closer trust or deeper external verification.
