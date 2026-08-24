# Portfolio

Astro static site. Push to `main` → GitHub Actions builds → live on GitHub Pages.

## One-time setup

1. **Create the repo** (named `<username>.github.io` for a root-level URL):
   ```sh
   gh repo create <username>.github.io --public --source=. --remote=origin --push
   ```

2. **Point Pages at Actions** — Settings → Pages → **Source: GitHub Actions**.
   This is required; the default "Deploy from a branch" will ignore the workflow.

3. **Set your URL** in `astro.config.mjs` — replace `USERNAME` in the `site` field.
   Used for canonical tags and absolute URLs, not for routing.

That's it. The next push deploys.

## Day to day

```sh
npm run dev      # localhost:4321, hot reload
npm run build    # verify before pushing — the CI runs this same command
git push         # ~40s later it's live
```

## Editing content

| Want to change | Edit |
| --- | --- |
| Name, tagline, about, links, skills | `content/site.json` |
| Add or edit a project | `content/projects/<slug>.md` |
| Colors, spacing, type | `src/styles/global.css` (tokens at the top) |
| Page structure | `src/pages/`, `src/layouts/Base.astro` |

A project is one markdown file. Frontmatter is validated against the Zod schema
in `src/content.config.ts` — a typo fails the build locally rather than shipping
a broken page.

## Custom domain

Add `public/CNAME` containing just the domain, point DNS at GitHub's IPs, then
set the domain in Settings → Pages. Update `site` in `astro.config.mjs` to match.
