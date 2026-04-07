from __future__ import annotations

import copy
import csv
import json
import sys
from pathlib import Path
from typing import Any

BENCH_ROOT = Path('/home/ubuntu/trust-lab-tcri/benchmarks/trust_bench_v1')
VALID_DIR = BENCH_ROOT / 'valid_research_cases'
EXPERIMENT_DIR = BENCH_ROOT / 'experiments' / 'semantic_mismatch_v1'
CASE_EXPORT_DIR = EXPERIMENT_DIR / 'cases'

sys.path.insert(0, str(Path(__file__).resolve().parent))
from evaluate_trust_bench_v1 import evaluate_case  # noqa: E402


def dump_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def load_valid_cases() -> list[dict[str, Any]]:
    return [json.loads(path.read_text(encoding='utf-8')) for path in sorted(VALID_DIR.glob('vr-*.json'))]


def infer_domain(case: dict[str, Any]) -> str:
    joined = ' '.join(case.get('tags') or []) + ' ' + case['title'] + ' ' + case['question']
    lowered = joined.lower()
    if any(marker in lowered for marker in ['machine', 'learning', 'privacy', 'algorithm', 'normalization', 'differential']):
        return 'ml'
    if any(marker in lowered for marker in ['health', 'medical', 'antibiotic', 'antimicrobial', 'clinical', 'مقاومة', 'الصحية']):
        return 'health'
    if any(marker in lowered for marker in ['climate', 'pollinator', 'ecosystem', 'urban heat', 'food systems']):
        return 'climate'
    if any(marker in lowered for marker in ['cybersecurity', 'zero-trust', 'zero trust', 'identity', 'network']):
        return 'cybersecurity'
    if any(marker in lowered for marker in ['education', 'assessment', 'teaching', 'classroom', 'التقييم', 'التعليم']):
        return 'education'
    return 'other'


def choose_mismatch_source(base_case: dict[str, Any], pool: list[dict[str, Any]]) -> dict[str, Any]:
    base_domain = infer_domain(base_case)
    candidates = [case for case in pool if case['id'] != base_case['id'] and infer_domain(case) != base_domain]
    if not candidates:
        raise RuntimeError(f'No semantic mismatch candidate found for {base_case["id"]}')
    candidates.sort(key=lambda case: (infer_domain(case), case['id']))
    return candidates[0]


def build_variant(base_case: dict[str, Any], mismatch_source: dict[str, Any], variant: str) -> dict[str, Any]:
    payload = copy.deepcopy(base_case)
    payload['source_case_id'] = base_case['id']
    payload['experiment_variant'] = variant
    payload['mismatch_source_case_id'] = mismatch_source['id']

    if variant == 'clean':
        payload['id'] = f"{base_case['id']}-CLEAN"
        payload['title'] = f"{base_case['title']} [clean]"
        payload['ground_truth_band'] = 'Verify'
        payload['design_intent'] = 'Original clean answer with aligned citations.'
        return payload

    if variant == 'semantic_mismatch':
        payload['id'] = f"{base_case['id']}-SEMANTIC-MISMATCH"
        payload['title'] = f"{base_case['title']} [semantic_mismatch]"
        payload['citations'] = mismatch_source['citations']
        payload['ground_truth_band'] = 'High Risk'
        payload['design_intent'] = (
            'Answer remains unchanged, but citations are replaced with real references '
            'from a semantically different domain to test citation-answer coherence.'
        )
        return payload

    raise ValueError(f'Unsupported variant: {variant}')


def write_csv(path: Path, rows: list[dict[str, Any]]) -> None:
    if not rows:
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('w', encoding='utf-8', newline='') as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)


def evaluate_variants(selected_cases: list[dict[str, Any]], all_cases: list[dict[str, Any]]) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    case_rows: list[dict[str, Any]] = []
    flat_rows: list[dict[str, Any]] = []

    for base_case in selected_cases:
        mismatch_source = choose_mismatch_source(base_case, all_cases)
        variants: dict[str, dict[str, Any]] = {}

        for variant_name in ['clean', 'semantic_mismatch']:
            variant_case = build_variant(base_case, mismatch_source, variant_name)
            export_path = CASE_EXPORT_DIR / f"{base_case['id'].lower()}_{variant_name}.json"
            dump_json(export_path, variant_case)
            evaluation = evaluate_case(variant_case)
            variants[variant_name] = evaluation
            flat_rows.append(
                {
                    'base_case_id': base_case['id'],
                    'variant': variant_name,
                    'language': base_case['language'],
                    'title': base_case['title'],
                    'base_domain': infer_domain(base_case),
                    'mismatch_source_case_id': mismatch_source['id'],
                    'mismatch_source_domain': infer_domain(mismatch_source),
                    'risk_score': evaluation['metrics']['tcri_v3'],
                    'benchmark_band': evaluation['benchmark_target_decision'],
                    'prototype_decision': evaluation['prototype_decision'],
                    'cvi': evaluation['metrics']['cvi'],
                    'support': evaluation['metrics']['support'],
                    'hallucination_risk': evaluation['metrics']['hallucination_risk'],
                    'verified_citations': evaluation['citation_summary']['verified_citations'],
                    'total_citations': evaluation['citation_summary']['total_citations'],
                }
            )

        clean_eval = variants['clean']
        mismatch_eval = variants['semantic_mismatch']
        clean_score = clean_eval['metrics']['tcri_v3']
        mismatch_score = mismatch_eval['metrics']['tcri_v3']
        clean_cvi = clean_eval['metrics']['cvi']
        mismatch_cvi = mismatch_eval['metrics']['cvi']
        risk_increase = mismatch_score > clean_score
        cvi_drop = mismatch_cvi < clean_cvi

        case_rows.append(
            {
                'case_id': base_case['id'],
                'title': base_case['title'],
                'language': base_case['language'],
                'base_domain': infer_domain(base_case),
                'mismatch_source_case_id': mismatch_source['id'],
                'mismatch_source_domain': infer_domain(mismatch_source),
                'clean_score': clean_score,
                'semantic_mismatch_score': mismatch_score,
                'score_delta': round(mismatch_score - clean_score, 3),
                'clean_band': clean_eval['benchmark_target_decision'],
                'semantic_mismatch_band': mismatch_eval['benchmark_target_decision'],
                'clean_cvi': clean_cvi,
                'semantic_mismatch_cvi': mismatch_cvi,
                'cvi_delta': round(mismatch_cvi - clean_cvi, 3),
                'risk_increase_success': risk_increase,
                'cvi_drop_success': cvi_drop,
                'overall_success': risk_increase and cvi_drop,
            }
        )

    return case_rows, flat_rows


def summarize(case_rows: list[dict[str, Any]]) -> dict[str, Any]:
    count = len(case_rows)
    risk_increase_count = sum(1 for row in case_rows if row['risk_increase_success'])
    cvi_drop_count = sum(1 for row in case_rows if row['cvi_drop_success'])
    overall_count = sum(1 for row in case_rows if row['overall_success'])
    avg_score_delta = round(sum(row['score_delta'] for row in case_rows) / count, 3) if count else 0.0
    avg_cvi_delta = round(sum(row['cvi_delta'] for row in case_rows) / count, 3) if count else 0.0

    return {
        'selected_case_count': count,
        'variant_count': count * 2,
        'risk_increase_count': risk_increase_count,
        'risk_increase_rate': round(risk_increase_count / count, 3) if count else 0.0,
        'cvi_drop_count': cvi_drop_count,
        'cvi_drop_rate': round(cvi_drop_count / count, 3) if count else 0.0,
        'overall_success_count': overall_count,
        'overall_success_rate': round(overall_count / count, 3) if count else 0.0,
        'average_score_delta': avg_score_delta,
        'average_cvi_delta': avg_cvi_delta,
    }


def markdown_report(summary: dict[str, Any], case_rows: list[dict[str, Any]]) -> str:
    lines: list[str] = []
    lines.append('# Experiment 2 — Semantic Citation Mismatch Study\n')
    lines.append(
        'تختبر هذه التجربة سؤالًا أكثر تحديدًا من Experiment 1: **هل ترتفع المخاطر عندما تبقى الإجابة نفسها لكن تُستبدل الاستشهادات بمراجع حقيقية من مجال مختلف دلاليًا؟** هنا لا نستخدم مراجع ملفقة، بل مراجع حقيقية ولكنها غير متسقة مع موضوع الجواب.\n'
    )
    lines.append(
        '> **Research claim:** If TRUST-LAB is sensitive to citation-answer coherence, then semantically mismatched real citations should lower CVI and increase risk even when the citation structure still looks legitimate.\n'
    )
    lines.append('| المؤشر | القيمة |')
    lines.append('|---|---|')
    lines.append(f"| عدد الحالات | {summary['selected_case_count']} |")
    lines.append(f"| عدد النسخ المقيمة | {summary['variant_count']} |")
    lines.append(f"| ارتفاع المخاطر في semantic mismatch | {summary['risk_increase_count']} / {summary['selected_case_count']} |")
    lines.append(f"| انخفاض CVI في semantic mismatch | {summary['cvi_drop_count']} / {summary['selected_case_count']} |")
    lines.append(f"| النجاح الكلي (Risk↑ و CVI↓) | {summary['overall_success_count']} / {summary['selected_case_count']} |")
    lines.append(f"| متوسط فرق المخاطر | {summary['average_score_delta']} |")
    lines.append(f"| متوسط فرق CVI | {summary['average_cvi_delta']} |\n")
    lines.append('## Detailed Results\n')
    lines.append('| Case | Base Domain | Mismatch Source | Clean | Semantic Mismatch | Δ Risk | Δ CVI | Result |')
    lines.append('|---|---|---|---|---|---|---|---|')
    for row in case_rows:
        clean_text = f"{row['clean_score']:.3f} ({row['clean_band']})"
        mismatch_text = f"{row['semantic_mismatch_score']:.3f} ({row['semantic_mismatch_band']})"
        lines.append(
            f"| {row['case_id']} | {row['base_domain']} | {row['mismatch_source_case_id']} → {row['mismatch_source_domain']} | "
            f"{clean_text} | {mismatch_text} | {row['score_delta']:+.3f} | {row['cvi_delta']:+.3f} | "
            f"{'Pass' if row['overall_success'] else 'Fail'} |"
        )
    lines.append('')
    lines.append(
        'إذا نجحت هذه التجربة، فسيكون لدينا دليل أوضح على أن ترقية CVI لم تعد تكتفي بالتقاط **شكل المرجع**، بل بدأت تلتقط **اتساق المرجع مع موضوع الإجابة نفسه**. وإذا بقي الأداء ضعيفًا، فذلك يعني أن semantic mismatch layer ما زالت بحاجة إلى خصائص أقوى مثل فحص عنوان المرجع، منطقية الوعاء، أو التوافق بين مصطلحات السؤال والمرجع.\n'
    )
    return '\n'.join(lines)


def main() -> None:
    all_cases = load_valid_cases()
    selected_cases = all_cases[:10]
    if len(selected_cases) < 10:
        raise RuntimeError('Semantic mismatch experiment requires at least 10 valid cases.')

    selection_payload = {
        'experiment': 'semantic_mismatch_v1',
        'selection_rule': 'first 10 cases from valid_research_cases',
        'selected_case_ids': [case['id'] for case in selected_cases],
    }
    dump_json(EXPERIMENT_DIR / 'selection.json', selection_payload)

    case_rows, flat_rows = evaluate_variants(selected_cases, all_cases)
    summary = summarize(case_rows)
    report = {
        'experiment_name': 'Experiment 2 — Semantic Citation Mismatch Study',
        'question': 'Does trust-risk increase when real citations are semantically mismatched with the answer domain?',
        'summary': summary,
        'selected_cases': [case['id'] for case in selected_cases],
        'case_results': case_rows,
        'flat_results': flat_rows,
    }

    dump_json(EXPERIMENT_DIR / 'report.json', report)
    write_csv(EXPERIMENT_DIR / 'case_results.csv', case_rows)
    write_csv(EXPERIMENT_DIR / 'flat_variant_results.csv', flat_rows)
    (EXPERIMENT_DIR / 'report.md').write_text(markdown_report(summary, case_rows), encoding='utf-8')
    print(EXPERIMENT_DIR / 'report.json')


if __name__ == '__main__':
    main()
