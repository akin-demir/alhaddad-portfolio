---
title: Tunnel & Highway Incident Detection
summary: Real-time vision for road incidents across Turkish highways and tunnels, running on roadside hardware because a datacenter round-trip was too slow.
year: 2021
tags: [Computer Vision, OpenVINO, Edge Compute, C++, Real-time]
deployment:
  - İzmir, Turkey — highway incident detection
  - Trabzon, Turkey — tunnel incident detection
partners: [Intel, fortiss GmbH]
program: EU Horizon 2020 · FED4SAE
status: Deployed
featured: false
order: 7
cover: ../../src/assets/projects/tunnel-incident-detection.png
coverAlt: A monitoring camera mounted on a tunnel wall above wet carriageways at night
---

A vision system watching highway and tunnel camera feeds for the handful of
events that matter: stopped vehicles, wrong-way driving, debris on the
carriageway, pedestrians where there shouldn't be any. Alerts go to operators
fast enough that they can still do something about it.

It ran on the highway network around **İzmir** and in the road tunnels of
**Trabzon**. Those are two quite different problems. Open highway means weather
and daylight that changes all day; tunnels mean constant sodium lighting, no
GPS, and no natural reference for anything.

Accuracy was never the binding constraint. Latency on hardware that was already
bolted to the roadside was. We optimised the models through **OpenVINO** so
inference ran on site instead of streaming video to a datacenter and waiting
for an answer, and that's the decision that made real-time alerting possible in
the first place.

False positives were the other one. An operator who gets alerted twenty times
an hour stops reading the alerts, and after that the system may as well be off.
So precision mattered more than recall here, which is not how these models are
usually benchmarked.

## Dependability

The work ran under **FED4SAE**, an EU Horizon 2020 programme for getting
cyber-physical systems to market, alongside **Intel** and **fortiss GmbH**.
The dependability side came out of that partnership: how you make the case
that a neural network is fit for a safety-relevant deployment, which is a
different question from whether it scores well on a test set.

Two papers came out of this work:

- [Incident Detection on Junction Using Image Processing](https://arxiv.org/abs/2104.13437)
- [Application of the Neural Network Dependability Kit in Real-World Environments](https://arxiv.org/abs/2012.09602)

**ISSD Bilişim Elektronik A.Ş.** · 2018–2021
