import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import { sendRes } from '../../shared/sendResponse';
import { coverLetterServices } from './coverLetter.service';

const createCoverLetter = catchAsync(async (req, res) => {
  const result = await coverLetterServices.createCoverLetterIntoDB(
    req.body,
    req.user
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cover Letter Created successfully',
    data: result,
  });
});
const getCoverLetter = catchAsync(async (req, res) => {
  const result = await coverLetterServices.getCoverLatterFromDB(
    req.params.coverLetterId,
    req.user.userId
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cover Letter found successfully',
    data: result,
  });
});
const getUserAllCoverLetter = catchAsync(async (req, res) => {
  const result = await coverLetterServices.getUserAllCoverLetterFromDB(
    req.user.userId
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Cover Letter found successfully',
    data: result,
  });
});
const updateCoverLetter = catchAsync(async (req, res) => {
  const result = await coverLetterServices.updateCoverLetterIntoDB(
    req.params.id,
    req.body
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cover Letter update successfully',
    data: result,
  });
});

const deleteUserCoverLetterFromDB = catchAsync(async (req, res) => {
  const result = await coverLetterServices.deleteUserCoverLetterFromDB(
    req.params.id,
    req.user.userId
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cover Letter Deleted successfully',
    data: result,
  });
});
const createDuplicateCoverLetter = catchAsync(async (req, res) => {
  const result = await coverLetterServices.createDuplicateCoverLetterIntoDB(
    req.params.coverLetterId,
    req.user.userId
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Resume Created successfully',
    data: result,
  });
});
export const coverLetterControllers = {
  createCoverLetter,
  createDuplicateCoverLetter,
  getCoverLetter,
  getUserAllCoverLetter,
  updateCoverLetter,
  deleteUserCoverLetterFromDB,
};
