#!/usr/bin/env python3
"""TRUST-LAB benchmark ablation utilities.

This script evaluates how the composite score changes when key TRUST-LAB layers
are removed or simplified. The goal is to show that the project's originality
lies not only in its parts, but in the interaction between those parts.
"""

from __future__ import annotations

import json
import math
from pathlib import Path
from statistics import mean
from typing import Any

ROOT = Path(__file__).resolve().parent
BENCHMARK_PATH = ROOT / "trust_bench_v1.json"

BAND_THRESHOLDS = (
    (0.30, "Safe"),
    (0.60, "Verify"),
    (0.85, "High Risk"),
    (1.01, "Critical"),
)


def clamp(value: float, low: float = 0.0, high: float = 1.0) -> float:
    return max(low, min(high, value))


def band_from_score(score: float) -> str:
    for threshold, label in BAND_THRESHOLDS:
        if score < threshold:
            return label
    return "Critical"


def load_cases(path: Path = BENCHMARK_PATH) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def tcri_formula(
    reliability: float,
    support: float,
    hallucination_risk: float,
    dsr: float,
    cvi: float,
    *,
    lambda_dsr: float = 0.8,
    gamma_cvi: float = 1.2,
) -> float:
    raw = reliability * (1 - support) * (1 + hallucination_risk) * (1 + lambda_dsr * dsr) * (1 + gamma_cvi * (1 - cvi))
    normalized = 1 - math.exp(-raw * 1.1)
    return round(clamp(normalized), 3)


def ablate_case(case: dict[str, Any]) -> dict[str, Any]:
    profile = case["expected_profile"]
    reliability = profile["reliability"]
    support = profile["support"]
    hallucination_risk = profile["hallucination_risk"]
    dsr = profile["dsr"]
    cvi = profile["cvi"]

    variants = {
        "tcri_only": tcri_formula(reliability, support, 0.0, 0.0, 1.0),
        "without_cvi": tcri_formula(reliability, support, hallucination_risk, dsr, 1.0),
        "without_dsr": tcri_formula(reliability, support, hallucination_risk, 0.0, cvi),
        "without_hallucination": tcri_formula(reliability, support, 0.0, dsr, cvi),
        "full_system": profile["tcri_v3"],
    }

    return {
        "case_id": case["id"],
        "category": case["category"],
        "ground_truth_band": case["ground_truth_band"],
        "variants": variants,
        "predicted_bands": {name: band_from_score(score) for name, score in variants.items()},
    }


def summarize(results: list[dict[str, Any]]) -> dict[str, Any]:
    variant_names = list(results[0]["variants"].keys()) if results else []

    average_scores = {
        name: round(mean(result["variants"][name] for result in results), 3)
        for name in variant_names
    }

    band_accuracy = {
        name: round(
            sum(
                1
                for result in results
                if result["predicted_bands"][name] == result["ground_truth_band"]
            )
            / len(results),
            3,
        )
        for name in variant_names
    }

    categories = sorted({result["category"] for result in results})
    category_average_scores: dict[str, dict[str, float]] = {}

    for category in categories:
        subset = [result for result in results if result["category"] == category]
        category_average_scores[category] = {
            name: round(mean(item["variants"][name] for item in subset), 3)
            for name in variant_names
        }

    return {
        "case_count": len(results),
        "average_scores": average_scores,
        "band_accuracy": band_accuracy,
        "category_average_scores": category_average_scores,
    }


def main() -> None:
    benchmark = load_cases()
    results = [ablate_case(case) for case in benchmark["cases"]]
    payload = {
        "benchmark_name": benchmark["benchmark_name"],
        "version": benchmark["version"],
        "ablation_design": {
            "tcri_only": "Retains the reliability-support core while removing citation, hallucination, and data-instability pressure.",
            "without_cvi": "Removes citation-validity pressure to test how much fake or weak references matter.",
            "without_dsr": "Removes data-instability pressure to test how much scale mismatch contributes.",
            "without_hallucination": "Removes hallucination pressure to test how much overclaim behavior contributes.",
            "full_system": "Uses the expected TRUST-LAB TCRI v3 composite score from the full profile.",
        },
        "summary": summarize(results),
        "cases": results,
    }
    print(json.dumps(payload, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
