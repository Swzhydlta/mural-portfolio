import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createSessionCookieValue,
  verifyPassword,
} from "@/lib/auth";
import { countRecentLoginAttempts, recordLoginAttempt } from "@/lib/db";

const RATE_LIMIT_WINDOW_MINUTES = 15;
const RATE_LIMIT_MAX_ATTEMPTS = 5;

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  const recentAttempts = await countRecentLoginAttempts(
    ip,
    RATE_LIMIT_WINDOW_MINUTES,
  );
  if (recentAttempts >= RATE_LIMIT_MAX_ATTEMPTS) {
    return NextResponse.redirect(
      new URL("/admin/login?error=rate_limited", request.url),
      { status: 303 },
    );
  }

  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");

  await recordLoginAttempt(ip);

  if (!verifyPassword(password)) {
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url), {
      status: 303,
    });
  }

  const response = NextResponse.redirect(new URL("/admin", request.url), {
    status: 303,
  });
  response.cookies.set(ADMIN_SESSION_COOKIE, createSessionCookieValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  });
  return response;
}
