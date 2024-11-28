import { Template } from '@prisma/client';
import { prisma } from '../../../app';

const createTemplateIntoDB = async (template: Template) => {
  const result = prisma.template.create({ data: template });
  return result;
};
const getATemplateFromDB = async (id: string) => {
  const result = prisma.template.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};
const getAllTemplateFromDB = async () => {
  const result = prisma.template.findMany({});
  return result;
};
export const templateServices = {
  createTemplateIntoDB,
  getATemplateFromDB,
  getAllTemplateFromDB,
};
