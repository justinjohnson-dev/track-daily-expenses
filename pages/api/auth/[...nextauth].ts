import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserData } from '../../../services/user';

export const authOptions = {
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { gmail, password } = credentials as {
          gmail: string;
          password: string;
        };

        console.log(gmail, password);

        // validate here your gmail and password
        const userData = await getUserData(gmail);
        if (userData) {
          console.log(userData);
          return userData as any;
        } else {
          // if (gmail !== 'justin' && password !== 'test') {
          throw new Error('invalid credentials');
          // }
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
};

export default NextAuth(authOptions);
