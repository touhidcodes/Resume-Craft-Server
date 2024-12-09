import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import { sendRes } from '../../shared/sendResponse';
import { certificationServices } from './certification.service';

const createCertification = catchAsync(async (req, res) => {
  const result = await certificationServices.createCertificationIntoDB(
    req.body
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Certification created successfully',
    data: result,
  });
});
const updateCertification = catchAsync(async (req, res) => {
  const result = await certificationServices.updateCertificationIntoDB(
    req.params.id,
    req.body
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Certification Update successfully',
    data: result,
  });
});
const getACertification = catchAsync(async (req, res) => {
  const result = await certificationServices.getACertificationFromDB(
    req.params.id
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Certification found successfully',
    data: result,
  });
});
const getAllCertificationOfAResume = catchAsync(async (req, res) => {
  const result = await certificationServices.getAllCertificationOfAResumeFromDB(
    req.params.resumeId
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Certification found successfully',
    data: result,
  });
});
const deleteCertification = catchAsync(async (req, res) => {
  const result = await certificationServices.deleteACertificationFromDB(
    req.params.id
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Certification removed successfully',
    data: result,
  });
});

export const certificationControllers = {
  createCertification,
  updateCertification,
  getACertification,
  getAllCertificationOfAResume,
  deleteCertification,
};
