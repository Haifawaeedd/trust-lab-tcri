# TRUST-LAB Website Information Architecture

## Purpose

This document defines the information architecture for the **TRUST-LAB** website and demo layer after the project’s extension into a **citation-aware research integrity platform**. The site is not intended to operate as a detached marketing page. It should function as the public explanatory surface of the GitHub-first repository, making the project understandable to researchers, reviewers, and technically oriented visitors in both **English** and **Arabic**.

The website must therefore preserve the repository’s seriousness while improving accessibility, visual clarity, and navigability. In the revised version, that means the site must explain not only **Data Scale Risk (DSR)** and **Trust Collapse Risk Index v3 (TCRI v3)**, but also the new **Citation Validity Index (CVI)** and the broader research problem of **citation hallucination**.

| Site objective | Practical meaning |
|---|---|
| **Explain the project quickly** | A visitor should understand TRUST-LAB within the first viewport |
| **Preserve research credibility** | The site should feel like an institutional research instrument rather than a trend-driven AI landing page |
| **Support bilingual reading** | Core content must be available in both Arabic and English through a visible toggle |
| **Clarify the methodology** | Visitors should understand how DSR, CVI, and TCRI v3 relate |
| **Make the demo legible** | Users should understand what the outputs mean and why they were produced |

## Revised Project Framing

The website should now present TRUST-LAB as more than a general trust-analysis tool. Its stronger public framing is that of a **citation-aware platform for evaluating AI-generated outputs in research and expert workflows**. The site should make clear that the platform evaluates both **answer behavior** and **reference integrity**.

This framing matters because many visitors will immediately understand the value of hallucination analysis, but the real differentiation of TRUST-LAB lies in showing that trust degradation can also emerge through **weak, incomplete, or fabricated citations**. The interface should therefore repeatedly connect the project to the idea of **research integrity**, not only generic AI safety language.

## Chosen Visual Philosophy

The interface should continue to follow the selected **Editorial Systems Lab** direction. That means the site should feel like a bilingual institutional research dossier shaped by Swiss editorial modernism. It should use asymmetry, strong typography, disciplined sections, restrained motion, and paper-like surfaces with muted teal accents.

This visual direction remains appropriate after the CVI extension because it gives weight to formal notation, supports long-form explanation, and avoids the common mistake of making a serious research tool look like a generic AI dashboard.

## Primary Navigation Model

The public website should remain organized around **three primary pages** and a compact top navigation. The three-page model is still sufficient for the first public version because it mirrors the repository’s logic without fragmenting the experience.

| Page | URL intent | Function |
|---|---|---|
| **Project** | `/` | Introduces TRUST-LAB, its GitHub-first identity, originality, architecture snapshot, and roadmap |
| **Methodology** | `/methodology` | Explains DSR, CVI, TCRI v3, analytical layers, and decision interpretation |
| **Demo** | `/demo` | Allows users to input a question, a model answer, optional numeric values, and optional citations for evaluation |

This navigation should remain visible on desktop and collapse gracefully on smaller screens. The language toggle should remain near the primary navigation because bilingual access is part of the product architecture rather than a hidden accessibility option.

## Language Strategy

The website must support both **English** and **Arabic** as first-class interface languages. The most reliable v1 approach remains a structured bilingual content object in the frontend that can switch the interface using a visible **AR / EN** toggle.

The bilingual strategy should now account for both scientific terminology and citation vocabulary. Terms such as **TCRI v3**, **DSR**, **CVI**, **Reliability**, **Support**, and **Decision** should remain recognizable across both languages. Arabic copy should prioritize clarity and scholarly readability over literal word-for-word translation, while English copy should remain concise, formal, and publication-friendly.

| Language rule | Rationale |
|---|---|
| **The full interface changes language** | Partial translation weakens trust and usability |
| **Layout must support both LTR and RTL** | Arabic content requires correct directionality and spacing |
| **Scientific terms stay recognizable** | Readers should not lose track of core metrics across languages |
| **Numerical outputs remain visually stable** | Metric comparison should stay easy regardless of language |
| **Citation terms must be explicit** | Users should clearly understand what the citation layer is evaluating |

## Page-Level Content Strategy

### Project Page

The **Project** page is the public entry point to TRUST-LAB. Its job is to establish the project’s identity, originality, and relevance before a visitor reaches the deeper methodological explanation or demo.

The page should open with a strong hero statement that frames TRUST-LAB as a **GitHub-first, citation-aware research platform for AI output evaluation**. The first explanatory block should then connect the project to the real problem it addresses: answers can appear coherent while still being weakly supported, numerically unstable, hallucinatory, or accompanied by structurally weak citations.

| Project page section | Function |
|---|---|
| **Hero** | Establish project identity and GitHub-first research framing |
| **Short abstract** | Summarize the problem of trust failure and citation fragility in AI outputs |
| **Original contribution** | Highlight **DSR**, **CVI**, and **TCRI v3** as the core contribution set |
| **Architecture snapshot** | Introduce the layered flow visually, including the Citation Validation Layer |
| **Research integrity block** | Explain why citation quality changes the interpretation of AI answers |
| **Roadmap section** | Show the staged progression from v1.0 to later versions |
| **Call to action** | Direct users to Methodology or Demo |

The Project page should remain the most editorial and narrative page of the site. It should explain the value of the framework without forcing the visitor to parse the formal details immediately.

### Methodology Page

The **Methodology** page should translate the formal repository documents into a readable but still rigorous public explanation. It should avoid dense academic formatting while preserving seriousness.

This page must now clearly present the relationship among **DSR**, **CVI**, and **TCRI v3**. It should explain the layered pipeline, why citation validation belongs inside trust analysis, and how the final decision bands are derived. The page should also state honestly that the first version uses transparent heuristics in selected layers.

| Methodology page section | Function |
|---|---|
| **Introductory framing** | Explain why layered trust analysis matters in research-facing AI use |
| **Formal equation band** | Present **TCRI v3** prominently |
| **Metric trio section** | Explain **DSR**, **CVI**, and their distinct roles |
| **Layered pipeline** | Explain each analytical layer, including Citation Validation |
| **Citation-integrity note** | Clarify why weak references intensify trust-collapse risk |
| **Decision bands** | Define **Safe**, **Verify**, **High Risk**, and **Critical** |
| **Limitation note** | State the v1 heuristic status honestly |

The page should present formulas as part of the narrative rather than as isolated decorations. The visitor should come away understanding both the architecture and the reason it exists.

### Demo Page

The **Demo** page should function as a research instrument rather than a decorative showcase. In the revised version, it must accept a **question**, a **model answer**, optional **comma-separated numeric feature values**, and optional **citations entered one per line**. It should then return a full citation-aware analytical profile.

| Demo page section | Function |
|---|---|
| **Input form** | Collect question, answer, optional feature values, and optional citations |
| **Example selector** | Let users load curated sample cases quickly |
| **Result summary** | Present **Decision**, **TCRI v3**, and explanation first |
| **Metric cards** | Show **Reliability**, **Support**, **Hallucination Risk**, **DSR**, and **CVI** clearly |
| **Citation panel** | Display citation-level status, flags, and score breakdowns |
| **Interpretation panel** | Explain what the outputs mean and which signals dominated |
| **Prototype note** | Remind users that v1 uses transparent heuristic logic |

The demo layout should avoid clutter. The user should never need to guess what a score means or how the citation panel relates to the final decision.

## Homepage Message Hierarchy

The revised Project page should communicate ideas in a stricter hierarchy so that the first viewport becomes immediately legible.

| Hierarchy level | Content intent |
|---|---|
| **Level 1** | TRUST-LAB is a GitHub-first research platform for evaluating AI outputs |
| **Level 2** | The project measures reliability, support, hallucination risk, data instability, and citation validity |
| **Level 3** | The core contribution is the interaction among **DSR**, **CVI**, and **TCRI v3** |
| **Level 4** | The repository and bilingual demo together make the method understandable to experts |

This hierarchy should keep the page from feeling washed out or overly abstract. The visitor should understand both the research identity and the immediate practical use case.

## Demo Output Hierarchy

The revised demo should reveal results in a consistent order so that interpretation becomes easier.

| Output layer | Why it appears here |
|---|---|
| **Decision** | Gives the user an immediate practical orientation |
| **TCRI v3** | Shows the overall trust-collapse estimate |
| **Short explanation** | Provides a readable summary before the user inspects details |
| **Core metric cards** | Displays the underlying numeric profile |
| **Citation panel** | Shows whether citation weakness contributed to the final result |
| **Notes / limitations** | Reminds the user that the result is heuristic and interpretable, not final proof |

This order preserves readability while still exposing the system’s layered logic.

## Visual Asset Strategy

The selected set of editorial images should still be used sparingly and intentionally. In the revised content model, each asset should support a specific research message.

| Asset | Intended placement | Reason |
|---|---|---|
| **Hero editorial image** | Project page hero | Establishes the research dossier atmosphere immediately |
| **Architecture panel** | Project page architecture section or Methodology page intro | Visually explains the layered analytical flow |
| **Equation atlas** | Methodology page metric section | Supports formal presentation of **DSR**, **CVI**, and **TCRI v3** |
| **Roadmap research image** | Project page roadmap section | Reinforces staged development maturity |

These images should never overwhelm the content. The metrics, explanations, and page structure remain the primary carriers of meaning.

## Interaction Strategy

The interactions should feel deliberate, measured, and useful. Motion should support reading and interpretation rather than create spectacle.

| Interaction | Desired behavior |
|---|---|
| **Language toggle** | Instant switch between English and Arabic with direction update |
| **Navigation** | Smooth but restrained transitions between pages |
| **Demo evaluation** | Immediate client-side computation with a clear result reveal |
| **Example loading** | One-click insertion of curated trust and citation scenarios |
| **Citation inspection** | Expandable or clearly separated citation diagnostics without visual noise |

## Trust and Credibility Signals

Because the site supports a research-oriented repository, it should include visible credibility cues. These signals should remain understated but clear.

| Credibility cue | Site expression |
|---|---|
| **Formal methodology** | Dedicated methodology page with formulas and layer definitions |
| **Repository seriousness** | Clear references to docs, roadmap, examples, and GitHub-first structure |
| **Citation-aware originality** | Visible explanation of why CVI matters in research workflows |
| **Honest limitation framing** | Explicit note that v1 is a heuristic prototype |
| **Structured outputs** | Results presented as interpretable signals rather than mystical scores |

## Recommended Frontend Content Model

The cleanest implementation path remains a shared structured bilingual content module. That module should now contain navigation labels, page copy, section titles, button text, example labels, metric explanations, and citation-panel text for both languages.

In the revised version, the content model must also include dedicated entries for **CVI**, **citation statuses**, **citation flags**, and **TCRI v3** explanation text. This will make the site easier to maintain, easier to export to GitHub, and more consistent across pages.

## Summary

The TRUST-LAB website should be built as a **bilingual research interface with three pages: Project, Methodology, and Demo**. Its information architecture must reflect the repository’s GitHub-first identity, preserve **DSR**, **CVI**, and **TCRI v3** as the conceptual core, and make the demo outputs understandable to researchers and expert users as quickly as possible.

The main strategic shift introduced by the revised concept is clear: the website should no longer present TRUST-LAB only as a general trust-analysis tool. It should present it as a **citation-aware research integrity platform** whose public interface explains why answer quality and reference quality must be assessed together.
