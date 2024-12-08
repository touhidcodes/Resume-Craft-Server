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
  const result = await prisma.template.findMany({
    where: { isDeleted: false },
  });
  return result;
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
