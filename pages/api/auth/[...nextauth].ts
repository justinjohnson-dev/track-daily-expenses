import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { getUserData } from '../../../services/user';
import { compare } from 'bcrypt';

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials: any, req) {
        const userData = await getUserData(credentials['email']);

        if (userData !== null) {
          const checkPassword = await compare(
            credentials['password'],
            userData['password']
          );

          if (checkPassword === true && userData) {
            return userData as any;
          } else {
            return null;
          }
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
