import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { templateControllers } from './template.controller';
import { TemplateSchema } from './template.validation';

const router = express.Router();
//login user route
router.post(
  '/create-template',
  auth(UserRole.ADMIN),
  validateRequest(TemplateSchema),
  templateControllers.createTemplate
);
router.get('/template/:templateId', templateControllers.getATemplate);
router.get('/templates', templateControllers.getAllTemplate);
router.delete(
  '/remove-template/:id',
  auth(UserRole.ADMIN),
  templateControllers.deleteTemplate
);

export const templateRoutes = router;
