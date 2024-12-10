import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

import { coverLetterData } from './coverLetter.demoData';
import {
  CreateCoverLetterSchema,
  UpdateCoverLetterSchema,
} from './coverLetter.validation';
import { coverLetterControllers } from './coverLetter.controller';

const router = express.Router();
//login user route
router.post(
  '/create-cover-letter',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (req: Request, res: Response, next: NextFunction) => {
    const { templateId, name } = req.body;

    const data = {
      templateId,
      name,
      ...coverLetterData,
    };
    req.body = data;
    next();
  },
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(CreateCoverLetterSchema),
  coverLetterControllers.createCoverLetter
);
router.post(
    '/create-cover-letter-duplicate/:coverLetterId',
    auth(UserRole.ADMIN, UserRole.USER),
    coverLetterControllers.createDuplicateCoverLetter
  );
router.get(
  '/cover-letters',
  auth(UserRole.ADMIN, UserRole.USER),
  coverLetterControllers.getUserAllCoverLetter
);
router.get(
  '/:coverLetterId',
  auth(UserRole.ADMIN, UserRole.USER),
  coverLetterControllers.getCoverLetter
);
router.patch(
  '/update-cover-letter/:id',
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(UpdateCoverLetterSchema),
  coverLetterControllers.updateCoverLetter
);
router.delete(
  '/delete-cover-letter/:id',
  auth(UserRole.ADMIN, UserRole.USER),
  coverLetterControllers.deleteUserCoverLetterFromDB
);

export const coverLetterRoutes = router;
