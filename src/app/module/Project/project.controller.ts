import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import { sendRes } from '../../shared/sendResponse';
import { projectServices } from './project.service';


const createProject = catchAsync(async (req, res) => {
  const result = await projectServices.createProjectIntoDB(
    req.body
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project created successfully',
    data: result,
  });
});
const updateProject = catchAsync(async (req, res) => {
  const result = await projectServices.updateProjectIntoDB(
    req.params.id,
    req.body
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project Update successfully',
    data: result,
  });
});
const getAProject = catchAsync(async (req, res) => {
  const result = await projectServices.getAProjectFromDB(
    req.params.id
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project found successfully',
    data: result,
  });
});
const getAllProjectOfAResume = catchAsync(async (req, res) => {
  const result =
    await projectServices.getAllProjectOfAResumeFromDB(
      req.params.resumeId
    );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project found successfully',
    data: result,
  });
});
const deleteProject = catchAsync(async (req, res) => {
  const result = await projectServices.deleteAProjectFromDB(
    req.params.id
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project removed successfully',
    data: result,
  });
});

export const projectControllers = {
  createProject,
  updateProject,
  getAProject,
  getAllProjectOfAResume,
  deleteProject,
};
