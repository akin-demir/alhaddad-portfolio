---
title: Real-time TTS for cluster-meet
summary: R&D on a text-to-speech stack fast enough to speak inside a live meeting, where latency is the whole product.
year: 2026
tags: [Speech Synthesis, TTS, Real-time Audio, R&D, Python]
status: R&D
role: Research and development
order: 3
cover: ../../src/assets/projects/realtime-tts-cluster-meet.png
coverAlt: A studio microphone in a dark treated room, a band of warm waveform light streaking away from it
---

**cluster-meet** is our in-house meeting platform. This was the research effort
behind giving it a voice: text-to-speech that speaks inside the live call
instead of rendering audio afterwards.

Doing it in real time changes what counts as good. Offline TTS is judged on how
natural the result sounds, and you can take as long as you like getting there.
In a meeting, the audio has to start before the moment it belongs to has gone
past. That makes time-to-first-audio the number you're really designing
against, plus holding a steady stream once you've started. Naturalness is what
you optimise inside that budget.

The work was exploratory. Which approaches hold up at conversational latency,
and what the quality actually costs you when you get there.

**innoscripta SE** · 2026

<!-- Worth adding: which model families were evaluated, the latency budget
     actually hit, streaming/chunking approach, languages covered, and whether
     it shipped into the product. -->
