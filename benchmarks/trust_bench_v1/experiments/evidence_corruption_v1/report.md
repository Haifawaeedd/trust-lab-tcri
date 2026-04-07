# Experiment 1 — Evidence Corruption Perturbation Study

تهدف هذه التجربة إلى اختبار سؤال بحثي واحد: **هل ترتفع درجة المخاطر في TRUST-LAB بشكل منطقي عندما تُفسد طبقة الأدلة؟** استخدمت التجربة عشر حالات clean من `valid_research_cases`، ثم أُنشئت لكل حالة ثلاث نسخ مفسدة: `weakened citation` و`fabricated citation` و`claim exaggeration`.

> **Research claim:** TRUST-LAB demonstrates strong sensitivity to claim exaggeration under evidence degradation, while revealing a systematic limitation in distinguishing structurally plausible fabricated citations.

| المؤشر | القيمة |
|---|---|
| عدد الحالات النظيفة المختارة | 10 |
| عدد النسخ المقيمة | 40 |
| نجاح الترتيب clean < weakened < fabricated | 0 / 10 |
| نجاح زيادة الخطر في exaggerated مقارنة بـ clean | 10 / 10 |
| النجاح الكامل للحالتين معًا | 0 / 10 |

## Interpretation

تكشف النتيجة الحالية سلوكين مختلفين في النظام. أولًا، يوجد **تحسس قوي ومنتظم تجاه المبالغة في الادعاء**، لأن جميع الحالات العشر ارتفعت فيها المخاطر عند حقن لغة مثل `always` و`guarantees` و`perfect`. ثانيًا، يظهر **قيد منهجي واضح**: الاستشهادات الملفقة التي تبدو منظمة شكليًا ما تزال قادرة أحيانًا على الحفاظ على درجة CVI أعلى من النسخ الضعيفة، حتى بعد تقليل قوة التقييم البنيوي وحده. هذا ليس شيئًا يجب إخفاؤه، بل دليل مباشر على أن طبقة التحقق المرجعي تحتاج فصلًا أدق بين **سلامة البنية** و**المعقولية الدلالية**.

## Detailed Results

| Case | Clean | Weakened | Fabricated | Exaggerated | Chain | Exaggeration | Overall |
|---|---|---|---|---|---|---|---|
| VR-001 | 0.715 (High Risk) | 0.733 (High Risk) | 0.724 (High Risk) | 0.810 (High Risk) | Fail | Pass | Fail |
| VR-002 | 0.401 (Verify) | 0.415 (Verify) | 0.406 (Verify) | 0.514 (Review Required) | Fail | Pass | Fail |
| VR-003 | 0.457 (Verify) | 0.461 (Verify) | 0.451 (Verify) | 0.554 (Review Required) | Fail | Pass | Fail |
| VR-004 | 0.460 (Verify) | 0.479 (Verify) | 0.467 (Verify) | 0.577 (Review Required) | Fail | Pass | Fail |
| VR-005 | 0.421 (Verify) | 0.446 (Verify) | 0.437 (Verify) | 0.528 (Review Required) | Fail | Pass | Fail |
| VR-006 | 0.388 (Verify) | 0.401 (Verify) | 0.392 (Verify) | 0.514 (Review Required) | Fail | Pass | Fail |
| VR-007 | 0.446 (Verify) | 0.466 (Verify) | 0.457 (Verify) | 0.571 (Review Required) | Fail | Pass | Fail |
| VR-008 | 0.424 (Verify) | 0.446 (Verify) | 0.438 (Verify) | 0.525 (Review Required) | Fail | Pass | Fail |
| VR-009 | 0.417 (Verify) | 0.445 (Verify) | 0.437 (Verify) | 0.526 (Review Required) | Fail | Pass | Fail |
| VR-010 | 0.704 (High Risk) | 0.711 (High Risk) | 0.707 (High Risk) | 0.792 (High Risk) | Fail | Pass | Fail |

تُقرأ هذه التجربة على أنها **اختبار عقلانية تحت إفساد الأدلة**. وبالتالي فإن فشل ترتيب `clean < weakened < fabricated` ليس إخفاقًا عرضيًا في العرض، بل نتيجة تجريبية تقول إن النظام الحالي ما يزال أكثر قوة في التقاط **claim exaggeration** من قدرته على التقاط **fabricated citations** ذات المظهر المنظم. وهذه بالضبط الفجوة التي يبرر إصلاحها بناء Experiment 2 حول `semantic citation mismatch`.
