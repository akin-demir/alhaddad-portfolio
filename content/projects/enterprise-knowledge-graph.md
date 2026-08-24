---
title: Enterprise Knowledge Graph
summary: Agentic pipelines that turn scattered public data on European enterprises into a graph you can actually query.
year: 2025
tags: [Agentic AI, Knowledge Graphs, NLP, JanusGraph, Python]
featured: true
order: 1
---

The problem wasn't finding data about European companies. It was that the data
arrived in a dozen shapes from a dozen places, and none of it agreed on what
counted as the same entity.

The extraction layer is agentic rather than a fixed pipeline: LLM agents with
tool access decide what to pull and how to normalize it, which matters because
every source has its own idea of structure. NLP models handle entity
resolution, and deep text analysis takes the classification passes too
ambiguous for rules. Output lands in a graph store — JanusGraph, later AWS
Neptune — alongside vector indexes so the same data is reachable by traversal
or by semantic search.

The interesting engineering was in the failure modes. Agents that decide
things also decide things wrongly, so most of the work went into constraining
what an agent could conclude and making its output checkable.

**Innoscripta AG** · 2021–2026

<!-- Worth adding when you have the numbers: entity/company scale, what the
     graph feeds downstream, and where agentic beat a fixed pipeline. -->
