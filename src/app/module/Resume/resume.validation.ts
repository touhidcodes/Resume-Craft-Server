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
  fullName: z.string().optional(),
  jobTitle: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
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
  fontSize: z.string().optional(),
  color: z.string().optional(),
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
  font: z.string().optional(),
  themeColor: z.string().optional(),
  backgroundColor: z.string().optional(),
  sectionStyles: UpdateSectionStylesSchema.optional(),
});

// Work Experience Schema
const WorkExperienceSchema = z.object({
  companyName: z.string().min(1),
  jobTitle: z.string().min(1),
  startDate: z.string(),
  endDate: z.string().optional(),
  location: z.string().min(1),
  responsibilities: z.string(),
});

export const CreateWorkExperienceSchema = z.object({
  body: z.object({
    resumeId: z.string(),
    companyName: z.string().min(1),
    jobTitle: z.string().min(1),
    startDate: z.string(),
    endDate: z.string().optional(),
    location: z.string().min(1),
    responsibilities: z.string(),
  }),
});
export const UpdateWorkExperienceSchema = z.object({
  companyName: z.string().optional(),
  jobTitle: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  location: z.string().optional(),
  responsibilities: z.string().optional(),
});

// Education Schema
const EducationSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  startDate: z.string(),
  endDate: z.string().optional(),
  location: z.string().min(1),
  description: z.string().optional(),
});

export const CreateEducationSchema = z.object({
  body: z.object({
    resumeId: z.string(),
    institution: z.string().min(1),
    degree: z.string().min(1),
    startDate: z.string(),
    endDate: z.string().optional(),
    location: z.string().min(1),
    description: z.string().optional(),
  }),
});
export const UpdateEducationSchema = z.object({
  institution: z.string().optional(),
  degree: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
});

// Skill Schema
export const CreateSkillSchema = z.object({
  body: z.object({
    resumeId: z.string(),
    category: z.string().min(1),
    skills: z.array(z.string().min(1)),
  }),
});
const SkillSchema = z.object({
  category: z.string().min(1),
  skills: z.array(z.string().min(1)),
});
export const UpdateSkillSchema = z.object({
  category: z.string().optional(),
  skills: z.array(z.string().min(1)).optional(),
});

// Certification Schema
export const CreateCertificationSchema = z.object({
  body: z.object({
    resumeId: z.string(),
    name: z.string().min(1),
    issuer: z.string().min(1),
    issueDate: z.string(),
    expirationDate: z.string().optional(),
    certificateLink: z.string().optional(),
  }),
});
const CertificationSchema = z.object({
  name: z.string().min(1),
  issuer: z.string().min(1),
  issueDate: z.string(),
  expirationDate: z.string().optional(),
  certificateLink: z.string().optional(),
});
export const UpdateCertificationSchema = z.object({
  name: z.string().optional(),
  issuer: z.string().optional(),
  issueDate: z.string().optional(),
  expirationDate: z.string().optional(),
  certificateLink: z.string().optional(),
});

// Project Schema
export const CreateProjectSchema = z.object({
  body: z.object({
    resumeId: z.string(),
    name: z.string().min(1),
    description: z.string().optional(),
    technologies: z.array(z.string().min(1)),
    role: z.string().min(1),
    link: z.string().url().optional(),
  }),
});
export const UpdateProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  technologies: z.array(z.string().min(1)),
  role: z.string().min(1),
  link: z.string().url().optional(),
});
const ProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  technologies: z.array(z.string().min(1)),
  role: z.string().min(1),
  link: z.string().url().optional(),
});

// Award Schema
export const CreateAwardSchema = z.object({
  body: z.object({
    resumeId: z.string(),
    name: z.string().min(1),
    organization: z.string().min(1),
    year: z.number().int(),
    description: z.string().optional(),
  }),
});
const AwardSchema = z.object({
  name: z.string().min(1),
  organization: z.string().min(1),
  year: z.number().int(),
  description: z.string().optional(),
});
export const UpdateAwardSchema = z.object({
  name: z.string().optional(),
  organization: z.string().optional(),
  year: z.number().int().optional(),
  description: z.string().optional(),
});

// Language Schema
const LanguageSchema = z.object({
  name: z.string().min(1),
  proficiency: z.string().min(1),
});
const UpdateLanguageSchema = z.object({
  name: z.string().optional(),
  proficiency: z.string().optional(),
});
const SectionSchema = z.object({
  name: z.string(),
  isActive: z.boolean(),
});
const UpdateSectionSchema = z.object({
  name: z.string().optional(),
  isActive: z.boolean().optional(),
});
// Resume Schema
export const ResumeSchema = z.object({
  templateId: z.string().min(1),
  personalInfo: PersonalInfoSchema,
  profileSummary: z.string().min(1),
  hobby: z.array(z.string().min(1)),
  design: DesignSchema,
  language: z.array(LanguageSchema),
  allSection: z.array(SectionSchema),
});
export const UpdateResumeSchema = z.object({
  personalInfo: UpdatePersonalInfoSchema.optional(),
  profileSummary: z.string().optional(),
  hobby: z.array(z.string().min(1)).optional(),
  design: UpdateDesignSchema.optional(),
  language: z.array(UpdateLanguageSchema).optional(),
  allSection: z.array(UpdateSectionSchema).optional(),
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
