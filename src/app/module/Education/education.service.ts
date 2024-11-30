import { Education } from '@prisma/client';
import { prisma } from '../../../app';

const createEducationIntoDB = async (education: Education) => {
  const result = await prisma.education.create({
    data: education,
  });
  return result;
};
const updateEducationIntoDB = async (
  id: string,
  education: Partial<Education>
) => {
  await prisma.education.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.education.update({
    where: { id },
    data: education,
  });
  return result;
};
const getAEducationFromDB = async (id: string) => {
  const result = await prisma.education.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};
const getAllEducationOfAResumeFromDB = async (resumeId: string) => {
  const result = await prisma.education.findMany({
    where: { resumeId },
  });
  return result;
};
const deleteAEducationFromDB = async (id: string) => {
  const result = await prisma.education.delete({
    where: { id },
  });
  return result;
};


export const educationServices = {
  createEducationIntoDB,
  updateEducationIntoDB,
  getAEducationFromDB,
  getAllEducationOfAResumeFromDB,
  deleteAEducationFromDB,
};
