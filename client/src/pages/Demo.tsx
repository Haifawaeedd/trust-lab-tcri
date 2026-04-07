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
};

const QUESTION_MAX_LENGTH = 600;
const ANSWER_MAX_LENGTH = 5000;
const FEATURE_MAX_LENGTH = 240;

const decisionToneMap = {
  Safe: "safe",
  Verify: "verify",
  "High Risk": "high",
  Critical: "critical",
} as const;

function createFormState(language: Language, index = 0): DemoFormState {
  const item = demoCases[index];
  return {
    question: item.question[language],
    answer: item.answer[language],
    featureValues: item.featureValues,
  };
}

function formatMetric(value: number) {
  return `${Math.round(value * 100)}%`;
}

function sanitizeFeatureValues(input: string) {
  return input.replace(/[^0-9,\.\-\s]/g, "").slice(0, FEATURE_MAX_LENGTH);
}

function validateFormState(formState: DemoFormState, language: Language) {
  const question = formState.question.trim();
  const answer = formState.answer.trim();
  const featureValues = sanitizeFeatureValues(formState.featureValues);

  if (!question || !answer) {
    return {
      ok: false as const,
      message:
        language === "ar"
          ? "يرجى إدخال السؤال والإجابة قبل تشغيل التقييم."
          : "Please enter both the question and the answer before running the evaluation.",
      sanitized: { ...formState, featureValues },
    };
  }

  if (question.length > QUESTION_MAX_LENGTH) {
    return {
      ok: false as const,
      message:
        language === "ar"
          ? "السؤال طويل جدًا لهذه النسخة الأولية. يرجى اختصاره قليلًا."
          : "The question is too long for this prototype. Please shorten it slightly.",
      sanitized: { ...formState, featureValues },
    };
  }

  if (answer.length > ANSWER_MAX_LENGTH) {
    return {
      ok: false as const,
      message:
        language === "ar"
          ? "الإجابة طويلة جدًا لهذه النسخة الأولية. يرجى تقليل طولها قبل التقييم."
          : "The answer is too long for this prototype. Please reduce its length before evaluation.",
      sanitized: { ...formState, featureValues },
    };
  }

  if (formState.featureValues.trim() && !featureValues.trim()) {
    return {
      ok: false as const,
      message:
        language === "ar"
          ? "قيم الخصائص يجب أن تكون أرقامًا مفصولة بفواصل فقط."
          : "Feature values must be numeric entries separated by commas only.",
      sanitized: { ...formState, featureValues },
    };
  }

  if (featureValues.length !== formState.featureValues.length) {
    return {
      ok: true as const,
      message:
        language === "ar"
          ? "تم تنظيف بعض الرموز غير الصالحة من قيم الخصائص قبل التقييم."
          : "Some invalid symbols were removed from the feature values before evaluation.",
      sanitized: { ...formState, featureValues },
    };
  }

  return {
    ok: true as const,
    message: null,
    sanitized: { ...formState, featureValues },
  };
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
      language,
    }),
  );

  const metrics = useMemo(
    () => [
      {
        key: "reliability",
        label: copy.outputs.reliability,
        value: result ? formatMetric(result.reliability) : "--",
        tone: "neutral" as const,
      },
      {
        key: "support",
        label: copy.outputs.support,
        value: result ? formatMetric(result.support) : "--",
        tone: "neutral" as const,
      },
      {
        key: "hallucination",
        label: copy.outputs.hallucination,
        value: result ? formatMetric(result.hallucinationRisk) : "--",
        tone: result && result.hallucinationRisk >= 0.7 ? ("critical" as const) : result && result.hallucinationRisk >= 0.45 ? ("high" as const) : ("neutral" as const),
      },
      {
        key: "dsr",
        label: copy.outputs.dsr,
        value: result ? formatMetric(result.dsr) : "--",
        tone: result && result.dsr >= 0.55 ? ("high" as const) : result && result.dsr >= 0.25 ? ("verify" as const) : ("neutral" as const),
      },
      {
        key: "tcri",
        label: copy.outputs.tcri,
        value: result ? formatMetric(result.tcri) : "--",
        tone: result ? decisionToneMap[result.decision] : ("neutral" as const),
      },
    ],
    [copy.outputs.dsr, copy.outputs.hallucination, copy.outputs.reliability, copy.outputs.support, copy.outputs.tcri, result],
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
          language,
        }),
      );
      setNotice(
        validation.message ??
          (language === "ar"
            ? "هذه النتائج إشارات تفسيرية استدلالية وليست حكمًا نهائيًا على الحقيقة."
            : "These results are heuristic interpretive signals, not absolute truth estimates."),
      );
    } catch (_error) {
      setResult(null);
      setNotice(
        language === "ar"
          ? "تعذر تشغيل التقييم لهذه المدخلات. يرجى تبسيط النص أو مراجعة القيم الرقمية."
          : "The evaluation could not be completed for this input. Please simplify the text or review the numeric values.",
      );
    }
  };

  const handleLoadExample = (index: number) => {
    const nextForm = createFormState(language, index);
    setFormState(nextForm);
    setNotice(
      language === "ar"
        ? "هذا مثال منسق للنسخة البحثية الأولية ويمكن تعديله قبل التقييم."
        : "This is a curated prototype example and can be edited before evaluation.",
    );
    setResult(
      evaluateTrustLab({
        question: nextForm.question,
        answer: nextForm.answer,
        featureValues: nextForm.featureValues,
        language,
      }),
    );
  };

  const handleClear = () => {
    setFormState({ question: "", answer: "", featureValues: "" });
    setResult(null);
    setNotice(
      language === "ar"
        ? "تم مسح المدخلات. يمكن الآن إدخال حالة جديدة للتقييم."
        : "Inputs cleared. You can now enter a new case for evaluation.",
    );
  };

  return (
    <TrustLabLayout
      language={language}
      onLanguageChange={(nextLanguage) => {
        const currentExample = demoCases.findIndex(
          (item) => item.question[language] === formState.question && item.answer[language] === formState.answer,
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
              {trustSignals[language].map((signal) => (
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
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(21rem,0.95fr)] xl:items-start">
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
                ? "تعرض هذه الصفحة إشارات تفسيرية استدلالية للمراجعة الأولية، ولا تقدّم حكمًا مطلقًا على الحقيقة أو الصحة العلمية."
                : "This page presents heuristic interpretive signals for first-pass review. It does not provide absolute truth judgments or final scientific verification."}
            </p>
            <p className="text-sm leading-7 text-[color:var(--ink-muted)]">
              {language === "ar"
                ? "استخدم النتائج كبداية للمراجعة، ثم ارجع إلى التحقق البشري والمصادر الأصلية عند اتخاذ أي قرار بحثي."
                : "Use the outputs as a starting point for inspection, then return to human review and primary sources before making any research decision."}
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
            </div>
            <p className="text-base leading-8 text-[color:var(--ink-body)]">
              {result ? result.explanation : copy.prototypeNote}
            </p>
            <p className="text-sm leading-7 text-[color:var(--ink-muted)]">
              {language === "ar"
                ? "مهم: المخرجات الحالية تمثل إشارات استدلالية مفسّرة وليست بديلًا عن التحقق البحثي أو مراجعة المصادر."
                : "Important: the current outputs are interpreted heuristic signals and are not a substitute for source verification or scholarly review."}
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
                <p className="text-sm leading-7 text-[color:var(--ink-body)]">
                  {trustSignals[language][metrics.findIndex((item) => item.key === metric.key)]?.text ?? copy.prototypeNote}
                </p>
              </article>
            ))}
          </div>

          <TrustLabPanel className="space-y-3 border border-dashed border-[color:var(--line-strong)] bg-[rgba(255,252,246,0.7)] p-5 shadow-none">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
              {copy.outputs.explanation}
            </p>
            <p className="text-sm leading-7 text-[color:var(--ink-body)]">
              {result
                ? result.explanation
                : language === "ar"
                  ? "أدخل السؤال وإجابة النموذج ثم شغّل التقييم لعرض الشرح التفسيري الكامل."
                  : "Enter a question and model answer, then run the evaluation to reveal the full interpretive explanation."}
            </p>
          </TrustLabPanel>
        </TrustLabPanel>
      </section>
    </TrustLabLayout>
  );
}
