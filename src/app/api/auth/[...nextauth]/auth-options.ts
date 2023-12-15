import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
// import { env } from '@/env.mjs';
// import isEqual from 'lodash/isEqual';
// import { pagesOptions } from './pages-options';

export const authOptions: NextAuthOptions = {
  // debug: true,
  // pages: {
  //   ...pagesOptions,
  // },
  // session: {
  //   strategy: 'jwt',
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  // },

  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: any, req: any): Promise<any> {
        if (req.body) {
          return JSON.parse(req.body.data);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log(token,user)
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);
      if (parsedUrl.searchParams.has('callbackUrl')) {
        return `${baseUrl}${parsedUrl.searchParams.get('callbackUrl')}`;
      }
      if (parsedUrl.origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
};
