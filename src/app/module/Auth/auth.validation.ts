import { z } from 'zod';

const loginUserZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        invalid_type_error: 'Name must be a string',
        required_error: 'name is required',
      })
      .email(),
    password: z.string({
      invalid_type_error: 'Name must be a string',
      required_error: 'name is required',
    }),
  }),
});
const changePasswordZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        invalid_type_error: 'email must be a string',
        required_error: 'email is required',
      })
      .email(),
    oldPassword: z.string({
      invalid_type_error: 'oldPassword must be a string',
      required_error: 'oldPassword is required',
    }),
    newPassword: z.string({
      invalid_type_error: 'newPassword must be a string',
      required_error: 'newPassword is required',
    }),
  }),
});
export const authenticationZodSchema = {
  loginUserZodSchema,
  changePasswordZodSchema,
};
