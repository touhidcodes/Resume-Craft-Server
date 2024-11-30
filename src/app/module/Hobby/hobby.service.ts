import { prisma } from '../../../app';

const pushHobbyItems = async (
  userId: string,
  resumeId: string,
  newItems: string[]
) => {
  const resume = await prisma.resume.findFirstOrThrow({
    where: { id: resumeId, userId },
  });

  const updatedHobbies = [...resume.hobby, ...newItems];

  const result = await prisma.resume.update({
    where: { id: resumeId },
    data: { hobby: updatedHobbies },
  });
  return result;
};

const popSpecificHobbyItem = async (
  userId: string,
  resumeId: string,
  itemToRemove: string
) => {
  const resume = await prisma.resume.findFirstOrThrow({
    where: { id: resumeId, userId },
  });

  const itemIndex = resume.hobby.indexOf(itemToRemove);

  if (itemIndex === -1) {
    throw new Error(`Hobby "${itemToRemove}" not found.`);
  }

  const updatedHobbies = [
    ...resume.hobby.slice(0, itemIndex),
    ...resume.hobby.slice(itemIndex + 1),
  ];


  const result = await prisma.resume.update({
    where: { id: resumeId },
    data: { hobby: updatedHobbies },
  });
  return result;
};

export const HobbyService = {
  pushHobbyItems,
  popSpecificHobbyItem,
};
