import { pagesOptions } from '@/app/api/auth/[...nextauth]/pages-options';
import withAuth from 'next-auth/middleware';

export default withAuth({
  pages: {
    ...pagesOptions,
  },
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  // restricted routes that need authentication
  matcher: [
    '/',
    '/employee/:path*',
    '/transactions/:path*',
    '/invoice/:path*',
    '/payments/:path*',
    '/users/:path*',
    '/profile/:path*',
    '/ib/:path*',
  ],
};
