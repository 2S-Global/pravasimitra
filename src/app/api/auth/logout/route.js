import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";

export async function OPTIONS() {
  return optionsResponse();
}

export async function POST() {
const cookieStore = await cookies();

  // Clear the 'token' cookie by setting it to empty and expired
  cookieStore.set("token", "", {
    httpOnly: true,
    // sameSite: "none",
    // secure: true,
      sameSite: "lax",
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });

  const res = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
  return addCorsHeaders(res);
}
