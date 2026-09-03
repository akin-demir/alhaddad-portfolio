---
title: Rail Crossing Incident Detection
summary: Object detection at Serbian level crossings, flagging hazards in the danger zone while there's still time to act on them.
year: 2021
tags: [Computer Vision, Object Detection, Safety Systems]
deployment:
  - Serbia — national rail crossings
partners: [Huawei]
status: Deployed
order: 8
cover: ../../src/assets/projects/rail-crossing-detection.png
coverAlt: A level crossing at dusk in rain, barriers down and red warning lights lit, with a camera on a pole
---

Level crossings fail in a narrow and fairly predictable window: something is on
the track and a train is close. This system watched for that specific
situation. Object detection picked out vehicles or people inside the danger
zone and pushed alerts to rail operators.

Deployed across level crossings in **Serbia**, together with **Huawei**.

Timing shaped everything. A correct detection that arrives after the train does
is worth nothing, so the metric we cared about was how early a hazard could be
called at acceptable confidence, not how accurate the detector was in
isolation.

**ISSD Bilişim Elektronik A.Ş.**
