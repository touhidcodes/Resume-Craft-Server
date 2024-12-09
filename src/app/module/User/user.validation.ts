import { z } from 'zod';

const createUserValidation = z.object({
  body: z.object({
    userName: z.string(),
    email: z.string().email(),
    password: z.string(),
  }),
});
const updateUserValidation = z.object({
  body: z.object({
    userName: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    bio: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
  }),
});

export const userValidation = {
  createUserValidation,
  updateUserValidation,
};
