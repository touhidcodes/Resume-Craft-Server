import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { CoverLetterTemplateSchema } from './coverLetterTemplate.validation';
import { coverLatterTemplateControllers } from './coverLetterTemplate.controller';

const router = express.Router();
//login user route
router.post(
  '/create-template',
//   auth(UserRole.ADMIN),
  validateRequest(CoverLetterTemplateSchema),
  coverLatterTemplateControllers.createCoverLatterTemplate
);
router.get(
  '/template/:templateId',
  coverLatterTemplateControllers.getACoverLatterTemplate
);
router.get(
  '/templates',
  coverLatterTemplateControllers.getAllCoverLatterTemplate
);
router.delete(
  '/remove-template/:id',auth(UserRole.ADMIN),
  coverLatterTemplateControllers.deleteCoverLetterTemplate
);
export const coverLetterTemplateRoutes = router;
