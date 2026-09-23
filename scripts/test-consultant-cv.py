#!/usr/bin/env python3
"""Regression checks for the tracked consultant CV source and generated PDF."""

import json
from pathlib import Path
import unittest

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
GENERATOR = ROOT / "scripts/build-consultant-cv.py"
PDF = ROOT / "public/files/cv-consultant.pdf"
SITE = ROOT / "content/site.json"
ISO_TEXT = "ISO/IEC 27001:2022-certified information security management system"
SOURCE_URLS = (
    "https://www.innoscripta.com/information-security/iso-certificate.pdf",
    "https://www.innoscripta.com/en-us/about-us/trust-center",
)


class ConsultantCvTest(unittest.TestCase):
    def test_site_keeps_consultant_cv_link(self):
        self.assertEqual(json.loads(SITE.read_text(encoding="utf-8"))["resume"], "/files/cv-consultant.pdf")

    def test_generator_is_tracked_and_cites_official_sources(self):
        self.assertTrue(GENERATOR.is_file())
        source = GENERATOR.read_text(encoding="utf-8")
        for url in SOURCE_URLS:
            self.assertIn(url, source)

    def test_pdf_has_two_pages_and_accurate_isms_wording(self):
        reader = PdfReader(PDF)
        self.assertEqual(len(reader.pages), 2)
        text = " ".join("\n".join(page.extract_text() or "" for page in reader.pages).split())
        self.assertIn(ISO_TEXT, text)
        self.assertIn("access control", text)
        self.assertIn("traceability", text)
        self.assertIn("data integrity", text)
        self.assertIn("secure delivery", text)
        self.assertIn("Türkiye · Dubai · Damascus · Remote worldwide", text)
        self.assertIn("Oct 2021 – Sep 2026", text)


if __name__ == "__main__":
    unittest.main()
