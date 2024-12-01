import httpStatus from 'http-status';
import { prisma } from '../../../app';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from './auth.utils';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../../errors/appErrors';
import { UserStatus } from '@prisma/client';
// login user service
const loginUserIntoDB = async (payload: TLoginUser) => {
  const userData = await prisma.user.findFirst({
    where: {
        OR: [{ email: payload.identifier }, { userName: payload.identifier }],
    },
  });
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Email or User Name');
  }
  const isPasswordMatched: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect password');
  }
  const jwtPayload = {
    userId: userData.id,
    email: userData.email,
    role: userData.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  const refreshJwtPayload = {
    userId: userData.id,
  };
  const refreshToken = createToken(
    refreshJwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
  };
};
const changePasswordIntoDB = async (
  decodeToken: JwtPayload,
  payload: { oldPassword: string; newPassword: string; email: string }
) => {
  if (decodeToken.email !== payload.email) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid Email');
  }
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodeToken.email,
    },
  });
  const isPasswordMatched: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect Password');
  }
  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds as string)
  );
  await prisma.user.update({
    where: {
      id: userData.id,
    },
    data: { password: hashedPassword },
  });
  return null;
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = verifyToken(token, config.jwt_refresh_secret as string);
  } catch (err) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const jwtPayload = {
    userId: userData.id,
    email: userData.email,
    role: userData.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};
export const authenticationServices = {
  refreshToken,
  loginUserIntoDB,
  changePasswordIntoDB,
};
