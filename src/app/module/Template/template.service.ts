import {
  Award,
  Certification,
  Education,
  Hobby,
  Language,
  Project,
  Skill,
  Template,
  WorkExperience,
} from "@prisma/client";
import { prisma } from "../../../app";
import { JwtPayload } from "jsonwebtoken";

export const createTemplateIntoDB = async (
  {
    templateData,
    workExperienceData,
    educationData,
    skillData,
    certificationData,
    projectData,
    awardData,
    languageData,
    hobbyData,
  }: {
    templateData: Template;
    workExperienceData: WorkExperience;
    educationData: Education;
    skillData: Skill;
    certificationData: Certification;
    projectData: Project;
    awardData: Award;
    languageData: Language;
    hobbyData: Hobby;
  },
  decodeToken: JwtPayload
) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.findUniqueOrThrow({
      where: { id: decodeToken.userId },
    });
    const createdTemplate = await transactionClient.template.create({
      data: { ...templateData, userId: decodeToken.userId },
    });
    const templateId = createdTemplate.id;
    await transactionClient.workExperience.create({
      data: { ...workExperienceData, templateId },
    });
    await transactionClient.education.create({
      data: { ...educationData, templateId },
    });
    await transactionClient.skill.create({
      data: { ...skillData, templateId },
    });
    await transactionClient.hobby.create({
      data: { ...hobbyData, templateId },
    });
    await transactionClient.certification.create({
      data: { ...certificationData, templateId },
    });
    await transactionClient.project.create({
      data: { ...projectData, templateId },
    });
    await transactionClient.award.create({
      data: { ...awardData, templateId },
    });
    await transactionClient.language.create({
      data: { ...languageData, templateId },
    });

    return createdTemplate;
  });

  return result;
};
const getTemplateFromDB = async (id: string, userId: string) => {
  const result = prisma.template.findUniqueOrThrow({
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
      Hobby: true,
    },
  });
  return result;
};
export const templateServices = {
  createTemplateIntoDB,
  getTemplateFromDB,
};
