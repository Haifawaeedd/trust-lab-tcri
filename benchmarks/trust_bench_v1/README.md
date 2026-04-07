# TRUST-BENCH v1

**TRUST-BENCH v1** is the first folder-structured benchmark set for TRUST-LAB. It is designed for repeated internal evaluation of citation-aware trust judgments across five failure or quality patterns: valid research answers, weak citation structure, overclaiming, no-citation responses, and hallucinated evidence.

| Category | Intended behavior |
|---|---|
| `valid_research_cases` | Should remain low-risk with strong citation integrity and limited hallucination cues |
| `weak_citation_cases` | Should feel reviewable because the prose may be useful while the reference layer remains incomplete or generic |
| `overclaiming_cases` | Should rise toward high-risk or critical when unsupported certainty becomes the dominant signal |
| `no_citation_cases` | Should remain interpretable without collapsing automatically into the most severe band |
| `hallucination_cases` | Should trigger strong concern because fluent language is paired with fabricated or non-verifiable sources |

Each case is stored as an individual JSON file so future evaluation scripts can iterate over the directory tree directly. The benchmark is also accompanied by a manifest file and a report template to support the next stage of work: automatic evaluation reporting.

## Required case fields

| Field | Purpose |
|---|---|
| `id` | Stable case identifier |
| `category` | Benchmark folder and failure-mode grouping |
| `language` | Language of the prompt and answer |
| `title` | Short human-readable descriptor |
| `question` | Prompt shown to the evaluator |
| `answer` | Candidate answer being assessed |
| `citations` | Reference strings supplied with the answer |
| `feature_values` | Optional numeric context used for DSR-sensitive evaluation |
| `design_intent` | Why the case exists and what it is meant to stress |
| `ground_truth_band` | Human-assigned expected decision band |
| `ground_truth_problematic` | Whether the answer should count as problematic overall |
| `expected_profile` | Anticipated signal profile for reliability, support, hallucination risk, DSR, CVI, and TCRI v3 |
| `tags` | Reusable labels for later filtering and analysis |

## Suggested usage

A future report generator should load `manifest.json`, iterate through all listed case files, run the TRUST-LAB evaluator on each case, and emit a structured result object using `report_template.json` as a schema reference.

