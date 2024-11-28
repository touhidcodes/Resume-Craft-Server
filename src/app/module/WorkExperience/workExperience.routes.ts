import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { workExperienceControllers } from './workExperience.controller';
import {
  UpdateWorkExperienceSchema,
  WorkExperienceSchema,
} from '../Resume/resume.validation';

const router = express.Router();

router.post(
  '/create-experience',
  validateRequest(WorkExperienceSchema),
  workExperienceControllers.createWorkExperience
);
router.patch(
  '/update-experience/:id',
  validateRequest(UpdateWorkExperienceSchema),
  workExperienceControllers.updateWorkExperience
);
router.get('/experience/:id', workExperienceControllers.getAWorkExperience);
router.get(
  '/all-experience/:resumeId',
  workExperienceControllers.getAllWorkExperienceOfAResume
);
router.delete(
  '/remove-experience/:id',
  workExperienceControllers.deleteWorkExperience
);

export const workExperienceRoutes = router;
