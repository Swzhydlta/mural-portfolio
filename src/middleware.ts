import { type NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidSessionCookieValue } from "@/lib/auth";

export const runtime = "nodejs";

const PUBLIC_ADMIN_PATHS = new Set(["/clouds/login", "/api/admin/login"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ADMIN_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (isValidSessionCookieValue(session)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/clouds/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/clouds/:path*", "/api/admin/:path*"],
};
