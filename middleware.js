import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// List of all protected paths
const protectedPaths = ["/user", "/buy-sell", "/rent-lease", "/marketplace"];

export async function middleware(req) {
  const url = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  console.log("✅ middleware.js loaded for:", url.pathname);

  // Check if the requested path is in the protected paths
  if (protectedPaths.some(path => url.pathname.startsWith(path))) {
    if (!token) {
      console.log("No token, redirecting to login for path:", url.pathname);
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      await jwtVerify(token, SECRET);
      console.log("Token valid, allowing access to:", url.pathname);
      return NextResponse.next();
    } catch (err) {
      console.log("Invalid token, redirecting to login for path:", url.pathname, err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // All other paths are public
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user/:path*",
    "/buy-sell/:path*",
    "/rent-lease/:path*",
    "/marketplace/:path*",
  ],
};
