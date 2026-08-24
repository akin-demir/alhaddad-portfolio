---
title: Sales Lead Proposal System
summary: A lead qualification and proposal engine that predicts purchase intent using semantic similarity rating rather than asking an LLM to score leads directly.
year: 2025
tags: [LLMs, Embeddings, Semantic Similarity, Purchase Intent, Python]
status: In production
role: Implementation
featured: true
order: 3
---

Ask an LLM to rate a sales lead from 1 to 5 and it will happily give you a
number. The problem is the distribution: models cluster on a couple of values,
avoid the extremes, and shift their scale depending on how you phrase the
question. The scores look reasonable one at a time and fall apart in aggregate.

This system takes a different route, implementing **Semantic Similarity
Rating (SSR)** — a method introduced by Maier et al. in
[LLMs Reproduce Human Purchase Intent via Semantic Similarity Elicitation of
Likert Ratings](https://arxiv.org/abs/2510.08338).

Rather than eliciting a number, SSR has the model respond in natural language,
then maps that response onto a rating distribution by comparing its embedding
against a set of reference statements anchored to each point on the scale. The
rating is recovered from semantic position, not asserted by the model.

Two properties made it worth building on:

- **Realistic distributions.** The paper reports KS similarity above 0.85
  against human response distributions, and roughly 90% of human test-retest
  reliability across 57 surveys and 9,300 responses.
- **Explanations come free.** Because the model produces prose first, every
  score arrives with the reasoning that generated it — which matters when a
  salesperson needs to know *why* a lead ranked where it did, not just that it
  did.

Applied to sales, that turns qualification from an opaque score into something
a human can audit and act on, and feeds the proposal generation that follows.

**Credit:** the SSR method is the work of Maier, Aslak, Fiaschi, Rismal,
Fletcher, Luhmann, Dow, Pappas, and Wiecki. My work was implementing and
adapting it for lead qualification and proposal generation.

**innoscripta SE** · 2025

<!-- Worth adding: how leads are represented as input, what the reference
     statement set looks like, volume handled, and whether SSR beat whatever
     scoring approach it replaced. -->
