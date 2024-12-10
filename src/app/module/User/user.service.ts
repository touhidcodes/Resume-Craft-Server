import { prisma } from '../../../app';
import { JwtPayload } from 'jsonwebtoken';
import { User, UserRole, UserStatus } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../config';
import { AppError } from '../../errors/appErrors';
import { createToken } from '../Auth/auth.utils';
import httpStatus from 'http-status';

const createUserByGoogleIntoBD = async (userData: User) => {
  const { password, ...restData } = userData;
  const isUserExist = await prisma.user.findFirst({
    where: {
      OR: [{ email: userData.email }, { userName: userData.userName }],
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      userName: true,
      email: true,
      role: true,
      bio: true,
      phone: true,
      country: true,
      city: true,
      createdAt: true,
      updatedAt: true,
      password: false,
    },
  });
  if (!isUserExist) {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds as string)
    );
    const user = await prisma.user.create({
      data: { ...restData, password: hashedPassword, role: UserRole.USER },
      select: {
        id: true,
        userName: true,
        email: true,
        role: true,
        bio: true,
        phone: true,
        country: true,
        city: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    const jwtPayLoad = {
      userId: user?.id,
      role: user?.role,
      email: user?.email,
    };
    const accessToken = createToken(
      jwtPayLoad,
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
      massage: 'User registered successfully',
      user,
      accessToken,
      refreshToken,
    };
  }

  const jwtPayLoad = {
    userId: isUserExist?.id,
    role: isUserExist?.role,
    email: isUserExist?.email,
  };
  const accessToken = createToken(
    jwtPayLoad,
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
    massage: 'User login successfully',
    user: isUserExist,
    accessToken,
    refreshToken,
  };
};

// register user service
const createUserIntoDB = async (userData: User) => {
  const { password, ...restData } = userData;
  const isUserExist = await prisma.user.findFirst({
    where: {
      OR: [{ email: userData.email }, { userName: userData.userName }],
    },
  });
  if (isUserExist) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'User already register please login'
    );
  }
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds as string)
  );
  const user = await prisma.user.create({
    data: { ...restData, password: hashedPassword, role: UserRole.USER },
    select: {
      id: true,
      userName: true,
      email: true,
      role: true,
      bio: true,
      phone: true,
      country: true,
      city: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  const jwtPayLoad = {
    userId: user?.id,
    role: user?.role,
    email: user?.email,
  };
  const accessToken = createToken(
    jwtPayLoad,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  return {
    user,
    accessToken,
  };
};
const createAdminIntoDB = async (id: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: { role: UserRole.ADMIN },
  });
  return result;
};
// update user service
const updateUserIntoDB = async (
  userInfo: JwtPayload,
  userData: Partial<User>
) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userInfo.userId,
    },
  });
  const userUpdatedData = await prisma.user.update({
    where: {
      id: userInfo.userId,
    },
    data: userData,
    select: {
      id: true,
      userName: true,
      email: true,
      role: true,
      bio: true,
      phone: true,
      country: true,
      city: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return userUpdatedData;
};
// update user service
const deleteUserIntoDB = async (id: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });
  await prisma.user.update({
    where: {
      id,
    },
    data: { status: UserStatus.INACTIVE },
    select: {
      id: true,
    },
  });
};
//get a user service
const getUserFromDB = async (userData: JwtPayload) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: userData.userId,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      userName: true,
      email: true,
      role: true,
      bio: true,
      phone: true,
      country: true,
      city: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};
const getAllUserFromDB = async () => {
  const result = await prisma.user.findMany({
    where: {
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      userName: true,
      email: true,
      role: true,
      bio: true,
      phone: true,
      country: true,
      city: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};
export const userService = {
  createUserByGoogleIntoBD,
  createUserIntoDB,
  getAllUserFromDB,
  createAdminIntoDB,
  getUserFromDB,
  updateUserIntoDB,
  deleteUserIntoDB,
};
