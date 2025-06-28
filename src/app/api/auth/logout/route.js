import { NextResponse } from "next/server";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";

export async function OPTIONS() {
  return optionsResponse();
}

export async function POST() {
  const res = NextResponse.json({ msg: "Logged out" });
  res.cookies.set("token", "", { maxAge: 0 });
  return addCorsHeaders(res);
}
 