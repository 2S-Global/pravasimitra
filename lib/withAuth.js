import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import { NextResponse } from "next/server";

export function withAuth(handler) {
  return async function (req) {
    const cookieStore = await cookies(); // ✅ Await cookies
    const token = cookieStore.get("token")?.value;
    const user = verifyToken(token);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return handler(req, user);
  };
}
