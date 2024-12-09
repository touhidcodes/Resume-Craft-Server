// For handling async errors
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { sendRes } from '../../../shared/sendResponse';
import { AnalyticsServices } from './analytics.service';

const getAnalytics = catchAsync(async (req, res) => {
  const result = await AnalyticsServices.getAnalytics();
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Analytics fetched successfully!',
    data: result,
  });
});


export const AnalyticsController = {
  getAnalytics,
};
