---
title: 3D Port Container Scanner
summary: ML over 3D scans of shipping containers at an Istanbul port, raising throughput while cutting misreads.
year: 2021
tags: [Computer Vision, 3D Scanning, Depth Sensing, Industrial ML, C++]
deployment:
  - Istanbul, Turkey — commercial port terminal
partners: [Intel]
status: Deployed
order: 9
cover: ../../src/assets/projects/port-container-scanner.png
coverAlt: A shipping container passing through an industrial scanning gantry at a port at night
---

A scanning rig for containers moving through a working port terminal in
**Istanbul**, with ML models interpreting the 3D capture to classify and
verify contents.

Built in collaboration with **Intel**, around a depth sensor they were bringing
to market at the time. Working against new hardware cuts both ways: you get the
capability before anyone else has built on it, and you also inherit its
unknowns — the noise characteristics, the range where the depth data stops
being trustworthy, the behaviour outdoors at a port rather than on a bench. A
lot of the work was establishing what the sensor could actually be relied on to
report before anything downstream could assume it.

The wins were operational rather than academic: more containers processed per
hour, and fewer misreads than the manual process it replaced. In a port,
throughput is the metric — a model that's slightly more accurate but slower
makes things worse.

**ISSD Bilişim Elektronik A.Ş.** · 2021
