#!/usr/bin/env python3
"""Build the two-page consultant CV published at public/files/cv-consultant.pdf.

Run from any directory with: python scripts/build-consultant-cv.py
Requires ReportLab and the DejaVu Sans fonts.
"""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

# Primary sources for the security/compliance statement below:
# Certificate (BSI No. IS 814112):
# https://www.innoscripta.com/information-security/iso-certificate.pdf
# Security controls and compliance context:
# https://www.innoscripta.com/en-us/about-us/trust-center
OUTPUT = Path(__file__).resolve().parents[1] / "public/files/cv-consultant.pdf"

NAVY = colors.HexColor("#102A43")
INK = colors.HexColor("#243B53")
MUTED = colors.HexColor("#627D98")
TEAL = colors.HexColor("#007C83")
PALE = colors.HexColor("#EAF6F5")
LINE = colors.HexColor("#D9E2EC")
WHITE = colors.white

pdfmetrics.registerFont(TTFont("DejaVu", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DejaVu-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))

PAGE_W, PAGE_H = A4
LEFT = 18 * mm
RIGHT = 18 * mm
TOP = 18 * mm
BOTTOM = 15 * mm

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="NameCV", fontName="DejaVu-Bold", fontSize=25, leading=28,
    textColor=NAVY, spaceAfter=2 * mm,
))
styles.add(ParagraphStyle(
    name="TitleCV", fontName="DejaVu", fontSize=12.5, leading=16,
    textColor=TEAL, spaceAfter=3 * mm,
))
styles.add(ParagraphStyle(
    name="ContactCV", fontName="DejaVu", fontSize=8.5, leading=11,
    textColor=MUTED, spaceAfter=6 * mm,
))
styles.add(ParagraphStyle(
    name="SectionCV", fontName="DejaVu-Bold", fontSize=10.5, leading=13,
    textColor=NAVY, uppercase=True, spaceBefore=4 * mm, spaceAfter=2.2 * mm,
))
styles.add(ParagraphStyle(
    name="BodyCV", fontName="DejaVu", fontSize=8.8, leading=12.5,
    textColor=INK, spaceAfter=2.3 * mm,
))
styles.add(ParagraphStyle(
    name="BodyTightCV", fontName="DejaVu", fontSize=8.3, leading=11.4,
    textColor=INK, spaceAfter=1.4 * mm,
))
styles.add(ParagraphStyle(
    name="RoleCV", fontName="DejaVu-Bold", fontSize=10, leading=13,
    textColor=NAVY, spaceAfter=0.5 * mm,
))
styles.add(ParagraphStyle(
    name="MetaCV", fontName="DejaVu", fontSize=7.8, leading=10,
    textColor=MUTED, spaceAfter=1.5 * mm,
))
styles.add(ParagraphStyle(
    name="BulletCV", fontName="DejaVu", fontSize=8.35, leading=11.5,
    textColor=INK, leftIndent=4 * mm, firstLineIndent=-3.2 * mm,
    bulletIndent=0, spaceAfter=1.4 * mm,
))
styles.add(ParagraphStyle(
    name="MetricValueCV", fontName="DejaVu-Bold", fontSize=15, leading=18,
    textColor=TEAL, alignment=TA_LEFT,
))
styles.add(ParagraphStyle(
    name="MetricLabelCV", fontName="DejaVu", fontSize=7.2, leading=9.5,
    textColor=INK, alignment=TA_LEFT,
))
styles.add(ParagraphStyle(
    name="SmallCV", fontName="DejaVu", fontSize=7.5, leading=10.5,
    textColor=INK,
))
styles.add(ParagraphStyle(
    name="FooterCV", fontName="DejaVu", fontSize=7, leading=9,
    textColor=MUTED,
))


def p(text, style="BodyCV"):
    return Paragraph(text, styles[style])


def section(title):
    return [p(title.upper(), "SectionCV"), HRFlowable(width="100%", thickness=0.7, color=LINE, spaceAfter=2.4 * mm)]


def bullet(text):
    return p(f"• {text}", "BulletCV")


def metric(value, label):
    return [p(value, "MetricValueCV"), p(label, "MetricLabelCV")]


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, PAGE_H - 4 * mm, PAGE_W, 4 * mm, fill=1, stroke=0)
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.5)
    canvas.line(LEFT, 10 * mm, PAGE_W - RIGHT, 10 * mm)
    canvas.setFont("DejaVu", 7)
    canvas.setFillColor(MUTED)
    canvas.drawString(LEFT, 6.2 * mm, "Mohamad Alhaddad · AI & Digital Transformation Consultant")
    canvas.drawRightString(PAGE_W - RIGHT, 6.2 * mm, f"Page {doc.page}")
    canvas.restoreState()


doc = BaseDocTemplate(
    str(OUTPUT),
    pagesize=A4,
    leftMargin=LEFT,
    rightMargin=RIGHT,
    topMargin=TOP,
    bottomMargin=BOTTOM,
    title="Mohamad Alhaddad — AI & Digital Transformation Consultant",
    author="Mohamad Alhaddad",
    subject="Consulting résumé",
)
frame = Frame(LEFT, BOTTOM, PAGE_W - LEFT - RIGHT, PAGE_H - TOP - BOTTOM, id="main")
doc.addPageTemplates([PageTemplate(id="consultant", frames=[frame], onPage=header_footer)])

story = []
story += [
    p("MOHAMAD ALHADDAD", "NameCV"),
    p("AI & DIGITAL TRANSFORMATION CONSULTANT", "TitleCV"),
    p(
        "Türkiye · Dubai · Damascus · Remote worldwide &nbsp;&nbsp;·&nbsp;&nbsp; "
        '<link href="https://www.linkedin.com/in/alhaddad-mohamad-375532117/" color="#007C83">LinkedIn: alhaddad-mohamad-375532117</link>',
        "ContactCV",
    ),
]

story += section("Consulting profile")
story.append(p(
    "Technology consultant with 7+ years of experience helping organizations use AI and automation to reduce operating costs, save time and improve service delivery. Works across discovery, business-case definition, solution architecture, stakeholder alignment and implementation oversight. Combines technical depth with experience guiding projects from uncertain requirements through production deployment in enterprise, transport and industrial environments."
))

metrics = Table(
    [[metric("7+ years", "Delivering applied AI solutions"),
      metric("3", "Document-intelligence tools in production"),
      metric("90%+", "Field-level extraction accuracy in production"),
      metric("3", "Selected academic publications")]],
    colWidths=[(PAGE_W - LEFT - RIGHT) / 4] * 4,
)
metrics.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), PALE),
    ("BOX", (0, 0), (-1, -1), 0.7, colors.HexColor("#B9DFDC")),
    ("INNERGRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#CBE7E4")),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 3.5 * mm),
    ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
    ("TOPPADDING", (0, 0), (-1, -1), 3 * mm),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
]))
story += [Spacer(1, 2 * mm), metrics]

story += section("Consulting and solution leadership")
cap_rows = [
    [p("AI strategy & opportunity assessment", "SmallCV"), p("Solution architecture & roadmaps", "SmallCV"), p("Requirements discovery & scoping", "SmallCV")],
    [p("Technical project leadership", "SmallCV"), p("Delivery risk & governance", "SmallCV"), p("Stakeholder & vendor alignment", "SmallCV")],
    [p("Business cases & process automation", "SmallCV"), p("Production readiness", "SmallCV"), p("Implementation oversight", "SmallCV")],
]
caps = Table(cap_rows, colWidths=[(PAGE_W - LEFT - RIGHT) / 3] * 3)
caps.setStyle(TableStyle([
    ("TEXTCOLOR", (0, 0), (-1, -1), INK),
    ("LINEBELOW", (0, 0), (-1, -2), 0.4, LINE),
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("LEFTPADDING", (0, 0), (-1, -1), 2.5 * mm),
    ("RIGHTPADDING", (0, 0), (-1, -1), 2.5 * mm),
    ("TOPPADDING", (0, 0), (-1, -1), 2.2 * mm),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 2.2 * mm),
]))
story.append(caps)

story += section("Selected consulting engagements")
engagements = [
    ("Document Intelligence & Process Automation", "innoscripta SE · Enterprise AI",
     "Led the delivery of a shared extraction service for invoices, emails and timesheets. Scoped outputs around the fields downstream teams actually needed, established stable API contracts and moved three tools into production at 90%+ field-level accuracy. Since launch, the service has saved more than €60,000 in manual processing costs."),
    ("Enterprise Knowledge Graph", "innoscripta SE · Data and AI architecture",
     "Designed the extraction approach for fragmented European enterprise data, combining agentic workflows, entity resolution, graph storage and semantic search. Focused the architecture on traceability and controlled failure modes so automated conclusions could be reviewed and corrected."),
    ("Safety-Critical Vision Systems", "ISSD · Intel, fortiss and Huawei partnerships",
     "Supported solution design and field delivery for tunnel, highway and rail-crossing detection systems. Balanced latency, false-alert rates and edge-hardware constraints, helping move computer-vision systems from model evaluation into live transport environments."),
]
for title, meta, body in engagements:
    story.append(KeepTogether([
        p(title, "RoleCV"),
        p(meta, "MetaCV"),
        p(body, "BodyTightCV"),
    ]))
    story.append(Spacer(1, 1.2 * mm))

story.append(PageBreak())
story += [
    p("PROFESSIONAL EXPERIENCE", "NameCV"),
    p("SOLUTION LEADERSHIP ACROSS AI, AUTOMATION AND INDUSTRIAL SYSTEMS", "TitleCV"),
]

story += section("Experience")
story.append(KeepTogether([
    p("AI Solutions Engineer · Consulting and Delivery Focus", "RoleCV"),
    p("innoscripta SE · Germany · Hybrid &nbsp;&nbsp;|&nbsp;&nbsp; Oct 2021 – Sep 2026", "MetaCV"),
    bullet("Led discovery and delivery for enterprise document-intelligence products, translating operational workflows into scoped extraction services and measurable acceptance criteria."),
    bullet("Delivered invoice, email and timesheet parsers at 90%+ field-level accuracy and integrated them into existing operational workflows."),
    bullet("Designed agentic data-extraction pipelines for European enterprise information, including entity resolution, knowledge-graph integration and controls for reviewable AI decisions."),
    bullet("Created stable FastAPI service contracts and AWS-based delivery pipelines so product teams could adopt AI capabilities without depending on model internals."),
    bullet("Advised delivery teams on model trade-offs, integration constraints, failure modes and production-readiness decisions."),
    bullet("Contributed to enterprise software delivery within innoscripta’s ISO/IEC 27001:2022-certified information security management system, with attention to access control, traceability, data integrity, and secure delivery."),
]))
story.append(Spacer(1, 2.5 * mm))
story.append(KeepTogether([
    p("ML Solutions Engineer · Applied AI Delivery", "RoleCV"),
    p("ISSD Bilişim Elektronik A.Ş. · Turkey · Hybrid &nbsp;&nbsp;|&nbsp;&nbsp; Aug 2018 – Sep 2021", "MetaCV"),
    bullet("Delivered real-time incident-detection systems for highways and tunnels with Intel and fortiss, aligning model behaviour with operational response needs and roadside hardware limits."),
    bullet("Contributed to a 3D container-scanning solution for an Istanbul port, evaluating new sensing hardware and improving operational throughput while reducing misreads."),
    bullet("Supported a Huawei rail-safety engagement in Serbia, defining detection around the time available for operators to act rather than model accuracy in isolation."),
    bullet("Designed, developed and deployed roadside variable-message-sign systems across multiple Turkish cities, covering the full path from engineering decisions to field commissioning."),
]))

story += section("Technical foundation")
tech = Table([
    [p("Applied AI", "SmallCV"), p("LLM agents, RAG, NLP, document AI, object detection, time-series forecasting", "SmallCV")],
    [p("Architecture", "SmallCV"), p("FastAPI, asynchronous services, microservices, knowledge graphs, vector search", "SmallCV")],
    [p("Infrastructure", "SmallCV"), p("AWS, Docker, Kubernetes, CI/CD, OpenVINO edge compute", "SmallCV")],
    [p("Engineering", "SmallCV"), p("Python, C++, Qt, PostgreSQL, JanusGraph, AWS Neptune, Qdrant, Elasticsearch, Redis, MongoDB", "SmallCV")],
], colWidths=[35 * mm, PAGE_W - LEFT - RIGHT - 35 * mm])
tech.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (0, -1), PALE),
    ("GRID", (0, 0), (-1, -1), 0.4, LINE),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 2.6 * mm),
    ("RIGHTPADDING", (0, 0), (-1, -1), 2.6 * mm),
    ("TOPPADDING", (0, 0), (-1, -1), 1.8 * mm),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 1.8 * mm),
]))
story.append(tech)

bottom = Table([
    [p("EDUCATION", "SectionCV"), p("LANGUAGES", "SectionCV")],
    [p("<b>MSc, Sustainable Environment and Energy Systems</b><br/>Middle East Technical University, Northern Cyprus Campus · 2017<br/><br/><b>BSc, Mechatronics & Automation Systems Engineering</b><br/>Eastern Mediterranean University · 2014–2017", "SmallCV"),
     p("<b>Arabic</b> · Native<br/><b>Turkish</b> · Native<br/><b>English</b> · Fluent<br/><b>German</b> · Beginner", "SmallCV")],
], colWidths=[0.68 * (PAGE_W - LEFT - RIGHT), 0.32 * (PAGE_W - LEFT - RIGHT)])
bottom.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LINEABOVE", (0, 0), (-1, 0), 0.7, LINE),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (0, -1), 8 * mm),
    ("TOPPADDING", (0, 0), (-1, -1), 2 * mm),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
]))
story += [Spacer(1, 4 * mm), bottom]

story += section("Selected publications")
story.append(p(
    "Incident Detection on Junction Using Image Processing (2021) &nbsp;·&nbsp; Application of the Neural Network Dependability Kit in Real-World Environments (2020) &nbsp;·&nbsp; Aiming for Smart Wind Energy (2019)",
    "SmallCV",
))

doc.build(story)
print(OUTPUT.resolve())
