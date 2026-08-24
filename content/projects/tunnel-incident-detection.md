---
title: Tunnel & Highway Incident Detection
summary: Real-time computer vision for detecting road incidents in tunnels and on highways, built with Intel.
year: 2021
tags: [Computer Vision, OpenVINO, Edge Compute, C++, Real-time]
featured: true
order: 3
---

A vision system watching tunnel and highway camera feeds for incidents —
stopped vehicles, wrong-way driving, debris, pedestrians — and alerting
operators in real time.

The constraint was latency on edge hardware, not accuracy in a lab. Models
were optimized through **OpenVINO** to run inference on-site rather than
shipping video to a datacenter, which is what made real-time alerting
feasible at all.

Published as [Incident Detection on Junction Using Image
Processing](https://arxiv.org/abs/2104.13437) (arXiv:2104.13437).

**Built at** ISSD Bilisim Elektronik, in collaboration with **Intel**.
