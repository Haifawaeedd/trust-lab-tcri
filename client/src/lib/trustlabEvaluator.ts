/*
  TRUST-LAB Editorial Systems Lab reminder for this file:
  The scoring logic should feel transparent, disciplined, and research-oriented rather than mystical.
  Prioritize interpretability, stable naming, and bilingual-friendly text generation.
  Does this choice reinforce or dilute our design philosophy?
*/

export type DecisionBand = "Safe" | "Verify" | "High Risk" | "Critical";
export type CitationStatus =
  | "verified-like"
  | "partially supported"
  | "unverified"
  | "missing metadata";

export type EvaluationInput = {
  question: string;
  answer: string;
  featureValues: string;
  citations: string;
  language: "en" | "ar";
};

export type CitationDiagnostic = {
  raw: string;
  score: number;
  status: CitationStatus;
  flags: string[];
};

export type EvaluationResult = {
  reliability: number;
  support: number;
  hallucinationRisk: number;
  dsr: number;
  cvi: number;
  tcri: number;
  decision: DecisionBand;
  explanation: string;
  parsedFeatures: number[];
  citationDiagnostics: CitationDiagnostic[];
  verifiedCitations: number;
  totalCitations: number;
};

const EN_STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "how",
  "in",
  "is",
  "it",
  "of",
  "on",
  "or",
  "that",
  "the",
  "their",
  "this",
  "to",
  "what",
  "when",
  "where",
  "which",
  "who",
  "why",
  "with",
]);

const AR_STOPWORDS = new Set([
  "أو",
  "إلى",
  "أن",
  "إن",
  "ال",
  "التي",
  "الذي",
  "في",
  "على",
  "عن",
  "من",
  "ما",
  "ماذا",
  "مع",
  "هذا",
  "هذه",
  "ذلك",
  "تلك",
  "هو",
  "هي",
  "كان",
  "كانت",
  "ثم",
  "و",
  "يا",
  "كيف",
  "لماذا",
  "متى",
  "أين",
]);

const OVERCLAIM_MARKERS = [
  "always",
  "never",
  "definitely",
  "guaranteed",
  "officially",
  "proven",
  "exactly",
  "worldwide",
  "within six months",
  "without doubt",
  "certainly",
  "completely",
  "100%",
  "دائمًا",
  "قطعًا",
  "رسميًا",
  "مؤكد",
  "بلا شك",
  "نهائيًا",
  "تمامًا",
  "على مستوى العالم",
];

const CAUTIOUS_MARKERS = [
  "may",
  "might",
  "can",
  "could",
  "suggest",
  "appears",
  "likely",
  "often",
  "ربما",
  "قد",
  "يبدو",
  "غالبًا",
  "يمكن",
  "من المحتمل",
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function round3(value: number) {
  return Math.round(value * 1000) / 1000;
}

function tokenize(text: string) {
  return (text.toLowerCase().match(/[a-z0-9\u0600-\u06ff]+/g) ?? []).filter(Boolean);
}

function informativeTokens(text: string, language: "en" | "ar") {
  const stopwords = language === "ar" ? AR_STOPWORDS : EN_STOPWORDS;
  return tokenize(text).filter((token) => {
    const minLength = language === "ar" ? 2 : 3;
    return token.length >= minLength && !stopwords.has(token);
  });
}

function countMatches(text: string, markers: string[]) {
  const lowered = text.toLowerCase();
  return markers.reduce((count, marker) => count + (lowered.includes(marker) ? 1 : 0), 0);
}

function parseFeatureValues(input: string) {
  return input
    .split(",")
    .map((part) => Number(part.trim()))
    .filter((value) => Number.isFinite(value));
}

function parseCitationEntries(input: string) {
  const normalized = input.replace(/\r/g, "\n").trim();

  if (!normalized) {
    return [] as string[];
  }

  const rawEntries = normalized.includes("\n")
    ? normalized.split(/\n+/)
    : normalized.split(/\s*;\s*/);

  return rawEntries
    .map((entry) => entry.replace(/^[-•*\d.)\s]+/, "").trim())
    .filter(Boolean);
}

function average(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function standardDeviation(values: number[]) {
  if (values.length <= 1) return 0;
  const mean = average(values);
  const variance =
    values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

function computeReliability(answer: string, language: "en" | "ar") {
  const tokens = informativeTokens(answer, language);
  const rawTokens = tokenize(answer);
  const sentenceCount = answer
    .split(/[.!?؟\n]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean).length;

  const lengthScore = clamp(rawTokens.length / 45, 0.2, 1);
  const sentenceScore = clamp(1 - Math.abs(sentenceCount - 3) * 0.16, 0.45, 0.96);

  const repeatedTokenRatio = rawTokens.length
    ? 1 - new Set(rawTokens).size / rawTokens.length
    : 0.5;
  const repetitionPenalty = clamp(repeatedTokenRatio * 1.2, 0, 0.22);

  const punctuationPenalty = clamp(
    ((answer.match(/[!?]{2,}/g) ?? []).length + (answer.match(/\.\.\./g) ?? []).length) *
      0.06,
    0,
    0.18,
  );

  const overclaimPenalty = clamp(countMatches(answer, OVERCLAIM_MARKERS) * 0.03, 0, 0.15);
  const cautionBonus = clamp(countMatches(answer, CAUTIOUS_MARKERS) * 0.015, 0, 0.06);
  const substanceBonus = clamp(tokens.length / 30, 0, 0.1);

  return round3(
    clamp(
      lengthScore * 0.45 +
        sentenceScore * 0.4 +
        0.15 +
        cautionBonus +
        substanceBonus -
        repetitionPenalty -
        punctuationPenalty -
        overclaimPenalty,
    ),
  );
}

function computeSupport(question: string, answer: string, language: "en" | "ar") {
  const questionTokens = informativeTokens(question, language);
  const answerTokens = informativeTokens(answer, language);

  if (!questionTokens.length || !answerTokens.length) {
    return 0.2;
  }

  const questionSet = new Set(questionTokens);
  const answerSet = new Set(answerTokens);
  const overlap = Array.from(questionSet).filter((token) => answerSet.has(token));
  const overlapRatio = overlap.length / Math.max(questionSet.size, 1);

  const answerCoverage =
    overlap.length / Math.max(Math.min(answerSet.size, questionSet.size + 4), 1);
  const questionLengthPenalty = questionTokens.length <= 2 ? 0.06 : 0;
  const interrogativeAlignment = /(what|why|how|who|when|where|ما|ماذا|كيف|من|متى|أين)/i.test(
    question,
  )
    ? 0.04
    : 0;

  return round3(
    clamp(
      overlapRatio * 0.7 +
        answerCoverage * 0.2 +
        0.12 +
        interrogativeAlignment -
        questionLengthPenalty,
    ),
  );
}

function computeDSR(values: number[]) {
  if (!values.length) {
    return 0.05;
  }

  if (values.length === 1) {
    return 0.12;
  }

  const mean = average(values);
  const std = standardDeviation(values);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const zerosRatio = values.filter((value) => value === 0).length / values.length;
  const negativeRatio = values.filter((value) => value < 0).length / values.length;

  const cv = std / (Math.abs(mean) + 0.08);
  const spread = (max - min) / (Math.abs(mean) + 0.15);
  const outlierPressure =
    values.reduce(
      (count, value) => count + (Math.abs(value - mean) > std * 1.65 ? 1 : 0),
      0,
    ) / values.length;

  const dsr =
    clamp(cv / 2.1) * 0.35 +
    clamp(spread / 3.8) * 0.3 +
    clamp(outlierPressure * 1.3) * 0.18 +
    clamp(zerosRatio * 1.4) * 0.1 +
    clamp(negativeRatio * 1.2) * 0.07;

  return round3(clamp(dsr, 0.04, 0.95));
}

function computeHallucinationRisk(args: {
  answer: string;
  support: number;
  reliability: number;
  language: "en" | "ar";
}) {
  const { answer, support, reliability, language } = args;
  const informative = informativeTokens(answer, language);
  const rawTokens = tokenize(answer);
  const overclaimCount = countMatches(answer, OVERCLAIM_MARKERS);
  const cautiousCount = countMatches(answer, CAUTIOUS_MARKERS);
  const numberMentions = (answer.match(/\d+/g) ?? []).length;
  const titleLikeMentions = (answer.match(/\b[A-Z][a-z]+\b/g) ?? []).length;
  const arabicQuotedClaims = (answer.match(/«.*?»|".*?"/g) ?? []).length;

  let risk = 0.08;
  risk += clamp(overclaimCount * 0.12, 0, 0.36);
  risk += support < 0.45 ? (0.45 - support) * 0.65 : 0;
  risk += reliability > 0.68 && support < 0.52 ? 0.12 : 0;
  risk += numberMentions >= 2 && support < 0.65 ? 0.1 : 0;
  risk += titleLikeMentions >= 2 && support < 0.5 ? 0.08 : 0;
  risk += arabicQuotedClaims > 0 && support < 0.55 ? 0.05 : 0;
  risk += informative.length > 22 && support < 0.5 ? 0.07 : 0;
  risk -= clamp(cautiousCount * 0.05, 0, 0.15);
  risk -= support > 0.8 ? 0.06 : 0;
  risk -= rawTokens.length < 8 ? 0.02 : 0;

  return round3(clamp(risk));
}

function evaluateCitation(rawCitation: string, language: "en" | "ar"): CitationDiagnostic {
  const citation = rawCitation.trim();
  const flags: string[] = [];

  const yearPresent = /\b(19|20)\d{2}\b/.test(citation);
  const doiLike = /\b10\.\d{4,9}\/[\-._;()/:A-Z0-9]+\b/i.test(citation) || /\bdoi\s*:/i.test(citation);
  const authorLike =
    /[A-Z][a-z]+,\s?[A-Z]/.test(citation) ||
    /[A-Z][a-z]+\s[A-Z][a-z]+/.test(citation) ||
    /et al\./i.test(citation) ||
    /[\u0600-\u06FF]{2,}\s+[\u0600-\u06FF]{2,}/.test(citation);
  const venueLike =
    /(journal|conference|proceedings|review|press|university|vol\.?|no\.?|pp\.?|arxiv|springer|elsevier|nature|science|cell|lancet|transactions|journal of|مجلة|مؤتمر|جامعة|دار|المجلد|العدد|دورية|أبحاث)/i.test(
      citation,
    );
  const lengthAdequate = citation.length >= 56;
  const structuredSeparators = (citation.match(/[,.:()]/g) ?? []).length >= 3;

  if (yearPresent) {
    flags.push(language === "ar" ? "سنة ظاهرة" : "Year present");
  }
  if (doiLike) {
    flags.push(language === "ar" ? "مؤشر DOI محتمل" : "DOI-like pattern");
  }
  if (authorLike) {
    flags.push(language === "ar" ? "بنية مؤلف ظاهرة" : "Author-like structure");
  }
  if (venueLike) {
    flags.push(language === "ar" ? "بيانات جهة النشر أو الوعاء" : "Venue-like metadata");
  }
  if (lengthAdequate) {
    flags.push(language === "ar" ? "وصف مرجعي كافٍ" : "Adequate descriptive length");
  }
  if (structuredSeparators) {
    flags.push(language === "ar" ? "تنسيق مرجعي منظم" : "Structured citation formatting");
  }

  const score = round3(
    clamp(
      (yearPresent ? 0.2 : 0) +
        (doiLike ? 0.24 : 0) +
        (authorLike ? 0.18 : 0) +
        (venueLike ? 0.14 : 0) +
        (lengthAdequate ? 0.12 : 0) +
        (structuredSeparators ? 0.12 : 0),
    ),
  );

  let status: CitationStatus = "missing metadata";

  if (score >= 0.75) {
    status = "verified-like";
  } else if (score >= 0.46) {
    status = "partially supported";
  } else if (score >= 0.2) {
    status = "unverified";
  }

  return {
    raw: citation,
    score,
    status,
    flags,
  };
}

function computeCvi(citations: CitationDiagnostic[]) {
  if (!citations.length) {
    return {
      cvi: 0.5,
      verifiedCitations: 0,
      totalCitations: 0,
    };
  }

  const verifiedCitations = citations.filter(
    (citation) => citation.status === "verified-like",
  ).length;

  return {
    cvi: round3(verifiedCitations / citations.length),
    verifiedCitations,
    totalCitations: citations.length,
  };
}

function computeTcri(
  reliability: number,
  support: number,
  hallucinationRisk: number,
  dsr: number,
  cvi: number,
) {
  const lambda = 0.8;
  const gamma = 0.7;
  const raw =
    reliability *
    (1 - support) *
    (1 + hallucinationRisk) *
    (1 + lambda * dsr) *
    (1 + gamma * (1 - cvi));
  const normalized = 1 - Math.exp(-raw * 1.08);
  return round3(clamp(normalized));
}

function decisionFromTcri(tcri: number): DecisionBand {
  if (tcri < 0.3) return "Safe";
  if (tcri < 0.6) return "Verify";
  if (tcri < 0.85) return "High Risk";
  return "Critical";
}

function explanationFromProfile(args: {
  language: "en" | "ar";
  reliability: number;
  support: number;
  hallucinationRisk: number;
  dsr: number;
  cvi: number;
  decision: DecisionBand;
  verifiedCitations: number;
  totalCitations: number;
}) {
  const {
    language,
    reliability,
    support,
    hallucinationRisk,
    dsr,
    cvi,
    decision,
    verifiedCitations,
    totalCitations,
  } = args;

  const supportPhraseEn =
    support >= 0.75
      ? "the answer remains strongly grounded in the question"
      : support >= 0.5
        ? "the answer is only partially grounded in the question"
        : "the answer is weakly supported relative to the question";

  const reliabilityPhraseEn =
    reliability >= 0.72
      ? "It appears structurally coherent"
      : reliability >= 0.52
        ? "It shows moderate internal coherence"
        : "It lacks strong internal stability";

  const hallucinationPhraseEn =
    hallucinationRisk >= 0.7
      ? "hallucination risk is high"
      : hallucinationRisk >= 0.4
        ? "hallucination indicators remain noticeable"
        : "hallucination risk stays comparatively limited";

  const dsrPhraseEn =
    dsr >= 0.55
      ? "The numeric context adds substantial instability"
      : dsr >= 0.25
        ? "The numeric context introduces some instability"
        : "The numeric context remains relatively stable";

  const citationPhraseEn =
    totalCitations === 0
      ? "No citation set was supplied, so citation integrity remains only conservatively estimated"
      : cvi >= 0.75
        ? `the citation layer looks comparatively strong (${verifiedCitations}/${totalCitations} verified-like)`
        : cvi >= 0.4
          ? `the citation layer is mixed (${verifiedCitations}/${totalCitations} verified-like)`
          : `the citation layer is weak (${verifiedCitations}/${totalCitations} verified-like)`;

  if (language === "en") {
    return `${reliabilityPhraseEn}, while ${supportPhraseEn}. In this profile, ${hallucinationPhraseEn}, and ${dsrPhraseEn.toLowerCase()}. ${citationPhraseEn}. The resulting TRUST-LAB decision is ${decision}.`;
  }

  const supportPhraseAr =
    support >= 0.75
      ? "تبقى الإجابة مرتبطة بقوة بالسؤال"
      : support >= 0.5
        ? "ترتبط الإجابة بالسؤال بشكل جزئي فقط"
        : "تعاني الإجابة من ضعف واضح في الدعم مقارنة بالسؤال";

  const reliabilityPhraseAr =
    reliability >= 0.72
      ? "تبدو الإجابة متماسكة من حيث البنية"
      : reliability >= 0.52
        ? "تُظهر الإجابة قدرًا متوسطًا من التماسك الداخلي"
        : "تفتقر الإجابة إلى ثبات داخلي قوي";

  const hallucinationPhraseAr =
    hallucinationRisk >= 0.7
      ? "كما أن خطر الهلوسة مرتفع"
      : hallucinationRisk >= 0.4
        ? "كما أن مؤشرات الهلوسة ما تزال ملحوظة"
        : "في حين يظل خطر الهلوسة محدودًا نسبيًا";

  const dsrPhraseAr =
    dsr >= 0.55
      ? "وتضيف القيم الرقمية الاختيارية قدرًا كبيرًا من عدم الاستقرار"
      : dsr >= 0.25
        ? "وتضيف القيم الرقمية بعض عدم الاستقرار"
        : "وتبقى القيم الرقمية مستقرة نسبيًا";

  const citationPhraseAr =
    totalCitations === 0
      ? "ولم تُزوَّد الحالة بمجموعة استشهادات، لذلك يبقى تقدير سلامة المراجع محافظًا ومحدودًا"
      : cvi >= 0.75
        ? `كما تبدو طبقة الاستشهادات قوية نسبيًا (${verifiedCitations}/${totalCitations} استشهادات قوية)`
        : cvi >= 0.4
          ? `كما أن طبقة الاستشهادات مختلطة (${verifiedCitations}/${totalCitations} استشهادات قوية)`
          : `كما أن طبقة الاستشهادات ضعيفة (${verifiedCitations}/${totalCitations} استشهادات قوية)`;

  return `${reliabilityPhraseAr}، لكن ${supportPhraseAr}. ${hallucinationPhraseAr}، ${dsrPhraseAr}. ${citationPhraseAr}. وبناءً على ذلك يكون قرار TRUST-LAB هو ${decision}.`;
}

export function evaluateTrustLab(input: EvaluationInput): EvaluationResult {
  const question = input.question.trim();
  const answer = input.answer.trim();
  const parsedFeatures = parseFeatureValues(input.featureValues);
  const citationDiagnostics = parseCitationEntries(input.citations).map((citation) =>
    evaluateCitation(citation, input.language),
  );

  const reliability = computeReliability(answer, input.language);
  const support = computeSupport(question, answer, input.language);
  const dsr = computeDSR(parsedFeatures);
  const hallucinationRisk = computeHallucinationRisk({
    answer,
    support,
    reliability,
    language: input.language,
  });
  const { cvi, verifiedCitations, totalCitations } = computeCvi(citationDiagnostics);
  const tcri = computeTcri(reliability, support, hallucinationRisk, dsr, cvi);
  const decision = decisionFromTcri(tcri);
  const explanation = explanationFromProfile({
    language: input.language,
    reliability,
    support,
    hallucinationRisk,
    dsr,
    cvi,
    decision,
    verifiedCitations,
    totalCitations,
  });

  return {
    reliability,
    support,
    hallucinationRisk,
    dsr,
    cvi,
    tcri,
    decision,
    explanation,
    parsedFeatures,
    citationDiagnostics,
    verifiedCitations,
    totalCitations,
  };
}
