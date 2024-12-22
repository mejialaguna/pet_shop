import 'server-only';

// ** this server only is a utility package to make sure the functions bellow, are for server side only.
//** the "user server is for creating server actions" */

import { User } from '@prisma/client';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const isLoggedIn = async () => {
  //** this way to get the auth session is for server side only to be able to use on the client is different */
  const session = await auth();

  if (!session) {
    return redirect('/login');
  }

  return session;
};

export async function getUserByEmail(email: User['email']) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
  
    return user;
    
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching user by email:', error);
    return null;
  }
}
