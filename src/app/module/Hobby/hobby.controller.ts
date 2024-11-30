import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import { sendRes } from '../../shared/sendResponse';
import { HobbyService } from './hobby.service';

const addHobbyItems = catchAsync(async (req, res) => {
  const { hobby } = req.body;
  const { resumeId } = req.params;
  const userId = req.user.userId;

  // Validate input
  if (!userId) {
    return sendRes(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'User ID is required.',
      data: null,
    });
  }
  if (!Array.isArray(hobby) || hobby.length === 0) {
    return sendRes(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Items should be a non-empty array.',
      data: null,
    });
  }

  // Add hobbies to the resume
  const updatedResume = await HobbyService.pushHobbyItems(
    userId as string,
    resumeId,
    hobby
  );

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hobbies added successfully!',
    data: updatedResume, // Return full resume data
  });
});

const removeSpecificHobbyItem = catchAsync(async (req, res) => {
  const { hobby } = req.body;
  const { resumeId } = req.params;
  const userId = req.user.userId;

  // Validate input
  if (!userId) {
    return sendRes(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'User ID is required.',
      data: null,
    });
  }
  if (!hobby) {
    return sendRes(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Item to remove is required.',
      data: null,
    });
  }

  // Remove the specific hobby item
  const updatedResume = await HobbyService.popSpecificHobbyItem(
    userId as string,
    resumeId,
    hobby
  );

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `"${hobby}" removed successfully.`,
    data: updatedResume, // Return full resume data
  });
});

export const HobbyController = {
  addHobbyItems,
  removeSpecificHobbyItem,
};
