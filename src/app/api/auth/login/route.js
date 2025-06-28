import { connectDB } from "../../../../../lib/db";
import User from "../../../../../models/User";
import { signToken } from "../../../../../lib/auth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";

// Handle preflight OPTIONS request
export async function OPTIONS() {
  return optionsResponse('*');
}

export async function POST(req) {
  await connectDB();

  const { identifier, password } = await req.json();

  const user = await User.findOne({
    $or: [{ email: identifier }, { mobile: identifier }],
    isDel: false
  }).select('+password').lean();

  if (!user) {
    const res = NextResponse.json(
      { msg: "Invalid Email or Mobile Number" },
      { status: 200 }
    );
    return addCorsHeaders(res);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const res = NextResponse.json(
      { msg: "Incorrect Password" },
      { status: 200 }
    );
    return addCorsHeaders(res);
  }

  // Sign JWT with extra user info
  const token = signToken({
    id: user._id,
    name: user.name,
    email: user.email
  });

  // Remove password before returning user info
  delete user.password;

  // Build success response
  const res = NextResponse.json({
    msg: `Welcome ${user.name}`,
    user
  });

  // Set token cookie
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: false, // use true in production!
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60
  });

  return addCorsHeaders(res);
}
