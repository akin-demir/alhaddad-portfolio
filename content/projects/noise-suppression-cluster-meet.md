---
title: Noise Suppression for cluster-meet
summary: R&D on cancelling background noise in live meeting audio without eating the speech underneath it.
year: 2026
tags: [Audio Processing, Speech Enhancement, Noise Suppression, R&D, Python]
status: R&D
role: Research and development
order: 4
---

The second strand of audio research for **cluster-meet**, the in-house meeting
platform: suppressing the noise people actually call from inside — keyboards,
fans, traffic, a room with too much echo.

Aggressive suppression is easy to demo and unpleasant to sit in. Push it and
speech starts arriving clipped at the edges, consonants go soft, and anyone
with an accent the model handles less well gets the worst of it. The interesting
question is never how much noise you can remove; it is how much you can remove
before the voice degrades, and how that trade-off holds across real conditions
rather than a clean test set.

Like the TTS work, this had to run in the live path, which rules out anything
that needs to see the whole utterance before deciding what to do with it.

**innoscripta SE** · 2026

<!-- Worth adding: models/approaches evaluated, objective metrics used
     (PESQ/STOI or similar), per-frame latency, and how it compared to the
     browser's built-in suppression. -->
