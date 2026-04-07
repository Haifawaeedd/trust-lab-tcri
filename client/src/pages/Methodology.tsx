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
  const isArabic = language === "ar";

  const equation = "TCRI v3 = C × (1 − S) × (1 + H) × (1 + λDSR) × (1 + γ(1 − CVI))";

  const cviSummary = isArabic
    ? "تضيف طبقة CVI بُعدًا جديدًا: قد تبدو الإجابة متماسكة ومرتبطة بالسؤال، لكنها تظل غير جديرة بالثقة البحثية إذا بدت مراجعها ضعيفة أو ناقصة أو مختلقة البنية."
    : "The CVI layer adds a new dimension: an answer may look coherent and aligned with the question, yet still fail as a research-facing output if its references appear weak, incomplete, or structurally fabricated.";

  const architectureNote = isArabic
    ? "لهذا لا يعامل TRUST-LAB الاستشهادات كزينة نصية، بل كطبقة سلامة بحثية تؤثر مباشرة في تقدير انهيار الثقة."
    : "For that reason, TRUST-LAB does not treat citations as decorative text. It treats them as a research-integrity layer that directly influences the trust-collapse estimate.";

  const cviHeuristics = isArabic
    ? [
        {
          title: "وجود سنة",
          text: "يدل على حد أدنى من البنية الببليوغرافية والتحديد الزمني.",
        },
        {
          title: "نمط DOI محتمل",
          text: "يشير إلى مسار تحقق أقوى في الإصدارات اللاحقة.",
        },
        {
          title: "صيغة تشبه المؤلف",
          text: "تميّز المرجع المنظم من العبارات العامة أو المختصرة جدًا.",
        },
        {
          title: "بيانات جهة النشر أو الوعاء",
          text: "تعطي المرجع مظهرًا أكاديميًا أقرب إلى المراجعة الفعلية.",
        },
      ]
    : [
        {
          title: "Year present",
          text: "Signals minimum bibliographic structure and temporal specificity.",
        },
        {
          title: "DOI-like pattern",
          text: "Suggests a stronger path toward future verification workflows.",
        },
        {
          title: "Author-like formatting",
          text: "Distinguishes fuller references from vague or extremely thin fragments.",
        },
        {
          title: "Venue-like metadata",
          text: "Makes the citation look closer to a reviewable scholarly record.",
        },
      ];

  const citationStatuses = isArabic
    ? [
        {
          label: "شبيه بالمرجع المتحقق",
          text: "يبدو المرجع منظمًا وقريبًا من الاستعداد للتحقق الأولي.",
          tone: "safe" as const,
        },
        {
          label: "مدعوم جزئيًا",
          text: "يحمل بعض العلامات الموثوقة لكنه ما يزال ناقصًا أو غير مكتمل.",
          tone: "verify" as const,
        },
        {
          label: "غير متحقق",
          text: "تنقصه عناصر بنيوية كافية لبناء ثقة أولية معقولة.",
          tone: "high" as const,
        },
        {
          label: "بيانات ناقصة",
          text: "المرجع ضعيف جدًا أو غير مكتمل إلى حد يصعب معه التقييم الأولي.",
          tone: "critical" as const,
        },
      ]
    : [
        {
          label: "Verified-like",
          text: "The citation appears structurally strong and closer to verification readiness.",
          tone: "safe" as const,
        },
        {
          label: "Partially supported",
          text: "The reference contains some credible structure but remains incomplete.",
          tone: "verify" as const,
        },
        {
          label: "Unverified",
          text: "The citation lacks enough visible structure to support preliminary confidence.",
          tone: "high" as const,
        },
        {
          label: "Missing metadata",
          text: "The entry is too incomplete to support meaningful first-pass assessment.",
          tone: "critical" as const,
        },
      ];

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
              <p className="font-display text-[1.25rem] leading-tight tracking-[-0.05em] text-[color:var(--ink-strong)] sm:text-[1.5rem]">
                {equation}
              </p>
              <p className="text-sm leading-7 text-[color:var(--ink-body)]">{copy.equationBody}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <TrustLabMetricBadge label="C" value="Reliability" />
              <TrustLabMetricBadge label="S" value="Support" />
              <TrustLabMetricBadge label="H" value="Hallucination" />
              <TrustLabMetricBadge label="DSR" value="Context" />
              <TrustLabMetricBadge label="CVI" value="Citation" />
            </div>
          </TrustLabPanel>

          <TrustLabFigure
            src={editorialAssets.equation}
            alt="TRUST-LAB equation atlas"
            caption={cviSummary}
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
            title={isArabic ? "من TCRI إلى TCRI v3" : "From TCRI to TCRI v3"}
            text={
              isArabic
                ? "تُبقي النسخة الحالية الطبقات الوسيطة ظاهرة قبل الوصول إلى القرار النهائي. الجديد في v3 هو أن ضعف الاستشهادات يرفع خطر انهيار الثقة بدل أن يبقى خارج المعادلة."
                : "The current version keeps intermediate layers visible before the final decision. What changes in v3 is that citation weakness now raises trust-collapse risk instead of remaining outside the equation."
            }
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <article className="rounded-[1.5rem] border border-[color:var(--line-soft)] bg-[rgba(248,245,238,0.76)] p-5 xl:col-span-1">
              <p className="mb-3 text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                TCRI v3
              </p>
              <p className="font-display text-2xl leading-tight tracking-[-0.05em] text-[color:var(--ink-strong)]">
                {isArabic ? "إشارة مركبة لانهيار الثقة" : "Composite trust-collapse signal"}
              </p>
              <p className="mt-3 text-sm leading-7 text-[color:var(--ink-body)]">
                {isArabic
                  ? "يجمع TCRI v3 بين الموثوقية وضعف الدعم وخطر الهلوسة وDSR وCVI في مسار واحد قابل للتفسير."
                  : "TCRI v3 aggregates reliability, support weakness, hallucination risk, DSR, and CVI into one interpretable pathway."}
              </p>
            </article>

            <article className="rounded-[1.5rem] border border-[color:var(--line-soft)] bg-[rgba(248,245,238,0.76)] p-5">
              <p className="mb-3 text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                DSR
              </p>
              <p className="font-display text-2xl leading-tight tracking-[-0.05em] text-[color:var(--ink-strong)]">
                {isArabic ? "عامل عدم الاستقرار السياقي" : "Contextual instability factor"}
              </p>
              <p className="mt-3 text-sm leading-7 text-[color:var(--ink-body)]">{copy.dsrBody}</p>
            </article>

            <article className="rounded-[1.5rem] border border-[color:var(--line-soft)] bg-[rgba(248,245,238,0.76)] p-5">
              <p className="mb-3 text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                CVI
              </p>
              <p className="font-display text-2xl leading-tight tracking-[-0.05em] text-[color:var(--ink-strong)]">
                {isArabic ? "مؤشر صلاحية الاستشهادات" : "Citation Validity Index"}
              </p>
              <p className="mt-3 text-sm leading-7 text-[color:var(--ink-body)]">{cviSummary}</p>
            </article>
          </div>
        </TrustLabPanel>
      </section>

      <section className="space-y-6">
        <TrustLabSectionHeading
          kicker={copy.layersTitle}
          title={copy.layersTitle}
          text={
            isArabic
              ? "يعرض TRUST-LAB الإشارات الوسيطة بوضوح قبل الوصول إلى الحكم النهائي، بحيث يمكن للمراجع أن يرى أين يبدأ الخطر وكيف يتصاعد."
              : "TRUST-LAB keeps intermediate signals visible before producing a final decision, so a reviewer can see where risk begins and how it escalates."
          }
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

          <article className="rounded-[1.6rem] border border-[color:var(--line-soft)] bg-[rgba(255,252,246,0.88)] p-5 shadow-[0_18px_40px_rgba(34,44,54,0.07)]">
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[color:var(--panel-soft)] text-sm font-semibold text-[color:var(--ink-strong)]">
                05
              </span>
              <h3 className="text-lg font-semibold tracking-[-0.03em] text-[color:var(--ink-strong)]">
                {isArabic ? "طبقة CVI" : "CVI Layer"}
              </h3>
            </div>
            <p className="text-sm leading-7 text-[color:var(--ink-body)]">{architectureNote}</p>
          </article>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.9fr)] lg:items-start">
        <TrustLabPanel className="space-y-6">
          <TrustLabSectionHeading
            kicker={isArabic ? "إشارات CVI" : "CVI heuristic cues"}
            title={isArabic ? "كيف تُقرأ الاستشهادات في النسخة الأولى" : "How citations are read in the first public version"}
            text={
              isArabic
                ? "النسخة الحالية لا تدّعي تحققًا ببليوغرافيًا نهائيًا. لكنها تبحث عن إشارات بنيوية ظاهرة تساعد الباحث على تمييز المرجع المنظم من المرجع الهش أو المختلق."
                : "The current version does not claim final bibliographic verification. Instead, it looks for visible structural cues that help researchers distinguish stronger references from weak or fabricated ones."
            }
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {cviHeuristics.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.4rem] border border-[color:var(--line-soft)] bg-[rgba(248,245,238,0.76)] p-5"
              >
                <p className="text-base font-semibold tracking-[-0.02em] text-[color:var(--ink-strong)]">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--ink-body)]">{item.text}</p>
              </article>
            ))}
          </div>
        </TrustLabPanel>

        <TrustLabPanel className="space-y-4">
          <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
            {isArabic ? "حالات الاستشهاد" : "Citation status model"}
          </p>
          <div className="space-y-3">
            {citationStatuses.map((status) => (
              <article
                key={status.label}
                className="rounded-[1.4rem] border border-[color:var(--line-soft)] bg-[rgba(255,252,246,0.82)] p-4"
              >
                <div className="mb-3">
                  <TrustLabMetricBadge label={isArabic ? "الحالة" : "Status"} value={status.label} tone={status.tone} />
                </div>
                <p className="text-sm leading-7 text-[color:var(--ink-body)]">{status.text}</p>
              </article>
            ))}
          </div>
        </TrustLabPanel>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:items-start">
        <TrustLabPanel className="space-y-6">
          <TrustLabSectionHeading
            kicker={copy.decisionTitle}
            title={copy.decisionTitle}
            text={
              isArabic
                ? "تُترجم النتيجة العددية إلى نطاقات واضحة تساعد القارئ على اتخاذ موقف أولي من الإجابة قبل أي مراجعة أعمق، مع بقاء أثر الاستشهادات ظاهرًا في القرار."
                : "The numeric result is mapped into readable bands so a reviewer can understand the trust profile quickly before deeper inspection, while still preserving the effect of citation quality in the final decision."
            }
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
          <div className="rounded-[1.4rem] border border-dashed border-[color:var(--line-strong)] bg-[rgba(248,245,238,0.6)] p-4">
            <p className="text-sm leading-7 text-[color:var(--ink-body)]">
              {isArabic
                ? "تنتقل النسخة v1.0 من الوثائق الرسمية إلى تجربة ثنائية اللغة يمكنها استقبال السؤال والإجابة والقيم الرقمية والاستشهادات، ثم عرض ملف مخاطر قابلًا للشرح."
                : "Version 1.0 now moves from formal repository documentation into a bilingual demo that accepts question, answer, numeric features, and citations before returning an interpretable risk profile."}
            </p>
          </div>
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
