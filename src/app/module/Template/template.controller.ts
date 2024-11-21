import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import { sendRes } from "../../shared/sendResponse";
import { templateServices } from "./template.service";

const createTemplate = catchAsync(async (req, res) => {
  const result = await templateServices.createTemplateIntoDB(
    req.body,
    req.user
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Template Created successfully",
    data: result,
  });
});
const getTemplate = catchAsync(async (req, res) => {
  const result = await templateServices.getTemplateFromDB(
    req.params.templateId,
    req.user.userId
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Template Created successfully",
    data: result,
  });
});

export const templateControllers = {
  createTemplate,
  getTemplate,
};

