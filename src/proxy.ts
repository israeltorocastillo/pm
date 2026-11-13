import { NextResponse } from "next/server";
import { auth } from "@/server/auth";

const PUBLIC_PATHS = ["/login", "/register", "/activar"];

export default auth((req) => {
  const isPublic = PUBLIC_PATHS.some((path) => req.nextUrl.pathname.startsWith(path));
  const isAuthApi = req.nextUrl.pathname.startsWith("/api/auth");

  if (!req.auth && !isPublic && !isAuthApi) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (req.auth && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
