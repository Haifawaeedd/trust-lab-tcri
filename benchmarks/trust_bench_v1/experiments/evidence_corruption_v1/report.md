# Experiment 1 — Evidence Corruption Perturbation Study

تهدف هذه التجربة إلى اختبار سؤال بحثي واحد: **هل ترتفع درجة المخاطر في TRUST-LAB بشكل منطقي عندما تُفسد طبقة الأدلة؟** استخدمت التجربة عشر حالات clean من `valid_research_cases`، ثم أُنشئت لكل حالة ثلاث نسخ مفسدة: `weakened citation` و`fabricated citation` و`claim exaggeration`.

| المؤشر | القيمة |
|---|---|
| عدد الحالات النظيفة المختارة | 10 |
| عدد النسخ المقيمة | 40 |
| نجاح الترتيب clean < weakened < fabricated | 0 / 10 |
| نجاح زيادة الخطر في exaggerated مقارنة بـ clean | 10 / 10 |
| النجاح الكامل للحالتين معًا | 0 / 10 |

## Detailed Results

| Case | Clean | Weakened | Fabricated | Exaggerated | Chain | Exaggeration | Overall |
|---|---|---|---|---|---|---|---|
| VR-001 | 0.701 (High Risk) | 0.765 (High Risk) | 0.701 (High Risk) | 0.797 (High Risk) | Fail | Pass | Fail |
| VR-002 | 0.444 (Verify) | 0.444 (Verify) | 0.387 (Verify) | 0.563 (Review Required) | Fail | Pass | Fail |
| VR-003 | 0.477 (Verify) | 0.477 (Verify) | 0.417 (Verify) | 0.576 (Review Required) | Fail | Pass | Fail |
| VR-004 | 0.503 (Review Required) | 0.503 (Review Required) | 0.441 (Verify) | 0.623 (Review Required) | Fail | Pass | Fail |
| VR-005 | 0.440 (Verify) | 0.469 (Verify) | 0.410 (Verify) | 0.549 (Review Required) | Fail | Pass | Fail |
| VR-006 | 0.396 (Verify) | 0.423 (Verify) | 0.368 (Verify) | 0.523 (Review Required) | Fail | Pass | Fail |
| VR-007 | 0.434 (Verify) | 0.495 (Verify) | 0.434 (Verify) | 0.558 (Review Required) | Fail | Pass | Fail |
| VR-008 | 0.441 (Verify) | 0.469 (Verify) | 0.410 (Verify) | 0.544 (Review Required) | Fail | Pass | Fail |
| VR-009 | 0.434 (Verify) | 0.462 (Verify) | 0.404 (Verify) | 0.544 (Review Required) | Fail | Pass | Fail |
| VR-010 | 0.696 (Review Required) | 0.728 (High Risk) | 0.662 (Review Required) | 0.785 (High Risk) | Fail | Pass | Fail |

تُقرأ النتيجة الأساسية هنا على أنها **اختبار عقلانية تحت إفساد الأدلة**. إذا فشل الترتيب في بعض الحالات، فهذا لا يُعد فشلًا للتجربة نفسها، بل إشارة مباشرة إلى حدود الصياغة الحالية لـ CVI/TCRI، خاصة إذا بدت الاستشهادات الملفقة منظمة شكليًا بما يكفي لعبور فلاتر البنية المرجعية.
