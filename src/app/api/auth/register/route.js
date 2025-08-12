import bcrypt from "bcryptjs";
import { connectDB } from "../../../../../lib/db";
import User from "../../../../../models/User";
import MembershipPlan from "../../../../../models/MembershipPlan";
import { NextResponse } from "next/server";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";

// OPTIONS for CORS
export async function OPTIONS() {
  return optionsResponse();
}

export async function POST(req) {
  await connectDB();

  try {
    const { name, email, mobile, password, membershipId } = await req.json();

    if (!name || !email || !mobile || !password || !membershipId) {
      return addCorsHeaders(
        NextResponse.json({ msg: "All Fields Are Mandatory" })
      );
    }

    // Check if membership plan exists
    const plan = await MembershipPlan.findById(membershipId);
    if (!plan) {
      return addCorsHeaders(
        NextResponse.json({ msg: "Invalid membership plan" }, { status: 404 })
      );
    }

    const existingUser = await User.findOne({
      $or: [{ email }],
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

     // Set default image URL
    const defaultImageUrl = "https://res.cloudinary.com/dwy9i2fqt/image/upload/v1754560507/default-user_hd6lwv.png";

    const newUser = new User({
      name,
      email,
      mobile,
      password: HashedPassword,
      image: defaultImageUrl,
      membershipId: membershipId,
    });

    await newUser.save();

    return addCorsHeaders(
      NextResponse.json({ msg: "Registered Successfully" }, { status: 200 })
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return addCorsHeaders(
      NextResponse.json({ msg: "Server Error" }, { status: 500 })
    );
  }
}