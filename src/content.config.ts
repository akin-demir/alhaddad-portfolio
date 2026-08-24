import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/projects' }),
  // `image()` resolves the path relative to this file's project root and hands
  // Astro's optimizer a real asset — so a missing or misspelled image is a
  // build error, not a broken <img> in production.
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      year: z.number(),
      tags: z.array(z.string()).default([]),
      url: z.string().url().optional(),
      repo: z.string().url().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(0),
      cover: image().optional(),
      coverAlt: z.string().default(''),
      // Deployment facts — rendered as a strip on the project page. All
      // optional, so a project with none simply omits the block.
      deployment: z.array(z.string()).default([]),
      partners: z.array(z.string()).default([]),
      program: z.string().optional(),
      status: z.string().optional(),
      role: z.string().optional(),
    }),
});

export const collections = { projects };
