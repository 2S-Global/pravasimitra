import { withAuth } from "@/lib/withAuth";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

//Fetch user profile (GET)
export const GET = withAuth(async (req, user) => {
  try {
    await connectDB();
    const userId = user.id;

    const existingUser = await User.findById(userId).select("-__v").lean();
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      msg: "User fetched successfully",
      user: existingUser,
    });

  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

});

// Update user profile (PUT)
export const PUT = withAuth(async (req, user) => {
  try {
    await connectDB();
    const userId = user.id;
    const body = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: body },
      { new: true, runValidators: true }
    ).select("-__v").lean();

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      msg: "User updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

});
