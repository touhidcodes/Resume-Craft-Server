import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import { sendRes } from '../../shared/sendResponse';
import { educationServices } from './education.service';


const createEducation = catchAsync(async (req, res) => {
  const result = await educationServices.createEducationIntoDB(
    req.body
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Education created successfully',
    data: result,
  });
});
const updateEducation = catchAsync(async (req, res) => {
  const result = await educationServices.updateEducationIntoDB(
    req.params.id,
    req.body
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Education Update successfully',
    data: result,
  });
});
const getAEducation = catchAsync(async (req, res) => {
  const result = await educationServices.getAEducationFromDB(
    req.params.id
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Education found successfully',
    data: result,
  });
});
const getAllEducationOfAResume = catchAsync(async (req, res) => {
  const result =
    await educationServices.getAllEducationOfAResumeFromDB(
      req.params.resumeId
    );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Education found successfully',
    data: result,
  });
});
const deleteEducation = catchAsync(async (req, res) => {
  const result = await educationServices.deleteAEducationFromDB(
    req.params.id
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Education removed successfully',
    data: result,
  });
});

export const educationControllers = {
  createEducation,
  updateEducation,
  getAEducation,
  getAllEducationOfAResume,
  deleteEducation,
};
