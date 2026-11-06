---
title: WorkGuard — Worker Safety Monitoring
summary: An independent product in development for camera-based worker-safety monitoring, starting with helmet and high-visibility PPE detection.
year: 2026
tags: [Computer Vision, Worker Safety, PPE Detection, YOLO]
status: In development — independent product
role: Product development and computer vision
featured: true
order: 0
cover: ../../src/assets/projects/workguard-ppe.jpg
coverAlt: WorkGuard prototype detecting helmets, high-visibility clothing and people in a fixed-camera construction recording
demoVideo: /files/demos/workguard-ppe.mp4
---

**WorkGuard is an independent product I am developing to support worker safety through camera-based monitoring.** The aim is to help safety teams spot potential issues and support site safety procedures. The current prototype focuses on detecting people, safety helmets and high-visibility clothing in local video recordings.

### Current prototype

I fine-tuned a pretrained YOLO26s detector on a public construction-PPE dataset and ran training and video inference locally on Apple Silicon using the MPS GPU backend. The pipeline saves annotated footage and per-frame detection records for review.

The video above shows actual model output on a fixed-camera construction research recording. It uses the existing trained checkpoint with a 0.30 confidence threshold. No boxes were manually added. This is a selected demonstration of the prototype, not a customer deployment or an independent performance benchmark.

### Supporting safety teams

WorkGuard is intended to assist safety monitoring and the review of potential PPE issues. Reliable compliance alerts require associating equipment with each person, checking visibility and applying the site's rules. Those capabilities remain development work. A missing detection alone is not evidence that PPE is absent, and the prototype does not verify equipment certification or guarantee worker safety.

Small helmets, distant workers, occlusion, glare and changing lighting remain important limitations. Human review and evaluation on representative site footage are required before operational use.

### Footage credit

Footage: Eirini Konstantinou, Joan Lasenby and Ioannis Brilakis, *Adaptive Computer Vision-Based 2D Tracking of Workers in Complex Environments* (2018), [Zenodo record 1218695](https://doi.org/10.5281/zenodo.1218695), file `SceneIlluminations_Left.mp4`. Licensed under [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/).

Changes: model-generated detection boxes and labels, title and attribution framing, silent H.264 encoding and a preview image. The original published sequence, playback rate and aspect ratio are retained. The recording uses a fixed research camera to simulate surveillance; it is not presented as footage from a WorkGuard installation. No endorsement by the footage creators is implied.
