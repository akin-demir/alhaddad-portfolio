import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import site from '../../content/site.json';

// llms.txt — a plain-text map of the site for LLM assistants and agents that
// fetch a page and need the gist without parsing the HTML. Generated from the
// same content collection the pages use, so it can't drift out of sync.
// Spec: https://llmstxt.org
export const GET: APIRoute = async () => {
  const base = 'https://alhaddad.dev';
  const projects = (await getCollection('projects')).sort(
    (a, b) => a.data.order - b.data.order,
  );

  const line = (p: (typeof projects)[number]) => {
    const facts = [p.data.year, p.data.status].filter(Boolean).join(' · ');
    return `- [${p.data.title}](${base}/projects/${p.id}/): ${p.data.summary}${facts ? ` (${facts})` : ''}`;
  };

  const body = [
    `# ${site.name}`,
    '',
    `> ${site.role} in ${site.location}. ${site.tagline}`,
    '',
    ...site.about.map((p) => `${p}\n`),
    '## Projects',
    '',
    ...projects.filter((p) => p.data.featured).map(line),
    ...projects.filter((p) => !p.data.featured).map(line),
    '',
    '## Experience',
    '',
    ...site.experience.map(
      (e) => `- **${e.role}**, ${e.org} (${e.start} – ${e.end}) — ${e.summary}`,
    ),
    '',
    '## Publications',
    '',
    ...site.publications.map((p) => `- [${p.title}](${p.url}) — ${p.venue}, ${p.year}`),
    '',
    '## Pages',
    '',
    `- [Home](${base}/): about, skills, experience, publications`,
    `- [Projects](${base}/projects/): every project, newest first`,
    ...(site.resume ? [`- [CV](${base}${site.resume}) (PDF)`] : []),
    '',
    '## Contact',
    '',
    ...site.links.map((l) => `- ${l.label}: ${l.url}`),
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
