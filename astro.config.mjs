// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// Served from the root of a custom domain, so no `base` — the url() helper in
// src/lib/url.ts becomes a no-op automatically.
export default defineConfig({
  site: 'https://alhaddad.dev',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
});