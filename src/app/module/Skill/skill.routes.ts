import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  CreateSkillSchema,
  UpdateSkillSchema,
} from '../Resume/resume.validation';
import { skillControllers } from './skill.controller';

const router = express.Router();

router.post(
  '/create-skill',
  validateRequest(CreateSkillSchema),
  skillControllers.createSkill
);
router.patch(
  '/update-skill/:id',
  validateRequest(UpdateSkillSchema),
  skillControllers.updateSkill
);
router.get('/skill/:id', skillControllers.getASkill);
router.get(
  '/all-skill/:resumeId',
  skillControllers.getAllSkillOfAResume
);
router.delete('/remove-skill/:id', skillControllers.deleteSkill);

export const skillRoutes = router;
