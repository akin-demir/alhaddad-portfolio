---
category: product
title: Vinme — VIN Lookup
summary: A live VIN lookup app in English, Turkish and Arabic, with vehicle specifications and experimental photo scanning in the browser.
year: 2026
tags: [Browser OCR, Vehicle Data, JavaScript]
url: https://vinme.app
status: Live — photo scanning experimental
role: Product development and browser OCR
featured: true
order: 2
cover: ../../src/assets/projects/vinme.png
coverAlt: Vinme cover with a car windshield, the words Know the car. Read the VIN., and the vinme.app address
---

[Vinme](https://vinme.app) is a mobile-first web app for looking up vehicle
specifications from a Vehicle Identification Number (VIN). It runs in the
browser, with English, Turkish and Arabic interfaces, including right-to-left
layout for Arabic.

### From a VIN to vehicle details

Enter a VIN manually, use the camera or import a photo. Experimental browser OCR
helps read the characters; users can review and correct them before submitting a
lookup. A guide explains where to find the VIN on a vehicle or registration card.

Results show available details such as manufacturer, model, model year, engine and
assembly country. VIN region is shown separately from assembly country. NHTSA
vPIC supplies vehicle specifications, with a local manufacturer catalog and
source-linked VIN patterns providing additional coverage where available.

### A lightweight browser tool

The static app is hosted on Cloudflare Pages. Tesseract OCR runs in the browser,
and photos stay local. Submitting a lookup sends the VIN to NHTSA vPIC; no account
is required.

### Current scope

Vinme decodes vehicle specifications. It does not provide accident, ownership or
mileage history. Data coverage varies by vehicle and market, and photo scanning
remains experimental: detected characters need to be checked before lookup.
