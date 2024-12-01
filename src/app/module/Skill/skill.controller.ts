import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import { sendRes } from '../../shared/sendResponse';
import { skillServices } from './skill.service';


const createSkill = catchAsync(async (req, res) => {
  const result = await skillServices.createSkillIntoDB(
    req.body
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill created successfully',
    data: result,
  });
});
const updateSkill = catchAsync(async (req, res) => {
  const result = await skillServices.updateSkillIntoDB(
    req.params.id,
    req.body
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill Update successfully',
    data: result,
  });
});
const getASkill = catchAsync(async (req, res) => {
  const result = await skillServices.getASkillFromDB(
    req.params.id
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill found successfully',
    data: result,
  });
});
const getAllSkillOfAResume = catchAsync(async (req, res) => {
  const result =
    await skillServices.getAllSkillOfAResumeFromDB(
      req.params.resumeId
    );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill found successfully',
    data: result,
  });
});
const deleteSkill = catchAsync(async (req, res) => {
  const result = await skillServices.deleteASkillFromDB(
    req.params.id
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill removed successfully',
    data: result,
  });
});

export const skillControllers = {
  createSkill,
  updateSkill,
  getASkill,
  getAllSkillOfAResume,
  deleteSkill,
};
