import { Certification } from '@prisma/client';
import { prisma } from '../../../app';

const createCertificationIntoDB = async (certification: Certification) => {
  const result = await prisma.certification.create({
    data: certification,
  });
  return result;
};
const updateCertificationIntoDB = async (
  id: string,
  certification: Partial<Certification>
) => {
  await prisma.certification.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.certification.update({
    where: { id },
    data: certification,
  });
  return result;
};
const getACertificationFromDB = async (id: string) => {
  const result = await prisma.certification.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};
const getAllCertificationOfAResumeFromDB = async (resumeId: string) => {
  const result = await prisma.certification.findMany({
    where: { resumeId },
  });
  return result;
};
const deleteACertificationFromDB = async (id: string) => {
  const result = await prisma.certification.delete({
    where: { id },
  });
  return result;
};
export const certificationServices = {
  createCertificationIntoDB,
  updateCertificationIntoDB,
  getACertificationFromDB,
  getAllCertificationOfAResumeFromDB,
  deleteACertificationFromDB,
};
