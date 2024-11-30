/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../app";
import catchAsync from "../shared/catchAsync";
import { AppError } from "../errors/appErrors";
import { UserRole } from "@prisma/client";
import { verifyToken } from "../module/Auth/auth.utils";
import config from "../config";

const auth = (...requireRoles: UserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
    }

    const decoded = verifyToken(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;
    const { userId, role } = decoded;

    await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
    if (requireRoles.length && !requireRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You do not have the necessary permissions to access this resource"
      );
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
