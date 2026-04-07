from __future__ import annotations

import csv
import json
from pathlib import Path
from typing import Any

from evaluate_trust_bench_v1 import evaluate_case
from run_evidence_corruption_experiment import (
    build_variant as build_evidence_variant,
    dump_json,
    ensure_manifest_entries,
    ensure_new_valid_cases,
    load_valid_cases,
)
from run_semantic_mismatch_experiment import (
    build_variant as build_mismatch_variant,
    choose_mismatch_source,
    infer_domain,
)

EXPERIMENT_NAME = 'Experiment 3 — Counterfactual Trust Consistency'
EXPERIMENT_SLUG = 'counterfactual_consistency_v1'
EXPERIMENT_DIR = Path(__file__).parent / 'trust_bench_v1' / 'experiments' / EXPERIMENT_SLUG
CASE_EXPORT_DIR = EXPERIMENT_DIR / 'generated_cases'
VARIANT_ORDER = ['clean', 'weakened', 'fabricated', 'exaggerated', 'semantic_mismatch']


def write_csv(path: Path, rows: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if not rows:
        path.write_text('', encoding='utf-8')
        return
    with path.open('w', encoding='utf-8', newline='') as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)


def score_of(evaluation: dict[str, Any]) -> float:
    return float(evaluation['metrics']['tcri_v3'])



def cvi_of(evaluation: dict[str, Any]) -> float:
    return float(evaluation['metrics']['cvi'])



def band_of(evaluation: dict[str, Any]) -> str:
    return str(evaluation['benchmark_target_decision'])



def build_all_variants(base_case: dict[str, Any], all_cases: list[dict[str, Any]]) -> tuple[dict[str, dict[str, Any]], dict[str, Any]]:
    mismatch_source = choose_mismatch_source(base_case, all_cases)
    variant_cases = {
        'clean': build_evidence_variant(base_case, 'clean'),
        'weakened': build_evidence_variant(base_case, 'weakened'),
        'fabricated': build_evidence_variant(base_case, 'fabricated'),
        'exaggerated': build_evidence_variant(base_case, 'exaggerated'),
        'semantic_mismatch': build_mismatch_variant(base_case, mismatch_source, 'semantic_mismatch'),
    }
    return variant_cases, mismatch_source



def evaluate_variants(selected_cases: list[dict[str, Any]], all_cases: list[dict[str, Any]]) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    case_rows: list[dict[str, Any]] = []
    flat_rows: list[dict[str, Any]] = []

    for base_case in selected_cases:
        variant_cases, mismatch_source = build_all_variants(base_case, all_cases)
        evaluations: dict[str, dict[str, Any]] = {}

        for variant_name in VARIANT_ORDER:
            variant_case = variant_cases[variant_name]
            export_path = CASE_EXPORT_DIR / f"{base_case['id'].lower()}_{variant_name}.json"
            dump_json(export_path, variant_case)
            evaluation = evaluate_case(variant_case)
            evaluations[variant_name] = evaluation
            flat_rows.append(
                {
                    'case_id': base_case['id'],
                    'title': base_case['title'],
                    'language': base_case['language'],
                    'variant': variant_name,
                    'base_domain': infer_domain(base_case),
                    'mismatch_source_case_id': mismatch_source['id'],
                    'mismatch_source_domain': infer_domain(mismatch_source),
                    'prototype_decision': evaluation['prototype_decision'],
                    'benchmark_band': band_of(evaluation),
                    'tcri_v3': score_of(evaluation),
                    'cvi': cvi_of(evaluation),
                    'support': evaluation['metrics']['support'],
                    'hallucination_risk': evaluation['metrics']['hallucination_risk'],
                    'verified_citations': evaluation['citation_summary']['verified_citations'],
                    'total_citations': evaluation['citation_summary']['total_citations'],
                }
            )

        clean_score = score_of(evaluations['clean'])
        weakened_score = score_of(evaluations['weakened'])
        fabricated_score = score_of(evaluations['fabricated'])
        exaggerated_score = score_of(evaluations['exaggerated'])
        mismatch_score = score_of(evaluations['semantic_mismatch'])

        constraint_clean_weakened = clean_score < weakened_score
        constraint_weakened_fabricated = weakened_score < fabricated_score
        constraint_clean_fabricated = clean_score < fabricated_score
        constraint_clean_exaggerated = clean_score < exaggerated_score
        constraint_clean_mismatch = clean_score < mismatch_score
        core_order_success = constraint_clean_weakened and constraint_weakened_fabricated
        overall_success = (
            core_order_success
            and constraint_clean_fabricated
            and constraint_clean_exaggerated
            and constraint_clean_mismatch
        )

        violated_constraints: list[str] = []
        if not constraint_clean_weakened:
            violated_constraints.append('clean<weakened')
        if not constraint_weakened_fabricated:
            violated_constraints.append('weakened<fabricated')
        if not constraint_clean_fabricated:
            violated_constraints.append('clean<fabricated')
        if not constraint_clean_exaggerated:
            violated_constraints.append('clean<exaggerated')
        if not constraint_clean_mismatch:
            violated_constraints.append('clean<semantic_mismatch')

        case_rows.append(
            {
                'case_id': base_case['id'],
                'title': base_case['title'],
                'language': base_case['language'],
                'base_domain': infer_domain(base_case),
                'mismatch_source_case_id': mismatch_source['id'],
                'mismatch_source_domain': infer_domain(mismatch_source),
                'clean_score': clean_score,
                'weakened_score': weakened_score,
                'fabricated_score': fabricated_score,
                'exaggerated_score': exaggerated_score,
                'semantic_mismatch_score': mismatch_score,
                'clean_band': band_of(evaluations['clean']),
                'weakened_band': band_of(evaluations['weakened']),
                'fabricated_band': band_of(evaluations['fabricated']),
                'exaggerated_band': band_of(evaluations['exaggerated']),
                'semantic_mismatch_band': band_of(evaluations['semantic_mismatch']),
                'clean_cvi': cvi_of(evaluations['clean']),
                'weakened_cvi': cvi_of(evaluations['weakened']),
                'fabricated_cvi': cvi_of(evaluations['fabricated']),
                'exaggerated_cvi': cvi_of(evaluations['exaggerated']),
                'semantic_mismatch_cvi': cvi_of(evaluations['semantic_mismatch']),
                'constraint_clean_weakened': constraint_clean_weakened,
                'constraint_weakened_fabricated': constraint_weakened_fabricated,
                'constraint_clean_fabricated': constraint_clean_fabricated,
                'constraint_clean_exaggerated': constraint_clean_exaggerated,
                'constraint_clean_mismatch': constraint_clean_mismatch,
                'core_order_success': core_order_success,
                'overall_success': overall_success,
                'violation_count': len(violated_constraints),
                'violated_constraints': '; '.join(violated_constraints) if violated_constraints else 'none',
            }
        )

    return case_rows, flat_rows



def summarize(case_rows: list[dict[str, Any]]) -> dict[str, Any]:
    count = len(case_rows)
    if not count:
        return {
            'selected_case_count': 0,
            'variant_count': 0,
            'constraint_counts': {},
            'constraint_rates': {},
            'core_order_success_count': 0,
            'core_order_success_rate': 0.0,
            'overall_success_count': 0,
            'overall_success_rate': 0.0,
            'average_clean_to_weakened_delta': 0.0,
            'average_weakened_to_fabricated_delta': 0.0,
            'average_clean_to_exaggerated_delta': 0.0,
            'average_clean_to_mismatch_delta': 0.0,
            'violation_profile': {},
        }

    constraint_names = [
        'constraint_clean_weakened',
        'constraint_weakened_fabricated',
        'constraint_clean_fabricated',
        'constraint_clean_exaggerated',
        'constraint_clean_mismatch',
    ]
    constraint_counts = {
        name: sum(1 for row in case_rows if row[name]) for name in constraint_names
    }
    constraint_rates = {
        name: round(value / count, 3) for name, value in constraint_counts.items()
    }
    violation_profile = {
        'clean<weakened': sum(1 for row in case_rows if not row['constraint_clean_weakened']),
        'weakened<fabricated': sum(1 for row in case_rows if not row['constraint_weakened_fabricated']),
        'clean<fabricated': sum(1 for row in case_rows if not row['constraint_clean_fabricated']),
        'clean<exaggerated': sum(1 for row in case_rows if not row['constraint_clean_exaggerated']),
        'clean<semantic_mismatch': sum(1 for row in case_rows if not row['constraint_clean_mismatch']),
    }
    return {
        'selected_case_count': count,
        'variant_count': count * len(VARIANT_ORDER),
        'constraint_counts': constraint_counts,
        'constraint_rates': constraint_rates,
        'core_order_success_count': sum(1 for row in case_rows if row['core_order_success']),
        'core_order_success_rate': round(sum(1 for row in case_rows if row['core_order_success']) / count, 3),
        'overall_success_count': sum(1 for row in case_rows if row['overall_success']),
        'overall_success_rate': round(sum(1 for row in case_rows if row['overall_success']) / count, 3),
        'average_clean_to_weakened_delta': round(sum(row['weakened_score'] - row['clean_score'] for row in case_rows) / count, 3),
        'average_weakened_to_fabricated_delta': round(sum(row['fabricated_score'] - row['weakened_score'] for row in case_rows) / count, 3),
        'average_clean_to_exaggerated_delta': round(sum(row['exaggerated_score'] - row['clean_score'] for row in case_rows) / count, 3),
        'average_clean_to_mismatch_delta': round(sum(row['semantic_mismatch_score'] - row['clean_score'] for row in case_rows) / count, 3),
        'violation_profile': violation_profile,
    }



def markdown_report(summary: dict[str, Any], case_rows: list[dict[str, Any]]) -> str:
    lines: list[str] = []
    lines.append('# Experiment 3 — Counterfactual Trust Consistency\n')
    lines.append(
        'تنتقل هذه التجربة من مجرد قياس الدرجة إلى **اختبار مبدأ**: هل يحافظ TRUST-LAB على ترتيب منطقي للمخاطر عندما نفسد الأدلة تدريجيًا على نفس الحالة؟ الفكرة هنا ليست إضافة metric جديدة، بل اختبار ما إذا كان النظام يتصرف كأنه يملك **نظرية اتساق للثقة** تحت perturbations مضبوطة.\n'
    )
    lines.append(
        '> **Originality claim:** TRUST-LAB introduces a counterfactual trust-consistency evaluation framework that measures whether trust-risk degrades rationally under controlled evidence perturbations.\n'
    )
    lines.append('| المؤشر | القيمة |')
    lines.append('|---|---|')
    lines.append(f"| عدد الحالات | {summary['selected_case_count']} |")
    lines.append(f"| عدد النسخ المقيمة | {summary['variant_count']} |")
    lines.append(f"| نجاح الترتيب الأساسي clean < weakened < fabricated | {summary['core_order_success_count']} / {summary['selected_case_count']} |")
    lines.append(f"| النجاح الكلي لكل القيود | {summary['overall_success_count']} / {summary['selected_case_count']} |")
    lines.append(f"| clean < weakened | {summary['constraint_counts']['constraint_clean_weakened']} / {summary['selected_case_count']} |")
    lines.append(f"| weakened < fabricated | {summary['constraint_counts']['constraint_weakened_fabricated']} / {summary['selected_case_count']} |")
    lines.append(f"| clean < fabricated | {summary['constraint_counts']['constraint_clean_fabricated']} / {summary['selected_case_count']} |")
    lines.append(f"| clean < exaggerated | {summary['constraint_counts']['constraint_clean_exaggerated']} / {summary['selected_case_count']} |")
    lines.append(f"| clean < semantic mismatch | {summary['constraint_counts']['constraint_clean_mismatch']} / {summary['selected_case_count']} |")
    lines.append(f"| متوسط Δ(clean→weakened) | {summary['average_clean_to_weakened_delta']} |")
    lines.append(f"| متوسط Δ(weakened→fabricated) | {summary['average_weakened_to_fabricated_delta']} |")
    lines.append(f"| متوسط Δ(clean→exaggerated) | {summary['average_clean_to_exaggerated_delta']} |")
    lines.append(f"| متوسط Δ(clean→semantic mismatch) | {summary['average_clean_to_mismatch_delta']} |\n")

    lines.append('## Violation Profile\n')
    lines.append('| القيد | عدد الانتهاكات |')
    lines.append('|---|---|')
    for relation, failures in summary['violation_profile'].items():
        lines.append(f'| {relation} | {failures} |')

    lines.append('\n## Detailed Case Results\n')
    lines.append('| Case | Domain | Clean | Weakened | Fabricated | Exaggerated | Semantic Mismatch | Violations | Result |')
    lines.append('|---|---|---|---|---|---|---|---|---|')
    for row in case_rows:
        lines.append(
            f"| {row['case_id']} | {row['base_domain']} | "
            f"{row['clean_score']:.3f} ({row['clean_band']}) | "
            f"{row['weakened_score']:.3f} ({row['weakened_band']}) | "
            f"{row['fabricated_score']:.3f} ({row['fabricated_band']}) | "
            f"{row['exaggerated_score']:.3f} ({row['exaggerated_band']}) | "
            f"{row['semantic_mismatch_score']:.3f} ({row['semantic_mismatch_band']}) | "
            f"{row['violated_constraints']} | {'Pass' if row['overall_success'] else 'Fail'} |"
        )

    lines.append('')
    lines.append(
        'إذا ارتفع معدل الاتساق، فسيصبح لدينا ادعاء أقوى من مجرد أن TRUST-LAB يلتقط إشارات سطحية: سيكون لدينا دليل على أنه يحافظ على **ترتيب سببي/مضاد للواقع** عندما تتدهور الأدلة تدريجيًا. وإذا ظهرت انتهاكات متكررة، فهذه ليست مشكلة تجميلية، بل **خريطة ضعف نظرية** توضّح أي transitions ما زالت غير مستقرة، مثل الانتقال من weakened إلى fabricated أو من clean إلى semantic mismatch.\n'
    )
    return '\n'.join(lines)



def main() -> None:
    ensure_new_valid_cases()
    ensure_manifest_entries()
    all_cases = load_valid_cases()
    selected_cases = all_cases[:10]
    if len(selected_cases) < 10:
        raise RuntimeError('Counterfactual consistency experiment requires at least 10 valid cases.')

    selection_payload = {
        'experiment': EXPERIMENT_SLUG,
        'selection_rule': 'first 10 cases from valid_research_cases',
        'selected_case_ids': [case['id'] for case in selected_cases],
        'variants': VARIANT_ORDER,
        'constraints': [
            'clean < weakened',
            'weakened < fabricated',
            'clean < fabricated',
            'clean < exaggerated',
            'clean < semantic_mismatch',
        ],
    }
    dump_json(EXPERIMENT_DIR / 'selection.json', selection_payload)

    case_rows, flat_rows = evaluate_variants(selected_cases, all_cases)
    summary = summarize(case_rows)
    report = {
        'experiment_name': EXPERIMENT_NAME,
        'question': 'Does TRUST-LAB preserve rational trust-risk ordering across counterfactual evidence perturbations?',
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
