import { prisma } from '../../../app';

const pushHobbyItems = async (hobbyId: string, newItems: string[]) => {
  console.log(hobbyId);
  const hobby = await prisma.hobby.findUniqueOrThrow({
    where: { id: hobbyId },
  });
  const updatedItems = [...hobby.items, ...newItems];

  return prisma.hobby.update({
    where: { id: hobbyId },
    data: { items: updatedItems },
  });
};

const popSpecificHobbyItem = async (hobbyId: string, itemToRemove: string) => {
  const hobby = await prisma.hobby.findUniqueOrThrow({
    where: { id: hobbyId },
  });

  const itemIndex = hobby.items.indexOf(itemToRemove);

  if (itemIndex === -1) {
    throw new Error(`Item "${itemToRemove}" not found.`);
  }

  const updatedItems = [
    ...hobby.items.slice(0, itemIndex),
    ...hobby.items.slice(itemIndex + 1),
  ];

  return prisma.hobby.update({
    where: { id: hobbyId },
    data: { items: updatedItems },
  });
};

export const HobbyService = {
  pushHobbyItems,
  popSpecificHobbyItem,
};
