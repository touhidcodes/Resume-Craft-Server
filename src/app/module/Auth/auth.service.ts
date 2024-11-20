import httpStatus from 'http-status';
import { prisma } from '../../../app';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../../errors/appErrors';
// login user service
const loginUserIntoDB = async (payload: TLoginUser) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  const isPasswordMatched: boolean = await bcrypt.compare(
    payload.password,
    userData.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect password');
  }
  const jwtPayload = {
    userId: userData.id,
    email: userData.email,
    photo: userData.photo,
    role: userData.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const refreshJwtPayload = {
    userId: userData.id,
  };
//   const refreshToken = createToken(
//     refreshJwtPayload,
//     config.jwt_refresh_secret as string,
//     config.jwt_refresh_expires_in as string,
//   );
  return {
    accessToken,
    // refreshToken,
  };
};
const changePasswordIntoDB = async (
  decodeToken: JwtPayload,
  payload: { oldPassword: string; newPassword: string; email: string },
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
    userData.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect Password');
  }
  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds as string),
  );
  await prisma.user.update({
    where: {
      id: userData.id,
    },
    data: { password: hashedPassword },
  });
  return null;
};
export const authenticationServices = {
  loginUserIntoDB,
  changePasswordIntoDB,
};
