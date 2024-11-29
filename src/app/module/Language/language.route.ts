import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth';
import express from 'express';
import { languageControllers } from './language.controller';

const router = express.Router();
router.post(
  '/add/:languageId',
  auth(UserRole.USER),
  languageControllers.addLanguage
);

router.delete(
  '/remove/:languageId',
  auth(UserRole.USER),
  languageControllers.removeLanguage
);

router.put(
  '/update-proficiency/:languageId',
  auth(UserRole.USER),
  languageControllers.editLanguageProficiency
);

export const languageRoutes = router;
