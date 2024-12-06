import { UserRole } from '@prisma/client';

import express from 'express';
import auth from '../../../middlewares/auth';
import { AnalyticsController } from './analytics.controller';
const router = express.Router();
router.get(
  '/admin-dashboard-data',
  auth(UserRole.ADMIN),
  AnalyticsController.getAnalytics
);


export const analyticsRoutes = router;
