import bcrypt from 'bcryptjs';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import prisma from '@/lib/prisma';

import { getUserByEmail } from './actionsUtils';
import { authSchema } from './validations';

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
        const { success, data } = authSchema.safeParse(credentials);
        if (!success) {
          return null;
        }

        // run on login only
        const { email, password } = data;

        const user = await getUserByEmail(email);
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
      const { pathname } = request.nextUrl;
      const publickPaths =
        pathname === '/login' || pathname === '/signup' || pathname === '/';

      if (!isLoggedIn) {
        // Allow access only to login/signup if not logged in
        if (publickPaths) {
          return true;
        }
        return false; // Block access to other pages
      }

      // Logged-in user: check access
      if (auth?.user?.hasAccess) {
        // Redirect from login/signup to dashboard if user has access
        if (publickPaths || pathname === '/payment') {
          return Response.redirect(new URL('/app/dashboard', request.nextUrl));
        }
        return true; // Allow access to the rest of the app
      } else {
        // Redirect user without access to /payment
        if (!pathname.includes('/payment')) {
          return Response.redirect(new URL('/payment', request.nextUrl));
        }
        return true; // Allow access to /payment
      }
    },
    jwt: async ({ token, user, trigger }) => {
      // on sign in we need to get the user id to be able to get the is with all ther properties
      if (user) {
        // on sign in
        token.userId = user.id!;
        token.email = user.email!;
        token.hasAccess = user.hasAccess;
      }

      // this will update the JWT when the "update" function from session auth is call.(if we want to update any values that we depend on )
      if (trigger === 'update') {
        // on every request
        const userFromDb = await prisma.user.findUnique({
          where: {
            email: token.email,
          },
        });
        if (userFromDb) {
          token.hasAccess = userFromDb.hasAccess;
        }
      }

      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    session({ session, token, user }) {
      //this data will be available for the live of the session.

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user.id = token.userId;
      session.user.hasAccess = token.hasAccess;

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);
