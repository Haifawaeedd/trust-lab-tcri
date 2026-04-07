/*
  TRUST-LAB Editorial Systems Lab reminder for this file:
  This page must read like the public front matter of a serious bilingual research dossier.
  Use asymmetry, disciplined pacing, and editorial emphasis rather than generic landing-page clichés.
  Does this choice reinforce or dilute our design philosophy?
*/

import { Link } from "wouter";
import {
  editorialAssets,
  navigation,
  projectPageContent,
} from "@/content/trustlabContent";
import { useTrustLabLanguage } from "@/contexts/TrustLabLanguageContext";
import {
  TrustLabFigure,
  TrustLabLayout,
  TrustLabMetricBadge,
  TrustLabPanel,
  TrustLabSectionHeading,
} from "@/components/trustlab/TrustLabLayout";

export default function Home() {
  const { language, setLanguage } = useTrustLabLanguage();
  const copy = projectPageContent[language];
  const nav = navigation[language];
  const isArabic = language === "ar";

  const repositoryPillars = isArabic
    ? [
        {
          title: "نواة المستودع",
          text: "بنية GitHub واضحة مع README ووثائق رسمية تُقرأ بمنطق أكاديمي واضح.",
        },
        {
          title: "المقاييس الرسمية",
          text: "عرض TCRI وDSR بوصفهما إشارات تفسيرية يمكن فحصها بدل الاكتفاء بدرجة مبهمة.",
        },
        {
          title: "طبقة العرض المرئي",
          text: "واجهة ثنائية اللغة تشرح المنهجية وتُظهر منطق القرار والتجربة المباشرة.",
        },
      ]
    : [
        {
          title: "Repository core",
          text: "A clean GitHub structure with a strong README and formal research-facing documentation.",
        },
        {
          title: "Formal metrics",
          text: "TCRI and DSR presented as interpretable analytical signals rather than a vague quality score.",
        },
        {
          title: "Visual layer",
          text: "A bilingual interface that exposes methodology, decision logic, and direct experimentation.",
        },
      ];

  const buildOrder = [
    "repo structure",
    "README + methodology",
    "architecture + examples",
    "website / demo layer",
  ];

  return (
    <TrustLabLayout
      language={language}
      onLanguageChange={setLanguage}
      currentPath="/"
      eyebrow={copy.badge}
      title={copy.title}
      intro={copy.summary}
      aside={
        <>
          <TrustLabPanel className="space-y-5">
            <div className="space-y-3">
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
                {copy.equationLabel}
              </p>
              <div className="space-y-1 text-[color:var(--ink-strong)]">
                <p className="font-display text-[1.65rem] leading-none tracking-[-0.05em] sm:text-[1.9rem]">
                  TCRI = C × (1 − S)
                </p>
                <p className="font-display text-[1.08rem] leading-tight tracking-[-0.04em] sm:text-[1.2rem]">
                  × (1 + H) × (1 + λ·DSR)
                </p>
              </div>
              <p className="text-sm leading-7 text-[color:var(--ink-body)]">
                {isArabic
                  ? "تحافظ الصياغة على وضوح عناصر الفشل قبل جمعها في مؤشر واحد قابل للتفسير."
                  : "The formulation keeps each failure dimension visible before aggregation into one interpretable signal."}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <TrustLabMetricBadge label="TCRI" value="Composite" />
              <TrustLabMetricBadge label="DSR" value="Context" />
            </div>
          </TrustLabPanel>

          <TrustLabPanel className="space-y-4">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
              {isArabic ? "ترتيب البناء" : "Build order"}
            </p>
            <ol className="space-y-3 text-sm leading-7 text-[color:var(--ink-body)]">
              {buildOrder.map((item, index) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[color:var(--panel-soft)] text-[0.72rem] font-semibold text-[color:var(--ink-strong)]">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </TrustLabPanel>
        </>
      }
    >
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(19rem,0.8fr)] lg:items-start">
        <TrustLabPanel className="overflow-hidden p-0">
          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)]">
            <div className="flex flex-col justify-between gap-8 px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
              <div className="space-y-6">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--line-strong)] bg-[color:var(--panel-soft)] px-4 py-2 text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-strong)] shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--accent-strong)]" />
                  {copy.badge}
                </span>

                <div className="space-y-4">
                  <h2 className="max-w-[14ch] text-[clamp(2rem,3.6vw,4rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[color:var(--ink-strong)]">
                    {isArabic
                      ? "من مستودع بحثي منضبط إلى واجهة تفسيرية مفهومة"
                      : "From a disciplined research repository to an interpretable public interface."}
                  </h2>
                  <p className="max-w-2xl text-base leading-8 text-[color:var(--ink-body)] sm:text-lg">
                    {copy.abstractText}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {repositoryPillars.map((pillar) => (
                    <article
                      key={pillar.title}
                      className="rounded-[1.4rem] border border-[color:var(--line-soft)] bg-[rgba(255,255,255,0.62)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]"
                    >
                      <h3 className="mb-2 text-sm font-semibold tracking-[-0.02em] text-[color:var(--ink-strong)]">
                        {pillar.title}
                      </h3>
                      <p className="text-sm leading-7 text-[color:var(--ink-body)]">
                        {pillar.text}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="/methodology"
                  className="inline-flex items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[color:var(--ink-strong)] px-5 py-3 text-sm font-semibold tracking-[0.02em] text-white transition hover:translate-y-[-1px] hover:bg-[color:var(--accent-deep)]"
                >
                  {nav.exploreMethodology}
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[color:var(--panel-soft)] px-5 py-3 text-sm font-semibold tracking-[0.02em] text-[color:var(--ink-strong)] transition hover:translate-y-[-1px] hover:bg-white"
                >
                  {nav.openDemo}
                </Link>
              </div>
            </div>

            <div className="relative min-h-[24rem] border-t border-[color:var(--line-soft)] lg:min-h-full lg:border-l lg:border-t-0">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(232,242,239,0.92),rgba(246,241,232,0.9))]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(110,149,152,0.2),transparent_34%),radial-gradient(circle_at_82%_82%,rgba(215,185,113,0.18),transparent_28%)]" />
              <img
                src={editorialAssets.hero}
                alt="TRUST-LAB editorial hero"
                className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-multiply saturate-[0.9] contrast-[1.04]"
              />
              <div className="absolute inset-x-5 top-5 rounded-[1.4rem] border border-[rgba(255,255,255,0.48)] bg-[rgba(255,252,246,0.82)] px-4 py-3 shadow-[0_18px_32px_rgba(34,44,54,0.12)] backdrop-blur-sm sm:inset-x-6 sm:px-5 sm:py-4">
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                  {copy.architectureTitle}
                </p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--ink-body)]">
                  {copy.architectureIntro}
                </p>
              </div>
            </div>
          </div>
        </TrustLabPanel>

        <div className="grid gap-4">
          <TrustLabPanel className="space-y-3">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
              {copy.noveltyTitle}
            </p>
            <p className="text-sm leading-7 text-[color:var(--ink-body)]">{copy.noveltyText}</p>
          </TrustLabPanel>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <TrustLabPanel className="space-y-3">
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
                TCRI
              </p>
              <p className="text-sm leading-7 text-[color:var(--ink-body)]">
                {isArabic
                  ? "يعرض انهيار الثقة بوصفه حالة مركبة تتأثر بالموثوقية والدعم وخطر الهلوسة وسياق البيانات."
                  : "Frames trust failure as a composite condition shaped by reliability, support, hallucination risk, and data context."}
              </p>
            </TrustLabPanel>
            <TrustLabPanel className="space-y-3">
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
                DSR
              </p>
              <p className="text-sm leading-7 text-[color:var(--ink-body)]">
                {isArabic
                  ? "يلتقط أثر عدم الاستقرار العددي أو اختلاف المقاييس داخل القيم الرقمية الاختيارية."
                  : "Captures instability, mismatch, and scale variation inside optional numeric feature values."}
              </p>
            </TrustLabPanel>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        <TrustLabPanel className="space-y-6">
          <TrustLabSectionHeading
            kicker={copy.noveltyTitle}
            title={copy.ctaTitle}
            text={copy.ctaText}
          />

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "TCRI",
                text: isArabic
                  ? "يربط الموثوقية والدعم وخطر الهلوسة وعدم الاستقرار العددي في مؤشر واحد يمكن قراءته وتفسيره."
                  : "Links reliability, support, hallucination risk, and numeric instability in one readable composite signal.",
              },
              {
                title: "DSR",
                text: isArabic
                  ? "لا يُستخدم كمجرد قيمة إضافية، بل كإشارة سياقية توضّح اضطراب الأرقام أو التفاوت داخل المدخلات."
                  : "Acts not as a decorative variable, but as a contextual signal for instability and numeric mismatch.",
              },
              {
                title: isArabic ? "القرار" : "Decision",
                text: isArabic
                  ? "تحويل المؤشر النهائي إلى نطاقات مفهومة يساعد الباحث على فهم المخاطر قبل أي فحص أعمق."
                  : "Maps the final score into interpretable bands so a reviewer can understand risk before deeper inspection.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-[color:var(--line-soft)] bg-[rgba(248,245,238,0.76)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
              >
                <h3 className="mb-3 text-lg font-semibold tracking-[-0.03em] text-[color:var(--ink-strong)]">
                  {item.title}
                </h3>
                <p className="text-sm leading-7 text-[color:var(--ink-body)]">{item.text}</p>
              </article>
            ))}
          </div>
        </TrustLabPanel>

        <TrustLabFigure
          src={editorialAssets.architecture}
          alt="TRUST-LAB layered architecture"
          caption={copy.architectureIntro}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
        <TrustLabFigure
          src={editorialAssets.architecture}
          alt="TRUST-LAB layered architecture diagram"
          caption={copy.architectureIntro}
        />

        <TrustLabPanel className="space-y-8">
          <TrustLabSectionHeading
            kicker={copy.architectureTitle}
            title={copy.abstractTitle}
            text={copy.abstractText}
          />

          <div className="grid gap-4 md:grid-cols-2">
            {copy.architectureLayers.map((layer, index) => (
              <article
                key={layer.label}
                className="rounded-[1.5rem] border border-[color:var(--line-soft)] bg-[rgba(248,245,238,0.76)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-white text-sm font-semibold text-[color:var(--ink-strong)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold tracking-[-0.03em] text-[color:var(--ink-strong)]">
                    {layer.label}
                  </h3>
                </div>
                <p className="text-sm leading-7 text-[color:var(--ink-body)]">
                  {layer.description}
                </p>
              </article>
            ))}
          </div>
        </TrustLabPanel>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.78fr)] lg:items-start">
        <TrustLabPanel className="space-y-8">
          <TrustLabSectionHeading
            kicker={copy.roadmapTitle}
            title={copy.ctaTitle}
            text={copy.roadmapIntro}
          />

          <div className="space-y-4">
            {copy.roadmapStages.map((stage) => (
              <article
                key={stage.version}
                className="grid gap-4 rounded-[1.5rem] border border-[color:var(--line-soft)] bg-[rgba(255,255,255,0.62)] p-5 sm:grid-cols-[7rem_minmax(0,1fr)]"
              >
                <div>
                  <p className="text-[0.78rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                    {stage.version}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold tracking-[-0.03em] text-[color:var(--ink-strong)]">
                    {stage.title}
                  </h3>
                  <p className="text-sm leading-7 text-[color:var(--ink-body)]">
                    {stage.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </TrustLabPanel>

        <TrustLabFigure
          src={editorialAssets.roadmap}
          alt="TRUST-LAB roadmap research illustration"
          caption={copy.ctaText}
        />
      </section>
    </TrustLabLayout>
  );
}
