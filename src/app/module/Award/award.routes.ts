import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  CreateAwardSchema,
  UpdateAwardSchema,
} from '../Resume/resume.validation';
import { awardControllers } from './award.controller';

const router = express.Router();

router.post(
  '/create-award',
  validateRequest(CreateAwardSchema),
  awardControllers.createAward
);
router.patch(
  '/update-award/:id',
  validateRequest(UpdateAwardSchema),
  awardControllers.updateAward
);
router.get('/award/:id', awardControllers.getAAward);
router.get('/all-award/:resumeId', awardControllers.getAllAwardOfAResume);
router.delete('/remove-award/:id', awardControllers.deleteAward);

export const awardRoutes = router;
