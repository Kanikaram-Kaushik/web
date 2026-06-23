import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = ["/account", "/api/account"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const res = NextResponse.next();

  if (!isProtected) {
    return res;
  }

  const sessionCookie = getSessionCookie(req);

  if (!sessionCookie) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("auth", "required");
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/account/:path*"],
};
