import { coverLetterTemplateServices } from './coverLetterTemplate.service';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import { sendRes } from '../../shared/sendResponse';

const createCoverLatterTemplate = catchAsync(async (req, res) => {
  const result =
    await coverLetterTemplateServices.createCoverLetterTemplateIntoDB(req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cover Letter Template Created successfully',
    data: result,
  });
});

const getACoverLatterTemplate = catchAsync(async (req, res) => {
  const result =
    await coverLetterTemplateServices.getACoverLetterTemplateFromDB(
      req.params.templateId
    );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cover Letter template found successfully',
    data: result,
  });
});

const getAllCoverLatterTemplate = catchAsync(async (req, res) => {
  const result =
    await coverLetterTemplateServices.getAllCoverLetterTemplateFromDB();
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Cover Letter template found successfully',
    data: result,
  });
});
const deleteCoverLetterTemplate = catchAsync(async (req, res) => {
  const result =
    await coverLetterTemplateServices.deleteCoverLetterTemplateFromDB(
      req.params.id
    );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cover Letter Template deleted successfully',
    data: result,
  });
});
export const coverLatterTemplateControllers = {
  createCoverLatterTemplate,
  getACoverLatterTemplate,
  getAllCoverLatterTemplate,
  deleteCoverLetterTemplate,
};
