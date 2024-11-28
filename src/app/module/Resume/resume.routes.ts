import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { resumeControllers } from './resume.controller';
import { CreateResumeSchema } from './resume.validation';


const router = express.Router();
//login user route
router.post(
  '/create-template',
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(CreateResumeSchema),
  resumeControllers.createResume
);
router.get(
  '/template/:templateId',
  auth(UserRole.ADMIN, UserRole.USER),
  resumeControllers.getResume
);

export const templateRoutes = router;
