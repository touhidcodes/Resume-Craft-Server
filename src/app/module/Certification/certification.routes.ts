import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  CertificationSchema,
  UpdateCertificationSchema,
} from '../Resume/resume.validation';
import { certificationControllers } from './certification.controller';

const router = express.Router();

router.post(
  '/create-certification',
  validateRequest(CertificationSchema),
  certificationControllers.createCertification
);
router.patch(
  '/update-certification/:id',
  validateRequest(UpdateCertificationSchema),
  certificationControllers.updateCertification
);
router.get('/certification/:id', certificationControllers.getACertification);
router.get(
  '/all-certification/:resumeId',
  certificationControllers.getAllCertificationOfAResume
);
router.delete('/remove-certification/:id', certificationControllers.deleteCertification);

export const certificationRoutes = router;
