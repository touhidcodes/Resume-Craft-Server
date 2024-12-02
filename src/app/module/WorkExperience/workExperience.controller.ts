import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import { sendRes } from '../../shared/sendResponse';
import { workExperienceServices } from './workExperience.service';

const createWorkExperience = catchAsync(async (req, res) => {
  const result = await workExperienceServices.createWorkExperienceIntoDB(
    req.body
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Work Experience created successfully',
    data: result,
  });
});
const updateWorkExperience = catchAsync(async (req, res) => {
  const result = await workExperienceServices.updateWorkExperienceIntoDB(
    req.params.id,
    req.body
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Work Experience Update successfully',
    data: result,
  });
});
const getAWorkExperience = catchAsync(async (req, res) => {
  const result = await workExperienceServices.getAWorkExperienceFromDB(
    req.params.id
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Work Experience found successfully',
    data: result,
  });
});
const getAllWorkExperienceOfAResume = catchAsync(async (req, res) => {
  const result =
    await workExperienceServices.getAllWorkExperienceOfAResumeFromDB(
      req.params.resumeId
    );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Work Experience found successfully',
    data: result,
  });
});
const deleteWorkExperience = catchAsync(async (req, res) => {
  const result = await workExperienceServices.deleteAWorkExperienceFromDB(
    req.params.id
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Work Experience removed successfully',
    data: result,
  });
});

export const workExperienceControllers = {
  createWorkExperience,
  updateWorkExperience,
  getAWorkExperience,
  getAllWorkExperienceOfAResume,
  deleteWorkExperience,
};
