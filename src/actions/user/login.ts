'use server';

import { signIn } from '@/lib/auth';
import { authSchema, TAuth } from '@/lib/validations';

export const login = async (userData: TAuth) => {
  const { success, data, error } = authSchema.safeParse(userData);

  if (!success) {
    return {
      ok: false,
      message: `Invalid user data: ${error?.message || 'Validation failed'}`,
    };
  }

  await signIn('credentials', data);
};
