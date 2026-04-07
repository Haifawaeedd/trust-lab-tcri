/*
  TRUST-LAB Editorial Systems Lab reminder for this file:
  This page should translate formal research documentation into a disciplined public explanation.
  Use measured hierarchy, generous whitespace, and strong mathematical emphasis without becoming visually noisy.
  Does this choice reinforce or dilute our design philosophy?
*/

import { Link } from "wouter";
import {
  decisionDescriptions,
  editorialAssets,
  methodologyPageContent,
  navigation,
} from "@/content/trustlabContent";
import { useTrustLabLanguage } from "@/contexts/TrustLabLanguageContext";
import {
  TrustLabFigure,
  TrustLabLayout,
  TrustLabMetricBadge,
  TrustLabPanel,
  TrustLabSectionHeading,
} from "@/components/trustlab/TrustLabLayout";

const decisionToneMap = {
  Safe: "safe",
  Verify: "verify",
  "High Risk": "high",
  Critical: "critical",
} as const;

export default function Methodology() {
  const { language, setLanguage } = useTrustLabLanguage();
  const copy = methodologyPageContent[language];
  const nav = navigation[language];

  return (
    <TrustLabLayout
      language={language}
      onLanguageChange={setLanguage}
      currentPath="/methodology"
      eyebrow={copy.badge}
      title={copy.title}
      intro={copy.intro}
      aside={
        <>
          <TrustLabPanel className="space-y-5">
            <div className="space-y-3">
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
                {copy.equationTitle}
              </p>
              <p className="font-display text-[1.65rem] leading-tight tracking-[-0.05em] text-[color:var(--ink-strong)]">
                TCRI = C × (1 − S) × (1 + H) × (1 + λDSR)
              </p>
              <p className="text-sm leading-7 text-[color:var(--ink-body)]">{copy.equationBody}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <TrustLabMetricBadge label="C" value="Reliability" />
              <TrustLabMetricBadge label="S" value="Support" />
              <TrustLabMetricBadge label="H" value="Hallucination" />
              <TrustLabMetricBadge label="DSR" value="Context" />
            </div>
          </TrustLabPanel>

          <TrustLabFigure
            src={editorialAssets.equation}
            alt="TRUST-LAB equation atlas"
            caption={copy.dsrBody}
          />
        </>
      }
    >
      <section className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
        <TrustLabFigure
          src={editorialAssets.architecture}
          alt="TRUST-LAB methodology architecture"
          caption={copy.intro}
        />

        <TrustLabPanel className="space-y-8">
          <TrustLabSectionHeading
            kicker={copy.equationTitle}
            title={copy.dsrTitle}
            text={copy.dsrBody}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-[1.5rem] border border-[color:var(--line-soft)] bg-[rgba(248,245,238,0.76)] p-5">
              <p className="mb-3 text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                TCRI
              </p>
              <p className="font-display text-2xl leading-tight tracking-[-0.05em] text-[color:var(--ink-strong)]">
                Composite trust-collapse signal
              </p>
              <p className="mt-3 text-sm leading-7 text-[color:var(--ink-body)]">
                {language === "ar"
                  ? "يجمع TCRI بين الموثوقية والدعم وخطر الهلوسة وعدم استقرار السياق العددي في مؤشر واحد قابل للتفسير."
                  : "TCRI aggregates reliability, support, hallucination risk, and numeric-context instability into one interpretable signal."}
              </p>
            </article>

            <article className="rounded-[1.5rem] border border-[color:var(--line-soft)] bg-[rgba(248,245,238,0.76)] p-5">
              <p className="mb-3 text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                DSR
              </p>
              <p className="font-display text-2xl leading-tight tracking-[-0.05em] text-[color:var(--ink-strong)]">
                Contextual instability factor
              </p>
              <p className="mt-3 text-sm leading-7 text-[color:var(--ink-body)]">{copy.dsrBody}</p>
            </article>
          </div>
        </TrustLabPanel>
      </section>

      <section className="space-y-6">
        <TrustLabSectionHeading
          kicker={copy.layersTitle}
          title={copy.layersTitle}
          text={language === "ar"
            ? "تعرض TRUST-LAB الإشارات الوسيطة بوضوح قبل الوصول إلى الحكم النهائي، لكي لا تبدو النتيجة كصندوق أسود."
            : "TRUST-LAB keeps intermediate signals visible before producing a final decision, so the result never feels like a black box."}
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {copy.layers.map((layer, index) => (
            <article
              key={layer.title}
              className="rounded-[1.6rem] border border-[color:var(--line-soft)] bg-[rgba(255,252,246,0.88)] p-5 shadow-[0_18px_40px_rgba(34,44,54,0.07)]"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[color:var(--panel-soft)] text-sm font-semibold text-[color:var(--ink-strong)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold tracking-[-0.03em] text-[color:var(--ink-strong)]">
                  {layer.title}
                </h3>
              </div>
              <p className="text-sm leading-7 text-[color:var(--ink-body)]">{layer.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:items-start">
        <TrustLabPanel className="space-y-6">
          <TrustLabSectionHeading
            kicker={copy.decisionTitle}
            title={copy.decisionTitle}
            text={language === "ar"
              ? "تُترجم النتيجة العددية إلى نطاقات واضحة تساعد القارئ على اتخاذ موقف أولي من الإجابة قبل أي مراجعة أعمق."
              : "The numeric result is mapped into readable bands so a reviewer can understand the trust profile quickly before deeper inspection."}
          />

          <div className="space-y-4">
            {copy.decisionBands.map((band) => (
              <article
                key={band.label}
                className="grid gap-4 rounded-[1.5rem] border border-[color:var(--line-soft)] bg-[rgba(248,245,238,0.78)] p-5 sm:grid-cols-[8.5rem_minmax(0,1fr)]"
              >
                <div className="space-y-2">
                  <TrustLabMetricBadge
                    label={band.label}
                    value={band.range}
                    tone={decisionToneMap[band.label]}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-base font-semibold tracking-[-0.02em] text-[color:var(--ink-strong)]">
                    {decisionDescriptions[language][band.label]}
                  </p>
                  <p className="text-sm leading-7 text-[color:var(--ink-body)]">
                    {band.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </TrustLabPanel>

        <TrustLabPanel className="space-y-4">
          <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
            {copy.limitationTitle}
          </p>
          <p className="text-sm leading-7 text-[color:var(--ink-body)]">{copy.limitationText}</p>
          <div className="pt-2">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[color:var(--ink-strong)] px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[color:var(--accent-deep)]"
            >
              {nav.openDemo}
            </Link>
          </div>
        </TrustLabPanel>
      </section>
    </TrustLabLayout>
  );
}
