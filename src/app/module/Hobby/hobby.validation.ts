import { z } from 'zod';

export const createHobbyZodSchema = z.object({
  body: z.object({
    items: z.array(z.string()).default([]).optional(),
  }),
});
