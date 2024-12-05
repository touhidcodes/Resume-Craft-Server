import { Project } from '@prisma/client';
import { prisma } from '../../../app';

const createProjectIntoDB = async (project: Project) => {
  const result = await prisma.project.create({
    data: project,
  });
  return result;
};
const updateProjectIntoDB = async (
  id: string,
  project: Partial<Project>
) => {
  await prisma.project.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.project.update({
    where: { id },
    data: project,
  });
  return result;
};
const getAProjectFromDB = async (id: string) => {
  const result = await prisma.project.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};
const getAllProjectOfAResumeFromDB = async (resumeId: string) => {
  const result = await prisma.project.findMany({
    where: { resumeId },
  });
  return result;
};
const deleteAProjectFromDB = async (id: string) => {
  const result = await prisma.project.delete({
    where: { id },
  });
  return result;
};


export const projectServices = {
  createProjectIntoDB,
  updateProjectIntoDB,
  getAProjectFromDB,
  getAllProjectOfAResumeFromDB,
  deleteAProjectFromDB,
};
