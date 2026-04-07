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

## Direct GitHub Creation Request

- [ ] Determine whether the repository can be created directly on GitHub from the current environment
- [ ] If direct creation is possible, create the `trust-lab-tcri` repository immediately
- [ ] If account interaction is still required, use the shortest possible GitHub completion path for the user

## GitHub Export Navigation Help

- [ ] Show the exact location of the GitHub export controls in the management UI and guide the user through the final export click

## Public Visibility Clarification

- [ ] Clarify whether the user wants the deployed site published publicly or the connected GitHub repository visibility changed to public
- [ ] Explain that website publishing and GitHub repository visibility are separate actions
- [ ] Give the user the correct next step for making the GitHub repository public if that is their goal

## Publishing Fees Support Redirect

- [ ] Redirect the user to the official help channel for any publishing-fee, billing, or subscription questions

## LinkedIn Launch Copy

- [ ] Draft a professional LinkedIn post introducing TRUST-LAB, its citation-aware TCRI v3 framing, and the public launch link
- [ ] Review the current LinkedIn draft screenshot for clarity, link readiness, and publication risks before posting
- [ ] Refine a LinkedIn post that explains the internal validation cases, calibration insight, and decision-band interpretation in a clear public-facing format
- [ ] Recommend whether to publish the current validation-focused post as-is or replace it with a more polished version for broader professional impact
- [ ] Create a LinkedIn-ready visual asset set for TRUST-LAB, including a cover graphic, a results chart, and a clean research-style explainer image
- [ ] Reframe the visual direction to be more engaging and post-like for social media, inspired by the user's example, while keeping TRUST-LAB professional and credible
- [ ] Produce a more exciting Arabic-friendly LinkedIn post visual set with stronger hooks, clearer focal points, and scroll-stopping composition
- [ ] Regenerate the TRUST-LAB social-post visuals in English only, removing all Arabic headlines and labels from the LinkedIn image set

## Public Link Retrieval

- [ ] Tell the user exactly where to find the website public link after publishing, and clarify where the GitHub repository link appears if needed
- [ ] Retrieve or locate the connected GitHub repository URL so the user can copy it directly

## GitHub Sync Workflow

- [ ] After every future project update, make sure the latest workspace changes are also synchronized to the connected GitHub repository
- [ ] Explicitly confirm GitHub sync status to the user whenever a meaningful project change is completed
- [ ] Push the current TRUST-LAB workspace updates to the connected GitHub repository now, including the latest calibration work and LinkedIn visual assets

## Internal Validation Before Public Testing

- [ ] Run the user's specified `research_case_001` in the live demo and record CVI, TCRI, decision, and explanation behavior
- [ ] Test edge-case instability with a highly overconfident answer and weak citation to verify High Risk or Critical behavior
- [ ] Stress-check the interface with missing citations, a single citation, and empty feature values to confirm the demo remains stable
- [ ] Summarize the observed outputs in Arabic for the user, including whether the scoring feels balanced and interpretable

## Calibration Refinement v2

- [ ] Reduce the citation-penalty weight so weak citations do not over-escalate moderate cases into High Risk too easily
- [ ] Increase the hallucination weighting so aggressive overclaiming moves closer to Critical when evidence is weak
- [ ] Change the no-citation default CVI behavior so missing citations no longer receive an overly generous midpoint score
- [ ] Create `benchmarks/calibration_notes_v2.md` documenting the revised gamma, hallucination weighting, and no-citation handling
- [ ] Re-run the internal validation cases after recalibration and compare the new outputs with the intended target bands

## Calibration Refinement v3

- [ ] Soften the support penalty by attenuating the direct `(1 - support)` effect in TCRI v3
- [ ] Add an explicit overclaiming escalation boost when absolute claims coincide with very weak citation integrity
- [ ] Create `benchmarks/calibration_notes_v3.md` documenting the support factor, overclaiming boost rule, and benchmark expectations
- [ ] Re-run the three reference cases and compare v2 versus v3 outcomes in a final Arabic summary table

## Decision Band Refinement Proposal

- [ ] Evaluate adding a new intermediate decision label such as `Borderline Verify` or `Review Required` for scores between approximately 50 and 70
- [ ] Compare the benefits of decision-band refinement versus additional weight recalibration for research interpretability
- [ ] Recommend whether TRUST-LAB should adopt the new label without changing the current scoring methodology

## Research Roadmap Prioritization

- [ ] Give an honest recommendation on whether benchmark expansion is truly necessary now or optional
- [ ] Prioritize the roadmap items by what is essential for turning TRUST-LAB from a prototype into a credible research system
- [ ] Clarify which next step is mandatory, which is valuable, and which can wait

## trust_bench_v1 Buildout

- [ ] Inspect the existing benchmarks directory and current case/result format before creating the new dataset structure
- [ ] Create `benchmarks/trust_bench_v1/` with five category folders: `valid_research_cases`, `weak_citation_cases`, `overclaiming_cases`, `no_citation_cases`, and `hallucination_cases`
- [ ] Write the first 25 benchmark case files with balanced coverage across the five case categories
- [ ] Add a benchmark README or schema note explaining required fields, expected usage, and evaluation intent
- [ ] Prepare the benchmark set so it can be reused by a report generator in the next step
- [ ] Sync the completed benchmark build to GitHub after the files are created

## Full Build Continuation

- [ ] Fix any remaining route or import issues so Project, Methodology, and Demo pages load reliably
- [ ] Complete the Demo page as a working citation-aware evaluation experience with stable input handling
- [ ] Ensure the AR / EN language toggle works consistently across all main pages
- [ ] Present TCRI, DSR, CVI, decision status, and explanation outputs clearly in the interface
- [ ] Polish the Methodology and Project pages so they read as a complete research-facing public prototype
- [ ] Validate the full interface, save a new checkpoint, and prepare the next GitHub-ready release state

## GitHub Contributor Attribution Cleanup

- [ ] Inspect the local git author and committer history to identify why `manus-agent / Manus` appears in the GitHub contributors panel
- [ ] Check the current repository remotes, branch state, and recent commits before making any history changes
- [ ] Determine whether the visible contributor can be removed by normal forward commits or whether history rewriting would be required
- [ ] Rewrite all existing `Manus <dev-agent@manus.ai>` authored and committed history to `Haifaa Owayed <haifawaeed2015@gmail.com>` while preserving repository contents
- [ ] Force-sync the rewritten repository history to GitHub and verify the expected result and any remaining limitations
- [ ] Inspect GitHub-side contributor APIs, branch refs, and cached attribution signals after the rewrite
- [ ] Remove any remaining repository-side references that could keep `manus-agent / Manus` visible as a contributor
- [ ] Re-check the GitHub contributors panel behavior and report whether any remaining visibility is caused by GitHub-side caching

## TrustNet Research Direction

- [ ] Assess whether a learned trust-risk classifier would materially strengthen TRUST-LAB's originality compared with the current heuristic TCRI/CVI pipeline
- [ ] Audit `TRUST-BENCH` for label consistency, class balance, and dataset sufficiency before using it for supervised learning
- [ ] Convert the benchmark cases into training-ready JSONL classification format with question, answer, citations, and label fields
- [ ] Define the first modeling baseline for `TrustNet`, including label mapping, train/validation/test splits, and evaluation metrics
- [ ] Plan a direct comparison between the heuristic TRUST-LAB system and the learned classifier so the research contribution can be stated clearly

## Original Research Redirection

- [ ] Define the minimum originality bar for the next TRUST-LAB direction so it is not merely assembly or integration
- [ ] Generate candidate project concepts that introduce a new core mechanism, formal model, optimization objective, or learning framework
- [ ] Select the strongest originality-first concept and state its precise novelty claim in one sentence
- [ ] Outline the smallest credible prototype and evaluation plan for the chosen original concept

## GitHub Edit Clarification

- [ ] Confirm which exact GitHub-side edits the user wants to start with before changing repository files or settings
- [ ] Synchronize any future meaningful TRUST-LAB repository update to GitHub after the local change is completed
- [ ] Explicitly report GitHub synchronization status to the user whenever an update is made

## Experiment 1 — Evidence Corruption Perturbation Study

- [ ] Select 10 strong cases from `benchmarks/trust_bench_v1/valid_research_cases` as the clean evaluation set
- [ ] Create three perturbed variants for each selected case: weakened citation, fabricated citation, and claim exaggeration
- [ ] Run the current TRUST-LAB evaluator on all clean and perturbed variants and collect the resulting scores and decision bands
- [ ] Test whether the trust-risk ordering behaves rationally under evidence corruption for each case
- [ ] Summarize the experiment in a research-style table and sync the results to GitHub

## CVI Semantic Mismatch Upgrade and Experiment 2

- [ ] Turn the Experiment 1 failure into an explicit research claim in the benchmark reporting language
- [ ] Separate citation structural validity from semantic plausibility inside the CVI logic
- [ ] Add semantic citation mismatch checks for topic alignment, venue plausibility, and citation-answer coherence
- [ ] Re-run the evidence corruption experiment after the CVI upgrade to measure whether fabricated citations are penalized more clearly
- [ ] Create Experiment 2 with semantic mismatch cases where the citation domain conflicts with the answer domain
- [ ] Compare Experiment 1 and Experiment 2 results and sync the updated research artifacts to GitHub

## Experiment 3 — Counterfactual Trust Consistency

- [ ] Define the counterfactual trust-consistency constraints for clean, weakened, fabricated, exaggerated, and semantic mismatch variants
- [ ] Reuse the current TRUST-LAB evaluator and existing perturbation generation patterns to build a reproducible Experiment 3 pipeline
- [ ] Create `benchmarks/experiment_3_counterfactual_consistency.py` to generate variants, score them, and test ordering constraints
- [ ] Compute per-case consistency outcomes, aggregate consistency rates, and produce a violation profile for failed orderings
- [ ] Write JSON, CSV, and Markdown research artifacts for Experiment 3 and sync them to GitHub
