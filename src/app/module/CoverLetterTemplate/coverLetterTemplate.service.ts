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
  const popularTemplates = await prisma.coverLetter.aggregateRaw({
    pipeline: [
      { $group: { _id: '$templateId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ],
  });
  const allTemplateData = Promise.all(
    (
      popularTemplates as unknown as {
        _id: {
          $oid: string;
        };
        count: number;
      }[]
    ).map(async ({ _id, count }) => {
      const templateDetails = await prisma.coverLetterTemplate.findUnique({
        where: { id: _id.$oid, isDeleted: false },
        select: {
          id: true,
          name: true,
          image: true,
        },
      });

      return {
        ...templateDetails,
        usageCount: count,
      };
    })
  );

  return (await allTemplateData).filter(
    ({ id }) =>
      // eslint-disable-next-line no-undefined
      id !== undefined
  );
};

const deleteCoverLetterTemplateFromDB = async (id: string) => {
  await prisma.coverLetterTemplate.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.template.update({
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
