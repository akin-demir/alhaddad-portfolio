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
**Istanbul**. ML models read the 3D capture to classify and verify what was
inside.

We built it with **Intel**, around a depth sensor they were bringing to market
at the time. Working against new hardware cuts both ways. You get the
capability before anyone else has built anything on it, and you also inherit
everything nobody has characterised yet: the noise behaviour, the range where
the depth data stops being trustworthy, how it holds up outdoors at a port
rather than on a bench indoors. A good chunk of the project was just
establishing what the sensor could be relied on to report, because nothing
downstream could assume it until then.

The results were operational rather than academic. More containers processed
per hour, and fewer misreads than the manual process it replaced. Throughput is
the number a port terminal cares about, and a model that's slightly more
accurate but slower is a step backwards there.

**ISSD Bilişim Elektronik A.Ş.** · 2021
