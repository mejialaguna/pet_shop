'use server';

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
    // eslint-disable-next-line no-console
    console.error('Authentication error:', error);
    return {
      ok: false,
      message: 'Wrong email or password',
    };
  }
};
