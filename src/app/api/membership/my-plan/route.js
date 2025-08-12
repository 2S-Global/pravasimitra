import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import MembershipPlan from "../../../../../models/MembershipPlan";
import User from "../../../../../models/User";
import { withAuth } from "../../../../../lib/withAuth";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";

export async function OPTIONS() {
  return optionsResponse();
}

// FETCH CURRENT USER'S PLAN (with populate)
export const GET = withAuth(async (req, user) => {
  await connectDB();

  try {
    // Find user and populate membership plan details
    const dbUser = await User.findById(user.id)
      .populate("membershipId")
      .lean();

    if (!dbUser || !dbUser.membershipId) {
      return addCorsHeaders(
        NextResponse.json(
          { success: false, message: "No active membership found" },
          { status: 404 }
        )
      );
    }

    return addCorsHeaders(
      NextResponse.json(
        {
          success: true,
          data: {
            plan: dbUser.membershipId, // populated plan details
            activatedAt: dbUser.updatedAt,
          },
        },
        { status: 200 }
      )
    );
  } catch (err) {
    console.error("Error fetching user's plan:", err);
    return addCorsHeaders(
      NextResponse.json(
        { success: false, error: "Internal Server Error" },
        { status: 500 }
      )
    );
  }
});
