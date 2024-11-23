import httpStatus from 'http-status';
import { authenticationServices } from './auth.service';
import catchAsync from '../../shared/catchAsync';
import { sendRes } from '../../shared/sendResponse';

// login user controller
const loginUser = catchAsync(async (req, res) => {
  const result = await authenticationServices.loginUserIntoDB(req.body);
  const { refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: false,
    httpOnly: true,
  });

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logged in successfully!',
    data: {
      accessToken: result.accessToken,
    },
  });
});
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authenticationServices.refreshToken(refreshToken);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token generated successfully!',
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
    message: 'Password changed successfully',
    data: result,
  });
});
export const authenticationControllers = {
  loginUser,
  changePassword,
  refreshToken,
};
