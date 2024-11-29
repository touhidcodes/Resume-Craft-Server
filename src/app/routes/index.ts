import { Router } from 'express';
import { authRoutes } from '../module/Auth/auth.route';
import { userRoute } from '../module/User/user.routes';
import { templateRoutes } from '../module/Template/template.route';
import { hobbyRoutes } from '../module/Hobby/hobby.route';
import { languageRoutes } from '../module/Language/language.route';
import { skillRoutes } from '../module/Skills/skills.route';
import { analyticsRoutes } from '../module/AdminDashboard/Analytics/analytics.route';
import { resumeRoutes } from '../module/Resume/resume.route';

const router = Router();

const moduleRoutes: { path: string; route: Router }[] = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/resume',
    route: resumeRoutes,
  },
  {
    path: '/template',
    route: templateRoutes,
  },
  {
    path: '/hobby',
    route: hobbyRoutes,
  },
  {
    path: '/language',
    route: languageRoutes,
  },
  {
    path: '/skill',
    route: skillRoutes,
  },
  {
    path: '/analytics',
    route: analyticsRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
