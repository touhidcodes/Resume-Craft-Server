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
const getResume = catchAsync(async (req, res) => {
  const result = await resumeServices.getResumeFromDB(
    req.params.ResumeId,
    req.user.userId
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Resume Created successfully',
    data: result,
  });
});

export const resumeControllers = {
  createResume,
  getResume,
};
