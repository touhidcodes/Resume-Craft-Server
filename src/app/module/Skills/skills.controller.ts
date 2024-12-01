import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import { sendRes } from '../../shared/sendResponse';
import { SkillServices } from './skills.service';

const addOrUpdateSkillCategory = catchAsync(async (req, res) => {
  const { resumeId } = req.params;
  const { category, skills } = req.body;

  // Validate input
  if (!category || !Array.isArray(skills) || skills.length === 0) {
    return sendRes(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Category and a non-empty array of skills are required.',
      data: null,
    });
  }

  // Add or update the skill category
  const updatedCategory = await SkillServices.addOrUpdateSkillCategory(
    resumeId,
    category,
    skills
  );

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill category updated successfully!',
    data: updatedCategory,
  });
});

const removeSpecificSkill = catchAsync(async (req, res) => {
  const { skillId } = req.params;
  const { skills } = req.body;

  // Validate input
  if (!Array.isArray(skills)) {
    return sendRes(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Category and an array of skills to remove are required.',
      data: null,
    });
  }

  // Delete the specific skills
  const updatedCategory = await SkillServices.removeSpecificSkill(
    skillId,

    skills
  );

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skills removed successfully!',
    data: updatedCategory,
  });
});

const deleteSkillCategoryFromDB = catchAsync(async (req, res) => {
  const result = await SkillServices.deleteSkillCategoryFromDB(
    req.params.skillId
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill Category removed successfully',
    data: result,
  });
});

export const SkillControllers = {
  addOrUpdateSkillCategory,

  removeSpecificSkill,
  deleteSkillCategoryFromDB,
};
