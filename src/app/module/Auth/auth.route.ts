import express from "express";
import { authenticationZodSchema } from "./auth.validation";
import { authenticationControllers } from "./auth.controller";

import validateRequest from "../../middlewears/validateRequest";
import auth from "../../middlewears/auth";

const router = express.Router();
//login user route
router.post(
  "/login",
  validateRequest(authenticationZodSchema.loginUserZodSchema),
  authenticationControllers.loginUser
);
router.post(
  "/change-password",
  auth(),
  validateRequest(authenticationZodSchema.changePasswordZodSchema),
  authenticationControllers.changePassword
);
export const authRoutes = router;
