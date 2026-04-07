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

  const equationNarrative = isArabic
    ? "تضيف النسخة الحالية CVI إلى معادلة TCRI v3 حتى لا تبدو الإجابة المتماسكة جديرة بالثقة البحثية إذا كانت استشهاداتها ضعيفة أو هشة أو غير مكتملة."
    : "The current version adds CVI to the TCRI v3 formulation so that a coherent-looking answer does not appear research-ready when its citations are weak, thin, or structurally incomplete.";

  const repositoryPillars = isArabic
    ? [
        {
          index: "01",
          title: "TCRI v3",
          text: "يقيس احتمال انهيار الثقة عبر تجميع قابل للتفسير بدل تحويل الإخفاقات المختلفة إلى حكم مبهم.",
        },
        {
          index: "02",
          title: "DSR",
          text: "يعامل اضطراب القيم وعدم اتساق المقاييس بوصفهما سياقًا يؤثر في القرار النهائي ولا يجوز إخفاؤه.",
        },
        {
          index: "03",
          title: "CVI",
          text: "يُظهر ما إذا كانت المراجع تبدو قابلة للتحقق، منظمة، ومتسقة مع منطق الاستشهاد البحثي.",
        },
      ]
    : [
        {
          index: "01",
          title: "TCRI v3",
          text: "It measures the probability of trust collapse through an interpretable aggregation instead of a vague one-number verdict.",
        },
        {
          index: "02",
          title: "DSR",
          text: "It treats instability and scale mismatch as contextual factors that should remain visible in the decision pathway.",
        },
        {
          index: "03",
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
          text: "المشروع ليس طبقة عرض فقط، بل إطار بحثي يربط القياس والقرار والشرح داخل خط واضح يمكن مراجعته وتوسيعه.",
        },
        {
          title: "إشارات تفسيرية",
          text: "الدرجات هنا ليست حقيقة مطلقة، بل إشارات تفسيرية heuristics تساعد الباحث على فهم موضع الخطر ومصدره.",
        },
        {
          title: "مسار التقييم",
          text: "تبدأ القراءة من السؤال والإجابة، ثم تمر بطبقات الدعم والموثوقية وخطر الهلوسة وعدم الاستقرار وصلاحية الاستشهادات.",
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
          title: "Evaluation pathway",
          text: "The reading begins with question and answer, then passes through support, reliability, hallucination pressure, instability, and citation validity.",
        },
      ];

  const buildOrder = isArabic
    ? ["هيكل المستودع", "README والمنهجية", "المعمارية والأمثلة", "طبقة العرض والتجربة"]
    : ["Repository structure", "README and methodology", "Architecture and examples", "Website and demo layer"];

  const signalAtlas = isArabic
    ? [
        {
          label: "موثوقية",
          text: "هل تبدو الإجابة متماسكة داخليًا؟",
        },
        {
          label: "دعم",
          text: "هل تبقى مرتبطة مباشرة بالسؤال؟",
        },
        {
          label: "هلوسة",
          text: "هل تظهر يقينًا أو تفاصيل غير مدعومة؟",
        },
        {
          label: "CVI",
          text: "هل تبدو الاستشهادات منظمة وقابلة للتحقق الأولي؟",
        },
      ]
    : [
        {
          label: "Reliability",
          text: "Does the answer appear internally coherent?",
        },
        {
          label: "Support",
          text: "Does it remain directly grounded in the question?",
        },
        {
          label: "Hallucination",
          text: "Does it show unsupported certainty or fabricated specificity?",
        },
        {
          label: "CVI",
          text: "Do the citations appear structured and verification-ready?",
        },
      ];

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
          <TrustLabPanel className="space-y-5 border-[rgba(91,122,132,0.18)] bg-[linear-gradient(180deg,rgba(255,252,246,0.96),rgba(247,242,233,0.94))]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex w-fit items-center rounded-full border border-[color:var(--line-strong)] bg-[color:var(--panel-soft)] px-3 py-1 text-[0.7rem] uppercase tracking-[0.22em] text-[color:var(--ink-strong)]">
                {isArabic ? "Research Prototype v1.0" : "Research Prototype v1.0"}
              </span>
              <span className="inline-flex w-fit items-center rounded-full border border-dashed border-[color:var(--line-strong)] px-3 py-1 text-[0.7rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                TCRI v3 / DSR / CVI
              </span>
            </div>

            <div className="space-y-4">
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
                {copy.equationLabel}
              </p>
              <div className="rounded-[1.55rem] border border-[rgba(91,122,132,0.18)] bg-[rgba(255,255,255,0.76)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                <p className="font-display text-[1.52rem] leading-tight tracking-[-0.065em] text-[color:var(--ink-strong)] sm:text-[1.78rem]">
                  TCRI v3 = C × (1 − S) × (1 + H)
                </p>
                <p className="mt-2 font-display text-[1.02rem] leading-tight tracking-[-0.04em] text-[color:var(--ink-strong)] sm:text-[1.14rem]">
                  × (1 + λ·DSR) × (1 + γ·(1 − CVI))
                </p>
              </div>
              <p className="max-w-[30ch] text-sm leading-7 text-[color:var(--ink-body)]">{equationNarrative}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <TrustLabMetricBadge label="TCRI v3" value={isArabic ? "Composite" : "Composite"} />
              <TrustLabMetricBadge label="DSR" value={isArabic ? "Context" : "Context"} />
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
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.18fr)_minmax(22rem,0.82fr)] xl:items-start">
        <TrustLabPanel className="space-y-8 border-[rgba(91,122,132,0.16)] bg-[linear-gradient(180deg,rgba(255,252,246,0.94),rgba(249,245,237,0.92))]">
          <div className="space-y-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--line-strong)] bg-[color:var(--panel-soft)] px-4 py-2 text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-strong)] shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
              <span className="h-2 w-2 rounded-full bg-[color:var(--accent-strong)]" />
              {isArabic ? "واجهة تفسيرية فوق مستودع بحثي" : "Explanatory layer on top of a research repository"}
            </span>

            <div className="space-y-5">
              <h2 className="max-w-[19ch] text-[clamp(2.3rem,4.4vw,4.35rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-[color:var(--ink-strong)]">
                {orientationTitle}
              </h2>
              <p className="max-w-[66ch] text-base leading-8 text-[color:var(--ink-body)] sm:text-[1.04rem]">
                {orientationText}
              </p>
            </div>

            <div className="max-w-[26rem] rounded-[1.5rem] border border-[rgba(143,102,48,0.18)] bg-[rgba(250,245,235,0.92)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)]">
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                {isArabic ? "نسخة أولية قابلة للمراجعة" : "Reviewable prototype"}
              </p>
              <p className="mt-3 text-sm leading-7 text-[color:var(--ink-body)]">{disclaimerText}</p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {repositoryPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-[1.45rem] border border-[color:var(--line-soft)] bg-[rgba(255,255,255,0.72)] p-5 shadow-[0_14px_30px_rgba(34,44,54,0.06)] shadow-[inset_0_1px_0_rgba(255,255,255,0.76)]"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                    {pillar.index}
                  </span>
                  <span className="h-px flex-1 bg-[color:var(--line-soft)]" />
                </div>
                <h3 className="text-[1.1rem] font-semibold tracking-[-0.04em] text-[color:var(--ink-strong)]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--ink-body)]">{pillar.text}</p>
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

        <div className="space-y-6 xl:pt-3">
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

          <TrustLabPanel className="space-y-5 border-[rgba(91,122,132,0.16)] bg-[linear-gradient(180deg,rgba(255,252,246,0.94),rgba(246,241,232,0.92))] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
                  {cviStatus.title}
                </p>
                <h3 className="mt-2 text-[1.45rem] font-semibold tracking-[-0.05em] text-[color:var(--ink-strong)]">
                  {isArabic ? "بطاقة رؤية الاستشهادات" : "Citation visibility card"}
                </h3>
              </div>
              <span className="inline-flex rounded-full border border-[color:var(--line-strong)] bg-[color:var(--panel-soft)] px-3 py-1 text-[0.72rem] uppercase tracking-[0.2em] text-[color:var(--ink-strong)]">
                CVI
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.2rem] border border-[color:var(--line-soft)] bg-white/75 p-4">
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">{cviStatus.scoreLabel}</p>
                <p className="mt-2 font-display text-3xl tracking-[-0.05em] text-[color:var(--ink-strong)]">72%</p>
              </div>
              <div className="rounded-[1.2rem] border border-[color:var(--line-soft)] bg-white/75 p-4">
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">{cviStatus.statusLabel}</p>
                <p className="mt-2 text-base font-semibold tracking-[-0.02em] text-[color:var(--ink-strong)]">{cviStatus.status}</p>
              </div>
              <div className="rounded-[1.2rem] border border-[color:var(--line-soft)] bg-white/75 p-4">
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">{cviStatus.verifiedLabel}</p>
                <p className="mt-2 text-base font-semibold tracking-[-0.02em] text-[color:var(--ink-strong)]">3 / 4</p>
              </div>
            </div>

            <p className="text-sm leading-7 text-[color:var(--ink-body)]">{cviStatus.note}</p>
          </TrustLabPanel>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-start">
        <TrustLabFigure
          src={editorialAssets.architecture}
          alt="TRUST-LAB architectural pathway"
          caption={
            isArabic
              ? "تربط البنية بين المعمارية والمنهجية والواجهة العامة ضمن مسار واحد قابل للمراجعة."
              : "The architecture ties repository structure, methodology, and the public interface into one reviewable path."
          }
        />

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
                className="rounded-[1.45rem] border border-[color:var(--line-soft)] bg-[rgba(255,255,255,0.7)] p-5 shadow-[0_14px_28px_rgba(34,44,54,0.05)]"
              >
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                  {card.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-[color:var(--ink-body)]">{card.text}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {signalAtlas.map((item) => (
              <article
                key={item.label}
                className="rounded-[1.35rem] border border-dashed border-[color:var(--line-strong)] bg-[rgba(248,245,238,0.72)] p-4"
              >
                <p className="text-sm font-semibold tracking-[-0.02em] text-[color:var(--ink-strong)]">{item.label}</p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--ink-body)]">{item.text}</p>
              </article>
            ))}
          </div>
        </TrustLabPanel>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,0.9fr)] xl:items-start">
        <TrustLabPanel className="space-y-6 border-[rgba(91,122,132,0.16)] bg-[linear-gradient(180deg,rgba(255,252,246,0.96),rgba(247,242,233,0.92))]">
          <TrustLabSectionHeading
            kicker={isArabic ? "المنطق الصوري" : "Formal logic"}
            title={isArabic ? "كيف يتحول الإخفاق المرئي إلى قرار نهائي" : "How visible failure becomes a final decision"}
            text={equationNarrative}
          />

          <div className="rounded-[1.6rem] border border-[rgba(91,122,132,0.18)] bg-[rgba(255,255,255,0.74)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
              TCRI v3
            </p>
            <p className="mt-4 font-display text-[1.65rem] leading-tight tracking-[-0.06em] text-[color:var(--ink-strong)] sm:text-[2rem]">
              C × (1 − S) × (1 + H)
            </p>
            <p className="font-display text-[1.05rem] leading-tight tracking-[-0.04em] text-[color:var(--ink-strong)] sm:text-[1.15rem]">
              × (1 + λ·DSR) × (1 + γ·(1 − CVI))
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-[1.35rem] border border-[color:var(--line-soft)] bg-white/70 p-4">
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">C × (1 − S)</p>
              <p className="mt-2 text-sm leading-7 text-[color:var(--ink-body)]">
                {isArabic
                  ? "يزداد الخطر عندما تبدو الإجابة متماسكة لكن دعمها للسؤال يضعف."
                  : "Risk rises when the answer appears coherent while its grounding in the question weakens."}
              </p>
            </article>
            <article className="rounded-[1.35rem] border border-[color:var(--line-soft)] bg-white/70 p-4">
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">(1 + λ·DSR)</p>
              <p className="mt-2 text-sm leading-7 text-[color:var(--ink-body)]">
                {isArabic
                  ? "يعطي لعدم استقرار القيم الرقمية أثرًا مضخمًا عندما يصبح السياق نفسه موضع شك."
                  : "It amplifies instability when the surrounding numeric context itself becomes questionable."}
              </p>
            </article>
            <article className="rounded-[1.35rem] border border-[color:var(--line-soft)] bg-white/70 p-4">
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">(1 + γ·(1 − CVI))</p>
              <p className="mt-2 text-sm leading-7 text-[color:var(--ink-body)]">
                {isArabic
                  ? "يعاقب الاستشهادات الضعيفة أو غير المكتملة حتى لو بدت الإجابة مقنعة لغويًا."
                  : "It penalizes weak or incomplete citations even when the answer sounds linguistically convincing."}
              </p>
            </article>
          </div>
        </TrustLabPanel>

        <TrustLabPanel className="space-y-5">
          <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
            {isArabic ? "ترتيب البناء" : "Build order"}
          </p>
          <div className="space-y-3">
            {buildOrder.map((item, index) => (
              <div key={item} className="flex items-start gap-3 text-sm leading-7 text-[color:var(--ink-body)]">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[color:var(--panel-soft)] text-[0.72rem] font-semibold text-[color:var(--ink-strong)]">
                  {index + 1}
                </span>
                <span className="pt-0.5">{item}</span>
              </div>
            ))}
          </div>

          <div className="rounded-[1.35rem] border border-[color:var(--line-soft)] bg-[color:var(--panel-soft)] p-4">
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
