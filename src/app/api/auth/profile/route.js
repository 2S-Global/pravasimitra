import { withAuth } from "../../../../../lib/withAuth";
import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import User from "../../../../../models/User";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";

// CORS Preflight
export async function OPTIONS() {
  return optionsResponse();
}

// Fetch user profile (GET)
export const GET = withAuth(async (req, user) => {
  try {
    await connectDB();
    const userId = user.id;

    const existingUser = await User.findById(userId).select("-__v").lean();
    if (!existingUser) {
      return addCorsHeaders(
        NextResponse.json({ error: "User not found" }, { status: 404 })
      );
    }

    const imageUrl = existingUser.image
  ? `/assets/images/profile-img/${existingUser.image}`
  : '/assets/images/default-user.png';

// ✅ Build the user object with new image path
const userToReturn = {
  ...existingUser,
  image: imageUrl
};

    return addCorsHeaders(
      NextResponse.json({
        msg: "User fetched successfully",
        user: userToReturn,
      })
    );

  } catch (error) {
    console.error("Error fetching user:", error);
    return addCorsHeaders(
      NextResponse.json({ error: "Internal server error" }, { status: 500 })
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
      return addCorsHeaders(
        NextResponse.json({ error: "User not found" }, { status: 404 })
      );
    }

    return addCorsHeaders(
      NextResponse.json({
        msg: "User updated successfully",
        user: updatedUser,
      })
    );

  } catch (error) {
    console.error("Error updating user:", error);
    return addCorsHeaders(
      NextResponse.json({ error: "Internal server error" }, { status: 500 })
    );
  }
});
