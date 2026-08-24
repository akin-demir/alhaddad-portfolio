---
title: Enterprise Knowledge Graph
summary: Agentic AI pipelines that extract structured data from European enterprises into a queryable knowledge graph.
year: 2025
tags: [Agentic AI, NLP, Knowledge Graphs, JanusGraph, Python]
featured: true
order: 1
---

A pipeline that turns unstructured public and semi-structured enterprise data
into a knowledge graph you can actually query.

The extraction layer is agentic: LLM agents with tool access decide what to
pull and how to normalize it, backed by NLP models for entity resolution and
deep text analysis for the harder classification passes. Output lands in a
graph store (JanusGraph / AWS Neptune) alongside vector indexes for semantic
retrieval.

**Built at** Innoscripta AG.

<!-- Worth expanding: scale (how many entities/companies), what the graph is
     used for downstream, and where the agentic approach beat a fixed pipeline. -->
