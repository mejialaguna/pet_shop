'use server';

import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

import prisma from '@/lib/prisma';
import { signupSchema, TSignup } from '@/lib/validations';

import { login } from './login';

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
  const { name: parsedName, email: parsedEmail, password: parsedPassword } = data;

  try {
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

    const loginResult = await login({ email, password });

    if (!loginResult.ok) {
      return {
        ok: false,
        message: loginResult.message || 'Login failed after signup',
      };
    }

    return {
      ok: true,
      user: user,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if(error.code === 'P2002') {
        return {
          ok: false,
          message: `Email ${data.email} already exists`,
        };
      }
    }
    return {
      ok: false,
      message: `something went wrong creating user, ${error}`,
    };
  }
};
