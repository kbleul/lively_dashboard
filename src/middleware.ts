import { pagesOptions } from "@/app/api/auth/[...nextauth]/pages-options";
import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    if (
      req.nextUrl.pathname.startsWith("/op") &&
      !(
        req.nextauth.token?.user.roles
          ?.map((item) => item.name)
          .includes("Operation_Manager") ||
        req.nextauth.token?.user.roles
          ?.map((item) => item.name)
          .includes("Admin")
      )
    ) {
      return NextResponse.rewrite(new URL("/access-denied", req.url));
    }

    if (
      req.nextUrl.pathname.startsWith("/bm") &&
      !req.nextauth.token?.user.roles
        ?.map((item) => item.name)
        .includes("Branch_Manager")
    ) {
      return NextResponse.rewrite(new URL("/access-denied", req.url));
    }

    if (
      req.nextUrl.pathname.startsWith("/so") &&
      !req.nextauth.token?.user.roles
        ?.map((item) => item.name)
        .includes("Store_Owner")
    ) {
      return NextResponse.rewrite(new URL("/access-denied", req.url));
    }
    if (
      req.nextUrl.pathname.startsWith("/op") &&
      !(
        req.nextauth.token?.user.roles
          ?.map((item) => item.name)
          .includes("Operation_Manager") ||
        req.nextauth.token?.user.roles
          ?.map((item) => item.name)
          .includes("Admin")
      )
    ) {
      return NextResponse.rewrite(new URL("/access-denied", req.url));
    }
    if (req.nextUrl.pathname.includes("claimed-product")) {
      if (
        req.nextauth.token?.user.roles
          ?.map((item) => item.name)
          .includes("Operation_Manager")
      ) {
        const descountId =
          req.nextUrl.pathname.split("/")[
            req.nextUrl.pathname.split("/").length - 1
          ];

        return NextResponse.rewrite(
          new URL(`/op/product-discount/${descountId}`, req.url)
        );
      }
    }
  },

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
  matcher: [
    "/",
    "/claimed-product/:path*",
    "/expert/:path*",
    "/op/:path*",
    "/contentc/:path*",
    "/bm/:path*",
    "/so/:path*",
  ],
};

// const descountId =
// req.nextUrl.pathname.split("/")[
//   req.nextUrl.pathname.split("/").length - 1
// ];

// if (
// req.nextauth.token?.user.roles
//   ?.map((item) => item.name)
//   .includes("Operation_Manager")
// ) {
// linkRole = "op/product-discount";
// } else if (
// req.nextauth.token?.user.roles
//   ?.map((item) => item.name)
//   .includes("Store_Owner")
// ) {
// linkRole = "so/product-discount";
// } else if (
// req.nextauth.token?.user.roles
//   ?.map((item) => item.name)
//   .includes("Branch_Manager")
// ) {
// linkRole = "bm/product-discount";
// }

// if (linkRole) {
// return NextResponse.rewrite(
//   new URL(`${linkRole}/${descountId}`, req.url)
// );
// }
