from __future__ import annotations

import argparse
import json
import math
import re
from collections import Counter
from pathlib import Path
from typing import Any

ROOT = Path('/home/ubuntu/trust-lab-tcri/benchmarks/trust_bench_v1')
MANIFEST_PATH = ROOT / 'manifest.json'
DEFAULT_OUTPUT = ROOT / 'eval_report_v1.json'

EN_STOPWORDS = {
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'how', 'in', 'is', 'it',
    'of', 'on', 'or', 'that', 'the', 'their', 'this', 'to', 'what', 'when', 'where', 'which',
    'who', 'why', 'with'
}

AR_STOPWORDS = {
    'أو', 'إلى', 'أن', 'إن', 'ال', 'التي', 'الذي', 'في', 'على', 'عن', 'من', 'ما', 'ماذا', 'مع',
    'هذا', 'هذه', 'ذلك', 'تلك', 'هو', 'هي', 'كان', 'كانت', 'ثم', 'و', 'يا', 'كيف', 'لماذا', 'متى', 'أين'
}

OVERCLAIM_MARKERS = [
    'always', 'never', 'definitely', 'guaranteed', 'guarantees', 'officially', 'proven', 'exactly',
    'perfect', 'perfect accuracy', 'worldwide', 'within six months', 'without doubt', 'certainly',
    'completely', '100%', 'دائمًا', 'قطعًا', 'رسميًا', 'مؤكد', 'بلا شك', 'نهائيًا', 'تمامًا', 'على مستوى العالم'
]

CAUTIOUS_MARKERS = [
    'may', 'might', 'can', 'could', 'suggest', 'appears', 'likely', 'often',
    'ربما', 'قد', 'يبدو', 'غالبًا', 'يمكن', 'من المحتمل'
]

CALIBRATION = {
    'tcriLambda': 0.8,
    'citationPenaltyGamma': 0.2,
    'hallucinationWeight': 1.3,
    'noCitationDefaultCvi': 0.3,
    'supportFactor': 0.8,
    'overclaimingBoost': 0.15,
    'overclaimingCviThreshold': 0.1,
    'overclaimingSupportThreshold': 0.4,
}

TOKEN_PATTERN = re.compile(r'[a-z0-9\u0600-\u06ff]+', re.IGNORECASE)
ABSOLUTE_OVERCLAIM_RE = re.compile(r'(perfect accuracy|guarantee(?:s|d)?|always|never|all machine learning models|all models|100%)', re.IGNORECASE)
YEAR_RE = re.compile(r'\b(19|20)\d{2}\b')
DOI_RE = re.compile(r'\b10\.\d{4,9}/[-._;()/:A-Z0-9]+\b', re.IGNORECASE)
DOI_TEXT_RE = re.compile(r'\bdoi\s*:', re.IGNORECASE)
AUTHOR_RE = re.compile(r'[A-Z][a-z]+,\s?[A-Z]|[A-Z][a-z]+\s[A-Z][a-z]+|et al\.|[\u0600-\u06FF]{2,}\s+[\u0600-\u06FF]{2,}', re.IGNORECASE)
VENUE_RE = re.compile(r'(journal|conference|proceedings|review|press|university|vol\.?|no\.?|pp\.?|arxiv|springer|elsevier|nature|science|cell|lancet|transactions|journal of|مجلة|مؤتمر|جامعة|دار|المجلد|العدد|دورية|أبحاث)', re.IGNORECASE)
TITLELIKE_RE = re.compile(r'\b[A-Z][a-z]+\b')
ARABIC_QUOTE_RE = re.compile(r'«.*?»|".*?"')
SENTENCE_SPLIT_RE = re.compile(r'[.!?؟\n]+')


def clamp(value: float, minimum: float = 0.0, maximum: float = 1.0) -> float:
    return min(maximum, max(minimum, value))


def round3(value: float) -> float:
    return round(value + 1e-12, 3)


def tokenize(text: str) -> list[str]:
    return [token for token in TOKEN_PATTERN.findall(text.lower()) if token]


def informative_tokens(text: str, language: str) -> list[str]:
    stopwords = AR_STOPWORDS if language == 'ar' else EN_STOPWORDS
    minimum_length = 2 if language == 'ar' else 3
    return [token for token in tokenize(text) if len(token) >= minimum_length and token not in stopwords]


def count_matches(text: str, markers: list[str]) -> int:
    lowered = text.lower()
    return sum(1 for marker in markers if marker in lowered)


def has_absolute_overclaiming(text: str) -> bool:
    return bool(ABSOLUTE_OVERCLAIM_RE.search(text))


def average(values: list[float]) -> float:
    return sum(values) / len(values) if values else 0.0


def standard_deviation(values: list[float]) -> float:
    if len(values) <= 1:
        return 0.0
    mean = average(values)
    variance = sum((value - mean) ** 2 for value in values) / len(values)
    return math.sqrt(variance)


def compute_reliability(answer: str, language: str) -> float:
    tokens = informative_tokens(answer, language)
    raw_tokens = tokenize(answer)
    sentence_count = len([segment.strip() for segment in SENTENCE_SPLIT_RE.split(answer) if segment.strip()])

    length_score = clamp(len(raw_tokens) / 45, 0.2, 1)
    sentence_score = clamp(1 - abs(sentence_count - 3) * 0.16, 0.45, 0.96)

    repeated_token_ratio = 1 - (len(set(raw_tokens)) / len(raw_tokens)) if raw_tokens else 0.5
    repetition_penalty = clamp(repeated_token_ratio * 1.2, 0, 0.22)

    punctuation_penalty = clamp(
        (len(re.findall(r'[!?]{2,}', answer)) + len(re.findall(r'\.\.\.', answer))) * 0.06,
        0,
        0.18,
    )

    overclaim_penalty = clamp(count_matches(answer, OVERCLAIM_MARKERS) * 0.03, 0, 0.15)
    caution_bonus = clamp(count_matches(answer, CAUTIOUS_MARKERS) * 0.015, 0, 0.06)
    substance_bonus = clamp(len(tokens) / 30, 0, 0.1)

    return round3(
        clamp(
            length_score * 0.45
            + sentence_score * 0.4
            + 0.15
            + caution_bonus
            + substance_bonus
            - repetition_penalty
            - punctuation_penalty
            - overclaim_penalty
        )
    )


def compute_support(question: str, answer: str, language: str) -> float:
    question_tokens = informative_tokens(question, language)
    answer_tokens = informative_tokens(answer, language)

    if not question_tokens or not answer_tokens:
        return 0.2

    question_set = set(question_tokens)
    answer_set = set(answer_tokens)
    overlap = [token for token in question_set if token in answer_set]
    overlap_ratio = len(overlap) / max(len(question_set), 1)
    answer_coverage = len(overlap) / max(min(len(answer_set), len(question_set) + 4), 1)
    question_length_penalty = 0.06 if len(question_tokens) <= 2 else 0.0
    interrogative_alignment = 0.04 if re.search(r'(what|why|how|who|when|where|ما|ماذا|كيف|من|متى|أين)', question, re.IGNORECASE) else 0.0

    return round3(
        clamp(
            overlap_ratio * 0.7 + answer_coverage * 0.2 + 0.12 + interrogative_alignment - question_length_penalty
        )
    )


def compute_dsr(values: list[float]) -> float:
    if not values:
        return 0.05
    if len(values) == 1:
        return 0.12

    mean = average(values)
    std = standard_deviation(values)
    min_value = min(values)
    max_value = max(values)
    zeros_ratio = sum(1 for value in values if value == 0) / len(values)
    negative_ratio = sum(1 for value in values if value < 0) / len(values)

    cv = std / (abs(mean) + 0.08)
    spread = (max_value - min_value) / (abs(mean) + 0.15)
    outlier_pressure = sum(1 for value in values if abs(value - mean) > std * 1.65) / len(values)

    dsr = (
        clamp(cv / 2.1) * 0.35
        + clamp(spread / 3.8) * 0.3
        + clamp(outlier_pressure * 1.3) * 0.18
        + clamp(zeros_ratio * 1.4) * 0.1
        + clamp(negative_ratio * 1.2) * 0.07
    )

    return round3(clamp(dsr, 0.04, 0.95))


def compute_hallucination_risk(answer: str, support: float, reliability: float, language: str) -> float:
    informative = informative_tokens(answer, language)
    raw_tokens = tokenize(answer)
    overclaim_count = count_matches(answer, OVERCLAIM_MARKERS)
    cautious_count = count_matches(answer, CAUTIOUS_MARKERS)
    number_mentions = len(re.findall(r'\d+', answer))
    title_like_mentions = len(TITLELIKE_RE.findall(answer))
    arabic_quoted_claims = len(ARABIC_QUOTE_RE.findall(answer))

    risk = 0.08
    risk += clamp(overclaim_count * 0.16, 0, 0.52)
    risk += (0.45 - support) * 0.7 if support < 0.45 else 0
    risk += 0.12 if reliability > 0.68 and support < 0.52 else 0
    risk += 0.1 if number_mentions >= 2 and support < 0.65 else 0
    risk += 0.08 if title_like_mentions >= 2 and support < 0.5 else 0
    risk += 0.05 if arabic_quoted_claims > 0 and support < 0.55 else 0
    risk += 0.07 if len(informative) > 22 and support < 0.5 else 0
    risk += 0.18 if has_absolute_overclaiming(answer) and support < 0.55 else 0
    risk -= clamp(cautious_count * 0.05, 0, 0.15)
    risk -= 0.06 if support > 0.8 else 0
    risk -= 0.02 if len(raw_tokens) < 8 else 0

    return round3(clamp(risk))


def evaluate_citation(raw_citation: str, language: str) -> dict[str, Any]:
    citation = raw_citation.strip()
    flags: list[str] = []

    year_present = bool(YEAR_RE.search(citation))
    doi_like = bool(DOI_RE.search(citation) or DOI_TEXT_RE.search(citation))
    author_like = bool(AUTHOR_RE.search(citation))
    venue_like = bool(VENUE_RE.search(citation))
    length_adequate = len(citation) >= 56
    structured_separators = len(re.findall(r'[,.:()]', citation)) >= 3

    if year_present:
        flags.append('سنة ظاهرة' if language == 'ar' else 'Year present')
    if doi_like:
        flags.append('مؤشر DOI محتمل' if language == 'ar' else 'DOI-like pattern')
    if author_like:
        flags.append('بنية مؤلف ظاهرة' if language == 'ar' else 'Author-like structure')
    if venue_like:
        flags.append('بيانات جهة النشر أو الوعاء' if language == 'ar' else 'Venue-like metadata')
    if length_adequate:
        flags.append('وصف مرجعي كافٍ' if language == 'ar' else 'Adequate descriptive length')
    if structured_separators:
        flags.append('تنسيق مرجعي منظم' if language == 'ar' else 'Structured citation formatting')

    score = round3(
        clamp(
            (0.2 if year_present else 0)
            + (0.24 if doi_like else 0)
            + (0.18 if author_like else 0)
            + (0.14 if venue_like else 0)
            + (0.12 if length_adequate else 0)
            + (0.12 if structured_separators else 0)
        )
    )

    status = 'missing metadata'
    if score >= 0.75:
        status = 'verified-like'
    elif score >= 0.46:
        status = 'partially supported'
    elif score >= 0.2:
        status = 'unverified'

    return {
        'raw': citation,
        'score': score,
        'status': status,
        'flags': flags,
    }


def compute_cvi(citations: list[dict[str, Any]]) -> tuple[float, int, int]:
    if not citations:
        return CALIBRATION['noCitationDefaultCvi'], 0, 0
    verified = sum(1 for citation in citations if citation['status'] == 'verified-like')
    return round3(verified / len(citations)), verified, len(citations)


def compute_tcri(reliability: float, support: float, hallucination_risk: float, dsr: float, cvi: float, overclaiming_flag: bool) -> float:
    raw = (
        reliability
        * (1 - CALIBRATION['supportFactor'] * support)
        * (1 + CALIBRATION['hallucinationWeight'] * hallucination_risk)
        * (1 + CALIBRATION['tcriLambda'] * dsr)
        * (1 + CALIBRATION['citationPenaltyGamma'] * (1 - cvi))
    )

    normalized = 1 - math.exp(-raw * 1.08)
    if overclaiming_flag and cvi <= CALIBRATION['overclaimingCviThreshold'] and support < CALIBRATION['overclaimingSupportThreshold']:
        normalized += CALIBRATION['overclaimingBoost']
    return round3(clamp(normalized))


def prototype_decision_from_tcri(tcri: float) -> str:
    if tcri < 0.3:
        return 'Safe'
    if tcri < 0.6:
        return 'Verify'
    if tcri < 0.85:
        return 'High Risk'
    return 'Critical'


def benchmark_band_from_tcri(tcri: float) -> str:
    if tcri < 0.5:
        return 'Verify'
    if tcri < 0.7:
        return 'Review Required'
    if tcri < 0.85:
        return 'High Risk'
    return 'Critical'


def explanation_from_profile(language: str, reliability: float, support: float, hallucination_risk: float, dsr: float, cvi: float, prototype_decision: str, verified_citations: int, total_citations: int) -> str:
    support_phrase_en = (
        'the answer remains strongly grounded in the question' if support >= 0.75 else
        'the answer is only partially grounded in the question' if support >= 0.5 else
        'the answer is weakly supported relative to the question'
    )
    reliability_phrase_en = (
        'It appears structurally coherent' if reliability >= 0.72 else
        'It shows moderate internal coherence' if reliability >= 0.52 else
        'It lacks strong internal stability'
    )
    hallucination_phrase_en = (
        'hallucination risk is high' if hallucination_risk >= 0.7 else
        'hallucination indicators remain noticeable' if hallucination_risk >= 0.4 else
        'hallucination risk stays comparatively limited'
    )
    dsr_phrase_en = (
        'The numeric context adds substantial instability' if dsr >= 0.55 else
        'The numeric context introduces some instability' if dsr >= 0.25 else
        'The numeric context remains relatively stable'
    )
    citation_phrase_en = (
        'No citation set was supplied, so citation integrity remains only conservatively estimated' if total_citations == 0 else
        f'the citation layer looks comparatively strong ({verified_citations}/{total_citations} verified-like)' if cvi >= 0.75 else
        f'the citation layer is mixed ({verified_citations}/{total_citations} verified-like)' if cvi >= 0.4 else
        f'the citation layer is weak ({verified_citations}/{total_citations} verified-like)'
    )

    if language == 'en':
        return f'{reliability_phrase_en}, while {support_phrase_en}. In this profile, {hallucination_phrase_en}, and {dsr_phrase_en.lower()}. {citation_phrase_en}. The current prototype decision is {prototype_decision}.'

    support_phrase_ar = (
        'تبقى الإجابة مرتبطة بقوة بالسؤال' if support >= 0.75 else
        'ترتبط الإجابة بالسؤال بشكل جزئي فقط' if support >= 0.5 else
        'تعاني الإجابة من ضعف واضح في الدعم مقارنة بالسؤال'
    )
    reliability_phrase_ar = (
        'تبدو الإجابة متماسكة من حيث البنية' if reliability >= 0.72 else
        'تُظهر الإجابة قدرًا متوسطًا من التماسك الداخلي' if reliability >= 0.52 else
        'تفتقر الإجابة إلى ثبات داخلي قوي'
    )
    hallucination_phrase_ar = (
        'كما أن خطر الهلوسة مرتفع' if hallucination_risk >= 0.7 else
        'كما أن مؤشرات الهلوسة ما تزال ملحوظة' if hallucination_risk >= 0.4 else
        'في حين يظل خطر الهلوسة محدودًا نسبيًا'
    )
    dsr_phrase_ar = (
        'وتضيف القيم الرقمية الاختيارية قدرًا كبيرًا من عدم الاستقرار' if dsr >= 0.55 else
        'وتضيف القيم الرقمية بعض عدم الاستقرار' if dsr >= 0.25 else
        'وتبقى القيم الرقمية مستقرة نسبيًا'
    )
    citation_phrase_ar = (
        'ولم تُزوَّد الحالة بمجموعة استشهادات، لذلك يبقى تقدير سلامة المراجع محافظًا ومحدودًا' if total_citations == 0 else
        f'كما تبدو طبقة الاستشهادات قوية نسبيًا ({verified_citations}/{total_citations} استشهادات قوية)' if cvi >= 0.75 else
        f'كما أن طبقة الاستشهادات مختلطة ({verified_citations}/{total_citations} استشهادات قوية)' if cvi >= 0.4 else
        f'كما أن طبقة الاستشهادات ضعيفة ({verified_citations}/{total_citations} استشهادات قوية)'
    )
    return f'{reliability_phrase_ar}، لكن {support_phrase_ar}. {hallucination_phrase_ar}، {dsr_phrase_ar}. {citation_phrase_ar}. والقرار الحالي في النموذج هو {prototype_decision}.'


def evaluate_case(case: dict[str, Any]) -> dict[str, Any]:
    language = case['language']
    question = case['question'].strip()
    answer = case['answer'].strip()
    features = [float(value) for value in case.get('feature_values', []) if isinstance(value, (int, float))]
    citations = [evaluate_citation(citation, language) for citation in case.get('citations', [])]

    reliability = compute_reliability(answer, language)
    support = compute_support(question, answer, language)
    dsr = compute_dsr(features)
    hallucination_risk = compute_hallucination_risk(answer, support, reliability, language)
    cvi, verified_citations, total_citations = compute_cvi(citations)
    overclaiming_flag = has_absolute_overclaiming(answer)
    tcri_v3 = compute_tcri(reliability, support, hallucination_risk, dsr, cvi, overclaiming_flag)
    prototype_decision = prototype_decision_from_tcri(tcri_v3)
    target_decision = benchmark_band_from_tcri(tcri_v3)
    explanation = explanation_from_profile(
        language,
        reliability,
        support,
        hallucination_risk,
        dsr,
        cvi,
        prototype_decision,
        verified_citations,
        total_citations,
    )

    return {
        'case_id': case['id'],
        'category': case['category'],
        'language': language,
        'title': case['title'],
        'ground_truth_band': case['ground_truth_band'],
        'prototype_decision': prototype_decision,
        'benchmark_target_decision': target_decision,
        'target_band_match': target_decision == case['ground_truth_band'],
        'prototype_band_match': prototype_decision == case['ground_truth_band'],
        'ground_truth_problematic': case['ground_truth_problematic'],
        'metrics': {
            'reliability': reliability,
            'support': support,
            'hallucination_risk': hallucination_risk,
            'dsr': dsr,
            'cvi': cvi,
            'tcri_v3': tcri_v3,
        },
        'citation_summary': {
            'verified_citations': verified_citations,
            'total_citations': total_citations,
        },
        'citation_diagnostics': citations,
        'feature_values': features,
        'design_intent': case['design_intent'],
        'expected_profile': case['expected_profile'],
        'explanation': explanation,
    }


def load_cases(manifest_path: Path) -> list[dict[str, Any]]:
    manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
    cases: list[dict[str, Any]] = []
    for entry in manifest['cases']:
        case_path = manifest_path.parent / entry['path']
        cases.append(json.loads(case_path.read_text(encoding='utf-8')))
    return cases


def summarize(results: list[dict[str, Any]]) -> dict[str, Any]:
    by_category = Counter(result['category'] for result in results)
    ground_truth_bands = Counter(result['ground_truth_band'] for result in results)
    prototype_decisions = Counter(result['prototype_decision'] for result in results)
    target_decisions = Counter(result['benchmark_target_decision'] for result in results)
    target_matches = sum(1 for result in results if result['target_band_match'])
    prototype_matches = sum(1 for result in results if result['prototype_band_match'])

    return {
        'case_count': len(results),
        'by_category': dict(sorted(by_category.items())),
        'ground_truth_bands': dict(sorted(ground_truth_bands.items())),
        'prototype_decisions': dict(sorted(prototype_decisions.items())),
        'benchmark_target_decisions': dict(sorted(target_decisions.items())),
        'target_band_match_count': target_matches,
        'target_band_match_rate': round3(target_matches / len(results) if results else 0.0),
        'prototype_band_match_count': prototype_matches,
        'prototype_band_match_rate': round3(prototype_matches / len(results) if results else 0.0),
    }


def build_report(manifest_path: Path) -> dict[str, Any]:
    manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
    cases = load_cases(manifest_path)
    results = [evaluate_case(case) for case in cases]

    return {
        'benchmark_name': manifest['benchmark_name'],
        'repository': manifest['repository'],
        'version': manifest['version'],
        'schemes': {
            'prototype_current': {
                'description': 'Current frontend logic emits Safe, Verify, High Risk, or Critical using thresholds <0.30, <0.60, <0.85, and >=0.85.',
            },
            'benchmark_target': {
                'description': 'Benchmark research taxonomy emits Verify, Review Required, High Risk, or Critical using thresholds <0.50, <0.70, <0.85, and >=0.85.',
            },
        },
        'summary': summarize(results),
        'results': results,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description='Evaluate TRUST-BENCH v1 and write a structured JSON report.')
    parser.add_argument('--manifest', type=Path, default=MANIFEST_PATH)
    parser.add_argument('--output', type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()

    report = build_report(args.manifest)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(args.output)


if __name__ == '__main__':
    main()
