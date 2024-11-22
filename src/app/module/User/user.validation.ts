import { z } from "zod";

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
  }),
});

export const userValidation = {
  createUserValidation,
  updateUserValidation,
};
