import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    shortDescription: z.string(),
    type: z.string(),
    summary: z.string(),
    impact: z.string(),
    stack: z.array(z.string()),
    screenshotUrl: z.string(),
    screenshotAlt: z.string(),
    sourceUrl: z.string(),
    liveUrl: z.string(),
    demoUrl: z.string(),
    featured: z.boolean(),
    order: z.number()
  })
});

export const collections = { projects };
