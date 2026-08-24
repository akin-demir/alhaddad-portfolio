// @ts-check
import { defineConfig } from 'astro/config';

// Deployed as a GitHub Pages *project* site, so it is served from a subpath.
// `base` must match the repo name exactly. Internal links go through
// src/lib/url.ts, which prefixes this for us.
//
// When a custom domain is added later, the site moves to the domain root:
// change `site` to the domain and delete `base` entirely.
export default defineConfig({
  site: 'https://akin-demir.github.io',
  base: '/alhaddad-portfolio',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
