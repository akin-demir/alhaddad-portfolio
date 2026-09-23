import assert from 'node:assert/strict';
import test from 'node:test';

import {
  defaultLocale,
  getProjectCopy,
  getSiteCopy,
  localizedPath,
  normalizeLocale,
  supportedLocales,
} from '../src/lib/i18n.js';

test('normalizes supported browser locales and falls back to English', () => {
  assert.equal(normalizeLocale('de-DE'), 'de');
  assert.equal(normalizeLocale('ar-SA'), 'ar');
  assert.equal(normalizeLocale('tr-TR'), 'tr');
  assert.equal(normalizeLocale('fr-FR'), defaultLocale);
});

test('rewrites localized paths without losing the current page', () => {
  assert.equal(localizedPath('/en/', 'de'), '/de/');
  assert.equal(localizedPath('/ar/projects/example/', 'tr'), '/tr/projects/example/');
  assert.equal(localizedPath('/projects/example/', 'de'), '/de/projects/example/');
});

test('provides complete site copy for every supported locale', () => {
  for (const locale of supportedLocales) {
    const site = getSiteCopy(locale);
    assert.ok(site.role);
    assert.ok(site.headline.lead);
    assert.ok(site.tagline);
    assert.ok(site.about.length >= 3);
    assert.equal(site.experience.length, 2);
    assert.equal(site.languages.length, 4);
  }
});

test('localizes project titles and summaries with English fallback', () => {
  const original = { title: 'Document Intelligence Suite', summary: 'English summary' };
  const german = getProjectCopy('de', 'document-intelligence-suite', original);
  assert.notEqual(german.title, original.title);
  assert.notEqual(german.summary, original.summary);
  assert.deepEqual(getProjectCopy('en', 'unknown', original), original);
});

test('describes innoscripta work within its ISO/IEC 27001:2022-certified ISMS in every locale', () => {
  const expectedTerms = {
    en: ['ISO/IEC 27001:2022-certified information security management system', 'access control', 'traceability', 'data integrity', 'secure delivery'],
    de: ['nach ISO/IEC 27001:2022 zertifizierten Informationssicherheitsmanagementsystems', 'Zugriffskontrolle', 'Nachvollziehbarkeit', 'Datenintegrität', 'sichere Bereitstellung'],
    ar: ['نظام إدارة أمن المعلومات', 'ISO/IEC 27001:2022', 'التحكم في الوصول', 'إمكانية التتبع', 'سلامة البيانات', 'التسليم الآمن'],
    tr: ['ISO/IEC 27001:2022 sertifikalı bilgi güvenliği yönetim sistemi', 'Erişim kontrolü', 'izlenebilirlik', 'veri bütünlüğü', 'güvenli teslimat'],
  };

  for (const locale of supportedLocales) {
    const points = getSiteCopy(locale).experience[0].points;
    const statement = points.find((point) => point.includes('ISO/IEC 27001:2022'));
    assert.ok(statement, `${locale} is missing the ISO/IEC 27001:2022 experience statement`);
    for (const term of expectedTerms[locale]) assert.ok(statement.includes(term), `${locale} is missing ${term}`);
  }
});

test('shows the corrected innoscripta end date and professional availability in every locale', () => {
  const expectedLocations = {
    en: 'Türkiye · Dubai · Damascus · Remote worldwide',
    de: 'Türkei · Dubai · Damaskus · Weltweit remote',
    ar: 'تركيا · دبي · دمشق · عن بُعد حول العالم',
    tr: 'Türkiye · Dubai · Şam · Dünya çapında uzaktan',
  };

  for (const locale of supportedLocales) {
    const site = getSiteCopy(locale);
    assert.equal(site.experience[0].end, 'Sep 2026');
    assert.equal(site.location, expectedLocations[locale]);
  }
});
