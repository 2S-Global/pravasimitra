import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import MembershipPlan from "../../../../../models/MembershipPlan";
import User from "../../../../../models/User";
import { withAuth } from "../../../../../lib/withAuth";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";

export async function OPTIONS() {
  return optionsResponse();
}

// FETCH ALL PLANS + CURRENT USER'S ACTIVE PLAN ID
export const GET = withAuth(async (req, user) => {
  await connectDB();

  try {
    // // Fetch all membership plans
    // const plans = await MembershipPlan.find()
    //   .sort({ createdAt: -1 })
    //   .lean();

    // Custom order for plans
    const order = ["Basic", "Silver", "Gold", "Platinum"];

    // Fetch all membership plans
    let plans = await MembershipPlan.find().lean();

    // Sort according to custom order
    plans.sort(
      (a, b) => order.indexOf(a.name) - order.indexOf(b.name)
    );

    // Get the current user (no need to populate here since we just need the ID)
    const dbUser = await User.findById(user.id).lean();

    // If user not found
    if (!dbUser) {
      return addCorsHeaders(
        NextResponse.json(
          { success: false, message: "User not found" },
          { status: 404 }
        )
      );
    }

    return addCorsHeaders(
      NextResponse.json(
        {
          success: true,
          data: {
            plans,
            userPlanId: dbUser.membershipId || null,
          },
        },
        { status: 200 }
      )
    );
  } catch (err) {
    console.error("Error fetching plans:", err);
    return addCorsHeaders(
      NextResponse.json(
        { success: false, error: "Internal Server Error" },
        { status: 500 }
      )
    );
  }
});
