import {
  Award,
  Certification,
  Education,
  Language,
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
    languageData,
  }: {
    resumeData: Resume;
    workExperienceData: WorkExperience;
    educationData: Education;
    skillData: Skill;
    certificationData: Certification;
    projectData: Project;
    awardData: Award;
    languageData: Language;
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
    await transactionClient.language.create({
      data: { ...languageData, resumeId },
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
        Language: true,
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
      Language: true,
    },
  });
  return result;
};
export const resumeServices = {
  createResumeIntoDB,
  getResumeFromDB,
};
