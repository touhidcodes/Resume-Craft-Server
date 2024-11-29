import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import { sendRes } from '../../shared/sendResponse';
import { languageServices } from './language.service';

// Push a new language
const addLanguage = catchAsync(async (req, res) => {
  try {
    const { newLanguage } = req.body;
    const { languageId } = req.params;

    if (!newLanguage || !newLanguage.name || !newLanguage.proficiency) {
      return sendRes(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Invalid newLanguage object.',
        data: null,
      });
    }

    const updatedLanguage = await languageServices.pushLanguage(
      languageId,
      newLanguage
    );
    sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Language added successfully!',
      data: updatedLanguage,
    });
  } catch (error) {
    sendRes(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: `${error}`,
      data: null,
    });
  }
});

// Delete a language
const removeLanguage = catchAsync(async (req, res) => {
  try {
    const { languageName } = req.body;
    const { languageId } = req.params;

    if (!languageName) {
      return sendRes(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: `Language Name is required`,
        data: null,
      });
    }

    const updatedLanguage = await languageServices.deleteLanguage(
      languageId,
      languageName
    );
    sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Language removed successfully!',
      data: updatedLanguage,
    });
  } catch (error) {
    sendRes(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: `${error}`,
      data: null,
    });
  }
});

// Update language proficiency
const editLanguageProficiency = catchAsync(async (req, res) => {
  try {
    const { languageName, newProficiency } = req.body;
    const { languageId } = req.params;

    if (!languageName || !newProficiency) {
      return sendRes(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: `Language name and new proficiency are required.`,
        data: null,
      });
    }

    const updatedLanguage = await languageServices.updateLanguageProficiency(
      languageId,
      languageName,
      newProficiency
    );
    sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Proficiency for "${languageName}" updated successfully.`,
      data: updatedLanguage,
    });
  } catch (error) {
    sendRes(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: `${error}`,
      data: null,
    });
  }
});

export const languageControllers = {
  addLanguage,
  removeLanguage,
  editLanguageProficiency,
};
