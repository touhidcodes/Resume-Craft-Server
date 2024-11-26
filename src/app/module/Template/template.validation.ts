import { z } from 'zod';

// Address Schema
const AddressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(1),
  country: z.string().min(1),
});

// Contact Schema
const ContactSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(1),
  website: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
});

// Personal Info Schema
const PersonalInfoSchema = z.object({
  fullName: z.string().min(1),
  jobTitle: z.string().min(1),
  contact: ContactSchema,
  address: AddressSchema,
});

// Style Schema
const StyleSchema = z.object({
  fontSize: z.string().min(1),
  color: z.string().min(1),
});

// Section Styles Schema
const SectionStylesSchema = z.object({
  header: StyleSchema,
  titles: StyleSchema,
});

// Design Schema
const DesignSchema = z.object({
  font: z.string().min(1),
  themeColor: z.string().min(1),
  backgroundColor: z.string().min(1),
  sectionStyles: SectionStylesSchema,
});

// Work Experience Item Schema
const WorkExperienceItemSchema = z.object({
  companyName: z.string().min(1),
  jobTitle: z.string().min(1),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  isCurrent: z.boolean(),
  location: z.string().min(1),
  responsibilities: z.array(z.string()),
});

// Work Experience Schema
export const WorkExperienceSchema = z.object({
  items: z.array(WorkExperienceItemSchema),
});

// Education Item Schema
const EducationItemSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  location: z.string().min(1),
  description: z.string().min(1),
});

// Education Schema
export const EducationSchema = z.object({
  items: z.array(EducationItemSchema),
});

// Skill Item Schema
const SkillItemSchema = z.object({
  category: z.string().min(1),
  skills: z.array(z.string().min(1)),
});

// Skill Schema
export const SkillSchema = z.object({
  items: z.array(SkillItemSchema),
});

// Certification Item Schema
const CertificationItemSchema = z.object({
  name: z.string().min(1),
  issuer: z.string().min(1),
  issueDate: z.string().datetime(),
  expirationDate: z.string().datetime().optional(),
  credentialId: z.string().min(1).optional(),
});

// Certification Schema
export const CertificationSchema = z.object({
  items: z.array(CertificationItemSchema),
});

// Project Item Schema
const ProjectItemSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  technologies: z.array(z.string().min(1)),
  role: z.string().min(1),
  link: z.string().url().optional(),
});

// Project Schema
export const ProjectSchema = z.object({
  items: z.array(ProjectItemSchema),
});

// Award Item Schema
const AwardItemSchema = z.object({
  name: z.string().min(1),
  organization: z.string().min(1),
  year: z.number().int(),
  description: z.string().min(1),
});

// Award Schema
export const AwardSchema = z.object({
  items: z.array(AwardItemSchema),
});

// Language Item Schema
const LanguageItemSchema = z.object({
  name: z.string().min(1),
  proficiency: z.string().min(1),
});

// Language Schema
export const LanguageSchema = z.object({
  items: z.array(LanguageItemSchema),
});

// Hobby Schema
export const HobbySchema = z.object({
  items: z.array(z.string().min(1)),
});

// Template Schema
export const TemplateSchema = z.object({
  templateId: z.string().min(1),
  personalInfo: PersonalInfoSchema,
  profileSummary: z.string().min(1),
  design: DesignSchema,
});

export const CreateTemplateSchema = z.object({
  body: z.object({
    templateData: TemplateSchema,
    workExperienceData: WorkExperienceSchema,
    educationData: EducationSchema,
    skillData: SkillSchema,
    certificationData: CertificationSchema,
    projectData: ProjectSchema,
    awardData: AwardSchema,
    languageData: LanguageSchema,
    hobbyData: HobbySchema,
  }),
});
