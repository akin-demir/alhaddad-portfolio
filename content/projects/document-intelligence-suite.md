---
title: Document Intelligence Suite
summary: Three parsers reading invoices, emails and timesheets past 90% field accuracy, including the ones that arrive as photos of paper.
year: 2026
tags: [LLMs, RAG, Document AI, FastAPI, Python]
status: In production
role: Led development
featured: true
order: 1
cover: ../../src/assets/projects/document-intelligence-suite.png
coverAlt: A stack of creased paper invoices on a dark surface, crossed by a bright scanning light
---

Three production tools sharing one extraction backbone:

- **Scanned invoice parser.** OCR plus layout-aware extraction. Half the input
  is a phone photo of a creased page, taken at an angle.
- **Email analyzer.** Thread-aware classification and field extraction. The
  fact you need is usually three replies up, not in the message you were sent.
- **Timesheet parser.** Structured output from anything between a clean table
  and a paragraph of notes.

All three clear 90% field-level accuracy. They run as async FastAPI endpoints,
which was deliberate: other teams integrate against a stable HTTP contract and
never have to know which model is behind it. Docker deployments, CI/CD on AWS.

The accuracy number is what gets quoted, but the thing that actually moved it
was cutting scope. Each parser got much better once we stopped trying to pull
every field off the page and only extracted the ones downstream systems
actually read.

**innoscripta SE** · Led development

<!-- Worth adding: what 90% is measured against, the hard failure cases, and
     the LLM vs. classical-layout-model split. -->
