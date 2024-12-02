import { Skill } from '@prisma/client';
import { prisma } from '../../../app';

const createSkillIntoDB = async (skill: Skill) => {
  const result = await prisma.skill.create({
    data: skill,
  });
  return result;
};
const updateSkillIntoDB = async (
  id: string,
  skill: Partial<Skill>
) => {
  await prisma.skill.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.skill.update({
    where: { id },
    data: skill,
  });
  return result;
};
const getASkillFromDB = async (id: string) => {
  const result = await prisma.skill.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};
const getAllSkillOfAResumeFromDB = async (resumeId: string) => {
  const result = await prisma.skill.findMany({
    where: { resumeId },
  });
  return result;
};
const deleteASkillFromDB = async (id: string) => {
  const result = await prisma.skill.delete({
    where: { id },
  });
  return result;
};


export const skillServices = {
  createSkillIntoDB,
  updateSkillIntoDB,
  getASkillFromDB,
  getAllSkillOfAResumeFromDB,
  deleteASkillFromDB,
};
