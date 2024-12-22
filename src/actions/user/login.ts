'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/lib/auth';
import { authSchema, TAuth } from '@/lib/validations';

interface AuthenticationResult {
  ok: boolean;
  message?: string;
}

export const login = async (userData: TAuth): Promise<AuthenticationResult> => {
  const { success, data, error } = authSchema.safeParse(userData);

  if (!success) {
    return {
      ok: false,
      message: `Invalid user data: ${error?.message || 'Validation failed'}`,
    };
  }

  try {
    await signIn('credentials', {
      ...data,
      redirect: false,
    });

    return { ok: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            ok: false,
            message: 'Invalid username or password',
          };

        default:
          return {
           ok: false,
           message: 'An unexpected error occurred during checking user authentication',
         }
      }
    }
    return {
      ok: false,
      message: 'An unexpected error occurred during authentication',
    };
  }
};
