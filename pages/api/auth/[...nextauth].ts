import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { getUserData } from '../../../services/user';
import { compare } from 'bcrypt';

export const authOptions = {
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const userData = await getUserData(credentials['email']);
        const checkPassword = await compare(
          credentials['password'],
          userData['password']
        );

        if (checkPassword === true && userData) {
          return userData as any;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
