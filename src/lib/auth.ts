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

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, updatedAt, createdAt, ...rest } = user;

        return {
          ...rest,
        };
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
    jwt({ token, user }) {
      // on sign in we need to get the user id to be able to get the is with all ther properties
      if (user) {
        token.data = user;
      }

      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    session({ session, token, user }) {
      //this data will be available for the live of the session.

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token.data as any;
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(authConfig);
