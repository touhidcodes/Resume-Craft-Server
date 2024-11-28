import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import { sendRes } from '../../shared/sendResponse';
import { awardServices } from './award.service';


const createAward = catchAsync(async (req, res) => {
  const result = await awardServices.createAwardIntoDB(
    req.body
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Award created successfully',
    data: result,
  });
});
const updateAward = catchAsync(async (req, res) => {
  const result = await awardServices.updateAwardIntoDB(
    req.params.id,
    req.body
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Award Update successfully',
    data: result,
  });
});
const getAAward = catchAsync(async (req, res) => {
  const result = await awardServices.getAAwardFromDB(
    req.params.id
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Award found successfully',
    data: result,
  });
});
const getAllAwardOfAResume = catchAsync(async (req, res) => {
  const result =
    await awardServices.getAllAwardOfAResumeFromDB(
      req.params.resumeId
    );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Award found successfully',
    data: result,
  });
});
const deleteAward = catchAsync(async (req, res) => {
  const result = await awardServices.deleteAAwardFromDB(
    req.params.id
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Award removed successfully',
    data: result,
  });
});

export const awardControllers = {
  createAward,
  updateAward,
  getAAward,
  getAllAwardOfAResume,
  deleteAward,
};
