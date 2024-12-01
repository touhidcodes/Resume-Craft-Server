import { prisma } from '../../../app';

const addOrUpdateSkillCategory = async (
  resumeId: string,
  category: string,
  newSkills: string[]
) => {
  // Find the existing skill category for this resume
  const existingSkill = await prisma.skill.findFirst({
    where: { resumeId, category },
  });

  if (existingSkill) {
    // Merge new skills with the existing skills, avoiding duplicates
    const updatedSkills = Array.from(
      new Set([...existingSkill.skills, ...newSkills])
    );

    // Update the skills array in the database
    const result = await prisma.skill.update({
      where: { id: existingSkill.id },
      data: { skills: updatedSkills },
    });
    return result;
  }

  // If the category does not exist, create a new one
  return prisma.skill.create({
    data: {
      resumeId,
      category,
      skills: newSkills,
    },
  });
};

const removeSpecificSkill = async (
  skillId: string,

  skillsToRemove: string[]
) => {
  const existingSkill = await prisma.skill.findFirst({
    where: { id: skillId },
  });

  if (!existingSkill) {
    throw new Error('Skill category not found.');
  }

  const updatedSkills = existingSkill.skills.filter(
    (skill) => !skillsToRemove.includes(skill)
  );

  const result = await prisma.skill.update({
    where: { id: existingSkill.id },
    data: { skills: updatedSkills },
  });
  return result;
};

const deleteSkillCategoryFromDB = async (id: string) => {
  const result = await prisma.skill.delete({
    where: { id },
  });
  return result;
};

export const SkillServices = {
  addOrUpdateSkillCategory,

  removeSpecificSkill,
  deleteSkillCategoryFromDB,
};
