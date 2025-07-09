import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
  const url = req.nextUrl;
  const token = req.cookies.get('token')?.value;
  console.log("✅ middleware.js loaded");


  if (url.pathname.startsWith("/user")) {
    if (!token) {
        console.log("user");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      await jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*"],
};
