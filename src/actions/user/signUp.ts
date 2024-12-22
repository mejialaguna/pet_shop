'use server';

import bcrypt from 'bcryptjs';

import prisma from '@/lib/prisma';
import { signupSchema, TSignup } from '@/lib/validations';

interface AuthenticationResult {
  ok: boolean;
  message?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export const signUpUser = async ({ name, email, password }: TSignup): Promise<AuthenticationResult> => {
  const { success, data } = signupSchema.safeParse({ name, email, password });

  if (!success) return { ok: false, message: 'Invalid user data' }

  try {
    const { name: parsedName, email: parsedEmail, password: parsedPassword } = data;
    const userAlreadyExist = await prisma.user.findUnique({
      where: { email: parsedEmail.toLowerCase() },
    });

    if (userAlreadyExist) {
      return {
        ok: false,
        message: `Email ${parsedEmail} already exists`,
      };
    }

    const user = await prisma.user.create({
      data: {
        name: parsedName,
        email: parsedEmail.toLowerCase(),
        password: bcrypt.hashSync(parsedPassword),
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
