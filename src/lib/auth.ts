import bcrypt from 'bcryptjs';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import prisma from '@/lib/prisma';

const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  // session: {
  //   strategy: 'jwt',
  //   maxAge: 24 * 60 * 60, // 24 hrs
  // },
  providers: [
    Credentials({
      async authorize(credentials) {
        // run on login only
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          // eslint-disable-next-line no-console
          console.log('no email valid');
          return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          // eslint-disable-next-line no-console
          console.log('no password valid');
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      // runs on every request with middleware
      const isLoggedIn = !!auth?.user;
      const isTryingToAccessApp = request.nextUrl.pathname.includes('/app');

      if (isLoggedIn) {
        return isTryingToAccessApp
          ? true
          : Response.redirect(new URL('/app/dashboard', request.url));
      }

      return !isTryingToAccessApp;
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(authConfig);
