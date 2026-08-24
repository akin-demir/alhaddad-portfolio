/**
 * Join a root-relative path onto the configured `base`.
 *
 * Astro rewrites `base` into asset URLs it generates itself (Image, CSS, JS),
 * but NOT into hand-written hrefs. On a project site served from
 * /alhaddad-portfolio/ a literal href="/projects/" points at the domain root
 * and 404s, so every internal link goes through here.
 *
 * Works unchanged if `base` is later dropped for a custom domain — BASE_URL
 * is "/" then and this is a no-op.
 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL; // always has a trailing slash
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
