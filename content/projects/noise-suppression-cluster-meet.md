---
title: Noise Suppression for cluster-meet
summary: R&D on removing background noise from live meeting audio without eating the speech underneath it.
year: 2026
tags: [Audio Processing, Speech Enhancement, Noise Suppression, R&D, Python]
status: R&D
role: Research and development
order: 4
cover: ../../src/assets/projects/noise-suppression-cluster-meet.png
coverAlt: A dark acoustic foam wall, cluttered and cold on one side, clean and warm on the other
---

The second strand of audio research for **cluster-meet**, our in-house meeting
platform. This one deals with the noise people actually call from inside:
keyboards, fans, traffic through an open window, a meeting room with too much
echo in it.

Aggressive suppression demos well and is unpleasant to sit in for an hour. Push
it and speech starts arriving clipped at the edges, consonants go soft, and
whoever has the accent the model handles least well gets the worst of it. So
the question isn't how much noise you can remove. It's how much you can remove
before the voice starts to degrade, and whether that trade-off holds up outside
a clean test set.

Same constraint as the TTS work: it has to run in the live path. That rules out
anything that wants to see a whole utterance before deciding what to do with it.

**innoscripta SE** · 2026

<!-- Worth adding: models/approaches evaluated, objective metrics used
     (PESQ/STOI or similar), per-frame latency, and how it compared to the
     browser's built-in suppression. -->
