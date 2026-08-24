---
title: Document Intelligence Suite
summary: Invoice, email, and timesheet parsers hitting 90%+ extraction accuracy on messy real-world documents.
year: 2025
tags: [LLMs, RAG, FastAPI, Document AI, Python]
featured: true
order: 2
---

Three production parsers sharing one extraction backbone:

- **Scanned invoice parser** — OCR plus layout-aware extraction on documents
  that arrive as photographs of paper.
- **Email analyzer** — thread-aware classification and field extraction.
- **Timesheet parser** — structured recovery from freeform and tabular formats.

All three exceed 90% field-level extraction accuracy. Served as async FastAPI
endpoints so other internal systems could integrate without touching the
models, with Docker deployments and CI/CD on AWS.

**Built at** Innoscripta AG. **Role:** led development.

<!-- Worth expanding: what 90% is measured against, the hard failure cases,
     and how much of the lift came from LLMs vs. classical layout models. -->
