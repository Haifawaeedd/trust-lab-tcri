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

  const heroTitle = isArabic
    ? "من مستودع بحثي منضبط إلى واجهة تشرح منطق الثقة بوضوح"
    : "From a disciplined research repository to a public interface that explains trust clearly.";

  const abstractText =
    copy.abstractText ??
    (isArabic
      ? "تجمع النسخة الأولى بين نواة GitHub منهجية، ووثائق رسمية، وواجهة ثنائية اللغة تساعد الباحثين والخبراء على قراءة منطق القرار بدل الاكتفاء بحكم مبهم."
      : "The first version combines a GitHub-first methodological core, formal documentation, and a bilingual interface that helps researchers and expert users read the logic of the decision rather than accept an opaque verdict.");

  const repositoryPillars = isArabic
    ? [
        {
          title: "نواة GitHub",
          text: "README ووثائق ومعمارية تُظهر الجدية والمنهجية منذ الصفحة الأولى للمستودع.",
        },
        {
          title: "مقاييس قابلة للفحص",
          text: "يعرض TCRI وDSR كإشارات تفسيرية واضحة بدل إخفائها داخل نتيجة واحدة غامضة.",
        },
        {
          title: "واجهة ثنائية اللغة",
          text: "عرض عربي/إنجليزي يسهّل الشرح العام والقراءة الأكاديمية في الوقت نفسه.",
        },
      ]
    : [
        {
          title: "GitHub-first core",
          text: "README, architecture, and formal documents establish seriousness before the interface takes over.",
        },
        {
          title: "Inspectable metrics",
          text: "TCRI and DSR are presented as interpretable analytical signals rather than hidden internals.",
        },
        {
          title: "Bilingual interface",
          text: "Arabic and English presentation support both public explanation and research-oriented reading.",
        },
      ];

  const summaryCards = isArabic
    ? [
        {
          title: "الهوية البحثية",
          text: "المشروع لا يُقدَّم كأداة شكلية، بل كإطار تقييم يمكن توثيقه ومقارنته وتوسيعه لاحقًا.",
        },
        {
          title: "ترتيب البناء",
          text: "بدأ العمل بالمستودع والمنهجية والوثائق، ثم توسع إلى طبقة العرض والتجربة التفسيرية.",
        },
        {
          title: "الإشارات الأساسية",
          text: "المنهجية تُظهر الموثوقية والدعم وخطر الهلوسة وسياق البيانات قبل الوصول إلى القرار النهائي.",
        },
      ]
    : [
        {
          title: "Research identity",
          text: "The project is not framed as a cosmetic tool, but as an evaluation framework that can be documented, compared, and extended.",
        },
        {
          title: "Build order",
          text: "The repository, methodology, and documentation came first, then expanded into the explanatory public layer.",
        },
        {
          title: "Core signals",
          text: "The method keeps reliability, support, hallucination pressure, and data context visible before the final decision is produced.",
        },
      ];

  const buildOrder = isArabic
    ? ["هيكل المستودع", "README والمنهجية", "المعمارية والأمثلة", "الواجهة وطبقة العرض"]
    : ["Repository structure", "README and methodology", "Architecture and examples", "Website and demo layer"];

  const lowerCards = isArabic
    ? [
        {
          title: "TCRI",
          text: "يصوغ انهيار الثقة كحالة مركبة تتأثر بالموثوقية والدعم وخطر الهلوسة والسياق العددي.",
        },
        {
          title: "DSR",
          text: "يلتقط اضطراب القيم وتفاوت المقاييس بوصفه عاملًا سياقيًا لا يجوز تجاهله عند التقييم.",
        },
        {
          title: "طبقة الشرح",
          text: "تعيد بناء منطق القرار بلغة قابلة للفهم والمراجعة بدل الاكتفاء بإشارة نهائية مختصرة.",
        },
      ]
    : [
        {
          title: "TCRI",
          text: "It frames trust collapse as a composite condition shaped by reliability, support, hallucination pressure, and context.",
        },
        {
          title: "DSR",
          text: "It treats numeric instability and scale mismatch as contextual signals that should influence the evaluation outcome.",
        },
        {
          title: "Explanation layer",
          text: "It reconstructs the logic of the decision in readable form instead of stopping at a compressed label.",
        },
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
        <TrustLabPanel className="space-y-5">
          <div className="space-y-3">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
              {copy.equationLabel}
            </p>
            <div className="space-y-2 text-[color:var(--ink-strong)]">
              <p className="font-display text-[1.48rem] leading-none tracking-[-0.05em] sm:text-[1.75rem]">
                TCRI = C × (1 − S)
              </p>
              <p className="font-display text-[0.98rem] leading-tight tracking-[-0.04em] sm:text-[1.08rem]">
                × (1 + H) × (1 + λ·DSR)
              </p>
            </div>
            <p className="text-sm leading-7 text-[color:var(--ink-body)]">
              {isArabic
                ? "تظل أبعاد الفشل مرئية قبل تجميعها في إشارة واحدة قابلة للتفسير والمراجعة."
                : "Each failure dimension stays visible before aggregation into one interpretable signal."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <TrustLabMetricBadge label="TCRI" value="Composite" />
            <TrustLabMetricBadge label="DSR" value="Context" />
            <TrustLabMetricBadge label="AR / EN" value={isArabic ? "Arabic" : "English"} />
          </div>
        </TrustLabPanel>
      }
    >
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] xl:items-stretch">
        <TrustLabPanel className="p-0 overflow-hidden">
          <div className="grid xl:grid-cols-[minmax(0,1.08fr)_minmax(21rem,0.92fr)]">
            <div className="flex flex-col justify-between gap-8 px-6 py-7 sm:px-8 sm:py-9 lg:px-10 xl:pr-8">
              <div className="space-y-6">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--line-strong)] bg-[color:var(--panel-soft)] px-4 py-2 text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-strong)] shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--accent-strong)]" />
                  {copy.badge}
                </span>

                <div className="space-y-4">
                  <h2 className="max-w-[17ch] text-[clamp(2rem,3.2vw,3.45rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-[color:var(--ink-strong)]">
                    {heroTitle}
                  </h2>
                  <p className="max-w-[60ch] text-base leading-8 text-[color:var(--ink-body)] sm:text-[1.02rem]">
                    {abstractText}
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {repositoryPillars.map((pillar) => (
                    <article
                      key={pillar.title}
                      className="rounded-[1.3rem] border border-[color:var(--line-soft)] bg-[rgba(255,255,255,0.7)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.76)]"
                    >
                      <h3 className="mb-2 text-sm font-semibold tracking-[-0.02em] text-[color:var(--ink-strong)]">
                        {pillar.title}
                      </h3>
                      <p className="text-sm leading-7 text-[color:var(--ink-body)]">{pillar.text}</p>
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

            <div className="relative min-h-[20rem] border-t border-[color:var(--line-soft)] xl:min-h-full xl:border-l xl:border-t-0">
              <img
                src={editorialAssets.hero}
                alt="TRUST-LAB editorial hero"
                className="absolute inset-0 h-full w-full object-cover opacity-[0.88]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,244,236,0.22),rgba(248,244,236,0.44))]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_16%,rgba(255,255,255,0.58),transparent_26%),radial-gradient(circle_at_82%_86%,rgba(212,182,117,0.16),transparent_26%)]" />

              <div className="relative flex h-full flex-col justify-between gap-4 p-5 sm:p-6">
                <div className="max-w-[17rem] rounded-[1.35rem] border border-[rgba(255,255,255,0.66)] bg-[rgba(255,252,246,0.9)] px-4 py-4 shadow-[0_18px_36px_rgba(34,44,54,0.14)] backdrop-blur-sm sm:px-5">
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                    {copy.architectureTitle ?? (isArabic ? "البنية الطبقية" : "Layered architecture")}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--ink-body)]">
                    {copy.architectureIntro ??
                      (isArabic
                        ? "يمر الإطار من الإدخال إلى القرار والشرح مع الحفاظ على قابلية الفحص في كل مرحلة."
                        : "The framework moves from input to decision and explanation while preserving inspectability at each stage.")}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  {summaryCards.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[1.25rem] border border-[rgba(93,103,115,0.12)] bg-[rgba(252,249,242,0.82)] px-4 py-4 shadow-[0_10px_24px_rgba(34,44,54,0.08)] backdrop-blur-[2px]"
                    >
                      <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[color:var(--ink-body)]">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TrustLabPanel>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(17rem,0.8fr)]">
        <TrustLabPanel className="space-y-6">
          <TrustLabSectionHeading
            kicker={copy.noveltyTitle}
            title={copy.ctaTitle}
            text={copy.ctaText}
          />

          <div className="grid gap-4 md:grid-cols-3">
            {lowerCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[1.3rem] border border-[color:var(--line-soft)] bg-[rgba(255,255,255,0.68)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.76)]"
              >
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                  {card.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-[color:var(--ink-body)]">{card.text}</p>
              </article>
            ))}
          </div>
        </TrustLabPanel>

        <TrustLabPanel className="space-y-4">
          <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
            {isArabic ? "ترتيب البناء" : "Build order"}
          </p>
          <div className="space-y-3">
            {buildOrder.map((item, index) => (
              <div key={item} className="flex items-start gap-3 text-sm leading-7 text-[color:var(--ink-body)]">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[color:var(--panel-soft)] text-[0.72rem] font-semibold text-[color:var(--ink-strong)]">
                  {index + 1}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="rounded-[1.25rem] border border-[color:var(--line-soft)] bg-[color:var(--panel-soft)] p-4">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
              {isArabic ? "الهوية البحثية" : "Research identity"}
            </p>
            <p className="mt-2 text-sm leading-7 text-[color:var(--ink-body)]">{copy.noveltyText}</p>
          </div>
        </TrustLabPanel>
      </section>
    </TrustLabLayout>
  );
}
