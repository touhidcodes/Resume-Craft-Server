import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { resumeControllers } from './resume.controller';
import { CreateResumeSchema, UpdateResumeSchema } from './resume.validation';
import {
  awardData,
  certificationData,
  educationData,
  projectData,
  resumeData,
  skillData,
  workExperienceData,
} from './resume.demoData';

const router = express.Router();
//login user route
router.post(
  '/create-resume',
  auth(UserRole.ADMIN, UserRole.USER),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (req: Request, res: Response, next: NextFunction) => {
    const { templateId } = req.body;
    const data = {
      resumeData: { templateId, ...resumeData },
      workExperienceData,
      educationData,
      skillData,
      certificationData,
      projectData,
      awardData,
    };
    req.body = data;
    next();
  },
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
