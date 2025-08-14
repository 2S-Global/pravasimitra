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
    const plans = await MembershipPlan.aggregate([
      {
        $addFields: {
          sortOrder: {
            $switch: {
              branches: [
                { case: { $eq: ["$name", "Basic"] }, then: 1 },
                { case: { $eq: ["$name", "Silver"] }, then: 2 },
                { case: { $eq: ["$name", "Gold"] }, then: 3 },
                { case: { $eq: ["$name", "Platinum"] }, then: 4 },
              ],
              default: 999, // fallback for unexpected names
            },
          },
        },
      },
      { $sort: { sortOrder: 1 } },
      { $project: { sortOrder: 0 } }, // remove helper field from output
    ]);

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
