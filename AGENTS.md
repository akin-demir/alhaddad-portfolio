# Portfolio site

Astro static site, deployed to GitHub Pages by `.github/workflows/deploy.yml` on
every push to `main`. Static only — no server, no API routes, no runtime secrets.

## Where content lives

All editable content is outside `src/`. Prefer changing these over touching
components:

- `content/site.json` — name, role, tagline, about paragraphs, links, skills.
- `content/projects/*.md` — one file per project. The filename is the URL slug.

Frontmatter is schema-validated in `src/content.config.ts`. The build **fails**
on a bad field, so add a field to the Zod schema before using it in a project file.

Project frontmatter: `title`, `summary`, `year` (number), `tags` (array),
`url` (optional, must be a valid URL), `repo` (optional URL),
`featured` (bool — surfaces it on the home page), `order` (number, ascending).

## Adding a project

Write one file to `content/projects/<slug>.md`. Nothing else — the home page,
the projects index, and `/projects/<slug>/` all pick it up from the collection.

## Layout and styling

- `src/layouts/Base.astro` — shell, `<head>`, meta tags, header, footer.
- `src/styles/global.css` — all styling. Plain CSS, no Tailwind.
  Colors are CSS custom properties at the top; dark mode is redefined in a
  `prefers-color-scheme` block **and** a `[data-theme="dark"]` block. Never give
  a color its only definition inside one of those blocks.

## Commands

- `npm run dev` — local dev server at :4321 (use `astro dev --background`, then
  `astro dev stop` / `status` / `logs`)
- `npm run build` — must pass before pushing; the deploy runs the same command
- `npm run preview` — serve `dist/` as it will appear in production

## Deploy

Push to `main` and it goes live in ~40s. Check status with
`gh run list --limit 3` or `gh run watch`. If a deploy fails, the site keeps
serving the last good build.

## Astro docs

- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Routing and dynamic routes](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Styling](https://docs.astro.build/en/guides/styling/)
