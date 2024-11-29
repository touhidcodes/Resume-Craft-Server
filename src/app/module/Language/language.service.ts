import { prisma } from '../../../app';
import { AppError } from '../../errors/appErrors';
import httpStatus from 'http-status';
// Push a new language
const pushLanguage = async (
  languageId: string,
  newLanguage: { name: string; proficiency: string }
) => {
  const language = await prisma.language.findUniqueOrThrow({
    where: { id: languageId },
  });

  if (language.items.some((item) => item.name === newLanguage.name)) {
    throw new AppError(
      httpStatus.FOUND,
      `Language "${newLanguage.name}" already exists.`
    );
  }

  const updatedItems = [...language.items, newLanguage];

  return prisma.language.update({
    where: { id: languageId },
    data: { items: updatedItems },
  });
};

// Delete a language
const deleteLanguage = async (languageId: string, languageName: string) => {
  const language = await prisma.language.findUniqueOrThrow({
    where: { id: languageId },
  });

  const updatedItems = language.items.filter(
    (item) => item.name !== languageName
  );

  if (updatedItems.length === language.items.length) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Language "${languageName}" not found.`
    );
  }

  return prisma.language.update({
    where: { id: languageId },
    data: { items: updatedItems },
  });
};

// Update language proficiency
const updateLanguageProficiency = async (
  languageId: string,
  languageName: string,
  newProficiency: string
) => {
  const language = await prisma.language.findUniqueOrThrow({
    where: { id: languageId },
  });

  const updatedItems = language.items.map((item) => {
    if (item.name === languageName) {
      return { ...item, proficiency: newProficiency };
    }
    return item;
  });

  if (!language.items.some((item) => item.name === languageName)) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Language "${languageName}" not found.`
    );
  }

  return prisma.language.update({
    where: { id: languageId },
    data: { items: updatedItems },
  });
};

export const languageServices = {
  pushLanguage,
  deleteLanguage,
  updateLanguageProficiency,
};
