import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://pravasimitra.vercel.app",

];

// Helper to decide if origin is allowed
function getAllowedOrigin(origin) {
  return ALLOWED_ORIGINS.includes(origin) ? origin : "";
}

export async function GET(req) {
  const origin = req.headers.get("origin");
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const isLoggedIn = !!token;

  const res = NextResponse.json({ isLoggedIn });
  
  // CORS headers
  const allowedOrigin = getAllowedOrigin(origin);
  if (allowedOrigin) {
    res.headers.set("Access-Control-Allow-Origin", allowedOrigin);
    res.headers.set("Access-Control-Allow-Credentials", "true");
  }
  return res;
}

export async function OPTIONS(req) {
  const origin = req.headers.get("origin");

  const res = new Response(null, { status: 204 });
  const allowedOrigin = getAllowedOrigin(origin);
  if (allowedOrigin) {
    res.headers.set("Access-Control-Allow-Origin", allowedOrigin);
    res.headers.set("Access-Control-Allow-Credentials", "true");
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  }
  return res;
}
