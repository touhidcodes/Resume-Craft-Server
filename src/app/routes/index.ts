import { Router } from "express";
import { authRoutes } from "../module/Auth/auth.route";
import { userRoute } from "../module/User/user.routes";

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
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
