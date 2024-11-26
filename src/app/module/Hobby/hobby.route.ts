import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth';
import { HobbyController } from './hobby.controller';
import express from 'express';
const router = express.Router();
router.put(
  '/add/:hobbyId',
  auth(UserRole.USER),

  HobbyController.addHobbyItems
);
router.delete(
  '/remove/:hobbyId',
  auth(UserRole.USER),

  HobbyController.removeSpecificHobbyItem
);

export const hobbyRoutes = router;
