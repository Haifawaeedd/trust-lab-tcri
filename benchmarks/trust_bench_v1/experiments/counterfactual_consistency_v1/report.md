# Experiment 3 — Counterfactual Trust Consistency

تنتقل هذه التجربة من مجرد قياس الدرجة إلى **اختبار مبدأ**: هل يحافظ TRUST-LAB على ترتيب منطقي للمخاطر عندما نفسد الأدلة تدريجيًا على نفس الحالة؟ الفكرة هنا ليست إضافة metric جديدة، بل اختبار ما إذا كان النظام يتصرف كأنه يملك **نظرية اتساق للثقة** تحت perturbations مضبوطة.

> **Originality claim:** TRUST-LAB introduces a counterfactual trust-consistency evaluation framework that measures whether trust-risk degrades rationally under controlled evidence perturbations.

| المؤشر | القيمة |
|---|---|
| عدد الحالات | 10 |
| عدد النسخ المقيمة | 50 |
| نجاح الترتيب الأساسي clean < weakened < fabricated | 0 / 10 |
| النجاح الكلي لكل القيود | 0 / 10 |
| clean < weakened | 10 / 10 |
| weakened < fabricated | 0 / 10 |
| clean < fabricated | 10 / 10 |
| clean < exaggerated | 10 / 10 |
| clean < semantic mismatch | 9 / 10 |
| متوسط Δ(clean→weakened) | 0.02 |
| متوسط Δ(weakened→fabricated) | -0.01 |
| متوسط Δ(clean→exaggerated) | 0.108 |
| متوسط Δ(clean→semantic mismatch) | 0.017 |

## Violation Profile

| القيد | عدد الانتهاكات |
|---|---|
| clean<weakened | 0 |
| weakened<fabricated | 10 |
| clean<fabricated | 0 |
| clean<exaggerated | 0 |
| clean<semantic_mismatch | 1 |

## Detailed Case Results

| Case | Domain | Clean | Weakened | Fabricated | Exaggerated | Semantic Mismatch | Violations | Result |
|---|---|---|---|---|---|---|---|---|
| VR-001 | ml | 0.715 (High Risk) | 0.733 (High Risk) | 0.724 (High Risk) | 0.810 (High Risk) | 0.743 (High Risk) | weakened<fabricated | Fail |
| VR-002 | health | 0.401 (Verify) | 0.415 (Verify) | 0.406 (Verify) | 0.514 (Review Required) | 0.414 (Verify) | weakened<fabricated | Fail |
| VR-003 | health | 0.442 (Verify) | 0.461 (Verify) | 0.451 (Verify) | 0.538 (Review Required) | 0.448 (Verify) | weakened<fabricated | Fail |
| VR-004 | climate | 0.460 (Verify) | 0.479 (Verify) | 0.467 (Verify) | 0.577 (Review Required) | 0.460 (Verify) | weakened<fabricated; clean<semantic_mismatch | Fail |
| VR-005 | cybersecurity | 0.421 (Verify) | 0.446 (Verify) | 0.437 (Verify) | 0.528 (Review Required) | 0.447 (Verify) | weakened<fabricated | Fail |
| VR-006 | health | 0.388 (Verify) | 0.401 (Verify) | 0.392 (Verify) | 0.514 (Review Required) | 0.394 (Verify) | weakened<fabricated | Fail |
| VR-007 | ml | 0.446 (Verify) | 0.466 (Verify) | 0.457 (Verify) | 0.571 (Review Required) | 0.471 (Verify) | weakened<fabricated | Fail |
| VR-008 | education | 0.424 (Verify) | 0.446 (Verify) | 0.438 (Verify) | 0.525 (Review Required) | 0.448 (Verify) | weakened<fabricated | Fail |
| VR-009 | climate | 0.417 (Verify) | 0.445 (Verify) | 0.437 (Verify) | 0.526 (Review Required) | 0.439 (Verify) | weakened<fabricated | Fail |
| VR-010 | education | 0.688 (Review Required) | 0.711 (High Risk) | 0.693 (Review Required) | 0.777 (High Risk) | 0.705 (High Risk) | weakened<fabricated | Fail |

إذا ارتفع معدل الاتساق، فسيصبح لدينا ادعاء أقوى من مجرد أن TRUST-LAB يلتقط إشارات سطحية: سيكون لدينا دليل على أنه يحافظ على **ترتيب سببي/مضاد للواقع** عندما تتدهور الأدلة تدريجيًا. وإذا ظهرت انتهاكات متكررة، فهذه ليست مشكلة تجميلية، بل **خريطة ضعف نظرية** توضّح أي transitions ما زالت غير مستقرة، مثل الانتقال من weakened إلى fabricated أو من clean إلى semantic mismatch.
