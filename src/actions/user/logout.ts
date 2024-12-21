'use server';

import { signOut } from '@/lib/auth';

export const Logout = async () => {
  await signOut({ redirectTo: '/' });
}