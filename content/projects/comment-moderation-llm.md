---
title: Sales Comment Moderation
summary: A locally trained LLM that moderates comments on sales listings in-house, so customer text never leaves the building to get a label.
year: 2026
tags: [LLMs, Fine-tuning, Content Moderation, Self-hosted, Python]
status: In production
role: Development and deployment
featured: true
order: 2
cover: ../../src/assets/projects/comment-moderation-llm.png
coverAlt: A dark field of blank message bubbles, a scattered few glowing warm and in focus
---

Moderation is a classification problem that fails badly in both directions.
Miss something and it stays published. Over-flag and you've buried real
customers' comments in a review queue nobody has time to work through.

This system moderates comments on sales content with an **LLM trained and
served locally**, with no third-party moderation API anywhere in the path.
That was the starting constraint rather than an optimisation. Comment text is
customer data, and sending it to an external endpoint just to get a label back
is a data flow you have to justify. Keeping the model in-house means you don't
have to.

The other benefit showed up later: running your own model means the policy is
yours. Hosted moderation endpoints enforce their vendor's categories, and
those categories almost never match what a particular sales context cares
about. Training locally let us draw the boundaries where the business wanted
them, then move them when the first version turned out to be wrong in places.

I did the training work and the production deployment.

**innoscripta SE** · 2026

<!-- Worth adding: base model and size, how the training set was labelled,
     the category taxonomy, throughput, and how borderline cases route to a
     human. -->
