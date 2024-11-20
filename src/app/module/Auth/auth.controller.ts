import httpStatus from 'http-status';
import { authenticationServices } from './auth.service';
import catchAsync from '../../shared/catchAsync';
import { sendRes } from '../../shared/sendResponse';


// login user controller
const loginUser = catchAsync(async (req, res) => {
  const result = await authenticationServices.loginUserIntoDB(req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const result = await authenticationServices.changePasswordIntoDB(
    req.user,
    req.body
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});
export const authenticationControllers = {
  loginUser,
  changePassword
};
