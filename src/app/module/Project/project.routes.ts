import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  CreateProjectSchema,
  UpdateProjectSchema,
} from '../Resume/resume.validation';
import { projectControllers } from './project.controller';

const router = express.Router();

router.post(
  '/create-project',
  validateRequest(CreateProjectSchema),
  projectControllers.createProject
);
router.patch(
  '/update-project/:id',
  validateRequest(UpdateProjectSchema),
  projectControllers.updateProject
);
router.get('/project/:id', projectControllers.getAProject);
router.get(
  '/all-project/:resumeId',
  projectControllers.getAllProjectOfAResume
);
router.delete('/remove-project/:id', projectControllers.deleteProject);

export const projectRoutes = router;
