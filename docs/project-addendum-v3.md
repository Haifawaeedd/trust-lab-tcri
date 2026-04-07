# TRUST-LAB v3 Project Addendum

## Purpose

This addendum records the new project direction introduced in the second concept note. It extends **TRUST-LAB** from a general trust-analysis instrument into a more explicitly **citation-aware research integrity platform**. The core shift is the addition of a **Citation Validity Index (CVI)** layer and the corresponding **TCRI v3** framing.

## Strategic interpretation

The added material identifies a strong research opportunity: trust analysis for AI-generated content becomes substantially more valuable when it also addresses **citation hallucination** and **reference verifiability**. In practical terms, TRUST-LAB should no longer evaluate only the textual behavior of an answer. It should also inspect whether the answer’s cited references appear structurally real, plausibly complete, and suitable for later verification.

This changes the project narrative in a meaningful way. The platform is no longer only an LLM trust tool. It becomes a **research integrity interface** oriented toward researchers, reviewers, and expert users who need interpretable warning signals about both content quality and citation quality.

## Core conceptual additions

| Element | New role in TRUST-LAB | Immediate implementation implication |
|---|---|---|
| **CVI** | Measures the apparent validity of cited references | Add citation input, citation scoring, and citation-status outputs |
| **Citation Validation Layer** | New analytical layer between hallucination analysis and final aggregation | Update all architecture diagrams and methodology descriptions |
| **TCRI v3** | Extends the original TCRI formula with a citation penalty term | Update the formal metrics page, demo logic, and decision explanation |
| **Citation-aware demo** | Allows researchers to paste citations line by line | Add a citations field and per-citation output panel |
| **Research integrity positioning** | Reframes the project as a citation-aware research instrument | Update README, docs, and website copy |

## Revised architecture

The addendum implies the following higher-level analytical flow:

> **User Input → Data Integrity Layer (DSR) → Reliability Layer → Support Layer → Hallucination Layer → Citation Validation Layer (CVI) → TCRI v3 Engine → Decision and Explanation Layer → Research Demo / GitHub / Public Interface**

This sequence preserves the original layered logic while making citation quality an explicit factor in downstream trust-collapse analysis.

## Revised formal framing

The second attachment proposes retaining the original trust-collapse structure while adding a citation penalty term. The intended expression is:

> **TCRI v3 = C × (1 − S) × (1 + H) × (1 + λDSR) × (1 + γ(1 − CVI))**

In this framing, **C** denotes reliability or confidence, **S** denotes support, **H** denotes hallucination risk, **DSR** denotes data-scale instability, and **CVI** denotes citation validity. The terms **λ** and **γ** act as weighting parameters for the data-instability and citation-penalty contributions.

The conceptual effect is straightforward. When citation quality declines, the penalty term increases, and the trust-collapse estimate rises accordingly.

## First-version CVI behavior

For the current GitHub-first version, the proposed CVI layer should remain heuristic and interpretable. The attachment suggests starting without external APIs. Instead, the layer should score each citation using visible structural cues such as the presence of a year, author-like structure, minimum descriptive length, DOI-like patterns, venue-like metadata, and general completeness.

This first version should classify citations into at least four understandable states: **verified-like**, **partially supported**, **unverified**, and **missing metadata**. Even if later versions connect to Crossref, Semantic Scholar, or OpenAlex, the first release should already make the logic transparent to users.

## Repository implications

The repository should now document a broader research scope. In addition to the existing DSR and TCRI materials, it should include a dedicated CVI document, citation-aware examples, and architecture language that treats citation validation as a first-class analytical layer.

The examples directory should be expanded so that researchers can inspect both ordinary trust cases and citation-sensitive cases. The methodology and formal metrics documents should explicitly distinguish the earlier metric framing from the revised **TCRI v3** formulation.

## Website and demo implications

The bilingual website should be updated so that the methodology page explains **DSR**, **CVI**, and **TCRI v3** together as part of one research contribution. The demo page should accept optional citations, one per line, and present both an aggregate **CVI** score and a citation-level breakdown.

The decision interface should also become more explicit. The website should show interpretable decision badges such as **Safe**, **Verify**, **High Risk**, and **Critical**, while explaining how citation weakness contributes to the final risk profile.

## Implementation priority

| Priority | Required update |
|---|---|
| **1** | Update the README and repository narrative to foreground citation hallucination and research integrity |
| **2** | Add formal documentation for CVI and revise the TCRI definition to TCRI v3 |
| **3** | Expand the examples folder with citation-aware benchmark and demo cases |
| **4** | Revise bilingual website content so the methodology and project pages explain CVI clearly |
| **5** | Extend the demo flow to accept citations and return citation-aware outputs |

## Scope note

This addendum is an internal project decision document derived from the user-provided concept note. It records what the next implementation pass must incorporate. It does not yet serve as the final public README or final methodology text; those materials should be revised in the next phase to align with this specification.
