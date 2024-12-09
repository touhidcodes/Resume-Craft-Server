import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import { sendRes } from '../../shared/sendResponse';
import { resumeServices } from './resume.service';

const createResume = catchAsync(async (req, res) => {
  const result = await resumeServices.createResumeIntoDB(req.body, req.user);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Resume Created successfully',
    data: result,
  });
});
const createDuplicateResume = catchAsync(async (req, res) => {
  const result = await resumeServices.createDuplicateResumeIntoDB(
    req.params.resumeId,
    req.user.userId
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Resume Created successfully',
    data: result,
  });
});
const getResume = catchAsync(async (req, res) => {
  const result = await resumeServices.getResumeFromDB(
    req.params.resumeId,
    req.user.userId
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Resume found successfully',
    data: result,
  });
});
const getAllUserResume = catchAsync(async (req, res) => {
  const result = await resumeServices.geAllUserResumeFromDB(req.user.userId);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Resume found successfully',
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
    message: 'Resume update successfully',
    data: result,
  });
});

const deleteResume = catchAsync(async (req, res) => {
  const result = await resumeServices.deleteUserResumeFromDB(
    req.params.resumeId,
    req.user.userId
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Resume Deleted successfully',
    data: result,
  });
});

export const resumeControllers = {
  createResume,
  createDuplicateResume,
  getResume,
  getAllUserResume,
  updateResume,
  deleteResume,
};
