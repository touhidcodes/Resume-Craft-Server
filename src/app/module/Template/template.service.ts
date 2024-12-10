import { Template } from '@prisma/client';
import { prisma } from '../../../app';

const createTemplateIntoDB = async (template: Template) => {
  const result = await prisma.template.create({ data: template });
  return result;
};
const getATemplateFromDB = async (id: string) => {
  const result = await prisma.template.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  return result;
};
const getAllTemplateFromDB = async () => {
  const popularTemplates = await prisma.resume.aggregateRaw({
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
      const templateDetails = await prisma.template.findUnique({
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
const deleteTemplateFromDB = async (id: string) => {
  await prisma.template.findUniqueOrThrow({
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
export const templateServices = {
  createTemplateIntoDB,
  getATemplateFromDB,
  getAllTemplateFromDB,
  deleteTemplateFromDB,
};
