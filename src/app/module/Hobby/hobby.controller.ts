import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import { sendRes } from '../../shared/sendResponse';
import { HobbyService } from './hobby.service';

const addHobbyItems = catchAsync(async (req, res) => {
  try {
    const { items } = req.body;
    const { hobbyId } = req.params;
 
    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: 'newItems should be a non-empty array.' });
    }

    const updatedHobby = await HobbyService.pushHobbyItems(hobbyId, items);

    sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Hobby added successfully!',
      data: updatedHobby,
    });
  } catch (error) {
    sendRes(res, {
      statusCode: httpStatus.FORBIDDEN,
      success: true,
      message: `${error.message}`,
      data: null,
    });
  }
});

// Pop a specific hobby item
const removeSpecificHobbyItem = catchAsync(async (req, res) => {
  try {
    const { items } = req.body;
    const { hobbyId } = req.params;

    if (!items) {
      return res.status(400).json({ message: 'Item to remove is required.' });
    }

    const updatedHobby = await HobbyService.popSpecificHobbyItem(
      hobbyId,
      items
    );
    sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `"${items}" removed successfully`,
      data: updatedHobby,
    });
  } catch (error) {
    sendRes(res, {
      statusCode: httpStatus.FORBIDDEN,
      success: true,
      message: `${error.message}`,
      data: null,
    });
  }
});
export const HobbyController = {
  addHobbyItems,
  removeSpecificHobbyItem,
};
