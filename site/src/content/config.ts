// site/src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string().min(1),
    oneLiner: z.string().min(1),
    stack: z.array(z.string()).default([]),
    links: z
      .object({
        repo: z.string().url().optional(),
        site: z.string().url().optional(),
      })
      .default({}),
    featured: z.boolean().default(false),
    year: z.number().int(),
  }),
});

const experience = defineCollection({
  type: 'data',
  schema: z.object({
    role: z.string().min(1),
    company: z.string().min(1),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    location: z.string().optional(),
    bullets: z.array(z.string()).default([]),
  }),
});

// reading no longer uses a content collection; data lives in
// src/data/reading.json and is loaded via src/lib/reading.ts.

export const collections = { blog, projects, experience };
