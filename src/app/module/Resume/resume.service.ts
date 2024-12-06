import {
  Award,
  Certification,
  Education,
  Project,
  Resume,
  Skill,
  WorkExperience,
} from '@prisma/client';
import { prisma } from '../../../app';
import { JwtPayload } from 'jsonwebtoken';
import {
  awardData,
  certificationData,
  educationData,
  projectData,
  resumeData,
  skillData,
  workExperienceData,
} from './resume.demoData';

export const createResumeIntoDB = async (
  {
    resumeData,
    workExperienceData,
    educationData,
    skillData,
    certificationData,
    projectData,
    awardData,
  }: {
    resumeData: Resume;
    workExperienceData: WorkExperience;
    educationData: Education;
    skillData: Skill;
    certificationData: Certification;
    projectData: Project;
    awardData: Award;
  },
  decodeToken: JwtPayload
) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.findUniqueOrThrow({
      where: { id: decodeToken.userId },
    });
    const createdResume = await transactionClient.resume.create({
      data: { ...resumeData, userId: decodeToken.userId },
    });
    const resumeId = createdResume.id;
    await transactionClient.workExperience.create({
      data: { ...workExperienceData, resumeId },
    });
    await transactionClient.education.create({
      data: { ...educationData, resumeId },
    });
    await transactionClient.skill.create({
      data: { ...skillData, resumeId },
    });
    await transactionClient.certification.create({
      data: { ...certificationData, resumeId },
    });
    await transactionClient.project.create({
      data: { ...projectData, resumeId },
    });
    await transactionClient.award.create({
      data: { ...awardData, resumeId },
    });
    const fullResumeData = await transactionClient.resume.findUniqueOrThrow({
      where: {
        id: resumeId,
      },
      include: {
        WorkExperience: true,
        Education: true,
        Skill: true,
        Project: true,
        Certification: true,
        Award: true,
      },
    });
    return fullResumeData;
  });

  return result;
};
const getResumeFromDB = async (id: string, userId: string) => {
  const result = await prisma.resume.findUniqueOrThrow({
    where: {
      id,
      userId,
    },
    include: {
      WorkExperience: true,
      Education: true,
      Skill: true,
      Project: true,
      Certification: true,
      Award: true,
    },
  });
  return result;
};
const geAllUserResumeFromDB = async (userId: string) => {
  const result = await prisma.resume.findMany({
    where: {
      userId,
    },
    include: {
      WorkExperience: true,
      Education: true,
      Skill: true,
      Project: true,
      Certification: true,
      Award: true,
    },
  });
  return result;
};
const updateResumeIntoDB = async (
  id: string,
  resumeUpdateData: Partial<Resume>
) => {
  const resumeData = await prisma.resume.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const { design, personalInfo, templateId, ...remainingResumeData } =
    resumeUpdateData;
  if (templateId) {
    await prisma.template.findUniqueOrThrow({ where: { id: templateId } });
  }
  const modifiedUpdatedData = {
    ...remainingResumeData,
    templateId: templateId,
    personalInfo: resumeData.personalInfo,
    design: resumeData.design,
  };

  if (personalInfo && Object.keys(personalInfo).length) {
    for (const [key, value] of Object.entries(personalInfo)) {
      modifiedUpdatedData.personalInfo[`${key as keyof typeof personalInfo}`] =
        value;
    }
  }
  if (design && Object.keys(design).length) {
    const { sectionStyles, ...remainingDesignData } = design;

    for (const [key, value] of Object.entries(remainingDesignData)) {
      modifiedUpdatedData.design[`${key as keyof typeof remainingDesignData}`] =
        value;
    }
    if (sectionStyles && Object.keys(sectionStyles).length) {
      const { header, titles } = sectionStyles;
      if (header && Object.keys(header).length) {
        for (const [key, value] of Object.entries(header)) {
          modifiedUpdatedData.design.sectionStyles.header[
            `${key as keyof typeof header}`
          ] = value;
        }
      }
      if (titles && Object.keys(titles).length) {
        for (const [key, value] of Object.entries(titles)) {
          modifiedUpdatedData.design.sectionStyles.titles[
            `${key as keyof typeof titles}`
          ] = value;
        }
      }
    }
  }

  const result = await prisma.resume.update({
    where: { id },
    data: modifiedUpdatedData,
  });
  return result;
};
const deleteUserResumeFromDB = async (resumeId: string, userId: string) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.resume.findUniqueOrThrow({
      where: {
        userId,
        id: resumeId,
      },
    });

    await transactionClient.workExperience.deleteMany({ where: { resumeId } });
    await transactionClient.education.deleteMany({ where: { resumeId } });
    await transactionClient.skill.deleteMany({ where: { resumeId } });
    await transactionClient.certification.deleteMany({ where: { resumeId } });
    await transactionClient.project.deleteMany({ where: { resumeId } });
    await transactionClient.award.deleteMany({ where: { resumeId } });
    const deleteResume = await transactionClient.resume.delete({
      where: {
        id: resumeId,
      },
    });
    return deleteResume;
  });

  return result;
};
const resumeSectionCompletionStatusFromDB = async (id: string) => {
  const resume = await prisma.resume.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      WorkExperience: true,
      Education: true,
      Skill: true,
      Project: true,
      Certification: true,
      Award: true,
    },
  });
  let isWorkExperienceSectionComplete = false;
  let isEducationSectionComplete = false;
  let isCertificationSectionComplete = false;
  let isSkillSectionComplete = false;
  let isProjectSectionComplete = false;
  let isAwardSectionComplete = false;
  let isSummarySectionComplete = false;
  let isHeaderSectionComplete = false;
  let isLanguageSectionComplete = false;
  let isHobbySectionComplete = false;
  if (resume.WorkExperience.length > 0) {
    resume.WorkExperience.map(
      ({ companyName, jobTitle, location, startDate, responsibilities }) => {
        if (
          companyName === workExperienceData.companyName ||
          jobTitle === workExperienceData.jobTitle ||
          location === workExperienceData.location ||
          responsibilities === workExperienceData.responsibilities
        ) {
          isWorkExperienceSectionComplete = false;
        } else if (
          companyName === null ||
          jobTitle === null ||
          location === null ||
          startDate === null
        ) {
          isWorkExperienceSectionComplete = false;
        } else {
          isWorkExperienceSectionComplete = true;
        }
      }
    );
  }
  if (resume.Award.length > 0) {
    resume.Award.map(({ name, organization, year, description }) => {
      if (
        name === awardData.name ||
        organization === awardData.organization ||
        year === awardData.year ||
        description === awardData.description
      ) {
        isAwardSectionComplete = false;
      } else if (name === null || organization === null || year === null) {
        isAwardSectionComplete = false;
      } else {
        isAwardSectionComplete = true;
      }
    });
  }
  if (resume.Certification.length > 0) {
    resume.Certification.map(({ name, certificateLink, issueDate, issuer }) => {
      if (
        name === certificationData.name ||
        issuer === certificationData.issuer ||
        issueDate === certificationData.issueDate ||
        certificateLink === certificationData.certificateLink
      ) {
        isCertificationSectionComplete = false;
      } else if (name === null || issuer === null || issueDate === null) {
        isCertificationSectionComplete = false;
      } else {
        isCertificationSectionComplete = true;
      }
    });
  }

  //
  if (resume.Project.length > 0) {
    resume.Project.map(({ name, description, link, role, technologies }) => {
      if (
        name === projectData.name ||
        link === projectData.link ||
        role === projectData.role ||
        technologies === projectData.technologies ||
        description === projectData.description
      ) {
        isProjectSectionComplete = false;
      } else if (
        name === null ||
        link === null ||
        role === null ||
        technologies === null
      ) {
        isProjectSectionComplete = false;
      } else {
        isProjectSectionComplete = true;
      }
    });
  }
  if (resume.Education.length > 0) {
    resume.Education.map(
      ({ institution, location, startDate, degree, description, endDate }) => {
        if (
          institution === educationData.institution ||
          location === educationData.location ||
          degree === educationData.degree ||
          description === educationData.description ||
          (startDate === educationData.startDate &&
            endDate === educationData.endDate)
        ) {
          isEducationSectionComplete = false;
        } else if (
          institution === null ||
          location === null ||
          degree === null
        ) {
          isEducationSectionComplete = false;
        } else {
          isEducationSectionComplete = true;
        }
      }
    );
  }
  if (resume.Skill.length > 0) {
    resume.Skill.map(({ category, skills }) => {
      if (JSON.stringify(skills) === JSON.stringify(skillData.skills)) {
        isSkillSectionComplete = false;
      } else if (category === null || skills === null) {
        isSkillSectionComplete = false;
      } else {
        isSkillSectionComplete = true;
      }
    });
  }
  if (resume.personalInfo) {
    const {
      fullName,
      email,
      github,
      jobTitle,
      linkedin,
      location,
      phone,
      website,
    } = resume.personalInfo;
    if (
      fullName === resumeData.personalInfo.fullName ||
      email === resumeData.personalInfo.email ||
      github === resumeData.personalInfo.github ||
      jobTitle === resumeData.personalInfo.jobTitle ||
      linkedin === resumeData.personalInfo.linkedin ||
      location === resumeData.personalInfo.location ||
      phone === resumeData.personalInfo.phone ||
      website === resumeData.personalInfo.website
    ) {
      isHeaderSectionComplete = false;
    } else if (
      fullName === null ||
      email === null ||
      github === null ||
      jobTitle === null ||
      linkedin === null ||
      website === null ||
      phone === null ||
      location === null
    ) {
      isHeaderSectionComplete = false;
    } else {
      isHeaderSectionComplete = true;
    }
  }
  if (resume.hobby) {
    if (JSON.stringify(resume.hobby) === JSON.stringify(resumeData.hobby)) {
      isHobbySectionComplete = false;
    } else if (resume.hobby === null) {
      isHobbySectionComplete = false;
    } else {
      isHobbySectionComplete = true;
    }
  }
  if (resume.profileSummary) {
    if (resume.profileSummary === resumeData.profileSummary) {
      isSummarySectionComplete = false;
    } else if (resume.profileSummary === null) {
      isSummarySectionComplete = false;
    } else {
      isSummarySectionComplete = true;
    }
  }
  if (resume.language.length > 0) {
    resume.language.map(({ proficiency, name }) => {
      if (proficiency === null || name === null) {
        isLanguageSectionComplete = false;
      } else {
        isLanguageSectionComplete = true;
      }
    });
  }
  return {
    isAwardSectionComplete,
    isWorkExperienceSectionComplete,
    isCertificationSectionComplete,
    isProjectSectionComplete,
    isSkillSectionComplete,
    isEducationSectionComplete,
    isSummarySectionComplete,
    isHobbySectionComplete,
    isHeaderSectionComplete,
    isLanguageSectionComplete,
  };
};
export const resumeServices = {
  createResumeIntoDB,
  getResumeFromDB,
  geAllUserResumeFromDB,
  updateResumeIntoDB,
  deleteUserResumeFromDB,
  resumeSectionCompletionStatusFromDB,
};
