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
  if (!templateId) {
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
const deleteUserResumeFromDB = async (userId: string, resumeId: string) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.resume.findUniqueOrThrow({
      where: {
        userId,
        id: resumeId,
      },
    });
    const deleteResume = await transactionClient.resume.delete({
      where: {
        id: resumeId,
      },
    });
    await transactionClient.workExperience.deleteMany({ where: { resumeId } });
    await transactionClient.education.deleteMany({ where: { resumeId } });
    await transactionClient.skill.deleteMany({ where: { resumeId } });
    await transactionClient.certification.deleteMany({ where: { resumeId } });
    await transactionClient.project.deleteMany({ where: { resumeId } });
    await transactionClient.award.deleteMany({ where: { resumeId } });

    return deleteResume;
  });

  return result;
};
export const resumeServices = {
  createResumeIntoDB,
  getResumeFromDB,
  geAllUserResumeFromDB,
  updateResumeIntoDB,
  deleteUserResumeFromDB
};
