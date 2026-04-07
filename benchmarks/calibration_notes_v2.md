# Calibration Notes v2

This note documents the first calibration refinement pass after internal validation of the TRUST-LAB citation-aware TCRI v3 demo.

## Motivation

The initial internal validation showed three calibration issues.

| Scenario | Observed outcome before v2 | Calibration concern |
|---|---|---|
| `research_case_001` | High Risk, TCRI 76%, CVI 0% | Too strict for a moderately grounded case with mixed citation quality |
| Overclaiming edge case | High Risk, TCRI 65%, CVI 0% | Reasonable, but not severe enough for absolute unsupported claims |
| No citations supplied | Verify, TCRI 50%, CVI 50% | Too generous when no citation evidence is provided |

## Parameter changes

| Parameter | Previous | v2 value | Reasoning |
|---|---:|---:|---|
| `citationPenaltyGamma` | 0.70 | 0.20 | Reduce citation-driven over-escalation in moderate cases |
| `hallucinationWeight` | implicit 1.00 in final TCRI factor | 1.30 | Increase sensitivity to unsupported overclaiming in final trust-collapse scoring |
| `noCitationDefaultCvi` | 0.50 | 0.30 | Prevent missing-citation cases from receiving a neutral midpoint citation score |

## Heuristic changes

A stronger absolute-overclaiming trigger was added for phrases such as `perfect accuracy`, `guarantees`, `always`, `never`, and similar universal claims. This helps move unsupported certainty closer to the intended upper-risk bands.

## Expected target behavior after v2

| Scenario | Intended target band |
|---|---|
| `research_case_001` | Verify |
| Overclaiming edge case | High Risk, ideally closer to Critical than before |
| No citations supplied | Lower Verify or light High Risk, but no longer protected by a midpoint CVI default |

## Next step

Re-run the benchmark cases in the live interface and compare the new outputs against these target bands before making any further methodological changes.
