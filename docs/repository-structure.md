# Repository Structure Guide

## Purpose

This document explains how the **TRUST-LAB** repository is organized and why that organization supports a GitHub-first, research-grade workflow. The repository is meant to communicate methodological seriousness before interface complexity, so the structure favors clarity, documentation quality, and extensibility.

## Structural Philosophy

The repository is organized around a simple principle: the project should be understandable in layers. A visitor should be able to begin with the root `README.md`, move into the formal documentation under `docs/`, inspect representative cases in `examples/`, and then explore the bilingual demonstration layer in `client/`.

This ordering reflects the project strategy approved for the first version. TRUST-LAB should first look like a serious research artifact and only then like a public-facing demo.

| Repository Area | Primary role |
|---|---|
| Root files | Project identity, onboarding, and working notes |
| `docs/` | Formal methodology, architecture, metrics, and roadmap |
| `examples/` | Representative cases that clarify expected behavior |
| `data/` | Structured project data and future benchmark-ready assets |
| `client/` | Public bilingual interface and demo layer |

## Root-Level Files

The root of the repository should remain concise and purposeful. Each file at this level should answer an immediate need for a reviewer, collaborator, or future maintainer.

| File | Function |
|---|---|
| `README.md` | Main project framing and research positioning |
| `ideas.md` | Chosen design philosophy for the public-facing interface |
| `product-brief.md` | Translation of the project core into product requirements |
| `research-notes.md` | Working notes from external framing references |
| `todo.md` | Build checklist for the current implementation phase |

## Documentation Layer

The `docs/` directory is the intellectual core of the repository. It should contain the stable explanatory material that defines what TRUST-LAB is, how it works, and where it is heading.

| File | Role in the documentation system |
|---|---|
| `docs/methodology.md` | Explains the layered analytical framework |
| `docs/architecture.md` | Describes the system flow from input to decision |
| `docs/formal-metrics.md` | Defines TCRI and DSR formally |
| `docs/roadmap.md` | Explains version progression |
| `docs/repository-structure.md` | Explains how the repository is organized |

This layer should remain readable in isolation. A researcher should be able to understand the framework without opening the frontend code at all.

## Examples Layer

The `examples/` directory exists to make the methodology concrete. The examples should illustrate how different input patterns lead to different metric profiles and decision outcomes.

This directory is especially important in a GitHub-first repository because it helps bridge the gap between formal description and practical intuition.

## Data Layer

The `data/` directory is intentionally modest in the first version. It provides a place for structured assets that may later support benchmark suites, decision calibration, or cross-case analysis.

The existence of this directory signals that the project is designed for growth, even if the first release only uses a limited subset of structured data.

## Client Layer

The `client/` directory contains the bilingual public interface. This layer should not replace the repository’s research identity. Its role is to make the methodology legible and usable for a broader audience through three main surfaces: a project page, a methodology page, and a demo page.

The public interface should therefore be understood as an interpretive layer on top of the research repository, not as a detached marketing website.

## Structural Summary

The repository structure of TRUST-LAB is deliberately conservative and readable. That is a strength, not a limitation. A clean structure gives the project credibility, improves maintainability, and makes it easier to publish to GitHub, discuss with researchers, and extend toward future benchmark or API workflows.
