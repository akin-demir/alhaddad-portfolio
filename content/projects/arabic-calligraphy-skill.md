---
category: product
title: Arabic Calligraphy for AI Agents
summary: An open-source toolkit I built for Arabic typography, editable Square Kufic studies and local artwork exports through AI coding agents.
year: 2026
tags: [Agent Skills, Arabic Typography, Python, Square Kufic, Open Source]
repo: https://github.com/akin-demir/arabic-calligraphy-skill
status: Experimental release — RC4
role: Creator and maintainer
featured: true
order: 1
cover: ../../src/assets/projects/arabic-calligraphy-skill.png
coverAlt: Teal and gold Square Kufic composition made from four rotated grid studies of the word Allah, alongside the Arabic Calligraphy project title
---

I built **Arabic Calligraphy for AI Agents** to give coding agents a practical,
reviewable way to produce Arabic artwork. It combines a portable Agent Skill,
an offline Python renderer and editable geometric studies, with the original
Unicode text retained throughout the workflow.

**Source repository:** [github.com/akin-demir/arabic-calligraphy-skill](https://github.com/akin-demir/arabic-calligraphy-skill).

### From an instruction to an actual file

The toolkit supports four font workflows: Naskh, modern Kufi, Nastaliq and limited
Diwani. Agents can create wordmarks, posters, certificates and new documents,
then deliver real PNG, outlined SVG or PDF files where the selected workflow
supports them. Pango and HarfBuzz handle Arabic shaping and right-to-left layout;
Cairo handles export. Rendering runs locally after installation.

The reusable skill explains the supported capabilities and failure cases so an
agent can report a missing dependency or unsupported request. Source, installable
packages, editable examples and checksummed release assets are available publicly.

### Square Kufic as editable geometry

The Square Kufic workflow uses manually authored, labeled grid cells. Each letter
maps back to a span in the original text, making the intended reading available
for review alongside the artwork. Geometry checks flag uneven blocks and
corner-only contacts before export.

The cover is generated from the project's actual grid artwork: four studies of
`الله` rotated around a central space, with teal and gold distinguishing the
copies. The Unicode source is preserved; no generic font is pixelated and no
filler strokes are added to imitate Arabic lettering.

### Current scope

RC4 is an experimental public release, with 482 automated checks recorded in its
release evidence. The four font workflows are approximations, and the manual
compositions have not received independent calligrapher review. Arbitrary-text
Square Kufic conversion and automatic packed composition remain future work.
Diwani currently supports unvocalized PNG/SVG only; Arabic PDF extraction, search
and copy behavior still varies by reader.

[Browse the source](https://github.com/akin-demir/arabic-calligraphy-skill) ·
[Download RC4 and examples](https://github.com/akin-demir/arabic-calligraphy-skill/releases/tag/v0.1.0-rc.4)
