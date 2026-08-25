---
title: Real-time TTS for cluster-meet
summary: R&D on a text-to-speech stack fast enough to speak inside a live meeting, where latency is the whole product.
year: 2026
tags: [Speech Synthesis, TTS, Real-time Audio, R&D, Python]
status: R&D
role: Research and development
order: 3
---

**cluster-meet** is an in-house meeting platform. This was the research effort
behind giving it a voice: text-to-speech that runs in the live call rather than
rendering audio after the fact.

Real-time changes what "good" means. Offline TTS is judged on how natural the
result sounds, and you can spend as long as you like getting there. In a
meeting, the audio has to start before the moment it belongs to has passed —
so the constraint is time-to-first-audio and steady streaming under it, and
naturalness is what you optimise inside that budget, not instead of it.

The work was exploratory: evaluating what could hold up at conversational
latency, and where the quality cost of getting there actually lands.

**innoscripta SE** · 2026

<!-- Worth adding: which model families were evaluated, the latency budget
     actually hit, streaming/chunking approach, languages covered, and whether
     it shipped into the product. -->
