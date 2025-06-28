import bcrypt from "bcryptjs";
import { connectDB } from "../../../../../lib/db";
import User from "../../../../../models/User";
import { NextResponse } from "next/server";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";

// OPTIONS for CORS
export async function OPTIONS() {
  return optionsResponse();
}

export async function POST(req) {
  await connectDB();

  try {
    const { name, email, mobile, password } = await req.json();

    if (!name || !email || !mobile || !password) {
      return addCorsHeaders(
        NextResponse.json({ msg: "All Fields Are Mandatory" })
      );
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      return addCorsHeaders(
        NextResponse.json(
          { msg: "Email or Mobile Number already registered" },
          { status: 200 }
        )
      );
    }

    const HashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      mobile,
      password: HashedPassword,
    });

    await newUser.save();

    return addCorsHeaders(
      NextResponse.json({ msg: "Registered Successfully" }, { status: 200 })
    );
  } catch (error) {
    return addCorsHeaders(
      NextResponse.json({ msg: "Server Error" }, { status: 500 })
    );
  }
}