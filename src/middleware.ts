import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

    if (req.nextUrl.pathname === "/")
      return NextResponse.redirect(new URL("/dashboard", req.url));

    if (isAuthPage) {
      if (isAuth) return NextResponse.redirect(new URL("/dashboard", req.url));
      return null;
    } else {
      if (isAuth) return null;
      else {
        let from = req.nextUrl.pathname;
        if (req.nextUrl.search) from += req.nextUrl.search;

        return NextResponse.redirect(
          new URL(`/auth?from=${encodeURIComponent(from)}`, req.url)
        );
      }
    }
  },
  {
    callbacks: {
      authorized: async () => true,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/auth", "/"],
};
