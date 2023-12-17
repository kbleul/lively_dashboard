import { pagesOptions } from "@/app/api/auth/[...nextauth]/pages-options";
import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
  // function middleware(req: NextRequestWithAuth) {
  //   console.log(
  //     !req.nextauth.token?.user?.roles
  //       ?.map((item) => item.name.toLowerCase())
  //       .includes("Expert")
  //   );
  //   if (
  //     req.nextUrl.pathname.startsWith("/expert") &&
  //     !req.nextauth.token?.user.roles
  //       ?.map((item) => item.name.toLowerCase())
  //       .includes("Expert")
  //   ) {
  //     return NextResponse.rewrite(new URL("/access-denied", req.url));
  //   }
  // },
  {
    pages: {
      ...pagesOptions,
    },

    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  // restricted routes that need authentication
  matcher: ["/", "/expert/:path*"],
};
