---
title: Sales Lead Proposal System
summary: A lead qualification and proposal engine that predicts purchase intent with semantic similarity rating, instead of asking an LLM to score leads directly.
year: 2025
tags: [LLMs, Embeddings, Semantic Similarity, Purchase Intent, Python]
status: In production
role: Implementation
featured: true
order: 5
cover: ../../src/assets/projects/sales-lead-proposal-system.png
coverAlt: Blank cards scattered on a dark surface, a shaft of warm light picking out a diagonal of them
---

Ask an LLM to rate a sales lead from 1 to 5 and it will give you a number
without hesitating. The trouble is the distribution. Models pile up on two or
three values, avoid the extremes, and quietly shift their scale when you
rephrase the question. Any single score looks reasonable. A thousand of them
don't.

This system uses **Semantic Similarity Rating (SSR)** instead, a method
introduced by Maier et al. in
[LLMs Reproduce Human Purchase Intent via Semantic Similarity Elicitation of
Likert Ratings](https://arxiv.org/abs/2510.08338).

SSR doesn't ask for a number at all. The model answers in ordinary language,
and the rating is recovered afterwards by embedding that answer and comparing
it against reference statements anchored to each point on the scale. The score
comes from where the response sits semantically rather than from the model
asserting a digit.

Two things made it worth building on:

- **The distributions look human.** The paper reports KS similarity above 0.85
  against human response distributions, and about 90% of human test-retest
  reliability across 57 surveys and 9,300 responses.
- **You get the explanation for free.** The model writes prose before anything
  is scored, so every rating already has its reasoning attached. That matters
  when a salesperson wants to know *why* a lead landed where it did.

For lead qualification that's the difference between an opaque number and
something a person can argue with. The same output then feeds proposal
generation downstream.

**Credit:** the SSR method is the work of Maier, Aslak, Fiaschi, Rismal,
Fletcher, Luhmann, Dow, Pappas, and Wiecki. My work was implementing and
adapting it for lead qualification and proposal generation.

**innoscripta SE** · 2025

<!-- Worth adding: how leads are represented as input, what the reference
     statement set looks like, volume handled, and whether SSR beat whatever
     scoring approach it replaced. -->
