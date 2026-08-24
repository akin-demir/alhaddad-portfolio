---
title: Tunnel & Highway Incident Detection
summary: Real-time vision for road incidents across Turkish highways and tunnels, running on edge hardware because a datacenter round-trip was too slow.
year: 2021
tags: [Computer Vision, OpenVINO, Edge Compute, C++, Real-time]
deployment:
  - İzmir, Turkey — highway incident detection
  - Trabzon, Turkey — tunnel incident detection
partners: [Intel, fortiss GmbH]
program: EU Horizon 2020 · FED4SAE
status: Deployed
featured: true
order: 4
cover: ../../src/assets/projects/tunnel-incident-detection.png
coverAlt: A monitoring camera mounted on a tunnel wall above wet carriageways at night
---

A vision system watching highway and tunnel camera feeds for the events that
matter — stopped vehicles, wrong-way driving, debris, pedestrians where there
should be none — and alerting operators fast enough to act.

Deployed on the highway network around **İzmir** and in the road tunnels of
**Trabzon**, two very different environments: open highway with weather and
changing daylight, versus tunnels with constant sodium lighting and no GPS.

The binding constraint was never model accuracy. It was latency on hardware
already installed at the roadside. Models were optimized through **OpenVINO**
to run inference on-site rather than streaming video to a datacenter, and that
choice is what made real-time alerting possible at all.

The other constraint was false positives. An operator alerted twenty times an
hour stops looking, so precision mattered more than recall in a way benchmark
leaderboards don't capture.

## Dependability

The work ran under **FED4SAE**, an EU Horizon 2020 programme for accelerating
cyber-physical systems to market, in collaboration with **Intel** and
**fortiss GmbH**. That partnership is where the dependability side came from —
how you argue a neural network is fit for a safety-relevant deployment, not
just accurate on a test set.

Both published outputs came from this work:

- [Incident Detection on Junction Using Image Processing](https://arxiv.org/abs/2104.13437)
- [Application of the Neural Network Dependability Kit in Real-World Environments](https://arxiv.org/abs/2012.09602)

**ISSD Bilişim Elektronik A.Ş.** · 2018–2021
