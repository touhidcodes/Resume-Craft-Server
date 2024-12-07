import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import { sendRes } from '../../shared/sendResponse';
import { templateServices } from './template.service';

const createTemplate = catchAsync(async (req, res) => {
  const result = await templateServices.createTemplateIntoDB(req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Template Created successfully',
    data: result,
  });
});
const getATemplate = catchAsync(async (req, res) => {
  const result = await templateServices.getATemplateFromDB(
    req.params.templateId
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Template found successfully',
    data: result,
  });
});
const getAllTemplate = catchAsync(async (req, res) => {
  const result = await templateServices.getAllTemplateFromDB();
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Template found successfully',
    data: result,
  });
});
const deleteTemplate = catchAsync(async (req, res) => {
  const result = await templateServices.deleteTemplateFromDB(req.params.id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Template found successfully',
    data: result,
  });
});

export const templateControllers = {
  createTemplate,
  getATemplate,
  getAllTemplate,
  deleteTemplate,
};
