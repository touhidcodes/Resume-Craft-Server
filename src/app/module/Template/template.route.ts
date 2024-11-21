import express from "express";
import validateRequest from "../../middlewears/validateRequest";
import auth from "../../middlewears/auth";
import { UserRole } from "@prisma/client";
import { templateControllers } from "./template.controller";
import { CreateTemplateSchema } from "./template.validation";

const router = express.Router();
//login user route
router.post(
  "/create-template",
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(CreateTemplateSchema),
  templateControllers.createTemplate
);
router.get(
  "/template/:templateId",
  auth(UserRole.ADMIN, UserRole.USER),
  templateControllers.getTemplate
);

export const templateRoutes = router;
