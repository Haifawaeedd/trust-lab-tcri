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

  const orientationTitle = isArabic
    ? "إطار يشرح انهيار الثقة قبل أن يختزله في نتيجة واحدة"
    : "A framework that explains trust collapse before compressing it into one result.";

  const orientationText = isArabic
    ? "يعامل TRUST-LAB التقييم بوصفه قراءة تفسيرية متعددة الطبقات. بدل سؤال واحد من نوع \"هل الإجابة جيدة؟\"، يعرض الموثوقية والدعم وخطر الهلوسة وصلاحية الاستشهادات وسياق البيانات بوصفها إشارات قابلة للفحص والمراجعة."
    : "TRUST-LAB treats evaluation as a layered interpretability exercise. Instead of asking a single question such as whether an answer is good, it exposes reliability, support, hallucination pressure, citation validity, and data context as inspectable signals that can be reviewed and challenged.";

  const disclaimerText = isArabic
    ? "TRUST-LAB هو نموذج بحثي أولي ولا ينبغي استخدامه بوصفه الأساس الوحيد لاتخاذ قرارات أكاديمية أو قانونية أو طبية. يجب التحقق اليدوي من جميع المراجع."
    : "TRUST-LAB is a research prototype and should not be used as the sole basis for academic, legal, or medical decisions. All citations must be manually verified.";

  const repositoryPillars = isArabic
    ? [
        {
          title: "TCRI v3",
          text: "يقيس احتمال انهيار الثقة عبر تجميع قابل للتفسير بدل تحويل الإخفاقات المختلفة إلى حكم مبهم.",
        },
        {
          title: "DSR",
          text: "يعامل اضطراب القيم وعدم اتساق المقاييس بوصفهما سياقًا يؤثر في القرار النهائي ولا يجوز إخفاؤه.",
        },
        {
          title: "CVI",
          text: "يُظهر ما إذا كانت المراجع تبدو قابلة للتحقق، منظمة، ومتسقة مع منطق الاستشهاد البحثي.",
        },
      ]
    : [
        {
          title: "TCRI v3",
          text: "It measures the probability of trust collapse through an interpretable aggregation instead of a vague one-number verdict.",
        },
        {
          title: "DSR",
          text: "It treats instability and scale mismatch as contextual factors that should remain visible in the decision pathway.",
        },
        {
          title: "CVI",
          text: "It surfaces whether references appear verifiable, structured, and aligned with academic citation logic.",
        },
      ];

  const cviStatus = isArabic
    ? {
        title: "Citation Validity Index",
        scoreLabel: "درجة CVI",
        statusLabel: "الحالة",
        verifiedLabel: "الاستشهادات المتحققة",
        status: "تحقق جزئي",
        note: "بعض المراجع تحتاج إلى تحقق يدوي قبل الاعتماد البحثي النهائي.",
      }
    : {
        title: "Citation Validity Index",
        scoreLabel: "CVI score",
        statusLabel: "Status",
        verifiedLabel: "Verified citations",
        status: "Partially verified",
        note: "Some references require manual verification before research-facing use.",
      };

  const methodCards = isArabic
    ? [
        {
          title: "الهوية المنهجية",
          text: "المشروع ليس أداة عرض، بل إطار بحثي يربط القياس والقرار والشرح داخل خط واضح يمكن مراجعته وتوسيعه.",
        },
        {
          title: "إشارات تفسيرية",
          text: "الدرجات هنا ليست حقيقة مطلقة، بل إشارات تفسيرية heuristics تساعد الباحث على فهم موضع الخطر ومصدره.",
        },
        {
          title: "ترتيب البناء",
          text: "بدأ التطوير بالمستودع والمنهجية والوثائق، ثم أضيفت طبقة الواجهة والشرح العام فوق هذا الأساس المنهجي.",
        },
      ]
    : [
        {
          title: "Methodological identity",
          text: "The project is not a display layer only, but a research framework that connects measurement, decision, and explanation in a reviewable path.",
        },
        {
          title: "Interpretability-oriented signals",
          text: "The scores are not absolute truth estimates. They are heuristic signals designed to make risk legible and discussable.",
        },
        {
          title: "Build order",
          text: "The repository, formal methodology, and documentation came first, then the public-facing interface was built on top of that foundation.",
        },
      ];

  const buildOrder = isArabic
    ? ["هيكل المستودع", "README والمنهجية", "المعمارية والأمثلة", "طبقة العرض والتجربة"]
    : ["Repository structure", "README and methodology", "Architecture and examples", "Website and demo layer"];

  return (
    <TrustLabLayout
      language={language}
      onLanguageChange={setLanguage}
      currentPath="/"
      eyebrow={`${copy.badge} · ${isArabic ? "Research Prototype v1.0" : "Research Prototype v1.0"}`}
      title={copy.title}
      intro={copy.summary}
      aside={
        <div className="space-y-5">
          <TrustLabPanel className="space-y-5">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex w-fit items-center rounded-full border border-[color:var(--line-strong)] bg-[color:var(--panel-soft)] px-3 py-1 text-[0.7rem] uppercase tracking-[0.22em] text-[color:var(--ink-strong)]">
                  {isArabic ? "Research Prototype v1.0" : "Research Prototype v1.0"}
                </span>
                <span className="inline-flex w-fit items-center rounded-full border border-dashed border-[color:var(--line-strong)] px-3 py-1 text-[0.7rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                  TCRI / DSR / CVI
                </span>
              </div>
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
                {copy.equationLabel}
              </p>
              <div className="space-y-2 text-[color:var(--ink-strong)]">
                <p className="font-display text-[1.48rem] leading-none tracking-[-0.05em] sm:text-[1.72rem]">
                  TCRI = C × (1 − S)
                </p>
                <p className="font-display text-[0.98rem] leading-tight tracking-[-0.04em] sm:text-[1.08rem]">
                  × (1 + H) × (1 + λ·DSR)
                </p>
              </div>
              <p className="text-sm leading-7 text-[color:var(--ink-body)]">
                {isArabic
                  ? "تحافظ المنهجية على ظهور كل بُعد من أبعاد الفشل قبل تجميعه في إشارة نهائية قابلة للتفسير."
                  : "The methodology keeps each failure dimension visible before it is aggregated into one interpretable signal."}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <TrustLabMetricBadge label="TCRI" value="Composite" />
              <TrustLabMetricBadge label="DSR" value="Context" />
              <TrustLabMetricBadge label="CVI" value={isArabic ? "Citation" : "Citation"} />
            </div>
          </TrustLabPanel>

          <TrustLabPanel className="space-y-3 border-[rgba(143,102,48,0.18)] bg-[rgba(250,245,235,0.96)]">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
              {isArabic ? "تنبيه بحثي" : "Research disclaimer"}
            </p>
            <p className="text-sm leading-7 text-[color:var(--ink-body)]">{disclaimerText}</p>
          </TrustLabPanel>
        </div>
      }
    >
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.92fr)] xl:items-start">
        <TrustLabPanel className="space-y-6">
          <div className="space-y-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--line-strong)] bg-[color:var(--panel-soft)] px-4 py-2 text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-strong)] shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
              <span className="h-2 w-2 rounded-full bg-[color:var(--accent-strong)]" />
              {isArabic ? "واجهة تفسيرية فوق مستودع بحثي" : "Explanatory layer on top of a research repository"}
            </span>
            <h2 className="max-w-[18ch] text-[clamp(1.9rem,3vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-[color:var(--ink-strong)]">
              {orientationTitle}
            </h2>
            <p className="max-w-[62ch] text-base leading-8 text-[color:var(--ink-body)] sm:text-[1.02rem]">
              {orientationText}
            </p>
          </div>

          <div className="rounded-[1.35rem] border border-[rgba(143,102,48,0.18)] bg-[rgba(250,245,235,0.92)] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] sm:px-5">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
              {isArabic ? "نسخة أولية قابلة للمراجعة" : "Reviewable prototype"}
            </p>
            <p className="mt-2 text-sm leading-7 text-[color:var(--ink-body)]">{disclaimerText}</p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {repositoryPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-[1.3rem] border border-[color:var(--line-soft)] bg-[rgba(255,255,255,0.72)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.76)]"
              >
                <h3 className="mb-2 text-sm font-semibold tracking-[-0.02em] text-[color:var(--ink-strong)]">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-7 text-[color:var(--ink-body)]">{pillar.text}</p>
              </article>
            ))}
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
        </TrustLabPanel>

        <div className="space-y-6">
          <TrustLabPanel className="space-y-4 p-4 sm:p-5">
            <TrustLabFigure
              src={editorialAssets.hero}
              alt="TRUST-LAB editorial interface"
              caption={
                isArabic
                  ? "المسار الطبقي ينتقل من الإدخال إلى التقدير ثم إلى القرار والشرح دون إخفاء الإشارات الأساسية."
                  : "The layered pathway moves from input to scoring, decision, and explanation without hiding the underlying signals."
              }
            />
          </TrustLabPanel>

          <TrustLabPanel className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
                  {cviStatus.title}
                </p>
                <h3 className="mt-2 text-[1.35rem] font-semibold tracking-[-0.04em] text-[color:var(--ink-strong)]">
                  {isArabic ? "بطاقة تحقق المراجع" : "Citation visibility card"}
                </h3>
              </div>
              <span className="inline-flex rounded-full border border-[color:var(--line-strong)] bg-[color:var(--panel-soft)] px-3 py-1 text-[0.72rem] uppercase tracking-[0.2em] text-[color:var(--ink-strong)]">
                CVI
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.15rem] border border-[color:var(--line-soft)] bg-white/70 p-4">
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">{cviStatus.scoreLabel}</p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink-strong)]">0.72</p>
              </div>
              <div className="rounded-[1.15rem] border border-[color:var(--line-soft)] bg-white/70 p-4">
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">{cviStatus.statusLabel}</p>
                <p className="mt-2 text-base font-semibold tracking-[-0.02em] text-[color:var(--ink-strong)]">{cviStatus.status}</p>
              </div>
              <div className="rounded-[1.15rem] border border-[color:var(--line-soft)] bg-white/70 p-4">
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">{cviStatus.verifiedLabel}</p>
                <p className="mt-2 text-base font-semibold tracking-[-0.02em] text-[color:var(--ink-strong)]">3 / 4</p>
              </div>
            </div>

            <p className="text-sm leading-7 text-[color:var(--ink-body)]">{cviStatus.note}</p>
          </TrustLabPanel>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.82fr)] xl:items-start">
        <TrustLabPanel className="space-y-6">
          <TrustLabSectionHeading
            kicker={isArabic ? "البنية المنهجية" : "Methodological structure"}
            title={isArabic ? "طبقات مرئية بدل حكم غامض" : "Visible layers instead of an opaque verdict"}
            text={
              isArabic
                ? "تتقدم المنهجية من الإشارات الجزئية إلى القرار النهائي مع المحافظة على إمكانية قراءة كل طبقة ومساءلتها."
                : "The methodology moves from partial signals to the final decision while keeping each layer readable and open to challenge."
            }
          />

          <div className="grid gap-4 md:grid-cols-3">
            {methodCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[1.3rem] border border-[color:var(--line-soft)] bg-[rgba(255,255,255,0.7)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.76)]"
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
              {isArabic ? "هوية البحث" : "Research identity"}
            </p>
            <p className="mt-2 text-sm leading-7 text-[color:var(--ink-body)]">{copy.noveltyText}</p>
          </div>
        </TrustLabPanel>
      </section>
    </TrustLabLayout>
  );
}
