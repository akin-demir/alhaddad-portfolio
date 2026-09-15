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
