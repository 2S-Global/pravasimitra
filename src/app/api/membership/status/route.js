import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import { withAuth } from "../../../../../lib/withAuth";
import UserMembership from "../../../../../models/UserMembership";
import User from "../../../../../models/User";
import MembershipPlan from "../../../../../models/MembershipPlan";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";

export async function OPTIONS() {
  return optionsResponse();
}

export const GET = withAuth(async function (req, user) {
  await connectDB();

  try {
    const userDoc = await User.findById(user.id)
      .populate("membershipId");

    if (!userDoc || !userDoc.membershipId) {
      return addCorsHeaders(
        NextResponse.json(
          { success: false, message: "No active membership found" },
          { status: 404 }
        )
      );
    }

    const membershipPlan = userDoc.membershipId;

    const statusData = {
      planId: membershipPlan._id,
      planName: membershipPlan.name,
      planPrice: membershipPlan.price,
      limits: membershipPlan.limits,
      durationInDays: membershipPlan.durationInDays,
      isActive: membershipPlan.isActive,
      usage: {
        buySell: 0,
        rentLease: 0,
        marketplace: 0
      },
      remaining: {
        buySell: membershipPlan.limits.buySell,
        rentLease: membershipPlan.limits.rentLease,
        marketplace: membershipPlan.limits.marketplace
      }
    };

    return addCorsHeaders(
      NextResponse.json(
        { success: true, data: statusData },
        { status: 200 }
      )
    );

  } catch (err) {
    console.error("Error fetching membership status:", err);
    return addCorsHeaders(
      NextResponse.json({ error: "Server error" }, { status: 500 })
    );
  }
});
