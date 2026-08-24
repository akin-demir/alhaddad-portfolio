---
title: Tunnel & Highway Incident Detection
summary: Real-time vision for road incidents in tunnels and on highways, running on edge hardware because a datacenter round-trip was too slow.
year: 2021
tags: [Computer Vision, OpenVINO, Edge Compute, C++, Real-time]
featured: true
order: 3
---

A vision system watching tunnel and highway camera feeds for the events that
matter — stopped vehicles, wrong-way driving, debris, pedestrians where there
should be none — and alerting operators fast enough to act.

The binding constraint was never model accuracy. It was latency on hardware
already installed at the roadside. Models were optimized through **OpenVINO**
to run inference on-site rather than streaming video to a datacenter, and that
choice is what made real-time alerting possible at all.

The other constraint was false positives. An operator who gets alerted twenty
times an hour stops looking, so precision mattered more than recall in a way
that benchmark leaderboards don't capture.

Published as [Incident Detection on Junction Using Image
Processing](https://arxiv.org/abs/2104.13437).

**ISSD Bilisim Elektronik**, with **Intel** · 2018–2021
