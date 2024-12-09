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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (req: Request, res: Response, next: NextFunction) => {
    const { templateId, name } = req.body;

    const data = {
      resumeData: { templateId, name, ...resumeData },
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
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(CreateResumeSchema),
  resumeControllers.createResume
);
router.post(
  '/create-resume-duplicate/:resumeId',
  auth(UserRole.ADMIN, UserRole.USER),
  resumeControllers.createDuplicateResume
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
router.delete(
  '/delete-resume/:resumeId',
  auth(UserRole.ADMIN, UserRole.USER),
  resumeControllers.deleteResume
);

export const resumeRoutes = router;
