import { prisma } from '../../../app';
import { AppError } from '../../errors/appErrors';
import httpStatus from 'http-status';
const addSkills = async (
  skillId: string,
  category: string,
  newSkills: string[]
) => {
  const skill = await prisma.skill.findUniqueOrThrow({
    where: { id: skillId },
  });

  const updatedItems = skill.items.map((item) => {
    if (item.category === category) {
      const existingSkills = new Set(item.skills);
      const duplicateSkills = newSkills.filter((skill) =>
        existingSkills.has(skill)
      );

      if (duplicateSkills.length > 0) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Some skills already exist in category "${category}": ${duplicateSkills.join(
            ', '
          )}.`
        );
      }

      return {
        ...item,
        skills: [...item.skills, ...newSkills], // Add new skills
      };
    }
    return item;
  });

  return prisma.skill.update({
    where: { id: skillId },
    data: { items: updatedItems },
  });
};

// Remove multiple skills from a category
const removeSkills = async (
  skillId: string,
  category: string,
  skillsToRemove: string[]
) => {
  const skill = await prisma.skill.findUniqueOrThrow({
    where: { id: skillId },
  });

  const updatedItems = skill.items.map((item) => {
    if (item.category === category) {
      const existingSkills = new Set(item.skills);
      const missingSkills = skillsToRemove.filter(
        (skill) => !existingSkills.has(skill)
      );

      if (missingSkills.length > 0) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          `Some skills not found in category "${category}": ${missingSkills.join(
            ', '
          )}.`
        );
      }

      return {
        ...item,
        skills: item.skills.filter((skill) => !skillsToRemove.includes(skill)),
      };
    }
    return item;
  });

  return prisma.skill.update({
    where: { id: skillId },
    data: { items: updatedItems },
  });
};

export const skillServices = {
  addSkills,
  removeSkills,
};
