---
title: Sales Comment Moderation
summary: A locally trained LLM that moderates comments on sales listings in-house, so nothing that needs judgement leaves the building.
year: 2026
tags: [LLMs, Fine-tuning, Content Moderation, Self-hosted, Python]
status: In production
role: Development and deployment
featured: true
order: 2
cover: ../../src/assets/projects/comment-moderation-llm.png
coverAlt: A dark field of blank message bubbles, a scattered few glowing warm and in focus
---

Moderation is a classification problem with a bad failure mode on both sides.
Miss something and it stays published; over-flag and you bury legitimate
comments from real customers under a review queue nobody works through.

This system moderates comments on sales content using an **LLM trained and
served locally** — no third-party moderation API in the path. That was the
constraint the design started from: comment text is customer data, and running
it through an external endpoint to get back a label is a data flow that has to
be justified rather than assumed. Keeping the model in-house removes the
question.

Running your own model also means the policy is yours. A hosted moderation
endpoint enforces its vendor's categories, which rarely line up with what a
specific sales context actually cares about. Training locally meant the
boundaries could be drawn where the business needed them and moved when they
turned out to be wrong.

I handled both the training side and getting it into production.

**innoscripta SE** · 2026

<!-- Worth adding: base model and size, how the training set was labelled,
     the category taxonomy, throughput, and how borderline cases route to a
     human. -->
