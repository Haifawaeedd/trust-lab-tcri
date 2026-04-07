# Experiment 2 — Semantic Citation Mismatch Study

تختبر هذه التجربة سؤالًا أكثر تحديدًا من Experiment 1: **هل ترتفع المخاطر عندما تبقى الإجابة نفسها لكن تُستبدل الاستشهادات بمراجع حقيقية من مجال مختلف دلاليًا؟** هنا لا نستخدم مراجع ملفقة، بل مراجع حقيقية ولكنها غير متسقة مع موضوع الجواب.

> **Research claim:** If TRUST-LAB is sensitive to citation-answer coherence, then semantically mismatched real citations should lower CVI and increase risk even when the citation structure still looks legitimate.

| المؤشر | القيمة |
|---|---|
| عدد الحالات | 10 |
| عدد النسخ المقيمة | 20 |
| ارتفاع المخاطر في semantic mismatch | 9 / 10 |
| انخفاض CVI في semantic mismatch | 10 / 10 |
| النجاح الكلي (Risk↑ و CVI↓) | 9 / 10 |
| متوسط فرق المخاطر | 0.017 |
| متوسط فرق CVI | -0.272 |

## Detailed Results

| Case | Base Domain | Mismatch Source | Clean | Semantic Mismatch | Δ Risk | Δ CVI | Result |
|---|---|---|---|---|---|---|---|
| VR-001 | ml | VR-004 → climate | 0.715 (High Risk) | 0.743 (High Risk) | +0.028 | -0.421 | Pass |
| VR-002 | health | VR-004 → climate | 0.401 (Verify) | 0.414 (Verify) | +0.013 | -0.220 | Pass |
| VR-003 | health | VR-004 → climate | 0.442 (Verify) | 0.448 (Verify) | +0.006 | -0.099 | Pass |
| VR-004 | climate | VR-005 → cybersecurity | 0.460 (Verify) | 0.460 (Verify) | +0.000 | -0.012 | Fail |
| VR-005 | cybersecurity | VR-004 → climate | 0.421 (Verify) | 0.447 (Verify) | +0.026 | -0.439 | Pass |
| VR-006 | health | VR-004 → climate | 0.388 (Verify) | 0.394 (Verify) | +0.006 | -0.092 | Pass |
| VR-007 | ml | VR-004 → climate | 0.446 (Verify) | 0.471 (Verify) | +0.025 | -0.393 | Pass |
| VR-008 | education | VR-004 → climate | 0.424 (Verify) | 0.448 (Verify) | +0.024 | -0.411 | Pass |
| VR-009 | climate | VR-005 → cybersecurity | 0.417 (Verify) | 0.439 (Verify) | +0.022 | -0.374 | Pass |
| VR-010 | education | VR-004 → climate | 0.688 (Review Required) | 0.705 (High Risk) | +0.017 | -0.257 | Pass |

إذا نجحت هذه التجربة، فسيكون لدينا دليل أوضح على أن ترقية CVI لم تعد تكتفي بالتقاط **شكل المرجع**، بل بدأت تلتقط **اتساق المرجع مع موضوع الإجابة نفسه**. وإذا بقي الأداء ضعيفًا، فذلك يعني أن semantic mismatch layer ما زالت بحاجة إلى خصائص أقوى مثل فحص عنوان المرجع، منطقية الوعاء، أو التوافق بين مصطلحات السؤال والمرجع.
