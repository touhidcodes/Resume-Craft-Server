import { Award } from '@prisma/client';
import { prisma } from '../../../app';

const createAwardIntoDB = async (award: Award) => {
  const result = await prisma.award.create({
    data: award,
  });
  return result;
};
const updateAwardIntoDB = async (
  id: string,
  award: Partial<Award>
) => {
  await prisma.award.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.award.update({
    where: { id },
    data: award,
  });
  return result;
};
const getAAwardFromDB = async (id: string) => {
  const result = await prisma.award.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};
const getAllAwardOfAResumeFromDB = async (resumeId: string) => {
  const result = await prisma.award.findMany({
    where: { resumeId },
  });
  return result;
};
const deleteAAwardFromDB = async (id: string) => {
  const result = await prisma.award.delete({
    where: { id },
  });
  return result;
};
export const awardServices = {
  createAwardIntoDB,
  updateAwardIntoDB,
  getAAwardFromDB,
  getAllAwardOfAResumeFromDB,
  deleteAAwardFromDB,
};
