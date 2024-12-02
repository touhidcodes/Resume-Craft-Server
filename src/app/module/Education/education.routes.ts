import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  CreateEducationSchema,
  UpdateEducationSchema,
} from '../Resume/resume.validation';
import { educationControllers } from './education.controller';

const router = express.Router();

router.post(
  '/create-education',
  validateRequest(CreateEducationSchema),
  educationControllers.createEducation
);
router.patch(
  '/update-education/:id',
  validateRequest(UpdateEducationSchema),
  educationControllers.updateEducation
);
router.get('/education/:id', educationControllers.getAEducation);
router.get(
  '/all-education/:resumeId',
  educationControllers.getAllEducationOfAResume
);
router.delete('/remove-education/:id', educationControllers.deleteEducation);

export const educationRoutes = router;
