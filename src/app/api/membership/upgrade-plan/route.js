import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import MembershipPlan from "../../../../../models/MembershipPlan";
import User from "../../../../../models/User";
import { withAuth } from "../../../../../lib/withAuth";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";

export async function OPTIONS() {
  return optionsResponse();
}

// Upgrade Membership Plan (Ack only)
export const POST = withAuth(async (req, user) => {
  await connectDB();

  try {
    const { planId } = await req.json();

    if (!planId) {
      return addCorsHeaders(
        NextResponse.json({ success: false, message: "Plan ID is required" }, { status: 400 })
      );
    }

    // Check if plan exists
    const plan = await MembershipPlan.findById(planId).lean();
    if (!plan) {
      return addCorsHeaders(
        NextResponse.json({ success: false, message: "Membership plan not found" }, { status: 404 })
      );
    }

    // Update user's membership
    await User.findByIdAndUpdate(user.id, { membershipId: planId });

    // Return only acknowledgment
    return addCorsHeaders(
      NextResponse.json({ success: true, message: "Membership upgraded successfully" }, { status: 200 })
    );

  } catch (err) {
    console.error("Error upgrading membership:", err);
    return addCorsHeaders(
      NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
    );
  }
});
