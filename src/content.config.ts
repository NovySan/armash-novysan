import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The projects collection is the heart of the agentic content model.
// To add a new project: drop a new .md file into src/content/projects/
// with the frontmatter fields below. The site picks it up on next build.
//
// An agent (e.g., Claude Code) can read this schema to understand
// what fields are required and which are optional.

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    // Required fields
    title: z.string(),
    summary: z.string().describe('One-sentence description for cards and meta tags'),

    // Temporal & spatial context
    dates: z.string().optional().describe('Human-readable date range, e.g., "October 13–24, 2025"'),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    location: z.string().optional(),

    // Role & affiliations
    role: z.string().optional().describe('Your role on the project, e.g., "COMMS Officer"'),
    mission: z.string().optional().describe('Parent program or institution'),
    collaborators: z.array(z.string()).optional(),

    // Media
    heroImage: z.string().optional().describe('Path under /public, e.g., "/images/armash/hero.jpg"'),
    heroImageAlt: z.string().optional(),

    // Classification
    tags: z.array(z.string()).default([]),
    status: z.enum(['draft', 'complete', 'ongoing']).default('complete'),
    featured: z.boolean().default(false),

    // Cross-linking
    related: z.array(z.string()).optional().describe('Slugs of related projects'),

    // External links
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
        })
      )
      .optional(),
  }),
});

export const collections = { projects };
