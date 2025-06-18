import bcrypt from "bcryptjs";
import { connectDB } from "../../../../../lib/db";
import User from "../../../../../models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  try {
    const { name, email, mobile, password } = await req.json();

    if (!name || !email || !mobile || !password) {
      return NextResponse.json({ msg: "All Fields Are Mandatory" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      return NextResponse.json(
        { msg: "Email or Mobile Number already registered" },
        { status: 200 }
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

    return NextResponse.json(
      { msg: "Registered Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ msg: "Server Error" }, { status: 500 });
  }
}
