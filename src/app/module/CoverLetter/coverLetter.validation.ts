import { z } from 'zod';
import {
  PersonalInfoSchema,
  UpdatePersonalInfoSchema,
} from '../Resume/resume.validation';

const RecipientInfoSchema = z.object({
  name: z.string(),
  email: z.string(),
  position: z.string(),
  companyName: z.string(),
  companyEmail: z.string(),
  companyWebsite: z.string().optional(),
  address: z.string(),
});
const UpdateRecipientInfoSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  position: z.string().optional(),
  companyName: z.string().optional(),
  companyEmail: z.string().optional(),
  companyWebsite: z.string().optional(),
  address: z.string().optional(),
});

export const CreateCoverLetterSchema = z.object({
  body: z.object({
    name: z.string(),
    templateId: z.string(),
    personalInfo: PersonalInfoSchema,
    body: z.string(),
    closing: z.string(),
    recipient: RecipientInfoSchema,
    date: z.string(),
  }),
});

export const UpdateCoverLetterSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    templateId: z.string().optional(),
    personalInfo: UpdatePersonalInfoSchema.optional(),
    body: z.string().optional(),
    closing: z.string().optional(),
    recipient: UpdateRecipientInfoSchema.optional(),
    date: z.string().optional(),
  }),
});
