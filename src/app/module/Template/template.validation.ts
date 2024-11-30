import { z } from 'zod';

export const TemplateSchema = z.object({
  body: z.object({
    image: z.string().url('Invalid URL for image'),
    name: z.string().min(1, 'Name must not be empty'),
  }),
});
