// import { coverLetterData } from './coverLetter.demoData';

import { prisma } from '../../../app';
import { JwtPayload } from 'jsonwebtoken';
import { CoverLetter } from '@prisma/client';

export const createCoverLetterIntoDB = async (
  coverLetterData: CoverLetter,
  decodeToken: JwtPayload
) => {
  await prisma.user.findUniqueOrThrow({
    where: { id: decodeToken.userId },
  });
  const createdCoverLetter = await prisma.coverLetter.create({
    data: { ...coverLetterData, userId: decodeToken.userId },
  });

  return createdCoverLetter;
};
const getCoverLatterFromDB = async (id: string, userId: string) => {
  const result = await prisma.coverLetter.findUniqueOrThrow({
    where: {
      id,
      userId,
    },
  });
  return result;
};
const getUserAllCoverLetterFromDB = async (userId: string) => {
  const result = await prisma.coverLetter.findMany({
    where: {
      userId,
    },
  });
  return result;
};
const updateCoverLetterIntoDB = async (
  id: string,
  coverLetterUpdateData: Partial<CoverLetter>
) => {
  const coverLetterData = await prisma.coverLetter.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const { personalInfo, recipient, templateId, ...remainingCoverLetterData } =
    coverLetterUpdateData;
  if (templateId) {
    await prisma.coverLetterTemplate.findUniqueOrThrow({
      where: { id: templateId },
    });
  }
  const modifiedUpdatedData = {
    ...remainingCoverLetterData,
    templateId: templateId,
    personalInfo: coverLetterData.personalInfo,
    recipient: coverLetterData.recipient,
  };

  if (personalInfo && Object.keys(personalInfo).length) {
    for (const [key, value] of Object.entries(personalInfo)) {
      modifiedUpdatedData.personalInfo[`${key as keyof typeof personalInfo}`] =
        value;
    }
  }
  if (recipient && Object.keys(recipient).length) {
    for (const [key, value] of Object.entries(recipient)) {
      modifiedUpdatedData.recipient[`${key as keyof typeof recipient}`] = value;
    }
  }

  const result = await prisma.coverLetter.update({
    where: { id },
    data: modifiedUpdatedData,
  });
  return result;
};
const deleteUserCoverLetterFromDB = async (id: string, userId: string) => {
  const result = await prisma.coverLetter.delete({
    where: {
      id,
      userId,
    },
  });
  return result;
};

export const coverLetterServices = {
  createCoverLetterIntoDB,
  getCoverLatterFromDB,
  getUserAllCoverLetterFromDB,
  updateCoverLetterIntoDB,
  deleteUserCoverLetterFromDB,
};
