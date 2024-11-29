import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth';
import express from 'express';

import { skillControllers } from './skills.controller';

const router = express.Router();

router.put('/push/:skillId', auth(UserRole.USER), skillControllers.addSkills);

router.delete(
  '/remove/:skillId',
  auth(UserRole.USER),
  skillControllers.removeSkills
);

export const skillRoutes = router;
