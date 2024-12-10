import catchAsync from '../../shared/catchAsync';
import { sendRes } from '../../shared/sendResponse';
import { userService } from './user.service';
import httpStatus from 'http-status';

// register user controller
const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUserIntoDB(req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});
// register user controller
const createUserByGoogle = catchAsync(async (req, res) => {
  const result = await userService.createUserByGoogleIntoBD(req.body);
  const { massage, refreshToken, ...rest } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: false,
    httpOnly: true,
  });
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${massage}`,
    data: rest,
  });
});
const createAdmin = catchAsync(async (req, res) => {
  const result = await userService.createAdminIntoDB(req.params.id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User status change successfully',
    data: result,
  });
});
// update user controller
const updateUser = catchAsync(async (req, res) => {
  const result = await userService.updateUserIntoDB(req.user, req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile updated successfully',
    data: result,
  });
});
// update user controller
const deleteUser = catchAsync(async (req, res) => {
  const result = await userService.deleteUserIntoDB(req.params.id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});
//get a user controller
const getUserProfile = catchAsync(async (req, res) => {
  const result = await userService.getUserFromDB(req.user);
  return sendRes(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile retrieved successfully',
    data: result,
  });
});
//get all user controller
const getAllUser = catchAsync(async (req, res) => {
  const result = await userService.getAllUserFromDB();
  return sendRes(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully',
    data: result,
  });
});

export const userController = {
  createUserByGoogle,
  createUser,
  createAdmin,
  updateUser,
  getUserProfile,
  getAllUser,
  deleteUser,
};
