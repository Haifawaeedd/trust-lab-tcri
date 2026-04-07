/*
  TRUST-LAB Editorial Systems Lab reminder for this file:
  The demo must feel like a readable research instrument, not a flashy toy.
  Keep the interaction deliberate, the outputs legible, and the metric story transparent.
  Does this choice reinforce or dilute our design philosophy?
*/

import { useMemo, useState } from "react";
import {
  decisionDescriptions,
  demoCases,
  demoPageContent,
  trustSignals,
  type Language,
} from "@/content/trustlabContent";
import { useTrustLabLanguage } from "@/contexts/TrustLabLanguageContext";
import {
  evaluateTrustLab,
  type CitationStatus,
  type EvaluationResult,
} from "@/lib/trustlabEvaluator";
import {
  TrustLabLayout,
  TrustLabMetricBadge,
  TrustLabPanel,
  TrustLabSectionHeading,
} from "@/components/trustlab/TrustLabLayout";

type DemoFormState = {
  question: string;
  answer: string;
  featureValues: string;
  citations: string;
};

const QUESTION_MAX_LENGTH = 600;
const ANSWER_MAX_LENGTH = 5000;
const FEATURE_MAX_LENGTH = 240;
const CITATION_MAX_LENGTH = 3600;

const decisionToneMap = {
  Safe: "safe",
  Verify: "verify",
  "High Risk": "high",
  Critical: "critical",
} as const;

const citationToneMap: Record<CitationStatus, "safe" | "verify" | "high" | "critical"> = {
  "verified-like": "safe",
  "partially supported": "verify",
  unverified: "high",
  "missing metadata": "critical",
};

const exampleCitations = [
  {
    en: `USGS. (2023). The Water Cycle. United States Geological Survey. https://www.usgs.gov/special-topics/water-science-school/science/water-cycle\nNOAA. (2024). Water Cycle Overview. National Oceanic and Atmospheric Administration.\nGleick, P. H. (2018). The world's water cycle. Journal of Hydrology, 562, 1-12. doi:10.1016/j.jhydrol.2018.02.001`,
    ar: `هيئة المسح الجيولوجي الأمريكية. (2023). دورة الماء. United States Geological Survey. https://www.usgs.gov/special-topics/water-science-school/science/water-cycle\nNOAA. (2024). نظرة عامة على دورة الماء. National Oceanic and Atmospheric Administration.\nGleick, P. H. (2018). The world's water cycle. Journal of Hydrology, 562, 1-12. doi:10.1016/j.jhydrol.2018.02.001`,
  },
  {
    en: `Financial Crisis Inquiry Commission. (2011). The Financial Crisis Inquiry Report. U.S. Government Publishing Office.\nMian, A., & Sufi, A. (2014). House of Debt. University of Chicago Press.\nGlobal report on financial confidence collapse`,
    ar: `Financial Crisis Inquiry Commission. (2011). The Financial Crisis Inquiry Report. U.S. Government Publishing Office.\nMian, A., & Sufi, A. (2014). House of Debt. University of Chicago Press.\nتقرير عالمي عن انهيار الثقة المالية`,
  },
  {
    en: `Marwick, E. (2024). Complete Cure for Alzheimer's Disease. Zurich Neurocognitive Institute.\nOfficial Worldwide Approval Bulletin, 2024\n10.0000/fabricated-alzheimers-cure-2024`,
    ar: `Marwick, E. (2024). Complete Cure for Alzheimer's Disease. Zurich Neurocognitive Institute.\nنشرة اعتماد عالمي رسمية 2024\n10.0000/fabricated-alzheimers-cure-2024`,
  },
] as const;

function createFormState(language: Language, index = 0): DemoFormState {
  const item = demoCases[index];
  return {
    question: item.question[language],
    answer: item.answer[language],
    featureValues: item.featureValues,
    citations: exampleCitations[index]?.[language] ?? "",
  };
}

function formatMetric(value: number) {
  return `${Math.round(value * 100)}%`;
}

function sanitizeFeatureValues(input: string) {
  return input.replace(/[^0-9,\.\-\s]/g, "").slice(0, FEATURE_MAX_LENGTH);
}

function sanitizeCitations(input: string) {
  return input.slice(0, CITATION_MAX_LENGTH);
}

function validateFormState(formState: DemoFormState, language: Language) {
  const question = formState.question.trim();
  const answer = formState.answer.trim();
  const featureValues = sanitizeFeatureValues(formState.featureValues);
  const citations = sanitizeCitations(formState.citations);

  if (!question || !answer) {
    return {
      ok: false as const,
      message:
        language === "ar"
          ? "يرجى إدخال السؤال والإجابة قبل تشغيل التقييم."
          : "Please enter both the question and the answer before running the evaluation.",
      sanitized: { ...formState, featureValues, citations },
    };
  }

  if (question.length > QUESTION_MAX_LENGTH) {
    return {
      ok: false as const,
      message:
        language === "ar"
          ? "السؤال طويل جدًا لهذه النسخة الأولية. يرجى اختصاره قليلًا."
          : "The question is too long for this prototype. Please shorten it slightly.",
      sanitized: { ...formState, featureValues, citations },
    };
  }

  if (answer.length > ANSWER_MAX_LENGTH) {
    return {
      ok: false as const,
      message:
        language === "ar"
          ? "الإجابة طويلة جدًا لهذه النسخة الأولية. يرجى تقليل طولها قبل التقييم."
          : "The answer is too long for this prototype. Please reduce its length before evaluation.",
      sanitized: { ...formState, featureValues, citations },
    };
  }

  if (formState.featureValues.trim() && !featureValues.trim()) {
    return {
      ok: false as const,
      message:
        language === "ar"
          ? "قيم الخصائص يجب أن تكون أرقامًا مفصولة بفواصل فقط."
          : "Feature values must be numeric entries separated by commas only.",
      sanitized: { ...formState, featureValues, citations },
    };
  }

  if (formState.citations.length > CITATION_MAX_LENGTH) {
    return {
      ok: false as const,
      message:
        language === "ar"
          ? "قائمة الاستشهادات طويلة جدًا لهذه النسخة الأولية. يرجى تقليل عددها أو اختصارها."
          : "The citation list is too long for this prototype. Please shorten it or use fewer entries.",
      sanitized: { ...formState, featureValues, citations },
    };
  }

  if (featureValues.length !== formState.featureValues.length) {
    return {
      ok: true as const,
      message:
        language === "ar"
          ? "تم تنظيف بعض الرموز غير الصالحة من قيم الخصائص قبل التقييم."
          : "Some invalid symbols were removed from the feature values before evaluation.",
      sanitized: { ...formState, featureValues, citations },
    };
  }

  return {
    ok: true as const,
    message: null,
    sanitized: { ...formState, featureValues, citations },
  };
}

function getStatusLabel(language: Language, status: CitationStatus) {
  const labels = {
    en: {
      "verified-like": "Verified-like",
      "partially supported": "Partially supported",
      unverified: "Unverified",
      "missing metadata": "Missing metadata",
    },
    ar: {
      "verified-like": "شبيه بالمرجع المتحقق",
      "partially supported": "مدعوم جزئيًا",
      unverified: "غير متحقق",
      "missing metadata": "بيانات ناقصة",
    },
  } as const;

  return labels[language][status];
}

export default function Demo() {
  const { language, setLanguage } = useTrustLabLanguage();
  const copy = demoPageContent[language];
  const [formState, setFormState] = useState<DemoFormState>(() => createFormState(language));
  const [notice, setNotice] = useState<string | null>(null);
  const [result, setResult] = useState<EvaluationResult | null>(() =>
    evaluateTrustLab({
      question: demoCases[0].question[language],
      answer: demoCases[0].answer[language],
      featureValues: demoCases[0].featureValues,
      citations: exampleCitations[0]?.[language] ?? "",
      language,
    }),
  );

  const signalCards = useMemo(
    () => [
      ...trustSignals[language],
      {
        label: language === "ar" ? "CVI" : "CVI",
        text:
          language === "ar"
            ? "إشارة سلامة بحثية تقيس ما إذا كانت الاستشهادات تبدو منظمة وقابلة للتحقق الأولي."
            : "A research-integrity signal for whether citations appear structured and plausibly verification-ready.",
      },
    ],
    [language],
  );

  const metrics = useMemo(
    () => [
      {
        key: "reliability",
        label: copy.outputs.reliability,
        value: result ? formatMetric(result.reliability) : "--",
        tone: "neutral" as const,
        description:
          language === "ar"
            ? "مؤشر تقريبي لمدى تماسك الإجابة وثباتها الداخلي."
            : "A proxy for how coherent and internally stable the answer appears.",
      },
      {
        key: "support",
        label: copy.outputs.support,
        value: result ? formatMetric(result.support) : "--",
        tone: "neutral" as const,
        description:
          language === "ar"
            ? "مقياس لمدى بقاء الإجابة مرتبطة مباشرة بالسؤال."
            : "A measure of how directly the answer remains grounded in the question.",
      },
      {
        key: "hallucination",
        label: copy.outputs.hallucination,
        value: result ? formatMetric(result.hallucinationRisk) : "--",
        tone:
          result && result.hallucinationRisk >= 0.7
            ? ("critical" as const)
            : result && result.hallucinationRisk >= 0.45
              ? ("high" as const)
              : ("neutral" as const),
        description:
          language === "ar"
            ? "إشارة تحذيرية لليقين غير المدعوم أو التفاصيل المختلقة أو المبالغة الخطرة."
            : "A warning signal for unsupported certainty, fabricated specificity, or risky overclaiming.",
      },
      {
        key: "dsr",
        label: copy.outputs.dsr,
        value: result ? formatMetric(result.dsr) : "--",
        tone:
          result && result.dsr >= 0.55
            ? ("high" as const)
            : result && result.dsr >= 0.25
              ? ("verify" as const)
              : ("neutral" as const),
        description:
          language === "ar"
            ? "إشارة سياقية مشتقة من عدم الاستقرار في القيم الرقمية الاختيارية."
            : "A contextual risk signal derived from instability in optional numeric inputs.",
      },
      {
        key: "cvi",
        label: language === "ar" ? "CVI" : "CVI",
        value: result ? formatMetric(result.cvi) : "--",
        tone:
          result && result.cvi >= 0.75
            ? ("safe" as const)
            : result && result.cvi >= 0.4
              ? ("verify" as const)
              : result && result.totalCitations > 0
                ? ("high" as const)
                : ("neutral" as const),
        description:
          language === "ar"
            ? "يقيس ما إذا كانت الاستشهادات تبدو منظمة ومكتملة بما يكفي لتبرير مراجعة أعمق."
            : "It estimates whether the supplied citations appear structured enough to justify deeper verification.",
      },
      {
        key: "tcri",
        label: copy.outputs.tcri,
        value: result ? formatMetric(result.tcri) : "--",
        tone: result ? decisionToneMap[result.decision] : ("neutral" as const),
        description:
          language === "ar"
            ? "المؤشر المركب لانهيار الثقة بعد جمع الموثوقية والدعم وخطر الهلوسة وDSR وCVI."
            : "The composite trust-collapse indicator after combining reliability, support, hallucination risk, DSR, and CVI.",
      },
    ],
    [copy.outputs.dsr, copy.outputs.hallucination, copy.outputs.reliability, copy.outputs.support, copy.outputs.tcri, language, result],
  );

  const handleEvaluate = () => {
    const validation = validateFormState(formState, language);
    setFormState(validation.sanitized);

    if (!validation.ok) {
      setNotice(validation.message);
      return;
    }

    try {
      setResult(
        evaluateTrustLab({
          question: validation.sanitized.question,
          answer: validation.sanitized.answer,
          featureValues: validation.sanitized.featureValues,
          citations: validation.sanitized.citations,
          language,
        }),
      );
      setNotice(
        validation.message ??
          (language === "ar"
            ? "النتائج الحالية إشارات تفسيرية استدلالية تشمل طبقة سلامة الاستشهادات، وليست حكمًا نهائيًا على الحقيقة أو الصحة العلمية."
            : "The current outputs are heuristic interpretive signals, including citation-integrity cues, not final truth or scientific-validity judgments."),
      );
    } catch (_error) {
      setResult(null);
      setNotice(
        language === "ar"
          ? "تعذر تشغيل التقييم لهذه المدخلات. يرجى تبسيط النص أو مراجعة القيم الرقمية أو تنسيق الاستشهادات."
          : "The evaluation could not be completed for this input. Please simplify the text or review the numeric values and citation formatting.",
      );
    }
  };

  const handleLoadExample = (index: number) => {
    const nextForm = createFormState(language, index);
    setFormState(nextForm);
    setNotice(
      language === "ar"
        ? "تم تحميل حالة بحثية منسقة تشمل استشهادات تجريبية قابلة للتعديل قبل التقييم."
        : "A curated research case with editable citations has been loaded for evaluation.",
    );
    setResult(
      evaluateTrustLab({
        question: nextForm.question,
        answer: nextForm.answer,
        featureValues: nextForm.featureValues,
        citations: nextForm.citations,
        language,
      }),
    );
  };

  const handleClear = () => {
    setFormState({ question: "", answer: "", featureValues: "", citations: "" });
    setResult(null);
    setNotice(
      language === "ar"
        ? "تم مسح المدخلات. يمكن الآن إدخال حالة جديدة مع استشهاداتها للتقييم."
        : "Inputs cleared. You can now enter a new case together with its citations for evaluation.",
    );
  };

  return (
    <TrustLabLayout
      language={language}
      onLanguageChange={(nextLanguage) => {
        const currentExample = demoCases.findIndex(
          (item) =>
            item.question[language] === formState.question && item.answer[language] === formState.answer,
        );
        setLanguage(nextLanguage);
        if (currentExample >= 0) {
          const translated = createFormState(nextLanguage, currentExample);
          setFormState(translated);
          setResult(
            evaluateTrustLab({
              question: translated.question,
              answer: translated.answer,
              featureValues: translated.featureValues,
              citations: translated.citations,
              language: nextLanguage,
            }),
          );
        } else {
          setResult((previous) =>
            previous
              ? evaluateTrustLab({
                  question: formState.question,
                  answer: formState.answer,
                  featureValues: formState.featureValues,
                  citations: formState.citations,
                  language: nextLanguage,
                })
              : previous,
          );
        }
      }}
      currentPath="/demo"
      eyebrow={copy.badge}
      title={copy.title}
      intro={copy.intro}
      aside={
        <>
          <TrustLabPanel className="space-y-4">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
              {copy.examplesTitle}
            </p>
            <div className="space-y-3">
              {demoCases.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleLoadExample(index)}
                  className="w-full rounded-[1.3rem] border border-[color:var(--line-soft)] bg-[rgba(248,245,238,0.8)] px-4 py-3 text-start transition hover:border-[color:var(--line-strong)] hover:bg-white"
                >
                  <p className="text-sm font-semibold tracking-[-0.02em] text-[color:var(--ink-strong)]">
                    {item.title[language]}
                  </p>
                </button>
              ))}
            </div>
          </TrustLabPanel>

          <TrustLabPanel className="space-y-4">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
              TRUST-LAB
            </p>
            <div className="space-y-3 text-sm leading-7 text-[color:var(--ink-body)]">
              {signalCards.map((signal) => (
                <div key={signal.label}>
                  <p className="font-semibold text-[color:var(--ink-strong)]">{signal.label}</p>
                  <p>{signal.text}</p>
                </div>
              ))}
            </div>
          </TrustLabPanel>
        </>
      }
    >
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)] xl:items-start">
        <TrustLabPanel className="space-y-6">
          <TrustLabSectionHeading
            kicker={copy.badge}
            title={copy.title}
            text={copy.prototypeNote}
          />

          <TrustLabPanel className="space-y-3 border border-dashed border-[color:var(--line-strong)] bg-[rgba(255,252,246,0.78)] p-5 shadow-none">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
              {language === "ar" ? "Research Prototype v1.0" : "Research Prototype v1.0"}
            </p>
            <p className="text-sm leading-7 text-[color:var(--ink-body)]">
              {language === "ar"
                ? "تعرض هذه الصفحة إشارات تفسيرية استدلالية للمراجعة الأولية، وتشمل طبقة جديدة لفحص بنية الاستشهادات قبل منحها ثقة بحثية أولية."
                : "This page presents heuristic interpretive signals for first-pass review, including a citation-structure layer before any research-facing trust is granted."}
            </p>
            <p className="text-sm leading-7 text-[color:var(--ink-muted)]">
              {language === "ar"
                ? "استخدم النتائج كبداية للمراجعة، ثم ارجع إلى التحقق البشري والمصادر الأصلية قبل أي قرار بحثي أو استشهادي."
                : "Use the outputs as a starting point for inspection, then return to human review and primary sources before any research or citation decision."}
            </p>
          </TrustLabPanel>

          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-[0.78rem] uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
                {copy.fields.question}
              </span>
              <textarea
                value={formState.question}
                onChange={(event) =>
                  setFormState((previous) => ({ ...previous, question: event.target.value }))
                }
                rows={4}
                className="min-h-[7rem] rounded-[1.4rem] border border-[color:var(--line-soft)] bg-[rgba(255,255,255,0.75)] px-4 py-4 text-base leading-8 text-[color:var(--ink-strong)] outline-none transition focus:border-[color:var(--line-strong)] focus:ring-2 focus:ring-[rgba(91,122,132,0.15)]"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-[0.78rem] uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
                {copy.fields.answer}
              </span>
              <textarea
                value={formState.answer}
                onChange={(event) =>
                  setFormState((previous) => ({ ...previous, answer: event.target.value }))
                }
                rows={8}
                className="min-h-[14rem] rounded-[1.4rem] border border-[color:var(--line-soft)] bg-[rgba(255,255,255,0.75)] px-4 py-4 text-base leading-8 text-[color:var(--ink-strong)] outline-none transition focus:border-[color:var(--line-strong)] focus:ring-2 focus:ring-[rgba(91,122,132,0.15)]"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-[0.78rem] uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
                {language === "ar" ? "الاستشهادات أو المراجع" : "Citations or references"}
              </span>
              <textarea
                value={formState.citations}
                onChange={(event) =>
                  setFormState((previous) => ({
                    ...previous,
                    citations: sanitizeCitations(event.target.value),
                  }))
                }
                rows={7}
                placeholder={
                  language === "ar"
                    ? "أدخل كل مرجع في سطر مستقل أو افصل بينها بفاصلة منقوطة"
                    : "Enter one citation per line or separate entries with semicolons"
                }
                className="min-h-[11rem] rounded-[1.4rem] border border-[color:var(--line-soft)] bg-[rgba(255,255,255,0.75)] px-4 py-4 text-base leading-8 text-[color:var(--ink-strong)] outline-none transition focus:border-[color:var(--line-strong)] focus:ring-2 focus:ring-[rgba(91,122,132,0.15)]"
              />
              <span className="text-sm leading-7 text-[color:var(--ink-muted)]">
                {language === "ar"
                  ? "تُستخدم هذه القائمة لحساب CVI وعرض تشخيص لكل استشهاد، دون ادعاء تحقق ببليوغرافي نهائي."
                  : "This list is used to compute CVI and show per-citation diagnostics without claiming final bibliographic verification."}
              </span>
            </label>

            <label className="grid gap-2">
              <span className="text-[0.78rem] uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
                {copy.fields.features}
              </span>
              <input
                value={formState.featureValues}
                onChange={(event) =>
                  setFormState((previous) => ({
                    ...previous,
                    featureValues: sanitizeFeatureValues(event.target.value),
                  }))
                }
                className="rounded-[1.2rem] border border-[color:var(--line-soft)] bg-[rgba(255,255,255,0.75)] px-4 py-3 text-base text-[color:var(--ink-strong)] outline-none transition focus:border-[color:var(--line-strong)] focus:ring-2 focus:ring-[rgba(91,122,132,0.15)]"
              />
              <span className="text-sm leading-7 text-[color:var(--ink-muted)]">
                {copy.fields.featuresHint}
              </span>
            </label>

            {notice ? (
              <div className="rounded-[1.3rem] border border-[color:var(--line-soft)] bg-[rgba(248,245,238,0.72)] px-4 py-3 text-sm leading-7 text-[color:var(--ink-body)]">
                {notice}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={handleEvaluate}
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[color:var(--ink-strong)] px-5 py-3 text-sm font-semibold tracking-[0.02em] text-white transition hover:translate-y-[-1px] hover:bg-[color:var(--accent-deep)]"
              >
                {copy.actions.evaluate}
              </button>
              <button
                type="button"
                onClick={() => handleLoadExample(0)}
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[color:var(--panel-soft)] px-5 py-3 text-sm font-semibold tracking-[0.02em] text-[color:var(--ink-strong)] transition hover:translate-y-[-1px] hover:bg-white"
              >
                {copy.actions.loadExample}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center justify-center rounded-full border border-transparent px-2 py-3 text-sm font-semibold text-[color:var(--ink-muted)] transition hover:text-[color:var(--ink-strong)]"
              >
                {copy.actions.clear}
              </button>
            </div>
          </div>
        </TrustLabPanel>

        <TrustLabPanel className="space-y-6">
          <div className="space-y-4 border-b border-[color:var(--line-soft)] pb-5">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
              {copy.outputs.decision}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <TrustLabMetricBadge
                label={copy.outputs.decision}
                value={result ? result.decision : "--"}
                tone={result ? decisionToneMap[result.decision] : "neutral"}
              />
              <TrustLabMetricBadge
                label="TCRI"
                value={result ? formatMetric(result.tcri) : "--"}
                tone={result ? decisionToneMap[result.decision] : "neutral"}
              />
              <TrustLabMetricBadge
                label="CVI"
                value={result ? formatMetric(result.cvi) : "--"}
                tone={
                  result && result.cvi >= 0.75
                    ? "safe"
                    : result && result.cvi >= 0.4
                      ? "verify"
                      : result && result.totalCitations > 0
                        ? "high"
                        : "neutral"
                }
              />
            </div>
            <p className="text-base leading-8 text-[color:var(--ink-body)]">
              {result ? result.explanation : copy.prototypeNote}
            </p>
            <p className="text-sm leading-7 text-[color:var(--ink-muted)]">
              {language === "ar"
                ? "مهم: المخرجات الحالية تمثل إشارات استدلالية مفسّرة، وليست بديلًا عن التحقق البحثي أو مراجعة المصادر أو فحص الاستشهادات يدويًا."
                : "Important: the current outputs are interpreted heuristic signals and are not a substitute for source verification, scholarly review, or manual citation checking."}
            </p>
            {result ? (
              <p className="text-sm leading-7 text-[color:var(--ink-muted)]">
                {decisionDescriptions[language][result.decision]}
              </p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            {metrics.map((metric) => (
              <article
                key={metric.key}
                className="rounded-[1.5rem] border border-[color:var(--line-soft)] bg-[rgba(248,245,238,0.78)] p-5"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-[0.78rem] uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
                    {metric.label}
                  </p>
                  <TrustLabMetricBadge label={metric.label} value={metric.value} tone={metric.tone} />
                </div>
                <p className="text-sm leading-7 text-[color:var(--ink-body)]">{metric.description}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <article className="rounded-[1.45rem] border border-[color:var(--line-soft)] bg-[rgba(255,252,246,0.7)] p-5">
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                {language === "ar" ? "درجة CVI" : "CVI score"}
              </p>
              <p className="mt-3 font-display text-3xl leading-none tracking-[-0.05em] text-[color:var(--ink-strong)]">
                {result ? formatMetric(result.cvi) : "--"}
              </p>
            </article>
            <article className="rounded-[1.45rem] border border-[color:var(--line-soft)] bg-[rgba(255,252,246,0.7)] p-5">
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                {language === "ar" ? "الاستشهادات القوية" : "Verified-like citations"}
              </p>
              <p className="mt-3 font-display text-3xl leading-none tracking-[-0.05em] text-[color:var(--ink-strong)]">
                {result ? `${result.verifiedCitations}/${result.totalCitations}` : "--"}
              </p>
            </article>
            <article className="rounded-[1.45rem] border border-[color:var(--line-soft)] bg-[rgba(255,252,246,0.7)] p-5">
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                {language === "ar" ? "حالة الاستشهادات" : "Citation layer status"}
              </p>
              <p className="mt-3 text-base leading-7 text-[color:var(--ink-strong)]">
                {result
                  ? result.totalCitations === 0
                    ? language === "ar"
                      ? "لم تُقدَّم استشهادات"
                      : "No citations supplied"
                    : result.cvi >= 0.75
                      ? language === "ar"
                        ? "قوية نسبيًا"
                        : "Comparatively strong"
                      : result.cvi >= 0.4
                        ? language === "ar"
                          ? "مختلطة"
                          : "Mixed"
                        : language === "ar"
                          ? "ضعيفة"
                          : "Weak"
                  : "--"}
              </p>
            </article>
          </div>

          <TrustLabPanel className="space-y-3 border border-dashed border-[color:var(--line-strong)] bg-[rgba(255,252,246,0.7)] p-5 shadow-none">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
              {language === "ar" ? "تشخيص الاستشهادات" : "Citation diagnostics"}
            </p>
            {result && result.citationDiagnostics.length ? (
              <div className="space-y-3">
                {result.citationDiagnostics.map((citation, index) => (
                  <article
                    key={`${citation.raw}-${index}`}
                    className="rounded-[1.3rem] border border-[color:var(--line-soft)] bg-white/70 p-4"
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <TrustLabMetricBadge
                        label={language === "ar" ? `مرجع ${index + 1}` : `Ref ${index + 1}`}
                        value={getStatusLabel(language, citation.status)}
                        tone={citationToneMap[citation.status]}
                      />
                      <TrustLabMetricBadge
                        label={language === "ar" ? "الدرجة" : "Score"}
                        value={formatMetric(citation.score)}
                        tone={citationToneMap[citation.status]}
                      />
                    </div>
                    <p className="text-sm leading-7 text-[color:var(--ink-strong)]">{citation.raw}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {citation.flags.length ? (
                        citation.flags.map((flag) => (
                          <span
                            key={flag}
                            className="inline-flex items-center rounded-full border border-[color:var(--line-soft)] bg-[rgba(248,245,238,0.88)] px-3 py-1 text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--ink-muted)]"
                          >
                            {flag}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm leading-7 text-[color:var(--ink-muted)]">
                          {language === "ar"
                            ? "لم تُرصد مؤشرات بنيوية كافية في هذا المرجع."
                            : "No strong structural cues were detected in this citation."}
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-7 text-[color:var(--ink-body)]">
                {language === "ar"
                  ? "أدخل استشهادات لعرض تشخيص CVI على مستوى كل مرجع، مع حالات ورايات بنيوية ظاهرة."
                  : "Add citations to reveal citation-level CVI diagnostics with statuses and visible structural flags."}
              </p>
            )}
          </TrustLabPanel>

          <TrustLabPanel className="space-y-3 border border-dashed border-[color:var(--line-strong)] bg-[rgba(255,252,246,0.7)] p-5 shadow-none">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
              {copy.outputs.explanation}
            </p>
            <p className="text-sm leading-7 text-[color:var(--ink-body)]">
              {result
                ? result.explanation
                : language === "ar"
                  ? "أدخل السؤال وإجابة النموذج والاستشهادات ثم شغّل التقييم لعرض الشرح التفسيري الكامل."
                  : "Enter a question, model answer, and citations, then run the evaluation to reveal the full interpretive explanation."}
            </p>
          </TrustLabPanel>
        </TrustLabPanel>
      </section>
    </TrustLabLayout>
  );
}
