import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import { sendRes } from '../../shared/sendResponse';
import { resumeServices } from './resume.service';

const createResume = catchAsync(async (req, res) => {
  const result = await resumeServices.createResumeIntoDB(req.body, req.user);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Resume created successfully',
    data: result,
  });
});
const getResume = catchAsync(async (req, res) => {
  const result = await resumeServices.getResumeFromDB(
    req.params.ResumeId,
    req.user.userId
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Resume retrieved successfully',
    data: result,
  });
});
const getAllUserResume = catchAsync(async (req, res) => {
  const result = await resumeServices.geAllUserResumeFromDB(req.user.userId);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Resume retrieved successfully',
    data: result,
  });
});
const updateResume = catchAsync(async (req, res) => {
  const result = await resumeServices.updateResumeIntoDB(
    req.params.id,
    req.body
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Resume updated successfully',
    data: result,
  });
});

export const resumeControllers = {
  createResume,
  getResume,
  getAllUserResume,
  updateResume,
};
