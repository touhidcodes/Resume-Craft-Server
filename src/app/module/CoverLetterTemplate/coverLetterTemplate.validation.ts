import { z } from 'zod';

export const CoverLetterTemplateSchema = z.object({
  body: z.object({
    image: z.string().url('Invalid URL for image'),
    name: z.string().min(1, 'Name must not be empty'),
  }),
});
