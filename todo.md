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
