# TRUST-LAB Build Checklist

- [x] Confirm the GitHub-first repository narrative and success criteria for `trust-lab-tcri`
- [x] Create a clean research repository structure for documentation, examples, and website source
- [x] Write a strong root `README.md` with project framing, novelty statement, and build order
- [x] Write a formal `docs/methodology.md` covering TCRI and DSR definitions
- [x] Write a formal `docs/architecture.md` describing the layered system flow and decision pipeline
- [x] Write a `docs/formal-metrics.md` document for TCRI/DSR mathematical description and interpretation
- [x] Create `examples/` content with representative question-answer-input cases and expected outputs
- [x] Create a roadmap document aligned with v1.0, v1.1, v2.0, v3.0, and v4.0 progression
- [x] Refine the bilingual website information architecture for Project, Methodology, and Demo pages
- [ ] Integrate the selected editorial visual direction and approved roadmap imagery into the site
- [ ] Implement the bilingual interface with a visible AR / EN toggle
- [ ] Build the Project page to explain TRUST-LAB clearly for researchers and experts
- [ ] Build the Methodology page to explain layers, TCRI, DSR, and decision bands
- [ ] Build the Demo page with question, model answer, optional feature values, and computed outputs
- [ ] Present Reliability, Support, Hallucination Risk, DSR, TCRI, Decision, and Explanation clearly
- [ ] Validate the site experience, content clarity, and visual consistency
- [ ] Create the first checkpoint and prepare GitHub export guidance for the user

## CVI and TCRI v3 Addendum

- [x] Update the repository narrative to frame citation hallucination as a core TRUST-LAB research problem
- [x] Add formal documentation for CVI (Citation Validity Index) and its relationship to TCRI v3
- [x] Update methodology and architecture docs to include the Citation Validation Layer
- [x] Expand examples with citation-aware sample cases and reference-validation scenarios
- [ ] Revise bilingual website content to present CVI, citation integrity, and TCRI v3 clearly
- [ ] Extend the demo flow to accept optional references/citations and show a citation-aware decision profile

## Benchmark-driven Originality Layer

- [x] Add `benchmarks/trust_bench_v1.json` with 20–30 manually curated cases across Citation Hallucination, Overconfidence Collapse, Data Instability, and Partial Truth
- [x] Add `benchmarks/baseline_eval.py` to compare simple baselines against TRUST-LAB composite scoring
- [x] Add `benchmarks/ablation.py` to compare the full system against layer-removed variants
- [x] Add `docs/original_contribution.md` to formalize benchmark design, baseline logic, ablation value, and the case-generation protocol
- [x] Document that benchmark cases are manually curated to represent realistic failure modes in academic AI usage
- [x] Cross-link the benchmark layer from the root README and documentation index without changing the current frontend code

## Interface Refinement Pass

- [ ] Reduce the oversized left hero block so the first viewport feels balanced
- [ ] Replace the washed-out visual panel treatment with a clearer, more intentional focal composition
- [ ] Tighten the homepage grid so cards align more cleanly and read with stronger hierarchy
- [ ] Improve spacing, card proportions, and typography rhythm across the first screen
- [ ] Re-review the refreshed homepage against the editorial research design direction

## First Viewport Correction Pass

- [ ] Reduce the height and visual dominance of the faded left-side image block in the opening content area
- [ ] Raise text contrast and readability inside the left visual block so it no longer disappears into the background
- [ ] Rebalance the first content row so the right formula card aligns more intentionally with the left visual area
- [ ] Remove the large empty-feeling center gap in the first viewport by tightening the opening grid and card widths
- [ ] Re-check the homepage after the viewport rebalance so the opening screen reads as one coherent research cover

## Pre-publish Polish

- [ ] Add publication badges to the root README for status and version visibility
- [ ] Add a representative TRUST-LAB interface screenshot to strengthen the GitHub presentation
- [ ] Add a concise Original Contribution section to the README using the approved publication wording

## Overlap Fix and GitHub Export

- [ ] Remove the visible overlap and collision between the large left text block and adjacent content in the homepage first viewport
- [ ] Rebalance the first content row so each panel has clear boundaries and readable spacing on desktop
- [ ] Recheck the homepage after the layout correction to confirm no paragraph or panel overlap remains
- [ ] Save a fresh checkpoint after the interface fix for safe GitHub export
- [ ] Export the final TRUST-LAB repository to GitHub after the interface is corrected

## Methodological Protection and Publication Readiness

- [ ] Add a visible Citation Validity Index (CVI) card to the interface so the citation-validation layer is explicit and interpretable
- [ ] Add a clear research-prototype disclaimer to the interface and README stating that TRUST-LAB should not be used as the sole basis for academic, legal, or medical decisions and that citations require manual verification
- [ ] Add methodology language clarifying that scores are interpretability-oriented heuristic signals rather than absolute truth estimates
- [ ] Strengthen demo input handling so empty citations, non-numeric values, overly long answers, and unusual symbols do not break the interface
- [ ] Frame benchmark files as read-only research examples rather than editable public inputs
- [ ] Add clear version labeling such as Research Prototype v1.0 in the interface and repository presentation
- [ ] Add CITATION.cff so scholarly reuse and attribution are clearly defined
- [ ] After the interface and repository protections are added, export the final repository to GitHub
