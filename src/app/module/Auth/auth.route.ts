import express from 'express';
import { authenticationZodSchema } from './auth.validation';
import { authenticationControllers } from './auth.controller';

import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();
//login user route
router.post(
  '/login',
  validateRequest(authenticationZodSchema.loginUserZodSchema),
  authenticationControllers.loginUser
);
router.post('/refresh-token', authenticationControllers.refreshToken);
router.post(
  '/change-password',
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(authenticationZodSchema.changePasswordZodSchema),
  authenticationControllers.changePassword
);
export const authRoutes = router;
