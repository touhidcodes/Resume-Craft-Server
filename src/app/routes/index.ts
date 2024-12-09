import { Router } from 'express';
import { authRoutes } from '../module/Auth/auth.routes';
import { userRoute } from '../module/User/user.routes';
import { templateRoutes } from '../module/Template/template.routes';
import { resumeRoutes } from '../module/Resume/resume.routes';
import { workExperienceRoutes } from '../module/WorkExperience/workExperience.routes';
import { educationRoutes } from '../module/Education/education.routes';
import { awardRoutes } from '../module/Award/award.routes';
import { skillRoutes } from '../module/Skill/skill.routes';
import { analyticsRoutes } from '../module/AdminDashboard/Analytics/analytics.routes';
import { projectRoutes } from '../module/Project/project.routes';
import { certificationRoutes } from '../module/Certification/certification.routes';
import { coverLetterTemplateRoutes } from '../module/CoverLetterTemplate/coverLetterTemplate.routes';
import { coverLetterRoutes } from '../module/CoverLetter/coverLetter.routes';

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
    path: '/resume/work-experience',
    route: workExperienceRoutes,
  },
  {
    path: '/resume/education',
    route: educationRoutes,
  },
  {
    path: '/resume/award',
    route: awardRoutes,
  },
  {
    path: '/template',
    route: templateRoutes,
  },
  {
    path: '/resume/skill',
    route: skillRoutes,
  },
  {
    path: '/resume/project',
    route: projectRoutes,
  },
  {
    path: '/resume/certification',
    route: certificationRoutes,
  },
  {
    path: '/analytics',
    route: analyticsRoutes,
  },
  {
    path: '/cover-letter',
    route: coverLetterRoutes,
  },
  {
    path: '/cover-letter-template',
    route: coverLetterTemplateRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
