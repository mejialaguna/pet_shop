'use server';

import bcrypt from 'bcryptjs';

import prisma from '@/lib/prisma';

interface AuthenticationResult {
  ok: boolean;
  message?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export const signUpUser = async (
  name: string,
  email: string,
  password: string
): Promise<AuthenticationResult> => {
  try {
    const userAlreadyExist = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (userAlreadyExist) {
      return {
        ok: false,
        message: `Email ${email} already exists`,
      };
    }

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user: user,
    };
  } catch (error) {
    return {
      ok: false,
      message: `something went wrong creating user, ${error}`,
    };
  }
};
