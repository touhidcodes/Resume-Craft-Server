import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { resumeControllers } from './resume.controller';
import { CreateResumeSchema, UpdateResumeSchema } from './resume.validation';


const router = express.Router();
//login user route
router.post(
  '/create-resume',
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(CreateResumeSchema),
  resumeControllers.createResume
);
router.get(
  '/resume/:resumeId',
  auth(UserRole.ADMIN, UserRole.USER),
  resumeControllers.getResume
);
router.get(
  '/resumes',
  auth(UserRole.ADMIN, UserRole.USER),
  resumeControllers.getAllUserResume
);
router.patch(
  '/update-resume/:id',
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(UpdateResumeSchema),
  resumeControllers.updateResume
);

export const resumeRoutes = router;
