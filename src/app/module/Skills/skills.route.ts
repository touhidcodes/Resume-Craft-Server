import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth';
import express from 'express';
import { SkillControllers } from './skills.controller';

const router = express.Router();

router.put(
  '/push/:resumeId',
  auth(UserRole.USER),
  SkillControllers.addOrUpdateSkillCategory
);

router.put(
  '/remove/:skillId',
  auth(UserRole.USER),
  SkillControllers.removeSpecificSkill
);

router.delete(
  '/remove-category/:skillId',
  SkillControllers.deleteSkillCategoryFromDB
);

export const skillRoutes = router;
