// @ts-check
import { defineConfig } from 'astro/config';

// For a <user>.github.io repo the site lives at the domain root, so no `base`
// is needed. If you ever rename the repo to something else, add:
//   base: '/repo-name',
// and Astro will prefix every generated link for you.
export default defineConfig({
  site: 'https://USERNAME.github.io',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
