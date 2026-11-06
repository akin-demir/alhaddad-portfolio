---
category: professional
company: ISSD Bilişim Elektronik A.Ş.
title: Smart-Tunnel & Highway Incident Detection
summary: Deep-learning incident detection for tunnels and highways, including the FED4SAE Smart-Tunnel project with Intel and fortiss.
year: 2021
url: https://fed4sae.eu/innovative-projects/smart-tunnel/
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

## Smart-Tunnel · FED4SAE

[Smart-Tunnel](https://fed4sae.eu/innovative-projects/smart-tunnel/) is the
FED4SAE-supported deep-learning enhancement of ISSD's automatic incident
detection system. It detects pedestrians and stopped vehicles in tunnel camera
feeds, using Intel Movidius Myriad X VPUs in a high-density deep-learning
(HDDL) configuration.

**FED4SAE reports that a live customer evaluation in Turkey roughly halved
false alarms** compared with the legacy engine, while detecting every event
that the earlier engine detected and raising alerts faster. Hardware cost per
camera stream also fell. These results describe that evaluation, rather than
a guarantee for every deployment.

Intel supported hardware benchmarking and inference tuning; fortiss supported
robustness assessment with the Neural Network Dependability Kit. Blumorpho
provided business coaching. The engine was designed for both new installations
and retrofits to existing tunnel monitoring systems.

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
