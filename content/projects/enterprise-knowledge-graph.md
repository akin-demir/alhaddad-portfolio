---
title: Enterprise Knowledge Graph
summary: Agentic pipelines that turn scattered public data on European enterprises into a graph you can query.
year: 2024
tags: [Agentic AI, Knowledge Graphs, NLP, JanusGraph, Python]
status: In production
role: Pipeline design and implementation
featured: true
order: 6
cover: ../../src/assets/projects/enterprise-knowledge-graph.png
coverAlt: Dark data-centre corridor with an open server rack, overlaid with a glowing network-graph motif
---

Finding data about European companies was never the hard part. The hard part
was that it arrived in a dozen shapes from a dozen sources, and no two of them
agreed on what counted as the same company.

So the extraction layer is agentic instead of a fixed pipeline. LLM agents with
tool access decide what to pull from a source and how to normalise it, which is
worth the complexity because every source has its own idea of structure. NLP
models handle entity resolution. Deeper text analysis takes the classification
passes that are too ambiguous to write rules for. Everything lands in a graph
store (JanusGraph first, later AWS Neptune) with vector indexes alongside it,
so the same data can be reached by traversal or by semantic search.

Most of the engineering effort went into failure modes rather than capability.
An agent that can decide things can also decide them wrong, and a wrong entity
merge is expensive to unpick later. So the work was in narrowing what an agent
was allowed to conclude and making every conclusion checkable after the fact.

**innoscripta SE** · 2022–2024

<!-- Worth adding when you have the numbers: entity/company scale, what the
     graph feeds downstream, and where agentic beat a fixed pipeline. -->
