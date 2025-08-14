import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import MembershipPlan from "../../../../../models/MembershipPlan";
import { withAuth } from "../../../../../lib/withAuth";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";


export async function OPTIONS() {
  return optionsResponse();
}

// CREATE MEMBERSHIP PLAN (POST)
export const POST = withAuth(async function (req, user) {
  await connectDB();

  let body;
  try {
    body = await req.json();
  } catch (err) {
    return addCorsHeaders(
      NextResponse.json({ error: "Invalid JSON data" }, { status: 400 })
    );
  }

  const { name, price, limits, durationInDays, isActive } = body;

  if (!name || !durationInDays) {
    return addCorsHeaders(
      NextResponse.json(
        { error: "Name, price, and durationInDays are required" },
        { status: 400 }
      )
    );
  }

  try {
    const newPlan = await MembershipPlan.create({
      name,
      price,
      limits: limits || { buySell: 0, rentLease: 0, marketplace: 0 },
      durationInDays,
      isActive: isActive !== undefined ? isActive : true,
    });

    return addCorsHeaders(
      NextResponse.json(
        {
          msg: "Membership plan created successfully",
          plan: newPlan,
          createdBy: user?.id,
        },
        { status: 200 }
      )
    );
  } catch (err) {
    console.error("Error creating membership plan:", err);
    return addCorsHeaders(
      NextResponse.json({ error: "Database insert failed" }, { status: 500 })
    );
  }
});