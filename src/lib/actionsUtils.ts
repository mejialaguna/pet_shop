import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

export const isLoggedIn = async () => {
  const session = await auth();

  if (!session) {
    return redirect('/login');
  }

  return session;
};
