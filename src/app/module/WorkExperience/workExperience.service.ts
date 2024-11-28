import { WorkExperience } from '@prisma/client';
import { prisma } from '../../../app';

const createWorkExperienceIntoDB = async (workExperience: WorkExperience) => {
  const result = await prisma.workExperience.create({
    data: workExperience,
  });
  return result;
};
const updateWorkExperienceIntoDB = async (
  id: string,
  workExperience: Partial<WorkExperience>
) => {
  await prisma.workExperience.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.workExperience.update({
    where: { id },
    data: workExperience,
  });
  return result;
};
const getAWorkExperienceFromDB = async (id: string) => {
  const result = await prisma.workExperience.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};
const getAllWorkExperienceOfAResumeFromDB = async (resumeId: string) => {
  const result = await prisma.workExperience.findMany({
    where: { resumeId },
  });
  return result;
};
const deleteAWorkExperienceFromDB = async (id: string) => {
  const result = await prisma.workExperience.delete({
    where: { id },
  });
  return result;
};
export const workExperienceServices = {
  createWorkExperienceIntoDB,
  updateWorkExperienceIntoDB,
  getAWorkExperienceFromDB,
  getAllWorkExperienceOfAResumeFromDB,
  deleteAWorkExperienceFromDB,
};
