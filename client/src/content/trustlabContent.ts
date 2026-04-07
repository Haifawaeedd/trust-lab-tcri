/*
  TRUST-LAB Editorial Systems Lab reminder for this file:
  This content must support a bilingual research instrument with editorial authority.
  Favor concise, scholarly copy, strong information hierarchy, and terms that remain stable across English and Arabic.
  Does this choice reinforce or dilute our design philosophy?
*/

export type Language = "en" | "ar";

export type DecisionBand = "Safe" | "Verify" | "High Risk" | "Critical";

export type DemoCase = {
  id: string;
  title: { en: string; ar: string };
  question: { en: string; ar: string };
  answer: { en: string; ar: string };
  featureValues: string;
};

export const editorialAssets = {
  hero:
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663029290257/RJFnB8eJ8EWmUeAQSDBnXk/trustlab-hero-editorial-Z49rNX223gjLfGaQZpW6Jb.webp",
  architecture:
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663029290257/RJFnB8eJ8EWmUeAQSDBnXk/trustlab-architecture-panel-7ojXQbahAfkMMLbnKAGKJ7.webp",
  equation:
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663029290257/RJFnB8eJ8EWmUeAQSDBnXk/trustlab-equation-atlas-WVz6pRz4uu9YivKNLmSNr3.webp",
  roadmap:
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663029290257/RJFnB8eJ8EWmUeAQSDBnXk/trustlab-roadmap-research-joJdstnEVciQUMgtx8j68b.webp",
} as const;

export const navigation = {
  en: {
    project: "Project",
    methodology: "Methodology",
    demo: "Demo",
    githubFirst: "GitHub-first research prototype",
    languageLabel: "Language",
    openDemo: "Open demo",
    exploreMethodology: "Explore methodology",
  },
  ar: {
    project: "المشروع",
    methodology: "المنهجية",
    demo: "التجربة",
    githubFirst: "نموذج بحثي يبدأ من GitHub",
    languageLabel: "اللغة",
    openDemo: "افتح التجربة",
    exploreMethodology: "استكشف المنهجية",
  },
} as const;

export const projectPageContent = {
  en: {
    badge: "GitHub-first research instrument",
    title: "TRUST-LAB",
    subtitle:
      "A research platform for Data Integrity, Reliability, Hallucination Risk, and Trust Collapse Analysis in AI Outputs.",
    summary:
      "TRUST-LAB is built to help researchers and expert users inspect AI outputs through layered signals rather than a single opaque judgment. Its first version combines a formal repository core with a bilingual visual interface.",
    noveltyTitle: "Original research identity",
    noveltyText:
      "The project’s signature lies in the combination of the Trust Collapse Risk Index (TCRI) and the Data Scale Risk (DSR) signal. Together they frame trust failure as a composite, inspectable condition rather than a vague quality score.",
    equationLabel: "Core formulation",
    equation: "TCRI = C × (1 − S) × (1 + H) × (1 + λDSR)",
    abstractTitle: "Why this project matters",
    abstractText:
      "Many AI answers sound convincing before they are well supported. TRUST-LAB is designed to make that gap legible by exposing reliability, support, hallucination risk, and contextual instability as separate but interacting signals.",
    architectureTitle: "Layered architecture",
    architectureIntro:
      "The framework follows a disciplined path from user input to decision and explanation, preserving interpretability at each stage.",
    architectureLayers: [
      {
        label: "Data Integrity",
        description:
          "Computes DSR and checks whether optional numeric inputs appear stable and proportionate.",
      },
      {
        label: "Reliability",
        description:
          "Estimates whether the answer behaves like a coherent and internally stable response.",
      },
      {
        label: "Support",
        description:
          "Measures how closely the answer remains aligned with the originating question.",
      },
      {
        label: "Hallucination",
        description:
          "Flags patterns associated with unsupported certainty, fabricated specificity, or risky overclaiming.",
      },
      {
        label: "TCRI Engine",
        description:
          "Aggregates the component signals into the composite trust-collapse indicator.",
      },
      {
        label: "Decision and Explanation",
        description:
          "Translates the metric profile into an interpretable risk band and a short narrative summary.",
      },
    ],
    roadmapTitle: "Roadmap",
    roadmapIntro:
      "The project is intentionally staged so that credibility and interpretability come before feature inflation.",
    roadmapStages: [
      {
        version: "v1.0",
        title: "Heuristic public research prototype",
        description:
          "Establish the GitHub repository, formal docs, examples, and bilingual demo layer.",
      },
      {
        version: "v1.1",
        title: "Better explanations and reporting",
        description:
          "Improve interpretive output, example coverage, and downloadable summaries.",
      },
      {
        version: "v2.0",
        title: "Verifier-backed evaluation",
        description:
          "Upgrade selected heuristic layers with stronger verification methods.",
      },
      {
        version: "v3.0",
        title: "Benchmark suite",
        description:
          "Introduce curated cases, comparative workflows, and more systematic calibration.",
      },
      {
        version: "v4.0",
        title: "API workflows",
        description:
          "Extend the framework into programmatic and batch evaluation settings.",
      },
    ],
    ctaTitle: "From repository to public interpretation",
    ctaText:
      "The website is the explanatory layer of the same research system. Move into the methodology to inspect the metric logic, or open the demo to evaluate an answer directly.",
  },
  ar: {
    badge: "أداة بحثية تبدأ من GitHub",
    title: "TRUST-LAB",
    subtitle:
      "منصة بحثية لتحليل سلامة البيانات والموثوقية وخطر الهلوسة وانهيار الثقة في مخرجات الذكاء الاصطناعي.",
    summary:
      "صُمِّم TRUST-LAB لمساعدة الباحثين والخبراء على فحص مخرجات الذكاء الاصطناعي عبر طبقات تحليلية واضحة بدلًا من حكم واحد غامض. تجمع النسخة الأولى بين نواة بحثية موثقة وواجهة مرئية ثنائية اللغة.",
    noveltyTitle: "الهوية البحثية الأصلية",
    noveltyText:
      "تكمن بصمة المشروع في الجمع بين مؤشر انهيار الثقة TCRI وإشارة خطر مقياس البيانات DSR. وبهذا تصبح مشكلة الثقة حالة مركبة يمكن فحصها وشرحها، لا مجرد درجة عامة مبهمة.",
    equationLabel: "الصياغة الأساسية",
    equation: "TCRI = C × (1 − S) × (1 + H) × (1 + λDSR)",
    abstractTitle: "لماذا يهم هذا المشروع؟",
    abstractText:
      "كثير من إجابات الذكاء الاصطناعي تبدو مقنعة قبل أن تكون مدعومة جيدًا. لذلك يهدف TRUST-LAB إلى إظهار الفجوة بين الموثوقية الظاهرية والدعم الفعلي عبر مؤشرات منفصلة لكنها مترابطة.",
    architectureTitle: "المعمارية الطبقية",
    architectureIntro:
      "يتبع الإطار مسارًا منظمًا من الإدخال إلى القرار والتفسير، مع الحفاظ على قابلية الفهم في كل مرحلة.",
    architectureLayers: [
      {
        label: "سلامة البيانات",
        description:
          "تحسب DSR وتفحص ما إذا كانت القيم الرقمية الاختيارية تبدو مستقرة ومتناسبة.",
      },
      {
        label: "الموثوقية",
        description:
          "تقدّر ما إذا كانت الإجابة تبدو متماسكة وثابتة من الداخل.",
      },
      {
        label: "الدعم",
        description:
          "تقيس مدى بقاء الإجابة مرتبطة بالسؤال الأصلي ومعناه.",
      },
      {
        label: "خطر الهلوسة",
        description:
          "ترصد أنماط اليقين غير المدعوم أو التفاصيل المختلقة أو المبالغة الخطرة.",
      },
      {
        label: "محرك TCRI",
        description:
          "يجمع الإشارات السابقة في مؤشر مركب لانهيار الثقة.",
      },
      {
        label: "القرار والتفسير",
        description:
          "يحوّل ملف المؤشرات إلى نطاق خطورة واضح مع تفسير لغوي مختصر.",
      },
    ],
    roadmapTitle: "خارطة الطريق",
    roadmapIntro:
      "وُضع المشروع على مراحل متدرجة بحيث تسبق المصداقية وقابلية التفسير أي توسع مبكر في الخصائص.",
    roadmapStages: [
      {
        version: "v1.0",
        title: "نموذج بحثي عام يعتمد على heuristics",
        description:
          "تأسيس المستودع على GitHub والوثائق الرسمية والأمثلة والواجهة الثنائية اللغة.",
      },
      {
        version: "v1.1",
        title: "تفسيرات وتقارير أفضل",
        description:
          "تحسين الشرح وتوسيع الأمثلة وإضافة مخرجات قابلة للتنزيل.",
      },
      {
        version: "v2.0",
        title: "تقييم مدعوم بمتحقق أقوى",
        description:
          "ترقية بعض الطبقات الاستدلالية إلى طرق تحقق أكثر قوة.",
      },
      {
        version: "v3.0",
        title: "مجموعة بنشمارك",
        description:
          "إضافة حالات منظمة ومسارات مقارنة ومعايرة أكثر منهجية.",
      },
      {
        version: "v4.0",
        title: "مسارات API",
        description:
          "توسيع الإطار ليخدم سيناريوهات التقييم البرمجية والجماعية.",
      },
    ],
    ctaTitle: "من المستودع إلى التفسير العام",
    ctaText:
      "الواجهة المرئية هنا ليست منفصلة عن المستودع، بل هي طبقة تفسيرية للنظام البحثي نفسه. انتقل إلى صفحة المنهجية لفهم المنطق، أو افتح صفحة التجربة لتقييم إجابة مباشرة.",
  },
} as const;

export const methodologyPageContent = {
  en: {
    badge: "Formal methodology",
    title: "How TRUST-LAB reasons about trust collapse",
    intro:
      "TRUST-LAB does not reduce evaluation to a single opaque score. It separates reliability, support, hallucination risk, and data-scale instability before combining them into a composite trust-collapse signal.",
    equationTitle: "Trust Collapse Risk Index",
    equationBody:
      "The TCRI formulation is designed to increase when a seemingly dependable answer is weakly supported, more hallucinatory, or surrounded by unstable structured context.",
    dsrTitle: "Data Scale Risk",
    dsrBody:
      "DSR captures instability in optional numeric inputs. In the first version, it acts as a contextual warning signal that reflects scale mismatch, dispersion, or suspicious variation.",
    layersTitle: "Analytical layers",
    layers: [
      {
        title: "Data Integrity Layer",
        text: "Estimates DSR and checks whether the available feature values appear stable enough to support evaluation.",
      },
      {
        title: "Reliability Layer",
        text: "Estimates internal answer stability or coherence, treated as a reliability proxy rather than factual proof.",
      },
      {
        title: "Support Layer",
        text: "Measures how directly the answer responds to the question and whether it remains grounded in the task.",
      },
      {
        title: "Hallucination Layer",
        text: "Raises caution when the answer shows unsupported certainty, fabricated specificity, or risky overclaiming.",
      },
      {
        title: "TCRI Engine",
        text: "Combines the component signals into a composite index that highlights trust-collapse conditions.",
      },
      {
        title: "Decision Layer",
        text: "Maps the final signal to Safe, Verify, High Risk, or Critical for quicker interpretation.",
      },
    ],
    decisionTitle: "Decision interpretation",
    decisionBands: [
      {
        label: "Safe",
        range: "< 0.30",
        description: "Low apparent trust-collapse risk under the current heuristic setup.",
      },
      {
        label: "Verify",
        range: "0.30 – 0.60",
        description: "Some caution is warranted and the answer should be reviewed.",
      },
      {
        label: "High Risk",
        range: "0.60 – 0.85",
        description: "Substantial warning signals are interacting in a concerning way.",
      },
      {
        label: "Critical",
        range: "≥ 0.85",
        description: "The profile indicates severe trust-collapse concern and should be treated carefully.",
      },
    ],
    limitationTitle: "Research prototype note",
    limitationText:
      "Version 1 is intentionally transparent and heuristic in selected layers. The conceptual architecture is stable, while the implementation can later evolve toward stronger verifier-backed methods.",
  },
  ar: {
    badge: "منهجية رسمية",
    title: "كيف يفكر TRUST-LAB في انهيار الثقة",
    intro:
      "لا يختزل TRUST-LAB التقييم في درجة واحدة غامضة، بل يفصل بين الموثوقية والدعم وخطر الهلوسة وعدم استقرار السياق العددي قبل دمجها في إشارة مركبة لانهيار الثقة.",
    equationTitle: "مؤشر انهيار الثقة TCRI",
    equationBody:
      "صُمِّمت معادلة TCRI بحيث ترتفع عندما تبدو الإجابة موثوقة ظاهريًا لكنها ضعيفة الدعم أو أكثر عرضة للهلوسة أو محاطة بسياق رقمي غير مستقر.",
    dsrTitle: "خطر مقياس البيانات DSR",
    dsrBody:
      "يلتقط DSR عدم الاستقرار في القيم الرقمية الاختيارية. وفي النسخة الأولى يعمل كإشارة تحذيرية للسياق، تعكس عدم التناسب أو التشتت أو الاختلاف المشبوه في القيم.",
    layersTitle: "الطبقات التحليلية",
    layers: [
      {
        title: "طبقة سلامة البيانات",
        text: "تقدّر DSR وتفحص ما إذا كانت القيم المتاحة مستقرة بما يكفي لدعم التقييم.",
      },
      {
        title: "طبقة الموثوقية",
        text: "تقدّر ثبات الإجابة أو تماسكها الداخلي، بوصفها مؤشرًا تقريبيًا لا برهانًا نهائيًا.",
      },
      {
        title: "طبقة الدعم",
        text: "تقيس مدى استجابة الإجابة للسؤال وبقاءها مرتبطة بمقصوده الأساسي.",
      },
      {
        title: "طبقة خطر الهلوسة",
        text: "ترفع مستوى الحذر عندما تظهر الإجابة يقينًا غير مدعوم أو تفاصيل مختلقة أو مبالغة خطرة.",
      },
      {
        title: "محرك TCRI",
        text: "يجمع الإشارات السابقة في مؤشر مركب يبرز حالات انهيار الثقة.",
      },
      {
        title: "طبقة القرار",
        text: "تحول النتيجة النهائية إلى Safe أو Verify أو High Risk أو Critical لتسهيل القراءة.",
      },
    ],
    decisionTitle: "تفسير نطاقات القرار",
    decisionBands: [
      {
        label: "Safe",
        range: "< 0.30",
        description: "مستوى منخفض ظاهريًا من خطر انهيار الثقة وفق الإعداد الاستدلالي الحالي.",
      },
      {
        label: "Verify",
        range: "0.30 – 0.60",
        description: "هناك قدر من الحذر مطلوب، وينبغي مراجعة الإجابة قبل الاعتماد عليها.",
      },
      {
        label: "High Risk",
        range: "0.60 – 0.85",
        description: "تتفاعل إشارات تحذيرية مهمة بطريقة مقلقة.",
      },
      {
        label: "Critical",
        range: "≥ 0.85",
        description: "يشير الملف الناتج إلى قلق شديد من انهيار الثقة ويستدعي تعاملًا حذرًا.",
      },
    ],
    limitationTitle: "ملاحظة حول النسخة البحثية",
    limitationText:
      "النسخة الأولى مقصودة لتكون شفافة وتعتمد على heuristics في بعض الطبقات. المعمارية المفاهيمية ثابتة، بينما يمكن تطوير التنفيذ لاحقًا نحو طرق تحقق أقوى.",
  },
} as const;

export const demoPageContent = {
  en: {
    badge: "Interactive evaluation",
    title: "Run a TRUST-LAB evaluation",
    intro:
      "Enter a question, a model answer, and optional numeric feature values to inspect the full trust profile. The first version runs on transparent client-side heuristics for interpretability.",
    fields: {
      question: "Question",
      answer: "Model answer",
      features: "Optional feature values",
      featuresHint: "Comma-separated numeric values, for example: 0.42, 0.44, 0.40, 0.43",
    },
    actions: {
      evaluate: "Evaluate output",
      loadExample: "Load example",
      clear: "Clear",
    },
    outputs: {
      decision: "Decision",
      explanation: "Explanation",
      reliability: "Reliability",
      support: "Support",
      hallucination: "Hallucination Risk",
      dsr: "DSR",
      tcri: "TCRI",
    },
    prototypeNote:
      "Prototype note: v1 uses interpretable heuristics to express the framework clearly. Later versions can replace selected layers with stronger verifiers without changing the conceptual architecture.",
    examplesTitle: "Curated example cases",
  },
  ar: {
    badge: "تقييم تفاعلي",
    title: "شغّل تقييم TRUST-LAB",
    intro:
      "أدخل السؤال وإجابة النموذج والقيم الرقمية الاختيارية لكي ترى ملف الثقة كاملًا. تعتمد النسخة الأولى على heuristics واضحة داخل المتصفح بهدف تعزيز قابلية الفهم.",
    fields: {
      question: "السؤال",
      answer: "إجابة النموذج",
      features: "قيم الخصائص الاختيارية",
      featuresHint: "أدخل أرقامًا مفصولة بفواصل، مثل: 0.42, 0.44, 0.40, 0.43",
    },
    actions: {
      evaluate: "قيّم المخرج",
      loadExample: "حمّل مثالًا",
      clear: "مسح",
    },
    outputs: {
      decision: "القرار",
      explanation: "التفسير",
      reliability: "الموثوقية",
      support: "الدعم",
      hallucination: "خطر الهلوسة",
      dsr: "DSR",
      tcri: "TCRI",
    },
    prototypeNote:
      "ملاحظة: تعتمد v1 على heuristics قابلة للفهم لتوضيح الإطار بوضوح. ويمكن لاحقًا استبدال بعض الطبقات بوسائل تحقق أقوى دون تغيير البنية المفاهيمية.",
    examplesTitle: "أمثلة منتقاة",
  },
} as const;

export const trustSignals = {
  en: [
    {
      label: "Reliability",
      text: "A proxy for how coherent and internally stable the answer appears.",
    },
    {
      label: "Support",
      text: "A measure of how directly the answer remains grounded in the question.",
    },
    {
      label: "Hallucination Risk",
      text: "A warning signal for unsupported certainty or fabricated specificity.",
    },
    {
      label: "DSR",
      text: "A contextual risk signal derived from instability in optional numeric inputs.",
    },
    {
      label: "TCRI",
      text: "The composite trust-collapse indicator built from the full signal profile.",
    },
  ],
  ar: [
    {
      label: "الموثوقية",
      text: "مؤشر تقريبي لمدى تماسك الإجابة وثباتها الداخلي.",
    },
    {
      label: "الدعم",
      text: "مقياس لمدى بقاء الإجابة مرتبطة مباشرة بالسؤال.",
    },
    {
      label: "خطر الهلوسة",
      text: "إشارة تحذيرية لليقين غير المدعوم أو التفاصيل المختلقة.",
    },
    {
      label: "DSR",
      text: "إشارة سياقية مشتقة من عدم الاستقرار في القيم الرقمية الاختيارية.",
    },
    {
      label: "TCRI",
      text: "المؤشر المركب لانهيار الثقة المبني على ملف الإشارات كاملًا.",
    },
  ],
} as const;

export const demoCases: DemoCase[] = [
  {
    id: "case-001",
    title: {
      en: "Grounded explanatory answer",
      ar: "إجابة تفسيرية مدعومة",
    },
    question: {
      en: "What are the three main stages of the water cycle?",
      ar: "ما المراحل الثلاث الرئيسية في دورة الماء؟",
    },
    answer: {
      en: "The three main stages of the water cycle are evaporation, condensation, and precipitation. Water evaporates from oceans, lakes, and rivers, forms clouds through condensation, and then returns to the surface as precipitation such as rain or snow.",
      ar: "المراحل الثلاث الرئيسية في دورة الماء هي التبخر والتكاثف والهطول. يتبخر الماء من البحار والأنهار والبحيرات، ثم يتكاثف ليكوّن السحب، وبعد ذلك يعود إلى سطح الأرض على شكل مطر أو ثلج.",
    },
    featureValues: "0.42, 0.44, 0.40, 0.43",
  },
  {
    id: "case-002",
    title: {
      en: "Fluent but weakly supported answer",
      ar: "إجابة سلسة لكن دعمها ضعيف",
    },
    question: {
      en: "Summarize the causes of the 2008 financial crisis in two sentences.",
      ar: "لخّص أسباب الأزمة المالية لعام 2008 في جملتين.",
    },
    answer: {
      en: "The crisis happened because global markets became unstable and many institutions were affected by poor decisions. It was mainly caused by broad economic pressure and a lack of confidence across sectors.",
      ar: "حدثت الأزمة لأن الأسواق العالمية أصبحت غير مستقرة وتأثرت مؤسسات كثيرة بقرارات ضعيفة. وكان السبب الرئيسي ضغطًا اقتصاديًا عامًا مع تراجع الثقة عبر قطاعات متعددة.",
    },
    featureValues: "0.55, 0.61, 0.18, 0.59",
  },
  {
    id: "case-003",
    title: {
      en: "Unsupported highly specific claim",
      ar: "ادعاء شديد التحديد وغير مدعوم",
    },
    question: {
      en: "Who discovered a cure for Alzheimer's disease in 2024?",
      ar: "من الذي اكتشف علاجًا نهائيًا لمرض ألزهايمر في عام 2024؟",
    },
    answer: {
      en: "In 2024, Dr. Elena Marwick at the Zurich Neurocognitive Institute officially discovered the first complete cure for Alzheimer's disease, and the treatment was approved worldwide within six months.",
      ar: "في عام 2024 اكتشفت الدكتورة إلينا مارويك في معهد زيورخ للإدراك العصبي أول علاج كامل لمرض ألزهايمر، وتم اعتماد العلاج عالميًا خلال ستة أشهر.",
    },
    featureValues: "0.91, 0.14, 0.88, 0.09",
  },
] as const;

export const footerContent = {
  en: {
    line:
      "TRUST-LAB is being built as a GitHub-first, research-grade prototype with a bilingual public interface.",
  },
  ar: {
    line:
      "يُبنى TRUST-LAB كنموذج بحثي احترافي يبدأ من GitHub مع واجهة عامة ثنائية اللغة.",
  },
} as const;

export const decisionColors: Record<DecisionBand, string> = {
  Safe: "var(--signal-safe)",
  Verify: "var(--signal-verify)",
  "High Risk": "var(--signal-high)",
  Critical: "var(--signal-critical)",
};

export const decisionDescriptions = {
  en: {
    Safe: "Low apparent trust-collapse risk.",
    Verify: "Some caution is warranted.",
    "High Risk": "The answer shows substantial warning signals.",
    Critical: "The result indicates severe trust-collapse concern.",
  },
  ar: {
    Safe: "مستوى منخفض ظاهريًا من خطر انهيار الثقة.",
    Verify: "توجد حاجة واضحة إلى التحقق والمراجعة.",
    "High Risk": "تظهر على الإجابة إشارات تحذيرية قوية.",
    Critical: "تشير النتيجة إلى قلق شديد من انهيار الثقة.",
  },
} as const;

export const appMeta = {
  title: "TRUST-LAB",
  repoName: "trust-lab-tcri",
};
