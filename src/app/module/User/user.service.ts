import { prisma } from '../../../app';
import { JwtPayload } from 'jsonwebtoken';
import { User, UserRole, UserStatus } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../config';
import { AppError } from '../../errors/appErrors';
import { createToken } from '../Auth/auth.utils';

const createUserByGoogleIntoBD = async (userData: User) => {
  const { password, ...restData } = userData;
  const isUserExist = await prisma.user.findFirst({
    where: {
      OR: [{ email: userData.email }, { userName: userData.userName }],
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
        createdAt: true,
        updatedAt: true,
      },
    });
    const jwtPayLoad = {
      userId: user?.id,
      role: user?.role,
      email: user?.email,
    };
    const accessToken = await createToken(
      jwtPayLoad,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string
    );
    return {
      user,
      accessToken,
    };
  }

  const jwtPayLoad = {
    userId: isUserExist?.id,
    role: isUserExist?.role,
    email: isUserExist?.email,
  };
  const accessToken = await createToken(
    jwtPayLoad,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  console.log(accessToken, isUserExist);
  return {
    user: isUserExist,
    accessToken,
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
      role: true,
      email: true,
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
    },
    select: {
      id: true,
      userName: true,
      email: true,
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
      status: true,
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
