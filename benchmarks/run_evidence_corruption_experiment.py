from __future__ import annotations

import copy
import csv
import json
import sys
from pathlib import Path
from typing import Any

BENCH_ROOT = Path('/home/ubuntu/trust-lab-tcri/benchmarks/trust_bench_v1')
VALID_DIR = BENCH_ROOT / 'valid_research_cases'
MANIFEST_PATH = BENCH_ROOT / 'manifest.json'
EXPERIMENT_DIR = BENCH_ROOT / 'experiments' / 'evidence_corruption_v1'
CASE_EXPORT_DIR = EXPERIMENT_DIR / 'cases'

sys.path.insert(0, str(Path(__file__).resolve().parent))
from evaluate_trust_bench_v1 import evaluate_case  # noqa: E402


NEW_VALID_CASES: list[dict[str, Any]] = [
    {
        'id': 'VR-006',
        'category': 'valid_research_cases',
        'language': 'en',
        'title': 'Systematic-review answer describing why evidence synthesis matters',
        'question': 'Why are systematic reviews often treated as strong forms of evidence in health research? Provide references.',
        'answer': 'Systematic reviews are often treated as strong forms of evidence because they synthesize findings across multiple studies using explicit inclusion criteria and transparent review methods. They can reduce selective reading of isolated results and help decision-makers compare the consistency, quality, and limits of an evidence base rather than relying on a single study.',
        'citations': [
            'Higgins JPT, Thomas J, Chandler J, Cumpston M, Li T, Page MJ, Welch VA. Cochrane Handbook for Systematic Reviews of Interventions. Wiley. 2022.',
            'Murad MH, Asi N, Alsawas M, Alahdab F. New evidence pyramid. Evidence Based Medicine. 2016.'
        ],
        'feature_values': [0.16, 0.18, 0.17, 0.15],
        'design_intent': 'A low-risk evidence-synthesis case with cautious wording and two recognizable sources.',
        'ground_truth_band': 'Verify',
        'ground_truth_problematic': False,
        'expected_profile': {
            'reliability': 0.85,
            'support': 0.83,
            'hallucination_risk': 0.12,
            'dsr': 0.05,
            'cvi': 0.85,
            'tcri_v3': 0.19,
        },
        'tags': ['evidence_synthesis', 'systematic_review', 'citation_quality'],
    },
    {
        'id': 'VR-007',
        'category': 'valid_research_cases',
        'language': 'en',
        'title': 'Careful explanation of differential privacy as a statistical safeguard',
        'question': 'Explain what differential privacy is and why it is used. Include references.',
        'answer': 'Differential privacy is a statistical privacy framework that limits how much a single person\'s data can change the output of an analysis. It is used to reduce disclosure risk when publishing aggregate statistics or training data-driven systems, while making the privacy-utility tradeoff explicit rather than assumed.',
        'citations': [
            'Dwork C, Roth A. The Algorithmic Foundations of Differential Privacy. Foundations and Trends in Theoretical Computer Science. 2014.',
            'National Institute of Standards and Technology. Differential Privacy Engineering. NIST Cybersecurity White Paper. 2023.'
        ],
        'feature_values': [0.14, 0.16, 0.15, 0.17],
        'design_intent': 'A measured technical explanation with standard references and no absolute guarantees.',
        'ground_truth_band': 'Verify',
        'ground_truth_problematic': False,
        'expected_profile': {
            'reliability': 0.86,
            'support': 0.82,
            'hallucination_risk': 0.11,
            'dsr': 0.05,
            'cvi': 0.86,
            'tcri_v3': 0.18,
        },
        'tags': ['privacy', 'differential_privacy', 'technical_reference'],
    },
    {
        'id': 'VR-008',
        'category': 'valid_research_cases',
        'language': 'en',
        'title': 'Education answer on the role of formative assessment',
        'question': 'What is formative assessment and why is it used in teaching? Cite sources.',
        'answer': 'Formative assessment refers to classroom practices that generate feedback during learning rather than only at the end of instruction. It is used to help teachers adjust teaching, identify misconceptions earlier, and support students in understanding what quality work looks like before final evaluation.',
        'citations': [
            'Black P, Wiliam D. Assessment and Classroom Learning. Assessment in Education. 1998.',
            'Heritage M. Formative Assessment: Making It Happen in the Classroom. Corwin Press. 2010.'
        ],
        'feature_values': [0.17, 0.18, 0.16, 0.19],
        'design_intent': 'An education-focused valid case with moderate scope, grounded language, and structured references.',
        'ground_truth_band': 'Verify',
        'ground_truth_problematic': False,
        'expected_profile': {
            'reliability': 0.84,
            'support': 0.81,
            'hallucination_risk': 0.12,
            'dsr': 0.05,
            'cvi': 0.82,
            'tcri_v3': 0.2,
        },
        'tags': ['education', 'formative_assessment', 'pedagogy'],
    },
    {
        'id': 'VR-009',
        'category': 'valid_research_cases',
        'language': 'en',
        'title': 'Pollination answer with restrained food-systems framing',
        'question': 'Why do pollinators matter for food systems? Provide references.',
        'answer': 'Pollinators matter for food systems because they support the reproduction of many crops and wild plants, helping sustain both agricultural productivity and ecosystem resilience. Policy and assessment reports usually describe their importance in probabilistic terms, noting that dependence varies by crop, region, and management conditions rather than following a single uniform pattern.',
        'citations': [
            'Intergovernmental Science-Policy Platform on Biodiversity and Ecosystem Services. The Assessment Report on Pollinators, Pollination and Food Production. 2016.',
            'Food and Agriculture Organization of the United Nations. Pollination services for sustainable agriculture. 2018.'
        ],
        'feature_values': [0.18, 0.19, 0.17, 0.16],
        'design_intent': 'A valid environmental case that stays cautious about scope and uses institutional references.',
        'ground_truth_band': 'Verify',
        'ground_truth_problematic': False,
        'expected_profile': {
            'reliability': 0.85,
            'support': 0.83,
            'hallucination_risk': 0.13,
            'dsr': 0.05,
            'cvi': 0.8,
            'tcri_v3': 0.21,
        },
        'tags': ['environment', 'pollination', 'food_systems'],
    },
    {
        'id': 'VR-010',
        'category': 'valid_research_cases',
        'language': 'ar',
        'title': 'إجابة عربية منضبطة حول التقييم التكويني في التعليم',
        'question': 'ما المقصود بالتقييم التكويني في التعليم، ولماذا يُستخدم؟ اذكر مراجع.',
        'answer': 'يقصد بالتقييم التكويني مجموعة الممارسات الصفية التي تولد تغذية راجعة أثناء عملية التعلم بدل الاكتفاء بالحكم النهائي في نهايتها. ويُستخدم لأنه يساعد المعلم على تعديل التدريس مبكرًا، ويكشف مواطن الفهم الناقص، ويدعم الطالب في معرفة معايير الأداء الجيد قبل التقييم الختامي.',
        'citations': [
            'Black P, Wiliam D. Assessment and Classroom Learning. Assessment in Education. 1998.',
            'Heritage M. Formative Assessment: Making It Happen in the Classroom. Corwin Press. 2010.'
        ],
        'feature_values': [0.16, 0.17, 0.18, 0.16],
        'design_intent': 'حالة عربية سليمة نسبيًا بصياغة تربوية متوازنة مع مراجع منظمة وواضحة.',
        'ground_truth_band': 'Verify',
        'ground_truth_problematic': False,
        'expected_profile': {
            'reliability': 0.84,
            'support': 0.8,
            'hallucination_risk': 0.13,
            'dsr': 0.05,
            'cvi': 0.82,
            'tcri_v3': 0.2,
        },
        'tags': ['education', 'arabic_case', 'formative_assessment'],
    },
]


CATEGORY_ORDER = {
    'valid_research_cases': 0,
    'weak_citation_cases': 1,
    'overclaiming_cases': 2,
    'no_citation_cases': 3,
    'hallucination_cases': 4,
}


def dump_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def ensure_new_valid_cases() -> list[dict[str, Any]]:
    for case in NEW_VALID_CASES:
        path = VALID_DIR / f"{case['id'].lower()}.json"
        if not path.exists():
            dump_json(path, case)
    return NEW_VALID_CASES


def ensure_manifest_entries() -> dict[str, Any]:
    manifest = json.loads(MANIFEST_PATH.read_text(encoding='utf-8'))
    existing_ids = {entry['id'] for entry in manifest['cases']}
    for case in NEW_VALID_CASES:
        if case['id'] not in existing_ids:
            manifest['cases'].append(
                {
                    'id': case['id'],
                    'category': case['category'],
                    'language': case['language'],
                    'title': case['title'],
                    'ground_truth_band': case['ground_truth_band'],
                    'path': f"valid_research_cases/{case['id'].lower()}.json",
                }
            )
    manifest['cases'] = sorted(
        manifest['cases'],
        key=lambda entry: (CATEGORY_ORDER.get(entry['category'], 99), entry['id']),
    )
    manifest['case_count'] = len(manifest['cases'])
    dump_json(MANIFEST_PATH, manifest)
    return manifest


def load_valid_cases() -> list[dict[str, Any]]:
    cases: list[dict[str, Any]] = []
    for path in sorted(VALID_DIR.glob('vr-*.json')):
        cases.append(json.loads(path.read_text(encoding='utf-8')))
    return cases


def topic_phrase(case: dict[str, Any]) -> str:
    tags = case.get('tags') or []
    if tags:
        return str(tags[0]).replace('_', ' ')
    return case['title']


def weakened_citations(case: dict[str, Any]) -> list[str]:
    if case['language'] == 'ar':
        return ['دراسة عامة حول هذا الموضوع', 'تقرير مرجعي مختصر عن الموضوع']
    topic = topic_phrase(case)
    return [f'General study on {topic}', f'Background note on {topic}']


def fabricated_citations(case: dict[str, Any]) -> list[str]:
    topic = topic_phrase(case).title()
    return [
        f'Hartwell J, Moreno L. Definitive Advances in {topic}. Advanced Evidence Journal. 2026.',
        f'Nordin P, Vale S. Unified Results on {topic}. Global Research Proceedings. 2025.',
    ]


def exaggerated_answer(case: dict[str, Any]) -> str:
    base = case['answer'].strip()
    if case['language'] == 'ar':
        return (
            base
            + ' وهذا يثبت بشكل نهائي أن هذا التفسير صحيح دائمًا ويضمن نتائج مثالية، وقد تم حسمه علميًا بلا شك.'
        )
    return (
        base
        + ' This definitively proves the claim, always guarantees the outcome, and shows that the conclusion is perfectly established without doubt.'
    )


def build_variant(case: dict[str, Any], variant: str) -> dict[str, Any]:
    variant_case = copy.deepcopy(case)
    variant_case['id'] = f"{case['id']}-{variant.upper()}"
    variant_case['title'] = f"{case['title']} [{variant}]"
    variant_case['source_case_id'] = case['id']
    variant_case['experiment_variant'] = variant

    if variant == 'clean':
        variant_case['ground_truth_band'] = 'Verify'
        return variant_case

    if variant == 'weakened':
        variant_case['citations'] = weakened_citations(case)
        variant_case['ground_truth_band'] = 'Review Required'
        variant_case['design_intent'] = 'Evidence corruption variant with stripped citation metadata.'
        return variant_case

    if variant == 'fabricated':
        variant_case['citations'] = fabricated_citations(case)
        variant_case['ground_truth_band'] = 'High Risk'
        variant_case['design_intent'] = 'Evidence corruption variant with invented but polished-looking references.'
        return variant_case

    if variant == 'exaggerated':
        variant_case['answer'] = exaggerated_answer(case)
        variant_case['ground_truth_band'] = 'High Risk'
        variant_case['design_intent'] = 'Evidence corruption variant that keeps the base answer but injects absolute overclaiming.'
        return variant_case

    raise ValueError(f'Unsupported variant: {variant}')


def evaluate_variants(selected_cases: list[dict[str, Any]]) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    case_rows: list[dict[str, Any]] = []
    flat_results: list[dict[str, Any]] = []

    for case in selected_cases:
        variants: dict[str, dict[str, Any]] = {}
        for variant_name in ['clean', 'weakened', 'fabricated', 'exaggerated']:
            variant_case = build_variant(case, variant_name)
            export_path = CASE_EXPORT_DIR / f"{case['id'].lower()}_{variant_name}.json"
            dump_json(export_path, variant_case)
            variants[variant_name] = evaluate_case(variant_case)
            flat_results.append(
                {
                    'base_case_id': case['id'],
                    'variant': variant_name,
                    'title': case['title'],
                    'language': case['language'],
                    'risk_score': variants[variant_name]['metrics']['tcri_v3'],
                    'benchmark_band': variants[variant_name]['benchmark_target_decision'],
                    'prototype_decision': variants[variant_name]['prototype_decision'],
                    'cvi': variants[variant_name]['metrics']['cvi'],
                    'support': variants[variant_name]['metrics']['support'],
                    'hallucination_risk': variants[variant_name]['metrics']['hallucination_risk'],
                }
            )

        clean_score = variants['clean']['metrics']['tcri_v3']
        weakened_score = variants['weakened']['metrics']['tcri_v3']
        fabricated_score = variants['fabricated']['metrics']['tcri_v3']
        exaggerated_score = variants['exaggerated']['metrics']['tcri_v3']

        clean_weakened_fabricated_monotonic = clean_score < weakened_score < fabricated_score
        exaggeration_increases_risk = exaggerated_score > clean_score
        full_success = clean_weakened_fabricated_monotonic and exaggeration_increases_risk

        case_rows.append(
            {
                'case_id': case['id'],
                'title': case['title'],
                'language': case['language'],
                'clean_score': clean_score,
                'weakened_score': weakened_score,
                'fabricated_score': fabricated_score,
                'exaggerated_score': exaggerated_score,
                'clean_band': variants['clean']['benchmark_target_decision'],
                'weakened_band': variants['weakened']['benchmark_target_decision'],
                'fabricated_band': variants['fabricated']['benchmark_target_decision'],
                'exaggerated_band': variants['exaggerated']['benchmark_target_decision'],
                'clean_cvi': variants['clean']['metrics']['cvi'],
                'weakened_cvi': variants['weakened']['metrics']['cvi'],
                'fabricated_cvi': variants['fabricated']['metrics']['cvi'],
                'exaggerated_cvi': variants['exaggerated']['metrics']['cvi'],
                'monotonic_chain_success': clean_weakened_fabricated_monotonic,
                'exaggeration_increase_success': exaggeration_increases_risk,
                'full_success': full_success,
            }
        )

    return case_rows, flat_results


def summarize(case_rows: list[dict[str, Any]]) -> dict[str, Any]:
    monotonic_count = sum(1 for row in case_rows if row['monotonic_chain_success'])
    exaggeration_count = sum(1 for row in case_rows if row['exaggeration_increase_success'])
    full_success_count = sum(1 for row in case_rows if row['full_success'])

    return {
        'selected_case_count': len(case_rows),
        'variant_count': len(case_rows) * 4,
        'monotonic_clean_weakened_fabricated_count': monotonic_count,
        'monotonic_clean_weakened_fabricated_rate': round(monotonic_count / len(case_rows), 3) if case_rows else 0.0,
        'exaggeration_increase_count': exaggeration_count,
        'exaggeration_increase_rate': round(exaggeration_count / len(case_rows), 3) if case_rows else 0.0,
        'full_success_count': full_success_count,
        'full_success_rate': round(full_success_count / len(case_rows), 3) if case_rows else 0.0,
    }


def write_csv(path: Path, rows: list[dict[str, Any]]) -> None:
    if not rows:
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('w', encoding='utf-8', newline='') as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)


def markdown_report(summary: dict[str, Any], case_rows: list[dict[str, Any]]) -> str:
    lines: list[str] = []
    lines.append('# Experiment 1 — Evidence Corruption Perturbation Study\n')
    lines.append(
        'تهدف هذه التجربة إلى اختبار سؤال بحثي واحد: **هل ترتفع درجة المخاطر في TRUST-LAB بشكل منطقي عندما تُفسد طبقة الأدلة؟** استخدمت التجربة عشر حالات clean من `valid_research_cases`، ثم أُنشئت لكل حالة ثلاث نسخ مفسدة: `weakened citation` و`fabricated citation` و`claim exaggeration`.\n'
    )
    lines.append('| المؤشر | القيمة |')
    lines.append('|---|---|')
    lines.append(f"| عدد الحالات النظيفة المختارة | {summary['selected_case_count']} |")
    lines.append(f"| عدد النسخ المقيمة | {summary['variant_count']} |")
    lines.append(f"| نجاح الترتيب clean < weakened < fabricated | {summary['monotonic_clean_weakened_fabricated_count']} / {summary['selected_case_count']} |")
    lines.append(f"| نجاح زيادة الخطر في exaggerated مقارنة بـ clean | {summary['exaggeration_increase_count']} / {summary['selected_case_count']} |")
    lines.append(f"| النجاح الكامل للحالتين معًا | {summary['full_success_count']} / {summary['selected_case_count']} |\n")
    lines.append('## Detailed Results\n')
    lines.append('| Case | Clean | Weakened | Fabricated | Exaggerated | Chain | Exaggeration | Overall |')
    lines.append('|---|---|---|---|---|---|---|---|')
    for row in case_rows:
        clean_text = f"{row['clean_score']:.3f} ({row['clean_band']})"
        weakened_text = f"{row['weakened_score']:.3f} ({row['weakened_band']})"
        fabricated_text = f"{row['fabricated_score']:.3f} ({row['fabricated_band']})"
        exaggerated_text = f"{row['exaggerated_score']:.3f} ({row['exaggerated_band']})"
        lines.append(
            f"| {row['case_id']} | {clean_text} | {weakened_text} | {fabricated_text} | {exaggerated_text} | "
            f"{'Pass' if row['monotonic_chain_success'] else 'Fail'} | {'Pass' if row['exaggeration_increase_success'] else 'Fail'} | {'Pass' if row['full_success'] else 'Fail'} |"
        )
    lines.append('')
    lines.append(
        'تُقرأ النتيجة الأساسية هنا على أنها **اختبار عقلانية تحت إفساد الأدلة**. إذا فشل الترتيب في بعض الحالات، فهذا لا يُعد فشلًا للتجربة نفسها، بل إشارة مباشرة إلى حدود الصياغة الحالية لـ CVI/TCRI، خاصة إذا بدت الاستشهادات الملفقة منظمة شكليًا بما يكفي لعبور فلاتر البنية المرجعية.\n'
    )
    return '\n'.join(lines)


def main() -> None:
    ensure_new_valid_cases()
    ensure_manifest_entries()
    valid_cases = load_valid_cases()
    selected_cases = valid_cases[:10]

    if len(selected_cases) < 10:
        raise RuntimeError('The clean set still contains fewer than 10 valid cases.')

    selection_payload = {
        'experiment': 'evidence_corruption_v1',
        'selection_rule': 'first 10 cases from valid_research_cases after expanding the clean set to 10 cases',
        'selected_case_ids': [case['id'] for case in selected_cases],
    }
    dump_json(EXPERIMENT_DIR / 'selection.json', selection_payload)

    case_rows, flat_results = evaluate_variants(selected_cases)
    summary = summarize(case_rows)

    report = {
        'experiment_name': 'Experiment 1 — Evidence Corruption Perturbation Study',
        'question': 'Does trust-risk increase logically when the evidence layer is corrupted?',
        'summary': summary,
        'selected_cases': [case['id'] for case in selected_cases],
        'case_results': case_rows,
        'flat_results': flat_results,
    }

    dump_json(EXPERIMENT_DIR / 'report.json', report)
    write_csv(EXPERIMENT_DIR / 'case_results.csv', case_rows)
    write_csv(EXPERIMENT_DIR / 'flat_variant_results.csv', flat_results)
    (EXPERIMENT_DIR / 'report.md').write_text(markdown_report(summary, case_rows), encoding='utf-8')
    print(EXPERIMENT_DIR / 'report.json')


if __name__ == '__main__':
    main()
