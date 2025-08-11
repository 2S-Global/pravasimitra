import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import MembershipPlan from "../../../../../models/MembershipPlan";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";

export async function OPTIONS() {
  return optionsResponse();
}

// FETCH MEMBERSHIP PLAN LIST (GET)
export async function GET() {
  await connectDB();

  try {
    const plans = await MembershipPlan.find().sort({ createdAt: -1 }).lean();

    return addCorsHeaders(
      NextResponse.json(
        {
          success: true,
          data: plans,
        },
        { status: 200 }
      )
    );
  } catch (err) {
    console.error("Error fetching membership plans:", err);
    return addCorsHeaders(
      NextResponse.json({ error: "Database fetch failed" }, { status: 500 })
    );
  }
}
