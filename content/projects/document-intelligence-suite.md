---
title: Document Intelligence Suite
summary: Three parsers reading invoices, emails, and timesheets past 90% field accuracy — including the ones that arrive as photographs of paper.
year: 2026
tags: [LLMs, RAG, Document AI, FastAPI, Python]
status: In production
role: Led development
featured: true
order: 2
cover: ../../src/assets/projects/document-intelligence-suite.png
coverAlt: A stack of creased paper invoices on a dark surface, crossed by a bright scanning light
---

Three production tools on one extraction backbone:

- **Scanned invoice parser** — OCR plus layout-aware extraction, on documents
  that are frequently a phone photo of a creased page.
- **Email analyzer** — thread-aware classification and field extraction, where
  the relevant fact is often three replies up.
- **Timesheet parser** — structured recovery from formats ranging from clean
  tables to freeform notes.

All three clear 90% field-level accuracy. They're served as async FastAPI
endpoints, which was a deliberate choice: other teams could integrate against
a stable HTTP contract without knowing or caring which model was behind it.
Docker deployments and CI/CD on AWS.

The accuracy number is the headline, but the useful lesson was about scope —
each parser got dramatically better once we stopped trying to extract every
field and focused on the ones downstream systems actually consumed.

**Innoscripta AG** · Led development

<!-- Worth adding: what 90% is measured against, the hard failure cases, and
     the LLM vs. classical-layout-model split. -->
