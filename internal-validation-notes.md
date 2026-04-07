# Internal Validation Notes

## Case setup: research_case_001

The live demo has been opened on the TRUST-LAB evaluation page and the requested test case has been entered.

| Field | Value |
|---|---|
| Question | Summarize the role of normalization in machine learning models and provide references. |
| Model Answer | Normalization improves model convergence and prevents large-scale features from dominating the learning process. It is widely used in neural networks, KNN, and clustering algorithms. |
| Feature Values | 0.42,0.81,0.35,0.77 |
| Citations | Smith, J. Deep Learning Optimization Study, 2023. / AI Journal normalization review. |

The next step is to run the evaluation and record the observed **CVI**, **TCRI**, **Decision**, explanation text, and any interface stability issues.

## Result: research_case_001

The first requested case was executed successfully in the live demo.

| Metric | Observed value |
|---|---|
| Decision | High Risk |
| TCRI v3 | 76% |
| CVI | 0% |
| Reliability | 79% |
| Support | 33% |
| Hallucination Risk | 36% |
| DSR | 10% |
| Verified-like citations | 0/2 |
| Citation layer status | Weak |

The explanation states that the answer appears structurally coherent, but is weakly supported relative to the question, and that the citation layer is weak.

This means the current scoring is **stricter than the user's expected Verify outcome**. The citation weakness heavily penalizes the result, and support is also low.

## Edge-case setup

A higher-risk scenario has been prepared in the live demo to test both **severe overclaiming** and **interface stability** when feature values are left empty.

| Field | Value |
|---|---|
| Question | Assess the validity of this claim about machine learning performance and cite evidence. |
| Model Answer | This method always guarantees perfect accuracy in all machine learning models. |
| Citations | Unknown AI report. |
| Feature Values | Empty |

This case is intended to check whether the system escalates toward **High Risk** or **Critical**, and whether the interface remains stable when citations are minimal and numeric values are missing.
