import { CoverLetterTemplate } from '@prisma/client';
import { prisma } from '../../../app';

const createCoverLetterTemplateIntoDB = async (
  coverLatterTemplate: CoverLetterTemplate
) => {
  const result = await prisma.coverLetterTemplate.create({
    data: coverLatterTemplate,
  });
  return result;
};
const getACoverLetterTemplateFromDB = async (id: string) => {
  const result = await prisma.coverLetterTemplate.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  return result;
};
const getAllCoverLetterTemplateFromDB = async () => {
  const templates = await prisma.coverLetterTemplate.findMany({
    where: { isDeleted: false },
  });
  return Promise.all(
    templates.map(
      async ({ id, image, name, isDeleted, createdAt, updatedAt }) => {
        const usageCount = await prisma.coverLetter.count({
          where: { templateId: id },
        });
        return {
          id,
          image,
          name,
          isDeleted,
          createdAt,
          updatedAt,
          usageCount,
        };
      }
    )
  );
};

const deleteCoverLetterTemplateFromDB = async (id: string) => {
  await prisma.coverLetterTemplate.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.coverLetterTemplate.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });
  return result;
};
export const coverLetterTemplateServices = {
  createCoverLetterTemplateIntoDB,
  getACoverLetterTemplateFromDB,
  getAllCoverLetterTemplateFromDB,
  deleteCoverLetterTemplateFromDB,
};
