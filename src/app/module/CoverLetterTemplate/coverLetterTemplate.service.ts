import { CoverLetterTemplate } from '@prisma/client';
import { prisma } from '../../../app';

const createCoverLetterTemplateIntoDB = async (
  coverLatterTemplate: CoverLetterTemplate
) => {
  const result = await prisma.coverLetterTemplate.create({ data: coverLatterTemplate });
  return result;
};
const getACoverLetterTemplateFromDB = async (id: string) => {
  const result = await prisma.coverLetterTemplate.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};
const getAllCoverLetterTemplateFromDB = async () => {
  const result = await prisma.coverLetterTemplate.findMany({});
  return result;
};


export const coverLetterTemplateServices = {
  createCoverLetterTemplateIntoDB,
  getACoverLetterTemplateFromDB,
  getAllCoverLetterTemplateFromDB,
};
