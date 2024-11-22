import { Router } from "express";
import { authRoutes } from "../module/Auth/auth.route";
import { userRoute } from "../module/User/user.routes";
import { templateRoutes } from "../module/Template/template.route";

const router = Router();

const moduleRoutes: { path: string; route: Router }[] = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/template",
    route: templateRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
