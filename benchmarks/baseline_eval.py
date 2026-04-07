#!/usr/bin/env python3
"""TRUST-LAB benchmark baseline comparison utilities.

This script compares curated benchmark cases against simple baselines so the
repository can show why a composite trust framework is more informative than
single-signal heuristics.
"""

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from statistics import mean
from typing import Any

ROOT = Path(__file__).resolve().parent
BENCHMARK_PATH = ROOT / "trust_bench_v1.json"


@dataclass(frozen=True)
class BaselineResult:
    case_id: str
    category: str
    ground_truth_band: str
    confidence_only: float
    citation_only: float
    hallucination_only: float
    trust_lab: float


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


def compare_baselines(case: dict[str, Any]) -> BaselineResult:
    profile = case["expected_profile"]

    confidence_only = clamp(profile["reliability"])
    citation_only = clamp(1 - profile["cvi"])
    hallucination_only = clamp(profile["hallucination_risk"])
    trust_lab = clamp(profile["tcri_v3"])

    return BaselineResult(
        case_id=case["id"],
        category=case["category"],
        ground_truth_band=case["ground_truth_band"],
        confidence_only=confidence_only,
        citation_only=citation_only,
        hallucination_only=hallucination_only,
        trust_lab=trust_lab,
    )


def band_match(predicted_score: float, expected_band: str) -> bool:
    return band_from_score(predicted_score) == expected_band


def summarize(results: list[BaselineResult]) -> dict[str, Any]:
    def accuracy(selector: str) -> float:
        return round(
            sum(
                1
                for result in results
                if band_match(getattr(result, selector), result.ground_truth_band)
            )
            / len(results),
            3,
        )

    category_names = sorted({result.category for result in results})
    per_category: dict[str, dict[str, float]] = {}

    for category in category_names:
        subset = [result for result in results if result.category == category]
        per_category[category] = {
            "confidence_only": round(mean(item.confidence_only for item in subset), 3),
            "citation_only": round(mean(item.citation_only for item in subset), 3),
            "hallucination_only": round(mean(item.hallucination_only for item in subset), 3),
            "trust_lab": round(mean(item.trust_lab for item in subset), 3),
        }

    return {
        "case_count": len(results),
        "band_accuracy": {
            "confidence_only": accuracy("confidence_only"),
            "citation_only": accuracy("citation_only"),
            "hallucination_only": accuracy("hallucination_only"),
            "trust_lab": accuracy("trust_lab"),
        },
        "category_average_scores": per_category,
    }


def main() -> None:
    benchmark = load_cases()
    results = [compare_baselines(case) for case in benchmark["cases"]]
    payload = {
        "benchmark_name": benchmark["benchmark_name"],
        "version": benchmark["version"],
        "comparison_logic": {
            "confidence_only": "Uses the expected reliability score as a naive confidence proxy.",
            "citation_only": "Uses inverted CVI risk pressure so weak citation validity produces higher risk.",
            "hallucination_only": "Uses the expected hallucination-risk value alone.",
            "trust_lab": "Uses the expected composite TCRI v3 score from the full TRUST-LAB profile.",
        },
        "summary": summarize(results),
        "cases": [result.__dict__ for result in results],
    }
    print(json.dumps(payload, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
