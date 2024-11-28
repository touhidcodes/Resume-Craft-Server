import express from 'express';
import { userController } from './user.controller';
import { userValidation } from './user.validation';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserRole } from '@prisma/client';

const router = express.Router();
//get a user route
router.get(
  '/profile',
  auth(UserRole.ADMIN, UserRole.USER),
  userController.getUserProfile
);
router.get('/all-profile', auth(UserRole.ADMIN), userController.getAllUser);
//update user route
router.put(
  '/profile',
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(userValidation.updateUserValidation),
  userController.updateUser
);
router.delete('/delete/:id', auth(UserRole.ADMIN), userController.deleteUser);
//register user route
router.post(
  '/register',
  validateRequest(userValidation.createUserValidation),
  userController.createUser
);
//register user route
router.post(
  '/register-google',
  validateRequest(userValidation.createUserValidation),
  userController.createUserByGoogle
);
router.post(
  '/register-admin/:id',
  auth(UserRole.ADMIN),
  userController.createAdmin
);

export const userRoute = router;
