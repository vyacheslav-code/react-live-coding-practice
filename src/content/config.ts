import { defineCollection, z } from 'astro:content';

const tasks = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    timeEstimate: z.number(),
    learningGoals: z.array(z.string()),
    hints: z.array(z.string()),
    starterCode: z.string(),
  }),
});

export const collections = {
  tasks,
};
