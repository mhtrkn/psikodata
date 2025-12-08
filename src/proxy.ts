import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth/verify";

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("admin_token")?.value || null;

  if (pathname === "/admin") {
    if (!token) {
      return NextResponse.next();
    }

    const url = req.nextUrl.clone();
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }

    const isValid = await verifyToken(token);
    if (!isValid) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
