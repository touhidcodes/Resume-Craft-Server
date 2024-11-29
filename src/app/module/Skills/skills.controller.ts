import catchAsync from '../../shared/catchAsync';
import { sendRes } from '../../shared/sendResponse';
import { skillServices } from './skills.service';
import httpStatus from 'http-status';
const addSkills =
  // Add multiple skills to a category
  catchAsync(async (req, res) => {
    try {
      const { category, skills } = req.body; // e.g., { category: "Programming Languages", skills: ["Go", "Ruby"] }
      const { skillId } = req.params;

      if (!category || !skills || !Array.isArray(skills)) {
        return sendRes(res, {
          statusCode: httpStatus.BAD_REQUEST,
          success: false,
          message: 'Category and an array of skills are required.',
          data: null,
        });
      }

      const updatedSkill = await skillServices.addSkills(
        skillId,
        category,
        skills
      );
      sendRes(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Skills added successfully!',
        data: updatedSkill,
      });
    } catch (error) {
      sendRes(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: `${error}`,
        data: null,
      });
    }
  });

// Remove multiple skills from a category
const removeSkills = catchAsync(async (req, res) => {
  try {
    const { category, skills } = req.body; // e.g., { category: "Programming Languages", skills: ["Python", "Ruby"] }
    const { skillId } = req.params;

    if (!category || !skills || !Array.isArray(skills)) {
      return sendRes(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Category and an array of skills are required.',
        data: null,
      });
    }

    const updatedSkill = await skillServices.removeSkills(
      skillId,
      category,
      skills
    );
    sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Skills removed successfully!',
      data: updatedSkill,
    });
  } catch (error) {
    sendRes(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: `${error}`,
      data: null,
    });
  }
});

export const skillControllers = {
  addSkills,
  removeSkills,
};
