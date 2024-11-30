import { z } from 'zod';

// Personal Info Schema
const PersonalInfoSchema = z.object({
  fullName: z.string().min(1),
  jobTitle: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  website: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  location: z.string(),
});
const UpdatePersonalInfoSchema = z.object({
  fullName: z.string().min(1).optional(),
  jobTitle: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(1).optional(),
  website: z.string().url().optional().optional(),
  linkedin: z.string().url().optional().optional(),
  github: z.string().url().optional().optional(),
  location: z.string().optional(),
});

// Style Schema
const StyleSchema = z.object({
  fontSize: z.string().min(1),
  color: z.string().min(1),
});
const UpdateStyleSchema = z.object({
  fontSize: z.string().min(1).optional(),
  color: z.string().min(1).optional(),
});

// Section Styles Schema
const SectionStylesSchema = z.object({
  header: StyleSchema,
  titles: StyleSchema,
});
const UpdateSectionStylesSchema = z.object({
  header: UpdateStyleSchema.optional(),
  titles: UpdateStyleSchema.optional(),
});

// Design Schema
const DesignSchema = z.object({
  font: z.string().min(1),
  themeColor: z.string().min(1),
  backgroundColor: z.string().min(1),
  sectionStyles: SectionStylesSchema,
});
const UpdateDesignSchema = z.object({
  font: z.string().min(1).optional(),
  themeColor: z.string().min(1).optional(),
  backgroundColor: z.string().min(1).optional(),
  sectionStyles: UpdateSectionStylesSchema.optional(),
});

// Work Experience Schema
export const WorkExperienceSchema = z.object({
  companyName: z.string().min(1),
  jobTitle: z.string().min(1),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  location: z.string().min(1),
  responsibilities: z.array(z.string()),
});
export const UpdateWorkExperienceSchema = z.object({
  companyName: z.string().min(1).optional(),
  jobTitle: z.string().min(1).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  location: z.string().min(1).optional(),
  responsibilities: z.array(z.string()).optional(),
});

// Education Schema
export const EducationSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  location: z.string().min(1),
  description: z.string().min(1).optional(),
});
export const UpdateEducationSchema = z.object({
  institution: z.string().min(1).optional(),
  degree: z.string().min(1).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  location: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
});

// Skill Schema
export const SkillSchema = z.object({
  category: z.string().min(1),
  skills: z.array(z.string().min(1)),
});

// Certification Schema
export const CertificationSchema = z.object({
  name: z.string().min(1),
  issuer: z.string().min(1),
  issueDate: z.string().datetime(),
  expirationDate: z.string().datetime().optional(),
  certificateLink: z.string().min(1).optional(),
});
export const UpdateCertificationSchema = z.object({
  name: z.string().min(1).optional(),
  issuer: z.string().min(1).optional(),
  issueDate: z.string().datetime().optional(),
  expirationDate: z.string().datetime().optional(),
  certificateLink: z.string().min(1).optional(),
});

// Project Schema
export const ProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).optional(),
  technologies: z.array(z.string().min(1)),
  role: z.string().min(1),
  link: z.string().url().optional(),
});

// Award Schema
export const AwardSchema = z.object({
  name: z.string().min(1),
  organization: z.string().min(1),
  year: z.number().int(),
  description: z.string().min(1).optional(),
});
export const UpdateAwardSchema = z.object({
  name: z.string().min(1).optional(),
  organization: z.string().min(1).optional(),
  year: z.number().int().optional(),
  description: z.string().min(1).optional(),
});

// Language Schema
const LanguageSchema = z.object({
  name: z.string().min(1),
  proficiency: z.string().min(1),
});
const UpdateLanguageSchema = z.object({
  name: z.string().min(1).optional(),
  proficiency: z.string().min(1).optional(),
});

// Resume Schema
export const ResumeSchema = z.object({
  templateId: z.string().min(1),
  personalInfo: PersonalInfoSchema,
  profileSummary: z.string().min(1),
  hobby: z.array(z.string().min(1)),
  design: DesignSchema,
  language: z.array(LanguageSchema),
});
export const UpdateResumeSchema = z.object({
  personalInfo: UpdatePersonalInfoSchema.optional(),
  profileSummary: z.string().min(1).optional(),
  hobby: z.array(z.string().min(1)).optional(),
  design: UpdateDesignSchema.optional(),
  language: z.array(UpdateLanguageSchema).optional(),
});

export const CreateResumeSchema = z.object({
  body: z.object({
    resumeData: ResumeSchema,
    workExperienceData: WorkExperienceSchema,
    educationData: EducationSchema,
    skillData: SkillSchema,
    certificationData: CertificationSchema,
    projectData: ProjectSchema,
    awardData: AwardSchema,
  }),
});
